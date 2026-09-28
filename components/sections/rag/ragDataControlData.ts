export type RagGuarantee = {
  title: string;
  detail: string;
};

export const RAG_GUARANTEES: RagGuarantee[] = [
  {
    title: "Sources vérifiables",
    detail:
      "Chaque réponse peut afficher ses sources, jusqu'au document, à la page, à l'extrait.",
  },
  {
    title: "Droits d'accès respectés",
    detail:
      "La mémoire ne montre que ce que la personne a déjà le droit de voir dans Drive, SharePoint, Notion ou votre fichier clients.",
  },
  {
    title: "Hébergée en Europe",
    detail:
      "Données stockées en France ou en Europe, conformes aux règles européennes de protection des données (RGPD), jamais réutilisées pour entraîner un modèle public.",
  },
  {
    title: "Chaque question est tracée",
    detail:
      "Qui a demandé quoi, quand, avec quelle réponse : l'historique est consultable en cas d'audit.",
  },
  {
    title: "Documents à jour",
    detail:
      "Une nouvelle version est reprise automatiquement, l'ancienne reste consultable.",
  },
  {
    title: "Validation humaine possible",
    detail:
      "Vos équipes peuvent corriger, approuver ou rejeter une réponse avant diffusion.",
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
