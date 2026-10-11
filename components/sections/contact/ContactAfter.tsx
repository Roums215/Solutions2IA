"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { ArtefactObject } from "@/components/sections/services/servicesObjects";
import { AFTER_STEPS } from "./contactPageData";
import { MobileRail } from "@/components/shared/MobileRail";

/**
 * /contact, « Après votre message » (claire, id="apres"). Les quatre étapes montrées par ce
 * que le visiteur reçoit vraiment : son message envoyé, ma réponse, l'invitation, la
 * proposition écrite. Mêmes objets réels que /services, sur verre givré.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      id="apres"
      aria-labelledby="contact-after-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper-2 lg:rounded-[3.5rem]"
    >
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[-6rem] top-[22%] h-[26rem] w-[36rem] rounded-full bg-accent-primary/20 blur-[110px]" />
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute right-[-4rem] top-[40%] h-[24rem] w-[30rem] rounded-full bg-cyan/25 blur-[110px]" />

      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="contact-after-heading"
          label="Après votre message"
          title={
            <>
              Ce qui se passe <span className="text-gradient-strong">dans les jours qui suivent</span>.
            </>
          }
          description="Quatre étapes, toujours les mêmes. Vous savez à chaque moment où on en est, et rien ne vous engage avant la proposition."
        />

        <MobileRail as="ol" label="Les quatre étapes" className="gap-4 md:grid-cols-2 lg:grid-cols-4">
          {AFTER_STEPS.map((a, i) => (
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
      </div>
    </section>
  );
}
