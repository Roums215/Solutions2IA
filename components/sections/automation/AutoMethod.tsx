"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Check, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { DELIVERABLES, METHOD } from "./autoPageData";

/**
 * /automatisation, comment on démarre (claire, ancre #methode). Une trajectoire en quatre
 * temps, pas quatre grosses cartes, puis UNE carte « Votre automatisation » : ce qui est
 * livré avec chaque flux. La ligne se trace une fois à l'entrée dans l'écran.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AutoMethod() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      id="methode"
      aria-labelledby="auto-method-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="flowLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="auto-method-heading"
          label="Comment on démarre"
          title={
            <>
              On commence par <span className="text-gradient-strong">une seule tâche</span>.
            </>
          }
          description="Pas de grand chantier : une tâche qui vous coûte du temps, un flux écrit avec vous, testé sur de vrais cas."
        />

        <div>
          <div className="relative">
            <motion.span
              aria-hidden
              className="absolute bottom-3 left-[0.6875rem] top-3 w-px origin-top bg-cyan/60 md:bottom-auto md:left-3 md:right-3 md:top-[0.6875rem] md:h-px md:w-auto md:origin-left"
              initial={instant ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE }}
            />
            <ol className="relative grid gap-6 md:grid-cols-4 md:gap-8">
              {METHOD.map((m) => (
                <li key={m.n} className="relative pl-10 md:pl-0 md:pt-10">
                  <span aria-hidden className="absolute left-0 top-0 grid h-[1.375rem] w-[1.375rem] place-items-center rounded-full bg-ink ring-4 ring-paper">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  </span>
                  <p className="font-mono text-[12px] font-semibold text-accent-dark">{m.n}</p>
                  <h3 className="mt-1 text-[18px] font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-text-secondary">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-ink p-5 text-paper sm:p-7">
            <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-paper/80">
              <Workflow size={17} strokeWidth={1.9} className="text-cyan" aria-hidden />
              Votre automatisation
            </p>
            <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
              {DELIVERABLES.map((d) => (
                <div key={d.label} className="flex items-start gap-2.5">
                  <Check size={15} strokeWidth={2.5} className="mt-1 shrink-0 text-cyan" aria-hidden />
                  <div>
                    <dt className="text-[15px] font-semibold">{d.label}</dt>
                    <dd className="text-[13px] leading-snug text-paper/70">{d.detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
