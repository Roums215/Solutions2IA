"use client";

import { AnimatePresence, motion, type Transition } from "motion/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { BookOpenText, CalendarCheck, CalendarDays, ClipboardCheck, Pause, Play } from "lucide-react";
import { EASE, Feed, FilledForm, Panel, StatusPill } from "@/components/shared/mockup/AppMockup";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import {
  AGENDA_DAYS,
  APP_ACTIVITY,
  AGENDA_END,
  AGENDA_HOURS,
  AGENDA_START,
  BOOKING,
  CLIENT_MESSAGE,
  CLIENT_SIGNATURE,
  FICHE_FIELDS,
  FINAL_STEP,
  HISTORY,
  IDLE_STEP,
  MEMORY,
  REPLY_MESSAGE,
  SCENE_LABEL,
  SCENE_SHORT,
  SCENE_STEPS,
  UNDERSTOOD,
  type Step,
} from "./heroSceneData";

/**
 * Scène narrative 2.5D du hero de l'accueil (desktop et tablette, ≥ md).
 *
 * Composée sur un plan fixe de 820 × 620 px, mis à l'échelle de sa colonne en CSS pur
 * (`tan(atan2(100cqw, 820px))` = largeur du conteneur / 820, sans JS ni mesure).
 * Une horloge à étapes (setTimeout, pas de rAF) fait avancer le storyboard ; chaque
 * objet lit sa pose dans une table et Motion anime transform / opacity uniquement.
 * Deux ou trois objets au plus ont le premier plan à chaque étape.
 *
 * Tiers : full = plan incliné en 2.5D (translateZ réels) ; reduced = même récit, à plat ;
 * minimal et prefers-reduced-motion = image finale fixe, qui raconte toute l'histoire.
 * Pause hors écran (PauseOffscreen), onglet masqué, ou bouton pause.
 */

const W = 820;
const H = 620;
/** Durée de l'état de repos entre deux boucles (la scène se vide, puis tout recommence). */
const IDLE_DURATION = 1100;

// 2.5D réservée au tier full. data-perf est posé avant le premier paint (layout.tsx) :
// aucun saut à l'hydratation, et le tier reduced reçoit le même récit à plat.
const DEPTH_VIEW = "[html[data-perf=full]_&]:[perspective:1900px] [html[data-perf=full]_&]:[perspective-origin:58%_42%]";
const DEPTH_PLANE =
  "[html[data-perf=full]_&]:[transform-style:preserve-3d] [html[data-perf=full]_&]:[transform:rotateX(6deg)_rotateY(-9deg)]";

// Ombres de profondeur, en tokens (encre transparente).
// LOT 4B : ombres et bordures un cran plus marquées. Sur le papier clair du hero, les
// objets se confondaient avec le fond ; référence de lisibilité = les maquettes papier
// de HomeProofTelecom, qui sont posées sur du sombre.
// LOT 4G : trois couches au lieu de deux (contact, portée, diffuse). C'est l'ombre de
// contact, très courte, qui fait qu'un objet est « posé » et non « collé ».
const LIFT_LG =
  "0 2px 4px -1px color-mix(in oklab, var(--color-ink) 22%, transparent), 0 18px 34px -18px color-mix(in oklab, var(--color-ink) 42%, transparent), 0 48px 80px -36px color-mix(in oklab, var(--color-ink) 58%, transparent)";
const LIFT_MD =
  "0 1px 3px -1px color-mix(in oklab, var(--color-ink) 20%, transparent), 0 10px 20px -10px color-mix(in oklab, var(--color-ink) 34%, transparent), 0 30px 52px -26px color-mix(in oklab, var(--color-ink) 52%, transparent)";
/** Filet d'encre autour des objets posés : sans lui, blanc sur blanc. */
const EDGE = "ring-1 ring-ink/16";

const MOVE: Transition = {
  default: { type: "spring", bounce: 0.1, visualDuration: 0.85 },
  opacity: { duration: 0.55, ease: EASE },
};
/** Transfert : l'objet part d'abord vers sa destination, puis s'efface en y arrivant. */
const HANDOFF: Transition = {
  default: { type: "spring", bounce: 0, visualDuration: 0.95 },
  opacity: { duration: 0.45, delay: 0.5, ease: EASE },
};

// ─── Poses par étape ─────────────────────────────────────────────────────────
// Index = étape (0 repos, 1 demande … 7 historique). z n'a d'effet qu'en tier full.

type Pose = { opacity: number; x: number; y: number; z: number; scale: number };
const p = (opacity: number, x = 0, y = 0, z = 0, scale = 1): Pose => ({ opacity, x, y, z, scale });

// LOT 4G : le plancher d'opacité remonte. Un objet en arrière-plan doit rester un
// objet (bordure, ombre, contenu lisibles) : c'est le recul en z et l'échelle qui le
// mettent au second plan, pas un fondu qui le délave.
const APP: Pose[] = [
  p(0.9, 0, 8, -40, 0.97),
  p(0.86, 0, 8, -40, 0.97),
  p(0.86, 0, 8, -40, 0.97),
  p(0.86, 0, 8, -40, 0.97),
  p(1),
  p(1),
  p(0.94, 0, 4, -24, 0.985),
  p(1),
];
const PHONE: Pose[] = [
  p(1, 0, 0, 30),
  p(1, 0, 0, 50),
  p(1, 0, 0, 50),
  p(0.72, -6, 6, 0, 0.97),
  p(0.62, -10, 10, -20, 0.95),
  p(0.62, -10, 10, -20, 0.95),
  p(1, 0, 0, 50),
  p(1, 0, 0, 30),
];
const UNDERSTAND_HIDDEN = p(0, -54, 26, 40, 0.94);
const UNDERSTAND_SENT = p(0, 70, 190, 0, 0.6); // aspirée dans la fiche client
const UNDERSTAND: Pose[] = [
  UNDERSTAND_HIDDEN,
  UNDERSTAND_HIDDEN,
  p(1, 0, 0, 90),
  p(1, 0, 0, 90),
  UNDERSTAND_SENT,
  UNDERSTAND_SENT,
  UNDERSTAND_SENT,
  UNDERSTAND_SENT,
];
const MEMORY_HIDDEN = p(0, 44, -30, -60, 0.95);
const MEMORY_SENT = p(0, -30, -8, 20, 0.96); // s'efface vers la demande, qui part seule dans la fiche
const MEMORY_POSE: Pose[] = [
  MEMORY_HIDDEN,
  MEMORY_HIDDEN,
  MEMORY_HIDDEN,
  p(1, 0, 0, 70),
  MEMORY_SENT,
  MEMORY_HIDDEN,
  MEMORY_HIDDEN,
  MEMORY_HIDDEN,
];

type View = "agenda" | "fiche" | "history";
const VIEW: View[] = ["agenda", "agenda", "agenda", "agenda", "fiche", "agenda", "agenda", "history"];
const TAB: Record<View, number> = { fiche: 0, agenda: 1, history: 2 };

// Liaisons, en coordonnées du plan : téléphone → demande comprise, mémoire → demande.
const PATH_PHONE_TO_UNDERSTAND = "M 228 214 C 262 214, 258 118, 290 112";
const PATH_MEMORY_TO_UNDERSTAND = "M 640 262 C 640 232, 590 222, 552 214";

// ─── Scène ───────────────────────────────────────────────────────────────────

// Montée après l'hydratation (chunk client seul) : un fondu CSS suffit à son entrée.
export function HeroScene() {
  return (
    <PauseOffscreen className="hero-enter-fade absolute inset-0">
      <Stage />
    </PauseOffscreen>
  );
}

function Stage() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const offscreen = useInViewPause();
  const [step, setStep] = useState<Step>(IDLE_STEP);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const animated = mounted && !disableContentMotion;
  const running = animated && !offscreen && !userPaused && !tabHidden;
  const shown: Step = animated ? step : FINAL_STEP;

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // Horloge à étapes : une seule minuterie vivante, relancée à chaque étape.
  useEffect(() => {
    if (!running) return;
    const duration = step === IDLE_STEP ? IDLE_DURATION : SCENE_STEPS[step - 1].duration;
    const timer = window.setTimeout(() => {
      setStep((s) => (s === FINAL_STEP ? IDLE_STEP : ((s + 1) as Step)));
    }, duration);
    return () => window.clearTimeout(timer);
  }, [running, step]);

  const view = VIEW[shown];

  return (
    <>
      <div
        className="absolute left-0 top-0 origin-top-left [scale:tan(atan2(100cqw,820px))]"
        style={{ width: W, height: H }}
      >
        <div role="img" aria-label={SCENE_LABEL} className={cn("absolute inset-0", DEPTH_VIEW)}>
          <div className={cn("absolute inset-0", DEPTH_PLANE)}>
            {/* Le logiciel de l'entreprise : agenda, fiche client, historique */}
            <Floating pose={APP[shown]} style={{ left: 262, top: 46, width: 540 }} shadow={LIFT_LG} radius={`rounded-2xl ${EDGE}`}>
              <AppFrame view={view} shown={shown}>
                <div className="relative h-[292px]">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={view}
                      className="absolute inset-0"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {view === "agenda" && <AgendaView booked={shown >= 5} fresh={animated} />}
                      {view === "fiche" && <FicheView fresh={animated} />}
                      {view === "history" && <HistoryView fresh={animated} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </AppFrame>
            </Floating>

            {/* Le téléphone du client */}
            <Floating pose={PHONE[shown]} style={{ left: 18, top: 70, width: 224, height: 452 }}>
              <Phone shown={shown} />
            </Floating>

            {/* Liaisons */}
            <svg
              className="pointer-events-none absolute inset-0"
              width={W}
              height={H}
              viewBox={`0 0 ${W} ${H}`}
              style={{ transform: "translateZ(60px)" }}
            >
              <Connector d={PATH_PHONE_TO_UNDERSTAND} active={shown === 2 || shown === 3} delay={0.15} />
              <Connector d={PATH_MEMORY_TO_UNDERSTAND} active={shown === 3} delay={0.45} />
            </svg>

            {/* Demande comprise */}
            <Floating
              pose={UNDERSTAND[shown]}
              transition={shown === 4 ? HANDOFF : undefined}
              style={{ left: 292, top: 28, width: 262 }}
              shadow={LIFT_MD}
              radius={`rounded-xl ${EDGE}`}
            >
              <Panel title="Demande comprise" aside="depuis le message">
                <dl className="space-y-1.5">
                  {UNDERSTOOD.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-baseline justify-between gap-3 border-b border-paper-line pb-1.5 last:border-0 last:pb-0"
                    >
                      <dt className="text-[10.5px] text-ink-2">{r.label}</dt>
                      <dd className="text-right text-[11.5px] font-semibold text-ink">{r.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 flex items-center gap-1.5 border-t border-paper-line pt-2 text-[10.5px] font-medium text-ink-2">
                  <CalendarCheck size={12} strokeWidth={2} aria-hidden />
                  Rendez-vous à proposer
                </p>
              </Panel>
            </Floating>

            {/* Mémoire de l'entreprise */}
            <Floating
              pose={MEMORY_POSE[shown]}
              style={{ left: 530, top: 258, width: 272 }}
              shadow={LIFT_MD}
              radius={`rounded-xl ${EDGE}`}
            >
              <Panel title="Mémoire de l'entreprise" aside="vos documents">
                <div className="flex items-center gap-2.5 rounded-lg bg-paper-2 px-2.5 py-2">
                  <BookOpenText size={15} className="shrink-0 text-accent-dark" aria-hidden />
                  <div className="min-w-0">
                    <p className="truncate text-[11.5px] font-semibold text-ink">{MEMORY.doc}</p>
                    <p className="text-[10px] text-ink-2">{MEMORY.source}</p>
                  </div>
                </div>
                <ul className="mt-2.5 space-y-1 border-l-2 border-accent-primary/50 pl-2.5">
                  {MEMORY.rules.map((r) => (
                    <li key={r} className="text-[11px] leading-snug text-ink-2">
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex items-center gap-1.5 border-t border-paper-line pt-2 text-[10.5px] font-medium text-ink-2">
                  <ClipboardCheck size={12} strokeWidth={2} aria-hidden />
                  Demande conforme
                </p>
              </Panel>
            </Floating>

            {/* Transfert : la confirmation part du créneau réservé vers la conversation */}
            <motion.div
              className="absolute flex items-center gap-1.5 rounded-full bg-accent-primary px-3 py-1.5 text-[11px] font-semibold text-paper"
              style={{ left: 540, top: 352, boxShadow: LIFT_MD }}
              initial={false}
              animate={
                shown === 6
                  ? { opacity: [0, 1, 1, 0], x: [0, -40, -420, -470], y: [0, -4, 20, 26], scale: [0.92, 1, 1, 0.85], z: 100 }
                  : { opacity: 0 }
              }
              transition={
                shown === 6
                  ? { duration: 1.4, times: [0, 0.12, 0.8, 1], ease: EASE, delay: 0.2 }
                  : { duration: 0.2 }
              }
            >
              SMS de confirmation
            </motion.div>
          </div>
        </div>

        {/* Légende et pause : hors du plan incliné, pour rester nettes */}
        <Caption shown={shown} animated={animated}>
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Reprendre l'animation" : "Mettre l'animation en pause"}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-paper-line-strong bg-paper-2 text-ink-2 transition-colors duration-300 hover:bg-paper-3 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
          >
            {userPaused ? (
              <Play className="h-3.5 w-3.5 translate-x-px" strokeWidth={2} aria-hidden />
            ) : (
              <Pause className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            )}
          </button>
        </Caption>
      </div>
    </>
  );
}

// ─── Le logiciel de l'entreprise ─────────────────────────────────────────────

/**
 * Cadre applicatif du hero : barre supérieure, navigation discrète, grande zone
 * principale, puis l'activité récente en sous-carte. Local à la scène (le `Chrome`
 * partagé sert aux maquettes des autres pages et porte des pastilles de fenêtre
 * macOS, hors sujet pour un logiciel métier).
 */
function AppFrame({ view, shown, children }: { view: View; shown: Step; children: ReactNode }) {
  const tabs = ["Clients", "Agenda", "Historique"];
  const active = TAB[view];

  return (
    // LOT 4G : quatre plans lisibles dans la fenêtre. Barre de titre et pied sont des
    // zones passives (surface froide), la zone centrale est la surface de travail
    // (fond creusé, objets blancs posés dessus).
    <div className="overflow-hidden rounded-2xl bg-paper">
      {/* Barre supérieure */}
      <div className="flex items-center gap-2.5 border-b border-paper-line-strong bg-gradient-to-b from-paper-3 to-paper-2 px-3.5 py-2.5">
        <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-primary/10 text-accent-dark">
          <CalendarDays size={15} strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-semibold leading-tight text-ink">Votre logiciel</p>
          <p className="truncate text-[10px] text-ink-2">Clients · agenda · suivi</p>
        </div>
        <span className="ml-auto shrink-0 text-[9.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">
          Maquette · données d&apos;exemple
        </span>
        <span
          aria-hidden
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink text-[10px] font-bold text-paper"
        >
          VE
        </span>
      </div>

      {/* Navigation discrète */}
      <div className="flex gap-5 border-b border-paper-line-strong bg-paper px-3.5" aria-hidden>
        {tabs.map((t, i) => (
          <span
            key={t}
            className={`-mb-px border-b-2 py-2 text-[11.5px] ${
              i === active ? "border-accent-primary font-semibold text-ink" : "border-transparent text-ink-2"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Zone principale : surface de travail légèrement creusée */}
      <div className="bg-paper-2 px-3.5 py-3.5 shadow-[inset_0_2px_4px_-2px_color-mix(in_oklab,var(--color-ink)_16%,transparent)]">
        {children}
      </div>

      {/* Activité récente : sous-cartes qui s'ajoutent au fil du récit */}
      <div className="border-t border-paper-line-strong bg-gradient-to-b from-paper-2 to-paper-3 px-3.5 py-3">
        <p className="mb-2 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-2">
          Activité récente
        </p>
        <ul className="space-y-1.5">
          {APP_ACTIVITY.filter((a) => shown >= a.from)
            .slice(-2)
            .map((a) => (
              <li
                key={a.label}
                className="flex items-center gap-2.5 rounded-lg border border-paper-line-strong bg-paper px-2.5 py-1.5 shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_14%,transparent)]"
              >
                <span className="font-mono text-[10px] text-ink-2">{a.time}</span>
                <span className="truncate text-[11px] font-semibold text-ink">{a.label}</span>
                <span className="ml-auto shrink-0 truncate text-[10px] text-ink-2">{a.detail}</span>
              </li>
            ))}
          {!APP_ACTIVITY.some((a) => shown >= a.from) && (
            <li className="rounded-lg border border-dashed border-paper-line px-2.5 py-1.5 text-[10.5px] text-ink-2">
              Rien de nouveau ce matin
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

// ─── Briques ─────────────────────────────────────────────────────────────────

function Floating({
  pose,
  transition = MOVE,
  style,
  shadow,
  radius,
  children,
}: {
  pose: Pose;
  transition?: Transition;
  style: CSSProperties;
  shadow?: string;
  radius?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={cn("absolute", radius)}
      style={{ ...style, boxShadow: shadow }}
      initial={false}
      animate={pose}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

function Connector({ d, active, delay }: { d: string; active: boolean; delay: number }) {
  const [start, end] = endpoints(d);
  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-accent-primary)"
        strokeWidth={1.75}
        strokeLinecap="round"
        initial={false}
        animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{
          pathLength: { duration: 0.75, delay: active ? delay : 0, ease: EASE },
          opacity: { duration: 0.3, delay: active ? delay : 0 },
        }}
      />
      {[start, end].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={3.5}
          fill="var(--color-paper)"
          stroke="var(--color-accent-primary)"
          strokeWidth={1.75}
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.3, delay: active ? delay + i * 0.6 : 0 }}
        />
      ))}
    </g>
  );
}

/** Premier et dernier point d'un chemin « M x y C … x y ». */
function endpoints(d: string): [[number, number], [number, number]] {
  const n = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [0, 0];
  return [
    [n[0], n[1]],
    [n[n.length - 2], n[n.length - 1]],
  ];
}

function Phone({ shown }: { shown: Step }) {
  const showClient = shown >= 1;
  const showReply = shown >= 6;
  const marked = shown === 2 || shown === 3;
  let markIndex = 0;

  return (
    // Châssis : un liseré clair en haut, une ombre de contact en bas. C'est ce qui
    // fait qu'on lit un objet tenu en main et pas une image de téléphone (LOT 4G).
    <div
      className="h-full rounded-[2.4rem] bg-ink p-[7px]"
      style={{
        boxShadow: `${LIFT_LG}, inset 0 1px 0 color-mix(in oklab, var(--color-paper) 24%, transparent), inset 0 -1px 0 color-mix(in oklab, var(--color-paper) 10%, transparent)`,
      }}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.95rem] bg-paper-2">
        <div className="flex items-center justify-between px-5 pt-2.5 text-[10px] font-semibold text-ink">
          <span>09:12</span>
          <span className="h-[18px] w-[70px] rounded-full bg-ink" aria-hidden />
          <span className="flex items-end gap-[2px]" aria-hidden>
            {[4, 6, 8, 10].map((h) => (
              <span key={h} className="w-[3px] rounded-sm bg-ink" style={{ height: h }} />
            ))}
          </span>
        </div>

        <div className="mt-2.5 flex items-center gap-2.5 border-b border-paper-line bg-paper px-4 py-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-primary/12 text-[11px] font-bold text-accent-dark">
            VE
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-ink">Votre entreprise</p>
            <p className="text-[10px] text-ink-3">SMS · aujourd&apos;hui</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-3 pt-3.5">
          <p className="flex items-center gap-2 text-[9.5px] font-medium text-ink-2" aria-hidden>
            <span className="h-px flex-1 bg-paper-line" />
            Aujourd&apos;hui
            <span className="h-px flex-1 bg-paper-line" />
          </p>
          <motion.div
            initial={false}
            animate={showClient ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE, delay: shown === 1 ? 0.12 : 0 }}
            style={{ transformOrigin: "100% 100%" }}
          >
            <div className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-accent-primary px-3 py-2.5 text-[11.5px] leading-[1.5] text-paper">
              {CLIENT_MESSAGE.map((seg, i) => {
                if (!seg.key) return <span key={i}>{seg.text}</span>;
                const k = markIndex++;
                return (
                  <span key={i} className="relative whitespace-nowrap font-medium">
                    <motion.span
                      aria-hidden
                      className="absolute -inset-x-[3px] -inset-y-px rounded-[5px] bg-paper/25"
                      style={{ originX: 0 }}
                      initial={false}
                      animate={{ scaleX: marked ? 1 : 0, opacity: marked ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: EASE, delay: marked && shown === 2 ? 0.35 + k * 0.3 : 0 }}
                    />
                    <span className="relative">{seg.text}</span>
                  </span>
                );
              })}
              <span className="mt-2 block border-t border-paper/25 pt-1.5 text-[10px] text-paper/85">
                {CLIENT_SIGNATURE}
              </span>
            </div>
            <p className="mt-1 text-right text-[9.5px] text-ink-3">Envoyé · 09:12</p>
          </motion.div>

          <motion.div
            initial={false}
            animate={showReply ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.55, ease: EASE, delay: shown === 6 ? 1.35 : 0 }}
            style={{ transformOrigin: "0% 100%" }}
          >
            <div className="mr-auto max-w-[92%] rounded-2xl rounded-bl-md bg-paper px-3 py-2.5 text-[11.5px] leading-[1.5] text-ink ring-1 ring-paper-line">
              {REPLY_MESSAGE}
            </div>
            <p className="mt-1 text-[9.5px] text-ink-3">Réponse automatique · 09:13</p>
          </motion.div>
        </div>

        <div className="mx-3 mb-4 rounded-full bg-paper px-3.5 py-2 text-[10.5px] text-ink-3 ring-1 ring-paper-line">
          Message
        </div>
      </div>
    </div>
  );
}

function ViewHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-3">
      <p className="text-[12px] font-semibold text-ink">{title}</p>
      {children}
    </div>
  );
}

function AgendaView({ booked, fresh }: { booked: boolean; fresh: boolean }) {
  const span = AGENDA_END - AGENDA_START;
  const at = (start: number, end: number): CSSProperties => ({
    top: `${((start - AGENDA_START) / span) * 100}%`,
    height: `${((end - start) / span) * 100}%`,
  });

  return (
    <div className="flex h-full flex-col">
      <ViewHeader title="Semaine du 10 mars">
        {booked ? (
          <StatusPill tone="ok" appearance="quiet">Jeudi 14{"\u00a0"}h{"\u00a0"}30 réservé</StatusPill>
        ) : (
          <span className="text-[10.5px] text-ink-2">Jeudi après-midi : libre</span>
        )}
      </ViewHeader>
      <div className="grid flex-1 grid-cols-[1.9rem_repeat(5,minmax(0,1fr))] grid-rows-[auto_1fr] gap-x-1.5">
        <span />
        {AGENDA_DAYS.map((d) => (
          <p key={d.day} className="pb-1.5 text-center text-[10.5px]">
            <span className="font-semibold text-ink">{d.day}</span> <span className="text-ink-2">{d.date}</span>
          </p>
        ))}
        <div className="relative">
          {AGENDA_HOURS.map((h) => (
            <span
              key={h}
              className="absolute right-1 -translate-y-1/2 text-[9.5px] text-ink-2"
              style={{ top: `${((h - AGENDA_START) / span) * 100}%` }}
            >
              {h} h
            </span>
          ))}
        </div>
        {AGENDA_DAYS.map((d, dayIndex) => (
          <div
            key={d.day}
            className="relative rounded-lg bg-paper shadow-[0_1px_2px_-1px_color-mix(in_oklab,var(--color-ink)_18%,transparent)] ring-1 ring-ink/12"
          >
            {AGENDA_HOURS.slice(1, -1).map((h) => (
              <span
                key={h}
                aria-hidden
                className="absolute inset-x-0 border-t border-ink/10"
                style={{ top: `${((h - AGENDA_START) / span) * 100}%` }}
              />
            ))}
            {d.busy.map((b) => (
              <span
                key={b.label + b.start}
                className="absolute inset-x-1 truncate rounded-md bg-paper-3 px-1.5 py-1 text-[10px] font-medium leading-tight text-ink ring-1 ring-ink/10"
                style={at(b.start, b.end)}
              >
                {b.label}
              </span>
            ))}
            {dayIndex === BOOKING.dayIndex &&
              (booked ? (
                <motion.span
                  className="absolute inset-x-1 rounded-md bg-accent-primary px-1.5 py-1 text-[10px] leading-tight text-paper"
                  style={{ ...at(BOOKING.start, BOOKING.end), boxShadow: LIFT_MD }}
                  initial={fresh ? { opacity: 0, y: -18, scale: 0.9 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.2, visualDuration: 0.6, delay: 0.5 }}
                >
                  <span className="block truncate font-semibold">{BOOKING.label}</span>
                  <span className="block truncate opacity-85">{BOOKING.who}</span>
                  {fresh && (
                    <motion.span
                      aria-hidden
                      className="absolute -inset-1 rounded-lg ring-2 ring-accent-primary"
                      initial={{ opacity: 0.7, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.18 }}
                      transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
                    />
                  )}
                </motion.span>
              ) : (
                <span
                  className="absolute inset-x-1 rounded-md border border-dashed border-accent-primary/70 bg-accent-primary/5 px-1.5 py-1 text-[10px] font-medium leading-tight text-accent-dark"
                  style={at(BOOKING.start, BOOKING.end)}
                >
                  Libre
                </span>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FicheView({ fresh }: { fresh: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <ViewHeader title="Nouvelle fiche client">
        <StatusPill tone="info" appearance="quiet">Remplie par l&apos;assistant</StatusPill>
      </ViewHeader>
      <div className="relative overflow-hidden rounded-lg bg-paper">
        <FilledForm fields={FICHE_FIELDS} badges={false} />
        {fresh && (
          // Volet qui descend : la fiche s'écrit ligne après ligne (transform seul).
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-paper"
            initial={{ y: "0%" }}
            animate={{ y: "102%" }}
            transition={{ duration: 1.9, ease: "linear" }}
          >
            <span className="absolute inset-x-0 top-0 h-[2px] bg-accent-primary" />
          </motion.div>
        )}
      </div>
      <p className="mt-auto pt-2 text-[10.5px] text-ink-2">Chaque champ indique d&apos;où vient l&apos;information.</p>
    </div>
  );
}

function HistoryView({ fresh }: { fresh: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <ViewHeader title="Historique · Camille Laurent">
        <StatusPill tone="ok" appearance="quiet">Tout est à jour</StatusPill>
      </ViewHeader>
      <div className="space-y-1.5">
        {HISTORY.map((item, i) => (
          <motion.div
            key={item.text}
            initial={fresh ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.25 + i * 0.3, ease: EASE }}
          >
            <Feed items={[item]} appearance="quiet" />
          </motion.div>
        ))}
      </div>
      <p className="mt-auto pt-2 text-[10.5px] text-ink-2">Tout se relit et se corrige : vous gardez la main.</p>
    </div>
  );
}

function Caption({ shown, animated, children }: { shown: Step; animated: boolean; children: ReactNode }) {
  const index = Math.max(shown, 1) - 1;
  const current = SCENE_STEPS[index];
  // Au repos, la scène est vide : la légende ne doit pas annoncer une étape qui n'a
  // pas encore commencé (elle disait « Demande client » sur un téléphone vide).
  const idle = shown === IDLE_STEP;

  return (
    // LOT 4G : la légende devient une vraie barre, posée comme les autres objets
    // (papier translucide, filet d'encre, ombre courte). Elle cesse de flotter.
    <div
      className="absolute inset-x-5 flex items-center gap-4 rounded-2xl border border-paper-line-strong bg-paper/82 px-4 backdrop-blur-md"
      style={{ top: 548, height: 56, boxShadow: LIFT_MD }}
    >
      {animated && idle ? (
        <>
          <p aria-hidden className="min-w-0 flex-1 text-[13px] leading-relaxed text-ink-2">
            <span className="font-semibold text-ink">Une demande, de bout en bout : </span>
            {SCENE_SHORT.join(" · ")}
          </p>
          {children}
        </>
      ) : animated ? (
        <>
          <span aria-hidden className="shrink-0 font-mono text-[15px] font-semibold tracking-[0.08em] text-ink-2">
            0{index + 1}
          </span>
          <div aria-hidden className="relative min-w-0 flex-1">
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={index}
                className="line-clamp-2 text-[14px] leading-snug"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <span className="font-semibold text-ink">{current.title}</span>
                <span className="text-ink-2"> · {current.line}</span>
              </motion.p>
            </AnimatePresence>
          </div>
          {/* Progression : une ligne simple, pas de points lumineux. */}
          <div className="flex shrink-0 items-center gap-2.5" aria-hidden>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-2">
              0{index + 1} / 0{SCENE_STEPS.length}
            </span>
            <span className="relative block h-[3px] w-24 overflow-hidden rounded-full bg-ink/12">
              <motion.span
                className="absolute inset-0 origin-left rounded-full bg-accent-dark"
                initial={false}
                animate={{ scaleX: (index + 1) / SCENE_STEPS.length }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </span>
          </div>
          {children}
        </>
      ) : (
        // Image fixe : la légende donne les sept temps d'un coup.
        <p aria-hidden className="text-[13px] leading-relaxed text-ink-2">
          <span className="font-semibold text-ink">En 7 temps : </span>
          {SCENE_SHORT.join(" · ")}
        </p>
      )}
    </div>
  );
}
