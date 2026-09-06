import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { ARTICLES } from "@/lib/content/articles/articles";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Articles Solutions 2IA : audit app métier, agent IA RGPD, RAG, Chorus Pro",
  description:
    "Guides ultra-optimisés : audit application métier, agent IA souverain France/UE, RAG vs fine-tuning, automatiser tri mails PME, facture électronique 2026.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles : Guides IA, applications métier, automatisation",
    description:
      "5 guides experts pour les PME françaises : audit, IA souveraine, RAG, tri mails, Chorus Pro.",
    url: "/articles",
    type: "website",
  },
};

export default function ArticlesIndexPage() {
  return (
    <>
      <PageAtmosphere preset="services" />

      <JsonLd
        schema={buildBreadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Articles", url: "/articles" },
        ])}
        id="ld-articles-index-breadcrumb"
      />

      <PageHero
        label="Articles"
        title={
          <>
            Cinq guides experts pour <span className="text-gradient-strong">décider sereinement</span>.
          </>
        }
        description="Audit d'application métier, agent IA souverain UE, RAG vs fine-tuning, automatiser le tri des mails, facture électronique 2026 : sources chiffrées, tableaux comparatifs et FAQ structurée pour chaque sujet."
        primaryCta={{ label: "Réserver un audit gratuit", href: "/contact" }}
        secondaryCta={{ label: "Voir la FAQ complète", href: "/faq" }}
      />

      <section className="section-shell">
        <div className="section-container">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border-subtle bg-bg-card/55 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border-accent hover:shadow-lg hover:shadow-accent-glow/10"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
                    {article.category}
                  </span>
                  <h2 className="mt-3 text-[17px] font-bold leading-snug tracking-tight text-text-primary group-hover:text-gradient-strong">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {article.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border-subtle/60 pt-3 text-[11px] text-text-tertiary">
                    <time dateTime={article.updatedAt ?? article.publishedAt}>
                      Mis à jour le {formatDate(article.updatedAt ?? article.publishedAt)}
                    </time>
                    <span className="text-accent-light transition-transform duration-300 group-hover:translate-x-1">
                      Lire →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
