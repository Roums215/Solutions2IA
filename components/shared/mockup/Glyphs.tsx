import type { LucideIcon } from "lucide-react";

/**
 * Grammaire iconographique de Solutions 2IA.
 *
 * Une icône Lucide posée dans un carré arrondi reste générique : ici, chaque
 * pictogramme est COMPOSÉ (icône principale + petit élément secondaire en coin),
 * et le rôle de l'objet se lit dans la surface et la bordure, pas dans la couleur.
 *
 * Le motif de marque est un angle à double trait (`CornerMark`) : on le retrouve sur
 * les objets de résultat, les numéros de section et les en-têtes de schéma. Un seul
 * motif, quelques emplacements.
 */

export type GlyphRole = "source" | "process" | "action" | "result" | "doc" | "neutral";
export type GlyphSize = "sm" | "md" | "lg";

const BOX: Record<GlyphSize, string> = {
  sm: "h-6 w-6 rounded-md",
  md: "h-8 w-8 rounded-lg",
  lg: "h-10 w-10 rounded-xl",
};
const ICON: Record<GlyphSize, number> = { sm: 12, md: 15, lg: 18 };
const SUB_BOX: Record<GlyphSize, string> = {
  sm: "h-3 w-3 rounded-[4px] -bottom-0.5 -right-0.5",
  md: "h-3.5 w-3.5 rounded-[5px] -bottom-1 -right-1",
  lg: "h-4 w-4 rounded-[6px] -bottom-1 -right-1",
};
const SUB_ICON: Record<GlyphSize, number> = { sm: 7, md: 9, lg: 10 };

/** Surfaces par rôle : une source, un traitement et un résultat ne se ressemblent pas. */
const ROLE: Record<GlyphRole, string> = {
  source: "bg-paper-2 text-ink-2 ring-1 ring-paper-line",
  process: "bg-accent-primary/12 text-accent-dark",
  action: "bg-accent-primary/10 text-accent-dark",
  result: "bg-cyan/15 text-ink",
  doc: "bg-paper text-ink-2 ring-1 ring-paper-line",
  neutral: "bg-paper-2 text-ink-2",
};

export function BrandGlyph({
  icon: Icon,
  sub: Sub,
  role = "neutral",
  size = "md",
  tint,
  className = "",
}: {
  icon: LucideIcon;
  /** Petit pictogramme secondaire, en coin : c'est lui qui donne la personnalité. */
  sub?: LucideIcon;
  role?: GlyphRole;
  size?: GlyphSize;
  /** Couleur de service (variable CSS), sinon la couleur du rôle. */
  tint?: string;
  className?: string;
}) {
  const tinted = tint
    ? {
        backgroundColor: `color-mix(in oklab, ${tint} 12%, transparent)`,
        color: `color-mix(in oklab, ${tint} 62%, var(--color-ink))`,
      }
    : undefined;

  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center ${BOX[size]} ${tint ? "" : ROLE[role]} ${className}`}
      style={tinted}
      aria-hidden
    >
      <Icon size={ICON[size]} strokeWidth={1.75} />
      {Sub && (
        <span
          className={`absolute grid place-items-center border border-paper bg-paper text-ink-2 ${SUB_BOX[size]}`}
        >
          <Sub size={SUB_ICON[size]} strokeWidth={2.25} />
        </span>
      )}
    </span>
  );
}

/**
 * Motif de marque : un angle à double trait. Posé sur un coin, il signe un objet
 * sans ajouter ni couleur ni lumière.
 */
export function CornerMark({
  className = "",
  size = 12,
  tint,
}: {
  className?: string;
  size?: number;
  tint?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={className}
      style={tint ? { color: `color-mix(in oklab, ${tint} 55%, transparent)` } : undefined}
    >
      <path d="M11 1 H1 V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 4.6 H4.6 V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}
