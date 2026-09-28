"use client";

import { motion, type Variants } from "motion/react";
import { Check, CornerDownRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { METHOD_PRICE, METHOD_STARTS, METHOD_STEPS, METHOD_TRUST } from "./appsPageData";

/**
 * /applications, section E (sombre) : comment je travaille. Cible du lien du hero.
 * Six étapes, chacune avec ce que le client a en main à la fin ; à côté, les deux
 * points de départ possibles, les engagements et le prix, cadré avant de commencer.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const list: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const INSTANT = { duration: 0 };
const RISE_STILL: Variants = { hidden: rise.hidden, visible: { opacity: 1, y: 0, transition: INSTANT } };

export function AppsMethod() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const R = instant ? RISE_STILL : rise;

  return (
    <section id="methode" className="section-shell-tight relative isolate scroll-mt-24 overflow-hidden" aria-labelledby="apps-method-heading">
      <SectionFluidBackdrop variant="method" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="apps-method-heading"
          label="Comment je travaille"
          title={
            <>
              Du terrain à l&apos;outil qui tourne,{" "}
              <span className="text-gradient-strong">sans zone floue</span>.
            </>
          }
          description="Six étapes, toujours les mêmes. À chaque étape, vous savez ce que vous aurez en main, et vous parlez à la même personne."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-10">
          <motion.ol
            className="grid gap-4 sm:grid-cols-2"
            variants={instant ? { hidden: {}, visible: {} } : list}
            initial="hidden"
            {...(instant ? { animate: "visible" as const } : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
          >
            {METHOD_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li key={s.title} variants={R} className="panel-card flex flex-col rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="font-mono text-[20px] font-semibold leading-none tracking-[0.06em] text-text-tertiary/70">
                      0{i + 1}
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-primary/15 text-accent-light" aria-hidden>
                      <Icon size={15} strokeWidth={1.8} />
                    </span>
                  </div>
                  <h3 className="mt-3.5 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1.5 flex-1 text-[14.5px] leading-relaxed text-text-secondary">{s.text}</p>
                  <p className="mt-4 flex items-start gap-2 rounded-xl border border-border-medium border-l-[3px] border-l-cyan bg-accent-primary/10 px-3 py-2.5 text-[13px] leading-snug text-text-primary">
                    <CornerDownRight size={13} strokeWidth={2} className="mt-0.5 shrink-0 text-cyan" aria-hidden />
                    <span>
                      <span className="text-text-tertiary">À la fin : </span>
                      {s.gives}
                    </span>
                  </p>
                </motion.li>
              );
            })}
          </motion.ol>

          <aside className="space-y-4 lg:self-start">
            <div className="panel-card rounded-2xl p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">Deux points de départ</p>
              <ul className="mt-3 space-y-3">
                {METHOD_STARTS.map((st) => (
                  <li key={st.title}>
                    <p className="text-[15px] font-semibold text-text-primary">{st.title}</p>
                    <p className="mt-0.5 text-[13.5px] leading-relaxed text-text-secondary">{st.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel-card rounded-2xl p-5">
              <ul className="space-y-2.5">
                {METHOD_TRUST.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check size={15} strokeWidth={2.25} className="mt-1 shrink-0 text-cyan" aria-hidden />
                    <span className="text-[14px] leading-relaxed text-text-secondary">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-border-medium pt-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">Repère de prix</p>
                <p className="mt-1.5 text-[1.35rem] font-semibold tracking-tight text-text-primary">{METHOD_PRICE.value}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-tertiary">{METHOD_PRICE.line}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
