"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

type Value = {
  title: string;
  description: string;
  link?: { label: string; href: string };
};

// Fourchettes de prix : mêmes valeurs que la grille visible de /services.
const values: Value[] = [
  {
    title: "Vous me parlez à moi, directement",
    description:
      "Pas de commercial, pas de chef de projet, pas d'intermédiaire. La personne qui comprend votre besoin est celle qui construit. Rien ne se perd en route.",
  },
  {
    title: "Je parle votre langue, pas la mienne",
    description:
      "Le code et l'IA, c'est mon métier, pas le vôtre. Je vous explique tout avec des mots simples. Vous comprenez toujours ce que vous payez et pourquoi.",
  },
  {
    title: "Un prix clair, dès le départ",
    description:
      "Vous savez ce que ça coûte avant de démarrer. Pas de facture surprise, pas de coûts cachés. Et comme je démarre, mes tarifs sont ceux d'un début d'activité : un site dès 500 €, une application à partir de 1 500 €.",
    link: { label: "Voir les fourchettes de prix", href: "/services" },
  },
  {
    title: "Je suis disponible et réactif",
    description:
      "Réponse sous 24 h, et je reste joignable après la mise en ligne. Quand vous avez une question, vous n'attendez pas une semaine.",
  },
  {
    title: "Je construis pour durer",
    description:
      "Du code propre, votre site et vos données restent à vous, hébergés en Europe. Vous n'êtes prisonnier de personne, surtout pas de moi.",
  },
  {
    title: "Je dis la vérité, même quand ça ne m'arrange pas",
    description:
      "Si un projet n'a pas besoin de moi, je vous le dis. Si une solution plus simple existe, je vous l'indique. La confiance vaut plus qu'une vente.",
  },
];

const beliefs = [
  {
    title: "Ce en quoi je crois",
    tone: "yes" as const,
    items: [
      "Un outil doit vous faire gagner du temps, pas en prendre",
      "On doit comprendre ce qu'on achète, sans être technicien",
      "L'IA est là pour vous aider, pas pour vous remplacer",
      "Vos données vous appartiennent, point",
    ],
  },
  {
    title: "Ce que je refuse de faire",
    tone: "no" as const,
    items: [
      "Vous noyer sous le jargon pour avoir l'air savant",
      "Vous vendre quelque chose dont vous n'avez pas besoin",
      "Promettre des délais que je ne peux pas tenir",
      "Cacher les prix ou les conditions",
    ],
  },
];

// Repères vérifiables : les mêmes faits que le récit, pour le lecteur pressé.
const landmarks = [
  { label: "Formation", value: "Ingénierie du web" },
  { label: "Projets", value: "DFT (Digital Factory Telecom), Ramsay Santé" },
  { label: "Zone", value: "France, Belgique, Suisse, Luxembourg" },
];

const qualityFlow = [
  {
    meta: "Je comprends",
    title: "D'abord votre besoin réel",
    description: "Je commence par comprendre comment vous travaillez et où le temps se perd, avant de proposer la moindre solution.",
  },
  {
    meta: "Je construis",
    title: "Proprement, pour durer",
    description: "Code soigné, lisible sur mobile, rapide et sécurisé. Votre outil tient la route et reste facile à faire évoluer.",
  },
  {
    meta: "Je vérifie",
    title: "Que ça marche vraiment",
    description: "Je teste sur ordinateur et téléphone avant la mise en ligne. Pas de mauvaise surprise le jour J.",
  },
  {
    meta: "Je reste",
    title: "Disponible après la livraison",
    description: "Une fois en ligne, je reste joignable pour ajuster et faire évoluer l'outil au fil de vos besoins.",
  },
];

export function AProposPage() {
  return (
    <>
      <PageAtmosphere preset="about" />
      <PageHero
        label="Qui je suis"
        title={<>Moi, c&apos;est <span className="text-gradient-strong">Iulian</span></>}
        description="Je suis développeur indépendant. Je conçois et je code moi-même des sites web, des applications et des automatisations sur mesure. Mon but : remplacer ce qui vous prend du temps par un outil simple qui le fait à votre place."
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Voir ce que je fais", href: "/services" }}
      />

      {/* 1. C'est quoi : mon parcours + repères vérifiables */}
      <section className="section-shell">
        <div className="section-container-narrow">
          <SectionHeading
            label="Mon parcours"
            title={<>D&apos;où je viens, et <span className="text-gradient-strong">pourquoi je fais ça</span></>}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl space-y-7 text-lg leading-[1.85] text-text-secondary"
          >
            <motion.p variants={fadeInUp}>
              Je m&apos;appelle <span className="font-medium text-text-primary">Iulian Ionita</span>. J&apos;ai été
              formé en ingénierie du web, puis j&apos;ai travaillé sur des projets pour des entreprises
              comme <span className="text-text-primary">DFT (Digital Factory Telecom)</span> et
              <span className="text-text-primary"> Ramsay Santé</span>, des télécoms à la santé.
            </motion.p>
            <motion.p variants={fadeInUp}>
              C&apos;est là que j&apos;ai vu la même chose partout : des équipes qui perdent un temps fou
              sur des tâches répétitives, des fichiers Excel dans tous les sens, du papier, des outils qui
              ne se parlent pas. Et à chaque fois, un outil bien pensé changeait tout.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Aujourd&apos;hui, je me lance à mon compte pour faire ça directement pour vous.
            </motion.p>
            <motion.p variants={fadeInUp}>
              <span className="font-medium text-text-primary">Démarrer, c&apos;est ma force :</span> je suis
              disponible, proche, je prends le temps, et mes prix sont accessibles. Vous n&apos;êtes pas un
              dossier parmi cent. Vous parlez à la personne qui construit.
            </motion.p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            aria-label="Repères vérifiables"
            className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {landmarks.map((l) => (
              <motion.li key={l.label} variants={fadeInUp} className="metric-tile px-5 py-5 text-center">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">
                  {l.label}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-text-primary">{l.value}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* 2. Ce que ça vous apporte : mes engagements */}
      <section className="section-shell">
        <SectionParticles style="hexagons" count={8} color="rgba(129,140,248,0.05)" />
        <div className="section-container">
          <SectionHeading
            label="Mes engagements"
            title="Ce sur quoi vous pouvez compter"
            description="Ce ne sont pas des slogans. C'est la façon dont je travaille, et ce que vous êtes en droit d'attendre de moi."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-x-14 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
          >
            {values.map((v, i) => (
              <motion.div key={v.title} variants={fadeInUp} className="group relative pl-8">
                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-border-medium to-transparent" />
                <div className="absolute left-[-1.5px] top-0 h-20 w-[4px] origin-top scale-y-[0.6] rounded-full bg-gradient-to-b from-accent-primary to-cyan opacity-50 blur-[2px] transition-[scale,opacity] duration-500 group-hover:scale-y-100 group-hover:opacity-100" />
                <span className="mb-3 block font-mono text-xs font-bold text-accent-light/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent-light">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">{v.description}</p>
                {v.link && (
                  <Link
                    href={v.link.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-light transition-colors duration-300 hover:text-text-primary"
                  >
                    {v.link.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Comment ça marche : ma façon de travailler + volet technique (le panel rend le h2) */}
      <section className="section-shell">
        <div className="section-container">
          <PremiumFlowPanel
            label="Ma façon de travailler"
            title="Quatre règles que je m'impose, quel que soit le projet"
            description="Comprendre, construire, vérifier, rester. Ces règles ne changent pas avec la taille du projet : c'est ce qui rend la qualité prévisible, et votre vision toujours claire."
            steps={qualityFlow}
            accent="99, 102, 241"
          />

          <details className="group mx-auto mt-10 max-w-4xl rounded-2xl border border-border-subtle bg-bg-card/60 transition-colors duration-300 open:border-border-accent">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
              <span className="text-base font-semibold text-text-primary">
                Pour ceux qui veulent vérifier : comment je travaille techniquement
              </span>
              <svg
                aria-hidden
                className="h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="space-y-3 border-t border-border-subtle/60 px-6 py-5 text-sm leading-[1.8] text-text-secondary">
              <p>
                <strong className="text-text-primary">Avancement :</strong> un point où vous voyez le projet
                fonctionner, au plus tard toutes les deux semaines. Vous ajustez avant que ce soit figé.
              </p>
              <p>
                <strong className="text-text-primary">Propriété :</strong> le code est déposé sur un espace à
                votre nom (dépôt Git), avec ce qu&apos;il faut pour qu&apos;un autre développeur le reprenne sans moi.
              </p>
              <p>
                <strong className="text-text-primary">Vérification :</strong> tests sur ordinateur et téléphone
                avant chaque mise en ligne, vitesse de chargement mesurée.
              </p>
              <p>
                <strong className="text-text-primary">Outils :</strong> des technologies répandues et durables
                (Next.js, React, TypeScript, base de données PostgreSQL) ; un orchestrateur d&apos;automatisations
                (n8n) ; des modèles d&apos;IA éprouvés (Claude, Mistral), avec vos données hébergées en Europe.
              </p>
              <p className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                <Link
                  href="/applications#methode"
                  className="font-medium text-accent-light transition-colors duration-300 hover:text-text-primary"
                >
                  Le déroulé complet d&apos;un projet d&apos;application
                </Link>
                <Link
                  href="/faq"
                  className="font-medium text-accent-light transition-colors duration-300 hover:text-text-primary"
                >
                  Les réponses détaillées sont dans la FAQ
                </Link>
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* 4. Pour qui : convictions et refus */}
      <section className="section-shell">
        <SectionParticles style="crosses" count={10} color="rgba(129,140,248,0.06)" />
        <div className="section-container">
          <SectionHeading
            label="Pour qui"
            title="Si ces phrases vous parlent, on travaillera bien ensemble"
            description="Je ne conviens pas à tout le monde, et c'est normal. Voici ce que je crois, et ce que je ne ferai pas, pour que vous sachiez à qui vous confiez votre projet."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
          >
            {beliefs.map((block) => (
              <motion.div
                key={block.title}
                variants={fadeInUp}
                className="rounded-2xl border border-border-subtle bg-bg-card/60 p-8 sm:p-10"
              >
                <h3 className="mb-7 text-xl font-semibold tracking-tight">{block.title}</h3>
                <ul className="space-y-5">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-accent-primary/15 bg-accent-glow/50">
                        {block.tone === "yes" ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-light" aria-hidden>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-danger/70" aria-hidden>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        )}
                      </span>
                      <span className="text-sm leading-relaxed text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. L'étape suivante : un seul CTA */}
      <CTABand
        title={<>On fait <span className="text-gradient-strong">connaissance</span> ?</>}
        description="Le meilleur moyen de voir si on peut travailler ensemble, c'est d'en parler. Et comme je démarre, mes tarifs sont ceux d'un début d'activité : ils n'y resteront pas."
        primaryLabel="Premier échange gratuit"
        secondary={null}
      />
    </>
  );
}
