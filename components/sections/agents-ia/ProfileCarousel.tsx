"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { PauseOffscreen } from "@/lib/animation/inViewPause";
import { PROFILES } from "./profilesData";
import { AgentPlan } from "./AgentPlan";

const ROTATION_MS = 9000;

/**
 * « Pour qui ? » : un onglet par profil, un constat + un objectif, puis la
 * maquette de l'assistant au travail (fiche remplie, brouillons, journal,
 * outils reliés). La première maquette est rendue côté serveur ; le
 * défilement automatique s'arrête dès que le visiteur choisit un profil et
 * n'existe pas sur tactile.
 */
export function ProfileCarousel() {
  const { shouldReduceMotion, mounted, isCoarsePointer } = usePerformanceMode();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [userPicked, setUserPicked] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const inViewRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const autoplayActive = mounted && !shouldReduceMotion && !isHover && !userPicked && !isCoarsePointer;

  useEffect(() => {
    if (!autoplayActive) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, [autoplayActive]);

  useEffect(() => {
    if (!autoplayActive) return;
    const id = setInterval(() => {
      if (!inViewRef.current) return;
      setActiveIdx((prev) => (prev + 1) % PROFILES.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [autoplayActive]);

  useEffect(() => {
    setCycleKey((k) => k + 1);
  }, [activeIdx]);

  const active = PROFILES[activeIdx];
  // Avant montage : maquette rendue statique (présente dans le HTML), animations après hydratation.
  const reduced = !mounted || shouldReduceMotion;

  return (
    <section className="section-shell-tight relative isolate overflow-hidden">
      <div className="section-container">
        <SectionHeading
          labelStyle="eyebrow"
          label="Pour qui ?"
          title={
            <>
              Pas un outil universel{"\u00a0"}:{" "}
              <span className="text-gradient-strong">un assistant conçu pour votre rôle</span>.
            </>
          }
          description="Choisissez votre profil. Vous verrez le plan de l'agent scène par scène (ce qu'il lit, ce qu'il cherche, ce qu'il remplit, ce que vous validez), puis l'outil tel que vous le verriez au quotidien."
        />

        <div
          ref={containerRef}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="mx-auto flex max-w-[1080px] flex-col gap-4"
        >
          {/* Onglets */}
          <div role="tablist" aria-label="Profils d'utilisateur" className="flex flex-wrap justify-center gap-2">
            {PROFILES.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={p.slug}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`profile-panel-${p.slug}`}
                  onClick={() => {
                    setActiveIdx(i);
                    setUserPicked(true);
                  }}
                  className={[
                    "rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60",
                    isActive
                      ? "border border-accent-primary/55 bg-bg-card text-accent-light"
                      : "border border-border-subtle bg-bg-card/40 text-text-tertiary hover:border-border-medium hover:text-text-secondary",
                  ].join(" ")}
                  style={
                    isActive
                      ? { boxShadow: "0 0 22px var(--color-accent-glow-strong), inset 0 1px 0 rgba(255,255,255,0.04)" }
                      : undefined
                  }
                >
                  {p.short}
                </button>
              );
            })}
          </div>

          {/* Progression du défilement automatique */}
          <div className="relative h-px overflow-hidden rounded-full bg-border-subtle/60">
            {autoplayActive ? (
              <motion.span
                key={cycleKey}
                className="absolute inset-0 block origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: ROTATION_MS / 1000, ease: "linear" }}
                style={{
                  background: "linear-gradient(90deg, var(--color-accent-primary) 0%, var(--color-cyan) 100%)",
                  boxShadow: "0 0 8px var(--color-accent-glow)",
                }}
              />
            ) : (
              <span className="absolute inset-y-0 left-0 w-full" style={{ background: "var(--color-border-subtle)" }} />
            )}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.slug}
              id={`profile-panel-${active.slug}`}
              role="tabpanel"
              aria-label={`Profil ${active.short}`}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              {/* Constat → objectif */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-danger/25 bg-danger-glow px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                    Aujourd&apos;hui · constat
                  </p>
                  <p className="mt-2 font-mono text-[20px] font-semibold leading-none text-text-primary">
                    {active.pain.stat}
                    <span className="ml-2 font-sans text-[12px] font-normal text-text-secondary">{active.pain.label}</span>
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-text-tertiary">{active.pain.detail}</p>
                </div>
                <div className="rounded-xl border border-success/25 bg-success-glow px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                    Avec l&apos;assistant · objectif à 30 jours
                  </p>
                  <p className="mt-2 text-[20px] font-semibold leading-none text-gradient-strong">{active.gain.value}</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">{active.gain.label}</p>
                </div>
              </div>

              {/* Le plan de l'agent : mini film schématique en six scènes */}
              <PauseOffscreen>
                <AgentPlan plan={active.plan} reduced={reduced} />
              </PauseOffscreen>

              {/* Maquette de l'assistant au travail */}
              <div className="relative rounded-2xl" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
                <PauseOffscreen>{active.render(reduced)}</PauseOffscreen>
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-[11px] leading-relaxed text-text-tertiary">
            Maquette illustrative : les chiffres affichés sont des exemples, pas des résultats clients. Les outils cités sont des exemples courants du métier.
          </p>
        </div>
      </div>
    </section>
  );
}
