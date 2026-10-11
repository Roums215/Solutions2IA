"use client";

import { AnimatePresence, motion } from "motion/react";
import { BookOpenText, FileText } from "lucide-react";
import { PauseOffscreen } from "@/lib/animation/inViewPause";
import { RAG_SCENE_LABEL, T } from "./ragHeroSceneData";
import {
  AnswerCard,
  DocRows,
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
 * Hero de /rag (≥ md) : la démonstration. À gauche, les sept documents d'exemple, puis la
 * page source qui s'ouvre sur le passage ; à droite, la fenêtre de la mémoire : la
 * question, la recherche, la réponse et ses deux sources. Trois questions en lecture
 * automatique, ou celle que le visiteur choisit.
 *
 * Plan fixe 860 × 524 mis à l'échelle en CSS pur ; horloge en setTimeout (useRagDemo) ;
 * transform et opacity pour le mouvement, couleur de fond seulement pour les états.
 * Minimal et prefers-reduced-motion : la réponse finale, fixe, les boutons restent actifs.
 */

const W = 860;
const H = 524;
const LEFT = { w: 290 };
const DOCS = { h: 310 };
const PAGE = { y: 326, h: 144 };
const WIN = { x: 318, w: 542, h: 470 };
/** Le fil part du passage surligné et touche le bord de la carte réponse. */
const THREAD = { from: PAGE.y + 84, to: 372, end: WIN.x + 20 };

export function RagHeroScene() {
  return (
    <PauseOffscreen className="hero-enter-fade absolute inset-0">
      <Stage />
    </PauseOffscreen>
  );
}

function Stage() {
  const { s, index, run, animated, fresh, auto, playing, pick, toggle } = useRagDemo();
  const key = `${index}-${run}`;

  return (
    <div
      data-rag-phase={animated ? key : "static"}
      className="absolute left-0 top-0 origin-top-left [scale:tan(atan2(100cqw,860px))]"
      style={{ width: W, height: H }}
    >
      <div role="group" aria-label={RAG_SCENE_LABEL} className="absolute inset-0">
        {/* Gauche, en haut : vos documents */}
        <div aria-hidden className="absolute" style={{ left: 0, top: 0, width: LEFT.w, height: DOCS.h }}>
          <div className="panel-card h-full overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between gap-2 border-b border-border-medium px-4 py-3">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-text-secondary">Vos documents</p>
              <p className="text-[11.5px] text-text-tertiary">7 sources</p>
            </div>
            <DocRows key={key} s={s} fresh={fresh} />
          </div>
        </div>

        {/* Gauche, en bas : la page source, ouverte sur le passage */}
        <div aria-hidden className="absolute" style={{ left: 0, top: PAGE.y, width: LEFT.w, height: PAGE.h }}>
          <div className="absolute inset-0 grid place-items-center rounded-xl border border-dashed border-border-medium">
            <p className="flex items-center gap-2 text-[12px] text-text-tertiary">
              <FileText size={13} strokeWidth={1.9} aria-hidden />
              La page source s&apos;ouvre ici
            </p>
          </div>
          <AnimatePresence>
            <motion.div key={key} className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
              <PageExtract s={s} fresh={fresh} className="h-full" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Droite : la fenêtre de la mémoire */}
        <div className="absolute" style={{ left: WIN.x, top: 0, width: WIN.w, height: WIN.h }}>
          <div className="panel-card flex h-full flex-col overflow-hidden rounded-2xl ring-1 ring-cyan/25">
            <div aria-hidden className="flex items-center gap-2 border-b border-border-medium px-5 py-3">
              <BookOpenText size={15} strokeWidth={1.9} className="text-cyan" />
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-text-secondary">Mémoire d&apos;entreprise</p>
            </div>

            <div className="flex items-center gap-3 border-b border-border-medium px-5 py-2.5">
              <p aria-hidden className="text-[12px] text-text-tertiary">Essayez :</p>
              <ScenarioChips index={index} pick={pick} />
            </div>

            <div aria-hidden className="relative min-h-0 flex-1 px-5 py-4">
              <AnimatePresence>
                <motion.div
                  key={key}
                  className="absolute inset-x-5 top-4 space-y-3.5"
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.3, ease: EASE } }}
                >
                  <QuestionBubble s={s} fresh={fresh} />
                  <SearchStatus s={s} fresh={fresh} />
                  <AnswerCard s={s} fresh={fresh} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div aria-hidden className="flex items-center justify-between gap-3 border-t border-border-medium px-5 py-2 text-[11px] text-text-tertiary">
              <span>Chaque réponse renvoie à son document</span>
              <span>Maquette · documents d&apos;exemple</span>
            </div>
          </div>
        </div>

        {/* Le fil : du passage surligné à la réponse qui le cite (au-dessus de la fenêtre) */}
        <svg aria-hidden className="pointer-events-none absolute inset-0 overflow-visible" width={W} height={H}>
          <motion.path
            key={key}
            d={`M ${LEFT.w} ${THREAD.from} C ${LEFT.w + 24} ${THREAD.from}, ${THREAD.end - 30} ${THREAD.to}, ${THREAD.end} ${THREAD.to}`}
            fill="none"
            stroke="var(--color-cyan)"
            strokeOpacity={0.75}
            strokeWidth={1.4}
            initial={fresh ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: fresh ? 0.5 : 0, delay: fresh ? T.page + 0.2 : 0, ease: EASE }}
          />
          <motion.circle
            key={`${key}-dot`}
            cx={THREAD.end}
            cy={THREAD.to}
            r={3}
            fill="var(--color-cyan)"
            initial={fresh ? { opacity: 0, scale: 0 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: fresh ? 0.25 : 0, delay: fresh ? T.page + 0.65 : 0, ease: EASE }}
          />
        </svg>

        <SpokenAnswer s={s} auto={auto} />
      </div>

      {/* Ce qu'il faut retenir, et la pause */}
      <div className="absolute flex items-center gap-4" style={{ left: WIN.x, right: 0, top: WIN.h + 16 }}>
        <div aria-hidden className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={key}
              className="text-[18px] leading-snug tracking-tight"
              initial={fresh ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, delay: fresh ? T.result : 0, ease: EASE }}
            >
              <span className="text-text-secondary">{s.result[0]} </span>
              <span className="font-semibold text-text-primary">{s.result[1]}</span>
            </motion.p>
          </AnimatePresence>
        </div>
        {animated && <PlayToggle playing={playing} toggle={toggle} />}
      </div>
    </div>
  );
}
