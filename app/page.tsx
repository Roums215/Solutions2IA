"use client";

import { motion } from "motion/react";
import { HeroSection } from "@/components/hero/HeroSection";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { HomeProfileMatrix } from "@/components/sections/home/HomeProfileMatrix";
import { HomeServicesConstellation } from "@/components/sections/home/HomeServicesConstellation";
import { HomeTransformationFlows } from "@/components/sections/home/HomeTransformationFlows";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const deliveryFlow = [
  {
    meta: "Diagnostic",
    title: "Comprendre le levier business",
    description: "On cartographie vos parcours, vos frictions et les opportunités IA avant de toucher au design.",
  },
  {
    meta: "Prototype",
    title: "Designer l'expérience cible",
    description: "Les écrans clés, interactions et micro-animations sont testés comme un vrai produit premium.",
  },
  {
    meta: "Production",
    title: "Construire proprement",
    description: "Next.js, composants réutilisables, performance et accessibilité guident chaque livraison.",
  },
  {
    meta: "Optimisation",
    title: "Mesurer puis améliorer",
    description: "On suit conversion, vitesse, automatisations et qualité perçue pour faire progresser le système.",
  },
];

export default function Home() {
  return (
    <>
      <PageAtmosphere preset="home" />
      <FluidMouseField intensity={1} />
      <HeroSection />

      {/* S1 V7.0 — Profil multi-audience (remplace ex-section Pour qui) */}
      <HomeProfileMatrix />

      {/* S3 V7.0 — Constellation 6 services (remplace ex-section Services overview) */}
      <HomeServicesConstellation />

      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Système Solutions 2IA"
            title="Une progression fluide, du diagnostic au produit qui tourne."
            description="Chaque projet avance comme un système vivant : stratégie, design, développement, automatisation et mesure restent connectés du début à la fin."
            steps={deliveryFlow}
            accent="99, 102, 241"
          />
        </div>
      </section>

      {/* S4 V7.0 — Transformations en mini-flux (remplace ex-section Transformation avant/après) */}
      <HomeTransformationFlows />

      {/* Ex-section « Pour qui » (4 audiences) supprimée — remplacée par S1 HomeProfileMatrix (6 audiences) plus haut */}

      {/* Résultats / Impact */}
      <section className="section-shell">
        <SectionParticles style="crosses" count={10} color="rgba(129,140,248,0.08)" />
        <div className="absolute inset-0" style={{ perspective: "500px" }}>
          <div className="absolute inset-0 bg-grid opacity-[0.02]" style={{ transform: "rotateX(50deg) scale(1.5)", transformOrigin: "center center" }} />
        </div>
        <div className="section-container">
          <SectionHeading
            label="Impact"
            title="Des résultats qui parlent"
            description="Notre obsession : créer un impact mesurable sur votre activité. Voici ce que nos clients constatent."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          >
            {[
              { value: "73%", label: "Temps économisé", detail: "sur les tâches répétitives automatisées" },
              { value: "×3", label: "Conversion", detail: "en moyenne après refonte premium" },
              { value: "98/100", label: "Lighthouse", detail: "performance, SEO, accessibilité" },
              { value: "<24h", label: "Réactivité", detail: "premier retour garanti" },
            ].map((m, i) => (
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
                <h3 className="text-base font-semibold mt-4 mb-1.5">{m.label}</h3>
                <p className="text-xs text-text-tertiary leading-relaxed max-w-[18rem] mx-auto">{m.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Notre approche */}
      <section className="section-shell">
        <SectionParticles style="grid-dots" count={20} color="rgba(129,140,248,0.05)" />
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Notre approche</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] mb-6">
                La technologie au service de votre <span className="text-gradient-strong">ambition</span>
              </h2>
              <p className="text-lg reading-copy mb-8">
                Nous ne vendons pas des sites web ou des applications. Nous concevons des solutions digitales
                qui résolvent de vrais problèmes business. Chaque projet commence par une compréhension profonde
                de votre activité avant d&apos;écrire une seule ligne de code.
              </p>
              <div className="space-y-4">
                {[
                  "Compréhension business avant la technique",
                  "Design premium orienté conversion",
                  "Code d'excellence, architecture évolutive",
                  "IA et automatisation intégrées nativement",
                  "Suivi continu et optimisation post-livraison",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-glow border border-accent-primary/20 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-light"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-sm text-text-secondary">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5"
            >
              {[
                { step: "01", title: "Découverte & Stratégie", desc: "Analyse de votre activité, objectifs et contraintes. Définition de la feuille de route optimale." },
                { step: "02", title: "Design & Prototypage", desc: "Direction artistique, UI/UX et maquettes interactives validées avant le développement." },
                { step: "03", title: "Développement & IA", desc: "Code propre, agents intelligents et automatisations intégrés dans un produit robuste." },
                { step: "04", title: "Livraison & Optimisation", desc: "Déploiement, tests de performance et suivi continu pour garantir l'excellence dans la durée." },
              ].map((s) => (
                <div key={s.step} className="rounded-xl border border-border-subtle bg-bg-card/60 p-6 card-shine transition-all duration-300 hover:border-border-accent">
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-bold text-gradient-strong font-mono flex-shrink-0">{s.step}</span>
                    <div>
                      <h4 className="text-base font-semibold mb-1.5">{s.title}</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-shell-tight">
        <div className="section-container text-center">
          <motion.span className="text-xs text-text-tertiary uppercase tracking-[0.2em] block mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Stack technique</motion.span>
          <motion.h3 className="text-xl font-semibold mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Les technologies que nous maîtrisons</motion.h3>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-3">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Motion", "Node.js", "PostgreSQL", "Vercel", "Agents IA", "Automatisation", "Remotion", "Rive", "Three.js"].map((t) => (
              <motion.span key={t} variants={fadeInUp} className="px-5 py-2.5 text-sm font-medium text-text-secondary bg-bg-card/60 border border-border-subtle rounded-xl transition-all duration-300 hover:border-border-accent hover:text-text-primary cursor-default">{t}</motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABand
        title={<>Prêt à transformer votre <span className="text-gradient-strong">présence digitale</span> ?</>}
        description="Premier échange offert. Discutons de votre projet et identifions ensemble les leviers de croissance les plus impactants."
      />
    </>
  );
}
