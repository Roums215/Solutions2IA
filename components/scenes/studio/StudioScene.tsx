"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";

const ease = [0.16, 1, 0.3, 1] as const;

function StudioSceneInner() {
  const { mounted, tier } = usePerformanceMode();
  const staticMode = mounted && tier !== "full";
  const paused = useInViewPause();

  return (
    <div className="relative w-full h-full">
      {/* Glow layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[160px]" />
      <div className="absolute top-[35%] right-[30%] w-64 h-64 bg-cyan/6 rounded-full blur-[100px]" />
      <div className="absolute bottom-[30%] left-[35%] w-48 h-48 bg-accent-light/8 rounded-full blur-[80px]" />

      {/* Perspective floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] overflow-hidden opacity-12" style={{ perspective: "400px" }}>
        <div className="absolute inset-0 bg-grid" style={{ transform: "rotateX(65deg)", transformOrigin: "center bottom" }} />
      </div>

      {/* Main composition panel — center */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-[340px] sm:w-[400px]"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: staticMode || paused ? 0 : [0, -5, 0], scale: 1 }}
        transition={{ opacity: { duration: 0.8, delay: 0.3 }, y: { duration: 7, repeat: Infinity }, scale: { duration: 0.8, delay: 0.3 } }}
      >
        <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl shadow-2xl overflow-hidden card-shine">
          {/* App chrome */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border-subtle bg-bg-tertiary/20">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400/80" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
              <div className="w-2 h-2 rounded-full bg-green-400/80" />
            </div>
            <span className="text-[8px] text-text-tertiary font-mono ml-2">Composition · Studio 2IA</span>
            <div className="ml-auto flex gap-1">
              <div className="px-2 py-0.5 rounded bg-accent-glow border border-accent-primary/20">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-accent-light"><polygon points="5 3 19 12 5 21" /></svg>
              </div>
            </div>
          </div>

          {/* Viewport */}
          <div className="relative h-40 bg-bg-primary/60 overflow-hidden">
            {/* Pseudo 3D scene */}
            <div className="absolute inset-0" style={{ perspective: "600px" }}>
              {/* Floating 3D cards with depth */}
              <motion.div
                className="absolute top-6 left-8 w-24 h-16 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-dark/10 border border-accent-primary/15 backdrop-blur"
                style={{ transform: "rotateY(-15deg) rotateX(5deg) translateZ(30px)" }}
                animate={staticMode || paused ? undefined : { y: [0, -4, 0], rotateY: [-15, -12, -15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="p-2">
                  <div className="w-8 h-1.5 rounded bg-accent-light/20 mb-1" />
                  <div className="w-14 h-1 rounded bg-white/5" />
                </div>
              </motion.div>

              <motion.div
                className="absolute top-4 right-10 w-20 h-20 rounded-xl bg-gradient-to-br from-cyan/15 to-accent-primary/10 border border-cyan/10"
                style={{ transform: "rotateY(12deg) rotateX(-5deg) translateZ(50px)" }}
                animate={staticMode || paused ? undefined : { y: [0, -6, 0], rotateY: [12, 16, 12] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan/30 to-accent-primary/20"
                    animate={staticMode || paused ? undefined : { rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-10 rounded-lg bg-gradient-to-r from-accent-primary/10 via-cyan/10 to-accent-primary/10 border border-border-subtle"
                style={{ transform: "rotateX(10deg) translateZ(20px)" }}
                animate={staticMode || paused ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center justify-center h-full gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full bg-accent-light/30"
                      style={{ height: staticMode || paused ? 8 + i : undefined }}
                      animate={staticMode || paused ? undefined : { height: [8, 16 + i * 2, 8] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Ambient particles in viewport */}
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${15 + i * 10}%`,
                    top: `${20 + (i * 8) % 60}%`,
                    width: 2,
                    height: 2,
                    background: i % 2 === 0 ? "rgba(129,140,248,0.4)" : "rgba(34,211,238,0.3)",
                    opacity: staticMode || paused ? 0.3 : undefined,
                  }}
                  animate={staticMode || paused ? undefined : { y: [0, -6, 0], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 3 + i % 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-border-subtle p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[8px] text-text-tertiary font-mono">00:00</span>
              <div className="flex-1 relative">
                <div className="h-px bg-border-subtle" />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent-primary shadow shadow-accent-glow/40"
                  animate={staticMode || paused ? undefined : { left: ["5%", "90%"] }}
                  style={{ left: staticMode || paused ? "5%" : undefined }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <span className="text-[8px] text-text-tertiary font-mono">03:24</span>
            </div>

            {/* Layer tracks */}
            {[
              { name: "Titre 3D", color: "bg-accent-primary/25", offset: "left-[5%]", width: "w-[55%]" },
              { name: "Particules", color: "bg-cyan/20", offset: "left-[15%]", width: "w-[65%]" },
              { name: "Background", color: "bg-accent-dark/15", offset: "left-0", width: "w-full" },
              { name: "Audio", color: "bg-green-400/15", offset: "left-[3%]", width: "w-[90%]" },
            ].map((track, i) => (
              <motion.div
                key={track.name}
                className="flex items-center gap-2 mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4, ease }}
              >
                <div className={`w-2 h-2 rounded-sm ${track.color.replace("/25", "/60").replace("/20", "/50").replace("/15", "/40")}`} />
                <span className="text-[7px] text-text-tertiary w-14 truncate">{track.name}</span>
                <div className="flex-1 h-3 rounded-sm bg-bg-tertiary/30 relative overflow-hidden">
                  <div className={`absolute top-0 h-full rounded-sm ${track.color} ${track.offset} ${track.width}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D viewport preview — bottom left */}
      <motion.div
        className="absolute bottom-8 left-2 sm:left-6 z-30 w-44 sm:w-52"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease }}
      >
        <motion.div animate={staticMode || paused ? undefined : { y: [0, -6, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-3 shadow-2xl card-shine">
            <span className="text-[8px] text-text-tertiary uppercase tracking-wider block mb-2">3D Viewport</span>
            <div className="h-24 rounded-lg bg-bg-primary/40 border border-border-subtle relative overflow-hidden flex items-center justify-center" style={{ perspective: "300px" }}>
              <div className="absolute inset-0 bg-grid opacity-10" style={{ transform: "rotateX(50deg) translateZ(-10px)" }} />

              {/* Spinning torus-like shape */}
              <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                <motion.div
                  className="w-12 h-12 rounded-xl border border-accent-primary/30 bg-gradient-to-br from-accent-primary/15 to-transparent"
                  animate={staticMode || paused ? undefined : { rotateY: [0, 360], rotateX: [0, 15, 0] }}
                  transition={{ rotateY: { duration: 10, repeat: Infinity, ease: "linear" }, rotateX: { duration: 4, repeat: Infinity } }}
                  style={{ transformStyle: "preserve-3d" }}
                />
                <motion.div
                  className="absolute inset-1 rounded-lg border border-cyan/20 bg-cyan/5"
                  animate={staticMode || paused ? undefined : { rotateY: [0, -360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                />
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[7px] text-text-tertiary font-mono">60 fps</span>
              <span className="text-[7px] text-accent-light font-mono">WebGL 2.0</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Design system panel — bottom right */}
      <motion.div
        className="absolute bottom-10 right-2 sm:right-6 z-30 w-44 sm:w-48"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease }}
      >
        <motion.div animate={staticMode || paused ? undefined : { y: [0, -5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-3 shadow-2xl card-shine">
            <span className="text-[8px] text-text-tertiary uppercase tracking-wider block mb-2.5">Design system</span>
            {/* Color row */}
            <div className="flex gap-1 mb-2.5">
              {[
                "bg-accent-primary", "bg-accent-light", "bg-accent-dark", "bg-cyan", "bg-green-400",
              ].map((c) => (
                <motion.div
                  key={c}
                  className={`flex-1 h-6 rounded-md ${c}`}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
            {/* Typography */}
            <div className="space-y-1.5 mb-2">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-text-tertiary">Display</span>
                <span className="text-[10px] font-bold text-text-primary">Inter 800</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-text-tertiary">Code</span>
                <span className="text-[10px] font-mono text-text-secondary">JetBrains 400</span>
              </div>
            </div>
            {/* Component */}
            <div className="flex gap-1.5">
              <div className="flex-1 h-6 rounded-md bg-accent-primary/30 border border-accent-primary/20 flex items-center justify-center">
                <span className="text-[7px] text-accent-light font-medium">Button</span>
              </div>
              <div className="flex-1 h-6 rounded-md bg-bg-tertiary/40 border border-border-subtle flex items-center justify-center">
                <span className="text-[7px] text-text-tertiary font-medium">Card</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Tool palette — floating tags */}
      <motion.div
        className="absolute top-[42%] left-0 sm:left-2 z-10 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col gap-1.5">
          {["GSAP", "Rive", "Remotion", "Three.js"].map((tool, i) => (
            <motion.div
              key={tool}
              className="px-2.5 py-1 rounded-md border border-border-subtle bg-bg-card/80 backdrop-blur text-[8px] text-text-tertiary font-mono"
              animate={staticMode || paused ? undefined : { x: [0, 3, 0], opacity: [0.5, 0.8, 0.5] }}
              style={{ opacity: staticMode || paused ? 0.6 : undefined }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            >
              {tool}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Ambient particles */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${8 + i * 9}%`,
            top: `${15 + (i * 7) % 70}%`,
            width: 2 + i % 2,
            height: 2 + i % 2,
            background: i % 3 === 0 ? "rgba(129,140,248,0.3)" : i % 3 === 1 ? "rgba(34,211,238,0.25)" : "rgba(74,222,128,0.2)",
            opacity: staticMode || paused ? 0.25 : undefined,
          }}
          animate={staticMode || paused ? undefined : { y: [0, -(6 + i % 3 * 3), 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 4 + i % 3, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function StudioScene() {
  return (
    <PauseOffscreen className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px]">
      <StudioSceneInner />
    </PauseOffscreen>
  );
}
