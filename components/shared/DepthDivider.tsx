"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

type DividerPreset = "glow" | "circuit" | "wave" | "neural" | "fade";

interface DepthDividerProps {
  preset?: DividerPreset;
  /** Color blend at top - "primary" | "secondary" */
  fromBg?: "primary" | "secondary";
  /** Color blend at bottom - "primary" | "secondary" */
  toBg?: "primary" | "secondary";
}

// Actual RGB values from globals.css
const bgColors = {
  primary: { r: 5, g: 6, b: 11 },    // #05060b
  secondary: { r: 11, g: 13, b: 22 }, // #0b0d16
};

const presetConfig: Record<
  DividerPreset,
  {
    primary: string;
    secondary: string;
    halo: string;
    core: string;
    height: string;
    duration: number;
  }
> = {
  glow: {
    primary: "rgba(129, 140, 248, 0.38)",
    secondary: "rgba(34, 211, 238, 0.28)",
    halo: "radial-gradient(ellipse at center, rgba(99,102,241,0.1) 0%, rgba(34,211,238,0.045) 42%, transparent 78%)",
    core: "rgba(236, 254, 255, 0.5)",
    height: "h-20 lg:h-28",
    duration: 7.4,
  },
  wave: {
    primary: "rgba(129, 140, 248, 0.42)",
    secondary: "rgba(34, 211, 238, 0.32)",
    halo: "radial-gradient(ellipse at center, rgba(99,102,241,0.11) 0%, rgba(34,211,238,0.05) 42%, transparent 80%)",
    core: "rgba(240, 253, 250, 0.52)",
    height: "h-20 lg:h-28",
    duration: 7,
  },
  circuit: {
    primary: "rgba(34, 211, 238, 0.42)",
    secondary: "rgba(129, 140, 248, 0.3)",
    halo: "radial-gradient(ellipse at center, rgba(34,211,238,0.1) 0%, rgba(99,102,241,0.045) 44%, transparent 80%)",
    core: "rgba(236, 254, 255, 0.52)",
    height: "h-20 lg:h-28",
    duration: 6.8,
  },
  neural: {
    primary: "rgba(129, 140, 248, 0.38)",
    secondary: "rgba(165, 180, 252, 0.28)",
    halo: "radial-gradient(ellipse at center, rgba(129,140,248,0.09) 0%, rgba(99,102,241,0.045) 44%, transparent 80%)",
    core: "rgba(238, 242, 255, 0.5)",
    height: "h-20 lg:h-28",
    duration: 7.8,
  },
  fade: {
    primary: "rgba(99, 102, 241, 0.28)",
    secondary: "rgba(34, 211, 238, 0.2)",
    halo: "radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, rgba(34,211,238,0.035) 44%, transparent 82%)",
    core: "rgba(224, 231, 255, 0.42)",
    height: "h-18 lg:h-24",
    duration: 8.2,
  },
};

function rgba(color: { r: number; g: number; b: number }, alpha: number) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

export function DepthDivider({ preset = "glow", fromBg = "primary", toBg = "primary" }: DepthDividerProps) {
  const config = presetConfig[preset];
  const topColor = bgColors[fromBg];
  const bottomColor = bgColors[toBg];
  const { shouldHideBackgroundDecor } = usePerformanceMode();

  // Décor de fond caché : un simple <hr> aux couleurs des sections, sans glow.
  if (shouldHideBackgroundDecor) {
    return (
      <div
        className="relative h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${topColor.r},${topColor.g},${topColor.b},0.5), transparent)`,
        }}
        aria-hidden
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${config.height}`}>
      {/* Seamless gradient blend from top section to bottom section */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            ${rgba(topColor, 1)} 0%,
            ${rgba(topColor, 0.95)} 5%,
            ${rgba(topColor, 0.7)} 15%,
            ${rgba(topColor, 0.4)} 25%,
            ${rgba(topColor, 0.15)} 35%,
            transparent 45%,
            transparent 55%,
            ${rgba(bottomColor, 0.15)} 65%,
            ${rgba(bottomColor, 0.4)} 75%,
            ${rgba(bottomColor, 0.7)} 85%,
            ${rgba(bottomColor, 0.95)} 95%,
            ${rgba(bottomColor, 1)} 100%
          )`,
        }}
      />

      {/* Halo glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-24 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: config.halo }}
        animate={{
          opacity: [0.28, 0.48, 0.28],
          scaleX: [0.96, 1.04, 0.96],
          scaleY: [0.98, 1.06, 0.98],
        }}
        transition={{ duration: config.duration, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Wide glow band */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-12 w-[50rem] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${config.primary} 28%, ${config.secondary} 50%, ${config.primary} 72%, transparent 100%)`,
        }}
        animate={{ opacity: [0.12, 0.24, 0.12], scaleX: [0.98, 1.03, 0.98] }}
        transition={{ duration: config.duration * 0.92, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central ellipse glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-14 w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[44px]"
        style={{
          background: `radial-gradient(ellipse at center, ${config.secondary} 0%, ${config.primary} 40%, transparent 75%)`,
        }}
        animate={{ opacity: [0.14, 0.28, 0.14], scaleX: [0.94, 1.08, 0.94], scaleY: [0.94, 1.04, 0.94] }}
        transition={{ duration: config.duration * 0.78, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main neon line */}
      <div
        className="absolute left-1/2 top-1/2 h-px w-[68rem] max-w-[104vw] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 12%, ${config.primary} 35%, ${config.core} 50%, ${config.secondary} 65%, rgba(255,255,255,0.06) 88%, transparent 100%)`,
          boxShadow: `0 0 6px ${config.primary}, 0 0 14px ${config.secondary}`,
        }}
      />

      {/* Bright core glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[3px] w-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[0.5px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${config.secondary} 20%, ${config.core} 50%, ${config.secondary} 80%, transparent 100%)`,
          boxShadow: `0 0 10px ${config.secondary}, 0 0 26px ${config.primary}`,
        }}
        animate={{ opacity: [0.36, 0.64, 0.36], scaleX: [0.96, 1.1, 0.96] }}
        transition={{ duration: config.duration * 0.72, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft core halo */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-10 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
        style={{
          background: `radial-gradient(ellipse at center, ${config.core} 0%, ${config.secondary} 40%, transparent 75%)`,
        }}
        animate={{ opacity: [0.18, 0.38, 0.18], scaleX: [0.94, 1.08, 0.94], scaleY: [0.94, 1.04, 0.94] }}
        transition={{ duration: config.duration * 0.68, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Traveling shimmer */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-6 w-32 -translate-y-1/2 rounded-full blur-lg"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 85%, transparent 100%)",
        }}
        animate={{ x: ["-28rem", "28rem"], opacity: [0, 0.28, 0] }}
        transition={{ duration: config.duration * 1.65, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
