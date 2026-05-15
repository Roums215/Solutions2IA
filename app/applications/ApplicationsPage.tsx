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
import { AppScene } from "@/components/scenes/mobile/AppScene";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const capabilities = [
  { title: "Applications web", description: "Dashboards, SaaS, plateformes métier — des applications web robustes avec une UX qui fait la différence au quotidien.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg> },
  { title: "Applications mobiles", description: "iOS et Android, natif ou cross-platform. Des apps fluides, rapides et qui exploitent pleinement chaque plateforme.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg> },
  { title: "Architecture évolutive", description: "Code modulaire, API solide, base de données optimisée. Votre app grandit avec votre entreprise sans refonte.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
  { title: "Temps réel", description: "WebSockets, synchronisation instantanée, notifications push. Vos utilisateurs voient les changements en direct.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg> },
  { title: "Offline-first", description: "Vos apps fonctionnent même sans connexion. Les données se synchronisent automatiquement dès le retour du réseau.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55" /><path d="M12 20h.01" /></svg> },
  { title: "Sécurité native", description: "Authentification, chiffrement end-to-end, validation serveur. La sécurité est intégrée dès la première ligne de code.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
];

const beforeAfter = [
  { before: "Processus manuels lents et sources d'erreurs", after: "Application fluide qui automatise et sécurise chaque étape", metric: "-80% erreurs" },
  { before: "Outils dispersés sans vision unifiée", after: "Dashboard centralisé avec toutes vos données en un coup d'œil", metric: "×4 productivité" },
  { before: "Expérience mobile médiocre ou inexistante", after: "App native premium, rapide, fluide et engageante", metric: "+67% engagement" },
  { before: "Pas de visibilité sur les métriques clés", after: "Analytics temps réel et alertes proactives intégrées", metric: "24/7 visibilité" },
];

const gains = [
  { value: "+67%", label: "Engagement utilisateur", detail: "grâce à une UX pensée pour la rétention" },
  { value: "×4", label: "Productivité", detail: "centralisation et automatisation des processus" },
  { value: "99.9%", label: "Disponibilité", detail: "infrastructure scalable et monitoring continu" },
  { value: "<2s", label: "Temps de réponse", detail: "performances optimisées sur toutes les plateformes" },
];

const deliverables = [
  "Spécifications fonctionnelles détaillées",
  "Architecture technique & API",
  "Design UI/UX mobile + desktop",
  "Prototype interactif validé",
  "Développement full-stack",
  "Intégration API & services tiers",
  "Tests automatisés & QA",
  "Déploiement CI/CD",
  "Documentation technique",
  "Formation et accompagnement",
];

const appTypes = [
  { title: "Dashboard SaaS", description: "Interfaces de gestion complexes avec graphiques, filtres avancés et exports. UX pensée pour la productivité quotidienne.", gradient: "from-accent-primary to-accent-light" },
  { title: "App mobile B2C", description: "Applications grand public avec onboarding premium, notifications intelligentes et expérience native fluide.", gradient: "from-cyan to-accent-primary" },
  { title: "Plateforme métier", description: "Outils internes sur mesure qui digitalisent vos processus et éliminent les inefficacités opérationnelles.", gradient: "from-accent-light to-cyan" },
  { title: "Marketplace", description: "Plateformes de mise en relation avec gestion des transactions, avis, messagerie et dashboards vendeurs.", gradient: "from-accent-dark to-accent-primary" },
];

const productFlow = [
  {
    meta: "Modèle",
    title: "Structurer la donnée métier",
    description: "Nous clarifions les entités, rôles, permissions et états pour éviter les fondations fragiles.",
  },
  {
    meta: "Parcours",
    title: "Fluidifier les tâches clés",
    description: "Les écrans sont organisés autour des actions réelles : créer, suivre, valider, corriger, décider.",
  },
  {
    meta: "Système",
    title: "Connecter API et automatisations",
    description: "L'application dialogue avec vos outils, déclenche les bons workflows et garde les données cohérentes.",
  },
  {
    meta: "Pilotage",
    title: "Mesurer usage et stabilité",
    description: "Monitoring, analytics, erreurs et performance deviennent visibles pour améliorer le produit continuellement.",
  },
];

export function ApplicationsPage() {
  return (
    <>
      <PageAtmosphere preset="apps" />
      <FluidMouseField preset="apps" />
      <PageHero
        label="Applications web & mobile"
        title={<>Des applications qui <span className="text-gradient-strong">transforment</span> votre activité</>}
        description="Applications web et mobiles conçues pour la performance, la fluidité et l'expérience utilisateur. Du dashboard SaaS à l'app mobile B2C — chaque produit est pensé pour durer et pour performer."
        primaryCta={{ label: "Créer mon application", href: "/contact" }}
        secondaryCta={{ label: "Voir tous les services", href: "/services" }}
        visual={<AppScene />}
      />

      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Architecture produit"
            title="Une application premium se ressent autant dans l'interface que dans son système."
            description="Nous concevons l'application comme un cockpit métier : données propres, actions rapides, états lisibles et automatisations fiables."
            steps={productFlow}
            accent="14, 165, 233"
          />
        </div>
      </section>

      {/* Gains */}
      <section className="section-shell">
        <SectionParticles style="bubbles" count={10} color="rgba(129,140,248,0.1)" secondaryColor="rgba(34,211,238,0.08)" />
        <div className="absolute inset-0" style={{ perspective: "500px" }}>
          <div className="absolute inset-0 bg-grid opacity-[0.02]" style={{ transform: "rotateX(50deg) scale(1.5)", transformOrigin: "center center" }} />
        </div>
        <div className="section-container">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Impact mesurable</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ce qu&apos;une application premium change</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {gains.map((g, i) => (
              <motion.div key={g.label} variants={fadeInUp} className="metric-tile px-5 py-6 sm:px-6 sm:py-7 text-center">
                <motion.span className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-gradient-strong block leading-none" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>{g.value}</motion.span>
                <h3 className="text-base font-semibold mt-4 mb-1.5">{g.label}</h3>
                <p className="text-xs text-text-tertiary leading-relaxed max-w-[18rem] mx-auto">{g.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Avant / Après */}
      <section className="section-shell">
        <SectionParticles style="dots" count={12} color="rgba(129,140,248,0.06)" />
        <div className="section-container">
          <SectionHeading label="Transformation" title="Avant / Après" description="L'impact concret d'une application bien conçue sur votre quotidien opérationnel." />
          <div className="space-y-6 lg:space-y-8">
            {beforeAfter.map((item, i) => (
              <TransformationCard
                key={item.metric}
                variant="app"
                before={item.before}
                after={item.after}
                metric={item.metric}
                afterLabel="App Solutions 2IA"
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-shell">
        <SectionParticles style="grid-dots" count={18} color="rgba(129,140,248,0.04)" />
        <div className="section-container">
          <SectionHeading label="Capacités" title="Du prototype au produit" description="Chaque application est architecturée pour durer, évoluer et offrir une expérience irréprochable." />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {capabilities.map((c) => (
              <motion.div key={c.title} variants={fadeInUp}>
                <SpotlightCard glow="14,165,233" tilt={4} pulse className="p-7 sm:p-8 h-full">
                  <div className="w-10 h-10 rounded-xl bg-accent-glow border border-accent-primary/15 flex items-center justify-center mb-6" style={{ transform: "translateZ(30px)" }}>{c.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 tracking-tight" style={{ transform: "translateZ(20px)" }}>{c.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed" style={{ transform: "translateZ(10px)" }}>{c.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Types d'apps + Livrables */}
      <section className="section-shell">
        <SectionParticles style="bubbles" count={8} color="rgba(129,140,248,0.06)" />
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Types de projets</span>
              <h2 className="text-3xl font-bold tracking-tight leading-[1.1] mb-8">Chaque application est <span className="text-gradient-strong">unique</span></h2>
              <div className="space-y-5">
                {appTypes.map((at) => (
                  <div key={at.title} className="rounded-xl border border-border-subtle bg-bg-card/60 p-6 card-shine transition-all duration-300 hover:border-border-accent">
                    <div className={`w-full h-0.5 rounded-full bg-gradient-to-r ${at.gradient} mb-4 opacity-40`} />
                    <h4 className="text-base font-semibold mb-2">{at.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{at.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Livrables</span>
              <h2 className="text-3xl font-bold tracking-tight leading-[1.1] mb-8">Ce que vous obtenez <span className="text-gradient-strong">concrètement</span></h2>
              <div className="space-y-4">
                {deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-glow/50 border border-accent-primary/15 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-light"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-sm text-text-secondary">{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTABand title={<>Votre application mérite une <span className="text-gradient-strong">exécution premium</span></>} description="De l'idée au produit fini. Premier échange offert pour discuter de votre projet." />
    </>
  );
}
