import Link from "next/link";
import { cn } from "@/lib/utils";

type LegalSection = {
  title: string;
  body?: string[];
  items?: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  updatedAt?: string;
  notice?: string;
  sections: LegalSection[];
};

export function LegalPage({
  title,
  description,
  updatedAt = "15 mai 2026",
  notice,
  sections,
}: LegalPageProps) {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.035]" />
      <div className="absolute left-1/2 top-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent-primary/8 blur-[140px]" />

      <section className="section-shell-tight">
        <div className="section-container-narrow">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-text-tertiary transition-colors duration-300 hover:text-accent-light"
            >
              <span aria-hidden="true">←</span>
              Retour à l&apos;accueil
            </Link>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-light">
              Informations légales
            </p>
            <h1 className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-base leading-[1.85] text-text-secondary sm:text-lg">
              {description}
            </p>
            <p className="mt-5 text-xs text-text-tertiary">Dernière mise à jour : {updatedAt}</p>
          </div>

          {notice && (
            <div className="mt-10 rounded-2xl border border-amber-300/20 bg-amber-300/[0.045] p-5 text-sm leading-relaxed text-text-secondary">
              {notice}
            </div>
          )}

          <div className="mt-12 space-y-5 lg:mt-16">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className={cn(
                  "rounded-2xl border border-border-subtle bg-bg-card/62 p-5 backdrop-blur-xl sm:p-7",
                  index === 0 && "border-border-accent/60",
                )}
              >
                <h2 className="text-xl font-semibold tracking-tight text-text-primary">
                  {section.title}
                </h2>
                {section.body?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-sm leading-[1.85] text-text-secondary">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-4 space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-light/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
