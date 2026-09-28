/* Solutions 2IA — moteur d'animation autonome pour le film hero.
 * Aucune dépendance (pas de `motion`, pas de WebGL) : une seule horloge rAF,
 * un seul arbre React, mise à l'échelle du plan 1920×1080 dans son conteneur.
 */
'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

/* ── Easing ─────────────────────────────────────────────────────────── */
export const Easing = {
  linear: (t: number) => t,
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t: number) => t * t * t,
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutQuint: (t: number) => 1 - Math.pow(1 - t, 5),
  easeOutBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/** Rampe temporelle : renvoie une fonction (tl) => valeur interpolée. */
export function animate({
  from,
  to,
  start,
  end,
  ease = Easing.easeInOutCubic,
}: {
  from: number;
  to: number;
  start: number;
  end: number;
  ease?: (t: number) => number;
}) {
  return (tl: number) => {
    if (tl <= start) return from;
    if (tl >= end) return to;
    const p = ease(clamp((tl - start) / (end - start), 0, 1));
    return from + (to - from) * p;
  };
}

/* ── Découpage du film ──────────────────────────────────────────────── */
export type SceneName =
  | 'Intro'
  | 'AgentIA'
  | 'Automatisation'
  | 'Memoire'
  | 'SiteWeb'
  | 'Application'
  | 'Final';

/** Durées de référence (secondes). Ne pas modifier sans revoir les timings internes des scènes. */
export const SCENES: { name: SceneName; dur: number }[] = [
  { name: 'Intro', dur: 7 },
  { name: 'AgentIA', dur: 22.6 },
  { name: 'Automatisation', dur: 19.7 },
  { name: 'Memoire', dur: 18 },
  { name: 'SiteWeb', dur: 20 },
  { name: 'Application', dur: 20.8 },
  { name: 'Final', dur: 9 },
];

export type Cues = Partial<Record<SceneName, number>>;

/** Construit la table des cues (temps de début cumulés) pour une liste de scènes. */
export function buildCues(only?: readonly SceneName[]) {
  const list = only && only.length ? SCENES.filter((s) => only.includes(s.name)) : SCENES;
  const cues: Cues = {};
  let t = 0;
  for (const s of list) {
    cues[s.name] = t;
    t += s.dur;
  }
  return { cues, order: list.map((s) => s.name), duration: t };
}

/** Cues mémoïsées par valeur : un nouveau tableau `only` identique ne recalcule rien. */
export function useCues(only?: readonly SceneName[]) {
  const key = only && only.length ? only.join(',') : '';
  return React.useMemo(() => buildCues(key ? (key.split(',') as SceneName[]) : undefined), [key]);
}

type ClockValue = { T: number; CUES: Cues; duration: number };
const ClockContext = createContext<ClockValue>({ T: 0, CUES: {}, duration: 0 });
export const useComposition = () => useContext(ClockContext);

/** N'affiche ses enfants que pendant la fenêtre [from, to) du temps global. */
export function Shot({
  from,
  to,
  children,
}: {
  from: number;
  to: number;
  children: React.ReactNode;
}) {
  const { T } = useComposition();
  if (T < from || T >= to) return null;
  return <>{children}</>;
}

/* ── Plan (stage) ───────────────────────────────────────────────────── */
export type FilmStageProps = {
  children: React.ReactNode;
  /** Scènes jouées, dans l'ordre du film. Par défaut : les sept. */
  only?: readonly SceneName[];
  /** Largeur/hauteur du plan de composition. Ne pas changer : toutes les positions sont en px de ce plan. */
  width?: number;
  height?: number;
  /** `width` remplit la largeur du conteneur (recommandé) ; `contain` garde le plan entier visible. */
  fit?: 'width' | 'contain';
  bg?: string;
  /** Lecture en boucle (défaut) ou une seule passe. */
  loop?: boolean;
  /** Vitesse de lecture. 1 = temps réel. `0` = image fixe (tier de performance bas). */
  rate?: number;
  /** Image fixe (secondes) utilisée si l'utilisateur demande moins d'animations. */
  posterTime?: number;
  /** Pause demandée par le visiteur : l'image courante reste affichée, la lecture reprend au même instant. */
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function FilmStage({
  children,
  only,
  width = 1920,
  height = 1080,
  fit = 'width',
  bg = '#04050d',
  loop = true,
  rate = 1,
  posterTime = 26.5,
  paused = false,
  className,
  style,
}: FilmStageProps) {
  const { cues, duration } = useCues(only);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0);
  const [T, setT] = useState(0);
  const [reduced, setReduced] = useState(false);
  const visible = useRef(true);
  /* tête de lecture hors état React : survit à une pause, repart à 0 si le découpage change */
  const playhead = useRef(0);

  /* échelle : le plan est dessiné en px 1920×1080 puis mis à l'échelle */
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => {
      const r = host.getBoundingClientRect();
      if (!r.width) return;
      setScale(fit === 'contain' ? Math.min(r.width / width, r.height / height) : r.width / width);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, [fit, width, height]);

  /* respect de prefers-reduced-motion : image fixe, pas d'horloge */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  /* pause hors écran / onglet inactif : aucune frame calculée pour rien */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver((e) => (visible.current = e[0].isIntersecting), {
      threshold: 0.05,
    });
    io.observe(host);
    return () => io.disconnect();
  }, []);

  /* nouveau découpage (autre largeur, autre tier) : le film repart du début */
  useEffect(() => {
    playhead.current = 0;
    setT(0);
  }, [duration]);

  useEffect(() => {
    if (reduced || rate === 0) {
      setT(posterTime);
      return;
    }
    if (paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (visible.current && document.visibilityState === 'visible') {
        let t = playhead.current + dt * rate;
        if (t >= duration) t = loop ? t % duration : duration;
        playhead.current = t;
        setT(t);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, loop, rate, reduced, posterTime, paused]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: fit === 'width' ? `${width} / ${height}` : undefined,
        height: fit === 'contain' ? '100%' : undefined,
        overflow: 'hidden',
        background: bg,
        ...style,
      }}
    >
      {scale > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            willChange: 'transform',
          }}
        >
          <ClockContext.Provider value={{ T, CUES: cues, duration }}>
            {children}
          </ClockContext.Provider>
        </div>
      )}
    </div>
  );
}
