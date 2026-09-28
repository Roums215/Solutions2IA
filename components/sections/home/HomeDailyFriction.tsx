"use client";

import { useRef } from "react";
import { motion, type Variants } from "motion/react";
import { ArrowRight, CornerDownRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";

import { SURFACE, EDGE } from "./homePalette";
import { CHAIN_ICON } from "./homeDailyFrictionData";
import { DAILY_FRICTIONS, DAILY_FRICTION_CLOSING, type DailyFriction } from "./homeDailyFrictionData";

/**
 * Accueil, section 3 : le quotidien avant la technologie.
 *
 * Quatre situations en lignes éditoriales (pas de cartes), sur la surface claire
 * ouverte par le hero. Chaque ligne : la situation, la friction, puis une sous-carte
 * qui montre le trajet d'aujourd'hui et ce qu'il devient avec l'outil.
 *
 * LOT 4C : plus de phrase barrée ni de trait qui se trace (registre « démonstration
 * IA »). Deux zones lisibles séparées par un filet, et le seul mouvement est la
 * révélation de la ligne. Tier minimal et reduced-motion : rendu final direct.
 * Remplace HomeTransformationFlows (quatre cartes de verre, registre abstrait).
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Même schéma que HomeProofTelecom : `initial="hidden"` est posé dès le rendu
// serveur (motion ne relit jamais `initial` après le montage), et le tier minimal
// amène les mêmes états à leur valeur finale en durée nulle.
const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};
const row: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const INSTANT = { duration: 0 };
const still = (v: Variants): Variants => ({ ...v, visible: { ...(v.visible as object), transition: INSTANT } });
const LIST_STILL: Variants = { hidden: {}, visible: {} };

export function HomeDailyFriction() {
  const sectionRef = useRef<HTMLElement>(null);
  // Surface claire : le menu passe à l'encre tant qu'elle est dessous.
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-friction-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden bg-paper rounded-t-[2rem] lg:rounded-t-[3.5rem]"
    >
      <SectionFluidBackdrop variant="friction" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="home-friction-heading"
          label="Le quotidien"
          title={
            <>
              Quand vos outils ne se parlent pas,{" "}
              <span className="text-gradient-strong">c&apos;est vous qui faites le lien</span>.
            </>
          }
          description="Quatre situations très ordinaires. Si vous vous reconnaissez dans une seule, il y a déjà quelque chose à régler."
        />

        <motion.ul
          className="mx-auto max-w-[1040px]"
          variants={instant ? LIST_STILL : list}
          initial="hidden"
          {...(instant
            ? { animate: "visible" as const }
            : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
        >
          {DAILY_FRICTIONS.map((item, i) => (
            <FrictionRow key={item.key} item={item} index={i} instant={instant} />
          ))}
        </motion.ul>

        <p className="mx-auto mt-10 max-w-[1040px] text-[15px] leading-relaxed text-text-secondary sm:text-base">
          {DAILY_FRICTION_CLOSING}
        </p>
      </div>
    </section>
  );
}

function FrictionRow({
  item,
  index,
  instant,
}: {
  item: DailyFriction;
  index: number;
  instant: boolean;
}) {
  return (
    <motion.li
      variants={instant ? still(row) : row}
      className="grid gap-5 border-t border-paper-line-strong py-6 lg:grid-cols-12 lg:items-start lg:gap-10 lg:py-9"
    >
      <p className="font-mono text-xs tracking-[0.12em] text-text-tertiary lg:col-span-1" aria-hidden>
        0{index + 1}
      </p>

      <div className="lg:col-span-6">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-balance sm:text-2xl">
          {item.situation}
        </h3>
        <p className="mt-3 max-w-[54ch] text-[15px] leading-[1.75] text-text-secondary text-pretty">
          {item.friction}
        </p>
      </div>

      {/* Aujourd'hui sur une surface ivoire, avec l'outil sur une surface froide :
          la distinction se lit aussi sans la couleur (intitulés, icône, filet).
          LOT 4G : la sous-carte est un objet posé (contour, relief), plus un aplat. */}
      <div className="paper-card overflow-hidden rounded-xl lg:col-span-5">
        <div
          className="p-3.5 lg:p-4"
          style={{ backgroundColor: SURFACE.muted }}
        >
          {/* ink-2 et non ink-3 : sur la surface lavande, ink-3 tombait à 2,7:1 (LOT 4G). */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-2">Aujourd&apos;hui</p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
            {item.today.map((step, i) => {
              const StepIcon = CHAIN_ICON[step];
              return (
                <li key={step} className="flex items-center gap-1.5">
                  {i > 0 && <ArrowRight size={11} strokeWidth={2} className="shrink-0 text-ink-3" aria-hidden />}
                  <span className="inline-flex items-center gap-1 text-[12px] font-medium text-ink-2">
                    {StepIcon && <StepIcon size={12} strokeWidth={1.75} className="shrink-0 text-ink-3" aria-hidden />}
                    {step}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="relative border-t p-3.5 lg:p-4"
          style={{ backgroundColor: SURFACE.result, borderColor: EDGE.result }}
        >
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-dark">
            <CornerDownRight size={11} strokeWidth={2} aria-hidden />
            Avec l&apos;outil
          </p>
          <p className="mt-2 text-[13.5px] font-medium leading-snug text-ink">{item.withTool}</p>
        </div>
      </div>
    </motion.li>
  );
}
