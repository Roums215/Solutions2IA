"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { ChevronRight, ClipboardCheck, FileText, Info, LayoutDashboard, Paperclip, Send, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Checklist, Draft, EASE, MiniTable, StatusPill } from "@/components/shared/mockup/AppMockup";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import {
  CLIENT_MAIL,
  FIELD_CHECKS,
  OFFICE_ROWS,
  PROOF_BEFORE,
  PROOF_CONTEXT,
  PROOF_DISCLAIMER,
  PROOF_STEPS,
  REPORT_FIELDS,
  type ProofStepId,
} from "./homeProofTelecomData";

/**
 * Première section sombre de l'accueil, juste sous le hero clair : un projet réel,
 * raconté en quatre temps (terrain → rapport saisi → suivi bureau → envoi client).
 *
 * LOT 4C : quatre cartes métier (en-tête numéroté, sous-carte papier de l'objet,
 * phrase de résultat), reliées par de simples flèches. Le fil lumineux à points qui
 * s'allument a disparu. Une seule révélation à l'entrée dans l'écran, aucune boucle.
 * Tier minimal et reduced-motion : rendu final direct.
 */

const STEP_ICON: Record<ProofStepId, LucideIcon> = {
  terrain: ClipboardCheck,
  rapport: FileText,
  bureau: LayoutDashboard,
  client: Send,
};

/** Une nuance de bleu par étape : bleu-gris, bleu moyen, indigo, bleu clair. */
const STEP_COLOR: Record<ProofStepId, string> = {
  terrain: "color-mix(in oklab, var(--color-accent-primary) 40%, var(--color-text-tertiary))",
  rapport: "color-mix(in oklab, var(--color-accent-primary) 70%, var(--color-cyan))",
  bureau: "var(--color-accent-light)",
  client: "var(--color-cyan)",
};

// Les quatre cartes se révèlent l'une après l'autre, dans l'ordre du récit.
const LIST_DELAY = 0.05;
const STAGGER = 0.14;
const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER, delayChildren: LIST_DELAY } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
// Tier minimal / reduced-motion : mêmes états, passage immédiat à l'état final.
// (Le HTML serveur part de « hidden » : il faut l'amener à « visible », pas l'ignorer.)
const INSTANT = { duration: 0 };
const still = (v: Variants): Variants => ({ ...v, visible: { ...(v.visible as object), transition: INSTANT } });
const LIST_STILL: Variants = { hidden: {}, visible: {} };

export function HomeProofTelecom() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const v = (variants: Variants) => (instant ? still(variants) : variants);

  return (
    // section-shell-tight : moins de vide sombre sous le bord arrondi du hero clair.
    <section className="section-shell-tight relative isolate overflow-hidden" aria-labelledby="preuve-telecom-titre">
      {/* Une même bande traverse les quatre cartes. */}
      <SectionFluidBackdrop variant="proof" />
      <div className="section-container">
        {/* Titre et récit groupés : les quatre étapes restent proches de leur titre,
            hors de l'espacement global entre blocs de section. */}
        <div>
          <div className="grid gap-2 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <SectionHeading
                centered={false}
          labelStyle="eyebrow"
                id="preuve-telecom-titre"
                label="Un exemple concret"
                title={<>Des rapports papier à la <span className="text-gradient-strong">plateforme web</span></>}
                description="Un projet que j'ai construit et qui sert tous les jours, dans les télécoms."
              />
            </div>
            <div className="lg:col-span-5 lg:pb-16">
              <div className="border-l border-border-medium pl-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">Avant</p>
                <p className="mt-2 text-base leading-relaxed text-text-secondary">{PROOF_BEFORE}</p>
              </div>
            </div>
          </div>

          {/* Quatre cartes métier reliées par des flèches : pas de fil animé. */}
          <motion.ol
            className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:mt-9 lg:grid-cols-4 lg:gap-5"
            variants={instant ? LIST_STILL : list}
            initial="hidden"
            {...(instant
              ? { animate: "visible" }
              : { whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
          >
            {PROOF_STEPS.map((step, i) => {
              const Icon = STEP_ICON[step.id];
              return (
                <motion.li key={step.id} className="relative" variants={v(item)}>
                  {/* Le connecteur porte la couleur de l'étape qu'il alimente : il fait
                      partie du parcours, il n'est pas posé à côté (LOT 4G). */}
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rotate-90 sm:-left-3.5 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:rotate-0"
                      style={{ color: `color-mix(in oklab, ${STEP_COLOR[step.id]} 60%, var(--color-text-tertiary))` }}
                    >
                      <ChevronRight size={18} strokeWidth={2.25} />
                    </span>
                  )}

                  {/* LOT 4G : trois zones lisibles dans la carte. En-tête éclairé et teinté,
                      corps qui porte l'objet métier, pied assombri qui porte le résultat. */}
                  <div className="panel-card relative flex h-full flex-col overflow-hidden rounded-2xl">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 z-10 h-[3px]"
                      style={{ backgroundColor: `color-mix(in oklab, ${STEP_COLOR[step.id]} 72%, transparent)` }}
                    />
                    <div
                      className="panel-head flex items-center gap-2.5 px-4 py-3.5"
                      style={{ backgroundColor: `color-mix(in oklab, ${STEP_COLOR[step.id]} 10%, transparent)` }}
                    >
                      <span
                        aria-hidden
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg ring-1 ring-inset ring-white/10"
                        style={{
                          backgroundColor: `color-mix(in oklab, ${STEP_COLOR[step.id]} 20%, transparent)`,
                          color: STEP_COLOR[step.id],
                        }}
                      >
                        <Icon size={15} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[11px] text-text-tertiary" aria-hidden>
                        0{i + 1}
                      </span>
                      <h3 className="text-[15px] font-semibold tracking-tight">{step.title}</h3>
                    </div>

                    {/* Sous-carte : l'objet métier, sur surface papier */}
                    <div className="px-4 pb-4 pt-4 text-ink">
                      <Vignette id={step.id} />
                    </div>

                    <p className="panel-foot mt-auto px-4 py-3.5 text-[13px] leading-relaxed text-text-secondary">
                      {step.text}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-secondary">{PROOF_CONTEXT}</p>
          <p className="inline-flex items-center gap-2 text-xs text-text-tertiary">
            <Info className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
            {PROOF_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Les quatre vignettes (surface papier, briques d'AppMockup) ─────────────

/** La feuille de papier est posée sur la carte sombre : ombre de contact, puis portée. */
const SHEET_LIFT =
  "0 1px 2px color-mix(in oklab, var(--color-bg-primary) 65%, transparent), 0 18px 34px -22px color-mix(in oklab, var(--color-bg-primary) 92%, transparent)";

function Sheet({ title, aside, children }: { title: string; aside: string; children: ReactNode }) {
  return (
    <div className="h-full rounded-xl bg-paper p-4" style={{ boxShadow: SHEET_LIFT }}>
      <div className="mb-3.5 flex items-baseline justify-between gap-3 border-b border-paper-line pb-2.5">
        <p className="text-[12px] font-semibold text-ink">{title}</p>
        <span className="shrink-0 text-[10px] text-ink-3">{aside}</span>
      </div>
      {children}
    </div>
  );
}

function Vignette({ id }: { id: ProofStepId }) {
  switch (id) {
    case "terrain":
      return (
        <Sheet title="Intervention" aside="sur place">
          <Checklist items={FIELD_CHECKS} appearance="quiet" />
          <span className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-accent-dark py-2 text-center text-[11px] font-semibold text-paper">
            Envoyer le rapport
          </span>
        </Sheet>
      );
    case "rapport":
      return (
        <Sheet title="Rapport d'intervention" aside="saisi une fois">
          <dl className="divide-y divide-paper-line">
            {REPORT_FIELDS.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-3 py-1.5 first:pt-0">
                <dt className="text-[11px] text-ink-3">{f.label}</dt>
                <dd className="text-[11.5px] font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3">
            <StatusPill tone="ok" appearance="quiet">Enregistré</StatusPill>
          </div>
        </Sheet>
      );
    case "bureau":
      return (
        <Sheet title="Activité du jour" aside="tableau de bord">
          <MiniTable head={["Intervention", "Technicien"]} rows={OFFICE_ROWS} widths="1.15fr 0.85fr auto" appearance="quiet" />
        </Sheet>
      );
    case "client":
      return (
        <Sheet title="Mail au client" aside="envoyé tout seul">
          <Draft mail={CLIENT_MAIL} appearance="quiet" />
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-paper-2 px-2.5 py-1.5 text-[10.5px] font-medium text-ink-2">
            <Paperclip size={12} aria-hidden />
            rapport-intervention.pdf
          </span>
        </Sheet>
      );
  }
}
