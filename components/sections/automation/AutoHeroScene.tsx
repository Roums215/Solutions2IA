"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import { AUTO_LAST, AUTO_SCENE_LABEL, SCENARIOS, SYNTHESIS, T, phaseDuration, type AutoPhase, type Scenario } from "./autoHeroData";
import { EASE, EngineFrame, EngineSteps, InputCard, OBJECT_SHADOW, OutputCard, enter } from "./autoHeroParts";

/**
 * Hero de /automatisation (≥ md) : un film de quatre automatisations autour d'UN moteur
 * de règles, puis la synthèse. Le moteur ne bouge jamais, c'est lui qui fait le lien ;
 * autour, les objets n'apparaissent que quand ils servent (quatre au plus).
 *
 * Plan fixe 860 × 500 mis à l'échelle en CSS pur ; horloge à phases en setTimeout ;
 * transform et opacity uniquement. Reduced : pas de donnée qui voyage. Minimal et
 * prefers-reduced-motion : composition finale fixe (déclencheur → moteur → outils).
 */

const W = 860;
const H = 500;
const IN = { x: 0, y: 64, w: 250 };
const ENG = { x: 298, y: 36, w: 260, h: 318 };
const OUT = { x: 602, y: 44, w: 258, h: 70, gap: 10 };
const LINK_Y = ENG.y + 128;

export function AutoHeroScene() {
  return (
    <PauseOffscreen className="hero-enter-fade absolute inset-0">
      <Stage />
    </PauseOffscreen>
  );
}

function Stage() {
  const { mounted, disableContentMotion, tier } = usePerformanceMode();
  const offscreen = useInViewPause();
  const [phase, setPhase] = useState<AutoPhase>(1);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const animated = mounted && !disableContentMotion;
  const running = animated && !offscreen && !userPaused && !tabHidden;
  const shown: AutoPhase = animated ? phase : 1;
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
    const timer = window.setTimeout(() => setPhase((p) => (p === AUTO_LAST ? 1 : ((p + 1) as AutoPhase))), phaseDuration(phase));
    return () => window.clearTimeout(timer);
  }, [running, phase]);

  const s = shown >= 1 && shown <= 4 ? SCENARIOS[shown - 1] : null;

  return (
    <div data-auto-phase={animated ? shown : "static"} className="absolute left-0 top-0 origin-top-left [scale:tan(atan2(100cqw,860px))]" style={{ width: W, height: H }}>
      <div role="img" aria-label={AUTO_SCENE_LABEL} className="absolute inset-0">
        {/* Le moteur : le cadre reste, le contenu suit le scénario */}
        <div aria-hidden className="absolute z-10" style={{ left: ENG.x, top: ENG.y, width: ENG.w, height: ENG.h }}>
          <EngineFrame className="h-full">
            <AnimatePresence initial={false}>
              <motion.div
                key={shown}
                className="absolute inset-0"
                initial={fresh ? { opacity: 0, y: 6 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.3 } }}
                transition={{ duration: 0.45, delay: fresh ? 0.25 : 0, ease: EASE }}
              >
                {s ? <EngineSteps s={s} fresh={fresh} /> : <SynthesisCore fresh={fresh} />}
              </motion.div>
            </AnimatePresence>
          </EngineFrame>
        </div>

        {/* Autour : ce qui entre, ce qui sort */}
        <AnimatePresence initial={false}>
          <motion.div
            key={shown}
            aria-hidden
            className="absolute inset-0"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.4, ease: EASE } }}
          >
            {s ? <ScenarioObjects s={s} fresh={fresh} lite={lite} /> : <SynthesisObjects fresh={fresh} lite={lite} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Le résultat, le repère de scénario, la pause */}
      <div className="absolute flex items-end gap-4" style={{ left: ENG.x, right: 0, top: ENG.y + ENG.h + 22 }}>
        <div aria-hidden className="min-w-0 flex-1">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={animated ? shown : "static"}
              className="text-[19px] leading-snug tracking-tight"
              initial={fresh ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, delay: fresh && s ? T.result : fresh ? 0.6 : 0, ease: EASE }}
            >
              <span className="text-text-secondary">{(s ? s.result : SYNTHESIS.line)[0]} </span>
              <span className="font-semibold text-text-primary">{(s ? s.result : SYNTHESIS.line)[1]}</span>
            </motion.p>
          </AnimatePresence>
          <ol className="mt-3 flex gap-4" aria-hidden>
            {SCENARIOS.map((x, i) => {
              const on = animated ? shown === i + 1 : i === 0;
              return (
                <li key={x.key} className={cn("flex items-center gap-1.5 text-[12px] transition-colors duration-500", on ? "font-semibold text-text-primary" : "text-text-tertiary")}>
                  <span className={cn("h-[2px] w-4 rounded-full transition-colors duration-500", on ? "bg-cyan" : "bg-border-medium")} />
                  {x.name}
                </li>
              );
            })}
          </ol>
        </div>
        {animated && (
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Reprendre l'animation" : "Mettre l'animation en pause"}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border-medium bg-bg-card/60 text-text-secondary transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            {userPaused ? <Play className="h-3.5 w-3.5 translate-x-px" strokeWidth={2} aria-hidden /> : <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />}
          </button>
        )}
      </div>
    </div>
  );
}

/** Un scénario : l'objet d'entrée, la donnée qui part, les résultats qui se créent. */
function ScenarioObjects({ s, fresh, lite }: { s: Scenario; fresh: boolean; lite: boolean }) {
  const outY = (i: number) => OUT.y + i * (OUT.h + OUT.gap);
  const outAt = (i: number) => T.out0 + i * T.outGap;
  const engRight = ENG.x + ENG.w;

  return (
    <>
      <svg className="absolute inset-0 overflow-visible" width={W} height={H} aria-hidden>
        {/* Entrée → moteur */}
        <motion.path
          d={`M ${IN.x + IN.w} ${LINK_Y} H ${ENG.x}`}
          fill="none"
          stroke="var(--color-cyan)"
          strokeOpacity={0.6}
          strokeWidth={1.3}
          initial={fresh && !lite ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: fresh ? T.travel : 0, delay: fresh ? T.send : 0, ease: EASE }}
        />
        {/* Moteur → chaque outil */}
        {s.outputs.map((o, i) => {
          const y = outY(i) + OUT.h / 2;
          return (
            <motion.path
              key={o.label}
              d={`M ${engRight} ${LINK_Y} C ${engRight + 30} ${LINK_Y}, ${OUT.x - 30} ${y}, ${OUT.x} ${y}`}
              fill="none"
              stroke="var(--color-cyan)"
              strokeOpacity={0.5}
              strokeWidth={1.2}
              initial={fresh ? (lite ? { opacity: 0 } : { pathLength: 0 }) : false}
              animate={lite ? { opacity: 1 } : { pathLength: 1 }}
              transition={{ duration: fresh ? 0.45 : 0, delay: fresh ? outAt(i) - 0.35 : 0, ease: EASE }}
            />
          );
        })}
      </svg>

      <motion.div {...enter(fresh, T.input, 10)} className="absolute" style={{ left: IN.x, top: IN.y, width: IN.w }}>
        <InputCard s={s} fresh={fresh} />
      </motion.div>

      {/* La donnée qui voyage (tier full seulement) : un petit bloc, le temps du trajet */}
      {fresh && !lite && (
        <motion.span
          className="absolute left-0 top-0 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md bg-cyan text-bg-primary"
          initial={{ x: IN.x + IN.w + 12, y: LINK_Y, opacity: 0 }}
          animate={{ x: [IN.x + IN.w + 12, ENG.x - 12], opacity: [0, 1, 1, 0] }}
          transition={{ duration: T.travel + 0.15, delay: T.send, ease: "easeInOut", opacity: { duration: T.travel + 0.15, delay: T.send, times: [0, 0.2, 0.8, 1] } }}
        >
          <s.input.icon size={13} strokeWidth={2.2} />
        </motion.span>
      )}

      {s.outputs.map((o, i) => (
        <div key={o.label} className="absolute" style={{ left: OUT.x, top: outY(i), width: OUT.w, height: OUT.h }}>
          <OutputCard o={o} fresh={fresh} delay={outAt(i)} />
        </div>
      ))}
      {s.outputsNote && (
        <motion.p {...enter(fresh, outAt(s.outputs.length), 4)} className="absolute text-[12px] text-text-tertiary" style={{ left: OUT.x + 2, top: outY(s.outputs.length) + 2, width: OUT.w }}>
          {s.outputsNote}
        </motion.p>
      )}
    </>
  );
}

/** Fin de boucle : les quatre déclencheurs, le moteur seul, les outils. */
function SynthesisObjects({ fresh, lite }: { fresh: boolean; lite: boolean }) {
  const inY = (i: number) => 58 + i * 60;
  const outY = (i: number) => 34 + i * 58;
  const engRight = ENG.x + ENG.w;
  return (
    <>
      <svg className="absolute inset-0 overflow-visible" width={W} height={H} aria-hidden>
        {SYNTHESIS.inputs.map((x, i) => {
          const y = inY(i) + 20;
          return (
            <motion.path
              key={x.label}
              d={`M 190 ${y} C 240 ${y}, ${ENG.x - 40} ${LINK_Y}, ${ENG.x} ${LINK_Y}`}
              fill="none"
              stroke="var(--color-cyan)"
              strokeOpacity={0.4}
              strokeWidth={1.1}
              initial={fresh ? (lite ? { opacity: 0 } : { pathLength: 0 }) : false}
              animate={lite ? { opacity: 1 } : { pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: EASE }}
            />
          );
        })}
        {SYNTHESIS.outputs.map((x, i) => {
          const y = outY(i) + 20;
          return (
            <motion.path
              key={x.label}
              d={`M ${engRight} ${LINK_Y} C ${engRight + 40} ${LINK_Y}, ${OUT.x + 30} ${y}, ${OUT.x + 70} ${y}`}
              fill="none"
              stroke="var(--color-cyan)"
              strokeOpacity={0.4}
              strokeWidth={1.1}
              initial={fresh ? (lite ? { opacity: 0 } : { pathLength: 0 }) : false}
              animate={lite ? { opacity: 1 } : { pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.08, ease: EASE }}
            />
          );
        })}
      </svg>
      {SYNTHESIS.inputs.map((x, i) => {
        const Icon = x.icon;
        return (
          <motion.div key={x.label} {...enter(fresh, 0.15 + i * 0.08, 6)} className="absolute flex h-10 items-center gap-2.5 rounded-xl bg-paper px-3.5 text-[14px] font-semibold text-ink" style={{ left: 40, top: inY(i), width: 150, boxShadow: OBJECT_SHADOW }}>
            <Icon size={15} strokeWidth={1.9} className="text-accent-dark" aria-hidden />
            {x.label}
          </motion.div>
        );
      })}
      {SYNTHESIS.outputs.map((x, i) => {
        const Icon = x.icon;
        return (
          <motion.div key={x.label} {...enter(fresh, 0.55 + i * 0.08, 6)} className="absolute flex h-10 items-center gap-2.5 rounded-xl bg-paper px-3.5 text-[14px] font-semibold text-ink" style={{ left: OUT.x + 70, top: outY(i), width: 168, boxShadow: OBJECT_SHADOW }}>
            <Icon size={15} strokeWidth={1.9} className="text-accent-dark" aria-hidden />
            {x.label}
          </motion.div>
        );
      })}
    </>
  );
}

/** Le moteur, seul, pendant la synthèse. */
function SynthesisCore({ fresh }: { fresh: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center px-6">
      <motion.p {...enter(fresh, 0.4, 6)} className="text-[12px] font-semibold uppercase tracking-[0.18em] text-cyan">
        Déclencheur → règles → actions
      </motion.p>
      <motion.p {...enter(fresh, 0.6, 6)} className="mt-3 text-[22px] font-semibold leading-snug tracking-tight text-text-primary">
        {SYNTHESIS.line[0]}
        <br />
        <span className="text-gradient-strong">{SYNTHESIS.line[1]}</span>
      </motion.p>
      <motion.p {...enter(fresh, 0.9, 4)} className="mt-3 text-[13px] leading-relaxed text-text-secondary">
        Chaque étape est écrite, vérifiée et gardée au journal.
      </motion.p>
    </div>
  );
}
