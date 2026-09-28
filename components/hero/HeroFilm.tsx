"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { SceneName } from "@/components/film/film-runtime";
import { usePerformanceMode, type PerfTier } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";

// Film client-only (rAF, ResizeObserver) : chunk séparé, jamais dans le chemin du LCP.
// Pas de fallback : le cadre ci-dessous peint déjà le fond du film à la bonne taille.
const SolutionsFilm = dynamic(() => import("@/components/film/SolutionsFilm"), {
  ssr: false,
  loading: () => null,
});

/* Seuils de lisibilité du handoff (README, « Contrainte de lisibilité ») : le film est
 * composé en 1920 px et tous ses textes suivent l'échelle largeur / 1920. */
const FULL_FILM_MIN_WIDTH = 1380;
const SHORT_CUT_MIN_WIDTH = 1040;

type Cut = "full" | "short" | "agent";

// Tableaux stables au niveau module : même référence d'un rendu à l'autre.
const CUT_SCENES: Record<Cut, readonly SceneName[] | undefined> = {
  full: undefined,
  short: ["Intro", "AgentIA", "Final"],
  agent: ["AgentIA"],
};

const CUT_LABELS: Record<Cut, string> = {
  agent:
    "Film de démonstration : un agent IA décroche un appel client, comprend la demande de devis, crée la fiche client, réserve le rendez-vous de jeudi 14 h et prévient l'équipe.",
  short:
    "Film de démonstration : un agent IA décroche un appel client, comprend la demande de devis, crée la fiche client, réserve le rendez-vous et prévient l'équipe. Le film se termine sur les cinq services reliés : agent IA, automatisation, mémoire d'entreprise, site web et application métier.",
  full:
    "Film de démonstration des cinq services. Un agent IA traite un appel client et réserve le rendez-vous. Une automatisation recopie ce rendez-vous d'une application à l'autre sans ressaisie. La mémoire d'entreprise retrouve la bonne procédure et cite sa source. Un site web prend un rendez-vous et prévient le CRM, l'agenda et la messagerie. Une application métier réunit clients, tâches et documents au même endroit.",
};

function pickCut(width: number, tier: PerfTier): Cut {
  // Tier réduit (PC modeste, tablette) : la coupe la plus légère, quelle que soit la largeur.
  if (tier !== "full") return "agent";
  if (width >= FULL_FILM_MIN_WIDTH) return "full";
  if (width >= SHORT_CUT_MIN_WIDTH) return "short";
  return "agent";
}

export function HeroFilm({ className }: { className?: string }) {
  const { mounted, tier, prefersReducedMotion, saveData, slowConnection } = usePerformanceMode();
  const frameRef = useRef<HTMLDivElement>(null);
  const [cut, setCut] = useState<Cut | null>(null);
  const [paused, setPaused] = useState(false);

  // Données économisées ou réseau lent : on ne télécharge pas le film du tout.
  const skip = saveData || slowConnection;

  useEffect(() => {
    const frame = frameRef.current;
    if (!mounted || skip || !frame) return;
    const update = () => {
      // Largeur nulle = cadre masqué (mobile, display: none) : le chunk n'est jamais demandé.
      const width = frame.getBoundingClientRect().width;
      if (width > 0) setCut(pickCut(width, tier));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [mounted, skip, tier]);

  if (mounted && skip) return null;

  // Tier minimal (FPS effondré, etc.) : image fixe. prefers-reduced-motion est géré
  // par le film lui-même (image fixe, horloge jamais démarrée).
  const rate = tier === "minimal" ? 0 : 1;
  const canPause = cut !== null && rate !== 0 && !prefersReducedMotion;

  return (
    <div className={cn("relative", className)}>
      {/* Halo de marque derrière le film */}
      <div
        aria-hidden
        data-decor="halo"
        className="pointer-events-none absolute -inset-x-10 -inset-y-12 rounded-full bg-accent-primary/10 blur-[110px]"
      />

      <div
        ref={frameRef}
        role="img"
        aria-label={CUT_LABELS[cut ?? "agent"]}
        className="relative isolate aspect-video w-full overflow-hidden rounded-2xl border border-border-subtle bg-film-bg shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        {cut && (
          <div aria-hidden className="absolute inset-0">
            <SolutionsFilm
              only={CUT_SCENES[cut]}
              rate={rate}
              paused={paused}
              ctaHref="/contact"
              className="isolate"
            />
          </div>
        )}
      </div>

      {canPause && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Reprendre la lecture du film" : "Mettre le film en pause"}
          aria-pressed={paused}
          className="absolute right-3 bottom-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border-medium bg-bg-primary/60 text-text-secondary backdrop-blur-sm transition-colors duration-300 hover:border-border-accent hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          {paused ? (
            <Play className="h-3.5 w-3.5 translate-x-px" strokeWidth={2} aria-hidden />
          ) : (
            <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          )}
        </button>
      )}
    </div>
  );
}
