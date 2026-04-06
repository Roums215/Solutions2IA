"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";

const steps = [
  {
    number: "01",
    title: "Découverte",
    description:
      "Nous analysons votre activité, vos objectifs et vos contraintes. Chaque projet commence par une compréhension profonde de votre besoin réel.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Stratégie",
    description:
      "Définition de l'architecture, du positionnement et de la feuille de route. Les bonnes décisions prises tôt font la différence.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Design",
    description:
      "Direction artistique, UI/UX, prototypage. Chaque interface est conçue pour être mémorable, lisible et orientée conversion.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Développement",
    description:
      "Code propre, architecture solide, performance optimisée. Nous construisons des produits robustes avec les meilleures technologies.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "IA & Automatisation",
    description:
      "Intégration d'agents intelligents, workflows automatisés et systèmes qui font gagner du temps au quotidien.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="9" cy="16" r="1" fill="currentColor" /><circle cx="15" cy="16" r="1" fill="currentColor" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Livraison & Optimisation",
    description:
      "Tests, optimisation, déploiement. Puis suivi continu pour garantir que votre solution reste performante dans le temps.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function initGSAP() {
      const gsapModule = await import("gsap");
      const scrollModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!lineRef.current) return;

      const tween = gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current.parentElement,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      cleanup = () => {
        tween.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    initGSAP();
    return () => cleanup?.();
  }, []);

  return (
    <section id="process" className="relative py-28 lg:py-36 bg-bg-secondary overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px glow-line" />
      <div className="absolute inset-0 bg-radial-top" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Méthode"
          title="Un processus maîtrisé de bout en bout"
          description="Chaque projet suit une méthode rigoureuse pour garantir un résultat à la hauteur de vos ambitions."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-7 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-px bg-border-subtle">
            <div
              ref={lineRef}
              className="w-full h-full origin-top bg-gradient-to-b from-accent-primary via-cyan via-50% to-accent-primary"
            />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-20"
          >
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className={`relative flex items-start gap-8 lg:gap-16 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-7 lg:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-8 h-8 rounded-xl bg-bg-primary border border-border-accent flex items-center justify-center text-accent-light shadow-md shadow-accent-glow/10">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-20 lg:ml-0 lg:w-1/2 ${
                      isLeft ? "lg:pr-20 lg:text-right" : "lg:pl-20"
                    }`}
                  >
                    <span className="inline-block text-xs font-mono font-bold tracking-wider text-accent-light/50 mb-2">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-semibold mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
