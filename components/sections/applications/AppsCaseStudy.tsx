"use client";

import { motion, type Variants } from "motion/react";
import { ArrowDown, ArrowRight, Check, Info, Smartphone, LayoutDashboard, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { Checklist, MiniTable } from "@/components/shared/mockup/AppMockup";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { FIELD_CHECKS, OFFICE_ROWS } from "@/components/sections/home/homeProofTelecomData";
import { CASE } from "./appsPageData";

/**
 * /applications, section H (sombre) : un cas concret, raconté en trois temps.
 * Avant (ce qui coinçait) → ce que j'ai construit (deux espaces, montrés en interfaces
 * papier) → après (ce qui a changé), puis les gains visibles. Mêmes faits que la preuve
 * de l'accueil, rien d'ajouté ; interfaces reconstituées avec des données d'exemple.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const list: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } } };
const rise: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } };
const INSTANT = { duration: 0 };
const RISE_STILL: Variants = { hidden: rise.hidden, visible: { opacity: 1, y: 0, transition: INSTANT } };

const SHEET =
  "0 1px 2px color-mix(in oklab, var(--color-bg-primary) 65%, transparent), 0 18px 34px -22px color-mix(in oklab, var(--color-bg-primary) 92%, transparent)";

export function AppsCaseStudy() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const R = instant ? RISE_STILL : rise;

  return (
    <section className="section-shell-tight relative isolate overflow-hidden" aria-labelledby="apps-case-heading">
      <SectionFluidBackdrop variant="appsCase" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="apps-case-heading"
          label="Un cas concret"
          title={
            <>
              Des rapports papier{" "}
              <span className="text-gradient-strong">à une plateforme utilisée chaque jour</span>.
            </>
          }
          description={CASE.context}
        />

        <motion.div
          className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_auto_minmax(0,1.5fr)_auto_minmax(0,0.85fr)] lg:items-stretch lg:gap-3"
          variants={instant ? { hidden: {}, visible: {} } : list}
          initial="hidden"
          {...(instant ? { animate: "visible" as const } : { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } })}
        >
          {/* Avant */}
          <motion.div variants={R} className="panel-card rounded-2xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warning">{CASE.before.title}</p>
            <ul className="mt-3.5 space-y-3">
              {CASE.before.lines.map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-text-secondary">
                  <X size={15} strokeWidth={2.25} className="mt-1 shrink-0 text-warning" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
          </motion.div>

          <Arrow />

          {/* Ce que j'ai construit : les deux espaces, en interfaces */}
          <motion.div variants={R} className="panel-card rounded-2xl p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">{CASE.built.title}</p>
            <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-paper p-3.5 text-ink" style={{ boxShadow: SHEET }}>
                <p className="flex items-center gap-2 border-b border-paper-line pb-2 text-[12.5px] font-semibold">
                  <Smartphone size={14} strokeWidth={1.9} className="text-accent-dark" aria-hidden />
                  {CASE.built.spaces[0].title}
                </p>
                <p className="mt-2 text-[11.5px] text-ink-2">{CASE.built.spaces[0].line}</p>
                <div className="mt-3">
                  <Checklist items={FIELD_CHECKS} appearance="quiet" />
                </div>
                <span className="mt-3 flex items-center justify-center rounded-lg bg-accent-dark py-1.5 text-[11px] font-semibold text-paper">
                  Envoyer le rapport
                </span>
              </div>
              <div className="rounded-xl bg-paper p-3.5 text-ink" style={{ boxShadow: SHEET }}>
                <p className="flex items-center gap-2 border-b border-paper-line pb-2 text-[12.5px] font-semibold">
                  <LayoutDashboard size={14} strokeWidth={1.9} className="text-accent-dark" aria-hidden />
                  {CASE.built.spaces[1].title}
                </p>
                <p className="mt-2 text-[11.5px] text-ink-2">{CASE.built.spaces[1].line}</p>
                <div className="mt-3">
                  <MiniTable head={["Intervention", "Statut"]} rows={OFFICE_ROWS.map((r) => ({ ...r, cells: [r.cells[0]] }))} widths="1fr auto" appearance="quiet" />
                </div>
              </div>
            </div>
          </motion.div>

          <Arrow />

          {/* Après */}
          <motion.div variants={R} className="rounded-2xl border border-cyan/35 bg-accent-primary/10 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">{CASE.after.title}</p>
            <ul className="mt-3.5 space-y-3">
              {CASE.after.lines.map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed text-text-primary">
                  <Check size={15} strokeWidth={2.25} className="mt-1 shrink-0 text-cyan" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Les gains visibles */}
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {CASE.gains.map((g) => {
            const Icon = g.icon;
            return (
              <li key={g.label} className="panel-card flex items-center gap-3 rounded-xl px-4 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-paper text-ink" aria-hidden>
                  <Icon size={16} strokeWidth={1.9} />
                </span>
                <span className="text-[15px] font-semibold text-text-primary">{g.label}</span>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 flex items-center gap-1.5 text-[12.5px] text-text-tertiary">
          <Info size={13} strokeWidth={1.9} aria-hidden />
          {CASE.disclaimer}
        </p>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <div aria-hidden className="flex items-center justify-center text-accent-light">
      <ArrowDown size={18} strokeWidth={1.75} className="lg:hidden" />
      <ArrowRight size={18} strokeWidth={1.75} className="hidden lg:block" />
    </div>
  );
}
