"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { BookOpen, CalendarCheck, History, UserPlus } from "lucide-react";
import { EASE } from "@/components/shared/mockup/AppMockup";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import { CLIENT_MESSAGE, CLIENT_SIGNATURE, MEMORY, MOBILE_STEPS, REPLY_MESSAGE } from "./heroSceneData";

/**
 * Le même récit que la scène desktop, recomposé pour le téléphone : quatre temps
 * lus de haut en bas, un objet par temps, du texte à taille de lecture.
 * Révélation unique à l'entrée dans l'écran (pas de boucle) ; tier minimal et
 * reduced-motion : rendu final immédiat.
 */

// LOT 4G : ombre de contact + ombre portée, comme les objets de la scène desktop.
const CARD_SHADOW =
  "0 1px 3px -1px color-mix(in oklab, var(--color-ink) 18%, transparent), 0 20px 38px -26px color-mix(in oklab, var(--color-ink) 48%, transparent)";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const rail: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.4, ease: EASE, delay: 0.2 } },
};

// Tier minimal / reduced-motion : mêmes états, passage immédiat à l'état final.
// (Le HTML serveur part de « hidden » : il faut l'amener à « visible », pas l'ignorer.)
const INSTANT = { duration: 0 };
const toStill = (v: Variants): Variants => ({ ...v, visible: { ...(v.visible as object), transition: INSTANT } });
const LIST_STILL: Variants = { hidden: {}, visible: {} };
const ITEM_STILL = toStill(item);
const RAIL_STILL = toStill(rail);

export function HeroSceneMobile({ className }: { className?: string }) {
  const { disableContentMotion } = usePerformanceMode();
  const still = disableContentMotion;

  return (
    <div className={cn("relative", className)}>
      <motion.ol
        className="relative space-y-5"
        variants={still ? LIST_STILL : list}
        initial="hidden"
        {...(still ? { animate: "visible" } : { whileInView: "visible", viewport: { once: true, margin: "-60px" } })}
      >
        {/* Le fil qui relie les quatre temps */}
        <motion.span
          aria-hidden
          className="absolute bottom-8 left-[1.0625rem] top-5 w-px bg-accent-primary/30"
          style={{ originY: 0 }}
          variants={still ? RAIL_STILL : rail}
        />

        <Stage n={1} title={MOBILE_STEPS[0].title} still={still}>
          <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-accent-primary px-4 py-3 text-[14px] leading-[1.5] text-paper">
            {CLIENT_MESSAGE.map((seg, i) => (
              <span key={i} className={seg.key ? "font-semibold" : undefined}>
                {seg.text}
              </span>
            ))}
            <span className="mt-1.5 block text-[12px] text-paper/80">{CLIENT_SIGNATURE}</span>
          </div>
        </Stage>

        <Stage n={2} title={MOBILE_STEPS[1].title} still={still}>
          <Card>
            <dl className="divide-y divide-paper-line">
              <div className="flex items-baseline justify-between gap-3 pb-2">
                <dt className="text-[12px] text-ink-2">Besoin</dt>
                <dd className="text-[13.5px] font-semibold text-ink">Devis chaudière</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 pt-2">
                <dt className="text-[12px] text-ink-2">Quand</dt>
                <dd className="text-[13.5px] font-semibold text-ink">Jeudi après-midi</dd>
              </div>
            </dl>
            <p className="mt-3 flex items-start gap-2 border-t border-paper-line pt-3 text-[13px] leading-snug text-ink-2">
              <BookOpen size={16} className="mt-0.5 shrink-0 text-accent-dark" aria-hidden />
              <span>
                Votre règle : {MEMORY.rules[0].toLowerCase()}, {MEMORY.rules[1].charAt(0).toLowerCase() + MEMORY.rules[1].slice(1)}.
              </span>
            </p>
          </Card>
        </Stage>

        <Stage n={3} title={MOBILE_STEPS[2].title} still={still}>
          <Card>
            <ul className="divide-y divide-paper-line">
              <Line icon={<UserPlus size={16} aria-hidden />} label="Camille Laurent" sub="Nouvelle fiche client" />
              <Line icon={<CalendarCheck size={16} aria-hidden />} label={"Jeudi 14\u00a0h\u00a030"} sub="Visite pour le devis" />
            </ul>
          </Card>
        </Stage>

        <Stage n={4} title={MOBILE_STEPS[3].title} still={still}>
          <Card>
            <div className="rounded-2xl rounded-bl-md bg-paper-2 px-3.5 py-2.5 text-[13.5px] leading-[1.5] text-ink">
              {REPLY_MESSAGE}
            </div>
            <p className="mt-3 flex items-center gap-2 border-t border-paper-line pt-3 text-[13px] text-ink-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-paper-2 text-ink-2" aria-hidden>
                <History size={13} strokeWidth={1.75} />
              </span>
              Historique mis à jour
            </p>
          </Card>
        </Stage>
      </motion.ol>
      <p className="mt-4 pl-11 text-[12px] text-ink-3">Maquette · données d&apos;exemple</p>
    </div>
  );
}

function Stage({ n, title, still, children }: { n: number; title: string; still: boolean; children: ReactNode }) {
  return (
    <motion.li className="relative pl-11" variants={still ? ITEM_STILL : item}>
      <span
        className="absolute left-0 top-0 grid h-[2.125rem] w-[2.125rem] place-items-center rounded-lg border border-paper-line-strong bg-paper font-mono text-[12px] font-semibold text-accent-dark"
        style={{ boxShadow: "0 1px 2px -1px color-mix(in oklab, var(--color-ink) 20%, transparent)" }}
      >
        0{n}
      </span>
      <p className="pt-1.5 text-[15px] font-semibold leading-snug text-ink">{title}</p>
      <div className="mt-2.5">{children}</div>
    </motion.li>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-paper p-4 ring-1 ring-paper-line-strong" style={{ boxShadow: CARD_SHADOW }}>
      {children}
    </div>
  );
}

function Line({ icon, label, sub }: { icon: ReactNode; label: string; sub: string }) {
  return (
    <li className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-primary/12 text-accent-dark">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[14px] font-semibold text-ink">{label}</span>
        <span className="block text-[12.5px] text-ink-2">{sub}</span>
      </span>
    </li>
  );
}
