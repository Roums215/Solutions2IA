"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

type AnatomyStep = {
  id: string;
  number: string;
  letter: string;
  title: string;
  pitch: string;
  detail: string;
  tags: string[];
  icon: ReactNode;
};

const ICON = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "text-accent-light",
};

const STEPS: AnatomyStep[] = [
  {
    id: "knowledge",
    number: "01",
    letter: "K",
    title: "Connaissance",
    pitch: "Ce que l'agent sait sur votre métier.",
    detail:
      "Indexation vectorielle de vos documents, mémoire conversationnelle, accès lecture seule à vos systèmes. Sources citées, jamais inventées.",
    tags: ["RAG", "Embeddings", "Mémoire"],
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M9 7h7M9 11h5" />
      </svg>
    ),
  },
  {
    id: "reasoning",
    number: "02",
    letter: "R",
    title: "Raisonnement",
    pitch: "Comment il prend ses décisions.",
    detail:
      "LLM contraint par chaîne de pensée explicite, validation par règles métier, fallback humain si confiance sous seuil. Modèles : Claude, GPT, Mistral selon criticité.",
    tags: ["LLM", "Chain of thought", "Validation"],
    icon: (
      <svg {...ICON} aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" />
        <path d="M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05L4.93 4.93" />
      </svg>
    ),
  },
  {
    id: "actions",
    number: "03",
    letter: "A",
    title: "Actions",
    pitch: "Ce qu'il peut déclencher.",
    detail:
      "Outils branchés : email, CRM, Calendar, Slack, Notion, ERP, APIs internes. Function calling typé, idempotence, journalisation de chaque appel.",
    tags: ["Function call", "API", "Idempotent"],
    icon: (
      <svg {...ICON} aria-hidden>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
      </svg>
    ),
  },
  {
    id: "monitoring",
    number: "04",
    letter: "M",
    title: "Monitoring",
    pitch: "Comment vous gardez la main.",
    detail:
      "Logs structurés, dashboards d'adoption, taux de confiance par décision, alertes Slack ou e-mail, A/B testing de prompts versionnés.",
    tags: ["Observabilité", "Versioning", "Alertes"],
    icon: (
      <svg {...ICON} aria-hidden>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M7 14l3-4 3 3 4-6" />
        <path d="M9 22h6" />
      </svg>
    ),
  },
];

function StepCard({
  step,
  index,
  expanded = false,
}: {
  step: AnatomyStep;
  index: number;
  expanded?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label={`${step.title} — ${step.pitch}`}
      tabIndex={expanded ? undefined : 0}
      className="group relative flex h-full w-full min-w-0 flex-col items-center rounded-2xl border border-border-subtle bg-bg-card/55 px-5 py-6 text-center backdrop-blur-xl transition-all duration-500 hover:border-accent-primary/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60 sm:px-6"
      style={{
        boxShadow:
          "0 18px 50px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Letter badge */}
      <div className="relative">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-primary/30 bg-bg-card"
          style={{
            boxShadow: "0 0 24px rgba(139,92,246,0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          <span className="font-display text-2xl font-bold text-gradient-strong">
            {step.letter}
          </span>
        </div>
        <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full border border-border-subtle bg-bg-card px-1.5 font-mono text-[10px] text-text-tertiary">
          {step.number}
        </span>
      </div>

      <div className="mt-3 flex h-7 w-7 items-center justify-center rounded-md border border-border-subtle bg-bg-card/60">
        {step.icon}
      </div>

      <h3 className="mt-3 text-lg font-semibold tracking-tight text-text-primary">
        {step.title}
      </h3>
      <p className="mt-2 max-w-[18ch] text-[13px] leading-relaxed text-text-secondary">
        {step.pitch}
      </p>

      {/* Mobile expanded detail (always visible) */}
      {expanded && (
        <div className="mt-4 w-full border-t border-border-subtle/60 pt-3 text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
            Comment c&apos;est implémenté
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-text-secondary">
            {step.detail}
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1">
            {step.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-border-subtle bg-bg-card/70 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-accent-light"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop hover popover (only when not expanded) */}
      {!expanded && (
        <div
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-40 mt-3 w-[min(260px,calc(100vw-32px))] -translate-x-1/2 translate-y-1 rounded-xl border border-border-subtle px-4 py-3 text-left opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
          style={{
            background: "color-mix(in srgb, var(--color-bg-card) 92%, transparent)",
            boxShadow:
              "0 22px 60px rgba(0,0,0,0.55), 0 0 28px rgba(139,92,246,0.28), inset 0 1px 0 rgba(255,255,255,0.04)",
            borderTop: "1.5px solid color-mix(in srgb, var(--color-accent-primary) 50%, transparent)",
          }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
            {step.number} · {step.title}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
            {step.detail}
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-1">
            {step.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-border-subtle bg-bg-card/70 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-accent-light"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      <span aria-hidden className="sr-only">
        Étape {index + 1} sur {STEPS.length}
      </span>
    </div>
  );
}

function Arrow({ vertical, reduced }: { vertical: boolean; reduced: boolean }) {
  if (vertical) {
    return (
      <div className="flex justify-center py-1" aria-hidden>
        <svg width="20" height="36" viewBox="0 0 20 36" className="overflow-visible">
          <defs>
            <linearGradient id="anat-vgrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <motion.path
            d="M10 2 L10 28"
            fill="none"
            stroke="url(#anat-vgrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <path
            d="M5 26 L10 32 L15 26"
            fill="none"
            stroke="url(#anat-vgrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center" aria-hidden>
      <svg width="48" height="20" viewBox="0 0 48 20" className="overflow-visible">
        <defs>
          <linearGradient id="anat-hgrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <motion.path
          d="M4 10 L38 10"
          fill="none"
          stroke="url(#anat-hgrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <path
          d="M34 5 L42 10 L34 15"
          fill="none"
          stroke="url(#anat-hgrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function AgentAnatomyDiagram() {
  const { shouldReduceMotion, mounted } = usePerformanceMode();
  if (!mounted) return <section className="section-shell" aria-hidden />;

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Anatomie d'un agent"
          title={
            <>
              Un agent IA fiable n&apos;est pas un chatbot, c&apos;est une{" "}
              <span className="text-gradient-strong">chaîne d&apos;exécution contrôlée</span>.
            </>
          }
          description="Quatre couches qui se renforcent : ce qu'il sait, comment il décide, ce qu'il fait, comment vous le supervisez."
        />

        {/* Desktop horizontal */}
        <div className="relative hidden lg:block">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-3">
            <StepCard step={STEPS[0]} index={0} />
            <Arrow vertical={false} reduced={shouldReduceMotion} />
            <StepCard step={STEPS[1]} index={1} />
            <Arrow vertical={false} reduced={shouldReduceMotion} />
            <StepCard step={STEPS[2]} index={2} />
            <Arrow vertical={false} reduced={shouldReduceMotion} />
            <StepCard step={STEPS[3]} index={3} />
          </div>
        </div>

        {/* Mobile / tablet vertical — detail toujours visible */}
        <div className="lg:hidden">
          <div className="mx-auto max-w-md">
            <StepCard step={STEPS[0]} index={0} expanded />
            <Arrow vertical reduced={shouldReduceMotion} />
            <StepCard step={STEPS[1]} index={1} expanded />
            <Arrow vertical reduced={shouldReduceMotion} />
            <StepCard step={STEPS[2]} index={2} expanded />
            <Arrow vertical reduced={shouldReduceMotion} />
            <StepCard step={STEPS[3]} index={3} expanded />
          </div>
        </div>

        <p className="mx-auto mt-12 hidden max-w-2xl text-center text-[11px] uppercase tracking-[0.22em] text-text-tertiary lg:block">
          Survolez chaque étape pour voir comment elle est implémentée
        </p>
      </div>
    </section>
  );
}
