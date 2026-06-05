"use client";

import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { CTABand } from "@/components/shared/CTABand";
import { WebScene } from "@/components/scenes/web/WebScene";
import { WebOpportunitySources } from "@/components/sections/sites-web/WebOpportunitySources";
import { WebPainBusiness } from "@/components/sections/sites-web/WebPainBusiness";
import { WebVsAgency } from "@/components/sections/sites-web/WebVsAgency";
import { WebOpportunityFlow } from "@/components/sections/sites-web/WebOpportunityFlow";
import { WebFoundations } from "@/components/sections/sites-web/WebFoundations";

export function SitesWebPage() {
  return (
    <>
      <PageAtmosphere preset="web" />
      <FluidMouseField preset="web" />
      <PageHero
        label="Sites web premium · Système connecté"
        title={
          <>
            Votre site n&apos;est pas un site.
            <br />
            C&apos;est le{" "}
            <span className="text-gradient-strong">
              moteur de vos prochains clients
            </span>
            .
          </>
        }
        description="Un site connecté qui travaille avec votre entreprise, pas à côté d'elle. Nous le concevons pour qu'il accueille vos visiteurs, comprenne leur besoin, les dirige au bon endroit — et transmette chaque opportunité à vos équipes, au bon moment."
        primaryCta={{ label: "Concevoir mon système numérique", href: "/contact" }}
        secondaryCta={{ label: "Voir comment circule une opportunité", href: "#opportunity-flow" }}
        visual={<WebScene />}
      />

      {/* Micro-label de gamme : prépare mentalement les sections suivantes */}
      <section aria-label="Ce que nous couvrons" className="-mt-8 sm:-mt-12 mb-6 sm:mb-10">
        <div className="section-container">
          <div className="flex items-center justify-center">
            <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full border border-border-subtle bg-bg-card/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-text-tertiary sm:text-xs">
              <span>Site web</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-cyan/60" />
              <span>Automatisation</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-cyan/60" />
              <span>IA documentaire</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-cyan/60" />
              <span>Outils métier</span>
            </span>
          </div>
        </div>
      </section>

      {/* S1 V6.4 — Sources d'opportunités : fan-in 9 canaux → 1 visiteur (couche VISIBILITÉ) */}
      <WebOpportunitySources />

      {/* S2 V6.4 — Blueprint 9 stations : comment circule une opportunité */}
      <WebOpportunityFlow />

      {/* S3 V6.4 — Pain business : 7 pertes + carte bascule */}
      <WebPainBusiness />

      {/* S4 V6.4 — ≠ agence web classique : différenciation cœur */}
      <WebVsAgency />

      {/* S10 V6.4.3 — Fondations du système (stack 4 couches + 8 piliers business) */}
      <WebFoundations />

      <CTABand
        title="Discutons de votre système numérique"
        description="Audit, architecture et recommandations adaptées à votre activité."
        primaryLabel="Planifier un échange"
      />
    </>
  );
}
