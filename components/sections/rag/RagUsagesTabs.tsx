"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils/cn";
import { RAG_USAGES, type RagUsageKey } from "./ragUsagesData";
import { RagUsageSchema } from "./RagUsageSchema";

export function RagUsagesTabs() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const staticRender = !mounted || disableContentMotion;

  const [active, setActive] = useState<RagUsageKey>("simple");
  const activeUsage = RAG_USAGES.find((u) => u.key === active) ?? RAG_USAGES[0];

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Quatre usages, un seul moteur"
          title={
            <>
              Quatre façons d&apos;utiliser{" "}
              <span className="text-gradient-strong">votre mémoire métier</span>.
            </>
          }
          description="Un seul moteur, adapté à vos usages. Vos équipes choisissent la façon dont elles l'interrogent — vous gardez toujours la même mémoire métier."
        />

        <div className="mx-auto max-w-[1080px]">
          {/* Tabs bar */}
          <div
            role="tablist"
            aria-label="Usages de la mémoire d'entreprise"
            className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
          >
            {RAG_USAGES.map((u) => {
              const isActive = u.key === active;
              return (
                <button
                  key={u.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(u.key)}
                  className={cn(
                    "shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
                    "min-h-[44px]",
                    isActive
                      ? "border-cyan/50 bg-bg-card text-text-primary shadow-[0_0_20px_var(--color-cyan-glow)]"
                      : "border-border-subtle bg-bg-card/55 text-text-secondary hover:border-border-medium hover:text-text-primary",
                  )}
                >
                  {u.label}
                </button>
              );
            })}
          </div>

          {/* Active panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUsage.key}
                initial={staticRender ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={staticRender ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid gap-6 rounded-2xl border border-border-subtle bg-bg-card/55 p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10"
              >
                <div className="flex flex-col">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan">
                    Usage · {activeUsage.label}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold leading-tight text-text-primary sm:text-2xl">
                    {activeUsage.one_liner}
                  </h3>

                  <div className="mt-6">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                      Idéal quand…
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
                      {activeUsage.best_when}
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                      Exemple sectoriel
                    </div>
                    <div className="mt-2 rounded-xl border border-border-subtle bg-bg-card px-3 py-2.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan/80">
                        {activeUsage.sector_example.sector}
                      </span>
                      <p className="mt-1 text-xs leading-snug text-text-secondary sm:text-[13px]">
                        {activeUsage.sector_example.question}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-full rounded-xl border border-border-subtle bg-bg-primary/40 p-4 sm:p-6">
                    <RagUsageSchema usageKey={activeUsage.key} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-text-tertiary sm:text-sm">
            Un seul moteur. Quatre façons de s&apos;en servir. Vous pouvez combiner les usages selon
            vos équipes.
          </p>
        </div>
      </div>
    </section>
  );
}
