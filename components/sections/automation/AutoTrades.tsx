"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { TRADES, type StepKind } from "./autoPageData";

/**
 * /automatisation, par métier (sombre). Cinq onglets, UNE seule grande représentation :
 * un vrai mini workflow (déclencheur, conditions, actions, notification), et à côté
 * l'objet qu'il produit. Pas de grille de cartes identiques.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const KIND: Record<StepKind, string> = {
  Déclencheur: "bg-cyan/15 text-cyan",
  Condition: "bg-accent-primary/20 text-accent-light",
  Action: "bg-bg-primary/60 text-text-secondary ring-1 ring-border-medium",
  Notification: "bg-bg-primary/60 text-text-secondary ring-1 ring-border-medium",
};

const SHEET =
  "0 1px 2px color-mix(in oklab, var(--color-bg-primary) 70%, transparent), 0 24px 44px -24px color-mix(in oklab, var(--color-bg-primary) 95%, transparent)";

export function AutoTrades() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const [index, setIndex] = useState(0);
  const t = TRADES[index];

  return (
    <section id="metiers" aria-labelledby="auto-trades-heading" className="section-shell-tight relative isolate scroll-mt-24 overflow-hidden">
      <SectionFluidBackdrop variant="flowDark" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="auto-trades-heading"
          label="Par métier"
          title={
            <>
              Le même principe. <span className="text-gradient-strong">Des automatisations différentes selon votre métier.</span>
            </>
          }
          description="Choisissez un métier : le workflow se réécrit, avec ce qui le déclenche, ce qu'il vérifie et ce qu'il produit."
        />

        <div>
          <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Choisir un métier">
            <div className="flex min-w-max gap-1.5 border-b border-border-medium sm:min-w-0">
              {TRADES.map((x, i) => {
                const on = i === index;
                const Icon = x.icon;
                return (
                  <button
                    key={x.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="auto-trade-panel"
                    onClick={() => setIndex(i)}
                    className={cn(
                      "relative -mb-px flex items-center gap-2 whitespace-nowrap px-3.5 py-3 text-[14.5px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                      on ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary",
                    )}
                  >
                    <Icon size={16} strokeWidth={1.9} className={on ? "text-cyan" : ""} aria-hidden />
                    {x.label}
                    {on && <motion.span layoutId="auto-trade-underline" className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-cyan" transition={{ type: "spring", bounce: 0.15, visualDuration: instant ? 0 : 0.35 }} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div id="auto-trade-panel" role="tabpanel" aria-label={`Workflow : ${t.label}`} className="mt-7">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={t.id}
                className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:gap-10"
                initial={instant ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={instant ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: instant ? 0 : 0.3, ease: EASE }}
              >
                {/* Le workflow du métier */}
                <div className="panel-card overflow-hidden rounded-2xl">
                  <div className="flex items-center gap-2.5 border-b border-border-medium px-5 py-3">
                    <Workflow size={15} strokeWidth={1.9} className="text-cyan" aria-hidden />
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-text-secondary">Workflow · {t.label}</p>
                    <p className="ml-auto text-[12px] text-text-tertiary">Exemple</p>
                  </div>
                  <ol className="relative px-5 py-4">
                    <span aria-hidden className="absolute bottom-8 left-[2.45rem] top-8 w-px bg-cyan/35" />
                    {t.steps.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.li
                          key={s.title}
                          className="relative flex items-start gap-4 py-2.5"
                          initial={instant ? false : { opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: instant ? 0 : 0.3, delay: instant ? 0 : 0.08 + i * 0.07, ease: EASE }}
                        >
                          <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-bg-secondary text-cyan ring-1 ring-border-medium" aria-hidden>
                            <Icon size={16} strokeWidth={1.8} />
                          </span>
                          <span className="min-w-0 flex-1 pt-0.5">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-[16px] font-semibold text-text-primary">{s.title}</span>
                              <span className={cn("rounded-md px-1.5 py-0.5 text-[11px] font-semibold", KIND[s.kind])}>{s.kind}</span>
                            </span>
                            <span className="mt-0.5 block text-[14px] leading-snug text-text-secondary">{s.text}</span>
                          </span>
                        </motion.li>
                      );
                    })}
                  </ol>
                </div>

                {/* Ce que ça produit */}
                <div className="self-start">
                  <div className="overflow-hidden rounded-2xl bg-paper text-ink" style={{ boxShadow: SHEET }}>
                    <p className="border-b border-paper-line px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">Résultat</p>
                    <div className="px-4 py-4">
                      <p className="text-[16px] font-semibold">{t.result.title}</p>
                      <ul className="mt-3 space-y-2">
                        {t.result.lines.map((l) => (
                          <li key={l} className="flex items-center gap-2 text-[14px] text-ink-2">
                            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-cyan/20 text-ink" aria-hidden>
                              <Check size={10} strokeWidth={3} />
                            </span>
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="border-t border-paper-line bg-paper-2 px-4 py-1.5 text-[11px] text-ink-3">Données d&apos;exemple</p>
                  </div>
                  {t.href && (
                    <Link
                      href={t.href}
                      className="group mt-4 inline-flex items-center gap-1.5 rounded-sm text-[14px] font-medium text-accent-light transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
                    >
                      Le flux {t.label.toLowerCase()} en détail
                      <ArrowRight size={14} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
