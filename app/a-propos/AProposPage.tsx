import dynamic from "next/dynamic";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { AboutHeroSection } from "@/components/sections/a-propos/AboutHeroSection";

// Rendu serveur : seul le hero est dans le bundle initial ; les sections sous la ligne de
// flottaison sont des chunks séparés (ssr:true, contenu présent dans le HTML).
//
// Refonte d'octobre 2026, « fiche + parcours » : fiche d'identité en verre dans le hero, le
// récit et sa frise, six engagements avec leur preuve, quatre règles en objets réels (volet
// technique replié), oui / non, puis UN bouton expliqué. Retirés : PageHero, les repères en
// tuiles (passés dans la fiche), PremiumFlowPanel, SectionParticles, le CTABand. Le contenu
// est repris dans components/sections/a-propos/aproposPageData.ts.
const AboutJourney = dynamic(() => import("@/components/sections/a-propos/AboutJourney").then((m) => m.AboutJourney));
const AboutCommitments = dynamic(() => import("@/components/sections/a-propos/AboutCommitments").then((m) => m.AboutCommitments));
const AboutMethod = dynamic(() => import("@/components/sections/a-propos/AboutMethod").then((m) => m.AboutMethod));
const AboutFit = dynamic(() => import("@/components/sections/a-propos/AboutFit").then((m) => m.AboutFit));

export function AProposPage() {
  return (
    <>
      <PageAtmosphere preset="about" />

      {/* ── 1 · Hero : qui je suis, et la fiche d'identité en verre (sombre) ── */}
      <AboutHeroSection />

      {/* ── 2 · Mon parcours : le récit et sa frise (clair) ── */}
      <AboutJourney />

      {/* ── 3 · Mes engagements : la promesse et comment la vérifier (sombre) ── */}
      <AboutCommitments />

      {/* ── 4 · Ma façon de travailler : quatre règles, objets réels, technique repliée (clair, id="methode") ── */}
      <AboutMethod />

      {/* ── 5 · Pour qui : oui / non, puis l'étape suivante, un seul bouton (sombre) ── */}
      <AboutFit />
    </>
  );
}
