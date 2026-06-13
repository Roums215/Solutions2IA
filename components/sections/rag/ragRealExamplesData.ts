export type RagRealExample = {
  sector: string;
  question: string;
  response: string;
  source: string;
};

export const RAG_REAL_EXAMPLES: RagRealExample[] = [
  {
    sector: "RH",
    question: "« Combien de jours d'absence pour mariage ? »",
    response:
      "D'après la procédure interne connectée, plusieurs jours d'absence rémunérée sur justificatif. À confirmer selon votre convention collective.",
    source: "Procédure_RH.pdf — §3 Congés exceptionnels",
  },
  {
    sector: "Comptabilité",
    question: "« Comment traiter cette facture suisse ? »",
    response:
      "Traitement différencié selon le statut du client, à valider sur la base de la doctrine interne et du dernier avis fiscal connecté.",
    source: "Doctrine_TVA.pdf — §2.4 Opérations transfrontalières",
  },
  {
    sector: "Immobilier",
    question: "« Quelles sont les conditions de rupture de ce bail ? »",
    response:
      "Conditions de préavis et motifs précisés dans le mandat connecté. À valider au cas par cas avec le service juridique.",
    source: "Mandat_2024_Réf-128.pdf — Clause 7.2",
  },
  {
    sector: "Industrie",
    question: "« Quand cette machine a-t-elle été révisée ? »",
    response:
      "Calendrier issu de la fiche maintenance connectée — dernière intervention et prochaine échéance affichées avec la version source.",
    source: "Fiche_Maintenance_XYZ.pdf — Historique p. 4",
  },
  {
    sector: "Juridique",
    question: "« Existe-t-il une jurisprudence similaire ? »",
    response:
      "Jurisprudence récente disponible dans vos documents, classée par autorité et date. À vérifier avec le juriste avant utilisation.",
    source: "Veille_Jurisprudence_2024.pdf — §1.2",
  },
  {
    sector: "Direction",
    question: "« Quels engagements clients ont été pris ce trimestre ? »",
    response:
      "Engagements clients récents extraits des notes de comité, regroupés par compte client.",
    source: "Notes_Comité_Direction_Q2.pdf — Annexe A",
  },
];
