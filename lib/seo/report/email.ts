/**
 * Rendu + envoi du rapport SEO (email HTML on-brand via Resend, webhook optionnel).
 */

import { Resend } from "resend";
import type { GscReport } from "./gsc";
import type { OnPageReport } from "./onpage";
import { type ScoreBreakdown, pctChange } from "./score";

export type ReportMode = "weekly" | "monthly";

export type ReportData = {
  mode: ReportMode;
  periodLabel: string; // ex: "16 – 22 juin 2026"
  score: ScoreBreakdown;
  gsc: GscReport | null;
  onpage: OnPageReport;
};

const C = {
  bg: "#0b0c14",
  card: "#14151f",
  border: "#23263a",
  text: "#f5f7ff",
  muted: "#9aa0bd",
  indigo: "#7c8bff",
  cyan: "#22d3ee",
  good: "#34d399",
  bad: "#f87171",
};

const GRADE_COLOR: Record<string, string> = {
  A: C.good,
  B: "#a3e635",
  C: "#fbbf24",
  D: "#fb923c",
  E: C.bad,
};

function fmt(n: number, digits = 0): string {
  return n.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function delta(current: number, previous: number, opts: { lowerIsBetter?: boolean; suffix?: string; digits?: number } = {}): string {
  const { lowerIsBetter = false, suffix = "", digits = 0 } = opts;
  const diff = current - previous;
  const pct = pctChange(current, previous);
  const improved = lowerIsBetter ? diff < 0 : diff > 0;
  const flat = Math.abs(diff) < 1e-9;
  const color = flat ? C.muted : improved ? C.good : C.bad;
  const arrow = flat ? "→" : improved ? "▲" : "▼";
  const pctStr = pct === null ? "—" : `${pct >= 0 ? "+" : ""}${fmt(pct, 0)}%`;
  return `<span style="color:${color};font-weight:600">${arrow} ${fmt(Math.abs(diff), digits)}${suffix} (${pctStr})</span>`;
}

function metricRow(
  label: string,
  current: string,
  deltaHtml: string,
): string {
  return `<tr>
    <td style="padding:10px 0;border-top:1px solid ${C.border};color:${C.muted};font-size:13px">${label}</td>
    <td style="padding:10px 0;border-top:1px solid ${C.border};color:${C.text};font-size:16px;font-weight:700;text-align:right">${current}</td>
    <td style="padding:10px 0 10px 16px;border-top:1px solid ${C.border};font-size:13px;text-align:right;white-space:nowrap">${deltaHtml}</td>
  </tr>`;
}

function queriesTable(gsc: GscReport): string {
  if (gsc.topQueries.length === 0) {
    return `<p style="color:${C.muted};font-size:13px">Aucune requête sur la période (le site est probablement encore en cours d'indexation).</p>`;
  }
  const rows = gsc.topQueries
    .slice(0, 15)
    .map((q) => {
      const d =
        q.positionDelta === null
          ? `<span style="color:${C.muted}">nouveau</span>`
          : q.positionDelta === 0
            ? `<span style="color:${C.muted}">→</span>`
            : q.positionDelta > 0
              ? `<span style="color:${C.good}">▲ ${fmt(q.positionDelta, 1)}</span>`
              : `<span style="color:${C.bad}">▼ ${fmt(Math.abs(q.positionDelta), 1)}</span>`;
      return `<tr>
        <td style="padding:7px 0;border-top:1px solid ${C.border};color:${C.text};font-size:13px">${q.query}</td>
        <td style="padding:7px 0;border-top:1px solid ${C.border};color:${C.text};font-size:13px;text-align:right">${fmt(q.position, 1)}</td>
        <td style="padding:7px 0 7px 12px;border-top:1px solid ${C.border};font-size:13px;text-align:right">${d}</td>
        <td style="padding:7px 0 7px 12px;border-top:1px solid ${C.border};color:${C.muted};font-size:13px;text-align:right">${fmt(q.clicks)} / ${fmt(q.impressions)}</td>
      </tr>`;
    })
    .join("");
  return `<table style="width:100%;border-collapse:collapse">
    <tr>
      <td style="color:${C.muted};font-size:11px;text-transform:uppercase;letter-spacing:.05em">Requête</td>
      <td style="color:${C.muted};font-size:11px;text-align:right">Pos.</td>
      <td style="color:${C.muted};font-size:11px;text-align:right;padding-left:12px">Évol.</td>
      <td style="color:${C.muted};font-size:11px;text-align:right;padding-left:12px">Clics / Impr.</td>
    </tr>
    ${rows}
  </table>`;
}

function healthChecklist(onpage: OnPageReport): string {
  const failed: string[] = [];
  for (const sc of onpage.siteChecks) {
    if (!sc.passed) failed.push(`Site — ${sc.label}${sc.detail ? ` (${sc.detail})` : ""}`);
  }
  for (const p of onpage.pages) {
    const path = (() => {
      try {
        return new URL(p.url).pathname;
      } catch {
        return p.url;
      }
    })();
    for (const c of p.checks) {
      if (!c.passed)
        failed.push(`${path} — ${c.label}${c.detail ? ` (${c.detail})` : ""}`);
    }
  }
  if (failed.length === 0) {
    return `<p style="color:${C.good};font-size:14px;font-weight:600">✓ Tous les contrôles on-page passent.</p>`;
  }
  return `<ul style="margin:0;padding-left:18px;color:${C.bad};font-size:13px;line-height:1.7">
    ${failed.map((f) => `<li>${f}</li>`).join("")}
  </ul>`;
}

export function buildReportEmail(data: ReportData): {
  subject: string;
  html: string;
  text: string;
} {
  const { score, gsc, onpage, mode, periodLabel } = data;
  const modeLabel = mode === "weekly" ? "Hebdomadaire" : "Mensuel";
  const gradeColor = GRADE_COLOR[score.grade];

  const metricsBlock = gsc
    ? `<table style="width:100%;border-collapse:collapse;margin-top:8px">
        ${metricRow("Clics", fmt(gsc.current.clicks), delta(gsc.current.clicks, gsc.previous.clicks))}
        ${metricRow("Impressions", fmt(gsc.current.impressions), delta(gsc.current.impressions, gsc.previous.impressions))}
        ${metricRow("CTR moyen", `${fmt(gsc.current.ctr * 100, 1)}%`, delta(gsc.current.ctr * 100, gsc.previous.ctr * 100, { suffix: " pt", digits: 1 }))}
        ${metricRow("Position moyenne", fmt(gsc.current.position, 1), delta(gsc.current.position, gsc.previous.position, { lowerIsBetter: true, digits: 1 }))}
      </table>`
    : `<p style="color:${C.muted};font-size:13px;line-height:1.6">Google Search Console n'est pas encore connecté — la <strong>visibilité réelle</strong> (position, clics, impressions) n'est donc pas mesurée. Le score ci-dessus reflète uniquement la <strong>santé technique on-page</strong>. Connecte GSC pour débloquer le suivi de classement.</p>`;

  const visibilityLine =
    score.visibility !== null
      ? `<span style="color:${C.cyan}">Visibilité ${score.visibility}/100</span> &nbsp;·&nbsp; <span style="color:${C.indigo}">Santé ${score.health}/100</span>`
      : `<span style="color:${C.indigo}">Santé on-page ${score.health}/100</span> &nbsp;·&nbsp; <span style="color:${C.muted}">Visibilité : GSC non connecté</span>`;

  const html = `<!doctype html><html><body style="margin:0;background:${C.bg};padding:24px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <div style="max-width:600px;margin:0 auto">
    <div style="padding:0 24px 16px">
      <p style="color:${C.muted};font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin:0">Solutions 2IA · Rapport SEO ${modeLabel}</p>
      <p style="color:${C.text};font-size:14px;margin:4px 0 0">${periodLabel}</p>
    </div>

    <div style="background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:28px 24px;margin:0 16px">
      <div style="text-align:center;padding-bottom:20px">
        <div style="font-size:13px;color:${C.muted};text-transform:uppercase;letter-spacing:.08em">Score SEO global</div>
        <div style="font-size:64px;font-weight:800;color:${gradeColor};line-height:1.1;margin:6px 0">${score.global}<span style="font-size:28px;color:${C.muted}">/100</span></div>
        <div style="display:inline-block;background:${gradeColor};color:#0b0c14;font-weight:800;font-size:18px;border-radius:8px;padding:2px 12px">Note ${score.grade}</div>
        <div style="font-size:13px;margin-top:12px">${visibilityLine}</div>
      </div>

      <h3 style="color:${C.text};font-size:15px;margin:8px 0 0">📊 Performance Google${gsc ? "" : " (non disponible)"}</h3>
      ${metricsBlock}
    </div>

    ${
      gsc
        ? `<div style="background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:24px;margin:16px 16px 0">
            <h3 style="color:${C.text};font-size:15px;margin:0 0 12px">🔑 Top requêtes & évolution de position</h3>
            ${queriesTable(gsc)}
          </div>`
        : ""
    }

    <div style="background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:24px;margin:16px 16px 0">
      <h3 style="color:${C.text};font-size:15px;margin:0 0 12px">🩺 Santé on-page (${score.health}/100)</h3>
      ${healthChecklist(onpage)}
    </div>

    <p style="color:${C.muted};font-size:11px;text-align:center;margin:20px 16px 0;line-height:1.6">
      Rapport généré automatiquement chaque ${mode === "weekly" ? "lundi" : "1ᵉʳ du mois"} · solutions2ia.fr<br/>
      Score = 60% visibilité Google + 40% santé technique on-page.
    </p>
  </div>
</body></html>`;

  const text = [
    `Solutions 2IA — Rapport SEO ${modeLabel} (${periodLabel})`,
    ``,
    `SCORE GLOBAL : ${score.global}/100 (note ${score.grade})`,
    score.visibility !== null
      ? `Visibilité ${score.visibility}/100 · Santé ${score.health}/100`
      : `Santé on-page ${score.health}/100 · GSC non connecté`,
    ``,
    gsc
      ? [
          `Clics : ${fmt(gsc.current.clicks)} (préc. ${fmt(gsc.previous.clicks)})`,
          `Impressions : ${fmt(gsc.current.impressions)} (préc. ${fmt(gsc.previous.impressions)})`,
          `CTR : ${fmt(gsc.current.ctr * 100, 1)}%`,
          `Position moyenne : ${fmt(gsc.current.position, 1)} (préc. ${fmt(gsc.previous.position, 1)})`,
        ].join("\n")
      : `GSC non connecté — visibilité non mesurée.`,
  ].join("\n");

  const subject = `[SEO ${modeLabel}] Score ${score.global}/100 (${score.grade}) — Solutions 2IA`;

  return { subject, html, text };
}

export async function sendReport(data: ReportData): Promise<{
  emailSent: boolean;
  webhookSent: boolean;
}> {
  const { subject, html, text } = buildReportEmail(data);
  let emailSent = false;
  let webhookSent = false;

  const to = process.env.SEO_REPORT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (to && apiKey) {
    const from =
      process.env.SEO_REPORT_FROM ||
      "Solutions 2IA SEO <onboarding@resend.dev>";
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to: [to], subject, html, text });
    if (error) console.error("[seo-report] resend error:", error);
    else emailSent = true;
  }

  const webhook = process.env.SEO_REPORT_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `${subject}\n${data.score.visibility !== null ? `Visibilité ${data.score.visibility}` : "Santé"} · Santé ${data.score.health}`,
        }),
      });
      webhookSent = true;
    } catch (e) {
      console.error("[seo-report] webhook error:", e);
    }
  }

  return { emailSent, webhookSent };
}
