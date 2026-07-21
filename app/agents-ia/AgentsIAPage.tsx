"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import dynamic from "next/dynamic";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";

// Scène hero lazy : chunk jamais téléchargé sur mobile/minimal.
const AIBrainScene = dynamic(
  () => import("@/components/scenes/ai/AIBrainScene").then((m) => m.AIBrainScene),
  { ssr: false, loading: () => <div aria-hidden className="h-[540px] sm:h-[600px] lg:h-[640px]" /> },
);
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { AgentAnatomyDiagram } from "@/components/sections/agents-ia/AgentAnatomyDiagram";
import { UniversalNeedsGrid } from "@/components/sections/agents-ia/UniversalNeedsGrid";
import { ProfileCarousel } from "@/components/sections/agents-ia/ProfileCarousel";

// Section massive (~1000 LOC) sous la fold : chunk séparé, SSR conservé.
const OneAgentManyNeedsPipeline = dynamic(() =>
  import("@/components/sections/agents-ia/OneAgentManyNeedsPipeline").then((m) => m.OneAgentManyNeedsPipeline),
);
import { TrustGuardrails } from "@/components/sections/agents-ia/TrustGuardrails";
import { RelatedServices } from "@/components/shared/RelatedServices";

const capabilities = [
  {
    title: "Il comprend votre contexte",
    description:
      "L'assistant connaît votre métier et vos documents. Il lit une demande, comprend ce qu'on attend, et ne répond pas à côté.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Il fait le travail, vous validez",
    description:
      "Il prépare le devis, la réponse, le classement. Vous gardez le dernier mot : rien ne part sans votre accord si vous le souhaitez.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "Il travaille même la nuit",
    description:
      "Une fois en place, il tourne 24h/24. Vos clients ont une réponse hors des horaires de bureau, vos tâches avancent pendant que vous dormez.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
      </svg>
    ),
  },
  {
    title: "Il est relié à vos outils",
    description:
      "Mails, fichier clients, agenda, facturation : l'assistant agit directement dans les logiciels que vous utilisez déjà.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: "Vous voyez ce qu'il fait",
    description:
      "Chaque action est tracée : vous savez ce que l'assistant a fait, quand, et pourquoi. Pas de boîte noire.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Il s'occupe d'un rôle précis",
    description:
      "On ne vise pas le robot qui fait tout. On met en place un assistant pour une tâche claire, qui la fait vraiment bien.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M20 7h-9M14 17H5M17 3a4 4 0 0 0 0 8 4 4 0 0 0 0-8zM7 13a4 4 0 0 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    ),
  },
];

const methodFlow = [
  {
    meta: "01 · On observe",
    title: "Je regarde votre quotidien",
    description:
      "Vos mails, votre fichier clients, vos outils. On repère ensemble une ou deux tâches qui vous prennent du temps et qu'un assistant peut prendre en charge.",
  },
  {
    meta: "02 · Je construis",
    title: "Un assistant calé sur votre métier",
    description:
      "Je lui apprends votre contexte, je le relie à vos outils, et je pose des garde-fous clairs pour qu'il reste sous votre contrôle.",
  },
  {
    meta: "03 · On essaie en vrai",
    title: "Un démarrage prudent",
    description:
      "On le met en route doucement, sur un périmètre limité. Vos équipes prennent la main, on vérifie que ça aide vraiment avant d'élargir.",
  },
  {
    meta: "04 · Ça tourne",
    title: "Je reste là pour l'améliorer",
    description:
      "Vous suivez ce que fait l'assistant sur un tableau de bord simple, et je l'ajuste ou lui ajoute des tâches au fil de vos besoins.",
  },
];

export function AgentsIAPage() {
  return (
    <>
      <PageAtmosphere preset="ai" />
      <FluidMouseField preset="ai" />

      <PageHero
        label="Assistant intelligent"
        title={
          <>
            Un <span className="text-gradient-strong">collègue numérique</span> qui connaît votre métier.
          </>
        }
        description="Pas un chatbot de plus. Un assistant qui trie vos mails, prépare vos devis, met à jour votre fichier clients et répond à vos clients. Il fait le travail répétitif ; vous gardez la main sur les décisions."
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Ce qu'il peut faire", href: "#besoins" }}
        visual={<AIBrainScene />}
        mobileSteps={[
          { label: "Il comprend", hint: "votre métier, vos documents" },
          { label: "Il prépare", hint: "la réponse, le devis, le tri" },
          { label: "Il agit", hint: "dans vos outils · vous validez" },
        ]}
      />

      {/* Anatomie d'un agent */}
      <AgentAnatomyDiagram />

      {/* 8 besoins universels */}
      <UniversalNeedsGrid />

      {/* Schéma central — 1 agent, N besoins */}
      <OneAgentManyNeedsPipeline />

      {/* Carrousel 6 profils */}
      <ProfileCarousel />

      {/* Garde-fous (objections) */}
      <TrustGuardrails />

      {/* Capacités */}
      <section className="section-shell">
        <SectionParticles style="crosses" count={14} color="rgba(139,92,246,0.06)" />
        <div className="section-container">
          <SectionHeading
            label="Ce qui le rend utile"
            title={
              <>
                Un assistant qui <span className="text-gradient-strong">comprend et agit</span>
              </>
            }
            description="Six raisons concrètes pour lesquelles un assistant bien conçu vous fait gagner du temps, sans jamais vous échapper."
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
                <SpotlightCard glow="139,92,246" tilt={5} pulse className="p-7 sm:p-8 h-full">
                  <div
                    className="w-10 h-10 rounded-xl bg-accent-glow border border-accent-primary/15 flex items-center justify-center mb-6"
                    style={{ transform: "translateZ(35px)" }}
                  >
                    {c.icon}
                  </div>
                  <h3
                    className="text-lg font-semibold mb-3 tracking-tight"
                    style={{ transform: "translateZ(22px)" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-sm text-text-secondary leading-relaxed"
                    style={{ transform: "translateZ(12px)" }}
                  >
                    {c.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Méthode */}
      <section id="methode" className="section-shell-tight scroll-mt-24">
        <div className="section-container">
          <PremiumFlowPanel
            label="Comment je travaille"
            title="De votre quotidien à un assistant qui aide vraiment."
            description="On part de ce qui vous prend du temps, je construis avec vos vrais outils, et on démarre prudemment avant d'élargir."
            steps={methodFlow}
            accent="139, 92, 246"
          />
        </div>
      </section>

      <RelatedServices current="agents-ia" />

      <CTABand
        title={
          <>
            Quelle tâche aimeriez-vous <span className="text-gradient-strong">déléguer</span> ?
          </>
        }
        description="Parlez-m'en lors d'un premier échange gratuit. Je vous dis franchement si un assistant peut s'en charger, et ce que ça implique, simplement."
        primaryLabel="Premier échange gratuit"
      />
    </>
  );
}
