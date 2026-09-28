"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { HeroSceneMobile } from "./HeroSceneMobile";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";

// Scène 2.5D : chunk client seul, monté après l'hydratation et seulement dès md.
// Jamais dans le chemin du LCP (le h1 et le sous-titre sont peints en CSS avant le JS),
// jamais téléchargé sur téléphone, où HeroSceneMobile raconte la même histoire.
const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
});

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Hero clair sur un site sombre : le menu passe à l'encre tant qu'il est au-dessus.
  useLightHeaderZone(sectionRef);
  const { mounted, isMobile } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      className="surface-light relative isolate overflow-hidden rounded-b-[2rem] bg-paper lg:rounded-b-[3.5rem]"
    >
      {/* Décor statique : papier, grille très fine autour de la scène, deux halos */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-paper via-paper to-paper-2" />
      <div
        aria-hidden
        data-decor="grid"
        className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_62%_58%_at_72%_46%,black,transparent)]"
      />
      {/* Nappe fluide : elle relie le téléphone à l'application (LOT 4D). */}
      <SectionFluidBackdrop variant="hero" />

      {/* Dès xl, espacements resserrés : à 1280 × 800 les trois repères tiennent au-dessus de la ligne de flottaison. */}
      <div className="section-container-wide relative w-full pt-32 pb-16 lg:pt-36 lg:pb-24 xl:pt-[7.5rem] xl:pb-20">
        <div className="grid items-center gap-12 md:gap-14 xl:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] xl:gap-12">
          <div className="max-w-2xl">
            {/* Intitulé éditorial : petites capitales espacées, aucune capsule, aucun
                filet, aucun point (LOT 4G). Le texte tient tout seul. */}
            <p className="hero-enter mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-dark xl:mb-6">
              Solutions 2IA · conception sur mesure
            </p>

            <h1
              className="hero-enter text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl xl:text-[4rem]"
              style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
            >
              Des outils qui travaillent{" "}
              <br />
              <span className="text-gradient-fluid">pour vous</span>
            </h1>

            {/* Sous-titre : élément LCP, doit peindre sans attendre le JS */}
            <p
              className="hero-enter mt-6 max-w-2xl text-base leading-[1.85] text-text-secondary text-pretty sm:text-lg lg:text-[1.15rem] xl:mt-5 xl:leading-[1.75]"
              style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
            >
              Je conçois des sites web, des applications et des automatisations
              sur mesure. Vous m&apos;expliquez ce qui vous prend du temps,
              je construis l&apos;outil qui s&apos;en charge.
            </p>

            {/* Zone d'action : le bouton, sa réassurance collée dessous, puis le lien
                de parcours nettement plus bas et plus discret. Aucune métrique, aucun
                prix : le hero promet, il ne tarife pas (LOT 4G). */}
            <div className="hero-enter mt-10 xl:mt-9" style={{ "--enter-delay": "0.36s" } as React.CSSProperties}>
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="h-14 rounded-full px-9 text-[1.0625rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                Parler de mon besoin
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden />
              </Button>

              {/* La réassurance fait partie du bouton : jamais séparée de lui. */}
              <p className="mt-3.5 pl-0.5 text-[0.8125rem] text-text-tertiary">
                Premier échange gratuit · sans engagement
              </p>

              {/* Lien secondaire volontairement discret : un seul CTA visuel par page */}
              <Link
                href="/services"
                className="group mt-8 inline-flex items-center gap-1.5 rounded-sm pl-0.5 text-[0.9rem] font-medium text-text-tertiary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary xl:mt-7"
              >
                Voir les cinq services
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          {/* Scène 2.5D (≥ md). La boîte garde sa taille dès le SSR : aucun décalage au montage. */}
          <div className="relative hidden md:block">
            <div className="@container relative mx-auto aspect-[820/620] w-full max-w-[56rem]">
              {mounted && !isMobile && <HeroScene />}
            </div>
          </div>

          {/* Téléphone : la même histoire en quatre temps, lue de haut en bas */}
          <HeroSceneMobile className="md:hidden" />
        </div>
      </div>
    </section>
  );
}
