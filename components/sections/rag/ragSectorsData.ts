import type { RagUsageKey } from "./ragUsagesData";

export type RagSector = {
  key: string;
  label: string;
  sources: string[];
  question: string;
  response_type: string;
  citation_chip: string;
  recommended_usage: { key: RagUsageKey; label: string };
  risk_avoided: string;
};

export const RAG_SECTORS: RagSector[] = [
  {
    key: "immobilier",
    label: "Immobilier",
    sources: ["Mandats Drive", "CRM clients", "Procédures location SharePoint"],
    question:
      "« Quelles sont les conditions de rupture anticipée de ce bail ? »",
    response_type:
      "Clauses applicables identifiées dans le mandat connecté, croisées avec la fiche client. À valider avec le service juridique.",
    citation_chip: "Mandat_2024_Réf-128.pdf — Clause 7.2",
    recommended_usage: { key: "multi-source", label: "Croiser" },
    risk_avoided:
      "Une rupture de bail mal interprétée qui finit au contentieux.",
  },
  {
    key: "comptabilite",
    label: "Comptabilité",
    sources: [
      "Doctrine TVA Notion",
      "Processus internes Drive",
      "Mails clarifications",
    ],
    question: "« Comment applique-t-on la TVA sur les services numériques ? »",
    response_type:
      "Synthèse de la doctrine interne connectée, avec renvoi vers le passage source pour validation.",
    citation_chip: "Doctrine_TVA.pdf — §2.4 + Note interne du 18/05",
    recommended_usage: { key: "simple", label: "Répondre" },
    risk_avoided:
      "Une TVA mal appliquée détectée à l'audit, plusieurs mois trop tard.",
  },
  {
    key: "industrie",
    label: "Industrie",
    sources: ["Fiches techniques", "Manuel maintenance", "Normes ISO"],
    question:
      "« Quel est le calendrier de maintenance préventive pour la machine XYZ ? »",
    response_type:
      "Calendrier de maintenance issu de la fiche technique connectée, version validée et historique consultable.",
    citation_chip: "Fiche_XYZ_v3.pdf — Historique p. 4",
    recommended_usage: { key: "auto-enrichi", label: "Maintenir à jour" },
    risk_avoided:
      "Une maintenance manquée qui immobilise une chaîne de production.",
  },
  {
    key: "rh",
    label: "RH",
    sources: ["Procédure RH", "Politique congés", "Règlement interne"],
    question: "« Quel est le délai de carence pour les congés formation ? »",
    response_type:
      "Réponse issue de la politique RH connectée, avec les conditions d'éligibilité associées. À confirmer selon votre convention collective.",
    citation_chip: "Procédure_RH.pdf — page 12",
    recommended_usage: { key: "simple", label: "Répondre" },
    risk_avoided: "Un congé refusé à tort qui dégrade le climat social.",
  },
  {
    key: "juridique",
    label: "Juridique",
    sources: ["Jurisprudence", "Dossiers contentieux", "Contrats-types"],
    question:
      "« Existe-t-il une jurisprudence sur les clauses de non-concurrence dans notre domaine ? »",
    response_type:
      "Jurisprudence récente disponible dans le corpus connecté, classée par autorité avec extraits et liens vers les documents source.",
    citation_chip: "Veille_Jurisprudence_2024.pdf — §1.2",
    recommended_usage: { key: "conversationnel", label: "Explorer" },
    risk_avoided:
      "Une jurisprudence ratée qui affaiblit votre position en négociation.",
  },
];
