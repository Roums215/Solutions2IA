"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export type HeroMobileStep = { label: string; hint?: string };

interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  visual?: React.ReactNode;
  /** Accent color class for the glow (defaults to accent-primary) */
  glowColor?: string;
  /** Mobile-only preview steps (3 items expected). Falls back to Signal/Analyse/Action if omitted. */
  mobileSteps?: HeroMobileStep[];
}

const DEFAULT_MOBILE_STEPS: HeroMobileStep[] = [
  { label: "Signal" },
  { label: "Analyse" },
  { label: "Action" },
];

function MobileHeroPreview({
  label,
  reduceMotion,
  steps,
}: {
  label: string;
  reduceMotion: boolean;
  steps: HeroMobileStep[];
}) {

  return (
    <motion.div
      data-mobile-hero-preview
      className="relative mt-10 overflow-hidden rounded-3xl border border-border-subtle bg-bg-card/70 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:hidden"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.36, ease: premiumEase }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute -right-14 -top-16 h-44 w-44 rounded-full bg-accent-primary/[0.12] blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.48, 0.78, 0.48], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-20 left-8 h-40 w-40 rounded-full bg-cyan/[0.09] blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.36, 0.62, 0.36], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light/85">
            Interface active
          </span>
          <span className="mt-1 block truncate text-sm font-semibold text-text-primary">{label}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/10 px-2.5 py-1 text-[10px] font-medium text-green-300">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-green-300"
            animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          Live
        </div>
      </div>

      <div className="relative mt-5 grid gap-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.035] px-3 py-3"
            animate={reduceMotion ? undefined : { y: [0, -2, 0], opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 4 + index * 0.35, delay: index * 0.22, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-accent-light/20 bg-accent-glow text-[11px] font-bold text-accent-light">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-text-primary">{step.label}</div>
              {step.hint && (
                <div className="mt-0.5 truncate text-[10px] text-text-tertiary">{step.hint}</div>
              )}
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-accent-primary to-cyan"
                  initial={{ scaleX: 0.36 + index * 0.16 }}
                  animate={reduceMotion ? undefined : { scaleX: [0.38 + index * 0.14, 0.7 + index * 0.08, 0.38 + index * 0.14] }}
                  transition={{ duration: 3.8 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function PageHero({
  label,
  title,
  description,
  primaryCta,
  secondaryCta,
  visual,
  glowColor = "bg-accent-primary/5",
  mobileSteps = DEFAULT_MOBILE_STEPS,
}: PageHeroProps) {
  const { isMobile, shouldReduceMotion } = usePerformanceMode();
  const showVisual = !!visual && !isMobile && !shouldReduceMotion;
  const showMobilePreview = !!visual && isMobile;
  const hasVisual = showVisual;

  return (
    <section className={cn("relative flex items-center overflow-hidden", !hasVisual && "min-h-[72vh]")}>
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />
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

      <div className="section-container relative z-10 pt-28 pb-16 lg:pt-36 lg:pb-20 w-full">
        <div className={hasVisual ? "grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,620px)] gap-12 lg:gap-10 items-center" : "max-w-3xl mx-auto text-center"}>
          {/* Text */}
          <div className={hasVisual ? "max-w-2xl" : ""}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border-medium bg-bg-card/55 backdrop-blur-sm mb-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] ${!hasVisual ? "mx-auto" : ""}`}
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
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4rem] font-bold tracking-[-0.03em] leading-[1.04] text-balance"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: premiumEase }}
              className={`mt-6 text-base sm:text-lg lg:text-[1.15rem] text-text-secondary leading-[1.85] max-w-2xl text-pretty ${!hasVisual ? "mx-auto" : ""}`}
            >
              {description}
            </motion.p>

            {showMobilePreview && (
              <MobileHeroPreview
                label={label}
                reduceMotion={shouldReduceMotion}
                steps={mobileSteps}
              />
            )}

            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: premiumEase }}
                className={`mt-9 flex flex-wrap gap-4 ${!hasVisual ? "justify-center" : ""}`}
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
          {showVisual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: premiumEase }}
              className="relative lg:pl-4"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </div>

    </section>
  );
}
