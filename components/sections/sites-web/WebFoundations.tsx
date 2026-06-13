"use client";

import { motion, type Variants } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import {
  FOUNDATION_STRATES,
  FOUNDATION_PILIERS,
  FOUNDATION_SEPARATOR_LABEL,
  FOUNDATION_CLOSING,
  type FoundationStrate,
  type FoundationPilier,
} from "./webFoundationsData";

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * S10 V6.4.3 — Fondations (Vue split — Stack 4 strates + grille 8 piliers business).
 *
 * Couche VISIBILITÉ + PILOTAGE. Récap visuel de toute l'offre Solutions 2IA.
 * Niveau 1 : stack 4 strates (5s — récap architecture 4 couches).
 * Niveau 2 : grille 8 piliers business (10s — bénéfices détaillés).
 *
 * Motion Option B : draw one-shot whileInView once sur liseré vertical + cascade
 * strates puis grille. prefers-reduced-motion → tout statique au mount.
 *
 * Distinction CG B1 : stack horizontale + grille piliers, grammaire jamais
 * utilisée dans S1 fan-in, S2 flux vertical, S3 Pain 2-col, S4 vs Agence.
 */
export function WebFoundations() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const staticRender = !mounted || disableContentMotion;

  const parentProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  const barVariants: Variants | undefined = staticRender
    ? undefined
    : {
        hidden: { scaleY: 0 },
        visible: {
          scaleY: 1,
          transition: { duration: 0.8, ease: PREMIUM_EASE },
        },
      };

  return (
    <section
      className="section-shell-tight"
      aria-labelledby="foundations-heading"
    >
      <div className="section-container">
        <SectionHeading
          label="Fondations · ce sur quoi tout repose"
          title={
            <>
              Pourquoi ce système{" "}
              <span className="text-gradient-strong">
                fonctionne mieux qu&apos;un simple site
              </span>
              .
            </>
          }
          description="Quatre couches. Huit bénéfices. Voilà ce que votre site fait en plus pour vous au quotidien — sans que vous ayez à y penser."
        />

        <motion.div className="mx-auto max-w-[1100px]" {...parentProps}>
          {/* Cadre blueprint */}
          <div className="relative rounded-3xl border border-border-subtle bg-bg-card/30 px-4 py-8 sm:px-8 sm:py-10">
            {/* Faint grid backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-grid opacity-[0.06]"
            />

            {/* Boundary labels */}
            <motion.div
              variants={itemVariants}
              className="relative mb-6 flex items-center justify-between"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
                Visibilité → Pilotage
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-text-tertiary">
                8 bénéfices · 4 couches
              </span>
            </motion.div>

            {/* ─── NIVEAU 1 — STACK 4 STRATES ─────────────────────────────── */}
            <div className="relative">
              {/* Liseré vertical animé qui traverse les 4 strates */}
              {staticRender ? (
                <div
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-cyan/70 via-accent-light/85 to-accent-primary/90"
                />
              ) : (
                <motion.div
                  aria-hidden
                  variants={barVariants}
                  style={{ transformOrigin: "top" }}
                  className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-cyan/70 via-accent-light/85 to-accent-primary/90"
                />
              )}

              <ul
                role="list"
                aria-label="Architecture en quatre couches"
                className="relative pl-4 sm:pl-6"
              >
                {FOUNDATION_STRATES.map((strate, i) => (
                  <StrateRow
                    key={strate.key}
                    strate={strate}
                    isLast={i === FOUNDATION_STRATES.length - 1}
                    itemVariants={itemVariants}
                  />
                ))}
              </ul>
            </div>

            {/* Séparateur centré « 8 BÉNÉFICES BUSINESS » */}
            <motion.div
              variants={itemVariants}
              className="relative my-10 flex items-center justify-center sm:my-12"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-1/2 border-t border-border-subtle"
              />
              <span className="relative bg-bg-card/90 px-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-text-tertiary">
                {FOUNDATION_SEPARATOR_LABEL}
              </span>
            </motion.div>

            {/* ─── NIVEAU 2 — GRILLE 8 PILIERS BUSINESS ───────────────────── */}
            <ul
              role="list"
              aria-label="Huit bénéfices business"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5"
            >
              {FOUNDATION_PILIERS.map((pilier) => (
                <PilierCard
                  key={pilier.numero}
                  pilier={pilier}
                  itemVariants={itemVariants}
                />
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Phrase fermante */}
        <motion.p
          variants={itemVariants}
          initial={staticRender ? false : "hidden"}
          whileInView={staticRender ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-10 max-w-[680px] text-center text-sm italic leading-relaxed text-text-tertiary sm:mt-12 sm:text-base"
        >
          « {FOUNDATION_CLOSING} »
        </motion.p>
      </div>
    </section>
  );
}

// ─── Sub-composants ────────────────────────────────────────────────────────

function StrateRow({
  strate,
  isLast,
  itemVariants,
}: {
  strate: FoundationStrate;
  isLast: boolean;
  itemVariants: typeof fadeInUp | undefined;
}) {
  const counterClasses =
    strate.compteurType === "pillars"
      ? "text-cyan/80"
      : "text-text-tertiary";

  return (
    <motion.li
      variants={itemVariants}
      className={`flex flex-col gap-1 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4 ${
        isLast ? "" : "border-b border-border-subtle"
      }`}
    >
      <div className="flex items-baseline gap-2 sm:w-[260px]">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-text-tertiary">
          {strate.numero}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan">
          {strate.label}
        </span>
      </div>

      <span className="text-[13px] italic leading-snug text-text-secondary sm:flex-1 sm:text-center sm:text-[15px]">
        {strate.phrase}
      </span>

      <span
        className={`text-[10px] font-semibold uppercase tracking-[0.28em] sm:w-[180px] sm:text-right ${counterClasses}`}
      >
        {strate.compteur}
      </span>
    </motion.li>
  );
}

function PilierCard({
  pilier,
  itemVariants,
}: {
  pilier: FoundationPilier;
  itemVariants: typeof fadeInUp | undefined;
}) {
  return (
    <motion.li
      variants={itemVariants}
      className="relative flex min-h-[140px] flex-col rounded-xl border border-border-subtle bg-bg-card/50 px-4 py-3.5 sm:px-5 sm:py-4"
    >
      {/* Header : numéro + tag couche */}
      <div className="flex items-start justify-between gap-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyan/40 bg-bg-card text-[10px] font-bold text-cyan">
          {pilier.numero}
        </span>
        {pilier.couche && pilier.coucheTag ? (
          <span
            aria-label={`Couche ${pilier.couche}`}
            className="rounded-md border border-cyan/30 bg-cyan/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-cyan"
          >
            {pilier.coucheTag}
          </span>
        ) : (
          <span
            aria-hidden
            className="text-[9px] font-semibold uppercase tracking-[0.24em] text-text-tertiary/60"
          >
            —
          </span>
        )}
      </div>

      {/* Titre business */}
      <h3 className="mt-3 text-[14px] font-semibold leading-tight text-text-primary sm:text-[15px]">
        {pilier.titre}
      </h3>

      {/* Bénéfice détaillé */}
      <p className="mt-1.5 text-[12px] leading-snug text-text-secondary">
        {pilier.benefice}
      </p>

      {/* Sous-label techno (discret) */}
      <p className="mt-auto pt-3 text-[10px] italic leading-snug text-text-tertiary">
        {pilier.sousLabelTechno}
      </p>
    </motion.li>
  );
}
