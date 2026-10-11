"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "./contactPageData";

/** L'adresse, cliquable, et un bouton pour la copier (retour annoncé). */
export function EmailLine({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={className ?? "mt-2 flex flex-wrap items-center gap-3"}>
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="inline-flex items-center gap-2 rounded-sm text-[16px] font-semibold text-accent-light transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
      >
        <Mail size={17} strokeWidth={1.9} aria-hidden />
        {CONTACT_EMAIL}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-paper/[0.05] px-3 text-[12.5px] font-medium text-text-secondary ring-1 ring-border-medium transition-colors duration-300 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
      >
        {copied ? <Check size={13} strokeWidth={2.6} className="text-cyan" aria-hidden /> : <Copy size={13} strokeWidth={2} aria-hidden />}
        {copied ? "Copiée" : "Copier l'adresse"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Adresse copiée" : ""}
      </span>
    </div>
  );
}
