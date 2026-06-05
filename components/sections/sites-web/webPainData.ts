export type WebPain = {
  title: string;
  detail: string;
};

export const WEB_PAINS: WebPain[] = [
  {
    title: "Perte d'opportunités",
    detail:
      "Un visiteur qualifié ne sait pas comment vous contacter. Il referme la page et appelle un concurrent.",
  },
  {
    title: "Perte de confiance",
    detail:
      "Le site ne ressemble pas à votre niveau. Avant même le premier échange, le doute s'installe.",
  },
  {
    title: "Qualification inexistante",
    detail:
      "Chaque demande tombe en vrac, à trier à la main. Aucun filtre, aucun contexte, aucune priorité.",
  },
  {
    title: "Temps perdu",
    detail:
      "Votre équipe répète les mêmes explications à chaque appel. Le site ne fait pas son travail.",
  },
  {
    title: "Répétition",
    detail:
      "Les mêmes questions reviennent, jamais capitalisées. Aucune mémoire de ce qui a déjà été demandé.",
  },
  {
    title: "Manque de suivi",
    detail:
      "Les leads ne sont nulle part. Oubliés sous 48 h, perdus pour de bon — ou récupérés par hasard.",
  },
  {
    title: "Outils déconnectés",
    detail:
      "Site, CRM, calendrier, email, formulaires — tout vit en silos. Personne ne sait qui a fait quoi.",
  },
];

export const WEB_PAIN_TURNAROUND = {
  label: "Avec un site connecté",
  headline: "Le site arrête ces pertes — et les transforme en circulation.",
  promises: [
    "Clarifie votre offre dès la première seconde.",
    "Rassure le visiteur par la preuve et la cohérence.",
    "Qualifie la demande avant qu'elle n'atteigne votre équipe.",
    "Route chaque opportunité au bon collaborateur.",
    "Alerte vos équipes au bon moment, avec le bon contexte.",
  ],
  closing:
    "Vous arrêtez de perdre ce que vos efforts attirent.",
};
