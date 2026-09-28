"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

interface SectionHeadingProps {
  label?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  centered?: boolean;
  /** Posé sur le h2, pour un `aria-labelledby` depuis la section parente. */
  id?: string;
  /**
   * `pill` (défaut, autres pages) : la capsule historique.
   * `eyebrow` : petites capitales et filet, sans capsule ni point (accueil, LOT 4F).
   */
  labelStyle?: "pill" | "eyebrow";
}

export function SectionHeading({
  label,
  title,
  description,
  centered = true,
  id,
  labelStyle = "pill",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        centered ? "mx-auto max-w-4xl text-center mb-14 lg:mb-16" : "max-w-3xl mb-14 lg:mb-16"
      )}
    >
      {label && labelStyle === "eyebrow" ? (
        // LOT 4G : plus de filet décoratif avant l'intitulé. Petites capitales,
        // espacement généreux, encre de marque : le texte se suffit.
        <motion.p
          variants={fadeInUp}
          className={cn(
            "mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-light",
            centered && "text-center"
          )}
        >
          {label}
        </motion.p>
      ) : label ? (
        <motion.span
          variants={fadeInUp}
          className="inline-flex items-center gap-2 rounded-full border border-border-medium bg-white/[0.03] px-4 py-2 text-[11px] font-semibold tracking-[0.24em] uppercase text-accent-light/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] mb-5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-light shadow-[0_0_12px_rgba(129,140,248,0.65)]" />
          {label}
        </motion.span>
      ) : null}
      <motion.h2
        id={id}
        variants={fadeInUp}
        className="text-3xl sm:text-4xl lg:text-[3.1rem] font-bold tracking-[-0.03em] leading-[1.08] text-balance"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            "mt-6 text-base sm:text-lg text-text-secondary leading-[1.85] text-pretty",
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </motion.p>
      )}
      {/* Le filet de clôture reste sur les pages en capsule ; l'accueil (eyebrow)
          s'en passe : c'est une barre décorative de plus (LOT 4G). */}
      {labelStyle !== "eyebrow" && (
        <motion.div
          variants={fadeInUp}
          className={cn(
            "mt-8 h-px w-24 bg-gradient-to-r from-transparent via-accent-light/45 to-transparent",
            centered ? "mx-auto" : ""
          )}
        />
      )}
    </motion.div>
  );
}
