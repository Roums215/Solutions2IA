"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Check, ClipboardCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { cn } from "@/lib/utils/cn";
import { PILOT_PATH, PILOT_PRICE, PILOT_TERMS } from "./aiPageData";

/**
 * /agents-ia, « On commence petit » (claire). V3 : une trajectoire en cinq temps (pas cinq
 * cartes), puis UNE carte « Votre pilote » qui porte les engagements et le repère de prix.
 * La ligne se trace une fois à l'entrée dans l'écran, rien de plus. Cible du lien
 * « Comment je travaille » (id="methode").
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AiDeployment() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

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

        {/* La trajectoire */}
        <div className="relative">
          <motion.span
            aria-hidden
            className="absolute left-[0.6875rem] top-3 bottom-3 w-px origin-top bg-accent-primary/40 md:bottom-auto md:left-3 md:right-3 md:top-[0.6875rem] md:h-px md:w-auto md:origin-left"
            initial={instant ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <ol className="relative grid gap-6 md:grid-cols-5 md:gap-6">
            {PILOT_PATH.map((p, i) => {
              const last = i === PILOT_PATH.length - 1;
              return (
                <li key={p.n} className="relative pl-10 md:pl-0 md:pt-10">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 grid h-[1.375rem] w-[1.375rem] place-items-center rounded-full ring-4 ring-paper",
                      last ? "border border-dashed border-accent-primary bg-paper" : "bg-accent-primary",
                    )}
                  >
                    {!last && <span className="h-1.5 w-1.5 rounded-full bg-paper" />}
                  </span>
                  <p className="font-mono text-[12px] font-semibold text-accent-dark">{p.n}</p>
                  <h3 className="mt-1 text-[17px] font-semibold leading-snug tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-text-secondary">{p.text}</p>
                </li>
              );
            })}
          </ol>
        </div>

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
