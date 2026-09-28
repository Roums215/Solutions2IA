"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, CircleDot, TriangleAlert } from "lucide-react";
import { EASE } from "@/components/shared/mockup/AppMockup";
import { cn } from "@/lib/utils";
import { APP_VIEWS, CHAOS, INDICATORS, INPUTS, OUTPUTS, T, type AppStep, type RowTone } from "./appHeroSceneData";

/**
 * Les objets de la scène du hero de /applications. Touche propre à la page : des
 * interfaces papier (tokens paper / ink) posées sur la nuit du site, comme de vrais
 * écrans sur un bureau sombre. Aucun backdrop-filter (plan en preserve-3d).
 * `fresh` = la scène s'anime : les délais internes ne jouent qu'à ce moment.
 */

/** Ombre d'une feuille posée sur fond sombre : contact, puis portée. */
export const SHEET =
  "0 1px 2px color-mix(in oklab, var(--color-bg-primary) 70%, transparent), 0 22px 40px -22px color-mix(in oklab, var(--color-bg-primary) 95%, transparent)";
export const SHEET_LG =
  "0 2px 4px color-mix(in oklab, var(--color-bg-primary) 70%, transparent), 0 34px 70px -30px color-mix(in oklab, var(--color-bg-primary) 100%, transparent)";

const ease = (delay: number, duration = 0.45) => ({ duration, delay, ease: EASE });

// ─── Avant : une carte du bazar ──────────────────────────────────────────────

export function ChaosCard({ index, showTag, fresh }: { index: number; showTag: boolean; fresh: boolean }) {
  const c = CHAOS[index];
  const Icon = c.icon;
  return (
    <div className="rounded-xl bg-paper p-3 ring-1 ring-ink/10">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-paper-3 text-ink-2" aria-hidden>
          <Icon size={15} strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[11.5px] font-semibold text-ink">{c.title}</p>
          <p className="truncate text-[10px] text-ink-2">{c.meta}</p>
        </div>
      </div>
      {/* Ce que ça coûte : l'étiquette arrive après la carte */}
      <motion.p
        className="mt-2 inline-flex items-center gap-1 rounded-md bg-warning/15 px-1.5 py-0.5 text-[10px] font-semibold text-warning-ink"
        initial={false}
        animate={{ opacity: showTag ? 1 : 0, y: showTag ? 0 : 4 }}
        transition={ease(fresh && showTag ? T.chaosTag + index * T.chaosTagGap : 0, 0.35)}
      >
        <TriangleAlert size={10} strokeWidth={2.25} aria-hidden />
        {c.tag}
      </motion.p>
    </div>
  );
}

// ─── Après : les sources rangées ─────────────────────────────────────────────

export function InputChip({ index }: { index: number }) {
  const it = INPUTS[index];
  const Icon = it.icon;
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-paper px-2.5 py-2 ring-1 ring-ink/10" style={{ boxShadow: SHEET }}>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent-primary/12 text-accent-dark" aria-hidden>
        <Icon size={14} strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold text-ink">{it.label}</p>
        <p className="truncate text-[9.5px] text-ink-2">{it.becomes}</p>
      </div>
      <Check size={12} strokeWidth={2.5} className="ml-auto shrink-0 text-accent-dark" aria-hidden />
    </div>
  );
}

// ─── L'application ──────────────────────────────────────────────────────────

const TONE: Record<RowTone, string> = {
  ok: "bg-success/15 text-success-ink",
  info: "bg-accent-primary/12 text-accent-dark",
  warn: "bg-warning/18 text-warning-ink",
  neutral: "bg-paper-3 text-ink-2",
};
const TONE_ICON: Record<RowTone, typeof Check> = { ok: Check, info: CircleDot, warn: TriangleAlert, neutral: Clock3 };

/**
 * `view` : index dans APP_VIEWS (0 = vue transversale, 1 à 5 = métiers).
 * `resolved` : les statuts sont réglés (sinon : « à traiter »).
 */
export function AppWindow({
  step,
  view,
  fresh,
}: {
  step: AppStep;
  view: number;
  fresh: boolean;
}) {
  const v = APP_VIEWS[view];
  const Icon = v.icon;
  const importing = step === 2 && fresh;
  const resolved = step >= 3;
  const cycling = step === 5;

  return (
    <div className="overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/10">
      {/* En-tête : le nom de l'outil est celui de votre activité */}
      <div className="flex items-center gap-2.5 bg-ink px-4 py-3 text-paper">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-paper/10 text-cyan ring-1 ring-paper/15" aria-hidden>
          <AnimatePresence initial={false} mode="wait">
            <motion.span key={v.key} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={ease(0, 0.25)}>
              <Icon size={16} strokeWidth={1.9} />
            </motion.span>
          </AnimatePresence>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-paper/55">Votre outil</p>
          <div className="relative h-[20px] overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={v.key}
                className="absolute inset-0 truncate text-[15px] font-semibold leading-[20px]"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={ease(0, 0.3)}
              >
                {v.title}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        <span className="shrink-0 text-[8.5px] font-semibold uppercase tracking-[0.12em] text-paper/45">Maquette</span>
      </div>

      {/* Métiers : la même logique, votre vocabulaire */}
      <div className="flex gap-1 border-b border-paper-line bg-paper-2 px-3 py-1.5" aria-hidden>
        {APP_VIEWS.slice(1).map((s, i) => {
          const on = view === i + 1;
          return (
            <span
              key={s.key}
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[9.5px] font-semibold transition-colors duration-300",
                on ? "bg-ink text-cyan" : cycling ? "text-ink-2" : "text-ink-3",
              )}
            >
              {s.sector}
            </span>
          );
        })}
      </div>

      {/* Liste des dossiers */}
      <div className="px-3 pb-2 pt-2.5">
        <div className="mb-1.5 flex items-center justify-between px-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-3">
          <span>Aujourd&apos;hui</span>
          <span>Statut</span>
        </div>
        <AnimatePresence initial={false} mode="wait">
          <motion.ul
            key={v.key}
            className="space-y-1.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={ease(0, 0.3)}
          >
            {v.rows.map((r, i) => {
              const StatusIcon = TONE_ICON[r.tone];
              return (
                <motion.li
                  key={r.ref}
                  className="flex items-center gap-2 rounded-lg bg-paper px-2.5 py-2 ring-1 ring-ink/10"
                  initial={importing ? { opacity: 0, x: -10 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={ease(importing ? T.appRows + i * T.appRowGap : 0, 0.4)}
                >
                  <span className="w-10 shrink-0 font-mono text-[9.5px] text-ink-3">{r.ref}</span>
                  <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-ink">{r.label}</span>
                  <span className="relative shrink-0">
                    <motion.span
                      className={cn("inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] font-semibold", TONE[r.tone])}
                      initial={false}
                      animate={{ opacity: resolved ? 1 : 0 }}
                      transition={ease(step === 3 && fresh ? T.statusResolve + i * 0.25 : 0, 0.3)}
                    >
                      <StatusIcon size={9} strokeWidth={2.5} aria-hidden />
                      {r.status}
                    </motion.span>
                    <motion.span
                      className="absolute inset-0 inline-flex items-center justify-end text-[9.5px] text-ink-3"
                      initial={false}
                      animate={{ opacity: resolved ? 0 : 1 }}
                      transition={ease(step === 3 && fresh ? T.statusResolve + i * 0.25 : 0, 0.2)}
                    >
                      à traiter
                    </motion.span>
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>

      {/* Pied : ce que l'outil fait déjà tout seul */}
      <div className="flex items-center justify-between gap-2 border-t border-paper-line bg-paper-2 px-4 py-2 text-[10px] text-ink-2">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
          Synchronisé avec vos outils
        </span>
        <span className="font-semibold text-ink">{resolved ? "4 automatisations actives" : "Import en cours"}</span>
      </div>
    </div>
  );
}

// ─── Ce qui en sort ─────────────────────────────────────────────────────────

export function OutputCard({ index }: { index: number }) {
  const o = OUTPUTS[index];
  const Icon = o.icon;
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-paper px-3 py-2.5 ring-1 ring-ink/10">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink text-cyan" aria-hidden>
        <Icon size={15} strokeWidth={1.9} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink-2">{o.title}</p>
        <p className="truncate text-[11.5px] font-semibold text-ink">{o.line}</p>
        <p className="truncate text-[9.5px] text-ink-2">{o.detail}</p>
      </div>
    </div>
  );
}

// ─── Résultat ───────────────────────────────────────────────────────────────

export function IndicatorTile({ index }: { index: number }) {
  const it = INDICATORS[index];
  return (
    <div className="panel-card rounded-xl px-3.5 py-2.5">
      <p className="text-[16px] font-semibold leading-tight text-text-primary">{it.value}</p>
      <p className="mt-0.5 text-[11px] leading-snug text-text-secondary">{it.label}</p>
    </div>
  );
}
