"use client";

import dynamic from "next/dynamic";
import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";

// Scène hero lazy : le chunk n'est jamais téléchargé sur mobile/minimal
// (PageHero ne monte pas `visual` dans ces cas).
const WebScene = dynamic(
  () => import("@/components/scenes/web/WebScene").then((m) => m.WebScene),
  { ssr: false, loading: () => <div aria-hidden className="h-[540px] sm:h-[600px] lg:h-[640px]" /> },
);
import { WebOpportunitySources } from "@/components/sections/sites-web/WebOpportunitySources";
import { WebPainBusiness } from "@/components/sections/sites-web/WebPainBusiness";
import { WebVsAgency } from "@/components/sections/sites-web/WebVsAgency";
import { WebOpportunityFlow } from "@/components/sections/sites-web/WebOpportunityFlow";
import { WebFoundations } from "@/components/sections/sites-web/WebFoundations";
import { RelatedServices } from "@/components/shared/RelatedServices";

export function SitesWebPage() {
  return (
    <>
      <PageAtmosphere preset="web" />
      <PageHero
        label="Sites web"
        title={
          <>
            Un site qui ne fait pas que joli.
            <br />
            Il vous amène des{" "}
            <span className="text-gradient-strong">
              clients
            </span>
            .
          </>
        }
        description="Un beau site, c'est bien. Un site qui accueille vos visiteurs, répond à leurs questions et vous transmet chaque demande au bon moment, c'est mieux. C'est celui-là que je construis."
        primaryCta={{ label: "Premier échange gratuit", href: "/contact" }}
        secondaryCta={{ label: "Comment un visiteur devient client", href: "#opportunity-flow" }}
        visual={<WebScene />}
        mobileSteps={[
          { label: "On vous trouve", hint: "visible là où vos clients cherchent" },
          { label: "On vous comprend", hint: "un parcours clair, sans détour" },
          { label: "On vous contacte", hint: "la demande arrive chez vous" },
        ]}
      />

      {/* Micro-label de gamme : prépare mentalement les sections suivantes */}
      <section aria-label="Du simple au connecté" className="-mt-8 sm:-mt-12 mb-6 sm:mb-10">
        <div className="section-container">
          <div className="flex items-center justify-center">
            <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full border border-border-subtle bg-bg-card/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-text-tertiary sm:text-xs">
              <span>Vitrine simple</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-cyan/60" />
              <span>Réservation en ligne</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-cyan/60" />
              <span>Espace client</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-cyan/60" />
              <span>Relié à vos outils</span>
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

      <RelatedServices current="sites-web" />

      <CTABand
        title={<>Parlons de votre <span className="text-gradient-strong">site</span></>}
        description="Que vous partiez de zéro ou que vous ayez déjà un site à refaire, le premier échange est gratuit. Je vous dis franchement ce qui vous aiderait, et ce que ça coûterait, à partir de 500 €."
        primaryLabel="Premier échange gratuit"
      />
    </>
  );
}
