"use client";

import { motion, type Variants } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import {
  HOME_TRANSFORMATIONS,
  HOME_TRANSFORMATIONS_CLOSING,
  type TransformationFlow,
} from "./homeTransformationsData";

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * S4 V7.0 — Transformations en mini-flux (home).
 *
 * 4 mini-schémas « avant → après » empilés. AVANT = 3 nœuds dispersés
 * désaturés. APRÈS = 3 nœuds reliés par flèches cyan fines.
 *
 * Distinction CG B1 : 3 nœuds maximum par état pour éviter de réutiliser
 * les grammaires sites-web (S1 fan-in 9 canaux, S2 flux vertical 9 stations).
 *
 * Motion Option B : pour chaque mini-flux, draw one-shot sur la flèche
 * centrale puis stagger des nœuds APRÈS. Reduced-motion → tout statique.
 */
export function HomeTransformationFlows() {
  const { mounted, shouldReduceMotion } = usePerformanceMode();
  const staticRender = !mounted || shouldReduceMotion;

  const parentProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  const arrowVariants: Variants | undefined = staticRender
    ? undefined
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 0.6, ease: PREMIUM_EASE },
        },
      };

  return (
    <section
      className="section-shell"
      aria-labelledby="home-transformations-heading"
    >
      <div className="section-container">
        <SectionHeading
          label="Ce qui change"
          title={
            <>
              Le système change{" "}
              <span className="text-gradient-strong">votre quotidien</span>.
            </>
          }
          description="Quatre transformations concrètes. Pas de promesse marketing — uniquement ce que vous constatez chaque semaine."
        />

        <motion.div
          className="mx-auto flex max-w-[1080px] flex-col gap-8 sm:gap-10"
          {...parentProps}
        >
          {HOME_TRANSFORMATIONS.map((flow, i) => (
            <TransformationRow
              key={flow.key}
              flow={flow}
              isLast={i === HOME_TRANSFORMATIONS.length - 1}
              itemVariants={itemVariants}
              arrowVariants={arrowVariants}
            />
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          initial={staticRender ? false : "hidden"}
          whileInView={staticRender ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-12 max-w-[640px] text-center text-sm italic text-text-tertiary sm:text-base"
        >
          « {HOME_TRANSFORMATIONS_CLOSING} »
        </motion.p>
      </div>
    </section>
  );
}

// ─── Sub-composants ────────────────────────────────────────────────────────

function TransformationRow({
  flow,
  isLast,
  itemVariants,
  arrowVariants,
}: {
  flow: TransformationFlow;
  isLast: boolean;
  itemVariants: typeof fadeInUp | undefined;
  arrowVariants: Variants | undefined;
}) {
  return (
    <motion.div variants={itemVariants} className="relative">
      {/* Label métier en header */}
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan/70">
        {flow.label}
      </div>

      {/* Layout desktop : 2 colonnes AVANT/APRÈS + flèche centrale */}
      {/* Layout mobile : stack vertical AVANT → APRÈS */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
        {/* AVANT */}
        <BeforeBlock nodes={flow.before.nodes} caption={flow.before.caption} />

        {/* Flèche centrale (desktop horizontale, mobile verticale) */}
        <CenterArrow arrowVariants={arrowVariants} />

        {/* APRÈS */}
        <AfterBlock nodes={flow.after.nodes} caption={flow.after.caption} />
      </div>

      {/* Séparateur entre flux (sauf dernier) */}
      {!isLast && (
        <div
          aria-hidden
          className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-border-subtle to-transparent sm:mt-10"
        />
      )}
    </motion.div>
  );
}

function BeforeBlock({ nodes, caption }: { nodes: string[]; caption: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[9px] font-semibold uppercase tracking-[0.32em] text-text-tertiary/80">
        Avant
      </div>
      {/* 3 nœuds dispersés, en colonne, désaturés, sans connecteurs */}
      <div className="flex flex-wrap gap-2 opacity-60">
        {nodes.map((node) => (
          <span
            key={node}
            className="rounded-md border border-border-subtle bg-bg-card/30 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-text-tertiary line-through decoration-text-tertiary/40"
          >
            {node}
          </span>
        ))}
      </div>
      <p className="text-[13px] leading-relaxed text-text-tertiary">{caption}</p>
    </div>
  );
}

function AfterBlock({ nodes, caption }: { nodes: string[]; caption: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[9px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
        Après
      </div>
      {/* 3 nœuds reliés par flèches inline (text arrows) */}
      <div className="flex flex-wrap items-center gap-1.5">
        {nodes.map((node, i) => (
          <span key={node} className="flex items-center gap-1.5">
            <span className="rounded-md border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan">
              {node}
            </span>
            {i < nodes.length - 1 && (
              <span aria-hidden className="text-cyan/60">
                →
              </span>
            )}
          </span>
        ))}
      </div>
      <p className="text-[13px] leading-relaxed text-text-secondary">{caption}</p>
    </div>
  );
}

function CenterArrow({
  arrowVariants,
}: {
  arrowVariants: Variants | undefined;
}) {
  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center py-2 lg:px-2"
    >
      {/* Desktop : flèche horizontale large */}
      <svg
        width="80"
        height="40"
        viewBox="0 0 80 40"
        className="hidden lg:block"
      >
        <defs>
          <linearGradient id="arrow-grad-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.9" />
          </linearGradient>
          <marker
            id="arrow-head-h"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 1 L9 5 L0 9 z" fill="var(--color-accent-primary)" fillOpacity="0.9" />
          </marker>
        </defs>
        <motion.path
          d="M 4 20 L 68 20"
          fill="none"
          stroke="url(#arrow-grad-h)"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd="url(#arrow-head-h)"
          variants={arrowVariants}
        />
      </svg>

      {/* Mobile : flèche verticale ↓ */}
      <svg width="40" height="48" viewBox="0 0 40 48" className="lg:hidden">
        <defs>
          <linearGradient id="arrow-grad-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.9" />
          </linearGradient>
          <marker
            id="arrow-head-v"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 1 L9 5 L0 9 z" fill="var(--color-accent-primary)" fillOpacity="0.9" />
          </marker>
        </defs>
        <motion.path
          d="M 20 4 L 20 36"
          fill="none"
          stroke="url(#arrow-grad-v)"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd="url(#arrow-head-v)"
          variants={arrowVariants}
        />
      </svg>
    </div>
  );
}
