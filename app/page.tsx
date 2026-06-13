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
    meta: "On se parle",
    title: "Vous m'expliquez votre quotidien",
    description: "Premier échange gratuit. Je cherche ce qui vous prend du temps pour rien — pas ce que je pourrais vous vendre.",
  },
  {
    meta: "Je propose",
    title: "Une solution simple, chiffrée",
    description: "Vous recevez une proposition claire : ce que je construis, ce que ça change pour vous, le prix et le délai.",
  },
  {
    meta: "Je construis",
    title: "Vous voyez avancer le projet",
    description: "Je code moi-même, vous suivez l'avancement. Pas d'intermédiaire : la personne qui a compris le besoin est celle qui construit.",
  },
  {
    meta: "Ça tourne",
    title: "L'outil travaille, je reste là",
    description: "Mise en ligne, prise en main avec vous, et je reste disponible pour ajuster ce qui doit l'être.",
  },
];

export default function Home() {
  return (
    <>
      <PageAtmosphere preset="home" />
      <FluidMouseField intensity={1} />

      {/* ── C'est quoi : la promesse ───────────────────────────────────── */}
      <HeroSection />

      {/* ── C'est quoi : les domaines (constellation 5 services) ──────── */}
      <HomeServicesConstellation />

      {/* ── Ce que ça vous apporte : transformations concrètes ────────── */}
      <HomeTransformationFlows />

      {/* ── Preuve : un projet réel raconté simplement ────────────────── */}
      <section className="section-shell">
        <SectionParticles style="crosses" count={10} color="rgba(129,140,248,0.08)" />
        <div className="section-container">
          <SectionHeading
            label="Un exemple concret"
            title={<>Des rapports papier à la <span className="text-gradient-strong">plateforme web</span></>}
            description="Un projet que j'ai construit et qui sert tous les jours, dans les télécoms."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5"
          >
            {[
              {
                step: "Avant",
                title: "Des rapports papier",
                desc: "Les techniciens remplissaient leurs rapports d'intervention à la main. Retour au bureau, ressaisie, documents égarés, clients qui attendent.",
              },
              {
                step: "Ce que j'ai construit",
                title: "Une plateforme web simple",
                desc: "Chaque technicien remplit son rapport en ligne, depuis le terrain. Un tableau de bord pour les techniciens, un autre pour les responsables.",
              },
              {
                step: "Aujourd'hui",
                title: "Le rapport part tout seul",
                desc: "Le client reçoit son rapport par mail automatiquement. Les responsables voient toute l'activité d'un coup d'œil. Plus de papier, plus de ressaisie.",
              },
            ].map((m) => (
              <motion.div
                key={m.step}
                variants={fadeInUp}
                className="rounded-xl border border-border-subtle bg-bg-card/60 p-6 card-shine transition-all duration-300 hover:border-border-accent"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">{m.step}</span>
                <h3 className="mt-3 text-base font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-8 max-w-2xl text-center text-sm text-text-tertiary"
          >
            Projet réalisé en entreprise, dans le secteur des télécoms. Utilisé au quotidien.
          </motion.p>
        </div>
      </section>

      {/* ── Comment ça marche : la méthode ─────────────────────────────── */}
      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Comment je travaille"
            title="Quatre étapes, sans jargon, sans surprise."
            description="Du premier échange à l'outil qui tourne : vous savez toujours où en est le projet et ce que vous payez."
            steps={deliveryFlow}
            accent="99, 102, 241"
          />
        </div>
      </section>

      {/* ── Ce qui guide le travail ────────────────────────────────────── */}
      <section className="section-shell">
        <SectionParticles style="grid-dots" count={20} color="rgba(129,140,248,0.05)" />
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4 block">Ma façon de faire</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] mb-6">
                Comprendre d&apos;abord, <span className="text-gradient-strong">construire ensuite</span>
              </h2>
              <p className="text-lg reading-copy mb-8">
                Je ne vends pas une technologie. Je commence par comprendre comment
                vous travaillez, où le temps se perd, puis je construis l&apos;outil
                qui règle ce problème précis. Rien de plus.
              </p>
              <div className="space-y-4">
                {[
                  "Un seul interlocuteur : celui qui comprend le besoin est celui qui construit",
                  "Des mots simples — vous comprenez ce que vous achetez",
                  "Du code propre, qui reste à vous",
                  "Réponse sous 24 h, premier échange gratuit",
                  "Des prix de démarrage honnêtes, annoncés dès le devis",
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
            >
              {/* Double lecture — le volet technique pour ceux qui veulent vérifier */}
              <details className="group rounded-xl border border-border-subtle bg-bg-card/60 transition-colors duration-300 open:border-border-accent">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-base font-semibold text-text-primary">Détails techniques — pour les curieux</span>
                  <svg aria-hidden className="h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div className="border-t border-border-subtle/60 px-6 py-5 text-sm leading-[1.8] text-text-secondary space-y-3">
                  <p>
                    <strong className="text-text-primary">Sites & applications :</strong>{" "}
                    Next.js, React, TypeScript — les technologies des grandes plateformes,
                    à l&apos;échelle de votre projet. Hébergement rapide et sécurisé inclus.
                  </p>
                  <p>
                    <strong className="text-text-primary">Automatisations :</strong>{" "}
                    je relie vos outils existants entre eux (téléphonie, CRM, mails, facturation)
                    via leurs portes de connexion officielles (API), orchestrées avec n8n.
                  </p>
                  <p>
                    <strong className="text-text-primary">IA :</strong>{" "}
                    des modèles éprouvés (Claude, Mistral), branchés sur vos documents quand il le faut,
                    avec vos données hébergées en Europe.
                  </p>
                </div>
              </details>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {["Next.js", "React", "TypeScript", "n8n", "Claude", "Mistral", "PostgreSQL", "Hébergement UE"].map((t) => (
                  <span key={t} className="px-4 py-2 text-[13px] font-medium text-text-secondary bg-bg-card/60 border border-border-subtle rounded-xl cursor-default">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pour qui ───────────────────────────────────────────────────── */}
      <HomeProfileMatrix />

      {/* ── L'étape suivante : un seul CTA ─────────────────────────────── */}
      <CTABand
        title={<>On regarde ensemble ce qui vous <span className="text-gradient-strong">prend du temps</span> ?</>}
        description="Premier échange gratuit, sans engagement. Vous repartez au minimum avec un regard neuf sur votre façon de travailler."
      />
    </>
  );
}
