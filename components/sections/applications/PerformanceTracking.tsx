"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { SECTOR_DASHBOARDS } from "./sectorDashboards";

// ─── KPIs transversaux (colonne gauche) ─────────────────────────────────────

type KPI = { value: string; label: string; detail: string };

// Indicateurs qu'un tableau de bord peut suivre — décrits en clair, sans
// chiffre de résultat inventé (le « value » est l'unité/le type, pas une promesse).
const KPIS: KPI[] = [
  {
    value: "Adoption",
    label: "Qui s'en sert vraiment",
    detail: "Combien de votre équipe utilise l'outil au quotidien — pas juste qui s'est connecté une fois.",
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
  {
    value: "Fiabilité",
    label: "L'outil tient le coup",
    detail: "Je surveille l'application en continu pour qu'elle reste disponible et rapide.",
  },
  {
    value: "Évolutions",
    label: "Ce qui s'améliore",
    detail: "Les nouvelles fonctions arrivent vite, sans tout casser, au fil de vos besoins.",
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

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <KPIGrid />
          <SectorDashboardCarousel />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
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
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
    >
      {KPIS.map((k) => (
        <motion.div
          key={k.label}
          variants={fadeInUp}
          className="metric-tile px-5 py-6 sm:px-6 sm:py-7"
        >
          <span className="block text-[2rem] font-bold leading-none tracking-tight text-gradient-strong sm:text-[2.4rem]">
            {k.value}
          </span>
          <h3 className="mt-4 text-sm font-semibold tracking-tight text-text-primary">
            {k.label}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-text-tertiary">
            {k.detail}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Carousel shell ─────────────────────────────────────────────────────────

function SectorDashboardCarousel() {
  const { shouldReduceMotion, mounted } = usePerformanceMode();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHover, setIsHover] = useState(false);
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

  useEffect(() => {
    if (shouldReduceMotion || isHover) return;
    const id = setInterval(() => {
      if (!inViewRef.current) return;
      setActiveIdx((prev) => (prev + 1) % SECTOR_DASHBOARDS.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [shouldReduceMotion, isHover]);

  useEffect(() => {
    setCycleKey((k) => k + 1);
  }, [activeIdx]);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-border-subtle bg-bg-card/50 p-6" aria-hidden />
    );
  }

  const active = SECTOR_DASHBOARDS[activeIdx];
  const autoplayActive = !shouldReduceMotion && !isHover;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex flex-col gap-3"
    >
      {/* Tabs */}
      <div role="tablist" aria-label="Dashboard par secteur" className="flex flex-wrap gap-1.5">
        {SECTOR_DASHBOARDS.map((d, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={d.slug}
              role="tab"
              aria-selected={isActive}
              aria-controls={`dashboard-panel-${d.slug}`}
              onClick={() => setActiveIdx(i)}
              className={[
                "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60",
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
            aria-label={`Cockpit ${active.short} — ${active.meta}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.99 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/55 backdrop-blur-xl"
            style={{
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {active.render(shouldReduceMotion)}
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
