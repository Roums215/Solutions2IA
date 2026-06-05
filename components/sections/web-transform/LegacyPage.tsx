import type { ReactNode } from "react";

/* "Meubles & Co" — e-shop meubles tacky 2017, palette froide gris-bleu.
   PREMIER ÉCRAN UNIQUEMENT (cookie + topbar + header + promo + hero).
   Aucun token 2IA. Zéro <img>. */

export function LegacyPage() {
  return (
    <div className="bg-[#eef2f6] text-[#2e3a4a] font-sans select-none h-full flex flex-col">
      <CookieBanner />
      <TopBar />
      <SiteHeader />
      <PromoBanner />
      <HeroSection />
    </div>
  );
}

/* ── COOKIE BANNER ─────────────────────────────────────────────────── */
function CookieBanner() {
  return (
    <div className="bg-[#dfe5ec] border-b border-[#c8d0d8] px-4 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between gap-3 shrink-0">
      <span className="text-[10px] sm:text-[11px] text-[#64748b] truncate">
        Ce site utilise des cookies pour améliorer votre expérience de navigation.
      </span>
      <div className="flex gap-1.5 shrink-0">
        <button type="button" className="text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#5b8bbf] text-white rounded-sm">
          Accepter
        </button>
        <button type="button" className="text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#c8d0d8] text-[#64748b] rounded-sm">
          Refuser
        </button>
      </div>
    </div>
  );
}

/* ── TOP BAR ───────────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div className="bg-[#2e3a4a] text-white/80 text-[9px] sm:text-[11px] px-4 sm:px-6 py-1 flex items-center justify-between gap-3 shrink-0">
      <span className="flex items-center gap-1.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7h13v10H3z" />
          <path d="M16 11h4l1 4h-5" />
          <circle cx="6" cy="17" r="1.5" />
          <circle cx="18" cy="17" r="1.5" />
        </svg>
        <span>Livraison gratuite dès 300€</span>
      </span>
      <span className="hidden sm:flex items-center gap-1.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
        </svg>
        <span>01 23 45 67 89</span>
      </span>
    </div>
  );
}

/* ── HEADER ────────────────────────────────────────────────────────── */
function SiteHeader() {
  return (
    <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-[#e2e8f0] shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#5b8bbf] flex items-center justify-center text-white font-black text-[14px] sm:text-[18px]">
          M
        </div>
        <div className="leading-none">
          <div className="text-[13px] sm:text-[15px] font-extrabold tracking-tight text-[#2e3a4a]">MEUBLES &amp; CO</div>
          <div className="text-[8px] sm:text-[9px] text-[#94a3b8] tracking-wide">Vos meubles pas chers</div>
        </div>
      </div>
      <nav className="hidden sm:flex items-center gap-4 text-[11px] text-[#64748b] underline">
        <span>Accueil</span>
        <span>Catalogue</span>
        <span className="text-red-600 font-bold no-underline">PROMOS</span>
        <span>Mon compte</span>
        <span>Contact</span>
      </nav>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1 px-2 py-1 border border-[#c8d0d8] text-[10px] text-[#64748b]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Rechercher
        </div>
        <div className="relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2e3a4a" strokeWidth="1.8">
            <path d="M6 7h12l-2 12H8z" />
            <path d="M9 7a3 3 0 1 1 6 0" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center font-bold">3</span>
        </div>
      </div>
    </div>
  );
}

/* ── PROMO BANNER ──────────────────────────────────────────────────── */
function PromoBanner() {
  return (
    <div
      className="bg-gradient-to-r from-yellow-300 via-red-500 to-yellow-300 text-white text-center py-2 sm:py-2.5 px-3 font-bold text-[11px] sm:text-[14px] uppercase tracking-wider shrink-0"
      style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
    >
      ★ SOLDES D&apos;ÉTÉ -30% SUR TOUT LE CATALOGUE ★ JUSQU&apos;AU 31 AOÛT ★
    </div>
  );
}

/* ── HERO (remplit l'écran restant) ────────────────────────────────── */
function HeroSection() {
  return (
    <section className="flex-1 min-h-0 px-4 sm:px-6 py-4 sm:py-6 grid grid-cols-1 sm:grid-cols-[1fr_1.1fr] gap-4 sm:gap-8 items-center">
      <StockPhoto
        watermark="shutterstock_8392.jpg"
        gradient="linear-gradient(135deg,#cdd6e0 0%,#b4bfca 50%,#8fa0b4 100%)"
        radial="radial-gradient(ellipse at 50% 28%, rgba(203,213,225,0.45), transparent 60%)"
        aspect="aspect-[4/3]"
      >
        {/* Salon : canapé + lampe + table d'appoint */}
        <svg viewBox="0 0 100 70" className="absolute inset-0 w-full h-full p-3" preserveAspectRatio="xMidYMid meet" fill="#7c8a9b">
          <path d="M16 45 L84 45 L84 60 L16 60 Z" />
          <rect x="14" y="40" width="6" height="20" />
          <rect x="80" y="40" width="6" height="20" />
          <path d="M24 38 L76 38 L76 45 L24 45 Z" fill="#94a3b8" />
          <rect x="28" y="42" width="14" height="6" fill="#cbd5e0" />
          <rect x="46" y="42" width="14" height="6" fill="#cbd5e0" />
          <rect x="64" y="42" width="10" height="6" fill="#cbd5e0" />
          <rect x="86" y="48" width="8" height="2" />
          <path d="M88 50 L88 60 M92 50 L92 60" stroke="#7c8a9b" strokeWidth="0.8" />
          <path d="M6 24 L10 24 L8 38 Z" />
          <path d="M8 38 L8 60" stroke="#7c8a9b" strokeWidth="0.8" />
          <ellipse cx="8" cy="60" rx="3" ry="0.8" />
        </svg>
      </StockPhoto>

      <div>
        <h1 className="text-[18px] sm:text-[26px] font-bold text-[#2e3a4a] leading-tight mb-2 sm:mb-3">
          Bienvenue chez Meubles &amp; Co !
        </h1>
        <p className="text-[11px] sm:text-[13px] text-[#64748b] leading-relaxed mb-3 sm:mb-4 max-w-[95%]">
          Trouvez votre meuble pas cher livré chez vous ! Plus de 5000
          références en stock — canapés, tables, armoires, déco. Paiement en
          3x sans frais.
        </p>
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          <button type="button" className="text-[11px] sm:text-[13px] font-bold px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white">
            VOIR LES PROMOS
          </button>
          <button type="button" className="text-[11px] sm:text-[13px] font-medium px-3 sm:px-4 py-1.5 sm:py-2 bg-[#5b8bbf] text-white">
            Catalogue 2017
          </button>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#5b8bbf]" />
          <span className="w-2 h-2 rounded-full bg-[#c8d0d8]" />
          <span className="w-2 h-2 rounded-full bg-[#c8d0d8]" />
          <span className="w-2 h-2 rounded-full bg-[#c8d0d8]" />
        </div>
      </div>
    </section>
  );
}

/* ── STOCK PHOTO (faux-photo CSS) ──────────────────────────────────── */
interface StockPhotoProps {
  watermark: string;
  gradient: string;
  radial: string;
  aspect: string;
  children?: ReactNode;
}
function StockPhoto({ watermark, gradient, radial, aspect, children }: StockPhotoProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-md border border-[#a0aec0]/40 ${aspect}`}
      style={{ boxShadow: "inset 0 -20px 40px -10px rgba(46,58,74,0.3)" }}
    >
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div className="absolute inset-0" style={{ background: radial }} />
      <div className="absolute inset-0 bg-noise" />
      {children}
      <span className="absolute top-1.5 left-1.5 text-[8px] sm:text-[9px] font-mono text-white/65 bg-black/30 px-1 rounded-sm">
        {watermark}
      </span>
    </div>
  );
}
