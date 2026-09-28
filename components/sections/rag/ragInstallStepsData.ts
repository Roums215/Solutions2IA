export type InstallStep = {
  n: number;
  label: string;
  deliverable: string;
};

export const INSTALL_STEPS: InstallStep[] = [
  {
    n: 1,
    label: "Inventaire de vos documents",
    deliverable:
      "Inventaire des documents, sources prioritaires, droits d'accès. Sortie : la carte de votre savoir interne.",
  },
  {
    n: 2,
    label: "Branchement des sources",
    deliverable:
      "Connexion à vos outils (Drive, SharePoint, Notion, fichier clients). Vos documents restent chez vous et vos droits d'accès existants s'appliquent (ACL).",
  },
  {
    n: 3,
    label: "Préparation de la mémoire",
    deliverable:
      "Le moteur est calibré sur votre vocabulaire métier, premières questions testées avec vous.",
  },
  {
    n: 4,
    label: "Validation sur 20 questions",
    deliverable:
      "Vos équipes posent 20 vraies questions ; j'ajuste la recherche et les sources jusqu'à ce que chaque réponse soit juste, sourcée et obtenue en moins de 30 secondes.",
  },
  {
    n: 5,
    label: "Mise en main",
    deliverable:
      "Atelier de 90 minutes par équipe, historique des questions activé, support pendant 30 jours.",
  },
];

export const INSTALL_AVG = "Comptez 4 à 6 semaines selon le périmètre.";
