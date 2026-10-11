import dynamic from "next/dynamic";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { ServicesHeroSection } from "@/components/sections/services/ServicesHeroSection";

// Rendu serveur : seul le hero est dans le bundle initial ; les sections sous la ligne de
// flottaison sont des chunks séparés (ssr:true par défaut, contenu présent dans le HTML).
//
// Refonte d'octobre 2026, « bento de verre », puis passe UX : trois langages de schéma au
// lieu de frises génériques (la journée du client dans le hero, les objets réels dans les
// fiches et dans « ce que vous recevez », l'avant / après dans les situations), un CTA
// orienté en haut (?besoin=… présélectionne /contact) et un CTA expliqué en bas.
// Retirés : PageHero et ServicesStackVisual, les cinq SpotlightCard empilées, les sept
// cartes de prix, PremiumFlowPanel, la section « Travailler avec moi », le CTABand.
const ServicesBento = dynamic(() => import("@/components/sections/services/ServicesBento").then((m) => m.ServicesBento));
const ServicesPricing = dynamic(() => import("@/components/sections/services/ServicesPricing").then((m) => m.ServicesPricing));
const ServicesSituations = dynamic(() => import("@/components/sections/services/ServicesSituations").then((m) => m.ServicesSituations));
const ServicesNextStep = dynamic(() => import("@/components/sections/services/ServicesNextStep").then((m) => m.ServicesNextStep));

export function ServicesPage() {
  return (
    <>
      <PageAtmosphere preset="services" />

      {/* ── 1 · Hero : la journée type et le CTA orienté (sombre) ── */}
      <ServicesHeroSection />

      {/* ── 2 · Les cinq services : une fiche par service, objets réels (sombre, id="services") ── */}
      <ServicesBento />

      {/* ── 3 · Les prix : table de verre givré, inclus, ce qui fait varier, garantie (clair, id="prix") ── */}
      <ServicesPricing />

      {/* ── 4 · Vous vous reconnaissez ? avant / après par situation (sombre, id="situations") ── */}
      <ServicesSituations />

      {/* ── 5 · L'étape suivante : ce que vous recevez, puis UN bouton (clair, id="methode") ── */}
      <ServicesNextStep />
    </>
  );
}
