"use client";

import Link from "next/link";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import type { Article } from "@/lib/content/articles/types";

export function ArticleLayout({ article }: { article: Article }) {
  const formattedDate = new Date(article.updatedAt ?? article.publishedAt).toLocaleDateString(
    "fr-FR",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <>
      <PageAtmosphere preset="services" />

      <article className="relative">
        {/* Header */}
        <header className="section-shell-tight">
          <div className="section-container-narrow">
            <nav aria-label="Fil d'Ariane" className="mb-8 text-[11px] uppercase tracking-[0.22em] text-text-tertiary">
              <Link href="/" className="hover:text-accent-light">Accueil</Link>
              <span className="mx-2 text-text-tertiary/50">/</span>
              <Link href="/articles" className="hover:text-accent-light">Articles</Link>
              <span className="mx-2 text-text-tertiary/50">/</span>
              <span className="text-text-secondary">{article.category}</span>
            </nav>

            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light">
              {article.category}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
              {article.title}
            </h1>
            <p className="mt-5 text-base text-text-secondary sm:text-[17px]">
              {article.description}
            </p>
            <p className="mt-6 text-[12px] text-text-tertiary">
              Mis à jour le <time dateTime={article.updatedAt ?? article.publishedAt}>{formattedDate}</time> · Iulian Ionita
            </p>
          </div>
        </header>

        {/* TL;DR — BLUF pour LLM */}
        <section className="section-shell-tight pt-0">
          <div className="section-container-narrow">
            <aside
              className="rounded-2xl border border-accent-primary/30 bg-bg-card/60 px-6 py-5 backdrop-blur-xl"
              style={{ boxShadow: "0 0 28px var(--color-accent-glow)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
                TL;DR
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-text-primary">
                {article.tldr}
              </p>
            </aside>
          </div>
        </section>

        {/* Sommaire */}
        <section className="section-shell-tight pt-0">
          <div className="section-container-narrow">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
              Sommaire
            </p>
            <ol className="mt-3 space-y-1.5">
              {article.sections.map((s, i) => (
                <li key={s.anchor}>
                  <a
                    href={`#${s.anchor}`}
                    className="text-[14px] text-text-secondary transition-colors duration-200 hover:text-accent-light"
                  >
                    <span className="font-mono text-[10px] text-text-tertiary">
                      {String(i + 1).padStart(2, "0")}.
                    </span>{" "}
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Glossaire */}
        {article.glossary.length > 0 && (
          <section className="section-shell-tight pt-0">
            <div className="section-container-narrow">
              <div className="rounded-2xl border border-border-subtle bg-bg-card/40 px-6 py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
                  Glossaire des termes
                </p>
                <dl className="mt-3 space-y-3">
                  {article.glossary.map((g) => (
                    <div key={g.term}>
                      <dt className="text-[13px] font-semibold text-text-primary">{g.term}</dt>
                      <dd className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                        {g.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        )}

        {/* Sections */}
        {article.sections.map((s, i) => (
          <section key={s.anchor} id={s.anchor} className="section-shell-tight scroll-mt-24">
            <div className="section-container-narrow">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-[1.75rem]">
                <span className="mr-2 font-mono text-[14px] text-accent-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.heading}
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-[1.85] text-text-secondary">
                {s.content}
              </div>
            </div>
          </section>
        ))}

        {/* Tableau comparatif */}
        {article.comparison && (
          <section className="section-shell-tight">
            <div className="section-container-narrow">
              <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                {article.comparison.title}
              </h2>
              <div className="mt-5 overflow-x-auto rounded-xl border border-border-subtle">
                <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-border-subtle bg-bg-card/70">
                      {article.comparison.columns.map((col) => (
                        <th
                          key={col}
                          scope="col"
                          className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {article.comparison.rows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-border-subtle/40 last:border-0 hover:bg-bg-card/40"
                      >
                        <td className="px-4 py-3 text-[13px] font-semibold text-text-primary">
                          {row.label}
                        </td>
                        {row.values.map((v, i) => (
                          <td key={i} className="px-4 py-3 text-[13px] text-text-secondary">
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Sources */}
        <section className="section-shell-tight">
          <div className="section-container-narrow">
            <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              Sources
            </h2>
            <ul className="mt-4 space-y-2">
              {article.sources.map((s) => (
                <li key={s.url} className="flex items-start gap-2">
                  <span className="mt-1 text-accent-light">→</span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-text-secondary transition-colors duration-200 hover:text-accent-light hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ inline (renforce schema.org FAQPage) */}
        <section className="section-shell-tight">
          <div className="section-container-narrow">
            <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              Questions fréquentes
            </h2>
            <ul className="mt-5 space-y-3">
              {article.faq.map((it, i) => (
                <li key={it.question}>
                  <details className="group rounded-xl border border-border-subtle bg-bg-card/50 backdrop-blur-sm">
                    <summary className="flex cursor-pointer items-start gap-4 px-5 py-4 list-none [&::-webkit-details-marker]:hidden">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-card text-[10px] font-mono text-text-tertiary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-[14px] font-semibold leading-snug text-text-primary">
                        {it.question}
                      </span>
                      <svg
                        aria-hidden
                        className="mt-1 h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <div className="border-t border-border-subtle/60 px-5 py-4 text-[13px] leading-[1.75] text-text-secondary">
                      {it.answer}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pour aller plus loin */}
        <section className="section-shell-tight">
          <div className="section-container-narrow">
            <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              Pour aller plus loin
            </h2>
            <ul className="mt-5 space-y-2">
              {article.relatedLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-[14px] text-accent-light underline-offset-4 hover:underline"
                  >
                    <span>→</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>

      <CTABand
        title={
          <>
            Vous reconnaissez votre besoin ? <span className="text-gradient-strong">Discutons.</span>
          </>
        }
        description="45 minutes d'audit gratuit pour qualifier votre projet et chiffrer ce qu'un agent IA, une application métier ou l'automatisation peut vous rendre."
        primaryLabel="Réserver mon audit"
      />
    </>
  );
}
