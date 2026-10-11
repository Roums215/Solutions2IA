"use client";

import { Children, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Rail horizontal sur téléphone, grille d'origine dès md (octobre 2026, passe iPhone).
 * Les séries de cartes empilées (fiches, étapes, engagements) faisaient défiler l'écran
 * sur plusieurs hauteurs : sous 768 px elles deviennent un rail qu'on fait glisser au
 * doigt, aligné sur le texte (scroll-snap), la carte suivante dépasse pour montrer qu'il
 * y en a d'autres, et un repère « 2 / 5 » en traits fins (pas de pastilles).
 *
 * `className` ne porte que la grille d'ordinateur (md:grid-cols-…, lg:…, gap) : jamais
 * `grid` seul, qui écraserait le rail. Les enfants directs sont les éléments du rail.
 */

export function MobileRail({
  as: Tag = "ul",
  className,
  label,
  children,
  ...rest
}: {
  /** « ul », « ol », ou un composant de liste animé (motion.ul, motion.ol). */
  as?: React.ElementType;
  className?: string;
  /** Nom du rail pour les lecteurs d'écran (« Les cinq services »…). */
  label?: string;
  children: React.ReactNode;
  /** Props transmises à la liste (variants, initial, whileInView… d'une liste animée). */
  [prop: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const count = Children.count(children);
  const [index, setIndex] = useState(0);
  const [isRail, setIsRail] = useState(false);

  // Le rail n'existe que sous md : focusable au clavier seulement là où il défile.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsRail(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isRail) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const first = el.firstElementChild as HTMLElement | null;
        if (!first) return;
        const step = first.getBoundingClientRect().width + (parseFloat(getComputedStyle(el).columnGap) || 0);
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
        setIndex(atEnd ? count - 1 : Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / step))));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [count, isRail]);

  return (
    // min-w-0 : dans une grille ou un flex, l'enveloppe ne doit jamais s'élargir à la
    // largeur totale du rail (sinon la colonne entière déborde et coupe ses voisins).
    <div className="relative min-w-0">
      <Tag
        {...rest}
        ref={ref}
        aria-label={label}
        tabIndex={isRail ? 0 : undefined}
        className={cn(
          // Téléphone : le rail, de bord à bord, cartes alignées sur la marge du texte
          // (clamp(1rem,4vw,1.5rem) = padding-inline de .section-container, écrit en toutes lettres pour Tailwind)
          "-mx-[clamp(1rem,4vw,1.5rem)] flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[clamp(1rem,4vw,1.5rem)] scroll-px-[clamp(1rem,4vw,1.5rem)] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "*:w-[86%] *:max-w-[24rem] *:shrink-0 *:snap-start",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan",
          // Tablette et ordinateur : la grille d'origine
          "md:mx-0 md:grid md:snap-none md:overflow-visible md:px-0 md:pb-0 md:*:w-auto md:*:max-w-none",
          className,
        )}
      >
        {children}
      </Tag>

      {count > 1 && (
        <div aria-hidden className="mt-4 flex items-center gap-3 md:hidden">
          <span className="flex flex-1 gap-1">
            {Array.from({ length: count }, (_, i) => (
              <span key={i} className={cn("h-[3px] flex-1 rounded-full transition-colors duration-300", i === index ? "bg-cyan" : "bg-border-medium")} />
            ))}
          </span>
          <span className="shrink-0 font-mono text-[12px] tabular-nums text-text-tertiary">
            {index + 1} / {count}
          </span>
        </div>
      )}
    </div>
  );
}
