"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ParallaxField, useParallaxLayer } from "@/lib/animation/parallaxField";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";

const ease = [0.16, 1, 0.3, 1] as const;

function NeuralPulse({
  d,
  delay,
  color = "accent",
  paused = false,
}: {
  d: string;
  delay: number;
  color?: "accent" | "cyan";
  paused?: boolean;
}) {
  const c = color === "accent" ? "var(--color-accent-primary)" : "var(--color-cyan)";
  return (
    <>
      <motion.path
        d={d} fill="none" stroke={c} strokeWidth="0.8" strokeOpacity="0.15"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay }}
      />
      <motion.circle r="2.5" fill={c} opacity="0">
        {!paused && (
          <animateMotion dur={`${2 + delay}s`} repeatCount="indefinite" begin={`${delay + 1}s`}>
            <mpath href={`#pulse-${delay}`} />
          </animateMotion>
        )}
        {!paused && (
          <animate attributeName="opacity" values="0;0.8;0" dur={`${2 + delay}s`} repeatCount="indefinite" begin={`${delay + 1}s`} />
        )}
      </motion.circle>
      <path id={`pulse-${delay}`} d={d} fill="none" />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FloatingPanel (parallax + autoplay y oscillation fallback)
   - OUTER motion.div : reveal + parallax x/y/tilt
   - INNER motion.div : oscillation y autoplay (toujours active, sert
     de fallback quand parallax désactivé)
   ────────────────────────────────────────────────────────────────── */
function FloatingPanel({
  depth,
  amplitude = 8,
  duration = 7,
  initial,
  delay,
  className,
  style,
  children,
}: {
  depth: number;
  amplitude?: number;
  duration?: number;
  initial: { opacity: number; x?: number; y?: number };
  delay: number;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  const { tx, ty, rx, ry } = useParallaxLayer(depth);
  const paused = useInViewPause();
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration: 0.8, ease }}
      style={{
        x: tx,
        y: ty,
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      <motion.div
        animate={paused ? undefined : { y: [0, -amplitude, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   StepIndicator — 3 layers crossfade en opacity uniquement
   ────────────────────────────────────────────────────────────────── */
type StepStatus = "pending" | "active" | "done";

function StepIndicator({ status }: { status: StepStatus }) {
  const paused = useInViewPause();
  return (
    <div className="relative w-4 h-4 mt-0.5">
      <motion.div
        className="absolute inset-0 w-4 h-4 rounded-full border border-border-subtle"
        animate={{ opacity: status === "pending" ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
      />
      <motion.div
        className="absolute inset-0 w-4 h-4 rounded-full"
        animate={{ opacity: status === "active" ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
      >
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-accent-light/40 border-t-accent-light"
          animate={paused ? undefined : { rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 w-4 h-4 rounded-full bg-green-400/15 flex items-center justify-center"
        animate={{ opacity: status === "done" ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Chaîne de pensée — cycle 5 steps + palier done ≈ 13s
   ────────────────────────────────────────────────────────────────── */
const STEPS = [
  { step: "Perception", detail: "Ingestion de 24K données" },
  { step: "Analyse", detail: "Extraction de 12 patterns" },
  { step: "Raisonnement", detail: "Évaluation de 8 hypothèses" },
  { step: "Décision", detail: "Sélection de l'action optimale" },
  { step: "Exécution", detail: "Déploiement de la solution" },
] as const;

function ChainOfThoughtCard() {
  const { mounted, tier } = usePerformanceMode();
  const staticMode = !mounted ? false : tier !== "full";
  const paused = useInViewPause();

  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(true);

  useEffect(() => {
    if (staticMode) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, [staticMode]);

  useEffect(() => {
    if (staticMode) return;
    const id = setInterval(() => {
      if (!inViewRef.current) return;
      setActive((prev) => (prev + 1) % (STEPS.length + 1));
    }, 2200);
    return () => clearInterval(id);
  }, [staticMode]);

  const statusOf = (i: number): StepStatus => {
    if (staticMode) return "done";
    if (i < active) return "done";
    if (i === active) return "active";
    return "pending";
  };

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-border-accent bg-bg-card/90 backdrop-blur-xl p-4 shadow-2xl shadow-accent-glow/10 card-shine"
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent-primary to-accent-dark flex items-center justify-center"
          animate={staticMode || paused ? undefined : { opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </motion.div>
        <span className="text-[10px] text-text-tertiary uppercase tracking-[0.15em] font-semibold">
          Chaîne de pensée
        </span>
      </div>
      <div className="space-y-2">
        {STEPS.map((item, i) => {
          const status = statusOf(i);
          return (
            <motion.div
              key={item.step}
              className="flex items-start gap-2.5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease }}
            >
              <StepIndicator status={status} />
              <div>
                <motion.span
                  className="text-[10px] font-semibold block"
                  animate={{
                    color:
                      status === "active"
                        ? "rgb(165,180,252)"
                        : status === "done"
                        ? "rgb(203,213,225)"
                        : "rgb(148,163,184)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.step}
                </motion.span>
                <span className="text-[9px] text-text-tertiary">{item.detail}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Mémoire contextuelle — décor inchangé (le panneau extérieur gère la
   parallax via FloatingPanel)
   ────────────────────────────────────────────────────────────────── */
function KnowledgeGraphCard() {
  const NODES = [
    { x: 40, y: 30 }, { x: 100, y: 20 }, { x: 160, y: 35 },
    { x: 30, y: 70 }, { x: 80, y: 60 }, { x: 130, y: 75 },
    { x: 170, y: 80 }, { x: 60, y: 95 }, { x: 140, y: 95 },
  ];
  const EDGES = [
    "M40 30 L100 20", "M100 20 L160 35", "M40 30 L80 60",
    "M100 20 L80 60", "M160 35 L130 75", "M80 60 L130 75",
    "M30 70 L80 60", "M130 75 L170 80", "M60 95 L140 95",
    "M30 70 L60 95", "M170 80 L140 95",
  ];
  return (
    <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-4 shadow-2xl card-shine">
      <span className="text-[9px] text-text-tertiary uppercase tracking-[0.15em] font-semibold block mb-3">
        Mémoire contextuelle
      </span>
      <div className="relative h-28 rounded-lg bg-bg-tertiary/20 border border-border-subtle overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 110">
          {NODES.map((node, i) => (
            <motion.circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="4"
              fill={i % 3 === 0 ? "var(--color-accent-light)" : i % 3 === 1 ? "var(--color-cyan)" : "var(--color-accent-primary)"}
              opacity="0.6"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 1.5 + i * 0.08, duration: 0.4 }}
            />
          ))}
          {EDGES.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="var(--color-border-medium)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ delay: 1.8 + i * 0.05, duration: 0.5 }}
            />
          ))}
        </svg>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[8px] text-text-tertiary font-mono">847 nœuds</span>
        <span className="text-[8px] text-accent-light font-mono">2.4K connexions</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Sortie agent — flux continu, typing, max 3 lignes, pause hors écran
   ────────────────────────────────────────────────────────────────── */
type LineColor = "accent" | "cyan" | "green";
const COLOR_CLASS: Record<LineColor, string> = {
  accent: "text-accent-light",
  cyan: "text-cyan",
  green: "text-green-400",
};

const OUTPUT_POOL: { color: LineColor; text: string }[] = [
  { color: "accent", text: "Analyse de 24,847 points de données" },
  { color: "cyan", text: "3 recommandations prioritaires identifiées" },
  { color: "green", text: "Action déployée : +34% efficacité" },
  { color: "accent", text: "Mise à jour mémoire contextuelle (847 nœuds)" },
  { color: "cyan", text: "Détection d'anomalie sur cluster N-3" },
  { color: "green", text: "Workflow CRM synchronisé (12 entrées)" },
  { color: "accent", text: "Re-évaluation des seuils de confiance (97.4%)" },
];

interface OutputLine {
  id: number;
  color: LineColor;
  text: string;
}

interface TypingState {
  id: number;
  color: LineColor;
  full: string;
  shown: string;
}

const TYPING_CHAR_MS = 28;
const NEW_LINE_INTERVAL_MS = 4000;
const MAX_LINES = 3;

function AgentOutputCard() {
  const { mounted, tier } = usePerformanceMode();
  const staticMode = !mounted ? false : tier !== "full";
  const paused = useInViewPause();

  const [lines, setLines] = useState<OutputLine[]>([]);
  const [typing, setTyping] = useState<TypingState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(true);
  const counterRef = useRef(0);
  const typingRef = useRef<TypingState | null>(null);

  useEffect(() => {
    typingRef.current = typing;
  }, [typing]);

  useEffect(() => {
    if (!mounted) return;
    if (staticMode) {
      setLines(OUTPUT_POOL.slice(0, MAX_LINES).map((l, i) => ({ id: i, ...l })));
      setTyping(null);
    } else {
      setLines([]);
      counterRef.current = 0;
    }
  }, [mounted, staticMode]);

  useEffect(() => {
    if (staticMode) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, [staticMode]);

  useEffect(() => {
    if (!mounted || staticMode) return;
    const tick = () => {
      if (!inViewRef.current) return;
      if (typingRef.current) return;
      const next = OUTPUT_POOL[counterRef.current % OUTPUT_POOL.length];
      counterRef.current += 1;
      setTyping({ id: counterRef.current, color: next.color, full: next.text, shown: "" });
    };
    const id = setInterval(tick, NEW_LINE_INTERVAL_MS);
    const kickoff = setTimeout(tick, 600);
    return () => {
      clearInterval(id);
      clearTimeout(kickoff);
    };
  }, [mounted, staticMode]);

  useEffect(() => {
    if (staticMode) return;
    if (!typing) return;
    if (typing.shown.length >= typing.full.length) {
      const completed: OutputLine = { id: typing.id, color: typing.color, text: typing.full };
      setLines((prev) => [...prev, completed].slice(-MAX_LINES));
      setTyping(null);
      return;
    }
    const timer = setTimeout(() => {
      setTyping((cur) =>
        cur && cur.id === typing.id
          ? { ...cur, shown: typing.full.slice(0, typing.shown.length + 1) }
          : cur,
      );
    }, TYPING_CHAR_MS);
    return () => clearTimeout(timer);
  }, [typing, staticMode]);

  return (
    <div
      ref={containerRef}
      className="rounded-xl border border-border-accent bg-bg-card/90 backdrop-blur-xl p-4 shadow-2xl shadow-accent-glow/10 card-shine"
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="w-2 h-2 rounded-full bg-green-400"
          animate={staticMode || paused ? undefined : { scale: [1, 1.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] text-green-400 font-semibold">Sortie agent · Confiance : 97.4%</span>
      </div>
      <div className="rounded-lg bg-bg-primary/40 p-3 font-mono text-[9px] text-text-secondary leading-relaxed space-y-1.5 min-h-[68px]">
        {lines.map((l) => (
          <div key={l.id}>
            <span className={COLOR_CLASS[l.color]}>{">"}</span> {l.text}
          </div>
        ))}
        {typing && (
          <div key={`t-${typing.id}`}>
            <span className={COLOR_CLASS[typing.color]}>{">"}</span> {typing.shown}
            <motion.span
              className="inline-block w-[5px] h-[10px] align-middle bg-accent-light/80 ml-[2px]"
              animate={paused ? undefined : { opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   AIBrainSceneContent — must live inside PauseOffscreen context
   ────────────────────────────────────────────────────────────────── */
function AIBrainSceneContent() {
  const paused = useInViewPause();

  return (
    <ParallaxField className="relative w-full h-full">
      {/* Deep layered glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/6 rounded-full blur-[160px]" />
      <div className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-light/8 rounded-full blur-[120px]" />
      <div className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan/6 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-primary/15 rounded-full blur-[50px]" />

      {/* Perspective grid floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden opacity-20" style={{ perspective: "400px" }}>
        <div
          className="absolute inset-0 bg-grid"
          style={{ transform: "rotateX(65deg)", transformOrigin: "center bottom" }}
        />
      </div>

      {/* Concentric orbit rings with depth */}
      {[
        { r: 70, opacity: 0.5, speed: 25, border: "border-accent-primary/15" },
        { r: 120, opacity: 0.35, speed: 35, border: "border-accent-light/10" },
        { r: 175, opacity: 0.2, speed: 50, border: "border-cyan/8" },
        { r: 230, opacity: 0.12, speed: 70, border: "border-border-subtle" },
      ].map((ring, i) => (
        <motion.div
          key={ring.r}
          className={`absolute top-1/2 left-1/2 rounded-full border ${ring.border}`}
          style={{
            width: ring.r * 2,
            height: ring.r * 2,
            marginLeft: -ring.r,
            marginTop: -ring.r,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: ring.opacity, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease }}
        >
          <motion.div
            className="absolute inset-0"
            animate={paused ? undefined : { rotate: 360 }}
            transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="rounded-full"
                style={{
                  width: 6 - i,
                  height: 6 - i,
                  background: i % 2 === 0 ? "rgba(129,140,248,0.6)" : "rgba(34,211,238,0.5)",
                  boxShadow: `0 0 ${8 - i * 2}px ${i % 2 === 0 ? "rgba(129,140,248,0.4)" : "rgba(34,211,238,0.3)"}`,
                }}
              />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
              <div
                className="rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  background: i % 2 === 0 ? "rgba(34,211,238,0.4)" : "rgba(129,140,248,0.3)",
                  boxShadow: `0 0 6px ${i % 2 === 0 ? "rgba(34,211,238,0.3)" : "rgba(129,140,248,0.2)"}`,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Central AI core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-4 rounded-3xl bg-accent-primary/10"
            animate={paused ? undefined : { scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-8 rounded-3xl border border-accent-primary/10"
            animate={paused ? undefined : { scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <div
            className="w-28 h-28 rounded-3xl bg-gradient-to-br from-accent-primary via-accent-dark to-accent-primary flex items-center justify-center shadow-2xl"
            style={{ boxShadow: "0 0 40px rgba(99,102,241,0.3), 0 0 80px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.1)" }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <motion.path
                d="M24 4C14 4 8 12 8 20v4c0 4 2 8 6 10v6c0 2 2 4 4 4h12c2 0 4-2 4-4v-6c4-2 6-6 6-10v-4c0-8-6-16-16-16z"
                stroke="white" strokeWidth="1.5" strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <motion.circle
                cx="18" cy="22" r="3"
                fill="none" stroke="white" strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              />
              <motion.circle
                cx="18" cy="22" r="1.5"
                fill="white"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1, 1] }}
                transition={{ delay: 1, duration: 0.3 }}
              />
              <motion.circle
                cx="30" cy="22" r="3"
                fill="none" stroke="white" strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              />
              <motion.circle
                cx="30" cy="22" r="1.5"
                fill="white"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1, 1] }}
                transition={{ delay: 1.1, duration: 0.3 }}
              />
              <motion.circle
                cx="18" cy="22" r="4" fill="rgba(129,140,248,0.3)"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                animate={paused ? undefined : { scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="30" cy="22" r="4" fill="rgba(34,211,238,0.3)"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                animate={paused ? undefined : { scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.path
                d="M16 14h16M20 10h8M22 7h4"
                stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Neural connection paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 700 640">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-light)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-accent-light)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <NeuralPulse d="M350 320 C300 280 200 250 120 200" delay={0} color="accent" paused={paused} />
        <NeuralPulse d="M350 320 C400 280 500 250 580 200" delay={0.3} color="cyan" paused={paused} />
        <NeuralPulse d="M350 320 C300 360 200 400 100 450" delay={0.6} color="accent" paused={paused} />
        <NeuralPulse d="M350 320 C400 360 500 400 600 450" delay={0.9} color="cyan" paused={paused} />
        <NeuralPulse d="M350 320 C350 250 340 180 350 100" delay={1.2} color="accent" paused={paused} />
        <NeuralPulse d="M350 320 C350 390 360 460 350 540" delay={1.5} color="cyan" paused={paused} />
        <NeuralPulse d="M350 320 C280 310 180 300 80 320" delay={0.4} color="accent" paused={paused} />
        <NeuralPulse d="M350 320 C420 310 520 300 620 320" delay={0.7} color="cyan" paused={paused} />

        {[
          { cx: 120, cy: 200 }, { cx: 580, cy: 200 },
          { cx: 100, cy: 450 }, { cx: 600, cy: 450 },
          { cx: 350, cy: 100 }, { cx: 350, cy: 540 },
          { cx: 80, cy: 320 }, { cx: 620, cy: 320 },
        ].map((pos, i) => (
          <motion.circle
            key={i}
            cx={pos.cx} cy={pos.cy} r="4"
            fill="url(#nodeGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0.5] }}
            transition={{ delay: 1.5 + i * 0.1, duration: 0.6 }}
          />
        ))}
      </svg>

      {/* Floating intelligence panels */}
      <FloatingPanel
        depth={24}
        amplitude={8}
        duration={7}
        delay={0.8}
        initial={{ opacity: 0, x: -30 }}
        className="absolute top-4 left-2 sm:left-6 z-30 w-56 sm:w-64"
      >
        <ChainOfThoughtCard />
      </FloatingPanel>

      <FloatingPanel
        depth={32}
        amplitude={6}
        duration={8}
        delay={1.0}
        initial={{ opacity: 0, x: 30 }}
        className="absolute top-6 right-2 sm:right-6 z-30 w-48 sm:w-52"
      >
        <KnowledgeGraphCard />
      </FloatingPanel>

      <FloatingPanel
        depth={16}
        amplitude={5}
        duration={6}
        delay={1.2}
        initial={{ opacity: 0, y: 30 }}
        className="absolute bottom-4 left-1/2 z-30 w-72 sm:w-80"
        style={{ marginLeft: "-9rem" }}
      >
        <AgentOutputCard />
      </FloatingPanel>

      {/* Ambient floating particles */}
      {Array.from({ length: 16 }, (_, i) => {
        const x = 10 + (i * 5.5) % 80;
        const y = 8 + ((i * 7) % 84);
        const size = 2 + (i % 3);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              background: i % 2 === 0 ? "rgba(129,140,248,0.3)" : "rgba(34,211,238,0.25)",
            }}
            animate={paused ? undefined : {
              y: [0, -(10 + (i % 5) * 3), 0],
              x: [0, i % 2 === 0 ? 5 : -4, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        );
      })}
    </ParallaxField>
  );
}

/* ──────────────────────────────────────────────────────────────────
   AIBrainScene — PauseOffscreen envelope
   ────────────────────────────────────────────────────────────────── */
export function AIBrainScene() {
  return (
    <PauseOffscreen className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px]" margin="240px">
      <AIBrainSceneContent />
    </PauseOffscreen>
  );
}
