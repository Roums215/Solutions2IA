"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export type TransformationVariant =
  | "general"
  | "web"
  | "app"
  | "ai"
  | "studio"
  | "automation";

interface TransformationCardProps {
  variant: TransformationVariant;
  before: string;
  after: string;
  metric: string;
  beforeLabel?: string;
  afterLabel?: string;
  index?: number;
}

const variantConfig: Record<
  TransformationVariant,
  {
    icon: React.ReactNode;
    accentFrom: string;
    accentTo: string;
    pattern: "dots" | "bars" | "nodes" | "waves" | "grid";
  }
> = {
  general: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    accentFrom: "from-accent-primary",
    accentTo: "to-accent-light",
    pattern: "bars",
  },
  web: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    accentFrom: "from-accent-primary",
    accentTo: "to-cyan",
    pattern: "waves",
  },
  app: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    accentFrom: "from-accent-light",
    accentTo: "to-cyan",
    pattern: "grid",
  },
  ai: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="9" cy="16" r="1" fill="currentColor" />
        <circle cx="15" cy="16" r="1" fill="currentColor" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
    accentFrom: "from-cyan",
    accentTo: "to-accent-primary",
    pattern: "nodes",
  },
  studio: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    accentFrom: "from-accent-dark",
    accentTo: "to-accent-light",
    pattern: "dots",
  },
  automation: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    accentFrom: "from-cyan",
    accentTo: "to-accent-light",
    pattern: "bars",
  },
};

/** Mini visual indicator showing before/after state */
function StatePattern({
  pattern,
  active,
  delay = 0,
}: {
  pattern: "dots" | "bars" | "nodes" | "waves" | "grid";
  active: boolean;
  delay?: number;
}) {
  if (pattern === "bars") {
    return (
      <div className="flex items-end gap-[3px] h-4">
        {[0.4, 0.6, 0.5, 0.8, 1, 0.7].map((h, i) => (
          <motion.div
            key={i}
            className={`w-[3px] rounded-sm ${active ? "bg-gradient-to-t from-accent-primary to-accent-light" : "bg-text-tertiary/20"}`}
            initial={{ height: active ? 2 : h * 16 }}
            animate={{ height: active ? h * 16 : 2 }}
            transition={{ duration: 0.6, delay: delay + i * 0.05, ease: premiumEase }}
          />
        ))}
      </div>
    );
  }

  if (pattern === "nodes") {
    return (
      <div className="relative w-16 h-4">
        {[
          { x: 0, y: 8 },
          { x: 22, y: 2 },
          { x: 22, y: 14 },
          { x: 44, y: 8 },
        ].map((n, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full ${active ? "bg-accent-light shadow-[0_0_6px_rgba(129,140,248,0.8)]" : "bg-text-tertiary/25"}`}
            style={{ left: n.x, top: n.y }}
            animate={active ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 1.8, delay: delay + i * 0.15, repeat: active ? Infinity : 0, ease: "easeInOut" }}
          />
        ))}
        {active && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 16">
            <motion.path
              d="M3 8 L22 2 L22 14 L45 8"
              stroke="var(--color-accent-light)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: delay + 0.2 }}
            />
          </svg>
        )}
      </div>
    );
  }

  if (pattern === "waves") {
    return (
      <svg width="52" height="16" viewBox="0 0 52 16" fill="none" className="overflow-visible">
        <motion.path
          d={active ? "M2 8 Q10 2 18 8 T34 8 T50 8" : "M2 8 L50 8"}
          stroke={active ? "url(#wave-grad)" : "currentColor"}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          className={active ? "" : "text-text-tertiary/20"}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay }}
        />
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-primary)" />
            <stop offset="100%" stopColor="var(--color-cyan)" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (pattern === "grid") {
    return (
      <div className="grid grid-cols-4 gap-[3px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`w-1.5 h-1.5 rounded-sm ${active ? "bg-accent-light" : "bg-text-tertiary/20"}`}
            initial={{ scale: 0.5, opacity: active ? 0 : 1 }}
            animate={{ scale: 1, opacity: active ? 1 : 0.5 }}
            transition={{ duration: 0.4, delay: delay + i * 0.04 }}
          />
        ))}
      </div>
    );
  }

  // dots
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={`rounded-full ${active ? "bg-accent-light shadow-[0_0_4px_rgba(129,140,248,0.6)]" : "bg-text-tertiary/25"}`}
          initial={{ width: 4, height: 4 }}
          animate={{ width: active ? 6 + i : 4, height: 4 }}
          transition={{ duration: 0.5, delay: delay + i * 0.08, ease: premiumEase }}
        />
      ))}
    </div>
  );
}

/** Parses a metric like "×3 conversion" or "+89% conversion" or "73% temps" and returns the numeric part and suffix */
function parseMetric(metric: string): { prefix: string; value: number; suffix: string; pure: string } {
  const match = metric.match(/^([×+<>]*)(\d+(?:[.,]\d+)?)(.*?)$/);
  if (match) {
    return {
      prefix: match[1] || "",
      value: parseFloat(match[2].replace(",", ".")),
      suffix: match[3] || "",
      pure: metric,
    };
  }
  return { prefix: "", value: 0, suffix: "", pure: metric };
}

function AnimatedMetric({ metric, start }: { metric: string; start: boolean }) {
  const [display, setDisplay] = useState<string>(metric);
  const parsed = parseMetric(metric);
  const hasNumber = parsed.value > 0;

  useEffect(() => {
    if (!start || !hasNumber) {
      setDisplay(metric);
      return;
    }

    const duration = 1200;
    const startTime = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = parsed.value * eased;
      const rounded = parsed.value % 1 === 0 ? Math.round(current) : current.toFixed(1);
      setDisplay(`${parsed.prefix}${rounded}${parsed.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(metric);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, hasNumber, metric, parsed.prefix, parsed.value, parsed.suffix]);

  return <>{hasNumber ? display : metric}</>;
}

export function TransformationCard({
  variant,
  before,
  after,
  metric,
  beforeLabel = "Avant",
  afterLabel = "Avec Solutions 2IA",
  index = 0,
}: TransformationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const config = variantConfig[variant];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: premiumEase }}
      className="group relative rounded-2xl border border-border-subtle bg-bg-card/60 overflow-hidden transition-colors duration-500 hover:border-border-accent"
    >
      {/* Top progress line — animates from red to accent on scroll in */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r from-red-400/50 via-amber-400/40 ${config.accentFrom} ${config.accentTo}`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.6, delay: index * 0.1 + 0.3, ease: premiumEase }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Shine sweep on hover */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 bottom-0 -left-20 w-20 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg] transition-all duration-1000 group-hover:left-[110%]" />
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-[1fr,auto,1fr] items-stretch">
        {/* BEFORE side */}
        <div className="relative p-6 sm:p-7 lg:p-8 transition-colors duration-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-5 h-5 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-red-400/70">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-medium">
                {beforeLabel}
              </span>
            </div>
            <StatePattern pattern={config.pattern} active={false} delay={index * 0.1 + 0.3} />
          </div>
          <p className="text-base text-text-tertiary leading-relaxed">{before}</p>
        </div>

        {/* CENTER transition */}
        <div className="hidden sm:flex flex-col items-center justify-center px-6 lg:px-8 py-4 relative border-x border-border-subtle/50">
          {/* Vertical divider glow */}
          <motion.div
            className={`absolute top-[15%] bottom-[15%] left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-accent-primary/40 to-transparent`}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
          />

          {/* Domain icon in a pill */}
          <motion.div
            className={`relative w-9 h-9 rounded-xl bg-gradient-to-br ${config.accentFrom} ${config.accentTo} flex items-center justify-center text-white shadow-md shadow-accent-glow/30 mb-3`}
            initial={{ scale: 0, rotate: -30 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.5, ease: premiumEase }}
          >
            {config.icon}
            {/* Pulsing halo */}
            <motion.div
              className={`absolute inset-0 rounded-xl border border-accent-light/40`}
              animate={isInView ? { scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] } : {}}
              transition={{ duration: 2, delay: index * 0.1 + 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Animated arrow */}
          <motion.div
            className="text-accent-light mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
          >
            <motion.div
              animate={isInView ? { x: [-3, 3, -3] } : {}}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Metric badge */}
          <motion.div
            className="px-2.5 py-1 rounded-md border border-accent-primary/25 bg-accent-glow/40 backdrop-blur-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.7, ease: premiumEase }}
          >
            <span className="text-[11px] font-bold text-gradient-strong font-mono whitespace-nowrap tabular-nums">
              <AnimatedMetric metric={metric} start={isInView} />
            </span>
          </motion.div>
        </div>

        {/* AFTER side */}
        <div
          className={`relative p-6 sm:p-7 lg:p-8 border-t sm:border-t-0 border-border-subtle/50 transition-all duration-500 overflow-hidden`}
        >
          {/* After background glow */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${config.accentFrom}/8 ${config.accentTo}/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />
          <motion.div
            className="absolute inset-0 bg-accent-glow/20"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
          />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-5 h-5 rounded-full bg-accent-glow border border-accent-primary/30 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent-light">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-light font-medium">
                  {afterLabel}
                </span>
              </div>
              <StatePattern pattern={config.pattern} active={isInView} delay={index * 0.1 + 0.6} />
            </div>
            <p className="text-base text-text-primary font-medium leading-relaxed">{after}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
