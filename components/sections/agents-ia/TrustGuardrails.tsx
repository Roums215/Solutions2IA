"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

type Guardrail = {
  id: string;
  title: string;
  objection: string;
  pitch: string;
  detail: string;
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

const GUARDRAILS: Guardrail[] = [
  {
    id: "rag",
    title: "RAG sur vos data",
    objection: "« Et si ça hallucine ? »",
    pitch: "L'agent ne sait que ce qui est dans vos documents. S'il ne sait pas, il le dit.",
    detail:
      "Indexation Notion · Confluence · SharePoint · Drive. Citations sources affichées. Refus contrôlé sous seuil de confiance.",
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    id: "souverain",
    title: "Hébergement souverain UE",
    objection: "« Mes données partent où ? »",
    pitch: "Tout reste en France ou en Union européenne. Aucun entraînement sur vos données.",
    detail:
      "Mistral · Claude UE · OVH · Scaleway. RGPD natif, contrats DPA, isolation par client. Aucune fuite vers les modèles publics.",
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "human",
    title: "Humain dans la boucle",
    objection: "« Et si l'agent se trompe devant mon client ? »",
    pitch: "Vous gardez la décision finale sur ce qui compte. L'agent prépare, vous validez.",
    detail:
      "Seuil de confiance configurable, hand-off Slack ou e-mail, override audité, modes draft / auto / proactif.",
    icon: (
      <svg {...ICON} aria-hidden>
        <circle cx="9" cy="9" r="3" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M15 19c.3-2 2-3 5-3" />
      </svg>
    ),
  },
  {
    id: "monitoring",
    title: "Monitoring & traçabilité",
    objection: "« C'est une boîte noire. »",
    pitch: "Chaque décision est journalisée et explicable. Vous voyez ce que l'agent fait, en temps réel.",
    detail:
      "Logs structurés, dashboard d'adoption, taux de confiance par décision, prompts versionnés, audit RGPD complet.",
    icon: (
      <svg {...ICON} aria-hidden>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "pilote",
    title: "Pilote 30 j dérisqué",
    objection: "« ROI flou — 95 % des pilots échouent. »",
    pitch: "30 jours satisfait ou remboursé. Vous arrêtez quand vous voulez.",
    detail:
      "Audit + setup + 1 mois d'usage. Métriques d'adoption garanties par écrit. Sortie sans frais, données rendues.",
    icon: (
      <svg {...ICON} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

export function TrustGuardrails() {
  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Garde-fous"
          title={
            <>
              Un agent qui ne casse rien — et que vos équipes{" "}
              <span className="text-gradient-strong">acceptent vraiment</span>.
            </>
          }
          description="Les vraies questions qu'on nous pose en premier rendez-vous. Et nos réponses concrètes."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5"
        >
          {GUARDRAILS.map((g) => (
            <motion.article key={g.id} variants={fadeInUp} className="h-full">
              <SpotlightCard
                glow="139,92,246"
                tilt={3}
                pulse
                className="flex h-full flex-col p-5 sm:p-6"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent-primary/20 bg-accent-glow"
                  style={{ transform: "translateZ(28px)" }}
                >
                  {g.icon}
                </div>
                <h3
                  className="mt-4 text-[15px] font-semibold leading-tight tracking-tight text-text-primary"
                  style={{ transform: "translateZ(18px)" }}
                >
                  {g.title}
                </h3>
                <p
                  className="mt-1 text-[11px] italic leading-snug text-text-tertiary"
                  style={{ transform: "translateZ(14px)" }}
                >
                  {g.objection}
                </p>
                <p
                  className="mt-3 text-[13px] font-medium leading-relaxed text-text-secondary"
                  style={{ transform: "translateZ(10px)" }}
                >
                  {g.pitch}
                </p>
                <div className="mt-4 border-t border-border-subtle/60 pt-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                    Comment ça marche
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-text-tertiary">
                    {g.detail}
                  </p>
                </div>
              </SpotlightCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
