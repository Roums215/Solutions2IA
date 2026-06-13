"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

// Composition hero lazy : chunk jamais téléchargé sur mobile/minimal.
const HeroVisual = dynamic(
  () => import("./HeroVisual").then((m) => m.HeroVisual),
  { ssr: false, loading: () => <div aria-hidden className="h-[460px] sm:h-[560px] lg:h-[620px] xl:h-[680px]" /> },
);

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const { isMobile, shouldReduceMotion, tier } = usePerformanceMode();

  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-radial-top" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-accent-primary/4 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan/3 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[400px] bg-accent-dark/4 rounded-full blur-[100px]" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[18%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full border border-accent-light/[0.06]"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: premiumEase }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[-10%] top-[16%] h-64 w-64 rounded-full border border-cyan/[0.08]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.75, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.45, ease: premiumEase }}
      />

      {/* Decorative horizontal lines */}
      <motion.div
        className="absolute top-[25%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-[75%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
      />

      <div className="section-container relative z-10 pt-24 pb-14 lg:pt-32 lg:pb-18 w-full">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,620px)] gap-12 lg:gap-10 items-center">
          {/* Text content */}
          <div className="max-w-2xl">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-medium bg-bg-card/55 backdrop-blur-sm mb-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_14px_40px_rgba(99,102,241,0.08)] transition-colors duration-300 hover:border-border-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs text-text-secondary font-medium tracking-wide">
                Développeur indépendant · web & IA
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: premiumEase }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-bold tracking-[-0.03em] leading-[1.04] text-balance"
            >
              Des outils qui travaillent
              <br />
              <span className="text-gradient-strong">pour vous</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: premiumEase }}
              className="mt-6 text-base sm:text-lg lg:text-[1.15rem] text-text-secondary leading-[1.85] max-w-2xl text-pretty"
            >
              Je conçois des sites web, des applications et des automatisations
              sur mesure. Vous m&apos;expliquez ce qui vous prend du temps —
              je construis l&apos;outil qui s&apos;en charge.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.36, ease: premiumEase }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button variant="primary" size="lg" href="/contact">
                Premier échange gratuit
                <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-0.5" />
              </Button>
              <Button variant="secondary" size="lg" href="/services">
                Voir ce que je fais
              </Button>
            </motion.div>

            {/* Proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-12 flex flex-wrap items-start gap-x-8 gap-y-4"
            >
              {[
                { label: "Agents intelligents", value: "IA", icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="9" cy="16" r="1" fill="currentColor" />
                    <circle cx="15" cy="16" r="1" fill="currentColor" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                )},
                { label: "Sites & applications", value: "Web", icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                )},
                { label: "Automatisation", value: "Auto", icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )},
              ].map((item, i) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-glow border border-border-subtle flex items-center justify-center transition-colors duration-300 group-hover:border-border-accent group-hover:bg-accent-glow-strong">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-text-primary block leading-tight">{item.value}</span>
                    <span className="text-[11px] text-text-tertiary leading-tight">{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Visual composition — full/reduced desktop (HeroVisual se statifie
              lui-même en reduced) ; minimal : hero texte seul. */}
          {!isMobile && !shouldReduceMotion && tier !== "minimal" && (
            <div className="relative lg:pl-4">
              <HeroVisual />
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
