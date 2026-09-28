"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { cn } from "@/lib/utils/cn";
import { SECTORS_APPS } from "./sectorsAppsData";
import { SECTOR_VERTICALS } from "./appSectorVerticals";
import { SECTOR_DASHBOARDS } from "./sectorDashboards";

/**
 * /applications, sections F et G réunies (claire) : votre métier, votre outil.
 *
 * Un métier choisi = sa fiche (le problème, l'outil, les modules clés, ce que l'outil
 * vise, le lien vers sa page) puis SON tableau de bord, un vrai écran produit sur
 * surface papier (sectorDashboards, données d'exemple). Le secteur s'incarne dans
 * l'interface au lieu d'être une carte de plus dans une grille.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AppsSectors() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();
  const [index, setIndex] = useState(0);

  const sector = SECTORS_APPS[index];
  const vertical = SECTOR_VERTICALS[sector.slug];
  const dashboard = SECTOR_DASHBOARDS.find((d) => d.slug === sector.slug) ?? SECTOR_DASHBOARDS[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="apps-sectors-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden rounded-[2rem] bg-paper lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="appsLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="apps-sectors-heading"
          label="Votre métier, votre outil"
          title={
            <>
              Chaque métier a ses contraintes.{" "}
              <span className="text-gradient-strong">L&apos;outil les connaît</span>.
            </>
          }
          description="Choisissez votre activité : vous verrez le problème qu'on règle, les modules qui comptent, et l'écran que vous auriez sous les yeux chaque matin."
        />

        {/* Les métiers : défilement horizontal sur téléphone, sans déborder de la page */}
        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Choisir un métier">
          <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
            {SECTORS_APPS.map((s, i) => {
              const on = i === index;
              return (
                <button
                  key={s.slug}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="apps-sector-panel"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[14px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
                    on
                      ? "border-ink bg-ink text-paper [&_svg]:text-cyan"
                      : "border-paper-line-strong bg-paper text-text-secondary hover:border-accent-primary/50 hover:text-text-primary",
                  )}
                >
                  <span className="grid h-5 w-5 place-items-center [&_svg]:h-[18px] [&_svg]:w-[18px]" aria-hidden>
                    {s.icon}
                  </span>
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={sector.slug}
            id="apps-sector-panel"
            role="tabpanel"
            aria-label={sector.name}
            initial={instant ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={instant ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: instant ? 0 : 0.35, ease: EASE }}
            className="mt-6"
          >
            {/* La fiche du métier */}
            <div className="paper-card grid gap-6 rounded-2xl p-5 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-8 lg:p-7">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">{sector.meta}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance">
                  {sector.name} : <span className="text-gradient-strong">{vertical.heroAccent}</span>
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                  <span className="font-semibold text-text-primary">Le problème : </span>
                  {sector.pain}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Les modules clés</p>
                <ul className="mt-3 space-y-2">
                  {sector.modules.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-[14.5px] leading-snug text-text-primary">
                      <Check size={15} strokeWidth={2.25} className="mt-0.5 shrink-0 text-accent-dark" aria-hidden />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Ce que l&apos;outil vise</p>
                <ul className="mt-3 space-y-2.5">
                  {vertical.kpis.map((k) => (
                    <li key={k.label}>
                      <span className="text-[17px] font-semibold tracking-tight text-text-primary">{k.value}</span>{" "}
                      <span className="text-[13.5px] text-text-secondary">{k.label}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/applications/${sector.slug}`}
                  className="group mt-5 inline-flex items-center gap-1.5 self-start rounded-sm text-[14.5px] font-semibold text-accent-dark transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary lg:mt-auto lg:pt-5"
                >
                  L&apos;application {sector.name.toLowerCase().split(" /")[0]} en détail
                  <ArrowRight size={15} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </div>

            {/* L'écran de ce métier */}
            <div className="mt-5">
              <p className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-[13px] text-text-tertiary">
                <span>
                  <span className="font-semibold text-text-primary">L&apos;écran du matin</span> · {dashboard.meta}
                </span>
                <span>Maquette : les chiffres sont des exemples, pas des résultats clients.</span>
              </p>
              <div className="rounded-[1.25rem] shadow-[0_40px_80px_-50px_color-mix(in_oklab,var(--color-ink)_70%,transparent)]">
                {dashboard.render(instant)}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
