"use client";

import { PageHero } from "@/components/shared/PageHero";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import { RelatedServices } from "@/components/shared/RelatedServices";
import { AutomationPipeline } from "@/components/sections/automation/AutomationPipeline";
import type { Sector } from "@/components/sections/automation/sectorsData";

interface SecteurPageProps {
  sector: Sector;
}

export function SecteurPage({ sector }: SecteurPageProps) {
  return (
    <>
      <PageAtmosphere preset="automation" />

      <PageHero
        label={`Automatisation · ${sector.name}`}
        title={
          <>
            {sector.name} :{" "}
            <span className="text-gradient-strong">le pipeline réel</span>
          </>
        }
        description={`${sector.problem} ${sector.benefit}`}
        primaryCta={{ label: "Auditer ce flux", href: "/contact" }}
        secondaryCta={{ label: "Tous les métiers", href: "/automatisation" }}
        glowColor="bg-cyan/5"
      />

      <AutomationPipeline
        nodes={sector.nodes}
        edges={sector.edges}
        details={sector.details}
        heading={
          sector.nodes
            .filter((n) => n.tool !== "notify")
            .map((n) => n.label)
            .join(" → ")
        }
        intro={sector.benefit}
      />

      <RelatedServices current="automatisation" />

      <CTABand
        title={
          <>
            Câblons votre{" "}
            <span className="text-gradient-strong">pipeline {sector.name.toLowerCase()}</span>
          </>
        }
        description="On part d'un de vos process réels et on le branche en quelques jours. Hébergé en UE, vous gardez la main."
      />
    </>
  );
}
