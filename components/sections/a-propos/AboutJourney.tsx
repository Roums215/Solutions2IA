"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { STORY } from "./aproposPageData";

/**
 * /a-propos, « Mon parcours » (claire). À gauche le récit, en colonne de lecture ; à droite
 * le même parcours en frise de verre givré, de la formation à aujourd'hui. Le trait se trace
 * une fois à l'entrée dans l'écran ; la dernière étape (aujourd'hui) est mise en avant.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MILESTONES = [
  { when: "Formation", title: "Ingénierie du web", tags: [] as string[] },
  { when: "En entreprise", title: "Des télécoms à la santé", tags: ["DFT (Digital Factory Telecom)", "Ramsay Santé"] },
  { when: "Ce que j'y ai vu", title: "Du temps perdu, partout", tags: ["Excel dans tous les sens", "Du papier", "Des outils qui ne se parlent pas"] },
  { when: "Aujourd'hui", title: "À mon compte, pour vous", tags: ["Disponible", "Prix de démarrage"] },
];

export function AboutJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-journey-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden rounded-[2rem] bg-paper-2 lg:rounded-[3.5rem]"
    >
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute right-[-4rem] top-[16%] h-[28rem] w-[34rem] rounded-full bg-accent-primary/20 blur-[110px]" />
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute bottom-[-6rem] right-[20%] h-[22rem] w-[30rem] rounded-full bg-cyan/25 blur-[110px]" />

      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="about-journey-heading"
          label="Mon parcours"
          title={
            <>
              D&apos;où je viens, et <span className="text-gradient-strong">pourquoi je fais ça</span>.
            </>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:gap-16">
          {/* Le récit */}
          <div className="max-w-2xl space-y-6 text-[17px] leading-[1.85] text-text-secondary">
            {STORY.map((p) => (
              <p key={p.lead}>
                <span className="font-semibold text-text-primary">{p.lead}</span> {p.text}
              </p>
            ))}
          </div>

          {/* La frise */}
          <GlassPanel tone="light" className="self-start rounded-[28px] p-6 sm:p-7">
            <ol className="relative space-y-6">
              <motion.span
                aria-hidden
                className="absolute bottom-3 left-[0.6875rem] top-3 w-px origin-top bg-gradient-to-b from-accent-primary/40 to-cyan"
                initial={instant ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, ease: EASE }}
              />
              {MILESTONES.map((m, i) => {
                const last = i === MILESTONES.length - 1;
                return (
                  <li key={m.when} className="relative pl-10">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-0 top-0.5 grid h-[1.375rem] w-[1.375rem] place-items-center rounded-full ring-4 ring-paper",
                        last ? "bg-cyan" : "bg-accent-primary",
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-dark">{m.when}</p>
                    <p className={cn("mt-1 font-semibold tracking-tight", last ? "text-[18px]" : "text-[16px]")}>{m.title}</p>
                    {m.tags.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {m.tags.map((t) => (
                          <li key={t} className={cn("rounded-full px-2.5 py-0.5 text-[12px] font-medium ring-1", last ? "bg-cyan/15 text-ink ring-cyan/40" : "bg-paper text-text-secondary ring-paper-line-strong")}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
