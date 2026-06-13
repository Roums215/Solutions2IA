"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";

const ease = [0.16, 1, 0.3, 1] as const;

function CircuitLine({ x1, y1, x2, y2, delay, color = "cyan", animated }: {
  x1: number; y1: number; x2: number; y2: number; delay: number; color?: "cyan" | "accent"; animated: boolean;
}) {
  const c = color === "cyan" ? "var(--color-cyan)" : "var(--color-accent-primary)";
  return (
    <>
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={c} strokeWidth="0.8" strokeOpacity="0.12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay }}
      />
      {/* Traveling pulse — circle SMIL pur (pas de motion : il animait via
          <animate>, et motion.circle perdait l'attribut r). Conditionné hors
          écran / staticMode via `animated`. */}
      {animated && (
        <circle cx={x1} cy={y1} r="2" fill={c}>
          <animate
            attributeName="opacity"
            values="0;0.9;0"
            dur={`${2.5 + delay * 0.3}s`}
            repeatCount="indefinite"
            begin={`${delay + 1}s`}
          />
          <animate
            attributeName="cx"
            values={`${x1};${x2}`}
            dur={`${2.5 + delay * 0.3}s`}
            repeatCount="indefinite"
            begin={`${delay + 1}s`}
          />
          <animate
            attributeName="cy"
            values={`${y1};${y2}`}
            dur={`${2.5 + delay * 0.3}s`}
            repeatCount="indefinite"
            begin={`${delay + 1}s`}
          />
        </circle>
      )}
    </>
  );
}

function PipelineStep({ label, status, icon, delay, loopActive }: {
  label: string; status: "done" | "active" | "pending"; icon: React.ReactNode; delay: number; loopActive: boolean;
}) {
  return (
    <motion.div
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all ${
        status === "done" ? "border-green-400/20 bg-green-400/5" :
        status === "active" ? "border-cyan/30 bg-cyan/5" :
        "border-border-subtle bg-bg-tertiary/20"
      }`}
      initial={{ opacity: 0, x: -12, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease }}
    >
      <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
        status === "done" ? "bg-green-400/15 text-green-400" :
        status === "active" ? "bg-cyan/15 text-cyan" :
        "bg-bg-tertiary/40 text-text-tertiary"
      }`}>
        {status === "active" ? (
          <motion.div
            className="w-3 h-3 rounded-full border-[1.5px] border-cyan/40 border-t-cyan"
            animate={loopActive ? { rotate: 360 } : undefined}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          />
        ) : icon}
      </div>
      <div className="min-w-0">
        <span className={`text-[10px] font-semibold block ${
          status === "active" ? "text-cyan" : status === "done" ? "text-text-secondary" : "text-text-tertiary"
        }`}>{label}</span>
      </div>
      {status === "done" && (
        <span className="text-[8px] text-green-400/60 font-mono ml-auto">0.2s</span>
      )}
    </motion.div>
  );
}

function AutomationSceneInner() {
  const { mounted, tier } = usePerformanceMode();
  const staticMode = mounted && tier !== "full";
  const paused = useInViewPause();
  const loopActive = !staticMode && !paused;

  return (
    <div className="relative w-full h-full">
      {/* Deep glow layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[160px]" />
      <div className="absolute top-[40%] left-[40%] w-72 h-72 bg-accent-primary/6 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan/12 rounded-full blur-[60px]" />

      {/* Perspective grid */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%] overflow-hidden opacity-15" style={{ perspective: "400px" }}>
        <div className="absolute inset-0 bg-grid" style={{ transform: "rotateX(65deg)", transformOrigin: "center bottom" }} />
      </div>

      {/* Central hub */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
      >
        <div className="relative">
          {/* Energy rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-2xl border border-cyan/10"
              style={{ inset: -(16 + i * 12), opacity: staticMode || paused ? 0.2 - i * 0.05 : undefined }}
              animate={loopActive ? {
                scale: [1, 1 + 0.03 * (i + 1), 1],
                opacity: [0.2 - i * 0.05, 0.4 - i * 0.08, 0.2 - i * 0.05],
              } : undefined}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          {/* Core */}
          <div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan via-accent-primary to-cyan flex items-center justify-center"
            style={{ boxShadow: "0 0 40px rgba(34,211,238,0.25), 0 0 80px rgba(34,211,238,0.1), inset 0 1px 0 rgba(255,255,255,0.15)" }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              <circle cx="12" cy="12" r="4" />
              <motion.circle
                cx="12" cy="12" r="2" fill="white"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                animate={loopActive ? { scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] } : undefined}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Circuit board SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 700 640">
        {/* Radial circuit lines */}
        <CircuitLine x1={350} y1={320} x2={130} y2={160} delay={0} animated={loopActive} />
        <CircuitLine x1={350} y1={320} x2={570} y2={160} delay={0.2} color="accent" animated={loopActive} />
        <CircuitLine x1={350} y1={320} x2={100} y2={320} delay={0.4} animated={loopActive} />
        <CircuitLine x1={350} y1={320} x2={600} y2={320} delay={0.6} color="accent" animated={loopActive} />
        <CircuitLine x1={350} y1={320} x2={130} y2={500} delay={0.8} animated={loopActive} />
        <CircuitLine x1={350} y1={320} x2={570} y2={500} delay={1.0} color="accent" animated={loopActive} />
        <CircuitLine x1={350} y1={320} x2={350} y2={100} delay={0.3} animated={loopActive} />
        <CircuitLine x1={350} y1={320} x2={350} y2={560} delay={0.5} color="accent" animated={loopActive} />

        {/* Circuit junction nodes */}
        {[
          { cx: 130, cy: 160 }, { cx: 570, cy: 160 },
          { cx: 100, cy: 320 }, { cx: 600, cy: 320 },
          { cx: 130, cy: 500 }, { cx: 570, cy: 500 },
          { cx: 350, cy: 100 }, { cx: 350, cy: 560 },
        ].map((p, i) => (
          <g key={i}>
            <motion.rect
              x={p.cx - 6} y={p.cy - 6} width={12} height={12} rx={3}
              fill="none" stroke={i % 2 === 0 ? "var(--color-cyan)" : "var(--color-accent-primary)"} strokeWidth="0.8" strokeOpacity="0.4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
            />
            <motion.rect
              x={p.cx - 3} y={p.cy - 3} width={6} height={6} rx={1.5}
              fill={i % 2 === 0 ? "var(--color-cyan)" : "var(--color-accent-primary)"}
              opacity="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
            />
          </g>
        ))}
      </svg>

      {/* Pipeline panel — top left */}
      <motion.div
        className="absolute top-3 left-1 sm:left-4 z-30 w-56 sm:w-64"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease }}
      >
        <motion.div animate={loopActive ? { y: [0, -7, 0] } : undefined} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
          <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-4 shadow-2xl card-shine">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] text-text-tertiary uppercase tracking-[0.15em] font-semibold">Pipeline #847</span>
              <div className="flex items-center gap-1.5">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan" animate={loopActive ? { scale: [1, 1.4, 1] } : undefined} transition={{ duration: 1.2, repeat: Infinity }} />
                <span className="text-[8px] text-cyan font-mono font-semibold">RUNNING</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <PipelineStep label="Réception webhook" status="done" delay={0.9} loopActive={loopActive} icon={<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>} />
              <div className="ml-2.5 w-px h-3 bg-gradient-to-b from-green-400/30 to-cyan/20" />
              <PipelineStep label="Transformation IA" status="done" delay={1.1} loopActive={loopActive} icon={<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>} />
              <div className="ml-2.5 w-px h-3 bg-gradient-to-b from-green-400/30 to-cyan/20" />
              <PipelineStep label="Validation automatique" status="active" delay={1.3} loopActive={loopActive} icon={null} />
              <div className="ml-2.5 w-px h-3 bg-gradient-to-b from-cyan/20 to-transparent" />
              <PipelineStep label="Push CRM + Slack" status="pending" delay={1.5} loopActive={loopActive} icon={<div className="w-1.5 h-1.5 rounded-full bg-text-tertiary/30" />} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Real-time metrics — top right */}
      <motion.div
        className="absolute top-6 right-1 sm:right-4 z-30 w-48 sm:w-52"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <motion.div animate={loopActive ? { y: [0, -6, 0] } : undefined} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
          <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-4 shadow-2xl card-shine">
            <span className="text-[9px] text-text-tertiary uppercase tracking-[0.15em] font-semibold block mb-3">Métriques live</span>
            {[
              { label: "Tâches/heure", value: "1,247", color: "text-cyan", bar: "w-[85%] bg-cyan/30" },
              { label: "Latence moy.", value: "0.3s", color: "text-green-400", bar: "w-[15%] bg-green-400/30" },
              { label: "Succès", value: "99.98%", color: "text-accent-light", bar: "w-[99%] bg-accent-primary/30" },
              { label: "Files actives", value: "24", color: "text-cyan", bar: "w-[60%] bg-cyan/20" },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                className="mb-2.5 last:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.12 }}
              >
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] text-text-tertiary">{m.label}</span>
                  <span className={`text-[10px] font-mono font-bold ${m.color}`}>{m.value}</span>
                </div>
                <div className="h-1 rounded-full bg-bg-tertiary/50 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${m.bar.split(" ").slice(1).join(" ")}`}
                    initial={{ width: 0 }}
                    animate={{ width: m.bar.split(" ")[0].replace("w-[", "").replace("]", "") }}
                    transition={{ delay: 1.5 + i * 0.1, duration: 0.8, ease }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Integration nodes — bottom */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease }}
      >
        <motion.div animate={loopActive ? { y: [0, -4, 0] } : undefined} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl px-4 py-3 shadow-2xl card-shine">
            <span className="text-[8px] text-text-tertiary uppercase tracking-wider block mb-2 text-center">Intégrations connectées</span>
            <div className="flex items-center gap-2">
              {[
                { name: "Slack", color: "border-green-400/20 bg-green-400/5" },
                { name: "CRM", color: "border-cyan/20 bg-cyan/5" },
                { name: "Email", color: "border-accent-primary/20 bg-accent-glow" },
                { name: "API", color: "border-cyan/20 bg-cyan/5" },
                { name: "DB", color: "border-green-400/20 bg-green-400/5" },
                { name: "S3", color: "border-accent-primary/20 bg-accent-glow" },
              ].map((node, i) => (
                <motion.div
                  key={node.name}
                  className={`w-10 h-10 rounded-lg border ${node.color} flex items-center justify-center`}
                  animate={loopActive ? { y: [0, -3, 0] } : undefined}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.2 }}
                >
                  <span className="text-[7px] font-mono text-text-tertiary font-bold">{node.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Electric particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${12 + (i * 7) % 76}%`,
            top: `${10 + (i * 9) % 80}%`,
            width: 2 + i % 2,
            height: 2 + i % 2,
            background: i % 2 === 0 ? "rgba(34,211,238,0.4)" : "rgba(99,102,241,0.3)",
            boxShadow: `0 0 ${4 + i % 3 * 2}px ${i % 2 === 0 ? "rgba(34,211,238,0.3)" : "rgba(99,102,241,0.2)"}`,
            opacity: loopActive ? undefined : 0.3,
          }}
          animate={loopActive ? {
            y: [0, -(8 + i % 4 * 3), 0],
            opacity: [0.2, 0.7, 0.2],
          } : undefined}
          transition={{ duration: 3 + i % 3, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function AutomationScene() {
  return (
    <PauseOffscreen className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px]">
      <AutomationSceneInner />
    </PauseOffscreen>
  );
}
