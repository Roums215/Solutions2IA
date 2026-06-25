/**
 * Calcul du SCORE SEO — formules transparentes et documentées.
 *
 * Deux composantes :
 *   • Visibilité (depuis GSC)  — où on se classe réellement sur Google.
 *   • Santé on-page (live)     — qualité technique SEO du site.
 *
 * Score global = 60% visibilité + 40% santé quand GSC est branché.
 * Sans GSC : 100% santé (et on signale que la visibilité n'est pas mesurée).
 */

import type { GscReport } from "./gsc";
import type { OnPageReport } from "./onpage";

export type Grade = "A" | "B" | "C" | "D" | "E";

export type ScoreBreakdown = {
  global: number;
  grade: Grade;
  visibility: number | null; // null si GSC absent
  health: number;
  components: {
    position: number | null;
    ctr: number | null;
    reach: number | null;
    clicks: number | null;
  };
};

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

/** Position moyenne → score. 1–3 = 100, 10 = 50, ≥30 = 0 (linéaire par paliers). */
function positionScore(position: number): number {
  if (position <= 0) return 0; // aucune impression
  if (position <= 3) return 100;
  if (position <= 10) return clamp(100 - ((position - 3) / 7) * 50); // 3→100, 10→50
  if (position <= 30) return clamp(50 - ((position - 10) / 20) * 50); // 10→50, 30→0
  return 0;
}

/** CTR → score. 5%+ = 100, linéaire. */
function ctrScore(ctr: number): number {
  return clamp((ctr / 0.05) * 100);
}

/** Reach (impressions) log-scalé : ~10 000 impressions/période ≈ 100. */
function reachScore(impressions: number): number {
  if (impressions <= 0) return 0;
  return clamp((Math.log10(impressions + 1) / Math.log10(10000)) * 100);
}

/** Clics log-scalé : ~500 clics/période ≈ 100. */
function clicksScore(clicks: number): number {
  if (clicks <= 0) return 0;
  return clamp((Math.log10(clicks + 1) / Math.log10(500)) * 100);
}

function toGrade(score: number): Grade {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "E";
}

export function computeScore(
  gsc: GscReport | null,
  onpage: OnPageReport,
): ScoreBreakdown {
  const health = onpage.score;

  if (!gsc) {
    return {
      global: health,
      grade: toGrade(health),
      visibility: null,
      health,
      components: { position: null, ctr: null, reach: null, clicks: null },
    };
  }

  const c = gsc.current;
  const position = positionScore(c.position);
  const ctr = ctrScore(c.ctr);
  const reach = reachScore(c.impressions);
  const clicks = clicksScore(c.clicks);

  // Visibilité = 50% position + 20% CTR + 15% reach + 15% clics.
  const visibility = Math.round(
    position * 0.5 + ctr * 0.2 + reach * 0.15 + clicks * 0.15,
  );

  const global = Math.round(visibility * 0.6 + health * 0.4);

  return {
    global,
    grade: toGrade(global),
    visibility,
    health,
    components: {
      position: Math.round(position),
      ctr: Math.round(ctr),
      reach: Math.round(reach),
      clicks: Math.round(clicks),
    },
  };
}

/** Variation en % entre deux valeurs (gère la division par zéro). */
export function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}
