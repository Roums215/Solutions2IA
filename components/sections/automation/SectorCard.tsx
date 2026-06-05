"use client";

import Link from "next/link";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ToolBadge } from "@/components/ui/ToolBadge";
import { cn } from "@/lib/utils/cn";
import type { Sector } from "./sectorsData";

interface SectorCardProps {
  sector: Sector;
  isActive: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const MINI_PIPELINE_WIDTH = 300;
const MINI_PIPELINE_PADDING = 10;

export function SectorCard({
  sector,
  isActive,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: SectorCardProps) {
  const span = MINI_PIPELINE_WIDTH - MINI_PIPELINE_PADDING * 2;
  const step = sector.nodes.length > 1 ? span / (sector.nodes.length - 1) : 0;

  return (
    <Link
      href={`/automatisation/${sector.slug}`}
      aria-label={`${sector.name} — voir le pipeline d'automatisation`}
      onPointerEnter={onHoverStart}
      onPointerLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      data-sector-active={isActive ? "true" : undefined}
      className={cn(
        "block h-full rounded-2xl outline-none transition-opacity duration-500",
        "focus-visible:ring-2 focus-visible:ring-cyan/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
        isDimmed ? "opacity-60" : "opacity-100",
      )}
    >
      <SpotlightCard
        glow="34,211,238"
        tilt={4}
        className="flex h-full flex-col gap-5 p-6 sm:p-7"
      >
        <header className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan/15 bg-cyan-glow"
            style={{ transform: "translateZ(30px)" }}
          >
            {sector.icon}
          </span>
          <h3
            className="text-lg font-semibold tracking-tight"
            style={{ transform: "translateZ(20px)" }}
          >
            {sector.name}
          </h3>
        </header>

        <p
          className="text-sm leading-relaxed text-text-secondary"
          style={{ transform: "translateZ(10px)" }}
        >
          {sector.problem}
        </p>

        <div className="mt-auto flex flex-col gap-4">
          <div style={{ transform: "translateZ(15px)" }}>
            <svg
              viewBox={`0 0 ${MINI_PIPELINE_WIDTH} 24`}
              className="h-6 w-full text-green-400"
              role="img"
              aria-label={`Pipeline ${sector.name} en ${sector.nodes.length} étapes`}
            >
              <line
                x1={MINI_PIPELINE_PADDING}
                y1={12}
                x2={MINI_PIPELINE_WIDTH - MINI_PIPELINE_PADDING}
                y2={12}
                stroke="currentColor"
                strokeWidth={1.5}
                strokeOpacity={0.35}
              />
              {sector.nodes.map((node, i) => {
                const cx = MINI_PIPELINE_PADDING + i * step;
                return (
                  <circle
                    key={node.id}
                    cx={cx}
                    cy={12}
                    r={5}
                    fill="currentColor"
                    className="sector-card-node"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                );
              })}
            </svg>
          </div>

          <div
            className="flex flex-wrap gap-2"
            style={{ transform: "translateZ(10px)" }}
          >
            {sector.stack.slice(0, 3).map((tool) => (
              <ToolBadge
                key={tool}
                name={tool}
                className="px-2.5 py-1 text-[11px]"
              />
            ))}
          </div>

          <div
            className="flex items-center justify-end gap-1 text-xs font-medium text-accent-light/90"
            style={{ transform: "translateZ(10px)" }}
          >
            Voir le pipeline
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
