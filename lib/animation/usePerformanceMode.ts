"use client";

import { useEffect, useState } from "react";

interface PerformanceMode {
  mounted: boolean;
  isMobile: boolean;
  isCoarsePointer: boolean;
  prefersReducedMotion: boolean;
  isLowPowerDevice: boolean;
  saveData: boolean;
  slowConnection: boolean;
  /**
   * Reduit/désactive les animations pour respecter le réglage utilisateur
   * `prefers-reduced-motion` uniquement. N'inclut PAS le low-end : on veut garder
   * les animations de cartes et sections (motion JS = à la demande, gentil) même
   * sur PC modeste ou iPhone, seul le décor de fond se coupe.
   */
  shouldReduceMotion: boolean;
  /**
   * Mode dégradé global : désactive les effets coûteux (backdrop-blur, animations
   * CSS infinies, glow) sur low-end devices et reduced-motion. Propagé via
   * `<html data-perf="low">` pour des règles CSS globales.
   */
  shouldDegrade: boolean;
  /**
   * Cache les couches purement décoratives de fond (particles, orbs animés,
   * FluidMouseField, MouseParticles, dividers néons). Activé sur mobile, tactile,
   * low-end ou save-data — partout où le décor de fond est superflu et coûteux.
   * Les animations de contenu (cards, sections, scenes) ne sont PAS impactées.
   */
  shouldHideBackgroundDecor: boolean;
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

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>({
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
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    const read = () => {
      const nav = window.navigator as Nav;
      const isMobile = mobileQuery.matches;
      const isCoarsePointer = coarseQuery.matches;
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

      const prefersReducedMotion = motionQuery.matches;
      // shouldReduceMotion honore uniquement le réglage utilisateur — pas le low-end.
      // Permet aux animations cards/sections (motion JS à la demande) de tourner
      // même sur low-end / mobile, où seul le décor de fond se coupe.
      const shouldReduceMotion = prefersReducedMotion;
      // shouldDegrade : low-end ou reduced-motion → propage via data-perf CSS pour
      // couper backdrop-blur + animations CSS infinies (orb-breathe, etc.).
      const shouldDegrade = isLowPowerDevice || prefersReducedMotion;
      // shouldHideBackgroundDecor : large — vise tous les cas où le décor de fond
      // est coûteux ou superflu. Mobile/tactile inclus pour iPhone (FPS).
      const shouldHideBackgroundDecor =
        isMobile || isCoarsePointer || isLowPowerDevice || saveData || slowConnection || prefersReducedMotion;

      // Propage le mode dégradé via data-attribute global (CSS peut s'y conformer
      // sans nécessiter d'imports React).
      try {
        document.documentElement.setAttribute("data-perf", shouldDegrade ? "low" : "high");
      } catch {
        // SSR / iframe sandbox / autres environnements sans accès document : ignore.
      }

      setMode({
        mounted: true,
        isMobile,
        isCoarsePointer,
        prefersReducedMotion,
        isLowPowerDevice,
        saveData,
        slowConnection,
        shouldReduceMotion,
        shouldDegrade,
        shouldHideBackgroundDecor,
      });
    };

    read();
    motionQuery.addEventListener("change", read);
    mobileQuery.addEventListener("change", read);
    coarseQuery.addEventListener("change", read);

    return () => {
      motionQuery.removeEventListener("change", read);
      mobileQuery.removeEventListener("change", read);
      coarseQuery.removeEventListener("change", read);
    };
  }, []);

  return mode;
}
