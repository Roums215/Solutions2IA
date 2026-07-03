"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

// false au 1er chargement (SSR + 1re hydration) : le HTML doit arriver
// visible — l'élément LCP ne peut pas attendre l'hydration pour être peint.
// true ensuite : la transition de marque ne joue qu'en navigation client
// (le key={pathname} remonte le composant à chaque changement de page).
let hasNavigated = false;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={hasNavigated ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
