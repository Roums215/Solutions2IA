"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils/cn";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Couleur du spotlight (rgb sans alpha) */
  glow?: string;
  /** Tilt 3D max en degrés */
  tilt?: number;
  /** Halo central derrière le contenu */
  pulse?: boolean;
}

/**
 * Carte avec spotlight qui suit la souris + tilt 3D subtil + bordure conique animée.
 * Tout est driven par useMotionValue → 0 re-render React, GPU only.
 */
export function SpotlightCard({
  children,
  className,
  glow = "129,140,248",
  tilt = 6,
  pulse = false,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const rx = useSpring(0, { stiffness: 220, damping: 22 });
  const ry = useSpring(0, { stiffness: 220, damping: 22 });

  const background = useMotionTemplate`radial-gradient(380px circle at ${mouseX}% ${mouseY}%, rgba(${glow},0.18), transparent 55%)`;
  const borderBg = useMotionTemplate`radial-gradient(220px circle at ${mouseX}% ${mouseY}%, rgba(${glow},0.55), transparent 60%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouseX.set(px * 100);
    mouseY.set(py * 100);
    ry.set((px - 0.5) * tilt);
    rx.set(-(py - 0.5) * tilt);
  }

  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn(
        "group relative h-full rounded-2xl border border-border-subtle bg-bg-card transition-colors duration-500 hover:border-border-accent",
        "[transform-style:preserve-3d]",
        className
      )}
    >
      {/* Bordure conique réactive */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: borderBg,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />

      {/* Spotlight intérieur */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Halo statique pulsant (optionnel) */}
      {pulse && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, rgba(${glow},0.08), transparent 60%)`,
          }}
        />
      )}

      {/* Liseré supérieur */}
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${glow},0.4), transparent)`,
        }}
      />

      <div className="relative z-10 h-full" style={{ transform: "translateZ(0)" }}>
        {children}
      </div>
    </motion.div>
  );
}
