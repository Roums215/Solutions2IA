"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, LockKeyhole, UserRound } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { NEEDS, SECTORS } from "./aiPageData";

/**
 * /agents-ia, section « Un rôle précis » (sombre). Fusion V3 de « un assistant pour
 * chaque tâche » et « un assistant conçu pour votre rôle ».
 *
 * On choisit un BESOIN (pas une technologie) : une seule fiche se reconfigure (il reçoit,
 * il sait, il peut, il vous demande, outils), et une seule mini scène montre le rôle au
 * travail. La ligne « Exemples » change seulement l'exemple métier : le fonctionnement
 * reste le même, ce qui montre l'adaptation sans faire produit générique.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SHEET =
  "0 1px 2px color-mix(in oklab, var(--color-bg-primary) 70%, transparent), 0 24px 44px -24px color-mix(in oklab, var(--color-bg-primary) 95%, transparent)";

export function AiAgentTypes() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const [needIndex, setNeedIndex] = useState(0);
  const [sectorIndex, setSectorIndex] = useState(0);
  const need = NEEDS[needIndex];
  const sector = SECTORS[sectorIndex];
  const Icon = need.icon;

  return (
    <section id="besoins" className="section-shell-tight relative isolate scroll-mt-24 overflow-hidden" aria-labelledby="ai-role-heading">
      <SectionFluidBackdrop variant="aiDark" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="ai-role-heading"
          label="Le rôle"
          title={
            <>
              Un rôle précis. <span className="text-gradient-strong">Pas un robot pour tout.</span>
            </>
          }
          description="Je définis avec vous ce qu'il reçoit, ce qu'il sait, ce qu'il peut faire et quand il doit vous demander."
        />

        <div>
        {/* Le besoin : défilement horizontal sur téléphone */}
        <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Choisir un besoin">
          <div className="flex min-w-max gap-1.5 border-b border-border-medium sm:min-w-0">
            {NEEDS.map((n, i) => {
              const on = i === needIndex;
              const NIcon = n.icon;
              return (
                <button
                  key={n.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="ai-role-sheet"
                  onClick={() => setNeedIndex(i)}
                  className={cn(
                    "relative -mb-px flex items-center gap-2 whitespace-nowrap px-3.5 py-3 text-[14.5px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                    on ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary",
                  )}
                >
                  <NIcon size={16} strokeWidth={1.9} className={on ? "text-cyan" : ""} aria-hidden />
                  {n.label}
                  {on && <motion.span layoutId="ai-need-underline" className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-accent-light" transition={{ type: "spring", bounce: 0.15, visualDuration: instant ? 0 : 0.35 }} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-10">
          {/* La fiche : le cadre ne change pas, les valeurs si */}
          <div id="ai-role-sheet" role="tabpanel" aria-label={`Fiche de rôle : ${need.name}`}>
            <Swap k={need.id} instant={instant}>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-primary/15 text-accent-light" aria-hidden>
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-2xl font-semibold tracking-tight">{need.name}</h3>
                  <p className="mt-1 text-[16.5px] text-text-secondary">
                    <span className="text-text-tertiary">Mission : </span>
                    {need.mission}
                  </p>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-border-medium border-y border-border-medium">
                <Field label="Il reçoit">{need.receives.join(" · ")}</Field>
                <Field label="Il sait">{need.knows.join(" · ")}</Field>
                <Field label="Il peut">{need.can.join(" · ")}</Field>
                <Field label="Il vous demande" tone="ask">
                  <span className="inline-flex items-start gap-2">
                    <LockKeyhole size={14} strokeWidth={2} className="mt-1 shrink-0 text-warning" aria-hidden />
                    {need.asks.join(" · ")}
                  </span>
                </Field>
                <Field label="Outils">{need.tools.join(" · ")}</Field>
              </dl>
            </Swap>
          </div>

          {/* Une seule mini scène : le rôle au travail, dans le métier choisi */}
          <div>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={`${need.id}-${sector.id}`}
                initial={instant ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={instant ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: instant ? 0 : 0.3, ease: EASE }}
                className="overflow-hidden rounded-2xl bg-paper text-ink"
                style={{ boxShadow: SHEET }}
              >
                <div className="flex items-center gap-2.5 border-b border-paper-line px-4 py-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-cyan" aria-hidden>
                    <Icon size={15} strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] font-semibold">{need.object}</p>
                    <p className="truncate text-[11.5px] text-ink-3">{sector.label}</p>
                  </div>
                </div>
                <ol className="divide-y divide-paper-line">
                  {need.scene(sector).map((line, i) => (
                    <li key={i} className={cn("flex items-start gap-3 px-4 py-2.5", line.you && "bg-accent-primary/[0.06]")}>
                      <span className="w-10 shrink-0 pt-px font-mono text-[11px] text-ink-3">{line.time}</span>
                      <span className="min-w-0 flex-1 text-[13px] leading-snug">{line.text}</span>
                      {line.you && <UserRound size={13} strokeWidth={2} className="mt-0.5 shrink-0 text-accent-dark" aria-label="vous" />}
                    </li>
                  ))}
                </ol>
                <p className="border-t border-paper-line bg-paper-2 px-4 py-1.5 text-[10.5px] text-ink-3">Données d&apos;exemple</p>
              </motion.div>
            </AnimatePresence>
            {need.related && (
              <Link
                href={need.related.href}
                className="group mt-4 inline-flex items-center gap-1.5 rounded-sm text-[14px] font-medium text-accent-light transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
              >
                {need.related.label}
                <ArrowRight size={14} strokeWidth={1.9} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            )}
          </div>
        </div>

        {/* Exemples : seul l'exemple métier change, le fonctionnement reste le même */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <p className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Exemples</p>
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="radiogroup" aria-label="Voir l'exemple dans un métier">
            <div className="flex min-w-max gap-1.5 sm:min-w-0 sm:flex-wrap">
              {SECTORS.map((s, i) => {
                const on = i === sectorIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setSectorIndex(i)}
                    className={cn(
                      "whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13.5px] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                      on ? "bg-paper font-semibold text-ink" : "text-text-secondary ring-1 ring-border-medium hover:text-text-primary",
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

/** Une valeur de la fiche qui change avec le besoin, sans que la fiche bouge. */
function Swap({ k, instant, children }: { k: string; instant: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={k}
        initial={instant ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={instant ? undefined : { opacity: 0, y: -3 }}
        transition={{ duration: instant ? 0 : 0.25, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, tone, children }: { label: string; tone?: "ask"; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-3.5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-4">
      <dt className={cn("pt-0.5 text-[12px] font-semibold uppercase tracking-[0.14em]", tone === "ask" ? "text-warning" : "text-text-tertiary")}>{label}</dt>
      <dd className="text-[15.5px] leading-relaxed text-text-primary">{children}</dd>
    </div>
  );
}
