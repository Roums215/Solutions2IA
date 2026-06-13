export type RagSource = {
  name: string;
  status: string;
  isProof?: boolean;
};

export type RagRelevance = "haute" | "moyenne" | "complémentaire";

export type RagPassage = {
  doc: string;
  section: string;
  excerpt: string;
  relevance: RagRelevance;
  isMatch?: boolean;
};

export const RAG_SOURCES: RagSource[] = [
  { name: "Procédure_RH.pdf", status: "utilisé", isProof: true },
  { name: "Drive", status: "synchronisé" },
  { name: "Notion", status: "connecté" },
  { name: "SharePoint", status: "à jour" },
];

export const RAG_QUERY =
  "Combien de jours d'absence pour le mariage d'un salarié ?";

export const RAG_PASSAGES: RagPassage[] = [
  {
    doc: "Procédure_RH.pdf",
    section: "§3 Congés exceptionnels",
    excerpt:
      "« Plusieurs jours d'absence rémunérée pour le mariage du salarié, sur justificatif fourni dans le délai prévu. »",
    relevance: "haute",
    isMatch: true,
  },
  {
    doc: "Convention_Syntec.pdf",
    section: "Art. 25",
    excerpt:
      "« ... congés exceptionnels prévus pour événements familiaux ... »",
    relevance: "moyenne",
  },
  {
    doc: "Règlement_intérieur.pdf",
    section: "§2.4",
    excerpt: "« ... absences autorisées sur justificatif ... »",
    relevance: "complémentaire",
  },
];

export const RAG_SYNTHESIS =
  "D'après la procédure interne connectée, plusieurs jours d'absence rémunérée pour le mariage du salarié, sur justificatif. À confirmer selon votre convention collective.";

export const RAG_CITATION = {
  file: "Procédure_RH.pdf",
  page: 12,
};

export const RAG_MEMORY_META = {
  passagesLabel: "Vos documents indexés",
  sourcesLabel: "4 sources connectées",
};

export function relevanceLabel(r: RagRelevance): string {
  switch (r) {
    case "haute":
      return "Source principale";
    case "moyenne":
      return "Référence associée";
    case "complémentaire":
      return "Référence complémentaire";
  }
}

export function relevanceQuality(r: RagRelevance): string {
  switch (r) {
    case "haute":
      return "Pertinence forte";
    case "moyenne":
      return "Pertinence moyenne";
    case "complémentaire":
      return "Référence complémentaire";
  }
}
