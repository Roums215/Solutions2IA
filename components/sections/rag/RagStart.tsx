"use client";

import { Check, ClipboardCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { StepStack } from "@/components/shared/StepStack";
import { START_PRICE, START_STACK, START_TERMS } from "./ragPageData";

/**
 * /rag, « On démarre » (sombre, id="methode"). Les cinq temps en plan de projet coché et
 * en pile d'objets (StepStack, plus de frise à points), puis UN panneau qui porte les
 * engagements et le repère de prix. Remplace RagInstallSteps.
 */

export function RagStart() {
  return (
    <section id="methode" aria-labelledby="rag-start-heading" className="section-shell-tight relative isolate scroll-mt-24 overflow-hidden">
      <SectionFluidBackdrop variant="ragDark" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="rag-start-heading"
          label="On démarre"
          title={
            <>
              Un premier périmètre, <span className="text-gradient-strong">vérifié sur vos vraies questions</span>.
            </>
          }
          description="Pas de grand chantier : on part d'une équipe et de ses documents, et rien n'est mis en main avant d'avoir répondu juste. Comptez 4 à 6 semaines selon le périmètre."
        />

        {/* Le démarrage : plan de projet coché, et l'objet que produit chaque étape */}
        <StepStack steps={START_STACK} heading="Votre projet" icon={ClipboardCheck} tone="dark" />

        {/* Votre démarrage : un seul panneau, des engagements écrits */}
        <div className="panel-card mt-12 overflow-hidden rounded-2xl lg:grid lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="p-5 sm:p-7">
            <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
              <ClipboardCheck size={17} strokeWidth={1.9} className="text-cyan" aria-hidden />
              Votre démarrage
            </p>
            <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {START_TERMS.map((t) => (
                <div key={t.label} className="flex items-start gap-2.5">
                  <Check size={15} strokeWidth={2.5} className="mt-1 shrink-0 text-cyan" aria-hidden />
                  <div>
                    <dt className="text-[15px] font-semibold">{t.label}</dt>
                    <dd className="text-[13px] leading-snug text-text-secondary">{t.detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <div className="border-t border-border-medium bg-paper/[0.03] p-5 sm:p-7 lg:border-l lg:border-t-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Repère de prix</p>
            <p className="mt-1.5 text-[1.35rem] font-semibold">{START_PRICE.value}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">{START_PRICE.line}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
