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
        "relative rounded-2xl border bg-bg-card p-6 sm:p-8 card-shine",
        accent ? "border-border-accent" : "border-border-subtle",
        hover &&
          "transition-all duration-500 hover:border-border-accent hover:bg-bg-card-hover hover:shadow-xl hover:shadow-accent-glow/5 hover:-translate-y-1",
        className
      )}
    >
      {/* Top edge glow on hover */}
      {hover && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/0 to-transparent transition-all duration-500 group-hover:via-accent-primary/40" />
      )}
      {children}
    </motion.div>
  );
}
