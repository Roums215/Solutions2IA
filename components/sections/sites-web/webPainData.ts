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
      "Vous répétez les mêmes explications à chaque appel. Le site ne fait pas son travail.",
  },
  {
    title: "Répétition",
    detail:
      "Les mêmes questions reviennent, jamais mémorisées. Aucune trace de ce qui a déjà été demandé.",
  },
  {
    title: "Manque de suivi",
    detail:
      "Les contacts entrants ne sont nulle part. Oubliés sous 48 h, perdus pour de bon — ou récupérés par hasard.",
  },
  {
    title: "Outils déconnectés",
    detail:
      "Site, agenda, messagerie, formulaires — tout vit en silos. Impossible de savoir où en est chaque demande.",
  },
];

export const WEB_PAIN_TURNAROUND = {
  label: "Avec un site connecté",
  headline: "Le site arrête ces pertes — et les transforme en circulation.",
  promises: [
    "Clarifie votre offre dès la première seconde.",
    "Rassure le visiteur par la preuve et la cohérence.",
    "Qualifie la demande avant qu'elle vous arrive.",
    "Dirige chaque demande au bon endroit, au bon moment.",
    "Vous alerte quand c'est utile, avec le bon contexte.",
  ],
  closing:
    "Vous arrêtez de perdre ce que vos efforts attirent.",
};
