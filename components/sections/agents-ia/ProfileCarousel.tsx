"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { PROFILES } from "./profilesData";

const ROTATION_MS = 7000;

export function ProfileCarousel() {
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
      setActiveIdx((prev) => (prev + 1) % PROFILES.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, [shouldReduceMotion, isHover]);

  useEffect(() => {
    setCycleKey((k) => k + 1);
  }, [activeIdx]);

  if (!mounted) {
    return <section className="section-shell" aria-hidden />;
  }

  const active = PROFILES[activeIdx];
  const autoplayActive = !shouldReduceMotion && !isHover;

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeading
          label="Pour qui ?"
          title={
            <>
              Pas un outil universel :{" "}
              <span className="text-gradient-strong">un assistant conçu pour votre rôle</span>.
            </>
          }
          description="Choisissez votre profil. Vous verrez ce qu'un assistant numérique prend vraiment en charge, et ce qu'il vous rend."
        />

        <div
          ref={containerRef}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="mx-auto flex max-w-2xl flex-col gap-3"
        >
          {/* Tabs */}
          <div role="tablist" aria-label="Profils d'utilisateur" className="flex flex-wrap gap-1.5">
            {PROFILES.map((p, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={p.slug}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`profile-panel-${p.slug}`}
                  onClick={() => setActiveIdx(i)}
                  className={[
                    "rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60",
                    isActive
                      ? "border border-accent-primary/55 bg-bg-card text-accent-light"
                      : "border border-border-subtle bg-bg-card/40 text-text-tertiary hover:border-border-medium hover:text-text-secondary",
                  ].join(" ")}
                  style={
                    isActive
                      ? {
                          boxShadow:
                            "0 0 22px rgba(139,92,246,0.32), inset 0 1px 0 rgba(255,255,255,0.04)",
                        }
                      : undefined
                  }
                >
                  {p.short}
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
                  background:
                    "linear-gradient(90deg, var(--color-accent-primary) 0%, var(--color-cyan) 100%)",
                  boxShadow: "0 0 8px rgba(139,92,246,0.4)",
                }}
              />
            ) : (
              <span
                className="absolute inset-y-0 left-0 w-full"
                style={{ background: "var(--color-border-subtle)" }}
              />
            )}
          </div>

          {/* Profile card */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={active.slug}
                id={`profile-panel-${active.slug}`}
                role="tabpanel"
                aria-label={`Profil ${active.short}`}
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
      </div>
    </section>
  );
}
