"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { SECTORS_APPS } from "./sectorsAppsData";

export function SectorsCoverage() {
  return (
    <section className="section-shell">
      <SectionParticles
        style="grid-dots"
        count={16}
        color="rgba(14,165,233,0.06)"
        secondaryColor="rgba(129,140,248,0.05)"
      />
      <div className="section-container relative z-10">
        <SectionHeading
          label="Quelques secteurs"
          title={
            <>
              Chaque métier a ses contraintes.{" "}
              <span className="text-gradient-strong">L&apos;outil s&apos;y adapte</span>.
            </>
          }
          description="Voici des exemples de ce qu'une application sur mesure peut simplifier, selon votre activité. La vôtre n'est pas là ? La démarche reste la même : on en parle."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {SECTORS_APPS.map((sector) => (
            <motion.article key={sector.slug} variants={fadeInUp} className="h-full">
              <SpotlightCard
                glow="14,165,233"
                tilt={4}
                pulse
                className="flex h-full flex-col p-6 sm:p-7"
              >
                <header className="flex items-start gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-primary/15 bg-accent-glow"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {sector.icon}
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-lg font-semibold tracking-tight text-text-primary"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {sector.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-text-tertiary">
                      {sector.meta}
                    </p>
                  </div>
                </header>

                <p
                  className="mt-5 text-sm leading-relaxed text-text-secondary"
                  style={{ transform: "translateZ(10px)" }}
                >
                  {sector.pain}
                </p>

                <div className="mt-6 border-t border-border-subtle/60 pt-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                    Modules clés
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {sector.modules.map((module) => (
                      <li
                        key={module}
                        className="rounded-md border border-border-subtle bg-bg-card/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-accent-light"
                      >
                        {module}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/applications/${sector.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-light transition-colors duration-200 hover:text-text-primary"
                    style={{ transform: "translateZ(14px)" }}
                  >
                    Voir le détail {sector.name}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </SpotlightCard>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-2xl text-center text-sm italic leading-relaxed text-text-tertiary"
        >
          Et si votre métier n&apos;est pas listé : c&apos;est précisément la même méthode qui s&apos;applique, on commence par comprendre le terrain.
        </motion.p>
      </div>
    </section>
  );
}
