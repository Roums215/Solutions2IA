export type OpportunityIcon =
  | "visitor"
  | "browser"
  | "form"
  | "filter"
  | "database"
  | "bell"
  | "team"
  | "trend"
  | "handshake";

export type OpportunityBridge = {
  href: string;
  label: string;
};

export type OpportunityStation = {
  key: string;
  label: string;
  sublabel: string;
  icon: OpportunityIcon;
  bridge?: OpportunityBridge;
};

export const OPPORTUNITY_STATIONS: OpportunityStation[] = [
  {
    key: "visitor",
    label: "Visiteur",
    sublabel: "qui découvre votre activité",
    icon: "visitor",
  },
  {
    key: "site",
    label: "Site web",
    sublabel: "qui clarifie votre offre en quelques secondes",
    icon: "browser",
  },
  {
    key: "form",
    label: "Formulaire intelligent",
    sublabel: "qui capture le besoin et le contexte",
    icon: "form",
  },
  {
    key: "qualify",
    label: "Qualification",
    sublabel: "qui filtre et priorise selon vos règles métier",
    icon: "filter",
    bridge: {
      href: "/rag",
      label: "Quand l'IA doit consulter votre mémoire métier → /rag",
    },
  },
  {
    key: "crm",
    label: "CRM",
    sublabel: "qui centralise chaque opportunité, traçable",
    icon: "database",
  },
  {
    key: "alert",
    label: "Notification",
    sublabel: "qui alerte au bon moment, au bon endroit",
    icon: "bell",
    bridge: {
      href: "/automatisation",
      label: "Quand l'action se déclenche dans vos outils → /automatisation",
    },
  },
  {
    key: "colleague",
    label: "Collaborateur",
    sublabel: "qui prend le relais déjà informé",
    icon: "team",
    bridge: {
      href: "/agents-ia",
      label: "Quand une tâche peut s'exécuter sans humain → /agents-ia",
    },
  },
  {
    key: "follow-up",
    label: "Suivi",
    sublabel: "qui se construit sans intervention manuelle",
    icon: "trend",
  },
  {
    key: "client",
    label: "Client",
    sublabel: "qui devient durable",
    icon: "handshake",
  },
];

export const OPPORTUNITY_CLOSING =
  "Le site déclenche le flux. Chaque étape transmet le contexte. Personne n'a à y penser — et personne ne tombe entre les mailles.";

export const OPPORTUNITY_BRIDGE_TO_TOOLS =
  "Chaque étape repose sur un outil métier précis.";

export const OPPORTUNITY_EDITORIAL_V64 =
  "Chacune des 9 étapes peut être renforcée par nos solutions IA — automatisation, mémoire métier ou agent autonome — selon ce que votre activité réclame.";
