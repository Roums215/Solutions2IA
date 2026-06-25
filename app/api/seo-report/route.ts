/**
 * Rapport SEO automatique — hebdomadaire & mensuel.
 *
 * Déclenché par Vercel Cron (voir vercel.json) :
 *   • lundi 8h UTC          → rapport hebdomadaire (7 derniers jours vs 7 précédents)
 *   • 1ᵉʳ du mois 8h UTC     → rapport mensuel  (28 derniers jours vs 28 précédents)
 *
 * Calcule un SCORE SEO (visibilité Google + santé on-page) et l'envoie par
 * email (Resend) + webhook optionnel. Voir lib/seo/report/* pour les détails.
 *
 * ── Activation (env vars Vercel) ─────────────────────────────────────────────
 *   CRON_SECRET              (recommandé) — protège l'endpoint. `openssl rand -hex 32`
 *   SEO_REPORT_EMAIL         — destinataire du rapport (ex: ionita.iulian215@gmail.com)
 *   RESEND_API_KEY           — déjà utilisé par le formulaire de contact
 *   SEO_REPORT_FROM          (option)    — expéditeur vérifié sur Resend
 *   GSC_SERVICE_ACCOUNT_KEY  (option)    — clé JSON service account → débloque la visibilité
 *   GSC_SITE_URL             (option)    — "https://solutions2ia.fr/" ou "sc-domain:solutions2ia.fr"
 *   SEO_REPORT_WEBHOOK       (option)    — URL Slack/Discord
 *
 * Sans GSC, le rapport part quand même avec le score de santé on-page.
 * Test manuel : GET /api/seo-report?secret=<CRON_SECRET>&dry=1
 */

import { NextResponse } from "next/server";
import { fetchGscReport, type Period } from "@/lib/seo/report/gsc";
import { fetchOnPageHealth } from "@/lib/seo/report/onpage";
import { computeScore } from "@/lib/seo/report/score";
import { sendReport, type ReportMode } from "@/lib/seo/report/email";
import { SITE_URL } from "@/lib/seo/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Données GSC fraîches à ~2 jours → on prend 3 jours de marge.
const GSC_LAG_DAYS = 3;

// Pages prioritaires auditées côté santé on-page.
const AUDIT_PATHS = [
  "/",
  "/services",
  "/sites-web",
  "/applications",
  "/agents-ia",
  "/automatisation",
  "/rag",
  "/faq",
  "/contact",
];

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, days: number): Date {
  const copy = new Date(d);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

function computePeriods(mode: ReportMode): {
  current: Period;
  previous: Period;
  label: string;
} {
  const span = mode === "weekly" ? 7 : 28;
  const now = new Date();
  const end = addDays(now, -GSC_LAG_DAYS);
  const start = addDays(end, -(span - 1));
  const prevEnd = addDays(start, -1);
  const prevStart = addDays(prevEnd, -(span - 1));

  const f = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const label = `${f.format(start)} – ${f.format(end)}`;

  return {
    current: { startDate: ymd(start), endDate: ymd(end) },
    previous: { startDate: ymd(prevStart), endDate: ymd(prevEnd) },
    label,
  };
}

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // pas de secret configuré → ouvert (dev)
  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true; // Vercel Cron
  const url = new URL(request.url);
  return url.searchParams.get("secret") === secret; // test manuel
}

async function runReport(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const mode: ReportMode =
    url.searchParams.get("mode") === "monthly" ? "monthly" : "weekly";
  const dryRun = url.searchParams.get("dry") === "1";

  const { current, previous, label } = computePeriods(mode);

  // GSC est best-effort : une erreur d'auth ne doit pas tuer le rapport santé.
  let gsc = null;
  try {
    gsc = await fetchGscReport({ current, previous });
  } catch (e) {
    console.error("[seo-report] GSC error:", e);
  }

  const onpage = await fetchOnPageHealth(SITE_URL, AUDIT_PATHS);
  const score = computeScore(gsc, onpage);

  const data = {
    mode,
    periodLabel: label,
    score,
    gsc,
    onpage,
  };

  const delivery = dryRun
    ? { emailSent: false, webhookSent: false }
    : await sendReport(data);

  return NextResponse.json({
    status: "ok",
    mode,
    period: label,
    score: {
      global: score.global,
      grade: score.grade,
      visibility: score.visibility,
      health: score.health,
    },
    gscConnected: gsc !== null,
    onPageScore: onpage.score,
    delivery,
  });
}

// Vercel Cron déclenche en GET.
export async function GET(request: Request) {
  return runReport(request);
}

// POST conservé pour compat / déclenchement manuel.
export async function POST(request: Request) {
  return runReport(request);
}
