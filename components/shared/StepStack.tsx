"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Check, Lock, type LucideIcon } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";

/**
 * Plan de projet + pile d'objets (octobre 2026). Remplace les frises « points reliés par
 * un trait horizontal » : à gauche, une carte plan de projet où chaque étape se coche ; à
 * droite, l'objet que l'étape produit (une note, une proposition, un flux, une réponse)
 * vient se poser sur la pile des précédents, en éventail.
 *
 * Lecture automatique une seule fois, à l'entrée dans l'écran ; un clic sur une étape remet
 * son objet sur le dessus. `stopAt` arrête la lecture plus tôt (les étapes suivantes sont
 * `pending` : en attente de votre accord). `resetKey` rejoue la séquence (ex. un niveau
 * d'autonomie qui change). Sans animation : le plan complet, d'emblée.
 * Mouvement : transform et opacity seulement, en ressort.
 */

export type StackObject = {
  icon: LucideIcon;
  /** Ce qu'est l'objet : « Note », « Proposition », « Journal »… */
  kind: string;
  title: string;
  lines?: { text: string; done?: boolean }[];
  badge?: string;
  /** `ink` : l'objet qui compte (la décision, la réponse), en encre. */
  tone?: "paper" | "ink";
};

export type StackStep = {
  key: string;
  title: string;
  text: string;
  /** Ce que vous avez en main à la fin de l'étape. */
  gives?: string;
  object: StackObject;
};

const SPRING = { type: "spring", stiffness: 210, damping: 26, mass: 0.9 } as const;

export function StepStack({
  steps,
  heading,
  icon: HeadingIcon,
  summary,
  tone = "dark",
  stopAt,
  lockAt,
  lockLabel,
  pendingLabel = "après votre accord",
  resetKey,
  className,
}: {
  steps: StackStep[];
  /** Titre de la carte plan : « Votre pilote », « Votre projet »… */
  heading: string;
  icon?: LucideIcon;
  /** Une ligne sous le plan (délai, conditions). */
  summary?: React.ReactNode;
  tone?: "dark" | "light";
  stopAt?: number;
  /** Étape où se place le verrou humain (badge `lockLabel`). */
  lockAt?: number;
  lockLabel?: string;
  pendingLabel?: string;
  resetKey?: string | number;
  className?: string;
}) {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const animated = mounted && !disableContentMotion;
  const last = stopAt ?? steps.length - 1;

  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.35 });

  // Rendu serveur et animation coupée : le plan complet. Animé : la pile se vide au montage,
  // puis se remplit à l'entrée dans l'écran.
  const [active, setActive] = useState(last);
  const [done, setDone] = useState(last);
  const [auto, setAuto] = useState(true);
  const primed = useRef(false);

  useEffect(() => {
    if (!animated) {
      setActive(last);
      setDone(last);
      return;
    }
    if (!primed.current) {
      primed.current = true;
      setActive(-1);
      setDone(-1);
      return;
    }
    // resetKey ou stopAt a changé : on rejoue, plus vite.
    setAuto(true);
    setActive(0);
    setDone(0);
  }, [animated, last, resetKey]);

  useEffect(() => {
    if (!animated || !inView || !auto) return;
    if (active >= last) return;
    const t = window.setTimeout(
      () => {
        setActive((a) => Math.min(a + 1, last));
        setDone((d) => Math.max(d, Math.min(active + 1, last)));
      },
      // La séquence entière tient sous 5 s (WCAG 2.2.2 : pas de pause à fournir).
      active < 0 ? 250 : Math.min(1150, Math.floor(4500 / Math.max(last + 1, 1))),
    );
    return () => window.clearTimeout(t);
  }, [animated, inView, auto, active, last]);

  function pick(i: number) {
    if (i > last) return;
    setAuto(false);
    setActive(i);
    setDone((d) => Math.max(d, i));
  }

  const dark = tone === "dark";

  return (
    <div ref={rootRef} className={cn("grid gap-5 md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] md:items-center md:gap-8", className)}>
      {/* La pile : en premier sur téléphone, à droite sur ordinateur */}
      <div aria-hidden className="relative h-[290px] md:order-2 md:h-[360px]">
        <div className={cn("absolute inset-0 rounded-[28px]", dark ? "bg-paper/[0.03] ring-1 ring-paper/10" : "bg-ink/[0.03] ring-1 ring-ink/10")} />
        {steps.map((s, i) => {
          const d = active - i; // profondeur : 0 = sur le dessus
          const shown = i <= active;
          return (
            <div key={s.key} className="absolute left-1/2 top-1/2 w-[min(84%,19rem)] -translate-x-1/2 -translate-y-1/2" style={{ zIndex: i + 1 }}>
              <motion.div
                initial={false}
                animate={
                  shown
                    ? {
                        x: -d * 16,
                        y: -d * 15,
                        rotate: d === 0 ? 0 : -2 - d * 1.5,
                        scale: 1 - Math.min(d, 4) * 0.045,
                        opacity: d > 3 ? 0 : 1 - d * 0.12,
                      }
                    : { x: 46, y: 70, rotate: 5, scale: 0.96, opacity: 0 }
                }
                transition={animated ? SPRING : { duration: 0 }}
              >
                <StackCard o={s.object} lock={lockAt === i ? lockLabel : undefined} />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Le plan de projet */}
      <GlassPanel tone={dark ? "dark" : "light"} sheen={false} className="rounded-[28px] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 px-1.5 pb-3">
          <p className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
            {HeadingIcon && <HeadingIcon size={15} strokeWidth={1.9} className={dark ? "text-cyan" : "text-accent-dark"} aria-hidden />}
            {heading}
          </p>
          <p className="shrink-0 whitespace-nowrap font-mono text-[12px] tabular-nums text-text-tertiary" aria-hidden>
            {Math.max(done + 1, 0)} / {steps.length}
          </p>
        </div>
        <ol className="space-y-1">
          {steps.map((s, i) => {
            const pending = i > last;
            const checked = !pending && i <= done;
            const on = i === active;
            const locked = lockAt === i;
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-disabled={pending || undefined}
                  aria-current={on ? "step" : undefined}
                  className={cn(
                    "grid w-full grid-cols-[1.5rem_minmax(0,1fr)] gap-3 rounded-2xl px-2.5 py-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-default",
                    dark ? "focus-visible:outline-cyan" : "focus-visible:outline-accent-primary",
                    on && (dark ? "bg-paper/[0.06]" : "bg-accent-primary/[0.07]"),
                    !on && !pending && (dark ? "hover:bg-paper/[0.03]" : "hover:bg-accent-primary/[0.04]"),
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 grid h-6 w-6 place-items-center rounded-[7px] transition-colors duration-300",
                      pending
                        ? "text-text-tertiary ring-1 ring-border-medium"
                        : checked
                          ? dark
                            ? "bg-cyan text-bg-primary"
                            : "bg-accent-primary text-paper"
                          : "ring-1 ring-border-medium",
                    )}
                  >
                    {pending ? (
                      <Lock size={12} strokeWidth={2.2} />
                    ) : (
                      <motion.span initial={false} animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }} transition={animated ? SPRING : { duration: 0 }}>
                        <Check size={14} strokeWidth={3} />
                      </motion.span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className={cn("text-[15.5px] font-semibold leading-snug tracking-tight", pending ? "text-text-tertiary" : "text-text-primary")}>{s.title}</span>
                      {locked && lockLabel && (
                        <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-semibold", dark ? "bg-paper text-ink" : "bg-ink text-paper")}>
                          <Lock size={11} strokeWidth={2.4} aria-hidden />
                          {lockLabel}
                        </span>
                      )}
                    </span>
                    <span className={cn("mt-0.5 block text-[14px] leading-relaxed", pending ? "text-text-tertiary" : "text-text-secondary")}>
                      {pending ? `${s.text} (${pendingLabel})` : s.text}
                    </span>
                    {s.gives && !pending && (
                      <span className={cn("mt-1 block text-[13px] font-medium", dark ? "text-cyan" : "text-accent-dark")}>
                        <span className="sr-only">À la fin : </span>→ {s.gives}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        {summary && <div className="mt-3 border-t border-border-medium px-1.5 pt-3.5 text-[13.5px] leading-relaxed text-text-secondary">{summary}</div>}
      </GlassPanel>
    </div>
  );
}

/** Une carte de la pile : un objet « papier » (ou à l'encre pour celui qui compte). */
function StackCard({ o, lock }: { o: StackObject; lock?: string }) {
  const Icon = o.icon;
  const ink = o.tone === "ink";
  return (
    <div
      className={cn("overflow-hidden rounded-2xl", ink ? "bg-ink text-paper ring-1 ring-cyan/40" : "bg-paper text-ink")}
      style={{
        boxShadow:
          "0 1px 2px color-mix(in oklab, var(--color-ink) 18%, transparent), 0 26px 46px -24px color-mix(in oklab, var(--color-ink) 70%, transparent)",
      }}
    >
      <div className={cn("flex items-center gap-2 border-b px-4 py-2.5", ink ? "border-paper/10" : "border-paper-line")}>
        <span className={cn("grid h-6 w-6 place-items-center rounded-full", ink ? "bg-paper/10 text-cyan" : "bg-accent-primary/12 text-accent-dark")}>
          <Icon size={13} strokeWidth={2} />
        </span>
        <span className={cn("flex-1 truncate text-[11px] font-semibold uppercase tracking-[0.14em]", ink ? "text-paper/70" : "text-ink-3")}>{o.kind}</span>
        {(lock || o.badge) && (
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold", ink ? "bg-cyan/20 text-cyan" : "bg-ink text-paper")}>
            {lock && <Lock size={10} strokeWidth={2.4} />}
            {lock ?? o.badge}
          </span>
        )}
      </div>
      <div className="px-4 py-3.5">
        <p className="text-[15.5px] font-semibold leading-snug tracking-tight">{o.title}</p>
        {o.lines && (
          <ul className="mt-2.5 space-y-1.5">
            {o.lines.map((l) => (
              <li key={l.text} className={cn("flex items-start gap-2 text-[13px] leading-snug", ink ? "text-paper/80" : "text-ink-2")}>
                {l.done ? (
                  <Check size={13} strokeWidth={2.8} className={cn("mt-px shrink-0", ink ? "text-cyan" : "text-accent-dark")} />
                ) : (
                  <span className={cn("mt-[7px] h-1 w-1 shrink-0 rounded-full", ink ? "bg-paper/50" : "bg-ink/30")} />
                )}
                {l.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
