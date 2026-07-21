export type VsRow = {
  classic: string;
  s2ia: string;
};

export const WEB_VS_AGENCY_ROWS: VsRow[] = [
  {
    classic: "Livre un site.",
    s2ia: "Je construis un système connecté.",
  },
  {
    classic: "S'arrête à la mise en ligne.",
    s2ia: "Je continue après la mise en ligne : support, évolution, automatisations.",
  },
  {
    classic: "Pas de connexion aux outils métier.",
    s2ia: "Je branche le site sur vos outils : agenda, messagerie, gestion, automatisation.",
  },
  {
    classic: "Pas de circulation des demandes entrantes.",
    s2ia: "Je qualifie et dirige chaque demande au bon endroit, au bon moment.",
  },
  {
    classic: "Pas d'automatisation des suites.",
    s2ia: "J'automatise les suites : notifications, relances, tableaux de bord.",
  },
  {
    classic: "Pas d'IA métier.",
    s2ia: "Je connecte l'intelligence artificielle à votre activité selon vos besoins.",
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
    label: "Solutions 2IA · indépendant",
    sublabel: "Le site comme point d'entrée",
  },
};

export const WEB_VS_AGENCY_CLOSING =
  "Le site n'est pas le produit. C'est le point d'entrée.";
