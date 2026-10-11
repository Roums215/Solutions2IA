"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  /** `dark` : verre liquide sur le site sombre · `light` : verre givré sur une section claire. */
  tone?: "dark" | "light";
  /** Reflet qui suit le pointeur (souris seulement, tier full seulement). */
  sheen?: boolean;
}

/**
 * Panneau de verre « bulle » (refonte /services, octobre 2026). La matière vient de
 * `.glass-liquid` / `.glass-frost` (app/globals.css) : flou, reflet, liseré spéculaire, et
 * repli opaque en tier reduced et minimal. Ici, seulement le reflet qui suit le pointeur,
 * en useMotionValue (aucun re-rendu). Pas de tilt : la carte signature reste SpotlightCard.
 *
 * Le panneau ne pose ni rayon ni marge : la carte qui l'utilise garde les siens.
 */
export function GlassPanel({ children, className, tone = "dark", sheen = true }: GlassPanelProps) {
  const { tier } = usePerformanceMode();
  const enabled = sheen && tier === "full";
  const x = useMotionValue(30);
  const y = useMotionValue(0);
  const light = tone === "dark" ? "var(--color-paper) 11%" : "var(--color-paper) 70%";
  const background = useMotionTemplate`radial-gradient(420px circle at ${x}% ${y}%, color-mix(in oklab, ${light}, transparent), transparent 60%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!enabled || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width) * 100);
    y.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <div onPointerMove={enabled ? onMove : undefined} className={cn(tone === "dark" ? "glass-liquid" : "glass-frost", "group/glass", className)}>
      {enabled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/glass:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
