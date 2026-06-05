import type { RagUsageKey } from "./ragUsagesData";

export type DecisionAnswer = "a" | "b";

export type DecisionQuestion = {
  id: "q1" | "q2" | "q3";
  question: string;
  optionA: { value: DecisionAnswer; label: string };
  optionB: { value: DecisionAnswer; label: string };
};

export const DECISION_QUESTIONS: DecisionQuestion[] = [
  {
    id: "q1",
    question:
      "Vos équipes posent surtout une question précise OU explorent un dossier en plusieurs étapes ?",
    optionA: { value: "a", label: "Question précise" },
    optionB: { value: "b", label: "Exploration multi-étapes" },
  },
  {
    id: "q2",
    question:
      "Vos documents sont concentrés dans un seul outil OU dispersés (Drive + CRM + Notion + SQL) ?",
    optionA: { value: "a", label: "Concentrés" },
    optionB: { value: "b", label: "Dispersés" },
  },
  {
    id: "q3",
    question:
      "Vos documents changent rarement (procédures stables) OU fréquemment (normes, fiches produit, règlement) ?",
    optionA: { value: "a", label: "Rares changements" },
    optionB: { value: "b", label: "Changements fréquents" },
  },
];

type Reco = {
  usage: RagUsageKey;
  label: string;
  rationale: string;
};

// Deterministic truth table — 8 combinaisons → 1 reco.
// Clé : q1+q2+q3 (a/b chaque)
const TRUTH_TABLE: Record<string, Reco> = {
  aaa: {
    usage: "simple",
    label: "Répondre",
    rationale:
      "Question précise + corpus concentré + docs stables : la mémoire la plus directe vous suffit.",
  },
  aab: {
    usage: "auto-enrichi",
    label: "Maintenir à jour",
    rationale:
      "Question précise mais documentation vivante : il faut surtout que la mémoire suive vos mises à jour.",
  },
  aba: {
    usage: "multi-source",
    label: "Croiser",
    rationale:
      "Vos sources sont dispersées : la mémoire doit savoir interroger plusieurs corpus simultanément.",
  },
  abb: {
    usage: "multi-source",
    label: "Croiser (avec maintien à jour)",
    rationale:
      "Sources dispersées + changements fréquents : Croiser + synchronisation continue.",
  },
  baa: {
    usage: "conversationnel",
    label: "Explorer",
    rationale:
      "Vos équipes creusent un sujet en plusieurs questions enchaînées : la mémoire doit garder le fil.",
  },
  bab: {
    usage: "conversationnel",
    label: "Explorer (avec maintien à jour)",
    rationale:
      "Exploration + documentation vivante : Explorer + synchronisation pour ne jamais citer une version périmée.",
  },
  bba: {
    usage: "multi-source",
    label: "Croiser",
    rationale:
      "Exploration sur sources dispersées : Croiser couvre le besoin, vous pouvez relancer la mémoire.",
  },
  bbb: {
    usage: "conversationnel",
    label: "Orchestration sur mesure",
    rationale:
      "Exploration + dispersion + changements fréquents : tous les usages combinés, à concevoir avec nous.",
  },
};

export function recommendUsage(
  q1: DecisionAnswer,
  q2: DecisionAnswer,
  q3: DecisionAnswer,
): Reco {
  return TRUTH_TABLE[`${q1}${q2}${q3}`] ?? TRUTH_TABLE.aaa;
}

export const DEFAULT_RECO = recommendUsage("a", "a", "a");
