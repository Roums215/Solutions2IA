"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import { AUTO_SCENE_LABEL, MOBILE_MOMENTS, MOBILE_MOMENT_DURATION, SCENARIOS } from "./autoHeroData";
import { EASE, EngineFrame, EngineSteps, InputCard, JournalList, OutputCard } from "./autoHeroParts";

/**
 * Hero de /automatisation sur téléphone : pas la scène ordinateur réduite, une narration
 * verticale. Quatre moments (déclencheur, workflow, outils, journal), une seule
 * représentation à la fois, et le scénario change tout seul après le journal.
 * Minimal et prefers-reduced-motion : le moment « outils mis à jour », fixe.
 */

export function AutoHeroSceneMobile({ className }: { className?: string }) {
  return (
    <PauseOffscreen className={cn("relative", className)}>
      <MobileStage />
    </PauseOffscreen>
  );
}

function MobileStage() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const offscreen = useInViewPause();
  const [pos, setPos] = useState({ scenario: 0, moment: 0 });
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const animated = mounted && !disableContentMotion;
  const running = animated && !offscreen && !userPaused && !tabHidden;
  const fresh = animated;
  const scenario = animated ? pos.scenario : 0;
  const moment = animated ? pos.moment : 2;
  const s = SCENARIOS[scenario];

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const duration = pos.moment === 3 ? MOBILE_MOMENT_DURATION + 700 : MOBILE_MOMENT_DURATION;
    const t = window.setTimeout(
      () => setPos((p) => (p.moment < 3 ? { ...p, moment: p.moment + 1 } : { scenario: (p.scenario + 1) % SCENARIOS.length, moment: 0 })),
      duration,
    );
    return () => window.clearTimeout(t);
  }, [running, pos]);

  return (
    <div data-auto-mobile={animated ? `${scenario}-${moment}` : "static"} role="img" aria-label={AUTO_SCENE_LABEL}>
      <div aria-hidden>
        {/* Le scénario en cours */}
        <ol className="flex gap-3.5 overflow-hidden">
          {SCENARIOS.map((x, i) => (
            <li key={x.key} className={cn("text-[13px] transition-colors duration-500", i === scenario ? "font-semibold text-text-primary" : "text-text-tertiary")}>
              {x.name}
            </li>
          ))}
        </ol>

        {/* Le moment, et quatre filets */}
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border-medium pt-3">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={moment}
              className="text-[14px] font-semibold text-text-primary"
              initial={fresh ? { opacity: 0, y: 4 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <span className="mr-2 font-mono text-[12px] text-cyan">0{moment + 1}</span>
              {MOBILE_MOMENTS[moment]}
            </motion.p>
          </AnimatePresence>
          <span className="flex shrink-0 gap-1">
            {[0, 1, 2, 3].map((n) => (
              <span key={n} className={cn("h-[2px] w-4 rounded-full transition-colors duration-500", n <= moment ? "bg-cyan" : "bg-border-medium")} />
            ))}
          </span>
        </div>

        {/* Une seule représentation à la fois */}
        <div className="relative mt-4 h-[304px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={`${scenario}-${moment}`}
              className="absolute inset-0"
              initial={fresh ? { opacity: 0, y: 12, scale: 0.99 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {moment === 0 && <InputCard s={s} fresh={fresh} compact />}
              {moment === 1 && (
                <EngineFrame>
                  <EngineSteps s={s} fresh={fresh} quick />
                </EngineFrame>
              )}
              {moment === 2 && (
                <div className="space-y-2.5">
                  {s.outputs.map((o, i) => (
                    <div key={o.label} className="h-[62px]">
                      <OutputCard o={o} fresh={fresh} delay={0.1 + i * 0.2} />
                    </div>
                  ))}
                </div>
              )}
              {moment === 3 && (
                <>
                  <JournalList s={s} fresh={fresh} />
                  <motion.p
                    className="mt-4 text-[17px] leading-snug tracking-tight"
                    initial={fresh ? { opacity: 0, y: 4 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: fresh ? 0.9 : 0, ease: EASE }}
                  >
                    <span className="text-text-secondary">{s.result[0]} </span>
                    <span className="font-semibold text-text-primary">{s.result[1]}</span>
                  </motion.p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {animated && (
        <button
          type="button"
          onClick={() => setUserPaused((v) => !v)}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Reprendre l'animation" : "Mettre l'animation en pause"}
          className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg border border-border-medium bg-bg-card/60 px-3 text-[13px] text-text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          {userPaused ? <Play className="h-3.5 w-3.5" strokeWidth={2} aria-hidden /> : <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />}
          {userPaused ? "Reprendre" : "Pause"}
        </button>
      )}
    </div>
  );
}
