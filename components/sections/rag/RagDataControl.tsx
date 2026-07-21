"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolBadge } from "@/components/ui/ToolBadge";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { RAG_GUARANTEES, RAG_TECH_STACK } from "./ragDataControlData";

export function RagDataControl() {
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
          label="Garanties"
          title={
            <>
              Vos données restent{" "}
              <span className="text-gradient-strong">sous contrôle</span>.
            </>
          }
          description="Six engagements concrets sur la circulation, la protection et la traçabilité de vos documents. Pas de promesse vague : des règles applicables."
        />

        <motion.div
          className="mx-auto grid max-w-[1180px] gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
          {...parentProps}
        >
          {RAG_GUARANTEES.map((g) => (
            <motion.div
              key={g.title}
              variants={itemVariants}
              className="relative rounded-2xl border border-cyan/25 bg-bg-card/65 p-5 transition-colors duration-500 hover:border-cyan/50 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/40 bg-bg-card shadow-[0_0_14px_var(--color-cyan-glow)]"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold leading-snug text-text-primary sm:text-[17px]">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-[14px]">
                    {g.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mx-auto mt-12 max-w-[1080px] rounded-2xl border border-border-subtle bg-bg-card/40 p-5 sm:p-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
            Pour les techniques · stack possible
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {RAG_TECH_STACK.map((t) => (
              <ToolBadge key={t} name={t} />
            ))}
          </div>
          <p className="mt-4 text-xs text-text-tertiary sm:text-[13px]">
            Exemples non exhaustifs. La stack exacte dépend de votre volumétrie et
            de votre cadre de souveraineté : toutes les briques sont hébergeables
            en UE.
          </p>
        </div>
      </div>
    </section>
  );
}
