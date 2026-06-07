"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePerformanceMode } from "@/lib/animation/usePerformanceMode";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import {
  HOME_PROFILES,
  HOME_PROFILES_CLOSING,
  HOME_PROFILES_CLOSING_HREF,
  type HomeProfile,
  type ProfileIcon,
} from "./homeProfilesData";

/**
 * S1 V7.0 — Profil multi-audience (home).
 *
 * Grille 3×2 desktop, stack vertical mobile. 6 cards profil métier cliquables
 * qui redirigent vers la page-produit la plus pertinente pour chaque audience.
 *
 * Distinction CG B1 : grille audience profile (jamais réutilisée ailleurs).
 *
 * Motion Option B : stagger 80ms par card, opacity 0→1 + translateY 12→0.
 * Aucune boucle. prefers-reduced-motion → tout statique.
 */
export function HomeProfileMatrix() {
  const { mounted, shouldReduceMotion } = usePerformanceMode();
  const staticRender = !mounted || shouldReduceMotion;

  const parentProps = staticRender
    ? {}
    : ({
        variants: staggerContainer,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-80px" },
      } as const);

  const itemVariants = staticRender ? undefined : fadeInUp;

  return (
    <section
      className="section-shell"
      aria-labelledby="home-profiles-heading"
    >
      <div className="section-container">
        <SectionHeading
          label="Pour qui"
          title={
            <>
              Quel est votre{" "}
              <span className="text-gradient-strong">profil</span> ?
            </>
          }
          description="Six profils types. Le système Solutions 2IA s'adapte à votre métier, à votre taille, à vos outils existants."
        />

        <motion.ul
          role="list"
          aria-label="Six profils d'activité"
          className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          {...parentProps}
        >
          {HOME_PROFILES.map((profile) => (
            <ProfileCard
              key={profile.key}
              profile={profile}
              itemVariants={itemVariants}
            />
          ))}
        </motion.ul>

        <motion.p
          variants={itemVariants}
          initial={staticRender ? false : "hidden"}
          whileInView={staticRender ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-10 max-w-[640px] text-center text-sm italic text-text-tertiary sm:text-base"
        >
          {HOME_PROFILES_CLOSING}{" "}
          <Link
            href={HOME_PROFILES_CLOSING_HREF}
            className="text-cyan/85 underline-offset-4 transition-colors duration-300 hover:text-cyan hover:underline"
          >
            → contact
          </Link>
        </motion.p>
      </div>
    </section>
  );
}

// ─── Sub-composants ────────────────────────────────────────────────────────

function ProfileCard({
  profile,
  itemVariants,
}: {
  profile: HomeProfile;
  itemVariants: typeof fadeInUp | undefined;
}) {
  return (
    <motion.li
      variants={itemVariants}
      className="group relative h-full"
    >
      <Link
        href={profile.bridge.href}
        className="flex h-full min-h-[200px] flex-col rounded-2xl border border-border-subtle bg-bg-card/50 px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/40 hover:bg-bg-card-hover focus-visible:outline-2 focus-visible:outline-cyan/60 focus-visible:outline-offset-2 sm:px-6 sm:py-6"
        aria-label={`Profil ${profile.label}`}
      >
        {/* Icône en haut */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border-subtle bg-bg-card text-cyan transition-colors duration-300 group-hover:border-cyan/40">
          <ProfileIconRender icon={profile.icon} />
        </div>

        {/* Label métier (header pill) */}
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan/80">
          {profile.label}
        </span>

        {/* Titre court (la promesse) */}
        <h3 className="mt-2 text-[16px] font-semibold leading-snug text-text-primary sm:text-[17px]">
          {profile.title}
        </h3>

        {/* Bénéfice détaillé */}
        <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
          {profile.benefice}
        </p>

        {/* Lien d'action en bas */}
        <span className="mt-auto pt-4 text-[12px] font-medium text-cyan/85 transition-colors duration-300 group-hover:text-cyan">
          → {profile.bridge.label}
        </span>
      </Link>
    </motion.li>
  );
}

function ProfileIconRender({ icon }: { icon: ProfileIcon }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "entrepreneur":
      // Silhouette individu seul
      return (
        <svg {...common}>
          <circle cx="12" cy="7" r="3.5" />
          <path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" />
        </svg>
      );
    case "artisan":
      // Clé à molette (outil)
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 1 0 3 6.7l5.3 5.3-2.7 2.7-5.3-5.3a4 4 0 0 1-6.7-3" />
          <path d="M10 14l-7 7" />
        </svg>
      );
    case "cabinet":
      // Balance / dossier juridique
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h8M8 15h5" />
        </svg>
      );
    case "commerce":
      // Sac shopping / boutique
      return (
        <svg {...common}>
          <path d="M5 8h14l-1.5 12.5a1 1 0 0 1-1 .9H7.5a1 1 0 0 1-1-.9L5 8z" />
          <path d="M9 8V5.5a3 3 0 0 1 6 0V8" />
        </svg>
      );
    case "pme":
      // Building avec étages
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="17" rx="1" />
          <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" />
          <path d="M10 21v-3h4v3" />
        </svg>
      );
    case "services":
      // Engrenage + équipe (deux cercles)
      return (
        <svg {...common}>
          <circle cx="8" cy="9" r="3" />
          <path d="M3 19c0-2.5 2-4.5 5-4.5s5 2 5 4.5" />
          <circle cx="17" cy="11" r="2.5" />
          <path d="M14.5 19c.3-2 2-3.5 5-3.5" />
        </svg>
      );
  }
}
