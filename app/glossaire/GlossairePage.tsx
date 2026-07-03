"use client";

import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { CTABand } from "@/components/shared/CTABand";
import {
  GLOSSAIRE_PAGE_ENTRIES,
  glossaireEntryTerm,
} from "@/lib/content/glossairePage";

export function GlossairePage() {
  return (
    <>
      <PageAtmosphere preset="services" />
      <FluidMouseField preset="services" />

      <PageHero
        label="Glossaire"
        title={
          <>
            L&apos;IA et l&apos;automatisation,{" "}
            <span className="text-gradient-strong">en français simple</span>.
          </>
        }
        description="Agent IA, RAG, workflow, API, RGPD… Les termes que vous croiserez dans nos échanges, expliqués en une phrase puis détaillés avec des exemples concrets de PME. Zéro jargon en cascade."
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Voir les services", href: "/services" }}
      />

      <section className="section-shell">
        <div className="section-container grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
          {/* Sticky TOC */}
          <nav
            aria-label="Sommaire du glossaire"
            className="lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
              Termes
            </p>
            <ul className="mt-4 space-y-1">
              {GLOSSAIRE_PAGE_ENTRIES.map((entry) => {
                const t = glossaireEntryTerm(entry);
                return (
                  <li key={entry.key}>
                    <a
                      href={`#${entry.key}`}
                      className="block rounded-md px-3 py-1.5 text-[13px] text-text-secondary transition-colors duration-200 hover:bg-bg-card/60 hover:text-text-primary"
                    >
                      {t.terme}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Définitions */}
          <div className="space-y-8">
            {GLOSSAIRE_PAGE_ENTRIES.map((entry) => {
              const t = glossaireEntryTerm(entry);
              return (
                <article
                  key={entry.key}
                  id={entry.key}
                  aria-labelledby={`${entry.key}-heading`}
                  className="surface-card scroll-mt-24 rounded-xl border border-border-subtle bg-bg-card/60 p-6 transition-colors duration-300 hover:border-border-accent sm:p-7"
                >
                  <h2
                    id={`${entry.key}-heading`}
                    className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl"
                  >
                    {t.terme}
                  </h2>
                  <p className="mt-2 text-[15px] font-medium leading-relaxed text-accent-light">
                    {t.definition}
                  </p>
                  <p className="mt-3 text-sm leading-[1.85] text-text-secondary">
                    {entry.extended}
                  </p>
                  {entry.seeAlso && (
                    <Link
                      href={entry.seeAlso.href}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-light transition-colors duration-200 hover:text-text-primary"
                    >
                      {entry.seeAlso.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </article>
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
        description="Premier échange gratuit : vous expliquez votre quotidien, je traduis ce que l'IA et l'automatisation peuvent y changer — en français."
      />
    </>
  );
}
