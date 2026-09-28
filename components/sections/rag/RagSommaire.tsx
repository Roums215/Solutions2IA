const ITEMS = [
  { href: "#ce-que-ca-change", label: "Ce que ça change" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#usages", label: "Les quatre usages" },
  { href: "#installation", label: "L'installation" },
  { href: "#pour-qui", label: "Pour quel métier" },
  { href: "#vos-donnees", label: "Vos données" },
  { href: "#limites", label: "Ce qu'elle ne fait pas" },
];

/**
 * Sommaire ancré, collé sous le hero. Pas de h2 (c'est une navigation),
 * pas d'animation (zone LCP), pilules 44 px tactiles.
 */
export function RagSommaire() {
  return (
    <section className="section-shell-compact" style={{ paddingTop: 0 }}>
      <div className="section-container">
        <nav aria-label="Sommaire de la page" className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-tertiary">
            Sommaire
          </p>
          <ol className="mt-4 flex flex-wrap justify-center gap-3">
            {ITEMS.map((it, i) => (
              <li key={it.href}>
                <a
                  href={it.href}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border-subtle bg-bg-card/55 px-4 py-2 text-sm text-text-secondary transition-colors duration-300 hover:border-border-medium hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light/60"
                >
                  <span className="font-mono text-[10px] text-text-tertiary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {it.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
