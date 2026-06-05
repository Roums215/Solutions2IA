"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { TransformationCard } from "@/components/shared/TransformationCard";
import { AIBrainScene } from "@/components/scenes/ai/AIBrainScene";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const capabilities = [
  { title: "Analyse contextuelle", description: "Vos agents comprennent le contexte business, analysent les données en profondeur et identifient les patterns invisibles à l'œil humain.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> },
  { title: "Prise de décision", description: "Basés sur des modèles de langage avancés, ils évaluent les options, calculent les risques et choisissent l'action optimale.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
  { title: "Exécution autonome", description: "Une fois configurés, vos agents travaillent 24h/24 sans supervision. Ils agissent, apprennent et s'adaptent en continu.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg> },
  { title: "Orchestration multi-agents", description: "Plusieurs agents coordonnés qui collaborent, se répartissent les tâches et résolvent des problèmes complexes en parallèle.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><circle cx="12" cy="12" r="3" /><circle cx="4" cy="6" r="2" /><circle cx="20" cy="6" r="2" /><circle cx="4" cy="18" r="2" /><circle cx="20" cy="18" r="2" /></svg> },
  { title: "Intégration native", description: "Vos agents se connectent nativement à vos outils : CRM, email, Slack, base de données, APIs tierces — sans friction.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg> },
  { title: "Transparence totale", description: "Chaque décision est traçable et explicable. Vous savez pourquoi l'agent a agi, quand, comment, et avec quel résultat.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> },
];

const beforeAfter = [
  { before: "Support client submergé, temps de réponse > 4h", after: "Réponses instantanées, qualification automatique, escalade intelligente", metric: "< 2s réponse" },
  { before: "Analyse manuelle de données, rapports en retard", after: "Insights générés automatiquement, rapports livrés chaque matin", metric: "24K pts/min" },
  { before: "Leads non qualifiés, relances oubliées", after: "Scoring automatique, relances au bon moment, pipeline optimisé", metric: "+34% conversion" },
  { before: "Aucune veille, problèmes détectés trop tard", after: "Surveillance continue, alertes proactives, suggestions d'optimisation", metric: "24/7 actif" },
];

const gains = [
  { value: "97.4%", label: "Taux de confiance", detail: "précision des décisions prises par l'agent" },
  { value: "0.3s", label: "Temps de réponse", detail: "latence moyenne de bout en bout" },
  { value: "×10", label: "Productivité", detail: "tâches traitées vs équipe manuelle" },
  { value: "24/7", label: "Disponibilité", detail: "vos agents ne dorment jamais" },
];

const useCases = [
  { title: "Support client intelligent", description: "Réponses instantanées et contextualisées. Qualification automatique des demandes. Escalade vers l'humain uniquement quand nécessaire. Satisfaction mesurée en continu.", metric: "< 2s", metricLabel: "temps de réponse" },
  { title: "Analyse de données", description: "Extraction d'insights à partir de millions de points de données. Rapports générés automatiquement. Recommandations actionnables livrées en temps réel.", metric: "24K", metricLabel: "points analysés/min" },
  { title: "Assistant commercial", description: "Qualification de leads instantanée, scoring automatisé, relances intelligentes au bon moment. Votre pipeline travaille pendant que vous dormez.", metric: "+34%", metricLabel: "conversion" },
  { title: "Veille et monitoring", description: "Surveillance continue de vos KPIs. Détection d'anomalies proactive. Alertes contextualisées et suggestions d'optimisation.", metric: "24/7", metricLabel: "surveillance" },
];

const deliverables = [
  "Analyse de votre cas d'usage et faisabilité",
  "Architecture de l'agent (chaîne de raisonnement)",
  "Conception des prompts et garde-fous",
  "Intégration à vos outils existants",
  "Tests et validation de la précision",
  "Dashboard de monitoring en temps réel",
  "Documentation complète",
  "Formation de votre équipe",
  "Optimisation continue post-livraison",
];

const agentFlow = [
  {
    meta: "Connaissance",
    title: "Connecter le contexte utile",
    description: "Documents, CRM, FAQ, données métier et règles internes deviennent la mémoire exploitable de l'agent.",
  },
  {
    meta: "Raisonnement",
    title: "Encadrer la décision",
    description: "Prompts, garde-fous, seuils de confiance et validations humaines sécurisent les décisions sensibles.",
  },
  {
    meta: "Actions",
    title: "Brancher les outils",
    description: "L'agent peut créer, classer, répondre, relancer, notifier ou mettre à jour vos systèmes existants.",
  },
  {
    meta: "Monitoring",
    title: "Observer et améliorer",
    description: "Chaque action reste traçable avec scores, logs, retours utilisateurs et optimisation continue.",
  },
];

export function AgentsIAPage() {
  return (
    <>
      <PageAtmosphere preset="ai" />
      <FluidMouseField preset="ai" />
      <PageHero
        label="Agents IA"
        title={<>L&apos;intelligence qui <span className="text-gradient-strong">travaille pour vous</span></>}
        description="Des agents autonomes qui analysent, décident et exécutent. Ils comprennent le contexte, prennent les bonnes décisions et agissent — 24h/24, sans fatigue, sans erreur."
        primaryCta={{ label: "Créer mon agent IA", href: "/contact" }}
        secondaryCta={{ label: "Voir tous les services", href: "/services" }}
        visual={<AIBrainScene />}
      />

      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Cycle de l'agent"
            title="Un agent IA fiable n'est pas juste un chatbot, c'est une chaîne d'exécution contrôlée."
            description="Nous construisons vos agents avec mémoire, raisonnement, actions connectées et supervision pour qu'ils soient utiles dès les premiers jours."
            steps={agentFlow}
            accent="139, 92, 246"
          />
        </div>
      </section>

      {/* Gains */}
      <section className="section-shell">
        <SectionParticles style="sparks" count={12} color="rgba(129,140,248,0.15)" secondaryColor="rgba(34,211,238,0.1)" />
        <div className="absolute inset-0" style={{ perspective: "500px" }}>
          <div className="absolute inset-0 bg-grid opacity-[0.02]" style={{ transform: "rotateX(50deg) scale(1.5)", transformOrigin: "center center" }} />
        </div>
        <div className="section-container">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Performance</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ce que nos agents IA délivrent</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {gains.map((g) => (
              <motion.div key={g.label} variants={fadeInUp} className="metric-tile px-5 py-6 sm:px-6 sm:py-7 text-center">
                <span className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gradient-strong block leading-none">{g.value}</span>
                <h3 className="text-base font-semibold mt-4 mb-1.5">{g.label}</h3>
                <p className="text-xs text-text-tertiary leading-relaxed max-w-[18rem] mx-auto">{g.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Avant / Après */}
      <section className="section-shell">
        <SectionParticles style="hexagons" count={12} color="rgba(129,140,248,0.06)" secondaryColor="rgba(34,211,238,0.04)" />
        <div className="section-container">
          <SectionHeading label="Transformation" title="Sans agent / Avec agent" description="La différence entre gérer manuellement et déléguer à une intelligence artificielle qui travaille pour vous." />
          <div className="space-y-6 lg:space-y-8">
            {beforeAfter.map((item, i) => (
              <TransformationCard
                key={item.metric}
                variant="ai"
                before={item.before}
                after={item.after}
                metric={item.metric}
                beforeLabel="Sans agent IA"
                afterLabel="Avec votre agent IA"
                index={i}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Capabilities */}
      <section className="section-shell">
        <SectionParticles style="crosses" count={14} color="rgba(129,140,248,0.06)" />
        <div className="section-container">
          <SectionHeading label="Capacités" title="Des agents qui pensent et agissent" description="Chaque agent est conçu pour un rôle précis, avec une chaîne de raisonnement transparente et des actions mesurables." />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {capabilities.map((c) => (
              <motion.div key={c.title} variants={fadeInUp}>
                <SpotlightCard glow="139,92,246" tilt={5} pulse className="p-7 sm:p-8 h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent-glow border border-accent-primary/15 flex items-center justify-center mb-6" style={{ transform: "translateZ(35px)" }}>{c.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 tracking-tight" style={{ transform: "translateZ(22px)" }}>{c.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed" style={{ transform: "translateZ(12px)" }}>{c.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Use cases */}
      <section className="section-shell">
        <SectionParticles style="dots" count={10} color="rgba(129,140,248,0.06)" />
        <div className="section-container">
          <SectionHeading label="Cas d'usage" title="L'IA au service du concret" description="Des applications réelles qui transforment votre quotidien opérationnel et multiplient votre impact." />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {useCases.map((uc, i) => (
              <motion.div key={uc.title} variants={fadeInUp} className="rounded-2xl border border-border-subtle bg-bg-card p-8 card-shine transition-all duration-500 hover:border-border-accent hover:shadow-lg hover:shadow-accent-glow/5 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="text-xs text-accent-light/40 font-mono font-bold block mb-2">0{i + 1}</span>
                    <h3 className="text-xl font-semibold tracking-tight">{uc.title}</h3>
                  </div>
                  <div className="text-right flex-shrink-0 px-3 py-2 rounded-xl bg-accent-glow/50 border border-accent-primary/10">
                    <span className="text-xl font-bold text-gradient-strong block leading-none">{uc.metric}</span>
                    <span className="text-[9px] text-text-tertiary">{uc.metricLabel}</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{uc.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Livrables */}
      <section className="section-shell">
        <SectionParticles style="grid-dots" count={16} color="rgba(129,140,248,0.04)" />
        <div className="section-container-narrow">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Livrables</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ce que vous obtenez <span className="text-gradient-strong">concrètement</span></h2>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">Chaque projet d&apos;agent IA inclut un ensemble complet de livrables pour garantir la réussite.</p>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {deliverables.map((d, i) => (
              <motion.div key={d} variants={fadeInUp} className="flex items-center gap-3 py-2">
                <div className="w-6 h-6 rounded-full bg-accent-glow/50 border border-accent-primary/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-mono font-bold text-accent-light">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <span className="text-sm text-text-secondary leading-relaxed">{d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Live status */}
      <section className="section-shell-compact">
        <div className="absolute inset-0" style={{ perspective: "600px" }}>
          <div className="absolute inset-0 bg-grid opacity-[0.02]" style={{ transform: "rotateX(45deg) scale(2)", transformOrigin: "center center" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />
        <motion.div className="relative max-w-4xl mx-auto px-6 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <motion.div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-border-accent bg-bg-card/60 backdrop-blur-xl mb-8" animate={{ boxShadow: ["0 0 20px rgba(99,102,241,0.05)", "0 0 40px rgba(99,102,241,0.12)", "0 0 20px rgba(99,102,241,0.05)"] }} transition={{ duration: 4, repeat: Infinity }}>
            <motion.div className="w-3 h-3 rounded-full bg-green-400" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <span className="text-sm text-text-primary font-medium">Vos agents IA travaillent en ce moment</span>
          </motion.div>
        </motion.div>
      </section>

      <CTABand
        title={<>Prêt à déployer votre <span className="text-gradient-strong">intelligence artificielle</span> ?</>}
        description="Créons ensemble un agent IA qui transforme votre façon de travailler. Premier échange gratuit, sans engagement."
      />
    </>
  );
}
