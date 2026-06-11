"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animation/variants";
import { footerNav } from "@/lib/content/navigation";

export function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-bg-secondary">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 pt-14 pb-3 lg:pt-16 lg:pb-3"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/branding/logo-s2ia.png"
                  alt="Solutions 2IA"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Solutions <span className="text-gradient">2IA</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Expériences digitales intelligentes. Sites web, applications,
              agents IA et automatisation pour les entreprises qui visent
              l&apos;excellence.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-text-tertiary">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>Disponible pour de nouveaux projets</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-text-tertiary mb-5">Navigation</h4>
            <ul className="space-y-3">
              {footerNav.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-text-tertiary mb-5">Services</h4>
            <ul className="space-y-3">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-text-tertiary mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@solutions2ia.com" className="text-sm text-text-secondary hover:text-accent-light transition-colors duration-300">
                  contact@solutions2ia.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-secondary hover:text-accent-light transition-colors duration-300">
                  Démarrer un projet
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="mt-10 border-t border-border-subtle pt-6">
          <h4 className="sr-only">Informations légales</h4>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:justify-start">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-text-tertiary transition-colors duration-300 hover:text-text-secondary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-5 pt-5 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-tertiary">&copy; {new Date().getFullYear()} Solutions 2IA. Tous droits réservés.</p>
          <p className="text-xs text-text-tertiary">
            Conçu et développé avec exigence par <span className="text-text-secondary">Solutions 2IA</span>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
