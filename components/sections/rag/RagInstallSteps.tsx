"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { INSTALL_STEPS, INSTALL_AVG } from "./ragInstallStepsData";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function RagInstallSteps() {
  const { mounted, isMobile, shouldReduceMotion } = usePerformanceMode();
  const staticRender = !mounted || shouldReduceMotion || isMobile;

  const parentProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  const railVariants = staticRender
    ? undefined
    : {
        hidden: { scaleX: 0 },
        visible: {
          scaleX: 1,
          transition: { duration: 1.4, ease: PREMIUM_EASE, delay: 0.2 },
        },
      };

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Installation"
          title={
            <>
              Comment on{" "}
              <span className="text-gradient-strong">l&apos;installe</span>,
              étape par étape.
            </>
          }
          description={`Cinq étapes claires, du cadrage au support continu. ${INSTALL_AVG}`}
        />

        <motion.div className="mx-auto max-w-[1180px]" {...parentProps}>
          {/* Desktop: horizontal timeline */}
          <div className="relative hidden lg:block">
            <motion.div
              variants={railVariants}
              style={{ transformOrigin: "left" }}
              className="absolute left-[5%] right-[5%] top-[42px] h-px origin-left bg-gradient-to-r from-cyan/40 via-accent-primary/40 to-cyan/40"
              aria-hidden
            />

            <div className="relative grid grid-cols-5 gap-3">
              {INSTALL_STEPS.map((s) => (
                <motion.div
                  key={s.n}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    aria-hidden
                    className="relative grid h-[84px] w-[84px] place-items-center rounded-full border border-cyan/40 bg-bg-card text-2xl font-bold text-cyan shadow-[0_0_24px_var(--color-cyan-glow)]"
                  >
                    {s.n}
                  </div>
                  <div className="mt-5 text-[15px] font-semibold leading-snug text-text-primary">
                    {s.label}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {s.deliverable}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile + tablet: vertical stack */}
          <div className="relative space-y-5 lg:hidden">
            <div
              aria-hidden
              className="absolute left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan/40 via-accent-primary/40 to-cyan/40"
            />
            {INSTALL_STEPS.map((s) => (
              <motion.div
                key={s.n}
                variants={itemVariants}
                className="relative flex items-start gap-4"
              >
                <div
                  aria-hidden
                  className="relative z-10 grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border border-cyan/40 bg-bg-card text-base font-bold text-cyan shadow-[0_0_18px_var(--color-cyan-glow)]"
                >
                  {s.n}
                </div>
                <div className="min-w-0 pt-1">
                  <div className="text-[15px] font-semibold leading-snug text-text-primary">
                    {s.label}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                    {s.deliverable}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-text-tertiary sm:text-sm">
          Durée moyenne : <span className="text-text-secondary">{INSTALL_AVG}</span>{" "}
          Aucune réécriture de vos documents — vos sources restent en place.
        </p>
      </div>
    </section>
  );
}
