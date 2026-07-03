"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { CTABand } from "@/components/shared/CTABand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { RelatedServices } from "@/components/shared/RelatedServices";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import type { SectorApp } from "@/components/sections/applications/sectorsAppsData";
import type { SectorVertical } from "@/components/sections/applications/appSectorVerticals";

interface SecteurAppPageProps {
  sector: SectorApp;
  vertical: SectorVertical;
}

export function SecteurAppPage({ sector, vertical }: SecteurAppPageProps) {
  return (
    <>
      <PageAtmosphere preset="apps" />
      <FluidMouseField preset="apps" />

      <PageHero
        label={`Applications · ${sector.name}`}
        title={
          <>
            {sector.name} —{" "}
            <span className="text-gradient-strong">{vertical.heroAccent}</span>
          </>
        }
        description={vertical.intro}
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Toutes les applications", href: "/applications" }}
        glowColor="bg-accent-primary/5"
      />

      {/* Modules du cockpit */}
      <section className="section-shell">
        <div className="section-container">
          <SectionHeading
            label="Le cockpit métier"
            title={
              <>
                Les modules qui font{" "}
                <span className="text-gradient-strong">le quotidien</span>
              </>
            }
            description={`Chaque module épouse les gestes réels du métier — ${sector.meta.toLowerCase()} — plutôt que d'imposer un parcours générique.`}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
          >
            {vertical.moduleDetails.map((m) => (
              <motion.article key={m.name} variants={fadeInUp} className="h-full">
                <SpotlightCard glow="99,102,241" tilt={4} className="flex h-full flex-col p-6 sm:p-7">
                  <h3
                    className="text-lg font-semibold tracking-tight text-text-primary"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {m.name}
                  </h3>
                  <p
                    className="mt-2.5 text-sm leading-[1.8] text-text-secondary"
                    style={{ transform: "translateZ(12px)" }}
                  >
                    {m.text}
                  </p>
                </SpotlightCard>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* KPIs */}
      <section className="section-shell-tight">
        <div className="section-container">
          <SectionHeading
            label="Ce que ça change"
            title={
              <>
                Des chiffres qui se{" "}
                <span className="text-gradient-strong">constatent</span>, pas qui se promettent
              </>
            }
            description="Indicateurs issus de cockpits en production sur ce type de métier."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5"
          >
            {vertical.kpis.map((k) => (
              <motion.div
                key={k.label}
                variants={fadeInUp}
                className="metric-tile rounded-xl border border-border-subtle bg-bg-card/60 p-6 text-center card-shine"
              >
                <div className="text-3xl font-bold text-gradient-strong">{k.value}</div>
                <div className="mt-1.5 text-sm font-semibold text-text-primary">{k.label}</div>
                <div className="mt-1 text-xs leading-relaxed text-text-tertiary">{k.hint}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-8 max-w-2xl text-center text-sm text-text-tertiary"
          >
            {vertical.compliance}
          </motion.p>
        </div>
      </section>

      <RelatedServices current="applications" />

      <CTABand
        title={
          <>
            Parlons de votre quotidien{" "}
            <span className="text-gradient-strong">{sector.name.toLowerCase()}</span>
          </>
        }
        description="Premier échange gratuit : vous décrivez vos outils actuels et ce qui coince, je vous dis honnêtement ce qu'une application sur mesure changerait — et ce qu'elle coûterait."
      />
    </>
  );
}
