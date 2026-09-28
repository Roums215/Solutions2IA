import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  CalendarCheck,
  CircleDollarSign,
  Clock,
  Cloud,
  Copy,
  Eye,
  FileSpreadsheet,
  FileText,
  Files,
  Filter,
  Gauge,
  Hammer,
  Handshake,
  LayoutTemplate,
  LifeBuoy,
  Mail,
  MessageSquare,
  MonitorCog,
  PenLine,
  Plug,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  UserX,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Contenu de la page /applications (sections B à H). Aucune preuve inventée : les
 * chiffres affichés sont soit un calcul que le visiteur refait avec ses propres données,
 * soit des repères de prix publics (grille de /services), soit des données d'exemple
 * signalées comme telles dans les maquettes.
 */

// ─── B · Les problèmes concrets ─────────────────────────────────────────────

export const PROBLEMS: { icon: LucideIcon; title: string; cost: string }[] = [
  { icon: Files, title: "Des fichiers éclatés", cost: "Trois versions du même tableau, et personne ne sait laquelle est la bonne." },
  { icon: ArrowLeftRight, title: "Des outils qui ne se parlent pas", cost: "L'agenda, la facturation et le fichier clients vivent chacun dans leur coin." },
  { icon: Copy, title: "La même information saisie trois fois", cost: "Sur papier, puis dans Excel, puis dans le logiciel. Et chaque copie peut se tromper." },
  { icon: TriangleAlert, title: "Des erreurs et des oublis", cost: "Une relance qui ne part pas, une pièce qui manque, un devis envoyé en retard." },
  { icon: CircleDollarSign, title: "Un logiciel trop cher, ou mal adapté", cost: "Vous payez pour cent fonctions, vous en utilisez cinq, et il manque celle qu'il vous faut." },
  { icon: Eye, title: "Aucune vue d'ensemble", cost: "Pour savoir où en est l'activité, il faut appeler, ouvrir cinq fichiers, ou deviner." },
  { icon: Wrench, title: "Des équipes qui bricolent", cost: "Chacun a son tableau, ses raccourcis, ses messages. Quand quelqu'un part, tout part avec lui." },
  { icon: UserX, title: "Le client qui attend", cost: "Le compte-rendu, le devis ou la réponse arrivent tard, parce que l'information était ailleurs." },
];

/** Le calcul que le visiteur refait avec ses chiffres : aucune donnée client. */
export const PROBLEM_CALC = {
  intro: "Un exemple de calcul, à refaire avec vos chiffres :",
  parts: [
    { value: "10 min", label: "de ressaisie par dossier" },
    { value: "× 20", label: "dossiers par jour" },
    { value: "= 3 h 20", label: "chaque jour, pour recopier" },
  ],
  outro: "Sur une année de travail, cela fait plus de 700 heures passées à recopier ce qui existe déjà quelque part.",
};

// ─── C · Le principe ────────────────────────────────────────────────────────

export type FlowNode = { id: string; icon: LucideIcon; label: string; line: string; how: string };

export const FLOW_IN: FlowNode[] = [
  { id: "papier", icon: PenLine, label: "Papier", line: "fiches, bons, carnets", how: "La fiche se remplit sur téléphone, sur place. Les photos et la signature vont directement au dossier." },
  { id: "excel", icon: FileSpreadsheet, label: "Excel", line: "tableaux partagés", how: "Vos tableaux sont importés une fois, proprement. Ensuite, plus personne ne recopie." },
  { id: "mails", icon: Mail, label: "Mails", line: "demandes, pièces jointes", how: "Les demandes qui arrivent par mail sont captées et rangées dans le bon dossier." },
  { id: "logiciel", icon: MonitorCog, label: "Logiciel existant", line: "compta, agenda, ERP", how: "On relie ce qui marche déjà au lieu de le remplacer : l'outil lit et écrit dedans." },
  { id: "terrain", icon: MessageSquare, label: "Terrain", line: "appels, photos, messages", how: "Ce qui passait par téléphone ou messagerie arrive dans l'outil, daté et rattaché." },
];

export const FLOW_DOES: { icon: LucideIcon; label: string; line: string }[] = [
  { icon: Search, label: "Récupère", line: "une seule saisie, à la source" },
  { icon: Filter, label: "Range", line: "un dossier par client, par chantier, par commande" },
  { icon: ShieldCheck, label: "Vérifie", line: "champs obligatoires, règles, validations" },
  { icon: Sparkles, label: "Déclenche", line: "relances, documents, notifications" },
];

export const FLOW_OUT: FlowNode[] = [
  { id: "dashboard", icon: BarChart3, label: "Tableau de bord", line: "l'activité en direct", how: "Vous voyez ce qui compte d'un coup d'œil : en cours, en retard, terminé, facturé." },
  { id: "alertes", icon: Bell, label: "Alertes", line: "au bon moment", how: "Une pièce manque, un délai approche : la bonne personne est prévenue avant que ça coince." },
  { id: "documents", icon: FileText, label: "Documents", line: "rapports, devis, factures", how: "Les documents sont générés à partir du dossier et partent tout seuls au client." },
  { id: "agenda", icon: CalendarCheck, label: "Agenda et tâches", line: "qui fait quoi, quand", how: "Les rendez-vous et les tâches se posent au bon endroit, visibles par toute l'équipe." },
  { id: "equipe", icon: Users, label: "Équipe et clients", line: "informés sans y penser", how: "Chacun voit ce qui le concerne, et le client reçoit ce qu'il attend sans relancer." },
];

// ─── D · Ce que l'outil apporte ─────────────────────────────────────────────

export const BENEFIT_GROUPS: { title: string; line: string; items: { icon: LucideIcon; title: string; text: string }[] }[] = [
  {
    title: "Au quotidien",
    line: "ce que vos équipes voient dès la première semaine",
    items: [
      { icon: Smartphone, title: "Accessible partout", text: "Au bureau sur ordinateur, sur le terrain sur téléphone. Sans rien installer." },
      { icon: RefreshCw, title: "Des données à jour", text: "Quand quelqu'un saisit, tout le monde voit. Plus de version qui contredit l'autre." },
      { icon: Copy, title: "Moins de ressaisie", text: "L'information est saisie une fois, à la source, puis elle circule." },
    ],
  },
  {
    title: "Pour votre système",
    line: "ce qui rend l'outil solide dans le temps",
    items: [
      { icon: Plug, title: "Relié à vos outils", text: "Il parle à votre compta, votre agenda, votre fichier clients. On garde ce qui marche." },
      { icon: ShieldCheck, title: "Sécurisé", text: "Chacun voit ce qui le concerne. Connexion sécurisée, données hébergées en Europe, sauvegardes." },
      { icon: Cloud, title: "Évolutif", text: "On démarre par l'essentiel. Quand le besoin grandit, on ajoute, sans tout refaire." },
    ],
  },
  {
    title: "Pour votre entreprise",
    line: "ce que ça change sur les comptes et le pilotage",
    items: [
      { icon: Clock, title: "Du temps rendu", text: "Les heures passées à recopier, chercher et relancer reviennent au vrai travail." },
      { icon: TrendingUp, title: "Des coûts maîtrisés", text: "Pas de licence par utilisateur : l'outil vous appartient, vous payez ce qui vous sert." },
      { icon: Gauge, title: "Un pilotage simple", text: "Un tableau de bord qui répond à vos questions, pas à celles d'un éditeur." },
    ],
  },
];

// ─── E · Comment je travaille ───────────────────────────────────────────────

export const METHOD_STEPS: { icon: LucideIcon; title: string; text: string; gives: string }[] = [
  { icon: Eye, title: "J'observe le terrain", text: "Je viens voir comment vous travaillez, je lis vos fichiers, je parle à ceux qui s'en serviront.", gives: "la liste de ce qui coince, par ordre de coût" },
  { icon: LayoutTemplate, title: "On cadre ensemble", text: "On choisit ce qui compte le plus. Le périmètre et le prix sont fixés avant de commencer.", gives: "une proposition chiffrée, sans jargon" },
  { icon: PenLine, title: "Vous testez une maquette", text: "Vous cliquez dans les écrans avant qu'une ligne de code soit écrite. On ajuste à ce moment-là, quand ça ne coûte presque rien.", gives: "des écrans validés par vos équipes" },
  { icon: Hammer, title: "Je construis par étapes", text: "Vous voyez l'outil avancer régulièrement, et vous corrigez la trajectoire en cours de route.", gives: "une version utilisable tôt" },
  { icon: Rocket, title: "On met en service", text: "Reprise de vos données, prise en main avec vos équipes, démarrage en douceur.", gives: "un outil en service, pris en main" },
  { icon: LifeBuoy, title: "Je reste là", text: "Je corrige, j'ajuste, je fais évoluer. Vous gardez le même interlocuteur.", gives: "un outil qui suit votre activité" },
];

export const METHOD_STARTS: { title: string; text: string }[] = [
  { title: "Vous partez de zéro", text: "Excel, papier, un peu de tout : on construit la première version de votre outil." },
  { title: "Vous avez déjà un outil", text: "Il ne suit plus, il coûte trop cher ? Je fais le point, puis on reprend ce qui doit l'être, sans tout casser." },
];

export const METHOD_TRUST = [
  "Un seul interlocuteur, du premier échange au suivi",
  "Le prix est fixé avant de démarrer",
  "Vous voyez l'outil avancer, étape par étape",
  "Le code vous appartient",
];

export const METHOD_PRICE = {
  value: "de 1 500 à 15 000 €",
  line: "selon le nombre de fonctions et d'écrans. Au-delà, pour une plateforme complète : sur devis.",
};

// ─── H · Cas concret ────────────────────────────────────────────────────────

export const CASE = {
  context: "Projet réalisé en entreprise, dans le secteur des télécoms. Utilisé au quotidien.",
  disclaimer: "Interfaces reconstituées avec des données d'exemple.",
  before: {
    title: "Avant",
    lines: [
      "Les techniciens remplissaient leurs rapports d'intervention à la main.",
      "Au retour, le bureau ressaisissait tout.",
      "Des documents s'égaraient, les clients attendaient leur compte-rendu.",
    ],
  },
  built: {
    title: "Ce que j'ai construit",
    spaces: [
      { title: "Espace technicien", line: "le rapport se remplit depuis le téléphone, sur place" },
      { title: "Espace responsable", line: "toute l'activité suivie sur un tableau de bord" },
    ],
  },
  after: {
    title: "Après",
    lines: [
      "Le rapport est saisi une seule fois, sur le terrain.",
      "Les responsables voient l'activité d'un coup d'œil.",
      "Dès qu'un rapport est validé, le client le reçoit par mail.",
    ],
  },
  gains: [
    { icon: Copy, label: "Plus de ressaisie au bureau" },
    { icon: Files, label: "Plus de papier égaré" },
    { icon: Handshake, label: "Le client n'attend plus" },
  ],
};
