"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bell, BookOpen, CheckCircle2, ChevronRight, Clock3, History, PencilLine, Workflow } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils/cn";
import { PROFILES, type Profile, type QueueState } from "./aiProfilesData";

/**
 * /agents-ia, configurateur de rôle (sombre). Remplace les six tableaux de bord séparés.
 *
 * UNE interface : le visiteur choisit un profil et la même interface se reconfigure,
 * d'abord la configuration du rôle (objectif, entrées, connaissances, ce qu'il fait, ce
 * que vous gardez, outils, mesure), puis le poste de travail du jour : indicateurs,
 * file de travail, « à valider par vous », « ce qu'il a fait seul », sources, journal.
 * On y lit la boucle : il voit, comprend, prépare, demande, agit, trace.
 * Sur téléphone, le poste de travail est résumé (pas le tableau desktop compressé).
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STATE: Record<QueueState, { label: string; icon: typeof CheckCircle2; className: string }> = {
  fait: { label: "Préparé", icon: CheckCircle2, className: "bg-accent-primary/12 text-accent-dark" },
  seul: { label: "Fait seul", icon: Workflow, className: "bg-success/15 text-success-ink" },
  valider: { label: "À valider", icon: Bell, className: "bg-warning/18 text-warning-ink" },
  suivant: { label: "À venir", icon: Clock3, className: "bg-paper-3 text-ink-2" },
};

function Swap({ k, instant, children, className }: { k: string; instant: boolean; children: ReactNode; className?: string }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={k}
        className={className}
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

export function AiRoleConfigurator() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const [index, setIndex] = useState(0);
  const p = PROFILES[index];

  return (
    <section className="section-shell-tight relative isolate overflow-hidden" aria-labelledby="ai-config-heading">
      <SectionFluidBackdrop variant="aiDark" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="ai-config-heading"
          label="Votre rôle"
          title={
            <>
              Pas un outil universel{" "}:{" "}
              <span className="text-gradient-strong">un assistant conçu pour votre rôle</span>.
            </>
          }
          description="Choisissez votre profil. La même interface se reconfigure : ce que l'assistant doit atteindre, ce qu'il lit, ce qu'il fait, ce que vous gardez, puis sa journée de travail."
        />

        {/* Profils */}
        <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="tablist" aria-label="Choisir un profil">
          <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
            {PROFILES.map((x, i) => {
              const on = i === index;
              const Icon = x.icon;
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="ai-config-panel"
                  onClick={() => setIndex(i)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[14px] font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                    on ? "border-paper bg-paper text-ink" : "border-border-medium text-text-secondary hover:border-accent-light/50 hover:text-text-primary",
                  )}
                >
                  <Icon size={16} strokeWidth={1.9} className={on ? "text-accent-dark" : "text-accent-light"} aria-hidden />
                  {x.name}
                </button>
              );
            })}
          </div>
        </div>

        <div id="ai-config-panel" role="tabpanel" aria-label={`Rôle : ${p.name}`} className="mt-5 space-y-5">
          {/* 1 · La configuration du rôle */}
          <div className="panel-card overflow-hidden rounded-2xl">
            <div className="p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-light">Objectif</p>
              <Swap k={p.id} instant={instant}>
                <p className="mt-1.5 text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">{p.objective}</p>
              </Swap>
            </div>
            <dl className="grid sm:grid-cols-2 lg:grid-cols-3">
              <Cell label="Entrées" k={p.id} instant={instant} items={p.inputs} />
              <Cell label="Connaissances" k={p.id} instant={instant} items={p.knowledge} />
              <Cell label="L'assistant fait" k={p.id} instant={instant} items={p.does} tone="do" />
              <Cell label="Vous gardez" k={p.id} instant={instant} items={p.keep} tone="keep" />
              <Cell label="Outils" k={p.id} instant={instant} items={p.tools} />
              <Cell label="Mesure" k={p.id} instant={instant} items={p.measures} />
            </dl>
          </div>

          {/* 2 · Le poste de travail du jour */}
          <Swap k={p.id} instant={instant}>
            <Workstation p={p} />
          </Swap>
        </div>
      </div>
    </section>
  );
}

function Cell({ label, items, k, instant, tone }: { label: string; items: string[]; k: string; instant: boolean; tone?: "do" | "keep" }) {
  return (
    <div className="border-t border-border-medium px-5 py-4 sm:border-l sm:px-6 sm:[&:nth-child(2n+1)]:border-l-0 lg:[&:nth-child(2n+1)]:border-l lg:[&:nth-child(3n+1)]:border-l-0">
      <dt className={cn("text-[11px] font-semibold uppercase tracking-[0.16em]", tone === "keep" ? "text-warning" : tone === "do" ? "text-cyan" : "text-text-tertiary")}>{label}</dt>
      <dd className="mt-2">
        <Swap k={k} instant={instant}>
          <ul className="space-y-1">
            {items.map((it) => (
              <li key={it} className="text-[14.5px] leading-snug text-text-primary">
                {it}
              </li>
            ))}
          </ul>
        </Swap>
      </dd>
    </div>
  );
}

// ─── Le poste de travail : surface papier, un vrai écran ────────────────────

function Workstation({ p }: { p: Profile }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-paper text-ink ring-1 ring-ink/10 shadow-[0_40px_80px_-50px_color-mix(in_oklab,var(--color-bg-primary)_100%,transparent)]">
      {/* Barre */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-paper-line-strong bg-gradient-to-b from-paper-3 to-paper-2 px-4 py-2.5">
        <p className="text-[13px] font-semibold">Poste de travail · assistant {p.name.toLowerCase()}</p>
        <p className="hidden items-center gap-1 text-[11px] text-ink-2 md:flex" aria-label="il voit, comprend, prépare, demande votre validation, agit, trace">
          {["voit", "comprend", "prépare", "demande", "agit", "trace"].map((w, i) => (
            <span key={w} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={11} strokeWidth={2} className="text-ink-3" aria-hidden />}
              {w}
            </span>
          ))}
        </p>
        <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">Maquette · données d&apos;exemple</span>
      </div>

      {/* Indicateurs */}
      <div className="grid grid-cols-2 gap-px bg-paper-line lg:grid-cols-4">
        <Kpi label="Objectif du jour" value={p.kpis.goal} small />
        <Kpi label="Tâches en attente" value={String(p.kpis.pending)} />
        <Kpi label="Validations nécessaires" value={String(p.kpis.toValidate)} accent />
        <Kpi label="Temps évité aujourd'hui" value={p.kpis.saved} />
      </div>

      <div className="grid gap-4 bg-paper-2 p-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* File de travail */}
        <div role="group" className="rounded-xl bg-paper p-3.5 ring-1 ring-ink/10" aria-label="File de travail">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2">File de travail</p>
          <ol className="space-y-1.5">
            {p.queue.map((q, i) => {
              const s = STATE[q.state];
              const Icon = s.icon;
              return (
                <li key={q.time + q.text} className={cn("flex items-center gap-2.5 rounded-lg px-2.5 py-2 ring-1 ring-paper-line", i >= 4 && "hidden sm:flex", q.state === "valider" && "ring-warning/40")}>
                  <span className="w-10 shrink-0 font-mono text-[11px] text-ink-3">{q.time}</span>
                  <span className="min-w-0 flex-1 text-[12.5px] leading-snug">{q.text}</span>
                  <span className={cn("inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold", s.className)}>
                    <Icon size={11} strokeWidth={2.25} aria-hidden />
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* À valider par vous */}
        <div role="group" className="rounded-xl bg-paper p-3.5 ring-1 ring-warning/35" aria-label="À valider par vous">
          <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-warning-ink">
            <Bell size={12} strokeWidth={2.25} aria-hidden />
            À valider par vous
          </p>
          <ul className="space-y-2">
            {p.validate.map((v) => (
              <li key={v.what} className="rounded-lg bg-paper-2 px-3 py-2.5 ring-1 ring-paper-line">
                <p className="text-[12.5px] font-semibold">{v.what}</p>
                <p className="mt-0.5 text-[11px] text-ink-2">pourquoi : {v.why}</p>
                <p className="mt-2 flex gap-1.5" aria-hidden>
                  <span className="rounded-md bg-accent-primary px-2 py-1 text-[10.5px] font-semibold text-paper">Valider</span>
                  <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10.5px] font-medium text-ink-2 ring-1 ring-paper-line">
                    <PencilLine size={10} strokeWidth={2} />
                    Modifier
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Ce qu'il a fait seul · sources */}
        <div role="group" className="hidden rounded-xl bg-paper p-3.5 ring-1 ring-ink/10 sm:block" aria-label="Ce qu'il a fait seul">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2">Ce qu&apos;il a fait seul</p>
          <ul className="space-y-1.5">
            {p.alone.map((a) => (
              <li key={a} className="flex items-start gap-2 text-[12.5px] leading-snug">
                <Workflow size={12} strokeWidth={2} className="mt-0.5 shrink-0 text-success-ink" aria-hidden />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div role="group" className="hidden rounded-xl bg-paper p-3.5 ring-1 ring-ink/10 sm:block" aria-label="Sources utilisées">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2">Sources utilisées</p>
          <ul className="space-y-1.5">
            {p.sources.map((s) => (
              <li key={s} className="flex items-center gap-2 text-[12.5px]">
                <BookOpen size={12} strokeWidth={2} className="shrink-0 text-accent-dark" aria-hidden />
                <span className="truncate">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Journal */}
      <p className="flex items-center gap-2 border-t border-paper-line-strong bg-paper px-4 py-2.5 text-[12px] text-ink-2">
        <History size={13} strokeWidth={2} aria-hidden />
        <span className="font-semibold text-ink">Journal complet</span>
        chaque action lue, proposée, validée ou exécutée est enregistrée et se relit.
      </p>
    </div>
  );
}

function Kpi({ label, value, small, accent }: { label: string; value: string; small?: boolean; accent?: boolean }) {
  return (
    <div className="bg-paper px-4 py-3">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">{label}</p>
      <p className={cn("mt-1 font-semibold leading-tight", small ? "text-[13.5px]" : "text-[22px]", accent ? "text-warning-ink" : "text-ink")}>{value}</p>
    </div>
  );
}
