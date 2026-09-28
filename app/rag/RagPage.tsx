"use client";

import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import { RelatedServices } from "@/components/shared/RelatedServices";
import { RagSommaire } from "@/components/sections/rag/RagSommaire";
import { RagContrastClassicVsRag } from "@/components/sections/rag/RagContrastClassicVsRag";
import { RagPainLoss } from "@/components/sections/rag/RagPainLoss";
import { RagSearchTime } from "@/components/sections/rag/RagSearchTime";
import { RagMemoryFlow } from "@/components/sections/rag/RagMemoryFlow";
import { RagUsagesTabs } from "@/components/sections/rag/RagUsagesTabs";
import { RagInstallSteps } from "@/components/sections/rag/RagInstallSteps";
import { RagEnrichmentStatic } from "@/components/sections/rag/RagEnrichmentStatic";
import { RagSectorTabs } from "@/components/sections/rag/RagSectorTabs";
import { RagSizing } from "@/components/sections/rag/RagSizing";
import { RagDecisionWizard } from "@/components/sections/rag/RagDecisionWizard";
import { RagDataControl } from "@/components/sections/rag/RagDataControl";
import { RagHonestLimits } from "@/components/sections/rag/RagHonestLimits";

export function RagPage() {
  return (
    <>
      <PageAtmosphere preset="automation" />

      <PageHero
        label="Mémoire d'entreprise (RAG)"
        title={
          <>
            Une IA qui répond avec{" "}
            <span className="text-gradient-strong">vos documents</span> et cite
            sa source.
          </>
        }
        description="Vos procédures, contrats et dossiers contiennent déjà les réponses. Je relie une IA à ces documents : une question, la bonne réponse, le document exact qui la justifie. Plus besoin de déranger la personne qui sait."
        primaryCta={{
          label: "Premier échange gratuit",
          href: "/contact",
        }}
        secondaryCta={{
          label: "Voir la mémoire en action",
          href: "#comment-ca-marche",
        }}
        glowColor="bg-cyan/5"
      />

      <RagSommaire />

      {/* 1. C'est quoi */}
      <RagContrastClassicVsRag />

      {/* 2. Ce que ça vous apporte */}
      <RagPainLoss />
      <RagSearchTime />

      {/* 3. Comment ça marche */}
      <RagMemoryFlow />
      <RagUsagesTabs />
      <RagInstallSteps />
      <RagEnrichmentStatic />

      {/* 4. Pour qui */}
      <RagSectorTabs />
      <RagSizing />
      <RagDecisionWizard />

      {/* Objections : vos données, les limites */}
      <RagDataControl />
      <RagHonestLimits />

      <RelatedServices current="rag" />

      <CTABand
        title={
          <>
            Donnez une{" "}
            <span className="text-gradient-strong">mémoire</span> à votre entreprise.
          </>
        }
        description="Je pars de vos vrais documents, on vérifie ensemble les réponses sur 20 questions de vos équipes, et vos données restent en Europe."
        primaryLabel="Premier échange gratuit"
        primaryHref="/contact"
        secondary={null}
      />
    </>
  );
}
