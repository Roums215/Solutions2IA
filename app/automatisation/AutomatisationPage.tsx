"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { DepthDivider } from "@/components/shared/DepthDivider";
import { AutomationScene } from "@/components/scenes/automation/AutomationScene";
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

export function AutomatisationPage() {
  return (
    <>
      <PageAtmosphere preset="automation" />
      <PageHero
        label="Automatisation intelligente"
        title={<>Éliminez le <span className="text-gradient-strong">travail répétitif</span></>}
        description="Workflows automatisés, intégrations API et pipelines intelligents. Vos processus s'exécutent seuls, plus vite, sans erreur — pendant que vous vous concentrez sur ce qui compte."
        primaryCta={{ label: "Automatiser mon activité", href: "/contact" }}
        secondaryCta={{ label: "Voir tous les services", href: "/services" }}
        visual={<AutomationScene />}
        glowColor="bg-cyan/5"
      />

      <DepthDivider preset="circuit" />

      {/* Metrics band */}
      <section className="relative py-24 lg:py-28 bg-bg-secondary overflow-hidden">
        <SectionParticles style="sparks" count={18} color="rgba(34,211,238,0.3)" secondaryColor="rgba(99,102,241,0.2)" />
        <div className="absolute inset-0" style={{ perspective: "500px" }}>
          <div className="absolute inset-0 bg-grid opacity-[0.03]" style={{ transform: "rotateX(50deg) scale(1.5)", transformOrigin: "center center" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6"
          >
            {metrics.map((m, i) => (
              <motion.div key={m.label} variants={fadeInUp} className="text-center">
                <motion.span
                  className="text-5xl lg:text-6xl font-bold text-gradient-strong block leading-none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {m.value}
                </motion.span>
                <h3 className="text-base font-semibold mt-3 mb-1">{m.label}</h3>
                <p className="text-xs text-text-tertiary">{m.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <DepthDivider preset="glow" />

      {/* Capabilities */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <SectionParticles style="circuit-nodes" count={14} color="rgba(34,211,238,0.15)" secondaryColor="rgba(99,102,241,0.1)" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="relative max-w-7xl mx-auto px-6">
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
              <GlowCard key={f.title}>
                <div className="w-10 h-10 rounded-xl bg-cyan-glow border border-cyan/15 flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{f.description}</p>
              </GlowCard>
            ))}
          </motion.div>
        </div>
      </section>

      <DepthDivider preset="circuit" />

      {/* Integrations grid */}
      <section className="relative py-28 lg:py-36 bg-bg-secondary overflow-hidden">
        <SectionParticles style="dots" count={12} color="rgba(34,211,238,0.12)" secondaryColor="rgba(99,102,241,0.08)" />
        <div className="relative max-w-7xl mx-auto px-6">
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

      <DepthDivider preset="glow" />

      {/* Before / After */}
      <section className="relative py-24 overflow-hidden">
        <SectionParticles style="sparks" count={10} color="rgba(34,211,238,0.25)" secondaryColor="rgba(74,222,128,0.2)" />
        <motion.div
          className="relative max-w-4xl mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Impact concret</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Le jour et la nuit</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
            <motion.div
              className="rounded-2xl border border-border-subtle bg-bg-card/30 p-8 text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs text-text-tertiary uppercase tracking-wider block mb-4">Sans automatisation</span>
              <span className="text-5xl font-bold text-text-tertiary/30 block mb-3">8h</span>
              <span className="text-sm text-text-tertiary block mb-4">par jour de tâches manuelles</span>
              <div className="space-y-2 text-left">
                {["Copier-coller entre outils", "Envoi de mails un par un", "Mise à jour manuelle du CRM", "Reporting à la main"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-text-tertiary">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400/40"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="rounded-2xl border border-cyan/15 bg-cyan/[0.03] p-8 text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs text-cyan uppercase tracking-wider block mb-4">Avec Solutions 2IA</span>
              <span className="text-5xl font-bold text-gradient-strong block mb-3">2h</span>
              <span className="text-sm text-text-secondary block mb-4">focus sur la valeur réelle</span>
              <div className="space-y-2 text-left">
                {["Données synchronisées en temps réel", "Emails envoyés automatiquement", "CRM mis à jour instantanément", "Rapports générés chaque matin"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-text-secondary">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400/60"><polyline points="20 6 9 17 4 12" /></svg>
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <CTABand
        title={<>Automatisez. <span className="text-gradient-strong">Accélérez. Libérez-vous.</span></>}
        description="Identifions ensemble les processus à automatiser pour un impact immédiat sur votre productivité."
      />
    </>
  );
}
