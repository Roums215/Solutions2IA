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
import { OneAgentManyNeedsPipeline } from "@/components/sections/agents-ia/OneAgentManyNeedsPipeline";
import { ProfileCarousel } from "@/components/sections/agents-ia/ProfileCarousel";
import { TrustGuardrails } from "@/components/sections/agents-ia/TrustGuardrails";

const capabilities = [
  {
    title: "Analyse contextuelle",
    description:
      "Vos agents comprennent le contexte business, analysent les données en profondeur et identifient les patterns invisibles à l'œil humain.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Prise de décision",
    description:
      "Basés sur des modèles de langage avancés, ils évaluent les options, calculent les risques et choisissent l'action optimale.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Exécution autonome",
    description:
      "Une fois configurés, vos agents travaillent 24h/24 sans supervision. Ils agissent, apprennent et s'adaptent en continu.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
      </svg>
    ),
  },
  {
    title: "Orchestration multi-agents",
    description:
      "Plusieurs agents coordonnés qui collaborent, se répartissent les tâches et résolvent des problèmes complexes en parallèle.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="6" r="2" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Intégration native",
    description:
      "Vos agents se connectent nativement à vos outils : CRM, email, Slack, base de données, APIs tierces — sans friction.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: "Transparence totale",
    description:
      "Chaque décision est traçable et explicable. Vous savez pourquoi l'agent a agi, quand, comment, et avec quel résultat.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const methodFlow = [
  {
    meta: "01 · Audit",
    title: "Comprendre le terrain réel",
    description:
      "On va voir les vrais gestes du quotidien : inbox, CRM, outils métier. On identifie 2-3 cas d'usage qui dégagent du temps tout de suite.",
  },
  {
    meta: "02 · Build",
    title: "Architecture + garde-fous + intégrations",
    description:
      "Chaîne K → R → A → M conçue sur mesure : connaissance, raisonnement, actions, monitoring. Sécurisée et versionnée.",
  },
  {
    meta: "03 · Pilote 30 j",
    title: "Démarrage maîtrisé, dérisqué",
    description:
      "Mise en production progressive, formation des équipes, mesure d'adoption. 30 jours satisfait ou remboursé.",
  },
  {
    meta: "04 · Run",
    title: "Monitoring continu, itérations",
    description:
      "Tableau de bord d'usage en temps réel, A/B testing de prompts, ajout de nouveaux cas d'usage à la demande.",
  },
];

export function AgentsIAPage() {
  return (
    <>
      <PageAtmosphere preset="ai" />
      <FluidMouseField preset="ai" />

      <PageHero
        label="Agents IA"
        title={
          <>
            Un agent, <span className="text-gradient-strong">N besoins</span>, votre métier.
          </>
        }
        description="Pas un chatbot de plus — un collègue numérique sur mesure. Il trie vos mails, prépare vos devis, alimente votre CRM, répond à vos clients. Il connaît votre métier. Vous gardez la main."
        primaryCta={{ label: "Faire un audit gratuit", href: "/contact" }}
        secondaryCta={{ label: "Voir les besoins couverts", href: "#besoins" }}
        visual={<AIBrainScene />}
        mobileSteps={[
          { label: "Comprend", hint: "RAG · contexte métier" },
          { label: "Décide", hint: "LLM contraint · garde-fous" },
          { label: "Agit", hint: "outils branchés · loggé" },
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
            label="Capacités produit"
            title={
              <>
                Des agents qui <span className="text-gradient-strong">pensent et agissent</span>
              </>
            }
            description="Chaque agent est conçu pour un rôle précis, avec une chaîne de raisonnement transparente et des actions mesurables."
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

      {/* Méthode 2IA */}
      <section id="methode" className="section-shell-tight scroll-mt-24">
        <div className="section-container">
          <PremiumFlowPanel
            label="Méthode 2IA"
            title="Quatre temps, une seule cohérence : un agent qui marche en 30 jours."
            description="On démarre par l'audit, on construit avec vos vrais outils, on dérisque le run avec un pilote satisfait-ou-remboursé."
            steps={methodFlow}
            accent="139, 92, 246"
          />
        </div>
      </section>

      <CTABand
        title={
          <>
            Premier audit <span className="text-gradient-strong">offert</span> · pilote 30 j dérisqué
          </>
        }
        description="45 minutes pour identifier vos 2-3 cas d'usage prioritaires et chiffrer ce qu'un agent IA peut vraiment vous rendre."
        primaryLabel="Réserver mon audit gratuit"
      />
    </>
  );
}
