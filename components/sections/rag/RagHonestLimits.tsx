"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

type Limit = {
  title: string;
  detail: string;
};

const LIMITS: Limit[] = [
  {
    title: "Elle peut afficher ses sources, sans les afficher toujours.",
    detail:
      "Le format dépend du type de réponse (synthèse, comparaison, résumé). Les sources restent consultables sur demande, document par document.",
  },
  {
    title: "Elle ne remplace pas l'expertise.",
    detail:
      "Elle aide vos experts à retrouver l'information, pas à former un jugement métier à leur place.",
  },
  {
    title: "Elle dépend de la qualité de vos documents.",
    detail:
      "Si une procédure n'est plus à jour, la réponse non plus. Le tri et la mise à jour du corpus restent votre décision.",
  },
];

export function RagHonestLimits() {
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
    <section className="section-shell-tight">
      <div className="section-container">
        <SectionHeading
          label="Honnêteté"
          title={
            <>
              Ce que cette mémoire{" "}
              <span className="text-gradient-strong">ne fait pas</span>.
            </>
          }
          description="Trois limites que nous préférons poser avant l'engagement. La mémoire métier est puissante — pas magique."
        />

        <motion.div
          className="mx-auto grid max-w-[960px] gap-5 sm:gap-6 lg:grid-cols-3"
          {...parentProps}
        >
          {LIMITS.map((l) => (
            <motion.div
              key={l.title}
              variants={itemVariants}
              className="surface-card rounded-2xl p-6 sm:p-7"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-border-medium to-transparent" />
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                Limite
              </div>
              <h3 className="mt-2 text-base font-semibold leading-snug text-text-primary sm:text-lg">
                {l.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
                {l.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
