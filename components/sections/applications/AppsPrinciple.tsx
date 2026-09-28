"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowDown, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { FLOW_DOES, FLOW_IN, FLOW_OUT, type FlowNode } from "./appsPageData";

/**
 * /applications, section C (sombre) : le principe, en un schéma.
 *
 * Trois colonnes lisibles sans légende : ce qui entre → ce que l'application fait →
 * ce qui en sort. Les liaisons se tracent une fois à l'entrée dans l'écran. Survoler ou
 * toucher une source ou une sortie allume son chemin et dit, en une phrase, ce que
 * l'outil en fait. Sous lg, la même chaîne se lit de haut en bas.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const list: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const INSTANT = { duration: 0 };
const RISE_STILL: Variants = { hidden: rise.hidden, visible: { opacity: 1, y: 0, transition: INSTANT } };

const GRID = "lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,19rem)_4.5rem_minmax(0,1fr)]";
const COL_LABEL = "text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-light";

// Colonnes de liaison (viewBox 0 0 100 500) : cinq lignes, centre à 250.
const rowY = (i: number) => 50 + i * 100;
const IN_CURVE = (i: number) => `M 0 ${rowY(i)} C 55 ${rowY(i)}, 45 250, 100 250`;
const OUT_CURVE = (i: number) => `M 0 250 C 55 250, 45 ${rowY(i)}, 100 ${rowY(i)}`;

export function AppsPrinciple() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const [active, setActive] = useState<FlowNode | null>(null);
  const R = instant ? RISE_STILL : rise;

  const node = (n: FlowNode, side: "in" | "out") => {
    const Icon = n.icon;
    const on = active?.id === n.id;
    return (
      <motion.li key={n.id} variants={R}>
        <button
          type="button"
          aria-pressed={on}
          onMouseEnter={() => setActive(n)}
          onFocus={() => setActive(n)}
          onClick={() => setActive(on ? null : n)}
          className={cn(
            "flex h-full w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-[box-shadow,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
            on ? "bg-paper text-ink shadow-[0_18px_40px_-24px_var(--color-cyan)]" : "panel-card",
          )}
        >
          <span
            className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors duration-300", on ? "bg-ink text-cyan" : "bg-accent-primary/15 text-accent-light")}
            aria-hidden
          >
            <Icon size={17} strokeWidth={1.8} />
          </span>
          <span className="min-w-0">
            <span className={cn("block text-[15px] font-semibold", on ? "text-ink" : "text-text-primary")}>{n.label}</span>
            <span className={cn("block text-[12.5px]", on ? "text-ink-2" : "text-text-tertiary")}>{n.line}</span>
          </span>
          <span className="sr-only">{side === "in" ? "Source : " : "Sortie : "}{n.how}</span>
        </button>
      </motion.li>
    );
  };

  const curves = (side: "in" | "out") => (
    <div aria-hidden className="relative hidden h-full self-stretch lg:block">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 500" preserveAspectRatio="none">
        {(side === "in" ? FLOW_IN : FLOW_OUT).map((n, i) => {
          const d = side === "in" ? IN_CURVE(i) : OUT_CURVE(i);
          const on = active?.id === n.id;
          return (
            <g key={n.id}>
              <motion.path
                d={d}
                fill="none"
                stroke={on ? "var(--color-cyan)" : "var(--color-accent-light)"}
                strokeOpacity={active && !on ? 0.2 : on ? 1 : 0.55}
                strokeWidth={on ? 2.25 : 1.4}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={instant ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.1 + (side === "out" ? 0.6 : 0) }}
                style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
              />
              {/* Chemin choisi : un segment le parcourt pour montrer le sens */}
              {on && !instant && (
                <motion.path
                  key={`flow-${n.id}`}
                  d={d}
                  fill="none"
                  stroke="var(--color-paper)"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0.14, pathOffset: 0, opacity: 0 }}
                  animate={{ pathOffset: 0.86, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );

  return (
    <section className="section-shell-tight relative isolate overflow-hidden" aria-labelledby="apps-principle-heading">
      <SectionFluidBackdrop variant="appsDark" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="apps-principle-heading"
          label="Le principe"
          title={
            <>
              Tout entre au même endroit,{" "}
              <span className="text-gradient-strong">tout en sort au bon moment</span>.
            </>
          }
          description="Vous gardez vos habitudes de terrain et les outils qui marchent. L'application fait le lien : elle récupère, range, vérifie, puis envoie chaque information là où elle sert."
        />

        {/* Intitulés des colonnes : sur leur propre ligne, pour que les courbes tombent juste */}
        <div aria-hidden className={cn(GRID, "mb-3 hidden lg:grid")}>
          <p className={COL_LABEL}>Ce qui entre</p>
          <span />
          <p className={cn(COL_LABEL, "text-center")}>Ce que fait l&apos;outil</p>
          <span />
          <p className={COL_LABEL}>Ce qui en sort</p>
        </div>

        <motion.div
          className={cn(GRID, "grid gap-4 lg:items-center lg:gap-0")}
          variants={instant ? { hidden: {}, visible: {} } : list}
          initial="hidden"
          onMouseLeave={() => setActive(null)}
          {...(instant ? { animate: "visible" as const } : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
        >
          {/* Ce qui entre */}
          <div>
            <p className={cn(COL_LABEL, "mb-3 lg:hidden")}>Ce qui entre</p>
            <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 lg:auto-rows-fr">{FLOW_IN.map((n) => node(n, "in"))}</ul>
          </div>

          {curves("in")}
          <Down />

          {/* Ce que l'application fait */}
          <motion.div variants={R}>
            <div className="overflow-hidden rounded-2xl bg-paper text-ink shadow-[0_34px_70px_-34px_color-mix(in_oklab,var(--color-bg-primary)_100%,transparent)] ring-1 ring-ink/10">
              <div className="bg-ink px-4 py-3 text-paper">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-paper/55">Votre application</p>
                <p className="text-[16px] font-semibold">Ce qu&apos;elle fait pour vous</p>
              </div>
              <ol className="divide-y divide-paper-line px-4 py-1">
                {FLOW_DOES.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <li key={d.label} className="flex items-center gap-3 py-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-primary/12 text-accent-dark" aria-hidden>
                        <Icon size={15} strokeWidth={1.9} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[14.5px] font-semibold">
                          <span className="mr-1.5 font-mono text-[11px] text-ink-3">0{i + 1}</span>
                          {d.label}
                        </span>
                        <span className="block text-[12.5px] leading-snug text-ink-2">{d.line}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </motion.div>

          {curves("out")}
          <Down />

          {/* Ce qui en sort */}
          <div>
            <p className={cn(COL_LABEL, "mb-3 lg:hidden")}>Ce qui en sort</p>
            <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 lg:auto-rows-fr">{FLOW_OUT.map((n) => node(n, "out"))}</ul>
          </div>
        </motion.div>

        {/* L'explication du chemin choisi */}
        <div className="panel-card mt-6 flex min-h-[4.5rem] items-center gap-3.5 rounded-2xl px-5 py-4 lg:mt-8" aria-live="polite">
          <MousePointerClick size={18} strokeWidth={1.75} className="shrink-0 text-cyan" aria-hidden />
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={active?.id ?? "none"}
              className="text-[15px] leading-relaxed text-text-secondary"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {active ? (
                <>
                  <span className="font-semibold text-text-primary">{active.label} : </span>
                  {active.how}
                </>
              ) : (
                "Survolez ou touchez une source ou une sortie : vous verrez ce que l'outil en fait."
              )}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="mt-6 text-[14px] text-text-tertiary">
          Besoin que certaines tâches se fassent toutes seules, même hors de l&apos;application ?{" "}
          <Link href="/automatisation" className="font-medium text-accent-light underline-offset-4 hover:underline">
            Voir l&apos;automatisation
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function Down() {
  return (
    <div aria-hidden className="flex justify-center text-accent-light lg:hidden">
      <ArrowDown size={18} strokeWidth={1.75} />
    </div>
  );
}

