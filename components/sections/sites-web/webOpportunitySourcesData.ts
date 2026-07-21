export type SourceIcon =
  | "search"
  | "building"
  | "sparkles"
  | "share"
  | "megaphone"
  | "users"
  | "handshake"
  | "calendar"
  | "qrcode";

export type SourceGroup = "numerique" | "diffusion" | "terrain";

export type OpportunitySource = {
  key: string;
  label: string;
  sublabel: string;
  icon: SourceIcon;
  group: SourceGroup;
};

export const OPPORTUNITY_SOURCES: OpportunitySource[] = [
  // Groupe 1 — Numérique
  {
    key: "google-search",
    label: "Google Search",
    sublabel: "référencement organique · contenu structuré",
    icon: "search",
    group: "numerique",
  },
  {
    key: "gmb",
    label: "Google Business Profile",
    sublabel: "recherche locale · avis Google · fiche établissement",
    icon: "building",
    group: "numerique",
  },
  {
    key: "geo",
    label: "Visibilité IA (GEO)",
    sublabel: "ChatGPT · Claude · Perplexity · Gemini",
    icon: "sparkles",
    group: "numerique",
  },

  // Groupe 2 — Diffusion
  {
    key: "social",
    label: "Réseaux sociaux",
    sublabel: "LinkedIn · Instagram · TikTok · YouTube",
    icon: "share",
    group: "diffusion",
  },
  {
    key: "ads",
    label: "Publicité",
    sublabel: "Google Ads · Meta Ads · LinkedIn Ads · landing pages",
    icon: "megaphone",
    group: "diffusion",
  },
  {
    key: "referral",
    label: "Recommandation",
    sublabel: "bouche-à-oreille · referrals · ambassadeurs",
    icon: "users",
    group: "diffusion",
  },

  // Groupe 3 — Terrain
  {
    key: "partners",
    label: "Partenaires",
    sublabel: "apporteurs d'affaires · réseaux pro · syndicats métier",
    icon: "handshake",
    group: "terrain",
  },
  {
    key: "events",
    label: "Salons et événements",
    sublabel: "conférences · foires · webinars",
    icon: "calendar",
    group: "terrain",
  },
  {
    key: "physical",
    label: "QR codes et supports physiques",
    sublabel: "flyers · cartes · vitrines · packaging",
    icon: "qrcode",
    group: "terrain",
  },
];

export const SOURCE_GROUP_LABELS: Record<SourceGroup, string> = {
  numerique: "Numérique",
  diffusion: "Diffusion",
  terrain: "Terrain",
};

export const SOURCES_ADAPTIVE_LINES = [
  "Un artisan vit du Google Business Profile et du bouche-à-oreille.",
  "Un cabinet de conseil vit d'être bien trouvé sur Google, de LinkedIn et des partenaires.",
  "Un commerce local vit de la recherche locale, des avis et des QR codes en boutique.",
  "Une PME services vit d'un mix orchestré.",
];

export const SOURCES_ADAPTIVE_CONCLUSION =
  "Je branche les canaux qui comptent pour vous, et on laisse de côté les autres.";

export const SOURCES_CLOSING =
  "Neuf canaux. Un seul site qui les centralise et les transforme en contacts qualifiés.";

export const SOURCES_BRIDGE_TO_BLUEPRINT =
  "Une fois sur votre site, voici comment l'opportunité circule";
