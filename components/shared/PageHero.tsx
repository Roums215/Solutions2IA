"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

const premiumEase = [0.16, 1, 0.3, 1] as const;

interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  visual?: React.ReactNode;
  /** Accent color class for the glow (defaults to accent-primary) */
  glowColor?: string;
}

export function PageHero({
  label,
  title,
  description,
  primaryCta,
  secondaryCta,
  visual,
  glowColor = "bg-accent-primary/5",
}: PageHeroProps) {
  const hasVisual = !!visual;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />
      <div className="absolute inset-0 bg-radial-top" />
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] ${glowColor} rounded-full blur-[150px]`} />

      {/* Perspective floor for depth */}
      <div className="perspective-floor opacity-40" />

      {/* Decorative lines */}
      <motion.div
        className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle/60 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      />
      <motion.div
        className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/[0.06] to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-28 w-full">
        <div className={hasVisual ? "grid lg:grid-cols-2 gap-16 lg:gap-12 items-center" : "max-w-3xl mx-auto text-center"}>
          {/* Text */}
          <div className={hasVisual ? "max-w-2xl" : ""}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-subtle bg-bg-card/40 backdrop-blur-sm mb-8 ${!hasVisual ? "mx-auto" : ""}`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-light opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-light" />
              </span>
              <span className="text-xs text-text-secondary font-medium tracking-wide">{label}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: premiumEase }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-[-0.02em] leading-[1.06]"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
              className={`mt-7 text-lg sm:text-xl text-text-secondary leading-[1.7] max-w-xl ${!hasVisual ? "mx-auto" : ""}`}
            >
              {description}
            </motion.p>

            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
                className={`mt-10 flex flex-wrap gap-4 ${!hasVisual ? "justify-center" : ""}`}
              >
                {primaryCta && (
                  <Button variant="primary" size="lg" href={primaryCta.href}>
                    {primaryCta.label}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Button>
                )}
                {secondaryCta && (
                  <Button variant="secondary" size="lg" href={secondaryCta.href}>
                    {secondaryCta.label}
                  </Button>
                )}
              </motion.div>
            )}
          </div>

          {/* Visual */}
          {visual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: premiumEase }}
              className="relative"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
