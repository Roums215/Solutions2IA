"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { CTABand } from "@/components/shared/CTABand";
import { SectionParticles } from "@/components/shared/SectionParticles";
import dynamic from "next/dynamic";
import { AutomationPipeline } from "@/components/sections/automation/AutomationPipeline";

// Scène hero lazy : chunk jamais téléchargé sur mobile/minimal.
const AutomationScene = dynamic(
  () => import("@/components/scenes/automation/AutomationScene").then((m) => m.AutomationScene),
  { ssr: false, loading: () => <div aria-hidden className="h-[540px] sm:h-[600px] lg:h-[640px]" /> },
);
import { SectorGrid } from "@/components/sections/automation/SectorGrid";
import { IntegrationsConnect } from "@/components/sections/automation/IntegrationsConnect";
import { ChorusProSection } from "@/components/sections/automation/ChorusProSection";
import { RelatedServices } from "@/components/shared/RelatedServices";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

/* 1 cas vécu (mon flux réel) + 3 scénarios types présentés comme tels —
 * outils et approches différents à chaque fois (règle : zéro vécu inventé). */
const useCases = [
  {
    badge: "Mon flux (il tourne en ce moment)",
    title: "Appels de prospection → fiches clients",
    description: "Chaque appel marqué « intéressé » crée tout seul la fiche contact, l'entreprise et l'opportunité dans mon fichier clients. Zéro ressaisie, zéro contact perdu. C'est le flux que je montre plus haut.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    badge: "Ce que je peux installer",
    title: "Devis accepté → facture et relances",
    description: "Le devis signé crée la facture, l'envoie, puis relance poliment tout seul aux bonnes dates. Vous ne courez plus après les paiements, vous suivez juste un tableau.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </svg>
    ),
  },
  {
    badge: "Ce que je peux installer",
    title: "Demande sur le site → rendez-vous posé",
    description: "Un client remplit le formulaire : le créneau se cale dans votre agenda, il reçoit la confirmation et le rappel. Plus d'allers-retours de mails pour fixer une date.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
      </svg>
    ),
  },
  {
    badge: "Ce que je peux installer",
    title: "Boîte mail → triée et préparée",
    description: "Les mails entrants sont rangés par urgence, les questions courantes reçoivent une réponse préparée que vous validez. Votre matinée ne commence plus par une heure de tri.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan" aria-hidden="true">
        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
        <path d="M3 7l9 6 9-6" />
        <path d="M3 7l9-4 9 4" />
      </svg>
    ),
  },
];

export function AutomatisationPage() {
  return (
    <>
      <PageAtmosphere preset="automation" />
      <PageHero
        label="Automatisation"
        title={<>Ce qui se répète peut se faire <span className="text-gradient-strong">tout seul</span></>}
        description="Ressaisies, relances, transferts d'un outil à l'autre : je relie vos logiciels entre eux pour que ces tâches se fassent sans vous. Je le fais déjà pour ma propre prospection, je vous montre le flux plus bas."
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Voir tous les services", href: "/services" }}
        visual={<AutomationScene />}
        glowColor="bg-cyan/5"
        mobileSteps={[
          { label: "Déclencheur", hint: "un événement arrive" },
          { label: "Traitement", hint: "tri, vérification, règles" },
          { label: "Résultat", hint: "fiche créée · alerte envoyée" },
        ]}
      />

      {/* Mécanique signature : mon flux réel JobPhoning → n8n → Axonaut */}
      <AutomationPipeline
        intro="Mon propre flux de prospection (il tourne en ce moment). Un appel qualifié chez l'un, et la fiche complète apparaît dans le fichier clients avant la fin de la conversation."
      />

      {/* Pipelines par métier — grille de cartes (aperçu statique) */}
      <SectorGrid />

      {/* Cas d'usage */}
      <section className="section-shell">
        <SectionParticles style="circuit-nodes" count={14} color="rgba(34,211,238,0.15)" secondaryColor="rgba(99,102,241,0.1)" />
        <div className="absolute inset-0 bg-radial-top" />
        <div className="section-container">
          <SectionHeading
            label="Ce que ça change"
            title="Un cas réel, trois exemples parlants"
            description="Le premier flux est le mien, il tourne tous les jours. Les trois autres montrent la même mécanique appliquée à d'autres outils et d'autres situations."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {useCases.map((c, i) => (
              <motion.div key={c.title} variants={fadeInUp}>
                <SpotlightCard glow="34,211,238" tilt={4} pulse className="p-7 sm:p-8 h-full">
                  <div className="flex items-center justify-between gap-3 mb-5" style={{ transform: "translateZ(30px)" }}>
                    <div className="w-10 h-10 rounded-xl bg-cyan-glow border border-cyan/15 flex items-center justify-center">
                      {c.icon}
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        i === 0
                          ? "border-green-400/25 bg-green-400/10 text-green-300"
                          : "border-border-subtle bg-bg-card/60 text-text-tertiary"
                      }`}
                    >
                      {c.badge}
                    </span>
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

      {/* Outils connectés — hub animé + logos de marques + barre défilante */}
      <IntegrationsConnect />

      {/* Échéance Chorus Pro / Factur-X — cible "facture électronique 2026" */}
      <ChorusProSection />

      <RelatedServices current="automatisation" />

      <CTABand
        title={<>Quelle tâche refaites-vous <span className="text-gradient-strong">chaque semaine</span> ?</>}
        description="Dites-la-moi lors d'un premier échange gratuit. Si elle peut se faire toute seule, je vous explique comment, simplement, et avec un prix clair."
        primaryLabel="Premier échange gratuit"
      />
    </>
  );
}
