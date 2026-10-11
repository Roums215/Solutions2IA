"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Eye, History, LockKeyhole, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { StepStack } from "@/components/shared/StepStack";
import { AUTONOMY, CONTROL_GATE, CONTROL_QUESTIONS, CONTROL_STACK, type ControlLevel } from "./aiPageData";

/**
 * /agents-ia, « Vous gardez le contrôle » (sombre). Fusion V3 de l'autonomie et de la
 * confiance : UN schéma (demande → comprendre → préparer → décider → agir → tracer), en
 * plan coché et pile d'objets depuis octobre 2026 (StepStack, plus de frise à points), et
 * un verrou humain qui se place dans ce même plan selon le niveau choisi. Dessous,
 * quatre questions en lignes sobres (accordéons natifs), pas six cartes.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const LOCK_ICON: Record<ControlLevel, LucideIcon> = { 1: LockKeyhole, 2: Eye, 3: History };

export function AiAutonomy() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const [level, setLevel] = useState<ControlLevel>(1);
  const a = AUTONOMY[level - 1];
  const gate = CONTROL_GATE[level];
  const LockIcon = LOCK_ICON[level];

  return (
    <section id="controle" aria-labelledby="ai-control-heading" className="section-shell-tight relative isolate scroll-mt-24 overflow-hidden">
      <SectionFluidBackdrop variant="aiDark" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="ai-control-heading"
          label="Vous gardez le contrôle"
          title={
            <>
              Vous choisissez <span className="text-gradient-strong">ce qu&apos;il peut faire seul</span>.
            </>
          }
          description="Chaque tâche a sa règle. On commence au niveau 1, et on ne monte d'un cran que si vous êtes à l'aise. Toute exception revient vers vous."
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-12">
          {/* Le niveau */}
          <div role="radiogroup" aria-label="Niveau d'autonomie" className="divide-y divide-border-medium border-y border-border-medium">
            {AUTONOMY.map((x) => {
              const on = x.level === level;
              return (
                <button
                  key={x.level}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setLevel(x.level)}
                  className={cn(
                    "relative flex w-full items-start gap-4 py-4 pl-4 pr-2 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                    on ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary",
                  )}
                >
                  {on && <motion.span layoutId="ai-level-bar" className="absolute inset-y-3 left-0 w-[2px] rounded-full bg-accent-light" transition={{ type: "spring", bounce: 0.15, visualDuration: instant ? 0 : 0.35 }} />}
                  <span className={cn("pt-0.5 font-mono text-[12px] font-semibold", on ? "text-cyan" : "")}>0{x.level}</span>
                  <span className="min-w-0">
                    <span className="block text-[16px] font-semibold">{x.title}</span>
                    <span className={cn("mt-0.5 block text-[13.5px] leading-snug", on ? "text-text-secondary" : "text-text-tertiary")}>{x.line}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Le schéma : le même flux, le verrou change de place */}
          <div className="relative">
            <StepStack
              steps={CONTROL_STACK}
              heading={`Niveau ${level} · ${a.title}`}
              icon={LockIcon}
              tone="dark"
              stopAt={level === 1 ? gate : undefined}
              lockAt={gate}
              lockLabel={a.lock}
              resetKey={level}
            />

            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={level}
                initial={instant ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={instant ? undefined : { opacity: 0, y: -3 }}
                transition={{ duration: instant ? 0 : 0.25, ease: EASE }}
                className="mt-7 text-[14.5px] leading-relaxed text-text-secondary"
              >
                <span className="text-text-tertiary">Par exemple : </span>
                {a.example}.
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Les questions qu'on me pose, en lignes sobres */}
        <ul className="mt-12 grid border-t border-border-medium md:grid-cols-2 md:gap-x-10">
          {CONTROL_QUESTIONS.map((c) => {
            const Icon = c.icon;
            return (
              <li key={c.q} className="border-b border-border-medium">
                <details className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center gap-3 text-[15.5px] font-semibold text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan [&::-webkit-details-marker]:hidden">
                    <Icon size={16} strokeWidth={1.9} className="shrink-0 text-cyan" aria-hidden />
                    <span className="flex-1">{c.q}</span>
                    <ChevronDown size={16} className="shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="mt-2.5 pl-7 text-[14.5px] leading-relaxed text-text-secondary">{c.a}</p>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
