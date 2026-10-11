"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Check, FileText, Pause, Play, Search } from "lucide-react";
import { useInViewPause } from "@/lib/animation/inViewPause";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { RAG_DOCS, RAG_SCENARIOS, SCENARIO_DURATION, T, type RagScenario } from "./ragHeroSceneData";

/**
 * Pièces de la démonstration du hero de /rag, partagées ordinateur et téléphone :
 * l'horloge (une question toutes les 10,5 s, ou celle choisie par le visiteur), les
 * boutons de question, la question, la recherche, la réponse citée, l'extrait surligné.
 * Aucune horloge dans les pièces : les temps internes passent par `delay` ou `useAfter`.
 */

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const OBJECT_SHADOW =
  "0 1px 2px color-mix(in oklab, var(--color-bg-primary) 60%, transparent), 0 22px 40px -22px color-mix(in oklab, var(--color-bg-primary) 95%, transparent)";

/** Entrée standard : opacité, légère montée. Figée si l'animation est coupée. */
export function enter(fresh: boolean, d = 0, y = 8) {
  return {
    initial: fresh ? { opacity: 0, y } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: fresh ? 0.45 : 0, delay: fresh ? d : 0, ease: EASE },
  } as const;
}

/** true `ms` après le montage (toujours true si l'animation est coupée). */
function useAfter(ms: number, enabled: boolean) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const t = window.setTimeout(() => setDone(true), ms);
    return () => window.clearTimeout(t);
  }, [ms, enabled]);
  return !enabled || done;
}

// ─── L'horloge ───────────────────────────────────────────────────────────────

/**
 * Lecture automatique tant que le visiteur n'a rien choisi. Un clic sur une question
 * la rejoue et arrête l'enchaînement ; le bouton lecture le relance. Pause hors écran
 * et onglet masqué. Sans animation : la réponse finale, les boutons changent de question.
 */
export function useRagDemo() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const offscreen = useInViewPause();
  const [pos, setPos] = useState({ i: 0, run: 0 });
  const [auto, setAuto] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const animated = mounted && !disableContentMotion;
  const playing = auto && !userPaused;
  const running = animated && playing && !offscreen && !tabHidden;

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setPos((p) => ({ i: (p.i + 1) % RAG_SCENARIOS.length, run: p.run + 1 })), SCENARIO_DURATION);
    return () => window.clearTimeout(t);
  }, [running, pos]);

  const pick = (i: number) => {
    setPos((p) => ({ i, run: p.run + 1 }));
    setAuto(false);
    setUserPaused(false);
  };

  const toggle = () => {
    if (playing) {
      setUserPaused(true);
    } else {
      setUserPaused(false);
      setAuto(true);
    }
  };

  return { s: RAG_SCENARIOS[pos.i], index: pos.i, run: pos.run, animated, fresh: animated, auto, playing, pick, toggle };
}

// ─── Les commandes ───────────────────────────────────────────────────────────

export function ScenarioChips({
  index,
  pick,
  short = false,
  className,
}: {
  index: number;
  pick: (i: number) => void;
  short?: boolean;
  className?: string;
}) {
  return (
    <div role="group" aria-label="Questions d'exemple" className={cn("flex gap-2", className)}>
      {RAG_SCENARIOS.map((x, i) => {
        const on = i === index;
        return (
          <button
            key={x.key}
            type="button"
            aria-pressed={on}
            onClick={() => pick(i)}
            className={cn(
              "shrink-0 rounded-full font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
              short ? "min-h-11 px-4 text-[14px]" : "h-8 px-3.5 text-[13px]",
              on ? "bg-paper text-ink" : "text-text-secondary ring-1 ring-border-medium hover:text-text-primary hover:ring-border-accent",
            )}
          >
            {short ? x.chipShort : x.chip}
          </button>
        );
      })}
    </div>
  );
}

export function PlayToggle({ playing, toggle, withLabel = false }: { playing: boolean; toggle: () => void; withLabel?: boolean }) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!playing}
      aria-label={playing ? "Mettre la démonstration en pause" : "Reprendre la démonstration"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border-medium bg-bg-card/60 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
        withLabel ? "h-11 px-3.5 text-[13px]" : "h-9 w-9",
      )}
    >
      {playing ? <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden /> : <Play className="h-3.5 w-3.5 translate-x-px" strokeWidth={2} aria-hidden />}
      {withLabel && (playing ? "Pause" : "Lecture")}
    </button>
  );
}

/** Ce qu'un lecteur d'écran entend, seulement quand le visiteur a choisi la question. */
export function SpokenAnswer({ s, auto }: { s: RagScenario; auto: boolean }) {
  return (
    <p className="sr-only" aria-live={auto ? "off" : "polite"}>
      {`Question : ${s.question} Réponse : ${s.answer} Sources : ${s.citations.join(", ")}.`}
    </p>
  );
}

// ─── Les documents ───────────────────────────────────────────────────────────

const ROW_H = 36;

/** Les sept documents : un balayage pendant la recherche, puis les deux retenus restent allumés. */
export function DocRows({ s, fresh }: { s: RagScenario; fresh: boolean }) {
  const found = useAfter(T.found * 1000, fresh);
  return (
    <ul className="relative px-2 py-2">
      {fresh && (
        <motion.span
          aria-hidden
          className="absolute inset-x-2 top-2 rounded-lg bg-accent-primary/15 ring-1 ring-accent-light/30"
          style={{ height: ROW_H }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, ROW_H * (RAG_DOCS.length - 1)], opacity: [0, 1, 1, 0] }}
          transition={{
            y: { duration: T.found - T.search, delay: T.search, ease: "easeInOut" },
            opacity: { duration: T.found - T.search, delay: T.search, times: [0, 0.12, 0.85, 1] },
          }}
        />
      )}
      {RAG_DOCS.map((d) => {
        const hit = s.found.includes(d.id);
        const Icon = d.icon;
        return (
          <li
            key={d.id}
            className={cn(
              "relative flex items-center gap-2.5 rounded-lg px-2.5 transition-[background-color,opacity] duration-500",
              found && hit && "bg-cyan/10 ring-1 ring-cyan/35",
              found && !hit && "opacity-40",
            )}
            style={{ height: ROW_H }}
          >
            <Icon size={14} strokeWidth={1.9} className={cn("shrink-0 transition-colors duration-500", found && hit ? "text-cyan" : "text-text-tertiary")} aria-hidden />
            <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-text-primary">{d.name}</span>
            <span className={cn("shrink-0 text-[11px] transition-colors duration-500", found && hit ? "font-semibold text-cyan" : "text-text-tertiary")}>
              {found && hit ? "passage" : d.origin}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

// ─── L'échange ───────────────────────────────────────────────────────────────

export function QuestionBubble({ s, fresh }: { s: RagScenario; fresh: boolean }) {
  return (
    <motion.p
      {...enter(fresh, T.question, 6)}
      className="ml-auto w-fit max-w-[27rem] rounded-2xl rounded-br-md bg-accent-primary px-4 py-2.5 text-[14.5px] font-medium leading-snug text-paper"
    >
      {s.question}
    </motion.p>
  );
}

/** La recherche, puis ce qu'elle a retrouvé. `passages` : la liste des deux passages (ordinateur). */
export function SearchStatus({ s, fresh, passages = true }: { s: RagScenario; fresh: boolean; passages?: boolean }) {
  const found = useAfter(T.found * 1000, fresh);
  return (
    <motion.div {...enter(fresh, T.search, 4)}>
      <p className="flex items-center gap-2 text-[13px] font-medium">
        {found ? (
          <>
            <Check size={14} strokeWidth={2.4} className="text-cyan" aria-hidden />
            <span className="text-text-primary">2 passages retrouvés</span>
            <span className="text-text-tertiary">dans 7 documents</span>
          </>
        ) : (
          <>
            <Search size={14} strokeWidth={2} className="text-text-tertiary" aria-hidden />
            <span className="text-text-secondary">Recherche dans 7 documents</span>
            {fresh && (
              <motion.span
                aria-hidden
                className="text-text-tertiary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                …
              </motion.span>
            )}
          </>
        )}
      </p>
      {passages && (
        <ul className="mt-2.5 space-y-1.5">
          {s.found.map((id, i) => {
            const doc = RAG_DOCS.find((d) => d.id === id)!;
            return (
              <motion.li
                key={id}
                {...enter(fresh, T.found + 0.1 + i * 0.15, 4)}
                className="flex items-center gap-2 text-[12.5px] text-text-secondary"
              >
                <FileText size={13} strokeWidth={1.9} className="shrink-0 text-cyan/80" aria-hidden />
                <span className="font-medium text-text-primary">{doc.name}</span>
                <span className="text-text-tertiary">· {s.passages[i]}</span>
              </motion.li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
}

/** La réponse, et ses deux sources. La première s'allume quand sa page s'ouvre. */
export function AnswerCard({ s, fresh, className }: { s: RagScenario; fresh: boolean; className?: string }) {
  const opened = useAfter(T.page * 1000, fresh);
  return (
    <motion.div {...enter(fresh, T.answer, 8)} className={cn("rounded-2xl border border-cyan/30 bg-bg-card p-4", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">Réponse</p>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-text-primary">{s.answer}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {s.citations.map((c, i) => (
          <motion.li
            key={c}
            {...enter(fresh, T.answer + 0.5 + i * 0.15, 4)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors duration-500",
              i === 0 && opened ? "bg-cyan/15 text-text-primary ring-1 ring-cyan/60" : "text-text-secondary ring-1 ring-border-medium",
            )}
          >
            <FileText size={12} strokeWidth={2} className={i === 0 && opened ? "text-cyan" : "text-text-tertiary"} aria-hidden />
            {c}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/** La page source, ouverte sur le passage : la phrase utile se surligne. */
export function PageExtract({ s, fresh, className }: { s: RagScenario; fresh: boolean; className?: string }) {
  const marked = useAfter(T.mark * 1000, fresh);
  return (
    <motion.div
      {...enter(fresh, T.page, 10)}
      className={cn("overflow-hidden rounded-xl bg-paper text-ink", className)}
      style={{ boxShadow: OBJECT_SHADOW }}
    >
      <div className="flex items-center gap-2 border-b border-paper-line px-3.5 py-2">
        <FileText size={13} strokeWidth={2} className="shrink-0 text-accent-dark" aria-hidden />
        <p className="min-w-0 flex-1 truncate text-[12.5px] font-semibold">{s.page.doc}</p>
        <p className="shrink-0 text-[11.5px] text-ink-3">{s.page.ref}</p>
      </div>
      <p className="px-3.5 py-3 text-[12.5px] leading-[1.6] text-ink-2">
        {s.page.before}{" "}
        <span
          className={cn(
            "rounded-[3px] font-medium text-ink transition-colors duration-700 [box-decoration-break:clone]",
            marked ? "bg-cyan/30" : "bg-transparent",
          )}
        >
          {s.page.mark}
        </span>{" "}
        {s.page.after}
      </p>
    </motion.div>
  );
}
