"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";

interface CTABandProps {
  title?: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /** Bouton secondaire. `null` pour n'afficher que le CTA principal (règle : un seul CTA par page). */
  secondary?: { label: string; href: string } | null;
  /** Ligne de réassurance sous les boutons. */
  trustItems?: string[];
  /** Ligne secondaire sous la réassurance (ordre de grandeur des prix, par exemple). */
  note?: string;
  /**
   * Rendu cadré (accueil, LOT 4C, recomposé au LOT 4G) : grande carte bleu nuit,
   * arête haute éclairée, corps aéré, zone basse séparée qui porte la réassurance
   * sur une bulle de verre. Les autres pages gardent le rendu historique.
   */
  framed?: boolean;
  /** Version resserrée du rendu cadré : termine la page sans refaire un hero (opt-in). */
  compact?: boolean;
}

export function CTABand({
  title = <>Donnons vie à votre <span className="text-gradient-strong">prochain projet</span></>,
  description = "Que vous ayez une idée précise ou un besoin à clarifier, discutons-en. Chaque grand projet commence par une conversation.",
  primaryLabel = "Prendre contact",
  primaryHref = "/contact",
  secondary = { label: "Voir les services", href: "/services" },
  trustItems = ["Réponse sous 24 h", "Premier échange offert", "Sans engagement"],
  note,
  framed = false,
  compact = false,
}: CTABandProps) {
  return (
    <section className={`${compact ? "section-shell-compact" : "section-shell"} relative isolate overflow-hidden`}>
      {framed && <SectionFluidBackdrop variant="cta" />}
      {!framed && (
        <>
          <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[150px]" />
          <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px glow-line" />
        </>
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="section-container relative z-10"
      >
        <div
          className={
            framed
              ? "panel-card mx-auto max-w-[1040px] overflow-hidden rounded-[1.75rem] text-center"
              : "section-intro-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12 text-center"
          }
        >
          {/* Arête haute éclairée, puis un halo indigo diffus derrière le titre :
              c'est lui qui creuse la carte et donne le bleu nuit (signature du site). */}
          {framed && (
            <>
              <span aria-hidden className="glow-line block opacity-70" />
              <span
                aria-hidden
                className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-accent-primary/25 blur-[100px]"
              />
            </>
          )}

          <div className={framed ? (compact ? "relative px-6 pt-9 pb-8 sm:px-12 sm:pt-10 sm:pb-9" : "relative px-6 pt-12 pb-11 sm:px-12 sm:pt-14 sm:pb-12") : undefined}>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold tracking-[-0.03em] leading-[1.08] text-balance">
              {title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-6 text-base sm:text-lg text-text-secondary leading-[1.85] max-w-2xl mx-auto text-pretty">
              {description}
            </motion.p>
            <motion.div variants={fadeInUp} className={`${compact ? "mt-7" : "mt-10"} flex flex-wrap justify-center gap-4`}>
              <Button
                variant="primary"
                size="lg"
                href={primaryHref}
                className={framed ? "h-14 rounded-full px-9 text-[1.0625rem] font-semibold" : undefined}
              >
                {primaryLabel}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              {secondary && (
                <Button variant="secondary" size="lg" href={secondary.href}>
                  {secondary.label}
                </Button>
              )}
            </motion.div>
          </div>

          {/* Zone basse : plus sombre que le corps, ouverte par un filet de lumière.
              La réassurance y est posée sur une bulle de verre, seul effet de verre
              de la section. */}
          <motion.div
            variants={fadeInUp}
            className={framed ? `panel-foot relative px-6 sm:px-12 ${compact ? "py-4" : "py-6"}` : "mt-8"}
          >
            <div
              className={
                framed
                  ? "glass-inset mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-2xl px-6 py-3 text-sm text-text-secondary"
                  : "flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-text-tertiary"
              }
            >
              {trustItems.map((item, i) => (
                <span key={item} className={framed ? "inline-flex items-center gap-3" : undefined}>
                  {/* Le filet de séparation ne sort que si les mentions tiennent sur
                      une ligne : empilées, il ouvrirait la seconde ligne dans le vide. */}
                  {framed && i > 0 && <span aria-hidden className="hidden h-3.5 w-px bg-border-medium sm:block" />}
                  {item}
                </span>
              ))}
            </div>
            {note && (
              <p
                className={
                  framed
                    ? "mx-auto mt-3.5 max-w-2xl text-[13px] leading-relaxed text-text-tertiary"
                    : "mt-3 text-[13px] text-text-tertiary/80"
                }
              >
                {note}
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
