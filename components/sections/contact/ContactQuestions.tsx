"use client";

import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FAQ } from "./contactPageData";

/**
 * /contact, « Les questions qu'on me pose souvent » (sombre). Les objections du moment de
 * cliquer : prix, délai, technique, sortie, après. Le titre à gauche, les réponses à droite
 * dans UN panneau de verre, en accordéons natifs (<details>) séparés par des filets.
 */

export function ContactQuestions() {
  return (
    <section aria-labelledby="contact-faq-heading" className="section-shell-tight relative isolate overflow-hidden">
      <div className="section-container relative grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="contact-faq-heading"
          label="Avant de m'écrire"
          title={
            <>
              Les questions <span className="text-gradient-strong">qu&apos;on me pose souvent</span>.
            </>
          }
          description="Le prix, le délai, le niveau technique, la sortie et l'après : des réponses courtes, sans détour."
        />

        <div className="relative lg:pt-2">
          <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[10%] top-[10%] h-[70%] w-[70%] rounded-full bg-accent-primary/25 blur-[110px]" />
          <GlassPanel sheen={false} className="rounded-[28px] px-5 py-2 sm:px-7">
            <ul className="divide-y divide-border-medium">
              {FAQ.map((item, i) => (
                <li key={item.q}>
                  <details className="group py-1">
                    <summary className="flex cursor-pointer list-none items-center gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan [&::-webkit-details-marker]:hidden">
                      <span className="font-mono text-[12px] font-semibold text-cyan">{String(i + 1).padStart(2, "0")}</span>
                      <span className="min-w-0 flex-1 text-[16px] font-semibold leading-snug text-text-primary">{item.q}</span>
                      <ChevronDown size={17} className="shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180" aria-hidden />
                    </summary>
                    <div className="space-y-3 pb-5 pl-9 text-[15px] leading-[1.75] text-text-secondary">
                      {item.a.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
