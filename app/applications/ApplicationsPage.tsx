"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import dynamic from "next/dynamic";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";

// Scène hero lazy : chunk jamais téléchargé sur mobile/minimal.
const AppScene = dynamic(
  () => import("@/components/scenes/mobile/AppScene").then((m) => m.AppScene),
  { ssr: false, loading: () => <div aria-hidden className="h-[540px] sm:h-[600px] lg:h-[640px]" /> },
);
import { RelatedServices } from "@/components/shared/RelatedServices";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { SectorsCoverage } from "@/components/sections/applications/SectorsCoverage";
import { BuildOrAuditDiptych } from "@/components/sections/applications/BuildOrAuditDiptych";

// Sections massives (~1000 LOC chacune) loin sous la fold : chunks séparés,
// SSR conservé (contenu dans le HTML), hydration différée.
const AppDigitizationPipeline = dynamic(() =>
  import("@/components/sections/applications/AppDigitizationPipeline").then((m) => m.AppDigitizationPipeline),
);
const PerformanceTracking = dynamic(() =>
  import("@/components/sections/applications/PerformanceTracking").then((m) => m.PerformanceTracking),
);

const capabilities = [
  {
    title: "Accessible partout",
    description:
      "Sur ordinateur au bureau comme sur téléphone en déplacement. Vos équipes travaillent depuis le terrain, sans rien réinstaller.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    title: "Mise à jour en direct",
    description:
      "Quand quelqu'un saisit une information, tout le monde la voit aussitôt. Plus de fichiers en double, plus de versions qui se contredisent.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
      </svg>
    ),
  },
  {
    title: "Fonctionne sans réseau",
    description:
      "Sur un chantier ou en sous-sol, l'application continue de marcher. Tout se synchronise dès que la connexion revient.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55" />
        <path d="M12 20h.01" />
      </svg>
    ),
  },
  {
    title: "Vos données protégées",
    description:
      "Chaque personne ne voit que ce qui la concerne. Connexion sécurisée, données hébergées en Europe, sauvegardes automatiques.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Qui grandit avec vous",
    description:
      "On démarre par l'essentiel. Quand votre besoin évolue, on ajoute des fonctions, sans tout refaire à zéro.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Reliée à vos outils",
    description:
      "L'application parle à vos logiciels existants (fichier clients, facturation, agenda). L'information n'est saisie qu'une seule fois.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
        <path d="M9 12h6M9 8h6M9 16h4" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    ),
  },
];

const productFlow = [
  {
    meta: "Vos infos",
    title: "On range votre information clairement",
    description:
      "Qui fait quoi, qui voit quoi, dans quel ordre. Une base nette dès le départ évite les problèmes plus tard.",
  },
  {
    meta: "Vos écrans",
    title: "Des écrans calés sur votre vrai travail",
    description:
      "L'application suit vos gestes : créer, suivre, valider, corriger, décider. Pas un outil de plus à subir.",
  },
  {
    meta: "Vos outils",
    title: "Reliée à ce que vous utilisez déjà",
    description:
      "L'application parle à vos autres logiciels et déclenche les bonnes actions toute seule. L'info reste cohérente partout.",
  },
  {
    meta: "Votre suivi",
    title: "Un tableau de bord qui montre l'essentiel",
    description:
      "Activité, chiffres, alertes : vous voyez d'un coup d'œil ce qui compte, et l'outil s'améliore avec le temps.",
  },
];

const methodFlow = [
  {
    meta: "01 · On observe",
    title: "Je viens voir comment vous travaillez",
    description:
      "Je regarde le terrain, je lis vos fichiers, je parle aux personnes qui s'en serviront. Pas de présentation, du concret.",
  },
  {
    meta: "02 · On cadre",
    title: "Maquette et périmètre validés avant le code",
    description:
      "On se met d'accord sur ce qui compte le plus, vous voyez une maquette cliquable, et le prix est clair avant de démarrer.",
  },
  {
    meta: "03 · Je construis",
    title: "Vous voyez avancer, étape par étape",
    description:
      "Je vous montre l'application qui prend forme régulièrement. Vous ajustez en cours de route, rien n'est figé jusqu'au bout.",
  },
  {
    meta: "04 · Ça tourne",
    title: "Mise en ligne, prise en main, et je reste là",
    description:
      "On déploie en douceur, j'accompagne vos équipes, et je reste disponible pour faire évoluer l'outil.",
  },
];

export function ApplicationsPage() {
  return (
    <>
      <PageAtmosphere preset="apps" />
      <FluidMouseField preset="apps" />

      <PageHero
        label="Applications sur mesure"
        title={
          <>
            Un outil fait pour <span className="text-gradient-strong">votre métier</span>, pas un logiciel de plus à subir.
          </>
        }
        description="Vous jonglez avec des fichiers Excel, du papier, des outils qui ne se parlent pas ? Je construis l'application qui remplace tout ça : une seule, simple, pensée pour votre façon de travailler."
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Comment je travaille", href: "#methode" }}
        visual={<AppScene />}
        mobileSteps={[
          { label: "On range l'info", hint: "fini les fichiers éparpillés" },
          { label: "Des écrans simples", hint: "calés sur votre travail" },
          { label: "Un tableau de bord", hint: "l'essentiel d'un coup d'œil" },
        ]}
      />

      {/* Exemple star — fil rouge : plateforme rapports d'intervention (DFT télécoms) */}
      <section className="section-shell-tight" aria-label="Exemple concret : plateforme de rapports">
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-8 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-green-400/25 bg-green-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-300">
                Un projet réel · utilisé tous les jours
              </span>
              <h2 className="mt-5 text-2xl sm:text-3xl lg:text-[2.4rem] font-bold tracking-tight leading-[1.12]">
                Des rapports papier à une <span className="text-gradient-strong">plateforme web</span>
              </h2>
              <p className="mt-4 text-base text-text-secondary leading-relaxed">
                Une entreprise de télécoms : ses techniciens remplissaient leurs
                rapports d&apos;intervention à la main, sur le terrain. Je leur ai
                construit l&apos;outil qui a tout changé.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
              {[
                {
                  step: "Le problème",
                  title: "Tout sur papier",
                  desc: "Rapports remplis à la main, ressaisis au bureau, parfois perdus. Le client attendait son compte-rendu plusieurs jours.",
                },
                {
                  step: "Ce que j'ai construit",
                  title: "Deux espaces, un seul outil",
                  desc: "Un espace technicien pour remplir le rapport depuis le téléphone, un espace responsable pour tout suivre et visualiser d'un coup d'œil.",
                },
                {
                  step: "Le résultat",
                  title: "Le rapport part tout seul",
                  desc: "Dès qu'un rapport est validé, le client le reçoit par mail. Plus de papier, plus de ressaisie, plus d'attente.",
                },
              ].map((m, i) => (
                <motion.div
                  key={m.step}
                  variants={fadeInUp}
                  className="rounded-xl border border-border-subtle bg-bg-card/60 p-6 card-shine transition-all duration-300 hover:border-border-accent"
                >
                  <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${i === 2 ? "text-green-300" : "text-accent-light"}`}>{m.step}</span>
                  <h3 className="mt-3 text-base font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anatomie d'une app métier — schéma 4 couches (conservé, re-légendé simple) */}
      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Comment c'est fait"
            title="Une bonne application tient sur quatre choses simples."
            description="Vos infos bien rangées, des écrans calés sur votre travail, des liens vers vos autres outils, et un tableau de bord qui montre l'essentiel."
            steps={productFlow}
            accent="14, 165, 233"
          />
        </div>
      </section>

      {/* 6 secteurs */}
      <SectorsCoverage />

      {/* Schéma central — dématerialisation */}
      <AppDigitizationPipeline />

      {/* Sur mesure ou par audit */}
      <BuildOrAuditDiptych />

      {/* Capacités produit */}
      <section className="section-shell">
        <SectionParticles style="grid-dots" count={18} color="rgba(129,140,248,0.04)" />
        <div className="section-container">
          <SectionHeading
            label="Ce que ça vous apporte"
            title={
              <>
                Six choses concrètes que <span className="text-gradient-strong">vous gagnez</span>
              </>
            }
            description="Pas de promesses techniques. Juste ce que vos équipes constatent au quotidien une fois l'outil en place."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {capabilities.map((c) => (
              <motion.div key={c.title} variants={fadeInUp}>
                <SpotlightCard glow="14,165,233" tilt={4} pulse className="p-7 sm:p-8 h-full">
                  <div
                    className="w-10 h-10 rounded-xl bg-accent-glow border border-accent-primary/15 flex items-center justify-center mb-6"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {c.icon}
                  </div>
                  <h3
                    className="text-lg font-semibold mb-3 tracking-tight"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="text-sm text-text-secondary leading-relaxed"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {c.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Performance & suivi */}
      <PerformanceTracking />

      {/* Méthode */}
      <section id="methode" className="section-shell-tight scroll-mt-24">
        <div className="section-container">
          <PremiumFlowPanel
            label="Comment je travaille"
            title="De votre quotidien à l'outil qui tourne, en quatre étapes."
            description="Que vous partiez de zéro ou d'un outil existant à reprendre, je suis la même méthode, adaptée à votre point de départ."
            steps={methodFlow}
            accent="125, 211, 252"
          />
        </div>
      </section>

      <RelatedServices current="applications" />

      <CTABand
        title={
          <>
            Parlez-moi de ce qui vous prend du <span className="text-gradient-strong">temps</span>.
          </>
        }
        description="Premier échange gratuit, sans engagement. Je vous dis franchement si une application peut vous aider. Et si oui, ce que ça implique, simplement."
        primaryLabel="Premier échange gratuit"
      />
    </>
  );
}
