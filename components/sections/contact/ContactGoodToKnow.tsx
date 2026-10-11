"use client";

import { useRef } from "react";
import { ArrowUp, CalendarClock, ShieldCheck, Tag, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { EmailLine } from "./contactParts";
import { GOOD_TO_KNOW } from "./contactPageData";
import { MobileRail } from "@/components/shared/MobileRail";

/**
 * /contact, « Bon à savoir » (claire, courte). Les trois raisons vraies d'écrire maintenant
 * (prix de démarrage, pilote sans risque, facture électronique), puis le retour au
 * formulaire et l'email direct. Le formulaire reste l'unique CTA : on y remonte.
 */

const ICONS: LucideIcon[] = [Tag, ShieldCheck, CalendarClock];

export function ContactGoodToKnow() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-good-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden rounded-[2rem] bg-paper-2 lg:rounded-[3.5rem]"
    >
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute right-[-6rem] top-[10%] h-[24rem] w-[32rem] rounded-full bg-accent-primary/20 blur-[110px]" />
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute bottom-[-6rem] left-[8%] h-[22rem] w-[30rem] rounded-full bg-cyan/25 blur-[110px]" />

      <div className="section-container relative">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="contact-good-heading"
          label="Bon à savoir"
          title={
            <>
              Trois raisons d&apos;écrire <span className="text-gradient-strong">maintenant</span>.
            </>
          }
        />

        <MobileRail label="Bon à savoir" className="gap-4 md:grid-cols-3">
          {GOOD_TO_KNOW.map((g, i) => {
            const Icon = ICONS[i];
            return (
              <li key={g.title}>
                <GlassPanel tone="light" className="h-full rounded-3xl p-5 sm:p-6">
                  <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-accent-primary/15 to-cyan/20 text-accent-dark ring-1 ring-ink/10">
                    <Icon size={18} strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{g.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-text-secondary">{g.text}</p>
                </GlassPanel>
              </li>
            );
          })}
        </MobileRail>

        <div className="mt-10 flex flex-col gap-6 border-t border-paper-line-strong pt-7 md:flex-row md:items-center md:justify-between">
          <a
            href="#formulaire"
            className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-semibold text-paper transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
          >
            <ArrowUp size={16} strokeWidth={2.2} aria-hidden />
            Écrire mon message
          </a>
          <div>
            <p className="text-[13.5px] text-text-tertiary">Ou directement par email :</p>
            <EmailLine />
          </div>
        </div>
      </div>
    </section>
  );
}
