"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Clock3, Webhook, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { T, type Output, type Scenario } from "./autoHeroData";

/**
 * Pièces du film d'automatisation (/automatisation, V3), partagées ordinateur et
 * téléphone : l'objet d'entrée, le moteur de règles, les résultats, le journal.
 * Aucune horloge ici : les temps internes passent par des `delay` Motion ou `useAfter`.
 */

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const OBJECT_SHADOW =
  "0 1px 2px color-mix(in oklab, var(--color-bg-primary) 60%, transparent), 0 22px 40px -22px color-mix(in oklab, var(--color-bg-primary) 95%, transparent)";

/** Entrée standard : opacité, légère montée, léger zoom. Figée si l'animation est coupée. */
export function enter(fresh: boolean, d = 0, y = 8) {
  return {
    initial: fresh ? { opacity: 0, y, scale: 0.985 } : false,
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: fresh ? 0.45 : 0, delay: fresh ? d : 0, ease: EASE },
  } as const;
}

/** true `ms` après le montage (toujours true si l'animation est coupée). */
export function useAfter(ms: number, enabled: boolean) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const t = window.setTimeout(() => setDone(true), ms);
    return () => window.clearTimeout(t);
  }, [ms, enabled]);
  return !enabled || done;
}

// ─── L'objet qui déclenche ───────────────────────────────────────────────────

export function InputCard({ s, fresh, compact = false }: { s: Scenario; fresh: boolean; compact?: boolean }) {
  const sent = useAfter(T.send * 1000, fresh);
  const Icon = s.input.icon;
  const status = s.input.status;
  return (
    <div className="overflow-hidden rounded-2xl bg-paper text-ink" style={{ boxShadow: OBJECT_SHADOW }}>
      <div className="flex items-center gap-2.5 border-b border-paper-line px-4 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink text-cyan" aria-hidden>
          <Icon size={15} strokeWidth={1.9} />
        </span>
        <p className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink-2">{s.input.kind}</p>
        {status && (
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[11.5px] font-semibold transition-colors duration-500",
              sent ? "bg-cyan/15 text-ink" : "bg-paper-3 text-ink-2",
            )}
          >
            {sent ? status.to : status.from}
          </span>
        )}
      </div>
      <div className={cn("px-4", compact ? "py-3" : "py-3.5")}>
        <p className="text-[16px] font-semibold tracking-tight">{s.input.title}</p>
        <dl className="mt-2 space-y-1.5">
          {s.input.fields.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between gap-3 text-[13px]">
              <dt className="shrink-0 text-ink-3">{f.label}</dt>
              <dd className="truncate text-right font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
        {s.input.action && (
          <motion.div
            className={cn(
              "mt-3.5 flex h-9 items-center justify-center gap-1.5 rounded-lg text-[13px] font-semibold text-paper transition-colors duration-300",
              sent ? "bg-accent-dark" : "bg-accent-primary",
            )}
            animate={fresh && sent ? { scale: [0.96, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {sent && <Check size={14} strokeWidth={2.4} aria-hidden />}
            {sent ? "Envoyé" : s.input.action}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Le moteur de règles ─────────────────────────────────────────────────────

/** Le cadre ne change jamais ; seul son contenu suit le scénario. */
export function EngineFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("panel-card flex flex-col overflow-hidden rounded-2xl ring-1 ring-cyan/25", className)}>
      <div className="flex items-center gap-2 border-b border-border-medium px-4 py-3">
        <Workflow size={15} strokeWidth={1.9} className="text-cyan" aria-hidden />
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-text-secondary">Automatisation</p>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
      <p className="border-t border-border-medium px-4 py-2 text-[11px] text-text-tertiary">Exemple de workflow</p>
    </div>
  );
}

/** Le déclencheur, puis quatre étapes qui se cochent une à une, la suivante marquée. */
export function EngineSteps({ s, fresh, quick = false }: { s: Scenario; fresh: boolean; quick?: boolean }) {
  // `quick` : téléphone, le moteur a son propre moment, il n'attend pas la donnée.
  const triggerAt = quick ? 0.1 : T.send + T.travel - 0.1;
  const stepAt = (i: number) => (quick ? 0.35 + i * 0.28 : T.step0 + i * T.stepGap);
  return (
    <div className="px-4 py-3.5">
      <motion.p {...enter(fresh, triggerAt, 4)} className="flex items-center gap-2 rounded-lg bg-cyan/10 px-2.5 py-2 text-[13.5px] font-semibold text-text-primary">
        <Webhook size={14} strokeWidth={2} className="shrink-0 text-cyan" aria-hidden />
        {s.engine.trigger}
      </motion.p>
      <ol className="mt-2.5 space-y-1">
        {s.engine.steps.map((step, i) => {
          const at = stepAt(i);
          return (
            <motion.li
              key={step}
              className="flex items-center gap-2.5 px-2.5 py-1.5 text-[13.5px]"
              initial={fresh ? { opacity: 0.35 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: fresh ? 0.3 : 0, delay: fresh ? at : 0 }}
            >
              <span className="relative grid h-4 w-4 shrink-0 place-items-center" aria-hidden>
                <motion.span className="absolute inset-0 grid place-items-center text-text-tertiary" initial={false} animate={{ opacity: fresh ? [1, 1, 0] : 0 }} transition={{ duration: fresh ? at + 0.2 : 0, times: [0, 0.95, 1] }}>
                  <Clock3 size={13} strokeWidth={2} />
                </motion.span>
                <motion.span
                  className="absolute inset-0 grid place-items-center rounded-full bg-cyan text-bg-primary"
                  initial={fresh ? { opacity: 0, scale: 0.6 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: fresh ? 0.3 : 0, delay: fresh ? at + 0.15 : 0, ease: EASE }}
                >
                  <Check size={10} strokeWidth={3} />
                </motion.span>
              </span>
              <span className="text-text-primary">{step}</span>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

// ─── Les résultats dans les outils ──────────────────────────────────────────

export function OutputCard({ o, fresh, delay }: { o: Output; fresh: boolean; delay: number }) {
  const Icon = o.icon;
  return (
    <motion.div {...enter(fresh, delay, 6)} className="flex h-full items-center gap-2.5 rounded-xl bg-paper px-3 text-ink" style={{ boxShadow: OBJECT_SHADOW }}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-paper-2 text-accent-dark ring-1 ring-paper-line" aria-hidden>
        <Icon size={15} strokeWidth={1.9} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{o.label}</p>
        <p className="truncate text-[13.5px] font-semibold leading-tight">{o.value}</p>
        {o.note && <p className="truncate text-[11.5px] text-ink-3">{o.note}</p>}
      </div>
      <motion.span
        className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan/20 text-ink"
        initial={fresh ? { opacity: 0, scale: 0.6 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: fresh ? 0.3 : 0, delay: fresh ? delay + 0.3 : 0, ease: EASE }}
        aria-hidden
      >
        <Check size={11} strokeWidth={3} />
      </motion.span>
    </motion.div>
  );
}

// ─── Le journal (téléphone, moment 04) ──────────────────────────────────────

export function JournalList({ s, fresh }: { s: Scenario; fresh: boolean }) {
  return (
    <ol className="divide-y divide-border-medium">
      {s.journal.map((j, i) => (
        <motion.li key={j.text} {...enter(fresh, 0.1 + i * 0.18, 4)} className="flex items-baseline gap-3 py-2">
          <span className="w-10 shrink-0 font-mono text-[12px] text-text-tertiary">{j.time}</span>
          <span className="text-[14px] text-text-primary">{j.text}</span>
        </motion.li>
      ))}
    </ol>
  );
}
