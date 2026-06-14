"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";

const ease = [0.16, 1, 0.3, 1] as const;

function WebSceneInner() {
  const { mounted, tier } = usePerformanceMode();
  const staticMode = mounted && tier !== "full";
  const paused = useInViewPause();

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-accent-primary/6 rounded-full blur-[140px]" />
      <div className="absolute top-[35%] right-[30%] w-56 h-56 bg-cyan/5 rounded-full blur-[100px]" />

      {/* Perspective floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] overflow-hidden opacity-12" style={{ perspective: "400px" }}>
        <div className="absolute inset-0 bg-grid" style={{ transform: "rotateX(65deg)", transformOrigin: "center bottom" }} />
      </div>

      {/* Browser frame with depth */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[320px] sm:w-[380px]"
        initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 5 }}
        animate={{ opacity: 1, y: staticMode || paused ? 0 : [0, -6, 0], scale: 1, rotateX: 0 }}
        transition={{ opacity: { duration: 1, delay: 0.3 }, y: { duration: 7, repeat: Infinity }, scale: { duration: 1, delay: 0.3, ease } }}
        style={{ perspective: "800px" }}
      >
        <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl shadow-2xl overflow-hidden card-shine"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(99,102,241,0.05)" }}
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-subtle bg-bg-tertiary/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-lg bg-bg-primary/60 border border-border-subtle flex items-center gap-1.5">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span className="text-[9px] text-text-tertiary font-mono">votresite.com</span>
              </div>
            </div>
          </div>

          {/* Website content */}
          <div className="p-4 space-y-3.5">
            {/* Site nav */}
            <div className="flex items-center justify-between">
              <div className="w-16 h-3 rounded bg-accent-primary/20" />
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => <div key={i} className="w-8 h-1.5 rounded bg-border-subtle" />)}
              </div>
              <div className="w-14 h-5 rounded bg-accent-primary/25 border border-accent-primary/15" />
            </div>

            {/* Hero section mock */}
            <div className="rounded-xl bg-gradient-to-br from-accent-primary/8 via-bg-tertiary/20 to-cyan/5 border border-border-subtle p-4">
              <motion.div className="w-[55%] h-5 rounded bg-white/8 mb-2" initial={{ width: 0 }} animate={{ width: "55%" }} transition={{ delay: 0.8, duration: 0.6, ease }} />
              <motion.div className="w-[75%] h-2 rounded bg-white/4 mb-1.5" initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ delay: 0.9, duration: 0.5, ease }} />
              <motion.div className="w-[45%] h-2 rounded bg-white/4" initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ delay: 1.0, duration: 0.5, ease }} />
              <div className="flex gap-2 mt-4">
                <motion.div className="w-20 h-7 rounded-lg bg-accent-primary/30 border border-accent-primary/15" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1, duration: 0.3, ease }} />
                <motion.div className="w-20 h-7 rounded-lg border border-border-subtle" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, duration: 0.3, ease }} />
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="rounded-lg bg-bg-tertiary/20 border border-border-subtle p-2.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.4, ease }}
                >
                  <div className={`w-6 h-6 rounded-md mb-2 ${i === 1 ? "bg-accent-glow" : i === 2 ? "bg-cyan-glow" : "bg-green-400/10"}`} />
                  <div className="w-full h-1.5 rounded bg-border-subtle mb-1" />
                  <div className="w-[65%] h-1 rounded bg-border-subtle" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lighthouse score — bottom right */}
      <motion.div
        className="absolute bottom-12 right-2 sm:right-8 z-30 w-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease }}
      >
        <motion.div animate={staticMode || paused ? undefined : { y: [0, -5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-3 shadow-2xl card-shine">
            <span className="text-[8px] text-text-tertiary uppercase tracking-wider block mb-2">Note du site</span>
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="var(--color-border-subtle)" strokeWidth="2" />
                  <motion.circle
                    cx="18" cy="18" r="16" fill="none" stroke="#4ade80" strokeWidth="2.5"
                    strokeDasharray="100" strokeLinecap="round"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 2 }}
                    transition={{ delay: 1.5, duration: 1.2, ease }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-lg font-bold text-green-400 font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    98
                  </motion.span>
                </div>
              </div>
              <div className="space-y-1">
                {[
                  { label: "Vitesse", score: "98", color: "text-green-400" },
                  { label: "Accès", score: "100", color: "text-green-400" },
                  { label: "Google", score: "100", color: "text-green-400" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-1.5">
                    <span className="text-[8px] text-text-tertiary w-6">{m.label}</span>
                    <span className={`text-[9px] font-mono font-bold ${m.color}`}>{m.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Responsive devices — bottom left */}
      <motion.div
        className="absolute bottom-10 left-2 sm:left-8 z-30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease }}
      >
        <motion.div animate={staticMode || paused ? undefined : { y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-3 shadow-2xl card-shine">
            <span className="text-[8px] text-text-tertiary uppercase tracking-wider block mb-2">Sur mobile</span>
            <div className="flex items-end gap-2 h-14">
              {/* Watch */}
              <motion.div className="w-5 h-7 rounded-sm border border-accent-light/20 bg-accent-glow/20" animate={staticMode || paused ? undefined : { opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity }} />
              {/* Phone */}
              <motion.div className="w-6 h-10 rounded-md border border-accent-light/30 bg-accent-glow/25" animate={staticMode || paused ? undefined : { opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 0.3 }} />
              {/* Tablet */}
              <motion.div className="w-9 h-12 rounded-md border border-accent-light/35 bg-accent-glow/30" animate={staticMode || paused ? undefined : { opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 0.6 }} />
              {/* Desktop */}
              <motion.div className="w-14 h-10 rounded-md border border-accent-light/40 bg-accent-glow/35 relative" animate={staticMode || paused ? undefined : { opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: 0.9 }}>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-accent-light/10 rounded-b" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient particles */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 8}%`,
            top: `${12 + (i * 7) % 76}%`,
            width: 2 + i % 2,
            height: 2 + i % 2,
            background: i % 2 === 0 ? "rgba(129,140,248,0.25)" : "rgba(34,211,238,0.2)",
            opacity: staticMode || paused ? 0.25 : undefined,
          }}
          animate={staticMode || paused ? undefined : { y: [0, -(6 + i % 3 * 2), 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 4 + i % 3, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

export function WebScene() {
  return (
    <PauseOffscreen className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px]">
      <WebSceneInner />
    </PauseOffscreen>
  );
}
