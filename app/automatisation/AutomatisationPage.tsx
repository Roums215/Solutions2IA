import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { CTABand } from "@/components/shared/CTABand";
import { AutoHeroSection } from "@/components/sections/automation/AutoHeroSection";

// Rendu serveur : seul le hero est dans le bundle initial ; les sections sous la ligne de
// flottaison sont des chunks séparés (ssr:true par défaut, contenu présent dans le HTML).
//
// Refonte V3 du 29/09/2026 : huit moments, une identité « systèmes reliés ». Remplacés et
// débranchés de cette page : AutomationScene (hero SaaS à métriques fictives), les quatre
// cartes de cas, IntegrationsConnect, SectorGrid, ChorusProSection, le bandeau facture en
// haut de page, RelatedServices. AutomationPipeline et sectorsData restent utilisés par
// /automatisation/[secteur].
const AutoDaily = dynamic(() => import("@/components/sections/automation/AutoDaily").then((m) => m.AutoDaily));
const AutoRealCase = dynamic(() => import("@/components/sections/automation/AutoRealCase").then((m) => m.AutoRealCase));
const AutoConnect = dynamic(() => import("@/components/sections/automation/AutoConnect").then((m) => m.AutoConnect));
const AutoTrades = dynamic(() => import("@/components/sections/automation/AutoTrades").then((m) => m.AutoTrades));
const AutoInvoice = dynamic(() => import("@/components/sections/automation/AutoInvoice").then((m) => m.AutoInvoice));
const AutoMethod = dynamic(() => import("@/components/sections/automation/AutoMethod").then((m) => m.AutoMethod));

const RELATED = [
  { question: "Besoin qu'un assistant comprenne avant d'agir ?", label: "Agent IA", href: "/agents-ia" },
  { question: "Besoin d'un vrai outil central pour votre activité ?", label: "Application sur mesure", href: "/applications" },
];

export function AutomatisationPage() {
  return (
    <>
      <PageAtmosphere preset="flow" />

      {/* ── 1 · Hero : un film de quatre automatisations autour d'un moteur (sombre) ── */}
      <AutoHeroSection />

      {/* ── 2 · Ce que ça change au quotidien : quatre situations (clair froid) ── */}
      <AutoDaily />

      {/* ── 3 · Un cas réel : JobPhoning → n8n → Axonaut (sombre, id="mon-flux") ── */}
      <AutoRealCase />

      {/* ── 4 · Vos outils travaillent ensemble : workflow interactif (clair) ── */}
      <AutoConnect />

      {/* ── 5 · Par métier : un workflow par onglet (sombre, id="metiers") ── */}
      <AutoTrades />

      {/* ── 6 · Facture électronique : bloc court (sombre, id="facture-electronique-2026") ── */}
      <AutoInvoice />

      {/* ── 7 · Comment on démarre : trajectoire et livrables (clair, id="methode") ── */}
      <AutoMethod />

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

      {/* ── 8 · L'étape suivante : un seul bouton ── */}
      <CTABand
        title={
          <>
            Quelle tâche refaites-vous <span className="text-gradient-strong">chaque semaine</span> ?
          </>
        }
        description="Montrez-moi ce qui se répète. Je vous dirai ce qui peut être automatisé, comment, et avec quels outils."
        primaryLabel="Premier échange gratuit"
        secondary={null}
        trustItems={["Réponse sous 24 h", "Premier échange gratuit", "Sans engagement"]}
        framed
        compact
      />
    </>
  );
}
