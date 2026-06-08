"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type Step = { title: string; description: string };

type Path = {
  key: "greenfield" | "audit";
  badge: string;
  label: string;
  title: string;
  pitch: string;
  glow: string; // rgb without alpha
  accent: string; // CSS color string for accents
  icon: ReactNode;
  steps: Step[];
};

const ICON_BASE = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PATHS: Path[] = [
  {
    key: "greenfield",
    badge: "01",
    label: "Sur mesure",
    title: "Construction dès la page blanche",
    pitch:
      "Vous savez quel produit vous voulez, ou vous avez une intuition forte. On construit la première version proprement, dès le sprint 1.",
    glow: "14,165,233",
    accent: "var(--color-cyan)",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M12 4v16M4 12h16" />
      </svg>
    ),
    steps: [
      {
        title: "Cadrage métier",
        description:
          "1 à 2 ateliers pour modéliser entités, rôles, flux et écrans cibles. On fixe le périmètre V1 en clair.",
      },
      {
        title: "Maquettes & prototype",
        description:
          "UI navigable cliquable validée avant tout code. Les décisions UX sont prises à plat, pas pendant le dev.",
      },
      {
        title: "Build incrémental",
        description:
          "Sprints courts, démo réelle toutes les deux semaines, code production-ready dès le premier sprint.",
      },
      {
        title: "Intégrations & data",
        description:
          "Connexion à vos systèmes existants (ERP, CRM, outils métier), reprise propre de l'historique si pertinent.",
      },
      {
        title: "Mise en service & run",
        description:
          "Déploiement progressif, formation des équipes, monitoring et tableau de bord d'usage en place dès J+1.",
      },
    ],
  },
  {
    key: "audit",
    badge: "02",
    label: "Par audit",
    title: "Refonte d'un existant après diagnostic",
    pitch:
      "Vous avez déjà une app (ou un patchwork d'outils) qui ne suit plus. On commence par cartographier précisément, puis on reconstruit ce qui doit l'être.",
    glow: "129,140,248",
    accent: "var(--color-accent-light)",
    icon: (
      <svg {...ICON_BASE}>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l4 4" />
      </svg>
    ),
    steps: [
      {
        title: "Audit produit + technique",
        description:
          "On cartographie l'existant : code, données, parcours, friction utilisateurs, dette technique chiffrée.",
      },
      {
        title: "Diagnostic & recommandations",
        description:
          "Restitution structurée : ce qui reste, ce qui part, ce qui se réécrit. Avec les arbitrages coût/valeur.",
      },
      {
        title: "Trajectoire de refonte",
        description:
          "Plan de migration sans coupure : modules réécrits l'un après l'autre, ancien et nouveau cohabitent.",
      },
      {
        title: "Refonte ciblée",
        description:
          "On reconstruit d'abord les modules à plus haute valeur (celui qui fait perdre du temps tous les jours).",
      },
      {
        title: "Bascule complète & sunset",
        description:
          "Quand le nouveau couvre tout, on éteint l'ancien proprement. Données migrées, utilisateurs accompagnés.",
      },
    ],
  },
];

export function BuildOrAuditDiptych() {
  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Deux voies d'entrée"
          title={
            <>
              Sur mesure dès le départ, ou{" "}
              <span className="text-gradient-strong">refonte après audit</span>.
            </>
          }
          description="Selon que vous partiez d'une page blanche ou d'un existant à reprendre, la trajectoire change — la rigueur, non."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {PATHS.map((path) => (
            <PathCard key={path.key} path={path} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm italic leading-relaxed text-text-tertiary">
          Vous ne savez pas dans quelle voie vous êtes ? Le premier échange sert exactement à ça — on tranche en 45 minutes.
        </p>
      </div>
    </section>
  );
}

function PathCard({ path }: { path: Path }) {
  const reduceMotion = useReducedMotion();

  return (
    <SpotlightCard
      glow={path.glow}
      tilt={3}
      pulse
      className="flex h-full flex-col p-6 sm:p-8"
    >
      {/* Header */}
      <header className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-bg-card/80"
          style={{
            borderColor: `rgba(${path.glow}, 0.4)`,
            color: path.accent,
            boxShadow: `0 0 28px rgba(${path.glow}, 0.18)`,
          }}
        >
          {path.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.24em]"
            style={{ color: path.accent }}
          >
            {path.badge} · {path.label}
          </p>
          <h3 className="mt-1 text-xl font-semibold leading-tight tracking-tight text-text-primary sm:text-2xl">
            {path.title}
          </h3>
        </div>
      </header>

      <p className="mt-5 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
        {path.pitch}
      </p>

      {/* Steps timeline */}
      <ol
        className="relative mt-8 space-y-5"
        aria-label={`Étapes — ${path.label}`}
      >
        {/* Vertical line */}
        <span
          aria-hidden
          className="absolute left-[15px] top-2 bottom-2 w-px"
          style={{
            background: `linear-gradient(to bottom, rgba(${path.glow}, 0.55), rgba(${path.glow}, 0.18))`,
          }}
        />

        {path.steps.map((step, index) => (
          <motion.li
            key={step.title}
            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: 0.08 * index,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex gap-4 pl-0"
          >
            <div
              className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border bg-bg-card font-mono text-[11px] font-semibold"
              style={{
                borderColor: `rgba(${path.glow}, 0.5)`,
                color: path.accent,
                boxShadow: `inset 0 0 0 3px rgba(${path.glow}, 0.06)`,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <h4 className="text-[15px] font-semibold leading-snug text-text-primary">
                {step.title}
              </h4>
              <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </SpotlightCard>
  );
}
