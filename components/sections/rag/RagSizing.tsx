"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

type SizeTier = {
  size: string;
  volume: string;
  persona: string;
};

const TIERS: SizeTier[] = [
  {
    size: "TPE",
    volume: "50 à 500 documents",
    persona: "1 dirigeant + une équipe",
  },
  {
    size: "PME",
    volume: "centaines à dizaines de milliers de documents",
    persona: "équipes spécialisées",
  },
  {
    size: "ETI · Groupe",
    volume: "plusieurs millions de pages",
    persona: "départements distribués",
  },
];

export function RagSizing() {
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

  return (
    <section className="section-shell-tight">
      <div className="section-container">
        <SectionHeading
          label="Échelle"
          title={
            <>
              Quelle{" "}
              <span className="text-gradient-strong">taille de mémoire métier</span>{" "}
              ?
            </>
          }
          description="La mémoire métier s'adapte à votre volumétrie. Le moteur ne change pas — seule la quantité d'information varie."
        />

        <motion.div
          className="mx-auto grid max-w-[1080px] gap-5 sm:gap-6 lg:grid-cols-3"
          {...parentProps}
        >
          {TIERS.map((t, i) => (
            <motion.div
              key={t.size}
              variants={itemVariants}
              className="metric-tile rounded-2xl p-6 text-center sm:p-7"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent-light/80">
                Échelle {i + 1}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-text-primary sm:text-[1.7rem]">
                {t.size}
              </h3>
              <p className="mt-3 text-sm leading-snug text-text-secondary sm:text-[15px]">
                {t.volume}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card px-3 py-1 text-[11px] text-text-tertiary sm:text-xs">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
                {t.persona}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base text-text-secondary sm:text-lg">
          Le moteur reste le même.{" "}
          <span className="text-gradient-strong font-medium">
            Seule la quantité d&apos;information change.
          </span>
        </p>
      </div>
    </section>
  );
}
