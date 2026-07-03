import dynamic from "next/dynamic";
import { HeroSection } from "@/components/hero/HeroSection";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { FluidMouseField } from "@/components/shared/FluidMouseField";
import { CTABand } from "@/components/shared/CTABand";
import { PremiumFlowPanel } from "@/components/shared/PremiumFlowPanel";
import { deliveryFlow } from "@/components/sections/home/homeDeliveryFlow";

// Sections sous la fold : chunks séparés, hydration différée. ssr:true (défaut)
// → le contenu reste dans le HTML (SEO intact), seul le JS arrive plus tard.
const HomeServicesConstellation = dynamic(() =>
  import("@/components/sections/home/HomeServicesConstellation").then((m) => m.HomeServicesConstellation),
);
const HomeTransformationFlows = dynamic(() =>
  import("@/components/sections/home/HomeTransformationFlows").then((m) => m.HomeTransformationFlows),
);
const HomeProfileMatrix = dynamic(() =>
  import("@/components/sections/home/HomeProfileMatrix").then((m) => m.HomeProfileMatrix),
);
const HomeProofTelecom = dynamic(() =>
  import("@/components/sections/home/HomeProofTelecom").then((m) => m.HomeProofTelecom),
);
const HomeApproachSplit = dynamic(() =>
  import("@/components/sections/home/HomeApproachSplit").then((m) => m.HomeApproachSplit),
);

export default function Home() {
  return (
    <>
      <PageAtmosphere preset="home" />
      <FluidMouseField intensity={1} />

      {/* ── C'est quoi : la promesse ───────────────────────────────────── */}
      <HeroSection />

      {/* ── C'est quoi : les domaines (constellation 5 services) ──────── */}
      <HomeServicesConstellation />

      {/* ── Ce que ça vous apporte : transformations concrètes ────────── */}
      <HomeTransformationFlows />

      {/* ── Preuve : un projet réel raconté simplement ────────────────── */}
      <HomeProofTelecom />

      {/* ── Comment ça marche : la méthode ─────────────────────────────── */}
      <section className="section-shell-tight">
        <div className="section-container">
          <PremiumFlowPanel
            label="Comment je travaille"
            title="Quatre étapes, sans jargon, sans surprise."
            description="Du premier échange à l'outil qui tourne : vous savez toujours où en est le projet et ce que vous payez."
            steps={deliveryFlow}
            accent="99, 102, 241"
          />
        </div>
      </section>

      {/* ── Ce qui guide le travail ────────────────────────────────────── */}
      <HomeApproachSplit />

      {/* ── Pour qui ───────────────────────────────────────────────────── */}
      <HomeProfileMatrix />

      {/* ── L'étape suivante : un seul CTA ─────────────────────────────── */}
      <CTABand
        title={<>On regarde ensemble ce qui vous <span className="text-gradient-strong">prend du temps</span> ?</>}
        description="Premier échange gratuit, sans engagement. Vous repartez au minimum avec un regard neuf sur votre façon de travailler."
      />
    </>
  );
}
