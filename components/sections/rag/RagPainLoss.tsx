"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { cn } from "@/lib/utils/cn";

type Pain = {
  title: string;
  detail: string;
};

const PAINS: Pain[] = [
  {
    title: "Un collaborateur part",
    detail: "Son savoir part avec lui — procédures, contacts, gestes métier.",
  },
  {
    title: "Une procédure est introuvable",
    detail: "Sur quel Drive ? Quel dossier ? Quelle version ?",
  },
  {
    title: "Les réponses diffèrent selon les personnes",
    detail: "Version A ou B ? Personne n'est sûr.",
  },
  {
    title: "L'onboarding traîne",
    detail: "Chaque nouveau remobilise les mêmes référents pendant des semaines.",
  },
  {
    title: "L'info se cherche partout",
    detail: "Slack, mails, Drive, Notion, têtes — jamais un seul endroit.",
  },
];

const GAINS = [
  "Le savoir est conservé.",
  "Les procédures sont retrouvées instantanément.",
  "Les réponses sont sourcées, vérifiables.",
  "L'onboarding devient autonome.",
  "L'information vit dans un seul endroit consultable.",
];

export function RagPainLoss() {
  const { mounted, isMobile, shouldReduceMotion, isCoarsePointer } =
    usePerformanceMode();
  const staticRender = !mounted || shouldReduceMotion || isMobile;
  const allow3D = mounted && !isMobile && !isCoarsePointer && !shouldReduceMotion;

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
          label="Le coût silencieux"
          title={
            <>
              Pourquoi les entreprises{" "}
              <span className="text-gradient-strong">perdent leur savoir</span>.
            </>
          }
          description="Cinq fuites silencieuses, sur lesquelles aucune équipe ne met de chiffre — mais que tout le monde paie."
        />

        <motion.div
          className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12"
          {...parentProps}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 sm:gap-4"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
              Sans mémoire métier
            </div>
            {PAINS.map((p, i) => (
              <motion.div
                key={p.title}
                variants={itemVariants}
                className="rounded-xl border border-border-subtle bg-bg-card/55 px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-card text-[11px] font-semibold text-text-tertiary"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-text-primary sm:text-[15px]">
                      {p.title}
                    </div>
                    <p className="mt-0.5 text-xs leading-snug text-text-secondary sm:text-[13px]">
                      {p.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div
              className={cn(
                "h-full",
                allow3D && "[perspective:1400px] [perspective-origin:50%_30%]",
              )}
            >
              <div
                className={cn(
                  "relative h-full rounded-2xl border border-cyan/40 bg-gradient-to-b from-cyan/[0.08] to-accent-primary/[0.08] p-6 shadow-[0_0_56px_var(--color-cyan-glow)] sm:p-8",
                  allow3D
                    ? "[transform:rotateY(-4deg)_rotateX(2deg)] [transform-style:preserve-3d] transition-transform duration-700 ease-out hover:[transform:rotateY(0deg)_rotateX(0deg)]"
                    : "",
                )}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan">
                  Avec une mémoire métier
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-tight text-text-primary sm:text-2xl">
                  Le savoir reste,{" "}
                  <span className="text-gradient-strong">l&apos;équipe avance</span>.
                </h3>

                <ul className="mt-5 space-y-3">
                  {GAINS.map((g) => (
                    <li
                      key={g}
                      className="flex items-start gap-3 text-sm leading-snug text-text-secondary sm:text-[15px]"
                    >
                      <svg
                        aria-hidden
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 shrink-0 text-cyan"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-bg-card px-3 py-1.5 text-[11px] sm:text-xs">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
                    <span className="text-text-tertiary">Promesse :</span>
                    <span className="font-medium text-text-primary">
                      votre entreprise arrête de perdre son savoir.
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan/85 sm:text-xs">
                    Sécurise la continuité opérationnelle.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm italic text-text-tertiary sm:text-base">
          « La mémoire métier conserve, retrouve et transmet. »
        </p>
      </div>
    </section>
  );
}
