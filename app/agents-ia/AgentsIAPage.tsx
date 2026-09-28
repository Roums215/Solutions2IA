import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import { AiHeroSection } from "@/components/sections/agents-ia/AiHeroSection";

// Rendu serveur : seul le hero est dans le bundle initial ; les sections sous la ligne de
// flottaison sont des chunks séparés (ssr:true par défaut, contenu présent dans le HTML).
//
// Refonte V3 du 29/09/2026 : six moments au lieu de neuf. Fusionnés : les deux sections
// de rôles (AiAgentTypes), l'autonomie et la confiance (AiAutonomy), le pilote et la
// méthode (AiDeployment). Débranchés, conservés le temps de la validation :
// AiRoleConfigurator (+ aiProfilesData), AiConfidence, et les composants V1 (AIBrainScene,
// AgentAnatomyDiagram, UniversalNeedsGrid, OneAgentManyNeedsPipeline, TrustGuardrails,
// ProfileCarousel).
const AiAgentTypes = dynamic(() => import("@/components/sections/agents-ia/AiAgentTypes").then((m) => m.AiAgentTypes));
const AiTimeCalculator = dynamic(() => import("@/components/sections/agents-ia/AiTimeCalculator").then((m) => m.AiTimeCalculator));
const AiAutonomy = dynamic(() => import("@/components/sections/agents-ia/AiAutonomy").then((m) => m.AiAutonomy));
const AiDeployment = dynamic(() => import("@/components/sections/agents-ia/AiDeployment").then((m) => m.AiDeployment));

const RELATED = [
  { question: "Vous avez surtout besoin que des outils s'enchaînent ?", label: "Automatisation", href: "/automatisation" },
  { question: "Vous avez besoin d'un véritable outil métier ?", label: "Application sur mesure", href: "/applications" },
];

export function AgentsIAPage() {
  return (
    <>
      <PageAtmosphere preset="ai" />

      {/* ── 1 · Hero : l'assistant au travail, une demande de bout en bout (clair) ── */}
      <AiHeroSection />

      {/* ── 2 · Un rôle précis : besoin, fiche, exemple métier (sombre, id="besoins") ── */}
      <AiAgentTypes />

      {/* ── 3 · Votre gain : le calculateur (clair, id="calcul") ── */}
      <AiTimeCalculator />

      {/* ── 4 · Vous gardez le contrôle : niveaux, verrou, questions (sombre) ── */}
      <AiAutonomy />

      {/* ── 5 · On commence petit : trajectoire et pilote (clair, id="methode") ── */}
      <AiDeployment />

      {/* ── Services liés : deux lignes éditoriales, pas une section ── */}
      <nav aria-label="Services liés" className="section-container pt-14 sm:pt-16">
        <ul className="divide-y divide-border-medium border-y border-border-medium">
          {RELATED.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="group flex flex-col gap-1 py-5 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="text-[15.5px] text-text-secondary transition-colors duration-300 group-hover:text-text-primary">{r.question}</span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-[15.5px] font-semibold text-accent-light">
                  {r.label}
                  <ArrowRight size={16} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── 6 · L'étape suivante : un seul CTA ── */}
      <CTABand
        title={
          <>
            Quelle tâche aimeriez-vous <span className="text-gradient-fluid">déléguer</span> ?
          </>
        }
        description="Dites-moi ce qui revient chaque jour ou chaque semaine. Je vous dirai simplement ce qui peut être préparé, automatisé ou laissé sous votre validation."
        primaryLabel="Parler de mon besoin"
        secondary={null}
        trustItems={["Réponse sous 24 h", "Premier échange gratuit", "Pilote cadré"]}
        framed
        compact
      />
    </>
  );
}
