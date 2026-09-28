"use client";

import { motion, type Variants } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { CRAFT_COMMITMENTS, CRAFT_LAYERS, CRAFT_TECH, CRAFT_TECH_SUMMARY, type CraftLayer } from "./webCraftData";

/**
 * /sites-web, section 5 (sombre) : comment je le construis, et pourquoi avec moi.
 *
 * À gauche, le schéma des quatre couches d'un site, empilées du plus visible au socle,
 * reliées par un fil qui descend. À droite, les engagements en deux blocs. La technique
 * reste repliée (second niveau). Aucun comparatif « moi contre l'agence ».
 * Tier minimal et reduced-motion : rendu final direct.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
const slab: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const thread: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.3, ease: EASE, delay: 0.2 } },
};
const INSTANT = { duration: 0 };
const still = (v: Variants): Variants => ({ ...v, visible: { ...(v.visible as object), transition: INSTANT } });
const LIST_STILL: Variants = { hidden: {}, visible: {} };

export function WebCraftFoundations() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const v = (variants: Variants) => (instant ? still(variants) : variants);

  return (
    <section
      className="section-shell-tight relative isolate overflow-hidden pb-12! lg:pb-14!"
      aria-labelledby="web-craft-heading"
    >
      <SectionFluidBackdrop variant="webCraft" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="web-craft-heading"
          label="Comment je le construis"
          title={
            <>
              Quatre couches solides,{" "}
              <span className="text-gradient-strong">un seul interlocuteur</span>.
            </>
          }
          description="Un site qui transforme des visites en demandes tient sur quatre couches. Je m'occupe des quatre, et vous parlez toujours à la même personne."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          {/* Le schéma des couches */}
          <motion.ol
            className="relative self-start"
            variants={instant ? LIST_STILL : list}
            initial="hidden"
            {...(instant
              ? { animate: "visible" as const }
              : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
          >
            <motion.span
              aria-hidden
              className="absolute bottom-10 left-[1.4375rem] top-10 w-px origin-top bg-gradient-to-b from-cyan/70 via-accent-light/50 to-accent-primary/60"
              variants={v(thread)}
            />
            {CRAFT_LAYERS.map((layer, i) => (
              <LayerSlab key={layer.key} layer={layer} index={i} last={i === CRAFT_LAYERS.length - 1} variants={v(slab)} />
            ))}
          </motion.ol>

          {/* Les engagements */}
          <div className="space-y-4 lg:pt-1">
            {CRAFT_COMMITMENTS.map((group) => (
              <div key={group.title} className="panel-card rounded-2xl p-5 sm:p-6">
                <h3 className="text-[16px] font-semibold tracking-tight text-text-primary">{group.title}</h3>
                <ul className="mt-3.5 space-y-2.5">
                  {group.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check size={15} strokeWidth={2.25} aria-hidden className="mt-1 shrink-0 text-cyan" />
                      <span className="text-[14.5px] leading-relaxed text-text-secondary">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Second niveau : la technique, repliée */}
            <details className="group panel-card rounded-2xl px-5 py-4 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-[14.5px] font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary [&::-webkit-details-marker]:hidden">
                {CRAFT_TECH_SUMMARY}
                <ChevronDown
                  size={15}
                  aria-hidden
                  className="shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <div className="mt-3.5 space-y-3 border-t border-border-medium pt-3.5">
                {CRAFT_TECH.map((block) => (
                  <p key={block.label} className="text-[13.5px] leading-[1.75] text-text-tertiary">
                    <span className="font-semibold text-text-secondary">{block.label} : </span>
                    {block.text}
                  </p>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

function LayerSlab({
  layer,
  index,
  last,
  variants,
}: {
  layer: CraftLayer;
  index: number;
  last: boolean;
  variants: Variants;
}) {
  const Icon = layer.icon;
  return (
    <motion.li variants={variants} className="relative">
      <div className="flex items-stretch gap-4">
        <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center self-center rounded-xl border border-border-medium bg-bg-secondary text-cyan">
          <Icon size={19} strokeWidth={1.75} aria-hidden />
        </span>
        {/* Chaque couche est une dalle ; la dernière, le socle, est la plus dense. */}
        <div className={`panel-card min-w-0 flex-1 rounded-2xl px-4 py-3.5 sm:px-5 ${last ? "ring-1 ring-accent-primary/35" : ""}`}>
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
            <span aria-hidden className="font-mono text-[12px] tracking-[0.08em] text-text-tertiary">
              0{index + 1}
            </span>
            <h3 className="text-[16px] font-semibold tracking-tight text-text-primary">{layer.name}</h3>
            <span className="text-[13px] text-text-tertiary">{layer.role}</span>
          </div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-secondary">{layer.items.join(" · ")}</p>
        </div>
      </div>
      {!last && <span aria-hidden className="block h-3" />}
    </motion.li>
  );
}
