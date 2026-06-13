export type ServiceIcon =
  | "sites-web"
  | "applications"
  | "agents-ia"
  | "automation"
  | "rag"
  | "studio";

export type HomeService = {
  key: string;
  href: string;
  title: string;
  benefice: string;
  icon: ServiceIcon;
};

export const HOME_SERVICES: HomeService[] = [
  {
    key: "sites-web",
    href: "/sites-web",
    title: "Sites web premium",
    benefice: "Le moteur de vos prochains clients.",
    icon: "sites-web",
  },
  {
    key: "applications",
    href: "/applications",
    title: "Applications",
    benefice: "Web & mobile métier, performants.",
    icon: "applications",
  },
  {
    key: "agents-ia",
    href: "/agents-ia",
    title: "Agents IA",
    benefice: "Décident et exécutent en autonomie.",
    icon: "agents-ia",
  },
  {
    key: "automatisation",
    href: "/automatisation",
    title: "Automatisation",
    benefice: "Les tâches répétitives se font seules.",
    icon: "automation",
  },
  {
    key: "rag",
    href: "/rag",
    title: "Mémoire d'entreprise",
    benefice: "L'IA répond avec vos documents.",
    icon: "rag",
  },
];

export const HOME_SERVICES_CENTER = {
  label: "Système",
  sublabel: "Solutions 2IA",
};

export const HOME_SERVICES_CLOSING =
  "Tous les services tournent ensemble.";
export const HOME_SERVICES_CLOSING_HREF = "/services";
export const HOME_SERVICES_CLOSING_LABEL = "Voir le détail";
