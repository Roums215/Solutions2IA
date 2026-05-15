"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const values = [
  { title: "Excellence technique", description: "Chaque ligne de code est écrite avec soin et intention. Nous ne livrons que du travail dont nous sommes fiers. Pas de raccourcis, pas de dette technique volontaire." },
  { title: "Design obsessionnel", description: "Le détail fait la différence entre un bon produit et un produit mémorable. Typographie, spacing, couleurs, animations — chaque pixel est intentionnel." },
  { title: "Impact business d'abord", description: "La technologie est un moyen, jamais une fin. Chaque décision technique et créative est guidée par un seul objectif : maximiser l'impact sur votre activité." },
  { title: "Transparence absolue", description: "Pas de jargon, pas de surprises, pas de factures cachées. Vous savez exactement où en est votre projet, quelles sont les options et ce que chaque choix implique." },
  { title: "Innovation continue", description: "IA, automatisation, motion design avancé — nous investissons constamment dans les technologies de demain pour vous donner un avantage compétitif réel." },
  { title: "Sur mesure uniquement", description: "Pas de templates, pas de solutions pré-fabriquées. Chaque projet est unique et reçoit l'attention artisanale qu'il mérite, du premier brief à la dernière optimisation." },
];

const beliefs = [
  { title: "Ce que nous croyons", items: [
    "Le digital doit être intelligent, pas juste beau",
    "Un bon produit résout un vrai problème business",
    "L'IA doit augmenter l'humain, pas le remplacer",
    "La qualité du code détermine la durée de vie du produit",
    "Le design premium est un investissement, pas un luxe",
  ]},
  { title: "Ce que nous refusons", items: [
    "Les projets où la qualité n'est pas une priorité",
    "Les templates maquillés en solutions sur mesure",
    "Les délais irréalistes qui compromettent l'excellence",
    "Les technologies choisies par effet de mode",
    "Les relations clients basées sur l'opacité",
  ]},
];

const process = [
  { number: "01", title: "Découverte", desc: "Comprendre votre activité, vos enjeux, vos utilisateurs et vos objectifs avant d'écrire une seule ligne. Nous posons les questions que personne d'autre ne pose.", duration: "1-2 semaines" },
  { number: "02", title: "Stratégie & Architecture", desc: "Définir l'architecture technique, le positionnement créatif et la roadmap produit. Les bonnes décisions prises tôt font toute la différence en aval.", duration: "1 semaine" },
  { number: "03", title: "Design premium", desc: "Direction artistique, UI/UX, prototypage interactif. Des interfaces mémorables, testées et validées avec vous avant le développement.", duration: "2-3 semaines" },
  { number: "04", title: "Développement & IA", desc: "Code propre, architecture modulaire, agents intelligents et automatisations intégrés. On construit des produits robustes qui tiennent la charge.", duration: "3-6 semaines" },
  { number: "05", title: "Tests & Lancement", desc: "Tests cross-browser, performance, accessibilité, sécurité. Déploiement optimisé sur une infrastructure fiable et scalable.", duration: "1 semaine" },
  { number: "06", title: "Optimisation continue", desc: "Suivi des métriques, A/B testing, améliorations itératives. Votre produit reste performant et pertinent dans la durée.", duration: "Continu" },
];

const qualityFlow = [
  {
    meta: "Clarté",
    title: "Décisions visibles",
    description: "Chaque choix de design, contenu, stack ou automatisation est justifié par l'objectif business.",
  },
  {
    meta: "Revue",
    title: "Design et motion contrôlés",
    description: "Les interfaces sont relues pour le rythme, la hiérarchie, le responsive et la cohérence avec le système visuel.",
  },
  {
    meta: "Qualité",
    title: "Code vérifié",
    description: "Lint, build, composants réutilisables, accessibilité et performance sont traités comme des livrables.",
  },
  {
    meta: "Suivi",
    title: "Lancement mesurable",
    description: "Le produit reste observable après mise en ligne : métriques, retours, bugs, priorités et améliorations.",
  },
];

export function AProposPage() {
  return (
    <>
      <PageAtmosphere preset="about" />
      <FluidMouseField preset="about" />
      <PageHero
        label="À propos de Solutions 2IA"
        title={<>Un studio digital tourné vers <span className="text-gradient-strong">l&apos;excellence</span></>}
        description="Solutions 2IA est un studio digital indépendant spécialisé dans la création d'expériences digitales intelligentes. Nous combinons design premium, développement d'excellence et intelligence artificielle pour créer des produits qui transforment les entreprises."
        primaryCta={{ label: "Démarrer un projet", href: "/contact" }}
        secondaryCta={{ label: "Nos services", href: "/services" }}
      />

      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Quality gates"
            title="Notre exigence n'est pas seulement esthétique, elle est opérationnelle."
            description="Chaque projet passe par des points de contrôle simples et stricts pour garder une qualité constante sans alourdir la collaboration."
            steps={qualityFlow}
            accent="99, 102, 241"
          />
        </div>
      </section>

      {/* Vision */}
      <section className="section-shell">
        <SectionParticles style="dots" count={10} color="rgba(129,140,248,0.08)" />
        <div className="absolute inset-0" style={{ perspective: "600px" }}>
          <div className="absolute inset-0 bg-grid opacity-[0.02]" style={{ transform: "rotateX(45deg) scale(2)", transformOrigin: "center center" }} />
        </div>
        <div className="section-container-narrow">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-6 block">Notre vision</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] mb-8">
              Les meilleures solutions digitales sont celles qu&apos;on ne remarque pas — parce qu&apos;elles <span className="text-gradient-strong">fonctionnent parfaitement</span>.
            </h2>
            <p className="text-lg text-text-secondary leading-[1.8] max-w-3xl mx-auto">
              Nous croyons que le digital ne doit pas simplement être beau. Il doit être intelligent,
              performant et orienté vers un seul objectif : créer de la valeur réelle pour votre entreprise.
              Chaque projet que nous livrons est pensé pour résoudre un vrai problème — pas pour impressionner
              dans un portfolio.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Ce que nous croyons / Ce que nous refusons */}
      <section className="section-shell">
        <SectionParticles style="crosses" count={10} color="rgba(129,140,248,0.06)" />
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {beliefs.map((block) => (
              <motion.div key={block.title} variants={fadeInUp} className="rounded-2xl border border-border-subtle bg-bg-card/60 p-8 sm:p-10">
                <h3 className="text-xl font-semibold mb-6 tracking-tight">{block.title}</h3>
                <div className="space-y-4">
                  {block.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-accent-glow/50 border border-accent-primary/15 flex items-center justify-center flex-shrink-0">
                        {block.title.includes("croyons") ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-light"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-red-400/60"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        )}
                      </div>
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Values */}
      <section className="section-shell">
        <SectionParticles style="hexagons" count={8} color="rgba(129,140,248,0.05)" />
        <div className="section-container">
          <SectionHeading label="Valeurs" title="Ce qui guide chaque décision" description="Ces principes ne sont pas des slogans. Ils sont la raison pour laquelle nos clients reviennent et recommandent." />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14"
          >
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fadeInUp} className="relative pl-8 group">
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-border-medium to-transparent" />
                <div className="absolute left-[-1.5px] top-0 w-[4px] h-12 rounded-full bg-gradient-to-b from-accent-primary to-cyan opacity-50 blur-[2px] transition-all duration-500 group-hover:h-20 group-hover:opacity-100" />
                <span className="text-xs text-accent-light/40 font-mono font-bold block mb-3">0{i + 1}</span>
                <h3 className="text-lg font-semibold mb-3 tracking-tight group-hover:text-accent-light transition-colors duration-300">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Process */}
      <section className="section-shell">
        <SectionParticles style="grid-dots" count={18} color="rgba(129,140,248,0.04)" />
        <div className="section-container">
          <SectionHeading label="Méthode" title="Un processus rigoureux, un résultat premium" description="Chaque projet suit une méthode éprouvée qui garantit qualité, transparence et résultat à la hauteur de vos ambitions." />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {process.map((s) => (
              <motion.div key={s.number} variants={fadeInUp} className="rounded-2xl border border-border-subtle bg-bg-card p-7 sm:p-8 card-shine transition-all duration-500 hover:border-border-accent hover:-translate-y-0.5">
                <div className="flex items-start gap-5">
                  <span className="text-xl font-bold text-gradient-strong font-mono flex-shrink-0 w-10">{s.number}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                      <span className="text-[10px] text-accent-light/50 font-mono hidden sm:block">{s.duration}</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABand
        title={<>Prêt à travailler avec un studio qui <span className="text-gradient-strong">vise l&apos;excellence</span> ?</>}
        description="Discutons de votre projet. Premier échange offert, sans engagement, sans obligation."
      />
    </>
  );
}
