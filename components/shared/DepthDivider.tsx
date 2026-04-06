"use client";

import { motion } from "motion/react";

type DividerPreset = "glow" | "circuit" | "wave" | "neural" | "fade";

interface DepthDividerProps {
  preset?: DividerPreset;
}

export function DepthDivider({ preset = "glow" }: DepthDividerProps) {
  if (preset === "circuit") {
    return (
      <div className="relative h-24 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 96" preserveAspectRatio="none">
          <motion.path
            d="M0 48 L200 48 L230 24 L400 24 L430 48 L600 48 L630 72 L800 72 L830 48 L1000 48 L1030 24 L1200 24"
            stroke="var(--color-cyan)" strokeWidth="1" fill="none" strokeOpacity="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          {/* Pulse traveling the line */}
          <motion.circle r="3" fill="var(--color-cyan)" opacity="0.6">
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath href="#circuitDivPath" />
            </animateMotion>
            <animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite" />
          </motion.circle>
          <path id="circuitDivPath" d="M0 48 L200 48 L230 24 L400 24 L430 48 L600 48 L630 72 L800 72 L830 48 L1000 48 L1030 24 L1200 24" fill="none" />
        </svg>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px glow-line opacity-30" />
      </div>
    );
  }

  if (preset === "wave") {
    return (
      <div className="relative h-20 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <motion.path
            d="M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40"
            stroke="var(--color-accent-primary)" strokeWidth="1" fill="none" strokeOpacity="0.1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d="M0 40 Q150 70 300 40 T600 40 T900 40 T1200 40"
            stroke="var(--color-cyan)" strokeWidth="0.5" fill="none" strokeOpacity="0.08"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </svg>
      </div>
    );
  }

  if (preset === "neural") {
    return (
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-accent-primary/20 to-transparent" />
        <div className="absolute inset-x-0 top-1/2 flex justify-around -translate-y-1/2">
          {Array.from({ length: 7 }, (_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent-light/30"
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (preset === "fade") {
    return (
      <div className="relative h-32">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />
      </div>
    );
  }

  // Default: glow
  return (
    <div className="relative h-px">
      <div className="absolute inset-x-0 top-0 h-px glow-line" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-32 h-32 bg-accent-primary/5 rounded-full blur-[60px]" />
    </div>
  );
}
