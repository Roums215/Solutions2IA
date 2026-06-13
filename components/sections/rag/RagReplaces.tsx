"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const AVANT = [
  "« Demande à Julien, lui il sait. »",
  "« Je crois que le document est dans Drive. »",
  "« Je ne retrouve plus la dernière procédure. »",
  "« Attends, je vais chercher. »",
];

const APRES = [
  "Une question → une réponse sourcée.",
  "Un document retrouvé.",
  "Une procédure retrouvée instantanément.",
  "Plus besoin de chercher : la mémoire le sait.",
];

export function RagReplaces() {
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

  const tracePathVariants = staticRender
    ? undefined
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 1.2, ease: PREMIUM_EASE, delay: 0.6 },
        },
      };

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Au quotidien"
          title={
            <>
              Ce que le RAG{" "}
              <span className="text-gradient-strong">remplace</span> au quotidien.
            </>
          }
          description="Le travail invisible que vos équipes font pour retrouver l'information — c'est lui que la mémoire métier prend en charge."
        />

        <motion.div
          className="relative mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10"
          {...parentProps}
        >
          <motion.div variants={itemVariants} className="space-y-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
              Avant
            </div>
            {AVANT.map((a) => (
              <motion.div
                key={a}
                variants={itemVariants}
                className="rounded-xl border border-border-subtle bg-bg-card/45 px-4 py-3 text-sm italic leading-snug text-text-tertiary sm:text-[15px]"
              >
                {a}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center lg:h-full"
            aria-hidden
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className="lg:h-[200px] lg:w-[80px]"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="rag-replaces-trace" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-cyan)" />
                  <stop offset="100%" stopColor="var(--color-accent-primary)" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 20 10 C 60 30, 20 50, 60 70"
                fill="none"
                stroke="url(#rag-replaces-trace)"
                strokeWidth="2"
                strokeLinecap="round"
                variants={tracePathVariants}
              />
              {/* Arrow head */}
              <motion.path
                d="M 56 64 L 60 70 L 54 72"
                fill="none"
                stroke="url(#rag-replaces-trace)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={itemVariants}
              />
            </svg>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan">
              Après
            </div>
            {APRES.map((a) => (
              <motion.div
                key={a}
                variants={itemVariants}
                className="rounded-xl border border-cyan/30 bg-bg-card/80 px-4 py-3 text-sm leading-snug text-text-primary shadow-[0_0_18px_var(--color-cyan-glow)] sm:text-[15px]"
              >
                {a}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-text-tertiary sm:text-base">
          La mémoire métier ne remplace pas vos équipes. Elle leur rend{" "}
          <span className="text-text-secondary">le temps qu&apos;elles passent à chercher</span>.
        </p>
      </div>
    </section>
  );
}
