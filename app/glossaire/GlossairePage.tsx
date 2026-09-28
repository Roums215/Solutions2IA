"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import {
  GLOSSAIRE_PAGE_ENTRIES,
  GLOSSAIRE_THEMES,
  glossaireEntryTerm,
} from "@/lib/content/glossairePage";

const ARROW = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export function GlossairePage() {
  const total = GLOSSAIRE_PAGE_ENTRIES.length;

  return (
    <>
      <PageAtmosphere preset="services" />

      <PageHero
        label="Glossaire"
        title={
          <>
            L&apos;IA et l&apos;automatisation,{" "}
            <span className="text-gradient-strong">en français simple</span>.
          </>
        }
        description={`Agent IA, RAG, workflow, API, RGPD, facture électronique : ${total} termes que vous croiserez dans un projet, expliqués en une phrase puis détaillés avec des exemples de PME. Et pour chacun, ce que ça change pour vous.`}
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Voir les services", href: "/services" }}
      />

      <section className="section-shell">
        <div className="section-container grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Sommaire collant, groupé par thème */}
          <nav
            aria-label="Sommaire du glossaire"
            className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
              {total} termes · {GLOSSAIRE_THEMES.length} thèmes
            </p>
            <ul className="mt-4 space-y-5">
              {GLOSSAIRE_THEMES.map((theme) => {
                const entries = GLOSSAIRE_PAGE_ENTRIES.filter((e) => e.theme === theme.slug);
                return (
                  <li key={theme.slug}>
                    <a
                      href={`#${theme.slug}`}
                      className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-text-primary transition-colors duration-200 hover:text-accent-light"
                    >
                      {theme.label}
                    </a>
                    <ul className="mt-2 space-y-0.5 border-l border-border-subtle/70 pl-3">
                      {entries.map((entry) => {
                        const t = glossaireEntryTerm(entry);
                        return (
                          <li key={entry.key}>
                            <a
                              href={`#${entry.key}`}
                              className="block rounded-md px-2 py-1 text-[13px] text-text-secondary transition-colors duration-200 hover:bg-bg-card/60 hover:text-text-primary"
                            >
                              {t.terme}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Quatre thèmes, chacun formulé comme une vraie question */}
          <div className="min-w-0 max-w-[46rem] space-y-20">
            {GLOSSAIRE_THEMES.map((theme, i) => {
              const entries = GLOSSAIRE_PAGE_ENTRIES.filter((e) => e.theme === theme.slug);
              return (
                <section
                  key={theme.slug}
                  id={theme.slug}
                  aria-labelledby={`${theme.slug}-heading`}
                  className="scroll-mt-24"
                >
                  <header className="mb-8 border-b border-border-subtle/60 pb-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
                      {String(i + 1).padStart(2, "0")} · {theme.label}
                    </p>
                    <h2
                      id={`${theme.slug}-heading`}
                      className="mt-2 text-2xl font-bold tracking-tight text-text-primary sm:text-[1.7rem]"
                    >
                      {theme.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {theme.audience}
                    </p>
                  </header>

                  <div className="space-y-6">
                    {entries.map((entry) => {
                      const t = glossaireEntryTerm(entry);
                      const flow = entry.flow;
                      return (
                        <article
                          key={entry.key}
                          id={entry.key}
                          aria-labelledby={`${entry.key}-heading`}
                          className="surface-card scroll-mt-24 rounded-xl border border-border-subtle bg-bg-card/60 p-6 transition-colors duration-300 hover:border-border-accent sm:p-7"
                        >
                          <h3
                            id={`${entry.key}-heading`}
                            className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl"
                          >
                            {t.terme}
                          </h3>
                          <p className="mt-2 text-[15px] font-medium leading-relaxed text-accent-light">
                            {t.definition}
                          </p>
                          <p className="mt-3 text-sm leading-[1.85] text-text-secondary">
                            {entry.extended}
                          </p>

                          {flow && (
                            <ol
                              aria-label="Comment ça circule"
                              className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-text-secondary"
                            >
                              {flow.map((step, j) => (
                                <li key={step} className="flex items-center gap-2">
                                  <span className="rounded-md border border-border-subtle bg-bg-card/60 px-2.5 py-1">
                                    {step}
                                  </span>
                                  {j < flow.length - 1 && (
                                    <span aria-hidden className="text-text-tertiary">
                                      →
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ol>
                          )}

                          <p className="mt-4 text-sm leading-relaxed text-text-primary">
                            <span className="font-semibold text-accent-light">Pour vous : </span>
                            {entry.gain}
                          </p>

                          <Link
                            href={entry.seeAlso.href}
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-light transition-colors duration-200 hover:text-text-primary"
                          >
                            {entry.seeAlso.label}
                            {ARROW}
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand
        title={
          <>
            Un terme reste flou ? On en parle{" "}
            <span className="text-gradient-strong">sans jargon</span>.
          </>
        }
        description="Premier échange gratuit : vous expliquez votre quotidien, je traduis ce que l'IA et l'automatisation peuvent y changer, en français."
        primaryLabel="Premier échange gratuit"
        secondary={null}
      />
    </>
  );
}
