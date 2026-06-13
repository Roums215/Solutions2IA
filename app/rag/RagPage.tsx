"use client";

import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { CTABand } from "@/components/shared/CTABand";
import { RagMemoryFlow } from "@/components/sections/rag/RagMemoryFlow";
import { RagPainLoss } from "@/components/sections/rag/RagPainLoss";
import { RagContrastClassicVsRag } from "@/components/sections/rag/RagContrastClassicVsRag";
import { RagReplaces } from "@/components/sections/rag/RagReplaces";
import { RagAvoids } from "@/components/sections/rag/RagAvoids";
import { RagUsagesTabs } from "@/components/sections/rag/RagUsagesTabs";
import { RagSizing } from "@/components/sections/rag/RagSizing";
import { RagRealExamples } from "@/components/sections/rag/RagRealExamples";
import { RagSectorTabs } from "@/components/sections/rag/RagSectorTabs";
import { RagDecisionWizard } from "@/components/sections/rag/RagDecisionWizard";
import { RagInstallSteps } from "@/components/sections/rag/RagInstallSteps";
import { RagDailyUsage } from "@/components/sections/rag/RagDailyUsage";
import { RagEnrichmentStatic } from "@/components/sections/rag/RagEnrichmentStatic";
import { RagDataControl } from "@/components/sections/rag/RagDataControl";
import { RagHonestLimits } from "@/components/sections/rag/RagHonestLimits";

export function RagPage() {
  return (
    <>
      <PageAtmosphere preset="automation" />
      <FluidMouseField preset="automation" />

      <PageHero
        label="La mémoire de votre entreprise"
        title={
          <>
            Une IA qui répond avec{" "}
            <span className="text-gradient-strong">vos documents</span> — pas
            avec du vent.
          </>
        }
        description="Vos procédures, contrats et dossiers contiennent déjà les réponses. Je connecte une IA à ces documents : vos équipes posent une question, elles obtiennent la bonne réponse en citant le document exact. Plus besoin de déranger la personne qui sait."
        primaryCta={{
          label: "Premier échange gratuit",
          href: "/contact",
        }}
        secondaryCta={{ label: "Tous les services", href: "/services" }}
        glowColor="bg-cyan/5"
      />

      <RagPainLoss />
      <RagMemoryFlow />
      <RagContrastClassicVsRag />
      <RagReplaces />
      <RagAvoids />
      <RagUsagesTabs />
      <RagSizing />
      <RagRealExamples />
      <RagSectorTabs />
      <RagDecisionWizard />
      <RagInstallSteps />
      <RagDailyUsage />
      <RagEnrichmentStatic />
      <RagDataControl />
      <RagHonestLimits />

      <CTABand
        title={
          <>
            Donnez une{" "}
            <span className="text-gradient-strong">mémoire</span> à votre entreprise.
          </>
        }
        description="On part de vos vrais documents, je connecte l'IA, et on vérifie ensemble que les réponses sont justes. Vos données restent en Europe, vous gardez la main."
        primaryLabel="Premier échange gratuit"
        primaryHref="/contact"
      />
    </>
  );
}
