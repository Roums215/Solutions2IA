"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

interface SectionHeadingProps {
  label?: string;
  title: string;
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
      className={centered ? "text-center max-w-3xl mx-auto mb-16" : "mb-16"}
    >
      {label && (
        <motion.span
          variants={fadeInUp}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-light mb-4"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        variants={fadeInUp}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeInUp}
          className="mt-5 text-lg text-text-secondary leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
