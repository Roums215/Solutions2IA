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
  moduleDetails: { name: string; text: string }[];
  kpis: { value: string; label: string; hint: string }[];
  compliance: string;
};

export const SECTOR_VERTICALS: Record<SectorApp["slug"], SectorVertical> = {
  sante: {
    slug: "sante",
    seoTitle: "Application santé sur mesure — cabinet, DPI, RDV, Ségur",
    seoDescription:
      "Application métier pour cabinets et structures de santé : agenda RDV anti no-show, dossier patient unifié, téléconsultation, MSSanté/INS. Hébergement HDS possible.",
    keywords: [
      "logiciel cabinet médical sur mesure",
      "DPI dossier patient informatisé PME santé",
      "application prise de rendez-vous médical",
      "Ségur santé MSSanté INS",
    ],
    heroAccent: "le cockpit du cabinet",
    intro:
      "Dossier patient éclaté entre papier, Excel et quatre logiciels qui ne se parlent pas ; no-show qui grignote les journées ; échéances Ségur qui approchent. Une application santé sur mesure réunit agenda, dossier patient et échanges sécurisés dans un seul outil — pensé avec votre équipe, conforme dès la conception.",
    moduleDetails: [
      {
        name: "RDV en ligne",
        text: "Prise de rendez-vous en ligne avec rappels SMS/email automatiques : le no-show descend et l'accueil respire. L'agenda montre téléconsultations et présentiel dans la même vue.",
      },
      {
        name: "DPI unifié",
        text: "Un dossier patient informatisé unique : antécédents, comptes-rendus, documents, courriers. Fini les triples saisies entre logiciels — l'information suit le patient.",
      },
      {
        name: "Téléconsultation",
        text: "Consultation vidéo intégrée à l'agenda, sans outil externe : le patient reçoit un lien, le praticien retrouve le dossier ouvert à côté de la vidéo.",
      },
      {
        name: "MSSanté / INS",
        text: "Échanges par messagerie sécurisée de santé et identité nationale de santé intégrés — le socle des exigences Ségur, télétransmission incluse.",
      },
    ],
    kpis: [
      { value: "6,4 %", label: "no-show", hint: "cabinet 4 praticiens, rappels automatiques" },
      { value: "98,2 %", label: "télétransmission", hint: "flux sécurisés intégrés" },
      { value: "1 seul", label: "outil au quotidien", hint: "agenda + DPI + téléconsult réunis" },
    ],
    compliance:
      "Hébergement des données de santé (HDS) possible, RGPD par construction : registre des traitements, purge sous 24 h, accès tracés.",
  },
  retail: {
    slug: "retail",
    seoTitle: "Application retail/e-commerce sur mesure — PIM, OMS, stock",
    seoDescription:
      "Application sur mesure pour boutiques et e-commerce : stock unifié multi-canal, PIM/OMS, click & collect, caisse connectée, CRM fidélité. Fini les silos entre canaux.",
    keywords: [
      "application e-commerce sur mesure PME",
      "PIM OMS stock multi-canal",
      "click and collect logiciel boutique",
      "CRM fidélité commerce",
    ],
    heroAccent: "un seul stock, tous vos canaux",
    intro:
      "Boutique, site, marketplaces : trois stocks qui divergent, des fiches produit recopiées partout, des paniers abandonnés sans relance. Une application retail sur mesure unifie produits, stocks et commandes — chaque canal lit la même vérité, en temps réel.",
    moduleDetails: [
      {
        name: "PIM / OMS",
        text: "Une fiche produit unique poussée vers tous les canaux, et toutes les commandes (site, boutique, marketplaces) dans un seul flux de préparation.",
      },
      {
        name: "POS connecté",
        text: "La caisse parle au stock central : une vente en boutique met à jour le site instantanément. Plus de survente, plus d'inventaires surprise.",
      },
      {
        name: "Click & collect",
        text: "Le client commande en ligne, retire en boutique ; l'équipe reçoit la préparation, le stock se réserve tout seul, le client est notifié.",
      },
      {
        name: "CRM fidélité",
        text: "Historique d'achat unifié en ligne + boutique : segments, relances panier, offres ciblées — la donnée client travaille enfin pour vous.",
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
    seoTitle: "Application industrie sur mesure — MES, OEE/TRS, suivi OF",
    seoDescription:
      "Application atelier sur mesure pour PME industrielles : suivi des ordres de fabrication sur tablette, OEE/TRS en temps réel, GMAO mobile, traçabilité des lots.",
    keywords: [
      "MES PME industrie sur mesure",
      "logiciel suivi OF atelier tablette",
      "TRS OEE temps réel",
      "GMAO mobile maintenance",
    ],
    heroAccent: "l'atelier en temps réel",
    intro:
      "Les fiches suiveuses papier se perdent, le TRS s'estime au doigt mouillé, et l'ERP du bureau ne descend jamais jusqu'aux machines. Une application industrie sur mesure fait remonter la production en direct — chaque ligne, chaque OF, chaque arrêt — sans alourdir le geste des opérateurs.",
    moduleDetails: [
      {
        name: "Suivi OF tablette",
        text: "L'opérateur déclare début, fin, quantités et rebuts en deux gestes sur tablette durcie. Le bureau voit l'avancement réel sans appeler l'atelier.",
      },
      {
        name: "MES / OEE live",
        text: "OEE et TRS calculés en continu par ligne : disponibilité, performance, qualité. Les causes d'arrêt se déclarent à la source et se classent toutes seules.",
      },
      {
        name: "GMAO mobile",
        text: "Demandes d'intervention, préventif planifié, historique machine : la maintenance sort du cahier et le MTBF devient un chiffre fiable.",
      },
      {
        name: "Traçabilité lots",
        text: "Chaque lot relie matières, opérations et contrôles : un rappel qualité se traite en minutes, pas en jours d'archives.",
      },
    ],
    kpis: [
      { value: "4 lignes", label: "OEE en direct", hint: "atelier pilote, TRS par ligne" },
      { value: "MTBF ↑", label: "maintenance outillée", hint: "préventif planifié, pannes tracées" },
      { value: "0 papier", label: "suivi de production", hint: "fiches suiveuses digitalisées" },
    ],
    compliance:
      "Fonctionne en réseau local si l'atelier l'exige, exports vers votre ERP, données industrielles hébergées en UE.",
  },
  "services-pro": {
    slug: "services-pro",
    seoTitle: "Application cabinet & conseil — temps, facturation, Chorus Pro",
    seoDescription:
      "Application sur mesure pour avocats, experts-comptables et conseils : suivi des temps, facturation automatique, GED avec signature, Chorus Pro / facture électronique 2026.",
    keywords: [
      "logiciel avocat facturation temps",
      "facture électronique 2026 cabinet",
      "Chorus Pro PDP services professionnels",
      "matter management sur mesure",
    ],
    heroAccent: "chaque heure compte, enfin",
    intro:
      "Les heures facturables s'évaporent dans les tableurs, la facture électronique devient obligatoire en 2026, et le secret professionnel interdit les outils approximatifs. Une application sur mesure trace le temps sans friction, transforme les heures en factures conformes, et garde vos dossiers sous clé européenne.",
    moduleDetails: [
      {
        name: "Matter management",
        text: "Chaque dossier centralise contacts, échéances, documents et temps passés. Le pipeline du cabinet se lit d'un écran : dossiers actifs, en attente, à facturer.",
      },
      {
        name: "Time → facture",
        text: "Le temps se saisit en un geste (ou se déduit de l'agenda), puis se transforme en facture sans recopie. Le billable rate cesse d'être une estimation.",
      },
      {
        name: "GED + e-sign",
        text: "Gestion documentaire avec versions, modèles et signature électronique intégrée — les allers-retours d'engagement se règlent en heures, pas en semaines.",
      },
      {
        name: "Chorus Pro / PDP",
        text: "Factures au format électronique réglementaire (Factur-X), transmission Chorus Pro ou plateforme agréée : l'obligation 2026 devient un non-événement.",
      },
    ],
    kpis: [
      { value: "12 collab.", label: "pipeline unifié", hint: "cabinet pilote, dossiers + facturation" },
      { value: "Billable ↑", label: "temps réellement facturé", hint: "saisie sans friction" },
      { value: "2026 ✓", label: "facture électronique prête", hint: "Factur-X, Chorus Pro / PDP" },
    ],
    compliance:
      "Secret professionnel respecté : hébergement UE exclusif, accès tracés, cloisonnement par dossier, purge sur demande.",
  },
  logistique: {
    slug: "logistique",
    seoTitle: "Application transport & logistique — TMS, ePOD, tournées",
    seoDescription:
      "Application sur mesure pour transporteurs : TMS, optimisation de tournées, preuve de livraison ePOD photo + signature, tracking temps réel avec ETA. Prêt pour l'eCMR.",
    keywords: [
      "TMS sur mesure transporteur PME",
      "ePOD preuve de livraison électronique",
      "optimisation tournées livraison",
      "eCMR lettre de voiture électronique",
    ],
    heroAccent: "chaque livraison prouvée",
    intro:
      "Des bons de livraison papier qui se perdent, un last-mile qui pèse plus de la moitié du coût, des clients qui appellent pour savoir « où est le camion ». Une application logistique sur mesure met tournées, preuves de livraison et position des véhicules dans le même écran — pour vous et pour vos clients.",
    moduleDetails: [
      {
        name: "TMS",
        text: "Commandes, affrètement, planning conducteurs : le transport se pilote depuis un seul outil, adapté à vos flux réels plutôt qu'à un standard.",
      },
      {
        name: "Tournées optimisées",
        text: "Les tournées se calculent selon vos contraintes (créneaux, gabarits, priorités) : moins de kilomètres à vide, plus de livraisons par véhicule.",
      },
      {
        name: "ePOD photo + signature",
        text: "Le chauffeur photographie, fait signer sur mobile, et la preuve de livraison arrive au bureau en temps réel. Les litiges se règlent preuve à l'appui.",
      },
      {
        name: "Tracking + ETA",
        text: "Position des véhicules et heure d'arrivée estimée, partageables au client : les appels « où en est ma livraison » disparaissent.",
      },
    ],
    kpis: [
      { value: "18 véhic.", label: "flotte suivie en direct", hint: "tournées + ETA temps réel" },
      { value: "OTD ↑", label: "livraisons à l'heure", hint: "on-time delivery mesuré, pas estimé" },
      { value: "0 BL papier", label: "preuves numériques", hint: "ePOD photo + signature" },
    ],
    compliance:
      "Prêt pour l'eCMR (lettre de voiture électronique) : documents de transport numériques, horodatés, opposables.",
  },
  immobilier: {
    slug: "immobilier",
    seoTitle: "Application immobilier & BTP — CRM Hoguet, chantiers, marges",
    seoDescription:
      "Application sur mesure pour agences et entreprises BTP : CRM mandats conforme loi Hoguet, pointage chantier géolocalisé, devis → facture, marge par chantier en direct.",
    keywords: [
      "CRM immobilier loi Hoguet",
      "logiciel suivi chantier BTP PME",
      "pointage chantier géolocalisé",
      "marge chantier temps réel",
    ],
    heroAccent: "mandats et chantiers sous contrôle",
    intro:
      "Des mandats suivis sur carnet, des pointages chantier contestés, des marges découvertes en fin d'opération quand il est trop tard. Une application immobilier/BTP sur mesure relie commercial, terrain et finances — chaque chantier montre sa marge pendant qu'on peut encore agir.",
    moduleDetails: [
      {
        name: "CRM mandats Hoguet",
        text: "Registre des mandats conforme loi Hoguet, pipeline vendeurs/acquéreurs, relances automatiques : l'activité commerciale se pilote, ne se subit plus.",
      },
      {
        name: "Pointage géolocalisé",
        text: "Les équipes pointent sur mobile, géolocalisées au chantier : heures fiables, litiges éteints, paie préparée automatiquement.",
      },
      {
        name: "Devis → facture",
        text: "Du devis à la facture (et aux situations de travaux) sans recopie : avenants tracés, acomptes suivis, trésorerie lisible.",
      },
      {
        name: "Suivi avancement",
        text: "Photos, avancement par lot, dépenses engagées : chaque chantier montre où il en est et ce qu'il coûte, en temps réel.",
      },
    ],
    kpis: [
      { value: "7 sites", label: "chantiers en parallèle", hint: "marge suivie par chantier" },
      { value: "Marge ↑", label: "écarts vus tôt", hint: "budget vs engagé en direct" },
      { value: "0 litige", label: "pointage opposable", hint: "géolocalisé + horodaté" },
    ],
    compliance:
      "Registre des mandats conforme loi Hoguet, données clients RGPD, documents de chantier archivés et horodatés.",
  },
};
