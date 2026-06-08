import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

/**
 * Robots.txt généré dynamiquement.
 * Autorise tous les crawlers classiques + crawlers IA (GEO crucial).
 */

const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "anthropic-ai",
  "Claude-SearchBot",
  "Claude-Web",
  // Perplexity
  "PerplexityBot",
  // Google AI training
  "Google-Extended",
  // Common Crawl (alimente plein de LLM)
  "CCBot",
  // Autres
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "Meta-ExternalAgent",
  "Diffbot",
  "Omgilibot",
  "FacebookBot",
  "Cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
