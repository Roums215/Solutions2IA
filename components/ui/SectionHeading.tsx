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
   * Conservée pour la compatibilité : depuis octobre 2026, `pill` et `eyebrow` rendent les
   * mêmes petites capitales (plus de capsule ni de point lumineux, plus de filet).
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
        centered ? "mx-auto max-w-4xl text-center mb-10 sm:mb-14 lg:mb-16" : "max-w-3xl mb-10 sm:mb-14 lg:mb-16"
      )}
    >
      {/* Octobre 2026 : la capsule à point lumineux est retirée partout (effet trop « IA »).
          Les deux styles rendent désormais les mêmes petites capitales ; la prop reste pour
          ne casser aucun appel. */}
      {label ? (
        <motion.p
          variants={fadeInUp}
          className={cn(
            "mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-light",
            centered && "text-center"
          )}
        >
          {label}
        </motion.p>
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
            "mt-4 sm:mt-6 text-base sm:text-lg text-text-secondary leading-[1.75] sm:leading-[1.85] text-pretty",
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
