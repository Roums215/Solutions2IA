"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type PremiumFlowStep = {
  title: string;
  description: string;
  meta?: string;
};

interface PremiumFlowPanelProps {
  label: string;
  title: string;
  description: string;
  steps: PremiumFlowStep[];
  accent?: string;
  className?: string;
}

export function PremiumFlowPanel({
  label,
  title,
  description,
  steps,
  accent = "99, 102, 241",
  className,
}: PremiumFlowPanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-border-subtle bg-bg-card/58 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6 lg:p-8",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full blur-[90px]"
        style={{ background: `rgba(${accent}, 0.16)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full blur-[110px]"
        style={{ background: `rgba(${accent}, 0.11)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[size:28px_28px]"
      />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <span
            className="inline-flex rounded-full border border-border-subtle bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light"
            style={{ boxShadow: `0 0 40px rgba(${accent}, 0.1)` }}
          >
            {label}
          </span>
          <h3 className="mt-5 max-w-2xl text-2xl font-semibold tracking-[-0.03em] text-text-primary sm:text-3xl lg:text-4xl">
            {title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
            {description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.72,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative min-h-[150px] overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/62 p-4 transition-colors duration-500 hover:border-border-accent hover:bg-bg-card/74 sm:p-5"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-5 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(${accent}, 0.75), transparent)`,
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `rgba(${accent}, 0.18)` }}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-white/[0.045] font-mono text-xs font-semibold text-accent-light shadow-lg"
                  style={{ boxShadow: `0 16px 44px rgba(${accent}, 0.08)` }}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  {step.meta && (
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      {step.meta}
                    </p>
                  )}
                  <h4 className="text-base font-semibold tracking-[-0.02em] text-text-primary">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
