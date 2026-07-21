export type RagUsageKey =
  | "simple"
  | "conversationnel"
  | "multi-source"
  | "auto-enrichi";

export type RagUsage = {
  key: RagUsageKey;
  label: string;
  one_liner: string;
  best_when: string;
  sector_example: {
    sector: string;
    question: string;
  };
};

export const RAG_USAGES: RagUsage[] = [
  {
    key: "simple",
    label: "Répondre",
    one_liner: "Une question, une réponse sourcée. Un aller-retour, point.",
    best_when:
      "Corpus stable (procédures, normes, contrats-types). Questions ponctuelles. Besoin de traçabilité.",
    sector_example: {
      sector: "Comptabilité",
      question:
        "« Comment applique-t-on la TVA sur les services numériques selon notre doctrine ? »",
    },
  },
  {
    key: "conversationnel",
    label: "Explorer",
    one_liner:
      "Affiner, préciser, comparer : la mémoire garde le fil sans rien inventer.",
    best_when:
      "Cas complexes nécessitant plusieurs allers-retours (juridique, dossiers contentieux, exploration).",
    sector_example: {
      sector: "Juridique",
      question:
        "« Jurisprudence non-concurrence » → « ...dans notre domaine » → « ...post-2020 ».",
    },
  },
  {
    key: "multi-source",
    label: "Croiser",
    one_liner:
      "Plusieurs outils interrogés en même temps (Drive, CRM, base SQL). Une réponse, des citations groupées.",
    best_when:
      "Données réparties entre outils. Besoin de croiser un document avec une donnée structurée.",
    sector_example: {
      sector: "Immobilier",
      question:
        "« Conditions de rupture anticipée pour ce locataire ? » → Mandats (Drive) + CRM + Procédures (SharePoint).",
    },
  },
  {
    key: "auto-enrichi",
    label: "Maintenir à jour",
    one_liner:
      "Quand un document change, la mémoire suit toute seule. Versions obsolètes archivées.",
    best_when:
      "Documentation vivante (normes ISO, fiches techniques, règlement interne mis à jour fréquemment).",
    sector_example: {
      sector: "Industrie",
      question:
        "« Calendrier de maintenance préventive pour la machine XYZ ? » → fiche technique v3, juin 2026.",
    },
  },
];
