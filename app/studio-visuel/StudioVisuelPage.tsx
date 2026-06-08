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
import { StudioScene } from "@/components/scenes/studio/StudioScene";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const disciplines = [
  { title: "Motion design", description: "Animations d'interface, transitions, micro-interactions et séquences narratives. Chaque mouvement renforce votre message et votre crédibilité.", color: "from-accent-primary to-accent-light" },
  { title: "Expériences 2D / 3D", description: "Scènes interactives, visualisations immersives et environnements visuels qui captivent les visiteurs et les transforment en ambassadeurs.", color: "from-cyan to-accent-primary" },
  { title: "Remotion & vidéo", description: "Vidéos générées par code, templates dynamiques et contenu vidéo personnalisé à grande échelle. Automatisation de la production vidéo.", color: "from-accent-light to-cyan" },
  { title: "Interfaces immersives", description: "UI animées, parallax, scroll storytelling et compositions visuelles qui transforment la navigation en véritable expérience.", color: "from-accent-dark to-accent-primary" },
  { title: "Data visualization", description: "Graphiques animés, dashboards visuels et représentations de données élégantes qui rendent le complexe compréhensible.", color: "from-cyan to-green-400" },
  { title: "Identité visuelle digitale", description: "Direction artistique, design system, composants visuels — votre marque prend vie dans chaque pixel de chaque écran.", color: "from-accent-primary to-accent-dark" },
];

const beforeAfter = [
  { before: "Site statique, plat, sans personnalité", after: "Expérience immersive avec animations premium et motion design maîtrisé", metric: "+200% mémorabilité" },
  { before: "Marque digitale faible, perdue dans la masse", after: "Identité visuelle forte et cohérente qui se distingue immédiatement", metric: "+150% reconnaissance" },
  { before: "Vidéos marketing produites à la main, coûteuses", after: "Vidéos générées par code, personnalisées et scalables", metric: "×10 production" },
  { before: "Données complexes présentées dans des tableaux Excel", after: "Visualisations interactives et animées qui parlent d'elles-mêmes", metric: "+300% compréhension" },
];

const gains = [
  { value: "+200%", label: "Mémorabilité", detail: "les visiteurs se souviennent de votre marque" },
  { value: "×3", label: "Temps passé sur site", detail: "les animations captent et retiennent l'attention" },
  { value: "+150%", label: "Perception premium", detail: "le motion design renforce la crédibilité" },
  { value: "60fps", label: "Fluidité garantie", detail: "performances optimisées, aucun lag" },
];

const deliverables = [
  "Direction artistique & moodboard",
  "Storyboard d'animation",
  "Prototypes interactifs Motion/GSAP",
  "Composants animés réutilisables",
  "Design system avec motion guidelines",
  "Intégration Rive / Lottie si pertinent",
  "Vidéos Remotion & templates",
  "Optimisation GPU & bundle",
  "Documentation des animations",
];

const showcaseItems = [
  { title: "Scroll storytelling", description: "Des pages qui racontent une histoire au fil du scroll. Animations séquencées, parallax, reveal progressif — chaque défilement est un moment de découverte.", tech: "GSAP + ScrollTrigger" },
  { title: "Particules interactives", description: "Systèmes de particules réactifs au curseur et au scroll. Champs de forces, attracteurs, physique fluide — un univers vivant.", tech: "Canvas / WebGL" },
  { title: "UI animée premium", description: "Micro-interactions, transitions de page, états de hover et focus — chaque interaction est un moment de plaisir qui renforce votre image.", tech: "Motion + CSS" },
  { title: "Vidéo programmatique", description: "Génération de vidéos personnalisées à la volée. Templates dynamiques, données en temps réel, export automatique à grande échelle.", tech: "Remotion" },
];

const motionFlow = [
  {
    meta: "Intention",
    title: "Définir le rôle du mouvement",
    description: "Chaque animation doit guider, expliquer, rassurer ou révéler. Rien n'est décoratif par défaut.",
  },
  {
    meta: "Timing",
    title: "Calibrer le rythme",
    description: "Easing, durée, stagger et inertie sont ajustés pour donner une sensation premium sans brusquer le scroll.",
  },
  {
    meta: "Profondeur",
    title: "Composer les plans visuels",
    description: "Parallax, halos, micro-3D et layers donnent du relief tout en gardant le contenu lisible.",
  },
  {
    meta: "Performance",
    title: "Rester fluide partout",
    description: "Transform, opacity, GPU, reduced motion et tests responsive garantissent une expérience propre sur mobile et desktop.",
  },
];

export function StudioVisuelPage() {
  return (
    <>
      <PageAtmosphere preset="studio" />
      <FluidMouseField preset="studio" />
      <PageHero
        label="Studio visuel"
        title={<>Des expériences qui <span className="text-gradient-strong">repoussent les limites</span></>}
        description="Motion design, 2D/3D, Remotion, animations avancées et interfaces immersives. Nous créons des univers visuels premium qui marquent les esprits, renforcent votre crédibilité et élèvent votre marque."
        primaryCta={{ label: "Créer une expérience", href: "/contact" }}
        secondaryCta={{ label: "Voir tous les services", href: "/services" }}
        visual={<StudioScene />}
        mobileSteps={[
          { label: "Brief", hint: "cadrage créatif · références" },
          { label: "Création", hint: "concepts validés · itérations" },
          { label: "Livraison", hint: "assets finaux · formats prêts" },
        ]}
      />

      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Motion system"
            title="Le premium se joue dans le rythme, la profondeur et la retenue."
            description="Nous traitons le motion design comme un système : chaque effet a une intention, une durée, une trajectoire et une limite de performance."
            steps={motionFlow}
            accent="168, 85, 247"
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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-3 block">Impact visuel</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ce que le motion design change réellement</h2>
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
        <SectionParticles style="crosses" count={14} color="rgba(129,140,248,0.06)" secondaryColor="rgba(34,211,238,0.04)" />
        <div className="section-container">
          <SectionHeading label="Transformation" title="Avant / Après" description="La différence entre un digital ordinaire et une expérience visuelle Solutions 2IA." />
          <div className="space-y-6 lg:space-y-8">
            {beforeAfter.map((item, i) => (
              <TransformationCard
                key={item.metric}
                variant="studio"
                before={item.before}
                after={item.after}
                metric={item.metric}
                afterLabel="Studio Solutions 2IA"
                index={i}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Disciplines */}
      <section className="section-shell">
        <SectionParticles style="hexagons" count={10} color="rgba(129,140,248,0.05)" />
        <div className="section-container">
          <SectionHeading label="Disciplines" title="L'art et la technique, réunis" description="Chaque projet visuel est l'alliance d'une vision créative forte et d'une exécution technique irréprochable." />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {disciplines.map((d, i) => {
              const glows = ["168,85,247", "34,211,238", "251,146,60"];
              return (
                <motion.div key={d.title} variants={fadeInUp}>
                  <SpotlightCard glow={glows[i % glows.length]} tilt={5} pulse className="p-7 sm:p-8 h-full">
                    <div className={`w-full h-1 rounded-full bg-gradient-to-r ${d.color} mb-6 opacity-60`} style={{ transform: "translateZ(25px)" }} />
                    <h3 className="text-lg font-semibold mb-3 tracking-tight" style={{ transform: "translateZ(20px)" }}>{d.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed" style={{ transform: "translateZ(10px)" }}>{d.description}</p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* Showcase + Livrables */}
      <section className="section-shell">
        <SectionParticles style="dots" count={8} color="rgba(129,140,248,0.06)" />
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Démonstrations</span>
              <h2 className="text-3xl font-bold tracking-tight leading-[1.1] mb-8">Ce que nous <span className="text-gradient-strong">savons créer</span></h2>
              <div className="space-y-5">
                {showcaseItems.map((item, i) => (
                  <div key={item.title} className="rounded-xl border border-border-subtle bg-bg-card/60 p-6 card-shine transition-all duration-300 hover:border-border-accent">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-xs text-accent-light/40 font-mono font-bold block mb-1">0{i + 1}</span>
                        <h4 className="text-base font-semibold">{item.title}</h4>
                      </div>
                      <span className="px-2.5 py-1 text-[9px] font-mono text-accent-light bg-accent-glow/50 border border-accent-primary/10 rounded-lg flex-shrink-0">{item.tech}</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Livrables</span>
              <h2 className="text-3xl font-bold tracking-tight leading-[1.1] mb-8">Ce que vous obtenez <span className="text-gradient-strong">concrètement</span></h2>
              <div className="space-y-4 mb-12">
                {deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-glow/50 border border-accent-primary/15 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-light"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-sm text-text-secondary">{d}</span>
                  </div>
                ))}
              </div>

              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Technologies</span>
              <div className="flex flex-wrap gap-2.5">
                {["GSAP", "Motion", "Rive", "Remotion", "Three.js", "Lottie", "SVG", "CSS 3D", "Canvas", "WebGL"].map((t) => (
                  <span key={t} className="px-4 py-2 text-xs font-medium text-text-secondary bg-bg-card/60 border border-border-subtle rounded-xl">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTABand title={<>Créons ensemble quelque chose d&apos;<span className="text-gradient-strong">extraordinaire</span></>} description="Vos ambitions visuelles méritent une exécution à la hauteur. Premier échange gratuit." />
    </>
  );
}
