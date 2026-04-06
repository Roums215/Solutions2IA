"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "motion/react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-primary text-white hover:bg-accent-dark shadow-lg shadow-accent-glow border border-accent-primary/50",
  secondary:
    "bg-transparent text-text-primary border border-border-medium hover:border-accent-primary/50 hover:bg-accent-glow",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 cursor-pointer select-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (href) {
    // External links or mailto
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
      return (
        <motion.a href={href} className={classes} onClick={onClick} {...motionProps}>
          {children}
        </motion.a>
      );
    }
    // Internal routes
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button className={classes} onClick={onClick} disabled={disabled} type={type} {...motionProps}>
      {children}
    </motion.button>
  );
}
