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
    benefice: "Workflows métier qui tournent seuls.",
    icon: "automation",
  },
  {
    key: "rag",
    href: "/rag",
    title: "RAG · Mémoire métier",
    benefice: "L'IA répond avec vos documents.",
    icon: "rag",
  },
  {
    key: "studio",
    href: "/studio-visuel",
    title: "Studio visuel",
    benefice: "Motion design, 2D/3D, premium.",
    icon: "studio",
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
