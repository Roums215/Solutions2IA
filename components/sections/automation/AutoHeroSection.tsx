"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { AutoHeroSceneMobile } from "./AutoHeroSceneMobile";

// Film d'automatisation : chunk client seul, monté après l'hydratation et seulement dès md.
// Jamais dans le chemin du LCP ; jamais téléchargé sur téléphone.
const AutoHeroScene = dynamic(() => import("./AutoHeroScene").then((m) => m.AutoHeroScene), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero de /automatisation (V3, sombre) : la promesse, un seul CTA, et à droite un film de
 * quatre automatisations autour d'un même moteur de règles. Le titre et le sous-titre
 * peignent en CSS pur (.hero-enter) avant l'hydratation.
 */
export function AutoHeroSection() {
  const { mounted, isMobile } = usePerformanceMode();

  return (
    <section className="relative isolate overflow-hidden">
      <SectionFluidBackdrop variant="flowHero" />
      <div className="section-container-wide relative w-full pt-32 pb-16 lg:pt-36 lg:pb-24 xl:pt-[7.5rem] xl:pb-20">
        <div className="grid items-center gap-12 md:gap-14 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-12">
          <div className="max-w-2xl">
            <p className="hero-enter mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan xl:mb-6">Automatisation · sur mesure</p>

            <h1
              className="hero-enter text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl xl:text-[3.5rem]"
              style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
            >
              Ce qui se répète peut se faire <span className="text-gradient-strong">tout seul</span>.
            </h1>

            {/* Sous-titre : élément LCP, doit peindre sans attendre le JS */}
            <p
              className="hero-enter mt-6 max-w-xl text-base leading-[1.85] text-text-secondary text-pretty sm:text-lg lg:text-[1.15rem] xl:mt-5 xl:leading-[1.75]"
              style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
            >
              Ressaisies, relances, transferts d&apos;un outil à l&apos;autre : je relie vos logiciels pour que
              l&apos;information circule sans vous.
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
              <p className="mt-3.5 pl-0.5 text-[0.8125rem] text-text-tertiary">Premier échange gratuit, sans engagement</p>
              <Link
                href="#mon-flux"
                className="group mt-8 inline-flex items-center gap-1.5 rounded-sm pl-0.5 text-[0.9rem] font-medium text-text-tertiary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan xl:mt-7"
              >
                Voir un flux que j&apos;utilise moi-même
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="@container relative mx-auto aspect-[860/500] w-full max-w-[58rem]">{mounted && !isMobile && <AutoHeroScene />}</div>
          </div>

          <AutoHeroSceneMobile className="md:hidden" />
        </div>
      </div>
    </section>
  );
}
