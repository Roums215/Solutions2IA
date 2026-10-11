"use client";

import { Check } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { EmailLine } from "./contactParts";
import { REASSURANCE } from "./contactPageData";

/**
 * Hero de /contact (refonte d'octobre 2026, « formulaire en vitrine »). Sur cette page le
 * formulaire est le CTA : il est dans le hero, à droite, visible dès l'arrivée. À gauche la
 * promesse (peinte en CSS pur, .hero-enter), trois réassurances et l'email direct, avec un
 * bouton pour le copier, pour ceux qui n'aiment pas les formulaires.
 */

export function ContactHeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="section-container-wide relative w-full pt-32 pb-16 lg:pt-36 lg:pb-24 xl:pt-[7.5rem] xl:pb-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:gap-14 xl:grid-cols-[minmax(0,30rem)_minmax(0,38rem)] xl:justify-between">
          <div className="max-w-xl lg:pt-6">
            <p className="hero-enter mb-7 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan xl:mb-6">
              Disponible pour de nouveaux projets
            </p>

            <h1
              className="hero-enter text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.4rem]"
              style={{ "--enter-delay": "0.12s" } as React.CSSProperties}
            >
              Dites-moi ce qui vous <span className="text-gradient-strong">prend du temps</span>.
            </h1>

            {/* Sous-titre : élément LCP, doit peindre sans attendre le JS */}
            <p
              className="hero-enter mt-6 text-base leading-[1.85] text-text-secondary text-pretty sm:text-lg lg:text-[1.15rem] xl:leading-[1.75]"
              style={{ "--enter-delay": "0.24s" } as React.CSSProperties}
            >
              Pas besoin de savoir ce qu&apos;il vous faut. Décrivez votre situation avec vos mots : je reviens vers
              vous sous 24 h avec une première idée, gratuitement et sans engagement.
            </p>

            <ul className="hero-enter mt-8 space-y-2.5" style={{ "--enter-delay": "0.36s" } as React.CSSProperties}>
              {REASSURANCE.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[15px] text-text-secondary">
                  <Check size={16} strokeWidth={2.4} className="mt-[3px] shrink-0 text-cyan" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>

            {/* Ordinateur : l'email sous la promesse. Téléphone : sous le formulaire (voir plus bas). */}
            <div className="hero-enter mt-9 hidden border-t border-border-medium pt-6 lg:block" style={{ "--enter-delay": "0.44s" } as React.CSSProperties}>
              <p className="text-[13.5px] text-text-tertiary">Vous préférez écrire directement ?</p>
              <EmailLine />
            </div>
          </div>

          <ContactForm className="hero-enter-fade w-full" />

          <div className="border-t border-border-medium pt-6 lg:hidden">
            <p className="text-[13.5px] text-text-tertiary">Vous préférez écrire directement ?</p>
            <EmailLine />
          </div>
        </div>
      </div>
    </section>
  );
}
