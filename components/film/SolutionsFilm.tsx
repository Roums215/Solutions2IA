/* Solutions 2IA — film hero : composant à monter dans la page.
 * Un seul arbre React, une seule horloge, sept chapitres plein cadre.
 */
'use client';

import React from 'react';
import { FilmStage, Shot, useCues, useComposition, type SceneName } from './film-runtime';
import { Environment, C, F } from './film-core';
import { SceneIntro, SceneAgent, SceneAuto } from './film-chapters-a';
import { SceneMemory, SceneWeb, SceneApp, SceneFinal } from './film-chapters-b';

type RenderProps = { tl: number; showLabel: boolean; ctaHref?: string };

const RENDERERS: Record<SceneName, (p: RenderProps) => React.ReactNode> = {
  Intro: ({ tl }) => <SceneIntro tl={tl} />,
  AgentIA: ({ tl, showLabel }) => <SceneAgent tl={tl} showLabel={showLabel} />,
  Automatisation: ({ tl, showLabel }) => <SceneAuto tl={tl} showLabel={showLabel} />,
  Memoire: ({ tl, showLabel }) => <SceneMemory tl={tl} showLabel={showLabel} />,
  SiteWeb: ({ tl, showLabel }) => <SceneWeb tl={tl} showLabel={showLabel} />,
  Application: ({ tl, showLabel }) => <SceneApp tl={tl} showLabel={showLabel} />,
  Final: ({ tl, ctaHref }) => <SceneFinal tl={tl} ctaHref={ctaHref} />,
};

/** Image fixe par défaut : fin du chapitre Agent IA (ligne téléphone → CRM → agenda → équipe). */
const AGENT_POSTER_OFFSET = 19.5;

function Film({
  only,
  showGrid,
  showChapterLabels,
  ctaHref,
}: {
  only?: readonly SceneName[];
  showGrid: boolean;
  showChapterLabels: boolean;
  ctaHref?: string;
}) {
  const { T, CUES } = useComposition();
  const { order, duration } = useCues(only);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#04050d',
        fontFamily: F.body,
        color: C.ink,
        overflow: 'hidden',
      }}
    >
      <Environment T={T} CUES={CUES} showGrid={showGrid} />
      {order.map((name, i) => {
        const start = CUES[name] as number;
        const next = i + 1 < order.length ? (CUES[order[i + 1]] as number) : duration + 60;
        // L'intro chevauche légèrement le chapitre suivant : le signal lumineux
        // se transforme en téléphone pendant les 0,8 s de recouvrement.
        const to = name === 'Intro' ? next + 0.8 : next;
        const render = RENDERERS[name];
        return (
          <Shot key={name} from={i === 0 ? 0 : start - 0.01} to={to}>
            {render({ tl: T - start, showLabel: showChapterLabels, ctaHref })}
          </Shot>
        );
      })}
    </div>
  );
}

export type SolutionsFilmProps = {
  /** Chapitres joués, dans l'ordre. Par défaut : le film complet (117 s). */
  only?: readonly SceneName[];
  /** Sol en perspective. */
  showGrid?: boolean;
  /** Étiquette discrète « 01 / 05 · AGENT IA » en haut à gauche. */
  showChapterLabels?: boolean;
  /** `width` : le film remplit la largeur du conteneur en 16/9 (recommandé). */
  fit?: 'width' | 'contain';
  loop?: boolean;
  rate?: number;
  /**
   * Image fixe servie quand prefers-reduced-motion est actif (ou `rate={0}`), en secondes
   * dans le découpage joué. Par défaut : fin du chapitre Agent IA, où qu'il tombe dans `only`.
   */
  posterTime?: number;
  /** Pause demandée par le visiteur. */
  paused?: boolean;
  /** Rend le bouton « Parler de mon besoin » du chapitre final cliquable (souris). */
  ctaHref?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function SolutionsFilm({
  only,
  showGrid = true,
  showChapterLabels = true,
  fit = 'width',
  loop = true,
  rate = 1,
  posterTime,
  paused = false,
  ctaHref,
  className,
  style,
}: SolutionsFilmProps) {
  const { cues } = useCues(only);
  const poster = posterTime ?? (cues.AgentIA !== undefined ? cues.AgentIA + AGENT_POSTER_OFFSET : 0);

  return (
    <FilmStage
      only={only}
      fit={fit}
      loop={loop}
      rate={rate}
      posterTime={poster}
      paused={paused}
      className={className}
      style={style}
    >
      <Film only={only} showGrid={showGrid} showChapterLabels={showChapterLabels} ctaHref={ctaHref} />
    </FilmStage>
  );
}
