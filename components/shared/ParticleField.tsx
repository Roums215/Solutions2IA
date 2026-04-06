"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

type ParticlePreset = "neural" | "electric" | "creative" | "minimal" | "data" | "organic";

interface ParticleFieldProps {
  preset?: ParticlePreset;
  count?: number;
  className?: string;
}

const presetConfig: Record<ParticlePreset, {
  colors: string[];
  sizeRange: [number, number];
  speedRange: [number, number];
  shapes: ("circle" | "square" | "diamond")[];
  glow: boolean;
  drift: number;
}> = {
  neural: {
    colors: ["rgba(129,140,248,0.35)", "rgba(34,211,238,0.25)", "rgba(129,140,248,0.2)", "rgba(165,180,252,0.3)"],
    sizeRange: [2, 5],
    speedRange: [4, 8],
    shapes: ["circle", "circle", "diamond"],
    glow: true,
    drift: 8,
  },
  electric: {
    colors: ["rgba(34,211,238,0.45)", "rgba(99,102,241,0.3)", "rgba(34,211,238,0.2)", "rgba(74,222,128,0.2)"],
    sizeRange: [1, 4],
    speedRange: [2, 5],
    shapes: ["circle", "square", "circle"],
    glow: true,
    drift: 12,
  },
  creative: {
    colors: ["rgba(129,140,248,0.3)", "rgba(34,211,238,0.25)", "rgba(74,222,128,0.2)", "rgba(250,204,21,0.15)", "rgba(248,113,113,0.12)"],
    sizeRange: [2, 6],
    speedRange: [5, 10],
    shapes: ["circle", "square", "diamond"],
    glow: false,
    drift: 10,
  },
  minimal: {
    colors: ["rgba(129,140,248,0.15)", "rgba(255,255,255,0.06)"],
    sizeRange: [1, 3],
    speedRange: [6, 12],
    shapes: ["circle"],
    glow: false,
    drift: 5,
  },
  data: {
    colors: ["rgba(34,211,238,0.3)", "rgba(129,140,248,0.25)", "rgba(74,222,128,0.2)"],
    sizeRange: [1, 3],
    speedRange: [3, 6],
    shapes: ["square", "circle", "square"],
    glow: true,
    drift: 15,
  },
  organic: {
    colors: ["rgba(129,140,248,0.2)", "rgba(34,211,238,0.15)", "rgba(255,255,255,0.04)"],
    sizeRange: [3, 8],
    speedRange: [8, 14],
    shapes: ["circle"],
    glow: false,
    drift: 6,
  },
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export function ParticleField({ preset = "minimal", count = 30, className }: ParticleFieldProps) {
  const config = presetConfig[preset];

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r = (s: number) => seededRandom(i * 100 + s);
      const color = config.colors[Math.floor(r(1) * config.colors.length)];
      const size = config.sizeRange[0] + r(2) * (config.sizeRange[1] - config.sizeRange[0]);
      const speed = config.speedRange[0] + r(3) * (config.speedRange[1] - config.speedRange[0]);
      const shape = config.shapes[Math.floor(r(4) * config.shapes.length)];
      const x = r(5) * 100;
      const y = r(6) * 100;
      const delay = r(7) * 4;
      const driftX = (r(8) - 0.5) * 2 * config.drift;
      const driftY = -(r(9) * config.drift + 4);

      return { color, size, speed, shape, x, y, delay, driftX, driftY, glow: config.glow };
    });
  }, [config, count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ""}`}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "diamond" ? "2px" : "1px",
            transform: p.shape === "diamond" ? "rotate(45deg)" : undefined,
            boxShadow: p.glow ? `0 0 ${p.size * 2}px ${p.color}` : undefined,
          }}
          animate={{
            y: [0, p.driftY, 0],
            x: [0, p.driftX, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: p.shape === "diamond" ? [0.8, 1.2, 0.8] : undefined,
          }}
          transition={{
            duration: p.speed,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
