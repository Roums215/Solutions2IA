"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { History, Pause, Play } from "lucide-react";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import { AI_IDLE_DURATION, AI_MOBILE_PHASES, AI_SCENE_LABEL, FINAL_PHASE, REQUEST, type AiMobilePhase, type AiPhase } from "./aiHeroSceneData";
import { Dossier, EASE, PhoneFrame, PhoneScreens, enter, type PhoneScreenId } from "./aiHeroSceneParts";

/**
 * Le hero de /agents-ia sur téléphone : l'iPhone au centre, le dossier en petit dessous.
 * Quatre moments de LA MÊME demande (appel, message, décision, validation), pas la scène
 * ordinateur réduite. Plan fixe 340 × 600 mis à l'échelle en CSS pur. Minimal et
 * prefers-reduced-motion : l'état final, fixe.
 */

const W = 340;
const H = 600;
const SCREEN: Record<AiMobilePhase, PhoneScreenId> = { 0: "idle", 1: "call", 2: "chat", 3: "decision", 4: "validate" };
/** Le dossier sous le téléphone suit la même histoire que sur ordinateur. */
const DOSSIER: Record<AiMobilePhase, AiPhase> = { 0: 0, 1: 1, 2: 2, 3: 4, 4: 5 };

export function AiHeroSceneMobile({ className }: { className?: string }) {
  return (
    <PauseOffscreen className={cn("relative", className)}>
      <MobileStage />
    </PauseOffscreen>
  );
}

function MobileStage() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const offscreen = useInViewPause();
  const [phase, setPhase] = useState<AiMobilePhase>(0);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const animated = mounted && !disableContentMotion;
  const running = animated && !offscreen && !userPaused && !tabHidden;
  const fresh = animated;

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const duration = phase === 0 ? AI_IDLE_DURATION : AI_MOBILE_PHASES[phase - 1].duration;
    const timer = window.setTimeout(() => setPhase((p) => (p === 4 ? 0 : ((p + 1) as AiMobilePhase))), duration);
    return () => window.clearTimeout(timer);
  }, [running, phase]);

  const def = AI_MOBILE_PHASES[Math.max(phase, 1) - 1];
  const dossierPhase: AiPhase = animated ? DOSSIER[phase] : FINAL_PHASE;

  return (
    <div data-ai-mobile-phase={animated ? phase : "static"}>
      <div role="img" aria-label={AI_SCENE_LABEL} className="@container relative mx-auto w-full max-w-[22rem]" style={{ aspectRatio: `${W} / ${H}` }}>
        <div aria-hidden className="absolute left-0 top-0 origin-top-left [scale:tan(atan2(100cqw,340px))]" style={{ width: W, height: H }}>
          <PhoneFrame className="absolute left-[60px] top-0 h-[430px] w-[220px]">
            <PhoneScreens screen={animated ? SCREEN[phase] : "done"} fresh={fresh} />
          </PhoneFrame>

          {/* Le dossier, en petit, sous le téléphone */}
          <div
            className="absolute inset-x-0 top-[442px] rounded-2xl bg-paper px-4 pb-3 pt-3 ring-1 ring-ink/10"
            style={{ boxShadow: "0 1px 2px color-mix(in oklab, var(--color-ink) 10%, transparent), 0 24px 44px -26px color-mix(in oklab, var(--color-ink) 45%, transparent)" }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-3">Dossier {REQUEST.ref}</p>
              {animated && phase < 4 ? (
                <span className="flex gap-1">
                  {[1, 2, 3, 4].map((n) => (
                    <span key={n} className={cn("h-[2px] w-4 rounded-full transition-colors duration-500", n <= phase ? "bg-accent-primary" : "bg-ink/10")} />
                  ))}
                </span>
              ) : (
                <motion.span {...enter(fresh, 3.2, 2)} className="flex items-center gap-1 text-[10.5px] font-semibold text-accent-dark">
                  <History size={11} strokeWidth={2.2} aria-hidden />
                  Tout est tracé
                </motion.span>
              )}
            </div>
            <div className="mt-1 min-h-[117px]">
              <Dossier phase={dossierPhase} fresh={fresh} compact />
            </div>
          </div>
        </div>
      </div>

      {/* Légende et pause */}
      <div className="mx-auto mt-4 flex max-w-[22rem] items-center gap-3">
        <div aria-hidden className="min-w-0 flex-1">
          <AnimatePresence initial={false} mode="wait">
            <motion.p
              key={animated ? phase : "static"}
              className="text-[14px] leading-snug"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {!animated ? (
                <span className="text-text-secondary">Demande, vérification, validation, actions tracées.</span>
              ) : phase === 0 ? (
                <span className="text-text-secondary">Une demande, suivie de bout en bout.</span>
              ) : (
                <>
                  <span className="font-semibold text-text-primary">{def.title}</span>
                  <span className="text-text-secondary"> · {def.line}</span>
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
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-paper-line-strong bg-paper text-ink-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
          >
            {userPaused ? <Play className="h-3.5 w-3.5 translate-x-px" strokeWidth={2} aria-hidden /> : <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />}
          </button>
        )}
      </div>
    </div>
  );
}
