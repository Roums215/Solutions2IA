import { Contact, FileText, StickyNote, type LucideIcon } from "lucide-react";

/**
 * Hero de /rag (refonte d'octobre 2026) : une démonstration sur des documents d'exemple,
 * signalée comme telle. Trois questions réelles de PME (RH, comptabilité, immobilier) :
 * la mémoire cherche dans les documents, retrouve deux passages, répond, cite sa page,
 * et l'extrait s'ouvre avec la phrase surlignée. Aucune métrique, aucun temps affiché.
 *
 * Les réponses reprennent des règles exactes (Code du travail L3142-4 pour le mariage,
 * loi du 6 juillet 1989 pour le préavis en zone tendue) ; le seuil d'achat est une règle
 * interne inventée pour l'exemple, et présentée comme telle (« note interne »).
 */

export type RagDoc = { id: string; name: string; origin: string; icon: LucideIcon };

export const RAG_DOCS: RagDoc[] = [
  { id: "rh", name: "Procédure_RH.pdf", origin: "SharePoint", icon: FileText },
  { id: "ccn", name: "Convention_collective.pdf", origin: "Drive", icon: FileText },
  { id: "achats", name: "Procédure_achats.pdf", origin: "Drive", icon: FileText },
  { id: "note", name: "Note interne du 18/05", origin: "Notion", icon: StickyNote },
  { id: "bail", name: "Bail_Réf-128.pdf", origin: "Drive", icon: FileText },
  { id: "client", name: "Fiche client · Martin", origin: "Fichier clients", icon: Contact },
  { id: "reglement", name: "Règlement_intérieur.pdf", origin: "SharePoint", icon: FileText },
];

export type RagScenario = {
  key: string;
  /** Bouton de l'ordinateur (domaine · sujet) et du téléphone (domaine seul). */
  chip: string;
  chipShort: string;
  question: string;
  /** Documents retenus, dans l'ordre des passages ; le premier est la page ouverte. */
  found: [string, string];
  passages: [string, string];
  page: { doc: string; ref: string; before: string; mark: string; after: string };
  answer: string;
  citations: [string, string];
  result: [string, string];
};

export const RAG_SCENARIOS: RagScenario[] = [
  {
    key: "rh",
    chip: "RH · congés",
    chipShort: "RH",
    question: "Combien de jours de congé pour le mariage d'un salarié ?",
    found: ["rh", "ccn"],
    passages: ["§3.2 Événements familiaux", "Article 25"],
    page: {
      doc: "Procédure_RH.pdf",
      ref: "page 12",
      before: "3.2 Événements familiaux. Ces absences sont rémunérées.",
      mark: "Mariage ou PACS du salarié : 4\u00a0jours, sur justificatif fourni dans le mois.",
      after: "Mariage d'un enfant : 1 jour.",
    },
    answer:
      "4 jours d'absence rémunérée, sur justificatif fourni dans le mois. Votre convention collective peut prévoir plus : l'article 25 est joint.",
    citations: ["Procédure_RH.pdf · p. 12", "Convention_collective.pdf · art. 25"],
    result: ["La réponse arrive avec sa page.", "Personne n'a été dérangé."],
  },
  {
    key: "achats",
    chip: "Compta · achats",
    chipShort: "Comptabilité",
    question: "À partir de quel montant un achat doit-il être validé ?",
    found: ["note", "achats"],
    passages: ["Seuils de validation", "§2, version de mars"],
    page: {
      doc: "Note interne du 18/05",
      ref: "Notion · Achats",
      before: "Objet : seuils de validation des achats.",
      mark: "À compter du 1er juin, le seuil passe de 1\u00a0000\u00a0€ à 1\u00a0500\u00a0€\u00a0HT.",
      after: "La procédure achats sera mise à jour.",
    },
    answer:
      "Au-delà de 1\u00a0500\u00a0€\u00a0HT, la direction valide avant la commande. En dessous, le responsable d'équipe suffit. La procédure disait 1\u00a0000\u00a0€ : la note du 18/05 l'a remplacée.",
    citations: ["Note interne du 18/05", "Procédure_achats.pdf · p. 3"],
    result: ["La règle en vigueur,", "pas l'ancienne version."],
  },
  {
    key: "bail",
    chip: "Immobilier · bail",
    chipShort: "Immobilier",
    question: "M. Martin peut-il partir avant la fin de son bail ?",
    found: ["bail", "client"],
    passages: ["Clause 7.2 Congé du locataire", "Adresse du logement"],
    page: {
      doc: "Bail_Réf-128.pdf",
      ref: "page 7",
      before: "7.2 Congé. Le locataire peut donner congé à tout moment.",
      mark: "Préavis de trois mois, réduit à un mois en zone tendue.",
      after: "Le délai court à réception du courrier.",
    },
    answer:
      "Oui, à tout moment. Son préavis est d'un mois et non de trois : d'après sa fiche, le logement est à Lyon\u00a03e, en zone tendue.",
    citations: ["Bail_Réf-128.pdf · clause 7.2", "Fiche client · Martin"],
    result: ["Deux sources croisées,", "une réponse nette."],
  },
];

export const RAG_SCENE_LABEL =
  "Démonstration sur des documents d'exemple : une question, la recherche dans sept documents, deux passages retrouvés, puis la réponse avec sa source et l'extrait surligné.";

/** Temps internes d'une question (secondes depuis son début). */
export const T = {
  question: 0.15,
  search: 1.1,
  found: 2.6,
  answer: 3.2,
  page: 4.5,
  mark: 5.1,
  result: 5.6,
} as const;

/** Durée d'une question avant la suivante, en lecture automatique. */
export const SCENARIO_DURATION = 10_500;
