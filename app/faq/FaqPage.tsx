"use client";

import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { CTABand } from "@/components/shared/CTABand";
import { FAQ_CATEGORIES, FAQ_ITEMS } from "@/lib/content/faqData";

export function FaqPage() {
  return (
    <>
      <PageAtmosphere preset="services" />
      <FluidMouseField preset="services" />

      <PageHero
        label="FAQ"
        title={
          <>
            Les vraies questions qu&apos;on nous pose en{" "}
            <span className="text-gradient-strong">premier rendez-vous</span>.
          </>
        }
        description="30 réponses structurées, sourcées et chiffrées sur les agents IA, les applications métier sur mesure, le RAG, la sécurité RGPD et notre méthode dérisquée. Aucun buzzword."
        primaryCta={{ label: "Réserver un audit gratuit", href: "/contact" }}
        secondaryCta={{ label: "Voir les services", href: "/services" }}
      />

      <section className="section-shell">
        <div className="section-container grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Sticky TOC */}
          <nav
            aria-label="Sommaire FAQ"
            className="lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
              Catégories
            </p>
            <ul className="mt-4 space-y-1.5">
              {FAQ_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <a
                    href={`#${cat.slug}`}
                    className="block rounded-md border border-border-subtle bg-bg-card/40 px-3 py-2 text-[13px] text-text-secondary transition-colors duration-200 hover:border-border-accent hover:text-text-primary"
                  >
                    <span className="block font-semibold text-text-primary">
                      {cat.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-text-tertiary">
                      {cat.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Questions */}
          <div className="space-y-12">
            {FAQ_CATEGORIES.map((cat) => {
              const items = FAQ_ITEMS.filter((it) => it.category === cat.slug);
              return (
                <section
                  key={cat.slug}
                  id={cat.slug}
                  aria-labelledby={`${cat.slug}-heading`}
                  className="scroll-mt-24"
                >
                  <header className="mb-5 border-b border-border-subtle/60 pb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
                      {String(FAQ_CATEGORIES.indexOf(cat) + 1).padStart(2, "0")}
                    </p>
                    <h2
                      id={`${cat.slug}-heading`}
                      className="mt-1 text-2xl font-bold tracking-tight text-text-primary sm:text-[1.7rem]"
                    >
                      {cat.label}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                      {cat.description}
                    </p>
                  </header>

                  <ul className="space-y-3">
                    {items.map((it, i) => (
                      <li key={it.question}>
                        <details className="group rounded-xl border border-border-subtle bg-bg-card/50 backdrop-blur-sm transition-colors duration-300 hover:border-border-accent open:border-border-accent">
                          <summary className="flex cursor-pointer items-start gap-4 px-5 py-4 text-left list-none [&::-webkit-details-marker]:hidden">
                            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border-subtle bg-bg-card text-[10px] font-mono text-text-tertiary group-open:border-accent-primary/40 group-open:text-accent-light">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-text-primary">
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
                          <div className="border-t border-border-subtle/60 px-5 py-4 text-[14px] leading-[1.75] text-text-secondary">
                            {it.answer}
                          </div>
                        </details>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand
        title={
          <>
            Une autre question ? <span className="text-gradient-strong">Demandez-nous.</span>
          </>
        }
        description="45 minutes d'audit gratuit pour qualifier votre projet et identifier les premiers gains concrets."
        primaryLabel="Réserver mon audit"
      />
    </>
  );
}
