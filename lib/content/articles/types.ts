import type { ReactNode } from "react";

export type ArticleSource = {
  label: string;
  url: string;
};

export type ArticleSection = {
  /** Question / titre H2 (recommandé : formulation PAA) */
  heading: string;
  /** Ancre slug pour le sommaire (ex: "comment-fonctionne-le-rag") */
  anchor: string;
  content: ReactNode;
};

export type ArticleGlossaryTerm = {
  term: string;
  definition: string;
};

export type ArticleFaqItem = {
  question: string;
  answer: string;
};

export type ArticleRelatedLink = {
  label: string;
  href: string;
  description?: string;
};

export type ArticleComparisonRow = {
  label: string;
  /** N values correspondant aux N columns. */
  values: string[];
};

export type ArticleComparisonTable = {
  title: string;
  columns: string[];
  rows: ArticleComparisonRow[];
};

export type Article = {
  slug: string;
  title: string;
  /** Meta description (150-160 char). */
  description: string;
  /** TL;DR de 40-60 mots affiché en tête (boost LLM extraction). */
  tldr: string;
  /** Catégorie SEO (cluster). */
  category: "Applications" | "Agents IA" | "RAG" | "Automatisation" | "Sécurité";
  /** YYYY-MM-DD */
  publishedAt: string;
  /** YYYY-MM-DD — optionnel, sinon égal à publishedAt */
  updatedAt?: string;
  keywords: string[];
  /** ~600-900 mots cumulés (suffit pour V1). */
  wordCount?: number;
  /** Glossaire des termes techniques. */
  glossary: ArticleGlossaryTerm[];
  /** Sections principales avec ancres. */
  sections: ArticleSection[];
  /** Tableau comparatif (boost +34% citations LLM). */
  comparison?: ArticleComparisonTable;
  /** Sources externes citées. */
  sources: ArticleSource[];
  /** FAQ en bas (injectée aussi dans le schema FAQPage). */
  faq: ArticleFaqItem[];
  /** Liens internes (interlinking topical authority). */
  relatedLinks: ArticleRelatedLink[];
  /** Page service pilier liée. */
  pillarLink: ArticleRelatedLink;
};
