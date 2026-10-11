"use client";

import { useRef } from "react";
import { Check, ClipboardCheck, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { StepStack } from "@/components/shared/StepStack";
import { DELIVERABLES, METHOD_STACK } from "./autoPageData";

/**
 * /automatisation, comment on démarre (claire, ancre #methode). Les quatre temps en plan de
 * projet coché et en pile d'objets (StepStack, octobre 2026 : plus de frise à points), puis
 * UNE carte « Votre automatisation » : ce qui est livré avec chaque flux.
 */

export function AutoMethod() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="methode"
      aria-labelledby="auto-method-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="flowLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="auto-method-heading"
          label="Comment on démarre"
          title={
            <>
              On commence par <span className="text-gradient-strong">une seule tâche</span>.
            </>
          }
          description="Pas de grand chantier : une tâche qui vous coûte du temps, un flux écrit avec vous, testé sur de vrais cas."
        />

        <div>
          {/* La méthode : plan de projet coché, et l'objet que produit chaque étape */}
          <StepStack steps={METHOD_STACK} heading="Le déroulé" icon={ClipboardCheck} tone="light" />

          <div className="mt-12 overflow-hidden rounded-2xl bg-ink p-5 text-paper sm:p-7">
            <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-paper/80">
              <Workflow size={17} strokeWidth={1.9} className="text-cyan" aria-hidden />
              Votre automatisation
            </p>
            <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-5">
              {DELIVERABLES.map((d) => (
                <div key={d.label} className="flex items-start gap-2.5">
                  <Check size={15} strokeWidth={2.5} className="mt-1 shrink-0 text-cyan" aria-hidden />
                  <div>
                    <dt className="text-[15px] font-semibold">{d.label}</dt>
                    <dd className="text-[13px] leading-snug text-paper/70">{d.detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
