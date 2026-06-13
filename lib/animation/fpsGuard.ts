"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * Garde FPS runtime — rétrograde automatiquement le tier de performance
 * quand le framerate réel s'effondre (PC d'entrée de gamme non détecté par
 * les heuristiques statiques deviceMemory/hardwareConcurrency).
 *
 * Principes :
 *  - échantillonnage rAF par fenêtres de ~1 s ;
 *  - CALIBRATION : les 2 premières fenêtres valides estiment le refresh rate
 *    réel (écran 30 Hz → rAF plafonné à 30 fps : sans calibration, downgrade
 *    systématique à tort). Seuil effectif = min(40, 0.66 × refresh estimé) ;
 *  - fenêtre INVALIDÉE (ni bonne ni mauvaise) si l'onglet est caché ou si la
 *    fenêtre a été throttlée (elapsed > 1.5 s) ;
 *  - 3 fenêtres consécutives sous le seuil → downgrade d'UN cran
 *    (full → reduced → minimal), avec cooldown de 2 s après chaque downgrade
 *    (le re-render de dégradation cause lui-même un dip — on ne le compte pas) ;
 *  - RATCHET : jamais d'upgrade en session (anti yo-yo). Persisté en
 *    sessionStorage → survit au reload, expire à la fermeture de l'onglet ;
 *  - arrêt définitif à 'minimal' (plus rien à rétrograder) ;
 *  - actif en production uniquement (StrictMode/HMR faussent la mesure en dev) ;
 *    forçable en dev via ?fpsguard=1.
 * ──────────────────────────────────────────────────────────────────────────── */

import { getCurrentTier, setFpsTier, type PerfTier } from "./usePerformanceMode";

const WINDOW_MS = 1000;
const THROTTLED_WINDOW_MS = 1500;
const STARTUP_DELAY_MS = 2500;
const COOLDOWN_MS = 2000;
const BAD_STREAK_TO_DOWNGRADE = 3;
const ABSOLUTE_THRESHOLD_FPS = 40;
const RELATIVE_THRESHOLD_RATIO = 0.66;
const CALIBRATION_WINDOWS = 2;

let started = false;
let rafId: number | null = null;

function nextTierDown(tier: PerfTier): PerfTier | null {
  if (tier === "full") return "reduced";
  if (tier === "reduced") return "minimal";
  return null;
}

function guardAllowed(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV === "production") return true;
  try {
    return new URLSearchParams(window.location.search).has("fpsguard");
  } catch {
    return false;
  }
}

/**
 * Démarre la mesure FPS. Idempotent (un seul démarrage par session, même en
 * StrictMode double-effect). À appeler quand le LoadingScreen est terminé.
 */
export function startFpsGuard() {
  if (started || !guardAllowed()) return;
  if (getCurrentTier() === "minimal") return; // plus rien à rétrograder
  started = true;

  let frames = 0;
  let windowStart = 0;
  let windowInvalid = false;
  let badStreak = 0;
  let calibrationLeft = CALIBRATION_WINDOWS;
  let refreshEstimate = 0; // max des fps observés pendant la calibration
  let cooldownUntil = 0;
  let startedAt = 0;

  const onVisibility = () => {
    // La fenêtre en cours a été interrompue : on la jette.
    windowInvalid = true;
  };
  document.addEventListener("visibilitychange", onVisibility);

  const stop = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
    document.removeEventListener("visibilitychange", onVisibility);
  };

  const tick = (now: number) => {
    if (startedAt === 0) {
      startedAt = now;
      windowStart = now;
    }

    // Warm-up : on laisse passer l'hydration et la transition initiale.
    if (now - startedAt < STARTUP_DELAY_MS) {
      windowStart = now;
      frames = 0;
      rafId = requestAnimationFrame(tick);
      return;
    }

    frames++;
    const elapsed = now - windowStart;

    if (elapsed >= WINDOW_MS) {
      const invalid =
        windowInvalid || document.hidden || elapsed > THROTTLED_WINDOW_MS;
      const fps = (frames * 1000) / elapsed;

      if (!invalid) {
        if (calibrationLeft > 0) {
          // Les premières fenêtres servent uniquement à estimer le refresh.
          refreshEstimate = Math.max(refreshEstimate, fps);
          calibrationLeft--;
          if (calibrationLeft === 0) {
            // Snap au palier standard supérieur (tolérance jitter 10 %) :
            // un 60 Hz qui rame à 35 fps ne doit pas être pris pour un 30 Hz sain.
            refreshEstimate =
              [30, 60, 90, 120, 144].find((r) => refreshEstimate <= r * 1.1) ?? 144;
          }
        } else if (now >= cooldownUntil) {
          const threshold = Math.min(
            ABSOLUTE_THRESHOLD_FPS,
            RELATIVE_THRESHOLD_RATIO * (refreshEstimate || 60),
          );

          if (fps < threshold) {
            badStreak++;
            if (badStreak >= BAD_STREAK_TO_DOWNGRADE) {
              const next = nextTierDown(getCurrentTier());
              if (next) {
                setFpsTier(next);
                cooldownUntil = now + COOLDOWN_MS;
                badStreak = 0;
                if (next === "minimal") {
                  stop();
                  return;
                }
              } else {
                stop();
                return;
              }
            }
          } else {
            badStreak = 0;
          }
        }
      }

      frames = 0;
      windowStart = now;
      windowInvalid = false;
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);
}
