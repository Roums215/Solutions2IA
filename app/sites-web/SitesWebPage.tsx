"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { DepthDivider } from "@/components/shared/DepthDivider";
import { TransformationCard } from "@/components/shared/TransformationCard";
import { WebScene } from "@/components/scenes/web/WebScene";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const features = [
  { title: "Design premium", description: "Chaque interface est conçue avec un souci obsessionnel du détail. Typographie, couleurs, spacing, hiérarchie — tout est intentionnel et au service de votre image.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg> },
  { title: "Performance maximale", description: "Score Lighthouse 95+. Temps de chargement sous la seconde. Images optimisées, code splitté, cache intelligent. Votre site est rapide — vraiment.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg> },
  { title: "SEO technique", description: "Architecture pensée pour le référencement dès le jour 1. Sémantique HTML, métadonnées structurées, sitemap, Core Web Vitals optimisés.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> },
  { title: "Responsive irréprochable", description: "De l'Apple Watch au 4K, chaque breakpoint est testé et ajusté manuellement. L'expérience est premium sur chaque device, chaque orientation.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg> },
  { title: "Animations premium", description: "Motion design subtil, micro-interactions et scroll storytelling. Chaque mouvement renforce votre crédibilité sans nuire à la lisibilité.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg> },
  { title: "Conversion optimisée", description: "Chaque choix de design sert un objectif business. CTA visibles, parcours fluides, friction minimale. Vos visiteurs deviennent clients.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
];

const beforeAfter = [
  { before: "Site lent, mal référencé, taux de rebond élevé", after: "Chargement < 1s, SEO technique intégré, engagement doublé", metric: "×2 engagement" },
  { before: "Design daté qui ne reflète pas votre niveau", after: "Interface premium qui inspire confiance immédiatement", metric: "+89% crédibilité" },
  { before: "Visiteurs qui partent sans agir", after: "Parcours optimisé, CTA clairs, tunnel de conversion fluide", metric: "×3 conversion" },
  { before: "Site non responsive, expérience mobile médiocre", after: "Expérience parfaite sur mobile, tablette et desktop", metric: "100% responsive" },
];

const gains = [
  { value: "×3", label: "Taux de conversion", detail: "en moyenne après une refonte premium avec Solutions 2IA" },
  { value: "98", label: "Score Lighthouse", detail: "performance, accessibilité, SEO — tout au vert" },
  { value: "<1s", label: "Temps de chargement", detail: "votre site est plus rapide que 95% des sites concurrents" },
  { value: "+89%", label: "Image de marque", detail: "perception de professionnalisme et de crédibilité" },
];

const deliverables = [
  "Direction artistique complète",
  "Maquettes UI desktop + mobile",
  "Prototype interactif validé",
  "Développement Next.js / React",
  "Intégration CMS headless",
  "Animations GSAP / Motion",
  "Optimisation SEO technique",
  "Tests cross-browser et performance",
  "Déploiement sur infrastructure optimisée",
  "Formation à la gestion du contenu",
];

const process = [
  { step: "01", title: "Audit & Stratégie", desc: "Analyse de votre marque, objectifs, concurrence et audience. Définition de la direction optimale.", duration: "1 semaine" },
  { step: "02", title: "Wireframes & UX", desc: "Architecture de l'information, parcours utilisateur et structure des pages pensés pour la conversion.", duration: "1 semaine" },
  { step: "03", title: "Design UI premium", desc: "Direction artistique, composants visuels, maquettes pixel-perfect validées avec vous à chaque étape.", duration: "2 semaines" },
  { step: "04", title: "Développement Next.js", desc: "Code propre, performant, accessible et optimisé SEO. Animations fluides et micro-interactions.", duration: "2-4 semaines" },
  { step: "05", title: "Tests & Lancement", desc: "Tests exhaustifs, optimisation Lighthouse, déploiement et monitoring des performances.", duration: "1 semaine" },
];

export function SitesWebPage() {
  return (
    <>
      <PageAtmosphere preset="web" />
      <PageHero
        label="Sites web premium"
        title={<>Des sites qui <span className="text-gradient-strong">marquent les esprits</span> et convertissent</>}
        description="Sites vitrines, landing pages, plateformes web — nous créons des expériences en ligne rapides, élégantes et orientées conversion. Chaque pixel sert votre image et vos objectifs business."
        primaryCta={{ label: "Créer mon site", href: "/contact" }}
        secondaryCta={{ label: "Voir tous les services", href: "/services" }}
        visual={<WebScene />}
      />

      <DepthDivider preset="wave" />

      {/* Gains — chiffres clés */}
      <section className="relative py-32 lg:py-40 bg-bg-secondary overflow-hidden">
        <SectionParticles style="sparks" count={10} color="rgba(129,140,248,0.15)" secondaryColor="rgba(34,211,238,0.1)" />
        <div className="absolute inset-0" style={{ perspective: "500px" }}>
          <div className="absolute inset-0 bg-grid opacity-[0.02]" style={{ transform: "rotateX(50deg) scale(1.5)", transformOrigin: "center center" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Résultats concrets</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ce qu&apos;un site premium change réellement</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {gains.map((g, i) => (
              <motion.div key={g.label} variants={fadeInUp} className="text-center">
                <motion.span className="text-5xl lg:text-6xl font-bold text-gradient-strong block leading-none" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  {g.value}
                </motion.span>
                <h3 className="text-base font-semibold mt-4 mb-1.5">{g.label}</h3>
                <p className="text-xs text-text-tertiary leading-relaxed">{g.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <DepthDivider preset="glow" />

      {/* Avant / Après */}
      <section className="relative py-32 lg:py-44 overflow-hidden">
        <SectionParticles style="code-rain" count={16} color="rgba(129,140,248,0.08)" secondaryColor="rgba(34,211,238,0.06)" />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeading label="Transformation" title="Avant / Après" description="La différence entre un site ordinaire et un site Solutions 2IA — en termes d'impact réel sur votre activité." />
          <div className="space-y-5">
            {beforeAfter.map((item, i) => (
              <TransformationCard
                key={item.metric}
                variant="web"
                before={item.before}
                after={item.after}
                metric={item.metric}
                afterLabel="Site Solutions 2IA"
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <DepthDivider preset="wave" />

      {/* Features */}
      <section className="relative py-32 lg:py-44 bg-bg-secondary overflow-hidden">
        <SectionParticles style="grid-dots" count={20} color="rgba(129,140,248,0.04)" />
        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeading label="Expertise" title="Ce qui rend nos sites différents" description="Chaque site que nous créons est une combinaison d'excellence technique, de design premium et de stratégie business." />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {features.map((f) => (
              <GlowCard key={f.title}>
                <div className="w-10 h-10 rounded-xl bg-accent-glow border border-accent-primary/15 flex items-center justify-center mb-6">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{f.description}</p>
              </GlowCard>
            ))}
          </motion.div>
        </div>
      </section>

      <DepthDivider preset="glow" />

      {/* Ce que vous obtenez */}
      <section className="relative py-32 lg:py-44 overflow-hidden">
        <SectionParticles style="dots" count={10} color="rgba(129,140,248,0.08)" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Livrables</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-6">Ce que vous obtenez <span className="text-gradient-strong">concrètement</span></h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                Pas de surprises, pas d&apos;ambiguïté. Voici exactement ce qui est inclus dans chaque projet de site web premium.
              </p>
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

            {/* Process */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-5">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Processus</span>
              {process.map((s) => (
                <div key={s.step} className="rounded-xl border border-border-subtle bg-bg-card/60 p-6 card-shine transition-all duration-300 hover:border-border-accent">
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-bold text-gradient-strong font-mono flex-shrink-0">{s.step}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-base font-semibold">{s.title}</h4>
                        <span className="text-[10px] text-accent-light/50 font-mono hidden sm:block">{s.duration}</span>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <DepthDivider preset="glow" />

      {/* Tech */}
      <section className="relative py-24 lg:py-32 bg-bg-secondary overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.span className="text-xs text-text-tertiary uppercase tracking-[0.2em] block mb-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Stack technique</motion.span>
          <motion.h3 className="text-xl font-semibold mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Technologies utilisées pour vos sites</motion.h3>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-3">
            {["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Motion", "Vercel", "Headless CMS", "SEO avancé", "Lighthouse 98+"].map((t) => (
              <motion.span key={t} variants={fadeInUp} className="px-5 py-2.5 text-sm font-medium text-text-secondary bg-bg-card/60 border border-border-subtle rounded-xl transition-all duration-300 hover:border-border-accent hover:text-text-primary cursor-default">{t}</motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABand
        title={<>Votre prochain site mérite d&apos;être <span className="text-gradient-strong">exceptionnel</span></>}
        description="Premier échange offert. Discutons de votre projet et voyons comment tripler votre taux de conversion."
      />
    </>
  );
}
