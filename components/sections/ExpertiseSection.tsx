"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const differentiators = [
  {
    title: "Vision moderne",
    description:
      "Nous ne construisons pas des sites. Nous concevons des produits digitaux pensés pour l'avenir, avec les technologies les plus actuelles.",
    gradient: "from-accent-primary to-accent-light",
  },
  {
    title: "Design premium",
    description:
      "Chaque interface est conçue avec un souci obsessionnel du détail. Typographie, spacing, animations : rien n'est laissé au hasard.",
    gradient: "from-accent-light to-cyan",
  },
  {
    title: "Maîtrise de l'IA",
    description:
      "L'intelligence artificielle n'est pas un buzzword. Nous créons des agents et des systèmes qui apportent une vraie valeur business.",
    gradient: "from-cyan to-accent-primary",
  },
  {
    title: "Approche résultat",
    description:
      "Chaque décision technique et créative est guidée par un objectif : maximiser l'impact pour votre activité. Performance, conversion, efficacité.",
    gradient: "from-accent-dark to-accent-primary",
  },
  {
    title: "Code d'excellence",
    description:
      "Architecture propre, composants modulaires, performance optimisée. Un code maintenable qui évolue avec votre entreprise.",
    gradient: "from-accent-primary to-accent-dark",
  },
  {
    title: "Expérience sur mesure",
    description:
      "Pas de templates, pas de solutions prêtes-à-porter. Chaque projet est unique et reçoit l'attention artisanale qu'il mérite.",
    gradient: "from-cyan to-accent-light",
  },
];

export function ExpertiseSection() {
  return (
    <section id="expertise" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-radial-bottom" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Expertise"
          title="Pourquoi Solutions 2IA"
          description="Nous combinons créativité, maîtrise technique et intelligence artificielle pour créer des solutions digitales d'exception."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14"
        >
          {differentiators.map((item, i) => (
            <motion.div key={item.title} variants={fadeInUp} className="relative pl-7 group">
              {/* Accent line */}
              <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-border-medium to-transparent" />
              <div className={`absolute left-[-1.5px] top-0 w-[4px] h-10 rounded-full bg-gradient-to-b ${item.gradient} opacity-60 blur-[2px] transition-all duration-500 group-hover:h-16 group-hover:opacity-100`} />
              <div className={`absolute left-0 top-0 w-px h-10 bg-gradient-to-b ${item.gradient} opacity-80 transition-all duration-500 group-hover:h-16`} />

              <span className="text-xs text-accent-light/60 font-mono font-semibold mb-3 block tracking-wider">
                0{i + 1}
              </span>
              <h3 className="text-lg font-semibold mb-3 tracking-tight group-hover:text-accent-light transition-colors duration-300">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
