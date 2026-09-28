import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/hero/HeroSection";
import { HomeDeadlineBand } from "@/components/sections/home/HomeDeadlineBand";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import { HOME_METHOD_STEPS } from "@/components/sections/home/homeMethodData";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildHowToSchema } from "@/lib/seo/schema";

// Le title passe par le template du layout : « … · Solutions 2IA » (56 caractères).
// Ne pas déclarer openGraph ici : la clé remplacerait celle du layout (image OG perdue).
export const metadata: Metadata = {
  title: "Sites web, applications et IA sur mesure",
  description:
    "Sites web, applications, automatisations et assistants IA sur mesure pour les PME. Un seul interlocuteur, site vitrine dès 500 €, premier échange gratuit.",
};

// Sections sous la fold : chunks séparés, hydration différée. ssr:true (défaut)
// → le contenu reste dans le HTML (SEO intact), seul le JS arrive plus tard.
// HomeServicesConstellation et HomeTransformationFlows sont débranchés depuis le LOT 2 :
// remplacés par HomeDailyFriction et HomeSolutionsRail. Fichiers conservés le temps de la
// validation, candidats au nettoyage ensuite.
const HomeDailyFriction = dynamic(() =>
  import("@/components/sections/home/HomeDailyFriction").then((m) => m.HomeDailyFriction),
);
const HomeSolutionsRail = dynamic(() =>
  import("@/components/sections/home/HomeSolutionsRail").then((m) => m.HomeSolutionsRail),
);
const HomeProofTelecom = dynamic(() =>
  import("@/components/sections/home/HomeProofTelecom").then((m) => m.HomeProofTelecom),
);
// HomeApproachSplit, le PremiumFlowPanel du déroulé et HomeProfileMatrix sont débranchés
// depuis le LOT 3 : une seule section raconte désormais la méthode. Fichiers conservés le
// temps de la validation, candidats au nettoyage ensuite (avec homeDeliveryFlow.ts et
// homeProfilesData.ts, qui ne servaient qu'à eux).
const HomeMethodPath = dynamic(() =>
  import("@/components/sections/home/HomeMethodPath").then((m) => m.HomeMethodPath),
);

export default function Home() {
  const howToSchema = buildHowToSchema({
    name: "Comment je travaille : du premier échange à l'outil en production",
    description:
      "Méthode en quatre étapes pour créer un site web, une application ou une automatisation sur mesure : échange gratuit, proposition chiffrée, outil branché sur vos outils, puis ajustements après la mise en ligne.",
    steps: HOME_METHOD_STEPS.map((s) => ({ name: s.title, text: s.text })),
  });

  return (
    <>
      <JsonLd schema={howToSchema} id="ld-home-howto" />
      <PageAtmosphere preset="home" />

      {/* ── C'est quoi : la promesse (hero clair, scène narrative) ───────── */}
      <HeroSection />

      {/* ── Preuve : un projet réel, première section sombre ──────────────── */}
      <HomeProofTelecom />

      {/* ── Le problème : les situations du quotidien (surface claire) ── */}
      <HomeDailyFriction />

      {/* ── La réponse : les cinq familles d'outils ────────────────────── */}
      <HomeSolutionsRail />

      {/* ── Note réglementaire : échéance légale réelle (aside, pas de h2) ── */}
      <HomeDeadlineBand />

      {/* ── Comment ça marche : une seule section, quatre étapes ───────── */}
      <HomeMethodPath />

      {/* ── L'étape suivante : un seul CTA, court ──────────────────────── */}
      {/* LOT 4G : aucun prix ici. L'accueil promet et rassure, la page /services chiffre. */}
      <CTABand
        title={<>Vous avez un processus à <span className="text-gradient-fluid">simplifier</span> ?</>}
        description="Expliquez-moi ce qui vous prend du temps aujourd'hui. Je vous dis simplement ce qu'il est possible d'automatiser ou de mieux connecter."
        primaryLabel="Parler de mon besoin"
        secondary={null}
        trustItems={["Premier échange sans engagement", "Réponse sous 24 h"]}
        framed
      />
    </>
  );
}
