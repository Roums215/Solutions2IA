"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animation/variants";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: boolean;
}

export function GlowCard({ children, className, hover = true, accent = false }: GlowCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn(
        "surface-card relative rounded-[1.5rem] p-6 sm:p-8 card-shine",
        accent ? "border-border-accent" : "border-border-subtle",
        hover &&
          "transition-all duration-500 hover:border-border-accent hover:bg-bg-card-hover hover:shadow-[0_24px_60px_rgba(11,14,26,0.42)] hover:-translate-y-1",
        className
      )}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/25 to-transparent" />
      {children}
    </motion.div>
  );
}
