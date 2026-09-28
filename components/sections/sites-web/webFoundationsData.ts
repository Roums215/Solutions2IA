export type FoundationLayer = "VISIBILITÉ" | "PILOTAGE";

export type FoundationStrate = {
  key: string;
  numero: string;
  label: string;
  phrase: string;
  compteur: string;
  compteurType: "pillars" | "reference";
};

export type FoundationPilier = {
  numero: string;
  titre: string;
  benefice: string;
  sousLabelTechno: string;
  couche: FoundationLayer | null;
  coucheTag: string | null;
};

export const FOUNDATION_STRATES: FoundationStrate[] = [
  {
    key: "visibilite",
    numero: "01",
    label: "VISIBILITÉ",
    phrase: "être trouvé",
    compteur: "3 bénéfices",
    compteurType: "pillars",
  },
  {
    key: "circulation",
    numero: "02",
    label: "CIRCULATION",
    phrase: "recevoir une opportunité",
    compteur: "→ voir Blueprint",
    compteurType: "reference",
  },
  {
    key: "intelligence",
    numero: "03",
    label: "INTELLIGENCE",
    phrase: "traiter intelligemment",
    compteur: "→ voir RAG · IA",
    compteurType: "reference",
  },
  {
    key: "pilotage",
    numero: "04",
    label: "PILOTAGE",
    phrase: "piloter et améliorer",
    compteur: "1 bénéfice",
    compteurType: "pillars",
  },
];

export const FOUNDATION_PILIERS: FoundationPilier[] = [
  {
    numero: "01",
    titre: "Trouvé sur Google",
    benefice: "Vous apparaissez quand vos clients cherchent.",
    sousLabelTechno: "pages bien structurées · données lisibles par Google (schema.org) · vitesse mesurée par Google (Core Web Vitals)",
    couche: "VISIBILITÉ",
    coucheTag: "VISIBIL.",
  },
  {
    numero: "02",
    titre: "Présent dans les réponses IA",
    benefice:
      "Vos contenus apparaissent quand ChatGPT, Claude ou Perplexity répondent à vos prospects.",
    sousLabelTechno: "réponses claires que les IA peuvent citer · FAQ métier · fichier lu par les IA (llms.txt)",
    couche: "VISIBILITÉ",
    coucheTag: "VISIBIL.",
  },
  {
    numero: "03",
    titre: "Trouvé localement",
    benefice: "Vous apparaissez dans la recherche autour de vous + Google Maps.",
    sousLabelTechno: "fiche Google à jour · avis clients · mêmes nom, adresse et téléphone partout",
    couche: "VISIBILITÉ",
    coucheTag: "VISIBIL.",
  },
  {
    numero: "04",
    titre: "Expérience fluide partout",
    benefice: "Vos visiteurs restent engagés, sur téléphone comme sur 4K.",
    sousLabelTechno: "pensé pour le téléphone d'abord · du petit écran à la 4K · Next.js",
    couche: null,
    coucheTag: null,
  },
  {
    numero: "05",
    titre: "Accessible à tous",
    benefice: "Tout le monde peut vous lire et vous contacter, sans exception.",
    sousLabelTechno: "norme d'accessibilité (WCAG 2.2) · navigation au clavier · lecteurs d'écran · contrastes",
    couche: null,
    coucheTag: null,
  },
  {
    numero: "06",
    titre: "Données protégées",
    benefice: "Vos clients et votre entreprise sont en sécurité.",
    sousLabelTechno: "connexion chiffrée (HTTPS) · protections du navigateur (CSP) · mises à jour suivies · RGPD",
    couche: null,
    coucheTag: null,
  },
  {
    numero: "07",
    titre: "Durable et évolutif",
    benefice: "Le site tient dans le temps et grandit avec vous.",
    sousLabelTechno: "code typé et testé (TypeScript) · briques indépendantes · connexions claires vers vos outils",
    couche: null,
    coucheTag: null,
  },
  {
    numero: "08",
    titre: "Vous mesurez et ajustez",
    benefice:
      "Vous voyez ce qui marche, suivi mensuel + revue trimestrielle.",
    sousLabelTechno: "mesure d'audience sans cookie (Plausible) · suivi des demandes · vos indicateurs métier",
    couche: "PILOTAGE",
    coucheTag: "PILOT.",
  },
];

export const FOUNDATION_SEPARATOR_LABEL = "8 bénéfices business";

export const FOUNDATION_CLOSING =
  "Voilà pourquoi votre site n'est pas un site : c'est ce que vous obtenez en plus, chaque jour, sans avoir à y penser.";
