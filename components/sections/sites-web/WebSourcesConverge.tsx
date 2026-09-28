"use client";

import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowDown, ClipboardCheck, Lock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SITE_ROLE, SOURCE_FAMILIES, SOURCES_CLOSING, USABLE_REQUEST, type SourceFamily } from "./webSourcesData";

/**
 * /sites-web, section 2 (sombre) : d'où viennent réellement vos clients.
 *
 * Un schéma convergent lu de gauche à droite : trois familles de canaux → un même
 * site → une demande exploitable. Les traits se tracent une fois à l'entrée dans
 * l'écran (pathLength), aucun point qui circule, aucune lueur. Sous lg, la même
 * chaîne se lit de haut en bas. Tier minimal et reduced-motion : rendu final direct.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.1, ease: EASE, delay: 0.35 + i * 0.15 }, opacity: { duration: 0.2, delay: 0.35 + i * 0.15 } },
  }),
};
const INSTANT = { duration: 0 };
const still = (v: Variants): Variants => ({ ...v, visible: { ...(v.visible as object), transition: INSTANT } });
const LIST_STILL: Variants = { hidden: {}, visible: {} };
const DRAW_STILL: Variants = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: INSTANT } };

// Points d'arrivée des trois familles dans la colonne de liaison (viewBox 0 0 100 300).
const CURVES = [
  "M 0 50 C 55 50, 45 150, 100 150",
  "M 0 150 C 40 150, 60 150, 100 150",
  "M 0 250 C 55 250, 45 150, 100 150",
];

export function WebSourcesConverge() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const v = (variants: Variants) => (instant ? still(variants) : variants);

  return (
    <section className="section-shell-tight relative isolate overflow-hidden" aria-labelledby="web-sources-heading">
      <SectionFluidBackdrop variant="webSources" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="web-sources-heading"
          label="Les entrées"
          title={
            <>
              D&apos;où viennent{" "}
              <span className="text-gradient-strong">réellement vos clients</span>.
            </>
          }
          description="Personne n'arrive sur un site par hasard. Qu'ils vous cherchent, vous découvrent ou vous connaissent déjà, tous passent par le même endroit avant de vous écrire."
        />

        <motion.div
          className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_5.5rem_minmax(0,15.5rem)_3rem_minmax(0,15.5rem)] lg:items-center lg:gap-0"
          variants={instant ? LIST_STILL : list}
          initial="hidden"
          {...(instant
            ? { animate: "visible" as const }
            : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
        >
          {/* 1 · les trois familles */}
          <ul className="grid gap-3 lg:auto-rows-fr">
            {SOURCE_FAMILIES.map((f) => (
              <FamilyCard key={f.key} family={f} v={v} />
            ))}
          </ul>

          {/* 2 · la convergence : trois traits vers le site */}
          <div aria-hidden className="relative hidden h-full self-stretch lg:block">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 300" preserveAspectRatio="none">
              {CURVES.map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke={SOURCE_FAMILIES[i].stroke}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  custom={i}
                  variants={instant ? DRAW_STILL : draw}
                />
              ))}
            </svg>
          </div>
          <Down />

          {/* 3 · le site */}
          <motion.div variants={v(rise)} className="panel-card overflow-hidden rounded-2xl">
            <div className="panel-head flex items-center gap-2 px-4 py-2.5">
              <span className="flex gap-1" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 rounded-full bg-text-tertiary/35" />
                ))}
              </span>
              <span className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-bg-primary/60 px-2 py-1 text-[11px] text-text-tertiary">
                <Lock size={10} strokeWidth={2.25} aria-hidden />
                votresite.fr
              </span>
            </div>
            <div className="px-4 pb-4 pt-3.5">
              <p className="text-[15px] font-semibold text-text-primary">Votre site</p>
              <p className="mt-0.5 text-[13px] text-text-tertiary">Le même accueil pour tout le monde</p>
              <ul className="mt-3.5 space-y-2 border-t border-border-medium pt-3.5">
                {SITE_ROLE.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[13.5px] leading-snug text-text-secondary">
                    <span aria-hidden className="mt-[0.45rem] h-px w-3 shrink-0 bg-cyan" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 4 · le passage */}
          <div aria-hidden className="hidden justify-center text-accent-light lg:flex">
            <ArrowRight size={20} strokeWidth={1.75} />
          </div>
          <Down />

          {/* 5 · la demande exploitable : l'objet qui arrive chez vous, en papier */}
          <motion.div
            variants={v(rise)}
            className="overflow-hidden rounded-2xl bg-paper text-ink ring-1 ring-paper-line-strong shadow-[0_26px_50px_-30px_color-mix(in_oklab,var(--color-bg-primary)_95%,transparent)]"
          >
            <div className="flex items-center gap-2 border-b border-paper-line bg-cyan/14 px-4 py-2.5">
              <ClipboardCheck size={15} strokeWidth={1.9} className="text-accent-dark" aria-hidden />
              <p className="text-[14px] font-semibold">Une demande exploitable</p>
            </div>
            <dl className="divide-y divide-paper-line px-4 py-1.5">
              {USABLE_REQUEST.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-3 py-2">
                  <dt className="text-[12.5px] text-ink-2">{r.label}</dt>
                  <dd className="text-right text-[13.5px] font-semibold">{r.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>

        <p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-text-secondary sm:text-base">{SOURCES_CLOSING}</p>
      </div>
    </section>
  );
}

function FamilyCard({ family, v }: { family: SourceFamily; v: (variants: Variants) => Variants }) {
  return (
    <motion.li variants={v(rise)} className="panel-card flex flex-col justify-center rounded-2xl px-4 py-3.5 sm:px-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[16px] font-semibold tracking-tight text-text-primary">{family.title}</h3>
        <span aria-hidden className="h-[3px] w-8 shrink-0 rounded-full" style={{ backgroundColor: family.stroke }} />
      </div>
      <p className="mt-1 text-[13.5px] leading-snug text-text-tertiary">{family.moment}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {family.channels.map(({ label, icon: Icon }) => (
          <li key={label} className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary">
            <Icon size={14} strokeWidth={1.75} className="shrink-0 text-text-tertiary" aria-hidden />
            {label}
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

/** Liaison verticale, sous lg seulement. */
function Down() {
  return (
    <div aria-hidden className="flex justify-center text-accent-light lg:hidden">
      <ArrowDown size={18} strokeWidth={1.75} />
    </div>
  );
}
