"use client";

/* ────────────────────────────────────────────────────────────────────────────
 * Pause hors écran mutualisée pour les animations motion en boucle.
 *
 * `animation-play-state` CSS n'a AUCUN effet sur les animations motion
 * (inline styles / WAAPI). La vraie technique : conditionner la prop
 * `animate` via useInView de motion/react :
 *
 *   const paused = useInViewPause();
 *   <motion.div animate={paused ? undefined : { y: [0, -6, 0] }} … />
 *
 * Avec `animate: undefined`, motion gèle la valeur courante (pas de reset
 * visuel) et libère son ticker ; au retour en vue, la boucle repart de la
 * valeur courante.
 *
 * Cas SMIL (<animateMotion>) : insensibles au CSS comme à motion →
 * conditionner le RENDU des nœuds avec `paused` (les retirer du DOM stoppe
 * l'animation).
 *
 * Les reveals `whileInView` + `viewport={{ once: true }}` existants sont déjà
 * auto-pausés par nature — ne pas les toucher.
 * ──────────────────────────────────────────────────────────────────────────── */

import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from "react";
import { useInView } from "motion/react";

const InViewCtx = createContext(true); // hors wrapper : jamais en pause

/** true quand la zone <PauseOffscreen> englobante est hors écran. */
export function useInViewPause(): boolean {
  return !useContext(InViewCtx);
}

/**
 * Wrapper mutualisé — un seul IntersectionObserver par zone.
 * `margin` généreuse par défaut pour relancer les boucles avant que la zone
 * n'entre à l'écran (évite le pop visuel).
 */
export function PauseOffscreen({
  children,
  className,
  margin = "240px",
}: PropsWithChildren<{ className?: string; margin?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  // PAS once:true — on veut pause ET reprise.
  const inView = useInView(ref, {
    margin: margin as `${number}px`,
    amount: 0,
  });

  return (
    <div ref={ref} className={className}>
      <InViewCtx.Provider value={inView}>{children}</InViewCtx.Provider>
    </div>
  );
}
