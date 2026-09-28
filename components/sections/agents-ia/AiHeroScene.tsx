"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CheckCircle2, Pause, Play } from "lucide-react";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import {
  AI_IDLE,
  AI_IDLE_DURATION,
  AI_LAST,
  AI_PHASES,
  AI_SCENE_LABEL,
  AI_STEP_COUNT,
  DESTINATIONS,
  DOSSIER_ROWS,
  FINAL_PHASE,
  REQUEST,
  phaseDef,
  type AiPhase,
} from "./aiHeroSceneData";
import { DEST_ICON, Dossier, EASE, FlowStrip, PhoneFrame, PhoneScreens, StaticStory, Summary, WorkZone, useAfter, type PhoneScreenId } from "./aiHeroSceneParts";

/**
 * Scène du hero de /agents-ia (≥ md), V3 : deux objets, une demande.
 *
 * L'iPhone (devant, à gauche) montre ce qui arrive : l'appel, le message, le document,
 * puis la validation. L'espace de travail (derrière, plus large) montre ce que
 * l'assistant en comprend et en fait : le DOSSIER ACTIF, visible de bout en bout, dont
 * les lignes changent d'état sur place, et une zone de travail qui ne montre qu'une chose
 * à la fois. Les outils n'apparaissent qu'à la fin, comme des destinations.
 *
 * Plan fixe 860 × 560 mis à l'échelle en CSS pur ; horloge à phases en setTimeout ;
 * transform et opacity uniquement. Reduced : pas de trajets animés. Minimal et
 * prefers-reduced-motion : image finale fixe, l'histoire en quatre lignes.
 */

const W = 860;
const H = 560;
const PHONE = { x: 0, y: 44, w: 236, h: 488 };
const WS = { x: 200, y: 16, w: 660, h: 440 };
const HEADER = 52;
const PAD_LEFT = 56;
const DEST = { y: 468, x0: 240, w: 146, gap: 8 };
/** Le filet entre le dossier et la zone de travail : les informations le descendent. */
const TRUNK_X = WS.x + WS.w - 280;

const LIFT =
  "0 1px 2px color-mix(in oklab, var(--color-ink) 10%, transparent), 0 24px 48px -28px color-mix(in oklab, var(--color-ink) 38%, transparent), 0 60px 100px -60px color-mix(in oklab, var(--color-ink) 45%, transparent)";

const SCREEN: Record<AiPhase, PhoneScreenId> = { 0: "idle", 1: "call", 2: "chat", 3: "doc", 4: "wait", 5: "validate", 6: "done", 7: "done" };

/** Place de l'iPhone : devant, il recule quand l'assistant travaille, revient pour vous. */
const PHONE_POSE: Record<AiPhase, { scale: number; x: number; opacity: number }> = {
  0: { scale: 1, x: 0, opacity: 1 },
  1: { scale: 1, x: 0, opacity: 1 },
  2: { scale: 1, x: 4, opacity: 1 },
  3: { scale: 1, x: 4, opacity: 1 },
  4: { scale: 0.95, x: -6, opacity: 0.6 },
  5: { scale: 1.03, x: 10, opacity: 1 },
  6: { scale: 0.95, x: -6, opacity: 0.62 },
  7: { scale: 0.97, x: 0, opacity: 0.85 },
};

export function AiHeroScene() {
  return (
    <PauseOffscreen className="hero-enter-fade absolute inset-0">
      <Stage />
    </PauseOffscreen>
  );
}

function Stage() {
  const { mounted, disableContentMotion, tier } = usePerformanceMode();
  const offscreen = useInViewPause();
  const [phase, setPhase] = useState<AiPhase>(AI_IDLE);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const animated = mounted && !disableContentMotion;
  const running = animated && !offscreen && !userPaused && !tabHidden;
  const shown: AiPhase = animated ? phase : FINAL_PHASE;
  const fresh = animated;
  const lite = tier !== "full";

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const duration = phase === AI_IDLE ? AI_IDLE_DURATION : AI_PHASES[phase - 1].duration;
    const timer = window.setTimeout(() => setPhase((p) => (p === AI_LAST ? AI_IDLE : ((p + 1) as AiPhase))), duration);
    return () => window.clearTimeout(timer);
  }, [running, phase]);

  const def = phaseDef(shown);
  const pose = animated ? PHONE_POSE[shown] : PHONE_POSE[0];

  return (
    <div data-ai-phase={shown} className="absolute left-0 top-0 origin-top-left [scale:tan(atan2(100cqw,860px))]" style={{ width: W, height: H }}>
      <div role="img" aria-label={AI_SCENE_LABEL} className="absolute inset-0">
        {/* L'espace de travail de l'assistant */}
        <div
          aria-hidden
          className="absolute flex flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/10"
          style={{ left: WS.x, top: WS.y, width: WS.w, height: WS.h, boxShadow: LIFT }}
        >
          <Header phase={shown} animated={animated} />

          <div className="relative min-h-0 flex-1">
            <AnimatePresence initial={false}>
              {shown === 7 ? (
                <motion.div key="summary" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                  <Summary fresh={fresh} />
                </motion.div>
              ) : (
                <motion.div
                  key="main"
                  className="absolute inset-0 grid grid-cols-[minmax(0,1fr)_280px]"
                  initial={fresh ? { opacity: 0 } : false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="min-w-0 pr-5 pt-3.5" style={{ paddingLeft: PAD_LEFT }}>
                    <p className="mb-1 h-[18px] text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-3">Dossier en cours</p>
                    <Dossier phase={shown} fresh={fresh} />
                  </div>
                  <div className="relative min-w-0 border-l border-paper-line bg-paper-2/60">
                    {animated ? <WorkZone phase={shown} fresh={fresh} /> : <StaticStory />}
                  </div>

                  {/* Le flux bloqué, puis rouvert : décision et validation seulement */}
                  <AnimatePresence initial={false}>
                    {(shown === 4 || shown === 5) && (
                      <motion.div
                        key="flow"
                        className="absolute inset-x-0 bottom-0 flex h-[52px] items-center border-t border-paper-line bg-paper pr-5"
                        style={{ paddingLeft: PAD_LEFT }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.45, delay: shown === 4 ? 0.9 : 0, ease: EASE }}
                      >
                        <FlowStrip open={false} fresh={fresh} />
                        {shown === 5 && <OpenFlow fresh={fresh} />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="border-t border-paper-line px-5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3" style={{ paddingLeft: PAD_LEFT }}>
            Maquette · données d&apos;exemple
          </p>
        </div>

        {/* Étape 6 : les destinations, puis elles se retirent */}
        <AnimatePresence>{animated && shown === 6 && <Destinations key="dest" lite={lite} />}</AnimatePresence>

        {/* L'iPhone, devant */}
        <motion.div
          aria-hidden
          className="absolute z-20 origin-center"
          style={{ left: PHONE.x, top: PHONE.y, width: PHONE.w, height: PHONE.h }}
          initial={false}
          animate={pose}
          transition={{ duration: fresh ? 0.8 : 0, ease: EASE }}
        >
          <PhoneFrame className="h-full w-full">
            <PhoneScreens screen={animated ? SCREEN[shown] : "done"} fresh={fresh} />
          </PhoneFrame>
        </motion.div>
      </div>

      {/* Légende et pause */}
      <div className="absolute flex items-center gap-4" style={{ left: WS.x + 50, right: 0, top: 520, height: 40 }}>
        <div aria-hidden className="relative min-w-0 flex-1">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={animated ? def.key : "static"}
              className="line-clamp-2 text-[14px] leading-snug"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {!animated ? (
                <>
                  <span className="font-semibold text-ink">En quatre temps : </span>
                  <span className="text-ink-2">demande, vérification, validation, actions tracées.</span>
                </>
              ) : shown === 0 ? (
                <span className="text-ink-2">Une demande, suivie de bout en bout.</span>
              ) : (
                <>
                  <span className="font-semibold text-ink">{def.title}</span>
                  <span className="text-ink-2"> · {def.line}</span>
                </>
              )}
            </motion.p>
          </AnimatePresence>
        </div>
        {animated && (
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Reprendre l'animation" : "Mettre l'animation en pause"}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-paper-line-strong bg-paper text-ink-2 transition-colors duration-300 hover:bg-paper-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
          >
            {userPaused ? <Play className="h-3.5 w-3.5 translate-x-px" strokeWidth={2} aria-hidden /> : <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />}
          </button>
        )}
      </div>
    </div>
  );
}

/** En-tête du dossier : la demande, et un repère d'étape discret (nom courant + six filets). */
function Header({ phase, animated }: { phase: AiPhase; animated: boolean }) {
  const def = phaseDef(phase);
  return (
    <div className="flex h-[52px] shrink-0 items-center gap-3 border-b border-paper-line pr-5" style={{ paddingLeft: PAD_LEFT }}>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-ink">{phase === 7 ? "Dossier traité" : "Dossier en cours"}</p>
        <p className="font-mono text-[10.5px] text-ink-3">
          {REQUEST.ref} · ouvert à {REQUEST.time}
        </p>
      </div>
      {animated && (
        <div className="ml-auto flex flex-col items-end gap-1.5">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={phase === 0 ? "idle" : def.step}
              className="text-[11px] text-ink-2"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {phase === 0 ? (
                "En attente"
              ) : (
                <>
                  <span className="mr-1.5 font-mono text-ink-3">0{def.step}</span>
                  <span className="font-semibold">{def.label}</span>
                </>
              )}
            </motion.p>
          </AnimatePresence>
          <span className="flex gap-1">
            {Array.from({ length: AI_STEP_COUNT }, (_, i) => (
              <span key={i} className={cn("h-[2px] w-5 rounded-full transition-colors duration-500", phase > 0 && i < def.step ? "bg-accent-primary" : "bg-ink/10")} />
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

/** Étape 5 : le verrou s'ouvre au moment où vous validez sur l'iPhone. */
function OpenFlow({ fresh }: { fresh: boolean }) {
  const open = useAfter(2400, fresh);
  if (!open) return null;
  return (
    <div className="absolute inset-y-0 flex items-center bg-paper pr-5" style={{ left: PAD_LEFT, right: 0 }}>
      <motion.div className="flex w-full items-center" initial={fresh ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
        <FlowStrip open fresh={fresh} />
      </motion.div>
    </div>
  );
}

/**
 * Les outils, seulement comme destinations : une ligne sous le dossier. Chaque information
 * quitte sa ligne du dossier et voyage jusqu'à son outil (tier full) ; en reduced, les
 * destinations apparaissent simplement cochées.
 */
function Destinations({ lite }: { lite: boolean }) {
  const rowY = (key: string) => WS.y + HEADER + 14 + 22 + DOSSIER_ROWS.findIndex((r) => r.key === key) * 44 + 22;
  const startX = TRUNK_X - 22;
  const bottomY = WS.y + WS.h - 12;
  const cx = (i: number) => DEST.x0 + i * (DEST.w + DEST.gap) + DEST.w / 2;

  return (
    <motion.div className="pointer-events-none absolute inset-0 z-10" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: EASE }}>
      {!lite && (
        <svg className="absolute inset-0 overflow-visible" width={W} height={H} aria-hidden>
          {DESTINATIONS.map((d, i) => {
            const sy = rowY(d.from);
            const ex = cx(i);
            return (
              <motion.path
                key={d.id}
                d={`M ${startX} ${sy} H ${TRUNK_X} V ${bottomY} C ${TRUNK_X} ${bottomY + 14}, ${ex} ${DEST.y - 18}, ${ex} ${DEST.y}`}
                fill="none"
                stroke="var(--color-cyan)"
                strokeOpacity={0.6}
                strokeWidth={1.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.3, ease: EASE }}
              />
            );
          })}
        </svg>
      )}

      {!lite &&
        DESTINATIONS.map((d, i) => {
          const sy = rowY(d.from);
          const ex = cx(i);
          const delay = 0.7 + i * 0.3;
          return (
            <motion.span
              key={`t-${d.id}`}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[10.5px] font-semibold text-paper shadow-[0_8px_18px_-10px_var(--color-ink)]"
              initial={{ x: startX, y: sy, opacity: 0 }}
              animate={{ x: [startX, TRUNK_X, TRUNK_X, ex], y: [sy, sy, bottomY, DEST.y], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.3, delay, ease: "easeInOut", times: [0, 0.2, 0.75, 1] }}
            >
              {d.carries}
            </motion.span>
          );
        })}

      {DESTINATIONS.map((d, i) => {
        const Icon = DEST_ICON[d.id];
        const arrive = lite ? 0.3 + i * 0.15 : 1.9 + i * 0.3;
        return (
          <motion.div
            key={d.id}
            className="absolute flex h-[44px] items-center gap-2 rounded-xl bg-paper px-2.5 ring-1 ring-paper-line-strong"
            style={{ left: DEST.x0 + i * (DEST.w + DEST.gap), top: DEST.y, width: DEST.w, boxShadow: LIFT }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.12, ease: EASE }}
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-ink text-cyan" aria-hidden>
              <Icon size={12} strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-ink">{d.title}</p>
              <motion.p
                className="flex items-center gap-1 truncate text-[10px] text-ink-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: arrive }}
              >
                <CheckCircle2 size={10} strokeWidth={2.2} className="shrink-0 text-cyan" aria-hidden />
                {d.carries}
              </motion.p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
