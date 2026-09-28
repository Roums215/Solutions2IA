/* Solutions 2IA — film hero : composant à monter dans la page.
 * Un seul arbre React, une seule horloge, sept chapitres plein cadre.
 */
'use client';

import React from 'react';
import { FilmStage, Shot, buildCues, useComposition, type SceneName } from './film-runtime';
import { Environment, C, F } from './film-core';
import { SceneIntro, SceneAgent, SceneAuto } from './film-chapters-a';
import { SceneMemory, SceneWeb, SceneApp, SceneFinal } from './film-chapters-b';

const RENDERERS: Record<SceneName, (p: { tl: number; showLabel: boolean }) => React.ReactNode> = {
  Intro: ({ tl }) => <SceneIntro tl={tl} />,
  AgentIA: ({ tl, showLabel }) => <SceneAgent tl={tl} showLabel={showLabel} />,
  Automatisation: ({ tl, showLabel }) => <SceneAuto tl={tl} showLabel={showLabel} />,
  Memoire: ({ tl, showLabel }) => <SceneMemory tl={tl} showLabel={showLabel} />,
  SiteWeb: ({ tl, showLabel }) => <SceneWeb tl={tl} showLabel={showLabel} />,
  Application: ({ tl, showLabel }) => <SceneApp tl={tl} showLabel={showLabel} />,
  Final: ({ tl }) => <SceneFinal tl={tl} />,
};

function Film({
  only,
  showGrid,
  showChapterLabels,
}: {
  only?: SceneName[];
  showGrid: boolean;
  showChapterLabels: boolean;
}) {
  const { T, CUES } = useComposition();
  const { order, duration } = React.useMemo(() => buildCues(only), [only && only.join(',')]);

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
            {render({ tl: T - start, showLabel: showChapterLabels })}
          </Shot>
        );
      })}
    </div>
  );
}

export type SolutionsFilmProps = {
  /** Chapitres joués, dans l'ordre. Par défaut : le film complet (117 s). */
  only?: SceneName[];
  /** Sol en perspective. */
  showGrid?: boolean;
  /** Étiquette discrète « 01 / 05 — AGENT IA » en haut à gauche. */
  showChapterLabels?: boolean;
  /** `width` : le film remplit la largeur du conteneur en 16/9 (recommandé). */
  fit?: 'width' | 'contain';
  loop?: boolean;
  rate?: number;
  /** Image fixe servie quand prefers-reduced-motion est actif. */
  posterTime?: number;
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
  posterTime = 26.5,
  className,
  style,
}: SolutionsFilmProps) {
  return (
    <FilmStage
      only={only}
      fit={fit}
      loop={loop}
      rate={rate}
      posterTime={posterTime}
      className={className}
      style={style}
    >
      <Film only={only} showGrid={showGrid} showChapterLabels={showChapterLabels} />
    </FilmStage>
  );
}
