"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import {
  CalendarCheck,
  CalendarDays,
  Check,
  Inbox,
  ListChecks,
  Lock,
  MailCheck,
  MousePointer2,
  Search,
  Send,
} from "lucide-react";
import { EASE } from "@/components/shared/mockup/AppMockup";
import { cn } from "@/lib/utils";
import {
  AGENDA_DAYS,
  AGENDA_END,
  AGENDA_HOURS,
  AGENDA_START,
  FICHE_ROWS,
  FORM_FIELDS,
  FORM_MESSAGE,
  INBOX_NEW,
  INBOX_OLD,
  SEARCH_ORIGINS,
  SEARCH_QUERY,
  SEARCH_RESULTS,
  SITE_OFFER,
  SLOT,
  TRACK_STEPS,
  T,
  type WebStep,
} from "./webHeroSceneData";

/**
 * Les objets de la scène du hero de /sites-web : recherche, site, fiche, et les trois
 * outils (boîte de réception, suivi, agenda). Chaque objet lit l'étape courante et
 * `fresh` (vrai quand la scène s'anime : les délais internes ne jouent qu'à ce moment,
 * sinon l'objet s'affiche directement dans son état).
 *
 * Surfaces : papier (tokens paper / ink), filets d'encre, ombres en color-mix.
 * Les panneaux secondaires ont un fini « verre dépoli » obtenu par dégradé
 * semi-opaque et arête claire, sans backdrop-filter (coûteux, et mal rendu dans un
 * plan en preserve-3d).
 */

type Props = { step: WebStep; fresh: boolean };

// ─── Matières ────────────────────────────────────────────────────────────────

export const LIFT_LG =
  "0 2px 4px -1px color-mix(in oklab, var(--color-ink) 20%, transparent), 0 18px 34px -18px color-mix(in oklab, var(--color-ink) 40%, transparent), 0 48px 80px -36px color-mix(in oklab, var(--color-ink) 55%, transparent)";
export const LIFT_MD =
  "0 1px 3px -1px color-mix(in oklab, var(--color-ink) 18%, transparent), 0 10px 20px -10px color-mix(in oklab, var(--color-ink) 30%, transparent), 0 30px 52px -26px color-mix(in oklab, var(--color-ink) 48%, transparent)";
/** Arête claire en haut + filet d'encre : ce qui détache une carte blanche du fond. */
const EDGE_INSET = "inset 0 1px 0 color-mix(in oklab, var(--color-paper) 90%, transparent)";

/** Verre dépoli clair, sans flou : pour les panneaux secondaires. */
const GLASS = "bg-gradient-to-b from-paper/95 via-paper/90 to-paper-2/90";

const ease = (delay: number, duration = 0.4) => ({ duration, delay, ease: EASE });
const at = (fresh: boolean, delay: number) => (fresh ? delay : 0);

function Panel({
  icon,
  title,
  aside,
  glass = false,
  children,
}: {
  icon: ReactNode;
  title: string;
  aside?: ReactNode;
  glass?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("overflow-hidden rounded-xl ring-1 ring-ink/14", glass ? GLASS : "bg-paper")}
      style={{ boxShadow: EDGE_INSET }}
    >
      <div className="flex items-center gap-2 border-b border-paper-line-strong/70 bg-gradient-to-b from-paper-2/80 to-paper-3/60 px-3 py-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-ink text-cyan" aria-hidden>
          {icon}
        </span>
        <p className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-ink">{title}</p>
        {aside}
      </div>
      {children}
    </div>
  );
}

/** Badge d'état sobre : rectangle, icône, encre. */
function Tag({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "accent" | "cyan" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[9.5px] font-semibold",
        tone === "accent" && "bg-accent-primary/12 text-accent-dark",
        tone === "cyan" && "bg-cyan/18 text-ink",
        tone === "ink" && "bg-paper-3 text-ink-2",
      )}
    >
      {children}
    </span>
  );
}

// ─── 1 · Recherche ───────────────────────────────────────────────────────────

export function SearchCard({ step, fresh }: Props) {
  const clicking = step === 1 && fresh;
  // Le résultat s'allume au moment du clic (pas avant) quand la scène s'anime.
  const picked = step >= 1;
  return (
    <Panel glass icon={<Search size={12} strokeWidth={2.25} />} title="Recherche" aside={<span className="shrink-0 text-[9px] text-ink-2">ou {SEARCH_ORIGINS.slice(1).join(", ").toLowerCase()}</span>}>
      <div className="px-3 pt-1.5">
        <p className="flex items-center gap-2 rounded-lg bg-paper px-2.5 py-1 text-[11px] text-ink ring-1 ring-ink/12">
          <Search size={11} strokeWidth={2} className="shrink-0 text-ink-3" aria-hidden />
          <span className="truncate">{SEARCH_QUERY}</span>
        </p>
      </div>
      <ul className="space-y-0.5 p-1.5">
        {SEARCH_RESULTS.map((r) => {
          const on = r.you && picked;
          return (
            <li key={r.url} className="relative rounded-lg px-2.5 py-1">
              {r.you && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-lg bg-cyan/12 ring-1 ring-cyan/50"
                  initial={false}
                  animate={{ opacity: on ? 1 : 0 }}
                  transition={ease(clicking ? T.cursor + T.cursorDuration * 0.5 : 0, 0.35)}
                />
              )}
              <p className="relative truncate text-[9.5px] text-ink-3">{r.url}</p>
              <p className={cn("relative truncate text-[11px] font-semibold", r.you ? "text-accent-dark" : "text-ink-2")}>{r.title}</p>
              {r.you && (
                <motion.span
                  aria-hidden
                  className="absolute bottom-1 right-3 text-ink"
                  initial={false}
                  animate={clicking ? { opacity: [0, 1, 1, 0], x: [16, 0, 0, 0], y: [14, 0, 0, 0], scale: [1, 1, 0.86, 1] } : { opacity: 0 }}
                  transition={clicking ? { duration: T.cursorDuration, times: [0, 0.4, 0.55, 1], delay: T.cursor, ease: EASE } : { duration: 0.2 }}
                >
                  <MousePointer2 size={14} strokeWidth={2} className="fill-paper" />
                </motion.span>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

// ─── 2 et 3 · Le site ────────────────────────────────────────────────────────

export function SiteCard({ step, fresh }: Props) {
  const reading = step === 2;
  const filling = step === 3;
  const filled = step >= 3;
  const sent = step >= 4;
  const confirmed = step >= 7;

  return (
    <div className="overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/16" style={{ boxShadow: EDGE_INSET }}>
      {/* Barre du navigateur */}
      <div className="flex items-center gap-2 border-b border-paper-line-strong bg-gradient-to-b from-paper-3 to-paper-2 px-3 py-1.5">
        <span className="flex gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-ink/15" />
          ))}
        </span>
        <span className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-paper px-2 py-[3px] ring-1 ring-paper-line">
          <Lock size={9} strokeWidth={2.25} className="shrink-0 text-ink-2" aria-hidden />
          <span className="truncate text-[10px] text-ink-2">votresite.fr</span>
        </span>
        <span className="shrink-0 text-[8.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">Maquette</span>
      </div>

      {/* Navigation du site, avec son bouton d'action */}
      <div className="flex items-center justify-between gap-3 bg-ink px-4 py-1.5 text-paper" aria-hidden>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold">
          <span className="h-3.5 w-3.5 rounded bg-gradient-to-br from-cyan to-accent-primary" />
          Votre entreprise
        </span>
        <span className="flex items-center gap-3 text-[9.5px] text-paper/65">
          <span>Offre</span>
          <span>Références</span>
          {/* La prochaine action : elle s'allume en fin de lecture de l'offre */}
          <span className="relative overflow-hidden rounded-md bg-paper/10 px-2 py-1 font-semibold text-paper ring-1 ring-paper/20">
            Demander un devis
            <motion.span
              className="absolute inset-0 grid place-items-center bg-cyan font-semibold text-ink"
              initial={false}
              animate={{ opacity: reading ? 1 : 0 }}
              transition={reading ? ease(at(fresh, T.navCta), 0.45) : { duration: 0.3 }}
            >
              Demander un devis
            </motion.span>
          </span>
        </span>
      </div>

      {/* Bloc d'offre : bleu nuit, dit en une phrase */}
      <div className="bg-ink px-4 pb-3 pt-2 text-paper">
        <p className="text-[15px] font-semibold leading-snug">Votre offre, dite en une phrase.</p>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {SITE_OFFER.map((o, i) => (
            <div key={o.label} className="relative rounded-lg bg-paper/[0.07] px-2 py-1.5 ring-1 ring-paper/12">
              <p className="text-[8.5px] font-semibold uppercase tracking-[0.1em] text-paper/55">{o.label}</p>
              <p className="truncate text-[10.5px] font-semibold">{o.value}</p>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-lg ring-[1.5px] ring-cyan"
                initial={false}
                animate={{ opacity: reading ? 1 : 0 }}
                transition={reading ? ease(at(fresh, T.offer + i * T.offerGap), 0.45) : { duration: 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Le formulaire */}
      <div className="relative bg-gradient-to-b from-paper-2 to-paper-3/70 px-4 py-2.5">
        <div className="relative overflow-hidden rounded-xl bg-paper p-3 ring-1 ring-ink/12" style={{ boxShadow: EDGE_INSET }}>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[11.5px] font-semibold text-ink">Demander un devis ou un rendez-vous</p>
            <span className="text-[9px] text-ink-3">1 min</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
            {FORM_FIELDS.map((f, i) => (
              <Field key={f.label} label={f.label} value={f.value} placeholder={f.placeholder} filled={filled} typing={filling && fresh} delay={T.field + i * T.fieldGap} />
            ))}
          </div>
          <div className="relative mt-1.5 rounded-md bg-paper px-2 py-1.5 ring-1 ring-ink/12">
            <p className="text-[8.5px] font-medium text-ink-2">Message</p>
            <p className="relative text-[10px] leading-snug">
              <span className="invisible">{FORM_MESSAGE}</span>
              <motion.span
                className="absolute inset-0 text-ink"
                initial={false}
                animate={{ opacity: filled ? 1 : 0 }}
                transition={filling && fresh ? ease(T.message, 0.5) : { duration: 0.2 }}
              >
                {FORM_MESSAGE}
              </motion.span>
            </p>
          </div>
          {/* Bouton : inactif tant que le formulaire est vide, puis prêt, puis pressé */}
          <div className="relative mt-1.5 overflow-hidden rounded-lg">
            <div className="flex items-center justify-center gap-1.5 bg-paper-3 py-1.5 text-[10.5px] font-semibold text-ink-3">
              <Send size={11} strokeWidth={2} aria-hidden />
              Envoyer la demande
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-1.5 bg-accent-primary text-[10.5px] font-semibold text-paper"
              initial={false}
              animate={
                filling && fresh
                  ? { opacity: [0, 1, 1, 1], scale: [1, 1, 0.95, 1] }
                  : { opacity: filled ? 1 : 0, scale: 1 }
              }
              transition={filling && fresh ? { duration: T.packet - T.buttonReady + 0.1, times: [0, 0.35, 0.8, 1], delay: T.buttonReady } : { duration: 0.25 }}
            >
              <Send size={11} strokeWidth={2} aria-hidden />
              Envoyer la demande
            </motion.div>
          </div>

          {/* Après l'envoi : accusé de réception, puis confirmation du rendez-vous */}
          <AnimatePresence initial={false}>
            {sent && (
              <motion.div
                key={confirmed ? "confirmed" : "sent"}
                className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-paper px-5 text-center"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={ease(confirmed && fresh ? T.confirmShown : 0.1, 0.45)}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan/20 text-ink ring-1 ring-cyan/50">
                  {confirmed ? <CalendarCheck size={16} strokeWidth={2} aria-hidden /> : <Check size={16} strokeWidth={2.25} aria-hidden />}
                </span>
                <p className="text-[12.5px] font-semibold text-ink">
                  {confirmed ? `Rendez-vous confirmé · ${SLOT.dayLong} ${SLOT.hour}` : "Demande bien reçue"}
                </p>
                <p className="text-[10px] leading-snug text-ink-2">
                  {confirmed ? "Confirmation envoyée par e-mail à Camille." : "Un accusé de réception vient de partir."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  placeholder,
  filled,
  typing,
  delay,
}: {
  label: string;
  value: string;
  placeholder: string;
  filled: boolean;
  typing: boolean;
  delay: number;
}) {
  return (
    <div className="relative min-w-0 rounded-md bg-paper px-2 py-1 ring-1 ring-ink/12">
      <p className="text-[8.5px] font-medium text-ink-2">{label}</p>
      <div className="relative flex items-center gap-1">
        <span className="invisible text-[10px]">·</span>
        <motion.span
          className="absolute inset-0 truncate text-[10px] text-ink-3"
          initial={false}
          animate={{ opacity: filled ? 0 : 1 }}
          transition={typing ? ease(delay + 0.2, 0.15) : { duration: 0.2 }}
        >
          {placeholder}
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center gap-1"
          initial={false}
          animate={{ opacity: filled ? 1 : 0 }}
          transition={typing ? ease(delay + 0.25, 0.35) : { duration: 0.2 }}
        >
          <span className="min-w-0 flex-1 truncate text-[10px] font-semibold text-ink">{value}</span>
          <Check size={10} strokeWidth={2.5} className="shrink-0 text-accent-dark" aria-hidden />
        </motion.span>
      </div>
      {/* Focus : le champ s'allume le temps de sa saisie */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-md ring-[1.5px] ring-accent-primary"
        initial={false}
        animate={typing ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
        transition={typing ? { duration: 0.75, times: [0, 0.15, 0.75, 1], delay } : { duration: 0.2 }}
      />
    </div>
  );
}

// ─── 4 · La fiche demande ────────────────────────────────────────────────────

const FICHE_STATUS: Record<number, string> = { 4: "Nouvelle", 5: "Attribuée", 6: "Rendez-vous", 7: "Rendez-vous" };

export function FicheCard({ step, fresh }: Props) {
  const shaping = step === 4 && fresh;
  return (
    <div className="overflow-hidden rounded-xl bg-paper ring-1 ring-ink/16" style={{ boxShadow: EDGE_INSET }}>
      <div className="flex items-center gap-2 border-b border-cyan/40 bg-cyan/14 px-3 py-2">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold leading-tight text-ink">Fiche demande</p>
          <p className="text-[9.5px] text-ink-2">n° 0142 · depuis le site</p>
        </div>
        <AnimatePresence initial={false} mode="wait">
          <motion.span key={FICHE_STATUS[step] ?? "none"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={ease(0, 0.25)}>
            <Tag tone="accent">{FICHE_STATUS[step] ?? "Nouvelle"}</Tag>
          </motion.span>
        </AnimatePresence>
      </div>
      <dl className="px-3 py-1">
        {FICHE_ROWS.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.key}
              className="relative flex items-center gap-2 border-b border-paper-line py-[7px] last:border-0"
              initial={false}
              animate={{ opacity: step >= 4 ? 1 : 0, x: step >= 4 ? 0 : -8 }}
              transition={shaping ? ease(T.ficheRow + i * T.ficheRowGap, 0.4) : { duration: 0.2 }}
            >
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent-primary/10 text-accent-dark" aria-hidden>
                <Icon size={11} strokeWidth={2} />
              </span>
              <dt className="w-12 shrink-0 text-[10px] text-ink-2">{r.label}</dt>
              <dd className={cn("min-w-0 flex-1 truncate text-[11px] font-semibold", r.strong ? "text-accent-dark" : "text-ink")}>{r.value}</dd>
            </motion.div>
          );
        })}
      </dl>
      <p className="flex items-center gap-1.5 border-t border-paper-line bg-paper-2 px-3 py-1.5 text-[9.5px] font-medium text-ink-2">
        <Check size={10} strokeWidth={2.5} className="text-accent-dark" aria-hidden />
        Complète · source : recherche
      </p>
    </div>
  );
}

// ─── 5 · Boîte de réception ──────────────────────────────────────────────────

const ROW_H = 38;

export function InboxCard({ step, fresh }: Props) {
  const arrived = step >= 5;
  const landing = step === 5 && fresh;
  return (
    <Panel
      glass
      icon={<Inbox size={12} strokeWidth={2.25} />}
      title="Boîte de réception"
      aside={
        <motion.span initial={false} animate={{ opacity: arrived ? 1 : 0 }} transition={ease(at(landing, T.inboxLand + 0.3), 0.3)}>
          <span className="grid h-4 min-w-4 place-items-center rounded-full bg-accent-primary px-1 text-[9px] font-bold text-paper">1</span>
        </motion.span>
      }
    >
      <div className="relative p-1.5" style={{ height: ROW_H * 3 + 12 }}>
        {/* La nouvelle demande arrive en haut, les autres descendent d'un cran */}
        <motion.div
          className="absolute inset-x-1.5 top-1.5"
          initial={false}
          animate={{ opacity: arrived ? 1 : 0, y: arrived ? 0 : -10 }}
          transition={ease(at(landing, T.inboxLand), 0.55)}
        >
          <div className="flex items-center gap-2 rounded-lg border-l-2 border-accent-primary bg-accent-primary/[0.07] px-2 py-1 ring-1 ring-accent-primary/20" style={{ height: ROW_H - 4 }}>
            <Avatar initials={INBOX_NEW.initials} strong />
            <div className="min-w-0 flex-1">
              <p className="flex items-center justify-between gap-1 text-[10px] font-semibold text-ink">
                <span className="truncate">{INBOX_NEW.from}</span>
                <span className="shrink-0 font-mono text-[8.5px] font-normal text-ink-3">{INBOX_NEW.time}</span>
              </p>
              <p className="truncate text-[9px] font-medium text-accent-dark">{INBOX_NEW.owner}</p>
            </div>
          </div>
        </motion.div>
        {INBOX_OLD.map((r, i) => (
          <motion.div
            key={r.from}
            className="absolute inset-x-1.5 top-1.5"
            initial={false}
            animate={{ y: (i + (arrived ? 1 : 0)) * ROW_H }}
            transition={{ type: "spring", bounce: 0.1, visualDuration: 0.6, delay: at(landing, T.inboxLand - 0.2) }}
          >
            <div className="flex items-center gap-2 px-2 py-1" style={{ height: ROW_H - 4 }}>
              <Avatar initials={r.initials} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center justify-between gap-1 text-[10px] font-medium text-ink-2">
                  <span className="truncate">{r.from}</span>
                  <span className="shrink-0 font-mono text-[8.5px] text-ink-3">{r.time}</span>
                </p>
                <p className="truncate text-[9px] text-ink-3">{r.subject}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function Avatar({ initials, strong = false }: { initials: string; strong?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[8.5px] font-bold",
        strong ? "bg-ink text-cyan" : "bg-paper-3 text-ink-2",
      )}
    >
      {initials}
    </span>
  );
}

// ─── 5 à 7 · Suivi des demandes ──────────────────────────────────────────────

export function TrackCard({ step, fresh }: Props) {
  const has = step >= 5;
  return (
    <Panel glass icon={<ListChecks size={12} strokeWidth={2.25} />} title="Suivi des demandes">
      <div className="px-3 py-2">
        <div className="relative mb-2 h-[30px]">
          <motion.p
            className="absolute inset-0 flex items-center rounded-md border border-dashed border-ink/15 px-2 text-[9.5px] text-ink-3"
            initial={false}
            animate={{ opacity: has ? 0 : 1 }}
            transition={ease(0, 0.25)}
          >
            Aucune demande en attente
          </motion.p>
          <motion.div
            className="absolute inset-0 flex items-center justify-between gap-2 rounded-md bg-paper px-2 ring-1 ring-ink/12"
            initial={false}
            animate={{ opacity: has ? 1 : 0 }}
            transition={ease(at(step === 5 && fresh, T.trackRow), 0.4)}
          >
            <span className="truncate text-[10.5px] font-semibold text-ink">Entreprise B</span>
            <span className="shrink-0 text-[9px] text-ink-2">Devis</span>
          </motion.div>
        </div>
        <ol className="relative space-y-[5px]">
          <span aria-hidden className="absolute bottom-2 left-[6.5px] top-2 w-px bg-ink/12" />
          {TRACK_STEPS.map((s, i) => {
            const done = step >= s.at;
            const now = fresh && step === s.at;
            // Chaque case se coche à son moment ; les deux de l'étape 5 l'une après l'autre.
            const lag = !now ? 0 : s.at === 5 ? T.trackCheck[i] ?? T.trackCheck[1] : s.at === 6 ? T.trackCheckAgenda : T.trackCheckClient;
            return (
              <li key={s.label} className="relative flex items-center gap-2">
                <span className="relative grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full bg-paper ring-1 ring-ink/20">
                  <motion.span
                    className="absolute inset-0 grid place-items-center rounded-full bg-accent-primary text-paper"
                    initial={false}
                    animate={{ scale: done ? 1 : 0.4, opacity: done ? 1 : 0 }}
                    transition={now ? { type: "spring", bounce: 0.35, visualDuration: 0.4, delay: lag } : { duration: 0.2 }}
                  >
                    <Check size={8} strokeWidth={3.25} aria-hidden />
                  </motion.span>
                </span>
                <span className={cn("text-[10px] font-semibold transition-colors duration-500", done ? "text-ink" : "text-ink-3")}>{s.label}</span>
                <span className={cn("ml-auto truncate text-[9px] transition-opacity duration-500", done ? "text-ink-2 opacity-100" : "opacity-0")}>
                  {s.detail}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Panel>
  );
}

// ─── 6 · Agenda ──────────────────────────────────────────────────────────────

export function AgendaCard({ step, fresh }: Props) {
  const booked = step >= 6;
  const span = AGENDA_END - AGENDA_START;
  const pos = (start: number, end: number) => ({
    top: `${((start - AGENDA_START) / span) * 100}%`,
    height: `${((end - start) / span) * 100}%`,
  });

  return (
    <Panel glass icon={<CalendarDays size={12} strokeWidth={2.25} />} title="Agenda" aside={<span className="text-[9px] text-ink-2">Cette semaine</span>}>
      <div className="grid grid-cols-[1.4rem_repeat(3,minmax(0,1fr))] gap-x-1 px-2.5 pt-2">
        <span />
        {AGENDA_DAYS.map((d, i) => (
          <p key={d.day} className={cn("pb-1 text-center text-[9px] font-semibold", i === SLOT.dayIndex ? "text-ink" : "text-ink-2")}>
            {d.day}
          </p>
        ))}
        <div className="relative h-[74px]">
          {AGENDA_HOURS.map((h) => (
            <span
              key={h}
              className="absolute right-0.5 -translate-y-1/2 text-[8px] text-ink-3"
              style={{ top: `${((h - AGENDA_START) / span) * 100}%` }}
            >
              {h}h
            </span>
          ))}
        </div>
        {AGENDA_DAYS.map((d, i) => (
          <div key={d.day} className="relative h-[74px] rounded-md bg-paper ring-1 ring-ink/10">
            {d.busy.map((b) => (
              <span
                key={b.label}
                className="absolute inset-x-[3px] truncate rounded-[4px] bg-paper-3 px-1 text-[7.5px] font-medium leading-[13px] text-ink-2"
                style={pos(b.start, b.end)}
              >
                {b.label}
              </span>
            ))}
            {i === SLOT.dayIndex && (
              <>
                <motion.span
                  className="absolute inset-x-[3px] rounded-[4px] border border-dashed border-accent-primary/60"
                  style={pos(SLOT.start, SLOT.end)}
                  initial={false}
                  animate={{ opacity: booked ? 0 : 1 }}
                  transition={{ duration: 0.2, delay: booked && fresh && step === 6 ? T.slot : 0 }}
                />
                <motion.span
                  className="absolute inset-x-[3px] overflow-hidden rounded-[4px] bg-accent-primary px-1 text-[7.5px] font-semibold leading-[13px] text-paper"
                  style={{ ...pos(SLOT.start, SLOT.end), boxShadow: LIFT_MD }}
                  initial={false}
                  animate={booked ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: -8 }}
                  transition={booked && fresh && step === 6 ? { type: "spring", bounce: 0.25, visualDuration: 0.6, delay: T.slot } : { duration: 0.2 }}
                >
                  {SLOT.hour}
                </motion.span>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="relative mt-2 h-[26px] border-t border-paper-line">
        <AnimatePresence initial={false} mode="wait">
          <motion.p
            key={booked ? "booked" : "free"}
            className="absolute inset-0 flex items-center gap-1.5 px-2.5 text-[9.5px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={ease(booked && fresh && step === 6 ? T.slotLabel : 0, 0.35)}
          >
            {booked ? (
              <>
                <CalendarCheck size={11} strokeWidth={2} className="text-accent-dark" aria-hidden />
                <span className="font-semibold text-ink">
                  {SLOT.day} {SLOT.hour} · {SLOT.label}
                </span>
              </>
            ) : (
              <span className="text-ink-2">Jeudi matin : un créneau libre</span>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </Panel>
  );
}

// ─── Transferts : ce qui voyage d'un objet à l'autre ────────────────────────

export function Packet({ kind }: { kind: "request" | "confirm" }) {
  return (
    <span
      className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-[10px] font-semibold text-paper ring-1 ring-paper/10"
      style={{ boxShadow: LIFT_MD }}
    >
      {kind === "request" ? (
        <>
          <Send size={11} strokeWidth={2} className="text-cyan" aria-hidden />
          Demande · Entreprise B
        </>
      ) : (
        <>
          <MailCheck size={11} strokeWidth={2} className="text-cyan" aria-hidden />
          Confirmation · Camille
        </>
      )}
    </span>
  );
}
