import { ClipboardList, FolderOpen, ListChecks, Plug, Quote, ScanText, Search, SlidersHorizontal, Users, type LucideIcon } from "lucide-react";
import type { StackStep } from "@/components/shared/StepStack";

/**
 * Contenu des sections de /rag (refonte d'octobre 2026), séparé du rendu.
 * Les garanties et la pile technique restent dans `ragDataControlData.ts`.
 */

// ─── Votre calcul ────────────────────────────────────────────────────────────

export const CALC_DAYS = 220;

/** Objectif vérifié à la validation (étape 4) : une réponse sourcée en moins de 30 secondes. */
export const CALC_TARGET_MIN = 0.5;

export const CALC_DEFAULTS = { people: 10, perDay: 5, minutes: 8, share: 50, cost: 35 };

export const CALC_NOTE =
  "Estimation à partir de vos chiffres, sur 220 jours travaillés par an. Les 30 secondes par recherche sont l'objectif que l'on vérifie ensemble sur 20 vraies questions de vos équipes, avant la mise en main.";

// ─── Comment ça marche ───────────────────────────────────────────────────────

export type HowStep = { n: string; icon: LucideIcon; title: string; text: string };

export const HOW_STEPS: HowStep[] = [
  {
    n: "01",
    icon: FolderOpen,
    title: "Vos documents restent où ils sont",
    text: "Drive, SharePoint, Notion, fichier clients : je branche la mémoire dessus, sans rien déplacer ni réécrire.",
  },
  {
    n: "02",
    icon: ScanText,
    title: "Elle les lit, avec vos droits",
    text: "Chaque document est découpé en passages et rangé. Chacun ne verra que ce qu'il a déjà le droit de voir.",
  },
  {
    n: "03",
    icon: Search,
    title: "Une question, les bons passages",
    text: "Elle cherche par le sens, pas seulement par mot-clé, dans tous vos outils à la fois.",
  },
  {
    n: "04",
    icon: Quote,
    title: "Une réponse, avec sa page",
    text: "Elle répond à partir des passages retrouvés et cite le document. Sans source, elle le dit.",
  },
];

/** Le même mécanisme en plan + pile d'objets (StepStack) : ce que produit chaque temps. */
export const HOW_STACK: StackStep[] = [
  { key: "docs", title: HOW_STEPS[0].title, text: HOW_STEPS[0].text, object: { icon: FolderOpen, kind: "Vos outils", title: "Drive, SharePoint, Notion", lines: [{ text: "Rien à déplacer", done: true }, { text: "Rien à réécrire", done: true }] } },
  { key: "lecture", title: HOW_STEPS[1].title, text: HOW_STEPS[1].text, object: { icon: ScanText, kind: "Lecture", title: "Découpé en passages", lines: [{ text: "Droits d'accès repris", done: true }, { text: "Chacun voit ce qu'il voit déjà" }] } },
  {
    key: "recherche",
    title: HOW_STEPS[2].title,
    text: HOW_STEPS[2].text,
    object: { icon: Search, kind: "Recherche", title: "« Quel préavis pour ce bail ? »", lines: [{ text: "Bail_Réf-128.pdf · clause 7.2", done: true }, { text: "Fiche client · Martin", done: true }] },
  },
  {
    key: "reponse",
    title: HOW_STEPS[3].title,
    text: HOW_STEPS[3].text,
    object: { icon: Quote, kind: "Réponse", title: "Un mois : zone tendue.", badge: "citée", tone: "ink", lines: [{ text: "Source : Bail_Réf-128.pdf · p. 7" }] },
  },
];

export const HOW_LOOP = "Un document change ? La nouvelle version est reprise, l'ancienne reste consultable.";

export const TECH_NOTE =
  "Recherche hybride (par le sens et par mot-clé), reclassement des passages, seuil de confiance sous lequel la mémoire préfère dire qu'elle ne sait pas. Le modèle de langue se choisit selon vos contraintes d'hébergement.";

// ─── Ce qu'elle ne fait pas ──────────────────────────────────────────────────

export type Limit = { title: string; text: string };

export const LIMITS: Limit[] = [
  {
    title: "Elle ne remplace pas l'expertise.",
    text: "Elle retrouve l'information et la cite. Le jugement métier reste à vos équipes : c'est pour ça que la source est toujours là.",
  },
  {
    title: "Elle dépend de vos documents.",
    text: "Si une procédure est périmée, la réponse aussi. On repère ensemble les vieilles versions au démarrage, mais le tri reste votre décision.",
  },
  {
    title: "Elle ne cite pas toujours une seule page.",
    text: "Pour une synthèse ou une comparaison, elle s'appuie sur plusieurs documents. La liste des sources reste consultable, une par une.",
  },
];

export const REFUSAL = {
  question: "Quel est le budget formation prévu pour 2027 ?",
  answer: "Je ne trouve pas cette information dans vos documents. Le plus proche : Plan_formation_2026.pdf, qui ne couvre que 2026.",
  note: "Une IA généraliste aurait répondu quand même. La mémoire, elle, ne répond qu'avec vos documents.",
};

// ─── On démarre ──────────────────────────────────────────────────────────────

export type StartStep = { n: string; title: string; text: string };

export const START_PATH: StartStep[] = [
  { n: "01", title: "Inventaire", text: "Vos documents, les sources prioritaires, qui a accès à quoi." },
  { n: "02", title: "Branchement", text: "La mémoire se relie à vos outils. Vos documents restent chez vous." },
  { n: "03", title: "Réglage", text: "Elle apprend votre vocabulaire ; premières questions testées avec vous." },
  { n: "04", title: "20 vraies questions", text: "Vos équipes posent les leurs. J'ajuste jusqu'à ce que chaque réponse soit juste et sourcée." },
  { n: "05", title: "Mise en main", text: "Un atelier par équipe, puis un suivi pour ajuster." },
];

/** Le démarrage en plan de projet + pile d'objets (StepStack). */
export const START_STACK: StackStep[] = [
  {
    key: "inventaire",
    title: START_PATH[0].title,
    text: START_PATH[0].text,
    gives: "la carte de votre savoir",
    object: { icon: ClipboardList, kind: "Inventaire", title: "La carte de vos documents", lines: [{ text: "Sources prioritaires" }, { text: "Qui a accès à quoi" }] },
  },
  {
    key: "branchement",
    title: START_PATH[1].title,
    text: START_PATH[1].text,
    gives: "vos outils reliés",
    object: { icon: Plug, kind: "Branchement", title: "Vos outils reliés", lines: [{ text: "Drive", done: true }, { text: "SharePoint", done: true }, { text: "Notion", done: true }] },
  },
  {
    key: "reglage",
    title: START_PATH[2].title,
    text: START_PATH[2].text,
    gives: "votre vocabulaire appris",
    object: { icon: SlidersHorizontal, kind: "Réglage", title: "Votre vocabulaire", lines: [{ text: "Premières questions testées" }, { text: "Avec vous" }] },
  },
  {
    key: "questions",
    title: START_PATH[3].title,
    text: START_PATH[3].text,
    gives: "des réponses justes et sourcées",
    object: { icon: ListChecks, kind: "Validation", title: "20 vraies questions", lines: [{ text: "Juste", done: true }, { text: "Sourcée", done: true }, { text: "En moins de 30 secondes", done: true }] },
  },
  {
    key: "main",
    title: START_PATH[4].title,
    text: START_PATH[4].text,
    gives: "vos équipes prêtes à s'en servir",
    object: { icon: Users, kind: "Mise en main", title: "Atelier de 90 minutes", tone: "ink", lines: [{ text: "Par équipe" }, { text: "Puis 30 jours de suivi" }] },
  },
];

export const START_TERMS = [
  { label: "Validée sur 20 questions", detail: "les vôtres, avant la mise en main" },
  { label: "Moins de 30 secondes", detail: "pour une réponse sourcée, vérifié à la validation" },
  { label: "Atelier de 90 minutes", detail: "par équipe, sur ses propres questions" },
  { label: "30 jours de suivi", detail: "après la mise en main, pour ajuster" },
];

export const START_PRICE = {
  value: "Sur devis",
  line: "Chiffré après un premier échange gratuit, selon le nombre de sources et d'équipes. Mise en place en 4 à 6 semaines.",
};
