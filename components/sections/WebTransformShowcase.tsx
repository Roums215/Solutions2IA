"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

const SERIF: CSSProperties = {
  fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, "Times New Roman", serif',
};

/* ──────────────────────────────────────────────────────────────────
   LegacyMockup — site générique "moyen" ~2017, template fade
   Palette gris-bleu froide, sans-serif neutre, layout convenu.
   ────────────────────────────────────────────────────────────────── */
function LegacyMockup() {
  return (
    <div className="absolute inset-0 bg-[#eef2f6] text-[#2e3a4a] flex flex-col overflow-hidden">
      {/* Browser chrome — neutre */}
      <div className="relative flex items-center gap-2 px-3 py-2 border-b border-[#c8d0d8] bg-[#dfe5ec] shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400/70" />
        </div>
        <div className="flex-1 mx-3 flex items-center gap-2 px-2 py-1 rounded-md bg-white border border-[#c8d0d8]">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[9px] font-mono text-[#94a3b8] truncate">
            https://www.societe-conseil.com
          </span>
        </div>
      </div>

      {/* Cookie banner */}
      <div className="bg-[#eef2f6] border-b border-[#c8d0d8] px-3 py-1 flex items-center justify-between gap-3 shrink-0">
        <span className="text-[7px] sm:text-[9px] text-[#64748b] truncate">
          Ce site utilise des cookies pour améliorer votre expérience de navigation.
        </span>
        <div className="flex gap-1 shrink-0">
          <button
            type="button"
            className="text-[7px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 bg-[#5b8bbf] text-white rounded-sm"
          >
            Accepter
          </button>
          <button
            type="button"
            className="text-[7px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 border border-[#c8d0d8] text-[#64748b] rounded-sm"
          >
            Refuser
          </button>
        </div>
      </div>

      {/* Site header */}
      <div className="relative flex items-center justify-between gap-3 px-3 sm:px-5 py-2.5 sm:py-3 bg-white border-b border-[#e2e8f0] shrink-0">
        <div className="text-[11px] sm:text-[14px] font-bold tracking-tight text-[#2e3a4a]">
          SOCIÉTÉ CONSEIL
        </div>
        <nav className="hidden sm:flex items-center gap-5 text-[10px] text-[#64748b]">
          <span>Accueil</span>
          <span>Services</span>
          <span>À propos</span>
          <span>Contact</span>
        </nav>
        <div className="px-2.5 py-1 text-[9px] sm:text-[10px] text-[#5b8bbf] border border-[#5b8bbf]">
          Devis gratuit
        </div>
      </div>

      {/* Hero : stock photo block + text */}
      <div className="relative flex flex-1 min-h-0 px-3 sm:px-5 pt-3 sm:pt-4 pb-2 gap-3 sm:gap-4 items-stretch">
        <div className="w-[40%] sm:w-[44%] shrink-0 relative bg-gradient-to-br from-[#cdd6e0] via-[#b4bfca] to-[#8fa0b4] border border-[#a0aec0]/40 overflow-hidden">
          <svg
            viewBox="0 0 100 80"
            className="absolute inset-x-0 bottom-0 w-full h-full"
            preserveAspectRatio="xMidYMax meet"
          >
            <circle cx="34" cy="32" r="9" fill="#94a3b8" />
            <path
              d="M16 70 C 16 56, 24 50, 34 50 C 44 50, 52 56, 52 70 Z"
              fill="#94a3b8"
            />
            <circle cx="66" cy="32" r="9" fill="#7c8a9b" />
            <path
              d="M48 70 C 48 56, 56 50, 66 50 C 76 50, 84 56, 84 70 Z"
              fill="#7c8a9b"
            />
          </svg>
          <span className="absolute top-1 left-1 text-[6px] sm:text-[7px] text-white/70 bg-black/25 px-1 font-mono">
            shutterstock_4271.jpg
          </span>
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h1 className="text-[13px] sm:text-[19px] font-semibold text-[#2e3a4a] leading-tight mb-1.5">
            Votre partenaire de confiance
          </h1>
          <p className="text-[8px] sm:text-[10px] text-[#64748b] leading-relaxed mb-2 sm:mb-3 max-w-[95%]">
            Nous accompagnons nos clients vers le succès grâce à des solutions
            innovantes adaptées à leurs besoins spécifiques depuis plus de 15 ans.
          </p>
          <button
            type="button"
            className="self-start text-[8px] sm:text-[10px] font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#5b8bbf] text-white"
          >
            En savoir plus
          </button>
          <div className="flex gap-1 mt-2.5 sm:mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5b8bbf]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8d0d8]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8d0d8]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#c8d0d8]" />
          </div>
        </div>
      </div>

      {/* 3 service cards identiques, sans personnalité */}
      <div className="px-3 sm:px-5 pb-3 grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
        {[
          { title: "Conseil", desc: "Lorem ipsum dolor sit amet." },
          { title: "Stratégie", desc: "Consectetur adipiscing elit." },
          { title: "Solutions", desc: "Sed do eiusmod tempor." },
        ].map((c) => (
          <div
            key={c.title}
            className="bg-white border border-[#e2e8f0] px-1.5 sm:px-2.5 py-1.5 sm:py-2"
          >
            <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-[#5b8bbf]/15 mb-1" />
            <div className="text-[8px] sm:text-[11px] font-semibold text-[#2e3a4a] leading-tight mb-0.5">
              {c.title}
            </div>
            <div className="text-[6px] sm:text-[9px] text-[#94a3b8] leading-snug">
              {c.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Footer minimal */}
      <div className="bg-[#2e3a4a] text-white/70 text-[7px] sm:text-[9px] px-3 sm:px-5 py-1.5 flex items-center justify-between shrink-0">
        <span>© 2017 Société Conseil — Tous droits réservés</span>
        <span className="hidden sm:inline">Mentions · CGU · Plan du site</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PremiumMockup — L'Atelier Bois (menuiserie sur mesure)
   Palette propre au client : crème, beige, bois, terracotta.
   Aucun token 2IA (indigo/cyan) — typo serif élégant.
   ────────────────────────────────────────────────────────────────── */
function PremiumMockup() {
  const collections = [
    {
      label: "Chaises",
      gradient: "linear-gradient(135deg, #ead9b8 0%, #b48857 100%)",
      icon: (
        <svg
          viewBox="0 0 60 60"
          fill="none"
          stroke="#3a2a1c"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M20 10 L20 38 L40 38 L40 10" />
          <path d="M20 26 L40 26" />
          <path d="M22 38 L20 50 M40 38 L42 50" />
          <path d="M28 38 L27 50 M34 38 L33 50" />
        </svg>
      ),
    },
    {
      label: "Tables",
      gradient: "linear-gradient(135deg, #d8b985 0%, #8b6a3f 100%)",
      icon: (
        <svg
          viewBox="0 0 60 60"
          fill="none"
          stroke="#3a2a1c"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M6 22 L54 22 L54 28 L6 28 Z" />
          <path d="M14 28 L14 50 M46 28 L46 50" />
          <path d="M14 38 L46 38" />
        </svg>
      ),
    },
    {
      label: "Rangements",
      gradient: "linear-gradient(135deg, #c39e6b 0%, #5e3f1d 100%)",
      icon: (
        <svg
          viewBox="0 0 60 60"
          fill="none"
          stroke="#3a2a1c"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <rect x="14" y="8" width="32" height="46" />
          <path d="M14 23 L46 23" />
          <path d="M14 38 L46 38" />
          <circle cx="40" cy="15.5" r="0.9" fill="#3a2a1c" />
          <circle cx="40" cy="30.5" r="0.9" fill="#3a2a1c" />
          <circle cx="40" cy="46" r="0.9" fill="#3a2a1c" />
        </svg>
      ),
    },
  ];

  const reassurance = [
    { label: "Fait main", path: "M6 12 L10 16 L18 8" },
    { label: "Bois massif", path: "M4 12 L20 12 M8 4 L8 20 M16 4 L16 20" },
    { label: "Sur mesure", path: "M5 5 L19 5 M5 12 L15 12 M5 19 L19 19" },
  ];

  return (
    <div className="absolute inset-0 bg-[#faf6ef] text-[#3a2a1c] flex flex-col overflow-hidden">
      {/* Browser chrome — warm */}
      <div className="relative flex items-center gap-2 px-3 py-2 border-b border-[#e8d8b8] bg-[#f0e7d3] shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#c97a5b]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#d4b896]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#8b6f47]" />
        </div>
        <div className="flex-1 mx-3 flex items-center gap-2 px-2 py-1 rounded-md bg-[#faf6ef] border border-[#e8d8b8]">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8b6f47" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-[9px] font-mono text-[#8b6f47] truncate">
            https://latelier-bois.fr
          </span>
        </div>
      </div>

      {/* Site header */}
      <div className="relative flex items-center justify-between gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#faf6ef] border-b border-[#e8d8b8] shrink-0">
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#6b4f2f" className="shrink-0">
            <path d="M12 2 L20 8 L20 18 L12 22 L4 18 L4 8 Z" />
          </svg>
          <span
            className="text-[12px] sm:text-[16px] font-medium tracking-tight text-[#3a2a1c]"
            style={SERIF}
          >
            {"L'Atelier Bois"}
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-5 text-[9px] text-[#6b4f2f] uppercase tracking-[0.18em]">
          <span>Collections</span>
          <span>Sur-mesure</span>
          <span>{"L'Atelier"}</span>
          <span>Contact</span>
        </nav>
        <div className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#3a2a1c] text-[#faf6ef] text-[9px] sm:text-[10px] font-medium tracking-wide">
          Prendre RDV
        </div>
      </div>

      {/* Hero */}
      <div className="relative flex flex-1 min-h-0 gap-3 sm:gap-5 px-3 sm:px-5 pt-3 sm:pt-5 pb-2 sm:pb-3">
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <span
            className="text-[7px] sm:text-[10px] uppercase tracking-[0.24em] text-[#c97a5b] mb-1.5 sm:mb-2"
            style={SERIF}
          >
            Édition 2026
          </span>
          <h1
            className="text-[15px] sm:text-[26px] font-normal text-[#3a2a1c] leading-[1.05] mb-1.5 sm:mb-3 max-w-[95%]"
            style={SERIF}
          >
            Le mobilier sur mesure,
            <br />
            <span className="italic text-[#8b6f47]">pensé pour durer.</span>
          </h1>
          <p className="text-[8px] sm:text-[11px] text-[#6b4f2f] leading-relaxed mb-2.5 sm:mb-4 max-w-[88%]">
            Chêne, noyer, frêne. Pièces uniques façonnées à la main dans notre
            atelier du sud de la France.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-[8px] sm:text-[11px] font-medium px-3 sm:px-4 py-1.5 sm:py-2 bg-[#3a2a1c] text-[#faf6ef] rounded-full"
            >
              Voir les collections →
            </button>
            <button
              type="button"
              className="text-[8px] sm:text-[11px] font-medium px-3 sm:px-4 py-1.5 sm:py-2 text-[#3a2a1c] border border-[#3a2a1c]/30 rounded-full"
            >
              Notre savoir-faire
            </button>
          </div>
        </div>

        {/* Hero visual : wood gradient + armchair line-art */}
        <div className="w-[42%] sm:w-[40%] shrink-0 relative rounded-[18px] overflow-hidden shadow-2xl shadow-[#3a2a1c]/20 self-stretch">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #ead9b8 0%, #c8a878 45%, #8b6a3f 100%)",
            }}
          />
          {/* Wood grain stripes */}
          <svg
            className="absolute inset-0 w-full h-full opacity-25 mix-blend-multiply pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path d="M0,20 Q50,17 100,22" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
            <path d="M0,38 Q50,42 100,36" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
            <path d="M0,55 Q50,51 100,58" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
            <path d="M0,72 Q50,76 100,69" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
            <path d="M0,88 Q50,84 100,90" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
          </svg>
          {/* Armchair silhouette */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full px-4 py-3 sm:px-6 sm:py-4"
            fill="none"
            stroke="#3a2a1c"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M22 80 L22 52 Q22 38 32 38 L68 38 Q78 38 78 52 L78 80" />
            <path d="M22 60 L78 60" />
            <path d="M28 80 L28 92 M72 80 L72 92" />
            <path d="M22 55 Q14 55 14 65 L14 74 Q14 78 18 78" />
            <path d="M78 55 Q86 55 86 65 L86 74 Q86 78 82 78" />
          </svg>
          <span
            className="absolute bottom-2 left-3 text-[7px] sm:text-[9px] text-[#3a2a1c]/80 uppercase tracking-[0.2em]"
            style={SERIF}
          >
            Fauteuil « Olympe »
          </span>
        </div>
      </div>

      {/* Collections grid */}
      <div className="px-3 sm:px-5 py-1.5 sm:py-2 grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
        {collections.map((c) => (
          <div
            key={c.label}
            className="relative rounded-lg overflow-hidden border border-[#e8d8b8]/80 h-12 sm:h-16"
            style={{ background: c.gradient }}
          >
            {/* Subtle wood grain */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25 mix-blend-multiply pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path d="M0,28 Q50,25 100,30" stroke="#5e3f1d" strokeWidth="0.5" fill="none" />
              <path d="M0,62 Q50,66 100,60" stroke="#5e3f1d" strokeWidth="0.5" fill="none" />
              <path d="M0,86 Q50,82 100,88" stroke="#5e3f1d" strokeWidth="0.5" fill="none" />
            </svg>
            <div className="relative h-full p-1.5 sm:p-2.5 flex items-center justify-between">
              <span
                className="text-[8px] sm:text-[11px] font-medium text-[#3a2a1c]"
                style={SERIF}
              >
                {c.label}
              </span>
              <div className="w-6 h-6 sm:w-9 sm:h-9 shrink-0">{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Reassurance line */}
      <div className="border-t border-[#e8d8b8] bg-[#f5ebd7]/70 px-3 sm:px-5 py-1.5 flex items-center justify-around gap-2 shrink-0">
        {reassurance.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-1.5 text-[7px] sm:text-[10px] text-[#6b4f2f] uppercase tracking-[0.18em] ${
              i > 0 ? "border-l border-[#e8d8b8] pl-2 sm:pl-3" : ""
            } pr-2 sm:pr-3`}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c97a5b"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={item.path} />
            </svg>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Footer warm */}
      <div className="bg-[#3a2a1c] text-[#faf6ef]/85 px-3 sm:px-5 py-1.5 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="#c97a5b" className="shrink-0">
            <path d="M12 2 L20 8 L20 18 L12 22 L4 18 L4 8 Z" />
          </svg>
          <span className="text-[7px] sm:text-[10px]" style={SERIF}>
            {"L'Atelier Bois · Depuis 2008 · Montpellier"}
          </span>
        </div>
        <span
          className="hidden sm:inline text-[8px] sm:text-[9px] text-[#faf6ef]/60 uppercase tracking-wider"
        >
          Instagram · Pinterest
        </span>
      </div>
    </div>
  );
}
