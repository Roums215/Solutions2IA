"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionParticles } from "@/components/shared/SectionParticles";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

type UniversalNeed = {
  id: string;
  title: string;
  pain: string;
  tags: string[];
  icon: ReactNode;
};

const ICON = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "text-accent-light",
};

const NEEDS: UniversalNeed[] = [
  {
    id: "inbox",
    title: "Tri & réponse emails",
    pain: "Des heures chaque semaine absorbées par la boîte mail : l'assistant trie, range et répond aux messages courants.",
    tags: ["Tous métiers", "Dirigeants", "Support"],
    icon: (
      <svg {...ICON} aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 8l9 6 9-6" />
        <path d="M7 15h3" />
      </svg>
    ),
  },
  {
    id: "voice-rdv",
    title: "Accueil téléphonique + RDV",
    pain: "Une large part des appels d'un cabinet sont des prises de RDV routinières : un temps précieux que l'assistant peut absorber.",
    tags: ["Santé", "Juridique", "Artisans"],
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.94.37 1.86.72 2.74a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.34-1.34a2 2 0 0 1 2.11-.45c.88.35 1.8.59 2.74.72A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "leads",
    title: "Qualification de prospects + prise de contact",
    pain: "Rechercher, écrire l'email personnalisé, enregistrer le suivi : l'assistant s'en charge pour que vous vous concentriez sur la relation.",
    tags: ["Sales B2B", "Agences", "SaaS"],
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M21 12a9 9 0 1 1-9-9" />
        <path d="M21 3l-9 9" />
        <path d="M16 3h5v5" />
      </svg>
    ),
  },
  {
    id: "notes",
    title: "Notes appel → CRM",
    pain: "Trop de temps commercial absorbé par la saisie manuelle après chaque appel : l'assistant transcrit et enregistre tout automatiquement.",
    tags: ["Sales", "Consultants", "Recruteurs"],
    icon: (
      <svg {...ICON} aria-hidden>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    id: "support",
    title: "Support client niveau 1",
    pain: "Les tickets répétitifs (commandes, factures, retours) mobilisent votre équipe sur des réponses identiques : l'assistant les traite en autonomie.",
    tags: ["E-com", "SaaS", "Services"],
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: "rag",
    title: "Recherche dans vos documents",
    pain: "Vos informations sont éparpillées entre Notion, Confluence et SharePoint : l'assistant les interroge en une seule question et cite ses sources.",
    tags: ["Juridique", "Conseil", "Finance", "RH"],
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <circle cx="11" cy="14" r="2.5" />
        <path d="M13 16l2.5 2.5" />
      </svg>
    ),
  },
  {
    id: "devis",
    title: "Génération devis & propositions",
    pain: "Extraire le besoin, rédiger la proposition, vérifier les tarifs : l'assistant gère tout ça en quelques minutes pour que vous validiez avant l'envoi.",
    tags: ["BTP", "Artisans", "Agences", "Freelances"],
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M8 14h8M8 18h6" />
        <path d="M9 11h.01" />
      </svg>
    ),
  },
  {
    id: "reporting",
    title: "Reporting hebdo automatique",
    pain: "Le vendredi après-midi à compiler des chiffres : l'assistant prépare la synthèse et signale les anomalies à votre place.",
    tags: ["Dirigeants", "Marketing", "Ops"],
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </svg>
    ),
  },
];

export function UniversalNeedsGrid() {
  return (
    <section id="besoins" className="section-shell scroll-mt-24">
      <SectionParticles
        style="grid-dots"
        count={16}
        color="rgba(139,92,246,0.06)"
        secondaryColor="rgba(99,102,241,0.05)"
      />
      <div className="section-container relative z-10">
        <SectionHeading
          label="Ce qu'un assistant numérique fait vraiment"
          title={
            <>
              Huit tâches répétitives que{" "}
              <span className="text-gradient-strong">vos équipes vivent au quotidien</span>.
            </>
          }
          description="Pas de jargon. Des gestes concrets qu'un assistant prend en charge, pour que vous vous concentriez sur l'essentiel."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {NEEDS.map((need) => (
            <motion.article key={need.id} variants={fadeInUp} className="h-full">
              <SpotlightCard
                glow="139,92,246"
                tilt={4}
                pulse
                className="flex h-full flex-col p-5 sm:p-6"
              >
                <header className="flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-primary/20 bg-accent-glow"
                    style={{ transform: "translateZ(28px)" }}
                  >
                    {need.icon}
                  </div>
                  <h3
                    className="text-[15px] font-semibold leading-tight tracking-tight text-text-primary"
                    style={{ transform: "translateZ(18px)" }}
                  >
                    {need.title}
                  </h3>
                </header>

                <p
                  className="mt-4 flex-1 text-[13px] leading-relaxed text-text-secondary"
                  style={{ transform: "translateZ(10px)" }}
                >
                  {need.pain}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {need.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-border-subtle bg-bg-card/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-light"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
