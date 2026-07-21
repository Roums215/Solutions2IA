"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import {
  DEFAULT_NODES, DEFAULT_EDGES,
  type NodeStatus, type PipelineNode, type PipelineEdge,
} from "@/components/sections/automation/pipelineData";
import type { SectorDetails } from "@/components/sections/automation/sectorsData";

// ─── Public API ───────────────────────────────────────────────────────────────

export interface AutomationPipelineProps {
  nodes?: PipelineNode[];
  edges?: PipelineEdge[];
  details?: SectorDetails;
  heading?: ReactNode;
  intro?: ReactNode;
  loopMs?: number;
  className?: string;
}

const DEFAULT_DETAILS: SectorDetails = {
  trigger: {
    label: "Déclencheur",
    text: "webhook JobPhoning à la fin d'un appel qualifié.",
  },
  processing: {
    label: "n8n",
    text: "normalisation tél/email, déduplication, enrichissement SIREN/SIRET via API entreprise officielle, règles de décision.",
  },
  write: {
    label: "Écriture Axonaut",
    text: "API REST : contact + entreprise + opportunité, option devis pré-rempli.",
  },
  reliability: {
    label: "Fiabilité",
    text: "notification équipe, journalisation complète, idempotence et reprises automatiques. Hébergé en UE.",
  },
};

// ─── Layout topology helpers ─────────────────────────────────────────────────

type Topology = {
  mainNodes: PipelineNode[];
  notifyNode: PipelineNode | null;
  notifyEdge: PipelineEdge | null;
  callbackEdge: PipelineEdge | null;
  callbackSrcIdx: number;   // index dans mainNodes
  callbackDstIdx: number;
  seq: string[];
  totalTicks: number;       // seq.length + 3 ticks "done" + 1 tick "reset"
};

function buildTopology(nodes: PipelineNode[], edges: PipelineEdge[]): Topology {
  const notifyEdge = edges.find((e) => e.kind === "notification") ?? null;
  const notifyId = notifyEdge?.to ?? null;
  const notifyNode = notifyId ? nodes.find((n) => n.id === notifyId) ?? null : null;
  const mainNodes = nodes.filter((n) => n.id !== notifyId);

  const callbackEdge = edges.find((e) => e.kind === "callback") ?? null;
  const callbackSrcIdx = callbackEdge ? mainNodes.findIndex((n) => n.id === callbackEdge.from) : -1;
  const callbackDstIdx = callbackEdge ? mainNodes.findIndex((n) => n.id === callbackEdge.to)   : -1;

  // SEQ dérivé : 1er nœud du 1er main edge → chaque .to des main edges → notify
  const mainEdges = edges.filter((e) => e.kind === "main");
  const mainSeq = mainEdges.length > 0
    ? [mainEdges[0].from, ...mainEdges.map((e) => e.to)]
    : mainNodes.map((n) => n.id);
  const seq = notifyId ? [...mainSeq, notifyId] : mainSeq;

  // 3 ticks "tout fait" + 1 tick reset
  const totalTicks = seq.length + 4;

  return {
    mainNodes,
    notifyNode,
    notifyEdge: notifyNode ? notifyEdge : null,
    callbackEdge: callbackEdge && callbackSrcIdx >= 0 && callbackDstIdx >= 0 ? callbackEdge : null,
    callbackSrcIdx,
    callbackDstIdx,
    seq,
    totalTicks,
  };
}

type StatesMap = Record<string, NodeStatus>;

function computeStates(tick: number, seq: string[], totalTicks: number, nodes: PipelineNode[]): StatesMap {
  const map: StatesMap = Object.fromEntries(nodes.map((n) => [n.id, "pending" as NodeStatus]));
  if (tick === totalTicks - 1) return map; // reset = tout pending
  const ai = tick < seq.length ? tick : -1; // -1 = tout done
  for (let i = 0; i < seq.length; i++) {
    const id = seq[i];
    if (!(id in map)) continue;
    map[id] = i < ai ? "done" : i === ai ? "active" : "pending";
  }
  if (ai === -1) seq.forEach((id) => { if (id in map) map[id] = "done"; });
  return map;
}

// ─── PipelineNodeCard ─────────────────────────────────────────────────────────

function PipelineNodeCard({
  node, status, isNotify = false, sentLabel, activeStatusText, widthClass = "w-[140px]",
}: {
  node: PipelineNode;
  status: NodeStatus;
  isNotify?: boolean;
  sentLabel?: string;
  activeStatusText?: string;
  widthClass?: string;
}) {
  const isSent = isNotify && status === "done";
  const showMicroStatus = status === "active" && !!activeStatusText;
  const ariaLabel = showMicroStatus
    ? `${node.label} : ${activeStatusText}`
    : `${node.label} : ${node.sublabel}`;
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      aria-current={status === "active" ? "step" : undefined}
      className={["flex flex-col items-center", widthClass].join(" ")}
    >
      <div
        className={[
          "flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2 h-[72px] w-full transition-all duration-500",
          status === "active"
            ? "border-cyan/40 bg-bg-card"
            : status === "done"
            ? "border-green-400/30 bg-bg-card"
            : "border-border-subtle bg-bg-card/40 opacity-55",
        ].join(" ")}
        style={{
          willChange: "opacity, box-shadow",
          boxShadow: status === "active" ? "0 0 24px var(--color-cyan-glow)" : undefined,
        }}
      >
        <div className="flex items-center gap-1.5 h-3">
          {status === "active" && (
            <motion.div
              className="w-3 h-3 rounded-full border-2 border-cyan/40 border-t-cyan flex-shrink-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          )}
          {status === "done" && !isSent && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="3"
              className="flex-shrink-0 stroke-green-400" aria-hidden>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {isSent && (
            <span className="text-[10px] font-semibold text-cyan tracking-wide line-clamp-1">
              {sentLabel ?? "envoyé"}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center text-center w-full leading-tight">
          <span className="text-[12px] font-medium text-text-primary line-clamp-2 w-full">{node.label}</span>
          {showMicroStatus ? (
            <span className="text-[10px] font-medium text-cyan/90 line-clamp-1 w-full">
              {activeStatusText}
            </span>
          ) : (
            <span className="text-[10px] text-text-tertiary line-clamp-1 w-full">{node.sublabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PipelineTrack (SVG layer + tokens) ──────────────────────────────────────

const ease4 = [0.16, 1, 0.3, 1] as const;

function AnimPath({ d, stroke, width, opacity, dash, delay }: {
  d: string; stroke: string; width: string; opacity: string; dash?: string; delay?: number;
}) {
  return (
    <motion.path d={d} fill="none" stroke={stroke} strokeWidth={width}
      strokeOpacity={opacity} strokeDasharray={dash}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, delay: delay ?? 0, ease: ease4 }}
    />
  );
}

function StaticPath({ d, stroke, width, opacity, dash }: {
  d: string; stroke: string; width: string; opacity: string; dash?: string; delay?: number;
}) {
  return <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeOpacity={opacity} strokeDasharray={dash} />;
}

// ─── Layout geometry ─────────────────────────────────────────────────────────

type LayoutGeom = {
  vw: number; vh: number;
  mainPos: Array<{ x: number; y: number }>;
  notifyPos: { x: number; y: number } | null;
  mainD: string;
  callD: string | null;
  notifyD: string | null;
  arrows: Array<{ x: number; y: number }>;
  notifyArrow: { x: number; y: number } | null;
  callbackLabelPos: { x: number; y: number; vertical?: boolean } | null;
  exitLine: { x1: number; y1: number; x2: number; y2: number } | null;
};

function buildDesktopGeom(topo: Topology): LayoutGeom {
  const PAD_X = 90;
  const VW = 1160;
  const USABLE = VW - 2 * PAD_X;
  const nMain = topo.mainNodes.length;
  const hasNotify = topo.notifyNode !== null;
  const totalNodes = nMain + (hasNotify ? 1 : 0);
  const stepX = totalNodes > 1 ? USABLE / (totalNodes - 1) : 0;
  const cx = (i: number) => PAD_X + i * stepX;
  const railY = 140;
  const VH = railY + 100;
  const exitLine = nMain > 0
    ? { x1: cx(nMain - 1), y1: railY + 36, x2: cx(nMain - 1), y2: VH - 6 }
    : null;

  const mainPos = topo.mainNodes.map((_, i) => ({ x: cx(i), y: railY }));
  const notifyPos = hasNotify ? { x: cx(nMain), y: railY } : null;

  // Main rail polyline (main nodes only)
  const mainD = mainPos
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
    .join(" ");

  // Callback arc — apex 60px au-dessus du rail
  let callD: string | null = null;
  let callbackLabelPos: LayoutGeom["callbackLabelPos"] = null;
  if (topo.callbackEdge) {
    const srcX = cx(topo.callbackSrcIdx);
    const dstX = cx(topo.callbackDstIdx);
    const startY = railY - 22;
    const apexY = railY - 62;
    callD = `M ${srcX},${startY} C ${srcX},${apexY} ${dstX},${apexY} ${dstX},${startY}`;
    callbackLabelPos = { x: (srcX + dstX) / 2, y: apexY + 12 };
  }

  // Notify segment — prolongement horizontal du rail
  let notifyD: string | null = null;
  let notifyArrow: LayoutGeom["notifyArrow"] = null;
  if (hasNotify) {
    const lastMainX = cx(nMain - 1);
    const notifyX = cx(nMain);
    notifyD = `M ${lastMainX},${railY} L ${notifyX},${railY}`;
    notifyArrow = { x: (lastMainX + notifyX) / 2, y: railY };
  }

  // Arrows entre nœuds main consécutifs
  const arrows: Array<{ x: number; y: number }> = [];
  for (let i = 1; i < nMain; i++) {
    arrows.push({ x: (cx(i - 1) + cx(i)) / 2, y: railY });
  }

  return { vw: VW, vh: VH, mainPos, notifyPos, mainD, callD, notifyD, arrows, notifyArrow, callbackLabelPos, exitLine };
}

function buildMobileGeom(topo: Topology): LayoutGeom {
  const PAD_Y_TOP = 40;
  const PAD_Y_BOTTOM = 30;
  const railX = 170;
  const VW = 340;
  const STEP_Y = 110;
  const n = topo.mainNodes.length;
  const cy = (i: number) => PAD_Y_TOP + i * STEP_Y;
  const lastY = cy(n - 1);
  const hasNotify = topo.notifyNode !== null;
  const notifyCy_m = hasNotify ? lastY + STEP_Y : lastY;
  const EXIT_EXTRA = 48;
  const VH = (hasNotify ? notifyCy_m : lastY) + PAD_Y_BOTTOM + EXIT_EXTRA;
  const exitAnchorY = hasNotify ? notifyCy_m : lastY;
  const exitLine = n > 0
    ? { x1: railX, y1: exitAnchorY + 36, x2: railX, y2: VH - 6 }
    : null;

  const mainPos = topo.mainNodes.map((_, i) => ({ x: railX, y: cy(i) }));
  const notifyPos = hasNotify ? { x: railX, y: notifyCy_m } : null;

  const mainD = mainPos
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
    .join(" ");

  let callD: string | null = null;
  let callbackLabelPos: LayoutGeom["callbackLabelPos"] = null;
  if (topo.callbackEdge) {
    const srcY = cy(topo.callbackSrcIdx);
    const dstY = cy(topo.callbackDstIdx);
    const startX = railX + 50;
    const apexX = railX + 100;
    callD = `M ${startX},${srcY} C ${apexX},${srcY} ${apexX},${dstY} ${startX},${dstY}`;
    callbackLabelPos = { x: apexX + 8, y: (srcY + dstY) / 2, vertical: true };
  }

  let notifyD: string | null = null;
  let notifyArrow: LayoutGeom["notifyArrow"] = null;
  if (hasNotify) {
    const top = lastY + 32;
    const bottom = notifyCy_m - 32;
    notifyD = `M ${railX},${top} L ${railX},${bottom}`;
    notifyArrow = { x: railX, y: (top + bottom) / 2 };
  }

  const arrows: Array<{ x: number; y: number }> = [];
  for (let i = 1; i < n; i++) {
    arrows.push({ x: railX, y: (cy(i - 1) + cy(i)) / 2 });
  }

  return { vw: VW, vh: VH, mainPos, notifyPos, mainD, callD, notifyD, arrows, notifyArrow, callbackLabelPos, exitLine };
}

// ─── PipelineTrack ───────────────────────────────────────────────────────────

function PipelineTrack({ geom, layout, loopMs, reduced, callbackActive, callbackLabel }: {
  geom: LayoutGeom;
  layout: "desktop" | "mobile";
  loopMs: number;
  reduced: boolean;
  callbackActive: boolean;
  callbackLabel: string;
}) {
  const isD = layout === "desktop";
  const cyan = "var(--color-cyan)";
  const accent = "var(--color-accent-primary)";
  const PathComp = reduced ? StaticPath : AnimPath;

  return (
    <svg viewBox={`0 0 ${geom.vw} ${geom.vh}`} className="w-full h-auto"
      role="img" aria-label="Pipeline d'automatisation animé">
      {/* Ghost paths pour animateMotion */}
      <path id={`pm-${layout}`} d={geom.mainD} fill="none" />
      {geom.callD && <path id={`pc-${layout}`} d={geom.callD} fill="none" />}
      {geom.notifyD && <path id={`pn-${layout}`} d={geom.notifyD} fill="none" />}

      {/* Rails */}
      <PathComp d={geom.mainD} stroke={cyan} width={isD ? "1.5" : "2"} opacity="0.22" delay={0} />
      {geom.callD && (
        <PathComp d={geom.callD} stroke={accent} width="1" opacity="0.18" dash="5 5" delay={0.3} />
      )}
      {geom.notifyD && (
        <PathComp d={geom.notifyD} stroke={cyan} width="1.5" opacity="0.32" delay={0.8} />
      )}

      {/* Data beam vers le panneau détails — gradient qui s'atténue */}
      {geom.exitLine && (
        <g aria-hidden="true">
          <defs>
            <linearGradient id={`beam-${layout}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={cyan} stopOpacity="0.45" />
              <stop offset="100%" stopColor={cyan} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M ${geom.exitLine.x1},${geom.exitLine.y1} L ${geom.exitLine.x2},${geom.exitLine.y2}`}
            fill="none"
            stroke={`url(#beam-${layout})`}
            strokeWidth="0.75"
          />
        </g>
      )}

      {/* Flèches main */}
      {geom.arrows.map(({ x, y }, i) =>
        isD ? (
          <polygon key={i}
            points={`${x - 5},${y - 4} ${x + 5},${y} ${x - 5},${y + 4}`}
            fill={cyan} opacity="0.22" />
        ) : (
          <polygon key={i}
            points={`${x - 5},${y - 5} ${x + 5},${y - 5} ${x},${y + 5}`}
            fill={cyan} opacity="0.22" />
        )
      )}

      {/* Flèche notify — même direction que les arrows main */}
      {geom.notifyArrow && (
        isD ? (
          <polygon
            points={`${geom.notifyArrow.x - 5},${geom.notifyArrow.y - 4} ${geom.notifyArrow.x + 5},${geom.notifyArrow.y} ${geom.notifyArrow.x - 5},${geom.notifyArrow.y + 4}`}
            fill={cyan} opacity="0.42" />
        ) : (
          <polygon
            points={`${geom.notifyArrow.x - 5},${geom.notifyArrow.y - 5} ${geom.notifyArrow.x + 5},${geom.notifyArrow.y - 5} ${geom.notifyArrow.x},${geom.notifyArrow.y + 5}`}
            fill={cyan} opacity="0.42" />
        )
      )}

      {/* Label callback */}
      {geom.callbackLabelPos && (
        <text
          x={geom.callbackLabelPos.x}
          y={geom.callbackLabelPos.y}
          textAnchor="middle"
          style={{
            fontSize: isD ? "11px" : "10px",
            fill: accent,
            opacity: 0.6,
            ...(geom.callbackLabelPos.vertical ? { writingMode: "vertical-rl" as const } : {}),
          }}
        >
          {callbackLabel}
        </text>
      )}

      {/* Main token */}
      {!reduced && (
        <circle r={isD ? "5" : "6"} fill={cyan}>
          <animateMotion dur={`${loopMs}ms`} repeatCount="indefinite">
            <mpath href={`#pm-${layout}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;1;0"
            keyTimes="0;0.08;0.5;0.92;1" dur={`${loopMs}ms`} repeatCount="indefinite" />
        </circle>
      )}

      {/* Callback token (1 cycle sur 5) */}
      {!reduced && geom.callD && (
        <circle r={isD ? "4" : "5"} fill={cyan}
          opacity={callbackActive ? "0.5" : "0"} style={{ transition: "opacity 0.4s" }}>
          {callbackActive && (
            <animateMotion dur={`${loopMs * 0.6}ms`} repeatCount="indefinite">
              <mpath href={`#pc-${layout}`} />
            </animateMotion>
          )}
        </circle>
      )}

      {/* Notify token — pulse axonaut → notify, synchro fin de cycle */}
      {!reduced && geom.notifyD && (
        <circle r={isD ? "3.5" : "4.5"} fill={cyan}>
          <animateMotion dur={`${loopMs}ms`} repeatCount="indefinite">
            <mpath href={`#pn-${layout}`} />
          </animateMotion>
          <animate attributeName="opacity"
            values="0;0;0.85;0.85;0;0"
            keyTimes="0;0.5;0.6;0.78;0.85;1"
            dur={`${loopMs}ms`} repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

// ─── NodeOverlay (HTML cards positioned over SVG) ─────────────────────────────

function resolveActiveStatus(
  status: string | string[] | undefined,
  cycleIndex: number,
): string | undefined {
  if (!status) return undefined;
  if (typeof status === "string") return status;
  if (status.length === 0) return undefined;
  return status[cycleIndex % status.length];
}

function NodeOverlay({
  topo, geom, states, layout, cycleIndex,
}: {
  topo: Topology;
  geom: LayoutGeom;
  states: StatesMap;
  layout: "desktop" | "mobile";
  cycleIndex: number;
}) {
  const isD = layout === "desktop";
  const widthClass = isD ? "w-[140px]" : "w-[180px]";

  return (
    <div className="absolute inset-0 pointer-events-none">
      {topo.mainNodes.map((node, i) => {
        const pos = geom.mainPos[i];
        return (
          <div key={node.id} className="absolute pointer-events-auto" style={{
            left: `${(pos.x / geom.vw) * 100}%`,
            top: `${(pos.y / geom.vh) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}>
            <PipelineNodeCard
              node={node}
              status={states[node.id] ?? "pending"}
              activeStatusText={resolveActiveStatus(node.activeStatus, cycleIndex)}
              widthClass={widthClass}
            />
          </div>
        );
      })}
      {topo.notifyNode && geom.notifyPos && (
        <div className="absolute pointer-events-auto" style={{
          left: `${(geom.notifyPos.x / geom.vw) * 100}%`,
          top: `${(geom.notifyPos.y / geom.vh) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}>
          <PipelineNodeCard
            node={topo.notifyNode}
            status={states[topo.notifyNode.id] ?? "pending"}
            isNotify
            sentLabel={topo.notifyEdge?.label}
            activeStatusText={resolveActiveStatus(topo.notifyNode.activeStatus, cycleIndex)}
            widthClass={widthClass}
          />
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AutomationPipeline({
  nodes = DEFAULT_NODES,
  edges = DEFAULT_EDGES,
  details = DEFAULT_DETAILS,
  heading,
  intro,
  loopMs = 6500,
  className,
}: AutomationPipelineProps) {
  const { shouldReduceMotion, mounted } = usePerformanceMode();
  const topo = useMemo(() => buildTopology(nodes, edges), [nodes, edges]);
  const desktopGeom = useMemo(() => buildDesktopGeom(topo), [topo]);
  const mobileGeom = useMemo(() => buildMobileGeom(topo), [topo]);

  const [tick, setTick] = useState(0);
  const [callbackActive, setCallbackActive] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);
  const inViewRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { inViewRef.current = e.isIntersecting; });
    io.observe(el);
    return () => io.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      if (!inViewRef.current) return;
      setTick((prev) => {
        const next = (prev + 1) % topo.totalTicks;
        if (next === 0) {
          cycleRef.current += 1;
          setCycleIndex(cycleRef.current);
          setCallbackActive(topo.callbackEdge !== null && cycleRef.current % 5 === 0);
          setResetting(true);
          setTimeout(() => setResetting(false), 400);
        }
        return next;
      });
    }, loopMs / topo.totalTicks);
    return () => clearInterval(id);
  }, [shouldReduceMotion, loopMs, topo.totalTicks, topo.callbackEdge]);

  const effectiveStates: StatesMap = shouldReduceMotion
    ? Object.fromEntries(nodes.map((n) => [n.id, "done" as NodeStatus]))
    : computeStates(tick, topo.seq, topo.totalTicks, nodes);

  const callbackLabel = topo.callbackEdge?.label ?? "à rappeler";
  const resolvedHeading: ReactNode = heading ?? "JobPhoning → n8n → Axonaut";
  const resolvedIntro: ReactNode =
    intro ??
    "Un appel qualifié déclenche le webhook : contact, entreprise et opportunité sont dans Axonaut avant que le commercial raccroche.";

  if (!mounted) return null;

  return (
    <section className={["section-shell", className].filter(Boolean).join(" ")}>
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-12">
        <motion.p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3"
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: ease4 }}>
          Flux en direct · tourne 24/7
        </motion.p>
        <motion.h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: ease4 }}>
          {resolvedHeading}
        </motion.h2>
        <motion.p className="mt-3 text-sm sm:text-base text-text-secondary max-w-xl mx-auto"
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: ease4 }}>
          {resolvedIntro}
        </motion.p>
      </div>

      {/* Pipeline */}
      <motion.div ref={containerRef} className="relative w-full"
        animate={{ opacity: resetting ? 0.6 : 1 }} transition={{ duration: 0.2 }} initial={false}>

        {/* Desktop ≥ lg */}
        <div className="hidden lg:block">
          <div className="relative w-full">
            <PipelineTrack
              geom={desktopGeom}
              layout="desktop"
              loopMs={loopMs}
              reduced={shouldReduceMotion}
              callbackActive={callbackActive}
              callbackLabel={callbackLabel}
            />
            <NodeOverlay topo={topo} geom={desktopGeom} states={effectiveStates} layout="desktop" cycleIndex={cycleIndex} />
          </div>
        </div>

        {/* Mobile < lg */}
        <div className="lg:hidden">
          <div className="relative w-full max-w-sm mx-auto">
            <PipelineTrack
              geom={mobileGeom}
              layout="mobile"
              loopMs={loopMs}
              reduced={shouldReduceMotion}
              callbackActive={callbackActive}
              callbackLabel={callbackLabel}
            />
            <NodeOverlay topo={topo} geom={mobileGeom} states={effectiveStates} layout="mobile" cycleIndex={cycleIndex} />
          </div>
        </div>
      </motion.div>

      {/* Détails techniques — console frosted alimentée par le pipeline */}
      <motion.div
        className="relative mx-auto max-w-3xl mt-0 rounded-2xl px-6 py-7 sm:px-8 sm:py-8 overflow-hidden"
        style={{
          background: "color-mix(in srgb, var(--color-bg-card) 50%, transparent)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          border: "1px solid color-mix(in srgb, var(--color-border-subtle) 60%, transparent)",
          borderTop: "1.5px solid color-mix(in srgb, var(--color-cyan) 35%, transparent)",
          boxShadow:
            "0 -4px 32px color-mix(in srgb, var(--color-cyan-glow) 50%, transparent), inset 0 1px 0 color-mix(in srgb, var(--color-cyan) 8%, transparent)",
        }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: ease4 }}
        aria-labelledby="pipeline-details-title"
      >
        {/* Micro-grid technique — fond très discret */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            backgroundPosition: "center center",
            opacity: 0.6,
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />

        <div className="relative">
          <h3
            id="pipeline-details-title"
            className="text-[11px] font-semibold uppercase mb-5 text-center"
            style={{
              letterSpacing: "0.22em",
              color: "color-mix(in srgb, var(--color-cyan) 70%, var(--color-accent-light) 30%)",
            }}
          >
            Comment ça marche techniquement
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm text-text-secondary">
            {[details.trigger, details.processing, details.write, details.reliability].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-cyan mt-0.5 flex-shrink-0" aria-hidden>→</span>
                <span>
                  <strong className="text-text-primary font-medium block mb-0.5">{item.label}</strong>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
