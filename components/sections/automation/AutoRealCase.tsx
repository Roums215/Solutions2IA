"use client";

import { motion } from "motion/react";
import { ArrowDown, Bell, History } from "lucide-react";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionFluidBackdrop } from "@/components/shared/SectionFluidBackdrop";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { BRAND_LOGOS, type BrandKey } from "./brandLogos";
import { REAL_CASE } from "./autoPageData";

/**
 * /automatisation, le cas réel (sombre, ancre #mon-flux) : mon propre flux JobPhoning →
 * n8n → Axonaut, en colonne (plus de frise horizontale trop longue). À côté, un journal
 * reconstitué. Aucun indicateur chiffré : c'est la preuve par le fonctionnement.
 * Révélation unique à l'entrée dans l'écran, rien en boucle.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AutoRealCase() {
  const { disableContentMotion: instant } = usePerformanceMode();
  const reveal = (i: number) =>
    ({
      initial: instant ? false : { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: instant ? 0 : 0.5, delay: instant ? 0 : i * 0.12, ease: EASE },
    }) as const;

  return (
    <section id="mon-flux" aria-labelledby="auto-case-heading" className="section-shell-tight relative isolate scroll-mt-24 overflow-hidden">
      <SectionFluidBackdrop variant="flowDark" />
      <div className="section-container">
        <SectionHeading
          centered={false}
          labelStyle="eyebrow"
          id="auto-case-heading"
          label="Un cas réel"
          title={
            <>
              Un flux que <span className="text-gradient-strong">j&apos;utilise moi-même</span>.
            </>
          }
          description="Un appel qualifié met automatiquement à jour mon suivi commercial. Il tourne tous les jours pour ma propre prospection."
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-12">
          {/* Le flux, de haut en bas */}
          <ol className="max-w-2xl">
            <motion.li {...reveal(0)}>
              <Tool brand="jobphoning" name="JobPhoning" tag="Déclencheur">
                Appel qualifié
              </Tool>
            </motion.li>
            <Down />
            <motion.li {...reveal(1)} className="panel-card rounded-2xl p-5 ring-1 ring-cyan/25">
              <ToolHead brand="n8n" name="n8n" tag="Les règles" />
              <ol className="mt-4 grid gap-3 sm:grid-cols-2">
                {REAL_CASE.n8nSteps.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-3 rounded-xl bg-bg-primary/40 px-3.5 py-3 ring-1 ring-border-medium">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan/15 font-mono text-[12px] font-semibold text-cyan">{i + 1}</span>
                    <span>
                      <span className="block text-[15px] font-semibold text-text-primary">{s.title}</span>
                      <span className="block text-[13.5px] leading-snug text-text-secondary">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </motion.li>
            <Down />
            <motion.li {...reveal(2)}>
              <Tool brand="axonaut" name="Axonaut" tag="Fichier clients">
                <span className="flex flex-wrap gap-1.5">
                  {REAL_CASE.axonaut.map((x) => (
                    <span key={x} className="rounded-md bg-bg-primary/50 px-2 py-0.5 text-[13.5px] text-text-primary ring-1 ring-border-medium">
                      {x}
                    </span>
                  ))}
                </span>
              </Tool>
            </motion.li>
            <Down />
            <motion.li {...reveal(3)} className="flex items-center gap-3.5 rounded-2xl border border-border-medium px-5 py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-primary/15 text-accent-light" aria-hidden>
                <Bell size={18} strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Notification</span>
                <span className="block text-[16px] font-semibold text-text-primary">Commercial prévenu</span>
              </span>
            </motion.li>
          </ol>

          {/* Le journal, reconstitué */}
          <motion.aside {...reveal(2)} className="self-start overflow-hidden rounded-2xl bg-paper text-ink lg:sticky lg:top-28">
            <div className="flex items-center gap-2.5 border-b border-paper-line px-5 py-3.5">
              <History size={16} strokeWidth={1.9} className="text-accent-dark" aria-hidden />
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-2">Journal</p>
            </div>
            <ol className="divide-y divide-paper-line px-5">
              {REAL_CASE.journal.map((j, i) => (
                <motion.li
                  key={j.text}
                  className="flex items-baseline gap-4 py-3"
                  initial={instant ? false : { opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: instant ? 0 : 0.4, delay: instant ? 0 : 0.5 + i * 0.15, ease: EASE }}
                >
                  <span className="w-11 shrink-0 font-mono text-[12.5px] text-ink-3">{j.time}</span>
                  <span className="text-[15px]">{j.text}</span>
                </motion.li>
              ))}
            </ol>
            <p className="border-t border-paper-line bg-paper-2 px-5 py-2.5 text-[12px] text-ink-3">Reconstitution du fonctionnement.</p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function ToolHead({ brand, name, tag }: { brand: BrandKey; name: string; tag: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-paper p-2" aria-hidden>
        {BRAND_LOGOS[brand].svg}
      </span>
      <span className="text-[17px] font-semibold text-text-primary">{name}</span>
      <span className="ml-auto rounded-full border border-border-medium px-2.5 py-0.5 text-[12px] text-text-tertiary">{tag}</span>
    </div>
  );
}

function Tool({ brand, name, tag, children }: { brand: BrandKey; name: string; tag: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-medium px-5 py-4">
      <ToolHead brand={brand} name={name} tag={tag} />
      <div className="mt-2.5 pl-[3.25rem] text-[15px] text-text-secondary">{children}</div>
    </div>
  );
}

function Down() {
  return (
    <li aria-hidden className="flex h-9 items-center pl-[2.35rem] text-cyan/70">
      <ArrowDown size={16} strokeWidth={1.8} />
    </li>
  );
}
