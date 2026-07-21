export type DailyMoment = {
  time: string;
  who: string;
  scene: string;
  question: string;
};

export const DAILY_MOMENTS: DailyMoment[] = [
  {
    time: "Matin · 09h",
    who: "Onboarding · nouveau collaborateur",
    scene:
      "Un nouvel arrivant interroge directement la mémoire sur les procédures internes, sans mobiliser un référent.",
    question: "« Quel est le process de signature électronique chez nous ? »",
  },
  {
    time: "Midi · 12h",
    who: "Support client · équipe service",
    scene:
      "Un agent retrouve en 10 secondes la clause exacte d'un contrat : la réponse au client est précise et sourcée.",
    question: "« Clause de garantie 24 mois sur ce produit ? »",
  },
  {
    time: "Après-midi · 15h",
    who: "Rédaction · commercial",
    scene:
      "Un commercial s'appuie sur des cas similaires déjà traités pour rédiger une proposition cohérente.",
    question: "« Cas similaires traités sur SaaS B2B éducation ? »",
  },
  {
    time: "Fin de journée · 18h",
    who: "Audit · manager",
    scene:
      "Un manager vérifie qu'une décision opérationnelle respecte une norme interne : la mémoire cite la page exacte.",
    question: "« Cette décision est-elle alignée avec notre charte achats ? »",
  },
];
