"use client";

import { motion, type Variants } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import {
  HOME_TRANSFORMATIONS,
  HOME_TRANSFORMATIONS_CLOSING,
  type TransformationFlow,
  type TransformationNode,
} from "./homeTransformationsData";

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Transformations en mini-flux (home).
 *
 * 4 cartes « verre » (.glass-card : fond très transparent, reflet, deux
 * lumières lentes derrière la vitre, animées en transform uniquement).
 * Chaque carte = AVANT (3 étapes dispersées, désaturées) → APRÈS (3 étapes
 * reliées, cyan). Chaque étape porte une petite icône lucide.
 *
 * Motion : draw one-shot de la flèche centrale puis stagger des étapes APRÈS.
 * Reduced-motion / tier minimal → tout statique (les lumières sont retirées
 * par globals.css).
 */
export function HomeTransformationFlows() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const staticRender = !mounted || disableContentMotion;

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

  const nodeVariants: Variants | undefined = staticRender
    ? undefined
    : {
        hidden: { opacity: 0, y: 6 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: PREMIUM_EASE } },
      };

  return (
    <section
      className="section-shell"
      aria-labelledby="home-transformations-heading"
    >
      <div className="section-container">
        <SectionHeading
          id="home-transformations-heading"
          label="Ce qui change"
          title={
            <>
              Le système change{" "}
              <span className="text-gradient-strong">votre quotidien</span>.
            </>
          }
          description="Quatre transformations concrètes. Pas de promesse marketing : uniquement ce que vous constatez chaque semaine."
        />

        <motion.div
          className="mx-auto flex max-w-[1080px] flex-col gap-6 sm:gap-8"
          {...parentProps}
        >
          {HOME_TRANSFORMATIONS.map((flow, i) => (
            <TransformationCard
              key={flow.key}
              flow={flow}
              index={i}
              itemVariants={itemVariants}
              arrowVariants={arrowVariants}
              nodeVariants={nodeVariants}
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

function TransformationCard({
  flow,
  index,
  itemVariants,
  arrowVariants,
  nodeVariants,
}: {
  flow: TransformationFlow;
  index: number;
  itemVariants: typeof fadeInUp | undefined;
  arrowVariants: Variants | undefined;
  nodeVariants: Variants | undefined;
}) {
  // Chaque carte décale ses lumières pour que les 4 ne respirent pas en phase.
  const delay = `${-index * 5}s`;

  return (
    <motion.article
      variants={itemVariants}
      className="glass-card rounded-2xl px-5 py-6 sm:px-7 sm:py-7 lg:px-8"
    >
      {/* Lumières lentes derrière la vitre */}
      <div
        aria-hidden
        className="glass-light glass-light-cyan -left-20 -top-28 h-72 w-72 lg:-left-24 lg:-top-40 lg:h-[26rem] lg:w-[26rem]"
        style={{ animationDelay: delay }}
      />
      <div
        aria-hidden
        className="glass-light glass-light-indigo -bottom-32 -right-12 h-80 w-80 lg:-bottom-48 lg:right-[12%] lg:h-[28rem] lg:w-[28rem]"
        style={{ animationDelay: delay }}
      />

      <div className="relative z-10">
        {/* En-tête : numéro + label métier */}
        <div className="mb-5 flex items-center gap-3">
          <span className="font-mono text-[11px] text-text-tertiary">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px w-6 bg-border-medium" aria-hidden />
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
            {flow.label}
          </h3>
        </div>

        {/* Desktop : AVANT | flèche | APRÈS · Mobile : empilé */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
          <BeforeBlock nodes={flow.before.nodes} caption={flow.before.caption} />
          <CenterArrow arrowVariants={arrowVariants} index={index} />
          <AfterBlock
            nodes={flow.after.nodes}
            caption={flow.after.caption}
            nodeVariants={nodeVariants}
          />
        </div>
      </div>
    </motion.article>
  );
}

function BeforeBlock({ nodes, caption }: { nodes: TransformationNode[]; caption: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[9px] font-semibold uppercase tracking-[0.32em] text-text-tertiary/80">
        Avant
      </div>
      {/* 3 étapes dispersées, désaturées, sans connecteurs */}
      <ul className="flex flex-wrap gap-2 opacity-70" aria-label="Avant">
        {nodes.map(({ label, icon: Icon }) => (
          <li
            key={label}
            className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-bg-card/30 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-text-tertiary"
          >
            <Icon size={13} strokeWidth={1.75} aria-hidden className="shrink-0 opacity-70" />
            <span className="line-through decoration-text-tertiary/40">{label}</span>
          </li>
        ))}
      </ul>
      <p className="text-[13px] leading-relaxed text-text-tertiary">{caption}</p>
    </div>
  );
}

function AfterBlock({
  nodes,
  caption,
  nodeVariants,
}: {
  nodes: TransformationNode[];
  caption: string;
  nodeVariants: Variants | undefined;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[9px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
        Après
      </div>
      {/* 3 étapes reliées par des flèches */}
      <ul className="flex flex-wrap items-center gap-1.5" aria-label="Après">
        {nodes.map(({ label, icon: Icon }, i) => (
          <motion.li key={label} variants={nodeVariants} className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan/30 bg-cyan/10 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-sm bg-cyan/15">
                <Icon size={13} strokeWidth={2} aria-hidden />
              </span>
              {label}
            </span>
            {i < nodes.length - 1 && (
              <span aria-hidden className="text-cyan/60">
                →
              </span>
            )}
          </motion.li>
        ))}
      </ul>
      <p className="text-[13px] leading-relaxed text-text-secondary">{caption}</p>
    </div>
  );
}

function CenterArrow({
  arrowVariants,
  index,
}: {
  arrowVariants: Variants | undefined;
  index: number;
}) {
  // ids SVG uniques par carte (4 cartes sur la page)
  const gradH = `tf-arrow-grad-h-${index}`;
  const headH = `tf-arrow-head-h-${index}`;
  const gradV = `tf-arrow-grad-v-${index}`;
  const headV = `tf-arrow-head-v-${index}`;

  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center py-1 lg:px-2"
    >
      {/* Desktop : flèche horizontale */}
      <svg width="80" height="40" viewBox="0 0 80 40" className="hidden lg:block">
        <defs>
          <linearGradient id={gradH} gradientUnits="userSpaceOnUse" x1="4" y1="20" x2="68" y2="20">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.9" />
          </linearGradient>
          <marker
            id={headH}
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
          stroke={`url(#${gradH})`}
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd={`url(#${headH})`}
          variants={arrowVariants}
        />
      </svg>

      {/* Mobile : flèche verticale */}
      <svg width="40" height="44" viewBox="0 0 40 44" className="lg:hidden">
        <defs>
          <linearGradient id={gradV} gradientUnits="userSpaceOnUse" x1="20" y1="4" x2="20" y2="34">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.9" />
          </linearGradient>
          <marker
            id={headV}
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
          d="M 20 4 L 20 34"
          fill="none"
          stroke={`url(#${gradV})`}
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd={`url(#${headV})`}
          variants={arrowVariants}
        />
      </svg>
    </div>
  );
}
