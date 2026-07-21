"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const benefits = [
  {
    metric: "73%",
    label: "Gain de temps",
    description:
      "Automatisez vos processus répétitifs et libérez des heures chaque semaine pour ce qui compte vraiment.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    metric: "×3",
    label: "Meilleure conversion",
    description:
      "Un site premium, rapide et bien conçu transforme vos visiteurs en clients. L'image de marque fait la différence.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    metric: "24/7",
    label: "Agents IA actifs",
    description:
      "Vos assistants intelligents travaillent sans interruption. Analyse, réponse, exécution : même quand vous dormez.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="9" cy="16" r="1" fill="currentColor" />
        <circle cx="15" cy="16" r="1" fill="currentColor" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    metric: "100%",
    label: "Sur mesure",
    description:
      "Chaque solution est conçue pour votre activité. Pas de templates. Pas de compromis. Du code et du design pensés pour vous.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export function BenefitsSection() {
  return (
    <section className="relative py-28 lg:py-36 bg-bg-secondary overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px glow-line" />
      <div className="absolute inset-0 bg-radial-top" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Résultats"
          title="La valeur concrète pour votre entreprise"
          description="Au-delà de la technologie, ce qui compte c'est l'impact réel sur votre activité, votre temps et votre croissance."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.label}
              variants={fadeInUp}
              className="relative group"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-cyan-glow border border-cyan/10 flex items-center justify-center mb-5">
                {benefit.icon}
              </div>

              {/* Metric */}
              <span className="text-5xl lg:text-[3.5rem] font-bold text-gradient-strong leading-none">
                {benefit.metric}
              </span>

              {/* Label + description */}
              <h3 className="text-lg font-semibold mt-4 mb-2.5 tracking-tight">
                {benefit.label}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
