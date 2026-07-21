"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import {
  WEB_VS_AGENCY_ROWS,
  WEB_VS_AGENCY_HEADERS,
  WEB_VS_AGENCY_CLOSING,
} from "./webVsAgencyData";

export function WebVsAgency() {
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
          label="La différence cœur"
          title={
            <>
              Pourquoi je ne suis pas{" "}
              <span className="text-gradient-strong">
                une agence web classique
              </span>
              .
            </>
          }
          description="Comparaison factuelle, sans dénigrement : juste ce que je fais en plus, et pourquoi ça change tout pour votre activité."
        />

        <motion.div
          className="mx-auto max-w-[1180px]"
          {...parentProps}
        >
          {/* En-têtes des 2 colonnes */}
          <motion.div
            variants={itemVariants}
            className="mb-5 grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-10"
          >
            <div className="rounded-2xl border border-border-subtle bg-bg-card/40 px-5 py-4 sm:px-6 sm:py-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-text-tertiary">
                Référence
              </div>
              <h3 className="mt-1.5 text-lg font-semibold leading-snug text-text-tertiary sm:text-xl">
                {WEB_VS_AGENCY_HEADERS.classic.label}
              </h3>
              <p className="mt-1 text-xs text-text-tertiary sm:text-[13px]">
                {WEB_VS_AGENCY_HEADERS.classic.sublabel}
              </p>
            </div>

            <div className="relative rounded-2xl border border-cyan/40 bg-bg-card px-5 py-4 shadow-[0_0_40px_var(--color-cyan-glow)] sm:px-6 sm:py-5">
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan">
                Ma posture
              </div>
              <h3 className="mt-1.5 text-lg font-semibold leading-snug text-text-primary sm:text-xl">
                {WEB_VS_AGENCY_HEADERS.s2ia.label}
              </h3>
              <p className="mt-1 text-xs text-text-secondary sm:text-[13px]">
                {WEB_VS_AGENCY_HEADERS.s2ia.sublabel}
              </p>
            </div>
          </motion.div>

          {/* 7 lignes contraste */}
          <motion.div
            variants={itemVariants}
            className="space-y-3 sm:space-y-3.5"
          >
            {WEB_VS_AGENCY_ROWS.map((row, i) => (
              <motion.div
                key={row.classic}
                variants={itemVariants}
                className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-10"
              >
                {/* Colonne gauche : agence classique */}
                <div className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-card/45 px-4 py-3">
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-card text-[10px] font-semibold text-text-tertiary"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-snug text-text-tertiary sm:text-[15px]">
                    {row.classic}
                  </span>
                </div>

                {/* Colonne droite : Solutions 2IA */}
                <div className="flex items-start gap-3 rounded-xl border border-cyan/30 bg-bg-card/70 px-4 py-3 shadow-[0_0_16px_var(--color-cyan-glow)]">
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cyan/40 bg-bg-card text-[10px] font-semibold text-cyan"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium leading-snug text-text-primary sm:text-[15px]">
                    {row.s2ia}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Phrase fermante */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-12"
          >
            <div className="mx-auto max-w-2xl rounded-2xl border border-cyan/40 bg-gradient-to-b from-cyan/[0.08] to-accent-primary/[0.06] px-6 py-5 text-center shadow-[0_0_40px_var(--color-cyan-glow)] sm:px-8 sm:py-6">
              <p className="text-base font-semibold leading-snug text-text-primary sm:text-lg">
                « {WEB_VS_AGENCY_CLOSING} »
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
