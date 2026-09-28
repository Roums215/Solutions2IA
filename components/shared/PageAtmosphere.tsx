"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

type Preset = "home" | "services" | "web" | "apps" | "ai" | "automation" | "flow" | "studio" | "about" | "contact";

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
  const { tier, disableContentMotion } = usePerformanceMode();

  // minimal : fond statique seul, aucun orb, zéro animation.
  if (tier === "minimal") {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-radial-top opacity-60" />
      </div>
    );
  }

  // reduced (mobile / low-end / FPS guard) : ambiance allégée — 2 orbs
  // respirants + grille statique. Pas de presets riches.
  if (tier === "reduced") {
    const animate = disableContentMotion ? undefined : { opacity: [0.55, 0.8, 0.55], scale: [1, 1.04, 1] };
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
          animate={disableContentMotion ? undefined : { opacity: [0.45, 0.68, 0.45], scale: [1, 1.05, 1] }}
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
      {/* Refonte agents-ia V2 : plus de neurones, de points ni de halos qui clignotent.
          Un fond « système » statique : grille très légère, grandes courbes fines,
          arcs concentriques et quelques croisements marqués. Contraste très faible,
          aucune boucle d'animation (le fond ne concurrence jamais le texte). */}
      {preset === "ai" && <AiSystemField />}

      {/* /automatisation (V3) : des systèmes reliés, pas un cyberespace. */}
      {preset === "flow" && <FlowSystemField />}

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

/** Fond de /agents-ia : un réseau de trajectoires, pas un ciel étoilé (ni croix ni points). SVG statique, tokens uniquement. */
function AiSystemField() {
  const curves = [
    "M -80 620 C 260 520, 520 700, 860 560 C 1100 460, 1300 520, 1540 440",
    "M -80 300 C 300 220, 560 380, 900 300 C 1160 240, 1320 300, 1540 250",
    "M 200 -60 C 320 220, 560 420, 780 520 C 1000 620, 1180 760, 1300 960",
    "M -80 820 C 360 760, 700 820, 1000 740 C 1220 680, 1380 700, 1540 660",
  ];
  return (
    <>
      <div className="absolute inset-0 bg-radial-top opacity-70" />
      <div className="absolute -top-32 left-[18%] h-[36rem] w-[36rem] rounded-full bg-accent-primary/[0.06] blur-[120px]" />
      <div className="absolute bottom-[-10rem] right-[8%] h-[32rem] w-[32rem] rounded-full bg-cyan/[0.045] blur-[120px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="ai-grid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="var(--color-accent-light)" strokeOpacity="0.05" strokeWidth="0.6" />
          </pattern>
          <radialGradient id="ai-grid-fade" cx="62%" cy="38%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="ai-grid-mask">
            <rect width="1440" height="900" fill="url(#ai-grid-fade)" />
          </mask>
        </defs>
        <rect width="1440" height="900" fill="url(#ai-grid)" mask="url(#ai-grid-mask)" />
        {curves.map((d, i) => (
          <path key={d} d={d} fill="none" stroke={i % 2 ? "var(--color-cyan)" : "var(--color-accent-light)"} strokeOpacity={0.075} strokeWidth={1} />
        ))}
        {[220, 330, 440].map((r, i) => (
          <circle key={r} cx="1180" cy="760" r={r} fill="none" stroke="var(--color-accent-light)" strokeOpacity={0.06 - i * 0.012} strokeWidth={0.9} />
        ))}
      </svg>
    </>
  );
}

/** Fond de /automatisation (V3) : grandes trajectoires et lignes de réseau, nappes très
 *  faibles. Ni points, ni carrés flottants, ni particules. SVG statique, tokens uniquement. */
function FlowSystemField() {
  const curves = [
    "M -80 260 C 280 200, 560 320, 900 250 C 1160 200, 1320 240, 1540 200",
    "M -80 520 C 320 460, 620 600, 960 500 C 1200 430, 1360 470, 1540 430",
    "M -80 760 C 360 700, 720 780, 1040 700 C 1260 640, 1400 660, 1540 620",
  ];
  return (
    <>
      <div className="absolute inset-0 bg-radial-top opacity-60" />
      <div className="absolute -top-40 right-[12%] h-[34rem] w-[34rem] rounded-full bg-cyan/[0.045] blur-[120px]" />
      <div className="absolute bottom-[-12rem] left-[10%] h-[30rem] w-[30rem] rounded-full bg-accent-primary/[0.05] blur-[120px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        {curves.map((d, i) => (
          <path key={d} d={d} fill="none" stroke={i === 1 ? "var(--color-cyan)" : "var(--color-accent-light)"} strokeOpacity={0.07} strokeWidth={1} />
        ))}
      </svg>
    </>
  );
}
