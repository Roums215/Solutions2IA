"use client";

import { useRef } from "react";
import { motion, type Variants } from "motion/react";
import { Calculator, CornerDownRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { SURFACE } from "@/components/sections/home/homePalette";
import { COST_SITUATIONS, SITE_COST_COUNT, type CostSituation } from "./webCostData";

/**
 * /sites-web, section 3 (claire) : ce qu'un site mal conçu vous coûte.
 *
 * Quatre cartes structurées en 2 × 2 (l'accueil lit ses situations en lignes, ici on
 * compare des cas) : la situation, le trajet d'aujourd'hui en icônes métier, puis la
 * réponse du site sur une bande bleu nuit. Pas de texte barré, pas de trait qui se
 * trace : seul mouvement, la révélation des cartes. Tier minimal : rendu final direct.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const INSTANT = { duration: 0 };
const still = (v: Variants): Variants => ({ ...v, visible: { ...(v.visible as object), transition: INSTANT } });
const LIST_STILL: Variants = { hidden: {}, visible: {} };

export function WebCostSituations() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      aria-labelledby="web-cost-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden rounded-t-[2rem] bg-paper lg:rounded-t-[3.5rem]"
    >
      <SectionFluidBackdrop variant="webCost" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="web-cost-heading"
          label="Le coût caché"
          title={
            <>
              Ce qu&apos;un site mal conçu{" "}
              <span className="text-gradient-strong">vous coûte</span>.
            </>
          }
          description="Il ne coûte pas seulement son prix. Il coûte les demandes qui ne partent pas, celles qui arrivent à moitié, et celles qui se perdent en route."
        />

        <motion.ul
          className="grid gap-5 md:grid-cols-2 lg:gap-6"
          variants={instant ? LIST_STILL : list}
          initial="hidden"
          {...(instant
            ? { animate: "visible" as const }
            : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
        >
          {COST_SITUATIONS.map((item, i) => (
            <CostCard key={item.key} item={item} index={i} variants={instant ? still(card) : card} />
          ))}
        </motion.ul>

        {/* Le chiffre vient du visiteur : on lui donne le calcul, pas un résultat. */}
        <div className="paper-sub mt-8 flex items-start gap-3.5 rounded-2xl px-5 py-4 lg:mt-10 lg:items-center lg:px-6">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-cyan" aria-hidden>
            <Calculator size={17} strokeWidth={1.75} />
          </span>
          <p className="text-[15px] leading-relaxed text-text-secondary">{SITE_COST_COUNT}</p>
        </div>
      </div>
    </section>
  );
}

function CostCard({ item, index, variants }: { item: CostSituation; index: number; variants: Variants }) {
  const Icon = item.icon;

  return (
    <motion.li variants={variants} className="paper-card flex flex-col overflow-hidden rounded-2xl">
      <div className="flex-1 p-5 lg:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-cyan" aria-hidden>
            <Icon size={18} strokeWidth={1.75} />
          </span>
          <span aria-hidden className="font-mono text-xs tracking-[0.12em] text-text-tertiary">
            0{index + 1}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-balance sm:text-xl">{item.title}</h3>
        <p className="mt-2.5 text-[15px] leading-[1.7] text-text-secondary text-pretty">{item.detail}</p>
      </div>

      {/* Aujourd'hui : le trajet, en icônes. Surface lavande froide. */}
      <div className="border-t border-paper-line px-5 py-3.5 lg:px-6" style={{ backgroundColor: SURFACE.muted }}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-2">Aujourd&apos;hui</p>
        <ol className="mt-2.5 flex flex-wrap items-center gap-y-2">
          {item.today.map(({ label, icon: StepIcon }, i) => (
            <li key={label} className="flex items-center">
              {i > 0 && <span aria-hidden className="mx-2 h-px w-4 bg-ink/25" />}
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-2">
                <StepIcon size={13} strokeWidth={1.75} className="shrink-0 text-ink-3" aria-hidden />
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Avec le site : bande bleu nuit, la réponse se lit d'un coup d'œil. */}
      <div className="bg-ink px-5 py-3.5 text-paper lg:px-6">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan">
          <CornerDownRight size={11} strokeWidth={2} aria-hidden />
          Avec le bon site
        </p>
        <p className="mt-1.5 text-[14px] font-medium leading-snug">{item.withSite}</p>
      </div>
    </motion.li>
  );
}
