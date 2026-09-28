import dynamic from "next/dynamic";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import { WebHeroSection } from "@/components/sections/sites-web/WebHeroSection";

// Rendu serveur, comme l'accueil : seul le hero est dans le bundle initial. Les sections
// sous la ligne de flottaison sont des chunks séparés, hydratés plus tard ; ssr:true (par
// défaut), donc leur contenu reste dans le HTML (SEO intact).
//
// Refonte du 27/09/2026 : WebOpportunitySources, WebOpportunityFlow, WebPainBusiness,
// WebVsAgency, WebFoundations et le WebScene du hero sont débranchés. Fichiers conservés
// le temps de la validation, candidats au nettoyage ensuite (avec leurs *Data.ts).
const WebSourcesConverge = dynamic(() =>
  import("@/components/sections/sites-web/WebSourcesConverge").then((m) => m.WebSourcesConverge),
);
const WebCostSituations = dynamic(() =>
  import("@/components/sections/sites-web/WebCostSituations").then((m) => m.WebCostSituations),
);
const WebBuildLevels = dynamic(() =>
  import("@/components/sections/sites-web/WebBuildLevels").then((m) => m.WebBuildLevels),
);
const WebCraftFoundations = dynamic(() =>
  import("@/components/sections/sites-web/WebCraftFoundations").then((m) => m.WebCraftFoundations),
);

export function SitesWebPage() {
  return (
    <>
      <PageAtmosphere preset="web" />

      {/* ── 1 · C'est quoi : une visite qui devient une action (hero clair, scène 2.5D) ── */}
      <WebHeroSection />

      {/* ── 2 · D'où viennent vos clients : trois familles → un site → une demande (sombre) ── */}
      <WebSourcesConverge />

      {/* ── 3 · Ce qu'un site mal conçu coûte : quatre situations (clair) ── */}
      <WebCostSituations />

      {/* ── 4 · Ce que je construis : quatre paliers, un schéma qui s'enrichit (clair froid) ── */}
      <WebBuildLevels />

      {/* ── 5 · Comment je le construis : couches et engagements (sombre) ── */}
      <WebCraftFoundations />

      {/* ── L'étape suivante : un seul CTA ── */}
      <CTABand
        title={<>Parlons de votre <span className="text-gradient-fluid">site</span></>}
        description="Que vous partiez de zéro ou que vous ayez déjà un site à refaire, dites-moi ce qu'il devrait vous apporter. Je vous réponds franchement : ce qui est utile, et ce que ça coûterait."
        primaryLabel="Parler de mon site"
        secondary={null}
        trustItems={["Premier échange gratuit", "Réponse sous 24 h", "Prix fixé avant de démarrer"]}
        framed
      />
    </>
  );
}
