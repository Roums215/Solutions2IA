export type WebPain = {
  title: string;
  detail: string;
};

export const WEB_PAINS: WebPain[] = [
  {
    title: "Des demandes qui n'arrivent jamais",
    detail:
      "Un visiteur intéressé cherche comment vous joindre, ne trouve pas, referme. Comptez vos visites du mois : combien vous ont réellement écrit ou appelé ?",
  },
  {
    title: "Un doute avant le premier échange",
    detail:
      "Le site ne ressemble pas à votre niveau. Le client compare avec deux concurrents : celui qui inspire confiance décroche le rendez-vous.",
  },
  {
    title: "Des demandes à trier à la main",
    detail:
      "Tout tombe en vrac dans la boîte mail : le sérieux et le curieux, l'urgent et le vague. Multipliez dix minutes de tri par demande, chaque semaine.",
  },
  {
    title: "Les mêmes explications, à chaque appel",
    detail:
      "Horaires, tarifs, zone, délais : vous répétez au téléphone ce que le site devrait dire. Comptez les appels qui posent la même question.",
  },
  {
    title: "Des contacts qui s'oublient",
    detail:
      "Une demande lue le soir, oubliée le lendemain, perdue pour de bon. Agenda, mail et formulaire ne se parlent pas : personne ne sait où en est chaque demande.",
  },
];

export const WEB_PAIN_TURNAROUND = {
  label: "Avec un site connecté",
  headline: "Le site arrête ces pertes, et les transforme en circulation.",
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
