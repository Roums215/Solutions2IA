"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolBadge } from "@/components/ui/ToolBadge";
import { cn } from "@/lib/utils/cn";
import { RAG_SECTORS } from "./ragSectorsData";

export function RagSectorTabs() {
  const { mounted, shouldReduceMotion } = usePerformanceMode();
  const staticRender = !mounted || shouldReduceMotion;

  const [activeKey, setActiveKey] = useState(RAG_SECTORS[0].key);
  const active =
    RAG_SECTORS.find((s) => s.key === activeKey) ?? RAG_SECTORS[0];

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Adaptation métier"
          title={
            <>
              Une mémoire{" "}
              <span className="text-gradient-strong">adaptée à chaque métier</span>.
            </>
          }
          description="Le moteur est le même partout, le corpus change. Pour chaque secteur : documents connectés, vraie question métier, type de réponse, et le risque que la mémoire évite."
        />

        <div className="mx-auto max-w-[1080px]">
          <div
            role="tablist"
            aria-label="Secteurs métier"
            className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
          >
            {RAG_SECTORS.map((s) => {
              const isActive = s.key === activeKey;
              return (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveKey(s.key)}
                  className={cn(
                    "shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                    "min-h-[44px]",
                    isActive
                      ? "border-cyan/50 bg-bg-card text-text-primary shadow-[0_0_18px_var(--color-cyan-glow)]"
                      : "border-border-subtle bg-bg-card/55 text-text-secondary hover:border-border-medium hover:text-text-primary",
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={staticRender ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={staticRender ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid gap-6 rounded-2xl border border-border-subtle bg-bg-card/55 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan">
                    {active.label}
                  </span>

                  <div className="mt-4">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                      Documents connectés
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {active.sources.map((src) => (
                        <ToolBadge key={src} name={src} />
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                      Vraie question métier
                    </div>
                    <p className="mt-2 text-base font-medium leading-snug text-text-primary sm:text-lg">
                      {active.question}
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                      Type de réponse obtenue
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
                      {active.response_type}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-5 rounded-xl border border-cyan/30 bg-bg-primary/40 p-5 sm:p-6">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan/80">
                      Usage recommandé
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-bg-card px-3 py-1.5 text-sm font-semibold text-text-primary">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
                      {active.recommended_usage.label}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light/85">
                      <svg
                        aria-hidden
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                      </svg>
                      Risque évité
                    </div>
                    <p className="mt-2 text-sm leading-snug text-text-primary sm:text-[15px]">
                      {active.risk_avoided}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                      Citation type
                    </div>
                    <div className="mt-2 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-cyan/40 bg-bg-card px-3 py-1.5 text-[11px] sm:text-xs">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
                      <span className="text-text-tertiary">Source :</span>
                      <span className="font-medium text-text-primary">
                        {active.citation_chip}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
