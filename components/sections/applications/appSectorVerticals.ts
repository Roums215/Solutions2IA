/**
 * Contenu des pages verticales /applications/[secteur].
 *
 * Étend SECTORS_APPS (sectorsAppsData.tsx — cartes de la page pilier) avec
 * le contenu SEO + page complet par secteur. KPIs et vocabulaire alignés
 * sur la FAQ (lib/content/faqData.ts, « Combien de secteurs sont déjà couverts ? »).
 */

import type { SectorApp } from "./sectorsAppsData";

export type SectorVertical = {
  slug: SectorApp["slug"];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Fragment mis en gradient dans le titre du hero. */
  heroAccent: string;
  intro: string;
  /** Pour qui : une phrase, taille et situation typiques. */
  audience: string;
  moduleDetails: { name: string; text: string }[];
  kpis: { value: string; label: string; hint: string }[];
  compliance: string;
};

export const SECTOR_VERTICALS: Record<SectorApp["slug"], SectorVertical> = {
  sante: {
    slug: "sante",
    seoTitle: "Application santé : agenda, dossier patient",
    seoDescription:
      "Application sur mesure pour cabinets de santé : rendez-vous avec rappels, dossier patient unique, téléconsultation, messagerie sécurisée (MSSanté). Ségur prêt.",
    keywords: [
      "logiciel cabinet médical sur mesure",
      "DPI dossier patient informatisé PME santé",
      "application prise de rendez-vous médical",
      "Ségur santé MSSanté INS",
    ],
    heroAccent: "le cockpit du cabinet",
    intro:
      "Dossier patient éclaté entre papier, Excel et plusieurs logiciels qui ne se parlent pas ; rendez-vous non honorés qui grignotent les journées ; échéances Ségur qui approchent. Une application santé sur mesure réunit agenda, dossier patient et échanges sécurisés dans un seul outil, pensé avec votre équipe.",
    audience: "Cabinets de groupe, maisons de santé et centres de soins de 2 à 30 praticiens qui jonglent entre plusieurs logiciels.",
    moduleDetails: [
      {
        name: "Rendez-vous en ligne, rappels automatiques",
        text: "Prise de rendez-vous en ligne avec rappels SMS/email automatiques : le no-show descend et l'accueil respire. L'agenda montre téléconsultations et présentiel dans la même vue.",
      },
      {
        name: "Dossier patient unique (DPI)",
        text: "Un dossier patient informatisé unique : antécédents, comptes-rendus, documents, courriers. Fini les triples saisies entre logiciels : l'information suit le patient.",
      },
      {
        name: "Téléconsultation",
        text: "Consultation vidéo intégrée à l'agenda, sans outil externe : le patient reçoit un lien, le praticien retrouve le dossier ouvert à côté de la vidéo.",
      },
      {
        name: "Messagerie sécurisée et identité patient (MSSanté, INS)",
        text: "Échanges par messagerie sécurisée de santé et identité nationale de santé intégrés : le socle des exigences Ségur, télétransmission incluse.",
      },
    ],
    kpis: [
      { value: "< 7 %", label: "no-show visé", hint: "avec rappels automatiques par SMS et mail" },
      { value: "98 %+", label: "télétransmission visée", hint: "flux sécurisés intégrés à l'outil" },
      { value: "1 seul", label: "outil au quotidien", hint: "agenda + DPI + téléconsult réunis" },
    ],
    compliance:
      "Hébergement des données de santé (HDS) possible, RGPD par construction : registre des traitements, purge sous 24 h, accès tracés.",
  },
  retail: {
    slug: "retail",
    seoTitle: "Application boutique : stock unifié",
    seoDescription:
      "Application sur mesure pour commerces et e-commerce : un seul stock sur tous les canaux, fiches produits centralisées, click & collect, caisse reliée au stock.",
    keywords: [
      "application e-commerce sur mesure PME",
      "PIM OMS stock multi-canal",
      "click and collect logiciel boutique",
      "CRM fidélité commerce",
    ],
    heroAccent: "un seul stock, tous vos canaux",
    intro:
      "Boutique, site, marketplaces : trois stocks qui divergent, des fiches produit recopiées partout, des paniers abandonnés sans relance. Une application retail sur mesure unifie produits, stocks et commandes : chaque canal lit la même vérité, en temps réel.",
    audience: "Commerçants et e-commerçants qui vendent sur au moins deux canaux (boutique, site, marketplace) avec un même stock.",
    moduleDetails: [
      {
        name: "Fiches produits et commandes centralisées (PIM, OMS)",
        text: "Une fiche produit unique poussée vers tous les canaux, et toutes les commandes (site, boutique, marketplaces) dans un seul flux de préparation.",
      },
      {
        name: "Caisse reliée au stock (POS)",
        text: "La caisse parle au stock central : une vente en boutique met à jour le site instantanément. Plus de survente, plus d'inventaires surprise.",
      },
      {
        name: "Click & collect",
        text: "Le client commande en ligne, retire en boutique ; l'équipe reçoit la préparation, le stock se réserve tout seul, le client est notifié.",
      },
      {
        name: "Fichier clients et fidélité (CRM)",
        text: "Historique d'achat unifié en ligne + boutique : segments, relances panier, offres ciblées. La donnée client travaille enfin pour vous.",
      },
    ],
    kpis: [
      { value: "3 canaux", label: "un seul stock", hint: "site, boutique, marketplaces synchronisés" },
      { value: "AOV ↑", label: "panier moyen suivi", hint: "funnel et top produits en direct" },
      { value: "0", label: "ressaisie produit", hint: "fiche unique poussée partout" },
    ],
    compliance:
      "Paiements conformes PCI-DSS via prestataires certifiés, RGPD natif pour la donnée client (consentements, purge, export).",
  },
  industrie: {
    slug: "industrie",
    seoTitle: "Application atelier : production en direct",
    seoDescription:
      "Application sur mesure pour PME industrielles : ordres de fabrication sur tablette, rendement machines en direct, maintenance sur mobile, traçabilité des lots.",
    keywords: [
      "MES PME industrie sur mesure",
      "logiciel suivi OF atelier tablette",
      "TRS OEE temps réel",
      "GMAO mobile maintenance",
    ],
    heroAccent: "l'atelier en temps réel",
    intro:
      "Les fiches suiveuses papier se perdent, le rendement des machines (TRS) s'estime au doigt mouillé, et l'ERP du bureau ne descend jamais jusqu'aux machines. Une application industrie sur mesure fait remonter la production en direct : chaque ligne, chaque ordre de fabrication, chaque arrêt, sans alourdir le geste des opérateurs.",
    audience: "Ateliers et PME industrielles de 10 à 200 personnes dont la production se pilote encore sur papier ou Excel.",
    moduleDetails: [
      {
        name: "Ordres de fabrication sur tablette (OF)",
        text: "L'opérateur déclare début, fin, quantités et rebuts en deux gestes sur tablette durcie. Le bureau voit l'avancement réel sans appeler l'atelier.",
      },
      {
        name: "Rendement des machines en direct (OEE, TRS)",
        text: "OEE et TRS calculés en continu par ligne : disponibilité, performance, qualité. Les causes d'arrêt se déclarent à la source et se classent toutes seules.",
      },
      {
        name: "Maintenance suivie sur mobile (GMAO)",
        text: "Demandes d'intervention, préventif planifié, historique machine : la maintenance sort du cahier et le MTBF devient un chiffre fiable.",
      },
      {
        name: "Traçabilité des lots",
        text: "Chaque lot relie matières, opérations et contrôles : un rappel qualité se traite en minutes, pas en jours d'archives.",
      },
    ],
    kpis: [
      { value: "En direct", label: "rendement des machines (OEE)", hint: "TRS par ligne, mis à jour en continu" },
      { value: "MTBF ↑", label: "maintenance outillée", hint: "préventif planifié, pannes tracées" },
      { value: "0 papier", label: "suivi de production", hint: "fiches suiveuses digitalisées" },
    ],
    compliance:
      "Fonctionne en réseau local si l'atelier l'exige, exports vers votre ERP, données industrielles hébergées en UE.",
  },
  "services-pro": {
    slug: "services-pro",
    seoTitle: "Application cabinet : temps et facturation",
    seoDescription:
      "Application sur mesure pour avocats, experts-comptables et conseils : temps saisi puis facturé, documents signés en ligne, facture électronique prête pour 2027.",
    keywords: [
      "logiciel avocat facturation temps",
      "facture électronique 2026 cabinet",
      "Chorus Pro PDP services professionnels",
      "matter management sur mesure",
    ],
    heroAccent: "chaque heure compte, enfin",
    intro:
      "Les heures facturables s'évaporent dans les tableurs, la facture électronique s'impose (réception depuis septembre 2026, émission dès septembre 2027 pour les PME), et le secret professionnel interdit les outils approximatifs. Une application sur mesure trace le temps sans friction, transforme les heures en factures conformes, et garde vos dossiers sous clé européenne.",
    audience: "Cabinets d'avocats, d'expertise comptable et de conseil qui facturent au temps et manipulent des documents confidentiels.",
    moduleDetails: [
      {
        name: "Suivi des dossiers",
        text: "Chaque dossier centralise contacts, échéances, documents et temps passés. Le pipeline du cabinet se lit d'un écran : dossiers actifs, en attente, à facturer.",
      },
      {
        name: "Du temps saisi à la facture",
        text: "Le temps se saisit en un geste (ou se déduit de l'agenda), puis se transforme en facture sans recopie. Le billable rate cesse d'être une estimation.",
      },
      {
        name: "Documents et signature électronique (GED)",
        text: "Gestion documentaire avec versions, modèles et signature électronique intégrée : les allers-retours d'engagement se règlent en heures, pas en semaines.",
      },
      {
        name: "Facture électronique : Chorus Pro et plateforme agréée",
        text: "Factures au format électronique réglementaire (Factur-X), transmission Chorus Pro ou plateforme agréée : l'obligation 2026 devient un non-événement.",
      },
    ],
    kpis: [
      { value: "1 seul", label: "outil pour dossiers et facturation", hint: "temps saisi, facture générée, sans ressaisie" },
      { value: "Billable ↑", label: "temps réellement facturé", hint: "saisie sans friction" },
      { value: "Prêt 2027", label: "facture électronique", hint: "Factur-X, plateforme agréée par l'État" },
    ],
    compliance:
      "Secret professionnel respecté : hébergement UE exclusif, accès tracés, cloisonnement par dossier, purge sur demande.",
  },
  logistique: {
    slug: "logistique",
    seoTitle: "Application transport : tournées et preuves",
    seoDescription:
      "Application sur mesure pour transporteurs : tournées optimisées, preuve de livraison photo et signature, position des camions, heure d'arrivée. Prête eCMR.",
    keywords: [
      "TMS sur mesure transporteur PME",
      "ePOD preuve de livraison électronique",
      "optimisation tournées livraison",
      "eCMR lettre de voiture électronique",
    ],
    heroAccent: "chaque livraison prouvée",
    intro:
      "Des bons de livraison papier qui se perdent, un dernier kilomètre qui coûte le plus cher, des clients qui appellent pour savoir « où est le camion ». Une application logistique sur mesure met tournées, preuves de livraison et position des véhicules dans le même écran : pour vous et pour vos clients.",
    audience: "Transporteurs et logisticiens de 5 à 100 véhicules qui veulent voir leurs tournées et prouver leurs livraisons.",
    moduleDetails: [
      {
        name: "Gestion des transports (TMS)",
        text: "Commandes, affrètement, planning conducteurs : le transport se pilote depuis un seul outil, adapté à vos flux réels plutôt qu'à un standard.",
      },
      {
        name: "Tournées optimisées",
        text: "Les tournées se calculent selon vos contraintes (créneaux, gabarits, priorités) : moins de kilomètres à vide, plus de livraisons par véhicule.",
      },
      {
        name: "Preuve de livraison : photo et signature (ePOD)",
        text: "Le chauffeur photographie, fait signer sur mobile, et la preuve de livraison arrive au bureau en temps réel. Les litiges se règlent preuve à l'appui.",
      },
      {
        name: "Suivi des véhicules et heure d'arrivée (ETA)",
        text: "Position des véhicules et heure d'arrivée estimée, partageables au client : les appels « où en est ma livraison » disparaissent.",
      },
    ],
    kpis: [
      { value: "Temps réel", label: "flotte suivie", hint: "tournées et heure d'arrivée estimée en direct" },
      { value: "OTD ↑", label: "livraisons à l'heure", hint: "on-time delivery mesuré, pas estimé" },
      { value: "0 BL papier", label: "preuves numériques", hint: "ePOD photo + signature" },
    ],
    compliance:
      "Prêt pour l'eCMR (lettre de voiture électronique) : documents de transport numériques, horodatés, opposables.",
  },
  immobilier: {
    slug: "immobilier",
    seoTitle: "Application immobilier et BTP : marges",
    seoDescription:
      "Application sur mesure pour agences immobilières et BTP : mandats loi Hoguet, pointage géolocalisé, du devis à la facture, marge par chantier en direct.",
    keywords: [
      "CRM immobilier loi Hoguet",
      "logiciel suivi chantier BTP PME",
      "pointage chantier géolocalisé",
      "marge chantier temps réel",
    ],
    heroAccent: "mandats et chantiers sous contrôle",
    intro:
      "Des mandats suivis sur carnet, des pointages chantier contestés, des marges découvertes en fin d'opération quand il est trop tard. Une application immobilier/BTP sur mesure relie commercial, terrain et finances : chaque chantier montre sa marge pendant qu'on peut encore agir.",
    audience: "Agences immobilières et entreprises du bâtiment qui suivent mandats, chantiers et marges dans des outils séparés.",
    moduleDetails: [
      {
        name: "Mandats et fichier clients conformes loi Hoguet",
        text: "Registre des mandats conforme loi Hoguet, pipeline vendeurs/acquéreurs, relances automatiques : l'activité commerciale se pilote, ne se subit plus.",
      },
      {
        name: "Pointage chantier géolocalisé",
        text: "Les équipes pointent sur mobile, géolocalisées au chantier : heures fiables, litiges éteints, paie préparée automatiquement.",
      },
      {
        name: "Du devis à la facture",
        text: "Du devis à la facture (et aux situations de travaux) sans recopie : avenants tracés, acomptes suivis, trésorerie lisible.",
      },
      {
        name: "Avancement et marge par chantier",
        text: "Photos, avancement par lot, dépenses engagées : chaque chantier montre où il en est et ce qu'il coûte, en temps réel.",
      },
    ],
    kpis: [
      { value: "Par chantier", label: "marge suivie", hint: "budget prévu contre engagé, en direct" },
      { value: "Marge ↑", label: "écarts vus tôt", hint: "budget vs engagé en direct" },
      { value: "Horodaté", label: "pointage opposable", hint: "géolocalisé, signé, exportable" },
    ],
    compliance:
      "Registre des mandats conforme loi Hoguet, données clients RGPD, documents de chantier archivés et horodatés.",
  },
};
