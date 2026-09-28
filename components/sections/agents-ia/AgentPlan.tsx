"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Pause, Play, type LucideIcon } from "lucide-react";
import { useInViewPause } from "@/lib/animation/inViewPause";

/**
 * « Le plan de l'agent » : un mini film schématique en six scènes, qui joue en
 * boucle. Chaque scène = une brique (déclencheur, agent IA, mémoire RAG,
 * action, validation humaine, enregistrement), un titre et deux lignes de
 * données d'exemple qui s'affichent quand la scène est active.
 *
 * Thème sombre (signature du site). Animations en transform / opacity ;
 * pause hors écran et bouton lecture / pause ; `reduced` → tout est affiché,
 * rien ne bouge.
 */

export type PlanKind = "trigger" | "agent" | "rag" | "action" | "human" | "record";
export type PlanStep = { kind: PlanKind; title: string; lines: [string, string]; icon: LucideIcon };
export type AgentPlanData = {
  /** Briques utilisées par ce profil, et une phrase qui explique le choix. */
  blocks: { rag: boolean; automation: boolean; note: string };
  steps: PlanStep[];
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const STEP_MS = 2400;

const KIND: Record<PlanKind, { label: string; ring: string; text: string; dot: string; glow: string }> = {
  trigger: { label: "Automatisation", ring: "border-success/50 bg-success/10", text: "text-success", dot: "bg-success", glow: "var(--color-success-glow)" },
  record: { label: "Automatisation", ring: "border-success/50 bg-success/10", text: "text-success", dot: "bg-success", glow: "var(--color-success-glow)" },
  agent: { label: "Agent IA", ring: "border-accent-primary/60 bg-accent-glow", text: "text-accent-light", dot: "bg-accent-primary", glow: "var(--color-accent-glow-strong)" },
  action: { label: "Agent IA", ring: "border-accent-primary/60 bg-accent-glow", text: "text-accent-light", dot: "bg-accent-primary", glow: "var(--color-accent-glow-strong)" },
  rag: { label: "Mémoire (RAG)", ring: "border-cyan/50 bg-cyan/10", text: "text-cyan", dot: "bg-cyan", glow: "var(--color-cyan-glow)" },
  human: { label: "Vous validez", ring: "border-warning/50 bg-warning/10", text: "text-warning", dot: "bg-warning", glow: "var(--color-warning-glow)" },
};

function Chip({ kind, on, label }: { kind: PlanKind; on: boolean; label: string }) {
  const k = KIND[kind];
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
        on ? `${k.ring} ${k.text}` : "border-border-subtle text-text-tertiary line-through decoration-text-tertiary/50",
      ].join(" ")}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${on ? k.dot : "bg-text-tertiary/50"}`} aria-hidden />
      {label}
    </span>
  );
}

export function AgentPlan({ plan, reduced }: { plan: AgentPlanData; reduced: boolean }) {
  const paused = useInViewPause();
  const [playing, setPlaying] = useState(true);
  const [active, setActive] = useState(0);
  const n = plan.steps.length;
  const running = !reduced && playing && !paused;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), STEP_MS);
    return () => clearInterval(id);
  }, [running, n]);

  const timecode = `00:${String(active * 4).padStart(2, "0")} / 00:${String((n - 1) * 4).padStart(2, "0")}`;

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-card/40 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
              Le plan de l&apos;agent · scène par scène
            </span>
            {!reduced && (
              <span className="font-mono text-[11px] text-text-tertiary" aria-live="off">
                scène {active + 1} / {n} · {timecode}
              </span>
            )}
          </div>
          <p className="mt-1.5 max-w-xl text-[11.5px] leading-relaxed text-text-tertiary">{plan.blocks.note}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip kind="agent" on label="Agent IA" />
          <Chip kind="rag" on={plan.blocks.rag} label={`Mémoire (RAG) · ${plan.blocks.rag ? "oui" : "non"}`} />
          <Chip kind="trigger" on={plan.blocks.automation} label={`Automatisation · ${plan.blocks.automation ? "oui" : "non"}`} />
          <Chip kind="human" on label="Vous validez" />
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Mettre le plan en pause" : "Lire le plan"}
              className="grid h-7 w-7 place-items-center rounded-full border border-border-subtle bg-bg-card/60 text-text-secondary transition-colors hover:border-border-medium hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60"
            >
              {playing ? <Pause size={12} aria-hidden /> : <Play size={12} aria-hidden />}
            </button>
          )}
        </div>
      </div>

      {/* Barre de lecture : une pastille par scène */}
      <div className="relative mt-5 h-1 rounded-full bg-border-subtle/70" aria-hidden>
        <motion.span
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
          style={{ background: "linear-gradient(90deg, var(--color-accent-primary), var(--color-cyan))" }}
          initial={false}
          animate={{ scaleX: reduced ? 1 : active / (n - 1) }}
          transition={{ duration: 0.6, ease: EASE }}
        />
        {plan.steps.map((s, i) => (
          <span
            key={s.title}
            className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bg-primary ${KIND[s.kind].dot} ${reduced || i <= active ? "" : "opacity-40"}`}
            style={{ left: `${(i / (n - 1)) * 100}%` }}
          />
        ))}
      </div>

      {/* Scènes */}
      <ol className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {plan.steps.map((s, i) => {
          const on = reduced || i === active;
          const done = !reduced && i < active;
          const k = KIND[s.kind];
          const Icon = s.icon;
          return (
            <motion.li
              key={s.title}
              initial={false}
              animate={reduced ? undefined : { opacity: on ? 1 : done ? 0.7 : 0.45, scale: on ? 1.02 : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative rounded-xl border border-border-subtle bg-bg-primary/50 p-3"
              style={on && !reduced ? { boxShadow: `0 0 0 1px ${k.glow}, 0 14px 34px ${k.glow}` } : undefined}
              aria-current={!reduced && i === active ? "step" : undefined}
            >
              <div className="flex items-center gap-2">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border ${k.ring} ${k.text}`}>
                  <Icon size={14} aria-hidden />
                </span>
                <span className="min-w-0 font-mono text-[9px] uppercase leading-tight tracking-[0.16em] text-text-tertiary">
                  {String(i + 1).padStart(2, "0")} · {k.label}
                </span>
              </div>
              <p className="mt-2 text-[12px] font-semibold leading-snug text-text-primary">{s.title}</p>
              <div className="mt-2 space-y-1 rounded-md border border-border-subtle/70 bg-bg-card/60 px-2 py-1.5 font-mono text-[10.5px] leading-snug text-text-secondary">
                {s.lines.map((line, j) => (
                  <motion.p
                    key={line}
                    initial={false}
                    animate={reduced ? undefined : { opacity: on || done ? 1 : 0.3, x: on || done ? 0 : -4 }}
                    transition={{ duration: 0.35, delay: on ? 0.2 + j * 0.3 : 0, ease: EASE }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
