"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";

/**
 * Ce qui passe sous le menu fixe : le site sombre (par défaut) ou une section claire.
 *
 * Une section claire s'annonce avec `useLightHeaderZone(ref)` ; le Header lit
 * `useHeaderOnLight()` et passe ses textes à l'encre tant qu'elle est dessous.
 * Aucune page ne s'annonce : le menu garde son rendu habituel partout ailleurs.
 */

// Hauteur de lecture : le milieu du menu (h-24, lg:h-28), là où sont le logo et les liens.
const PROBE_Y = 52;

let onLight = false;
const listeners = new Set<() => void>();
// Plusieurs sections claires par page (hero, puis les sections de l'accueil) : chacune
// dit seulement si ELLE passe sous le menu. Le menu est clair dès qu'au moins une y est.
// Sans ce registre, la dernière section montée éteignait le menu clair du hero.
const zonesUnderHeader = new Set<HTMLElement>();

function setOnLight(next: boolean) {
  if (next === onLight) return;
  onLight = next;
  listeners.forEach((l) => l());
}

function reportZone(el: HTMLElement, under: boolean) {
  if (under) zonesUnderHeader.add(el);
  else zonesUnderHeader.delete(el);
  setOnLight(zonesUnderHeader.size > 0);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** true quand une section claire passe sous le menu. */
export function useHeaderOnLight(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => onLight,
    () => false,
  );
}

/** Déclare la section `ref` comme claire pour le menu, tant qu'elle est montée. */
export function useLightHeaderZone(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, bottom } = el.getBoundingClientRect();
      reportZone(el, top <= PROBE_Y && bottom > PROBE_Y);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reportZone(el, false);
    };
  }, [ref]);
}
