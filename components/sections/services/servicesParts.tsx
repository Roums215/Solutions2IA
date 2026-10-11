import { cn } from "@/lib/utils/cn";
import type { Service } from "./servicesPageData";

/** L'icône d'un service dans une petite bulle ronde (hero, bento, table des prix). */
export function ServiceIcon({ s, small = false, tone = "dark" }: { s: Service; small?: boolean; tone?: "dark" | "light" }) {
  const Icon = s.icon;
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-gradient-to-br ring-1",
        tone === "dark"
          ? "from-accent-primary/40 to-cyan/25 text-paper ring-paper/20 shadow-[inset_0_1px_0_color-mix(in_oklab,var(--color-paper)_35%,transparent)]"
          : "from-accent-primary/15 to-cyan/20 text-accent-dark ring-ink/10",
        small ? "h-8 w-8" : "h-11 w-11",
      )}
    >
      <Icon size={small ? 15 : 19} strokeWidth={1.8} />
    </span>
  );
}
