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

type NodeDef = {
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
  className: "text-accent-light",
};

const NEEDS: NodeDef[] = [
  {
    id: "inbox",
    label: "Tri mails",
    sublabel: "boîte support · contact",
    icon: (
      <svg {...ICON_BASE}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 8l9 6 9-6" />
      </svg>
    ),
    hover: {
      kicker: "Triage entrant",
      title: "Boîte mail lue et rangée par urgence",
      description:
        "Range par urgence, répond aux questions courantes, escalade à vous si l'assistant n'est pas sûr. Compatible Gmail · Outlook · Front.",
      tags: ["Gmail", "Outlook", "Front"],
    },
  },
  {
    id: "notes",
    label: "Notes appel",
    sublabel: "transcription + synthèse",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10a7 7 0 0 1-14 0M12 17v5" />
      </svg>
    ),
    hover: {
      kicker: "Voix → structuré",
      title: "Appel transcrit, structuré, enregistré",
      description:
        "Transcription automatique, extraction du nom/montant/prochaine étape, envoi vers votre CRM. Traçable à tout moment.",
      tags: ["Transcription", "CRM", "Traçabilité"],
    },
  },
  {
    id: "rag",
    label: "Recherche doc",
    sublabel: "Vos documents, interrogés",
    icon: (
      <svg {...ICON_BASE}>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l4 4" />
      </svg>
    ),
    hover: {
      kicker: "Vos documents",
      title: "Réponse sourcée sur vos documents",
      description:
        "Interroge vos fichiers Notion / Confluence / SharePoint. Citations affichées, refus explicite si la réponse n'est pas dans vos docs.",
      tags: ["Vos fichiers", "Citations", "Refus explicite"],
    },
  },
  {
    id: "qualify",
    label: "Qualif lead",
    sublabel: "ICP + scoring",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M21 12a9 9 0 1 1-9-9" />
        <path d="M21 3l-9 9" />
        <path d="M16 3h5v5" />
      </svg>
    ),
    hover: {
      kicker: "Qualification",
      title: "Prospect enrichi, email personnalisé",
      description:
        "Enrichit le prospect (SIREN, taille, signaux), évalue son profil selon vos critères, génère l'email de prise de contact.",
      tags: ["Enrichissement", "Scoring", "Email"],
    },
  },
  {
    id: "devis",
    label: "Génération devis",
    sublabel: "extraire → rédiger",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 14h6M9 18h4" />
      </svg>
    ),
    hover: {
      kicker: "Devis automatisé",
      title: "Du besoin client à la propal signable",
      description:
        "Lit la demande, applique vos grilles tarifaires, génère le PDF, envoie pour signature. Vous validez avant l'envoi.",
      tags: ["Templates", "Tarifs", "E-signature"],
    },
  },
  {
    id: "reporting",
    label: "Reporting hebdo",
    sublabel: "KPIs + anomalies",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </svg>
    ),
    hover: {
      kicker: "Pilotage",
      title: "Synthèse hebdo livrée automatiquement",
      description:
        "Compile vos indicateurs, signale les anomalies, propose quelques actions. Envoi par email + Slack + canal direction.",
      tags: ["Anomalies", "Synthèse", "Diffusion"],
    },
  },
];

const ACTIONS: NodeDef[] = [
  {
    id: "email-auto",
    label: "Email auto",
    sublabel: "rédigé · envoyé",
    icon: (
      <svg {...ICON_BASE}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
        <path d="M17 13l2 2" />
      </svg>
    ),
    hover: {
      kicker: "Sortie email",
      title: "Réponses rédigées et envoyées",
      description:
        "Rédige avec votre ton, joint les pièces pertinentes, enregistre la conversation. Mode brouillon ou envoi direct selon la criticité.",
      tags: ["Votre ton", "Brouillon / auto", "Historique"],
    },
  },
  {
    id: "crm",
    label: "CRM update",
    sublabel: "contact · deal · note",
    icon: (
      <svg {...ICON_BASE}>
        <circle cx="9" cy="9" r="3" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M15 19c.3-2 2-3 5-3" />
      </svg>
    ),
    hover: {
      kicker: "Sortie CRM",
      title: "Données mises à jour sans double saisie",
      description:
        "Crée ou met à jour contact + opportunité + historique dans HubSpot · Salesforce · Axonaut · Pipedrive. Traçable à tout moment.",
      tags: ["HubSpot", "Salesforce", "Axonaut"],
    },
  },
  {
    id: "slack",
    label: "Slack / Teams",
    sublabel: "notif · canal · DM",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    hover: {
      kicker: "Sortie chat",
      title: "Notification au bon canal",
      description:
        "Poste dans Slack ou Teams, mentionne les bonnes personnes, propose 2 boutons d'action (valider / réviser).",
      tags: ["Mentions", "Buttons", "Threads"],
    },
  },
  {
    id: "doc",
    label: "Document",
    sublabel: "Notion · Drive · PDF",
    icon: (
      <svg {...ICON_BASE}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
    hover: {
      kicker: "Sortie document",
      title: "Compte-rendu, devis, brief généré",
      description:
        "Crée le document avec votre template, dépose dans le bon dossier (Notion · Drive · SharePoint), partage avec les bonnes personnes.",
      tags: ["Template", "Auto-classement", "Partage"],
    },
  },
  {
    id: "calendar",
    label: "Calendar / RDV",
    sublabel: "créneau · confirmation",
    icon: (
      <svg {...ICON_BASE}>
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path d="M4 10h16M9 3v4M15 3v4" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    hover: {
      kicker: "Sortie planning",
      title: "RDV pris dans le bon créneau",
      description:
        "Vérifie la dispo, pose le RDV, envoie l'invitation, programme les rappels. Évite double-booking et collisions.",
      tags: ["Google Cal", "Outlook", "Rappels SMS"],
    },
  },
];

const AGENT_HOVER: HoverDetail = {
  kicker: "Cœur du dispositif",
  title: "Votre assistant numérique, sur mesure",
  description:
    "Un seul assistant, plusieurs tâches : il analyse les demandes entrantes, applique vos règles, déclenche les bonnes actions. Garde-fous et historique sous votre contrôle.",
  tags: ["Multi-tâches", "Garde-fous", "Traçabilité"],
};

const TOTAL_TICKS = 14; // 6 sources + 1 app + 5 outputs + 2 dwell
const LOOP_MS = 8400;

function getNeedStatus(tick: number, index: number): NodeStatus {
  if (tick >= TOTAL_TICKS - 1) return "pending";
  if (tick < index) return "pending";
  if (tick === index) return "active";
  return "done";
}

function getAgentStatus(tick: number): NodeStatus {
  if (tick >= TOTAL_TICKS - 1) return "pending";
  if (tick < 6) return "pending";
  if (tick === 6) return "active";
  return "done";
}

function getActionStatus(tick: number, index: number): NodeStatus {
  if (tick >= TOTAL_TICKS - 1) return "pending";
  if (tick < 7 + index) return "pending";
  if (tick === 7 + index) return "active";
  return "done";
}

// ─── Geometry ───────────────────────────────────────────────────────────────

const DESKTOP = {
  vw: 1180,
  vh: 540,
  src: { cx: 130, cardW: 195, cardH: 62, ys: [50, 135, 220, 305, 390, 475] },
  app: { cx: 590, cy: 265, cardW: 260, cardH: 158 },
  out: { cx: 1055, cardW: 210, cardH: 66, ys: [80, 180, 280, 380, 480] },
};

const MOBILE = {
  vw: 360,
  vh: 780,
  src: { cx: 180, cardW: 240, cardH: 52, ys: [40, 95, 150, 205, 260, 315] },
  app: { cx: 180, cy: 430, cardW: 240, cardH: 110 },
  out: { cx: 180, cardW: 240, cardH: 52, ys: [550, 605, 660, 715, 770] },
};

const AGENT_NODE_ID = "agent";

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

function HoverPopover({ hover, side }: { hover: HoverDetail; side: TooltipSide }) {
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
          "0 22px 60px rgba(0,0,0,0.55), 0 0 28px rgba(139,92,246,0.28), inset 0 1px 0 rgba(255,255,255,0.04)",
        borderTop: "1.5px solid color-mix(in srgb, var(--color-accent-primary) 50%, transparent)",
      }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
        {hover.kicker}
      </p>
      <p className="mt-1.5 text-[13px] font-semibold leading-snug text-text-primary">
        {hover.title}
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">{hover.description}</p>
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
        "group relative flex h-full w-full rounded-xl border transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60",
        isCentral
          ? "flex-col items-center justify-center gap-2 px-4 py-3 text-center"
          : "items-center gap-2.5 px-3 py-2 text-left",
        isSelected
          ? "border-accent-primary/70 bg-bg-card"
          : status === "active"
          ? "border-accent-primary/55 bg-bg-card"
          : status === "done"
          ? "border-cyan/35 bg-bg-card"
          : "border-border-subtle bg-bg-card/40 opacity-60",
      ].join(" ")}
      style={{
        boxShadow: isSelected
          ? isCentral
            ? "0 0 56px rgba(139,92,246,0.55), 0 0 20px rgba(139,92,246,0.35)"
            : "0 0 28px rgba(139,92,246,0.45)"
          : status === "active"
            ? isCentral
              ? "0 0 52px rgba(139,92,246,0.45), 0 0 16px rgba(139,92,246,0.25)"
              : "0 0 22px rgba(139,92,246,0.35)"
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
          <div className="grid h-9 w-9 place-items-center rounded-md border border-accent-primary/40 bg-bg-card">
            {icon}
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
            Agent IA
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
              className="h-3 w-3 rounded-full border-2 border-accent-primary/40 border-t-accent-primary"
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
              className="stroke-cyan"
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
    () => NEEDS.map((_, i) => buildFaninPath(layout, i)),
    [layout],
  );
  const fanoutPaths = useMemo(
    () => ACTIONS.map((_, i) => buildFanoutPath(layout, i)),
    [layout],
  );
  const gradId = `agent-grad-${layout}`;
  const arrowId = `agent-arrow-${layout}`;

  return (
    <svg
      viewBox={`0 0 ${cfg.vw} ${cfg.vh}`}
      className="w-full h-auto"
      role="img"
      aria-label="Schéma : 6 besoins (tri mails, notes d'appel, recherche dans vos documents, qualification de prospects, génération de devis, reporting) convergent vers un assistant numérique central qui déclenche 5 actions (email, CRM, Slack, document, calendrier)."
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.75" />
          <stop offset="50%" stopColor="var(--color-accent-light)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.75" />
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
          <path d="M0 1 L9 5 L0 9 z" fill="var(--color-accent-primary)" fillOpacity="0.75" />
        </marker>
      </defs>

      {faninPaths.map((d, i) => (
        <path key={`pi-${i}`} id={`agent-in-${layout}-${i}`} d={d} fill="none" />
      ))}
      {fanoutPaths.map((d, i) => (
        <path key={`po-${i}`} id={`agent-out-${layout}-${i}`} d={d} fill="none" />
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
          transition={{ duration: 0.9, delay: 0.07 * i, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ duration: 0.9, delay: 0.5 + 0.07 * i, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {!reduced &&
        faninPaths.map((_, i) => (
          <circle key={`ti-${i}`} r={4} fill="var(--color-accent-primary)">
            <animateMotion
              dur={`${(LOOP_MS / 1000) * 0.5}s`}
              repeatCount="indefinite"
              begin={`${i * 0.16}s`}
            >
              <mpath href={`#agent-in-${layout}-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.15;0.85;1"
              dur={`${(LOOP_MS / 1000) * 0.5}s`}
              begin={`${i * 0.16}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

      {!reduced &&
        fanoutPaths.map((_, i) => (
          <circle key={`to-${i}`} r={4} fill="var(--color-cyan)">
            <animateMotion
              dur={`${(LOOP_MS / 1000) * 0.5}s`}
              repeatCount="indefinite"
              begin={`${1.8 + i * 0.18}s`}
            >
              <mpath href={`#agent-out-${layout}-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.15;0.85;1"
              dur={`${(LOOP_MS / 1000) * 0.5}s`}
              begin={`${1.8 + i * 0.18}s`}
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

  const needSide: TooltipSide = layout === "desktop" ? "right" : "top";
  const actionSide: TooltipSide = layout === "desktop" ? "left" : "top";
  const agentSide: TooltipSide = "top";

  return (
    <div className="pointer-events-none absolute inset-0">
      {NEEDS.map((n, i) => (
        <div key={n.id} className="pointer-events-auto absolute" style={sourceStyle(i)}>
          <NodeCard
            label={n.label}
            sublabel={n.sublabel}
            icon={n.icon}
            status={getNeedStatus(effectiveTick, i)}
            hover={n.hover}
            tooltipSide={needSide}
            enableHover={enableHover}
            onSelect={() => onSelect(n.id)}
            isSelected={activeId === n.id}
          />
        </div>
      ))}

      <div className="pointer-events-auto absolute" style={appStyle}>
        <NodeCard
          label="1 assistant · multi-tâches"
          sublabel="Analyse · règles · garde-fous · logs"
          icon={
            <svg {...ICON_BASE} className="text-accent-primary">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v3M12 18v3M21 12h-3M6 12H3" />
              <path d="M17.5 6.5l-2 2M8.5 15.5l-2 2M17.5 17.5l-2-2M8.5 8.5l-2-2" />
            </svg>
          }
          status={getAgentStatus(effectiveTick)}
          size="central"
          ariaLabel="Assistant numérique — cœur du dispositif, analyse les demandes entrantes et déclenche les bonnes actions."
          hover={AGENT_HOVER}
          tooltipSide={agentSide}
          enableHover={enableHover}
          onSelect={() => onSelect(AGENT_NODE_ID)}
          isSelected={activeId === AGENT_NODE_ID}
        />
      </div>

      {ACTIONS.map((a, i) => (
        <div key={a.id} className="pointer-events-auto absolute" style={outputStyle(i)}>
          <NodeCard
            label={a.label}
            sublabel={a.sublabel}
            icon={a.icon}
            status={getActionStatus(effectiveTick, i)}
            hover={a.hover}
            tooltipSide={actionSide}
            enableHover={enableHover}
            onSelect={() => onSelect(a.id)}
            isSelected={activeId === a.id}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Mobile detail drawer ───────────────────────────────────────────────────

function lookupHover(id: string | null): HoverDetail | null {
  if (!id) return null;
  if (id === AGENT_NODE_ID) return AGENT_HOVER;
  const need = NEEDS.find((n) => n.id === id);
  if (need) return need.hover;
  const action = ACTIONS.find((a) => a.id === id);
  if (action) return action.hover;
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
          className="rounded-xl border border-accent-primary/45 px-4 py-3.5 backdrop-blur-xl"
          style={{
            background: "color-mix(in srgb, var(--color-bg-card) 80%, transparent)",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.35), 0 0 26px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
            borderTop:
              "1.5px solid color-mix(in srgb, var(--color-accent-primary) 55%, transparent)",
          }}
        >
          {hover ? (
            <>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
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

export function OneAgentManyNeedsPipeline() {
  const { shouldReduceMotion, mounted, isCoarsePointer } = usePerformanceMode();
  const [tick, setTick] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(NEEDS[0].id);
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

  const enableHover = !isCoarsePointer;

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Modularité"
          title={
            <>
              Un seul assistant peut prendre en charge{" "}
              <span className="text-gradient-strong">plusieurs besoins à la fois</span>.
            </>
          }
          description="Vous n'achetez pas un outil par tâche. Je configure un assistant numérique qui gère tout ce qui peut l'être — en cohérence avec votre façon de travailler."
        />

        <div ref={containerRef} className="relative">
          <div className="relative rounded-3xl border border-border-subtle bg-bg-card/30 px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-grid opacity-[0.06]"
            />

            <div className="relative mb-4 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent-light">
                Besoins entrants
              </span>
              <span className="hidden text-[9px] font-medium uppercase tracking-[0.28em] text-text-tertiary sm:inline">
                6 besoins métier · multi-sources
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
                Actions sortantes
              </span>
              <span className="hidden text-[9px] font-medium uppercase tracking-[0.28em] text-text-tertiary sm:inline">
                5 actions · branchées sur vos outils
              </span>
            </div>

            <MobileDetailDrawer activeId={activeId} reduced={shouldReduceMotion} />
          </div>

          {enableHover && (
            <p className="mt-4 hidden text-center text-[11px] uppercase tracking-[0.22em] text-text-tertiary lg:block">
              Survolez un élément pour voir comment l&apos;agent le traite
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
              borderTop:
                "1.5px solid color-mix(in srgb, var(--color-accent-primary) 50%, transparent)",
              boxShadow:
                "0 -4px 32px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
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
                  color:
                    "color-mix(in srgb, var(--color-accent-primary) 70%, var(--color-accent-light) 30%)",
                }}
              >
                Comment l&apos;assistant analyse et agit
              </h3>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-5 text-sm text-text-secondary sm:grid-cols-2">
                {[
                  {
                    label: "Analyse de l'intention",
                    text: "Comprend la demande, choisit la bonne action, demande votre validation si la situation est ambiguë.",
                  },
                  {
                    label: "Connexion à vos outils",
                    text: "Branché sur vos outils existants : Gmail, CRM, Agenda, Notion, Slack, ERP — sans changer vos habitudes.",
                  },
                  {
                    label: "Garde-fous métier",
                    text: "Règles que vous définissez : périmètre, seuils de confiance, validation humaine sur les actions sensibles.",
                  },
                  {
                    label: "Historique & traçabilité",
                    text: "Chaque action est enregistrée, explicable, versionnable — vérifiable à tout moment.",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-accent-primary" aria-hidden>
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
