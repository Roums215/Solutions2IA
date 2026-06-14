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
  { title: "Vous me parlez à moi, directement", description: "Pas de commercial, pas de chef de projet, pas d'intermédiaire. La personne qui comprend votre besoin est celle qui construit. Vous gagnez du temps et rien ne se perd en route." },
  { title: "Je parle votre langue, pas la mienne", description: "Le code et l'IA, c'est mon métier, pas le vôtre. Je vous explique tout avec des mots simples. Vous comprenez toujours ce que vous payez et pourquoi." },
  { title: "Un prix clair, dès le départ", description: "Vous savez ce que ça coûte avant de démarrer. Pas de facture surprise, pas de coûts cachés. Et comme je démarre, mes prix sont accessibles." },
  { title: "Je suis disponible et réactif", description: "Réponse sous 24 h, et je reste joignable après la mise en ligne. Quand vous avez une question, vous n'attendez pas une semaine." },
  { title: "Je construis pour durer", description: "Du code propre, votre site et vos données restent à vous, hébergés en Europe. Vous n'êtes prisonnier de personne, surtout pas de moi." },
  { title: "Je dis la vérité, même quand ça m'arrange pas", description: "Si un projet n'a pas besoin de moi, je vous le dis. Si une solution plus simple existe, je vous l'indique. La confiance vaut plus qu'une vente." },
];

const beliefs = [
  { title: "Ce en quoi je crois", items: [
    "Un outil doit vous faire gagner du temps, pas en prendre",
    "On doit comprendre ce qu'on achète, sans être technicien",
    "L'IA est là pour vous aider, pas pour vous remplacer",
    "Vos données vous appartiennent, point",
    "Un prix juste vaut mieux qu'un prix gonflé",
  ]},
  { title: "Ce que je refuse de faire", items: [
    "Vous noyer sous le jargon pour avoir l'air savant",
    "Vous vendre quelque chose dont vous n'avez pas besoin",
    "Promettre des délais que je ne peux pas tenir",
    "Vous rendre dépendant pour vous garder captif",
    "Cacher les prix ou les conditions",
  ]},
];

const process = [
  { number: "01", title: "On se parle", desc: "Vous m'expliquez votre situation avec vos mots. Je pose les questions utiles pour comprendre ce qui vous prend du temps. Premier échange gratuit.", duration: "30 min, offert" },
  { number: "02", title: "Je vous propose", desc: "Vous recevez une proposition claire : ce que je construis, ce que ça change pour vous, le prix et le délai. Vous décidez en toute connaissance de cause.", duration: "quelques jours" },
  { number: "03", title: "Je construis", desc: "Je code moi-même, et je vous montre le projet qui prend forme régulièrement. Vous ajustez en cours de route, rien n'est figé jusqu'au bout.", duration: "selon le projet" },
  { number: "04", title: "On met en ligne", desc: "Mise en ligne en douceur, je prends le temps de vous montrer comment ça marche, et je vérifie que tout tourne bien.", duration: "1 semaine" },
  { number: "05", title: "Je reste là", desc: "Après la livraison, je reste joignable pour ajuster, corriger ou faire évoluer l'outil quand votre besoin change.", duration: "dans la durée" },
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
      <FluidMouseField preset="about" />
      <PageHero
        label="Qui je suis"
        title={<>Moi, c&apos;est <span className="text-gradient-strong">Iulian</span></>}
        description="Je suis développeur indépendant. Je conçois et je code moi-même des sites web, des applications et des automatisations sur mesure. Mon but : remplacer ce qui vous prend du temps par un outil simple qui le fait à votre place."
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Voir ce que je fais", href: "/services" }}
      />

      {/* Mon histoire */}
      <section className="section-shell-tight">
        <div className="section-container-narrow">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <motion.span variants={fadeInUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-5 block text-center">Mon parcours</motion.span>
            <motion.div variants={fadeInUp} className="space-y-5 text-lg text-text-secondary leading-[1.85]">
              <p>
                Je m&apos;appelle <span className="text-text-primary font-medium">Iulian Ionita</span>. J&apos;ai été
                formé en ingénierie du web, puis j&apos;ai travaillé sur des projets pour des
                entreprises comme <span className="text-text-primary">DFT (Digital Factory Telecom)</span> et
                <span className="text-text-primary"> Ramsay Santé</span> — des télécoms à la santé.
              </p>
              <p>
                C&apos;est là que j&apos;ai vu la même chose partout : des équipes qui perdent un temps
                fou sur des tâches répétitives, des fichiers Excel dans tous les sens, du papier, des
                outils qui ne se parlent pas. Et à chaque fois, un outil bien pensé changeait tout.
              </p>
              <p>
                Aujourd&apos;hui, je me lance à mon compte pour faire ça directement pour vous.{" "}
                <span className="text-text-primary font-medium">Démarrer, c&apos;est ma force :</span> je
                suis disponible, proche, je prends le temps, et mes prix sont accessibles. Vous
                n&apos;êtes pas un dossier parmi cent — vous parlez à la personne qui construit.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Comment je travaille — quality flow */}
      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Ma façon de travailler"
            title="Du soin à chaque étape, sans vous compliquer la vie."
            description="Je garde quelques principes simples sur chaque projet, pour que la qualité soit constante et que vous gardiez toujours une vision claire."
            steps={qualityFlow}
            accent="99, 102, 241"
          />
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
          <SectionHeading label="Mes engagements" title="Ce sur quoi vous pouvez compter" description="Ce ne sont pas des slogans. C'est la façon dont je travaille, et ce que vous êtes en droit d'attendre de moi." />
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
          <SectionHeading label="Comment ça se passe" title="De votre premier message à l'outil qui tourne" description="La même méthode simple pour chaque projet, du petit site à l'application. Vous savez toujours où on en est." />
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
        title={<>On fait <span className="text-gradient-strong">connaissance</span> ?</>}
        description="Le meilleur moyen de voir si on peut travailler ensemble, c'est d'en parler. Premier échange gratuit, sans engagement — et vous repartez au minimum avec un regard neuf sur votre situation."
        primaryLabel="Premier échange gratuit"
      />
    </>
  );
}
