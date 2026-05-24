"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { LegacyPage } from "./web-transform/LegacyPage";
import { PremiumPage } from "./web-transform/PremiumPage";

interface WebTransformShowcaseProps {
  before: string;
  after: string;
  metric: string;
}

const TOGGLE_EASE = [0.16, 1, 0.3, 1] as const;
const TOGGLE_DURATION = 0.9;
const SLANT = 8;

export function WebTransformShowcase({ before, after, metric }: WebTransformShowcaseProps) {
  const { mounted, prefersReducedMotion } = usePerformanceMode();
  const [revealed, setRevealed] = useState(false);
  const toggleMV = useMotionValue(0);

  useEffect(() => {
    if (!mounted) return;
    if (prefersReducedMotion) {
      toggleMV.set(revealed ? 1 : 0);
      return;
    }
    const ctrl = animate(toggleMV, revealed ? 1 : 0, {
      duration: TOGGLE_DURATION,
      ease: TOGGLE_EASE,
    });
    return () => ctrl.stop();
  }, [revealed, mounted, prefersReducedMotion, toggleMV]);

  const clipPath = useTransform(toggleMV, (p) => {
    // Map [0,1] to a "wipe center" that ranges from -SLANT to 100+SLANT
    // so the polygon collapses to empty at p=0 and fills entirely at p=1
    const center = p * (100 + 2 * SLANT) - SLANT;
    const top = Math.max(0, Math.min(100, center + SLANT));
    const bot = Math.max(0, Math.min(100, center - SLANT));
    return `polygon(0% 0%, ${top}% 0%, ${bot}% 100%, 0% 100%)`;
  });
  const edgeX = useTransform(toggleMV, (p) => {
    const center = p * (100 + 2 * SLANT) - SLANT;
    return `calc(${center}% - 1px)`;
  });
  const edgeOpacity = useTransform(toggleMV, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const reducedOpacity = useTransform(toggleMV, [0, 1], [0, 1]);
  const legacyUrlOpacity = useTransform(toggleMV, [0, 0.5], [1, 0]);
  const premiumUrlOpacity = useTransform(toggleMV, [0.5, 1], [0, 1]);
  const metricOpacity = useTransform(toggleMV, [0.6, 1], [0, 1]);
  const metricY = useTransform(toggleMV, [0.6, 1], [8, 0]);

  const metricParts = metric.split(" ");
  const metricValue = metricParts[0];
  const metricLabel = metricParts.slice(1).join(" ") || "résultat";

  return (
    <section className="section-shell-tight relative">
      <div className="section-container max-w-[1100px] mx-auto flex flex-col gap-5 sm:gap-7">
        {/* TOOLBAR */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
          <SegmentedToggle
            revealed={revealed}
            setRevealed={setRevealed}
            beforeLabel={before}
            afterLabel={after}
          />
          <motion.div
            style={{ opacity: metricOpacity, y: metricY }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/40 bg-bg-card/70 backdrop-blur"
          >
            <span className="text-sm font-bold text-gradient-strong leading-none">
              {metricValue}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-text-tertiary">
              {metricLabel}
            </span>
          </motion.div>
        </div>

        {/* FRAME */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: TOGGLE_EASE }}
          className="relative rounded-2xl border border-border-subtle bg-bg-card/40 backdrop-blur shadow-2xl shadow-accent-glow/15 overflow-hidden"
        >
          <BrowserChrome
            legacyUrlOpacity={legacyUrlOpacity}
            premiumUrlOpacity={premiumUrlOpacity}
          />

          {/* Frame contenu — 1 écran, pas de scroll, grid pour stacker les 2 pages */}
          <div className="relative grid grid-cols-1 overflow-hidden h-[clamp(440px,70vh,720px)]">
            <div className="col-start-1 row-start-1">
              <LegacyPage />
            </div>

            {prefersReducedMotion ? (
              <motion.div
                className="col-start-1 row-start-1"
                style={{ opacity: reducedOpacity }}
              >
                <PremiumPage />
              </motion.div>
            ) : (
              <motion.div
                className="col-start-1 row-start-1"
                style={{ clipPath }}
              >
                <PremiumPage />
              </motion.div>
            )}

            {!prefersReducedMotion && (
              <motion.div
                aria-hidden
                className="absolute inset-y-0 left-0 w-[2px] bg-cyan pointer-events-none shadow-[0_0_24px_rgba(34,211,238,0.85)]"
                style={{ x: edgeX, opacity: edgeOpacity }}
              />
            )}
          </div>
        </motion.div>

        {/* Metric mobile */}
        <motion.div
          style={{ opacity: metricOpacity }}
          className="sm:hidden self-center flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/40 bg-bg-card/70"
        >
          <span className="text-sm font-bold text-gradient-strong">{metricValue}</span>
          <span className="text-[10px] uppercase tracking-wider text-text-tertiary">
            {metricLabel}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ── SEGMENTED TOGGLE ──────────────────────────────────────────────── */
interface SegmentedToggleProps {
  revealed: boolean;
  setRevealed: (v: boolean) => void;
  beforeLabel: string;
  afterLabel: string;
}
function SegmentedToggle({ revealed, setRevealed, beforeLabel, afterLabel }: SegmentedToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Comparaison avant après"
      className="relative inline-flex items-center gap-1 p-1 rounded-full border border-border-subtle bg-bg-card/70 backdrop-blur"
    >
      <ToggleButton
        active={!revealed}
        onClick={() => setRevealed(false)}
        label="Avant"
        sub={beforeLabel}
      />
      <ToggleButton
        active={revealed}
        onClick={() => setRevealed(true)}
        label="Après"
        sub={afterLabel}
      />
    </div>
  );
}

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}
function ToggleButton({ active, onClick, label, sub }: ToggleButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="relative z-10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors"
      title={sub}
    >
      {active && (
        <motion.span
          layoutId="seg-indicator"
          className="absolute inset-0 rounded-full bg-bg-card border border-border-accent shadow-[0_0_24px_rgba(34,211,238,0.18)]"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span
        className={`relative text-[11px] sm:text-[13px] font-medium tracking-wide ${
          active ? "text-text-primary" : "text-text-tertiary"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

/* ── BROWSER CHROME ────────────────────────────────────────────────── */
interface BrowserChromeProps {
  legacyUrlOpacity: MotionValue<number>;
  premiumUrlOpacity: MotionValue<number>;
}
function BrowserChrome({ legacyUrlOpacity, premiumUrlOpacity }: BrowserChromeProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-border-subtle bg-bg-card/80 backdrop-blur">
      <div className="flex gap-1.5">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="hidden sm:flex items-center gap-1 text-text-tertiary">
        <NavGlyph d="M15 18 L9 12 L15 6" />
        <NavGlyph d="M9 18 L15 12 L9 6" />
        <NavGlyph d="M3 12 a9 9 0 1 0 3-6.7 M3 4 v5 h5" />
      </div>
      <div className="relative flex-1 mx-1 sm:mx-2 px-2.5 py-1 rounded-md bg-bg-tertiary border border-border-subtle flex items-center gap-2 min-w-0">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-tertiary shrink-0">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <div className="relative flex-1 h-4 overflow-hidden">
          <motion.span
            style={{ opacity: legacyUrlOpacity }}
            className="absolute inset-0 text-[10px] sm:text-[11px] font-mono text-text-tertiary truncate flex items-center"
          >
            https://www.societe-conseil.com
          </motion.span>
          <motion.span
            style={{ opacity: premiumUrlOpacity }}
            className="absolute inset-0 text-[10px] sm:text-[11px] font-mono text-accent-light truncate flex items-center"
          >
            https://latelier-bois.fr
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function NavGlyph({ d }: { d: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}
