"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ChevronDown, Eye, History, LockKeyhole, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { AUTONOMY, CONTROL_FLOW, CONTROL_GATE, CONTROL_QUESTIONS, type ControlLevel } from "./aiPageData";

/**
 * /agents-ia, « Vous gardez le contrôle » (sombre). Fusion V3 de l'autonomie et de la
 * confiance : UN schéma (demande → comprendre → préparer → décider → agir → tracer) et
 * un verrou humain qui se déplace dans ce même schéma selon le niveau choisi. Dessous,
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
            <Trajectory />
            <LayoutGroup>
              <ol className="relative flex flex-col gap-3 md:grid md:grid-cols-6 md:gap-2" aria-label={`Niveau ${level} : ${a.lock} à l'étape ${CONTROL_FLOW[gate].label}`}>
                <span aria-hidden className="absolute bottom-5 left-[1.375rem] top-5 w-px bg-border-medium md:bottom-auto md:left-[8%] md:right-[8%] md:top-[4.875rem] md:h-px md:w-auto" />
                {CONTROL_FLOW.map((s, i) => {
                  const Icon = s.icon;
                  const waits = level === 1 && i > gate;
                  const here = i === gate;
                  return (
                    <li key={s.id} className="relative flex items-center gap-3 md:flex-col md:gap-2.5 md:pt-14">
                      <span
                        className={cn(
                          "relative grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 transition-[opacity,background-color] duration-500",
                          here ? "bg-accent-primary text-paper ring-accent-light" : "bg-bg-secondary text-cyan ring-border-medium",
                          waits && "opacity-45",
                        )}
                        aria-hidden
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className={cn("text-[14.5px] font-semibold transition-opacity duration-500 md:text-center", waits && "opacity-45")}>
                        {s.label}
                        {waits && <span className="block text-[11.5px] font-normal text-text-tertiary">après votre accord</span>}
                      </span>
                      {here && (
                        <motion.span
                          layoutId="ai-control-lock"
                          transition={{ type: "spring", bounce: 0.15, visualDuration: instant ? 0 : 0.55 }}
                          className="ml-auto inline-flex w-max items-center gap-1.5 whitespace-nowrap rounded-full bg-paper px-3 py-1.5 text-[12.5px] font-semibold text-ink md:absolute md:inset-x-0 md:top-0 md:mx-auto"
                        >
                          <LockIcon size={13} strokeWidth={2.2} className="text-accent-dark" aria-hidden />
                          {a.lock}
                        </motion.span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </LayoutGroup>

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

/** Une trajectoire fine qui passe derrière le schéma : le fil que suit chaque demande. */
function Trajectory() {
  return (
    <svg aria-hidden className="pointer-events-none absolute -inset-x-6 -top-10 hidden h-[calc(100%+5rem)] w-[calc(100%+3rem)] md:block" viewBox="0 0 800 240" preserveAspectRatio="none">
      <path d="M -20 170 C 140 60, 300 210, 420 120 C 540 30, 660 170, 820 70" fill="none" stroke="var(--color-accent-light)" strokeOpacity={0.14} strokeWidth={1} />
      <path d="M -20 200 C 180 120, 320 230, 480 150 C 600 90, 700 180, 820 120" fill="none" stroke="var(--color-cyan)" strokeOpacity={0.08} strokeWidth={1} />
    </svg>
  );
}
