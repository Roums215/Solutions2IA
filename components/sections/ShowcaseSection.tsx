"use client";

import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animation/variants";

function MockDashboard() {
  return (
    <motion.div
      variants={scaleIn}
      className="rounded-2xl border border-border-subtle bg-bg-card/70 backdrop-blur-sm p-5 shadow-2xl card-shine"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 mb-5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-[10px] text-text-tertiary font-mono px-3 py-0.5 rounded bg-bg-tertiary/50">dashboard.solutions2ia.fr</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Utilisateurs", value: "12,847", change: "+24%", up: true },
          { label: "Revenus", value: "€47.2K", change: "+18%", up: true },
          { label: "Conversion", value: "8.4%", change: "+3.2%", up: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-bg-tertiary/40 border border-border-subtle p-3.5 transition-colors hover:border-border-accent/30"
          >
            <span className="text-[9px] text-text-tertiary uppercase tracking-[0.12em] font-medium block">
              {stat.label}
            </span>
            <div className="flex items-end justify-between mt-2">
              <span className="text-base font-bold leading-none">{stat.value}</span>
              <span className="text-[10px] text-green-400 font-mono font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl bg-bg-tertiary/30 border border-border-subtle p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-medium">Activité mensuelle</span>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent-primary/60" />
              <span className="text-[9px] text-text-tertiary">Visites</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan/50" />
              <span className="text-[9px] text-text-tertiary">Conversions</span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-[3px] h-32">
          {Array.from({ length: 28 }, (_, i) => {
            const base = Math.sin(i * 0.25) * 25 + 50;
            const h1 = Math.min(95, Math.max(15, base + (i * 1.2)));
            const h2 = h1 * 0.4;
            return (
              <div key={i} className="flex-1 flex flex-col justify-end gap-[1px]">
                <div
                  className="w-full rounded-t-sm bg-gradient-to-t from-accent-primary/25 to-accent-light/40"
                  style={{ height: `${h1}%` }}
                />
                <div
                  className="w-full rounded-t-sm bg-gradient-to-t from-cyan/20 to-cyan/35"
                  style={{ height: `${h2}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[8px] text-text-tertiary font-mono">1 Mar</span>
          <span className="text-[8px] text-text-tertiary font-mono">15 Mar</span>
          <span className="text-[8px] text-text-tertiary font-mono">28 Mar</span>
        </div>
      </div>

      {/* Bottom row — mini stats */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {[
          { label: "Pages/session", value: "4.2" },
          { label: "Durée moy.", value: "3:42" },
          { label: "Rebond", value: "24%" },
          { label: "Objectifs", value: "89%" },
        ].map((s) => (
          <div key={s.label} className="text-center py-2">
            <span className="text-xs font-semibold font-mono text-text-primary block">{s.value}</span>
            <span className="text-[8px] text-text-tertiary">{s.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MockMobileApp() {
  return (
    <motion.div
      variants={scaleIn}
      className="w-52 rounded-[28px] border border-border-subtle bg-bg-card/70 backdrop-blur-sm p-3 shadow-2xl mx-auto card-shine"
    >
      {/* Status bar */}
      <div className="flex justify-between items-center mb-3 px-2">
        <span className="text-[9px] text-text-tertiary font-medium">9:41</span>
        <div className="w-16 h-4 rounded-full bg-bg-primary" />
        <div className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-tertiary">
            <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55" />
          </svg>
          <div className="w-5 h-2.5 rounded-sm border border-text-tertiary/40 relative">
            <div className="absolute inset-0.5 rounded-xs bg-green-400/60" />
          </div>
        </div>
      </div>

      {/* Hero card */}
      <div className="rounded-2xl bg-gradient-to-br from-accent-primary/20 via-accent-dark/10 to-cyan/10 border border-border-subtle p-3 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-primary to-accent-dark flex items-center justify-center shadow-sm shadow-accent-glow/30">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-semibold block leading-tight">Solutions 2IA</span>
            <span className="text-[8px] text-text-tertiary">Tableau de bord</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg bg-white/5 p-2 text-center">
            <span className="text-[10px] font-bold text-accent-light block">+73%</span>
            <span className="text-[7px] text-text-tertiary">Efficacité</span>
          </div>
          <div className="flex-1 rounded-lg bg-white/5 p-2 text-center">
            <span className="text-[10px] font-bold text-cyan block">24/7</span>
            <span className="text-[7px] text-text-tertiary">Actif</span>
          </div>
        </div>
      </div>

      {/* List items */}
      {[
        { title: "Analyse terminée", sub: "Rapport disponible", dot: "bg-green-400" },
        { title: "3 automatisations", sub: "En cours d'exécution", dot: "bg-accent-light" },
        { title: "Mise à jour IA", sub: "Nouvelle version prête", dot: "bg-cyan" },
      ].map((item) => (
        <div key={item.title} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-bg-tertiary/30 border border-border-subtle mb-2">
          <div className={`w-2 h-2 rounded-full ${item.dot} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-medium text-text-primary truncate">{item.title}</div>
            <div className="text-[8px] text-text-tertiary truncate">{item.sub}</div>
          </div>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-tertiary flex-shrink-0">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      ))}

      {/* Tab bar */}
      <div className="flex justify-around mt-3 pt-2.5 border-t border-border-subtle">
        {[
          <svg key="home" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-light"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
          <svg key="search" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-tertiary"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
          <svg key="chart" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-tertiary"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>,
          <svg key="user" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-tertiary"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        ].map((icon, i) => (
          <div key={i} className="p-1.5">{icon}</div>
        ))}
      </div>
    </motion.div>
  );
}

function MockAIChat() {
  return (
    <motion.div
      variants={scaleIn}
      className="rounded-2xl border border-border-accent/60 bg-bg-card/70 backdrop-blur-sm p-4 shadow-2xl shadow-accent-glow/5 card-shine"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border-subtle">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-primary to-accent-dark flex items-center justify-center shadow-sm shadow-accent-glow/30">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="9" cy="16" r="1" fill="white" />
            <circle cx="15" cy="16" r="1" fill="white" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        </div>
        <div className="flex-1">
          <span className="text-xs font-semibold block leading-tight">Assistant IA</span>
          <span className="text-[9px] text-green-400 font-medium">En ligne, répond en 0.3s</span>
        </div>
        <div className="flex gap-1">
          <div className="w-5 h-5 rounded-md bg-bg-tertiary/50 border border-border-subtle" />
          <div className="w-5 h-5 rounded-md bg-bg-tertiary/50 border border-border-subtle" />
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3">
        <div className="max-w-[88%]">
          <div className="bg-bg-tertiary/50 rounded-2xl rounded-tl-md p-3">
            <p className="text-[10px] text-text-secondary leading-relaxed">
              J&apos;ai analysé vos données du trimestre. Votre taux de conversion a augmenté
              de <span className="text-green-400 font-medium">24%</span>. Je recommande d&apos;optimiser la page produit pour capitaliser sur cette tendance.
            </p>
          </div>
          <span className="text-[8px] text-text-tertiary mt-1 block">14:32</span>
        </div>

        <div className="max-w-[88%] ml-auto">
          <div className="bg-accent-primary/15 border border-accent-primary/20 rounded-2xl rounded-tr-md p-3">
            <p className="text-[10px] text-text-primary leading-relaxed">
              Lance l&apos;optimisation automatique sur les 5 pages principales.
            </p>
          </div>
          <span className="text-[8px] text-text-tertiary mt-1 block text-right">14:33</span>
        </div>

        <div className="max-w-[88%]">
          <div className="bg-bg-tertiary/50 rounded-2xl rounded-tl-md p-3">
            <p className="text-[10px] text-text-secondary leading-relaxed">
              Optimisation lancée sur 5 pages. Temps estimé : <span className="text-accent-light font-mono">12 min</span>.
              Je vous envoie le rapport dès que c&apos;est terminé.
            </p>
            {/* Mini progress */}
            <div className="mt-2 rounded-lg bg-bg-primary/50 p-2">
              <div className="flex justify-between mb-1">
                <span className="text-[8px] text-text-tertiary">Progression</span>
                <span className="text-[8px] text-accent-light font-mono">3/5 pages</span>
              </div>
              <div className="h-1 rounded-full bg-bg-tertiary">
                <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-accent-primary to-cyan" />
              </div>
            </div>
          </div>
          <span className="text-[8px] text-text-tertiary mt-1 block">14:33</span>
        </div>
      </div>

      {/* Input */}
      <div className="mt-4 flex items-center gap-2 p-2 rounded-xl bg-bg-tertiary/30 border border-border-subtle">
        <span className="text-[10px] text-text-tertiary flex-1">Demander à l&apos;assistant...</span>
        <div className="w-6 h-6 rounded-lg bg-accent-primary/20 flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-light">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function ShowcaseSection() {
  return (
    <section id="showcase" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-radial-top" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Réalisations"
          title="Des expériences qui marquent"
          description="Dashboards intelligents, applications mobiles élégantes, assistants IA : nous donnons vie à des produits digitaux premium."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7"
        >
          {/* Dashboard — large */}
          <div className="lg:col-span-7">
            <MockDashboard />
          </div>

          {/* Mobile + AI stacked */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <MockMobileApp />
            <MockAIChat />
          </div>
        </motion.div>

        {/* Capabilities tags */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Agents IA",
            "GSAP",
            "Motion Design",
            "Tailwind CSS",
            "Automatisation",
            "2D / 3D",
            "Remotion",
            "Rive",
            "API REST",
          ].map((tag) => (
            <motion.span
              key={tag}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, borderColor: "rgba(99,102,241,0.4)" }}
              className="px-4 py-2 text-xs font-medium text-text-secondary bg-bg-card/60 border border-border-subtle rounded-full transition-colors duration-300 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
