"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { HeroSection } from "@/components/hero/HeroSection";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { TransformationCard } from "@/components/shared/TransformationCard";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const services = [
  { title: "Sites web premium", href: "/sites-web", description: "Sites vitrines, landing pages et plateformes web orientés conversion, performance et image de marque.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>, gradient: "from-accent-primary to-accent-light", glow: "99,102,241" },
  { title: "Applications", href: "/applications", description: "Apps web et mobiles performantes. Dashboards, SaaS, plateformes métier avec une UX premium.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>, gradient: "from-accent-light to-cyan", glow: "34,211,238" },
  { title: "Agents IA", href: "/agents-ia", description: "Assistants intelligents autonomes qui analysent, décident et exécutent — 24h/24.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="9" cy="16" r="1" fill="currentColor" /><circle cx="15" cy="16" r="1" fill="currentColor" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>, gradient: "from-cyan to-accent-primary", glow: "129,140,248" },
  { title: "Automatisation", href: "/automatisation", description: "Workflows intelligents et intégrations API qui éliminent les tâches répétitives.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" /><circle cx="12" cy="12" r="3" /></svg>, gradient: "from-accent-dark to-cyan", glow: "14,165,233" },
  { title: "Studio visuel", href: "/studio-visuel", description: "Motion design, 2D/3D, Remotion et interfaces immersives haut de gamme.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg>, gradient: "from-accent-primary to-accent-dark", glow: "168,85,247" },
];

const transformations = [
  { before: "Site vieillissant, lent, peu crédible", after: "Vitrine premium, rapide, qui convertit", metric: "×3 conversion" },
  { before: "Tâches manuelles répétitives chaque jour", after: "Workflows automatisés qui tournent seuls", metric: "73% temps gagné" },
  { before: "Aucune présence IA dans l'entreprise", after: "Agents intelligents qui travaillent 24/7", metric: "24/7 actif" },
  { before: "Image de marque digitale faible", after: "Expérience premium mémorable et cohérente", metric: "+89% perception" },
];

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

const forWho = [
  { title: "Entrepreneurs", description: "Vous lancez votre activité et voulez une image de marque forte dès le premier jour. Nous créons les fondations digitales de votre réussite." },
  { title: "PME en croissance", description: "Votre entreprise grandit et vos outils ne suivent plus. Nous automatisons, optimisons et modernisons pour supporter votre ambition." },
  { title: "Startups tech", description: "Vous avez un produit à lancer et besoin d'un MVP solide, d'un design premium et d'une architecture qui tient la charge." },
  { title: "Entreprises établies", description: "Votre présence digitale ne reflète plus votre niveau d'excellence. Nous créons l'expérience que vos clients méritent." },
];

export default function Home() {
  return (
    <>
      <PageAtmosphere preset="home" />
      <FluidMouseField intensity={1} />
      <HeroSection />

      {/* Services overview */}
      <section className="section-shell">
        <SectionParticles style="dots" count={14} color="rgba(129,140,248,0.1)" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="section-container">
          <SectionHeading
            label="Services"
            title="Des solutions digitales complètes"
            description="De la conception au déploiement, nous maîtrisons chaque étape pour créer des produits digitaux qui font la différence."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {services.map((s) => (
              <motion.div key={s.href} variants={fadeInUp}>
                <Link href={s.href} className="group block h-full">
                  <SpotlightCard glow={s.glow} tilt={5} pulse className="p-8">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white mb-6 shadow-lg shadow-accent-glow/20 transition-shadow duration-500 group-hover:shadow-accent-glow/50`} style={{ transform: "translateZ(40px)" }}>
                      {s.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 tracking-tight group-hover:text-accent-light transition-colors duration-300" style={{ transform: "translateZ(25px)" }}>{s.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-5" style={{ transform: "translateZ(15px)" }}>{s.description}</p>
                    <span className="text-xs text-text-tertiary group-hover:text-accent-light transition-colors flex items-center gap-1.5" style={{ transform: "translateZ(20px)" }}>
                      En savoir plus
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </span>
                  </SpotlightCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button variant="secondary" size="md" href="/services">Voir tous nos services</Button>
          </motion.div>
        </div>
      </section>

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

      {/* Transformation avant/après */}
      <section className="section-shell">
        <SectionParticles style="sparks" count={10} color="rgba(129,140,248,0.15)" secondaryColor="rgba(34,211,238,0.1)" />
        <div className="section-container">
          <SectionHeading
            label="Transformation"
            title="Ce qui change concrètement"
            description="La vraie valeur d'une transformation digitale ne se mesure pas en lignes de code, mais en impact sur votre activité."
          />
          <div className="space-y-6 lg:space-y-8">
            {transformations.map((t, i) => (
              <TransformationCard
                key={t.metric}
                variant="general"
                before={t.before}
                after={t.after}
                metric={t.metric}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="section-shell">
        <SectionParticles style="hexagons" count={8} color="rgba(129,140,248,0.06)" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="section-container">
          <SectionHeading
            label="Pour qui"
            title="Des solutions pour chaque ambition"
            description="Quel que soit votre stade de développement, nous adaptons notre approche à votre réalité."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-7"
          >
            {forWho.map((item, i) => (
              <motion.div key={item.title} variants={fadeInUp} className="relative pl-8 group">
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-border-medium to-transparent" />
                <div className="absolute left-[-1.5px] top-0 w-[4px] h-12 rounded-full bg-gradient-to-b from-accent-primary to-cyan opacity-50 blur-[2px] transition-all duration-500 group-hover:h-20 group-hover:opacity-100" />
                <span className="text-xs text-accent-light/40 font-mono font-bold block mb-2">0{i + 1}</span>
                <h3 className="text-xl font-semibold mb-3 tracking-tight group-hover:text-accent-light transition-colors duration-300">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
