"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { CalendarCheck, Check, Inbox, ListChecks, Lock, MailCheck, Search, Send } from "lucide-react";
import { EASE } from "@/components/shared/mockup/AppMockup";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import {
  FICHE_ROWS,
  FORM_FIELDS,
  FORM_MESSAGE,
  INBOX_NEW,
  SEARCH_QUERY,
  SITE_OFFER,
  SLOT,
  WEB_MOBILE_STEPS,
} from "./webHeroSceneData";

/**
 * Le récit du hero de /sites-web, recomposé pour le téléphone : quatre moments lus de
 * haut en bas, un objet par moment, du texte à taille de lecture. Ce n'est pas la
 * scène desktop réduite. Chaque moment se révèle à son entrée dans l'écran, puis son
 * contenu se remplit (champs, lignes de fiche, étapes du suivi). Tier minimal et
 * reduced-motion : rendu final immédiat.
 */

const CARD_SHADOW =
  "inset 0 1px 0 color-mix(in oklab, var(--color-paper) 90%, transparent), 0 1px 3px -1px color-mix(in oklab, var(--color-ink) 18%, transparent), 0 20px 38px -26px color-mix(in oklab, var(--color-ink) 48%, transparent)";

const stage: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, staggerChildren: 0.12, delayChildren: 0.25 } },
};
const line: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
};
const INSTANT = { duration: 0 };
const STAGE_STILL: Variants = { hidden: stage.hidden, visible: { opacity: 1, y: 0, transition: INSTANT } };
const LINE_STILL: Variants = { hidden: line.hidden, visible: { opacity: 1, x: 0, transition: INSTANT } };

export function WebHeroSceneMobile({ className }: { className?: string }) {
  const { disableContentMotion: still } = usePerformanceMode();
  const L = still ? LINE_STILL : line;

  return (
    <div className={cn("relative", className)}>
      <ol className="relative space-y-7">
        {/* Le fil qui relie les quatre moments */}
        <span aria-hidden className="absolute bottom-10 left-[1.0625rem] top-6 w-px bg-gradient-to-b from-accent-primary/40 via-accent-primary/25 to-cyan/40" />

        {/* 1 · trouvé, puis compris */}
        <Stage n={1} still={still}>
          <Card className="overflow-hidden p-0">
            <p className="flex items-center gap-2 border-b border-paper-line bg-paper-2 px-3.5 py-2.5 text-[13px] text-ink-2">
              <Search size={14} strokeWidth={2} className="shrink-0" aria-hidden />
              <span className="truncate">{SEARCH_QUERY}</span>
            </p>
            <div className="bg-ink px-4 pb-4 pt-3 text-paper">
              <p className="flex items-center gap-1.5 text-[11.5px] text-paper/65">
                <Lock size={10} strokeWidth={2.25} aria-hidden />
                votresite.fr
              </p>
              <p className="mt-1.5 text-[16px] font-semibold leading-snug">Votre offre, dite en une phrase.</p>
              <ul className="mt-3 grid grid-cols-3 gap-1.5">
                {SITE_OFFER.map((o) => (
                  <motion.li key={o.label} variants={L} className="rounded-lg bg-paper/[0.07] px-2 py-1.5 ring-1 ring-paper/15">
                    <span className="block text-[9.5px] font-semibold uppercase tracking-[0.08em] text-paper/60">{o.label}</span>
                    <span className="block text-[12px] font-semibold leading-tight">{o.value}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Card>
        </Stage>

        {/* 2 · la demande part, avec les informations utiles */}
        <Stage n={2} still={still}>
          <Card>
            <ul className="divide-y divide-paper-line rounded-xl ring-1 ring-ink/12">
              {FORM_FIELDS.map((f) => (
                <motion.li key={f.label} variants={L} className="flex items-center gap-2 px-3 py-2">
                  <span className="w-[5.5rem] shrink-0 text-[11.5px] text-ink-2">{f.label}</span>
                  <span className="min-w-0 flex-1 truncate text-right text-[13px] font-semibold text-ink">{f.value}</span>
                  <Check size={12} strokeWidth={2.5} className="shrink-0 text-accent-dark" aria-hidden />
                </motion.li>
              ))}
            </ul>
            <motion.p variants={L} className="mt-2 rounded-lg bg-paper-2 px-2.5 py-2 text-[13px] leading-[1.5] text-ink">
              {FORM_MESSAGE}
            </motion.p>
            <motion.p variants={L} className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-accent-primary py-2.5 text-[13.5px] font-semibold text-paper">
              <Send size={14} strokeWidth={2} aria-hidden />
              Demande envoyée
            </motion.p>
          </Card>
        </Stage>

        {/* 3 · la fiche structurée */}
        <Stage n={3} still={still}>
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between gap-2 border-b border-cyan/40 bg-cyan/14 px-4 py-2.5">
              <p className="text-[14px] font-semibold text-ink">Fiche demande</p>
              <span className="rounded-md bg-accent-primary/12 px-1.5 py-0.5 text-[11px] font-semibold text-accent-dark">Nouvelle</span>
            </div>
            <dl className="px-4 py-1">
              {FICHE_ROWS.map((r) => {
                const Icon = r.icon;
                return (
                  <motion.div key={r.key} variants={L} className="flex items-center gap-2.5 border-b border-paper-line py-2.5 last:border-0">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent-primary/10 text-accent-dark" aria-hidden>
                      <Icon size={14} strokeWidth={2} />
                    </span>
                    <dt className="w-16 shrink-0 text-[12px] text-ink-2">{r.label}</dt>
                    <dd className="min-w-0 flex-1 truncate text-[14px] font-semibold text-ink">{r.value}</dd>
                  </motion.div>
                );
              })}
            </dl>
          </Card>
        </Stage>

        {/* 4 · le bon endroit, puis la suite */}
        <Stage n={4} still={still}>
          <Card>
            <ul className="divide-y divide-paper-line">
              <Line L={L} icon={<Inbox size={16} aria-hidden />} label="Dans la bonne boîte" sub={INBOX_NEW.owner} />
              <Line L={L} icon={<ListChecks size={16} aria-hidden />} label="Entrée dans le suivi" sub="Reçue · attribuée · rendez-vous" />
              <Line
                L={L}
                icon={<CalendarCheck size={16} aria-hidden />}
                label={`${SLOT.dayLong.charAt(0).toUpperCase()}${SLOT.dayLong.slice(1)} ${SLOT.hour}`}
                sub="Créneau posé dans l'agenda"
              />
              <Line L={L} icon={<MailCheck size={16} aria-hidden />} label="Client prévenu" sub="Confirmation envoyée par e-mail" />
            </ul>
          </Card>
        </Stage>
      </ol>
      <p className="mt-4 pl-11 text-[12px] text-ink-3">Maquette · données d&apos;exemple</p>
    </div>
  );
}

function Stage({ n, still, children }: { n: number; still: boolean; children: ReactNode }) {
  const s = WEB_MOBILE_STEPS[n - 1];
  return (
    <motion.li
      className="relative pl-11"
      variants={still ? STAGE_STILL : stage}
      initial="hidden"
      {...(still ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true, margin: "-40px" } })}
    >
      <span
        className="absolute left-0 top-0 grid h-[2.125rem] w-[2.125rem] place-items-center rounded-lg bg-ink font-mono text-[12px] font-semibold text-cyan"
        style={{ boxShadow: "0 6px 14px -8px color-mix(in oklab, var(--color-ink) 70%, transparent)" }}
      >
        0{n}
      </span>
      <p className="pt-0.5 text-[16px] font-semibold leading-snug text-ink">{s.title}</p>
      <p className="mt-0.5 text-[13.5px] leading-snug text-ink-2">{s.line}</p>
      <div className="mt-3">{children}</div>
    </motion.li>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-paper p-4 ring-1 ring-ink/14", className)} style={{ boxShadow: CARD_SHADOW }}>
      {children}
    </div>
  );
}

function Line({ L, icon, label, sub }: { L: Variants; icon: ReactNode; label: string; sub: string }) {
  return (
    <motion.li variants={L} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-cyan">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-semibold text-ink">{label}</span>
        <span className="block text-[12.5px] text-ink-2">{sub}</span>
      </span>
      <Check size={15} strokeWidth={2.5} className="shrink-0 text-accent-dark" aria-hidden />
    </motion.li>
  );
}
