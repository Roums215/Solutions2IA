"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

type Preset = "home" | "services" | "web" | "apps" | "ai" | "automation" | "studio" | "about" | "contact";

interface PageAtmosphereProps {
  preset: Preset;
}

function GlowOrb({ x, y, size, color, delay = 0, duration = 8 }: {
  x: string; y: string; size: number; color: "accent" | "cyan" | "mixed"; delay?: number; duration?: number;
}) {
  const bg = color === "accent"
    ? "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)"
    : color === "cyan"
    ? "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(129,140,248,0.08) 0%, rgba(34,211,238,0.04) 40%, transparent 70%)";

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: bg, transform: "translate(-50%, -50%)" }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function FloatingLine({ x1, y1, x2, y2, color, delay = 0 }: {
  x1: string; y1: string; x2: string; y2: string; color: string; delay?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x1, top: y1, width: x2, height: "1px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }}
      animate={{ opacity: [0, 0.15, 0] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function PageAtmosphere({ preset }: PageAtmosphereProps) {
  const { isMobile, shouldReduceMotion } = usePerformanceMode();

  if (isMobile || shouldReduceMotion) {
    const animate = shouldReduceMotion ? undefined : { opacity: [0.55, 0.8, 0.55], scale: [1, 1.04, 1] };
    const transition = { duration: 9, repeat: Infinity, ease: "easeInOut" as const };

    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-radial-top opacity-70" />
        <motion.div
          className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent-primary/[0.07] blur-[110px]"
          animate={animate}
          transition={transition}
        />
        <motion.div
          className="absolute bottom-[-12rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-cyan/[0.055] blur-[120px]"
          animate={shouldReduceMotion ? undefined : { opacity: [0.45, 0.68, 0.45], scale: [1, 1.05, 1] }}
          transition={{ ...transition, delay: 2.5 }}
        />
        <div className="absolute inset-0 bg-grid opacity-[0.018]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* ═══════════ HOME ═══════════ */}
      {preset === "home" && (
        <>
          <GlowOrb x="25%" y="20%" size={700} color="accent" />
          <GlowOrb x="75%" y="70%" size={600} color="cyan" delay={3} />
          <GlowOrb x="50%" y="45%" size={400} color="mixed" delay={5} duration={10} />
          <FloatingLine x1="0" y1="25%" x2="100%" y2="25%" color="rgba(99,102,241,0.06)" delay={0} />
          <FloatingLine x1="0" y1="55%" x2="100%" y2="55%" color="rgba(34,211,238,0.04)" delay={3} />
          <FloatingLine x1="0" y1="80%" x2="100%" y2="80%" color="rgba(99,102,241,0.05)" delay={6} />
        </>
      )}

      {/* ═══════════ SERVICES ═══════════ */}
      {preset === "services" && (
        <>
          <GlowOrb x="30%" y="25%" size={600} color="accent" />
          <GlowOrb x="70%" y="65%" size={500} color="cyan" delay={2} />
          <motion.div
            className="absolute inset-0 bg-grid"
            animate={{ opacity: [0.02, 0.04, 0.02] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* ═══════════ WEB ═══════════ */}
      {preset === "web" && (
        <>
          <GlowOrb x="35%" y="15%" size={650} color="accent" />
          <GlowOrb x="65%" y="75%" size={500} color="cyan" delay={2} />
          {/* Vertical code-like shimmer lines */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.line
                key={i}
                x1={`${10 + i * 9}%`} y1="0" x2={`${10 + i * 9}%`} y2="100%"
                stroke="var(--color-accent-primary)" strokeWidth="0.5"
                animate={{ opacity: [0, 0.06, 0] }}
                transition={{ duration: 5, delay: i * 0.6, repeat: Infinity }}
              />
            ))}
          </svg>
        </>
      )}

      {/* ═══════════ APPS ═══════════ */}
      {preset === "apps" && (
        <>
          <GlowOrb x="40%" y="20%" size={550} color="accent" />
          <GlowOrb x="60%" y="70%" size={500} color="cyan" delay={3} />
          {/* Floating UI rectangles — more visible */}
          {[
            { x: "8%", y: "18%", w: 80, h: 50, delay: 0 },
            { x: "85%", y: "28%", w: 65, h: 40, delay: 1.5 },
            { x: "12%", y: "72%", w: 55, h: 42, delay: 3 },
            { x: "78%", y: "68%", w: 70, h: 35, delay: 4.5 },
            { x: "50%", y: "50%", w: 50, h: 50, delay: 2 },
          ].map((r, i) => (
            <motion.div
              key={i}
              className="absolute rounded-xl border border-accent-primary/[0.06]"
              style={{ left: r.x, top: r.y, width: r.w, height: r.h }}
              animate={{ opacity: [0.03, 0.08, 0.03], y: [0, -10, 0] }}
              transition={{ duration: 7, delay: r.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </>
      )}

      {/* ═══════════ AI ═══════════ */}
      {preset === "ai" && (
        <>
          <GlowOrb x="25%" y="25%" size={700} color="accent" />
          <GlowOrb x="75%" y="60%" size={600} color="cyan" delay={2} />
          <GlowOrb x="50%" y="40%" size={450} color="mixed" delay={4} duration={10} />
          {/* Neural network background */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            {/* Neurons */}
            {Array.from({ length: 30 }, (_, i) => {
              const x = 40 + (i % 6) * 200 + ((i % 3) * 25);
              const y = 60 + Math.floor(i / 6) * 150 + ((i % 2) * 35);
              return (
                <motion.circle
                  key={`n${i}`}
                  cx={x} cy={y} r="3"
                  fill="var(--color-accent-light)"
                  animate={{ opacity: [0.08, 0.25, 0.08], r: [3, 4, 3] }}
                  transition={{ duration: 4 + (i % 3), delay: i * 0.2, repeat: Infinity }}
                />
              );
            })}
            {/* Connections */}
            {Array.from({ length: 25 }, (_, i) => {
              const x1 = 50 + (i % 5) * 220;
              const y1 = 80 + (i % 4) * 160;
              const x2 = x1 + 160 + (i % 3) * 50;
              const y2 = y1 + (i % 2 === 0 ? 100 : -70);
              return (
                <motion.line
                  key={`l${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="var(--color-accent-primary)" strokeWidth="0.5"
                  animate={{ opacity: [0.03, 0.12, 0.03] }}
                  transition={{ duration: 3 + (i % 4), delay: i * 0.25, repeat: Infinity }}
                />
              );
            })}
          </svg>
          {/* Pulsing halos — larger and more visible */}
          {[
            { x: "20%", y: "30%", size: 120 },
            { x: "75%", y: "25%", size: 100 },
            { x: "35%", y: "70%", size: 90 },
            { x: "65%", y: "60%", size: 110 },
          ].map((h, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: h.x, top: h.y, width: h.size, height: h.size,
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, ${i % 2 === 0 ? "rgba(99,102,241,0.06)" : "rgba(34,211,238,0.05)"} 0%, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5, delay: i * 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </>
      )}

      {/* ═══════════ AUTOMATION ═══════════ */}
      {preset === "automation" && (
        <>
          <GlowOrb x="25%" y="30%" size={650} color="cyan" />
          <GlowOrb x="70%" y="60%" size={550} color="accent" delay={2} />
          {/* Circuit traces — more visible */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
            {Array.from({ length: 10 }, (_, i) => {
              const y = 40 + i * 75;
              const off = (i % 2) * 80;
              return (
                <motion.path
                  key={i}
                  d={`M0 ${y} L${120 + off} ${y} L${170 + off} ${y + 25} L${450 + off} ${y + 25} L${500 + off} ${y} L1200 ${y}`}
                  stroke="var(--color-cyan)" strokeWidth="0.8" fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 0], opacity: [0, 0.08, 0] }}
                  transition={{ duration: 8, delay: i * 1, repeat: Infinity }}
                />
              );
            })}
            {/* Junction nodes */}
            {Array.from({ length: 20 }, (_, i) => (
              <motion.rect
                key={`jn${i}`}
                x={60 + (i % 10) * 110}
                y={35 + Math.floor(i / 10) * 380 + (i % 4) * 95}
                width="5" height="5" rx="1"
                fill="var(--color-cyan)"
                animate={{ opacity: [0.05, 0.2, 0.05] }}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </svg>
          {/* Electric sparks */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i * 11) % 60}%`,
                background: "rgba(34,211,238,0.5)",
                boxShadow: "0 0 10px rgba(34,211,238,0.4), 0 0 20px rgba(34,211,238,0.2)",
              }}
              animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, delay: i * 1, repeat: Infinity }}
            />
          ))}
        </>
      )}

      {/* ═══════════ STUDIO ═══════════ */}
      {preset === "studio" && (
        <>
          <GlowOrb x="70%" y="20%" size={600} color="accent" />
          <GlowOrb x="30%" y="70%" size={550} color="cyan" delay={2} />
          <GlowOrb x="55%" y="45%" size={300} color="mixed" delay={4} duration={12} />
          {/* Creative shapes */}
          {[
            { x: "10%", y: "22%", size: 90, rotate: 12 },
            { x: "85%", y: "15%", size: 70, rotate: -18 },
            { x: "7%", y: "65%", size: 60, rotate: 25 },
            { x: "80%", y: "70%", size: 80, rotate: -8 },
            { x: "42%", y: "42%", size: 50, rotate: 35 },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-2xl border border-accent-primary/[0.06]"
              style={{ left: s.x, top: s.y, width: s.size, height: s.size * 0.65 }}
              animate={{
                rotate: [s.rotate, s.rotate + 8, s.rotate],
                opacity: [0.03, 0.08, 0.03],
                y: [0, -8, 0],
              }}
              transition={{ duration: 9, delay: i * 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          {/* Color accent dots */}
          {[
            { x: "18%", y: "28%", color: "rgba(99,102,241,0.15)" },
            { x: "72%", y: "18%", color: "rgba(34,211,238,0.12)" },
            { x: "25%", y: "72%", color: "rgba(74,222,128,0.1)" },
            { x: "82%", y: "58%", color: "rgba(165,180,252,0.12)" },
            { x: "45%", y: "85%", color: "rgba(250,204,21,0.06)" },
          ].map((d, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ left: d.x, top: d.y, width: 8, height: 8, background: d.color, boxShadow: `0 0 12px ${d.color}` }}
              animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, delay: i * 0.8, repeat: Infinity }}
            />
          ))}
        </>
      )}

      {/* ═══════════ ABOUT ═══════════ */}
      {preset === "about" && (
        <>
          <GlowOrb x="30%" y="25%" size={550} color="accent" duration={10} />
          <GlowOrb x="65%" y="70%" size={450} color="cyan" delay={3} duration={12} />
          {/* Breathing concentric rings */}
          {[350, 500, 650].map((size, i) => (
            <motion.div
              key={i}
              className="absolute top-[50%] left-[50%] rounded-full border border-accent-primary/[0.04]"
              style={{ width: size, height: size, transform: "translate(-50%, -50%)" }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.04, 0.1, 0.04] }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
            />
          ))}
        </>
      )}

      {/* ═══════════ CONTACT ═══════════ */}
      {preset === "contact" && (
        <>
          <GlowOrb x="35%" y="30%" size={500} color="accent" />
          <GlowOrb x="65%" y="60%" size={450} color="cyan" delay={2} />
          {/* Warm central pulse */}
          <motion.div
            className="absolute top-[35%] left-[50%] rounded-full"
            style={{
              width: 350, height: 350,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}
