"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  BatteryFull,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleCheck,
  CircleDashed,
  Contact,
  FileText,
  History,
  LockKeyhole,
  LockKeyholeOpen,
  MessageSquareText,
  PhoneCall,
  Send,
  ShieldCheck,
  Signal,
  TriangleAlert,
  Wifi,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CALL_END_AT,
  CHAT,
  COMPARE,
  DECISION,
  DOC,
  DOSSIER_ROWS,
  FLOW,
  JOURNAL,
  REQUEST,
  STATIC_STORY,
  SUMMARY,
  TO_VALIDATE,
  TRANSCRIPT,
  VALIDATE_CHECK_AT,
  VALIDATE_TAP_AT,
  rowView,
  type AiPhase,
  type DossierRow,
  type RowState,
  type RowView,
} from "./aiHeroSceneData";

/**
 * Pièces de la scène du hero de /agents-ia (V3), partagées ordinateur / téléphone :
 * l'iPhone et ses écrans, le dossier actif, la zone de travail, le flux bloqué, le
 * résumé final. Aucune horloge ici : chaque pièce reçoit la phase ; les temps internes
 * d'une phase passent par des `delay` Motion ou par `useAfter` (un seul setTimeout).
 */

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Entrée standard, retardée de `d` secondes ; figée quand l'animation est coupée. */
export function enter(fresh: boolean, d = 0, y = 6) {
  return {
    initial: fresh ? { opacity: 0, y } : false,
    animate: { opacity: 1, y: 0 },
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

/** La valeur, avec `ms` de retard sur ses changements (0 = immédiat). */
function useLagged<T>(value: T, ms: number, enabled: boolean): T {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setShown(value), enabled ? Math.max(ms, 0) : 0);
    return () => window.clearTimeout(t);
  }, [value, ms, enabled]);
  return !enabled || ms <= 0 ? value : shown;
}

// ─── L'iPhone ────────────────────────────────────────────────────────────────

export const PHONE_SHADOW =
  "0 2px 4px color-mix(in oklab, var(--color-ink) 18%, transparent), 0 30px 60px -24px color-mix(in oklab, var(--color-ink) 55%, transparent), 0 70px 110px -60px color-mix(in oklab, var(--color-accent-dark) 45%, transparent)";

/** Un iPhone sobre : cadre, îlot, barre d'état. L'écran est une surface papier. */
export function PhoneFrame({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("rounded-[44px] bg-ink p-[8px] ring-1 ring-ink/40", className)} style={{ boxShadow: PHONE_SHADOW, ...style }}>
      <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-paper">
        <div className="absolute left-1/2 top-[9px] z-20 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-ink" />
        <div className="relative z-10 flex h-[40px] items-center justify-between px-6 pt-1 text-[11px] font-semibold text-ink">
          <span>{REQUEST.time}</span>
          <span className="flex items-center gap-1" aria-hidden>
            <Signal size={11} strokeWidth={2.4} />
            <Wifi size={11} strokeWidth={2.4} />
            <BatteryFull size={14} strokeWidth={2} />
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 top-[40px]">{children}</div>
        <div className="absolute bottom-[7px] left-1/2 z-20 h-[4px] w-[92px] -translate-x-1/2 rounded-full bg-ink/80" />
      </div>
    </div>
  );
}

export type PhoneScreenId = "idle" | "call" | "chat" | "doc" | "decision" | "wait" | "validate" | "done";

/** L'écran affiché, avec un fondu glissé d'un contexte à l'autre (jamais de coupe sèche). */
export function PhoneScreens({ screen, fresh }: { screen: PhoneScreenId; fresh: boolean }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={screen}
        className="absolute inset-0 px-4 pb-6"
        initial={fresh ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={fresh ? { opacity: 0, y: -10 } : undefined}
        transition={{ duration: fresh ? 0.45 : 0, ease: EASE }}
      >
        {screen === "idle" && <IdleScreen />}
        {screen === "call" && <CallScreen fresh={fresh} />}
        {screen === "chat" && <ChatScreen fresh={fresh} />}
        {screen === "doc" && <DocScreen fresh={fresh} />}
        {screen === "decision" && <DecisionScreen fresh={fresh} />}
        {screen === "wait" && <WaitScreen fresh={fresh} />}
        {screen === "validate" && <ValidateScreen fresh={fresh} />}
        {screen === "done" && <DoneScreen fresh={fresh} />}
      </motion.div>
    </AnimatePresence>
  );
}

function IdleScreen() {
  return (
    <div className="flex h-full flex-col items-center pt-16 text-center">
      <p className="text-[44px] font-light leading-none tracking-tight text-ink">{REQUEST.time}</p>
      <p className="mt-2 text-[12px] text-ink-3">Mardi</p>
    </div>
  );
}

/** La ligne d'historique qui remplace l'appel une fois terminé ; elle reste en tête. */
function CallHistory() {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-paper-2 px-2.5 py-1.5">
      <PhoneCall size={12} strokeWidth={2} className="shrink-0 text-accent-dark" aria-hidden />
      <div className="min-w-0 leading-tight">
        <p className="text-[10.5px] font-semibold text-ink">Appel entrant</p>
        <p className="font-mono text-[9.5px] text-ink-3">
          {REQUEST.time} · {REQUEST.callLength}
        </p>
      </div>
    </div>
  );
}

function CallScreen({ fresh }: { fresh: boolean }) {
  const after = useAfter(CALL_END_AT * 1000, fresh);
  const ended = fresh && after;
  return (
    <div className="relative h-full">
      <AnimatePresence initial={false}>
        {!ended ? (
          <motion.div key="live" exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.4, ease: EASE }} className="absolute inset-0">
            <div className="flex flex-col items-center pt-3 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-primary/12 text-[15px] font-semibold text-accent-dark">CL</span>
              <p className="mt-2 text-[15px] font-semibold text-ink">{REQUEST.contact}</p>
              <p className="text-[11.5px] text-ink-3">{REQUEST.company}</p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-2.5 py-1 text-[10.5px] font-medium text-ink-2">
                <PhoneCall size={10} strokeWidth={2.2} className="text-accent-dark" aria-hidden />
                L&apos;assistant répond
              </p>
            </div>
            <p className="mt-5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink-3">Transcription</p>
            <div className="mt-2 space-y-1 text-[12.5px] leading-snug text-ink-2">
              {TRANSCRIPT.map((line, i) => (
                <motion.p key={i} {...enter(fresh, line.at, 4)}>
                  {line.parts.map((part, j) =>
                    part.key ? (
                      <span key={j} className="rounded-[4px] bg-accent-primary/10 px-0.5 font-semibold text-ink">
                        {part.t}
                      </span>
                    ) : (
                      <span key={j}>{part.t}</span>
                    ),
                  )}
                </motion.p>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="ended" {...enter(fresh, 0.15)} className="absolute inset-0 pt-2">
            <CallHistory />
            <div className="mt-24 flex flex-col items-center text-center">
              <CheckCircle2 size={22} strokeWidth={1.8} className="text-cyan" aria-hidden />
              <p className="mt-2 text-[13px] font-semibold text-ink">Appel terminé</p>
              <p className="mt-0.5 text-[11.5px] text-ink-3">dossier {REQUEST.ref} ouvert</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChatScreen({ fresh }: { fresh: boolean }) {
  return (
    <div className="pt-2">
      <CallHistory />
      <p className="mt-4 flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink-3">
        <MessageSquareText size={11} strokeWidth={2} aria-hidden />
        {CHAT.channel}
      </p>
      <motion.div {...enter(fresh, 0.3)} className="mt-3 max-w-[88%] rounded-2xl rounded-bl-md bg-paper-3 px-3 py-2 text-[12.5px] leading-snug text-ink">
        {CHAT.question}
      </motion.div>
      <motion.div {...enter(fresh, 1.1)} className="ml-auto mt-3 max-w-[80%] rounded-2xl rounded-br-md bg-accent-primary px-3 py-2 text-[12.5px] leading-snug text-paper">
        {CHAT.answer}
      </motion.div>
      <motion.p {...enter(fresh, 1.6, 3)} className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-ink-3">
        <BookOpen size={10} strokeWidth={2} className="text-cyan" aria-hidden />
        Source · {CHAT.source}
      </motion.p>
    </div>
  );
}

function DocScreen({ fresh }: { fresh: boolean }) {
  return (
    <div className="pt-2">
      <CallHistory />
      <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-paper-line-strong">
        <div className="flex items-center gap-2 border-b border-paper-line bg-paper-2 px-3 py-2">
          <FileText size={12} strokeWidth={2} className="text-accent-dark" aria-hidden />
          <p className="font-mono text-[10px] text-ink-2">{DOC.name}</p>
        </div>
        <div className="space-y-2 px-3 py-3">
          <p className="text-[12px] font-semibold text-ink">Tarifs 2026</p>
          <span className="block h-1.5 w-4/5 rounded-full bg-paper-3" />
          <span className="block h-1.5 w-3/5 rounded-full bg-paper-3" />
          {DOC.lines.map((l, i) => (
            <div key={l.label} className="relative flex items-center justify-between rounded-md px-1.5 py-1 text-[11.5px]">
              {l.key && (
                <motion.span
                  aria-hidden
                  className={cn("absolute inset-0 origin-left rounded-md", l.key === "remise" ? "bg-warning/15" : "bg-cyan/15")}
                  initial={fresh ? { scaleX: 0 } : false}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: fresh ? 0.5 : 0, delay: fresh ? (i === 0 ? 0.6 : 1.3) : 0, ease: EASE }}
                />
              )}
              <span className="relative text-ink-2">{l.label}</span>
              <span className="relative font-semibold text-ink">{l.value}</span>
            </div>
          ))}
          <span className="block h-1.5 w-2/3 rounded-full bg-paper-3" />
        </div>
      </div>
    </div>
  );
}

/** Téléphone seulement : la décision posée sur l'écran. */
function DecisionScreen({ fresh }: { fresh: boolean }) {
  return (
    <div className="pt-2">
      <CallHistory />
      <motion.div {...enter(fresh, 0.3)} className="mt-4 rounded-xl border-l-2 border-warning bg-warning/[0.08] px-3 py-3">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-warning-ink">
          <TriangleAlert size={11} strokeWidth={2.2} aria-hidden />
          Votre décision
        </p>
        <dl className="mt-2 space-y-1.5">
          {DECISION.map((d) => (
            <div key={d.label} className="flex items-baseline justify-between gap-2 text-[11.5px]">
              <dt className="text-ink-2">{d.label}</dt>
              <dd className={cn("font-semibold", d.strong ? "text-accent-dark" : "text-ink")}>{d.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
      <motion.p {...enter(fresh, 1.1)} className="mt-3 flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
        <LockKeyhole size={12} strokeWidth={2.2} className="text-accent-dark" aria-hidden />
        Rien n&apos;est envoyé sans votre accord.
      </motion.p>
    </div>
  );
}

function WaitScreen({ fresh }: { fresh: boolean }) {
  return (
    <div className="pt-2">
      <CallHistory />
      <motion.div {...enter(fresh, 1.8)} className="mt-6 rounded-2xl bg-paper-2 px-3 py-3 ring-1 ring-paper-line">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold text-ink-3">
          <Workflow size={11} strokeWidth={2} aria-hidden />
          Assistant · maintenant
        </p>
        <p className="mt-1 text-[12.5px] font-semibold leading-snug text-ink">Validation demandée</p>
        <p className="text-[11.5px] leading-snug text-ink-2">Une remise dépasse votre règle.</p>
      </motion.div>
    </div>
  );
}

function ValidateScreen({ fresh }: { fresh: boolean }) {
  const tapped = useAfter(VALIDATE_TAP_AT * 1000, fresh);
  return (
    <div className="flex h-full flex-col pt-2">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold text-ink-3">
        <Workflow size={11} strokeWidth={2} aria-hidden />
        Assistant · dossier {REQUEST.ref}
      </p>
      <p className="mt-1.5 text-[15px] font-semibold leading-snug text-ink">3 actions attendent votre validation</p>
      <ol className="mt-3 space-y-2">
        {TO_VALIDATE.map((a, i) => (
          <li key={a} className="flex items-start gap-2 rounded-xl bg-paper-2 px-2.5 py-2 text-[12px] leading-snug text-ink">
            <Check fresh={fresh} delay={VALIDATE_CHECK_AT[i]} />
            {a}
          </li>
        ))}
      </ol>
      <div className="mt-auto pb-2">
        <motion.div
          className={cn(
            "flex h-10 items-center justify-center gap-1.5 rounded-xl text-[13px] font-semibold text-paper transition-colors duration-300",
            tapped ? "bg-accent-dark" : "bg-accent-primary",
          )}
          animate={fresh && tapped ? { scale: [0.95, 1] } : { scale: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {tapped && <CheckCircle2 size={14} strokeWidth={2.2} aria-hidden />}
          {tapped ? "Validé" : "Tout valider"}
        </motion.div>
      </div>
    </div>
  );
}

/** Un cercle vide qui se coche doucement. */
function Check({ fresh, delay, bg = "bg-paper-2" }: { fresh: boolean; delay: number; bg?: string }) {
  return (
    <span className="relative mt-px h-[15px] w-[15px] shrink-0">
      <CircleDashed size={15} strokeWidth={1.8} className="absolute inset-0 text-ink-3" aria-hidden />
      <motion.span
        className={cn("absolute inset-0 rounded-full", bg)}
        initial={fresh ? { opacity: 0, scale: 0.7 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: fresh ? 0.35 : 0, delay: fresh ? delay : 0, ease: EASE }}
      >
        <CheckCircle2 size={15} strokeWidth={2} className="text-accent-primary" aria-hidden />
      </motion.span>
    </span>
  );
}

const DONE: { icon: LucideIcon; text: string }[] = [
  { icon: PhoneCall, text: "09:14 · Appel entrant" },
  { icon: MessageSquareText, text: "09:15 · Zone confirmée" },
  { icon: CheckCircle2, text: "09:21 · 3 actions validées" },
  { icon: Send, text: "09:22 · Confirmation envoyée" },
];

function DoneScreen({ fresh }: { fresh: boolean }) {
  return (
    <div className="pt-2">
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink-3">Dossier {REQUEST.ref}</p>
      <p className="mt-1 text-[15px] font-semibold text-ink">{REQUEST.contact}</p>
      <ol className="mt-3 space-y-1.5">
        {DONE.map(({ icon: Icon, text }, i) => (
          <motion.li key={text} {...enter(fresh, 0.2 + i * 0.12, 3)} className="flex items-center gap-2 rounded-lg bg-paper-2 px-2.5 py-1.5 font-mono text-[10px] text-ink-2">
            <Icon size={11} strokeWidth={2} className={i === 3 ? "text-cyan" : "text-accent-dark"} aria-hidden />
            {text}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

// ─── Le dossier actif ────────────────────────────────────────────────────────

const STATE_ICON: Record<RowState, { icon: LucideIcon; className: string }> = {
  recu: { icon: CircleDashed, className: "text-ink-3" },
  compris: { icon: CircleCheck, className: "text-ink-3" },
  verifie: { icon: ShieldCheck, className: "text-cyan" },
  avalider: { icon: TriangleAlert, className: "text-warning" },
  valide: { icon: CheckCircle2, className: "text-accent-primary" },
};

/**
 * Le dossier : six lignes qui naissent pendant l'appel, puis changent d'état sur place.
 * `compact` = version téléphone (deux colonnes, sans source).
 */
export function Dossier({ phase, fresh, compact = false }: { phase: AiPhase; fresh: boolean; compact?: boolean }) {
  return (
    <dl className={cn(compact && "grid grid-cols-2 gap-x-4")}>
      <AnimatePresence initial={false}>
        {phase >= 1 &&
          DOSSIER_ROWS.map((row) => (
            <motion.div
              key={row.key}
              initial={fresh ? { opacity: 0, x: -8 } : false}
              animate={{ opacity: 1, x: 0 }}
              exit={fresh ? { opacity: 0, transition: { duration: 0.35 } } : undefined}
              transition={{ duration: fresh ? 0.45 : 0, delay: fresh && phase === 1 ? row.at : 0, ease: EASE }}
            >
              <Row row={row} phase={phase} fresh={fresh} compact={compact} />
            </motion.div>
          ))}
      </AnimatePresence>
    </dl>
  );
}

function Row({ row, phase, fresh, compact }: { row: DossierRow; phase: AiPhase; fresh: boolean; compact: boolean }) {
  const target = rowView(row.key, phase);
  const lagged = useLagged(phase, target.delay * 1000, fresh);
  const v = rowView(row.key, lagged);
  const s = STATE_ICON[v.state];
  const Icon = s.icon;
  const tone = v.state === "avalider" ? "text-warning-ink" : v.state === "valide" ? "text-accent-dark" : v.state === "verifie" ? "text-ink-2" : "text-ink-3";

  if (compact) {
    return (
      <div className={cn("border-b py-1.5 transition-colors duration-500", v.state === "avalider" ? "border-warning/60" : "border-paper-line")}>
        <dt className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">{row.label}</dt>
        <dd className="flex min-w-0 items-center gap-1 text-[12px] font-semibold text-ink">
          <Icon size={11} strokeWidth={2.2} className={cn("shrink-0", s.className)} aria-hidden />
          <span className="truncate">
            <Value v={v} fresh={fresh} />
          </span>
        </dd>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative grid h-[44px] grid-cols-[74px_minmax(0,1fr)_16px] items-center gap-2 border-b border-paper-line pl-2.5 pr-1 transition-colors duration-500",
        v.state === "avalider" && "bg-warning/[0.07]",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1.5 left-0 w-[2px] rounded-full transition-colors duration-500",
          v.state === "avalider" ? "bg-warning" : v.state === "valide" ? "bg-accent-primary" : "bg-transparent",
        )}
      />
      <dt className="text-[11.5px] text-ink-3">{row.label}</dt>
      <dd className="min-w-0">
        <p className="truncate text-[14px] font-semibold leading-tight text-ink">
          <Value v={v} fresh={fresh} />
        </p>
        <AnimatePresence initial={false} mode="wait">
          {v.note && (
            <motion.p key={v.note} {...enter(fresh, 0, 2)} exit={{ opacity: 0 }} className={cn("truncate text-[10.5px] leading-tight", tone)}>
              {v.note}
              {v.source && <span className="text-ink-3"> · {v.source}</span>}
            </motion.p>
          )}
        </AnimatePresence>
      </dd>
      <AnimatePresence initial={false} mode="wait">
        <motion.span key={v.state} {...enter(fresh, 0, 0)} exit={{ opacity: 0 }}>
          <Icon size={15} strokeWidth={2} className={s.className} aria-hidden />
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function Value({ v, fresh }: { v: RowView; fresh: boolean }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.span key={v.value} {...enter(fresh, 0, 4)} exit={{ opacity: 0, y: -4 }} className="inline-block">
        {v.was && <span className="mr-1.5 font-normal text-ink-3 line-through">{v.was}</span>}
        {v.value}
      </motion.span>
    </AnimatePresence>
  );
}

// ─── La zone de travail (à droite du dossier) ───────────────────────────────

function Label({ children, tone = "text-ink-3" }: { children: ReactNode; tone?: string }) {
  return <p className={cn("text-[10px] font-semibold uppercase tracking-[0.16em]", tone)}>{children}</p>;
}

function SourceChip({ name, detail }: { name: string; detail?: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-paper px-3 py-2.5 ring-1 ring-paper-line">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan/15 text-ink" aria-hidden>
        <BookOpen size={13} strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="truncate font-mono text-[11px] text-ink">{name}</p>
        {detail && <p className="text-[10.5px] text-ink-3">{detail}</p>}
      </div>
    </div>
  );
}

/** Ce que l'assistant fait de la demande, phase par phase ; une seule chose à la fois. */
export function WorkZone({ phase, fresh }: { phase: AiPhase; fresh: boolean }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={phase === 7 ? 6 : phase}
        className="absolute inset-0 px-5 py-5"
        initial={fresh ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        exit={fresh ? { opacity: 0, transition: { duration: 0.25 } } : undefined}
        transition={{ duration: fresh ? 0.35 : 0, delay: fresh ? 0.15 : 0 }}
      >
        {phase === 0 && <Label>En attente d&apos;une demande</Label>}
        {phase === 1 && <Listening fresh={fresh} />}
        {phase === 2 && (
          <>
            <Label>Source utilisée</Label>
            <motion.div {...enter(fresh, 1.5)} className="mt-3">
              <SourceChip name="zones-intervention.pdf" detail="page 2" />
              <p className="mt-3 text-[12.5px] leading-snug text-ink-2">
                Villeurbanne, zone 1 : <span className="font-semibold text-ink">couverte</span>.
              </p>
            </motion.div>
          </>
        )}
        {phase === 3 && <Compare fresh={fresh} />}
        {phase === 4 && <Decision fresh={fresh} />}
        {phase === 5 && <Validated fresh={fresh} />}
        {phase >= 6 && <Journal fresh={fresh} />}
      </motion.div>
    </AnimatePresence>
  );
}

function Listening({ fresh }: { fresh: boolean }) {
  return (
    <>
      <Label>En cours</Label>
      <p className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-ink">
        <PhoneCall size={14} strokeWidth={2} className="text-accent-dark" aria-hidden />
        Appel · {REQUEST.time}
      </p>
      <p className="mt-1.5 text-[12.5px] leading-snug text-ink-2">Il écoute, puis range chaque information dans le dossier.</p>
      <motion.p {...enter(fresh, 4.5)} className="mt-5 flex items-center gap-2 text-[12.5px] text-ink">
        <CircleCheck size={14} strokeWidth={2} className="text-cyan" aria-hidden />
        6 informations retenues
      </motion.p>
    </>
  );
}

function Compare({ fresh }: { fresh: boolean }) {
  return (
    <>
      <Label>Vérification</Label>
      <motion.div {...enter(fresh, 0.3)} className="mt-3">
        <SourceChip name={DOC.name} detail="grille tarifaire" />
      </motion.div>
      <dl className="mt-4 space-y-2">
        {[COMPARE.asked, COMPARE.rule].map((c, i) => (
          <motion.div key={c.label} {...enter(fresh, 1.2 + i * 0.5)} className="flex items-baseline justify-between gap-3 border-b border-paper-line pb-2">
            <dt className="text-[12px] text-ink-2">{c.label}</dt>
            <dd className="text-[15px] font-semibold text-ink">{c.value}</dd>
          </motion.div>
        ))}
      </dl>
      <motion.p {...enter(fresh, 2.6)} className="mt-4 flex items-center gap-2 rounded-lg bg-warning/[0.09] px-3 py-2 text-[12.5px] font-semibold text-warning-ink">
        <TriangleAlert size={14} strokeWidth={2.2} aria-hidden />
        Décision nécessaire
      </motion.p>
    </>
  );
}

function Decision({ fresh }: { fresh: boolean }) {
  return (
    <>
      <Label tone="text-warning-ink">Votre décision</Label>
      <dl className="mt-3 space-y-2.5">
        {DECISION.map((d, i) => (
          <motion.div key={d.label} {...enter(fresh, 0.2 + i * 0.3)} className="flex items-baseline justify-between gap-3">
            <dt className="text-[12px] text-ink-2">{d.label}</dt>
            <dd className={cn("text-[15px] font-semibold", d.strong ? "text-accent-dark" : "text-ink")}>{d.value}</dd>
          </motion.div>
        ))}
      </dl>
      <motion.p {...enter(fresh, 1.3)} className="mt-4 flex items-center gap-2 border-t border-paper-line pt-3 text-[12.5px] font-semibold text-ink">
        <LockKeyhole size={14} strokeWidth={2.2} className="text-accent-dark" aria-hidden />
        Rien n&apos;est envoyé sans votre accord.
      </motion.p>
    </>
  );
}

function Validated({ fresh }: { fresh: boolean }) {
  const done = useAfter(2600, fresh);
  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        <motion.div key={done ? "ok" : "wait"} {...enter(fresh, 0, 3)} exit={{ opacity: 0 }}>
          {done ? <Label tone="text-accent-dark">Validé par vous · 09:21</Label> : <Label>En attente de vous</Label>}
        </motion.div>
      </AnimatePresence>
      <ol className="mt-3 space-y-2">
        {TO_VALIDATE.map((a, i) => (
          <li key={a} className="flex items-start gap-2 text-[12.5px] leading-snug text-ink">
            <Check fresh={fresh} delay={VALIDATE_CHECK_AT[i] + 0.1} bg="bg-paper-2" />
            {a}
          </li>
        ))}
      </ol>
    </>
  );
}

function Journal({ fresh }: { fresh: boolean }) {
  return (
    <>
      <Label>Journal</Label>
      <ol className="mt-2.5">
        {JOURNAL.map((j, i) => (
          <motion.li key={j.text} {...enter(fresh, 0.15 + i * 0.16, 3)} className="flex items-baseline gap-3 border-b border-paper-line py-[5px] last:border-0">
            <span className="w-9 shrink-0 font-mono text-[10.5px] text-ink-3">{j.time}</span>
            <span className="text-[12px] text-ink">{j.text}</span>
          </motion.li>
        ))}
      </ol>
    </>
  );
}

/** Minimal : l'histoire entière en quatre lignes fixes. */
export function StaticStory() {
  return (
    <div className="absolute inset-0 px-5 py-5">
      <Label>Ce qui s&apos;est passé</Label>
      <ol className="mt-3 space-y-2.5">
        {STATIC_STORY.map((s) => (
          <li key={s.text} className="flex items-baseline gap-3">
            <span className="w-9 shrink-0 font-mono text-[10.5px] text-ink-3">{s.time}</span>
            <span className="text-[12.5px] leading-snug text-ink">{s.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Le flux, avec le verrou humain ─────────────────────────────────────────

/** Demande → compréhension → préparation → [vous] → action. Ouvert après la validation. */
export function FlowStrip({ open, fresh }: { open: boolean; fresh: boolean }) {
  return (
    <ol className="flex items-center gap-1.5" aria-hidden>
      {FLOW.map((f, i) => {
        const you = f === "Vous";
        const last = i === FLOW.length - 1;
        return (
          <li key={f} className="flex items-center gap-1.5">
            {i > 0 && <span className={cn("h-px w-4 transition-colors duration-500", last && !open ? "bg-paper-line-strong" : "bg-accent-primary/50")} />}
            {you ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-primary px-2.5 py-1 text-[11px] font-semibold text-paper">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span key={open ? "o" : "c"} {...enter(fresh, 0, 0)} exit={{ opacity: 0 }}>
                    {open ? <LockKeyholeOpen size={11} strokeWidth={2.4} /> : <LockKeyhole size={11} strokeWidth={2.4} />}
                  </motion.span>
                </AnimatePresence>
                Vous
              </span>
            ) : (
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-[11px] font-medium transition-colors duration-500",
                  last ? (open ? "bg-cyan/15 text-ink" : "border border-dashed border-paper-line-strong text-ink-3") : "text-ink-2",
                )}
              >
                {f}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ─── Fin de boucle ───────────────────────────────────────────────────────────

export function Summary({ fresh }: { fresh: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.p {...enter(fresh, 0.1)} className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-3">
        <CheckCircle2 size={14} strokeWidth={2.2} className="text-cyan" aria-hidden />
        Dossier traité
      </motion.p>
      <motion.p {...enter(fresh, 0.25)} className="mt-3 text-[24px] font-semibold tracking-tight text-ink">
        {REQUEST.contact}
      </motion.p>
      <ul className="mt-4 space-y-1.5">
        {SUMMARY.map((s, i) => (
          <motion.li key={s} {...enter(fresh, 0.4 + i * 0.12, 3)} className="flex items-center justify-center gap-2 text-[14px] text-ink-2">
            <CheckCircle2 size={14} strokeWidth={2} className="text-accent-primary" aria-hidden />
            {s}
          </motion.li>
        ))}
      </ul>
      <motion.p {...enter(fresh, 0.9)} className="mt-5 flex items-center gap-2 text-[14px] font-semibold text-ink">
        <History size={15} strokeWidth={2} className="text-accent-dark" aria-hidden />
        Tout est tracé.
      </motion.p>
    </div>
  );
}

// ─── Destinations (étape 6 seulement) ───────────────────────────────────────

export const DEST_ICON: Record<string, LucideIcon> = {
  agenda: CalendarDays,
  clients: Contact,
  mail: Send,
  metier: Workflow,
};
