"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

type Risk = {
  title: string;
  detail: string;
};

const RISKS: Risk[] = [
  {
    title: "Perte de savoir lors d'un départ",
    detail:
      "Un référent quitte l'entreprise, ses connaissances métier restent — dans la mémoire, sourcées, consultables.",
  },
  {
    title: "Mauvaise réponse client",
    detail:
      "Plus de réponses approximatives livrées sous pression — chaque retour client peut être tracé jusqu'à la procédure.",
  },
  {
    title: "Erreur de procédure",
    detail:
      "L'équipe applique la dernière version validée, pas la photocopie de l'année dernière qui traîne sur un bureau.",
  },
  {
    title: "Audit compliqué",
    detail:
      "Chaque décision opérationnelle peut citer le document d'origine — l'audit devient une vérification, pas une enquête.",
  },
  {
    title: "Dépendance à une seule personne",
    detail:
      "La connaissance ne dépend plus d'un sachant unique. La transmission est continue, sans goulot d'étranglement.",
  },
];

export function RagAvoids() {
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
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Risques évités"
          title={
            <>
              Les pertes silencieuses{" "}
              <span className="text-gradient-strong">qu&apos;elle prévient</span>.
            </>
          }
          description="Cinq risques que la mémoire métier neutralise au quotidien. Aucun ne se mesure facilement — tous coûtent cher quand ils surviennent."
        />

        <motion.div
          className="mx-auto grid max-w-[1080px] gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
          {...parentProps}
        >
          {RISKS.map((r) => (
            <motion.div
              key={r.title}
              variants={itemVariants}
              className="relative rounded-2xl border border-border-subtle bg-bg-card/60 p-5 transition-colors duration-500 hover:border-cyan/40 sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/30 bg-bg-card"
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
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-[14px]">
                    {r.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base italic text-text-secondary sm:text-lg">
          « La mémoire métier{" "}
          <span className="text-text-primary">conserve, retrouve et transmet</span>{" "}
          l&apos;information. »
        </p>
      </div>
    </section>
  );
}
