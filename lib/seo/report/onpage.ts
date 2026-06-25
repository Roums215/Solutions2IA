/**
 * Audit de santé on-page — interroge le site LIVE et vérifie les signaux SEO
 * techniques par regex (zéro dépendance type cheerio).
 *
 * Détecte automatiquement les régressions : title/description manquants,
 * canonical pointant vers un autre host (le bug .com), h1 multiples, JSON-LD
 * absent, noindex accidentel, OG manquant, page en erreur.
 */

export type Check = {
  id: string;
  label: string;
  weight: number;
  passed: boolean;
  detail?: string;
};

export type PageHealth = {
  url: string;
  status: number;
  score: number; // 0..100
  checks: Check[];
};

export type OnPageReport = {
  pages: PageHealth[];
  siteChecks: Check[];
  score: number; // 0..100 global on-page
};

async function fetchHtml(
  url: string,
): Promise<{ status: number; html: string }> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Solutions2IA-SEO-Bot/1.0" },
      redirect: "follow",
    });
    const html = await res.text();
    return { status: res.status, html };
  } catch {
    return { status: 0, html: "" };
  }
}

function countMatches(re: RegExp, html: string): number {
  return (html.match(re) ?? []).length;
}

function extract(re: RegExp, html: string): string | null {
  const m = html.match(re);
  return m ? m[1] : null;
}

function scoreChecks(checks: Check[]): number {
  const total = checks.reduce((s, c) => s + c.weight, 0);
  if (total === 0) return 0;
  const got = checks.reduce((s, c) => s + (c.passed ? c.weight : 0), 0);
  return Math.round((got / total) * 100);
}

function auditPage(url: string, siteHost: string, status: number, html: string): PageHealth {
  const title = extract(/<title[^>]*>([^<]*)<\/title>/i, html)?.trim() ?? "";
  const description =
    extract(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
      html,
    )?.trim() ?? "";
  const canonical = extract(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i,
    html,
  );
  const h1Count = countMatches(/<h1[\s>]/gi, html);
  const hasOgTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
  const hasOgImage = /<meta[^>]+property=["']og:image["']/i.test(html);
  const hasJsonLd = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
  const isNoindex =
    /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
  const langFr = /<html[^>]+lang=["']fr/i.test(html);

  let canonicalHost = "";
  try {
    if (canonical) canonicalHost = new URL(canonical).host;
  } catch {
    /* ignore */
  }

  const checks: Check[] = [
    {
      id: "status",
      label: "Réponse HTTP 200",
      weight: 3,
      passed: status === 200,
      detail: `status ${status}`,
    },
    {
      id: "title",
      label: "Title présent (30–65 car.)",
      weight: 2,
      passed: title.length >= 30 && title.length <= 65,
      detail: title ? `${title.length} car.` : "absent",
    },
    {
      id: "description",
      label: "Meta description (110–165 car.)",
      weight: 2,
      passed: description.length >= 110 && description.length <= 165,
      detail: description ? `${description.length} car.` : "absente",
    },
    {
      id: "canonical-present",
      label: "Canonical présent",
      weight: 2,
      passed: !!canonical,
      detail: canonical ?? "absent",
    },
    {
      id: "canonical-host",
      label: "Canonical sur le bon domaine",
      weight: 3,
      passed: !!canonical && canonicalHost === siteHost,
      detail: canonicalHost
        ? canonicalHost === siteHost
          ? "ok"
          : `pointe vers ${canonicalHost} ≠ ${siteHost}`
        : "n/a",
    },
    {
      id: "h1",
      label: "Exactement un <h1>",
      weight: 2,
      passed: h1Count === 1,
      detail: `${h1Count} h1`,
    },
    {
      id: "og",
      label: "OpenGraph (title + image)",
      weight: 1,
      passed: hasOgTitle && hasOgImage,
    },
    {
      id: "jsonld",
      label: "JSON-LD structuré",
      weight: 2,
      passed: hasJsonLd,
    },
    {
      id: "indexable",
      label: "Page indexable (pas de noindex)",
      weight: 3,
      passed: !isNoindex,
    },
    {
      id: "lang",
      label: 'Langue déclarée (lang="fr")',
      weight: 1,
      passed: langFr,
    },
  ];

  return { url, status, score: scoreChecks(checks), checks };
}

/**
 * Audite une liste de chemins + des contrôles au niveau site (robots, sitemap).
 */
export async function fetchOnPageHealth(
  siteUrl: string,
  paths: string[],
): Promise<OnPageReport> {
  const base = siteUrl.replace(/\/$/, "");
  const siteHost = new URL(base).host;

  const pages = await Promise.all(
    paths.map(async (p) => {
      const url = `${base}${p}`;
      const { status, html } = await fetchHtml(url);
      return auditPage(url, siteHost, status, html);
    }),
  );

  const [robots, sitemap] = await Promise.all([
    fetchHtml(`${base}/robots.txt`),
    fetchHtml(`${base}/sitemap.xml`),
  ]);

  const siteChecks: Check[] = [
    {
      id: "robots",
      label: "robots.txt accessible",
      weight: 2,
      passed: robots.status === 200 && /sitemap/i.test(robots.html),
    },
    {
      id: "sitemap",
      label: "sitemap.xml accessible",
      weight: 2,
      passed: sitemap.status === 200 && /<urlset|<sitemapindex/i.test(sitemap.html),
    },
    {
      id: "https",
      label: "HTTPS",
      weight: 2,
      passed: base.startsWith("https://"),
    },
  ];

  const pageAvg =
    pages.length > 0
      ? pages.reduce((s, p) => s + p.score, 0) / pages.length
      : 0;
  const siteScore = scoreChecks(siteChecks);
  // 80% pages, 20% contrôles site.
  const score = Math.round(pageAvg * 0.8 + siteScore * 0.2);

  return { pages, siteChecks, score };
}
