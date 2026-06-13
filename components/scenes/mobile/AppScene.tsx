"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";

const ease = [0.16, 1, 0.3, 1] as const;

function AppSceneInner() {
  const { mounted, tier } = usePerformanceMode();
  const staticMode = mounted && tier !== "full";
  const paused = useInViewPause();

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-primary/6 rounded-full blur-[140px]" />
      <div className="absolute top-[30%] right-[25%] w-48 h-48 bg-cyan/6 rounded-full blur-[100px]" />

      {/* Perspective floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[28%] overflow-hidden opacity-10" style={{ perspective: "400px" }}>
        <div className="absolute inset-0 bg-grid" style={{ transform: "rotateX(65deg)", transformOrigin: "center bottom" }} />
      </div>

      {/* Phone frame — center, hero device */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: staticMode || paused ? 0 : [0, -8, 0], scale: 1 }}
        transition={{ opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 6.5, repeat: Infinity }, scale: { duration: 0.8, delay: 0.3, ease } }}
      >
        <div
          className="w-[210px] rounded-[32px] border-2 border-border-medium bg-bg-card/95 backdrop-blur-xl p-3 shadow-2xl"
          style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.35), 0 0 30px rgba(99,102,241,0.08)" }}
        >
          {/* Dynamic Island */}
          <div className="w-24 h-6 bg-bg-primary rounded-full mx-auto mb-3 flex items-center justify-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-bg-tertiary" />
            <div className="w-1.5 h-1.5 rounded-full bg-text-tertiary/20" />
          </div>

          {/* Screen */}
          <div className="rounded-2xl bg-bg-primary/50 p-3 space-y-2.5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-primary to-accent-dark flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">2IA</span>
                </div>
                <div>
                  <div className="w-16 h-2 rounded bg-white/10 mb-0.5" />
                  <div className="w-10 h-1.5 rounded bg-white/5" />
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-bg-tertiary/50 border border-border-subtle" />
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { value: "+73%", label: "Efficacité", color: "text-accent-light" },
                { value: "24/7", label: "Actif", color: "text-cyan" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="rounded-xl bg-gradient-to-br from-bg-tertiary/40 to-bg-tertiary/20 border border-border-subtle p-2.5 text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.4, ease }}
                >
                  <span className={`text-sm font-bold font-mono block ${stat.color}`}>{stat.value}</span>
                  <span className="text-[7px] text-text-tertiary">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Activity chart */}
            <div className="rounded-xl bg-bg-tertiary/20 border border-border-subtle p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[7px] text-text-tertiary">Activité</span>
                <span className="text-[7px] text-green-400 font-mono">+12%</span>
              </div>
              <div className="flex items-end gap-[2px] h-10">
                {[25, 40, 35, 60, 45, 75, 55, 80, 65, 90, 70, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-primary/25 to-accent-light/35"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1.0 + i * 0.04, duration: 0.4, ease }}
                  />
                ))}
              </div>
            </div>

            {/* List items */}
            {[
              { title: "Analyse IA terminée", dot: "bg-green-400", badge: "Nouveau" },
              { title: "3 automatisations actives", dot: "bg-accent-light", badge: "" },
              { title: "Rapport hebdomadaire", dot: "bg-cyan", badge: "" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="flex items-center gap-2 p-2 rounded-xl bg-bg-tertiary/20 border border-border-subtle"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.1, duration: 0.4, ease }}
              >
                <div className={`w-2 h-2 rounded-full ${item.dot} flex-shrink-0`} />
                <span className="text-[8px] text-text-secondary flex-1 truncate">{item.title}</span>
                {item.badge && (
                  <span className="text-[6px] text-accent-light bg-accent-glow px-1.5 py-0.5 rounded-full">{item.badge}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Home indicator */}
          <div className="w-20 h-1 bg-white/10 rounded-full mx-auto mt-3" />
        </div>
      </motion.div>

      {/* Desktop companion — right side */}
      <motion.div
        className="absolute top-16 right-0 sm:right-4 z-10 w-48 sm:w-56 hidden sm:block"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease }}
      >
        <motion.div animate={staticMode || paused ? undefined : { y: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
          <div className="rounded-xl border border-border-subtle bg-bg-card/85 backdrop-blur-xl p-4 shadow-2xl card-shine">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[9px] text-green-400 font-medium">Synchronisé</span>
            </div>
            <div className="rounded-lg bg-bg-tertiary/30 border border-border-subtle p-3 mb-3">
              <span className="text-[8px] text-text-tertiary block mb-1.5">Dashboard desktop</span>
              <div className="flex items-end gap-[2px] h-14">
                {Array.from({ length: 16 }, (_, i) => {
                  const h = 20 + Math.sin(i * 0.4) * 25 + i * 2;
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-primary/20 to-accent-light/35"
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.min(95, h)}%` }}
                      transition={{ delay: 1.2 + i * 0.04, duration: 0.4, ease }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <span className="text-xs font-bold text-accent-light font-mono block">12,847</span>
                <span className="text-[7px] text-text-tertiary">Utilisateurs</span>
              </div>
              <div>
                <span className="text-xs font-bold text-cyan font-mono block">€47.2K</span>
                <span className="text-[7px] text-text-tertiary">Revenus</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tech badges — bottom */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        {["React Native", "Swift", "Kotlin", "REST API", "WebSocket"].map((t, i) => (
          <motion.div
            key={t}
            className="px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-card/80 backdrop-blur text-[8px] text-text-tertiary font-mono"
            animate={staticMode || paused ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.25 }}
          >
            {t}
          </motion.div>
        ))}
      </motion.div>

      {/* Ambient particles */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${8 + i * 9}%`, top: `${10 + (i * 8) % 80}%`,
            width: 2 + i % 2, height: 2 + i % 2,
            background: i % 2 === 0 ? "rgba(129,140,248,0.25)" : "rgba(34,211,238,0.2)",
            opacity: staticMode || paused ? 0.25 : undefined,
          }}
          animate={staticMode || paused ? undefined : { y: [0, -(5 + i % 3 * 2), 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 4 + i % 3, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

export function AppScene() {
  return (
    <PauseOffscreen className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px]">
      <AppSceneInner />
    </PauseOffscreen>
  );
}
