"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TermeExplique } from "@/components/ui/TermeExplique";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { BRAND_LOGOS } from "./brandLogos";
import { DESTINATIONS, EVENTS, INTEGRATIONS, WORKFLOW_STAGES } from "./autoPageData";

/**
 * /automatisation, « Vos logiciels arrêtent de travailler chacun dans son coin » (claire).
 * Une vraie carte de workflow : à gauche les événements, au centre les quatre étages du
 * workflow, à droite les destinations. On choisit un événement (survol ou clic) : seules
 * les branches utiles s'allument. Rien ne tourne en boucle.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AutoConnect() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();
  const [index, setIndex] = useState(0);
  const ev = EVENTS[index];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="auto-connect-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden rounded-[2rem] bg-paper lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="flowLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="auto-connect-heading"
          label="Vos outils, reliés"
          title={
            <>
              Vos logiciels arrêtent de travailler <span className="text-gradient-strong">chacun dans son coin</span>.
            </>
          }
          description="Choisissez ce qui arrive chez vous : le workflow montre ce qu'il en fait, et où l'information repart."
        />

        <div>
          <div className="paper-card overflow-hidden rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,14rem)]">
              {/* Ce qui arrive */}
              <div className="border-b border-paper-line p-4 lg:border-b-0 lg:border-r lg:p-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Ce qui arrive</p>
                <div className="-mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0" role="radiogroup" aria-label="Choisir un événement">
                  <div className="flex min-w-max gap-1.5 lg:min-w-0 lg:flex-col">
                    {EVENTS.map((e, i) => {
                      const on = i === index;
                      const Icon = e.icon;
                      return (
                        <button
                          key={e.id}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => setIndex(i)}
                          onMouseEnter={() => setIndex(i)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[14.5px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
                            on ? "bg-ink text-paper" : "text-text-secondary ring-1 ring-paper-line hover:text-text-primary lg:ring-0 lg:hover:bg-paper-2",
                          )}
                        >
                          <Icon size={16} strokeWidth={1.9} className={on ? "text-cyan" : "text-accent-dark"} aria-hidden />
                          {e.label}
                          {on && <ArrowRight size={14} className="ml-auto hidden text-cyan lg:block" aria-hidden />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Le workflow */}
              <div className="bg-paper-2/60 p-4 lg:p-6">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Le workflow</p>
                <ol className="relative space-y-2">
                  <span aria-hidden className="absolute bottom-5 left-[1.47rem] top-5 w-px bg-cyan/50" />
                  {WORKFLOW_STAGES.map((st, i) => {
                    const Icon = st.icon;
                    return (
                      <li key={st.key} className="relative flex items-start gap-3.5 rounded-xl bg-paper px-3 py-3 ring-1 ring-paper-line sm:items-center">
                        <span className="relative mt-0.5 grid h-[1.45rem] w-[1.45rem] shrink-0 place-items-center rounded-full bg-ink text-cyan sm:mt-0" aria-hidden>
                          <Icon size={12} strokeWidth={2.2} />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
                          <span className="shrink-0 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-text-tertiary sm:w-36">{st.label}</span>
                          <AnimatePresence initial={false} mode="wait">
                            <motion.span
                              key={`${ev.id}-${st.key}`}
                              className="block min-w-0 text-[15px] font-medium text-text-primary"
                              initial={instant ? false : { opacity: 0, x: 6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={instant ? undefined : { opacity: 0, x: -4 }}
                              transition={{ duration: instant ? 0 : 0.22, delay: instant ? 0 : i * 0.06, ease: EASE }}
                            >
                              {ev.stages[st.key]}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Où l'information repart : seules les branches utiles s'allument */}
              <div className="border-t border-paper-line p-4 lg:border-l lg:border-t-0 lg:p-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Où ça repart</p>
                <ul className="flex flex-wrap gap-1.5 lg:flex-col" aria-live="polite">
                  {DESTINATIONS.map((d) => {
                    const lit = ev.to.includes(d.id);
                    const Icon = d.icon;
                    return (
                      <li
                        key={d.id}
                        className={cn(
                          "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[14.5px] transition-all duration-300",
                          lit ? "bg-cyan/12 font-semibold text-text-primary ring-1 ring-cyan/50" : "text-text-tertiary opacity-55 ring-1 ring-paper-line",
                        )}
                      >
                        <Icon size={16} strokeWidth={1.9} className={lit ? "text-accent-dark" : ""} aria-hidden />
                        {d.label}
                        {lit && <Check size={14} strokeWidth={2.6} className="ml-auto text-accent-dark" aria-label="mis à jour" />}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* La chaîne, en une ligne */}
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={ev.id}
                className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-paper-line bg-paper px-5 py-3.5 text-[14px] text-text-secondary"
                initial={instant ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={instant ? undefined : { opacity: 0 }}
                transition={{ duration: instant ? 0 : 0.2 }}
              >
                {ev.chain.map((c, i) => (
                  <span key={c} className="inline-flex items-center gap-2">
                    {i > 0 && <ArrowRight size={13} className="text-cyan" aria-hidden />}
                    <span className={i === 0 ? "font-semibold text-text-primary" : undefined}>{c}</span>
                  </span>
                ))}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Les outils : quelques exemples, pas un mur de logos */}
          <div className="mt-10">
            <ul className="flex flex-wrap items-center gap-2">
              {INTEGRATIONS.map((t) => (
                <li key={t.label} className="flex items-center gap-2 rounded-lg bg-paper px-3 py-1.5 text-[13.5px] text-text-primary ring-1 ring-paper-line">
                  <span className="h-4 w-4 shrink-0" aria-hidden>
                    {BRAND_LOGOS[t.logo].svg}
                  </span>
                  {t.label}
                </li>
              ))}
              <li className="px-2 text-[13.5px] text-text-tertiary">et vos outils métier</li>
            </ul>
            <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-text-secondary">
              Je vérifie d&apos;abord ce que vos outils permettent de connecter : une <TermeExplique k="api">API</TermeExplique>, un{" "}
              <TermeExplique k="webhook">webhook</TermeExplique>, un export, un e-mail ou un connecteur existant. Aucune liaison n&apos;est promise avant ce
              contrôle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
