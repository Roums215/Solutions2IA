"use client";

import { motion, type Variants } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import {
  OPPORTUNITY_SOURCES,
  SOURCE_GROUP_LABELS,
  SOURCES_ADAPTIVE_LINES,
  SOURCES_ADAPTIVE_CONCLUSION,
  SOURCES_CLOSING,
  SOURCES_BRIDGE_TO_BLUEPRINT,
  type OpportunitySource,
  type SourceGroup,
  type SourceIcon,
} from "./webOpportunitySourcesData";

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CYAN = "var(--color-cyan)";
const ACCENT_LIGHT = "var(--color-accent-light)";
const ACCENT = "var(--color-accent-primary)";

const GROUPS: SourceGroup[] = ["numerique", "diffusion", "terrain"];

/**
 * S1 V6.4 — Sources d'opportunités.
 *
 * Style : schéma système, topologie fan-in 9 canaux → 1 nœud VISITEUR central.
 * Couche VISIBILITÉ : montre que le visiteur n'arrive jamais par hasard.
 * Distinction visuelle vs fan-in /rag : pas de glow central pulsant, pas de
 * ligne traçante depuis une source citée. Distinction vs AutomationPipeline :
 * pas de token animé, pas d'état changeant.
 *
 * Motion Option B : 1 draw one-shot whileInView once sur les connecteurs
 * convergents. Mobile : stack 3 paquets de 3 canaux + flèche unique.
 */
export function WebOpportunitySources() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const staticRender = !mounted || disableContentMotion;

  const parentProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  const lineVariants: Variants | undefined = staticRender
    ? undefined
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: {
            duration: 0.7,
            ease: PREMIUM_EASE,
          },
        },
      };

  const sourcesByGroup: Record<SourceGroup, OpportunitySource[]> = {
    numerique: OPPORTUNITY_SOURCES.filter((s) => s.group === "numerique"),
    diffusion: OPPORTUNITY_SOURCES.filter((s) => s.group === "diffusion"),
    terrain: OPPORTUNITY_SOURCES.filter((s) => s.group === "terrain"),
  };

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Sources d'opportunités"
          title={
            <>
              D&apos;où viennent vos{" "}
              <span className="text-gradient-strong">prochains clients</span>{" "}?
            </>
          }
          description="Vos prochains clients ne viennent pas par hasard. Ils arrivent par neuf canaux possibles. Solutions 2IA branche ceux qui comptent pour vous."
        />

        <motion.div className="mx-auto max-w-[900px]" {...parentProps}>
          {/* Cadre blueprint */}
          <div className="relative rounded-3xl border border-border-subtle bg-bg-card/30 px-4 py-8 sm:px-8 sm:py-10">
            {/* Faint grid backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-grid opacity-[0.06]"
            />

            {/* Boundary label */}
            <motion.div
              variants={itemVariants}
              className="relative mb-6 flex items-center justify-between"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
                Visibilité
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-text-tertiary">
                Couche amont · Neuf canaux
              </span>
            </motion.div>

            {/* DESKTOP — Grille 3×3 + fan-in convergent */}
            <div className="hidden lg:block">
              <DesktopFanIn
                sourcesByGroup={sourcesByGroup}
                itemVariants={itemVariants}
                lineVariants={lineVariants}
              />
            </div>

            {/* MOBILE / TABLET — Stack 3 groupes de 3 canaux + flèche unique */}
            <div className="lg:hidden">
              <MobileStack
                sourcesByGroup={sourcesByGroup}
                itemVariants={itemVariants}
                lineVariants={lineVariants}
              />
            </div>
          </div>

          {/* Sous-bloc adaptatif (rappel P2) */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-8 max-w-[760px] rounded-2xl border border-border-subtle bg-bg-card/30 px-5 py-5 sm:px-7 sm:py-6"
          >
            <p className="text-sm font-semibold text-text-primary sm:text-[15px]">
              Tous les canaux n&apos;ont pas le même poids pour vous.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-text-secondary sm:text-sm">
              {SOURCES_ADAPTIVE_LINES.map((line) => (
                <li key={line} className="flex gap-2">
                  <span aria-hidden className="text-cyan/60">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic leading-snug text-text-tertiary sm:text-sm">
              {SOURCES_ADAPTIVE_CONCLUSION}
            </p>
          </motion.div>
        </motion.div>

        {/* Phrase fermante */}
        <motion.p
          variants={itemVariants}
          initial={staticRender ? false : "hidden"}
          whileInView={staticRender ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-10 max-w-[640px] text-center text-base leading-snug text-text-primary sm:text-lg"
        >
          « {SOURCES_CLOSING} »
        </motion.p>

        {/* Bridge italique vers S2 Blueprint */}
        <motion.p
          variants={itemVariants}
          initial={staticRender ? false : "hidden"}
          whileInView={staticRender ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-4 max-w-[640px] text-center text-xs italic text-text-tertiary sm:text-sm"
        >
          {SOURCES_BRIDGE_TO_BLUEPRINT}{" "}
          <a
            href="#opportunity-flow"
            className="text-cyan/85 underline-offset-4 transition-colors duration-300 hover:text-cyan hover:underline"
          >
            ↓
          </a>
        </motion.p>
      </div>
    </section>
  );
}

// ─── Sub-composants ────────────────────────────────────────────────────────

function DesktopFanIn({
  sourcesByGroup,
  itemVariants,
  lineVariants,
}: {
  sourcesByGroup: Record<SourceGroup, OpportunitySource[]>;
  itemVariants: typeof fadeInUp | undefined;
  lineVariants: Variants | undefined;
}) {
  // Grid 3 columns × 3 rows = 9 sources, then fan-in zone, then VISITEUR pill.
  return (
    <div className="relative">
      {/* Groupes labels */}
      <div className="mb-3 grid grid-cols-3 gap-4">
        {GROUPS.map((g) => (
          <motion.div
            key={g}
            variants={itemVariants}
            className="text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-text-tertiary"
          >
            {SOURCE_GROUP_LABELS[g]}
          </motion.div>
        ))}
      </div>

      {/* Grille 3×3 — chaque colonne porte 3 canaux verticalement */}
      <div className="grid grid-cols-3 gap-4">
        {GROUPS.map((g) => (
          <div key={g} className="flex flex-col gap-3">
            {sourcesByGroup[g].map((source) => (
              <SourceCard
                key={source.key}
                source={source}
                itemVariants={itemVariants}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Zone fan-in convergente */}
      <div className="relative mt-2 h-24">
        <svg
          aria-hidden
          viewBox="0 0 900 96"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id="fanin-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CYAN} stopOpacity="0.7" />
              <stop offset="60%" stopColor={ACCENT_LIGHT} stopOpacity="0.85" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0.9" />
            </linearGradient>
            <marker
              id="fanin-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 1 L9 5 L0 9 z" fill={CYAN} fillOpacity="0.85" />
            </marker>
          </defs>

          {/* 9 lines from 9 column anchors → center bottom convergence */}
          {[0, 1, 2].map((col) =>
            [0, 1, 2].map((row) => {
              const xStart = 150 + col * 300; // approx column centers (3 cols)
              const xEnd = 450;
              const yStart = 0;
              const yEnd = 76;
              const lineKey = `fanin-${col}-${row}`;
              // Slight horizontal staggering by row so lines do not overlap perfectly
              const offset = (row - 1) * 8;
              return (
                <motion.path
                  key={lineKey}
                  d={`M ${xStart + offset} ${yStart} Q ${xStart + offset} ${yEnd / 2}, ${xEnd} ${yEnd}`}
                  fill="none"
                  stroke="url(#fanin-grad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  markerEnd={col === 1 && row === 1 ? "url(#fanin-arrow)" : undefined}
                  variants={lineVariants}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* VISITEUR pill central */}
      <motion.div
        variants={itemVariants}
        className="relative -mt-2 flex justify-center"
      >
        <VisitorPill />
      </motion.div>
    </div>
  );
}

function MobileStack({
  sourcesByGroup,
  itemVariants,
  lineVariants,
}: {
  sourcesByGroup: Record<SourceGroup, OpportunitySource[]>;
  itemVariants: typeof fadeInUp | undefined;
  lineVariants: Variants | undefined;
}) {
  return (
    <div className="flex flex-col gap-5">
      {GROUPS.map((g) => (
        <div key={g} className="flex flex-col gap-2.5">
          <motion.div
            variants={itemVariants}
            className="text-[9px] font-semibold uppercase tracking-[0.3em] text-text-tertiary"
          >
            {SOURCE_GROUP_LABELS[g]}
          </motion.div>
          {sourcesByGroup[g].map((source) => (
            <SourceCard
              key={source.key}
              source={source}
              itemVariants={itemVariants}
            />
          ))}
        </div>
      ))}

      {/* Flèche unique vers VISITEUR */}
      <div className="relative mt-1 flex justify-center">
        <svg
          aria-hidden
          width="14"
          height="40"
          viewBox="0 0 14 40"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="mobile-fanin-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CYAN} stopOpacity="0.85" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0.85" />
            </linearGradient>
            <marker
              id="mobile-fanin-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 1 L9 5 L0 9 z" fill={CYAN} fillOpacity="0.85" />
            </marker>
          </defs>
          <motion.path
            d="M 7 2 L 7 34"
            fill="none"
            stroke="url(#mobile-fanin-grad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            markerEnd="url(#mobile-fanin-arrow)"
            variants={lineVariants}
          />
        </svg>
      </div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <VisitorPill />
      </motion.div>
    </div>
  );
}

function SourceCard({
  source,
  itemVariants,
}: {
  source: OpportunitySource;
  itemVariants: typeof fadeInUp | undefined;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative flex items-start gap-2.5 rounded-xl border border-border-subtle bg-bg-card/50 px-3 py-2.5"
    >
      {/* Liseré accent à gauche */}
      <span
        aria-hidden
        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-sm bg-gradient-to-b from-cyan/70 to-accent-primary/50"
      />

      {/* Icon */}
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border-subtle bg-bg-card">
        <SourceIconRender icon={source.icon} />
      </div>

      {/* Label + sublabel */}
      <div className="min-w-0 flex-1">
        <div className="text-[12px] font-semibold leading-tight text-text-primary sm:text-[13px]">
          {source.label}
        </div>
        <p className="mt-0.5 text-[10px] leading-snug text-text-tertiary sm:text-[11px]">
          {source.sublabel}
        </p>
      </div>
    </motion.div>
  );
}

function VisitorPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan/50 bg-bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan shadow-[0_0_24px_rgba(34,211,238,0.18)]">
      <span aria-hidden className="grid h-4 w-4 place-items-center rounded-full border border-cyan/50 text-[9px]">
        01
      </span>
      Visiteur
    </span>
  );
}

function SourceIconRender({ icon }: { icon: SourceIcon }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-cyan",
  };

  switch (icon) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="1.5" />
          <path d="M9 7h1.5M13.5 7H15M9 11h1.5M13.5 11H15M9 15h1.5M13.5 15H15" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M12 3l1.5 4 4 1.5-4 1.5L12 14l-1.5-4-4-1.5 4-1.5L12 3z" />
          <path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
        </svg>
      );
    case "share":
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8.2 11l7.6-4M8.2 13l7.6 4" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d="M4 11v2a2 2 0 0 0 2 2h1l3 4V6L7 10H6a2 2 0 0 0-2 2z" />
          <path d="M10 6l8-3v18l-8-3" />
          <path d="M18 8c1.5 1 1.5 7 0 8" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3" />
          <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
          <circle cx="17" cy="10" r="2.5" />
          <path d="M14.5 20c.3-2 2-3.5 5-3.5" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M3 12l5-5 3 3 4-4 6 6-6 6-3-3-4 4-5-7z" />
          <path d="M11 14l3-3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="16" rx="1.5" />
          <path d="M4 10h16M9 3v4M15 3v4" />
        </svg>
      );
    case "qrcode":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" />
          <rect x="14" y="4" width="6" height="6" />
          <rect x="4" y="14" width="6" height="6" />
          <path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" />
        </svg>
      );
  }
}
