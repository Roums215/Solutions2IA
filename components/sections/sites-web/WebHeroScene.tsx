"use client";

import { AnimatePresence, motion, type Transition } from "motion/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { EASE } from "@/components/shared/mockup/AppMockup";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { cn } from "@/lib/utils";
import {
  WEB_FINAL,
  WEB_IDLE,
  WEB_IDLE_DURATION,
  WEB_SCENE_LABEL,
  WEB_SCENE_SHORT,
  WEB_SCENE_STEPS,
  T,
  type WebStep,
} from "./webHeroSceneData";
import {
  AgendaCard,
  FicheCard,
  InboxCard,
  LIFT_LG,
  LIFT_MD,
  Packet,
  SearchCard,
  SiteCard,
  TrackCard,
} from "./webHeroSceneParts";

/**
 * Scène 2.5D du hero de /sites-web (≥ md) : une visite qui devient une demande qui avance.
 *
 * Plan fixe 820 × 620 mis à l'échelle de sa colonne en CSS pur, horloge à étapes en
 * setTimeout (une seule minuterie vivante), poses en table, transform / opacity seulement.
 *
 * Grammaire : la scène se construit au fil du récit. Au repos elle est vide ; chaque
 * objet entre au moment où il sert (depuis sa direction logique) et s'efface ou se
 * calme quand son rôle est fini. Deux zones nommées, « Côté visiteur » et « Côté
 * entreprise », disent où l'on est. À chaque étape, UN objet a le focus (avant-plan,
 * liseré indigo, une pulsation unique). L'étape 7 réunit tout l'écosystème : c'est
 * aussi l'image fixe des tiers bas. La demande voyage
 * réellement : une étiquette part du bouton du formulaire vers la fiche, puis la
 * confirmation revient de l'agenda vers le site. Les connecteurs se tracent une fois,
 * puis un court segment les parcourt pour dire « ça alimente ».
 *
 * Tiers : full = plan incliné (translateZ réels) ; reduced = même récit à plat ;
 * minimal et prefers-reduced-motion = image finale fixe. Pause hors écran, onglet
 * masqué, ou bouton pause.
 */

const W = 820;
const H = 660;
/** Tout le décor descend sous la ligne des zones. */
const TOP = 28;

const DEPTH_VIEW = "[html[data-perf=full]_&]:[perspective:2000px] [html[data-perf=full]_&]:[perspective-origin:55%_40%]";
const DEPTH_PLANE =
  "[html[data-perf=full]_&]:[transform-style:preserve-3d] [html[data-perf=full]_&]:[transform:rotateX(5deg)_rotateY(-7deg)]";

const MOVE = (delay = 0): Transition => ({
  default: { type: "spring", bounce: 0.05, visualDuration: 0.95, delay },
  opacity: { duration: 0.6, ease: EASE, delay },
});

// ─── Poses par étape ─────────────────────────────────────────────────────────
// Index = étape (0 repos, 1 trouvé … 7 client prévenu). z n'a d'effet qu'en tier full.

type Pose = { opacity: number; x: number; y: number; z: number; scale: number; d?: number };
const p = (opacity: number, x = 0, y = 0, z = 0, scale = 1): Pose => ({ opacity, x, y, z, scale });
/** Même pose, avec un délai d'entrée dans l'étape (secondes). */
const later = (pose: Pose, d: number): Pose => ({ ...pose, d });

const FOCUS = p(1, 0, 0, 70);
const REST = p(1);
const CALM = p(0.72, 0, 0, -30, 0.985);
// Absences : chaque objet attend (ou repart) depuis sa direction logique.
const OUT_LEFT = p(0, -28, 0, 0, 0.97);
const OUT_BELOW = p(0, 0, 22, 0, 0.98);
const OUT_RIGHT = p(0, 32, 0, 0, 0.97);
/** La fiche naît dans le formulaire : cachée, réduite, posée sur le bouton d'envoi. */
const FICHE_BIRTH = p(0, -150, 120, 0, 0.55);

// Index = étape : 0 repos (scène vide), 1 trouvé … 7 vue d'ensemble.
const SEARCH: Pose[] = [OUT_LEFT, FOCUS, p(0.55, -6, 0, -40, 0.97), OUT_LEFT, OUT_LEFT, OUT_LEFT, OUT_LEFT, later(CALM, T.searchBack)];
// Le site garde un z sous celui de la fiche, qui déborde sur lui.
const SITE: Pose[] = [OUT_BELOW, later(p(1, 0, 0, 20), T.siteEnter), FOCUS, FOCUS, CALM, CALM, CALM, p(1, 0, 0, 30)];
const FICHE: Pose[] = [FICHE_BIRTH, FICHE_BIRTH, FICHE_BIRTH, FICHE_BIRTH, p(1, 0, 0, 90), p(1, 0, 0, 40), p(0.9, 0, 0, 0, 0.99), p(1, 0, 0, 40)];
const INBOX: Pose[] = [OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, FOCUS, CALM, REST];
const TRACK: Pose[] = [OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, later(p(1, 0, 0, 20), T.trackEnter), p(1, 0, 0, 20), p(1, 0, 0, 30)];
const AGENDA: Pose[] = [OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, OUT_RIGHT, FOCUS, REST];

type Key = "search" | "site" | "fiche" | "inbox" | "track" | "agenda";
/** L'objet qui a le focus à chaque étape. */
const FOCUS_OF: (Key | null)[] = [null, "search", "site", "site", "fiche", "inbox", "agenda", "site"];

/** Zone active à chaque étape : visiteur (gauche), entreprise (droite), ou les deux. */
const ZONE: ("visitor" | "company" | "both" | null)[] = [null, "visitor", "visitor", "visitor", "both", "company", "company", "both"];

// ─── Liaisons et trajets, en coordonnées du plan ─────────────────────────────

// `on` : étapes où la liaison est visible (ses deux extrémités sont à l'écran) ; elle se
// trace à la première, à `delay` secondes dans l'étape, et disparaît avec son objet.
const LINKS: { d: string; on: WebStep[]; delay: number }[] = [
  { d: "M 226 110 C 262 110, 280 160, 280 196", on: [1, 2, 7], delay: T.siteEnter + 0.2 }, // recherche → site
  { d: "M 572 358 C 604 358, 596 120, 626 120", on: [5, 6, 7], delay: T.linkDraw }, // fiche → boîte de réception
  { d: "M 572 408 C 602 408, 598 300, 626 300", on: [5, 6, 7], delay: T.trackEnter + 0.2 }, // fiche → suivi
  { d: "M 572 458 C 600 458, 600 478, 626 478", on: [6, 7], delay: T.linkDraw }, // fiche → agenda
  { d: "M 626 548 C 560 568, 450 568, 384 546", on: [7], delay: T.linkDraw }, // agenda → site (confirmation)
];

/** La demande quitte le bouton d'envoi et rejoint la place de la fiche. */
const PATH_REQUEST = "M 150 526 C 230 502, 320 452, 420 406";
/** La confirmation repart de l'agenda vers le site. */
const PATH_CONFIRM = "M 560 536 C 500 552, 420 552, 300 532";

// ─── Scène ───────────────────────────────────────────────────────────────────

export function WebHeroScene() {
  return (
    <PauseOffscreen className="hero-enter-fade absolute inset-0">
      <Stage />
    </PauseOffscreen>
  );
}

function Stage() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const offscreen = useInViewPause();
  const [step, setStep] = useState<WebStep>(WEB_IDLE);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const animated = mounted && !disableContentMotion;
  const running = animated && !offscreen && !userPaused && !tabHidden;
  const shown: WebStep = animated ? step : WEB_FINAL;
  const focus = animated ? FOCUS_OF[shown] : null;

  useEffect(() => {
    const sync = () => setTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const duration = step === WEB_IDLE ? WEB_IDLE_DURATION : WEB_SCENE_STEPS[step - 1].duration;
    const timer = window.setTimeout(() => {
      setStep((s) => (s === WEB_FINAL ? WEB_IDLE : ((s + 1) as WebStep)));
    }, duration);
    return () => window.clearTimeout(timer);
  }, [running, step]);

  const obj = (key: Key, poses: Pose[], style: CSSProperties, children: ReactNode, shadow = LIFT_MD, radius = "rounded-xl") => (
    <Floating pose={poses[shown]} style={style} shadow={shadow} radius={radius} focus={focus === key} step={shown}>
      {children}
    </Floating>
  );

  return (
    <div
      className="absolute left-0 top-0 origin-top-left [scale:tan(atan2(100cqw,820px))]"
      style={{ width: W, height: H }}
    >
      <div role="img" aria-label={WEB_SCENE_LABEL} className={cn("absolute inset-0", DEPTH_VIEW)}>
        <div className={cn("absolute inset-0", DEPTH_PLANE)}>
          <Zones zone={animated ? ZONE[shown] : "both"} />

          {/* Côté entreprise : les outils */}
          {obj("inbox", INBOX, { left: 626, top: TOP + 12, width: 194 }, <InboxCard step={shown} fresh={animated} />)}
          {obj("track", TRACK, { left: 626, top: TOP + 190, width: 194 }, <TrackCard step={shown} fresh={animated} />)}
          {obj("agenda", AGENDA, { left: 626, top: TOP + 368, width: 194 }, <AgendaCard step={shown} fresh={animated} />)}

          {/* Côté visiteur : le site, cœur de la scène */}
          {obj("site", SITE, { left: 20, top: TOP + 168, width: 364 }, <SiteCard step={shown} fresh={animated} />, LIFT_LG, "rounded-2xl")}

          {/* Côté visiteur : la recherche */}
          {obj("search", SEARCH, { left: 0, top: TOP, width: 226 }, <SearchCard step={shown} fresh={animated} />)}

          {/* Liaisons */}
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            style={{ transform: "translateZ(60px)" }}
            aria-hidden
          >
            {LINKS.map((l) => (
              <Connector
                key={l.d}
                d={l.d}
                active={l.on.includes(shown)}
                fresh={animated && shown === l.on[0]}
                delay={l.delay}
              />
            ))}
          </svg>

          {/* La fiche : elle naît du formulaire */}
          {obj("fiche", FICHE, { left: 336, top: TOP + 296, width: 236 }, <FicheCard step={shown} fresh={animated} />)}

          {/* Transferts */}
          <Travel path={PATH_REQUEST} play={animated && shown === 3} delay={T.packet} duration={T.packetDuration}>
            <Packet kind="request" />
          </Travel>
          <Travel path={PATH_CONFIRM} play={animated && shown === 7} delay={T.confirmPacket} duration={T.confirmDuration}>
            <Packet kind="confirm" />
          </Travel>
        </div>
      </div>

      {/* Légende synchronisée et pause : hors du plan incliné, pour rester nettes */}
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
  );
}

// ─── Briques ─────────────────────────────────────────────────────────────────

function Floating({
  pose,
  style,
  shadow,
  radius,
  focus,
  step,
  children,
}: {
  pose: Pose;
  style: CSSProperties;
  shadow: string;
  radius: string;
  focus: boolean;
  step: WebStep;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={cn("absolute", radius)}
      style={{ ...style, boxShadow: shadow }}
      initial={false}
      animate={{ opacity: pose.opacity, x: pose.x, y: pose.y, z: pose.z, scale: pose.scale }}
      transition={MOVE(pose.d)}
    >
      {children}
      {/* Focus : liseré indigo tenu, plus une pulsation unique à l'entrée de l'étape */}
      <motion.span
        aria-hidden
        className={cn("pointer-events-none absolute -inset-[3px] ring-2 ring-accent-primary/45", radius)}
        initial={false}
        animate={{ opacity: focus ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      />
      {focus && (
        <motion.span
          key={step}
          aria-hidden
          className={cn("pointer-events-none absolute -inset-[3px] ring-2 ring-accent-primary", radius)}
          initial={{ opacity: 0.55, scale: 1 }}
          animate={{ opacity: 0, scale: 1.035 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.6 }}
        />
      )}
    </motion.div>
  );
}

function Connector({ d, active, fresh, delay }: { d: string; active: boolean; fresh: boolean; delay: number }) {
  const [start, end] = endpoints(d);
  const at = fresh ? delay : 0;
  return (
    <motion.g initial={false} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 0.4, delay: active ? at : 0 }}>
      {/* Tracé d'appui : discret, sous le trait */}
      <path d={d} fill="none" stroke="var(--color-ink)" strokeOpacity={0.12} strokeWidth={1.25} strokeDasharray="2 4" />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-accent-primary)"
        strokeWidth={1.75}
        strokeLinecap="round"
        initial={false}
        animate={active ? { pathLength: 1, opacity: fresh ? 1 : 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: T.linkDrawDuration, delay: at, ease: EASE }, opacity: { duration: 0.4, delay: fresh ? at : 0 } }}
      />
      {/* Alimentation : un court segment parcourt la liaison, une fois */}
      {fresh && (
        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-cyan)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0.16, pathOffset: 0, opacity: 0 }}
          animate={{ pathOffset: 0.84, opacity: [0, 1, 1, 0] }}
          transition={{ duration: T.linkFlowDuration, delay: at + T.linkDrawDuration * 0.8, ease: "easeInOut" }}
        />
      )}
      {[start, end].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={3.25}
          fill="var(--color-paper)"
          stroke="var(--color-accent-primary)"
          strokeWidth={1.75}
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.3, delay: active ? at + i * T.linkDrawDuration : 0 }}
        />
      ))}
    </motion.g>
  );
}

/** Les deux zones de la scène, et le filet qui les sépare. */
function Zones({ zone }: { zone: "visitor" | "company" | "both" | null }) {
  const on = (side: "visitor" | "company") => zone === side || zone === "both";
  const label = (side: "visitor" | "company", text: string, left: number) => (
    <motion.p
      className="absolute flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.2em]"
      style={{ left, top: 0 }}
      initial={false}
      animate={{ opacity: zone === null ? 0 : on(side) ? 1 : 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span className={cn("h-px w-5 transition-colors duration-500", on(side) ? "bg-accent-primary" : "bg-ink/25")} />
      <span className={cn("transition-colors duration-500", on(side) ? "text-accent-dark" : "text-ink-3")}>{text}</span>
    </motion.p>
  );
  return (
    <>
      {label("visitor", "Côté visiteur", 2)}
      {label("company", "Côté entreprise", 628)}
      <motion.span
        aria-hidden
        className="absolute w-px border-l border-dashed border-ink/15"
        style={{ left: 604, top: 4, height: 572 }}
        initial={false}
        animate={{ opacity: zone === null ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      />
    </>
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

/** Un objet qui voyage le long d'un chemin (offset-path), une fois par étape. */
function Travel({ path, play, delay, duration, children }: { path: string; play: boolean; delay: number; duration: number; children: ReactNode }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0"
      style={{ offsetPath: `path("${path}")`, offsetRotate: "0deg", transform: "translateZ(110px)" }}
      initial={false}
      animate={play ? { offsetDistance: ["0%", "0%", "100%", "100%"], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
      transition={play ? { duration: duration + 0.3, times: [0, 0.15, 0.85, 1], delay, ease: "easeInOut" } : { duration: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

function Caption({ shown, animated, children }: { shown: WebStep; animated: boolean; children: ReactNode }) {
  const index = Math.max(shown, 1) - 1;
  const current = WEB_SCENE_STEPS[index];
  const idle = shown === WEB_IDLE;

  return (
    <div
      className="absolute inset-x-5 flex items-center gap-4 rounded-2xl border border-paper-line-strong bg-paper/85 px-4 backdrop-blur-md"
      style={{ top: 596, height: 56, boxShadow: LIFT_MD }}
    >
      {animated && idle ? (
        <>
          <p aria-hidden className="min-w-0 flex-1 text-[13px] leading-relaxed text-ink-2">
            <span className="font-semibold text-ink">Une visite, jusqu&apos;au rendez-vous : </span>
            {WEB_SCENE_SHORT.join(" · ")}
          </p>
          {children}
        </>
      ) : animated ? (
        <>
          <span aria-hidden className="shrink-0 font-mono text-[15px] font-semibold tracking-[0.08em] text-accent-dark">
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
                transition={{ duration: 0.25, ease: EASE }}
              >
                <span className="font-semibold text-ink">{current.title}</span>
                <span className="text-ink-2"> · {current.line}</span>
              </motion.p>
            </AnimatePresence>
          </div>
          {/* Progression en 7 segments : on voit où on en est dans le parcours */}
          <div className="flex shrink-0 items-center gap-2.5" aria-hidden>
            <span className="font-mono text-[11px] tracking-[0.1em] text-ink-2">
              0{index + 1} / 0{WEB_SCENE_STEPS.length}
            </span>
            <span className="flex gap-[3px]">
              {WEB_SCENE_STEPS.map((s, i) => (
                <span key={s.title} className="relative block h-[3px] w-3 overflow-hidden rounded-full bg-ink/12">
                  <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-accent-dark"
                    initial={false}
                    animate={{ scaleX: i <= index ? 1 : 0 }}
                    transition={i === index ? { duration: s.duration / 1000, ease: "linear" } : { duration: 0.2 }}
                  />
                </span>
              ))}
            </span>
          </div>
          {children}
        </>
      ) : (
        <p aria-hidden className="text-[13px] leading-relaxed text-ink-2">
          <span className="font-semibold text-ink">En 7 temps : </span>
          {WEB_SCENE_SHORT.join(" · ")}
        </p>
      )}
    </div>
  );
}
