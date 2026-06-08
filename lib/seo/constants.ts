/**
 * SEO constants centralisées — source de vérité unique.
 * Évite le drift entre metadata, schemas et OG images.
 */

export const SITE_URL = "https://solutions2ia.com";
export const SITE_NAME = "Solutions 2IA";
export const SITE_TAGLINE = "Applications IA, agents IA, sites web et automatisation sur mesure";
export const SITE_DESCRIPTION =
  "Agence digitale française : applications métier, agents IA souverains (RAG, hébergement UE), sites web, automatisation Axonaut/JobPhoning et studio visuel premium. Audit 30 j dérisqué.";

export const SITE_LOCALE = "fr_FR";
export const SITE_LANG = "fr";
export const SITE_COUNTRY = "FR";

export const BRAND = {
  primary: "#7c3aed",
  cyan: "#22d3ee",
  bg: "#06070d",
  card: "#10111c",
  text: "#f5f7ff",
};

export const ORG = {
  legalName: "Solutions 2IA",
  url: SITE_URL,
  logoUrl: `${SITE_URL}/branding/logo-s2ia.png`,
  email: "contact@solutions2ia.com",
  founderName: "Iulian Ionita",
  areaServed: ["FR", "BE", "CH", "LU"],
  sameAs: [
    "https://www.linkedin.com/company/solutions-2ia",
    "https://x.com/solutions2ia",
  ],
} as const;

/**
 * URL helpers (canonical, OG).
 */
export function absoluteUrl(path = "/"): string {
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${trimmed}`;
}

export function canonical(path = "/"): string {
  return absoluteUrl(path);
}
