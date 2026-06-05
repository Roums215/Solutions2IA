"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

/* "L'Atelier Bois" — menuiserie sur mesure, palette chaude artisanale.
   PREMIER ÉCRAN UNIQUEMENT (announce + header + hero scène). Zéro <img>,
   zéro token 2IA, transform/opacity only, reduced-motion géré. */

const SERIF: CSSProperties = {
  fontFamily: '"Cormorant Garamond","Playfair Display",Georgia,"Times New Roman",serif',
};

const HEX_PATH = "M12 2 L20 8 L20 18 L12 22 L4 18 L4 8 Z";
const ANIM_EASE = [0.16, 1, 0.3, 1] as const;

export function PremiumPage() {
  return (
    <div className="bg-[#faf6ef] text-[#3a2a1c] select-none h-full flex flex-col">
      <AnnouncementBar />
      <SiteHeader />
      <HeroSection />
    </div>
  );
}

/* ── ANNOUNCEMENT BAR ──────────────────────────────────────────────── */
function AnnouncementBar() {
  return (
    <div
      className="bg-[#f5ebd7]/80 border-b border-[#e8d8b8] text-[#6b4f2f] text-[8px] sm:text-[10px] uppercase tracking-[0.22em] px-4 sm:px-6 py-1 sm:py-1.5 text-center shrink-0"
      style={SERIF}
    >
      Livraison offerte en France · Atelier à Montpellier
    </div>
  );
}

/* ── HEADER ────────────────────────────────────────────────────────── */
function SiteHeader() {
  return (
    <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-[#faf6ef] border-b border-[#e8d8b8] shrink-0">
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b4f2f" className="shrink-0">
          <path d={HEX_PATH} />
        </svg>
        <span className="text-[14px] sm:text-[17px] font-medium tracking-tight" style={SERIF}>
          {"L'Atelier Bois"}
        </span>
      </div>
      <nav className="hidden sm:flex items-center gap-5 text-[10px] text-[#6b4f2f] uppercase tracking-[0.18em]">
        <span>Collections</span>
        <span>Sur-mesure</span>
        <span>{"L'Atelier"}</span>
        <span>Contact</span>
      </nav>
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#3a2a1c] text-[#faf6ef] text-[10px] sm:text-[11px] font-medium tracking-wide">
        Prendre RDV
      </div>
    </div>
  );
}

/* ── HERO ──────────────────────────────────────────────────────────── */
function HeroSection() {
  const { mounted, prefersReducedMotion } = usePerformanceMode();
  const useAnim = mounted && !prefersReducedMotion;

  const textMotion = useAnim
    ? {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: ANIM_EASE },
        viewport: { once: true, margin: "-10%" } as const,
      }
    : {};

  const visualMotion = useAnim
    ? {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: ANIM_EASE, delay: 0.12 },
        viewport: { once: true, margin: "-10%" } as const,
      }
    : {};

  return (
    <section className="flex-1 min-h-0 px-4 sm:px-6 py-3 sm:py-6 grid grid-cols-1 sm:grid-cols-[1fr_1.05fr] gap-4 sm:gap-8 items-center">
      <motion.div {...textMotion}>
        <span
          className="block text-[9px] sm:text-[11px] uppercase tracking-[0.24em] text-[#c97a5b] mb-1.5 sm:mb-2.5"
          style={SERIF}
        >
          Édition 2026
        </span>
        <h1
          className="text-[20px] sm:text-[32px] font-normal text-[#3a2a1c] leading-[1.05] mb-2 sm:mb-3 max-w-[95%]"
          style={SERIF}
        >
          Le mobilier sur mesure,
          <br />
          <span className="italic text-[#8b6f47]">pensé pour durer.</span>
        </h1>
        <p className="text-[11px] sm:text-[13px] text-[#6b4f2f] leading-relaxed mb-3 sm:mb-4 max-w-[90%]">
          Chêne, noyer, frêne. Pièces uniques façonnées à la main dans notre
          atelier du sud de la France.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="text-[11px] sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#3a2a1c] text-[#faf6ef] rounded-full"
          >
            Voir les collections →
          </button>
          <button
            type="button"
            className="text-[11px] sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 text-[#3a2a1c] border border-[#3a2a1c]/30 rounded-full"
          >
            Notre savoir-faire
          </button>
        </div>

        {/* Réassurance — étoiles + note + volume */}
        <div
          className="flex items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-3.5 text-[10px] sm:text-[11px] text-[#6b4f2f]"
          style={SERIF}
        >
          <span className="text-[#c97a5b] tracking-[0.05em]">★★★★★</span>
          <span className="font-medium">4,9/5</span>
          <span className="text-[#6b4f2f]/50">·</span>
          <span className="italic">200+ pièces livrées</span>
        </div>

        {/* Chips matériaux */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2.5">
          {[
            { label: "Chêne", color: "#c8a878" },
            { label: "Noyer", color: "#6b4f2f" },
            { label: "Frêne", color: "#e8d3a8" },
          ].map((m) => (
            <span
              key={m.label}
              className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#e8d8b8] bg-[#faf6ef] text-[9px] sm:text-[10.5px] text-[#6b4f2f]"
              style={SERIF}
            >
              <span
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                style={{ background: m.color, boxShadow: "inset 0 -1px 1px rgba(58,42,28,0.25)" }}
              />
              {m.label}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div {...visualMotion} className="self-stretch flex items-center">
        <HeroVisual />
      </motion.div>
    </section>
  );
}

/* ── HERO VISUAL — scène dimensionnelle (mur + sol + lumière + fauteuil) ── */
function HeroVisual() {
  return (
    <div
      className="relative w-full aspect-[5/4] rounded-[18px] overflow-hidden"
      style={{ boxShadow: "0 26px 50px -22px rgba(58,42,28,0.45)" }}
    >
      {/* MUR (haut, plus clair) */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "62%",
          background: "linear-gradient(180deg, #f0e0c0 0%, #e6d2a7 100%)",
        }}
      />

      {/* SOL (bas, plus chaud) */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "38%",
          background: "linear-gradient(180deg, #b48a55 0%, #8a6738 100%)",
        }}
      />

      {/* HORIZON doux (transition mur/sol) */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: "58%",
          height: "8%",
          background:
            "linear-gradient(180deg, rgba(180,138,85,0) 0%, rgba(180,138,85,0.55) 60%, rgba(180,138,85,0) 100%)",
        }}
      />

      {/* LUMIÈRE DE FENÊTRE (radial chaud, haut-droite) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 85% 10%, rgba(255,235,188,0.55), rgba(255,235,188,0.18) 35%, transparent 70%)",
        }}
      />

      {/* VIGNETTAGE doux (coins) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 110% 90% at 50% 50%, transparent 58%, rgba(58,42,28,0.3) 100%)",
        }}
      />

      {/* GRAIN */}
      <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none" />

      {/* FAUTEUIL — tonalité + ombre portée */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="olympeBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b89262" />
            <stop offset="0.6" stopColor="#9a7740" />
            <stop offset="1" stopColor="#7a5c30" />
          </linearGradient>
          <linearGradient id="olympeSeat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7a5c30" />
            <stop offset="1" stopColor="#5a3f20" />
          </linearGradient>
          <linearGradient id="olympeArmLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6d5028" />
            <stop offset="1" stopColor="#8a6a38" />
          </linearGradient>
          <linearGradient id="olympeArmRight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8a6a38" />
            <stop offset="1" stopColor="#a87f4a" />
          </linearGradient>
          <filter id="olympeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>

        {/* Ombre portée au sol */}
        <ellipse
          cx="50"
          cy="87"
          rx="34"
          ry="3"
          fill="#3a2a1c"
          opacity="0.35"
          filter="url(#olympeShadow)"
        />

        {/* Bras gauche (côté en léger contre-jour) */}
        <path
          d="M14 65 Q14 55 22 55 L22 78 L14 78 Z"
          fill="url(#olympeArmLeft)"
        />

        {/* Bras droit (côté lit par la fenêtre) */}
        <path
          d="M86 65 Q86 55 78 55 L78 78 L86 78 Z"
          fill="url(#olympeArmRight)"
        />

        {/* Dossier (surface principale verticale) */}
        <path
          d="M22 50 Q22 38 32 38 L68 38 Q78 38 78 50 L78 60 L22 60 Z"
          fill="url(#olympeBody)"
        />

        {/* Assise (cushion, plus sombre) */}
        <path
          d="M22 60 L78 60 L78 78 L22 78 Z"
          fill="url(#olympeSeat)"
        />

        {/* Pli subtil sous le dossier */}
        <line
          x1="23"
          y1="60.3"
          x2="77"
          y2="60.3"
          stroke="rgba(58,42,28,0.28)"
          strokeWidth="0.4"
        />

        {/* Reflet doux sur l'arête haute du dossier */}
        <path
          d="M23 49 Q23 39 32.5 39 L67.5 39 Q77 39 77 49"
          stroke="rgba(245,222,176,0.35)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Reflet bord avant de l'assise */}
        <line
          x1="23"
          y1="60.2"
          x2="77"
          y2="60.2"
          stroke="rgba(245,222,176,0.22)"
          strokeWidth="0.5"
        />

        {/* Pieds (sombres) */}
        <rect x="26" y="78" width="3" height="10" fill="#2e2014" rx="0.4" />
        <rect x="71" y="78" width="3" height="10" fill="#2e2014" rx="0.4" />
      </svg>

      {/* Légende */}
      <span
        className="absolute bottom-3 left-4 text-[10px] sm:text-[12px] text-[#3a2a1c]/90 uppercase tracking-[0.22em]"
        style={SERIF}
      >
        Fauteuil « Olympe »
      </span>
    </div>
  );
}
