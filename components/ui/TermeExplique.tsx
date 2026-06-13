"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { GLOSSAIRE, type GlossaireKey } from "@/lib/content/glossaire";
import { cn } from "@/lib/utils/cn";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

/**
 * Tooltip pédagogique — un terme reste visible mais souligné en pointillé ;
 * au survol (desktop), au tap (mobile) ou au focus (clavier), une bulle
 * l'explique en une phrase de français simple.
 *
 * - Source unique des définitions : lib/content/glossaire.ts
 * - Accessible : <button> focusable, aria-describedby, fermeture Escape,
 *   cible tactile ≥ 44px (padding invisible), tap extérieur ferme.
 * - Le visiteur apprend sans être embrouillé (PLAN §Règles de contenu).
 *
 * Usage :
 *   <TermeExplique k="rag" />            → affiche le terme du glossaire
 *   <TermeExplique k="api">l'API</TermeExplique>  → texte custom, même définition
 */
export function TermeExplique({
  k,
  children,
  className,
}: PropsWithChildren<{ k: GlossaireKey; className?: string }>) {
  const entry = GLOSSAIRE[k];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();
  const { disableContentMotion } = usePerformanceMode();

  const close = useCallback(() => setOpen(false), []);

  // Fermeture : Escape ou tap/clic extérieur.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  return (
    <span ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative inline cursor-help rounded-sm border-0 bg-transparent p-0 font-inherit text-inherit",
          "underline decoration-dotted decoration-accent-light/60 underline-offset-[3px]",
          "transition-colors duration-200 hover:decoration-accent-light focus-visible:outline-2 focus-visible:outline-accent-light/60 focus-visible:outline-offset-2",
          // Cible tactile ≥ 44px sans casser la ligne : zone de tap invisible.
          "before:absolute before:-inset-y-3 before:-inset-x-1 before:content-['']",
        )}
      >
        {children ?? entry.terme}
      </button>

      <AnimatePresence>
        {open && (
          <motion.span
            id={tooltipId}
            role="tooltip"
            initial={disableContentMotion ? false : { opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={disableContentMotion ? undefined : { opacity: 0, y: 2, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute left-1/2 bottom-full z-50 mb-2 block w-64 -translate-x-1/2",
              "rounded-xl border border-border-accent bg-bg-card/95 px-4 py-3 backdrop-blur-md",
              "shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
              "text-[13px] font-normal normal-case leading-relaxed tracking-normal text-text-secondary",
            )}
          >
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-light">
              {entry.terme}
            </span>
            {entry.definition}
            <span
              aria-hidden
              className="absolute left-1/2 top-full -mt-px h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border-accent bg-bg-card/95"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
