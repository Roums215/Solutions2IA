"use client";

import { motion, type Variants } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import {
  HOME_METHOD_AUDIENCE,
  HOME_METHOD_COMMITMENTS,
  HOME_METHOD_STEPS,
  HOME_METHOD_TECH,
  HOME_METHOD_TECH_SUMMARY,
  type MethodStep,
} from "./homeMethodData";

/**
 * Accueil, section 5 : comment se passe un projet, en une seule section.
 *
 * Remplace trois blocs qui racontaient la même chose (HomeApproachSplit, le
 * PremiumFlowPanel du déroulé, HomeProfileMatrix) : un chemin vertical de quatre
 * étapes, ce qui ne change jamais, et le détail technique replié au second niveau.
 *
 * LOT 4C : quatre blocs de phase (en-tête, description, sous-carte « ce que vous avez
 * à la fin ») reliés par un simple trait statique. Plus de point qui s'allume, plus de
 * capsule : la lecture tient aux cadres et à la typographie. Le seul mouvement est la
 * révélation des blocs. Tier minimal et reduced-motion : rendu final direct.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const STAGGER = 0.16;
const DELAY_CHILDREN = 0.05;

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER, delayChildren: DELAY_CHILDREN } },
};
const step: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const INSTANT = { duration: 0 };
const still = (v: Variants): Variants => ({ ...v, visible: { ...(v.visible as object), transition: INSTANT } });
const LIST_STILL: Variants = { hidden: {}, visible: {} };

export function HomeMethodPath() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const v = (variants: Variants) => (instant ? still(variants) : variants);

  return (
    // Bas resserré : la dernière étape et le CTA final s'enchaînent (LOT 4B). L'utilitaire
    // est marqué important parce que `.section-shell` vit hors des couches Tailwind et
    // gagnerait sinon la cascade avec son `padding-block`.
    <section
      className="section-shell-tight relative isolate overflow-hidden pb-12! lg:pb-14!"
      aria-labelledby="home-method-heading"
    >
      {/* Une diagonale accompagne les quatre phases et conduit au CTA. */}
      <SectionFluidBackdrop variant="method" />
      <div className="section-container">
        <div className="mx-auto max-w-[1040px]">
          <SectionHeading
            centered={false}
          labelStyle="eyebrow"
            id="home-method-heading"
            label="Travailler ensemble"
            title={
              <>
                De votre problème à un outil{" "}
                <span className="text-gradient-strong">qui fonctionne</span>.
              </>
            }
            description="Quatre étapes, toujours les mêmes. Vous savez à chaque moment où en est le projet et ce que vous payez."
          />
        </div>

        {/* Même colonne éditoriale que les sections du LOT 2 : le texte ne s'étale pas. */}
        <div className="mx-auto max-w-[1040px] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-12">
          <motion.ol
            className="relative"
            variants={instant ? LIST_STILL : list}
            initial="hidden"
            {...(instant
              ? { animate: "visible" as const }
              : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
          >
            {HOME_METHOD_STEPS.map((item, i) => (
              <StepRow
                key={item.key}
                item={item}
                index={i}
                last={i === HOME_METHOD_STEPS.length - 1}
                v={v}
              />
            ))}
          </motion.ol>

          {/* LOT 4G : les engagements tiennent dans une carte, comme les phases.
              La colonne de droite cesse de flotter en texte libre sur le fond. */}
          <aside className="panel-card mt-8 rounded-2xl p-5 lg:mt-2 lg:self-start">
            <ul className="space-y-2.5">
              {HOME_METHOD_COMMITMENTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check size={15} strokeWidth={2.25} aria-hidden className="mt-1 shrink-0 text-accent-light" />
                  <span className="text-sm leading-relaxed text-text-secondary">{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-border-medium pt-5 text-sm leading-relaxed text-text-tertiary">
              {HOME_METHOD_AUDIENCE}
            </p>

            {/* Second niveau : la technique reste disponible, jamais au premier plan. */}
            <details className="group mt-5 border-t border-border-medium pt-3.5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-sm font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary [&::-webkit-details-marker]:hidden">
                {HOME_METHOD_TECH_SUMMARY}
                <ChevronDown
                  size={15}
                  aria-hidden
                  className="shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <div className="mt-3 space-y-3">
                {HOME_METHOD_TECH.map((block) => (
                  <p key={block.label} className="text-[13px] leading-[1.75] text-text-tertiary">
                    <span className="font-semibold text-text-secondary">{block.label} : </span>
                    {block.text}
                  </p>
                ))}
              </div>
            </details>
          </aside>
        </div>
      </div>
    </section>
  );
}

function StepRow({
  item,
  index,
  last,
  v,
}: {
  item: MethodStep;
  index: number;
  last: boolean;
  v: (variants: Variants) => Variants;
}) {
  const Icon = item.icon;

  return (
    <motion.li variants={v(step)}>
      {/* Bloc de phase */}
      <div className="panel-card relative rounded-2xl p-4 sm:p-5">
        <div className="flex items-baseline gap-3.5">
          <span aria-hidden className="shrink-0 font-mono text-[20px] font-semibold leading-none tracking-[0.06em] text-text-tertiary/70">
            0{index + 1}
          </span>
          <h3 className="min-w-0 text-lg font-semibold tracking-tight text-balance sm:text-xl">{item.title}</h3>
        </div>

        <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.7] text-text-secondary text-pretty">
          {item.text}
        </p>

        {/* Sous-carte : ce que le client a en main à la fin de l'étape.
            LOT 4G : teinte plus dense, arête gauche pleine, dessus éclairé. */}
        <div className="mt-4 flex gap-3 rounded-xl border border-border-medium border-l-[3px] border-l-accent-primary bg-accent-primary/14 px-3.5 py-3 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--color-text-primary)_10%,transparent)]">
          <Icon size={15} strokeWidth={1.75} aria-hidden className="mt-0.5 shrink-0 text-accent-light" />
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Ce que vous avez à la fin
            </span>
            <span className="mt-0.5 block text-[13.5px] font-medium leading-snug text-text-primary">{item.gives}</span>
          </span>
        </div>
      </div>

      {/* Trait de liaison : aligné sur le numéro de phase, il descend vers la suivante */}
      {!last && (
        <span
          aria-hidden
          className="ml-7 block h-6 w-px bg-gradient-to-b from-accent-primary/55 to-border-subtle sm:ml-8"
        />
      )}
    </motion.li>
  );
}
