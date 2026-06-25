"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

export function CTASection() {
  return (
    <section id="contact" className="relative py-28 lg:py-36 bg-bg-secondary overflow-hidden">
      {/* Layered glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/5 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan/4 rounded-full blur-[100px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px glow-line" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <motion.span
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-bg-card/40 backdrop-blur-sm text-xs font-semibold tracking-[0.15em] uppercase text-accent-light mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-light">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Prêt à démarrer ?
        </motion.span>

        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-[-0.02em] leading-[1.1]"
        >
          Donnons vie à votre{" "}
          <span className="text-gradient-strong">prochain projet</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl mx-auto"
        >
          Que vous ayez une idée précise ou un besoin à clarifier, discutons-en.
          Chaque grand projet commence par une conversation.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button variant="primary" size="lg" href="mailto:contact@solutions2ia.fr">
            Prendre contact
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
          <Button variant="secondary" size="lg" href="#services">
            Revoir les services
          </Button>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-text-tertiary"
        >
          {[
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>, text: "Réponse sous 24h" },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>, text: "Premier échange offert" },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 6 9 17 4 12" /></svg>, text: "Sans engagement" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <span className="text-accent-light/50">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
