"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

/* ─── Presets — un par domaine de page ─── */
type Preset =
  | "home"
  | "services"
  | "web"
  | "apps"
  | "ai"
  | "automation"
  | "studio"
  | "about"
  | "contact";

type ShapeKind =
  | "blob"      // home — liquid morphing organic
  | "crystal"   // services — angular crystal facet
  | "browser"   // web — wireframe browser frame
  | "device"    // apps — glass phone outline
  | "neural"    // ai — neural cluster (center + satellites)
  | "hex"       // automation — tech hex chip with pins
  | "prism"     // studio — rainbow prism
  | "halo"      // about — concentric energy rings
  | "plasma";   // contact — soft plasma cloud

interface PresetCfg {
  /** Couleurs RGB sans alpha */
  primary: string;
  secondary: string;
  accent: string;
  /** Intensité globale */
  intensity: number;
  /** Décoration 3D flottante */
  shape: ShapeKind;
  /** Nombre de formes 3D */
  shapeCount: number;
  /** Grille fond ? */
  grid: boolean;
  /** Scan lines verticales ? */
  scan: boolean;
}

const PRESETS: Record<Preset, PresetCfg> = {
  home: {
    primary: "99,102,241",
    secondary: "34,211,238",
    accent: "165,180,252",
    intensity: 1,
    shape: "blob",
    shapeCount: 6,
    grid: true,
    scan: false,
  },
  services: {
    primary: "99,102,241",
    secondary: "129,140,248",
    accent: "165,180,252",
    intensity: 0.95,
    shape: "crystal",
    shapeCount: 5,
    grid: true,
    scan: false,
  },
  web: {
    primary: "59,130,246",
    secondary: "34,211,238",
    accent: "147,197,253",
    intensity: 1,
    shape: "browser",
    shapeCount: 4,
    grid: true,
    scan: true,
  },
  apps: {
    primary: "14,165,233",
    secondary: "129,140,248",
    accent: "125,211,252",
    intensity: 1,
    shape: "device",
    shapeCount: 5,
    grid: false,
    scan: false,
  },
  ai: {
    primary: "139,92,246",
    secondary: "99,102,241",
    accent: "196,181,253",
    intensity: 1.2,
    shape: "neural",
    shapeCount: 7,
    grid: false,
    scan: false,
  },
  automation: {
    primary: "34,211,238",
    secondary: "6,182,212",
    accent: "125,211,252",
    intensity: 1.1,
    shape: "hex",
    shapeCount: 6,
    grid: true,
    scan: true,
  },
  studio: {
    primary: "168,85,247",
    secondary: "34,211,238",
    accent: "251,146,60",
    intensity: 1.05,
    shape: "prism",
    shapeCount: 7,
    grid: false,
    scan: false,
  },
  about: {
    primary: "129,140,248",
    secondary: "165,180,252",
    accent: "196,181,253",
    intensity: 0.85,
    shape: "halo",
    shapeCount: 4,
    grid: true,
    scan: false,
  },
  contact: {
    primary: "99,102,241",
    secondary: "139,92,246",
    accent: "165,180,252",
    intensity: 0.9,
    shape: "plasma",
    shapeCount: 3,
    grid: false,
    scan: false,
  },
};

/* ─── Paths d'un blob organique pour morphing ─── */
const BLOB_PATHS = [
  "M44.2,-58.2C56.6,-49.6,65.6,-35.2,69.8,-19.6C74,-3.9,73.4,12.9,67.1,27.4C60.8,41.9,48.7,54,34.2,61.8C19.8,69.6,3.1,73,-13.7,70.7C-30.5,68.4,-47.5,60.4,-58.5,47.1C-69.6,33.8,-74.7,15.2,-73.5,-2.6C-72.3,-20.4,-64.7,-37.4,-52.4,-46.6C-40.1,-55.7,-23,-57,-6.4,-58.4C10.2,-59.8,31.8,-66.7,44.2,-58.2Z",
  "M38.5,-52.6C50.4,-43.2,60.6,-32.4,66.5,-18.8C72.3,-5.1,73.7,11.4,68.4,25.2C63.1,39,51.1,50.1,37.6,57.6C24.1,65,9.1,68.9,-6.5,67.4C-22.2,65.9,-38.5,59.1,-50.4,47.7C-62.3,36.4,-69.8,20.5,-71,3.9C-72.3,-12.7,-67.3,-30.1,-56.8,-40.2C-46.4,-50.3,-30.4,-53.2,-15.4,-55.5C-0.4,-57.7,13.7,-59.4,38.5,-52.6Z",
  "M50.4,-60.2C63.5,-50.8,71.1,-33.4,73.5,-15.3C75.8,2.7,72.8,21.3,63.5,35.4C54.1,49.4,38.4,58.9,21.6,64.7C4.7,70.5,-13.3,72.6,-29.4,67.1C-45.4,61.5,-59.4,48.4,-66.8,32.3C-74.2,16.2,-74.9,-3,-69.4,-19.5C-63.8,-36,-52,-49.7,-37.7,-58.4C-23.5,-67,-6.7,-70.6,8.6,-68.1C23.9,-65.6,37.4,-69.6,50.4,-60.2Z",
];

/* ─── Forme 3D individuelle — visuel premium par kind ─── */
function FloatingShape({
  kind,
  color,
  x,
  y,
  size,
  depth,
  delay,
  duration,
  mx,
  my,
  index,
}: {
  kind: ShapeKind;
  color: string;
  x: string;
  y: string;
  size: number;
  depth: number;
  delay: number;
  duration: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  index: number;
}) {
  // Parallax 3D
  const tx = useTransform(mx, (v) => v * depth);
  const ty = useTransform(my, (v) => v * depth);
  const ry = useTransform(mx, (v) => v * (depth * 0.5));
  const rx = useTransform(my, (v) => -v * (depth * 0.5));

  const baseStyle: React.CSSProperties = {
    left: x,
    top: y,
    width: size,
    height: size,
    willChange: "transform",
    transformStyle: "preserve-3d",
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ ...baseStyle, x: tx, y: ty, rotateX: rx, rotateY: ry }}
      animate={{
        y: [0, -16, 0, -8, 0],
        x: [0, 6, -4, 2, 0],
        opacity: [0.25, 0.55, 0.25],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* ═══ BLOB — home ═══ liquide morphing organique */}
      {kind === "blob" && (
        <motion.svg
          viewBox="-100 -100 200 200"
          width={size}
          height={size}
          style={{ overflow: "visible", filter: `drop-shadow(0 0 ${size * 0.3}px rgba(${color},0.4))` }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60 + index * 8, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <radialGradient id={`blob-${color}-${index}`}>
              <stop offset="0%" stopColor={`rgba(${color},0.55)`} />
              <stop offset="60%" stopColor={`rgba(${color},0.18)`} />
              <stop offset="100%" stopColor={`rgba(${color},0)`} />
            </radialGradient>
          </defs>
          <motion.path
            d={BLOB_PATHS[0]}
            fill={`url(#blob-${color}-${index})`}
            stroke={`rgba(${color},0.35)`}
            strokeWidth="1.2"
          />
        </motion.svg>
      )}

      {/* ═══ CRYSTAL — services ═══ facette de cristal angulaire */}
      {kind === "crystal" && (
        <motion.svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{ overflow: "visible", filter: `drop-shadow(0 0 ${size * 0.25}px rgba(${color},0.35))` }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50 + index * 5, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id={`crystal-${color}-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`rgba(${color},0.32)`} />
              <stop offset="50%" stopColor={`rgba(${color},0.08)`} />
              <stop offset="100%" stopColor={`rgba(${color},0.22)`} />
            </linearGradient>
          </defs>
          {/* Facette principale */}
          <polygon
            points="50,5 90,28 90,72 50,95 10,72 10,28"
            fill={`url(#crystal-${color}-${index})`}
            stroke={`rgba(${color},0.55)`}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Facette intérieure */}
          <polygon
            points="50,18 78,33 78,67 50,82 22,67 22,33"
            fill="none"
            stroke={`rgba(${color},0.4)`}
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Reflet central */}
          <motion.line
            x1="30" y1="20" x2="70" y2="80"
            stroke={`rgba(${color},0.75)`}
            strokeWidth="0.5"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 3.5, delay: delay * 0.5, repeat: Infinity }}
          />
        </motion.svg>
      )}

      {/* ═══ BROWSER — web ═══ wireframe browser frame */}
      {kind === "browser" && (
        <motion.div
          className="rounded-lg border overflow-hidden"
          style={{
            width: size,
            height: size * 0.62,
            borderColor: `rgba(${color},0.4)`,
            background: `linear-gradient(180deg, rgba(${color},0.06), rgba(${color},0.01) 40%, transparent)`,
            boxShadow: `0 0 ${size * 0.5}px rgba(${color},0.25), inset 0 0 ${size * 0.2}px rgba(${color},0.08)`,
          }}
          animate={{ rotateY: [-3, 3, -3] }}
          transition={{ duration: 9 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Top bar */}
          <div className="flex items-center gap-1 px-2 py-1.5 border-b" style={{ borderColor: `rgba(${color},0.25)` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${color},0.7)` }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${color},0.5)` }} />
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(${color},0.35)` }} />
            <div className="ml-2 flex-1 h-1 rounded-sm" style={{ background: `rgba(${color},0.15)` }} />
          </div>
          {/* Content lines */}
          <div className="p-2 space-y-1">
            <div className="h-1 w-3/4 rounded" style={{ background: `rgba(${color},0.22)` }} />
            <div className="h-1 w-1/2 rounded" style={{ background: `rgba(${color},0.15)` }} />
            <div className="h-1 w-2/3 rounded" style={{ background: `rgba(${color},0.18)` }} />
          </div>
        </motion.div>
      )}

      {/* ═══ DEVICE — apps ═══ silhouette téléphone glass */}
      {kind === "device" && (
        <motion.div
          className="rounded-[18%] border relative"
          style={{
            width: size * 0.5,
            height: size,
            borderColor: `rgba(${color},0.45)`,
            background: `linear-gradient(180deg, rgba(${color},0.16), rgba(${color},0.04) 50%, rgba(${color},0.02))`,
            boxShadow: `0 0 ${size * 0.35}px rgba(${color},0.25), inset 0 0 ${size * 0.15}px rgba(${color},0.1)`,
          }}
          animate={{ rotateY: [-4, 4, -4] }}
          transition={{ duration: 8 + index, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Notch */}
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: "26%", height: 4, background: `rgba(${color},0.55)` }}
          />
          {/* Écran lignes */}
          <div className="absolute inset-x-2 top-5 space-y-1">
            <div className="h-0.5 w-2/3 rounded" style={{ background: `rgba(${color},0.3)` }} />
            <div className="h-0.5 w-1/2 rounded" style={{ background: `rgba(${color},0.2)` }} />
          </div>
          {/* Notif dot pulse */}
          <motion.div
            className="absolute rounded-full"
            style={{ top: "30%", right: "20%", width: 4, height: 4, background: `rgb(${color})`, boxShadow: `0 0 8px rgba(${color},0.8)` }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2, delay, repeat: Infinity }}
          />
          {/* Home indicator */}
          <div
            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: "30%", height: 1.5, background: `rgba(${color},0.5)` }}
          />
        </motion.div>
      )}

      {/* ═══ NEURAL — ai ═══ cluster neural avec connexions */}
      {kind === "neural" && (
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{ overflow: "visible", filter: `drop-shadow(0 0 ${size * 0.3}px rgba(${color},0.5))` }}
        >
          {/* Connexions */}
          {[
            { x: 25, y: 25 },
            { x: 75, y: 28 },
            { x: 18, y: 70 },
            { x: 82, y: 72 },
            { x: 50, y: 88 },
          ].map((p, i) => (
            <motion.line
              key={i}
              x1="50" y1="50" x2={p.x} y2={p.y}
              stroke={`rgba(${color},0.5)`}
              strokeWidth="0.8"
              animate={{ opacity: [0.15, 0.7, 0.15] }}
              transition={{ duration: 2.5, delay: delay + i * 0.3, repeat: Infinity }}
            />
          ))}
          {/* Centre */}
          <motion.circle
            cx="50" cy="50" r="8"
            fill={`rgba(${color},0.35)`}
            stroke={`rgba(${color},0.85)`}
            strokeWidth="1.2"
            animate={{ r: [7, 9, 7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="50" cy="50" r="3"
            fill={`rgb(${color})`}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          {/* Satellites */}
          {[
            { x: 25, y: 25, r: 3 },
            { x: 75, y: 28, r: 2.5 },
            { x: 18, y: 70, r: 2.5 },
            { x: 82, y: 72, r: 3 },
            { x: 50, y: 88, r: 2 },
          ].map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x} cy={p.y} r={p.r}
              fill={`rgba(${color},0.85)`}
              animate={{ scale: [0.7, 1.2, 0.7], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: delay + i * 0.4, repeat: Infinity }}
            />
          ))}
        </svg>
      )}

      {/* ═══ HEX — automation ═══ hexagone tech avec pins */}
      {kind === "hex" && (
        <motion.svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{ overflow: "visible", filter: `drop-shadow(0 0 ${size * 0.25}px rgba(${color},0.4))` }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 80 + index * 10, repeat: Infinity, ease: "linear" }}
        >
          {/* Pins gauche/droite */}
          {[20, 35, 50, 65, 80].map((y) => (
            <g key={y}>
              <line x1="0" y1={y} x2="14" y2={y} stroke={`rgba(${color},0.55)`} strokeWidth="1" />
              <line x1="86" y1={y} x2="100" y2={y} stroke={`rgba(${color},0.55)`} strokeWidth="1" />
            </g>
          ))}
          {/* Hex outline */}
          <polygon
            points="50,12 84,32 84,68 50,88 16,68 16,32"
            fill={`rgba(${color},0.08)`}
            stroke={`rgba(${color},0.7)`}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Inner traces */}
          <path
            d="M30 40 L 45 40 L 50 45 L 70 45 M 30 60 L 50 60 L 55 55 L 70 55"
            stroke={`rgba(${color},0.5)`}
            strokeWidth="0.8"
            fill="none"
          />
          {/* Pulse central */}
          <motion.circle
            cx="50" cy="50" r="3.5"
            fill={`rgb(${color})`}
            animate={{ opacity: [0.4, 1, 0.4], r: [3, 4.5, 3] }}
            transition={{ duration: 1.8, delay, repeat: Infinity }}
          />
        </motion.svg>
      )}

      {/* ═══ PRISM — studio ═══ prisme arc-en-ciel */}
      {kind === "prism" && (
        <motion.svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          style={{ overflow: "visible", filter: `drop-shadow(0 0 ${size * 0.3}px rgba(${color},0.45))` }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40 + index * 6, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id={`prism-${color}-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.45)" />
              <stop offset="50%" stopColor="rgba(34,211,238,0.45)" />
              <stop offset="100%" stopColor="rgba(251,146,60,0.4)" />
            </linearGradient>
          </defs>
          {/* Triangle prisme */}
          <polygon
            points="50,8 92,82 8,82"
            fill={`url(#prism-${color}-${index})`}
            stroke={`rgba(${color},0.7)`}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Refraction lines */}
          <motion.line
            x1="50" y1="8" x2="50" y2="82"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.6"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <line x1="30" y1="50" x2="70" y2="50" stroke={`rgba(${color},0.4)`} strokeWidth="0.5" />
        </motion.svg>
      )}

      {/* ═══ HALO — about ═══ rings concentriques */}
      {kind === "halo" && (
        <div className="relative w-full h-full">
          {[1, 0.75, 0.5].map((scale, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: `rgba(${color},${0.3 - i * 0.05})`,
                transform: `scale(${scale})`,
                boxShadow: `0 0 ${size * 0.3}px rgba(${color},0.18), inset 0 0 ${size * 0.15}px rgba(${color},0.1)`,
              }}
              animate={{ scale: [scale, scale * 1.08, scale], opacity: [0.4, 0.85, 0.4] }}
              transition={{ duration: 4 + i, delay: delay + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 6,
              height: 6,
              background: `rgb(${color})`,
              boxShadow: `0 0 16px rgba(${color},0.8)`,
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        </div>
      )}

      {/* ═══ PLASMA — contact ═══ nuage de plasma diffus */}
      {kind === "plasma" && (
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, rgba(${color},0.5) 0%, rgba(${color},0.2) 30%, rgba(${color},0.05) 60%, transparent 80%)`,
            filter: `blur(${size * 0.05}px)`,
            boxShadow: `0 0 ${size * 0.8}px rgba(${color},0.4)`,
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 6 + index, delay, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}

/* ─── Génère les positions des formes par preset ─── */
function shapesFor(cfg: PresetCfg): Array<{ x: string; y: string; size: number; depth: number; delay: number; duration: number; color: string }> {
  const palette = [cfg.primary, cfg.secondary, cfg.accent];
  // Positions distribuées non-symétriques pour rendu naturel
  const positions: Array<{ x: string; y: string }> = [
    { x: "6%", y: "16%" },
    { x: "84%", y: "10%" },
    { x: "14%", y: "74%" },
    { x: "78%", y: "66%" },
    { x: "48%", y: "88%" },
    { x: "60%", y: "30%" },
    { x: "28%", y: "44%" },
  ];
  // Tailles spécifiques par type de forme
  const sizeFor = (i: number) => {
    if (cfg.shape === "device") return 70 + (i % 3) * 18;       // phones plus petits
    if (cfg.shape === "blob") return 140 + (i % 3) * 60;        // blobs gros
    if (cfg.shape === "plasma") return 220 + (i % 3) * 80;      // plasma très gros
    if (cfg.shape === "halo") return 110 + (i % 3) * 40;
    if (cfg.shape === "neural") return 100 + (i % 3) * 30;
    return 95 + (i % 3) * 32;
  };
  return positions.slice(0, cfg.shapeCount).map((p, i) => ({
    ...p,
    size: sizeFor(i),
    depth: 14 + ((i * 9) % 32),
    delay: i * 0.7,
    duration: 8 + (i % 4),
    color: palette[i % palette.length],
  }));
}

/* ─── Composant principal ─── */
interface FluidMouseFieldProps {
  preset?: Preset;
  intensity?: number;
}

export function FluidMouseField({ preset = "home", intensity }: FluidMouseFieldProps) {
  const cfg = PRESETS[preset];
  const finalIntensity = intensity ?? cfg.intensity;
  const { isMobile, shouldReduceMotion, shouldHideBackgroundDecor } = usePerformanceMode();

  const [enabled, setEnabled] = useState(false);
  const [size, setSize] = useState({ w: 1, h: 1 });

  // Mouse normalisée 0..1
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.35);

  // Springs lents pour halos
  const sx = useSpring(mx, { stiffness: 38, damping: 22, mass: 1.2 });
  const sy = useSpring(my, { stiffness: 38, damping: 22, mass: 1.2 });

  // Halo principal
  const primaryX = useTransform(sx, (v) => `${v * 100}%`);
  const primaryY = useTransform(sy, (v) => `${v * 100}%`);

  // Halo secondaire (parallax inversé)
  const secondaryX = useTransform(sx, (v) => `${(1 - v) * 100}%`);
  const secondaryY = useTransform(sy, (v) => `${(1 - v * 0.7) * 100}%`);

  // Focus rapide
  const fastX = useSpring(mx, { stiffness: 140, damping: 18 });
  const fastY = useSpring(my, { stiffness: 140, damping: 18 });
  const focusX = useTransform(fastX, (v) => `${v * 100}%`);
  const focusY = useTransform(fastY, (v) => `${v * 100}%`);

  // Pour formes 3D : -1..1 centré
  const parallaxX = useSpring(useTransform(mx, (v) => (v - 0.5) * 2), { stiffness: 50, damping: 20 });
  const parallaxY = useSpring(useTransform(my, (v) => (v - 0.5) * 2), { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldReduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    setEnabled(true);
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);

    if (isCoarse) {
      // Mobile : oscillation autonome ralentie pour préserver la batterie.
      let t = 0;
      const id = window.setInterval(() => {
        t += 0.018;
        mx.set(0.5 + Math.sin(t) * 0.16);
        my.set(0.5 + Math.cos(t * 0.7) * 0.12);
      }, 96);
      return () => {
        window.clearInterval(id);
        window.removeEventListener("resize", update);
      };
    }

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", update);
    };
  }, [mx, my, shouldReduceMotion]);

  if (!enabled || shouldReduceMotion || shouldHideBackgroundDecor) return null;

  const shapes = shapesFor(cfg);
  const renderScan = cfg.scan && !isMobile;
  const renderFocus = !isMobile;
  const renderShapes = !isMobile;

  return (
    <div
      className="fixed inset-0 -z-0 pointer-events-none overflow-hidden"
      aria-hidden
      style={{ contain: "strict", perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      {/* Grille subtile (selon preset) */}
      {cfg.grid && (
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)",
          }}
        />
      )}

      {/* Scan lines verticales (web/automation) */}
      {renderScan && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" preserveAspectRatio="none">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.line
              key={i}
              x1={`${8 + i * 8}%`}
              y1="0"
              x2={`${8 + i * 8}%`}
              y2="100%"
              stroke={`rgb(${cfg.primary})`}
              strokeWidth="0.5"
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 5, delay: i * 0.4, repeat: Infinity }}
            />
          ))}
        </svg>
      )}

      {/* Halo principal (suit lentement) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: primaryX,
          top: primaryY,
          width: isMobile ? 680 : Math.max(size.w, 900),
          height: isMobile ? 680 : Math.max(size.w, 900),
          x: "-50%",
          y: "-50%",
          background: `radial-gradient(circle, rgba(${cfg.primary},0.18) 0%, rgba(${cfg.primary},0.08) 30%, transparent 60%)`,
          filter: isMobile ? "blur(34px)" : "blur(40px)",
          opacity: (isMobile ? 0.55 : 0.9) * finalIntensity,
          willChange: "transform",
        }}
      />

      {/* Halo secondaire (parallax inversé) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: secondaryX,
          top: secondaryY,
          width: isMobile ? 440 : 700,
          height: isMobile ? 440 : 700,
          x: "-50%",
          y: "-50%",
          background: `radial-gradient(circle, rgba(${cfg.secondary},0.14) 0%, rgba(${cfg.secondary},0.05) 35%, transparent 65%)`,
          filter: isMobile ? "blur(38px)" : "blur(50px)",
          opacity: (isMobile ? 0.45 : 0.85) * finalIntensity,
          willChange: "transform",
        }}
      />

      {/* Noyau focus (suit rapidement) */}
      {renderFocus && (
        <motion.div
          className="absolute rounded-full mix-blend-screen"
          style={{
            left: focusX,
            top: focusY,
            width: 240,
            height: 240,
            x: "-50%",
            y: "-50%",
            background: `radial-gradient(circle, rgba(${cfg.accent},0.18) 0%, rgba(${cfg.secondary},0.08) 40%, transparent 70%)`,
            filter: "blur(20px)",
            opacity: 0.7 * finalIntensity,
            willChange: "transform",
          }}
        />
      )}

      {/* Formes 3D flottantes parallaxées */}
      {renderShapes && shapes.map((s, i) => (
        <FloatingShape
          key={i}
          index={i}
          kind={cfg.shape}
          color={s.color}
          x={s.x}
          y={s.y}
          size={s.size}
          depth={s.depth}
          delay={s.delay}
          duration={s.duration}
          mx={parallaxX}
          my={parallaxY}
        />
      ))}

      {/* Vignette périphérique */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,6,11,0.55) 100%)",
        }}
      />
    </div>
  );
}
