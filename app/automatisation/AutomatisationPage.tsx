"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ToolBadge } from "@/components/ui/ToolBadge";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { AutomationScene } from "@/components/scenes/automation/AutomationScene";
import { AutomationPipeline } from "@/components/sections/automation/AutomationPipeline";
import { SectorGrid } from "@/components/sections/automation/SectorGrid";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const useCases = [
  {
    title: "Leads d'appels qualifiés",
    description: "Chaque appel JobPhoning marqué « intéressé » atterrit en fiche Axonaut, déjà déduplique et enrichi.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Relances au bon moment",
    description: "Les statuts « à rappeler » repartent vers JobPhoning au bon créneau, sans qu'une équipe trie un fichier Excel.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" aria-hidden="true">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
  },
  {
    title: "Fin de la ressaisie CRM",
    description: "Contact, entreprise, opportunité et devis se créent dans Axonaut via API, plus jamais à la main.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" aria-hidden="true">
        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
        <path d="M3 7l9 6 9-6" />
        <path d="M3 7l9-4 9 4" />
      </svg>
    ),
  },
  {
    title: "Reporting automatique",
    description: "Le commercial est notifié dès qu'une opportunité est créée, la journalisation est faite, traçable et reprenable.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const tools = [
  { name: "JobPhoning", sublabel: "téléprospection" },
  { name: "n8n", sublabel: "orchestration" },
  { name: "Axonaut", sublabel: "CRM · ERP" },
  { name: "API entreprise", sublabel: "SIREN / SIRET" },
  { name: "Téléphonie", sublabel: "appels sortants" },
  { name: "+ vos outils" },
];

export function AutomatisationPage() {
  return (
    <>
      <PageAtmosphere preset="automation" />
      <FluidMouseField preset="automation" />
      <PageHero
        label="Automatisation intelligente"
        title={<>Fin de la <span className="text-gradient-strong">ressaisie</span> entre appels et CRM</>}
        description="Vos appels JobPhoning deviennent des fiches qualifiées dans Axonaut — toutes seules, sans double saisie, sans lead perdu. On câble vos outils, vous gardez la main."
        primaryCta={{ label: "Automatiser mon premier flux", href: "/contact" }}
        secondaryCta={{ label: "Voir tous les services", href: "/services" }}
        visual={<AutomationScene />}
        glowColor="bg-cyan/5"
        mobileSteps={[
          { label: "Trigger", hint: "événement source détecté" },
          { label: "Process", hint: "n8n + IA · règles métier" },
          { label: "Action", hint: "CRM · notify · log" },
        ]}
      />

      {/* Mécanique signature : pipeline JobPhoning → n8n → Axonaut */}
      <AutomationPipeline />

      {/* Pipelines par métier — grille de cartes (aperçu statique) */}
      <SectorGrid />

      {/* Cas d'usage */}
      <section className="section-shell">
        <SectionParticles style="circuit-nodes" count={14} color="rgba(34,211,238,0.15)" secondaryColor="rgba(99,102,241,0.1)" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="section-container">
          <SectionHeading
            label="Cas d'usage"
            title="Ce que ça change concrètement"
            description="Quatre situations vécues par nos clients — la même mécanique de pipeline, déclinée sur des points de friction réels."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {useCases.map((c) => (
              <motion.div key={c.title} variants={fadeInUp}>
                <SpotlightCard glow="34,211,238" tilt={4} pulse className="p-7 sm:p-8 h-full">
                  <div
                    className="w-10 h-10 rounded-xl bg-cyan-glow border border-cyan/15 flex items-center justify-center mb-5"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {c.icon}
                  </div>
                  <h3
                    className="text-lg font-semibold mb-3 tracking-tight"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-sm text-text-secondary leading-relaxed"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {c.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Outils branchés */}
      <section className="section-shell-tight">
        <div className="section-container">
          <SectionHeading
            label="Outils branchés"
            title="Vos briques métier, déjà câblées"
            description="On part de votre stack — pas d'une grille générique d'intégrations. Si vous utilisez un autre outil, on l'ajoute."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {tools.map((t) => (
              <motion.div key={t.name} variants={fadeInUp}>
                <ToolBadge name={t.name} sublabel={t.sublabel} className="px-4 py-2 text-sm" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABand
        title={<>Automatisons votre <span className="text-gradient-strong">premier flux</span></>}
        description="On part d'un process réel — un que vos équipes répètent chaque semaine — et on le câble en quelques jours. Hébergé en UE."
      />
    </>
  );
}
