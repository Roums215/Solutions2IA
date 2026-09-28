"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { DAILY } from "./autoPageData";

/**
 * /automatisation, « Ce que ça change au quotidien » (claire froide). Quatre situations
 * en lignes éditoriales, pas six cartes : ce qui se passe aujourd'hui, puis ce que
 * l'automatisation change. Aucun gimmick, aucune phrase barrée.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AutoDaily() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();

  return (
    <section
      ref={sectionRef}
      aria-labelledby="auto-daily-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden rounded-[2rem] bg-paper-2 lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="flowLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="auto-daily-heading"
          label="Au quotidien"
          title={
            <>
              Moins de ressaisie. Moins d&apos;oublis. <span className="text-gradient-strong">Plus de temps utile.</span>
            </>
          }
          description="Quatre situations que je retrouve dans presque toutes les entreprises, et ce qu'une automatisation y change."
        />

        <div>
          <div className="hidden border-b border-paper-line-strong pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary md:grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
            <span>La situation</span>
            <span>Aujourd&apos;hui</span>
            <span className="text-accent-dark">Avec l&apos;automatisation</span>
          </div>
          <ol className="divide-y divide-paper-line">
            {DAILY.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.li
                  key={d.n}
                  className="grid gap-3 py-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-8"
                  initial={instant ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: instant ? 0 : 0.5, delay: instant ? 0 : i * 0.08, ease: EASE }}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-cyan" aria-hidden>
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="font-mono text-[12px] font-semibold text-accent-dark">{d.n}</p>
                      <h3 className="text-[18px] font-semibold leading-snug tracking-tight">{d.title}</h3>
                    </div>
                  </div>
                  <div className="text-[15px] leading-relaxed text-text-secondary md:pt-5">
                    <span className="mr-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-text-tertiary md:hidden">Aujourd&apos;hui :</span>
                    {d.today}
                    {d.todayFlow && (
                      <span className="mt-2 flex flex-wrap items-center gap-1.5 text-[13px] text-text-tertiary">
                        {d.todayFlow.map((t, j) => (
                          <span key={t} className="inline-flex items-center gap-1.5">
                            {j > 0 && <ArrowRight size={12} aria-hidden />}
                            <span className="rounded-md bg-paper px-2 py-0.5 ring-1 ring-paper-line">{t}</span>
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  <p className="border-l-2 border-cyan pl-3.5 text-[15.5px] font-medium leading-relaxed text-text-primary md:mt-5">
                    <span className="mb-0.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-accent-dark md:hidden">Avec l&apos;automatisation</span>
                    {d.with}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
