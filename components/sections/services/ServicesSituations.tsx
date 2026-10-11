"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Clock3 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { SITUATIONS } from "./servicesPageData";

/**
 * /services, « Vous vous reconnaissez ? » (sombre, id="situations"). Avant / après : le
 * visiteur choisit la situation qui lui ressemble ; à gauche ce qui se passe aujourd'hui
 * (tracé en pointillés, la dernière étape est celle qui coûte), à droite la même chose avec
 * le bon outil (tracé net, étapes cochées). Le lien mène au service qui y répond.
 * C'est la case « pour qui » de l'ordre imposé.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ServicesSituations() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const [key, setKey] = useState(SITUATIONS[0].key);
  const s = SITUATIONS.find((x) => x.key === key) ?? SITUATIONS[0];

  return (
    <section id="situations" aria-labelledby="svc-situations-heading" className="section-shell-tight relative isolate scroll-mt-24 overflow-hidden">
      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="svc-situations-heading"
          label="Vous vous reconnaissez ?"
          title={
            <>
              Votre situation, <span className="text-gradient-strong">avant et après</span>.
            </>
          }
          description="Choisissez celle qui vous ressemble. À gauche, ce qui se passe aujourd'hui ; à droite, la même chose avec le bon outil."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-10">
          {/* Les situations */}
          <div
            role="group"
            aria-label="Choisir une situation"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:divide-y lg:divide-border-medium lg:overflow-visible lg:border-y lg:border-border-medium lg:px-0 lg:pb-0"
          >
            {SITUATIONS.map((x) => {
              const on = x.key === key;
              return (
                <button
                  key={x.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setKey(x.key)}
                  className={cn(
                    "relative min-h-11 shrink-0 rounded-full px-4 py-2.5 text-left text-[14px] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan lg:rounded-none lg:px-4 lg:py-4 lg:text-[15px]",
                    on
                      ? "bg-paper text-ink lg:bg-transparent lg:text-text-primary"
                      : "text-text-secondary ring-1 ring-border-medium hover:text-text-primary lg:ring-0",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="svc-situation-bar"
                      aria-hidden
                      className="absolute inset-y-3 left-0 hidden w-[2px] rounded-full bg-cyan lg:block"
                      transition={{ type: "spring", bounce: 0.15, visualDuration: instant ? 0 : 0.35 }}
                    />
                  )}
                  {x.label}
                </button>
              );
            })}
          </div>

          {/* Avant / après */}
          <div className="relative">
            <div aria-hidden data-decor="halo" className="pointer-events-none absolute right-[5%] top-[10%] h-[70%] w-[55%] rounded-full bg-cyan/18 blur-[100px]" />
            <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[0%] bottom-[0%] h-[60%] w-[50%] rounded-full bg-accent-primary/25 blur-[100px]" />
            <p className="sr-only" aria-live="polite">{`Avant et après : ${s.label}`}</p>
            <GlassPanel className="rounded-[28px] p-5 sm:p-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={s.key}
                  initial={instant ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={instant ? undefined : { opacity: 0, y: -6, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-5">
                    {/* Aujourd'hui */}
                    <div>
                      <p className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                        <Clock3 size={14} strokeWidth={2} aria-hidden />
                        Aujourd&apos;hui
                      </p>
                      <ol className="relative mt-4 space-y-3.5">
                        <span aria-hidden className="absolute bottom-3 left-[0.6875rem] top-3 border-l border-dashed border-border-medium" />
                        {s.before.map((step, i) => {
                          const last = i === s.before.length - 1;
                          return (
                            <li key={step} className="relative flex items-start gap-3">
                              <span
                                aria-hidden
                                className={cn(
                                  "relative grid h-[1.375rem] w-[1.375rem] shrink-0 place-items-center rounded-full bg-bg-secondary font-mono text-[10.5px] ring-1",
                                  last ? "text-warning ring-warning/50" : "text-text-tertiary ring-border-medium",
                                )}
                              >
                                {i + 1}
                              </span>
                              <span className={cn("text-[14.5px] leading-snug", last ? "font-medium text-warning" : "text-text-secondary")}>{step}</span>
                            </li>
                          );
                        })}
                      </ol>
                    </div>

                    {/* Le passage */}
                    <div aria-hidden className="flex items-center justify-center">
                      <span className="grid h-10 w-10 rotate-90 place-items-center rounded-full bg-paper/[0.06] text-cyan ring-1 ring-paper/15 md:rotate-0">
                        <ArrowRight size={17} strokeWidth={2} />
                      </span>
                    </div>

                    {/* Avec l'outil */}
                    <div className="rounded-2xl bg-paper/[0.04] p-4 ring-1 ring-cyan/25">
                      <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-cyan">Avec : {s.serviceLabel}</p>
                      <ol className="relative mt-4 space-y-3.5">
                        <span aria-hidden className="absolute bottom-3 left-[0.6875rem] top-3 w-px bg-cyan/50" />
                        {s.after.map((step, i) => {
                          const last = i === s.after.length - 1;
                          return (
                            <li key={step} className="relative flex items-start gap-3">
                              <span aria-hidden className="relative grid h-[1.375rem] w-[1.375rem] shrink-0 place-items-center rounded-full bg-cyan text-bg-primary">
                                <Check size={12} strokeWidth={3} />
                              </span>
                              <span className={cn("text-[14.5px] leading-snug", last ? "font-semibold text-text-primary" : "text-text-secondary")}>{step}</span>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end border-t border-border-medium pt-4">
                    <Link
                      href={s.href}
                      className="group inline-flex items-center gap-1.5 rounded-sm text-[14.5px] font-semibold text-accent-light transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                    >
                      Voir : {s.serviceLabel}
                      <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
