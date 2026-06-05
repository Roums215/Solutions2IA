"use client";

import type { RagUsageKey } from "./ragUsagesData";

const STROKE = "var(--color-border-subtle)";
const STROKE_MED = "var(--color-border-medium)";
const CYAN = "var(--color-cyan)";
const ACCENT = "var(--color-accent-primary)";
const ACCENT_LIGHT = "var(--color-accent-light)";

interface RagUsageSchemaProps {
  usageKey: RagUsageKey;
}

/**
 * Grammaire visuelle UNIFIÉE des 4 usages :
 *   Sources (gauche) → Mémoire métier (centre) → Réponse sourcée (droite)
 *   + chip « Source vérifiée ✓ » en bas, lignes fines cyan→accent avec flèches
 *     directionnelles reliant chaque étage.
 * Les variantes injectent des éléments (3 Q/R empilées, fan-in 4 sources, sync arrows…)
 * sans casser cette grammaire. 100 % statique.
 */
export function RagUsageSchema({ usageKey }: RagUsageSchemaProps) {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 480 280"
        className="h-auto w-full"
        role="img"
        aria-label={`Schéma d'usage : ${usageKey}`}
      >
        <SvgDefs usageKey={usageKey} />

        {/* Variante : sources + connecteurs + réponse */}
        {usageKey === "simple" && <VariantSimple />}
        {usageKey === "conversationnel" && <VariantConversationnel />}
        {usageKey === "multi-source" && <VariantMultiSource />}
        {usageKey === "auto-enrichi" && <VariantAutoEnrichi />}

        {/* Mémoire centrale rendue après les connecteurs pour passer devant */}
        <MemoryNode usageKey={usageKey} />

        {/* Chip "Source vérifiée ✓" (toujours, bas centré) */}
        <VerifiedSourceChip />
      </svg>
    </div>
  );
}

// ─── Defs partagées (gradients + arrowhead marker) ─────────────────────────

function SvgDefs({ usageKey }: { usageKey: RagUsageKey }) {
  return (
    <defs>
      <linearGradient
        id={`rag-line-${usageKey}`}
        x1="0"
        y1="0"
        x2="1"
        y2="0"
      >
        <stop offset="0%" stopColor={CYAN} stopOpacity="0.85" />
        <stop offset="55%" stopColor={ACCENT_LIGHT} stopOpacity="0.95" />
        <stop offset="100%" stopColor={ACCENT} stopOpacity="0.85" />
      </linearGradient>
      <linearGradient
        id={`rag-mem-${usageKey}`}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop offset="0%" stopColor={CYAN} stopOpacity="0.22" />
        <stop offset="100%" stopColor={ACCENT} stopOpacity="0.10" />
      </linearGradient>
      <radialGradient id={`rag-mem-halo-${usageKey}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={CYAN} stopOpacity="0.18" />
        <stop offset="100%" stopColor={CYAN} stopOpacity="0" />
      </radialGradient>

      <marker
        id={`rag-arrow-${usageKey}`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0 1 L9 5 L0 9 z" fill={CYAN} fillOpacity="0.85" />
      </marker>
    </defs>
  );
}

// ─── Blocs partagés ────────────────────────────────────────────────────────

function MemoryNode({ usageKey }: { usageKey: RagUsageKey }) {
  return (
    <g>
      {/* halo subtil */}
      <circle
        cx="245"
        cy="115"
        r="60"
        fill={`url(#rag-mem-halo-${usageKey})`}
      />
      {/* corps */}
      <rect
        x="200"
        y="80"
        width="92"
        height="70"
        rx="14"
        fill={`url(#rag-mem-${usageKey})`}
        stroke={CYAN}
        strokeWidth="1.3"
      />
      {/* petites attaches sur les côtés (notches) */}
      <circle cx="200" cy="115" r="2.6" fill={CYAN} />
      <circle cx="292" cy="115" r="2.6" fill={CYAN} />

      <text
        x="246"
        y="108"
        textAnchor="middle"
        fill="var(--color-text-primary)"
        fontSize="11"
        fontWeight="700"
        fontFamily="Inter, system-ui, sans-serif"
      >
        Mémoire
      </text>
      <text
        x="246"
        y="123"
        textAnchor="middle"
        fill="var(--color-text-secondary)"
        fontSize="9.5"
        fontFamily="Inter, system-ui, sans-serif"
      >
        métier
      </text>
      {/* pulse fixe au centre */}
      <circle cx="246" cy="138" r="2.2" fill={CYAN} />
    </g>
  );
}

function VerifiedSourceChip() {
  return (
    <g transform="translate(170 234)">
      <rect
        x="0"
        y="0"
        width="140"
        height="26"
        rx="13"
        fill="var(--color-bg-card)"
        stroke={CYAN}
        strokeWidth="0.9"
      />
      <circle cx="13" cy="13" r="2.6" fill={CYAN} />
      <text
        x="22"
        y="17"
        fill="var(--color-text-secondary)"
        fontSize="9.5"
        fontFamily="Inter, system-ui, sans-serif"
      >
        Source vérifiée
      </text>
      <g transform="translate(110 6)">
        <circle cx="7" cy="7" r="7" fill={CYAN} fillOpacity="0.18" />
        <path
          d="M4 7.2 L6 9.2 L10 5"
          fill="none"
          stroke={CYAN}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

function LabelAbove({
  x,
  y,
  text,
  fill = "var(--color-text-tertiary)",
}: {
  x: number;
  y: number;
  text: string;
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={fill}
      fontSize="8.5"
      fontWeight="700"
      letterSpacing="1.4"
      fontFamily="Inter, system-ui, sans-serif"
    >
      {text.toUpperCase()}
    </text>
  );
}

function FlowDots({
  x1,
  y1,
  x2,
  y2,
  count = 3,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  count?: number;
}) {
  // 3 petits points qui matérialisent le flux le long d'un segment
  const dots = [];
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 1);
    const cx = x1 + (x2 - x1) * t;
    const cy = y1 + (y2 - y1) * t;
    dots.push(
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r="1.4"
        fill={CYAN}
        fillOpacity={0.55 + 0.15 * i}
      />,
    );
  }
  return <g>{dots}</g>;
}

function DocBox({
  x,
  y,
  w = 92,
  h = 60,
  primary,
  label,
  sub,
  iconType = "doc",
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  primary?: boolean;
  label: string;
  sub?: string;
  iconType?: "doc" | "question" | "response";
}) {
  const stroke = primary ? CYAN : STROKE_MED;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="11"
        fill="var(--color-bg-card)"
        stroke={stroke}
        strokeWidth={primary ? "1.2" : "0.9"}
      />
      {/* icon */}
      <g transform={`translate(${x + 10} ${y + 10})`}>
        {iconType === "doc" && (
          <g>
            <rect
              x="0"
              y="0"
              width="14"
              height="18"
              rx="2"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
            />
            <line x1="3" y1="5" x2="11" y2="5" stroke={stroke} strokeWidth="0.9" />
            <line x1="3" y1="9" x2="11" y2="9" stroke={stroke} strokeWidth="0.9" />
            <line x1="3" y1="13" x2="8" y2="13" stroke={stroke} strokeWidth="0.9" />
          </g>
        )}
        {iconType === "question" && (
          <g>
            <circle cx="9" cy="9" r="8" fill="none" stroke={stroke} strokeWidth="1" />
            <text
              x="9"
              y="13"
              textAnchor="middle"
              fill={stroke}
              fontSize="11"
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
            >
              ?
            </text>
          </g>
        )}
        {iconType === "response" && (
          <g>
            <path
              d="M2 4 H14 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 H6 l-3 3 V4 z"
              fill="none"
              stroke={stroke}
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <circle cx="6" cy="9" r="1" fill={stroke} />
            <circle cx="9" cy="9" r="1" fill={stroke} />
            <circle cx="12" cy="9" r="1" fill={stroke} />
          </g>
        )}
      </g>
      <text
        x={x + w / 2 + 8}
        y={y + (sub ? 22 : h / 2 + 4)}
        textAnchor="middle"
        fill="var(--color-text-primary)"
        fontSize="10.5"
        fontWeight="600"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2 + 8}
          y={y + 38}
          textAnchor="middle"
          fill="var(--color-text-tertiary)"
          fontSize="8.5"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

// ─── Variantes ─────────────────────────────────────────────────────────────

function VariantSimple() {
  const usageKey: RagUsageKey = "simple";
  return (
    <g>
      <LabelAbove x={56} y={70} text="Source" fill={CYAN} />
      <DocBox x={10} y={85} w={92} h={60} label="Procédure" sub="connectée" primary />

      {/* connecteur gauche : Source → Mémoire */}
      <line
        x1="102"
        y1="115"
        x2="200"
        y2="115"
        stroke={`url(#rag-line-${usageKey})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        markerEnd={`url(#rag-arrow-${usageKey})`}
      />
      <FlowDots x1={108} y1={115} x2={196} y2={115} />

      <LabelAbove x={424} y={70} text="Réponse" fill={CYAN} />
      <DocBox
        x={378}
        y={85}
        w={92}
        h={60}
        label="Synthèse"
        sub="sourcée"
        iconType="response"
        primary
      />

      {/* connecteur droit : Mémoire → Réponse */}
      <line
        x1="292"
        y1="115"
        x2="378"
        y2="115"
        stroke={`url(#rag-line-${usageKey})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        markerEnd={`url(#rag-arrow-${usageKey})`}
      />
      <FlowDots x1={298} y1={115} x2={374} y2={115} />

      {/* citation chip relié à la réponse */}
      <line
        x1="424"
        y1="145"
        x2="424"
        y2="180"
        stroke={CYAN}
        strokeWidth="0.8"
        strokeDasharray="2 2"
        opacity="0.6"
      />
      <g transform="translate(366 180)">
        <rect
          x="0"
          y="0"
          width="116"
          height="22"
          rx="11"
          fill="var(--color-bg-card)"
          stroke={CYAN}
          strokeWidth="0.8"
        />
        <circle cx="11" cy="11" r="2" fill={CYAN} />
        <text
          x="20"
          y="15"
          fill="var(--color-text-secondary)"
          fontSize="8.5"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Source : doc — page N
        </text>
      </g>
    </g>
  );
}

function VariantConversationnel() {
  const usageKey: RagUsageKey = "conversationnel";
  return (
    <g>
      <LabelAbove x={56} y={70} text="Source" fill={CYAN} />
      <DocBox x={10} y={85} w={92} h={60} label="Dossier" sub="connecté" primary />

      {/* connecteur gauche : Source → Mémoire */}
      <line
        x1="102"
        y1="115"
        x2="200"
        y2="115"
        stroke={`url(#rag-line-${usageKey})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        markerEnd={`url(#rag-arrow-${usageKey})`}
      />
      <FlowDots x1={108} y1={115} x2={196} y2={115} />

      {/* 3 réponses empilées à droite avec un fil de contexte */}
      <LabelAbove x={424} y={36} text="Échange" fill={CYAN} />
      {[42, 95, 148].map((y, i) => {
        const isMain = i === 0;
        return (
          <g key={i}>
            <rect
              x={378}
              y={y}
              width={92}
              height={40}
              rx={9}
              fill="var(--color-bg-card)"
              stroke={isMain ? CYAN : STROKE_MED}
              strokeWidth={isMain ? "1.1" : "0.8"}
            />
            <text
              x={424}
              y={y + 15}
              textAnchor="middle"
              fill="var(--color-text-primary)"
              fontSize="9"
              fontWeight="700"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Question {i + 1}
            </text>
            <text
              x={424}
              y={y + 28}
              textAnchor="middle"
              fill="var(--color-text-tertiary)"
              fontSize="7.5"
              fontFamily="Inter, system-ui, sans-serif"
            >
              réponse sourcée
            </text>
          </g>
        );
      })}

      {/* fil retenu : ligne pointillée verticale reliant les 3 questions */}
      <line
        x1="365"
        y1="62"
        x2="365"
        y2="188"
        stroke={ACCENT_LIGHT}
        strokeWidth="0.9"
        strokeDasharray="2 3"
        opacity="0.75"
      />
      <text
        x="355"
        y="120"
        textAnchor="middle"
        fill={ACCENT_LIGHT}
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="1.2"
        fontFamily="Inter, system-ui, sans-serif"
        transform="rotate(-90 355 120)"
      >
        FIL RETENU
      </text>

      {/* connecteur Mémoire → Question 1 (la principale) */}
      <line
        x1="292"
        y1="115"
        x2="378"
        y2="62"
        stroke={`url(#rag-line-${usageKey})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        markerEnd={`url(#rag-arrow-${usageKey})`}
      />
      <FlowDots x1={300} y1={108} x2={368} y2={70} count={2} />
    </g>
  );
}

function VariantMultiSource() {
  const usageKey: RagUsageKey = "multi-source";
  const sources = [
    { label: "Drive", y: 38 },
    { label: "Notion", y: 80 },
    { label: "CRM", y: 122 },
    { label: "SQL", y: 164 },
  ];
  return (
    <g>
      <LabelAbove x={50} y={26} text="4 sources connectées" fill={CYAN} />
      {sources.map((s, i) => (
        <g key={s.label}>
          <rect
            x={8}
            y={s.y}
            width={84}
            height={30}
            rx={8}
            fill="var(--color-bg-card)"
            stroke={STROKE_MED}
            strokeWidth="0.9"
          />
          {/* petite pastille couleur */}
          <circle cx={20} cy={s.y + 15} r="3" fill={CYAN} fillOpacity={0.4 + i * 0.15} />
          <text
            x={56}
            y={s.y + 19}
            textAnchor="middle"
            fill="var(--color-text-primary)"
            fontSize="10"
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {s.label}
          </text>
          {/* fines connexions courbes vers mémoire (fan-in) */}
          <path
            d={`M 92 ${s.y + 15} C 140 ${s.y + 15}, 160 115, 200 115`}
            fill="none"
            stroke={`url(#rag-line-${usageKey})`}
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.85"
            markerEnd={`url(#rag-arrow-${usageKey})`}
          />
        </g>
      ))}

      {/* Badge "+" sur la mémoire indiquant la combinaison */}
      <g transform="translate(240 70)">
        <circle cx="0" cy="0" r="8" fill="var(--color-bg-card)" stroke={CYAN} strokeWidth="1" />
        <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke={CYAN} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke={CYAN} strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <LabelAbove x={424} y={70} text="Réponse" fill={CYAN} />
      <DocBox
        x={378}
        y={85}
        w={92}
        h={60}
        label="Synthèse"
        sub="4 citations"
        iconType="response"
        primary
      />

      {/* connecteur Mémoire → Réponse */}
      <line
        x1="292"
        y1="115"
        x2="378"
        y2="115"
        stroke={`url(#rag-line-${usageKey})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        markerEnd={`url(#rag-arrow-${usageKey})`}
      />
      <FlowDots x1={298} y1={115} x2={374} y2={115} />
    </g>
  );
}

function VariantAutoEnrichi() {
  const usageKey: RagUsageKey = "auto-enrichi";
  const sources = [
    { label: "Drive", y: 50 },
    { label: "Notion", y: 100 },
    { label: "CRM", y: 150 },
  ];
  return (
    <g>
      {/* Badge "synchronisation continue" en haut, étendu */}
      <g transform="translate(160 18)">
        <rect
          x="0"
          y="0"
          width="160"
          height="22"
          rx="11"
          fill="var(--color-bg-card)"
          stroke={ACCENT_LIGHT}
          strokeOpacity="0.5"
          strokeWidth="0.7"
        />
        <circle cx="11" cy="11" r="2.6" fill={ACCENT_LIGHT} />
        <text
          x="82"
          y="15"
          textAnchor="middle"
          fill="var(--color-text-secondary)"
          fontSize="9"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
        >
          synchronisation continue
        </text>
      </g>

      <LabelAbove x={50} y={42} text="Sources" fill={CYAN} />
      {sources.map((s) => (
        <g key={s.label}>
          <rect
            x={8}
            y={s.y}
            width={84}
            height={30}
            rx={8}
            fill="var(--color-bg-card)"
            stroke={STROKE_MED}
            strokeWidth="0.9"
          />
          {/* icône sync circulaire à gauche */}
          <g transform={`translate(20 ${s.y + 15})`}>
            <circle r="5" fill="none" stroke={CYAN} strokeWidth="0.9" opacity="0.85" />
            <path
              d="M-3.5 -1.2 A 3.5 3.5 0 0 1 3.5 -1.2"
              fill="none"
              stroke={CYAN}
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M2.5 -3 L3.6 -1.2 L1.5 -0.4"
              fill="none"
              stroke={CYAN}
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 1.2 A 3.5 3.5 0 0 1 -3.5 1.2"
              fill="none"
              stroke={CYAN}
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M-2.5 3 L-3.6 1.2 L-1.5 0.4"
              fill="none"
              stroke={CYAN}
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <text
            x={62}
            y={s.y + 19}
            textAnchor="middle"
            fill="var(--color-text-primary)"
            fontSize="10"
            fontWeight="600"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {s.label}
          </text>

          {/* connecteur courbe vers mémoire */}
          <path
            d={`M 92 ${s.y + 15} C 140 ${s.y + 15}, 160 115, 200 115`}
            fill="none"
            stroke={`url(#rag-line-${usageKey})`}
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.85"
            markerEnd={`url(#rag-arrow-${usageKey})`}
          />
        </g>
      ))}

      <LabelAbove x={424} y={70} text="Réponse" fill={CYAN} />
      <DocBox
        x={378}
        y={85}
        w={92}
        h={60}
        label="Synthèse"
        sub="toujours à jour"
        iconType="response"
        primary
      />

      {/* connecteur Mémoire → Réponse */}
      <line
        x1="292"
        y1="115"
        x2="378"
        y2="115"
        stroke={`url(#rag-line-${usageKey})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        markerEnd={`url(#rag-arrow-${usageKey})`}
      />
      <FlowDots x1={298} y1={115} x2={374} y2={115} />
    </g>
  );
}
