"use client";

import { motion, type Variants } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import {
  OPPORTUNITY_STATIONS,
  OPPORTUNITY_CLOSING,
  OPPORTUNITY_BRIDGE_TO_TOOLS,
  OPPORTUNITY_EDITORIAL_V64,
  type OpportunityIcon,
  type OpportunityStation,
} from "./webOpportunityData";

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const CYAN = "var(--color-cyan)";
const ACCENT_LIGHT = "var(--color-accent-light)";
const ACCENT = "var(--color-accent-primary)";

/**
 * S4 — Diagramme système « De votre visiteur à votre prochain client ».
 *
 * Style : plan d'infrastructure métier. Colonne verticale, 9 stations,
 * connecteurs SVG fins, arrow markers, ENTRÉE / SORTIE en boundary labels.
 * Pas de cartes décoratives, pas de pulse, pas de glow secondaire.
 * 1 animation cœur : draw one-shot whileInView des connecteurs.
 */
export function WebOpportunityFlow() {
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
            duration: 0.6,
            ease: PREMIUM_EASE,
          },
        },
      };

  return (
    <section id="opportunity-flow" className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Comment circule une opportunité"
          title={
            <>
              De votre visiteur à votre{" "}
              <span className="text-gradient-strong">prochain client</span>.
            </>
          }
          description="Neuf étapes connectées. Une seule logique : chaque étape transmet le contexte à la suivante — sans intervention manuelle, sans perte d'information."
        />

        <motion.div
          className="mx-auto max-w-[640px]"
          {...parentProps}
        >
          {/* Cadre blueprint */}
          <div className="relative rounded-3xl border border-border-subtle bg-bg-card/30 px-4 py-8 sm:px-8 sm:py-10">
            {/* Faint grid backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-grid opacity-[0.06]"
            />

            {/* Boundary label ENTRÉE */}
            <motion.div
              variants={itemVariants}
              className="relative mb-4 flex items-center justify-between"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
                Entrée
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-text-tertiary">
                Système connecté
              </span>
            </motion.div>

            {/* Stations + connecteurs */}
            <div className="relative flex flex-col">
              {OPPORTUNITY_STATIONS.map((station, i) => (
                <StationRow
                  key={station.key}
                  station={station}
                  index={i}
                  isLast={i === OPPORTUNITY_STATIONS.length - 1}
                  itemVariants={itemVariants}
                  lineVariants={lineVariants}
                />
              ))}
            </div>

            {/* Boundary label SORTIE */}
            <motion.div
              variants={itemVariants}
              className="relative mt-4 flex items-center justify-between"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
                Sortie
              </span>
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-text-tertiary">
                Opportunité convertie
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Phrase fermante */}
        <motion.p
          variants={itemVariants}
          initial={staticRender ? false : "hidden"}
          whileInView={staticRender ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-10 max-w-[640px] text-center text-base leading-snug text-text-primary sm:text-lg"
        >
          « {OPPORTUNITY_CLOSING} »
        </motion.p>

        {/* Phrase éditoriale V6.4 — vente naturelle sans catalogue */}
        <motion.p
          variants={itemVariants}
          initial={staticRender ? false : "hidden"}
          whileInView={staticRender ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-6 max-w-[640px] text-center text-sm italic leading-relaxed text-text-secondary sm:text-base"
        >
          {OPPORTUNITY_EDITORIAL_V64}
        </motion.p>

        <motion.p
          variants={itemVariants}
          initial={staticRender ? false : "hidden"}
          whileInView={staticRender ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-5 max-w-[640px] text-center text-xs italic text-text-tertiary sm:text-sm"
        >
          {OPPORTUNITY_BRIDGE_TO_TOOLS}{" "}
          <a
            href="#connected-constellation"
            className="text-cyan/85 underline-offset-4 transition-colors duration-300 hover:text-cyan hover:underline"
          >
            Voir lesquels →
          </a>
        </motion.p>
      </div>
    </section>
  );
}

// ─── Sub-composants ────────────────────────────────────────────────────────

function StationRow({
  station,
  index,
  isLast,
  itemVariants,
  lineVariants,
}: {
  station: OpportunityStation;
  index: number;
  isLast: boolean;
  itemVariants: typeof fadeInUp | undefined;
  lineVariants: Variants | undefined;
}) {
  return (
    <>
      <motion.div
        variants={itemVariants}
        className="relative flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-card/50 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3"
      >
        {/* Liseré accent à gauche */}
        <span
          aria-hidden
          className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-sm bg-gradient-to-b from-cyan/70 to-accent-primary/50"
        />

        {/* Step number */}
        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyan/40 bg-bg-card text-[10px] font-bold text-cyan">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Icon */}
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border-subtle bg-bg-card sm:h-9 sm:w-9">
          <StationIcon icon={station.icon} />
        </div>

        {/* Label + sublabel + bridge V6.4 (si présent) */}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold leading-tight text-text-primary sm:text-[15px]">
            {station.label}
          </div>
          <p className="mt-0.5 text-[11px] leading-snug text-text-tertiary sm:text-xs">
            {station.sublabel}
          </p>
          {station.bridge && (
            <p className="mt-1 text-[10px] italic leading-snug text-text-tertiary/80 sm:text-[11px]">
              <a
                href={station.bridge.href}
                className="text-cyan/75 underline-offset-4 transition-colors duration-300 hover:text-cyan hover:underline"
              >
                {station.bridge.label}
              </a>
            </p>
          )}
        </div>
      </motion.div>

      {!isLast && (
        <VerticalConnector index={index} lineVariants={lineVariants} />
      )}
    </>
  );
}

function VerticalConnector({
  index,
  lineVariants,
}: {
  index: number;
  lineVariants: Variants | undefined;
}) {
  const gradientId = `opp-vconn-grad-${index}`;
  const arrowId = `opp-vconn-arrow-${index}`;

  return (
    <div className="relative my-1 flex justify-center">
      <svg
        aria-hidden
        width="14"
        height="32"
        viewBox="0 0 14 32"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CYAN} stopOpacity="0.85" />
            <stop offset="50%" stopColor={ACCENT_LIGHT} stopOpacity="0.95" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.85" />
          </linearGradient>
          <marker
            id={arrowId}
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

        {/* Start dot */}
        <circle cx="7" cy="2" r="1.6" fill={CYAN} fillOpacity="0.7" />

        {/* Animated vertical line */}
        <motion.path
          d="M 7 2 L 7 26"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          markerEnd={`url(#${arrowId})`}
          variants={lineVariants}
        />

        {/* Flow dots */}
        {[10, 14, 18].map((cy) => (
          <circle
            key={cy}
            cx="7"
            cy={cy}
            r="0.9"
            fill={CYAN}
            fillOpacity="0.45"
          />
        ))}
      </svg>
    </div>
  );
}

function StationIcon({ icon }: { icon: OpportunityIcon }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "text-cyan",
  };

  switch (icon) {
    case "visitor":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
        </svg>
      );
    case "browser":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
          <circle cx="6" cy="7" r="0.6" fill="currentColor" />
          <circle cx="8.5" cy="7" r="0.6" fill="currentColor" />
        </svg>
      );
    case "form":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 9h6M9 13h6M9 17h4" />
        </svg>
      );
    case "filter":
      return (
        <svg {...common}>
          <path d="M4 5h16l-6 8v5l-4 2v-7L4 5z" />
        </svg>
      );
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
          <path d="M5 5.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
          <path d="M5 11.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
          <path d="M10.5 19a1.5 1.5 0 0 0 3 0" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3" />
          <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
          <circle cx="17" cy="10" r="2.5" />
          <path d="M14.5 20c.3-2 2-3.5 5-3.5" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <path d="M4 18l5-6 4 4 7-9" />
          <path d="M17 7h3v3" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M3 12l5-5 3 3 4-4 6 6-6 6-3-3-4 4-5-7z" />
          <path d="M11 14l3-3" />
        </svg>
      );
  }
}
