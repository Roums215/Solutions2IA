/**
 * Schema.org JSON-LD builders typés.
 * Source unique pour Organization, WebSite, Service, Article, FAQ, Breadcrumb,
 * HowTo, OfferCatalog — appelés par les pages et le layout via <JsonLd>.
 *
 * Pattern @id partagé pour cross-référencement (Organization{@id}
 * ← Service{provider} ← Offer{itemOffered} ← Person{founder}).
 */

import { ORG, SITE_NAME, SITE_URL, SITE_TAGLINE, SITE_DESCRIPTION, absoluteUrl } from "./constants";

// ─── Common types ──────────────────────────────────────────────────────────

type JsonLdObject = Record<string, unknown>;

const ORG_ID = `${SITE_URL}#organization`;
const SITE_ID = `${SITE_URL}#website`;
const FOUNDER_ID = `${SITE_URL}#founder`;

// ─── Organization (racine, injectée dans layout) ───────────────────────────

export function buildOrganizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: ORG.legalName,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: {
      "@type": "ImageObject",
      url: ORG.logoUrl,
      width: 512,
      height: 512,
    },
    image: ORG.logoUrl,
    description: SITE_DESCRIPTION,
    email: ORG.email,
    areaServed: ORG.areaServed.map((c) => ({ "@type": "Country", name: c })),
    knowsAbout: [
      "Agents IA",
      "RAG (Retrieval-Augmented Generation)",
      "Applications métier sur mesure",
      "Automatisation des processus",
      "Hébergement souverain UE",
      "RGPD",
      "Next.js",
      "Schema.org",
    ],
    founder: {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: ORG.founderName,
    },
    sameAs: ORG.sameAs,
  };
}

// ─── ProfessionalService — agence (compatible LocalBusiness sans address) ──

export function buildProfessionalServiceSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}#professionalService`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: ORG.logoUrl,
    priceRange: "€€€",
    areaServed: ORG.areaServed.map((c) => ({ "@type": "Country", name: c })),
    provider: { "@id": ORG_ID },
    serviceType: [
      "Application métier sur mesure",
      "Agent IA",
      "RAG entreprise",
      "Automatisation",
      "Site web premium",
    ],
  };
}

// ─── WebSite (avec SearchAction pour sitelinks search box) ─────────────────

export function buildWebSiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url: SITE_URL,
    inLanguage: "fr-FR",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/faq?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Service (par offre) ───────────────────────────────────────────────────

export type ServiceInput = {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  audience?: string;
};

export function buildServiceSchema(s: ServiceInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: absoluteUrl(s.url),
    serviceType: s.serviceType,
    provider: { "@id": ORG_ID },
    areaServed: ORG.areaServed.map((c) => ({ "@type": "Country", name: c })),
    ...(s.audience && {
      audience: { "@type": "BusinessAudience", audienceType: s.audience },
    }),
  };
}

// ─── BreadcrumbList ─────────────────────────────────────────────────────────

export type BreadcrumbItem = { name: string; url: string };

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.url),
    })),
  };
}

// ─── FAQPage ───────────────────────────────────────────────────────────────

export type FaqItem = { question: string; answer: string };

export function buildFaqSchema(items: FaqItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

// ─── Article / BlogPosting ─────────────────────────────────────────────────

export type ArticleInput = {
  headline: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
};

export function buildArticleSchema(a: ArticleInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    url: absoluteUrl(a.url),
    ...(a.imageUrl && { image: a.imageUrl }),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    inLanguage: "fr-FR",
    author: { "@id": FOUNDER_ID, "@type": "Person", name: ORG.founderName },
    publisher: { "@id": ORG_ID },
    isAccessibleForFree: true,
    ...(a.keywords && { keywords: a.keywords.join(", ") }),
    ...(a.articleSection && { articleSection: a.articleSection }),
    ...(a.wordCount && { wordCount: a.wordCount }),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(a.url) },
  };
}

// ─── HowTo ─────────────────────────────────────────────────────────────────

export type HowToStep = { name: string; text: string; url?: string };

export function buildHowToSchema(input: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    ...(input.totalTime && { totalTime: input.totalTime }),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url && { url: absoluteUrl(s.url) }),
    })),
  };
}

// ─── OfferCatalog ──────────────────────────────────────────────────────────

export type OfferTier = {
  name: string;
  description: string;
  priceRange?: string; // ex: "5 000 € — 15 000 €"
  url?: string;
};

export function buildOfferCatalogSchema(input: {
  name: string;
  tiers: OfferTier[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: input.name,
    provider: { "@id": ORG_ID },
    itemListElement: input.tiers.map((t) => ({
      "@type": "Offer",
      name: t.name,
      description: t.description,
      ...(t.priceRange && { priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR", price: t.priceRange } }),
      ...(t.url && { url: absoluteUrl(t.url) }),
    })),
  };
}

// ─── DefinedTermSet (glossaire — fort levier GEO, cité par les IA) ─────────

export type DefinedTermInput = {
  name: string;
  description: string;
  /** Ancre sur la page glossaire, ex: "/glossaire#agent-ia" */
  url: string;
};

export function buildDefinedTermSetSchema(input: {
  name: string;
  description: string;
  url: string;
  terms: DefinedTermInput[];
}): JsonLdObject {
  const setId = `${absoluteUrl(input.url)}#termset`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": setId,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    inLanguage: "fr-FR",
    publisher: { "@id": ORG_ID },
    hasDefinedTerm: input.terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.name,
      description: t.description,
      url: absoluteUrl(t.url),
      inDefinedTermSet: { "@id": setId },
    })),
  };
}

// ─── Wrapper @graph (pour injecter plusieurs schemas dans un seul script) ──

export function combineSchemas(...schemas: JsonLdObject[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map(({ "@context": _ignored, ...rest }) => rest),
  };
}
