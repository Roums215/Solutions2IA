export type TransformationFlow = {
  key: string;
  label: string;
  before: {
    nodes: string[];
    caption: string;
  };
  after: {
    nodes: string[];
    caption: string;
  };
};

export const HOME_TRANSFORMATIONS: TransformationFlow[] = [
  {
    key: "demandes",
    label: "Les demandes entrantes",
    before: {
      nodes: ["Demande", "Email", "Vous"],
      caption: "Les demandes se perdent dans une boîte mail.",
    },
    after: {
      nodes: ["Demande", "Qualification", "CRM"],
      caption: "Chaque demande qualifiée, tracée, déclenche une suite.",
    },
  },
  {
    key: "visibilite",
    label: "Votre visibilité",
    before: {
      nodes: ["Site vide", "Pas de GMB", "Invisible IA"],
      caption: "Personne ne sait que vous existez.",
    },
    after: {
      nodes: ["SEO", "GEO IA", "GMB local"],
      caption: "Vous apparaissez dans Google, les réponses IA et autour de vous.",
    },
  },
  {
    key: "repetition",
    label: "Les tâches répétitives",
    before: {
      nodes: ["Tâche", "Manuel", "Répétition"],
      caption: "Les mêmes tâches répétées chaque semaine.",
    },
    after: {
      nodes: ["Trigger", "Workflow", "Notification"],
      caption: "Ce qui se répète est automatisé. Vous gardez le contrôle.",
    },
  },
  {
    key: "memoire",
    label: "Votre mémoire métier",
    before: {
      nodes: ["Question", "Dossiers dispersés", "Cherche partout"],
      caption: "Vous cherchez la bonne info dans dix endroits.",
    },
    after: {
      nodes: ["Question", "RAG métier", "Source citée"],
      caption: "L'IA répond avec vos documents, en citant la source précise.",
    },
  },
];

export const HOME_TRANSFORMATIONS_CLOSING =
  "Le livrable, c'est le changement dans votre quotidien.";
