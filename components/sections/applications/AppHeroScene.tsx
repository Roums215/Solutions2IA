"use client";

import { AnimatePresence, motion, type Transition } from "motion/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { EASE } from "@/components/shared/mockup/AppMockup";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import {
  APP_FINAL,
  APP_IDLE,
  APP_IDLE_DURATION,
  APP_SCENE_LABEL,
  APP_SCENE_SHORT,
  APP_SCENE_STEPS,
  APP_VIEWS,
  CHAOS,
  INDICATORS,
  INPUTS,
  OUTPUTS,
  T,
  type AppStep,
} from "./appHeroSceneData";
import { AppWindow, ChaosCard, IndicatorTile, InputChip, OutputCard, SHEET, SHEET_LG } from "./appHeroSceneParts";

/**
 * Scène 2.5D du hero de /applications (≥ md) : d'un « bazar » coûteux à un outil clair.
 *
 * Même mécanique que les scènes de l'accueil et de /sites-web (plan fixe mis à l'échelle
 * en CSS pur, horloge à étapes en setTimeout, poses en table, transform / opacity), avec
 * la touche de la page : des écrans papier posés sur la nuit du site.
 *
 * Cinq temps : 1 les cartes du bazar arrivent, penchées, chacune avec ce qu'elle coûte ;
 * 2 elles convergent et disparaissent dans l'application, les sources se rangent à gauche ;
 * 3 l'application règle les dossiers et fait sortir tableau de bord, alertes, rapports,
 * agenda, équipe ; 4 les indicateurs de résultat se posent ; 5 l'outil change de métier.
 *
 * Tiers : full = plan incliné ; reduced = à plat ; minimal et prefers-reduced-motion =
 * image finale fixe (sources rangées, outil, sorties, indicateurs). Pause hors écran,
 * onglet masqué ou bouton pause.
 */

const W = 820;
const H = 628;
/** Tout le décor descend sous la ligne des zones. */
const TOP = 30;

const APP = { x: 262, y: TOP + 20, w: 330 };
const OUT = { x: 628, w: 192, y0: TOP + 14, gap: 80 };
const INP = { x: 0, w: 204, y0: TOP + 64, gap: 64 };
const IND = { y: TOP + 452 };

const DEPTH_VIEW = "[html[data-perf=full]_&]:[perspective:2000px] [html[data-perf=full]_&]:[perspective-origin:50%_40%]";
const DEPTH_PLANE =
  "[html[data-perf=full]_&]:[transform-style:preserve-3d] [html[data-perf=full]_&]:[transform:rotateX(5deg)_rotateY(-6deg)]";

const MOVE = (delay = 0, slow = false): Transition => ({
  default: { type: "spring", bounce: 0.05, visualDuration: slow ? 1.1 : 0.9, delay },
  opacity: { duration: slow ? 0.8 : 0.6, ease: EASE, delay },
});

type Zone = "left" | "center" | "right" | "all" | null;
const ZONE: Zone[] = [null, "left", "center", "right", "all", "center"];

// Liaisons, en coordonnées du plan : sources → outil, outil → sorties.
const inY = (i: number) => INP.y0 + i * INP.gap + 23;
const appInY = (i: number) => APP.y + 110 + i * 26;
const outY = (i: number) => OUT.y0 + i * OUT.gap + 33;
const appOutY = (i: number) => APP.y + 100 + i * 30;
const IN_LINKS = INPUTS.map((_, i) => {
  const x1 = INP.x + INP.w;
  const x2 = APP.x;
  return `M ${x1} ${inY(i)} C ${x1 + 30} ${inY(i)}, ${x2 - 30} ${appInY(i)}, ${x2} ${appInY(i)}`;
});
const OUT_LINKS = OUTPUTS.map((_, i) => {
  const x1 = APP.x + APP.w;
  const x2 = OUT.x;
  return `M ${x1} ${appOutY(i)} C ${x1 + 20} ${appOutY(i)}, ${x2 - 20} ${outY(i)}, ${x2} ${outY(i)}`;
});

// ─── Scène ───────────────────────────────────────────────────────────────────

export function AppHeroScene() {
  return (
    <PauseOffscreen className="hero-enter-fade absolute inset-0">
      <Stage />
    </PauseOffscreen>
  );
}

function Stage() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const offscreen = useInViewPause();
  const [step, setStep] = useState<AppStep>(APP_IDLE);
  const [sector, setSector] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const animated = mounted && !disableContentMotion;
  const running = animated && !offscreen && !userPaused && !tabHidden;
  const shown: AppStep = animated ? step : APP_FINAL;
  const fresh = animated;

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // Horloge à étapes : une seule minuterie vivante.
  useEffect(() => {
    if (!running) return;
    const duration = step === APP_IDLE ? APP_IDLE_DURATION : APP_SCENE_STEPS[step - 1].duration;
    const timer = window.setTimeout(() => {
      setSector(0);
      setStep((s) => (s === APP_FINAL ? APP_IDLE : ((s + 1) as AppStep)));
    }, duration);
    return () => window.clearTimeout(timer);
  }, [running, step]);

  // Étape 5 : l'outil change de métier, un métier toutes les T.sectorEvery secondes.
  useEffect(() => {
    if (!running || step !== 5) return;
    const first = window.setTimeout(() => setSector(1), 300);
    const every = window.setInterval(() => setSector((s) => (s >= APP_VIEWS.length - 1 ? s : s + 1)), T.sectorEvery * 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(every);
    };
  }, [running, step]);

  const view = animated && shown === 5 ? sector : 0;

  return (
    <div className="absolute left-0 top-0 origin-top-left [scale:tan(atan2(100cqw,820px))]" style={{ width: W, height: H }}>
      <div role="img" aria-label={APP_SCENE_LABEL} className={cn("absolute inset-0", DEPTH_VIEW)}>
        <div className={cn("absolute inset-0", DEPTH_PLANE)}>
          <Zones zone={animated ? ZONE[shown] : "all"} step={shown} />

          {/* Liaisons */}
          <svg className="pointer-events-none absolute inset-0 overflow-visible" width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ transform: "translateZ(20px)" }} aria-hidden>
            {IN_LINKS.map((d, i) => (
              <Link key={d} d={d} active={shown >= 2} fresh={fresh && shown === 2} delay={T.inputs + i * T.inputGap + 0.3} />
            ))}
            {OUT_LINKS.map((d, i) => (
              <Link key={d} d={d} active={shown >= 3} fresh={fresh && shown === 3} delay={T.output + i * T.outputGap} />
            ))}
          </svg>

          {/* Sources rangées (après la convergence) */}
          {INPUTS.map((_, i) => {
            const on = shown >= 2;
            const d = fresh && shown === 2 ? T.inputs + i * T.inputGap : 0;
            return (
              <Obj
                key={`in-${i}`}
                style={{ left: INP.x, top: INP.y0 + i * INP.gap, width: INP.w }}
                pose={{ opacity: on ? (shown === 2 ? 1 : 0.88) : 0, x: on ? 0 : -24, y: 0, z: shown === 2 ? 30 : 0, scale: 1 }}
                transition={MOVE(d)}
              >
                <InputChip index={i} />
              </Obj>
            );
          })}

          {/* Avant l'outil : sa place est déjà marquée, en pointillé */}
          <motion.div
            aria-hidden
            className="absolute grid place-items-center rounded-2xl border border-dashed border-accent-light/35"
            style={{ left: APP.x, top: APP.y, width: APP.w, height: 300 }}
            initial={false}
            animate={{ opacity: shown === 1 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: fresh && shown === 1 ? 1.2 : 0 }}
          >
            <p className="text-center text-[12px] leading-relaxed text-text-tertiary">
              <span className="block text-[13px] font-semibold text-text-secondary">Votre outil</span>
              un seul endroit, pensé pour votre métier
            </p>
          </motion.div>

          {/* L'application */}
          <Obj
            style={{ left: APP.x, top: APP.y, width: APP.w, boxShadow: SHEET_LG }}
            className="rounded-2xl"
            pose={shown >= 2 ? { opacity: 1, x: 0, y: 0, z: shown === 2 || shown === 5 ? 80 : 40, scale: 1 } : { opacity: 0, x: 0, y: 18, z: 0, scale: 0.94 }}
            transition={MOVE(fresh && shown === 2 ? T.appEnter : 0, true)}
            focus={animated && (shown === 2 || shown === 5)}
            step={shown}
          >
            <AppWindow step={shown} view={view} fresh={fresh} />
          </Obj>

          {/* Sorties */}
          {OUTPUTS.map((_, i) => {
            const on = shown >= 3;
            const d = fresh && shown === 3 ? T.output + i * T.outputGap : 0;
            return (
              <Obj
                key={`out-${i}`}
                style={{ left: OUT.x, top: OUT.y0 + i * OUT.gap, width: OUT.w, boxShadow: SHEET }}
                className="rounded-xl"
                pose={{ opacity: on ? 1 : 0, x: on ? 0 : 28, y: 0, z: shown === 3 ? 50 : 20, scale: 1 }}
                transition={MOVE(d)}
              >
                <OutputCard index={i} />
              </Obj>
            );
          })}

          {/* Résultat */}
          {INDICATORS.map((_, i) => {
            const on = shown >= 4;
            const d = fresh && shown === 4 ? T.indicator + i * T.indicatorGap : 0;
            return (
              <Obj
                key={`ind-${i}`}
                style={{ left: i * 208, top: IND.y, width: 196 }}
                pose={{ opacity: on ? 1 : 0, x: 0, y: on ? 0 : 14, z: shown === 4 ? 60 : 20, scale: 1 }}
                transition={MOVE(d)}
              >
                <IndicatorTile index={i} />
              </Obj>
            );
          })}

          {/* Avant : le bazar. Les cartes arrivent penchées, puis plongent dans l'outil. */}
          {CHAOS.map((c, i) => {
            const target = { x: APP.x + 30 - c.x, y: 190 - c.y };
            const pose =
              shown === 1
                ? { opacity: 1, x: 0, y: 0, z: 30, scale: 1, rotate: c.rot }
                : shown === 2 && fresh
                  ? { opacity: 0, x: target.x, y: target.y, z: 60, scale: 0.42, rotate: 0 }
                  : { opacity: 0, x: 0, y: 12, z: 0, scale: 0.98, rotate: c.rot };
            const d = !fresh ? 0 : shown === 1 ? T.chaos + i * T.chaosGap : shown === 2 ? T.converge + i * T.convergeGap : 0;
            return (
              <Obj key={c.id} style={{ left: c.x, top: TOP + c.y, width: c.w, boxShadow: SHEET }} className="rounded-xl" pose={pose} transition={MOVE(d, shown === 2)}>
                <ChaosCard index={i} showTag={shown === 1} fresh={fresh} />
              </Obj>
            );
          })}
        </div>
      </div>

      <Caption shown={shown} animated={animated}>
        <button
          type="button"
          onClick={() => setUserPaused((v) => !v)}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Reprendre l'animation" : "Mettre l'animation en pause"}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border-medium bg-bg-card text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
        >
          {userPaused ? <Play className="h-3.5 w-3.5 translate-x-px" strokeWidth={2} aria-hidden /> : <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />}
        </button>
      </Caption>
    </div>
  );
}

// ─── Briques ─────────────────────────────────────────────────────────────────

type Pose = { opacity: number; x: number; y: number; z: number; scale: number; rotate?: number };

function Obj({
  pose,
  style,
  className,
  transition,
  focus = false,
  step,
  children,
}: {
  pose: Pose;
  style: CSSProperties;
  className?: string;
  transition: Transition;
  focus?: boolean;
  step?: AppStep;
  children: ReactNode;
}) {
  return (
    <motion.div className={cn("absolute", className)} style={style} initial={false} animate={pose} transition={transition}>
      {children}
      <motion.span
        aria-hidden
        className={cn("pointer-events-none absolute -inset-[3px] ring-2 ring-cyan/45", className)}
        initial={false}
        animate={{ opacity: focus ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
      {focus && (
        <motion.span
          key={step}
          aria-hidden
          className={cn("pointer-events-none absolute -inset-[3px] ring-2 ring-cyan", className)}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1.3, ease: EASE, delay: 1.2 }}
        />
      )}
    </motion.div>
  );
}

function Link({ d, active, fresh, delay }: { d: string; active: boolean; fresh: boolean; delay: number }) {
  const at = fresh ? delay : 0;
  return (
    <motion.g initial={false} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.4, delay: active ? at : 0 }}>
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-accent-light)"
        strokeOpacity={0.7}
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: active ? 1 : 0 }}
        transition={{ duration: T.linkDraw, delay: at, ease: EASE }}
      />
      {fresh && (
        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-cyan)"
          strokeWidth={2.25}
          strokeLinecap="round"
          initial={{ pathLength: 0.18, pathOffset: 0, opacity: 0 }}
          animate={{ pathOffset: 0.82, opacity: [0, 1, 1, 0] }}
          transition={{ duration: T.linkFlow, delay: at + T.linkDraw * 0.7, ease: "easeInOut" }}
        />
      )}
    </motion.g>
  );
}

/** Les trois zones : d'où ça vient, votre outil, ce qui en sort. */
function Zones({ zone, step }: { zone: Zone; step: AppStep }) {
  const on = (z: Exclude<Zone, "all" | null>) => zone === z || zone === "all";
  const label = (z: Exclude<Zone, "all" | null>, text: string, left: number) => (
    <motion.p
      className="absolute flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.2em]"
      style={{ left, top: 0 }}
      initial={false}
      animate={{ opacity: zone === null ? 0 : on(z) ? 1 : 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span className={cn("h-px w-5 transition-colors duration-500", on(z) ? "bg-cyan" : "bg-text-tertiary/40")} />
      <span className={cn("transition-colors duration-500", on(z) ? "text-accent-light" : "text-text-tertiary")}>{text}</span>
    </motion.p>
  );
  return (
    <>
      {label("left", step <= 1 ? "Aujourd'hui" : "Vos sources", 2)}
      {label("center", "Votre outil", APP.x + 2)}
      {label("right", "Ce qui en sort", OUT.x + 2)}
    </>
  );
}

function Caption({ shown, animated, children }: { shown: AppStep; animated: boolean; children: ReactNode }) {
  const index = Math.max(shown, 1) - 1;
  const current = APP_SCENE_STEPS[index];
  const idle = shown === APP_IDLE;

  return (
    <div className="panel-card absolute inset-x-4 flex items-center gap-4 rounded-2xl px-4" style={{ top: H - 60, height: 56 }}>
      {animated && idle ? (
        <>
          <p aria-hidden className="min-w-0 flex-1 text-[13px] leading-relaxed text-text-secondary">
            <span className="font-semibold text-text-primary">Du bazar à votre outil : </span>
            {APP_SCENE_SHORT.join(" · ")}
          </p>
          {children}
        </>
      ) : animated ? (
        <>
          <span aria-hidden className="shrink-0 font-mono text-[15px] font-semibold tracking-[0.08em] text-cyan">
            0{index + 1}
          </span>
          <div aria-hidden className="relative min-w-0 flex-1">
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={index}
                className="line-clamp-2 text-[14px] leading-snug"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <span className="font-semibold text-text-primary">{current.title}</span>
                <span className="text-text-secondary"> · {current.line}</span>
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex shrink-0 items-center gap-2.5" aria-hidden>
            <span className="font-mono text-[11px] tracking-[0.1em] text-text-tertiary">
              0{index + 1} / 0{APP_SCENE_STEPS.length}
            </span>
            <span className="flex gap-[3px]">
              {APP_SCENE_STEPS.map((s, i) => (
                <span key={s.title} className="relative block h-[3px] w-4 overflow-hidden rounded-full bg-text-tertiary/25">
                  <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-cyan"
                    initial={false}
                    animate={{ scaleX: i <= index ? 1 : 0 }}
                    transition={i === index ? { duration: s.duration / 1000, ease: "linear" } : { duration: 0.2 }}
                  />
                </span>
              ))}
            </span>
          </div>
          {children}
        </>
      ) : (
        <p aria-hidden className="text-[13px] leading-relaxed text-text-secondary">
          <span className="font-semibold text-text-primary">En 5 temps : </span>
          {APP_SCENE_SHORT.join(" · ")}
        </p>
      )}
    </div>
  );
}
