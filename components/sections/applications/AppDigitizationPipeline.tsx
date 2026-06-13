"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

type NodeStatus = "pending" | "active" | "done";
type TooltipSide = "left" | "right" | "top";

type HoverDetail = {
  kicker: string;
  title: string;
  description: string;
  tags?: string[];
};

type SourceDef = {
  id: string;
  label: string;
  sublabel: string;
  icon: ReactNode;
  hover: HoverDetail;
};

type OutputDef = {
  id: string;
  label: string;
  sublabel: string;
  icon: ReactNode;
  hover: HoverDetail;
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
  className: "text-cyan",
};

const SOURCES: SourceDef[] = [
  {
    id: "paper",
    label: "Papier",
    sublabel: "bons, fiches, registres",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
    hover: {
      kicker: "Capture",
      title: "Documents papier digitalisés",
      description:
        "Bons de livraison, fiches qualité, registres : photos ou scans, OCR métier, classement automatique vers le bon dossier.",
      tags: ["OCR", "Mobile", "Auto-classement"],
    },
  },
  {
    id: "excel",
    label: "Excel",
    sublabel: "feuilles partagées",
    icon: (
      <svg {...ICON_BASE}>
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M4 10h16M4 16h16M10 4v16M16 4v16" />
      </svg>
    ),
    hover: {
      kicker: "Import structuré",
      title: "Feuilles partagées normalisées",
      description:
        "Mapping de colonnes, détection des doublons, conservation de l'historique, validation par règles métier avant écriture.",
      tags: ["Drag & drop", "Dédup", "Mapping"],
    },
  },
  {
    id: "mails",
    label: "Mails",
    sublabel: "boîtes diverses",
    icon: (
      <svg {...ICON_BASE}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
    hover: {
      kicker: "Parsing métier",
      title: "Boîtes lues automatiquement",
      description:
        "Extraction des entités clés (client, montant, dates), pièces jointes rangées, accusés de réception générés en retour.",
      tags: ["IMAP", "NLP", "Auto-tri"],
    },
  },
  {
    id: "tools",
    label: "Outils SaaS",
    sublabel: "isolés, non reliés",
    icon: (
      <svg {...ICON_BASE}>
        <rect x="3" y="4" width="7" height="7" rx="1" />
        <rect x="14" y="4" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    hover: {
      kicker: "Intégration",
      title: "Vos SaaS dialoguent enfin",
      description:
        "Connecteurs API REST, webhooks entrants/sortants ou polling — vos outils restent en place mais arrêtent de travailler en silos.",
      tags: ["REST", "Webhooks", "Polling"],
    },
  },
  {
    id: "field",
    label: "Saisie terrain",
    sublabel: "appels, photos, post-it",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M3 21l3-1 12-12-2-2L4 18l-1 3z" />
        <path d="M15 6l3 3" />
      </svg>
    ),
    hover: {
      kicker: "Terrain",
      title: "Saisie depuis le geste réel",
      description:
        "App mobile native, formulaires métier, photos géolocalisées, dictée vocale, offline-first avec synchro dès le retour du réseau.",
      tags: ["Mobile natif", "Offline", "Géoloc"],
    },
  },
];

const OUTPUTS: OutputDef[] = [
  {
    id: "dashboard",
    label: "Dashboard live",
    sublabel: "vue 360° métier",
    icon: (
      <svg {...ICON_BASE}>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M7 14l3-4 3 3 4-6" />
      </svg>
    ),
    hover: {
      kicker: "Visualisation",
      title: "Vue 360° par rôle",
      description:
        "Tableaux de bord adaptés (terrain, manager, direction), filtres dynamiques, drill-down jusqu'à la donnée brute.",
      tags: ["Multi-rôle", "Filtres", "Drill-down"],
    },
  },
  {
    id: "kpi",
    label: "KPIs & objectifs",
    sublabel: "valeur en temps réel",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </svg>
    ),
    hover: {
      kicker: "Mesure",
      title: "Objectifs et tendances",
      description:
        "KPIs métier calculés en temps réel, comparaison périodes, alertes de dérive, partage entre équipes.",
      tags: ["Temps réel", "Comparaison", "Partage"],
    },
  },
  {
    id: "alerts",
    label: "Alertes & SLA",
    sublabel: "Slack · email · push",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
        <path d="M10.5 19a1.5 1.5 0 0 0 3 0" />
      </svg>
    ),
    hover: {
      kicker: "Pilotage actif",
      title: "Seuils et SLA surveillés",
      description:
        "Règles métier configurables qui déclenchent des notifications Slack, e-mail ou push, avec escalade automatique si non traité.",
      tags: ["Slack", "Email", "Push"],
    },
  },
  {
    id: "report",
    label: "Reporting auto",
    sublabel: "PDF · export · API",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
    hover: {
      kicker: "Restitution",
      title: "Reporting automatisé",
      description:
        "PDF et Excel générés puis envoyés sur planning, export API pour vos outils tiers, traçabilité complète des envois.",
      tags: ["PDF", "Excel", "Export API"],
    },
  },
];

const APP_HOVER: HoverDetail = {
  kicker: "Cœur du dispositif",
  title: "Application métier sur mesure",
  description:
    "Modèle de données propre, règles métier, API REST, gestion des rôles, accès offline-first. Web + mobile, scalable, sécurisée.",
  tags: ["Web + Mobile", "Offline-first", "Multi-rôle"],
};

const TOTAL_TICKS = 12;
const LOOP_MS = 7800;

function getSourceStatus(tick: number, index: number): NodeStatus {
  if (tick >= TOTAL_TICKS - 1) return "pending";
  if (tick < index) return "pending";
  if (tick === index) return "active";
  return "done";
}

function getAppStatus(tick: number): NodeStatus {
  if (tick >= TOTAL_TICKS - 1) return "pending";
  if (tick < 5) return "pending";
  if (tick === 5) return "active";
  return "done";
}

function getOutputStatus(tick: number, index: number): NodeStatus {
  if (tick >= TOTAL_TICKS - 1) return "pending";
  if (tick < 6 + index) return "pending";
  if (tick === 6 + index) return "active";
  return "done";
}

// ─── Geometry ───────────────────────────────────────────────────────────────

const DESKTOP = {
  vw: 1180,
  vh: 480,
  src: { cx: 130, cardW: 195, cardH: 64, ys: [50, 140, 230, 320, 410] },
  app: { cx: 590, cy: 230, cardW: 260, cardH: 158 },
  out: { cx: 1055, cardW: 210, cardH: 68, ys: [75, 185, 290, 400] },
};

const MOBILE = {
  vw: 360,
  vh: 680,
  src: { cx: 180, cardW: 240, cardH: 54, ys: [40, 95, 150, 205, 260] },
  app: { cx: 180, cy: 380, cardW: 240, cardH: 110 },
  out: { cx: 180, cardW: 240, cardH: 54, ys: [490, 545, 600, 655] },
};

const APP_NODE_ID = "app";

function srcOutPoint(layout: "desktop" | "mobile", index: number) {
  const cfg = layout === "desktop" ? DESKTOP : MOBILE;
  if (layout === "desktop") {
    return { x: cfg.src.cx + cfg.src.cardW / 2, y: cfg.src.ys[index] };
  }
  return { x: cfg.src.cx, y: cfg.src.ys[index] + cfg.src.cardH / 2 };
}

function appInPoint(layout: "desktop" | "mobile") {
  const cfg = layout === "desktop" ? DESKTOP : MOBILE;
  if (layout === "desktop") {
    return { x: cfg.app.cx - cfg.app.cardW / 2, y: cfg.app.cy };
  }
  return { x: cfg.app.cx, y: cfg.app.cy - cfg.app.cardH / 2 };
}

function appOutPoint(layout: "desktop" | "mobile") {
  const cfg = layout === "desktop" ? DESKTOP : MOBILE;
  if (layout === "desktop") {
    return { x: cfg.app.cx + cfg.app.cardW / 2, y: cfg.app.cy };
  }
  return { x: cfg.app.cx, y: cfg.app.cy + cfg.app.cardH / 2 };
}

function outInPoint(layout: "desktop" | "mobile", index: number) {
  const cfg = layout === "desktop" ? DESKTOP : MOBILE;
  if (layout === "desktop") {
    return { x: cfg.out.cx - cfg.out.cardW / 2, y: cfg.out.ys[index] };
  }
  return { x: cfg.out.cx, y: cfg.out.ys[index] + cfg.out.cardH / 2 };
}

function buildFaninPath(layout: "desktop" | "mobile", index: number): string {
  const src = srcOutPoint(layout, index);
  const dst = appInPoint(layout);
  if (layout === "desktop") {
    const midX = (src.x + dst.x) / 2;
    return `M ${src.x} ${src.y} Q ${midX} ${src.y} ${midX} ${(src.y + dst.y) / 2} T ${dst.x} ${dst.y}`;
  }
  const midY = (src.y + dst.y) / 2;
  return `M ${src.x} ${src.y} L ${src.x} ${midY} L ${dst.x} ${dst.y}`;
}

function buildFanoutPath(layout: "desktop" | "mobile", index: number): string {
  const src = appOutPoint(layout);
  const dst = outInPoint(layout, index);
  if (layout === "desktop") {
    const midX = (src.x + dst.x) / 2;
    return `M ${src.x} ${src.y} Q ${midX} ${src.y} ${midX} ${(src.y + dst.y) / 2} T ${dst.x} ${dst.y}`;
  }
  const midY = (src.y + dst.y) / 2;
  return `M ${src.x} ${src.y} L ${src.x} ${midY} L ${dst.x} ${dst.y}`;
}

// ─── Hover tooltip ──────────────────────────────────────────────────────────

function HoverPopover({
  hover,
  side,
}: {
  hover: HoverDetail;
  side: TooltipSide;
}) {
  const positionClass =
    side === "right"
      ? "left-full top-1/2 ml-3 -translate-y-1/2"
      : side === "left"
      ? "right-full top-1/2 mr-3 -translate-y-1/2"
      : "bottom-full left-1/2 mb-3 -translate-x-1/2";

  const widthClass = "w-[min(230px,calc(100vw-32px))]";

  const enterClass =
    side === "right"
      ? "-translate-x-2 group-hover:translate-x-0 group-focus-within:translate-x-0"
      : side === "left"
      ? "translate-x-2 group-hover:translate-x-0 group-focus-within:translate-x-0"
      : "translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0";

  return (
    <div
      role="tooltip"
      className={[
        "pointer-events-none absolute z-40 rounded-xl border border-border-subtle px-4 py-3 opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100",
        widthClass,
        positionClass,
        enterClass,
      ].join(" ")}
      style={{
        background: "color-mix(in srgb, var(--color-bg-card) 92%, transparent)",
        boxShadow:
          "0 22px 60px rgba(0,0,0,0.55), 0 0 28px var(--color-cyan-glow), inset 0 1px 0 rgba(255,255,255,0.04)",
        borderTop: "1.5px solid color-mix(in srgb, var(--color-cyan) 35%, transparent)",
      }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan/85">
        {hover.kicker}
      </p>
      <p className="mt-1.5 text-[13px] font-semibold leading-snug text-text-primary">
        {hover.title}
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
        {hover.description}
      </p>
      {hover.tags && (
        <ul className="mt-2.5 flex flex-wrap gap-1">
          {hover.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-border-subtle bg-bg-card/70 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-accent-light"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Node card ──────────────────────────────────────────────────────────────

function NodeCard({
  label,
  sublabel,
  icon,
  status,
  size = "default",
  ariaLabel,
  hover,
  tooltipSide,
  enableHover,
  onSelect,
  isSelected,
}: {
  label: string;
  sublabel: string;
  icon: ReactNode;
  status: NodeStatus;
  size?: "default" | "central";
  ariaLabel?: string;
  hover?: HoverDetail;
  tooltipSide?: TooltipSide;
  enableHover?: boolean;
  onSelect?: () => void;
  isSelected?: boolean;
}) {
  const isCentral = size === "central";
  const showTooltip = !!(enableHover && hover && tooltipSide);
  const Tag: "button" | "div" = onSelect ? "button" : "div";

  return (
    <Tag
      {...(onSelect
        ? { type: "button" as const, onClick: onSelect, "aria-pressed": isSelected }
        : { role: "group" as const })}
      aria-label={ariaLabel ?? `${label} — ${sublabel}`}
      aria-current={status === "active" ? "step" : undefined}
      tabIndex={showTooltip || onSelect ? 0 : undefined}
      className={[
        "group relative flex h-full w-full rounded-xl border transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60",
        isCentral
          ? "flex-col items-center justify-center gap-2 px-4 py-3 text-center"
          : "items-center gap-2.5 px-3 py-2 text-left",
        isSelected
          ? "border-cyan/65 bg-bg-card"
          : status === "active"
          ? "border-cyan/45 bg-bg-card"
          : status === "done"
          ? "border-green-400/35 bg-bg-card"
          : "border-border-subtle bg-bg-card/40 opacity-60",
      ].join(" ")}
      style={{
        boxShadow: isSelected
          ? isCentral
            ? "0 0 56px var(--color-cyan-glow), 0 0 18px rgba(34,211,238,0.28)"
            : "0 0 28px var(--color-cyan-glow)"
          : status === "active"
            ? isCentral
              ? "0 0 48px var(--color-cyan-glow), 0 0 12px rgba(34,211,238,0.18)"
              : "0 0 22px var(--color-cyan-glow)"
            : undefined,
        transform: (isSelected || status === "active") && isCentral ? "scale(1.015)" : undefined,
        willChange: "opacity, box-shadow, transform",
      }}
    >
      {!isCentral && (
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border-subtle bg-bg-card">
          {icon}
        </div>
      )}
      {isCentral && (
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md border border-cyan/40 bg-bg-card">
            {icon}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan/80">
            Application métier
          </span>
        </div>
      )}
      <div className={isCentral ? "min-w-0" : "min-w-0 flex-1"}>
        <div
          className={[
            "font-semibold leading-tight text-text-primary",
            isCentral ? "text-[15px] sm:text-base" : "truncate text-[12.5px]",
          ].join(" ")}
        >
          {label}
        </div>
        <p
          className={[
            "leading-snug text-text-tertiary",
            isCentral ? "mt-1 text-[11px]" : "mt-0.5 truncate text-[10.5px]",
          ].join(" ")}
        >
          {sublabel}
        </p>
      </div>
      {!isCentral && (
        <div className="flex h-4 w-4 shrink-0 items-center justify-center">
          {status === "active" && (
            <motion.div
              className="h-3 w-3 rounded-full border-2 border-cyan/40 border-t-cyan"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
          )}
          {status === "done" && (
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="3"
              className="stroke-green-400"
              aria-hidden
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      )}

      {showTooltip && hover && tooltipSide && (
        <HoverPopover hover={hover} side={tooltipSide} />
      )}
    </Tag>
  );
}

// ─── Track (SVG rails + animated tokens) ────────────────────────────────────

function PipelineTrack({
  layout,
  reduced,
}: {
  layout: "desktop" | "mobile";
  reduced: boolean;
}) {
  const cfg = layout === "desktop" ? DESKTOP : MOBILE;
  const faninPaths = useMemo(
    () => SOURCES.map((_, i) => buildFaninPath(layout, i)),
    [layout],
  );
  const fanoutPaths = useMemo(
    () => OUTPUTS.map((_, i) => buildFanoutPath(layout, i)),
    [layout],
  );
  const gradId = `digit-grad-${layout}`;
  const arrowId = `digit-arrow-${layout}`;

  return (
    <svg
      viewBox={`0 0 ${cfg.vw} ${cfg.vh}`}
      className="w-full h-auto"
      role="img"
      aria-label="Schéma de dématerialisation : papier, Excel, mails, outils SaaS et saisie terrain convergent vers une application métier qui produit dashboard, KPIs, alertes et reporting."
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.85" />
          <stop offset="50%" stopColor="var(--color-accent-light)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.85" />
        </linearGradient>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L9 5 L0 9 z" fill="var(--color-cyan)" fillOpacity="0.75" />
        </marker>
      </defs>

      {faninPaths.map((d, i) => (
        <path key={`pi-${i}`} id={`digit-in-${layout}-${i}`} d={d} fill="none" />
      ))}
      {fanoutPaths.map((d, i) => (
        <path key={`po-${i}`} id={`digit-out-${layout}-${i}`} d={d} fill="none" />
      ))}

      {faninPaths.map((d, i) => (
        <motion.path
          key={`vi-${i}`}
          d={d}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          strokeOpacity="0.5"
          strokeLinecap="round"
          markerEnd={`url(#${arrowId})`}
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.9,
            delay: 0.08 * i,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {fanoutPaths.map((d, i) => (
        <motion.path
          key={`vo-${i}`}
          d={d}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          strokeOpacity="0.5"
          strokeLinecap="round"
          markerEnd={`url(#${arrowId})`}
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.9,
            delay: 0.5 + 0.08 * i,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {!reduced &&
        faninPaths.map((_, i) => (
          <circle key={`ti-${i}`} r={4} fill="var(--color-cyan)">
            <animateMotion
              dur={`${(LOOP_MS / 1000) * 0.55}s`}
              repeatCount="indefinite"
              begin={`${i * 0.18}s`}
            >
              <mpath href={`#digit-in-${layout}-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.15;0.85;1"
              dur={`${(LOOP_MS / 1000) * 0.55}s`}
              begin={`${i * 0.18}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

      {!reduced &&
        fanoutPaths.map((_, i) => (
          <circle key={`to-${i}`} r={4} fill="var(--color-cyan)">
            <animateMotion
              dur={`${(LOOP_MS / 1000) * 0.55}s`}
              repeatCount="indefinite"
              begin={`${1.5 + i * 0.2}s`}
            >
              <mpath href={`#digit-out-${layout}-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.15;0.85;1"
              dur={`${(LOOP_MS / 1000) * 0.55}s`}
              begin={`${1.5 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
    </svg>
  );
}

// ─── NodeOverlay (HTML cards positioned over SVG) ───────────────────────────

function NodeOverlay({
  layout,
  tick,
  reduced,
  enableHover,
  activeId,
  onSelect,
}: {
  layout: "desktop" | "mobile";
  tick: number;
  reduced: boolean;
  enableHover: boolean;
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const cfg = layout === "desktop" ? DESKTOP : MOBILE;
  const effectiveTick = reduced ? TOTAL_TICKS - 2 : tick;

  const sourceStyle = (i: number) => ({
    left: `${(cfg.src.cx / cfg.vw) * 100}%`,
    top: `${(cfg.src.ys[i] / cfg.vh) * 100}%`,
    width: `${(cfg.src.cardW / cfg.vw) * 100}%`,
    height: `${(cfg.src.cardH / cfg.vh) * 100}%`,
    transform: "translate(-50%, -50%)",
  });

  const appStyle = {
    left: `${(cfg.app.cx / cfg.vw) * 100}%`,
    top: `${(cfg.app.cy / cfg.vh) * 100}%`,
    width: `${(cfg.app.cardW / cfg.vw) * 100}%`,
    height: `${(cfg.app.cardH / cfg.vh) * 100}%`,
    transform: "translate(-50%, -50%)",
  };

  const outputStyle = (i: number) => ({
    left: `${(cfg.out.cx / cfg.vw) * 100}%`,
    top: `${(cfg.out.ys[i] / cfg.vh) * 100}%`,
    width: `${(cfg.out.cardW / cfg.vw) * 100}%`,
    height: `${(cfg.out.cardH / cfg.vh) * 100}%`,
    transform: "translate(-50%, -50%)",
  });

  // Sources tooltip side : right (vers le centre du blueprint, donc visible)
  // Outputs tooltip side : left (vers le centre du blueprint)
  // App tooltip side : top (au-dessus, hors flux)
  const sourceTooltipSide: TooltipSide = layout === "desktop" ? "right" : "top";
  const outputTooltipSide: TooltipSide = layout === "desktop" ? "left" : "top";
  const appTooltipSide: TooltipSide = "top";

  return (
    <div className="pointer-events-none absolute inset-0">
      {SOURCES.map((s, i) => (
        <div key={s.id} className="pointer-events-auto absolute" style={sourceStyle(i)}>
          <NodeCard
            label={s.label}
            sublabel={s.sublabel}
            icon={s.icon}
            status={getSourceStatus(effectiveTick, i)}
            hover={s.hover}
            tooltipSide={sourceTooltipSide}
            enableHover={enableHover}
            onSelect={() => onSelect(s.id)}
            isSelected={activeId === s.id}
          />
        </div>
      ))}

      <div className="pointer-events-auto absolute" style={appStyle}>
        <NodeCard
          label="Votre application sur mesure"
          sublabel="ordinateur + téléphone · accessible partout"
          icon={
            <svg {...ICON_BASE} className="text-cyan">
              <rect x="5" y="2" width="14" height="20" rx="2.5" />
              <path d="M9 7h6M9 11h6M9 15h3" />
              <circle cx="12" cy="19" r="0.6" fill="currentColor" />
            </svg>
          }
          status={getAppStatus(effectiveTick)}
          size="central"
          ariaLabel="Application métier — cœur du dispositif qui ingère, normalise et restitue les données."
          hover={APP_HOVER}
          tooltipSide={appTooltipSide}
          enableHover={enableHover}
          onSelect={() => onSelect(APP_NODE_ID)}
          isSelected={activeId === APP_NODE_ID}
        />
      </div>

      {OUTPUTS.map((o, i) => (
        <div key={o.id} className="pointer-events-auto absolute" style={outputStyle(i)}>
          <NodeCard
            label={o.label}
            sublabel={o.sublabel}
            icon={o.icon}
            status={getOutputStatus(effectiveTick, i)}
            hover={o.hover}
            tooltipSide={outputTooltipSide}
            enableHover={enableHover}
            onSelect={() => onSelect(o.id)}
            isSelected={activeId === o.id}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Mobile detail drawer ───────────────────────────────────────────────────

function lookupHover(id: string | null): HoverDetail | null {
  if (!id) return null;
  if (id === APP_NODE_ID) return APP_HOVER;
  const src = SOURCES.find((s) => s.id === id);
  if (src) return src.hover;
  const out = OUTPUTS.find((o) => o.id === id);
  if (out) return out.hover;
  return null;
}

function MobileDetailDrawer({
  activeId,
  reduced,
}: {
  activeId: string | null;
  reduced: boolean;
}) {
  const hover = lookupHover(activeId);
  return (
    <div className="relative mt-4 lg:hidden" aria-live="polite">
      <p className="mb-2 text-center text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
        Touchez un élément · détail ci-dessous
      </p>
      <div className="relative overflow-hidden">
        <motion.div
          key={activeId ?? "empty"}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-cyan/40 px-4 py-3.5 backdrop-blur-xl"
          style={{
            background: "color-mix(in srgb, var(--color-bg-card) 80%, transparent)",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.35), 0 0 24px var(--color-cyan-glow), inset 0 1px 0 rgba(255,255,255,0.04)",
            borderTop:
              "1.5px solid color-mix(in srgb, var(--color-cyan) 50%, transparent)",
          }}
        >
          {hover ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan/85">
                {hover.kicker}
              </p>
              <p className="mt-1.5 text-[13px] font-semibold leading-snug text-text-primary">
                {hover.title}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
                {hover.description}
              </p>
              {hover.tags && (
                <ul className="mt-2.5 flex flex-wrap gap-1">
                  {hover.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-border-subtle bg-bg-card/70 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-accent-light"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="text-[12px] text-text-tertiary">
              Touchez un élément du schéma pour voir le détail.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function AppDigitizationPipeline() {
  const { shouldReduceMotion, mounted, isCoarsePointer } = usePerformanceMode();
  const [tick, setTick] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(SOURCES[0].id);
  const inViewRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      if (!inViewRef.current) return;
      setTick((prev) => (prev + 1) % TOTAL_TICKS);
    }, LOOP_MS / TOTAL_TICKS);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  if (!mounted) {
    return <section className="section-shell" aria-hidden />;
  }

  // Désactive les tooltips sur les pointeurs tactiles (pas de hover natif)
  const enableHover = !isCoarsePointer;

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Le principe, en image"
          title={
            <>
              De vos <span className="text-gradient-strong">fichiers éparpillés</span> à
              un seul outil clair.
            </>
          }
          description="Papier, Excel, mails, logiciels qui ne se parlent pas : c'est le quotidien de beaucoup d'entreprises. Une application sur mesure réunit tout ça, fait le travail répétitif à votre place, et vous montre l'essentiel."
        />

        <div ref={containerRef} className="relative">
          <div className="relative rounded-3xl border border-border-subtle bg-bg-card/30 px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-grid opacity-[0.06]"
            />

            <div className="relative mb-4 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
                Entrée
              </span>
              <span className="hidden text-[9px] font-medium uppercase tracking-[0.28em] text-text-tertiary sm:inline">
                Données fragmentées · capture multicanale
              </span>
            </div>

            <div className="relative hidden lg:block">
              <PipelineTrack layout="desktop" reduced={shouldReduceMotion} />
              <NodeOverlay
                layout="desktop"
                tick={tick}
                reduced={shouldReduceMotion}
                enableHover={enableHover}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </div>

            <div className="relative lg:hidden">
              <PipelineTrack layout="mobile" reduced={shouldReduceMotion} />
              <NodeOverlay
                layout="mobile"
                tick={tick}
                reduced={shouldReduceMotion}
                enableHover={false}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </div>

            <div className="relative mt-4 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
                Sortie
              </span>
              <span className="hidden text-[9px] font-medium uppercase tracking-[0.28em] text-text-tertiary sm:inline">
                Pilotage · restitution unique
              </span>
            </div>

            <MobileDetailDrawer activeId={activeId} reduced={shouldReduceMotion} />
          </div>

          {enableHover && (
            <p className="mt-4 hidden text-center text-[11px] uppercase tracking-[0.22em] text-text-tertiary lg:block">
              Survolez un élément pour voir comment l&apos;app le gère
            </p>
          )}

          {/* Légende technique frosted */}
          <motion.div
            className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl px-6 py-7 sm:px-8 sm:py-8"
            style={{
              background: "color-mix(in srgb, var(--color-bg-card) 55%, transparent)",
              backdropFilter: "blur(16px) saturate(140%)",
              WebkitBackdropFilter: "blur(16px) saturate(140%)",
              border: "1px solid color-mix(in srgb, var(--color-border-subtle) 60%, transparent)",
              borderTop: "1.5px solid color-mix(in srgb, var(--color-cyan) 35%, transparent)",
              boxShadow:
                "0 -4px 32px color-mix(in srgb, var(--color-cyan-glow) 50%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-cyan) 8%, transparent)",
            }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                opacity: 0.5,
                maskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
              }}
            />
            <div className="relative">
              <h3
                className="mb-5 text-center text-[11px] font-semibold uppercase"
                style={{
                  letterSpacing: "0.22em",
                  color: "color-mix(in srgb, var(--color-cyan) 70%, var(--color-accent-light) 30%)",
                }}
              >
                Ce que l&apos;app fait techniquement
              </h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-5 text-sm text-text-secondary sm:grid-cols-2">
                {[
                  {
                    label: "Capture multicanale",
                    text: "import Excel/CSV, OCR de PDF/photos, formulaires mobiles, parsers d'emails, webhooks API.",
                  },
                  {
                    label: "Règles métier",
                    text: "validation, déduplication, calculs, états et workflows alignés sur votre vrai geste opérationnel.",
                  },
                  {
                    label: "Synchro API",
                    text: "connecteurs ERP, CRM, comptabilité, paie, outils existants — sans casser ce qui marche.",
                  },
                  {
                    label: "Restitution pilotage",
                    text: "dashboards temps réel, alertes proactives, exports automatisés, droits d'accès par rôle.",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-cyan" aria-hidden>
                      →
                    </span>
                    <span>
                      <strong className="mb-0.5 block font-medium text-text-primary">
                        {item.label}
                      </strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
