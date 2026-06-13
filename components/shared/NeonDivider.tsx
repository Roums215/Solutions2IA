"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useId } from "react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

type NeonPreset = "glow" | "circuit" | "wave" | "neural" | "electric";

interface NeonDividerProps {
  preset?: NeonPreset;
  /** Couleur de blend avec les sections adjacentes */
  bg?: "primary" | "secondary";
  className?: string;
}

/* ─── Palette par preset ─── */
const presetConfig: Record<
  NeonPreset,
  {
    primary: string;
    secondary: string;
    core: string;
    accent: string;
    duration: number;
    glyph: "diamond" | "chevron" | "node" | "neuron" | "spark";
  }
> = {
  glow: {
    primary: "129,140,248",
    secondary: "34,211,238",
    core: "255,255,255",
    accent: "165,180,252",
    duration: 7,
    glyph: "diamond",
  },
  wave: {
    primary: "129,140,248",
    secondary: "34,211,238",
    core: "240,253,250",
    accent: "147,197,253",
    duration: 7.2,
    glyph: "chevron",
  },
  circuit: {
    primary: "34,211,238",
    secondary: "129,140,248",
    core: "236,254,255",
    accent: "103,232,249",
    duration: 6.8,
    glyph: "node",
  },
  neural: {
    primary: "129,140,248",
    secondary: "165,180,252",
    core: "238,242,255",
    accent: "196,181,253",
    duration: 7.8,
    glyph: "neuron",
  },
  electric: {
    primary: "34,211,238",
    secondary: "129,140,248",
    core: "255,255,255",
    accent: "125,211,252",
    duration: 6.5,
    glyph: "spark",
  },
};

const bgRgb = {
  primary: "5,6,11",
  secondary: "11,13,22",
} as const;

/* ─── Path generator par preset ─── */
function generatePath(preset: NeonPreset): string {
  switch (preset) {
    case "wave":
      // Sinusoïde douce
      return "M0 60 Q 200 20, 400 60 T 800 60 T 1200 60";
    case "circuit":
      // Trace circuit avec angles 45°
      return "M0 60 L 200 60 L 230 30 L 470 30 L 500 60 L 700 60 L 730 90 L 970 90 L 1000 60 L 1200 60";
    case "neural":
      // Courbe neurale avec ramifications
      return "M0 60 C 200 20, 300 100, 500 60 S 800 20, 1000 60 T 1200 60";
    case "electric":
      // Éclair zigzag
      return "M0 60 L 180 60 L 220 35 L 280 80 L 340 40 L 400 70 L 480 60 L 720 60 L 760 35 L 820 80 L 880 40 L 940 70 L 1020 60 L 1200 60";
    case "glow":
    default:
      // Ligne droite
      return "M0 60 L 1200 60";
  }
}

/* ─── Glyphe latéral SVG ─── */
function SideGlyph({
  variant,
  color,
  side,
  delay = 0,
}: {
  variant: "diamond" | "chevron" | "node" | "neuron" | "spark";
  color: string;
  side: "left" | "right";
  delay?: number;
}) {
  const flip = side === "right" ? "scale-x-[-1]" : "";
  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 ${side === "left" ? "left-4 sm:left-8" : "right-4 sm:right-8"} ${flip}`}
      initial={{ opacity: 0, x: side === "left" ? -8 : 8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-30%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width="56" height="20" viewBox="0 0 56 20" fill="none" className="opacity-90">
        {variant === "diamond" && (
          <>
            <motion.path
              d="M2 10 L 14 4 L 14 16 Z"
              fill={`rgb(${color})`}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <line x1="18" y1="10" x2="54" y2="10" stroke={`rgba(${color},0.5)`} strokeWidth="1" />
            <circle cx="22" cy="10" r="1.2" fill={`rgb(${color})`} />
            <circle cx="32" cy="10" r="1.6" fill={`rgb(${color})`} opacity="0.7" />
          </>
        )}
        {variant === "chevron" && (
          <>
            <path d="M2 10 L 10 4 L 18 10 L 10 16 Z" stroke={`rgb(${color})`} strokeWidth="1.4" fill="none" />
            <line x1="22" y1="10" x2="54" y2="10" stroke={`rgba(${color},0.5)`} strokeWidth="1" />
            <motion.circle
              cx="36" cy="10" r="2"
              fill={`rgb(${color})`}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        )}
        {variant === "node" && (
          <>
            <rect x="2" y="6" width="8" height="8" rx="1" stroke={`rgb(${color})`} strokeWidth="1.2" fill={`rgba(${color},0.18)`} />
            <line x1="12" y1="10" x2="28" y2="10" stroke={`rgba(${color},0.55)`} strokeWidth="1" />
            <line x1="28" y1="10" x2="34" y2="4" stroke={`rgba(${color},0.55)`} strokeWidth="1" />
            <line x1="34" y1="4" x2="54" y2="4" stroke={`rgba(${color},0.4)`} strokeWidth="1" />
            <motion.circle
              cx="28" cy="10" r="1.6"
              fill={`rgb(${color})`}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </>
        )}
        {variant === "neuron" && (
          <>
            <circle cx="6" cy="10" r="3" stroke={`rgb(${color})`} strokeWidth="1.2" fill={`rgba(${color},0.2)`} />
            <line x1="9" y1="10" x2="20" y2="6" stroke={`rgba(${color},0.5)`} strokeWidth="0.8" />
            <line x1="9" y1="10" x2="20" y2="14" stroke={`rgba(${color},0.5)`} strokeWidth="0.8" />
            <circle cx="22" cy="6" r="1.4" fill={`rgb(${color})`} />
            <circle cx="22" cy="14" r="1.4" fill={`rgb(${color})`} />
            <line x1="24" y1="10" x2="54" y2="10" stroke={`rgba(${color},0.4)`} strokeWidth="0.8" />
          </>
        )}
        {variant === "spark" && (
          <>
            <motion.path
              d="M2 10 L 8 4 L 12 12 L 18 6 L 22 10"
              stroke={`rgb(${color})`}
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <line x1="26" y1="10" x2="54" y2="10" stroke={`rgba(${color},0.5)`} strokeWidth="1" />
            <motion.circle
              cx="40" cy="10" r="1.8"
              fill={`rgb(${color})`}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          </>
        )}
      </svg>
    </motion.div>
  );
}

/* ─── Composant principal ─── */
export function NeonDivider({ preset = "glow", bg = "primary", className = "" }: NeonDividerProps) {
  const config = presetConfig[preset];
  const bgColor = bgRgb[bg];
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const { shouldHideBackgroundDecor } = usePerformanceMode();

  // Hooks invoqués sans conditionnel (rules-of-hooks).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const beamOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.16, 0.46, 0.46, 0.16]);
  const beamScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.02, 0.9]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  // Décor de fond caché : remplace par un simple divider statique gradient.
  if (shouldHideBackgroundDecor) {
    return (
      <div
        className={`relative w-full h-px ${className}`}
        style={{
          background: `linear-gradient(90deg, transparent, rgb(${config.primary} / 0.35), transparent)`,
        }}
        aria-hidden
      />
    );
  }

  const path = generatePath(preset);
  const gradientId = `nd-grad-${uid}`;
  const flowId = `nd-flow-${uid}`;
  const glowFilterId = `nd-glow-${uid}`;

  return (
    <div
      ref={ref}
      className={`relative w-full h-28 lg:h-36 z-10 overflow-hidden ${className}`}
    >
      {/* Blend gradient avec sections adjacentes */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            rgb(${bgColor}) 0%,
            rgba(${bgColor},0.94) 8%,
            rgba(${bgColor},0.6) 22%,
            rgba(${bgColor},0.18) 38%,
            transparent 50%,
            rgba(${bgColor},0.18) 62%,
            rgba(${bgColor},0.6) 78%,
            rgba(${bgColor},0.94) 92%,
            rgb(${bgColor}) 100%
          )`,
        }}
      />

      {/* Halo ambient large */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
        style={{
          width: "70%",
          maxWidth: 900,
          height: "100%",
          background: `radial-gradient(ellipse at center, rgba(${config.primary},0.1) 0%, rgba(${config.secondary},0.045) 38%, transparent 78%)`,
          opacity: beamOpacity,
          scaleX: beamScale,
        }}
      />

      {/* Halo central focus */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl pointer-events-none"
        style={{
          width: "32%",
          maxWidth: 480,
          height: 80,
          background: `radial-gradient(ellipse at center, rgba(${config.core},0.12) 0%, rgba(${config.secondary},0.07) 42%, transparent 78%)`,
        }}
        animate={{
          opacity: [0.22, 0.48, 0.22],
          scaleX: [0.92, 1.06, 0.92],
        }}
        transition={{ duration: config.duration * 0.7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grille perspective floor — seulement sur certains presets */}
      {(preset === "circuit" || preset === "electric") && (
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(${config.primary},0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(${config.primary},0.6) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            transform: "perspective(180px) rotateX(48deg)",
            transformOrigin: "center bottom",
            maskImage: "linear-gradient(180deg, transparent 0%, black 60%, transparent 100%)",
          }}
        />
      )}

      {/* SVG path principal — la "veine" qui change selon le preset */}
      <motion.svg
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full pointer-events-none"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: "120px", y: parallaxY }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`rgba(${config.primary},0)`} />
            <stop offset="15%" stopColor={`rgba(${config.primary},0.6)`} />
            <stop offset="35%" stopColor={`rgba(${config.primary},1)`} />
            <stop offset="50%" stopColor={`rgba(${config.core},1)`} />
            <stop offset="65%" stopColor={`rgba(${config.secondary},1)`} />
            <stop offset="85%" stopColor={`rgba(${config.secondary},0.6)`} />
            <stop offset="100%" stopColor={`rgba(${config.secondary},0)`} />
          </linearGradient>
          <filter id={glowFilterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id={flowId} d={path} />
        </defs>

        {/* Glow path large */}
        <motion.path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.18"
          filter={`url(#${glowFilterId})`}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Path principal */}
        <motion.path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Pulse blanc qui voyage le long du path */}
        <circle r="2.4" fill={`rgba(${config.core},0.72)`} filter={`url(#${glowFilterId})`}>
          <animateMotion dur={`${config.duration}s`} repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref={`#${flowId}`} />
          </animateMotion>
        </circle>

        {/* 2e pulse — décalé, couleur secondaire */}
        <circle r="1.8" fill={`rgba(${config.secondary},0.62)`} filter={`url(#${glowFilterId})`}>
          <animateMotion
            dur={`${config.duration * 1.3}s`}
            repeatCount="indefinite"
            rotate="auto"
            begin={`-${config.duration * 0.5}s`}
          >
            <mpath xlinkHref={`#${flowId}`} />
          </animateMotion>
        </circle>

        {/* 3e pulse — accent */}
        <circle r="1.4" fill={`rgba(${config.accent},0.56)`}>
          <animateMotion
            dur={`${config.duration * 0.85}s`}
            repeatCount="indefinite"
            rotate="auto"
            begin={`-${config.duration * 0.25}s`}
          >
            <mpath xlinkHref={`#${flowId}`} />
          </animateMotion>
        </circle>

        {/* Junction nodes pour circuit/neural */}
        {(preset === "circuit" || preset === "neural") && (
          <>
            {[200, 400, 600, 800, 1000].map((x, i) => (
              <motion.circle
                key={x}
                cx={x}
                cy={preset === "circuit" ? (i % 2 === 0 ? 60 : 60) : 60}
                r="3"
                fill={`rgba(${config.primary},1)`}
                filter={`url(#${glowFilterId})`}
                animate={{ opacity: [0.24, 0.62, 0.24], scale: [0.9, 1.08, 0.9] }}
                transition={{
                  duration: 2.4,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        )}
      </motion.svg>

      {/* Particules ambiantes flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => {
          const left = 10 + i * 11;
          const offset = i * 0.4;
          return (
            <motion.div
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full"
              style={{
                left: `${left}%`,
                top: "50%",
                background: `rgb(${i % 2 === 0 ? config.primary : config.secondary})`,
                boxShadow: `0 0 8px rgba(${i % 2 === 0 ? config.primary : config.secondary},0.8)`,
              }}
              animate={{
                y: [-14, 14, -14],
                opacity: [0, 0.42, 0],
              }}
              transition={{
                duration: 4 + (i % 3),
                delay: offset,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Sweep horizontal — barre lumineuse qui balaye */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-16 w-40 rounded-full blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(${config.core},0.6) 0%, rgba(${config.secondary},0.3) 40%, transparent 75%)`,
        }}
        animate={{
          left: ["-15%", "115%"],
          opacity: [0, 0.9, 0.9, 0],
        }}
        transition={{
          duration: config.duration * 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.85, 1],
        }}
      />

      {/* Sweep inverse plus subtil */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-10 w-28 rounded-full blur-xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, rgba(${config.accent},0.5) 0%, transparent 70%)`,
        }}
        animate={{
          left: ["115%", "-15%"],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: config.duration * 2.8,
          delay: config.duration * 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.85, 1],
        }}
      />

      {/* Glyphes latéraux — ornements sci-fi */}
      <SideGlyph variant={config.glyph} color={config.primary} side="left" delay={0.2} />
      <SideGlyph variant={config.glyph} color={config.secondary} side="right" delay={0.35} />

      {/* Vignette gauche/droite pour fondu */}
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none"
        style={{ background: `linear-gradient(90deg, rgb(${bgColor}) 0%, transparent 100%)` }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 pointer-events-none"
        style={{ background: `linear-gradient(270deg, rgb(${bgColor}) 0%, transparent 100%)` }}
      />
    </div>
  );
}
