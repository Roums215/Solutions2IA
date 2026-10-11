"use client";

import { AnimatePresence, motion } from "motion/react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { DAY, DAY_END, DAY_NOTE, DAY_START, serviceByKey, type ServiceKey } from "./servicesPageData";

/**
 * La journée type (hero de /services) : cinq tâches qui reviennent, posées sur l'axe 8 h à
 * 18 h comme dans un agenda. Quand le visiteur choisit ce qui lui prend du temps, la barre
 * de cette tâche se raccourcit (scaleX seulement), son contour reste en pointillés : on voit
 * le temps rendu. Durées d'exemple, dites comme telles ; l'après est dit en mots.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SPAN_MIN = (DAY_END - DAY_START) * 60;
const TOTAL = DAY.reduce((a, t) => a + t.minutes, 0);
const HOURS = [8, 10, 12, 14, 16, 18];

const pct = (h: number) => ((h - DAY_START) / (DAY_END - DAY_START)) * 100;

export function formatDuration(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`;
}

export function ServicesDayPlan({ pick, className }: { pick: ServiceKey | null; className?: string }) {
  const { disableContentMotion: instant } = usePerformanceMode();
  const active = pick ? DAY.find((t) => t.service === pick) : undefined;

  return (
    <figure aria-labelledby="svc-day-title" className={cn("relative", className)}>
      {/* La lumière derrière le verre */}
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute left-[8%] top-[10%] h-[70%] w-[60%] rounded-full bg-accent-primary/35 blur-[90px]" />
      <div aria-hidden data-decor="halo" className="pointer-events-none absolute right-[4%] top-[30%] h-[45%] w-[40%] rounded-full bg-cyan/20 blur-[80px]" />

      <GlassPanel className="rounded-[28px] p-5 sm:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p id="svc-day-title" className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
            Une journée type
          </p>
          <p aria-live="polite" className="text-[13.5px] text-text-secondary">
            {active ? (
              <>
                {serviceByKey(active.service).short} vous rend{" "}
                <strong className="font-semibold text-cyan">{formatDuration(active.minutes - active.after)}</strong>
              </>
            ) : (
              <>
                <strong className="font-semibold text-text-primary">{formatDuration(TOTAL)}</strong> de tâches qui reviennent
              </>
            )}
          </p>
        </div>

        {/* L'axe des heures */}
        <div aria-hidden className="relative mt-6 h-4 text-[11px] tabular-nums text-text-tertiary">
          {HOURS.map((h, i) => (
            <span
              key={h}
              className={cn("absolute top-0 whitespace-nowrap", i === 0 ? "" : i === HOURS.length - 1 ? "-translate-x-full" : "-translate-x-1/2")}
              style={{ left: `${pct(h)}%` }}
            >
              {h} h
            </span>
          ))}
        </div>

        <div className="relative mt-2">
          {/* Les heures, comme dans un agenda */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {HOURS.map((h) => (
              <span key={h} className="absolute inset-y-0 border-l border-paper/[0.07]" style={{ left: `${pct(h)}%` }} />
            ))}
          </div>
          <ol className="relative space-y-3">
            {DAY.map((t) => {
              const on = pick === t.service;
              const dim = pick !== null && !on;
              return (
                <li key={t.service} className={cn("transition-opacity duration-500", dim && "opacity-40")}>
                  <div className="flex items-baseline justify-between gap-3 text-[13.5px]">
                    <span className={cn("font-medium transition-colors duration-300", on ? "text-text-primary" : "text-text-secondary")}>{t.task}</span>
                    <span className="shrink-0 tabular-nums text-text-tertiary">{formatDuration(t.minutes)}</span>
                  </div>
                  <div aria-hidden className="relative mt-1.5 h-2.5 rounded-full bg-paper/[0.06]">
                    <div className="absolute inset-y-0" style={{ left: `${pct(t.start)}%`, width: `${(t.minutes / SPAN_MIN) * 100}%` }}>
                      <span className={cn("absolute inset-0 rounded-full border border-dashed transition-colors duration-500", on ? "border-cyan/70" : "border-transparent")} />
                      <motion.span
                        className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-accent-primary to-accent-light"
                        initial={false}
                        animate={{ scaleX: on ? t.after / t.minutes : 1 }}
                        transition={{ duration: instant ? 0 : 0.7, ease: EASE }}
                      />
                    </div>
                  </div>
                  <div className="h-5">
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.p
                          className="pt-1 text-[12.5px] font-medium text-cyan"
                          initial={instant ? false : { opacity: 0, y: -3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, transition: { duration: 0.15 } }}
                          transition={{ duration: 0.3, delay: instant ? 0 : 0.35, ease: EASE }}
                        >
                          → {t.with}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <figcaption className="mt-2 border-t border-border-medium pt-3.5 text-[12px] leading-relaxed text-text-tertiary">{DAY_NOTE}</figcaption>
      </GlassPanel>
    </figure>
  );
}
