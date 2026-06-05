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
        label="RAG · Mémoire métier privée"
        title={
          <>
            Une IA qui répond avec{" "}
            <span className="text-gradient-strong">vos documents</span>, pas
            avec de l&apos;improvisation.
          </>
        }
        description="Connectez vos procédures, contrats, PDF ou bases internes. Votre IA retrouve les passages utiles dans votre savoir interne et cite ses sources — vos équipes accèdent à l'information immédiatement, sans dépendre d'une seule personne."
        primaryCta={{
          label: "Créer ma mémoire métier",
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
            Démarrer votre{" "}
            <span className="text-gradient-strong">mémoire métier</span>.
          </>
        }
        description="On part d'un de vos process réels, on branche les sources et on cale les réponses. Hébergé en UE, vous gardez la main."
        primaryLabel="Auditer mon corpus"
        primaryHref="/contact"
      />
    </>
  );
}
