"use client";

import { motion, type Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { TRUST, TRUST_TECH } from "./aiPageData";

/**
 * /agents-ia, confiance et contrôle (sombre). Six vraies questions ; chaque réponse est
 * accompagnée du MÉCANISME qui la tient (sources, validation, journal…), pas d'une
 * promesse. Sur téléphone : accordéons sobres (<details> natifs). La technique reste
 * repliée, pour ceux qui veulent vérifier.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const list: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };
const INSTANT = { duration: 0 };
const RISE_STILL: Variants = { hidden: rise.hidden, visible: { opacity: 1, y: 0, transition: INSTANT } };

export function AiConfidence() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const R = instant ? RISE_STILL : rise;

  return (
    <section className="section-shell-tight relative isolate overflow-hidden" aria-labelledby="ai-trust-heading">
      <SectionFluidBackdrop variant="aiDark" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="ai-trust-heading"
          label="Confiance et contrôle"
          title={
            <>
              Ce qu&apos;il peut faire.{" "}
              <span className="text-gradient-strong">Ce qu&apos;il ne fera jamais sans vous</span>.
            </>
          }
          description="Les questions qu'on me pose au premier rendez-vous. Chaque réponse s'appuie sur un mécanisme concret, que vous pouvez vérifier pendant le pilote."
        />

        {/* Ordinateur : six cartes, question → réponse → mécanisme */}
        <motion.ul
          className="hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3"
          variants={instant ? { hidden: {}, visible: {} } : list}
          initial="hidden"
          {...(instant ? { animate: "visible" as const } : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
        >
          {TRUST.map((t) => {
            const Icon = t.icon;
            return (
              <motion.li key={t.q} variants={R} className="panel-card flex flex-col rounded-2xl p-5">
                <h3 className="text-[17px] font-semibold tracking-tight text-text-primary">« {t.q} »</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-text-secondary">{t.a}</p>
                <p className="mt-4 flex items-start gap-2 rounded-xl border border-border-medium bg-accent-primary/10 px-3 py-2.5 text-[13px] leading-snug text-text-primary">
                  <Icon size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                  <span>
                    <span className="text-text-tertiary">Mécanisme : </span>
                    {t.mechanism}
                  </span>
                </p>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Téléphone : accordéons */}
        <ul className="space-y-2 md:hidden">
          {TRUST.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.q}>
                <details className="group panel-card rounded-2xl px-4 py-3.5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15.5px] font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                    « {t.q} »
                    <ChevronDown size={16} className="shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-text-secondary">{t.a}</p>
                  <p className="mt-3 flex items-start gap-2 text-[13px] leading-snug text-text-primary">
                    <Icon size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                    {t.mechanism}
                  </p>
                </details>
              </li>
            );
          })}
        </ul>

        {/* La technique, repliée */}
        <details className="group panel-card mt-6 rounded-2xl px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14.5px] font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan [&::-webkit-details-marker]:hidden">
            Pour les curieux : comment c&apos;est construit
            <ChevronDown size={15} className="shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180" aria-hidden />
          </summary>
          <div className="mt-3.5 grid gap-4 border-t border-border-medium pt-3.5 md:grid-cols-3">
            {TRUST_TECH.map((b) => (
              <p key={b.label} className="text-[13.5px] leading-[1.7] text-text-tertiary">
                <span className="block font-semibold text-text-secondary">{b.label}</span>
                {b.text}
              </p>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
