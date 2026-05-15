"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/lib/content/navigation";
import { cn } from "@/lib/utils/cn";
import { useLoadingState } from "@/components/shared/AppShell";

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [logoPhase, setLogoPhase] = useState<"hidden" | "full" | "split">("hidden");
  const dropdownTimeout = useRef<NodeJS.Timeout>(undefined);
  const pathname = usePathname();
  const { hideHeaderLogo, registerLogoRef } = useLoadingState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Logo animation phase 1: hidden -> full (when loading completes)
  useEffect(() => {
    if (!hideHeaderLogo && logoPhase === "hidden") {
      setLogoPhase("full");
    }
  }, [hideHeaderLogo, logoPhase]);

  // Logo animation phase 2: full -> split (after 1.5 seconds)
  useEffect(() => {
    if (logoPhase === "full") {
      const timer = setTimeout(() => {
        setLogoPhase("split");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [logoPhase]);

  function handleDropdownEnter(label: string) {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  }

  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-bg-primary/82 backdrop-blur-2xl border-b border-border-subtle shadow-lg shadow-black/15"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 lg:h-28 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center group">
            <div ref={registerLogoRef} className="flex items-center">

              {/* Full logo - shown before split */}
              <AnimatePresence mode="wait">
                {logoPhase === "full" && (
                  <motion.div
                    className="relative w-[290px] h-[145px] lg:w-[320px] lg:h-[160px]"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      filter: "blur(8px)",
                      transition: { duration: 0.4 }
                    }}
                    transition={{
                      duration: 0.6,
                      ease: premiumEase
                    }}
                  >
                    <Image
                      src="/branding/logo-s2ia.png"
                      alt="Solutions 2IA"
                      fill
                      className="object-contain object-left"
                      sizes="320px"
                      priority
                    />
                  </motion.div>
                )}

                {/* Split logo - shown after 1.5 seconds */}
                {logoPhase === "split" && (
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: premiumEase }}
                  >
                    {/* Logo S - stays in place */}
                    <motion.div
                      className="relative w-12 h-12 lg:w-14 lg:h-14 transition-transform duration-300 group-hover:scale-105"
                    >
                      <Image
                        src="/branding/logo-s.png"
                        alt="S"
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    </motion.div>

                    {/* "olutions" text - reveals smoothly and pushes 2IA to the right */}
                    <motion.div
                      className="overflow-hidden -ml-1"
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <motion.span
                        className="text-lg lg:text-xl font-bold tracking-tight text-text-primary whitespace-nowrap block"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: premiumEase }}
                      >
                        olutions
                      </motion.span>
                    </motion.div>

                    {/* Spacer */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "0.5rem" }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    />

                    {/* Logo 2IA - gets pushed right smoothly by the expanding text */}
                    <motion.div
                      className="relative w-20 h-20 lg:w-24 lg:h-24 -mt-4 lg:-mt-5 transition-transform duration-300 group-hover:scale-105"
                    >
                      <Image
                        src="/branding/logo-2ia.png"
                        alt="2IA"
                        fill
                        className="object-contain"
                        sizes="96px"
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors duration-300 rounded-lg",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-text-primary bg-white/[0.04]"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-1 opacity-40">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border-subtle bg-bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/20 p-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2.5 text-sm rounded-lg transition-all duration-200",
                            pathname === child.href
                              ? "text-accent-light bg-accent-glow"
                              : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04]"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant="primary" size="sm" href="/contact">
              Démarrer un projet
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Menu"
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-text-primary" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-px bg-text-primary" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-px bg-text-primary" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              <Link href="/" className="text-2xl font-semibold text-text-primary tracking-tight">
                Accueil
              </Link>
              {mainNav.map((item) => (
                <div key={item.href} className="text-center">
                  <Link href={item.href} className="text-2xl font-semibold text-text-primary tracking-tight">
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-3 flex flex-col gap-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-base text-text-secondary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button variant="primary" size="lg" href="/contact">
                Démarrer un projet
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
