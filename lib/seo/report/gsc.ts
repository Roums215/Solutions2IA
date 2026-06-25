/**
 * Client Google Search Console — SANS dépendance externe.
 *
 * Auth service account : on signe nous-mêmes un JWT RS256 avec le `crypto`
 * natif de Node, on l'échange contre un access token OAuth2, puis on appelle
 * l'API Search Analytics en `fetch`. Aucun package `googleapis` (lourd) requis.
 *
 * Env vars nécessaires (Vercel) :
 *   GSC_SERVICE_ACCOUNT_KEY  — clé JSON du service account (inline ou base64).
 *   GSC_SITE_URL             — property GSC. URL-prefix : "https://solutions2ia.fr/"
 *                              ou domaine : "sc-domain:solutions2ia.fr".
 */

import crypto from "node:crypto";

type ServiceAccount = { clientEmail: string; privateKey: string };

export type Period = { startDate: string; endDate: string };

export type GscMetrics = {
  clicks: number;
  impressions: number;
  ctr: number; // 0..1
  position: number; // moyenne (1 = top)
};

export type GscQueryRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  positionPrev: number | null;
  positionDelta: number | null; // positif = on monte (position baisse)
};

export type GscPageRow = {
  page: string;
  clicks: number;
  impressions: number;
  position: number;
};

export type GscReport = {
  siteUrl: string;
  current: GscMetrics;
  previous: GscMetrics;
  topQueries: GscQueryRow[];
  topPages: GscPageRow[];
};

function loadServiceAccount(): ServiceAccount | null {
  const raw = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  try {
    const json = raw.trim().startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    const parsed = JSON.parse(json) as {
      client_email?: string;
      private_key?: string;
    };
    if (!parsed.client_email || !parsed.private_key) return null;
    return {
      clientEmail: parsed.client_email,
      // Vercel échappe souvent les sauts de ligne de la clé PEM.
      privateKey: parsed.private_key.replace(/\\n/g, "\n"),
    };
  } catch {
    return null;
  }
}

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.clientEmail,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(
    JSON.stringify(claim),
  )}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signingInput);
  const signature = base64url(signer.sign(sa.privateKey));
  const assertion = `${signingInput}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    throw new Error(`GSC token exchange ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

type RawRow = {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

async function queryAnalytics(
  siteUrl: string,
  token: string,
  body: Record<string, unknown>,
): Promise<RawRow[]> {
  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    siteUrl,
  )}/searchAnalytics/query`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`GSC query ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as { rows?: RawRow[] };
  return data.rows ?? [];
}

function toMetrics(rows: RawRow[]): GscMetrics {
  const r = rows[0];
  if (!r) return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  return {
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  };
}

/**
 * Récupère le rapport GSC complet (période courante + précédente + top
 * requêtes/pages). Renvoie `null` si le service account n'est pas configuré.
 */
export async function fetchGscReport(opts: {
  current: Period;
  previous: Period;
}): Promise<GscReport | null> {
  const sa = loadServiceAccount();
  if (!sa) return null;

  const siteUrl = process.env.GSC_SITE_URL || "https://solutions2ia.fr/";
  const token = await getAccessToken(sa);

  const agg = async (p: Period) =>
    toMetrics(
      await queryAnalytics(siteUrl, token, {
        startDate: p.startDate,
        endDate: p.endDate,
        dimensions: [],
      }),
    );

  const [current, previous, queriesCur, queriesPrev, pages] = await Promise.all(
    [
      agg(opts.current),
      agg(opts.previous),
      queryAnalytics(siteUrl, token, {
        startDate: opts.current.startDate,
        endDate: opts.current.endDate,
        dimensions: ["query"],
        rowLimit: 25,
      }),
      queryAnalytics(siteUrl, token, {
        startDate: opts.previous.startDate,
        endDate: opts.previous.endDate,
        dimensions: ["query"],
        rowLimit: 1000,
      }),
      queryAnalytics(siteUrl, token, {
        startDate: opts.current.startDate,
        endDate: opts.current.endDate,
        dimensions: ["page"],
        rowLimit: 10,
      }),
    ],
  );

  const prevPosByQuery = new Map<string, number>();
  for (const r of queriesPrev) {
    if (r.keys?.[0]) prevPosByQuery.set(r.keys[0], r.position);
  }

  const topQueries: GscQueryRow[] = queriesCur.map((r) => {
    const query = r.keys?.[0] ?? "";
    const positionPrev = prevPosByQuery.get(query) ?? null;
    return {
      query,
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
      positionPrev,
      // Position GSC : plus petit = mieux. Delta positif = progression.
      positionDelta:
        positionPrev === null ? null : positionPrev - r.position,
    };
  });

  const topPages: GscPageRow[] = pages.map((r) => ({
    page: r.keys?.[0] ?? "",
    clicks: r.clicks,
    impressions: r.impressions,
    position: r.position,
  }));

  return { siteUrl, current, previous, topQueries, topPages };
}
