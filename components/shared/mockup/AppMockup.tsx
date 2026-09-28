"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { CalendarDays, Check, Circle, CircleCheck, Clock, Clock3, Send, TriangleAlert, type LucideIcon } from "lucide-react";
import { useInViewPause } from "@/lib/animation/inViewPause";

/**
 * Boîte à outils « maquette d'application » : surface claire « papier »
 * (tokens paper / ink de globals.css) posée sur le site sombre, pour montrer
 * un outil tel que le client le verrait.
 *
 * Utilisée par les tableaux de bord sectoriels (/applications) et par les
 * assistants par profil (/agents-ia). Règles : données d'exemple uniquement,
 * mention « Maquette » visible, aucun nom réel de client, sigles doublés d'un
 * mot simple. Animations en transform / opacity uniquement ; `reduced` →
 * rendu statique (aussi avant hydratation).
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type Tone = "ok" | "warn" | "alert" | "info" | "cyan" | "neutral";
export type Accent = "cyan" | "info" | "ok" | "warn";

export type Kpi = { label: string; value: string; sub: string; tone?: Tone; icon?: LucideIcon };
export type Bar = { label: string; value: number; display: string; tone?: Tone };
export type HRow = { label: string; pct: number; value: string; tone?: Tone; note?: string };
export type TableRow = { cells: string[]; status: string; tone: Tone };
export type FeedItem = { time: string; text: string; tone: Tone; icon: LucideIcon; done?: string };
export type TimelineRow = { name: string; blocks: { start: number; span: number; tone: Tone }[] };
export type Vehicle = { x: number; y: number; tone: Tone };
export type Integration = { name: string; role: string; state: "live" | "sync" | "todo" };
export type CheckItem = { label: string; detail?: string; state: "done" | "progress" | "todo" };
export type Cell = { label: string; state: Tone; sub: string };
export type Stop = { time: string; label: string; state: "done" | "current" | "next" | "late" };
export type Deadline = { date: string; label: string; left: string; tone: Tone };
export type Thumb = { label: string; sub: string; tone: Tone; icon: LucideIcon };
export type FormField = { label: string; value: string; state: "auto" | "check" | "todo"; source?: string };
export type DraftMail = { to: string; subject: string; body: string; state: "ready" | "sent" | "edit" };
export type WeekCell = { day: string; items: { label: string; tone: Tone }[] };

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const TONE_DOT: Record<Tone, string> = {
  ok: "bg-success",
  warn: "bg-warning",
  alert: "bg-danger",
  info: "bg-accent-primary",
  cyan: "bg-cyan",
  neutral: "bg-ink-3",
};
export const TONE_TEXT: Record<Tone, string> = {
  ok: "text-success-ink",
  warn: "text-warning-ink",
  alert: "text-danger-ink",
  info: "text-accent-dark",
  cyan: "text-ink-2",
  neutral: "text-ink-2",
};
export const TONE_SOFT: Record<Tone, string> = {
  ok: "bg-success/15 text-success-ink",
  warn: "bg-warning/15 text-warning-ink",
  alert: "bg-danger/15 text-danger-ink",
  info: "bg-accent-primary/12 text-accent-dark",
  cyan: "bg-cyan/15 text-ink-2",
  neutral: "bg-paper-3 text-ink-2",
};
export const TONE_BAR: Record<Tone, string> = {
  ok: "bg-success",
  warn: "bg-warning",
  alert: "bg-danger",
  info: "bg-accent-primary",
  cyan: "bg-cyan",
  neutral: "bg-ink-3/35",
};
export const TONE_STROKE: Record<Tone, string> = {
  ok: "var(--color-success)",
  warn: "var(--color-warning)",
  alert: "var(--color-danger)",
  info: "var(--color-accent-primary)",
  cyan: "var(--color-cyan)",
  neutral: "var(--color-ink-3)",
};
const ACCENT_BADGE: Record<Accent, string> = {
  cyan: "bg-cyan/15 text-ink",
  info: "bg-accent-primary/12 text-accent-dark",
  ok: "bg-success/15 text-success-ink",
  warn: "bg-warning/15 text-warning-ink",
};
const ACCENT_LINE: Record<Accent, string> = {
  cyan: "bg-cyan",
  info: "bg-accent-primary",
  ok: "bg-success",
  warn: "bg-warning",
};

// ─── Reveal helpers ─────────────────────────────────────────────────────────

const listV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export function Stagger({ reduced, children }: { reduced: boolean; children: ReactNode }) {
  return (
    <motion.div
      variants={reduced ? undefined : listV}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-40px" }}
      className="space-y-3"
    >
      {children}
    </motion.div>
  );
}

export function Item({
  reduced,
  className,
  children,
}: {
  reduced: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div variants={reduced ? undefined : itemV} className={["min-w-0", className].filter(Boolean).join(" ")}>
      {children}
    </motion.div>
  );
}

export function Row({ children, wide = "left" }: { children: ReactNode; wide?: "left" | "right" }) {
  return (
    <div
      className={`grid gap-3 ${wide === "left" ? "lg:grid-cols-[1.4fr_1fr]" : "lg:grid-cols-[1fr_1.4fr]"}`}
    >
      {children}
    </div>
  );
}

// ─── Cadre ──────────────────────────────────────────────────────────────────

export function Chrome({
  app,
  meta,
  icon: Icon,
  accent,
  nav,
  user,
  active = 0,
  children,
}: {
  app: string;
  meta: string;
  icon: LucideIcon;
  accent: Accent;
  nav: string[];
  user: string;
  /** Onglet actif de la navigation (le premier par défaut). */
  active?: number;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-paper-2 text-ink ring-1 ring-border-medium">
      <div className={`h-1 ${ACCENT_LINE[accent]}`} aria-hidden />
      <div className="flex items-center gap-3 bg-paper px-4 py-3 sm:px-5">
        <span className="hidden gap-1.5 sm:flex" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </span>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${ACCENT_BADGE[accent]}`}>
          <Icon size={16} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold leading-tight text-ink">{app}</p>
          <p className="truncate text-[11px] text-ink-3">{meta}</p>
        </div>
        <span className="ml-auto hidden shrink-0 rounded-full border border-paper-line bg-paper-2 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-2 md:inline-flex">
          Maquette · données d&apos;exemple
        </span>
        <span
          aria-hidden
          className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-primary to-cyan text-[10px] font-bold text-paper md:ml-0"
        >
          {user}
        </span>
      </div>
      {/* Navigation propre au métier */}
      <div className="flex gap-4 overflow-x-auto border-b border-paper-line bg-paper px-4 sm:px-5" aria-hidden>
        {nav.map((n, i) => (
          <span
            key={n}
            className={`relative shrink-0 py-2 text-[11px] ${i === active ? "font-semibold text-ink" : "text-ink-3"}`}
          >
            {n}
            {i === active && <span className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full ${ACCENT_LINE[accent]}`} />}
          </span>
        ))}
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}

// ─── Widgets ────────────────────────────────────────────────────────────────

export function KpiRow({ items, reduced }: { items: Kpi[]; reduced: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((k) => {
        const Icon = k.icon;
        const tone = k.tone ?? "neutral";
        return (
          <Item
            key={k.label}
            reduced={reduced}
            className="rounded-xl border border-paper-line bg-paper px-3.5 py-3"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-ink-3">
                {k.label}
              </p>
              {Icon && <Icon size={14} className="shrink-0 text-ink-3" aria-hidden />}
            </div>
            <p className="mt-2 text-[22px] font-semibold leading-none tracking-tight text-ink">
              {k.value}
            </p>
            <p className={`mt-2 flex items-start gap-1.5 text-[11px] leading-snug ${TONE_TEXT[tone]}`}>
              <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[tone]}`} aria-hidden />
              <span>{k.sub}</span>
            </p>
          </Item>
        );
      })}
    </div>
  );
}

export function Panel({
  title,
  aside,
  children,
  className = "",
}: {
  title: string;
  aside?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-paper-line bg-paper p-3.5 sm:p-4 ${className}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="min-w-0 text-[12px] font-semibold leading-snug text-ink">{title}</p>
        {aside && <span className="max-w-[45%] shrink-0 text-right text-[10px] leading-snug text-ink-3">{aside}</span>}
      </div>
      {children}
    </div>
  );
}

/** Icône par défaut d'un statut sobre : l'état se lit sans dépendre de la couleur. */
const QUIET_ICON: Record<Tone, LucideIcon> = {
  ok: Check,
  warn: Clock3,
  alert: TriangleAlert,
  info: Clock3,
  cyan: Check,
  neutral: CalendarDays,
};
/** Variante sobre : tout se lit en encre, l'icône porte l'état (aucun vert lumineux). */
const QUIET_TEXT: Record<Tone, string> = {
  ok: "text-ink",
  warn: "text-ink-2",
  alert: "text-danger-ink",
  info: "text-ink-2",
  cyan: "text-ink-2",
  neutral: "text-ink-2",
};

export type PillAppearance = "dot" | "quiet";

export function StatusPill({
  tone,
  appearance = "dot",
  icon,
  children,
}: {
  tone: Tone;
  /** `quiet` : badge rectangulaire à icône, sans point coloré (accueil). */
  appearance?: PillAppearance;
  /** Icône explicite du statut (envoi, planification…), sinon celle du ton. */
  icon?: LucideIcon;
  children: ReactNode;
}) {
  if (appearance === "quiet") {
    const Icon = icon ?? QUIET_ICON[tone];
    return (
      <span
        className={`inline-flex max-w-full items-center gap-1.5 truncate rounded-md border border-paper-line bg-paper-2 px-1.5 py-0.5 text-[10px] font-semibold ${QUIET_TEXT[tone]}`}
      >
        <Icon size={11} strokeWidth={2.25} className="shrink-0" aria-hidden />
        <span className="truncate">{children}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex max-w-full items-center gap-1 truncate rounded-full px-2 py-0.5 text-[10px] font-semibold ${TONE_SOFT[tone]}`}
    >
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${TONE_DOT[tone]}`} aria-hidden />
      <span className="truncate">{children}</span>
    </span>
  );
}

/** Icône de statut déduite du libellé (envoyé, planifié…), pour les tableaux. */
export function statusIcon(label: string): LucideIcon | undefined {
  const l = label.toLowerCase();
  if (l.startsWith("envoy")) return Send;
  if (l.startsWith("planifi")) return CalendarDays;
  if (l.startsWith("en cours")) return Clock;
  return undefined;
}

export function BarChart({
  bars,
  max,
  target,
  targetLabel,
  reduced,
}: {
  bars: Bar[];
  max: number;
  target?: number;
  targetLabel?: string;
  reduced: boolean;
}) {
  return (
    <div>
      <div className="relative flex h-28 items-end gap-2">
        {target !== undefined && (
          <div
            aria-hidden
            className="absolute inset-x-0 border-t border-dashed border-ink-3/60"
            style={{ bottom: `${(target / max) * 100}%` }}
          />
        )}
        {bars.map((b, i) => {
          const pct = Math.max(4, Math.round((b.value / max) * 100));
          return (
            <div key={b.label} className="flex h-full flex-1 flex-col justify-end">
              <span className="mb-1 text-center text-[10px] font-medium text-ink-2">{b.display}</span>
              <motion.span
                className={`block w-full rounded-t-md ${TONE_BAR[b.tone ?? "info"]}`}
                style={{ height: `${pct}%`, transformOrigin: "bottom" }}
                initial={reduced ? false : { scaleY: 0 }}
                animate={reduced ? undefined : { scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.08 * i, ease: EASE }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex gap-2">
        {bars.map((b) => (
          <span key={b.label} className="flex-1 truncate text-center text-[10px] text-ink-3">
            {b.label}
          </span>
        ))}
      </div>
      {target !== undefined && targetLabel && (
        <p className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-ink-3">
          <span aria-hidden className="inline-block w-4 border-t border-dashed border-ink-3/70" />
          {targetLabel}
        </p>
      )}
    </div>
  );
}

export function HBars({ rows, reduced }: { rows: HRow[]; reduced: boolean }) {
  return (
    <ul className="space-y-2.5">
      {rows.map((r, i) => (
        <li key={r.label}>
          <div className="flex items-center gap-3">
            <span className="w-24 shrink-0 truncate text-[11px] font-medium text-ink-2">{r.label}</span>
            <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-paper-3">
              <motion.span
                className={`absolute inset-y-0 left-0 rounded-full ${TONE_BAR[r.tone ?? "info"]}`}
                style={{ width: `${r.pct}%`, transformOrigin: "left" }}
                initial={reduced ? false : { scaleX: 0 }}
                animate={reduced ? undefined : { scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.08 * i, ease: EASE }}
              />
            </div>
            <span className="w-14 shrink-0 text-right font-mono text-[11px] text-ink">{r.value}</span>
          </div>
          {r.note && <p className="ml-[6.75rem] mt-0.5 text-[10px] text-ink-3">{r.note}</p>}
        </li>
      ))}
    </ul>
  );
}

export function Ring({
  pct,
  label,
  sub,
  tone = "info",
  reduced,
}: {
  pct: number;
  label: string;
  sub: string;
  tone?: Tone;
  reduced: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <svg width="88" height="88" viewBox="0 0 88 88" className="shrink-0" aria-hidden>
        <circle cx="44" cy="44" r="35" fill="none" stroke="var(--color-paper-3)" strokeWidth="9" />
        <motion.circle
          cx="44"
          cy="44"
          r="35"
          fill="none"
          stroke={TONE_STROKE[tone]}
          strokeWidth="9"
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: pct / 100 }}
          transition={{ duration: 1.1, ease: EASE }}
        />
        <text x="44" y="49" textAnchor="middle" fontSize="15" fontWeight="600" className="fill-ink">
          {pct} %
        </text>
      </svg>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-ink">{label}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-ink-3">{sub}</p>
      </div>
    </div>
  );
}

export function Timeline({ rows, now, reduced }: { rows: TimelineRow[]; now: number; reduced: boolean }) {
  const hours = ["8 h", "10 h", "12 h", "14 h", "16 h", "18 h"];
  return (
    <div>
      <div className="mb-1 ml-[4.75rem] flex justify-between text-[10px] text-ink-3" aria-hidden>
        {hours.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-2">
            <span className="w-[4.25rem] shrink-0 truncate text-[11px] font-medium text-ink-2">{r.name}</span>
            <div className="relative h-6 flex-1 rounded-md bg-paper-3">
              {r.blocks.map((b, i) => (
                <motion.span
                  key={i}
                  className={`absolute inset-y-1 rounded ${TONE_BAR[b.tone]}`}
                  style={{ left: `${b.start}%`, width: `${b.span}%`, transformOrigin: "left" }}
                  initial={reduced ? false : { scaleX: 0, opacity: 0 }}
                  animate={reduced ? undefined : { scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE }}
                />
              ))}
              <span aria-hidden className="absolute inset-y-0 w-0.5 rounded bg-ink" style={{ left: `${now}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MiniTable({
  head,
  rows,
  widths,
  appearance = "dot",
}: {
  head: string[];
  rows: TableRow[];
  widths: string;
  appearance?: PillAppearance;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-paper-line">
      <div
        className="grid gap-2 bg-paper-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3"
        style={{ gridTemplateColumns: widths }}
      >
        {head.map((h) => (
          <span key={h} className="truncate">
            {h}
          </span>
        ))}
      </div>
      <ul className="divide-y divide-paper-line">
        {rows.map((r) => (
          <li
            key={r.cells[0]}
            className="grid items-center gap-2 px-3 py-2 text-[11.5px] text-ink"
            style={{ gridTemplateColumns: widths }}
          >
            {r.cells.map((c, i) => (
              <span key={i} className={`truncate ${i === 0 ? "font-medium" : "text-ink-2"}`}>
                {c}
              </span>
            ))}
            <StatusPill tone={r.tone} appearance={appearance} icon={statusIcon(r.status)}>
              {r.status}
            </StatusPill>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Feed({ items, appearance = "dot" }: { items: FeedItem[]; appearance?: PillAppearance }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <li key={it.time + it.text} className="flex items-start gap-2.5">
            <span className="w-9 shrink-0 pt-0.5 font-mono text-[10px] text-ink-3">{it.time}</span>
            <span
              className={
                appearance === "quiet"
                  ? "grid h-6 w-6 shrink-0 place-items-center rounded-md border border-paper-line bg-paper-2 text-ink-2"
                  : `grid h-6 w-6 shrink-0 place-items-center rounded-full ${TONE_SOFT[it.tone]}`
              }
              aria-hidden
            >
              <Icon size={12} />
            </span>
            <span className="min-w-0 flex-1 text-[11.5px] leading-snug text-ink-2">{it.text}</span>
            {it.done && (
              <span className="hidden shrink-0 sm:inline-flex">
                <StatusPill tone={it.tone} appearance={appearance}>{it.done}</StatusPill>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function Funnel({
  steps,
  reduced,
}: {
  steps: { label: string; value: string; pct: number; tone: Tone }[];
  reduced: boolean;
}) {
  return (
    <ul className="space-y-2">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-3">
          <span className="w-16 shrink-0 text-[11px] font-medium text-ink-2">{s.label}</span>
          <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-paper-3">
            <motion.span
              className={`absolute inset-y-0 left-0 rounded-md ${TONE_BAR[s.tone]}`}
              style={{ width: `${s.pct}%`, transformOrigin: "left" }}
              initial={reduced ? false : { scaleX: 0 }}
              animate={reduced ? undefined : { scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.1 * i, ease: EASE }}
            />
          </div>
          <span className="w-24 shrink-0 text-right font-mono text-[11px] text-ink">{s.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function FleetMap({ vehicles, reduced }: { vehicles: Vehicle[]; reduced: boolean }) {
  const paused = useInViewPause();
  const pulse = !reduced && !paused;
  return (
    <div>
      <svg viewBox="0 0 100 46" className="w-full rounded-lg bg-paper-2" role="img" aria-label="Carte simplifiée des véhicules en tournée">
        {["M 0 26 Q 25 16 50 28 T 100 22", "M 0 38 Q 30 34 60 38 T 100 34", "M 0 10 Q 35 4 70 14 T 100 8"].map((d) => (
          <path key={d} d={d} fill="none" stroke="var(--color-ink-3)" strokeOpacity="0.35" strokeWidth="0.5" strokeDasharray="1.2 1.6" />
        ))}
        {vehicles.map((v, i) => (
          <g key={i}>
            {v.tone === "ok" && pulse && (
              <motion.circle
                cx={v.x}
                cy={v.y}
                r={1.4}
                fill={TONE_STROKE.ok}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                animate={{ scale: [1, 2.1, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.1 }}
              />
            )}
            <motion.circle
              cx={v.x}
              cy={v.y}
              r={1.1}
              fill={TONE_STROKE[v.tone]}
              stroke="var(--color-paper)"
              strokeWidth="0.35"
              initial={reduced ? false : { opacity: 0, scale: 0 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            />
          </g>
        ))}
      </svg>
      <Legend items={[["ok", "En route"], ["cyan", "Livré"], ["warn", "Retard signalé"]]} />
    </div>
  );
}

export function Legend({ items }: { items: [Tone, string][] }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-ink-3">
      {items.map(([tone, label]) => (
        <span key={label} className="inline-flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[tone]}`} aria-hidden />
          {label}
        </span>
      ))}
    </div>
  );
}

/** Barre des outils connectés : exemples d'outils courants du métier. */
export function Integrations({ tools }: { tools: Integration[] }) {
  const dot = { live: "bg-success", sync: "bg-accent-primary", todo: "bg-ink-3" } as const;
  return (
    <div className="rounded-xl border border-paper-line bg-paper p-3.5 sm:p-4">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="text-[12px] font-semibold text-ink">Outils connectés</p>
        <span className="text-[10px] text-ink-3">exemples d&apos;outils courants du métier · les vôtres s&apos;y branchent</span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {tools.map((t) => (
          <li
            key={t.name}
            className="inline-flex items-center gap-2 rounded-lg border border-paper-line bg-paper-2 px-2.5 py-1.5"
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot[t.state]}`} aria-hidden />
            <span className="text-[11px] font-semibold text-ink">{t.name}</span>
            <span className="text-[10px] text-ink-3">{t.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Checklist({ items, appearance = "dot" }: { items: CheckItem[]; appearance?: PillAppearance }) {
  // `quiet` : tout en encre, l'icône porte l'état (aucun vert lumineux).
  const tone = appearance === "quiet" ? "text-ink-2" : "";
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.label} className="flex items-start gap-2.5">
          {it.state === "done" ? (
            <CircleCheck size={15} className={`mt-0.5 shrink-0 ${tone || "text-success-ink"}`} aria-hidden />
          ) : it.state === "progress" ? (
            <Clock3 size={15} className={`mt-0.5 shrink-0 ${tone || "text-warning-ink"}`} aria-hidden />
          ) : (
            <Circle size={15} className="mt-0.5 shrink-0 text-ink-3" aria-hidden />
          )}
          <span className="min-w-0">
            <span className={`block text-[11.5px] font-medium ${it.state === "todo" ? "text-ink-3" : "text-ink"}`}>
              {it.label}
            </span>
            {it.detail && <span className="block text-[10.5px] leading-snug text-ink-3">{it.detail}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Synoptique : une case par poste / machine, couleur = état. */
export function StatusGrid({ cells }: { cells: Cell[] }) {
  return (
    <ul className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
      {cells.map((c) => (
        <li key={c.label} className={`rounded-md px-2 py-1.5 ${TONE_SOFT[c.state]}`}>
          <span className="block truncate text-[10.5px] font-semibold">{c.label}</span>
          <span className="block truncate text-[10px] opacity-80">{c.sub}</span>
        </li>
      ))}
    </ul>
  );
}

/** Arrêts d'une tournée, de gauche à droite. */
export function Stops({ stops }: { stops: Stop[] }) {
  const tone: Record<Stop["state"], Tone> = { done: "ok", current: "info", next: "neutral", late: "warn" };
  return (
    <div className="relative">
      <div aria-hidden className="absolute left-3 right-3 top-[7px] h-px bg-paper-3" />
      <ol className="relative grid gap-1" style={{ gridTemplateColumns: `repeat(${stops.length}, minmax(0, 1fr))` }}>
        {stops.map((s) => (
          <li key={s.time} className="flex flex-col items-center text-center">
            <span
              className={`h-[15px] w-[15px] rounded-full border-2 border-paper ${TONE_DOT[tone[s.state]]} ${s.state === "current" ? "ring-2 ring-accent-primary/30" : ""}`}
              aria-hidden
            />
            <span className="mt-1.5 font-mono text-[10px] text-ink">{s.time}</span>
            <span className={`w-full truncate text-[10px] ${s.state === "next" ? "text-ink-3" : "text-ink-2"}`}>{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Deadlines({ items }: { items: Deadline[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((d) => (
        <li key={d.label} className="flex items-center gap-3 rounded-lg bg-paper-2 px-2.5 py-1.5">
          <span className="w-14 shrink-0 font-mono text-[10px] text-ink-2">{d.date}</span>
          <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink">{d.label}</span>
          <span className={`shrink-0 text-[10px] font-semibold ${TONE_TEXT[d.tone]}`}>{d.left}</span>
        </li>
      ))}
    </ul>
  );
}

/** Vignettes terrain : photo, réserve, livraison, météo… (abstraites). */
export function Thumbs({ items }: { items: Thumb[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {items.map((t) => {
        const Icon = t.icon;
        return (
          <li key={t.label} className="overflow-hidden rounded-lg border border-paper-line">
            <div className={`flex h-10 items-center justify-center ${TONE_SOFT[t.tone]}`} aria-hidden>
              <Icon size={16} />
            </div>
            <div className="px-2 py-1.5">
              <span className="block truncate text-[10.5px] font-semibold text-ink">{t.label}</span>
              <span className="block truncate text-[10px] text-ink-3">{t.sub}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Fiche remplie par l'assistant : champ, valeur, provenance, état.
 *  `badges={false}` retire la pastille d'état de chaque ligne (l'état est alors dit une fois, au niveau de la fiche). */
export function FilledForm({
  fields,
  title,
  badges = true,
  appearance = "dot",
}: {
  fields: FormField[];
  title?: string;
  badges?: boolean;
  appearance?: PillAppearance;
}) {
  const badge: Record<FormField["state"], [Tone, string]> = {
    auto: ["ok", "rempli par l'assistant"],
    check: ["warn", "à vérifier"],
    todo: ["neutral", "à compléter"],
  };
  return (
    <div className="overflow-hidden rounded-lg border border-paper-line">
      {title && (
        <div className="bg-paper-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
          {title}
        </div>
      )}
      <ul className="divide-y divide-paper-line">
        {fields.map((f) => (
          <li
            key={f.label}
            className="grid items-center gap-2 px-3 py-2 text-[11.5px]"
            style={{ gridTemplateColumns: badges ? "0.75fr 1.5fr auto" : "0.75fr 1.5fr" }}
          >
            <span className="truncate text-ink-3">{f.label}</span>
            <span className="min-w-0">
              <span className={`block truncate font-medium ${f.state === "todo" ? "text-ink-3" : "text-ink"}`}>
                {f.value}
              </span>
              {f.source && <span className="block truncate text-[10px] text-ink-3">{f.source}</span>}
            </span>
            {badges && (
              <span className="hidden sm:inline-flex">
                <StatusPill tone={badge[f.state][0]} appearance={appearance}>{badge[f.state][1]}</StatusPill>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Brouillon de message préparé par l'assistant, en attente de validation. */
export function Draft({ mail, appearance = "dot" }: { mail: DraftMail; appearance?: PillAppearance }) {
  const st: Record<DraftMail["state"], [Tone, string]> = {
    ready: ["info", "Prêt · vous validez"],
    sent: ["ok", "Envoyé"],
    edit: ["warn", "À relire"],
  };
  return (
    <div className="min-w-0 rounded-lg border border-paper-line bg-paper-2 p-3">
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="min-w-0 flex-1 text-[10.5px] text-ink-3">
          <span className="block truncate">
            À : <span className="text-ink-2">{mail.to}</span>
          </span>
          <span className="block truncate">
            Objet : <span className="font-medium text-ink">{mail.subject}</span>
          </span>
        </div>
        <StatusPill tone={st[mail.state][0]} appearance={appearance} icon={statusIcon(st[mail.state][1])}>
          {st[mail.state][1]}
        </StatusPill>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-ink-2">{mail.body}</p>
    </div>
  );
}

/** Semaine de publication : une colonne par jour. */
export function WeekGrid({ cells }: { cells: WeekCell[] }) {
  return (
    <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
      {cells.map((c) => (
        <div key={c.day} className="min-w-0 rounded-lg bg-paper-2 p-1.5">
          <p className="mb-1 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">{c.day}</p>
          <div className="space-y-1">
            {c.items.map((it) => (
              <span
                key={it.label}
                className={`block truncate rounded px-1.5 py-1 text-[10px] font-medium ${TONE_SOFT[it.tone]}`}
              >
                {it.label}
              </span>
            ))}
            {c.items.length === 0 && (
              <span className="block rounded border border-dashed border-paper-line px-1.5 py-1 text-center text-[10px] text-ink-3">
                libre
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
