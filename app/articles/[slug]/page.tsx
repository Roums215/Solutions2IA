import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  combineSchemas,
} from "@/lib/seo/schema";
import { ARTICLES, getArticleBySlug } from "@/lib/content/articles/articles";
import { ArticleLayout } from "./ArticleLayout";

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: "Article introuvable" };
  }
  const url = `/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: ["Iulian Ionita"],
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function Page(
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const url = `/articles/${article.slug}`;
  const schema = combineSchemas(
    buildArticleSchema({
      headline: article.title,
      description: article.description,
      url,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt ?? article.publishedAt,
      keywords: article.keywords,
      articleSection: article.category,
    }),
    buildBreadcrumbSchema([
      { name: "Accueil", url: "/" },
      { name: "Articles", url: "/articles" },
      { name: article.title, url },
    ]),
    buildFaqSchema(article.faq),
  );

  return (
    <>
      <JsonLd schema={schema} id={`ld-article-${article.slug}`} />
      <ArticleLayout article={article} />
    </>
  );
}
