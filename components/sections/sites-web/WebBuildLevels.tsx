"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLightHeaderZone } from "@/components/layout/headerSurface";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { cn } from "@/lib/utils/cn";
import {
  BUILD_LEVELS,
  BUILD_LINKS,
  BUILD_NODES,
  BUILD_PRICE_NOTE,
  type BuildLevel,
  type BuildNode,
} from "./webBuildData";

/**
 * /sites-web, section 4 (claire froide) : du site vitrine au site réellement connecté.
 *
 * Même grammaire que le rail de l'accueil (liste à gauche, panneau à droite), mais le
 * rail est ici une échelle : quatre paliers, et un seul schéma qui s'enrichit d'un
 * palier à l'autre. Les briques pas encore incluses restent en pointillé, pour que
 * le visiteur voie ce qu'il pourrait ajouter. Sur téléphone, les quatre paliers se
 * suivent, chacun avec sa chaîne en texte (le schéma y serait illisible).
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function WebBuildLevels() {
  const sectionRef = useRef<HTMLElement>(null);
  useLightHeaderZone(sectionRef);
  const [active, setActive] = useState(1);
  const current = BUILD_LEVELS[active - 1];

  return (
    <section
      ref={sectionRef}
      id="ce-que-je-construis"
      aria-labelledby="web-build-heading"
      className="surface-light section-shell-tight relative isolate scroll-mt-24 overflow-hidden rounded-b-[2rem] bg-paper-2 lg:rounded-b-[3.5rem]"
    >
      <SectionFluidBackdrop variant="webBuild" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="web-build-heading"
          label="Ce que je construis"
          title={
            <>
              Du site vitrine au site{" "}
              <span className="text-gradient-strong">réellement connecté</span>.
            </>
          }
          description="On ne commence pas forcément par le plus complet. Chaque palier ajoute une brique au précédent, et on monte quand votre activité le demande."
        />

        {/* Desktop : l'échelle à gauche, le palier choisi à droite */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-x-12">
          <ol className="relative self-start">
            {/* L'échelle : un filet qui se remplit jusqu'au palier choisi */}
            <span aria-hidden className="absolute bottom-6 left-[1.1875rem] top-6 w-px bg-paper-line-strong" />
            <motion.span
              aria-hidden
              className="absolute left-[1.1875rem] top-6 w-px origin-top bg-accent-primary"
              style={{ height: "calc(100% - 3rem)" }}
              initial={false}
              animate={{ scaleY: (active - 1) / (BUILD_LEVELS.length - 1) }}
              transition={{ duration: 0.6, ease: EASE }}
            />
            {BUILD_LEVELS.map((lvl) => {
              const on = lvl.level === active;
              const reached = lvl.level <= active;
              return (
                <li key={lvl.id} className="relative">
                  <button
                    type="button"
                    aria-pressed={on}
                    aria-controls="web-build-panel"
                    onClick={() => setActive(lvl.level)}
                    className={cn(
                      "group flex w-full items-start gap-3.5 rounded-xl py-3.5 pl-0 pr-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
                      on && "bg-paper shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)]",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border font-mono text-[12px] font-semibold transition-colors duration-300",
                        on
                          ? "border-ink bg-ink text-cyan"
                          : reached
                            ? "border-accent-primary/50 bg-paper text-accent-dark"
                            : "border-paper-line-strong bg-paper text-text-tertiary",
                      )}
                    >
                      0{lvl.level}
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span
                        className={cn(
                          "block text-[15px] font-semibold tracking-tight transition-colors duration-300",
                          on ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary",
                        )}
                      >
                        {lvl.title}
                      </span>
                      <span className={cn("mt-0.5 block text-[13px] leading-snug", on ? "text-text-secondary" : "text-text-tertiary")}>
                        {lvl.tagline}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div id="web-build-panel" className="paper-card overflow-hidden rounded-2xl">
            <LevelBody level={current} />
            <div className="border-t border-paper-line bg-paper-2/70 px-6 pb-5 pt-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-2">
                Ce qui circule à ce palier
              </p>
              <div className="@container relative w-full">
                <div className="relative aspect-[760/260] w-full">
                  <BuildSchema level={current.level} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Téléphone et tablette : les quatre paliers se suivent */}
        <ol className="space-y-4 lg:hidden">
          {BUILD_LEVELS.map((lvl) => (
            <li key={lvl.id} className="paper-card overflow-hidden rounded-2xl">
              <LevelBody level={lvl} compact />
              <p className="border-t border-paper-line bg-paper-2/70 px-5 py-3 text-[13px] leading-relaxed text-ink-2">
                <span className="font-semibold text-ink">Circuit : </span>
                {chainFor(lvl.level)}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl text-[13.5px] leading-relaxed text-text-tertiary lg:mt-10">{BUILD_PRICE_NOTE}</p>
      </div>
    </section>
  );
}

function LevelBody({ level, compact = false }: { level: BuildLevel; compact?: boolean }) {
  const Icon = level.icon;
  return (
    <div className={cn("grid gap-6", compact ? "p-5" : "p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-8")}>
      <div>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-cyan" aria-hidden>
            <Icon size={18} strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            {compact && (
              <p className="font-mono text-[11px] tracking-[0.12em] text-text-tertiary">Palier 0{level.level}</p>
            )}
            <h3 className="text-xl font-semibold tracking-tight text-balance">{level.title}</h3>
          </div>
        </div>
        <p className="mt-3.5 text-[15px] leading-[1.7] text-text-secondary text-pretty">{level.pitch}</p>
        {level.related && (
          <Link
            href={level.related.href}
            className="group mt-4 inline-flex items-center gap-1.5 rounded-sm text-[13.5px] font-medium text-accent-dark transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary"
          >
            {level.related.label}
            <ArrowRight size={13} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-2">Ce que ça comprend</p>
          <ul className="mt-2 space-y-1.5">
            {level.includes.map((it) => (
              <li key={it} className="flex items-start gap-2 text-[14px] leading-snug text-text-secondary">
                <Check size={14} strokeWidth={2.25} className="mt-0.5 shrink-0 text-accent-dark" aria-hidden />
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-paper-line bg-paper px-3.5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-2">Par exemple</p>
          <ul className="mt-1.5 space-y-1">
            {level.examples.map((ex) => (
              <li key={ex} className="text-[13.5px] leading-snug text-ink">
                {ex}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Chaîne en texte pour le téléphone. */
function chainFor(level: number) {
  const parts = ["visiteur", "votre site"];
  if (level === 1) parts.push("appel ou e-mail");
  if (level >= 2) parts.push("formulaire adapté", "demande complète");
  if (level >= 3) parts.push("fichier clients, agenda, messagerie");
  if (level >= 4) parts.push("espace client");
  return parts.join(" → ");
}

// ─── Le schéma qui s'enrichit ────────────────────────────────────────────────

const W = 760;
const H = 260;

function BuildSchema({ level }: { level: number }) {
  const { disableContentMotion } = usePerformanceMode();
  const t = (d: number) => (disableContentMotion ? { duration: 0 } : { duration: d, ease: EASE });

  return (
    <div
      role="img"
      aria-label={`Schéma du palier ${level} : ${chainFor(level)}.`}
      className="absolute left-0 top-0 origin-top-left [scale:tan(atan2(100cqw,760px))]"
      style={{ width: W, height: H }}
    >
      <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
        {BUILD_LINKS.map((l) => {
          const on = level >= l.from;
          return (
            <g key={l.d}>
              {/* Trace pointillée : la liaison possible */}
              <path d={l.d} fill="none" stroke="var(--color-ink)" strokeOpacity={0.16} strokeWidth={1.25} strokeDasharray="3 4" />
              <motion.path
                d={l.d}
                fill="none"
                stroke="var(--color-accent-primary)"
                strokeWidth={1.75}
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                transition={{ pathLength: t(0.6), opacity: t(0.25) }}
              />
            </g>
          );
        })}
      </svg>
      {BUILD_NODES.map((n) => (
        <SchemaNode key={n.key} node={n} level={level} instant={disableContentMotion} />
      ))}
    </div>
  );
}

function SchemaNode({ node, level, instant }: { node: BuildNode; level: number; instant: boolean }) {
  const on = level >= node.from;
  const label = level === 1 && node.labelL1 ? node.labelL1 : node.label;
  const sub = level === 1 && node.subL1 ? node.subL1 : node.sub;
  const dark = node.tone === "ink";
  const cool = node.tone === "cyan";

  return (
    <motion.div
      className={cn(
        "absolute flex h-[52px] flex-col justify-center rounded-xl px-3",
        on
          ? dark
            ? "bg-ink text-paper shadow-[0_12px_24px_-16px_color-mix(in_oklab,var(--color-ink)_70%,transparent)]"
            : cool
              ? "bg-cyan/16 text-ink ring-1 ring-cyan/50"
              : "bg-paper text-ink ring-1 ring-ink/14 shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_18%,transparent)]"
          : "border border-dashed border-ink/20 bg-transparent text-ink-3",
      )}
      style={{ left: node.x, top: node.y, width: node.w }}
      initial={false}
      animate={{ opacity: on ? 1 : 0.55, scale: on ? 1 : 0.97 }}
      transition={instant ? { duration: 0 } : { type: "spring", bounce: 0.15, visualDuration: 0.5 }}
    >
      <span className="truncate text-[12.5px] font-semibold leading-tight">{label}</span>
      <span className={cn("truncate text-[11px] leading-tight", on ? (dark ? "text-paper/70" : "text-ink-2") : "text-ink-3")}>
        {sub}
      </span>
    </motion.div>
  );
}
