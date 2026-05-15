"use client";

import { useEffect, useState } from "react";

interface PerformanceMode {
  mounted: boolean;
  isMobile: boolean;
  isCoarsePointer: boolean;
  prefersReducedMotion: boolean;
  isLowPowerDevice: boolean;
  shouldReduceMotion: boolean;
}

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>({
    mounted: false,
    isMobile: false,
    isCoarsePointer: false,
    prefersReducedMotion: false,
    isLowPowerDevice: false,
    shouldReduceMotion: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    const read = () => {
      const nav = window.navigator as Navigator & {
        deviceMemory?: number;
        hardwareConcurrency?: number;
      };
      const isMobile = mobileQuery.matches;
      const isCoarsePointer = coarseQuery.matches;
      const isLowPowerDevice =
        (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 3) ||
        (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2);

      setMode({
        mounted: true,
        isMobile,
        isCoarsePointer,
        prefersReducedMotion: motionQuery.matches,
        isLowPowerDevice,
        shouldReduceMotion: motionQuery.matches,
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
