/**
 * SEO constants centralisées — source de vérité unique.
 * Évite le drift entre metadata, schemas et OG images.
 */

export const SITE_URL = "https://solutions2ia.fr";
export const SITE_NAME = "Solutions 2IA";
export const SITE_TAGLINE = "Applications IA, agents IA, sites web et automatisation sur mesure";
export const SITE_DESCRIPTION =
  "Sites web, applications métier, automatisations et assistants IA sur mesure pour les PME. Développeur indépendant, données hébergées en Europe. Échange gratuit.";

export const SITE_LOCALE = "fr_FR";
export const SITE_LANG = "fr";
export const SITE_COUNTRY = "FR";

// Aligné sur @theme dans app/globals.css (source de vérité des couleurs).
export const BRAND = {
  primary: "#6366f1",
  cyan: "#22d3ee",
  bg: "#05060b",
  card: "#111424",
  text: "#f5f7ff",
};

export const ORG = {
  legalName: "Solutions 2IA",
  url: SITE_URL,
  logoUrl: `${SITE_URL}/branding/logo-s2ia.png`,
  email: "contact@solutions2ia.fr",
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
