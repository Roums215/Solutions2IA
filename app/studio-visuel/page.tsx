import { permanentRedirect } from "next/navigation";

/**
 * Page supprimée (décision 2026-06-12) — le redirect 308 principal vit dans
 * next.config.ts (redirects()). Ce fallback couvre tout chemin résiduel.
 * Le savoir-faire visuel/motion est raconté dans /services et /sites-web.
 * TODO (quand le shell sera disponible) : `git rm -r app/studio-visuel`.
 */
export default function Page() {
  permanentRedirect("/services");
}
