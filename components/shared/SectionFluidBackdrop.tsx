"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";

/**
 * Fonds fluides de l'accueil : des nappes organiques en SVG, très atténuées, une
 * composition par section. Elles donnent de la profondeur sans halo néon, sans
 * particule et sans boucle : tout est statique, seule l'entrée dans l'écran fait
 * un fondu court.
 *
 * Règles : `aria-hidden`, `pointer-events-none`, et le décor est clippé par son
 * conteneur (`overflow-hidden`) pour qu'il n'élargisse jamais la page. Chaque
 * variante a sa composition téléphone, plus simple et plus discrète, plutôt qu'une
 * forme desktop rognée.
 *
 * Aucune dépendance : SVG local, dégradés CSS, transform et opacity uniquement.
 */

export type BackdropVariant =
  | "hero"
  | "proof"
  | "friction"
  | "solutions"
  | "method"
  | "cta"
  // /sites-web : même famille de nappes, compositions propres (flux qui converge,
  // colonne de lecture, paliers qui montent, couches superposées).
  | "webHero"
  | "webSources"
  | "webCost"
  | "webBuild"
  | "webCraft"
  // /applications : colonnes et plans superposés, comme des écrans posés.
  | "appsHero"
  | "appsLight"
  | "appsDark"
  | "appsCase"
  // /agents-ia : ondes concentriques douces, comme une voix qui porte.
  | "aiHero"
  | "aiLight"
  | "aiDark"
  // /automatisation (V3) : trajectoires de flux, pas de points ni de particules
  | "flowHero"
  | "flowLight"
  | "flowDark";

/** Opacité d'ensemble par variante : les sections claires portent moins que les sombres. */
const STRENGTH: Record<BackdropVariant, string> = {
  hero: "opacity-90",
  proof: "opacity-80",
  friction: "opacity-85",
  solutions: "opacity-100",
  method: "opacity-75",
  cta: "opacity-80",
  webHero: "opacity-90",
  webSources: "opacity-85",
  webCost: "opacity-80",
  webBuild: "opacity-95",
  webCraft: "opacity-75",
  appsHero: "opacity-90",
  appsLight: "opacity-85",
  appsDark: "opacity-80",
  appsCase: "opacity-80",
  aiHero: "opacity-90",
  aiLight: "opacity-85",
  aiDark: "opacity-80",
  flowHero: "opacity-90",
  flowLight: "opacity-85",
  flowDark: "opacity-80",
};

export function SectionFluidBackdrop({
  variant,
  /** Solutions : la forme d'accent suit le service choisi (0 à 4). */
  shape = 0,
  className,
}: {
  variant: BackdropVariant;
  shape?: number;
  className?: string;
}) {
  const { disableContentMotion } = usePerformanceMode();
  const still = disableContentMotion;

  return (
    <div
      aria-hidden
      data-decor="fluid"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", STRENGTH[variant], className)}
    >
      <motion.div
        className="absolute inset-0"
        initial={still ? false : { opacity: 0, scale: 1.04 }}
        {...(still
          ? { animate: { opacity: 1, scale: 1 } }
          : { whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: "-10%" } })}
        transition={{ duration: still ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg
          className="absolute inset-0 hidden h-full w-full sm:block"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <Defs variant={variant} />
          <Desktop variant={variant} shape={shape} />
        </svg>

        <svg
          className="absolute inset-0 h-full w-full sm:hidden"
          viewBox="0 0 420 800"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <Defs variant={variant} />
          <Mobile variant={variant} />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Dégradés ───────────────────────────────────────────────────────────────

const INDIGO = "var(--color-accent-primary)";
const VIOLET = "var(--color-accent-dark)";
const CYAN = "var(--color-cyan)";

function Defs({ variant }: { variant: BackdropVariant }) {
  const dark =
    variant === "proof" ||
    variant === "method" ||
    variant === "cta" ||
    variant === "webSources" ||
    variant === "webCraft" ||
    variant === "appsHero" ||
    variant === "appsDark" ||
    variant === "appsCase" ||
    variant === "aiDark" ||
    variant === "flowHero" ||
    variant === "flowDark";
  const a = dark ? 0.16 : 0.17;
  const b = dark ? 0.08 : 0.1;

  return (
    <defs>
      <linearGradient id={`fb-a-${variant}`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor={CYAN} stopOpacity={b} />
        <stop offset="55%" stopColor={INDIGO} stopOpacity={a} />
        <stop offset="100%" stopColor={VIOLET} stopOpacity={b} />
      </linearGradient>
      <linearGradient id={`fb-b-${variant}`} x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={VIOLET} stopOpacity={a * 0.8} />
        <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
      </linearGradient>
      <radialGradient id={`fb-c-${variant}`} cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor={INDIGO} stopOpacity={a * 0.9} />
        <stop offset="100%" stopColor={INDIGO} stopOpacity={0} />
      </radialGradient>
    </defs>
  );
}

// ─── Compositions desktop ───────────────────────────────────────────────────

function Desktop({ variant, shape }: { variant: BackdropVariant; shape: number }) {
  const A = `url(#fb-a-${variant})`;
  const B = `url(#fb-b-${variant})`;
  const C = `url(#fb-c-${variant})`;
  const thread = { stroke: INDIGO, strokeOpacity: 0.18, strokeWidth: 1.1, fill: "none" } as const;

  switch (variant) {
    // Une grande nappe qui monte du téléphone vers l'application, plus un filament.
    case "hero":
      return (
        <>
          <path d="M -60 720 C 180 660, 330 540, 520 486 C 720 430, 880 452, 1260 330 L 1260 860 L -60 860 Z" fill={A} />
          <path d="M 520 -60 C 700 90, 860 150, 1260 96 L 1260 -60 Z" fill={B} />
          <ellipse cx="880" cy="330" rx="330" ry="235" fill={C} />
          <path d="M 150 620 C 380 560, 560 430, 760 390 C 940 354, 1080 372, 1260 300" {...thread} />
        </>
      );

    // Une bande organique traverse les quatre cartes, de Terrain à Client.
    case "proof":
      return (
        <>
          <path
            d="M -60 300 C 200 230, 420 390, 700 320 C 950 258, 1090 366, 1260 300 L 1260 560 C 1090 626, 950 520, 700 580 C 420 648, 200 490, -60 560 Z"
            fill={A}
          />
          <path d="M -60 190 C 260 130, 520 250, 820 190 C 1020 150, 1140 200, 1260 170" {...thread} strokeOpacity={0.12} />
        </>
      );

    // Section éditoriale : une courbe en bordure gauche, une nappe pâle à droite.
    case "friction":
      return (
        <>
          <path d="M -80 -60 C 60 180, 20 430, 130 700 C 170 790, 180 820, 190 860 L -80 860 Z" fill={B} />
          <path d="M 680 120 C 860 80, 1000 160, 1260 120 L 1260 700 C 1020 740, 860 660, 680 700 Z" fill={A} opacity={0.55} />
        </>
      );

    // La plus marquée après le hero : nappe de fond, plus une forme par service.
    case "solutions":
      return (
        <>
          <path d="M -60 640 C 220 560, 420 660, 700 590 C 940 530, 1080 600, 1260 540 L 1260 860 L -60 860 Z" fill={A} opacity={0.7} />
          <g>
            {SOLUTION_SHAPES.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill={i === shape ? A : "none"}
                initial={false}
                animate={{ opacity: i === shape ? 0.85 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            ))}
          </g>
          <path d="M 320 200 C 560 140, 760 250, 1000 190" {...thread} strokeOpacity={0.14} />
        </>
      );

    // Une diagonale qui descend le long des quatre phases, vers le CTA.
    case "method":
      return (
        <>
          <path d="M 40 -60 C 240 180, 200 420, 420 620 C 560 748, 700 780, 900 860 L 1260 860 L 1260 -60 Z" fill={B} opacity={0.75} />
          <path d="M 120 -20 C 300 220, 280 470, 520 660 C 660 770, 820 800, 1000 850" {...thread} strokeOpacity={0.12} />
        </>
      );

    // Une nappe très diffuse derrière la carte du CTA.
    case "cta":
      return (
        <>
          <ellipse cx="600" cy="420" rx="620" ry="330" fill={C} />
          <path d="M -60 620 C 260 540, 520 680, 820 600 C 1020 546, 1140 610, 1260 570 L 1260 860 L -60 860 Z" fill={A} opacity={0.6} />
        </>
      );

    // /sites-web · hero : une nappe qui part de la recherche (haut gauche) et s'élargit
    // sous le site et les outils, deux filaments parallèles comme un flux de page.
    case "webHero":
      return (
        <>
          <path d="M -60 180 C 160 150, 300 260, 520 330 C 760 406, 960 360, 1260 420 L 1260 860 L -60 860 Z" fill={A} opacity={0.75} />
          <ellipse cx="840" cy="400" rx="340" ry="230" fill={C} />
          <path d="M 120 250 C 340 250, 460 360, 700 380 C 900 396, 1060 350, 1260 360" {...thread} />
          <path d="M 120 290 C 340 290, 470 400, 700 420 C 900 436, 1060 392, 1260 400" {...thread} strokeOpacity={0.1} />
        </>
      );

    // Trois nappes venues de la gauche qui convergent vers la droite.
    case "webSources":
      return (
        <>
          <path d="M -60 140 C 260 150, 520 300, 820 380 C 980 420, 1100 410, 1260 400 L 1260 470 C 1100 480, 980 480, 820 460 C 520 420, 260 250, -60 250 Z" fill={A} />
          <path d="M -60 560 C 260 560, 520 470, 820 440 C 980 426, 1100 432, 1260 430 L 1260 500 C 1100 500, 980 500, 820 500 C 520 520, 260 660, -60 680 Z" fill={B} />
          <path d="M -60 400 C 300 410, 600 420, 1260 430" {...thread} strokeOpacity={0.12} />
        </>
      );

    // Section de lecture : une bande verticale pâle derrière la colonne de droite.
    case "webCost":
      return (
        <>
          <path d="M 760 -60 C 700 200, 820 440, 740 860 L 1260 860 L 1260 -60 Z" fill={A} opacity={0.45} />
          <path d="M -80 620 C 120 580, 260 700, 420 860 L -80 860 Z" fill={B} opacity={0.8} />
        </>
      );

    // Quatre paliers qui montent de gauche à droite : le site s'enrichit.
    case "webBuild":
      return (
        <>
          <path d="M -60 700 C 240 690, 360 600, 560 560 C 780 516, 960 420, 1260 300 L 1260 860 L -60 860 Z" fill={A} opacity={0.7} />
          <path d="M -60 760 C 260 750, 420 680, 640 640 C 860 600, 1020 520, 1260 440" {...thread} strokeOpacity={0.14} />
          <path d="M 700 -60 C 860 60, 1020 90, 1260 60 L 1260 -60 Z" fill={B} />
        </>
      );

    // Couches superposées : trois nappes horizontales légèrement décalées.
    case "webCraft":
      return (
        <>
          <path d="M -60 220 C 300 180, 700 260, 1260 210 L 1260 300 C 700 350, 300 270, -60 310 Z" fill={B} opacity={0.8} />
          <path d="M -60 420 C 300 380, 700 460, 1260 410 L 1260 510 C 700 560, 300 480, -60 520 Z" fill={A} opacity={0.7} />
          <path d="M -60 640 C 300 600, 700 680, 1260 630 L 1260 740 C 700 790, 300 710, -60 750 Z" fill={B} opacity={0.6} />
        </>
      );

    // /applications · hero : nappes éparses à gauche qui se resserrent en un faisceau vers
    // la droite, là où l'outil prend forme.
    case "appsHero":
      return (
        <>
          <path d="M -60 160 C 200 120, 380 300, 640 330 C 860 356, 1040 300, 1260 320 L 1260 520 C 1040 520, 860 470, 640 480 C 380 492, 200 700, -60 700 Z" fill={A} />
          <ellipse cx="820" cy="400" rx="360" ry="250" fill={C} />
          <path d="M 80 220 C 300 230, 460 360, 680 390 C 880 418, 1060 380, 1260 390" {...thread} strokeOpacity={0.12} />
        </>
      );

    // Section claire : deux colonnes pâles, comme deux écrans côte à côte.
    case "appsLight":
      return (
        <>
          <path d="M 640 -60 C 700 240, 620 520, 700 860 L 1260 860 L 1260 -60 Z" fill={A} opacity={0.5} />
          <path d="M -80 -60 C 40 200, -20 460, 90 860 L -80 860 Z" fill={B} opacity={0.7} />
        </>
      );

    // Section sombre : un faisceau horizontal, entrées à gauche, sorties à droite.
    case "appsDark":
      return (
        <>
          <path d="M -60 260 C 260 300, 440 380, 600 400 C 760 380, 940 300, 1260 260 L 1260 560 C 940 520, 760 440, 600 440 C 440 440, 260 520, -60 560 Z" fill={A} />
          <ellipse cx="600" cy="420" rx="300" ry="170" fill={C} />
        </>
      );

    // /agents-ia · hero : trois ondes qui partent de la droite, là où l'assistant répond.
    case "aiHero":
      return (
        <>
          <ellipse cx="860" cy="420" rx="360" ry="250" fill={C} />
          <path d="M -60 520 C 220 470, 440 560, 700 500 C 940 446, 1080 520, 1260 470 L 1260 860 L -60 860 Z" fill={A} opacity={0.7} />
          {[200, 300, 400].map((r, i) => (
            <circle key={r} cx="900" cy="400" r={r} fill="none" stroke={INDIGO} strokeOpacity={0.14 - i * 0.03} strokeWidth={1.1} />
          ))}
        </>
      );

    // Section claire : une onde large qui traverse, pâle.
    case "aiLight":
      return (
        <>
          <path d="M -60 180 C 240 120, 520 260, 820 200 C 1000 164, 1120 190, 1260 170 L 1260 360 C 1100 390, 980 350, 800 390 C 520 450, 240 310, -60 380 Z" fill={A} opacity={0.5} />
          <circle cx="1080" cy="700" r="260" fill="none" stroke={INDIGO} strokeOpacity={0.1} strokeWidth={1.1} />
        </>
      );

    // Section sombre : trajectoires de données fines et deux arcs. Pas de croix ni de
    // points : des lignes, comme un réseau relié.
    case "aiDark":
      return (
        <>
          <path d="M -60 520 C 220 440, 460 600, 720 500 C 940 416, 1080 470, 1260 400 L 1260 620 C 1080 690, 940 620, 720 700 C 460 800, 220 640, -60 720 Z" fill={A} opacity={0.55} />
          <path d="M -60 260 C 260 200, 520 330, 820 270 C 1020 230, 1140 260, 1260 240" {...thread} strokeOpacity={0.12} />
          <path d="M -60 420 C 300 380, 600 470, 900 400 C 1060 362, 1160 380, 1260 360" {...thread} strokeOpacity={0.09} />
          <path d="M 860 -60 C 900 200, 820 420, 900 860" {...thread} strokeOpacity={0.07} />
          {[260, 380].map((r) => (
            <circle key={r} cx="1080" cy="680" r={r} fill="none" stroke={INDIGO} strokeOpacity={0.07} strokeWidth={1} />
          ))}
        </>
      );

    // /automatisation · hero : des trajectoires qui entrent par la gauche et repartent
    // en éventail vers la droite, comme les flux du moteur. Aucune particule.
    case "flowHero":
      return (
        <>
          <ellipse cx="620" cy="380" rx="420" ry="260" fill={C} />
          {[300, 360, 420, 480].map((y, i) => (
            <path
              key={y}
              d={`M -60 ${y} C 240 ${y - 20}, 420 ${380 + (i - 1.5) * 10}, 620 380 C 820 ${380 + (i - 1.5) * 20}, 1000 ${y - 120 + i * 60}, 1260 ${y - 160 + i * 90}`}
              {...thread}
              stroke={CYAN}
              strokeOpacity={0.1 + (i % 2) * 0.04}
            />
          ))}
        </>
      );

    // Section sombre : une nappe basse et deux trajectoires qui traversent.
    case "flowDark":
      return (
        <>
          <path d="M -60 560 C 240 480, 520 620, 820 540 C 1000 492, 1120 520, 1260 480 L 1260 860 L -60 860 Z" fill={A} opacity={0.5} />
          <path d="M -60 300 C 280 240, 560 360, 860 290 C 1040 250, 1160 270, 1260 250" {...thread} stroke={CYAN} strokeOpacity={0.1} />
          <path d="M -60 420 C 320 380, 620 470, 920 410 C 1080 380, 1180 390, 1260 370" {...thread} strokeOpacity={0.08} />
        </>
      );

    // Section claire : une onde pâle qui traverse, une trajectoire fine.
    case "flowLight":
      return (
        <>
          <path d="M -60 200 C 240 140, 520 280, 820 220 C 1000 184, 1120 210, 1260 190 L 1260 380 C 1100 410, 980 370, 800 410 C 520 470, 240 330, -60 400 Z" fill={A} opacity={0.45} />
          <path d="M -60 640 C 300 580, 620 700, 940 620 C 1100 580, 1190 600, 1260 590" {...thread} stroke={CYAN} strokeOpacity={0.14} />
        </>
      );

    // Étude de cas : une diagonale du terrain (bas gauche) vers le bureau (haut droite).
    case "appsCase":
      return (
        <>
          <path d="M -60 760 C 240 700, 460 520, 700 420 C 900 336, 1080 300, 1260 240 L 1260 860 L -60 860 Z" fill={A} opacity={0.75} />
          <path d="M -60 800 C 260 740, 480 580, 720 480 C 920 396, 1080 360, 1260 300" {...thread} strokeOpacity={0.12} />
        </>
      );
  }
}

/**
 * Les cinq accents de la section solutions : même famille, intentions différentes.
 * Flux entrant · surface structurée · trajectoire · onde · couches.
 */
const SOLUTION_SHAPES = [
  "M -60 120 C 220 60, 420 210, 700 150 C 900 106, 1040 170, 1260 110 L 1260 330 C 1040 390, 900 320, 700 370 C 420 438, 220 290, -60 350 Z",
  "M 700 90 C 880 60, 1040 120, 1260 80 L 1260 420 C 1040 460, 880 400, 700 430 Z",
  "M -40 420 C 180 300, 380 470, 600 360 C 800 260, 980 400, 1260 300 L 1260 470 C 980 570, 800 430, 600 530 C 380 640, 180 470, -40 590 Z",
  "M 240 460 C 420 280, 700 280, 880 460 C 1000 580, 1120 600, 1260 560 L 1260 240 C 1080 200, 940 230, 820 330 C 660 466, 420 466, 240 330 Z",
  "M 620 200 C 820 160, 1000 220, 1260 170 L 1260 280 C 1000 330, 820 270, 620 310 Z M 660 340 C 860 300, 1030 360, 1260 315 L 1260 425 C 1030 470, 860 410, 660 450 Z",
];

// ─── Compositions téléphone ─────────────────────────────────────────────────

function Mobile({ variant }: { variant: BackdropVariant }) {
  const A = `url(#fb-a-${variant})`;
  const B = `url(#fb-b-${variant})`;
  const C = `url(#fb-c-${variant})`;

  switch (variant) {
    case "hero":
      return <path d="M -40 520 C 90 470, 180 380, 300 340 C 380 314, 420 316, 470 296 L 470 860 L -40 860 Z" fill={A} />;
    case "proof":
      return (
        <path
          d="M -40 260 C 90 210, 180 330, 300 280 C 380 246, 420 300, 470 270 L 470 470 C 420 500, 380 446, 300 480 C 180 530, 90 410, -40 460 Z"
          fill={A}
        />
      );
    case "friction":
      return <path d="M -50 -40 C 30 200, 10 470, 80 740 C 96 800, 100 830, 104 860 L -50 860 Z" fill={B} />;
    case "solutions":
      return <path d="M -40 600 C 110 540, 230 640, 470 580 L 470 860 L -40 860 Z" fill={A} opacity={0.8} />;
    case "method":
      return <path d="M -20 -40 C 110 200, 90 470, 230 700 C 300 800, 360 820, 470 860 L 470 -40 Z" fill={B} opacity={0.7} />;
    case "cta":
      return <ellipse cx="210" cy="400" rx="300" ry="280" fill={C} />;
    case "webHero":
      return <path d="M -40 300 C 100 300, 200 420, 470 440 L 470 860 L -40 860 Z" fill={A} opacity={0.8} />;
    case "webSources":
      return <path d="M -40 120 C 120 200, 160 420, 210 560 C 250 660, 330 760, 470 860 L 470 -40 L -40 -40 Z" fill={B} opacity={0.8} />;
    case "webCost":
      return <path d="M 330 -40 C 300 200, 380 470, 320 860 L 470 860 L 470 -40 Z" fill={A} opacity={0.5} />;
    case "webBuild":
      return <path d="M -40 760 C 120 720, 260 600, 470 520 L 470 860 L -40 860 Z" fill={A} opacity={0.7} />;
    case "webCraft":
      return <path d="M -40 380 C 140 340, 300 420, 470 380 L 470 480 C 300 520, 140 440, -40 480 Z" fill={A} opacity={0.7} />;
    case "appsHero":
      return <path d="M -40 200 C 120 220, 240 380, 470 420 L 470 700 C 240 680, 120 620, -40 640 Z" fill={A} opacity={0.8} />;
    case "appsLight":
      return <path d="M 320 -40 C 360 240, 300 520, 360 860 L 470 860 L 470 -40 Z" fill={A} opacity={0.5} />;
    case "appsDark":
      return <path d="M -40 300 C 120 340, 300 380, 470 360 L 470 500 C 300 520, 120 480, -40 520 Z" fill={A} opacity={0.8} />;
    case "appsCase":
      return <path d="M -40 760 C 140 700, 300 560, 470 480 L 470 860 L -40 860 Z" fill={A} opacity={0.7} />;
    case "aiHero":
    case "aiDark":
      return (
        <>
          <ellipse cx="300" cy="460" rx="260" ry="220" fill={C} />
          <circle cx="300" cy="460" r="200" fill="none" stroke={INDIGO} strokeOpacity={0.12} strokeWidth={1.1} />
        </>
      );
    case "aiLight":
      return <path d="M -40 200 C 120 160, 280 260, 470 220 L 470 360 C 280 400, 120 300, -40 340 Z" fill={A} opacity={0.5} />;
    case "flowHero":
    case "flowDark":
      return <path d="M -40 520 C 120 470, 260 560, 470 500 L 470 860 L -40 860 Z" fill={A} opacity={0.6} />;
    case "flowLight":
      return <path d="M -40 180 C 120 150, 280 240, 470 200 L 470 330 C 280 370, 120 290, -40 320 Z" fill={A} opacity={0.45} />;
  }
}
