import type { CSSProperties, ReactNode } from "react";

/* "L'Atelier Bois" — menuiserie sur mesure, palette chaude artisanale.
   PREMIER ÉCRAN UNIQUEMENT (header + hero fauteuil « Olympe »).
   Aucun token 2IA. Zéro <img>. */

const SERIF: CSSProperties = {
  fontFamily: '"Cormorant Garamond","Playfair Display",Georgia,"Times New Roman",serif',
};

const HEX_PATH = "M12 2 L20 8 L20 18 L12 22 L4 18 L4 8 Z";

export function PremiumPage() {
  return (
    <div className="bg-[#faf6ef] text-[#3a2a1c] select-none h-full flex flex-col">
      <SiteHeader />
      <HeroSection />
    </div>
  );
}

/* ── HEADER ────────────────────────────────────────────────────────── */
function SiteHeader() {
  return (
    <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-[#faf6ef] border-b border-[#e8d8b8] shrink-0">
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#6b4f2f" className="shrink-0">
          <path d={HEX_PATH} />
        </svg>
        <span className="text-[14px] sm:text-[17px] font-medium tracking-tight" style={SERIF}>
          {"L'Atelier Bois"}
        </span>
      </div>
      <nav className="hidden sm:flex items-center gap-5 text-[10px] text-[#6b4f2f] uppercase tracking-[0.18em]">
        <span>Collections</span>
        <span>Sur-mesure</span>
        <span>{"L'Atelier"}</span>
        <span>Contact</span>
      </nav>
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#3a2a1c] text-[#faf6ef] text-[10px] sm:text-[11px] font-medium tracking-wide">
        Prendre RDV
      </div>
    </div>
  );
}

/* ── HERO (remplit l'écran restant) ────────────────────────────────── */
function HeroSection() {
  return (
    <section className="flex-1 min-h-0 px-4 sm:px-6 py-4 sm:py-8 grid grid-cols-1 sm:grid-cols-[1fr_1.1fr] gap-4 sm:gap-10 items-center">
      <div>
        <span
          className="block text-[10px] sm:text-[12px] uppercase tracking-[0.24em] text-[#c97a5b] mb-2 sm:mb-3"
          style={SERIF}
        >
          Édition 2026
        </span>
        <h1
          className="text-[22px] sm:text-[36px] font-normal text-[#3a2a1c] leading-[1.05] mb-3 sm:mb-4 max-w-[95%]"
          style={SERIF}
        >
          Le mobilier sur mesure,
          <br />
          <span className="italic text-[#8b6f47]">pensé pour durer.</span>
        </h1>
        <p className="text-[11px] sm:text-[14px] text-[#6b4f2f] leading-relaxed mb-4 sm:mb-5 max-w-[90%]">
          Chêne, noyer, frêne. Pièces uniques façonnées à la main dans notre
          atelier du sud de la France.
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="text-[11px] sm:text-[13px] font-medium px-4 sm:px-5 py-2 sm:py-2.5 bg-[#3a2a1c] text-[#faf6ef] rounded-full"
          >
            Voir les collections →
          </button>
          <button
            type="button"
            className="text-[11px] sm:text-[13px] font-medium px-4 sm:px-5 py-2 sm:py-2.5 text-[#3a2a1c] border border-[#3a2a1c]/30 rounded-full"
          >
            Notre savoir-faire
          </button>
        </div>
      </div>

      <WoodTile
        rounded="rounded-[20px]"
        aspect="aspect-[5/4]"
        gradient="linear-gradient(135deg,#ead9b8 0%,#c8a878 45%,#8b6a3f 100%)"
        radial="radial-gradient(ellipse at 70% 25%, rgba(255,239,200,0.55), transparent 60%)"
        shadow="0 30px 60px -25px rgba(58,42,28,0.45)"
      >
        {/* Armchair line-art */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full px-6 py-5"
          fill="none"
          stroke="#3a2a1c"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M22 78 L22 52 Q22 38 32 38 L68 38 Q78 38 78 52 L78 78" />
          <path d="M22 60 L78 60" />
          <path d="M28 78 L28 90 M72 78 L72 90" />
          <path d="M22 55 Q14 55 14 65 L14 74 Q14 78 18 78" />
          <path d="M78 55 Q86 55 86 65 L86 74 Q86 78 82 78" />
        </svg>
        <span
          className="absolute bottom-3 left-4 text-[10px] sm:text-[12px] text-[#3a2a1c]/85 uppercase tracking-[0.2em]"
          style={SERIF}
        >
          Fauteuil « Olympe »
        </span>
      </WoodTile>
    </section>
  );
}

/* ── WOOD TILE (faux-photo chaude) ─────────────────────────────────── */
interface WoodTileProps {
  gradient: string;
  radial: string;
  aspect: string;
  rounded: string;
  shadow?: string;
  children?: ReactNode;
}
function WoodTile({ gradient, radial, aspect, rounded, shadow, children }: WoodTileProps) {
  return (
    <div
      className={`relative overflow-hidden ${aspect} ${rounded}`}
      style={{
        boxShadow: shadow ?? "inset 0 -30px 60px -20px rgba(58,42,28,0.4)",
      }}
    >
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div className="absolute inset-0" style={{ background: radial }} />
      {/* Wood grain nervures */}
      <svg
        className="absolute inset-0 w-full h-full mix-blend-multiply opacity-25 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path d="M0,18 Q50,15 100,20" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
        <path d="M0,36 Q50,40 100,34" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
        <path d="M0,54 Q50,50 100,57" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
        <path d="M0,72 Q50,76 100,69" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
        <path d="M0,88 Q50,84 100,90" stroke="#5e3f1d" strokeWidth="0.4" fill="none" />
      </svg>
      <div className="absolute inset-0 bg-noise opacity-60" />
      {children}
    </div>
  );
}
