"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, FileText, Inbox, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { AiHeroSceneMobile } from "./AiHeroSceneMobile";

// Scène 2.5D : chunk client seul, monté après l'hydratation et seulement dès md.
// Jamais dans le chemin du LCP ; jamais téléchargé sur téléphone.
const AiHeroScene = dynamic(() => import("./AiHeroScene").then((m) => m.AiHeroScene), {
  ssr: false,
  loading: () => null,
});

const CHANNELS = [
  { icon: Phone, label: "Au téléphone" },
  { icon: MessageCircle, label: "Sur votre site" },
  { icon: Inbox, label: "Dans vos mails" },
  { icon: FileText, label: "Dans vos documents" },
];

/**
 * Hero de /agents-ia : surface papier claire comme l'accueil et /sites-web, avec la
 * touche violette de la page. Un seul CTA, la réassurance du pilote dessous, et un lien
 * discret vers le calculateur.
 */
export function AiHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { mounted, isMobile } = usePerformanceMode();

  return (
    <section ref={sectionRef} className="surface-light relative isolate overflow-hidden rounded-b-[2rem] bg-paper lg:rounded-b-[3.5rem]">
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-paper via-paper to-paper-2" />
      <div
        aria-hidden
        data-decor="grid"
        className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_56%_at_70%_48%,black,transparent)]"
      />
      <SectionFluidBackdrop variant="aiHero" />

      <div className="section-container-wide relative w-full pt-32 pb-16 lg:pt-36 lg:pb-24 xl:pt-[7.5rem] xl:pb-20">
        <div className="grid items-center gap-12 md:gap-14 xl:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] xl:gap-12">
          <div className="max-w-2xl">
            <p className="hero-enter mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-dark xl:mb-6">
              Assistants IA · sur mesure
            </p>

            <h1
              className="hero-enter text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl xl:text-[3.5rem]"
              style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
            >
              Un collègue numérique qui répond, trie et prépare.{" "}
              <span className="text-gradient-fluid">Vous décidez.</span>
            </h1>

            {/* Sous-titre : élément LCP, doit peindre sans attendre le JS */}
            <p
              className="hero-enter mt-6 max-w-2xl text-base leading-[1.85] text-text-secondary text-pretty sm:text-lg lg:text-[1.15rem] xl:mt-5 xl:leading-[1.75]"
              style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
            >
              Il prend en charge le répétitif, sur vos règles et avec vos documents.
              Tout ce qui engage l&apos;entreprise vous est soumis avant de partir.
            </p>

            <ul className="hero-enter mt-5 flex flex-wrap gap-2" style={{ "--enter-delay": "0.3s" } as React.CSSProperties}>
              {CHANNELS.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-1.5 rounded-lg border border-paper-line-strong bg-paper px-2.5 py-1.5 text-[0.875rem] text-text-primary">
                  <Icon size={14} strokeWidth={1.9} className="text-accent-dark" aria-hidden />
                  {label}
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
                Parler de mon besoin
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden />
              </Button>

              <p className="mt-3.5 pl-0.5 text-[0.8125rem] text-text-tertiary">
                Pilote de 30 jours, satisfait ou remboursé
              </p>

              <Link
                href="#calcul"
                className="group mt-8 inline-flex items-center gap-1.5 rounded-sm pl-0.5 text-[0.9rem] font-medium text-text-tertiary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary xl:mt-7"
              >
                Calculer le temps que vous récupérez
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="@container relative mx-auto aspect-[860/560] w-full max-w-[58rem]">
              {mounted && !isMobile && <AiHeroScene />}
            </div>
          </div>

          <AiHeroSceneMobile className="md:hidden" />
        </div>
      </div>
    </section>
  );
}
