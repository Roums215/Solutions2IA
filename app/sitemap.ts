import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

const lastModified = new Date();

const ARTICLES = [
  "audit-application-metier-par-ou-commencer",
  "agent-ia-rgpd-souverain-france-ue",
  "rag-vs-fine-tuning-quoi-choisir-entreprise",
  "automatiser-tri-mails-pme-2026",
  "facture-electronique-chorus-pro-2026-obligation",
] as const;

const SECTORS = [
  "immobilier",
  "cabinet-comptable",
  "btp",
  "restauration",
  "formation",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage = {
    url: SITE_URL,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  };

  const pillarRoutes: MetadataRoute.Sitemap = [
    "/applications",
    "/agents-ia",
    "/sites-web",
    "/automatisation",
    "/rag",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const supportRoutes: MetadataRoute.Sitemap = [
    { path: "/services", priority: 0.8 },
    { path: "/faq", priority: 0.8 },
    { path: "/articles", priority: 0.7 },
    { path: "/a-propos", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ].map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));

  const sectorRoutes: MetadataRoute.Sitemap = SECTORS.map((slug) => ({
    url: `${SITE_URL}/automatisation/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((slug) => ({
    url: `${SITE_URL}/articles/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const legalRoutes: MetadataRoute.Sitemap = [
    "/cgv",
    "/confidentialite",
    "/cookies",
    "/mentions-legales",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    homepage,
    ...pillarRoutes,
    ...supportRoutes,
    ...sectorRoutes,
    ...articleRoutes,
    ...legalRoutes,
  ];
}
