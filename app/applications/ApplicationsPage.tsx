import dynamic from "next/dynamic";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import { AppHeroSection } from "@/components/sections/applications/AppHeroSection";

// Rendu serveur, comme l'accueil et /sites-web : seul le hero est dans le bundle initial.
// Les sections sous la ligne de flottaison sont des chunks séparés, hydratés plus tard ;
// ssr:true (par défaut), donc leur contenu reste dans le HTML (SEO intact).
//
// Refonte du 28/09/2026 : AppScene (hero), SectorsCoverage, AppDigitizationPipeline,
// BuildOrAuditDiptych et PerformanceTracking sont débranchés de cette page. Fichiers
// conservés le temps de la validation, candidats au nettoyage ensuite. Les données des
// secteurs (sectorsAppsData, appSectorVerticals, sectorDashboards) restent partagées
// avec les pages /applications/[secteur].
const AppsProblems = dynamic(() => import("@/components/sections/applications/AppsProblems").then((m) => m.AppsProblems));
const AppsPrinciple = dynamic(() => import("@/components/sections/applications/AppsPrinciple").then((m) => m.AppsPrinciple));
const AppsBenefits = dynamic(() => import("@/components/sections/applications/AppsBenefits").then((m) => m.AppsBenefits));
const AppsMethod = dynamic(() => import("@/components/sections/applications/AppsMethod").then((m) => m.AppsMethod));
const AppsSectors = dynamic(() => import("@/components/sections/applications/AppsSectors").then((m) => m.AppsSectors));
const AppsCaseStudy = dynamic(() => import("@/components/sections/applications/AppsCaseStudy").then((m) => m.AppsCaseStudy));

export function ApplicationsPage() {
  return (
    <>
      <PageAtmosphere preset="apps" />

      {/* ── A · Le hero : du bazar à votre outil (sombre, démonstration en 5 temps) ── */}
      <AppHeroSection />

      {/* ── B · Les problèmes concrets, que le visiteur coche (clair) ── */}
      <AppsProblems />

      {/* ── C · Le principe : entrées → application → sorties (sombre) ── */}
      <AppsPrinciple />

      {/* ── D · Ce que l'outil apporte, à trois niveaux (clair froid) ── */}
      <AppsBenefits />

      {/* ── E · Comment je travaille, prix cadré (sombre, id="methode") ── */}
      <AppsMethod />

      {/* ── F et G · Votre métier : sa fiche et son tableau de bord (clair) ── */}
      <AppsSectors />

      {/* ── H · Un cas concret : télécoms (sombre) ── */}
      <AppsCaseStudy />

      {/* ── I · L'étape suivante : un seul CTA ── */}
      <CTABand
        title={
          <>
            Parlez-moi de ce qui vous fait <span className="text-gradient-fluid">perdre du temps</span>.
          </>
        }
        description="Un premier échange suffit pour voir si un outil sur mesure a du sens chez vous, ou pas. Si ce n'est pas le cas, je vous le dis."
        primaryLabel="Parler de mon projet"
        secondary={null}
        trustItems={["Premier échange gratuit", "Réponse sous 24 h", "Prix fixé avant de démarrer"]}
        framed
      />
    </>
  );
}
