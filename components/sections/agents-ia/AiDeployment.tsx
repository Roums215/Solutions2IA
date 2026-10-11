"use client";

import { useRef } from "react";
import { Check, ClipboardCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { StepStack } from "@/components/shared/StepStack";
import { PILOT_PRICE, PILOT_STACK, PILOT_TERMS } from "./aiPageData";

/**
 * /agents-ia, « On commence petit » (claire). Le pilote en plan de projet coché et en pile
 * d'objets (StepStack, octobre 2026 : plus de frise à points), puis UNE carte « Votre
 * pilote » qui porte les engagements et le repère de prix. Cible du lien « Comment je
 * travaille » (id="methode").
 */

export function AiDeployment() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="methode"
      aria-labelledby="ai-deploy-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="aiLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="ai-deploy-heading"
          label="On commence petit"
          title={
            <>
              Une tâche, un pilote, <span className="text-gradient-strong">puis vous décidez</span>.
            </>
          }
          description="Je ne vous impose pas une plateforme énorme. Je commence par une tâche qui vous coûte du temps, on la mesure sur vos vrais cas, et vous décidez de la suite."
        />

        {/* Le pilote : plan de projet coché, et l'objet que produit chaque étape */}
        <StepStack steps={PILOT_STACK} heading="Le déroulé du pilote" icon={ClipboardCheck} tone="light" />

        {/* Votre pilote : une seule carte, des conditions écrites */}
        <div className="mt-12 overflow-hidden rounded-2xl bg-ink text-paper lg:grid lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="p-5 sm:p-7">
            <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-paper/80">
              <ClipboardCheck size={17} strokeWidth={1.9} className="text-cyan" aria-hidden />
              Votre pilote
            </p>
            <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
              {PILOT_TERMS.map((t) => (
                <div key={t.label} className="flex items-start gap-2.5">
                  <Check size={15} strokeWidth={2.5} className="mt-1 shrink-0 text-cyan" aria-hidden />
                  <div>
                    <dt className="text-[15px] font-semibold">{t.label}</dt>
                    <dd className="text-[13px] leading-snug text-paper/70">{t.detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <div className="border-t border-paper/10 bg-paper/[0.04] p-5 sm:p-7 lg:border-l lg:border-t-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/55">Repère de prix</p>
            <p className="mt-1.5 text-[1.35rem] font-semibold">{PILOT_PRICE.value}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-paper/70">{PILOT_PRICE.line}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
