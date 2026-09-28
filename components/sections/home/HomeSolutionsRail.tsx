"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { SchemaFrame } from "@/components/shared/mockup/FlowCards";
import { SolutionSchema, SERVICE_TINT } from "./solutionSchemas";
import { cn } from "@/lib/utils/cn";
import {
  HOME_SOLUTIONS,
  HOME_SOLUTIONS_MOCKUP_NOTE,
  HOME_SOLUTIONS_MOCKUP_NOTE_MOBILE,
  type HomeSolution,
  type HomeSolutionId,
} from "./homeSolutionsData";

/**
 * Accueil, section 4 : les cinq familles de prestations.
 *
 * Desktop : un rail éditorial à gauche (les cinq titres, toujours visibles), le
 * détail du service choisi à droite, avec une petite maquette métier. Le choix
 * se fait au clic, jamais au survol.
 *
 * Téléphone : le rail disparaît et les cinq services se lisent à la suite, tous
 * dépliés. Pas de carrousel, pas de scène desktop réduite. Le HTML serveur
 * contient les cinq, seul l'affichage change.
 *
 * LOT 4C : le panneau de droite devient une vraie fiche de solution (grande carte,
 * en-tête, sous-carte d'exemple, sous-carte de fonctionnement faite d'objets métier
 * reliés). Plus de voyants ni de pastilles d'état.
 *
 * Remplace HomeServicesConstellation (pentagone abstrait, illisible sous 1024 px).
 */
export function HomeSolutionsRail() {
  const sectionRef = useRef<HTMLElement>(null);
  // Surface claire : le menu passe à l'encre tant qu'elle est dessous.
  useLightHeaderZone(sectionRef);
  const [activeId, setActiveId] = useState<HomeSolutionId>(HOME_SOLUTIONS[0].id);
  // Téléphone seulement : l'exemple détaillé et la maquette du premier service sont
  // ouverts, les quatre autres se déplient au tap. Le desktop les affiche toujours.
  const [openOnMobile, setOpenOnMobile] = useState<HomeSolutionId[]>([HOME_SOLUTIONS[0].id]);
  const toggleOnMobile = (id: HomeSolutionId) =>
    setOpenOnMobile((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-solutions-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden bg-paper-2 rounded-b-[2rem] lg:rounded-b-[3.5rem]"
    >
      <SectionFluidBackdrop
        variant="solutions"
        shape={HOME_SOLUTIONS.findIndex((s) => s.id === activeId)}
      />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="home-solutions-heading"
          label="Ce que je construis"
          title={
            <>
              Cinq outils possibles,{" "}
              <span className="text-gradient-strong">un seul interlocuteur</span>.
            </>
          }
          description="On part toujours de ce qui vous prend du temps, jamais de la technologie. Voici les cinq familles d'outils que je construis, et ce qu'elles changent concrètement."
        />

        {/* Mention unique sur téléphone : les maquettes ne la répètent plus une par une. */}
        <p className="-mt-8 mb-10 text-[12.5px] text-text-tertiary lg:hidden">
          {HOME_SOLUTIONS_MOCKUP_NOTE_MOBILE}
        </p>

        <div className="lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-x-14">
          {/* Rail : desktop seulement. Sur téléphone, les cinq blocs se suivent. */}
          <ul className="hidden lg:col-start-1 lg:row-start-1 lg:block">
            {HOME_SOLUTIONS.map((solution) => {
              const isActive = solution.id === activeId;
              const Icon = solution.icon;
              return (
                <li key={solution.id}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls={`solution-${solution.id}`}
                    onClick={() => setActiveId(solution.id)}
                    className={cn(
                      "group w-full border-l-2 py-4 pl-5 pr-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
                      // Le service choisi est posé sur du papier blanc : il se détache
                      // de la surface froide de la section (LOT 4G).
                      isActive
                        ? "rounded-r-xl bg-paper shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)]"
                        : "border-paper-line hover:border-paper-line-strong",
                    )}
                    style={
                      isActive
                        ? { borderLeftColor: `color-mix(in oklab, ${SERVICE_TINT[solution.id]} 70%, transparent)` }
                        : undefined
                    }
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon
                        size={16}
                        strokeWidth={1.75}
                        aria-hidden
                        className={cn("shrink-0", isActive ? "" : "text-text-tertiary")}
                        style={
                          isActive
                            ? { color: `color-mix(in oklab, ${SERVICE_TINT[solution.id]} 62%, var(--color-ink))` }
                            : undefined
                        }
                      />
                      <span
                        className={cn(
                          "text-[15px] font-semibold tracking-tight transition-colors duration-300",
                          isActive ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary",
                        )}
                      >
                        {solution.title}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "mt-1 block pl-[1.625rem] text-[13px] leading-snug",
                        isActive ? "text-text-secondary" : "text-text-tertiary",
                      )}
                    >
                      {solution.tagline}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="lg:col-start-2 lg:row-start-1">
            {HOME_SOLUTIONS.map((solution, i) => (
              <SolutionPanel
                key={solution.id}
                solution={solution}
                first={i === 0}
                active={solution.id === activeId}
                openOnMobile={openOnMobile.includes(solution.id)}
                onToggleMobile={() => toggleOnMobile(solution.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionPanel({
  solution,
  first,
  active,
  openOnMobile,
  onToggleMobile,
}: {
  solution: HomeSolution;
  first: boolean;
  active: boolean;
  openOnMobile: boolean;
  onToggleMobile: () => void;
}) {
  const Icon = solution.icon;
  const tint = SERVICE_TINT[solution.id];
  const exempleId = `solution-${solution.id}-exemple`;
  const maquetteId = `solution-${solution.id}-maquette`;

  return (
    <article
      id={`solution-${solution.id}`}
      className={cn(
        "py-2 lg:py-0",
        first && "max-lg:pt-0",
        // Desktop : seul le service choisi occupe la colonne de droite. Glissement
        // de 4 px au changement, jamais de fondu : le texte ne part pas d'opacity 0.
        active ? "lg:block lg:animate-in lg:slide-in-from-bottom-1 lg:duration-300" : "lg:hidden",
      )}
    >
      {/* Grande carte : la fiche de la solution */}
      <div className="paper-card overflow-hidden rounded-2xl">
        {/* En-tête teinté à la couleur du service, refermé par un filet à sa teinte */}
        <div
          className="flex items-start gap-3 border-b px-3.5 py-3.5 sm:px-5 sm:py-4 lg:px-7"
          style={{
            backgroundColor: `color-mix(in oklab, ${tint} 10%, transparent)`,
            borderColor: `color-mix(in oklab, ${tint} 26%, var(--color-paper-line))`,
          }}
        >
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border lg:h-10 lg:w-10"
            style={{
              backgroundColor: `color-mix(in oklab, ${tint} 18%, var(--color-paper))`,
              borderColor: `color-mix(in oklab, ${tint} 30%, transparent)`,
              color: `color-mix(in oklab, ${tint} 62%, var(--color-ink))`,
            }}
          >
            <Icon size={18} strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-[1.6rem]">
              {solution.title}
            </h3>
            <p className="mt-0.5 text-[13px] text-ink-2">{solution.tagline}</p>
          </div>
        </div>

        <div className="px-3.5 py-3.5 sm:px-5 sm:py-4 lg:px-7 lg:py-5">
        {/* Le texte, et l'exemple métier en sous-carte */}
        <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:gap-8">
          <div>
            <p className="max-w-[52ch] text-[15px] leading-[1.7] text-ink-2 text-pretty">{solution.what}</p>
            <p className="mt-2.5 max-w-[52ch] text-[15px] font-medium leading-[1.7] text-ink text-pretty">
              {solution.changes}
            </p>
          </div>

          <div
            id={exempleId}
            className={cn(
              "paper-sub rounded-xl border-l-[3px] p-3.5",
              !openOnMobile && "max-lg:hidden",
            )}
            style={{ borderLeftColor: `color-mix(in oklab, ${tint} 55%, transparent)` }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-2">Exemple</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{solution.example}</p>
          </div>
        </div>

        {/* Le schéma métier, sur toute la largeur de la fiche */}
        <div id={maquetteId} className={cn("mt-3.5 lg:mt-4", !openOnMobile && "max-lg:hidden")}>
          <SchemaFrame title={solution.sheet.title} aside={solution.sheet.aside} tint={tint}>
            <SolutionSchema id={solution.id} tint={tint} />
          </SchemaFrame>
        </div>

        {/* Pied de carte : zone basse pleine largeur, nettement délimitée (LOT 4G) */}
        <div className="-mx-3.5 -mb-3.5 mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper-line-strong bg-paper-2 px-3.5 py-3 sm:-mx-5 sm:-mb-4 sm:px-5 lg:-mx-7 lg:-mb-5 lg:mt-5 lg:px-7 lg:py-3.5">
          <Link
            href={solution.href}
            className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-ink-2 underline-offset-4 transition-colors duration-300 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
          >
            {solution.linkLabel}
            <ArrowRight
              size={14}
              strokeWidth={1.75}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>

          {/* Téléphone seulement : le détail s'ouvre au tap, rien d'essentiel n'en dépend. */}
          <button
            type="button"
            onClick={onToggleMobile}
            aria-expanded={openOnMobile}
            aria-controls={`${exempleId} ${maquetteId}`}
            className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-ink-2 transition-colors duration-300 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary lg:hidden"
          >
            {openOnMobile ? "Masquer l'exemple" : "Voir un exemple"}
            <ChevronDown
              size={14}
              strokeWidth={1.75}
              aria-hidden
              className={cn("transition-transform duration-300", openOnMobile && "rotate-180")}
            />
          </button>
        </div>
        </div>
      </div>
    </article>
  );
}
