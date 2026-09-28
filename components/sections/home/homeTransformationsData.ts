import {
  Bell,
  BookOpen,
  ClipboardList,
  Database,
  EyeOff,
  FolderOpen,
  Globe,
  Hand,
  Inbox,
  ListChecks,
  Mail,
  MapPin,
  MapPinOff,
  MessageCircleQuestionMark,
  Quote,
  Repeat,
  Search,
  SearchX,
  Sparkles,
  User,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type TransformationNode = {
  label: string;
  /** Petite icône lucide (16 px) devant chaque étape. */
  icon: LucideIcon;
};

export type TransformationFlow = {
  key: string;
  label: string;
  before: {
    nodes: TransformationNode[];
    caption: string;
  };
  after: {
    nodes: TransformationNode[];
    caption: string;
  };
};

export const HOME_TRANSFORMATIONS: TransformationFlow[] = [
  {
    key: "demandes",
    label: "Les demandes entrantes",
    before: {
      nodes: [
        { label: "Demande", icon: Inbox },
        { label: "Email", icon: Mail },
        { label: "Vous", icon: User },
      ],
      caption: "Les demandes se perdent dans une boîte mail.",
    },
    after: {
      nodes: [
        { label: "Demande", icon: Inbox },
        { label: "Qualification", icon: ListChecks },
        { label: "Fichier clients", icon: Database },
      ],
      caption: "Chaque demande qualifiée, tracée, déclenche une suite.",
    },
  },
  {
    key: "visibilite",
    label: "Votre visibilité",
    before: {
      nodes: [
        { label: "Site vide", icon: Globe },
        { label: "Pas de fiche Google", icon: MapPinOff },
        { label: "Invisible des IA", icon: EyeOff },
      ],
      caption: "Personne ne sait que vous existez.",
    },
    after: {
      nodes: [
        { label: "Google", icon: Search },
        { label: "Réponses IA", icon: Sparkles },
        { label: "Autour de vous", icon: MapPin },
      ],
      caption: "Vous apparaissez dans Google, dans les réponses des IA et autour de vous.",
    },
  },
  {
    key: "repetition",
    label: "Les tâches répétitives",
    before: {
      nodes: [
        { label: "Tâche", icon: ClipboardList },
        { label: "À la main", icon: Hand },
        { label: "Chaque semaine", icon: Repeat },
      ],
      caption: "Les mêmes tâches répétées chaque semaine.",
    },
    after: {
      nodes: [
        { label: "Déclencheur", icon: Zap },
        { label: "Flux automatique", icon: Workflow },
        { label: "Vous êtes prévenu", icon: Bell },
      ],
      caption: "Ce qui se répète est automatisé. Vous gardez le contrôle.",
    },
  },
  {
    key: "memoire",
    label: "Votre mémoire métier",
    before: {
      nodes: [
        { label: "Question", icon: MessageCircleQuestionMark },
        { label: "Dossiers dispersés", icon: FolderOpen },
        { label: "On cherche partout", icon: SearchX },
      ],
      caption: "Vous cherchez la bonne info dans dix endroits.",
    },
    after: {
      nodes: [
        { label: "Question", icon: MessageCircleQuestionMark },
        { label: "Vos documents", icon: BookOpen },
        { label: "Source citée", icon: Quote },
      ],
      caption: "L'IA répond avec vos documents, en citant la source précise.",
    },
  },
];

export const HOME_TRANSFORMATIONS_CLOSING =
  "Le livrable, c'est le changement dans votre quotidien.";
