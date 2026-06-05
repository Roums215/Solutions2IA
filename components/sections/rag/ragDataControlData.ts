export type RagGuarantee = {
  title: string;
  detail: string;
};

export const RAG_GUARANTEES: RagGuarantee[] = [
  {
    title: "Sources vérifiables",
    detail:
      "Chaque réponse peut afficher ses sources — cliquables jusqu'au document, à la page, à l'extrait. La traçabilité est intégrée, jamais une promesse vague.",
  },
  {
    title: "Permissions respectées",
    detail:
      "La mémoire ne montre que ce que l'utilisateur a déjà le droit de voir. Vos droits d'accès Drive / SharePoint / Notion / CRM s'appliquent intégralement.",
  },
  {
    title: "Hébergé en UE",
    detail:
      "Données stockées en France ou en Europe, jamais ailleurs. Conformes RGPD, jamais réutilisées pour entraîner un modèle public.",
  },
  {
    title: "Journalisation",
    detail:
      "Chaque requête tracée, datée, auditable a posteriori. Conformité RGPD et traçabilité métier intégrées au moteur.",
  },
  {
    title: "Documents à jour",
    detail:
      "Les nouvelles versions de vos documents sont reprises automatiquement. Les anciennes versions restent traçables et consultables.",
  },
  {
    title: "Validation humaine possible",
    detail:
      "Vos équipes peuvent corriger, approuver ou rejeter une réponse avant qu'elle ne soit diffusée — la mémoire reste sous contrôle humain.",
  },
];

export const RAG_TECH_STACK = [
  "pgvector",
  "Qdrant",
  "recherche hybride",
  "reranking",
  "Claude",
  "Mistral",
  "LangChain",
  "LlamaIndex",
];
