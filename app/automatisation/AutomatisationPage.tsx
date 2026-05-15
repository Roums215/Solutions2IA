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
import { AutomationScene } from "@/components/scenes/automation/AutomationScene";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const features = [
  { title: "Workflows sur mesure", description: "Des chaînes de tâches intelligentes, déclenchées automatiquement. Chaque workflow est construit pour votre logique métier unique.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /><circle cx="12" cy="12" r="3" /></svg> },
  { title: "Intégrations API", description: "Connectez tous vos outils : CRM, email, Slack, comptabilité, stockage. Tout communique, tout se synchronise en temps réel.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg> },
  { title: "Zéro code, pleine puissance", description: "Solutions no-code/low-code quand c'est possible. Code sur mesure quand il faut plus. Toujours la bonne approche.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg> },
  { title: "Monitoring temps réel", description: "Suivez vos automatisations en direct. Taux de succès, temps d'exécution, erreurs — chaque métrique est visible et traçable.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg> },
  { title: "Scalabilité infinie", description: "De 10 à 100 000 exécutions par jour. Vos automatisations tiennent la charge et s'adaptent à la demande automatiquement.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan"><path d="M18 20V10M12 20V4M6 20v-6" /></svg> },
  { title: "Sécurité et fiabilité", description: "Gestion des erreurs, retry automatique, logs complets, alertes proactives. Vos processus critiques sont entre de bonnes mains.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
];

const metrics = [
  { value: "73%", label: "Temps économisé", description: "en moyenne sur les tâches répétitives automatisées" },
  { value: "1,247", label: "Tâches / heure", description: "traitées par nos systèmes en production" },
  { value: "0.02%", label: "Taux d'erreur", description: "fiabilité de niveau industriel" },
  { value: "24/7", label: "Disponibilité", description: "vos automatisations ne dorment jamais" },
];

const integrations = [
  { name: "Slack", desc: "Notifications et commandes" },
  { name: "HubSpot", desc: "CRM et pipeline commercial" },
  { name: "Stripe", desc: "Paiements et facturation" },
  { name: "Google", desc: "Sheets, Drive, Calendar" },
  { name: "Notion", desc: "Base de connaissances" },
  { name: "Zapier", desc: "Orchestration multi-outils" },
  { name: "PostgreSQL", desc: "Base de données" },
  { name: "API REST", desc: "Toute API externe" },
];

const beforeAfter = [
  {
    before: "Vos équipes copient les données entre outils, vérifient les statuts à la main et relancent les clients au cas par cas.",
    after: "Un workflow déclenche les actions, synchronise les données, met à jour le CRM et notifie les bonnes personnes automatiquement.",
    metric: "73% temps",
  },
  {
    before: "Chaque erreur bloque le process : facture oubliée, lead non traité, fichier mal nommé, reporting incomplet.",
    after: "Les contrôles, retries, alertes et logs rendent le processus fiable, traçable et beaucoup plus simple à piloter.",
    metric: "0.02% erreur",
  },
];

const automationFlow = [
  {
    meta: "Déclencheur",
    title: "Identifier le bon signal",
    description: "Formulaire, nouveau lead, facture, email, webhook ou changement de statut : tout part d'un événement fiable.",
  },
  {
    meta: "Règles",
    title: "Décider sans ambiguïté",
    description: "Conditions, exceptions, validation humaine et priorités rendent le workflow robuste dans les vrais cas métier.",
  },
  {
    meta: "Connexions",
    title: "Synchroniser vos outils",
    description: "CRM, tableur, email, Slack, API, base de données : chaque système reçoit la bonne information au bon moment.",
  },
  {
    meta: "Contrôle",
    title: "Suivre les exécutions",
    description: "Logs, retries, alertes et métriques permettent de piloter les automatisations comme un système de production.",
  },
];

export function AutomatisationPage() {
  return (
    <>
      <PageAtmosphere preset="automation" />
      <FluidMouseField preset="automation" />
      <PageHero
        label="Automatisation intelligente"
        title={<>Éliminez le <span className="text-gradient-strong">travail répétitif</span></>}
        description="Workflows automatisés, intégrations API et pipelines intelligents. Vos processus s'exécutent seuls, plus vite, sans erreur — pendant que vous vous concentrez sur ce qui compte."
        primaryCta={{ label: "Automatiser mon activité", href: "/contact" }}
        secondaryCta={{ label: "Voir tous les services", href: "/services" }}
        visual={<AutomationScene />}
        glowColor="bg-cyan/5"
      />

      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Flux automatisé"
            title="Une automatisation utile doit montrer ce qui circule, ce qui décide et ce qui se vérifie."
            description="Nous concevons vos workflows comme des chaînes opérationnelles lisibles : événement, logique métier, intégrations, contrôle qualité."
            steps={automationFlow}
            accent="34, 211, 238"
          />
        </div>
      </section>

      {/* Metrics band */}
      <section className="section-shell-tight">
        <SectionParticles style="sparks" count={18} color="rgba(34,211,238,0.3)" secondaryColor="rgba(99,102,241,0.2)" />
        <div className="absolute inset-0" style={{ perspective: "500px" }}>
          <div className="absolute inset-0 bg-grid opacity-[0.03]" style={{ transform: "rotateX(50deg) scale(1.5)", transformOrigin: "center center" }} />
        </div>
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          >
            {metrics.map((m, i) => (
              <motion.div key={m.label} variants={fadeInUp} className="metric-tile px-5 py-6 sm:px-6 sm:py-7 text-center">
                <motion.span
                  className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gradient-strong block leading-none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {m.value}
                </motion.span>
                <h3 className="text-base font-semibold mt-3 mb-1">{m.label}</h3>
                <p className="text-xs text-text-tertiary leading-relaxed max-w-[18rem] mx-auto">{m.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Capabilities */}
      <section className="section-shell">
        <SectionParticles style="circuit-nodes" count={14} color="rgba(34,211,238,0.15)" secondaryColor="rgba(99,102,241,0.1)" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="section-container">
          <SectionHeading
            label="Capacités"
            title="L'automatisation qui s'adapte à vous"
            description="Des solutions flexibles et robustes qui s'intègrent dans votre écosystème existant sans tout casser."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeInUp}>
                <SpotlightCard glow="34,211,238" tilt={4} pulse className="p-7 sm:p-8 h-full">
                  <div className="w-10 h-10 rounded-xl bg-cyan-glow border border-cyan/15 flex items-center justify-center mb-5" style={{ transform: "translateZ(30px)" }}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 tracking-tight" style={{ transform: "translateZ(20px)" }}>{f.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed" style={{ transform: "translateZ(10px)" }}>{f.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Integrations grid */}
      <section className="section-shell">
        <SectionParticles style="dots" count={12} color="rgba(34,211,238,0.12)" secondaryColor="rgba(99,102,241,0.08)" />
        <div className="section-container">
          <SectionHeading
            label="Intégrations"
            title="Connecté à tout votre écosystème"
            description="Nous nous connectons à vos outils existants pour créer des workflows fluides et puissants."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {integrations.map((intg) => (
              <motion.div
                key={intg.name}
                variants={fadeInUp}
                className="rounded-xl border border-border-subtle bg-bg-card/60 p-5 text-center card-shine transition-all duration-500 hover:border-cyan/20 hover:bg-bg-card-hover hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-glow border border-cyan/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xs font-mono font-bold text-cyan">{intg.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <h4 className="text-sm font-semibold mb-1">{intg.name}</h4>
                <p className="text-[11px] text-text-tertiary">{intg.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Before / After */}
      <section className="section-shell-tight">
        <SectionParticles style="sparks" count={10} color="rgba(34,211,238,0.25)" secondaryColor="rgba(74,222,128,0.2)" />
        <div className="section-container">
          <SectionHeading
            label="Impact concret"
            title="Le jour et la nuit"
            description="On ne se contente pas de gagner du temps : on construit des flux fiables entre vos outils, vos données et vos équipes."
          />
          <div className="space-y-6 lg:space-y-8">
            {beforeAfter.map((item, i) => (
              <TransformationCard
                key={item.metric}
                variant="automation"
                before={item.before}
                after={item.after}
                metric={item.metric}
                beforeLabel="Sans workflow"
                afterLabel="Workflow Solutions 2IA"
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={<>Automatisez. <span className="text-gradient-strong">Accélérez. Libérez-vous.</span></>}
        description="Identifions ensemble les processus à automatiser pour un impact immédiat sur votre productivité."
      />
    </>
  );
}
