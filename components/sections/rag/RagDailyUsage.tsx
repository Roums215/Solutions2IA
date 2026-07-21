"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { cn } from "@/lib/utils/cn";
import { DAILY_MOMENTS } from "./ragDailyMomentsData";

export function RagDailyUsage() {
  const { mounted, isMobile, shouldReduceMotion, isCoarsePointer, disableContentMotion } =
    usePerformanceMode();
  const staticRender = !mounted || disableContentMotion || isMobile;
  const allow3D =
    mounted && !isMobile && !isCoarsePointer && !shouldReduceMotion;

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
          label="Usage quotidien"
          title={
            <>
              Une journée avec votre{" "}
              <span className="text-gradient-strong">mémoire branchée</span>.
            </>
          }
          description="Quatre moments concrets d'utilisation, du matin à la fin de journée. La mémoire métier ne change pas votre quotidien : elle l'allège."
        />

        <motion.div
          className={cn(
            "mx-auto grid max-w-[1180px] gap-5 sm:gap-6 sm:grid-cols-2",
            allow3D && "[perspective:1400px] [perspective-origin:50%_30%]",
          )}
          {...parentProps}
        >
          {DAILY_MOMENTS.map((m) => (
            <motion.article
              key={m.time}
              variants={itemVariants}
              className={cn(
                "group relative h-full rounded-2xl border border-border-subtle bg-bg-card/65 p-6 transition-all duration-700 ease-out sm:p-7",
                allow3D
                  ? "[transform:rotateY(-3deg)_rotateX(1.5deg)] [transform-style:preserve-3d] hover:[transform:rotateY(0deg)_rotateX(0deg)] hover:border-cyan/40 hover:shadow-[0_24px_60px_rgba(11,14,26,0.42)]"
                  : "hover:border-cyan/40",
              )}
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />

              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan/85">
                {m.time}
              </div>
              <h3 className="mt-2 text-base font-semibold text-text-primary sm:text-lg">
                {m.who}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
                {m.scene}
              </p>

              <div className="mt-5 inline-flex max-w-full items-start gap-2 rounded-xl border border-border-subtle bg-bg-card px-3 py-2 text-[13px]">
                <svg
                  aria-hidden
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-text-tertiary"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <span className="text-text-secondary">{m.question}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
