"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

type Style = "dots" | "grid-dots" | "crosses" | "hexagons" | "sparks" | "bubbles" | "code-rain" | "circuit-nodes";

interface SectionParticlesProps {
  style?: Style;
  count?: number;
  color?: string;
  secondaryColor?: string;
  className?: string;
}

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export function SectionParticles({
  style = "dots",
  count = 20,
  color = "rgba(129,140,248,0.2)",
  secondaryColor = "rgba(34,211,238,0.15)",
  className,
}: SectionParticlesProps) {
  const [mounted, setMounted] = useState(false);
  const { isMobile, shouldReduceMotion } = usePerformanceMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveCount = shouldReduceMotion ? 0 : isMobile ? Math.min(count, 4) : Math.min(count, 10);

  const items = useMemo(() => {
    return Array.from({ length: effectiveCount }, (_, i) => {
      const r = (s: number) => seeded(i * 100 + s);
      return {
        x: r(1) * 100,
        y: r(2) * 100,
        size: 2 + r(3) * 4,
        delay: r(4) * 5,
        duration: 4 + r(5) * 6,
        useSecondary: r(6) > 0.5,
        rotation: r(7) * 360,
        drift: (r(8) - 0.5) * 16,
      };
    });
  }, [effectiveCount]);

  // Don't render on server to avoid hydration mismatch
  if (!mounted || shouldReduceMotion) {
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ""}`} />;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ""}`}>
      {items.map((p, i) => {
        const c = p.useSecondary ? secondaryColor : color;

        if (isMobile) {
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: Math.max(2, p.size * 0.8),
                height: Math.max(2, p.size * 0.8),
                background: c,
                opacity: 0.18,
              }}
            />
          );
        }

        if (style === "crosses") {
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              animate={{ opacity: [0.1, 0.4, 0.1], rotate: [p.rotation, p.rotation + 90, p.rotation] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width={p.size * 2} height={p.size * 2} viewBox="0 0 12 12">
                <line x1="6" y1="2" x2="6" y2="10" stroke={c} strokeWidth="0.8" />
                <line x1="2" y1="6" x2="10" y2="6" stroke={c} strokeWidth="0.8" />
              </svg>
            </motion.div>
          );
        }

        if (style === "hexagons") {
          const s = p.size * 1.5;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              animate={{ opacity: [0.05, 0.2, 0.05], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width={s * 2} height={s * 2} viewBox="0 0 24 24">
                <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="none" stroke={c} strokeWidth="0.6" />
              </svg>
            </motion.div>
          );
        }

        if (style === "sparks") {
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size * 0.6,
                height: p.size * 0.6,
                background: c,
                boxShadow: `0 0 ${p.size * 2}px ${c}`,
              }}
              animate={{
                y: [0, p.drift * 2, 0],
                x: [0, -p.drift, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{ duration: p.duration * 0.6, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        }

        if (style === "bubbles") {
          return (
            <motion.div
              key={i}
              className="absolute rounded-full border"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size * 2,
                height: p.size * 2,
                borderColor: c,
              }}
              animate={{ y: [0, -20 - p.drift, 0], opacity: [0.05, 0.25, 0.05], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        }

        if (style === "code-rain") {
          const chars = ["0", "1", "{", "}", "<", ">", "/", "=", ";", "→"];
          const ch = chars[Math.floor(seeded(i * 33) * chars.length)];
          return (
            <motion.div
              key={i}
              className="absolute font-mono select-none"
              style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: 8 + p.size, color: c }}
              animate={{ y: [0, 30], opacity: [0, 0.35, 0] }}
              transition={{ duration: p.duration * 0.5, delay: p.delay, repeat: Infinity, ease: "easeIn" }}
            >
              {ch}
            </motion.div>
          );
        }

        if (style === "circuit-nodes") {
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              animate={{ opacity: [0.05, 0.3, 0.05] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
            >
              <svg width={p.size * 3} height={p.size * 3} viewBox="0 0 16 16">
                <rect x="5" y="5" width="6" height="6" rx="1" fill="none" stroke={c} strokeWidth="0.6" />
                <line x1="8" y1="0" x2="8" y2="5" stroke={c} strokeWidth="0.4" />
                <line x1="8" y1="11" x2="8" y2="16" stroke={c} strokeWidth="0.4" />
                <line x1="0" y1="8" x2="5" y2="8" stroke={c} strokeWidth="0.4" />
                <line x1="11" y1="8" x2="16" y2="8" stroke={c} strokeWidth="0.4" />
              </svg>
            </motion.div>
          );
        }

        if (style === "grid-dots") {
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: 3, height: 3, background: c }}
              animate={{ opacity: [0.08, 0.3, 0.08] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
            />
          );
        }

        // Default: dots
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: c,
            }}
            animate={{ y: [0, p.drift, 0], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
