"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const CLASSIC = [
  "Peut inventer une réponse plausible.",
  "Ne connaît pas vos documents internes.",
  "Réponses non vérifiables.",
];

const RAG = [
  "Répond avec vos sources internes.",
  "Retrouve les passages exacts du document.",
  "Réponses vérifiables, citations affichables.",
];

export function RagContrastClassicVsRag() {
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
          label="La différence"
          title={
            <>
              Une IA classique vs un{" "}
              <span className="text-gradient-strong">RAG métier</span>.
            </>
          }
          description="Même question, deux postures opposées. Le RAG métier répond avec vos documents, pas avec des suppositions."
        />

        <motion.div
          className="mx-auto grid max-w-[960px] gap-5 sm:gap-6 lg:grid-cols-2"
          {...parentProps}
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-border-subtle bg-bg-card/45 p-6 sm:p-7"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
              IA classique
            </div>
            <h3 className="mt-2 text-lg font-semibold text-text-tertiary sm:text-xl">
              Improvise. Ne sait pas. Ne cite pas.
            </h3>
            <ul className="mt-5 space-y-3">
              {CLASSIC.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 text-sm leading-snug text-text-tertiary sm:text-[15px]"
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
                    className="mt-0.5 shrink-0 text-text-tertiary/70"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative rounded-2xl border border-cyan/40 bg-bg-card p-6 shadow-[0_0_40px_var(--color-cyan-glow)] sm:p-7"
          >
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan">
              RAG métier
            </div>
            <h3 className="mt-2 text-lg font-semibold text-text-primary sm:text-xl">
              Répond avec vos documents. Cite ses sources.
            </h3>
            <ul className="mt-5 space-y-3">
              {RAG.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 text-sm leading-snug text-text-primary sm:text-[15px]"
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
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
