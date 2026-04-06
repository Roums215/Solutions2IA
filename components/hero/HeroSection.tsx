"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-radial-top" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-accent-primary/4 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan/3 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[400px] bg-accent-dark/4 rounded-full blur-[100px]" />

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 lg:pt-36 lg:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Text content */}
          <div className="max-w-2xl">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-subtle bg-bg-card/40 backdrop-blur-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs text-text-secondary font-medium tracking-wide">
                Studio digital & intelligence artificielle
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: premiumEase }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-[-0.02em] leading-[1.06]"
            >
              Des expériences
              <br />
              digitales{" "}
              <span className="text-gradient-strong">intelligentes</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: premiumEase }}
              className="mt-7 text-lg sm:text-xl text-text-secondary leading-[1.7] max-w-xl"
            >
              Sites web premium, applications performantes, agents IA et
              automatisation sur mesure. Nous concevons les solutions digitales qui
              transforment votre activité.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.36, ease: premiumEase }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button variant="primary" size="lg" href="/contact">
                Démarrer un projet
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <Button variant="secondary" size="lg" href="/services">
                Découvrir nos services
              </Button>
            </motion.div>

            {/* Proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-14 flex items-center gap-10"
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
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-glow border border-border-subtle flex items-center justify-center">
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

          {/* Visual composition */}
          <div className="relative">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
    </section>
  );
}
