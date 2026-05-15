"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

interface SectionHeadingProps {
  label?: string;
  title: React.ReactNode;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        centered ? "mx-auto max-w-4xl text-center mb-12 lg:mb-14" : "max-w-3xl mb-12 lg:mb-14"
      )}
    >
      {label && (
        <motion.span
          variants={fadeInUp}
          className="inline-flex items-center gap-2 rounded-full border border-border-medium bg-white/[0.03] px-4 py-2 text-[11px] font-semibold tracking-[0.24em] uppercase text-accent-light/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] mb-5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-light shadow-[0_0_12px_rgba(129,140,248,0.65)]" />
          {label}
        </motion.span>
      )}
      <motion.h2
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
      <motion.div
        variants={fadeInUp}
        className={cn(
          "mt-8 h-px w-24 bg-gradient-to-r from-transparent via-accent-light/45 to-transparent",
          centered ? "mx-auto" : ""
        )}
      />
    </motion.div>
  );
}
