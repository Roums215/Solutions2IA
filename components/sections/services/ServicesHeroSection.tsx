"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { ServicesDayPlan } from "./ServicesDayPlan";
import { SERVICES, serviceByKey, type ServiceKey } from "./servicesPageData";

/**
 * Hero de /services (refonte d'octobre 2026, passe UX). À gauche la promesse, peinte en
 * CSS pur (.hero-enter) avant l'hydratation, puis le CTA orienté : le visiteur dit ce qui
 * lui prend du temps, le bouton devient « Parler de mon site », « … de mes ressaisies », et
 * l'emmène sur /contact avec son besoin présélectionné (?besoin=…). À droite, la journée
 * type réagit au même choix : la tâche se raccourcit, le temps rendu s'affiche.
 * Sans choix, le bouton reste « Parler de mon besoin » : un seul CTA, qui se précise.
 */

export function ServicesHeroSection() {
  const [pick, setPick] = useState<ServiceKey | null>(null);
  const chosen = pick ? serviceByKey(pick) : null;

  return (
    <section className="relative isolate overflow-hidden">
      <div className="section-container-wide relative w-full pt-32 pb-16 lg:pt-36 lg:pb-24 xl:pt-[7.5rem] xl:pb-20">
        <div className="grid items-center gap-12 md:gap-14 xl:grid-cols-[minmax(0,31rem)_minmax(0,1fr)] xl:gap-16">
          <div className="max-w-2xl">
            <p className="hero-enter mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan xl:mb-6">Ce que je fais</p>

            <h1
              className="hero-enter text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl xl:text-[3.5rem]"
              style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
            >
              Cinq façons de vous faire <span className="text-gradient-strong">gagner du temps</span>.
            </h1>

            {/* Sous-titre : élément LCP, doit peindre sans attendre le JS */}
            <p
              className="hero-enter mt-6 max-w-xl text-base leading-[1.85] text-text-secondary text-pretty sm:text-lg lg:text-[1.15rem] xl:mt-5 xl:leading-[1.75]"
              style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
            >
              Je commence par ce qui vous coûte le plus de temps. Le reste s&apos;ajoute quand vous voulez,
              avec le même interlocuteur.
            </p>

            {/* Le CTA orienté */}
            <div className="hero-enter mt-8" style={{ "--enter-delay": "0.36s" } as React.CSSProperties}>
              <p id="svc-pain-label" className="text-[13.5px] font-semibold text-text-primary">
                Qu&apos;est-ce qui vous prend le plus de temps ?
              </p>
              <div role="group" aria-labelledby="svc-pain-label" className="mt-3 flex flex-wrap gap-2">
                {SERVICES.map((s) => {
                  const on = pick === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPick(on ? null : s.key)}
                      className={cn(
                        "min-h-11 rounded-full px-3.5 text-[13.5px] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                        on ? "bg-paper text-ink" : "bg-paper/[0.04] text-text-secondary ring-1 ring-border-medium hover:text-text-primary hover:ring-border-accent",
                      )}
                    >
                      {s.pain}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="primary"
                size="lg"
                href={chosen ? `/contact?besoin=${chosen.besoin}` : "/contact"}
                className="mt-7 h-14 rounded-full px-9 text-[1.0625rem] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
              >
                {chosen ? chosen.ctaLabel : "Parler de mon besoin"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5" aria-hidden />
              </Button>
              <p className="mt-3.5 pl-0.5 text-[0.8125rem] text-text-tertiary">Premier échange gratuit de 45 minutes, sans engagement</p>
              <Link
                href="#prix"
                className="group mt-6 inline-flex items-center gap-1.5 rounded-sm pl-0.5 text-[0.9rem] font-medium text-text-tertiary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
              >
                Voir les prix
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
          </div>

          <ServicesDayPlan pick={pick} className="hero-enter-fade mx-auto w-full max-w-[40rem]" />
        </div>
      </div>
    </section>
  );
}
