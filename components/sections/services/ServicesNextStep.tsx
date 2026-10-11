"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { ArtefactObject } from "./servicesObjects";
import { ARTEFACTS, WHY_ME } from "./servicesPageData";
import { MobileRail } from "@/components/shared/MobileRail";

/**
 * /services, « L'étape suivante » (claire, id="methode"). Le CTA expliqué : avant le
 * bouton, on montre ce que le visiteur reçoit vraiment après son message, quatre objets
 * dans l'ordre (l'invitation, la proposition écrite, le lien de test, la mise en ligne),
 * puis ce qui change avec un indépendant, puis UN bouton et sa réassurance.
 * Remplace la frise d'étapes, la section « Travailler avec moi » et le CTABand de la page.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ServicesNextStep() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      id="methode"
      aria-labelledby="svc-next-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper-2 lg:rounded-[3.5rem]"
    >
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[-6rem] top-[18%] h-[26rem] w-[36rem] rounded-full bg-accent-primary/20 blur-[110px]" />
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute right-[-4rem] top-[38%] h-[24rem] w-[30rem] rounded-full bg-cyan/25 blur-[110px]" />

      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="svc-next-heading"
          label="L'étape suivante"
          title={
            <>
              Après votre message, <span className="text-gradient-strong">voilà ce que vous recevez</span>.
            </>
          }
          description="Pas de rendez-vous commercial, pas de devis piégé. Quatre choses simples, dans cet ordre, et vous décidez à chaque étape."
        />

        {/* Ce que vous recevez */}
        <MobileRail as="ol" label="Ce que vous recevez" className="gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ARTEFACTS.map((a, i) => (
            <motion.li
              key={a.key}
              initial={instant ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : i * 0.08, ease: EASE }}
            >
              <GlassPanel tone="light" className="h-full rounded-3xl p-3">
                <ArtefactObject k={a.key} className="h-[168px]" />
                <div className="px-2 pb-2 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-dark">
                    <span className="mr-2 font-mono tracking-normal text-text-tertiary">{a.n}</span>
                    {a.when}
                  </p>
                  <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-tight">{a.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-text-secondary">{a.text}</p>
                </div>
              </GlassPanel>
            </motion.li>
          ))}
        </MobileRail>

        {/* Ce qui change avec un indépendant */}
        <ul aria-label="Ce qui change avec un indépendant" className="mt-10 grid gap-x-8 gap-y-5 border-t border-paper-line-strong pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_ME.map((w) => {
            const Icon = w.icon;
            return (
              <li key={w.title}>
                <p className="flex items-center gap-2.5 text-[15px] font-semibold text-text-primary">
                  <Icon size={16} strokeWidth={1.9} className="shrink-0 text-accent-dark" aria-hidden />
                  {w.title}
                </p>
                <p className="mt-1 text-[14px] leading-relaxed text-text-secondary">{w.text}</p>
              </li>
            );
          })}
        </ul>

        {/* Le bouton, une seule fois, avec sa réassurance */}
        <div className="mt-12 grid items-center gap-6 rounded-[28px] bg-ink p-6 text-paper sm:p-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <div>
            <h3 className="text-[1.6rem] font-semibold leading-tight tracking-tight sm:text-[1.9rem]">Vous ne savez pas par où commencer ?</h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-paper/75">
              C&apos;est normal, et c&apos;est justement mon travail. Décrivez votre situation avec vos mots : je vous
              réponds sous 24 h, et si un outil ne vous apporterait rien, je vous le dis.
            </p>
          </div>
          <div className="lg:text-right">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className="h-14 rounded-full px-9 text-[1.0625rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
            >
              Parler de mon besoin
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden />
            </Button>
            <p className="mt-3 text-[13px] text-paper/60">Premier échange gratuit · Réponse sous 24 h · Sans engagement</p>
          </div>
        </div>
      </div>
    </section>
  );
}
