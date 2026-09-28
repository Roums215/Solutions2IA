import {
  ArchiveX,
  CircleHelp,
  ClipboardList,
  Clock,
  EyeOff,
  Forward,
  Globe,
  Inbox,
  LineChart,
  LogOut,
  Mail,
  MousePointerClick,
  Phone,
  RotateCcw,
  ScanSearch,
  Search,
  type LucideIcon,
} from "lucide-react";

/**
 * /sites-web, section 3 : ce qu'un site mal conçu vous coûte.
 * Quatre situations propres au web. Chaque carte : la situation, le trajet d'aujourd'hui
 * (icônes métier, sans texte barré), puis ce que le site fait à la place.
 * Aucun chiffre inventé : le calcul, c'est le visiteur qui le fait (SITE_COST_COUNT).
 */

export type CostSituation = {
  key: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  today: { label: string; icon: LucideIcon }[];
  withSite: string;
};

export const COST_SITUATIONS: CostSituation[] = [
  {
    key: "comprendre",
    icon: ScanSearch,
    title: "Le visiteur ne comprend pas ce que vous faites",
    detail:
      "Une page d'accueil générique, des services noyés dans le texte, aucune étape suivante claire. Il compare avec un autre site qui répond plus vite à sa question.",
    today: [
      { label: "Il arrive", icon: MousePointerClick },
      { label: "Il cherche", icon: Search },
      { label: "Il hésite", icon: CircleHelp },
      { label: "Il repart", icon: LogOut },
    ],
    withSite: "Une offre lisible en quelques secondes, et une prochaine action évidente.",
  },
  {
    key: "incompletes",
    icon: ClipboardList,
    title: "Les demandes arrivent incomplètes",
    detail:
      "« Bonjour, pouvez-vous me rappeler ? » Pas de besoin, pas de délai, parfois pas de numéro. Chaque demande commence par un aller-retour.",
    today: [
      { label: "Mail vague", icon: Mail },
      { label: "Appel pour préciser", icon: Phone },
      { label: "Relance", icon: RotateCcw },
    ],
    withSite: "Les informations utiles sont demandées dès le départ : besoin, délai, coordonnées.",
  },
  {
    key: "boite",
    icon: Inbox,
    title: "Une demande reste dans une boîte mail",
    detail:
      "Elle arrive dans la mauvaise boîte, elle est transférée, puis lue trop tard. Personne ne sait qui devait répondre.",
    today: [
      { label: "Mail reçu", icon: Mail },
      { label: "Transféré", icon: Forward },
      { label: "Oublié", icon: ArchiveX },
    ],
    withSite: "Chaque demande est rangée dans le bon outil, avec la personne qui s'en occupe.",
  },
  {
    key: "apprend",
    icon: LineChart,
    title: "Votre site ne vous apprend rien",
    detail:
      "Vous savez qu'il existe, pas ce qu'il produit. Combien de demandes ce mois-ci, venues d'où, et qu'est-ce qu'elles sont devenues ?",
    today: [
      { label: "Il est en ligne", icon: Globe },
      { label: "Aucune trace", icon: EyeOff },
      { label: "On devine", icon: Clock },
    ],
    withSite: "Les demandes, leurs sources et leurs suites deviennent visibles, semaine après semaine.",
  },
];

export const SITE_COST_COUNT =
  "Faites le compte sur un mois : les visites, les demandes reçues, et les appels passés juste pour obtenir une information manquante. L'écart entre les trois, c'est ce que votre site laisse filer.";
