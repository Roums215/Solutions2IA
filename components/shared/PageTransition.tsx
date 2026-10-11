"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Changement de page : affichage immédiat, sans fondu (octobre 2026).
 *
 * L'ancienne version remontait la page (key={pathname}) depuis opacity 0 en 0,4 s :
 * mesuré au téléphone, la nouvelle page restait invisible ~0,5 s après chaque clic,
 * ressenti comme « le site ne change pas de page ». Le routeur a déjà la page
 * préchargée : elle doit s'afficher dès qu'il la rend.
 *
 * Au premier changement de page, pose <html data-nav="client"> : l'entrée en cascade
 * des heros (.hero-enter, globals.css) est réservée au premier chargement. Layout
 * effect : l'attribut est posé avant la première peinture de la nouvelle page, son
 * titre n'apparaît jamais à opacity 0.
 *
 * ⚠️ Si une transition revient un jour, elle ne part jamais de opacity 0 : ni au premier
 * chargement (LCP de 1,8 s à ~8 s), ni en navigation (latence perçue).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Comparaison au chemin précédent (et non un drapeau « premier rendu ») : le double
  // appel des effets en StrictMode ne doit pas poser l'attribut dès le chargement.
  const previous = useRef(pathname);

  useLayoutEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    document.documentElement.setAttribute("data-nav", "client");
  }, [pathname]);

  return <>{children}</>;
}
