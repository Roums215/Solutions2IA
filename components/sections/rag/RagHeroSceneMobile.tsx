"use client";

import { AnimatePresence, motion } from "motion/react";
import { PauseOffscreen } from "@/lib/animation/inViewPause";
import { cn } from "@/lib/utils/cn";
import { RAG_SCENE_LABEL } from "./ragHeroSceneData";
import {
  AnswerCard,
  EASE,
  PageExtract,
  PlayToggle,
  QuestionBubble,
  ScenarioChips,
  SearchStatus,
  SpokenAnswer,
  useRagDemo,
} from "./ragHeroSceneParts";

/**
 * Hero de /rag sur téléphone : pas la scène ordinateur réduite, une colonne. La question,
 * la recherche, la réponse et ses sources, puis l'extrait surligné, l'un sous l'autre.
 * Mêmes trois questions, mêmes boutons (cibles de 44 px), même lecture automatique.
 * Minimal et prefers-reduced-motion : la réponse finale, fixe.
 */

export function RagHeroSceneMobile({ className }: { className?: string }) {
  return (
    <PauseOffscreen className={cn("relative", className)}>
      <MobileStage />
    </PauseOffscreen>
  );
}

function MobileStage() {
  const { s, index, run, animated, fresh, auto, playing, pick, toggle } = useRagDemo();
  // Rendu serveur = réponse finale ; à l'hydratation, `animated` change la clé et la
  // première question se déroule depuis le début au lieu de mélanger les deux états.
  const key = `${index}-${run}-${animated ? "a" : "s"}`;

  return (
    <div data-rag-mobile={animated ? key : "static"} role="group" aria-label={RAG_SCENE_LABEL}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">Démonstration · documents d&apos;exemple</p>
        {animated && <PlayToggle playing={playing} toggle={toggle} withLabel />}
      </div>

      <ScenarioChips index={index} pick={pick} short className="mt-3 overflow-x-auto pb-1" />

      <div aria-hidden className="mt-4 min-h-[31rem]">
        <AnimatePresence mode="wait">
          <motion.div key={key} className="space-y-3.5" exit={{ opacity: 0, y: -6, transition: { duration: 0.25, ease: EASE } }}>
            <QuestionBubble s={s} fresh={fresh} />
            <SearchStatus s={s} fresh={fresh} passages={false} />
            <AnswerCard s={s} fresh={fresh} />
            <PageExtract s={s} fresh={fresh} />
          </motion.div>
        </AnimatePresence>
      </div>

      <SpokenAnswer s={s} auto={auto} />
    </div>
  );
}
