"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { ID_CARD } from "./aproposPageData";

/**
 * Hero de /a-propos (refonte d'octobre 2026, « fiche + parcours »). À gauche la présentation
 * et UN CTA, peints en CSS pur (.hero-enter). À droite la fiche d'identité en verre : qui je
 * suis, ce que je construis, où, en combien de temps je réponds. Pas de photo : les faits
 * vérifiables tiennent lieu de portrait. La fiche flotte (y seulement), à l'arrêt en tier bas.
 */

export function AboutHeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="section-container-wide relative w-full pt-32 pb-16 lg:pt-36 lg:pb-24 xl:pt-[7.5rem] xl:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-14 xl:grid-cols-[minmax(0,32rem)_minmax(0,32rem)] xl:justify-between">
          <div className="max-w-2xl">
            <p className="hero-enter mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan xl:mb-6">Qui je suis</p>

            <h1
              className="hero-enter text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl xl:text-[3.6rem]"
              style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
            >
              Moi, c&apos;est <span className="text-gradient-strong">Iulian</span>.
            </h1>

            {/* Sous-titre : élément LCP, doit peindre sans attendre le JS */}
            <p
              className="hero-enter mt-6 max-w-xl text-base leading-[1.85] text-text-secondary text-pretty sm:text-lg lg:text-[1.15rem] xl:leading-[1.75]"
              style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
            >
              Je suis développeur indépendant. Je conçois et je code moi-même des sites web, des applications et des
              automatisations sur mesure. Mon but : remplacer ce qui vous prend du temps par un outil simple qui le
              fait à votre place.
            </p>

            <div className="hero-enter mt-9" style={{ "--enter-delay": "0.36s" } as React.CSSProperties}>
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="h-14 rounded-full px-9 text-[1.0625rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
              >
                Parler de mon besoin
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden />
              </Button>
              <p className="mt-3.5 pl-0.5 text-[0.8125rem] text-text-tertiary">Premier échange gratuit de 45 minutes, sans engagement</p>
              <Link
                href="/services"
                className="group mt-6 inline-flex items-center gap-1.5 rounded-sm pl-0.5 text-[0.9rem] font-medium text-text-tertiary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
              >
                Voir ce que je fais
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </div>

          <PauseOffscreen className="hero-enter-fade relative">
            <IdCard />
          </PauseOffscreen>
        </div>
      </div>
    </section>
  );
}

function IdCard() {
  const { disableContentMotion, tier } = usePerformanceMode();
  const offscreen = useInViewPause();
  const still = disableContentMotion || tier !== "full";

  return (
    <div className="relative mx-auto w-full max-w-[30rem]">
      {/* La lumière derrière le verre */}
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[6%] top-[8%] h-[70%] w-[70%] rounded-full bg-accent-primary/40 blur-[90px]" />
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute bottom-[6%] right-[4%] h-[45%] w-[50%] rounded-full bg-cyan/25 blur-[80px]" />

      <motion.div animate={still || offscreen ? undefined : { y: [0, -6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <GlassPanel className="rounded-[30px] p-6 sm:p-7">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-primary to-cyan text-paper ring-4 ring-paper/10"
            >
              <UserRound size={28} strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <p className="text-[1.3rem] font-semibold tracking-tight">{ID_CARD.name}</p>
              <p className="text-[14px] text-text-secondary">{ID_CARD.role}</p>
            </div>
          </div>

          <p className="mt-4 text-[13.5px] font-medium text-cyan">{ID_CARD.status}</p>

          <dl className="mt-5 divide-y divide-border-medium border-y border-border-medium">
            {ID_CARD.rows.map((r) => (
              <div key={r.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-2.5">
                <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">{r.label}</dt>
                <dd className="text-[14px] leading-snug text-text-primary">{r.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-[13.5px] leading-relaxed text-text-secondary">{ID_CARD.foot}</p>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
