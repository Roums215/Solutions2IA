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
  /** Reduit/désactive les animations pour respecter le réglage utilisateur. */
  shouldReduceMotion: boolean;
  /**
   * Mode dégradé global : désactive les effets coûteux (3D, particles, blur, scènes
   * animées) sur les low-end devices, save-data et réseaux lents. Aussi propagé via
   * `<html data-perf="low">` pour des règles CSS globales.
   */
  shouldDegrade: boolean;
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
      const shouldDegrade = isLowPowerDevice || prefersReducedMotion;
      // En low-end, on coupe aussi les animations motion (boost FPS direct).
      // Les composants qui honorent déjà shouldReduceMotion (scènes,
      // FluidMouseField, etc.) bénéficient automatiquement de la dégradation.
      const shouldReduceMotion = prefersReducedMotion || isLowPowerDevice;

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
