"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const services = [
  {
    title: "Sites web premium",
    description: "Sites vitrines, landing pages et plateformes web conçus pour convertir, performer et impressionner.",
    href: "/sites-web",
    gradient: "from-accent-primary to-accent-light",
    includes: ["Direction artistique", "UI/UX design", "Développement Next.js", "SEO technique", "Animations premium"],
    result: "×3 conversion moyenne",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  },
  {
    title: "Applications",
    description: "Apps web et mobiles performantes. Dashboards SaaS, apps B2C, plateformes métier avec une UX irréprochable.",
    href: "/applications",
    gradient: "from-accent-light to-cyan",
    includes: ["Architecture produit", "Design d'interface", "Développement full-stack", "Temps réel", "Déploiement continu"],
    result: "+89% engagement",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>,
  },
  {
    title: "Agents IA",
    description: "Assistants intelligents autonomes qui analysent, décident et exécutent vos processus les plus critiques.",
    href: "/agents-ia",
    gradient: "from-cyan to-accent-primary",
    includes: ["Conception de l'agent", "Chaîne de raisonnement", "Intégration à vos outils", "Monitoring", "Optimisation continue"],
    result: "24/7 actif",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="9" cy="16" r="1" fill="currentColor" /><circle cx="15" cy="16" r="1" fill="currentColor" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>,
  },
  {
    title: "Automatisation",
    description: "Workflows intelligents, intégrations API et pipelines qui éliminent les tâches répétitives et accélèrent vos processus.",
    href: "/automatisation",
    gradient: "from-accent-dark to-cyan",
    includes: ["Audit des processus", "Design du workflow", "Intégrations API", "Monitoring temps réel", "Maintenance continue"],
    result: "73% temps économisé",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /><circle cx="12" cy="12" r="3" /></svg>,
  },
  {
    title: "RAG · Mémoire métier",
    description: "L'IA répond avec vos documents — pas avec de l'improvisation. Un cerveau documentaire privé qui cite la source précise pour chaque réponse.",
    href: "/rag",
    gradient: "from-accent-light to-accent-primary",
    includes: ["Activation de votre mémoire", "Connexion sources (Drive · Notion · SharePoint · PDF)", "Recherche hybride + citations", "Sécurité & souveraineté UE", "Mises à jour automatiques"],
    result: "Mémoire documentaire connectée",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6c2-1 5-1 7 0v13c-2-1-5-1-7 0V6z" /><path d="M21 6c-2-1-5-1-7 0v13c2-1 5-1 7 0V6z" /><path d="M10 19c0-1.5 1-2 2-2s2 0.5 2 2" /></svg>,
  },
  {
    title: "Studio visuel",
    description: "Motion design, 2D/3D, Remotion, animations avancées et interfaces immersives qui marquent les esprits.",
    href: "/studio-visuel",
    gradient: "from-accent-primary to-accent-dark",
    includes: ["Direction artistique", "Motion design", "Animations GSAP/Rive", "Vidéo Remotion", "Compositing avancé"],
    result: "+200% mémorabilité",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg>,
  },
];

const approach = [
  { title: "Sur mesure exclusivement", description: "Zéro template, zéro copier-coller. Chaque projet est conçu à partir de vos objectifs spécifiques." },
  { title: "Orienté résultat", description: "Chaque décision — technique ou créative — est guidée par l'impact sur votre activité, pas par la tendance du moment." },
  { title: "Excellence technique", description: "Code propre, architecture évolutive, performance optimisée. Nous construisons des produits qui durent et qui scalent." },
  { title: "IA intégrée nativement", description: "L'intelligence artificielle n'est pas un add-on. Elle est pensée dès la conception pour maximiser la valeur de chaque solution." },
];

const serviceFlow = [
  {
    meta: "Cadrage",
    title: "Prioriser ce qui crée de la valeur",
    description: "Objectifs, audience, contraintes, données disponibles et automatisations possibles sont clarifiés ensemble.",
  },
  {
    meta: "Design",
    title: "Transformer l'idée en expérience",
    description: "Nous prototypons les parcours, les états, les interactions et la hiérarchie visuelle avant le build.",
  },
  {
    meta: "Build",
    title: "Développer sur une base solide",
    description: "Architecture Next.js, composants premium, performances et intégrations sont construits proprement.",
  },
  {
    meta: "Scale",
    title: "Faire évoluer sans casser",
    description: "Les livrables restent maintenables, mesurables et prêts à accueillir de nouveaux modules.",
  },
];

export function ServicesPage() {
  return (
    <>
      <PageAtmosphere preset="services" />
      <FluidMouseField preset="services" />
      <PageHero
        label="Nos services"
        title={<>Des solutions digitales <span className="text-gradient-strong">à la hauteur de vos ambitions</span></>}
        description="De la première ligne de code à l'optimisation post-livraison, chaque prestation est conçue pour créer un impact mesurable sur votre activité. Pas de solutions génériques — que du sur mesure."
        primaryCta={{ label: "Démarrer un projet", href: "/contact" }}
        secondaryCta={{ label: "À propos de nous", href: "/a-propos" }}
      />


      {/* Services détaillés */}
      <section className="section-shell">
        <SectionParticles style="dots" count={12} color="rgba(129,140,248,0.1)" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="section-container">
          <SectionHeading
            label="Expertises"
            title="Chaque service, une excellence"
            description="Chaque prestation est pensée pour apporter un impact réel et mesurable. Voici ce que nous faisons — et ce que vous gagnez."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-8"
          >
            {services.map((service, idx) => {
              const glows = ["99,102,241", "34,211,238", "129,140,248", "14,165,233", "147,197,253", "168,85,247"];
              return (
              <motion.div key={service.href} variants={fadeInUp}>
                <Link href={service.href} className="group block">
                  <SpotlightCard glow={glows[idx % glows.length]} tilt={3} pulse className="overflow-hidden">
                    <div className="p-8 sm:p-10 lg:p-12">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        {/* Icon + Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-5 mb-5">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-lg shadow-accent-glow/20 transition-shadow duration-500 group-hover:shadow-accent-glow/40`} style={{ transform: "translateZ(30px)" }}>
                              {service.icon}
                            </div>
                            <div style={{ transform: "translateZ(20px)" }}>
                              <h3 className="text-xl font-semibold tracking-tight group-hover:text-accent-light transition-colors duration-300">{service.title}</h3>
                              <span className="text-xs text-accent-light/60 font-mono">{service.result}</span>
                            </div>
                          </div>
                          <p className="text-base text-text-secondary leading-relaxed mb-6 max-w-2xl">{service.description}</p>
                          <span className="text-sm text-text-tertiary group-hover:text-accent-light transition-colors flex items-center gap-2">
                            Découvrir en détail
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          </span>
                        </div>

                        {/* Livrables */}
                        <div className="lg:w-72 flex-shrink-0">
                          <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary block mb-3">Ce qui est inclus</span>
                          <div className="space-y-2">
                            {service.includes.map((item) => (
                              <div key={item} className="flex items-center gap-2.5">
                                <div className="w-4 h-4 rounded-full bg-accent-glow/50 border border-accent-primary/15 flex items-center justify-center flex-shrink-0">
                                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-light"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <span className="text-sm text-text-secondary">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Méthode de livraison"
            title="Un service premium, mais surtout une exécution contrôlée."
            description="Chaque expertise suit le même niveau d'exigence : précision stratégique, design haut de gamme, code propre et amélioration continue."
            steps={serviceFlow}
            accent="129, 140, 248"
          />
        </div>
      </section>


      {/* Notre approche */}
      <section className="section-shell">
        <SectionParticles style="hexagons" count={8} color="rgba(129,140,248,0.06)" />
        <div className="section-container">
          <SectionHeading
            label="Approche"
            title="Ce qui nous différencie"
            description="Nous ne sommes pas une agence de plus. Nous sommes un studio digital qui met l'intelligence — humaine et artificielle — au centre de chaque projet."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {approach.map((item, i) => (
              <motion.div key={item.title} variants={fadeInUp} className="relative pl-8 group">
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-border-medium to-transparent" />
                <div className="absolute left-[-1.5px] top-0 w-[4px] h-12 rounded-full bg-gradient-to-b from-accent-primary to-cyan opacity-50 blur-[2px] transition-all duration-500 group-hover:h-20 group-hover:opacity-100" />
                <span className="text-xs text-accent-light/40 font-mono font-bold block mb-2">0{i + 1}</span>
                <h3 className="text-lg font-semibold mb-3 tracking-tight group-hover:text-accent-light transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABand
        title={<>Le bon partenaire fait <span className="text-gradient-strong">toute la différence</span></>}
        description="Discutons de vos objectifs. Nous vous proposons une solution sur mesure, adaptée à votre budget et à vos ambitions."
      />
    </>
  );
}
