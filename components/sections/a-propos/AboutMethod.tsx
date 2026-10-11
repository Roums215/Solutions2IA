"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { ArtefactObject } from "@/components/sections/services/servicesObjects";
import { RULES, TECH_DETAILS } from "./aproposPageData";
import { MobileRail } from "@/components/shared/MobileRail";

/**
 * /a-propos, « Ma façon de travailler » (claire, id="methode"). Quatre règles montrées par
 * de vrais objets (les notes du premier échange, le dépôt à votre nom, la vérification sur
 * ordinateur et téléphone, la demande traitée après la livraison). Dessous, le volet
 * technique replié, pour ceux qui veulent vérifier (lecture à deux niveaux).
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AboutMethod() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      id="methode"
      aria-labelledby="about-method-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper-2 lg:rounded-[3.5rem]"
    >
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[-6rem] top-[20%] h-[26rem] w-[36rem] rounded-full bg-accent-primary/20 blur-[110px]" />
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute right-[-4rem] top-[45%] h-[24rem] w-[30rem] rounded-full bg-cyan/25 blur-[110px]" />

      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="about-method-heading"
          label="Ma façon de travailler"
          title={
            <>
              Quatre règles que je m&apos;impose, <span className="text-gradient-strong">quel que soit le projet</span>.
            </>
          }
          description="Comprendre, construire, vérifier, rester. Elles ne changent pas avec la taille du projet : c'est ce qui rend la qualité prévisible."
        />

        <MobileRail as="ol" label="Quatre règles" className="gap-4 md:grid-cols-2 lg:grid-cols-4">
          {RULES.map((r, i) => (
            <motion.li
              key={r.key}
              initial={instant ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : i * 0.08, ease: EASE }}
            >
              <GlassPanel tone="light" className="h-full rounded-3xl p-3">
                <ArtefactObject k={r.key} className="h-[160px]" />
                <div className="px-2 pb-2 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-dark">
                    <span className="mr-2 font-mono tracking-normal text-text-tertiary">0{i + 1}</span>
                    {r.meta}
                  </p>
                  <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-tight">{r.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-text-secondary">{r.text}</p>
                </div>
              </GlassPanel>
            </motion.li>
          ))}
        </MobileRail>

        {/* Le second niveau : pour ceux qui veulent vérifier */}
        <GlassPanel tone="light" sheen={false} className="mt-6 rounded-3xl">
          <details className="group px-5 py-1 sm:px-7">
            <summary className="flex cursor-pointer list-none items-center gap-3 py-4 text-[15.5px] font-semibold text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary [&::-webkit-details-marker]:hidden">
              <span className="flex-1">Pour ceux qui veulent vérifier : comment je travaille techniquement</span>
              <ChevronDown size={17} className="shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180" aria-hidden />
            </summary>
            <div className="space-y-3 border-t border-paper-line pb-5 pt-4 text-[14.5px] leading-[1.8] text-text-secondary">
              {TECH_DETAILS.map((t) => (
                <p key={t.label}>
                  <strong className="font-semibold text-text-primary">{t.label} :</strong> {t.text}
                </p>
              ))}
              <p className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                <Link href="/applications#methode" className="font-semibold text-accent-dark hover:text-text-primary">
                  Le déroulé complet d&apos;un projet d&apos;application
                </Link>
                <Link href="/faq" className="font-semibold text-accent-dark hover:text-text-primary">
                  Les réponses détaillées sont dans la FAQ
                </Link>
              </p>
            </div>
          </details>
        </GlassPanel>
      </div>
    </section>
  );
}
