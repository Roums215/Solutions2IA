"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { PauseOffscreen } from "@/lib/animation/inViewPause";
import { SECTOR_DASHBOARDS } from "./sectorDashboards";

// ─── KPIs transversaux (colonne gauche) ─────────────────────────────────────

type KPI = { value: string; label: string; detail: string };

// Indicateurs qu'un tableau de bord peut suivre — décrits en clair, sans
// chiffre de résultat inventé (le « value » est l'unité/le type, pas une promesse).
const KPIS: KPI[] = [
  {
    value: "Adoption",
    label: "Qui s'en sert vraiment",
    detail: "Combien de votre équipe utilise l'outil au quotidien, pas juste qui s'est connecté une fois.",
  },
  {
    value: "Temps",
    label: "Le temps récupéré",
    detail: "Combien de temps prend une tâche maintenant, comparé à avant l'application.",
  },
  {
    value: "Activité",
    label: "Ce qui se passe en direct",
    detail: "Interventions, dossiers, commandes… le volume de votre activité, mis à jour en continu.",
  },
  {
    value: "Alertes",
    label: "Ce qui demande votre attention",
    detail: "Retards, anomalies, seuils dépassés : vous êtes prévenu au bon moment, pas après coup.",
  },
];

const ROTATION_MS = 6500;
const CHIPS = ["Surveillance en continu", "Alerte mail / message", "Bilan automatique"];

// ─── Component ──────────────────────────────────────────────────────────────

export function PerformanceTracking() {
  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Votre tableau de bord"
          title={
            <>
              Un outil, c&apos;est bien. Un outil qui vous{" "}
              <span className="text-gradient-strong">montre l&apos;essentiel</span>, c&apos;est mieux.
            </>
          }
          description="Chaque application que je construis vient avec un tableau de bord clair : vous voyez d'un coup d'œil ce qui compte pour vous. Voici des exemples de ce qu'il peut suivre, métier par métier."
        />

        <div className="mx-auto max-w-[1080px]">
          <SectorDashboardCarousel />
        </div>

        <KPIGrid />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function KPIGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mx-auto mt-10 grid max-w-[1080px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {KPIS.map((k) => (
        <motion.div
          key={k.label}
          variants={fadeInUp}
          className="rounded-xl border border-border-subtle bg-bg-card/40 px-5 py-4"
        >
          <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-light">
            {k.value}
          </span>
          <h3 className="mt-2 text-sm font-semibold tracking-tight text-text-primary">
            {k.label}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-text-tertiary">
            {k.detail}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Carousel shell ─────────────────────────────────────────────────────────

function SectorDashboardCarousel() {
  const { shouldReduceMotion, mounted, isCoarsePointer } = usePerformanceMode();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHover, setIsHover] = useState(false);
  // Dès que le visiteur choisit un onglet, on arrête de faire défiler sous ses yeux.
  const [userPicked, setUserPicked] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const inViewRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, [shouldReduceMotion]);

  // Pas de défilement automatique sur tactile : la maquette est longue, on la lit en scrollant.
  const autoplayActive = !shouldReduceMotion && !isHover && !userPicked && !isCoarsePointer;

  useEffect(() => {
    if (!autoplayActive) return;
    const id = setInterval(() => {
      if (!inViewRef.current) return;
      setActiveIdx((prev) => (prev + 1) % SECTOR_DASHBOARDS.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [autoplayActive]);

  useEffect(() => {
    setCycleKey((k) => k + 1);
  }, [activeIdx]);

  // Avant montage : la première maquette est rendue statique côté serveur (pas de
  // saut de mise en page) ; les animations ne démarrent qu'après hydratation.
  const reduced = !mounted || shouldReduceMotion;
  const active = SECTOR_DASHBOARDS[activeIdx];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex flex-col gap-4"
    >
      {/* Tabs */}
      <div role="tablist" aria-label="Tableau de bord par secteur" className="flex flex-wrap justify-center gap-2">
        {SECTOR_DASHBOARDS.map((d, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={d.slug}
              role="tab"
              aria-selected={isActive}
              aria-controls={`dashboard-panel-${d.slug}`}
              onClick={() => {
                setActiveIdx(i);
                setUserPicked(true);
              }}
              className={[
                "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60",
                isActive
                  ? "border border-cyan/45 bg-bg-card text-cyan"
                  : "border border-border-subtle bg-bg-card/40 text-text-tertiary hover:border-border-medium hover:text-text-secondary",
              ].join(" ")}
              style={
                isActive
                  ? { boxShadow: "0 0 22px var(--color-cyan-glow), inset 0 1px 0 rgba(255,255,255,0.04)" }
                  : undefined
              }
            >
              {d.short}
            </button>
          );
        })}
      </div>

      {/* Autoplay progress */}
      <div className="relative h-px overflow-hidden rounded-full bg-border-subtle/60">
        {autoplayActive ? (
          <motion.span
            key={cycleKey}
            className="absolute inset-0 block origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: ROTATION_MS / 1000, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, var(--color-cyan) 0%, var(--color-accent-light) 100%)",
              boxShadow: "0 0 8px var(--color-cyan-glow)",
            }}
          />
        ) : (
          <span
            className="absolute inset-y-0 left-0 w-full"
            style={{ background: "var(--color-border-subtle)" }}
          />
        )}
      </div>

      {/* Dashboard card */}
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={active.slug}
            id={`dashboard-panel-${active.slug}`}
            role="tabpanel"
            aria-label={`Maquette du tableau de bord ${active.short} : ${active.meta}`}
            initial={reduced ? false : { opacity: 0, y: 8, scale: 0.99 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}
          >
            <PauseOffscreen>{active.render(reduced)}</PauseOffscreen>
          </motion.article>
        </AnimatePresence>
        <p className="mt-4 text-center text-[11px] leading-relaxed text-text-tertiary">
          Maquette illustrative : les chiffres affichés sont des exemples, pas des résultats clients.
        </p>
      </div>
    </div>
  );
}
