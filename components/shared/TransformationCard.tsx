"use client";

import { motion, useInView, useMotionValue, useTransform, useSpring, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export type TransformationVariant =
  | "general"
  | "web"
  | "app"
  | "ai"
  | "studio"
  | "automation";

interface TransformationCardProps {
  variant: TransformationVariant;
  before: string;
  after: string;
  metric: string;
  beforeLabel?: string;
  afterLabel?: string;
  index?: number;
}

const variantConfig: Record<
  TransformationVariant,
  {
    icon: React.ReactNode;
    gradientFrom: string;
    gradientTo: string;
    glowColor: string;
    particleColor: string;
  }
> = {
  general: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    gradientFrom: "#6366f1",
    gradientTo: "#818cf8",
    glowColor: "rgba(99,102,241,0.4)",
    particleColor: "rgba(129,140,248,0.6)",
  },
  web: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    gradientFrom: "#6366f1",
    gradientTo: "#22d3ee",
    glowColor: "rgba(34,211,238,0.4)",
    particleColor: "rgba(34,211,238,0.6)",
  },
  app: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    gradientFrom: "#818cf8",
    gradientTo: "#22d3ee",
    glowColor: "rgba(129,140,248,0.4)",
    particleColor: "rgba(129,140,248,0.6)",
  },
  ai: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M16 10v1a4 4 0 0 1-8 0v-1" />
        <rect x="3" y="14" width="18" height="8" rx="2" />
        <circle cx="8" cy="18" r="1" fill="currentColor" />
        <circle cx="16" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    gradientFrom: "#22d3ee",
    gradientTo: "#6366f1",
    glowColor: "rgba(34,211,238,0.5)",
    particleColor: "rgba(34,211,238,0.7)",
  },
  studio: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    gradientFrom: "#a855f7",
    gradientTo: "#818cf8",
    glowColor: "rgba(168,85,247,0.4)",
    particleColor: "rgba(168,85,247,0.6)",
  },
  automation: {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    gradientFrom: "#22d3ee",
    gradientTo: "#10b981",
    glowColor: "rgba(34,211,238,0.4)",
    particleColor: "rgba(16,185,129,0.6)",
  },
};

const transformationDetails: Record<
  TransformationVariant,
  {
    before: string[];
    after: string[];
    bridge: string;
    beforeFlow: string[];
    afterFlow: string[];
  }
> = {
  general: {
    before: ["Parcours dispersé", "Suivi manuel", "Décisions lentes"],
    after: ["Tunnel clarifié", "Mesure continue", "Pilotage en temps réel"],
    bridge: "Audit, stratégie, exécution",
    beforeFlow: ["Idée", "Outils", "Équipe", "Suivi"],
    afterFlow: ["Audit", "Design", "Build", "Growth"],
  },
  web: {
    before: ["Temps de chargement élevé", "Message peu lisible", "Conversion faible"],
    after: ["UX premium", "SEO technique propre", "Pages orientées action"],
    bridge: "Refonte, performance, conversion",
    beforeFlow: ["Trafic", "Page lente", "Formulaire", "Relance"],
    afterFlow: ["SEO", "Landing", "Lead", "CRM"],
  },
  app: {
    before: ["Outils fragmentés", "Données difficiles à lire", "Process métier lent"],
    after: ["Interface métier claire", "Tableaux de bord utiles", "Actions rapides"],
    bridge: "Architecture, UX, automatisation",
    beforeFlow: ["Sheets", "Emails", "Exports", "Décision"],
    afterFlow: ["Data", "Dashboard", "Actions", "Exports"],
  },
  ai: {
    before: ["Demandes répétitives", "Analyse trop manuelle", "Réponses non standardisées"],
    after: ["Agent disponible 24/7", "Contexte métier intégré", "Décisions assistées"],
    bridge: "Données, prompts, orchestration",
    beforeFlow: ["Inbox", "Tri manuel", "Recherche", "Réponse"],
    afterFlow: ["Input", "Agent IA", "Validation", "Action"],
  },
  studio: {
    before: ["Identité incohérente", "Visuels peu mémorables", "Production lente"],
    after: ["Direction artistique nette", "Motion premium", "Assets cohérents"],
    bridge: "Concept, design, rendu",
    beforeFlow: ["Brief", "Visuels", "Retours", "Publication"],
    afterFlow: ["Concept", "Design", "Motion", "Kit"],
  },
  automation: {
    before: ["Tâches répétitives", "Erreurs humaines", "Temps perdu"],
    after: ["Workflows autonomes", "Contrôles fiables", "Équipe recentrée"],
    bridge: "Mapping, automatisation, suivi",
    beforeFlow: ["Trigger", "Copie", "Saisie", "Contrôle"],
    afterFlow: ["Trigger", "API", "CRM", "Alerte"],
  },
};

/** Floating particles specific to each domain */
function DomainParticles({
  variant,
  isSolved,
  reduceMotion,
}: {
  variant: TransformationVariant;
  isSolved: boolean;
  reduceMotion: boolean;
}) {
  const config = variantConfig[variant];
  const particles = Array.from({ length: 8 }, (_, i) => ({
    x: 10 + (i * 12) % 80,
    y: 15 + (i * 17) % 70,
    size: 2 + (i % 3),
    delay: i * 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: isSolved ? config.particleColor : "rgba(239,68,68,0.28)",
          }}
          animate={reduceMotion ? undefined : isSolved
            ? { y: [0, -10, 0], opacity: [0.28, 0.72, 0.28], scale: [1, 1.45, 1] }
            : { x: [0, i % 2 ? 4 : -4, 0], opacity: [0.16, 0.38, 0.16], scale: [0.85, 1.1, 0.85] }}
          transition={{
            duration: isSolved ? 3 + p.delay : 2.6 + p.delay,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function FlowBridge({
  active,
  metric,
  variant,
  reduceMotion,
}: {
  active: boolean;
  metric: string;
  variant: TransformationVariant;
  reduceMotion: boolean;
}) {
  const config = variantConfig[variant];

  return (
    <div className="relative flex min-h-36 items-center justify-center sm:min-h-40 lg:min-h-[260px]" style={{ transformStyle: "preserve-3d" }}>
      <div className="absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border-accent/35 to-transparent lg:left-0 lg:right-0 lg:top-1/2 lg:h-px lg:w-auto lg:translate-y-[-50%] lg:bg-gradient-to-r" />

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, ${config.glowColor}, transparent 68%)` }}
        animate={reduceMotion ? undefined : { opacity: active ? [0.34, 0.66, 0.34] : [0.2, 0.34, 0.2], scale: active ? [0.9, 1.12, 0.9] : [0.86, 1, 0.86] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full lg:left-0"
          style={{ background: i === 1 ? config.gradientTo : config.gradientFrom, boxShadow: `0 0 18px ${config.glowColor}` }}
          initial={false}
          animate={reduceMotion ? undefined : {
            x: ["-58px", "58px"],
            y: [`${(i - 1) * 16}px`, `${(i - 1) * -12}px`],
            opacity: active ? [0, 0.88, 0] : [0, 0.45, 0],
            scale: active ? [0.75, 1.3, 0.75] : [0.6, 1, 0.6],
          }}
          transition={{ duration: 2.8 + i * 0.25, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="relative z-10 grid h-28 min-w-32 place-items-center rounded-3xl border bg-bg-card/85 px-4 text-center shadow-2xl backdrop-blur-xl sm:h-32 sm:min-w-36"
        style={{
          borderColor: `${config.gradientFrom}55`,
          boxShadow: `0 24px 70px ${config.glowColor}`,
          transform: "translateZ(52px)",
        }}
        animate={reduceMotion ? undefined : { y: active ? [0, -5, 0] : [0, -3, 0], rotateZ: active ? [0, 1.2, 0] : [0, 0.5, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Impact</span>
        <span
          className="text-lg font-bold leading-tight tracking-[-0.03em] sm:text-2xl"
          style={{
            background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {metric}
        </span>
      </motion.div>
    </div>
  );
}

function WorkflowStrip({
  items,
  variant,
  solved,
  active,
  reduceMotion,
}: {
  items: string[];
  variant: TransformationVariant;
  solved: boolean;
  active: boolean;
  reduceMotion: boolean;
}) {
  const config = variantConfig[variant];
  const color = solved ? config.gradientTo : "#f87171";
  const glow = solved ? config.glowColor : "rgba(248,113,113,0.22)";

  return (
    <div className="relative mt-5 rounded-2xl border border-white/[0.055] bg-black/12 p-3 sm:mt-6">
      <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-4 sm:items-center sm:gap-2">
        {items.map((item, i) => (
          <div key={item} className="relative min-w-0">
            {i > 0 && (
              <div className="absolute right-[calc(50%+1.25rem)] top-5 hidden h-px w-[calc(100%-1rem)] bg-white/8 sm:block">
                <motion.div
                  className="h-full origin-left"
                  style={{ background: `linear-gradient(90deg, transparent, ${color})` }}
                  animate={reduceMotion ? undefined : solved ? { scaleX: active ? [0.35, 1, 0.35] : [0.25, 0.7, 0.25], opacity: [0.22, 0.72, 0.22] } : { opacity: [0.16, 0.36, 0.16], scaleX: [0.5, 0.78, 0.5] }}
                  transition={{ duration: solved ? 3.2 : 2.6, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            )}
            <motion.div
              className="mx-auto grid h-9 w-9 place-items-center rounded-xl border text-[10px] font-bold sm:h-10 sm:w-10 sm:rounded-2xl"
              style={{
                borderColor: solved ? `${config.gradientFrom}44` : "rgba(248,113,113,0.24)",
                background: solved ? `linear-gradient(135deg, ${config.gradientFrom}28, ${config.gradientTo}14)` : "rgba(248,113,113,0.08)",
                color,
                boxShadow: `0 12px 28px ${glow}`,
              }}
              animate={reduceMotion ? undefined : { y: solved ? [0, -3, 0] : [0, i % 2 ? 2 : -2, 0], scale: active && solved ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 3.4 + i * 0.28, delay: i * 0.12, repeat: Infinity, ease: "easeInOut" }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.div>
            <p className="mx-auto mt-2 max-w-[5rem] text-center text-[10px] font-medium leading-snug text-text-tertiary sm:max-w-none sm:truncate">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemScene({
  before,
  beforeLabel,
  variant,
  active,
  reduceMotion,
  details,
  flow,
}: {
  before: string;
  beforeLabel: string;
  variant: TransformationVariant;
  active: boolean;
  reduceMotion: boolean;
  details: string[];
  flow: string[];
}) {
  return (
    <motion.div
      className="relative h-full overflow-hidden rounded-2xl border border-red-500/20 bg-[linear-gradient(145deg,rgba(22,24,38,0.92),rgba(42,14,24,0.72))] p-4 sm:p-5 lg:min-h-[430px] lg:p-6"
      style={{ transform: "translateZ(28px)" }}
      animate={reduceMotion ? undefined : { opacity: active ? 0.9 : 1, scale: active ? 0.985 : 1 }}
      transition={{ duration: 0.9, ease: premiumEase }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.14),transparent_58%)]" />
      <DomainParticles variant={variant} isSolved={false} reduceMotion={reduceMotion} />

      <div className="absolute inset-0 overflow-hidden">
        {[18, 44, 72].map((top, i) => (
          <motion.div
            key={top}
            className="absolute left-5 right-5 h-px origin-center bg-red-400/20"
            style={{ top: `${top}%` }}
            animate={reduceMotion ? undefined : { opacity: [0.16, 0.42, 0.16], scaleX: [0.72, 1, 0.72], x: i % 2 ? [0, 5, 0] : [0, -5, 0] }}
            transition={{ duration: 3.4 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative flex items-center gap-3">
        <motion.div
          className="grid h-11 w-11 place-items-center rounded-2xl border border-red-400/25 bg-red-500/10 text-red-300"
          animate={reduceMotion ? undefined : { scale: active ? [1, 1.04, 1] : [1, 1.025, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 7v6" />
            <path d="M12 17h.01" />
          </svg>
        </motion.div>
        <div className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-red-300/80">{beforeLabel}</span>
          <span className="text-xs text-text-tertiary">Friction, lenteur, perte de clarté</span>
        </div>
      </div>

      <p className="relative mt-5 text-sm leading-[1.75] text-text-secondary text-pretty sm:mt-6 sm:text-base">{before}</p>

      <div className="relative mt-4 grid gap-2 sm:mt-5">
        {details.map((detail, i) => (
          <motion.div
            key={detail}
            className="flex items-start gap-2 rounded-xl border border-red-400/10 bg-red-500/[0.035] px-3 py-2 text-xs leading-relaxed text-text-secondary"
            animate={reduceMotion ? undefined : { x: active ? [0, i % 2 ? 2 : -2, 0] : 0, opacity: active ? [0.72, 0.95, 0.72] : 0.78 }}
            transition={{ duration: 3.6 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-300/60" />
            <span className="leading-relaxed">{detail}</span>
          </motion.div>
        ))}
      </div>

      <WorkflowStrip items={flow} variant={variant} solved={false} active={active} reduceMotion={reduceMotion} />

      <div className="relative mt-5 rounded-2xl border border-red-500/15 bg-black/14 p-4 sm:mt-7">
        <div className="mb-4 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-red-400/45" />
          ))}
        </div>
        <div className="space-y-3">
          {[0.92, 0.66, 0.78].map((scale, i) => (
            <div key={i} className="h-2 overflow-hidden rounded-full bg-red-500/10">
              <motion.div
                className="h-full origin-left rounded-full bg-gradient-to-r from-red-500/55 to-red-300/16"
                animate={reduceMotion ? undefined : { scaleX: [scale, Math.max(0.35, scale - 0.18), scale] }}
                transition={{ duration: 2.4 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SolutionScene({
  after,
  afterLabel,
  variant,
  active,
  reduceMotion,
  details,
  flow,
}: {
  after: string;
  afterLabel: string;
  variant: TransformationVariant;
  active: boolean;
  reduceMotion: boolean;
  details: string[];
  flow: string[];
}) {
  const config = variantConfig[variant];

  return (
    <motion.div
      className="relative h-full overflow-hidden rounded-2xl border bg-[linear-gradient(145deg,rgba(18,20,34,0.94),rgba(20,28,48,0.78))] p-4 sm:p-5 lg:min-h-[430px] lg:p-6"
      style={{
        borderColor: `${config.gradientFrom}38`,
        transform: "translateZ(46px)",
      }}
      animate={reduceMotion ? undefined : { scale: active ? 1.015 : 1, y: active ? -4 : 0 }}
      transition={{ duration: 0.9, ease: premiumEase }}
    >
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${config.glowColor}, transparent 62%)` }} />
      <DomainParticles variant={variant} isSolved reduceMotion={reduceMotion} />

      <motion.div
        aria-hidden="true"
        className="absolute right-5 top-5 h-24 w-24 rounded-full border"
        style={{ borderColor: `${config.gradientTo}24` }}
        animate={reduceMotion ? undefined : { rotate: active ? 360 : 180, opacity: active ? 0.72 : 0.42 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative flex items-center gap-3">
        <motion.div
          className="grid h-11 w-11 place-items-center rounded-2xl text-white"
          style={{
            background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            boxShadow: `0 14px 34px ${config.glowColor}`,
          }}
          animate={reduceMotion ? undefined : { y: active ? [0, -4, 0] : [0, -2, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {config.icon}
        </motion.div>
        <div className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: config.gradientTo }}>
            {afterLabel}
          </span>
          <span className="text-xs text-text-tertiary">Système clair, rapide, pilotable</span>
        </div>
      </div>

      <p className="relative mt-5 text-sm font-medium leading-[1.75] text-text-primary text-pretty sm:mt-6 sm:text-base">{after}</p>

      <div className="relative mt-4 grid gap-2 sm:mt-5">
        {details.map((detail, i) => (
          <motion.div
            key={detail}
            className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.035] px-3 py-2 text-xs leading-relaxed text-text-secondary"
            animate={reduceMotion ? undefined : { y: active ? [0, -3, 0] : [0, -1, 0], opacity: active ? [0.82, 1, 0.82] : [0.74, 0.92, 0.74] }}
            transition={{ duration: 4 + i * 0.45, delay: i * 0.16, repeat: Infinity, ease: "easeInOut" }}
          >
            <span
              className="grid h-4 w-4 shrink-0 place-items-center rounded-full"
              style={{ background: `linear-gradient(135deg, ${config.gradientFrom}55, ${config.gradientTo}28)` }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="leading-relaxed">{detail}</span>
          </motion.div>
        ))}
      </div>

      <WorkflowStrip items={flow} variant={variant} solved active={active} reduceMotion={reduceMotion} />

      <div className="relative mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
        {[0.62, 0.78, 0.9].map((scale, i) => (
          <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 sm:rounded-2xl sm:p-3">
            <div className="mb-3 h-7 w-7 rounded-xl" style={{ background: `linear-gradient(135deg, ${config.gradientFrom}55, ${config.gradientTo}24)` }} />
            <div className="h-1.5 rounded-full bg-white/12" />
            <motion.div
              className="mt-2 h-1.5 origin-left rounded-full"
              style={{ background: `linear-gradient(90deg, ${config.gradientFrom}70, ${config.gradientTo}25)` }}
              animate={reduceMotion ? undefined : { scaleX: active ? [scale - 0.08, scale, scale - 0.08] : scale }}
              transition={{ duration: 3.6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function TransformationCard({
  variant,
  before,
  after,
  metric,
  beforeLabel = "Avant",
  afterLabel = "Avec Solutions 2IA",
  index = 0,
}: TransformationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { shouldReduceMotion } = usePerformanceMode();
  const reduceMotion = (useReducedMotion() ?? false) || shouldReduceMotion;
  const [isActive, setIsActive] = useState(false);
  const config = variantConfig[variant];
  const details = transformationDetails[variant];

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 32, mass: 0.7 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 220, damping: 32, mass: 0.7 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xVal);
    y.set(yVal);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsActive(false);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: -10 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: premiumEase }}
      className="perspective-[1400px]"
    >
      <motion.div
        className="relative cursor-pointer"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsActive((value) => !value)}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/72 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:rounded-[1.75rem] sm:p-5 lg:p-6"
          style={{
            transformStyle: "preserve-3d",
            boxShadow: `0 28px 90px rgba(0,0,0,0.26), 0 0 70px ${isActive ? config.glowColor : "rgba(99,102,241,0.08)"}`,
          }}
          animate={reduceMotion ? undefined : { y: isActive ? -3 : 0 }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.045),transparent_58%)]" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_10.5rem_minmax(0,1fr)] lg:items-stretch lg:gap-5 xl:grid-cols-[minmax(0,1fr)_12.5rem_minmax(0,1fr)]">
            <ProblemScene before={before} beforeLabel={beforeLabel} variant={variant} active={isActive} reduceMotion={reduceMotion} details={details.before} flow={details.beforeFlow} />
            <div className="relative flex flex-col justify-center rounded-2xl border border-border-subtle/60 bg-white/[0.018] px-3 py-2 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0">
              <FlowBridge active={isActive || isInView} metric={metric} variant={variant} reduceMotion={reduceMotion} />
              <div className="relative z-10 mx-auto -mt-2 max-w-[13rem] pb-2 text-center text-[10px] font-medium uppercase leading-relaxed tracking-[0.16em] text-text-tertiary lg:absolute lg:inset-x-0 lg:bottom-3 lg:mt-0 lg:max-w-[11rem] lg:pb-0">
                {details.bridge}
              </div>
            </div>
            <SolutionScene after={after} afterLabel={afterLabel} variant={variant} active={isActive} reduceMotion={reduceMotion} details={details.after} flow={details.afterFlow} />
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-4 left-4 right-4 h-8 rounded-2xl blur-xl"
          style={{ background: `linear-gradient(135deg, rgba(239,68,68,0.12), ${config.gradientFrom}24, ${config.gradientTo}18)` }}
          animate={{ opacity: isActive ? 0.72 : 0.38, scaleX: isActive ? 0.96 : 0.9 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}
