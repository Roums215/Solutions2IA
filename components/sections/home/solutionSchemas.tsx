"use client";

import { Fragment, type ReactNode } from "react";
import {
  BookOpenText,
  Cable,
  CalendarCheck2,
  CalendarDays,
  Check,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileCheck2,
  FileSearch,
  FileText,
  Files,
  FolderOpen,
  FormInput,
  GitBranch,
  MessagesSquare,
  PhoneCall,
  Quote,
  Send,
  SquareMousePointer,
  UserRound,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { BrandGlyph, CornerMark } from "@/components/shared/mockup/Glyphs";
import { EDGE, SURFACE } from "./homePalette";
import { SERVICE_COLOR } from "./homePalette";
import type { HomeSolutionId } from "./homeSolutionsData";

/**
 * Les cinq schémas métier de l'accueil : même design system, une topologie par
 * service. Une fourche pour le site, une miniature d'application, un moteur
 * rayonnant pour l'automatisation, une lecture de demande pour l'agent, une
 * convergence documentaire pour la mémoire.
 *
 * Les liaisons sont des segments de bordure posés aux centres exacts des cartes :
 * elles entrent dans les objets, elles ne s'arrêtent pas à côté. Aucun voyant,
 * aucune lumière, aucune animation.
 *
 * `tint` est la signature chromatique du service (famille de marque uniquement) :
 * elle teinte l'entrée, le moteur et le résultat, jamais la carte entière.
 */

export const SERVICE_TINT: Record<HomeSolutionId, string> = SERVICE_COLOR;

// LOT 4G : filet lisible. Les liaisons structurent le parcours, elles ne sont pas
// un détail de finition ; à 9 % d'encre elles disparaissaient sur le papier.
const LINE = "bg-paper-line-strong";
const mix = (tint: string, pct: number, over = "transparent") =>
  `color-mix(in oklab, ${tint} ${pct}%, ${over})`;

// ─── Briques communes ───────────────────────────────────────────────────────

type NodeRole = "source" | "process" | "result" | "doc";

function Node({
  icon,
  sub,
  label,
  detail,
  role,
  tint,
  className = "",
}: {
  icon: LucideIcon;
  sub?: LucideIcon;
  label: string;
  detail?: string;
  role: NodeRole;
  tint: string;
  className?: string;
}) {
  // LOT 4G : les trois niveaux ne se ressemblent plus. L'entrée est une feuille
  // blanche marquée à gauche, le traitement est surélevé (rayon plus grand, teinte
  // plus dense, ombre portée), le résultat est teinté mais reste à plat.
  const shape =
    role === "process"
      ? "rounded-xl px-3 py-2.5 shadow-[0_2px_8px_-3px_color-mix(in_oklab,var(--color-ink)_30%,transparent)]"
      : role === "doc"
        ? "rounded-md px-2 py-1.5"
        : "rounded-lg px-2.5 py-2 shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)]";

  const style =
    role === "process"
      ? { borderColor: mix(tint, 42), backgroundColor: mix(tint, 13) }
      : role === "result"
        ? { borderColor: mix(tint, 30), backgroundColor: mix(tint, 9) }
        : undefined;

  return (
    <div
      className={`relative flex items-center gap-2.5 border ${shape} ${
        style ? "" : "border-paper-line-strong bg-paper"
      } ${className}`}
      style={style}
    >
      {role === "source" && (
        <span aria-hidden className="absolute inset-y-1.5 left-0 w-[3px] rounded-full" style={{ backgroundColor: mix(tint, 55) }} />
      )}

      <BrandGlyph
        icon={icon}
        sub={sub}
        size={role === "doc" ? "sm" : "md"}
        role={role === "doc" ? "doc" : role === "process" ? "process" : "neutral"}
        tint={role === "source" || role === "process" || role === "result" ? tint : undefined}
      />
      <span className="min-w-0">
        <span className={`block leading-tight text-ink ${role === "doc" ? "text-[11px] font-medium" : "text-[11.5px] font-semibold"}`}>
          {label}
        </span>
        {detail && <span className="mt-0.5 block text-[10.5px] leading-tight text-ink-2">{detail}</span>}
      </span>
    </div>
  );
}

/** Segment vertical qui descend d'une carte à la suivante. */
function Stem({ height = "h-4" }: { height?: string }) {
  return (
    <span aria-hidden className={`relative mx-auto block w-px ${height} ${LINE}`}>
      <span className="absolute -bottom-px left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border-b border-r border-paper-line-strong bg-transparent" />
    </span>
  );
}

/** Pointe qui entre dans la carte suivante : le trait ne s'arrête jamais à côté. */
const HEAD = "h-1.5 w-1.5 rotate-45 border-paper-line-strong";

/** Fourche descendante : un tronc, une barre, un pied fléché par destination. */
function ForkDown({ columns }: { columns: number }) {
  const centers = Array.from({ length: columns }, (_, i) => ((i + 0.5) / columns) * 100);
  const first = centers[0];
  const last = centers[centers.length - 1];
  return (
    <div aria-hidden className="relative h-6">
      <span className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 ${LINE}`} />
      <span className={`absolute top-3 h-px ${LINE}`} style={{ left: `${first}%`, right: `${100 - last}%` }} />
      {centers.map((c) => (
        <Fragment key={c}>
          <span className={`absolute top-3 h-3 w-px ${LINE}`} style={{ left: `${c}%` }} />
          <span
            className={`absolute -bottom-px -translate-x-1/2 border-b border-r ${HEAD}`}
            style={{ left: `${c}%` }}
          />
        </Fragment>
      ))}
    </div>
  );
}

/** Liaison horizontale entrant dans la carte suivante. */
function Arrow({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative hidden h-px sm:block ${LINE} ${className}`}>
      <span className="absolute -right-px top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-r border-t border-paper-line-strong" />
    </span>
  );
}

/**
 * Peigne : plusieurs cartes d'un côté, une seule de l'autre.
 * LOT 4G : la pointe se pose là où le flux ARRIVE, une par carte quand le peigne
 * distribue (`out`). Avant, une pointe unique restait au milieu de la gouttière,
 * entre deux cartes, et ne désignait rien.
 */
function Comb({ rows, direction }: { rows: number; direction: "in" | "out" }) {
  const centers = Array.from({ length: rows }, (_, i) => ((i + 0.5) / rows) * 100);
  const first = centers[0];
  const last = centers[centers.length - 1];
  const out = direction === "out";
  return (
    <span aria-hidden className="relative hidden w-6 shrink-0 self-stretch sm:block">
      {/* Tronc commun, au milieu de la gouttière */}
      <span className={`absolute w-px ${LINE}`} style={{ top: `${first}%`, bottom: `${100 - last}%`, left: 12 }} />

      {/* Le brin de l'objet seul : il entre dans le tronc (out) ou en sort (in) */}
      <span className={`absolute h-px w-3 ${LINE}`} style={{ top: "50%", left: out ? 0 : 12 }} />
      {!out && <span className={`absolute right-0 top-1/2 -translate-y-1/2 border-r border-t ${HEAD}`} />}

      {/* Un brin par carte, fléché quand c'est elle qui reçoit */}
      {centers.map((c) => (
        <Fragment key={c}>
          <span className={`absolute h-px w-3 ${LINE}`} style={{ top: `${c}%`, left: out ? 12 : 0 }} />
          {out && (
            <span
              className={`absolute right-0 -translate-y-1/2 border-r border-t ${HEAD}`}
              style={{ top: `${c}%` }}
            />
          )}
        </Fragment>
      ))}
    </span>
  );
}

// ─── 1. Sites web : une entrée, deux destinations ───────────────────────────

export function SchemaSitesWeb({ tint }: { tint: string }) {
  return (
    <div className="mx-auto flex max-w-[32rem] flex-col">
      {/* L'entrée est le formulaire lui-même, pas une carte qui le nomme */}
      <div
        className="rounded-lg border bg-paper shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)]"
        style={{ borderColor: EDGE.source }}
      >
        <p className="flex items-center gap-2 border-b px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-2" style={{ borderColor: EDGE.soft }}>
          <FormInput size={12} strokeWidth={2} aria-hidden />
          Formulaire du site
        </p>
        <div className="space-y-1 p-2.5">
          {[["Société", "Entreprise B"], ["Besoin", "Devis raccordement"]].map(([k, v]) => (
            <p key={k} className="flex items-baseline justify-between gap-3 rounded-md px-2 py-1 text-[10.5px]" style={{ backgroundColor: SURFACE.muted }}>
              <span className="text-ink-2">{k}</span>
              <span className="font-medium text-ink">{v}</span>
            </p>
          ))}
          <p className="mt-1.5 flex items-center justify-center gap-1.5 rounded-md py-1.5 text-[10.5px] font-semibold text-paper" style={{ backgroundColor: `color-mix(in oklab, ${tint} 72%, var(--color-ink))` }}>
            <Send size={11} strokeWidth={2.25} aria-hidden />
            Envoyer la demande
          </p>
        </div>
      </div>
      <Stem />
      <Node icon={FileCheck2} label="Demande reçue" detail="complète et qualifiée" role="process" tint={tint} />
      <ForkDown columns={2} />
      <div className="grid grid-cols-2 gap-2.5">
        <Node icon={UserRound} label="Fiche client" detail="dans votre outil" role="result" tint={tint} />
        <Node icon={Send} label="Équipe prévenue" detail="mail, avec le détail" role="result" tint={tint} />
      </div>
    </div>
  );
}

// ─── 2. Applications : une miniature d'outil ────────────────────────────────

const APP_ROWS: { time: string; label: string; team: string; status: string; icon: LucideIcon }[] = [
  { time: "09:00", label: "Pose vitrine", team: "Équipe A", status: "Terminé", icon: FileCheck2 },
  { time: "10:30", label: "Métré", team: "Équipe B", status: "En cours", icon: Clock3 },
  { time: "14:00", label: "Livraison", team: "Équipe C", status: "Planifié", icon: CalendarCheck2 },
];

export function SchemaApplications({ tint }: { tint: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-paper-line-strong bg-paper shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)]">
      <div className="flex items-center gap-4 border-b border-paper-line-strong bg-gradient-to-b from-paper-3 to-paper-2 px-2.5 py-1.5" aria-hidden>
        {["Aujourd'hui", "Semaine", "Clients"].map((tab, i) => (
          <span
            key={tab}
            className={i === 0 ? "-mb-[7px] border-b-2 pb-1.5 text-[10.5px] font-semibold text-ink" : "text-[10.5px] text-ink-2"}
            style={i === 0 ? { borderColor: mix(tint, 70) } : undefined}
          >
            {tab}
          </span>
        ))}
        <span className="ml-auto text-[9.5px] text-ink-3">Jeudi 13 mars</span>
      </div>

      <ul className="divide-y divide-paper-line">
        {APP_ROWS.map((r, i) => {
          const selected = i === 1;
          const Icon = r.icon;
          return (
            <li
              key={r.label}
              className="relative flex items-center gap-2.5 px-2.5 py-1.5 text-[11px]"
              style={selected ? { backgroundColor: mix(tint, 7) } : undefined}
            >
              {selected && (
                <>
                  <span aria-hidden className="absolute inset-y-0 left-0 w-[3px]" style={{ backgroundColor: mix(tint, 75) }} />
                  <SquareMousePointer size={11} strokeWidth={2} className="shrink-0 text-ink-2" aria-hidden />
                </>
              )}
              <span className="font-mono text-[10px] text-ink-2">{r.time}</span>
              <span className="font-semibold text-ink">{r.label}</span>
              <span className="text-ink-2">{r.team}</span>
              <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md border border-paper-line bg-paper px-1.5 py-0.5 text-[9.5px] font-semibold text-ink-2">
                <Icon size={11} strokeWidth={2.25} aria-hidden />
                {r.status}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Le dossier ouvert, en sous-carte */}
      <div className="border-t border-paper-line-strong bg-paper-2 p-2.5">
        <div className="relative rounded-md border border-paper-line-strong bg-paper p-2.5 shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)]">
          <CornerMark className="absolute right-1.5 top-1.5" size={9} tint={tint} />
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-3">
            <FolderOpen size={11} strokeWidth={2} aria-hidden />
            Dossier ouvert
          </p>
          <p className="mt-1 text-[11.5px] font-semibold text-ink">Métré · Équipe B</p>
          <dl className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-0.5 border-t border-paper-line pt-1.5 text-[10.5px]">
            <div className="flex justify-between gap-2">
              <dt className="text-ink-2">Durée</dt>
              <dd className="font-medium text-ink">3 h 30</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-ink-2">Rapport</dt>
              <dd className="font-medium text-ink">Reçu du terrain</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

// ─── 3. Automatisation : un moteur central ──────────────────────────────────

export function SchemaAutomatisation({ tint }: { tint: string }) {
  const targets = [
    { icon: UserRound, label: "Client créé", detail: "fiche à jour" },
    { icon: Users, label: "Équipe informée", detail: "message interne" },
    { icon: CalendarCheck2, label: "Relance programmée", detail: "dans 7 jours" },
  ];

  return (
    <>
      {/* Desktop : entrée à gauche, moteur au centre, trois suites à droite */}
      <div className="hidden items-center sm:flex">
        <div className="flex-1">
          <Node icon={ClipboardCheck} label="Formulaire validé" detail="le déclencheur" role="source" tint={tint} />
        </div>
        <Arrow className="w-6" />
        <div className="w-[9.5rem] shrink-0">
          <Engine tint={tint} />
        </div>
        <Comb rows={3} direction="out" />
        <div className="flex flex-1 flex-col gap-2">
          {targets.map((t) => (
            <Node key={t.label} icon={t.icon} label={t.label} detail={t.detail} role="result" tint={tint} />
          ))}
        </div>
      </div>

      {/* Téléphone : même figure, de haut en bas */}
      <div className="flex flex-col sm:hidden">
        <Node icon={ClipboardCheck} label="Formulaire validé" detail="le déclencheur" role="source" tint={tint} />
        <Stem />
        <Engine tint={tint} />
        <ForkDown columns={3} />
        <div className="grid grid-cols-3 gap-1.5">
          {targets.map((t) => (
            <div key={t.label} className="rounded-lg border p-1.5 text-center" style={{ borderColor: mix(tint, 30), backgroundColor: mix(tint, 9) }}>
              <BrandGlyph icon={t.icon} size="sm" tint={tint} className="mx-auto" />
              <span className="mt-1 block text-[10px] font-semibold leading-tight text-ink">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Engine({ tint }: { tint: string }) {
  return (
    <div
      className="relative rounded-xl border px-3 py-2.5 text-center shadow-[0_2px_8px_-3px_color-mix(in_oklab,var(--color-ink)_30%,transparent)]"
      style={{ borderColor: mix(tint, 42), backgroundColor: mix(tint, 13) }}
    >
      <CornerMark className="absolute right-1.5 top-1.5" size={10} tint={tint} />
      <BrandGlyph icon={Workflow} size="md" tint={tint} className="mx-auto" />
      <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">Automatisation</span>
      <span className="mt-1.5 flex items-center justify-center gap-1.5 border-t pt-1.5 text-[10px] text-ink-2" style={{ borderColor: EDGE.soft }}>
        <GitBranch size={11} strokeWidth={2} aria-hidden />
        1 déclencheur · 3 actions
      </span>
    </div>
  );
}

// ─── 4. Agent IA : la demande, la compréhension, deux suites ────────────────

export function SchemaAgentIA({ tint }: { tint: string }) {
  const results = [
    { icon: CalendarCheck2, label: "Action préparée", detail: "rendez-vous proposé" },
    { icon: Send, label: "Réponse à valider", detail: "vous envoyez" },
  ];

  return (
    <>
      <div className="hidden items-center sm:flex">
        <div className="flex-1">
          <Message tint={tint} />
        </div>
        <Arrow className="w-6" />
        <div className="w-[9.5rem] shrink-0">
          <Understand tint={tint} />
        </div>
        <Comb rows={2} direction="out" />
        <div className="flex flex-1 flex-col gap-2">
          {results.map((r) => (
            <Node key={r.label} icon={r.icon} label={r.label} detail={r.detail} role="result" tint={tint} />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:hidden">
        <Message tint={tint} />
        <Stem />
        <Understand tint={tint} />
        <ForkDown columns={2} />
        <div className="grid grid-cols-2 gap-2">
          {results.map((r) => (
            <Node key={r.label} icon={r.icon} label={r.label} role="result" tint={tint} />
          ))}
        </div>
      </div>
    </>
  );
}

function Message({ tint }: { tint: string }) {
  return (
    <div className="rounded-lg rounded-bl-sm border border-paper-line-strong bg-paper p-2.5 shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)]">
      <div className="flex items-center gap-2">
        <BrandGlyph icon={PhoneCall} size="sm" role="source" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">Client · 18 h 42</span>
      </div>
      <p className="mt-1.5 flex gap-1.5 text-[11.5px] leading-snug text-ink">
        <Quote size={11} className="mt-0.5 shrink-0 text-ink-3" aria-hidden />
        Je voudrais un rendez-vous pour un devis.
      </p>
    </div>
  );
}

function Understand({ tint }: { tint: string }) {
  return (
    <div
      className="relative rounded-xl border px-3 py-2.5 text-center shadow-[0_2px_8px_-3px_color-mix(in_oklab,var(--color-ink)_30%,transparent)]"
      style={{ borderColor: mix(tint, 42), backgroundColor: mix(tint, 13) }}
    >
      <CornerMark className="absolute right-1.5 top-1.5" size={10} tint={tint} />
      <BrandGlyph icon={MessagesSquare} size="md" tint={tint} className="mx-auto" />
      <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">Lire la demande</span>
      <span className="mt-1.5 block border-t pt-1.5 text-[10px] leading-relaxed text-ink-2" style={{ borderColor: EDGE.soft }}>
        Comprendre · Préparer · Transmettre
      </span>
    </div>
  );
}

// ─── 5. Mémoire : plusieurs sources, une réponse ────────────────────────────

const DOCS = [
  { label: "Tarifs 2026", icon: FileText },
  { label: "Procédures", icon: BookOpenText },
  { label: "FAQ interne", icon: Files },
];

export function SchemaMemoire({ tint }: { tint: string }) {
  return (
    <>
      <div className="hidden items-stretch sm:flex">
        <div className="flex w-[8.5rem] shrink-0 flex-col justify-between gap-1.5">
          {DOCS.map((d, i) => (
            <div key={d.label} style={{ marginLeft: i * 5 }}>
              <Node icon={d.icon} label={d.label} role="doc" tint={tint} />
            </div>
          ))}
        </div>
        <Comb rows={3} direction="in" />
        <div className="flex w-[9rem] shrink-0 items-center">
          <Node icon={FileSearch} label="Recherche" detail="dans vos sources" role="process" tint={tint} className="w-full" />
        </div>
        <Arrow className="mt-auto mb-auto w-6" />
        <Answer tint={tint} className="flex-1" />
      </div>

      <div className="flex flex-col sm:hidden">
        <div className="grid grid-cols-3 gap-1.5">
          {DOCS.map((d) => (
            <Node key={d.label} icon={d.icon} label={d.label} role="doc" tint={tint} />
          ))}
        </div>
        <Stem />
        <Node icon={FileSearch} label="Recherche" detail="dans vos sources" role="process" tint={tint} />
        <Stem />
        <Answer tint={tint} />
      </div>
    </>
  );
}

function Answer({ tint, className = "" }: { tint: string; className?: string }) {
  return (
    <div
      className={`relative self-center rounded-lg border p-2.5 ${className}`}
      style={{ borderColor: mix(tint, 30), backgroundColor: mix(tint, 9) }}
    >
      <CornerMark className="absolute right-1.5 top-1.5" size={10} tint={tint} />
      <p className="flex gap-1.5 pr-4 text-[12px] font-semibold leading-snug text-ink">
        <Quote size={12} strokeWidth={2} className="mt-0.5 shrink-0 text-ink-3" aria-hidden />
        Retour accepté sous 30 jours, avec le bon de livraison.
      </p>
      <div className="mt-2 rounded-md border px-2 py-1.5" style={{ borderColor: EDGE.soft, backgroundColor: SURFACE.card }}>
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-3">Source</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-[10.5px] font-medium text-ink-2">
          <FileText size={11} strokeWidth={1.75} className="shrink-0" aria-hidden />
          Tarifs-2026.pdf · page 4
          <ExternalLink size={10} strokeWidth={2} className="ml-auto shrink-0 text-ink-3" aria-hidden />
        </p>
      </div>
    </div>
  );
}

// ─── Aiguillage ─────────────────────────────────────────────────────────────

export function SolutionSchema({ id, tint }: { id: HomeSolutionId; tint: string }): ReactNode {
  switch (id) {
    case "sites-web":
      return <SchemaSitesWeb tint={tint} />;
    case "applications":
      return <SchemaApplications tint={tint} />;
    case "automatisation":
      return <SchemaAutomatisation tint={tint} />;
    case "agents-ia":
      return <SchemaAgentIA tint={tint} />;
    case "rag":
      return <SchemaMemoire tint={tint} />;
  }
}
