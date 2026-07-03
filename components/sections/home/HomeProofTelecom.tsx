"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const milestones = [
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
];

export function HomeProofTelecom() {
  return (
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
          {milestones.map((m) => (
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
  );
}
