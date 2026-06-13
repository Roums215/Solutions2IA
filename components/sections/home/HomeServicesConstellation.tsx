"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import {
  HOME_SERVICES,
  HOME_SERVICES_CENTER,
  HOME_SERVICES_CLOSING,
  HOME_SERVICES_CLOSING_HREF,
  HOME_SERVICES_CLOSING_LABEL,
  type HomeService,
  type ServiceIcon,
} from "./homeServicesData";

const PREMIUM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const CYAN = "var(--color-cyan)";
const ACCENT_LIGHT = "var(--color-accent-light)";
const ACCENT = "var(--color-accent-primary)";

/**
 * S3 V7.0 — Constellation 6 services (home).
 *
 * Desktop : 6 nœuds disposés en hexagone autour d'un nœud central « SYSTÈME »
 * relié par fines lignes SVG. Mobile : grille 2×3 stack vertical sans graphisme
 * de constellation (lisibilité priorisée).
 *
 * Distinction CG B1 : constellation hexagonale (jamais réutilisée ailleurs).
 *
 * Motion Option B : draw one-shot des 6 lignes radiales (pathLength 0→1),
 * stagger cards. prefers-reduced-motion → tout statique au mount.
 */
export function HomeServicesConstellation() {
  const { mounted, disableContentMotion } = usePerformanceMode();
  const staticRender = !mounted || disableContentMotion;

  const parentProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  const lineVariants: Variants | undefined = staticRender
    ? undefined
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: { duration: 0.6, ease: PREMIUM_EASE },
        },
      };

  return (
    <section
      className="section-shell"
      aria-labelledby="home-services-heading"
    >
      <div className="section-container">
        <SectionHeading
          label="Notre gamme"
          title={
            <>
              Six services,{" "}
              <span className="text-gradient-strong">un seul système</span>.
            </>
          }
          description="Chaque service répond à une couche du système. Ils s'articulent entre eux pour accompagner votre activité."
        />

        {/* ─── DESKTOP — Constellation hexagone ─────────────────────────── */}
        <div className="relative mx-auto hidden max-w-[900px] lg:block">
          <DesktopConstellation
            services={HOME_SERVICES}
            itemVariants={itemVariants}
            lineVariants={lineVariants}
          />
        </div>

        {/* ─── MOBILE / TABLET — Grille 2×3 ─────────────────────────────── */}
        <motion.ul
          role="list"
          aria-label="Six services Solutions 2IA"
          className="mx-auto grid max-w-[680px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:hidden"
          {...parentProps}
        >
          {HOME_SERVICES.map((service) => (
            <ServiceCard
              key={service.key}
              service={service}
              itemVariants={itemVariants}
            />
          ))}
        </motion.ul>

        {/* Phrase fermante + lien */}
        <motion.p
          variants={itemVariants}
          initial={staticRender ? false : "hidden"}
          whileInView={staticRender ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-12 max-w-[640px] text-center text-sm italic text-text-tertiary sm:text-base"
        >
          {HOME_SERVICES_CLOSING}{" "}
          <Link
            href={HOME_SERVICES_CLOSING_HREF}
            className="text-cyan/85 underline-offset-4 transition-colors duration-300 hover:text-cyan hover:underline"
          >
            → {HOME_SERVICES_CLOSING_LABEL}
          </Link>
        </motion.p>
      </div>
    </section>
  );
}

// ─── Constellation desktop ─────────────────────────────────────────────────

function DesktopConstellation({
  services,
  itemVariants,
  lineVariants,
}: {
  services: HomeService[];
  itemVariants: typeof fadeInUp | undefined;
  lineVariants: Variants | undefined;
}) {
  // Positions pentagone (en pourcentage du conteneur) — 5 services depuis la
  // suppression de /studio-visuel (2026-06-12). Centre : 50% / 50%.
  const positions = [
    { x: 50, y: 8 },   // top — Sites web (service 0)
    { x: 88, y: 38 },  // top-right — Applications (service 1)
    { x: 73, y: 88 },  // bottom-right — Agents IA (service 2)
    { x: 27, y: 88 },  // bottom-left — Automatisation (service 3)
    { x: 12, y: 38 },  // top-left — RAG (service 4)
  ];

  return (
    <div className="relative aspect-[5/4] w-full">
      {/* SVG lines (de chaque nœud vers le centre) */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="constellation-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={CYAN} stopOpacity="0.85" />
            <stop offset="50%" stopColor={ACCENT_LIGHT} stopOpacity="0.95" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="constellation-perim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={CYAN} stopOpacity="0.55" />
            <stop offset="50%" stopColor={ACCENT_LIGHT} stopOpacity="0.65" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* 6 lignes hexagonales périmétriques (nœud i → nœud i+1) */}
        {positions.map((pos, i) => {
          const next = positions[(i + 1) % positions.length];
          return (
            <motion.line
              key={`perim-${i}`}
              x1={pos.x}
              y1={pos.y}
              x2={next.x}
              y2={next.y}
              stroke="url(#constellation-perim)"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: "1px" }}
              strokeDasharray="3 3"
              variants={lineVariants}
            />
          );
        })}

        {/* 6 lignes radiales nœud → centre (plein, plus marqué) */}
        {positions.map((pos, i) => (
          <motion.line
            key={`radial-${i}`}
            x1={pos.x}
            y1={pos.y}
            x2={50}
            y2={50}
            stroke="url(#constellation-grad)"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: "1.5px" }}
            variants={lineVariants}
          />
        ))}

        {/* Points lumineux à chaque nœud (visible même si caché par la card) */}
        {positions.map((pos, i) => (
          <circle
            key={`dot-${i}`}
            cx={pos.x}
            cy={pos.y}
            r="0.9"
            fill={CYAN}
            fillOpacity="0.75"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Nœud central « SYSTÈME » */}
      <motion.div
        variants={itemVariants}
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-cyan/50 bg-bg-card/95 px-5 py-3 shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur-sm">
          <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-cyan">
            {HOME_SERVICES_CENTER.label}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-text-secondary">
            {HOME_SERVICES_CENTER.sublabel}
          </span>
        </div>
      </motion.div>

      {/* 6 cards services positionnées */}
      {services.map((service, i) => {
        const pos = positions[i];
        return (
          <motion.div
            key={service.key}
            variants={itemVariants}
            className="absolute z-20"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Link
              href={service.href}
              className="group flex w-[170px] flex-col items-center gap-1.5 rounded-xl border border-border-subtle bg-bg-card/90 px-3 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/50 focus-visible:outline-2 focus-visible:outline-cyan/60 focus-visible:outline-offset-2"
              aria-label={`Service ${service.title}`}
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg border border-border-subtle bg-bg-card text-cyan transition-colors duration-300 group-hover:border-cyan/40">
                <ServiceIconRender icon={service.icon} />
              </div>
              <span className="text-center text-[13px] font-semibold leading-tight text-text-primary">
                {service.title}
              </span>
              <span className="text-center text-[11px] leading-snug text-text-tertiary">
                {service.benefice}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Card mobile (grille 2×3) ──────────────────────────────────────────────

function ServiceCard({
  service,
  itemVariants,
}: {
  service: HomeService;
  itemVariants: typeof fadeInUp | undefined;
}) {
  return (
    <motion.li
      variants={itemVariants}
      className="group relative h-full"
    >
      <Link
        href={service.href}
        className="flex h-full min-h-[140px] flex-col gap-2 rounded-xl border border-border-subtle bg-bg-card/60 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-bg-card-hover focus-visible:outline-2 focus-visible:outline-cyan/60 focus-visible:outline-offset-2"
        aria-label={`Service ${service.title}`}
      >
        <div className="grid h-10 w-10 place-items-center rounded-lg border border-border-subtle bg-bg-card text-cyan transition-colors duration-300 group-hover:border-cyan/40">
          <ServiceIconRender icon={service.icon} />
        </div>
        <h3 className="text-[14px] font-semibold leading-tight text-text-primary">
          {service.title}
        </h3>
        <p className="text-[12px] leading-snug text-text-tertiary">
          {service.benefice}
        </p>
      </Link>
    </motion.li>
  );
}

// ─── Icones services (SVG inline outlined) ─────────────────────────────────

function ServiceIconRender({ icon }: { icon: ServiceIcon }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "sites-web":
      // Globe + cursor (réseau)
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
        </svg>
      );
    case "applications":
      // Stack devices (mobile + desktop)
      return (
        <svg {...common}>
          <rect x="3" y="6" width="14" height="11" rx="1.5" />
          <rect x="14" y="3" width="7" height="18" rx="1.5" />
        </svg>
      );
    case "agents-ia":
      // Cerveau réseau (nœud central + branches)
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <circle cx="5" cy="5" r="1.5" />
          <circle cx="19" cy="5" r="1.5" />
          <circle cx="5" cy="19" r="1.5" />
          <circle cx="19" cy="19" r="1.5" />
          <path d="M6 6l4 4M18 6l-4 4M6 18l4-4M18 18l-4-4" />
        </svg>
      );
    case "automation":
      // Engrenages connectés
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3" />
          <circle cx="16" cy="15" r="2.5" />
          <path d="M9 4v2M9 12v2M4 9h2M12 9h2" />
          <path d="M16 11v1.5M16 17.5v1.5M13.5 15h1M17.5 15h1" />
        </svg>
      );
    case "rag":
      // Livre ouvert + nuage (citation source)
      return (
        <svg {...common}>
          <path d="M3 6c2-1 5-1 7 0v13c-2-1-5-1-7 0V6z" />
          <path d="M21 6c-2-1-5-1-7 0v13c2-1 5-1 7 0V6z" />
          <path d="M10 19c0-1.5 1-2 2-2s2 0.5 2 2" />
        </svg>
      );
    case "studio":
      // Triangle de couleurs (RGB → fusion)
      return (
        <svg {...common}>
          <circle cx="12" cy="7" r="3" />
          <circle cx="7" cy="16" r="3" />
          <circle cx="17" cy="16" r="3" />
        </svg>
      );
  }
}
