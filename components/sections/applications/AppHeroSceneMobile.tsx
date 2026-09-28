"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { Check, TriangleAlert } from "lucide-react";
import { EASE } from "@/components/shared/mockup/AppMockup";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import { APP_MOBILE_STEPS, APP_VIEWS, CHAOS, INDICATORS, OUTPUTS } from "./appHeroSceneData";

/**
 * Le récit du hero de /applications, recomposé pour le téléphone : quatre moments lus de
 * haut en bas, du texte à taille de lecture. Pas la scène desktop réduite. Chaque moment
 * se révèle à son entrée dans l'écran, puis son contenu arrive ligne à ligne. Tier
 * minimal et reduced-motion : rendu final immédiat.
 */

const SHEET =
  "0 1px 2px color-mix(in oklab, var(--color-bg-primary) 70%, transparent), 0 20px 36px -22px color-mix(in oklab, var(--color-bg-primary) 95%, transparent)";

const stage: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, staggerChildren: 0.1, delayChildren: 0.25 } },
};
const line: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};
const INSTANT = { duration: 0 };
const STAGE_STILL: Variants = { hidden: stage.hidden, visible: { opacity: 1, y: 0, transition: INSTANT } };
const LINE_STILL: Variants = { hidden: line.hidden, visible: { opacity: 1, x: 0, transition: INSTANT } };

const TONE: Record<string, string> = {
  ok: "bg-success/15 text-success-ink",
  info: "bg-accent-primary/12 text-accent-dark",
  warn: "bg-warning/18 text-warning-ink",
  neutral: "bg-paper-3 text-ink-2",
};

export function AppHeroSceneMobile({ className }: { className?: string }) {
  const { disableContentMotion: still } = usePerformanceMode();
  const L = still ? LINE_STILL : line;
  const view = APP_VIEWS[0];

  return (
    <div className={cn("relative", className)}>
      <ol className="relative space-y-7">
        <span aria-hidden className="absolute bottom-10 left-[1.0625rem] top-6 w-px bg-gradient-to-b from-warning/40 via-accent-light/40 to-cyan/50" />

        {/* 1 · le bazar */}
        <Stage n={1} still={still} tone="warn">
          <ul className="space-y-2">
            {CHAOS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.li
                  key={c.id}
                  variants={L}
                  className={cn("flex items-center gap-2.5 rounded-xl bg-paper px-3 py-2 ring-1 ring-ink/10", i % 2 ? "ml-3" : "mr-3")}
                  style={{ boxShadow: SHEET }}
                >
                  <Icon size={15} strokeWidth={1.75} className="shrink-0 text-ink-2" aria-hidden />
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{c.title}</span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-warning/15 px-1.5 py-0.5 text-[11px] font-semibold text-warning-ink">
                    <TriangleAlert size={10} strokeWidth={2.25} aria-hidden />
                    {c.tag}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </Stage>

        {/* 2 · votre outil */}
        <Stage n={2} still={still}>
          <div className="overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/10" style={{ boxShadow: SHEET }}>
            <div className="bg-ink px-4 py-3 text-paper">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-paper/55">Votre outil</p>
              <p className="text-[16px] font-semibold">{view.title}</p>
            </div>
            <ul className="space-y-1.5 p-3">
              {view.rows.map((r) => (
                <motion.li key={r.ref} variants={L} className="flex items-center gap-2 rounded-lg px-1 py-1">
                  <span className="w-10 shrink-0 font-mono text-[11px] text-ink-3">{r.ref}</span>
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{r.label.split(" · ")[0]}</span>
                  <span className={cn("shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-semibold", TONE[r.tone])}>{r.status}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Stage>

        {/* 3 · ce qui en sort */}
        <Stage n={3} still={still}>
          <ul className="grid grid-cols-1 gap-2">
            {OUTPUTS.map((o) => {
              const Icon = o.icon;
              return (
                <motion.li key={o.id} variants={L} className="flex items-center gap-3 rounded-xl bg-paper px-3 py-2.5 ring-1 ring-ink/10" style={{ boxShadow: SHEET }}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink text-cyan" aria-hidden>
                    <Icon size={16} strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-ink">{o.title}</span>
                    <span className="block truncate text-[12.5px] text-ink-2">{o.detail}</span>
                  </span>
                  <Check size={15} strokeWidth={2.5} className="shrink-0 text-accent-dark" aria-hidden />
                </motion.li>
              );
            })}
          </ul>
        </Stage>

        {/* 4 · résultat, dans votre métier */}
        <Stage n={4} still={still}>
          <div className="grid grid-cols-2 gap-2">
            {INDICATORS.map((it) => (
              <motion.div key={it.value} variants={L} className="panel-card rounded-xl px-3 py-2.5">
                <p className="text-[16px] font-semibold text-text-primary">{it.value}</p>
                <p className="text-[12.5px] leading-snug text-text-secondary">{it.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.ul variants={L} className="mt-3 flex flex-wrap gap-1.5">
            {APP_VIEWS.slice(1).map((v) => {
              const Icon = v.icon;
              return (
                <li key={v.key} className="inline-flex items-center gap-1.5 rounded-lg border border-border-medium bg-bg-card/70 px-2.5 py-1.5 text-[12.5px] text-text-secondary">
                  <Icon size={13} strokeWidth={1.9} className="text-cyan" aria-hidden />
                  {v.sector} · {v.title.toLowerCase()}
                </li>
              );
            })}
          </motion.ul>
        </Stage>
      </ol>
      <p className="mt-4 pl-11 text-[12px] text-text-tertiary">Maquette · données d&apos;exemple</p>
    </div>
  );
}

function Stage({ n, still, tone, children }: { n: number; still: boolean; tone?: "warn"; children: ReactNode }) {
  const s = APP_MOBILE_STEPS[n - 1];
  return (
    <motion.li
      className="relative pl-11"
      variants={still ? STAGE_STILL : stage}
      initial="hidden"
      {...(still ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true, margin: "-40px" } })}
    >
      <span
        className={cn(
          "absolute left-0 top-0 grid h-[2.125rem] w-[2.125rem] place-items-center rounded-lg font-mono text-[12px] font-semibold",
          tone === "warn" ? "bg-warning/15 text-warning" : "bg-paper text-ink",
        )}
      >
        0{n}
      </span>
      <p className="pt-0.5 text-[16px] font-semibold leading-snug text-text-primary">{s.title}</p>
      <p className="mt-0.5 text-[13.5px] leading-snug text-text-secondary">{s.line}</p>
      <div className="mt-3">{children}</div>
    </motion.li>
  );
}
