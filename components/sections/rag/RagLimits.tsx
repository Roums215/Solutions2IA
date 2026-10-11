"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { SearchX } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { LIMITS, REFUSAL } from "./ragPageData";

/**
 * /rag, « Ce qu'elle ne fait pas » (claire, id="limites"). Court : trois limites en lignes
 * éditoriales, et à côté la preuve la plus parlante face à une IA généraliste : quand
 * l'information n'est pas dans vos documents, la mémoire le dit. Remplace RagHonestLimits
 * et absorbe le contraste de RagContrastClassicVsRag.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function RagLimits() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      id="limites"
      aria-labelledby="rag-limits-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper-2 lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="ragLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="rag-limits-heading"
          label="En toute franchise"
          title={
            <>
              Ce que cette mémoire <span className="text-gradient-strong">ne fait pas</span>.
            </>
          }
          description="Je préfère poser les limites avant de commencer. Elle est efficace, pas magique."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-14">
          <ol className="divide-y divide-paper-line border-y border-paper-line-strong">
            {LIMITS.map((l, i) => (
              <motion.li
                key={l.title}
                className="grid gap-1.5 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4"
                initial={instant ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : i * 0.08, ease: EASE }}
              >
                <p className="font-mono text-[12px] font-semibold text-accent-dark sm:pt-1">0{i + 1}</p>
                <div>
                  <h3 className="text-[18px] font-semibold leading-snug tracking-tight">{l.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary">{l.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Quand elle ne sait pas, elle le dit */}
          <figure className="paper-card self-start rounded-2xl p-5 sm:p-6">
            <figcaption className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
              <SearchX size={14} strokeWidth={2} className="text-accent-dark" aria-hidden />
              Quand la réponse n&apos;y est pas
            </figcaption>
            <div className="mt-4 space-y-3">
              <p className="ml-auto w-fit max-w-[19rem] rounded-2xl rounded-br-md bg-accent-primary px-4 py-2.5 text-[14px] font-medium leading-snug text-paper">
                {REFUSAL.question}
              </p>
              <p className="w-fit max-w-[21rem] rounded-2xl rounded-bl-md bg-ink px-4 py-3 text-[14px] leading-relaxed text-paper">{REFUSAL.answer}</p>
            </div>
            <p className="mt-5 border-t border-paper-line pt-4 text-[14px] leading-relaxed text-text-secondary">{REFUSAL.note}</p>
            <p className="mt-2 text-[12px] text-text-tertiary">Exemple sur des documents fictifs.</p>
          </figure>
        </div>
      </div>
    </section>
  );
}
