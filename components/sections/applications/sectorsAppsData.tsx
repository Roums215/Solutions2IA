import type { ReactNode } from "react";

export type SectorApp = {
  slug: "sante" | "retail" | "industrie" | "services-pro" | "logistique" | "immobilier";
  name: string;
  meta: string;
  pain: string;
  modules: string[];
  icon: ReactNode;
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "text-accent-light",
};

const SanteIcon = (
  <svg {...iconProps} aria-hidden="true">
    <path d="M5 4v6a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V4" />
    <path d="M5 4h1.5M11.5 4H13" />
    <path d="M13 14v2a4 4 0 0 0 4 4h1" />
    <circle cx="18.5" cy="20" r="2" />
  </svg>
);

const RetailIcon = (
  <svg {...iconProps} aria-hidden="true">
    <path d="M5 8h14l-1.2 11.2A2 2 0 0 1 15.8 21H8.2a2 2 0 0 1-2-1.8L5 8z" />
    <path d="M9 8V6a3 3 0 1 1 6 0v2" />
  </svg>
);

const IndustrieIcon = (
  <svg {...iconProps} aria-hidden="true">
    <path d="M3 21V11l5 3V11l5 3V9l8 4v8H3z" />
    <path d="M7 17h.01M11 17h.01M15 17h.01M19 17h.01" />
  </svg>
);

const ServicesProIcon = (
  <svg {...iconProps} aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
);

const LogistiqueIcon = (
  <svg {...iconProps} aria-hidden="true">
    <path d="M2 16V7a1 1 0 0 1 1-1h11v10" />
    <path d="M14 9h4l3 4v3h-7" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const ImmobilierIcon = (
  <svg {...iconProps} aria-hidden="true">
    <path d="M4 21V10l8-6 8 6v11" />
    <path d="M10 21v-6h4v6" />
    <path d="M8 12h.01M16 12h.01" />
  </svg>
);

export const SECTORS_APPS: SectorApp[] = [
  {
    slug: "sante",
    name: "Santé",
    meta: "Cabinets · Cliniques · Médico-social",
    pain: "Dossier patient éclaté entre papier, Excel et quatre logiciels, rendez-vous non honorés qui grignotent les journées, et les échéances du programme Ségur qui approchent.",
    modules: ["Prise de rendez-vous en ligne", "Dossier patient unique (DPI)", "Téléconsultation intégrée", "Messagerie de santé sécurisée (MSSanté)"],
    icon: SanteIcon,
  },
  {
    slug: "retail",
    name: "Retail / E-commerce",
    meta: "Boutiques · Marketplaces · Distribution",
    pain: "Un stock différent selon le canal, des fiches produits saisies trois fois, des paniers abandonnés sans relance, et la norme de paiement (PCI-DSS v4) qui s'impose.",
    modules: ["Fiches produits et commandes centralisées (PIM, OMS)", "Caisse reliée au stock", "Click & collect", "Fichier clients et fidélité"],
    icon: RetailIcon,
  },
  {
    slug: "industrie",
    name: "Industrie",
    meta: "PME · Sous-traitance · Usines",
    pain: "L'atelier piloté à la fiche papier, le rendement des machines estimé au doigt mouillé, et un ERP qui ne descend jamais jusqu'aux lignes de production.",
    modules: ["Ordres de fabrication sur tablette", "Maintenance suivie depuis le téléphone (GMAO)", "Rendement des machines en direct (OEE)", "Traçabilité des lots"],
    icon: IndustrieIcon,
  },
  {
    slug: "services-pro",
    name: "Services pro / Conseil",
    meta: "Avocats · Experts-comptables · Conseil",
    pain: "Des heures qui ne sont jamais facturées, du temps saisi dans Excel, la facture électronique obligatoire dès 2027 pour les PME, et des documents confidentiels qui circulent par mail.",
    modules: ["Suivi des dossiers", "Temps saisi, facture générée", "Documents et signature électronique", "Facture électronique (plateforme agréée)"],
    icon: ServicesProIcon,
  },
  {
    slug: "logistique",
    name: "Logistique / Transport",
    meta: "Transporteurs · Last-mile · Flotte",
    pain: "Des bons de livraison papier qui se perdent, le dernier kilomètre qui coûte le plus cher, la lettre de voiture électronique (eCMR) attendue pour 2027, et aucune visibilité sur les chauffeurs en temps réel.",
    modules: ["Gestion des transports (TMS)", "Tournées optimisées", "Preuve de livraison : photo et signature (ePOD)", "Suivi et heure d'arrivée estimée"],
    icon: LogistiqueIcon,
  },
  {
    slug: "immobilier",
    name: "Immobilier / BTP",
    meta: "Agences · Promoteurs · Entreprises BTP",
    pain: "Mandats sur carnet, pointage chantier litigieux, marges qui fondent au moindre écart de budget.",
    modules: ["Fichier clients et mandats conformes à la loi Hoguet", "Pointage chantier géolocalisé", "Du devis à la facture", "Avancement et marge par chantier"],
    icon: ImmobilierIcon,
  },
];
