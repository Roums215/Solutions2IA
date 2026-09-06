"use client";

import { useSyncExternalStore } from "react";

/* ────────────────────────────────────────────────────────────────────────────
 * Socle performance adaptatif — store singleton.
 *
 * Pourquoi un store module-level (et pas 47 hooks indépendants) :
 *  - un seul jeu de listeners matchMedia pour tout le site ;
 *  - un seul writer de <html data-perf="…"> (sinon un consommateur "stale"
 *    écraserait le tier rétrogradé par le FPS guard) ;
 *  - le FPS guard (code non-React, voir fpsGuard.ts) peut muter le tier.
 *
 * Tiers :
 *  - 'full'    : expérience complète (desktop correct).
 *  - 'reduced' : décor de fond coupé, parallax/tilt off, boucles infinies
 *                décoratives off — MAIS les reveals de cartes/sections restent
 *                (intention du commit 4ecd29e : iPhone garde les anims cartes).
 *  - 'minimal' : fonds statiques, posters, animations de contenu coupées
 *                (reduced-motion utilisateur, save-data, ou FPS effondré).
 * ──────────────────────────────────────────────────────────────────────────── */

export type PerfTier = "full" | "reduced" | "minimal";

export interface PerformanceMode {
  mounted: boolean;
  isMobile: boolean;
  isCoarsePointer: boolean;
  prefersReducedMotion: boolean;
  isLowPowerDevice: boolean;
  saveData: boolean;
  slowConnection: boolean;
  /**
   * Réglage utilisateur `prefers-reduced-motion` UNIQUEMENT. N'inclut PAS le
   * low-end : les reveals de cartes (motion JS à la demande) restent actifs
   * sur PC modeste / iPhone, seul le décor se coupe (intention 4ecd29e).
   */
  shouldReduceMotion: boolean;
  /** Dérivé : tier !== 'full'. (Ancienne sémantique low-end ∨ reduced-motion.) */
  shouldDegrade: boolean;
  /**
   * Cache les couches purement décoratives de fond (particles, orbs animés,
   * dividers néons). Dérivé : tier !== 'full'
   * — table de vérité identique à l'ancienne en statique, et s'étend
   * automatiquement quand le FPS guard rétrograde.
   */
  shouldHideBackgroundDecor: boolean;
  /** Tier de performance courant — voir doc en tête de fichier. */
  tier: PerfTier;
  /** true si le garde FPS a rétrogradé le tier pendant cette session. */
  fpsDowngraded: boolean;
  /**
   * prefersReducedMotion ∨ tier === 'minimal'. Cible des `staticRender` de
   * sections : quand true, rendre l'état FINAL statique et lisible.
   * Mobile seul n'implique JAMAIS disableContentMotion (régression iPhone).
   */
  disableContentMotion: boolean;
}

type Nav = Navigator & {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
};

const SLOW_EFFECTIVE_TYPES = new Set(["slow-2g", "2g", "3g"]);
const TIER_RANK: Record<PerfTier, number> = { full: 0, reduced: 1, minimal: 2 };

export const FPS_TIER_STORAGE_KEY = "s2ia-fps-tier";

/** Le plus dégradé des deux (ratchet : on ne remonte jamais). */
function worstTier(a: PerfTier, b: PerfTier): PerfTier {
  return TIER_RANK[a] >= TIER_RANK[b] ? a : b;
}

const SERVER_SNAPSHOT: PerformanceMode = {
  mounted: false,
  isMobile: false,
  isCoarsePointer: false,
  prefersReducedMotion: false,
  isLowPowerDevice: false,
  saveData: false,
  slowConnection: false,
  shouldReduceMotion: false,
  shouldDegrade: false,
  shouldHideBackgroundDecor: false,
  tier: "full",
  fpsDowngraded: false,
  disableContentMotion: false,
};

/* ─── Store interne ───────────────────────────────────────────────────────── */

let snapshot: PerformanceMode = SERVER_SNAPSHOT;
let fpsTier: PerfTier = "full"; // muté par le FPS guard via setFpsTier()
let fpsDowngradedThisSession = false;
let initialized = false;
const listeners = new Set<() => void>();

let motionQuery: MediaQueryList | null = null;
let mobileQuery: MediaQueryList | null = null;
let coarseQuery: MediaQueryList | null = null;

function applyTierToDom(tier: PerfTier) {
  try {
    document.documentElement.setAttribute("data-perf", tier);
  } catch {
    // SSR / iframe sandbox : ignore.
  }
}

function readSessionFpsTier(): PerfTier {
  try {
    const stored = sessionStorage.getItem(FPS_TIER_STORAGE_KEY);
    if (stored === "reduced" || stored === "minimal") return stored;
  } catch {
    // Navigation privée Safari : sessionStorage peut throw.
  }
  return "full";
}

function recompute() {
  if (typeof window === "undefined") return;
  const nav = window.navigator as Nav;

  const isMobile = mobileQuery?.matches ?? false;
  const isCoarsePointer = coarseQuery?.matches ?? false;
  const prefersReducedMotion = motionQuery?.matches ?? false;

  const memory = typeof nav.deviceMemory === "number" ? nav.deviceMemory : null;
  const cores =
    typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : null;
  const saveData = nav.connection?.saveData === true;
  const effective = nav.connection?.effectiveType ?? "";
  const slowConnection = SLOW_EFFECTIVE_TYPES.has(effective);

  // Seuil large : épargne tous les PC "un peu vieillots" + tablettes data-saver.
  const isLowPowerDevice =
    (memory !== null && memory <= 4) ||
    (cores !== null && cores <= 4) ||
    saveData ||
    slowConnection;

  // Tier statique : reduced-motion/saveData/slow → minimal ;
  // low-end/mobile/tactile → AU MOINS reduced (exigence brief).
  const staticTier: PerfTier =
    prefersReducedMotion || saveData || slowConnection
      ? "minimal"
      : isLowPowerDevice || isMobile || isCoarsePointer
        ? "reduced"
        : "full";

  const tier = worstTier(staticTier, fpsTier);

  const shouldReduceMotion = prefersReducedMotion;
  const decorOff = tier !== "full";
  const disableContentMotion = prefersReducedMotion || tier === "minimal";

  applyTierToDom(tier);

  snapshot = {
    mounted: true,
    isMobile,
    isCoarsePointer,
    prefersReducedMotion,
    isLowPowerDevice,
    saveData,
    slowConnection,
    shouldReduceMotion,
    shouldDegrade: decorOff,
    shouldHideBackgroundDecor: decorOff,
    tier,
    fpsDowngraded: fpsDowngradedThisSession,
    disableContentMotion,
  };

  listeners.forEach((l) => l());
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mobileQuery = window.matchMedia("(max-width: 767px)");
  coarseQuery = window.matchMedia("(pointer: coarse)");

  // Tier FPS persisté (reload pendant la même session d'onglet).
  fpsTier = readSessionFpsTier();
  if (fpsTier !== "full") fpsDowngradedThisSession = true;

  motionQuery.addEventListener("change", recompute);
  mobileQuery.addEventListener("change", recompute);
  coarseQuery.addEventListener("change", recompute);

  recompute();
}

function subscribe(listener: () => void): () => void {
  init();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): PerformanceMode {
  return snapshot;
}

function getServerSnapshot(): PerformanceMode {
  return SERVER_SNAPSHOT;
}

/* ─── API publique ────────────────────────────────────────────────────────── */

/**
 * Hook de lecture du mode performance. API rétrocompatible : tous les flags
 * historiques sont conservés, enrichis de `tier` / `disableContentMotion`.
 */
export function usePerformanceMode(): PerformanceMode {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Appelé par le FPS guard (fpsGuard.ts) pour rétrograder le tier.
 * Ratchet : seules les rétrogradations sont acceptées.
 */
export function setFpsTier(next: PerfTier) {
  if (TIER_RANK[next] <= TIER_RANK[fpsTier]) return;
  fpsTier = next;
  fpsDowngradedThisSession = true;
  try {
    sessionStorage.setItem(FPS_TIER_STORAGE_KEY, next);
  } catch {
    // sessionStorage indisponible : le ratchet reste en mémoire.
  }
  recompute();
}

/** Tier courant (lecture hors React, ex. fpsGuard). */
export function getCurrentTier(): PerfTier {
  return snapshot.tier;
}
