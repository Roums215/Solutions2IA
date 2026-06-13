"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { PauseOffscreen, useInViewPause } from "@/lib/animation/inViewPause";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { BRAND_LOGOS, type BrandKey } from "./brandLogos";

/**
 * Section « connecter vos outils » — montre visuellement que plusieurs
 * applications se relient entre elles autour d'un hub d'automatisation.
 *
 * - Hub central + 8 logos d'outils en cercle, reliés par des traits avec un
 *   pulse qui voyage (la donnée circule). Positions en % (responsive éprouvé).
 * - Barre défilante (marquee) de logos en dessous → impression « +30 outils ».
 * - Perf : boucles gatées par tier (staticMode) + PauseOffscreen.
 */

// 8 outils autour du hub — entrées (gauche) et sorties (droite).
const HUB_TOOLS: { key: BrandKey; x: number; y: number }[] = [
  { key: "jobphoning", x: 50, y: 6 },
  { key: "gmail", x: 85, y: 20 },
  { key: "stripe", x: 95, y: 50 },
  { key: "axonaut", x: 85, y: 80 },
  { key: "google-calendar", x: 50, y: 94 },
  { key: "whatsapp", x: 15, y: 80 },
  { key: "google-sheets", x: 5, y: 50 },
  { key: "slack", x: 15, y: 20 },
];

// Barre défilante — tous les logos, dupliqués pour une boucle sans couture.
const MARQUEE: BrandKey[] = [
  "gmail", "outlook", "google-calendar", "slack", "notion", "whatsapp",
  "stripe", "hubspot", "shopify", "drive", "excel", "google-sheets",
  "jobphoning", "axonaut", "n8n",
];

function ToolNode({ logo }: { logo: (typeof BRAND_LOGOS)[BrandKey] }) {
  return (
    <span
      className="grid h-12 w-12 place-items-center rounded-2xl border border-border-subtle bg-bg-card/95 p-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:h-14 sm:w-14"
      style={{ boxShadow: `0 0 24px rgba(${logo.tint},0.18)` }}
    >
      <span className="h-full w-full">{logo.svg}</span>
    </span>
  );
}

function HubDiagram() {
  const paused = useInViewPause();
  const { tier } = usePerformanceMode();
  const animate = tier !== "full" || paused;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Traits hub → outils, avec pulse voyageur */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="connect-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {HUB_TOOLS.map((t, i) => {
          // Longueur approx. du trait (viewBox 100×100) pour caler le dash.
          const len = Math.hypot(t.x - 50, t.y - 50);
          return (
            <g key={t.key}>
              <line
                x1="50" y1="50" x2={t.x} y2={t.y}
                stroke="url(#connect-line)"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="2 2"
              />
              {/* Pulse voyageur : un court segment lumineux glisse du hub vers
                  l'outil (la donnée circule). Animé via strokeDashoffset. */}
              {!animate && (
                <motion.line
                  x1="50" y1="50" x2={t.x} y2={t.y}
                  stroke="var(--color-cyan)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray={`3 ${len}`}
                  initial={{ strokeDashoffset: len + 3 }}
                  animate={{ strokeDashoffset: [len + 3, -3] }}
                  transition={{
                    duration: 1.9,
                    delay: i * 0.35,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Logos d'outils positionnés */}
      {HUB_TOOLS.map((t) => (
        <div
          key={t.key}
          className="absolute z-10"
          style={{ left: `${t.x}%`, top: `${t.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <ToolNode logo={BRAND_LOGOS[t.key]} />
        </div>
      ))}

      {/* Hub central */}
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="grid h-20 w-20 place-items-center rounded-3xl border border-cyan/40 bg-bg-card/95 backdrop-blur-md sm:h-24 sm:w-24"
          style={{ boxShadow: "0 0 40px rgba(34,211,238,0.25)" }}
          animate={animate ? undefined : { boxShadow: ["0 0 30px rgba(34,211,238,0.2)", "0 0 50px rgba(34,211,238,0.35)", "0 0 30px rgba(34,211,238,0.2)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-center">
            <svg viewBox="0 0 24 24" className="mx-auto h-7 w-7 text-cyan sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
              <circle cx="12" cy="12" r="3.2" />
            </svg>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-text-secondary sm:text-[10px]">
              Automatisation
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LogoMarquee() {
  const { tier } = usePerformanceMode();
  const items = [...MARQUEE, ...MARQUEE];

  // En reduced/minimal : barre statique scrollable, pas d'animation.
  if (tier !== "full") {
    return (
      <div className="relative mt-10 overflow-x-auto">
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
      className="relative mt-10 overflow-hidden"
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
          label="Vos outils, reliés"
          title={
            <>
              Je connecte vos applications{" "}
              <span className="text-gradient-strong">entre elles</span>
            </>
          }
          description="Gmail, agenda, fichier clients, facturation, messagerie… Au lieu de copier l'information d'un outil à l'autre à la main, je les fais parler ensemble. L'information circule toute seule, au bon endroit."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-2xl"
        >
          <motion.div variants={fadeInUp}>
            <PauseOffscreen className="block">
              <HubDiagram />
            </PauseOffscreen>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <LogoMarquee />
          <p className="mt-5 text-center text-sm text-text-tertiary">
            Et bien d&apos;autres. Si vous utilisez un outil qui n&apos;est pas là, je vérifie gratuitement s&apos;il peut être relié.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
