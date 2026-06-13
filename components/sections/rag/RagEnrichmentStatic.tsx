"use client";

import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

type EnrichStep = {
  n: number;
  label: string;
  detail: string;
};

const ENRICH_STEPS: EnrichStep[] = [
  {
    n: 1,
    label: "Détection",
    detail:
      "Un document nouveau ou modifié est repéré dans une source connectée (Drive, SharePoint, Notion, CRM).",
  },
  {
    n: 2,
    label: "Vérification droits",
    detail:
      "La mémoire respecte les permissions existantes — qui peut le voir aujourd'hui pourra l'interroger demain.",
  },
  {
    n: 3,
    label: "Intégration",
    detail:
      "Le contenu devient interrogeable en quelques minutes. Les anciennes versions restent traçables et consultables.",
  },
  {
    n: 4,
    label: "Notification",
    detail:
      "Les équipes concernées sont notifiées uniquement si le changement impacte une procédure clé.",
  },
];

const STROKE = "var(--color-border-subtle)";
const CYAN = "var(--color-cyan)";

export function RagEnrichmentStatic() {
  const { mounted, isMobile, disableContentMotion } = usePerformanceMode();
  const staticRender = !mounted || disableContentMotion || isMobile;

  const parentProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  // Position (angle) of the 4 nodes around the central memory
  const nodePositions = [
    { x: 50, y: 18 }, // top
    { x: 82, y: 50 }, // right
    { x: 50, y: 82 }, // bottom
    { x: 18, y: 50 }, // left
  ];

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Enrichissement autonome"
          title={
            <>
              Comment elle se met à jour,{" "}
              <span className="text-gradient-strong">toute seule</span>.
            </>
          }
          description="Quand un document change ou qu'un nouveau est ajouté, la mémoire suit — sans intervention. Le schéma est statique : on ne vous vend pas une animation, on vous montre une logique."
        />

        <motion.div
          className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:items-center"
          {...parentProps}
        >
          <motion.div
            variants={itemVariants}
            className="relative mx-auto w-full max-w-[460px] aspect-square"
            aria-hidden
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <radialGradient id="rag-enrich-mem" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={CYAN} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={CYAN} stopOpacity="0.04" />
                </radialGradient>
              </defs>

              {/* Orbit ring (static) */}
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke={STROKE}
                strokeWidth="0.5"
                strokeDasharray="2 2"
                opacity="0.7"
              />

              {/* Center memory */}
              <circle
                cx="50"
                cy="50"
                r="14"
                fill="url(#rag-enrich-mem)"
                stroke={CYAN}
                strokeWidth="1"
              />
              <text
                x="50"
                y="48"
                textAnchor="middle"
                fill="var(--color-text-primary)"
                fontSize="4.5"
                fontWeight="600"
                fontFamily="Inter, system-ui, sans-serif"
              >
                Mémoire
              </text>
              <text
                x="50"
                y="55"
                textAnchor="middle"
                fill="var(--color-text-tertiary)"
                fontSize="3.5"
                fontFamily="Inter, system-ui, sans-serif"
              >
                métier
              </text>

              {/* 4 nodes around */}
              {nodePositions.map((p, i) => (
                <g key={i}>
                  {/* connector line */}
                  <line
                    x1={p.x}
                    y1={p.y}
                    x2={50 + (50 - p.x) * 0.32}
                    y2={50 + (50 - p.y) * 0.32}
                    stroke={STROKE}
                    strokeWidth="0.5"
                  />
                  {/* node circle */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="6"
                    fill="var(--color-bg-card)"
                    stroke={CYAN}
                    strokeWidth="0.8"
                  />
                  <text
                    x={p.x}
                    y={p.y + 1.5}
                    textAnchor="middle"
                    fill={CYAN}
                    fontSize="4.5"
                    fontWeight="700"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {i + 1}
                  </text>
                </g>
              ))}

              {/* Direction arrows (static, indicating cycle) */}
              {[
                { x: 70, y: 25, rot: 45 },
                { x: 75, y: 70, rot: 135 },
                { x: 30, y: 75, rot: -135 },
                { x: 25, y: 30, rot: -45 },
              ].map((a, i) => (
                <g key={i} transform={`translate(${a.x} ${a.y}) rotate(${a.rot})`}>
                  <path
                    d="M -2 -1 L 0 0 L -2 1"
                    fill="none"
                    stroke={CYAN}
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.6"
                  />
                </g>
              ))}
            </svg>
          </motion.div>

          <motion.ol
            variants={itemVariants}
            className="space-y-3"
            aria-label="Quatre étapes de l'enrichissement autonome"
          >
            {ENRICH_STEPS.map((s) => (
              <motion.li
                key={s.n}
                variants={itemVariants}
                className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-card/55 px-4 py-3"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyan/40 bg-bg-card text-[12px] font-bold text-cyan"
                >
                  {s.n}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-snug text-text-primary sm:text-[15px]">
                    {s.label}
                  </div>
                  <p className="mt-1 text-xs leading-snug text-text-secondary sm:text-[13px]">
                    {s.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-text-tertiary sm:text-sm">
          La mémoire ne s&apos;entraîne pas : elle est branchée sur vos documents.
          Ils changent, elle suit.
        </p>
      </div>
    </section>
  );
}
