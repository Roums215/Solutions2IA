import { Link2, MessageSquare, PenLine, RefreshCw, type LucideIcon } from "lucide-react";

/**
 * La méthode de travail de l'accueil, en une seule section (LOT 3).
 *
 * Reprend la matière de `homeDeliveryFlow.ts` et de HomeApproachSplit, qui
 * racontaient la même chose à deux endroits : quatre étapes, ce qui ne change
 * jamais, et le détail technique replié au second niveau.
 *
 * Règle : une phrase courte par étape, une chose concrète que le client reçoit,
 * aucun terme technique nécessaire pour comprendre.
 */

export type MethodStep = {
  key: string;
  title: string;
  text: string;
  /** Ce que le client a en main à la fin de l'étape. */
  gives: string;
  icon: LucideIcon;
};

export const HOME_METHOD_STEPS: MethodStep[] = [
  {
    key: "comprendre",
    title: "Vous m'expliquez ce qui bloque",
    text: "Un premier échange, sans engagement. Je cherche où le temps se perd, pas ce que je pourrais vous vendre.",
    gives: "Un résumé écrit de ce que j'ai compris",
    icon: MessageSquare,
  },
  {
    key: "proposer",
    title: "Je conçois une première solution",
    text: "Je vous montre à quoi elle ressemblerait, en clair : ce que je construis, ce que ça change, le prix et le délai.",
    gives: "Une proposition chiffrée, sans jargon",
    icon: PenLine,
  },
  {
    key: "brancher",
    title: "Je la branche sur votre fonctionnement",
    text: "Je construis, puis je relie l'outil à ce que vous utilisez déjà. Vous ne changez pas vos habitudes pour lui.",
    gives: "Un outil en service, pris en main avec vous",
    icon: Link2,
  },
  {
    key: "ajuster",
    title: "Je mesure, je corrige, je fais évoluer",
    text: "On regarde ce que ça change dans votre semaine. J'ajuste ce qui coince, et je reste joignable ensuite.",
    gives: "Des ajustements après la mise en ligne",
    icon: RefreshCw,
  },
];

/** Ce qui ne change pas, quel que soit le projet. Repris de HomeApproachSplit. */
export const HOME_METHOD_COMMITMENTS = [
  "Un seul interlocuteur : celui qui comprend le besoin est celui qui construit",
  "Du code propre, qui reste à vous",
  "Réponse sous 24 h, premier échange gratuit",
];

export const HOME_METHOD_AUDIENCE =
  "Je travaille surtout avec des TPE et des PME, dans tous les secteurs. Ce qui compte, c'est le travail à enlever, pas le métier.";

/** Second niveau de lecture : replié, pour ceux qui veulent vérifier. */
export const HOME_METHOD_TECH_SUMMARY = "Voir comment c'est construit";

export const HOME_METHOD_TECH: { label: string; text: string }[] = [
  {
    label: "Sites et applications",
    text: "Next.js, React, TypeScript : les technologies des grandes plateformes, à l'échelle de votre projet. Hébergement rapide et sécurisé inclus.",
  },
  {
    label: "Automatisations",
    text: "Je relie vos outils existants entre eux (téléphonie, CRM, mails, facturation) via leurs portes de connexion officielles (API), orchestrées avec n8n.",
  },
  {
    label: "IA",
    text: "Des modèles éprouvés (Claude, Mistral), branchés sur vos documents quand il le faut, avec vos données hébergées en Europe.",
  },
];
