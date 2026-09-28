"use client";

import { useRef } from "react";
import { motion, type Variants } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { BENEFIT_GROUPS } from "./appsPageData";

/**
 * /applications, section D (claire froide) : ce que l'outil apporte concrètement.
 * Neuf bénéfices rangés en trois niveaux (le quotidien, le système, l'entreprise),
 * pour qu'on lise une progression et pas une grille de neuf cartes identiques.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const list: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
const col: Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const INSTANT = { duration: 0 };
const COL_STILL: Variants = { hidden: col.hidden, visible: { opacity: 1, y: 0, transition: INSTANT } };

export function AppsBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      aria-labelledby="apps-benefits-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden rounded-[2rem] bg-paper-2 lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="appsLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="apps-benefits-heading"
          label="Ce que ça change"
          title={
            <>
              Du quotidien de vos équipes{" "}
              <span className="text-gradient-strong">jusqu&apos;à vos comptes</span>.
            </>
          }
          description="Pas de promesse technique : ce que vous constatez une fois l'outil en place, à trois niveaux."
        />

        <motion.div
          className="grid gap-5 lg:grid-cols-3 lg:gap-6"
          variants={instant ? { hidden: {}, visible: {} } : list}
          initial="hidden"
          {...(instant ? { animate: "visible" as const } : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
        >
          {BENEFIT_GROUPS.map((g, gi) => (
            <motion.article key={g.title} variants={instant ? COL_STILL : col} className="paper-card flex flex-col overflow-hidden rounded-2xl">
              <header className="border-b border-paper-line px-5 pb-4 pt-5 sm:px-6">
                <p className="font-mono text-[11px] tracking-[0.14em] text-text-tertiary">0{gi + 1} / 03</p>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight">{g.title}</h3>
                <p className="mt-1 text-[13.5px] text-text-secondary">{g.line}</p>
              </header>
              <ul className="flex-1 divide-y divide-paper-line px-5 sm:px-6">
                {g.items.map((it) => {
                  const Icon = it.icon;
                  return (
                    <li key={it.title} className="flex gap-3.5 py-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-cyan" aria-hidden>
                        <Icon size={16} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15.5px] font-semibold leading-snug">{it.title}</span>
                        <span className="mt-0.5 block text-[14px] leading-relaxed text-text-secondary">{it.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
