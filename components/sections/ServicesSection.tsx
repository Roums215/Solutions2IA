"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { staggerContainer, fadeInUp } from "@/lib/animation/variants";

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Sites web premium",
    description:
      "Des sites modernes, rapides et mémorables. Design soigné, animations fluides et performance optimisée pour convertir vos visiteurs en clients.",
    tags: ["Next.js", "Design", "Performance"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: "Applications",
    description:
      "Applications web et mobiles performantes, conçues pour offrir une expérience utilisateur irréprochable et une architecture évolutive.",
    tags: ["React", "Mobile", "API"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="9" cy="16" r="1" fill="currentColor" />
        <circle cx="15" cy="16" r="1" fill="currentColor" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        <path d="M12 2v2M7 4l1 1M17 4l-1 1" />
      </svg>
    ),
    title: "Agents IA",
    description:
      "Des assistants intelligents qui travaillent pour vous. Analyse, prise de décision et exécution automatisée 24h/24.",
    tags: ["LLM", "Autonome", "24/7"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Automatisation",
    description:
      "Éliminez les tâches répétitives. Workflows intelligents, intégrations sur mesure et processus automatisés qui font gagner des heures.",
    tags: ["Workflows", "API", "No-code"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "UI / UX Design",
    description:
      "Interfaces élégantes et expériences pensées pour l'utilisateur. Chaque pixel est intentionnel, chaque interaction est fluide et mémorable.",
    tags: ["Figma", "Prototype", "Tests"],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
      </svg>
    ),
    title: "Expériences visuelles",
    description:
      "Animations avancées, motion design, univers 2D/3D et interfaces immersives qui marquent les esprits et renforcent votre image de marque.",
    tags: ["GSAP", "3D", "Motion"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-28 lg:py-36">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-radial-top" />

      <div className="relative max-w-7xl mx-auto px-6">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
        >
          {services.map((service) => (
            <GlowCard key={service.title}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-glow to-accent-glow-strong border border-accent-primary/20 flex items-center justify-center text-accent-light mb-6">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3 tracking-tight">{service.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-medium text-text-tertiary bg-bg-tertiary/50 border border-border-subtle rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
