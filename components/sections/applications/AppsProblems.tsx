"use client";

import { useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { cn } from "@/lib/utils/cn";
import { PROBLEM_CALC, PROBLEMS } from "./appsPageData";

/**
 * /applications, section B (claire) : les problèmes concrets.
 *
 * Huit frictions du quotidien, chacune avec ce qu'elle coûte. Touche propre à la page :
 * le visiteur coche celles qu'il reconnaît, et la section lui répond. Puis un calcul
 * qu'il refait avec ses chiffres (aucune donnée client). Tier minimal : rendu direct.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const list: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const row: Variants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };
const INSTANT = { duration: 0 };
const ROW_STILL: Variants = { hidden: row.hidden, visible: { opacity: 1, y: 0, transition: INSTANT } };

export function AppsProblems() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const { disableContentMotion: instant } = usePerformanceMode();
  const [picked, setPicked] = useState<number[]>([]);
  const toggle = (i: number) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  const n = picked.length;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="apps-problems-heading"
      className="surface-light section-shell-tight relative isolate overflow-hidden rounded-[2rem] bg-paper lg:rounded-[3.5rem]"
    >
      <SectionFluidBackdrop variant="appsLight" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="apps-problems-heading"
          label="Votre quotidien"
          title={
            <>
              Ce bazar vous coûte plus cher{" "}
              <span className="text-gradient-strong">qu&apos;un outil fait pour vous</span>.
            </>
          }
          description="Cochez ce que vous reconnaissez. Chaque friction semble petite. Mises bout à bout, elles prennent des heures, et parfois des clients."
        />

        <motion.ul
          className="grid gap-3 md:grid-cols-2 md:gap-x-5"
          variants={instant ? { hidden: {}, visible: {} } : list}
          initial="hidden"
          {...(instant ? { animate: "visible" as const } : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
        >
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            const on = picked.includes(i);
            return (
              <motion.li key={p.title} variants={instant ? ROW_STILL : row}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(i)}
                  className={cn(
                    "group flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary sm:p-5",
                    on
                      ? "border-accent-primary/45 bg-accent-primary/[0.06] shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_18%,transparent)]"
                      : "paper-card border-transparent hover:border-paper-line-strong",
                  )}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-cyan" aria-hidden>
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-semibold leading-snug tracking-tight text-text-primary">{p.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-text-secondary">{p.cost}</span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors duration-300",
                      on ? "border-accent-primary bg-accent-primary text-paper" : "border-paper-line-strong text-transparent group-hover:border-accent-primary/50",
                    )}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* La réponse de la section à ce que le visiteur a coché */}
        <p aria-live="polite" className="mt-5 min-h-[1.5rem] text-[15px] font-medium text-text-primary">
          {n === 0
            ? ""
            : n === 1
              ? "Une friction cochée : c'est souvent là qu'un premier outil simple fait gagner le plus."
              : `${n} frictions cochées : c'est exactement ce qu'un outil sur mesure règle, en une fois.`}
        </p>

        {/* Le calcul que le visiteur refait avec ses chiffres */}
        <div className="mt-6 overflow-hidden rounded-2xl bg-ink text-paper lg:mt-8">
          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,15rem)_1fr] lg:items-center lg:gap-10 lg:p-7">
            <p className="text-[14px] leading-relaxed text-paper/70">{PROBLEM_CALC.intro}</p>
            <div>
              <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
                {PROBLEM_CALC.parts.map((part, i) => (
                  <div key={part.label}>
                    <p className={cn("text-[1.75rem] font-semibold leading-none tracking-tight sm:text-[2rem]", i === PROBLEM_CALC.parts.length - 1 ? "text-cyan" : "text-paper")}>
                      {part.value}
                    </p>
                    <p className="mt-1.5 text-[13px] text-paper/65">{part.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-paper/15 pt-4 text-[14.5px] leading-relaxed text-paper/85">{PROBLEM_CALC.outro}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
