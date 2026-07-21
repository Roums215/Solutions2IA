"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { RAG_REAL_EXAMPLES } from "./ragRealExamplesData";

export function RagRealExamples() {
  const { mounted, isMobile, disableContentMotion } = usePerformanceMode();
  const staticRender = !mounted || disableContentMotion || isMobile;

  const parentProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Cas concrets"
          title={
            <>
              Six cas concrets,{" "}
              <span className="text-gradient-strong">tirés du quotidien</span>.
            </>
          }
          description="Pour chaque métier, une vraie question posée : la réponse attendue, et le document source qui la justifie."
        />

        <motion.div
          className="mx-auto grid max-w-[1180px] gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
          {...parentProps}
        >
          {RAG_REAL_EXAMPLES.map((ex) => (
            <motion.article
              key={ex.sector}
              variants={itemVariants}
              className="group relative flex h-full flex-col rounded-2xl border border-border-subtle bg-bg-card/55 p-5 transition-colors duration-500 hover:border-cyan/40 sm:p-6"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />

              <header>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan/85">
                  {ex.sector}
                </span>
              </header>

              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                    Question
                  </div>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-primary sm:text-[15px]">
                    {ex.question}
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                    Réponse
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary sm:text-[14px]">
                    {ex.response}
                  </p>
                </div>
              </div>

              <footer className="mt-auto space-y-2 pt-4">
                <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-cyan/40 bg-bg-card px-3 py-1.5 text-[11px] sm:text-xs">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  <span className="text-text-tertiary">Source :</span>
                  <span className="font-medium text-text-primary">
                    {ex.source}
                  </span>
                </div>
                <div className="text-[10px] italic text-text-tertiary sm:text-[11px]">
                  À valider selon votre contexte métier.
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-text-tertiary sm:text-sm">
          Exemples illustratifs construits à partir de situations PME réelles. Aucun
          document client n&apos;est exposé.
        </p>
      </div>
    </section>
  );
}
