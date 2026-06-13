"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { cn } from "@/lib/utils/cn";
import {
  RAG_SOURCES,
  RAG_QUERY,
  RAG_PASSAGES,
  RAG_SYNTHESIS,
  RAG_CITATION,
  RAG_MEMORY_META,
  relevanceLabel,
  relevanceQuality,
  type RagPassage,
} from "./ragMemoryData";

const TRACE_LOOP_MS = 5500;
const TRACE_ARRIVAL_MS = 2400;
const TRACE_RELEASE_MS = 4300;
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

export function RagMemoryFlow() {
  const { mounted, isMobile, disableContentMotion } = usePerformanceMode();
  const staticRender = !mounted || disableContentMotion || isMobile;

  const [cycle, setCycle] = useState(0);
  const [proofActiveLoop, setProofActiveLoop] = useState(false);
  const proofActive = staticRender ? true : proofActiveLoop;
  const inViewRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const arrivedTimerRef = useRef<number | null>(null);
  const releaseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (staticRender) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { rootMargin: "-10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [staticRender]);

  useEffect(() => {
    if (staticRender) return;
    const clearTimers = () => {
      if (arrivedTimerRef.current) window.clearTimeout(arrivedTimerRef.current);
      if (releaseTimerRef.current) window.clearTimeout(releaseTimerRef.current);
      arrivedTimerRef.current = null;
      releaseTimerRef.current = null;
    };
    const scheduleCycle = () => {
      setProofActiveLoop(false);
      arrivedTimerRef.current = window.setTimeout(() => {
        if (inViewRef.current) setProofActiveLoop(true);
      }, TRACE_ARRIVAL_MS);
      releaseTimerRef.current = window.setTimeout(() => {
        setProofActiveLoop(false);
      }, TRACE_RELEASE_MS);
    };
    scheduleCycle();
    const id = window.setInterval(() => {
      if (!inViewRef.current) return;
      clearTimers();
      setCycle((c) => c + 1);
      scheduleCycle();
    }, TRACE_LOOP_MS);
    return () => {
      window.clearInterval(id);
      clearTimers();
    };
  }, [staticRender]);

  const stationProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Mémoire métier"
          title={
            <>
              Votre savoir interne devient{" "}
              <span className="text-gradient-strong">
                consultable, immédiatement
              </span>
              .
            </>
          }
          description="La connaissance ne dépend plus d'une seule personne — elle vit dans vos documents et reste interrogeable à toute heure."
        />

        <div
          ref={containerRef}
          className="relative mx-auto max-w-[680px]"
          role="img"
          aria-label="Schéma : la mémoire métier retrouve un passage et cite sa source."
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-4 bottom-4 w-3 sm:left-4"
            viewBox="0 0 10 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="rag-trace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-cyan)" />
                <stop offset="55%" stopColor="var(--color-cyan)" />
                <stop offset="100%" stopColor="var(--color-accent-primary)" />
              </linearGradient>
            </defs>

            <path
              d="M5 0 L5 1000"
              fill="none"
              stroke="var(--color-border-subtle)"
              strokeWidth="1.2"
              strokeLinecap="round"
              style={{ vectorEffect: "non-scaling-stroke" }}
            />

            {staticRender ? (
              <path
                d="M5 0 L5 1000"
                fill="none"
                stroke="url(#rag-trace)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ vectorEffect: "non-scaling-stroke" }}
              />
            ) : (
              <motion.path
                key={cycle}
                d="M5 0 L5 1000"
                fill="none"
                stroke="url(#rag-trace)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ vectorEffect: "non-scaling-stroke" }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 1],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: TRACE_LOOP_MS / 1000,
                  times: [
                    0,
                    TRACE_ARRIVAL_MS / TRACE_LOOP_MS,
                    TRACE_RELEASE_MS / TRACE_LOOP_MS,
                    1,
                  ],
                  ease: PREMIUM_EASE,
                }}
              />
            )}
          </svg>

          <motion.div
            className="relative flex flex-col gap-10 pl-10 pr-2 sm:gap-12 sm:pl-12"
            {...stationProps}
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 sm:gap-2.5"
            >
              {RAG_SOURCES.map((s) => (
                <SourceChip
                  key={s.name}
                  name={s.name}
                  status={s.status}
                  isProof={!!s.isProof}
                  proofActive={proofActive}
                />
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <motion.div
                className="relative inline-flex flex-col items-center rounded-2xl border border-cyan/40 bg-gradient-to-b from-cyan/[0.10] to-accent-primary/[0.10] px-7 py-5 shadow-[0_0_56px_var(--color-cyan-glow)]"
                animate={
                  staticRender ? undefined : { scale: [1, 1.04, 1] }
                }
                transition={
                  staticRender
                    ? undefined
                    : {
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan">
                  Mémoire métier
                </span>
                <span className="mt-1.5 text-lg font-semibold text-text-primary sm:text-xl">
                  {RAG_MEMORY_META.passagesLabel}
                </span>
                <span className="mt-2 text-xs text-text-tertiary">
                  {RAG_MEMORY_META.sourcesLabel}
                </span>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                Recherche
              </div>
              <div className="inline-flex max-w-full items-start gap-3 rounded-2xl border border-border-subtle bg-bg-card/70 px-4 py-3 sm:max-w-[460px]">
                <svg
                  aria-hidden
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-text-tertiary"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <span className="text-sm leading-snug text-text-secondary">
                  « {RAG_QUERY} »
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                Passages retrouvés
              </div>
              <div className="space-y-2.5">
                {RAG_PASSAGES.map((p) => (
                  <PassageCard
                    key={p.doc}
                    passage={p}
                    proofActive={proofActive}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan/80">
                Extrait de votre mémoire métier
              </div>
              <div className="rounded-2xl border border-cyan/40 bg-bg-card/80 p-5 shadow-[0_0_36px_var(--color-cyan-glow)]">
                <p className="text-base leading-relaxed text-text-primary">
                  {RAG_SYNTHESIS}
                </p>
                <div className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-cyan/40 bg-bg-card px-3 py-1.5 text-[11px] sm:text-xs">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-cyan"
                  />
                  <span className="text-text-tertiary">Source :</span>
                  <span className="font-medium text-text-primary">
                    {RAG_CITATION.file}
                  </span>
                  <span className="text-text-tertiary">
                    — page {RAG_CITATION.page}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SourceChip({
  name,
  status,
  isProof,
  proofActive,
}: {
  name: string;
  status: string;
  isProof: boolean;
  proofActive: boolean;
}) {
  const amplified = isProof && proofActive;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-shadow duration-500 sm:text-[13px]",
        isProof
          ? "border-cyan/40 bg-bg-card/80 text-text-primary"
          : "border-border-subtle bg-bg-card/60 text-text-secondary",
        amplified
          ? "shadow-[0_0_28px_var(--color-cyan-glow)]"
          : isProof
            ? "shadow-[0_0_14px_var(--color-cyan-glow)]"
            : "",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isProof ? "bg-cyan" : "bg-text-tertiary/60",
        )}
      />
      <span>{name}</span>
      <span
        className={cn(
          "text-[11px] font-normal",
          isProof ? "text-cyan/85" : "text-text-tertiary",
        )}
      >
        · {status}
      </span>
    </span>
  );
}

function PassageCard({
  passage,
  proofActive,
}: {
  passage: RagPassage;
  proofActive: boolean;
}) {
  const isMatch = !!passage.isMatch;
  const amplified = isMatch && proofActive;
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 transition-shadow duration-500",
        isMatch
          ? "border-cyan/40 bg-bg-card"
          : "border-border-subtle bg-bg-card/60",
        amplified
          ? "shadow-[0_0_24px_var(--color-cyan-glow)]"
          : isMatch
            ? "shadow-[0_0_12px_var(--color-cyan-glow)]"
            : "",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.18em]",
            isMatch ? "text-cyan" : "text-text-tertiary",
          )}
        >
          {relevanceLabel(passage.relevance)}
        </span>
        <span
          className={cn(
            "text-[10px] font-medium uppercase tracking-[0.16em]",
            isMatch ? "text-cyan/85" : "text-text-tertiary",
          )}
        >
          {relevanceQuality(passage.relevance)}
        </span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-sm">
        <span className="font-medium text-text-primary">{passage.doc}</span>
        <span className="text-xs text-text-tertiary">— {passage.section}</span>
      </div>
      <p className="mt-1.5 text-xs leading-snug text-text-secondary sm:text-[13px]">
        {passage.excerpt}
      </p>
    </div>
  );
}
