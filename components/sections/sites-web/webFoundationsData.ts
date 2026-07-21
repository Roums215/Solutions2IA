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
    sousLabelTechno: "pages structurées · schema.org · Core Web Vitals",
    couche: "VISIBILITÉ",
    coucheTag: "VISIBIL.",
  },
  {
    numero: "02",
    titre: "Présent dans les réponses IA",
    benefice:
      "Vos contenus apparaissent quand ChatGPT, Claude ou Perplexity répondent à vos prospects.",
    sousLabelTechno: "contenus extractibles · expertise structurée · FAQ métier · llms.txt",
    couche: "VISIBILITÉ",
    coucheTag: "VISIBIL.",
  },
  {
    numero: "03",
    titre: "Trouvé localement",
    benefice: "Vous apparaissez dans la recherche autour de vous + Google Maps.",
    sousLabelTechno: "Google Business Profile · avis · NAP cohérent",
    couche: "VISIBILITÉ",
    coucheTag: "VISIBIL.",
  },
  {
    numero: "04",
    titre: "Expérience fluide partout",
    benefice: "Vos visiteurs restent engagés, sur téléphone comme sur 4K.",
    sousLabelTechno: "Next.js · mobile-first · 320 → 4K · build optim",
    couche: null,
    coucheTag: null,
  },
  {
    numero: "05",
    titre: "Accessible à tous",
    benefice: "Tout le monde peut vous lire et vous contacter, sans exception.",
    sousLabelTechno: "WCAG 2.2 · clavier · lecteurs d'écran · contrastes",
    couche: null,
    coucheTag: null,
  },
  {
    numero: "06",
    titre: "Données protégées",
    benefice: "Vos clients et votre entreprise sont en sécurité.",
    sousLabelTechno: "HTTPS · CSP · audit dépendances · RGPD",
    couche: null,
    coucheTag: null,
  },
  {
    numero: "07",
    titre: "Durable et évolutif",
    benefice: "Le site tient dans le temps et grandit avec vous.",
    sousLabelTechno: "TypeScript · architecture modulaire · APIs claires · tests",
    couche: null,
    coucheTag: null,
  },
  {
    numero: "08",
    titre: "Vous mesurez et ajustez",
    benefice:
      "Vous voyez ce qui marche, suivi mensuel + revue trimestrielle.",
    sousLabelTechno: "Plausible · Posthog · suivi des demandes · KPI métier",
    couche: "PILOTAGE",
    coucheTag: "PILOT.",
  },
];

export const FOUNDATION_SEPARATOR_LABEL = "8 bénéfices business";

export const FOUNDATION_CLOSING =
  "Voilà pourquoi votre site n'est pas un site : c'est ce que vous obtenez en plus, chaque jour, sans avoir à y penser.";
