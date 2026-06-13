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
      "Inventaire des documents, sources prioritaires, droits d'accès — sortie : la carte de votre savoir interne.",
  },
  {
    n: 2,
    label: "Branchement sources",
    deliverable:
      "Connexion aux outils (Drive, SharePoint, Notion, CRM) — vos documents restent chez vous, les ACL existantes s'appliquent.",
  },
  {
    n: 3,
    label: "Préparation mémoire",
    deliverable:
      "Le moteur est calibré sur votre vocabulaire métier — premières questions testées avec vous.",
  },
  {
    n: 4,
    label: "Validation 20 questions",
    deliverable:
      "Vos équipes testent les cas d'usage prioritaires, j'ajuste la recherche et les sources.",
  },
  {
    n: 5,
    label: "Mise en main",
    deliverable:
      "Atelier 90 min par équipe, journal d'audit activé, support continu pendant 30 jours.",
  },
];

export const INSTALL_AVG = "4 à 6 semaines en moyenne, selon le périmètre.";
