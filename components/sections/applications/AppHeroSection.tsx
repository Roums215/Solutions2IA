"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { AppHeroSceneMobile } from "./AppHeroSceneMobile";

// Scène 2.5D : chunk client seul, monté après l'hydratation et seulement dès md.
// Jamais dans le chemin du LCP (h1 et sous-titre peints en CSS avant le JS), jamais
// téléchargé sur téléphone, où AppHeroSceneMobile raconte la même histoire.
const AppHeroScene = dynamic(() => import("./AppHeroScene").then((m) => m.AppHeroScene), {
  ssr: false,
  loading: () => null,
});

const PROMISES = ["Une seule saisie", "Le suivi en direct", "Relié à vos outils"];

/**
 * Hero de /applications. Touche propre à la page : il reste sombre (la nuit du site),
 * et la démonstration pose des écrans papier dessus, comme de vrais outils sur un
 * bureau. Un seul CTA, sa réassurance dessous, puis un lien discret vers la méthode.
 */
export function AppHeroSection() {
  const { mounted, isMobile } = usePerformanceMode();

  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        data-decor="grid"
        className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_62%_58%_at_70%_46%,black,transparent)]"
      />
      <SectionFluidBackdrop variant="appsHero" />

      <div className="section-container-wide relative w-full pt-32 pb-16 lg:pt-36 lg:pb-24 xl:pt-[7.5rem] xl:pb-20">
        <div className="grid items-center gap-12 md:gap-14 xl:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] xl:gap-12">
          <div className="max-w-2xl">
            <p className="hero-enter mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-light xl:mb-6">
              Applications sur mesure
            </p>

            <h1
              className="hero-enter text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl xl:text-[3.5rem]"
              style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
            >
              Un outil fait pour <span className="text-gradient-strong">votre métier</span>, pas un logiciel de plus à subir.
            </h1>

            {/* Sous-titre : élément LCP, doit peindre sans attendre le JS */}
            <p
              className="hero-enter mt-6 max-w-2xl text-base leading-[1.85] text-text-secondary text-pretty sm:text-lg lg:text-[1.15rem] xl:mt-5 xl:leading-[1.75]"
              style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
            >
              Excel, papier, mails, logiciels qui ne se parlent pas : je remplace ce bazar
              par une seule application, pensée pour votre façon de travailler.
            </p>

            <ul
              className="hero-enter mt-5 flex flex-wrap gap-x-5 gap-y-2"
              style={{ "--enter-delay": "0.3s" } as React.CSSProperties}
            >
              {PROMISES.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-[0.9375rem] text-text-primary">
                  <Check size={15} strokeWidth={2.25} className="shrink-0 text-cyan" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>

            <div className="hero-enter mt-9" style={{ "--enter-delay": "0.36s" } as React.CSSProperties}>
              <Button
                variant="primary"
                size="lg"
                href="/contact"
                className="h-14 rounded-full px-9 text-[1.0625rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
              >
                Parler de mon projet
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden />
              </Button>

              <p className="mt-3.5 pl-0.5 text-[0.8125rem] text-text-tertiary">
                Premier échange gratuit · réponse sous 24 h
              </p>

              {/* Lien de parcours discret : un seul CTA visuel par page */}
              <Link
                href="#methode"
                className="group mt-8 inline-flex items-center gap-1.5 rounded-sm pl-0.5 text-[0.9rem] font-medium text-text-tertiary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary xl:mt-7"
              >
                Voir comment je travaille
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Scène 2.5D (≥ md). La boîte garde sa taille dès le SSR : aucun décalage au montage. */}
          <div className="relative hidden md:block">
            <div className="@container relative mx-auto aspect-[820/628] w-full max-w-[56rem]">
              {mounted && !isMobile && <AppHeroScene />}
            </div>
          </div>

          <AppHeroSceneMobile className="md:hidden" />
        </div>
      </div>
    </section>
  );
}
