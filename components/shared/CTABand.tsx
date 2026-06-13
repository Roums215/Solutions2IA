"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

interface CTABandProps {
  title?: React.ReactNode;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

export function CTABand({
  title = <>Donnons vie à votre <span className="text-gradient-strong">prochain projet</span></>,
  description = "Que vous ayez une idée précise ou un besoin à clarifier, discutons-en. Chaque grand projet commence par une conversation.",
  primaryLabel = "Prendre contact",
  primaryHref = "/contact",
}: CTABandProps) {
  return (
    <section className="section-shell">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[150px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px glow-line" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="section-container relative z-10"
      >
        <div className="section-intro-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12 text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-[3.2rem] font-bold tracking-[-0.03em] leading-[1.08] text-balance">
            {title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-6 text-base sm:text-lg text-text-secondary leading-[1.85] max-w-2xl mx-auto text-pretty">
            {description}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href={primaryHref}>
              {primaryLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
            <Button variant="secondary" size="lg" href="/services">
              Voir les services
            </Button>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-text-tertiary">
            <span>Réponse sous 24h</span>
            <span>Premier échange offert</span>
            <span>Sans engagement</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
