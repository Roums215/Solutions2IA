/**
 * Rôles colorimétriques de l'accueil (LOT 4F) : une famille bleue dérivée des tokens
 * existants, jamais une palette parallèle. Tout passe par `color-mix` sur
 * `--color-ink` (bleu nuit), `--color-accent-primary` / `--color-accent-dark`
 * (indigo de marque) et `--color-cyan` (bleu clair froid).
 *
 * Le violet ne sert plus de couleur par défaut : il ne reste qu'en accent ponctuel.
 */

const mix = (color: string, pct: number, over: string) =>
  `color-mix(in oklab, ${color} ${pct}%, ${over})`;

const INK = "var(--color-ink)";
const INDIGO = "var(--color-accent-primary)";
const CYAN = "var(--color-cyan)";
const PAPER = "var(--color-paper)";

/**
 * Surfaces claires, de la carte principale à ses sous-zones.
 * LOT 4G : chaque valeur monte de 2 à 5 points. Les aplats blancs manquaient de
 * relief et les trois niveaux (source, traitement, résultat) se ressemblaient.
 * On reste sous le seuil où le fond volerait l'attention au texte.
 */
export const SURFACE = {
  /** Blanc légèrement froid : la grande carte. */
  card: mix(INDIGO, 3, PAPER),
  /** En-tête de carte, à peine teinté. */
  header: mix(INDIGO, 8, PAPER),
  /** Sous-carte « source » : bleu très pâle. */
  source: mix(INDIGO, 7, PAPER),
  /** Sous-carte « traitement » : indigo très léger. */
  process: mix(INDIGO, 13, PAPER),
  /** Sous-carte « résultat » : bleu ciel froid. */
  result: mix(CYAN, 14, PAPER),
  /** Zone neutre, lavande froide plutôt que gris (état « aujourd'hui »). */
  muted: mix(INDIGO, 6, mix(INK, 4, PAPER)),
};

/** Bordures et filets : bleu-gris, jamais gris neutre. */
export const EDGE = {
  soft: mix(INK, 13, "transparent"),
  medium: mix(INK, 22, "transparent"),
  source: mix(INDIGO, 30, "transparent"),
  process: mix(INDIGO, 40, "transparent"),
  result: mix(CYAN, 45, "transparent"),
};

/** Encres : le texte reste bleu nuit, les icônes prennent l'indigo de marque. */
export const INK_ON_LIGHT = {
  strong: INK,
  soft: "var(--color-ink-2)",
  accent: mix(INDIGO, 70, INK),
  cool: mix(CYAN, 55, INK),
};

/** Signature de service : famille bleue, du cyan au bleu profond. */
export const SERVICE_COLOR = {
  "sites-web": CYAN,
  applications: INDIGO,
  automatisation: mix(INDIGO, 70, INK),
  "agents-ia": mix(INDIGO, 60, CYAN),
  rag: mix(INK, 55, INDIGO),
} as const;

export const tint = mix;
