"use client";

import type { ReactNode } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";

/**
 * Schémas métier sur surface papier : des objets encadrés et leurs relations.
 *
 * Complète AppMockup (qui montre des écrans : tableaux, formulaires, brouillons)
 * avec ce qu'il lui manquait : une entrée, un traitement, et ce qui en sort, parfois
 * vers plusieurs destinations. Aucun voyant, aucune pastille d'état, aucune lumière :
 * la lecture tient aux cadres, aux liaisons et au texte.
 *
 * Hiérarchie de rayons du site : grande carte `rounded-2xl` → sous-carte
 * `rounded-xl` → élément fonctionnel `rounded-lg`.
 */

export type FlowCard = {
  label: string;
  detail?: string;
  icon: LucideIcon;
  /** Objet d'arrivée : il se lit en premier dans la figure. */
  result?: boolean;
};

// LOT 4G : les liaisons se voient. Un filet à 9 % d'encre disparaissait sur le papier,
// et la figure semblait faite de cartes posées côte à côte sans parcours.
const LINE = "bg-paper-line-strong";

/** Un objet métier encadré. */
export function FlowNode({ card, className = "" }: { card: FlowCard; className?: string }) {
  const Icon = card.icon;
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 ${
        card.result ? "border-accent-primary/25 bg-accent-primary/6" : "border-paper-line bg-paper"
      } ${className}`}
    >
      <span
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ${
          card.result ? "bg-accent-primary/12 text-accent-dark" : "bg-paper-2 text-ink-2"
        }`}
        aria-hidden
      >
        <Icon size={14} strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block text-[11.5px] font-semibold leading-tight text-ink">{card.label}</span>
        {card.detail && <span className="mt-0.5 block text-[10.5px] leading-tight text-ink-2">{card.detail}</span>}
      </span>
    </div>
  );
}

/**
 * Une entrée, éventuellement un traitement, puis une ou plusieurs sorties.
 * Horizontal dès `sm`, empilé en dessous : la même figure se lit dans les deux sens.
 */
export function FlowBranch({
  source,
  hub,
  targets,
}: {
  source: FlowCard;
  hub?: FlowCard;
  targets: FlowCard[];
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
      <div className="sm:flex-1">
        <FlowNode card={source} />
      </div>

      <Link vertical />

      {hub && (
        <>
          <div className="sm:w-[10rem] sm:shrink-0">
            <FlowNode card={hub} />
          </div>
          <Link vertical />
        </>
      )}

      {/* Les sorties : liaison en fourche dès sm */}
      <div className="relative flex flex-col gap-2 sm:flex-1 sm:pl-4">
        {targets.length > 1 && (
          <span
            aria-hidden
            className={`absolute left-0 top-[1.125rem] bottom-[1.125rem] hidden w-px sm:block ${LINE}`}
          />
        )}
        {targets.map((t) => (
          <div key={t.label} className="relative">
            <span aria-hidden className={`absolute -left-4 top-1/2 hidden h-px w-4 sm:block ${LINE}`} />
            <FlowNode card={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Liaison entre deux groupes : trait court et chevron, sobre. */
function Link({ vertical = false }: { vertical?: boolean }) {
  return (
    <span aria-hidden className="flex items-center justify-center py-0.5 sm:px-1.5 sm:py-0">
      <span className={`hidden h-px w-3 sm:block ${LINE}`} />
      <ChevronRight
        size={12}
        strokeWidth={2}
        className={`text-ink-3 ${vertical ? "rotate-90 sm:rotate-0" : ""}`}
      />
      <span className={`hidden h-px w-3 sm:block ${LINE}`} />
    </span>
  );
}

/** Groupe de documents légèrement superposés, puis une lecture, puis la réponse. */
export function DocsAnswer({
  docs,
  search,
  answer,
}: {
  docs: { label: string; icon: LucideIcon }[];
  search: FlowCard;
  answer: { text: string; source: string; action: string };
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
      {/* Les sources, empilées */}
      <div className="sm:w-[9rem] sm:shrink-0">
        <div className="space-y-1">
          {docs.map((d, i) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="flex items-center gap-2 rounded-lg border border-paper-line bg-paper px-2 py-1.5"
                style={{ marginLeft: i * 6 }}
              >
                <Icon size={12} strokeWidth={1.75} className="shrink-0 text-ink-2" aria-hidden />
                <span className="truncate text-[11px] font-medium text-ink">{d.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Link vertical />

      <div className="sm:w-[10rem] sm:shrink-0">
        <FlowNode card={search} />
      </div>

      <Link vertical />

      {/* La réponse, avec sa source et son document */}
      <div className="rounded-lg border border-accent-primary/25 bg-accent-primary/6 p-2.5 sm:flex-1">
        <p className="text-[11.5px] font-semibold leading-snug text-ink">{answer.text}</p>
        <p className="mt-1.5 border-t border-paper-line pt-1.5 text-[10.5px] text-ink-2">{answer.source}</p>
        <p className="mt-1 text-[10.5px] font-medium text-accent-dark">{answer.action}</p>
      </div>
    </div>
  );
}

/** Le trajet actuel, en toutes lettres : « Mail › Tableur › Logiciel › Devis ». */
export function ChainRow({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-1 gap-y-1 ${className}`}>
      {items.map((item, i) => (
        <span key={item} className="inline-flex items-center gap-1">
          {i > 0 && <ChevronRight size={12} strokeWidth={2} className="shrink-0 text-ink-3" aria-hidden />}
          <span>{item}</span>
        </span>
      ))}
    </p>
  );
}

/** Cadre de sous-carte avec en-tête : « Ce qui se passe · sans ressaisie ». */
export function SchemaFrame({
  title,
  aside,
  tint,
  children,
}: {
  title: string;
  aside?: string;
  /** Teinte de service : elle colore l'en-tête du schéma, pas son contenu. */
  tint?: string;
  children: ReactNode;
}) {
  return (
    // LOT 4G : surface de travail légèrement creusée, en-tête refermé par un filet.
    // Les objets du schéma (blancs) se posent dessus au lieu de flotter.
    <div
      className="rounded-xl border border-paper-line-strong bg-paper-2 p-3 shadow-[inset_0_2px_4px_-2px_color-mix(in_oklab,var(--color-ink)_16%,transparent)]"
      style={tint ? { borderColor: `color-mix(in oklab, ${tint} 24%, var(--color-paper-line-strong))` } : undefined}
    >
      <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-paper-line pb-2">
        <p className="text-[11.5px] font-semibold text-ink">{title}</p>
        {aside && <span className="shrink-0 text-[10px] text-ink-2">{aside}</span>}
      </div>
      {children}
    </div>
  );
}
