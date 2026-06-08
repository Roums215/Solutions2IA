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
    pain: "Dossier patient fragmenté entre papier, Excel et quatre logiciels, no-show à 15 % et Ségur en retard.",
    modules: ["RDV en ligne", "DPI unifié", "Téléconsult", "MSSanté/INS"],
    icon: SanteIcon,
  },
  {
    slug: "retail",
    name: "Retail / E-commerce",
    meta: "Boutiques · Marketplaces · Distribution",
    pain: "Stock multi-canal en silos, 70 % d'abandon panier, PIM inexistant et PCI-DSS v4 qui presse.",
    modules: ["PIM/OMS", "POS connecté", "Click & collect", "CRM fidélité"],
    icon: RetailIcon,
  },
  {
    slug: "industrie",
    name: "Industrie",
    meta: "PME · Sous-traitance · Usines",
    pain: "Atelier piloté à la fiche papier, TRS estimé au doigt, ERP qui ne descend pas en production.",
    modules: ["Suivi OF tablette", "GMAO mobile", "MES / OEE live", "Traçabilité lots"],
    icon: IndustrieIcon,
  },
  {
    slug: "services-pro",
    name: "Services pro / Conseil",
    meta: "Avocats · Experts-comptables · Conseil",
    pain: "Heures non facturables, time tracking Excel, facture électronique obligatoire en 2026 et secret pro exposé.",
    modules: ["Matter management", "Time → facture", "GED + e-sign", "Chorus Pro / PDP"],
    icon: ServicesProIcon,
  },
  {
    slug: "logistique",
    name: "Logistique / Transport",
    meta: "Transporteurs · Last-mile · Flotte",
    pain: "Bons de livraison papier perdus, last-mile à 53 % du coût, eCMR 2027 et zéro visibilité chauffeur en temps réel.",
    modules: ["TMS", "Tournées optimisées", "ePOD photo + signature", "Tracking + ETA"],
    icon: LogistiqueIcon,
  },
  {
    slug: "immobilier",
    name: "Immobilier / BTP",
    meta: "Agences · Promoteurs · Entreprises BTP",
    pain: "Mandats sur carnet, pointage chantier litigieux, marges qui fondent au moindre écart de budget.",
    modules: ["CRM mandats Hoguet", "Pointage géolocalisé", "Devis → facture", "Suivi avancement"],
    icon: ImmobilierIcon,
  },
];
