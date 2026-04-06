"use client";

import { motion } from "motion/react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

function FloatingPanel({
  className,
  delay,
  duration = 6,
  amplitude = 12,
  rotate = 0,
  children,
}: {
  className?: string;
  delay: number;
  duration?: number;
  amplitude?: number;
  rotate?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: premiumEase }}
      className={className}
    >
      <motion.div
        animate={{
          y: [0, -amplitude, 0, -amplitude * 0.6, 0],
          rotate: rotate ? [0, rotate, 0, -rotate * 0.5, 0] : 0,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function DataBar({ width, delay, color = "accent" }: { width: string; delay: number; color?: "accent" | "cyan" | "green" }) {
  const gradients = {
    accent: "from-accent-primary/50 to-accent-light/20",
    cyan: "from-cyan/40 to-cyan/10",
    green: "from-green-400/40 to-green-400/10",
  };
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: premiumEase }}
      className={`h-1.5 rounded-full origin-left bg-gradient-to-r ${gradients[color]}`}
      style={{ width }}
    />
  );
}

function Particle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-accent-light/30"
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function OrbitDot({ radius, duration, delay, size = 4, color = "bg-accent-light/40" }: {
  radius: number; duration: number; delay: number; size?: number; color?: string;
}) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      animate={{ rotate: 360 }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 rounded-full ${color}`}
        style={{ width: size, height: size }}
      />
    </motion.div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative w-full h-[560px] sm:h-[660px] lg:h-[740px]">
      {/* Layered glow system */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-primary/8 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-cyan/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent-dark/10 rounded-full blur-[80px]" />

      {/* Ambient particles */}
      <Particle x="15%" y="20%" size={3} delay={0} />
      <Particle x="80%" y="15%" size={2} delay={0.8} />
      <Particle x="60%" y="75%" size={3} delay={1.5} />
      <Particle x="25%" y="65%" size={2} delay={2.2} />
      <Particle x="70%" y="40%" size={2} delay={0.5} />
      <Particle x="40%" y="85%" size={3} delay={1.8} />
      <Particle x="90%" y="60%" size={2} delay={1.0} />
      <Particle x="10%" y="45%" size={2} delay={2.5} />

      {/* Central orbit system */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Orbit rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-border-subtle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-border-subtle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* Orbiting dots */}
        <OrbitDot radius={80} duration={20} delay={0} size={5} color="bg-accent-light/50" />
        <OrbitDot radius={80} duration={20} delay={10} size={3} color="bg-cyan/40" />
        <OrbitDot radius={144} duration={30} delay={0} size={4} color="bg-accent-primary/40" />
        <OrbitDot radius={144} duration={30} delay={15} size={3} color="bg-cyan/30" />

        {/* Center node */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-dark border border-accent-light/20 flex items-center justify-center shadow-lg shadow-accent-glow"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: premiumEase }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path d="M12 8v4l3 3" />
            <circle cx="12" cy="12" r="1" fill="white" />
          </svg>
        </motion.div>
      </div>

      {/* Connection lines — SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 740" fill="none" preserveAspectRatio="none">
        <motion.path
          d="M128 130 C180 200, 240 290, 300 370"
          stroke="url(#grad1)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1.8, delay: 1.0 }}
        />
        <motion.path
          d="M500 90 C450 180, 380 280, 300 370"
          stroke="url(#grad2)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1.8, delay: 1.2 }}
        />
        <motion.path
          d="M300 370 C300 460, 300 540, 300 620"
          stroke="url(#grad1)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        />
        <motion.path
          d="M120 400 C190 460, 250 560, 300 620"
          stroke="url(#grad2)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 1.7 }}
        />

        {/* Data flow particles on paths */}
        <motion.circle
          r="2" fill="var(--color-accent-light)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, delay: 2, repeat: Infinity }}
        >
          <animateMotion dur="3s" repeatCount="indefinite" begin="2s">
            <mpath xlinkHref="#flowpath1" />
          </animateMotion>
        </motion.circle>

        <path id="flowpath1" d="M128 130 C180 200, 240 290, 300 370" fill="none" />

        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-accent-primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-cyan)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* ═══════════════════ FLOATING PANELS ═══════════════════ */}

      {/* Dashboard Panel — top left */}
      <FloatingPanel className="absolute top-0 left-0 sm:top-2 sm:left-0 lg:top-4 lg:left-0" delay={0.4} duration={7} amplitude={14} rotate={0.4}>
        <div className="w-56 sm:w-64 rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-4 shadow-2xl card-shine">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
              <span className="text-[10px] text-text-tertiary uppercase tracking-[0.15em] font-medium">Dashboard IA</span>
            </div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[8px] text-cyan font-mono"
            >
              LIVE
            </motion.div>
          </div>
          <div className="space-y-2 mb-4">
            <DataBar width="88%" delay={0.7} color="accent" />
            <DataBar width="62%" delay={0.8} color="cyan" />
            <DataBar width="95%" delay={0.9} color="accent" />
            <DataBar width="45%" delay={1.0} color="green" />
          </div>
          <div className="flex justify-between pt-3 border-t border-border-subtle">
            <div>
              <span className="text-[9px] text-text-tertiary uppercase tracking-wider block">Tâches auto.</span>
              <motion.span
                className="text-sm font-semibold text-accent-light font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                2,847
              </motion.span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-text-tertiary uppercase tracking-wider block">Gain temps</span>
              <motion.span
                className="text-sm font-semibold text-green-400 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                +73%
              </motion.span>
            </div>
          </div>
        </div>
      </FloatingPanel>

      {/* Mobile App — top right */}
      <FloatingPanel className="absolute top-8 right-0 sm:top-12 sm:right-0 lg:top-[150px] lg:right-0" delay={0.6} duration={8.5} amplitude={18} rotate={-0.6}>
        <div className="w-[140px] sm:w-[156px] rounded-2xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-3 shadow-2xl card-shine">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <span className="text-[8px] text-text-tertiary font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-tertiary">
                <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M8.53 16.11a6 6 0 016.95 0M12 20h.01" />
              </svg>
              <div className="w-4 h-2 rounded-sm border border-text-tertiary/40 relative">
                <div className="absolute inset-0.5 rounded-xs bg-green-400/60" />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-accent-primary/15 to-cyan/8 border border-border-subtle p-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-primary to-accent-dark mb-2 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="h-1.5 w-[70%] rounded bg-white/10 mb-1" />
            <div className="h-1 w-[50%] rounded bg-white/5" />
          </div>

          {[
            { label: "Notifications", count: "12", active: true },
            { label: "Automatisations", count: "8", active: false },
            { label: "Rapports IA", count: "3", active: false },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.12, duration: 0.4, ease: premiumEase }}
              className="flex items-center gap-2 p-2 rounded-lg bg-bg-tertiary/40 border border-border-subtle mb-1.5"
            >
              <div className={`w-5 h-5 rounded-md flex-shrink-0 ${item.active ? "bg-accent-primary/30" : "bg-bg-tertiary"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[8px] text-text-secondary truncate">{item.label}</div>
              </div>
              <span className="text-[8px] font-mono text-accent-light">{item.count}</span>
            </motion.div>
          ))}

          <div className="flex justify-around mt-2.5 pt-2 border-t border-border-subtle">
            {[true, false, false, false].map((active, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-sm transition-colors ${active ? "bg-accent-primary/50" : "bg-border-subtle"}`}
              />
            ))}
          </div>
        </div>
      </FloatingPanel>

      {/* AI Agent Panel — bottom center */}
      <FloatingPanel className="absolute bottom-0 left-1/2 -translate-x-1/2 sm:bottom-2" delay={0.8} duration={6.5} amplitude={16} rotate={0.3}>
        <div className="w-[260px] sm:w-[280px] rounded-xl border border-border-accent bg-bg-card/90 backdrop-blur-xl p-4 shadow-2xl shadow-accent-glow/10 card-shine">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-primary to-accent-dark flex items-center justify-center shadow-md shadow-accent-glow/30"
              animate={{ boxShadow: ["0 4px 12px rgba(99,102,241,0.2)", "0 4px 24px rgba(99,102,241,0.4)", "0 4px 12px rgba(99,102,241,0.2)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="9" cy="16" r="1" fill="white" />
                <circle cx="15" cy="16" r="1" fill="white" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                <path d="M12 2v2" />
                <path d="M7 4l1 1" />
                <path d="M17 4l-1 1" />
              </svg>
            </motion.div>
            <div>
              <span className="text-xs font-semibold text-text-primary block">Agent IA Solutions 2IA</span>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[10px] text-green-400 font-medium">En traitement</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { done: true, text: "Analyse des données terminée", delay: 1.4 },
              { done: true, text: "3 workflows automatisés créés", delay: 1.6 },
              { done: true, text: "Rapport de performance généré", delay: 1.8 },
              { done: false, text: "Optimisation IA en cours...", delay: 2.0 },
            ].map((line) => (
              <motion.div
                key={line.text}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: line.delay, duration: 0.5, ease: premiumEase }}
              >
                {line.done ? (
                  <div className="w-4 h-4 rounded-full bg-green-400/15 flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                ) : (
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-accent-light/40 border-t-accent-light flex-shrink-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                )}
                <span className={`text-[10px] leading-tight ${line.done ? "text-text-secondary" : "text-accent-light font-medium"}`}>
                  {line.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-3 pt-3 border-t border-border-subtle">
            <div className="flex justify-between mb-1.5">
              <span className="text-[9px] text-text-tertiary">Progression globale</span>
              <span className="text-[9px] text-accent-light font-mono">78%</span>
            </div>
            <div className="h-1 rounded-full bg-bg-tertiary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent-primary to-cyan"
                initial={{ width: "0%" }}
                animate={{ width: "78%" }}
                transition={{ delay: 2.2, duration: 1.2, ease: premiumEase }}
              />
            </div>
          </div>
        </div>
      </FloatingPanel>

      {/* Code Terminal — middle left */}
      <FloatingPanel className="absolute top-[44%] left-0 sm:top-[46%] sm:left-0 lg:top-[42%] lg:left-0 hidden sm:block" delay={1.0} duration={7.5} amplitude={13} rotate={-0.5}>
        <div className="w-52 rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-3 shadow-2xl card-shine">
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="w-2 h-2 rounded-full bg-red-400/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
            <div className="w-2 h-2 rounded-full bg-green-400/80" />
            <span className="ml-2 text-[8px] text-text-tertiary font-mono">agent.ts</span>
          </div>
          <div className="font-mono text-[9px] space-y-1.5 leading-relaxed">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <span className="text-accent-light">const</span> <span className="text-text-primary">agent</span> <span className="text-text-tertiary">=</span> <span className="text-cyan">new</span> <span className="text-accent-light">IA</span><span className="text-text-tertiary">();</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
              <span className="text-accent-light">await</span> <span className="text-text-primary">agent</span><span className="text-text-tertiary">.</span><span className="text-cyan">analyze</span><span className="text-text-tertiary">(</span><span className="text-green-400">data</span><span className="text-text-tertiary">);</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
              <span className="text-accent-light">await</span> <span className="text-text-primary">agent</span><span className="text-text-tertiary">.</span><span className="text-cyan">automate</span><span className="text-text-tertiary">();</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}>
              <span className="text-accent-light">await</span> <span className="text-text-primary">agent</span><span className="text-text-tertiary">.</span><span className="text-cyan">optimize</span><span className="text-text-tertiary">();</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
              <span className="text-green-400/70">{"// → +73% efficacité"}</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
              <span className="text-green-400/70">{"// → 2.847 tâches/jour"}</span>
            </motion.div>
          </div>
        </div>
      </FloatingPanel>

      {/* Performance Widget — top right (lg) */}
      <FloatingPanel className="absolute top-0 right-0 hidden lg:block" delay={0.5} duration={9} amplitude={11} rotate={0.5}>
        <div className="w-48 rounded-xl border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-3 shadow-2xl card-shine">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[9px] text-text-tertiary uppercase tracking-[0.12em] font-medium">Performance</span>
            <span className="text-[8px] text-green-400 font-mono">▲ 24%</span>
          </div>
          <div className="flex items-end gap-[3px] h-10">
            {[35, 55, 40, 70, 52, 82, 65, 90, 72, 95, 80, 88].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-primary/30 to-accent-light/50"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1.0 + i * 0.06, duration: 0.5, ease: premiumEase }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-border-subtle">
            <span className="text-[8px] text-text-tertiary font-mono">Jan</span>
            <span className="text-[8px] text-text-tertiary font-mono">Déc</span>
          </div>
        </div>
      </FloatingPanel>

      {/* Automation status — middle-bottom right */}
      <FloatingPanel className="absolute top-[62%] right-0 md:top-[58%] lg:top-[58%] lg:right-0 hidden md:block" delay={1.1} duration={8} amplitude={12} rotate={-0.4}>
        <div className="w-40 rounded-lg border border-border-subtle bg-bg-card/90 backdrop-blur-xl p-3 shadow-2xl card-shine">
          <span className="text-[9px] text-text-tertiary uppercase tracking-[0.12em] font-medium block mb-2">Workflows</span>
          {[
            { name: "Emails", status: "actif", color: "bg-green-400" },
            { name: "CRM sync", status: "actif", color: "bg-green-400" },
            { name: "Reporting", status: "pause", color: "bg-yellow-400" },
          ].map((wf, i) => (
            <motion.div
              key={wf.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 + i * 0.15 }}
              className="flex items-center justify-between py-1.5 border-b border-border-subtle last:border-0"
            >
              <span className="text-[9px] text-text-secondary">{wf.name}</span>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${wf.color}`} />
                <span className="text-[8px] text-text-tertiary">{wf.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </FloatingPanel>
    </div>
  );
}
