"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

interface WebTransformShowcaseProps {
  before: string;
  after: string;
  metric: string;
}

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function WebTransformShowcase({ before, after, metric }: WebTransformShowcaseProps) {
  const { mounted, isCoarsePointer, prefersReducedMotion } = usePerformanceMode();
  const useScrollScrub = mounted && !isCoarsePointer && !prefersReducedMotion;
  const useToggle = mounted && isCoarsePointer && !prefersReducedMotion;

  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollWrapperRef,
    offset: ["start start", "end end"],
  });

  const toggleMV = useMotionValue(0);
  const [revealed, setRevealed] = useState(false);

  const wipeProgress = useTransform(
    useScrollScrub ? scrollYProgress : toggleMV,
    useScrollScrub ? [0.3, 0.62] : [0, 1],
    [0, 1],
    { clamp: true },
  );

  const clipPath = useTransform(
    wipeProgress,
    (p) => `polygon(0% 0%, ${p * 100}% 0%, ${p * 100}% 100%, 0% 100%)`,
  );
  const edgeX = useTransform(wipeProgress, (p) => `calc(${p * 100}% - 1px)`);
  const edgeOpacity = useTransform(wipeProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);
  const metricOpacity = useTransform(wipeProgress, [0.82, 1], [0, 1]);
  const metricScale = useTransform(wipeProgress, [0.82, 1], [0.85, 1]);
  const beforeOpacity = useTransform(wipeProgress, [0, 0.15, 0.55, 0.8], [1, 1, 0.4, 0]);
  const afterOpacity = useTransform(wipeProgress, [0.45, 0.8, 1], [0, 1, 1]);

  useEffect(() => {
    if (!useToggle) return;
    const controls = animate(toggleMV, revealed ? 1 : 0, {
      duration: 1.4,
      ease: PREMIUM_EASE,
    });
    return () => controls.stop();
  }, [revealed, useToggle, toggleMV]);

  useEffect(() => {
    if (!mounted) return;
    if (prefersReducedMotion) {
      toggleMV.set(1);
      setRevealed(true);
    }
  }, [mounted, prefersReducedMotion, toggleMV]);

  const metricParts = metric.split(" ");
  const metricValue = metricParts[0];
  const metricLabel = metricParts.slice(1).join(" ") || "résultat";

  return (
    <section className="relative">
      <div
        ref={scrollWrapperRef}
        className={useScrollScrub ? "relative h-[180vh]" : "relative"}
      >
        <div
          className={
            useScrollScrub
              ? "sticky top-[12vh] h-[76vh] flex items-center justify-center"
              : "relative flex items-center justify-center py-4"
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: PREMIUM_EASE }}
            className="relative w-full max-w-[1100px] aspect-[16/10] rounded-2xl overflow-hidden border border-border-subtle shadow-2xl shadow-accent-glow/20"
            style={{ perspective: "1200px" }}
          >
            <LegacyMockup />

            <motion.div className="absolute inset-0" style={{ clipPath }}>
              <PremiumMockup />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute inset-y-0 left-0 w-[2px] bg-cyan pointer-events-none shadow-[0_0_24px_rgba(34,211,238,0.85)]"
              style={{ x: edgeX, opacity: edgeOpacity }}
            />

            <motion.div
              className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-primary/80 backdrop-blur"
              style={{ opacity: beforeOpacity }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-[10px] uppercase tracking-wider text-text-tertiary truncate max-w-[180px] sm:max-w-none">
                {before}
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-card/80 border border-cyan/30 backdrop-blur"
              style={{ opacity: afterOpacity }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="text-[10px] uppercase tracking-wider text-accent-light truncate max-w-[180px] sm:max-w-none">
                {after}
              </span>
            </motion.div>

            <motion.div
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-cyan/40 bg-bg-card/85 backdrop-blur-xl"
              style={{ opacity: metricOpacity, scale: metricScale }}
            >
              <span className="text-2xl sm:text-3xl font-bold text-gradient-strong leading-none block">
                {metricValue}
              </span>
              <span className="text-[9px] sm:text-[10px] text-text-tertiary uppercase tracking-wider">
                {metricLabel}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {useToggle && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              className="px-5 py-3 rounded-xl border border-border-accent bg-bg-card/80 backdrop-blur text-sm text-text-primary hover:border-cyan/40 transition-colors"
            >
              {revealed ? "Réinitialiser" : "Voir la transformation"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   LegacyMockup — état "ancien" (gris, serif, cassé, rouge)
   ────────────────────────────────────────────────────────────────── */
function LegacyMockup() {
  return (
    <div className="absolute inset-0 bg-[#1c1c1c]">
      <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3 py-2 border-b border-gray-700/60 bg-[#2a2a2a]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-500/50" />
        </div>
        <div className="flex-1 flex items-center gap-2 mx-3 px-2 py-1 rounded-md bg-[#1a1a1a] border border-red-500/20">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span className="text-[9px] font-mono text-gray-500 truncate">
            http://mon-vieux-site.fr/index.html
          </span>
          <motion.span
            className="inline-block text-[9px] text-gray-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ◐
          </motion.span>
        </div>
      </div>

      <div className="absolute inset-0 pt-10 px-4 sm:px-8 flex flex-col">
        <h1
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          className="text-xl sm:text-3xl text-gray-400 mb-1.5"
        >
          Bienvenue sur notre site web
        </h1>
        <p
          style={{ fontFamily: "Georgia, serif" }}
          className="text-[10px] sm:text-xs text-gray-600 italic mb-4 max-w-[55%]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
        </p>

        <div className="flex gap-3 sm:gap-5 flex-1 min-h-0">
          <div className="hidden sm:flex flex-col gap-2 w-28 pt-1">
            {["Accueil", "À propos", "Services", "Contact"].map((l) => (
              <span
                key={l}
                style={{ fontFamily: "Georgia, serif" }}
                className="text-xs text-gray-500 underline cursor-default"
              >
                {l}
              </span>
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-3 min-h-0">
            <div className="relative flex-1 bg-gray-700/30 border border-gray-600/60 rounded flex items-center justify-center min-h-[80px]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
                <line x1="3" y1="3" x2="21" y2="21" />
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-10 bg-gray-700/30 border border-gray-600/40 rounded" />
              ))}
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end justify-end gap-1 w-20 pb-2">
            <span style={{ fontFamily: "Georgia, serif" }} className="text-[9px] text-gray-500 mb-1">
              Stats
            </span>
            <div className="flex items-end gap-1 h-12">
              {[90, 70, 50, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-2.5 bg-red-500/35 rounded-t-sm"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{ fontFamily: "Georgia, serif" }}
          className="text-[9px] text-gray-600 mt-3 pb-3"
        >
          © 2008 — Tous droits réservés
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PremiumMockup — état "premium" (indigo/cyan, propre, hiérarchisé)
   ────────────────────────────────────────────────────────────────── */
function PremiumMockup() {
  return (
    <div className="absolute inset-0 bg-bg-secondary overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3 py-2 border-b border-border-subtle bg-bg-card/60 backdrop-blur">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyan/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent-light/60" />
        </div>
        <div className="flex-1 flex items-center gap-2 mx-3 px-2 py-1 rounded-md bg-bg-tertiary border border-border-subtle">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-light">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[9px] font-mono text-text-secondary truncate">
            https://votre-vitrine.fr
          </span>
        </div>
      </div>

      <div className="absolute inset-0 pt-10 px-4 sm:px-8 flex flex-col">
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gradient-strong mb-1.5">
          Votre vitrine qui convertit
        </h1>
        <p className="text-[10px] sm:text-sm text-text-secondary mb-4 max-w-[60%] leading-relaxed">
          Performance, design, conversion — un site qui travaille pour vous.
        </p>

        <div className="flex gap-3 sm:gap-5 flex-1 min-h-0">
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            <div className="relative flex-1 rounded-lg border border-border-subtle bg-gradient-to-br from-accent-primary/15 via-bg-card/40 to-cyan/10 overflow-hidden min-h-[80px] flex items-center justify-between p-3 sm:p-4">
              <div>
                <div className="text-[11px] sm:text-sm font-semibold text-text-primary mb-1">
                  Hero produit
                </div>
                <div className="text-[9px] sm:text-[10px] text-text-tertiary mb-2">
                  Engagement +47%
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent-primary/15 border border-accent-primary/30 text-accent-light text-[9px] sm:text-[10px]">
                  Découvrir →
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-primary to-cyan shadow-lg shadow-accent-glow/40" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Performance", icon: "⚡" },
                { label: "Design", icon: "✦" },
                { label: "Conversion", icon: "↗" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="surface-card px-2 py-2 flex flex-col items-start gap-1"
                >
                  <span className="text-[10px] text-accent-light">{c.icon}</span>
                  <span className="text-[9px] sm:text-[10px] text-text-secondary font-medium">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end justify-end gap-1 w-20 pb-2">
            <span className="text-[9px] text-text-tertiary mb-1 uppercase tracking-wider">
              Stats
            </span>
            <div className="flex items-end gap-1 h-12">
              {[30, 55, 75, 95].map((h, i) => (
                <div
                  key={i}
                  className="w-2.5 rounded-t-sm bg-gradient-to-t from-accent-primary/40 to-cyan/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 pb-3">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[9px] text-text-tertiary">Live · 2026 · Solutions 2IA</span>
        </div>
      </div>
    </div>
  );
}
