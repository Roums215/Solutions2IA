"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { AppScene } from "@/components/scenes/mobile/AppScene";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { SectorsCoverage } from "@/components/sections/applications/SectorsCoverage";
import { AppDigitizationPipeline } from "@/components/sections/applications/AppDigitizationPipeline";
import { BuildOrAuditDiptych } from "@/components/sections/applications/BuildOrAuditDiptych";
import { PerformanceTracking } from "@/components/sections/applications/PerformanceTracking";

const capabilities = [
  {
    title: "Applications web",
    description:
      "Dashboards, SaaS, plateformes métier — des applications web robustes avec une UX qui fait la différence au quotidien.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Applications mobiles",
    description:
      "iOS et Android, natif ou cross-platform. Des apps fluides, rapides et qui exploitent pleinement chaque plateforme.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    title: "Architecture évolutive",
    description:
      "Code modulaire, API solide, base de données optimisée. Votre app grandit avec votre entreprise sans refonte.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Temps réel",
    description:
      "WebSockets, synchronisation instantanée, notifications push. Vos utilisateurs voient les changements en direct.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
      </svg>
    ),
  },
  {
    title: "Offline-first",
    description:
      "Vos apps fonctionnent même sans connexion. Les données se synchronisent automatiquement dès le retour du réseau.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55" />
        <path d="M12 20h.01" />
      </svg>
    ),
  },
  {
    title: "Sécurité native",
    description:
      "Authentification, chiffrement end-to-end, validation serveur. La sécurité est intégrée dès la première ligne de code.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const productFlow = [
  {
    meta: "Modèle",
    title: "Structurer la donnée métier",
    description:
      "Nous clarifions les entités, rôles, permissions et états pour éviter les fondations fragiles.",
  },
  {
    meta: "Parcours",
    title: "Fluidifier les tâches clés",
    description:
      "Les écrans sont organisés autour des actions réelles : créer, suivre, valider, corriger, décider.",
  },
  {
    meta: "Système",
    title: "Connecter API et automatisations",
    description:
      "L'application dialogue avec vos outils, déclenche les bons workflows et garde les données cohérentes.",
  },
  {
    meta: "Pilotage",
    title: "Mesurer usage et stabilité",
    description:
      "Monitoring, analytics, erreurs et performance deviennent visibles pour améliorer le produit continuellement.",
  },
];

const methodFlow = [
  {
    meta: "01 · Découverte",
    title: "Comprendre le terrain réel",
    description:
      "On va voir le geste métier, on lit les fichiers, on parle aux utilisateurs. Pas de PowerPoint, pas d'hypothèse.",
  },
  {
    meta: "02 · Cadrage",
    title: "Périmètre + maquette validés avant code",
    description:
      "Backlog priorisé sur la valeur, prototype cliquable, décisions UX faites à plat. Le V1 est défini en chiffres.",
  },
  {
    meta: "03 · Build",
    title: "Sprints courts, démo réelle toutes les 2 semaines",
    description:
      "Code production-ready dès le sprint 1, tests automatisés, design system stable, intégrations validées.",
  },
  {
    meta: "04 · Run",
    title: "Monitoring, support, itérations",
    description:
      "Mise en ligne progressive, accompagnement des équipes, mesure de l'adoption et amélioration continue.",
  },
];

export function ApplicationsPage() {
  return (
    <>
      <PageAtmosphere preset="apps" />
      <FluidMouseField preset="apps" />

      <PageHero
        label="Applications métier sur mesure"
        title={
          <>
            Une application <span className="text-gradient-strong">par métier</span>, pas une app générique de plus.
          </>
        }
        description="Santé, retail, industrie, services pro, logistique, immobilier — nous concevons des applications web et mobiles qui dématérialisent vos opérations, unifient vos données dispersées et pilotent votre performance en temps réel. Sur mesure dès la première ligne, ou en refonte d'un existant après audit."
        primaryCta={{ label: "Cadrer mon projet", href: "/contact" }}
        secondaryCta={{ label: "Voir la méthode", href: "#methode" }}
        visual={<AppScene />}
        mobileSteps={[
          { label: "Capture", hint: "sources éparses unifiées" },
          { label: "Normalisation", hint: "règles métier appliquées" },
          { label: "Pilotage", hint: "KPIs live · alertes" },
        ]}
      />

      {/* Anatomie d'une app métier */}
      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Anatomie d'une app métier"
            title="Une application qui s'inscrit dans votre métier — pas un outil qu'on subit."
            description="Quatre couches qui se renforcent : la donnée propre, les parcours qui collent au geste réel, les connexions aux systèmes existants, et le pilotage qui prouve la valeur."
            steps={productFlow}
            accent="14, 165, 233"
          />
        </div>
      </section>

      {/* 6 secteurs */}
      <SectorsCoverage />

      {/* Schéma central — dématerialisation */}
      <AppDigitizationPipeline />

      {/* Sur mesure ou par audit */}
      <BuildOrAuditDiptych />

      {/* Capacités produit */}
      <section className="section-shell">
        <SectionParticles style="grid-dots" count={18} color="rgba(129,140,248,0.04)" />
        <div className="section-container">
          <SectionHeading
            label="Capacités produit"
            title={
              <>
                De l&apos;idée à l&apos;app qui <span className="text-gradient-strong">tient la charge</span>
              </>
            }
            description="Chaque application est architecturée pour durer, évoluer et offrir une expérience irréprochable, du premier utilisateur au dix-millième."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {capabilities.map((c) => (
              <motion.div key={c.title} variants={fadeInUp}>
                <SpotlightCard glow="14,165,233" tilt={4} pulse className="p-7 sm:p-8 h-full">
                  <div
                    className="w-10 h-10 rounded-xl bg-accent-glow border border-accent-primary/15 flex items-center justify-center mb-6"
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

      {/* Performance & suivi */}
      <PerformanceTracking />

      {/* Méthode 2IA */}
      <section id="methode" className="section-shell-tight scroll-mt-24">
        <div className="section-container">
          <PremiumFlowPanel
            label="Méthode 2IA"
            title="Quatre temps, une seule cohérence : la valeur arrive vite et reste."
            description="Que vous partiez d'une page blanche ou d'un existant, on déroule la même rigueur — adaptée à votre point de départ."
            steps={methodFlow}
            accent="125, 211, 252"
          />
        </div>
      </section>

      <CTABand
        title={
          <>
            Votre métier mérite une app qui colle au <span className="text-gradient-strong">geste réel</span>.
          </>
        }
        description="Cadrage offert : 45 minutes pour qualifier votre projet, identifier les premiers gains et choisir la voie — sur mesure ou audit."
        primaryLabel="Réserver mon cadrage"
      />
    </>
  );
}
