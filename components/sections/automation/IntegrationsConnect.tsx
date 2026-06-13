"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { BRAND_LOGOS, type BrandKey } from "./brandLogos";

/**
 * Section « connecter vos outils » — pédagogique avant tout.
 *
 * Au lieu d'un hub radial (joli mais qui peut embrouiller), un flux qui se LIT
 * de gauche à droite : ce qui déclenche → l'automatisation → le résultat, dans
 * vos outils. Un exemple concret défile dessous pour ENSEIGNER par l'exemple.
 * Une phrase rassure : « vous ne changez pas vos logiciels ».
 *
 * Perf : pulses gatés par tier (staticMode) + PauseOffscreen. Responsive :
 * 3 colonnes en desktop, pile verticale en mobile.
 */

// Étape 1 — ce qui déclenche (entrées).
const TRIGGERS: { key: BrandKey; mot: string }[] = [
  { key: "jobphoning", mot: "Un appel" },
  { key: "gmail", mot: "Un mail" },
  { key: "shopify", mot: "Une commande" },
];

// Étape 3 — ce qui se fait tout seul (sorties).
const RESULTS: { key: BrandKey; mot: string }[] = [
  { key: "axonaut", mot: "Fiche client" },
  { key: "stripe", mot: "Devis / facture" },
  { key: "google-calendar", mot: "Rendez-vous" },
];

// Exemples concrets qui défilent — enseignent plusieurs cas d'usage.
const EXEMPLES = [
  "Un client appelle → sa fiche apparaît dans votre logiciel, son devis est déjà prêt.",
  "Un devis est signé → la facture part toute seule, et la relance se programme.",
  "Quelqu'un remplit votre formulaire → le rendez-vous se cale dans votre agenda.",
];

// Barre défilante — tous les logos, dupliqués pour une boucle sans couture.
const MARQUEE: BrandKey[] = [
  "gmail", "outlook", "google-calendar", "slack", "notion", "whatsapp",
  "stripe", "hubspot", "shopify", "drive", "excel", "google-sheets",
  "jobphoning", "axonaut", "n8n",
];

function ToolChip({ k, mot }: { k: BrandKey; mot: string }) {
  const logo = BRAND_LOGOS[k];
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-bg-card/70 px-3 py-2">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-bg-card p-1.5"
        style={{ boxShadow: `0 0 16px rgba(${logo.tint},0.16)` }}
      >
        <span className="h-full w-full">{logo.svg}</span>
      </span>
      <span className="text-[13px] font-medium text-text-secondary">{mot}</span>
    </div>
  );
}

/** Connecteur animé : trait + pulse voyageur. `dir` = orientation. */
function Connector({ dir, paused }: { dir: "h" | "v"; paused: boolean }) {
  const horizontal = dir === "h";
  return (
    <svg
      aria-hidden
      viewBox={horizontal ? "0 0 100 10" : "0 0 10 100"}
      preserveAspectRatio="none"
      className={horizontal ? "h-3 w-full" : "h-full w-3"}
    >
      <line
        x1={horizontal ? 0 : 5} y1={horizontal ? 5 : 0}
        x2={horizontal ? 100 : 5} y2={horizontal ? 5 : 100}
        stroke="var(--color-border-medium)" strokeWidth="1"
        strokeDasharray="3 3" vectorEffect="non-scaling-stroke"
      />
      {!paused && (
        <motion.line
          x1={horizontal ? 0 : 5} y1={horizontal ? 5 : 0}
          x2={horizontal ? 100 : 5} y2={horizontal ? 5 : 100}
          stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="6 100"
          initial={{ strokeDashoffset: 106 }}
          animate={{ strokeDashoffset: [106, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

function HubCore({ paused }: { paused: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="grid h-20 w-20 place-items-center rounded-3xl border border-cyan/40 bg-bg-card/95 backdrop-blur-md sm:h-24 sm:w-24"
        style={{ boxShadow: "0 0 40px rgba(34,211,238,0.22)" }}
        animate={paused ? undefined : { boxShadow: ["0 0 28px rgba(34,211,238,0.18)", "0 0 48px rgba(34,211,238,0.32)", "0 0 28px rgba(34,211,238,0.18)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.svg
          viewBox="0 0 24 24" className="h-8 w-8 text-cyan sm:h-9 sm:w-9"
          fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden
          animate={paused ? undefined : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
          <circle cx="12" cy="12" r="3.2" />
        </motion.svg>
      </motion.div>
      <span className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan">
        Ça circule
        <br />
        tout seul
      </span>
    </div>
  );
}

function StageColumn({ title, items }: { title: string; items: { key: BrandKey; mot: string }[] }) {
  return (
    <div className="w-full max-w-[230px]">
      <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">
        {items.map((it) => (
          <ToolChip key={it.key} k={it.key} mot={it.mot} />
        ))}
      </div>
    </div>
  );
}

function ConnectFlow() {
  const paused = useInViewPause();
  const { tier } = usePerformanceMode();
  const off = tier !== "full" || paused;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Desktop : 3 colonnes lues de gauche à droite */}
      <div className="hidden items-center justify-center gap-3 lg:flex">
        <StageColumn title="Ce qui se passe" items={TRIGGERS} />
        <div className="w-16 shrink-0"><Connector dir="h" paused={off} /></div>
        <HubCore paused={off} />
        <div className="w-16 shrink-0"><Connector dir="h" paused={off} /></div>
        <StageColumn title="Ce qui se fait, tout seul" items={RESULTS} />
      </div>

      {/* Mobile / tablette : pile verticale */}
      <div className="flex flex-col items-center gap-0 lg:hidden">
        <StageColumn title="Ce qui se passe" items={TRIGGERS} />
        <div className="h-10"><Connector dir="v" paused={off} /></div>
        <HubCore paused={off} />
        <div className="h-10"><Connector dir="v" paused={off} /></div>
        <StageColumn title="Ce qui se fait, tout seul" items={RESULTS} />
      </div>
    </div>
  );
}

/** Exemple concret qui défile — enseigne par l'exemple. */
function CyclingExample() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const { tier, disableContentMotion } = usePerformanceMode();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (disableContentMotion || tier !== "full" || !inView) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % EXEMPLES.length), 4200);
    return () => clearInterval(id);
  }, [disableContentMotion, tier, inView]);

  return (
    <div
      ref={ref}
      className="mx-auto mt-10 max-w-2xl rounded-2xl border border-cyan/20 bg-bg-card/50 px-5 py-4 text-center"
    >
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan/80">
        Un exemple concret
      </span>
      {disableContentMotion ? (
        <ul className="space-y-1.5 text-sm leading-relaxed text-text-secondary">
          {EXEMPLES.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      ) : (
        <div className="relative min-h-[2.6rem] sm:min-h-[2rem]">
          {EXEMPLES.map((e, i) => (
            <motion.p
              key={e}
              className="absolute inset-0 flex items-center justify-center text-sm leading-relaxed text-text-secondary"
              initial={false}
              animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : 6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden={i !== idx}
            >
              {e}
            </motion.p>
          ))}
        </div>
      )}
    </div>
  );
}

function LogoMarquee() {
  const { tier } = usePerformanceMode();
  const items = [...MARQUEE, ...MARQUEE];

  if (tier !== "full") {
    return (
      <div className="relative mt-8 overflow-x-auto">
        <div className="flex w-max gap-3 px-1">
          {MARQUEE.map((k) => (
            <span key={k} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border-subtle bg-bg-card/70 p-2">
              <span className="h-full w-full">{BRAND_LOGOS[k].svg}</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative mt-8 overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {items.map((k, i) => (
          <span
            key={`${k}-${i}`}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border-subtle bg-bg-card/70 p-2.5 transition-colors hover:border-border-accent"
            title={BRAND_LOGOS[k].name}
          >
            <span className="h-full w-full">{BRAND_LOGOS[k].svg}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function IntegrationsConnect() {
  return (
    <section className="section-shell-tight" aria-label="Outils connectés et automatisés">
      <div className="section-container">
        <SectionHeading
          label="Vos outils, reliés entre eux"
          title={
            <>
              Vos logiciels arrêtent de travailler{" "}
              <span className="text-gradient-strong">chacun dans son coin</span>
            </>
          }
          description="Aujourd'hui, vous recopiez la même information d'un outil à l'autre, à la main. Je les relie : quand quelque chose se passe quelque part, l'info arrive toute seule là où elle doit aller."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeInUp}>
            <PauseOffscreen className="block">
              <ConnectFlow />
            </PauseOffscreen>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <CyclingExample />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mt-10 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
            Compatible avec vos outils du quotidien
          </p>
          <LogoMarquee />
          <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-text-secondary">
            <span className="text-text-primary">Vous ne changez pas vos logiciels.</span>{" "}
            Je relie ceux que vous avez déjà. Et si le vôtre n&apos;est pas dans la liste,
            je vérifie gratuitement s&apos;il peut être connecté.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
