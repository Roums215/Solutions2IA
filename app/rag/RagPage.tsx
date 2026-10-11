import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import { RagHeroSection } from "@/components/sections/rag/RagHeroSection";

// Rendu serveur : seul le hero est dans le bundle initial ; les sections sous la ligne de
// flottaison sont des chunks séparés (ssr:true par défaut, contenu présent dans le HTML).
//
// Refonte d'octobre 2026, « la démo d'abord » : cinq moments au lieu de treize sections.
// Le hero montre une vraie réponse citée sur des documents d'exemple ; elle couvre les
// usages et les métiers. Débranchés, conservés le temps de la validation : RagSommaire,
// RagContrastClassicVsRag, RagPainLoss, RagSearchTime, RagMemoryFlow, RagUsagesTabs
// (+ RagUsageSchema), RagInstallSteps, RagEnrichmentStatic, RagSectorTabs, RagSizing,
// RagDecisionWizard, RagDataControl, RagHonestLimits, et leurs *Data.ts sauf
// ragDataControlData (garanties et pile technique, repris par RagHowItWorks).
const RagSearchCalculator = dynamic(() => import("@/components/sections/rag/RagSearchCalculator").then((m) => m.RagSearchCalculator));
const RagHowItWorks = dynamic(() => import("@/components/sections/rag/RagHowItWorks").then((m) => m.RagHowItWorks));
const RagLimits = dynamic(() => import("@/components/sections/rag/RagLimits").then((m) => m.RagLimits));
const RagStart = dynamic(() => import("@/components/sections/rag/RagStart").then((m) => m.RagStart));

const RELATED = [
  { question: "Vous voulez qu'un assistant agisse à partir de cette mémoire ?", label: "Agent IA", href: "/agents-ia" },
  { question: "Vous voulez que vos outils se mettent à jour tout seuls ?", label: "Automatisation", href: "/automatisation" },
];

export function RagPage() {
  return (
    <>
      <PageAtmosphere preset="rag" />

      {/* ── 1 · Hero : la démonstration, trois questions et leurs sources (sombre) ── */}
      <RagHeroSection />

      {/* ── 2 · Votre calcul : le temps passé à chercher, en heures et en euros (clair, id="calcul") ── */}
      <RagSearchCalculator />

      {/* ── 3 · Comment ça marche, et vos données (sombre, id="comment-ca-marche") ── */}
      <RagHowItWorks />

      {/* ── 4 · Ce qu'elle ne fait pas (clair, id="limites") ── */}
      <RagLimits />

      {/* ── 5 · On démarre : trajectoire et engagements (sombre, id="methode") ── */}
      <RagStart />

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

      {/* ── L'étape suivante : un seul CTA ── */}
      <CTABand
        title={
          <>
            Quelle question vos équipes posent-elles <span className="text-gradient-strong">tous les jours</span> ?
          </>
        }
        description="Envoyez-moi deux ou trois questions qui reviennent, et où se trouve la réponse aujourd'hui. Je vous dis franchement si une mémoire d'entreprise peut y répondre, et à partir de quels documents."
        primaryLabel="Parler de mon besoin"
        secondary={null}
        trustItems={["Premier échange gratuit", "Réponse sous 24 h", "Sans engagement"]}
        framed
        compact
      />
    </>
  );
}
