"use client";

import { Check, ChevronDown, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolBadge } from "@/components/ui/ToolBadge";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { RAG_GUARANTEES, RAG_TECH_STACK } from "./ragDataControlData";
import { StepStack } from "@/components/shared/StepStack";
import { HOW_LOOP, HOW_STACK, TECH_NOTE } from "./ragPageData";

/**
 * /rag, « Comment ça marche » (sombre, id="comment-ca-marche"). Refonte d'octobre 2026 :
 * UN schéma en quatre temps (documents → lecture avec vos droits → passages → réponse
 * citée), en plan coché et pile d'objets (StepStack, plus de frise à points) ; la mise à
 * jour devient la boucle du même schéma. Dessous, les six garanties sur vos données dans
 * un seul panneau, et le détail technique replié (lecture à deux niveaux).
 */

export function RagHowItWorks() {
  return (
    <section id="comment-ca-marche" aria-labelledby="rag-how-heading" className="section-shell-tight relative isolate scroll-mt-24 overflow-hidden">
      <SectionFluidBackdrop variant="ragDark" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="rag-how-heading"
          label="Comment ça marche"
          title={
            <>
              Elle cherche dans vos documents. <span className="text-gradient-strong">Elle ne les emporte pas.</span>
            </>
          }
          description="Rien à déplacer, rien à réécrire. Vos documents restent dans vos outils, vos droits d'accès s'appliquent, et chaque réponse renvoie à sa page."
        />

        {/* Le mécanisme : plan coché et pile d'objets (StepStack), puis la boucle de mise à jour */}
        <StepStack steps={HOW_STACK} heading="Une question, de bout en bout" icon={Search} tone="dark" />
        <p className="mt-6 flex items-start gap-2.5 text-[14.5px] leading-relaxed text-text-secondary">
          <RefreshCw size={16} strokeWidth={1.9} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
          {HOW_LOOP}
        </p>

        {/* Vos données : six règles dans un seul panneau, la technique repliée dessous */}
        <div id="vos-donnees" className="panel-card mt-14 scroll-mt-24 overflow-hidden rounded-2xl">
          <div className="p-5 sm:p-7">
            <h3 className="flex items-center gap-2.5 text-[1.35rem] font-semibold tracking-tight">
              <ShieldCheck size={20} strokeWidth={1.9} className="shrink-0 text-cyan" aria-hidden />
              Vos données restent sous contrôle.
            </h3>
            <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {RAG_GUARANTEES.map((g) => (
                <div key={g.title} className="flex items-start gap-2.5">
                  <Check size={15} strokeWidth={2.5} className="mt-1 shrink-0 text-cyan" aria-hidden />
                  <div>
                    <dt className="text-[15px] font-semibold">{g.title}</dt>
                    <dd className="mt-0.5 text-[13.5px] leading-relaxed text-text-secondary">{g.detail}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <details className="panel-foot group px-5 py-4 sm:px-7">
            <summary className="flex cursor-pointer list-none items-center gap-3 text-[14.5px] font-semibold text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan [&::-webkit-details-marker]:hidden">
              <span className="flex-1">Pour les techniques : ce qu&apos;il y a dessous</span>
              <ChevronDown size={16} className="shrink-0 text-text-tertiary transition-transform duration-300 group-open:rotate-180" aria-hidden />
            </summary>
            <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-text-secondary">{TECH_NOTE}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {RAG_TECH_STACK.map((t) => (
                <ToolBadge key={t} name={t} />
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
