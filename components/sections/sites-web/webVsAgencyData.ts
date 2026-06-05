export type VsRow = {
  classic: string;
  s2ia: string;
};

export const WEB_VS_AGENCY_ROWS: VsRow[] = [
  {
    classic: "Livre un site.",
    s2ia: "Construit un système connecté.",
  },
  {
    classic: "S'arrête à la mise en ligne.",
    s2ia: "Continue après la mise en ligne — support, évolution, automatisations.",
  },
  {
    classic: "Pas de connexion aux outils métier.",
    s2ia: "Branche le site sur vos outils — CRM, calendrier, email, n8n, ERP.",
  },
  {
    classic: "Pas de circulation des leads.",
    s2ia: "Qualifie et route chaque opportunité au bon collaborateur.",
  },
  {
    classic: "Pas d'automatisation des suites.",
    s2ia: "Automatise les suites — notifications, relances, dashboards.",
  },
  {
    classic: "Pas d'IA métier.",
    s2ia: "Connecte l'IA documentaire (RAG) et les automatisations.",
  },
  {
    classic: "Le site = produit final.",
    s2ia: "Le site = première brique d'un écosystème.",
  },
];

export const WEB_VS_AGENCY_HEADERS = {
  classic: {
    label: "Agence web classique",
    sublabel: "Le site comme livrable",
  },
  s2ia: {
    label: "Solutions 2IA",
    sublabel: "Le site comme point d'entrée",
  },
};

export const WEB_VS_AGENCY_CLOSING =
  "Le site n'est pas le produit. C'est le point d'entrée.";
