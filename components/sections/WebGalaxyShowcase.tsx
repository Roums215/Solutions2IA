"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

/* ═══════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════ */

interface FloatConfig {
  duration: number;
  ampX: number;
  ampY: number;
  delay: number;
}

interface DomainConfig {
  id: string;
  label: string;
  sublabel: string;
  color: string;
  rgb: string;
  size: number;
  pos: { x: number; y: number };
  float: FloatConfig;
}

/* ═══════════════════════════════════════════════════════════════
   DOMAIN DATA
═══════════════════════════════════════════════════════════════ */

const DOMAINS: DomainConfig[] = [
  {
    id: "restaurant",
    label: "Restaurant",
    sublabel: "Food & Hospitality",
    color: "#f97316",
    rgb: "249,115,22",
    size: 96,
    pos: { x: 12, y: 28 },
    float: { duration: 7.2, ampX: 14, ampY: 18, delay: -1.4 },
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    sublabel: "Boutique en ligne",
    color: "#06b6d4",
    rgb: "6,182,212",
    size: 88,
    pos: { x: 34, y: 14 },
    float: { duration: 8.8, ampX: 10, ampY: 22, delay: -3.2 },
  },
  {
    id: "saas",
    label: "SaaS / Tech",
    sublabel: "Application web",
    color: "#8b5cf6",
    rgb: "139,92,246",
    size: 92,
    pos: { x: 58, y: 22 },
    float: { duration: 6.5, ampX: 16, ampY: 14, delay: -5.0 },
  },
  {
    id: "immobilier",
    label: "Immobilier",
    sublabel: "Agence & promotion",
    color: "#10b981",
    rgb: "16,185,129",
    size: 82,
    pos: { x: 80, y: 32 },
    float: { duration: 9.4, ampX: 8, ampY: 20, delay: -2.1 },
  },
  {
    id: "portfolio",
    label: "Portfolio",
    sublabel: "Créatifs & agences",
    color: "#ec4899",
    rgb: "236,72,153",
    size: 86,
    pos: { x: 18, y: 62 },
    float: { duration: 7.8, ampX: 18, ampY: 12, delay: -6.5 },
  },
  {
    id: "medical",
    label: "Médical",
    sublabel: "Santé & bien-être",
    color: "#14b8a6",
    rgb: "20,184,166",
    size: 78,
    pos: { x: 44, y: 68 },
    float: { duration: 10.2, ampX: 12, ampY: 16, delay: -4.7 },
  },
  {
    id: "conseil",
    label: "Cabinet conseil",
    sublabel: "B2B & expertise",
    color: "#f59e0b",
    rgb: "245,158,11",
    size: 84,
    pos: { x: 68, y: 60 },
    float: { duration: 8.1, ampX: 14, ampY: 10, delay: -0.8 },
  },
  {
    id: "event",
    label: "Événementiel",
    sublabel: "Festivals & shows",
    color: "#a855f7",
    rgb: "168,85,247",
    size: 76,
    pos: { x: 87, y: 68 },
    float: { duration: 6.9, ampX: 10, ampY: 20, delay: -3.8 },
  },
];

const DASHBOARD_COPY: Record<
  string,
  {
    goal: string;
    primaryMetric: string;
    secondaryMetric: string;
    conversion: string;
    flow: string[];
    modules: string[];
  }
> = {
  restaurant: {
    goal: "Remplir les créneaux, fluidifier les réservations et valoriser l'expérience sur mobile.",
    primaryMetric: "+38%",
    secondaryMetric: "Réservations",
    conversion: "7.8%",
    flow: ["SEO local", "Menu premium", "Réservation", "CRM"],
    modules: ["Carte saisonnière", "Avis clients", "Calendrier", "Relance"],
  },
  ecommerce: {
    goal: "Accélérer l'achat, réduire l'abandon panier et mettre les produits clés au bon moment.",
    primaryMetric: "+24%",
    secondaryMetric: "Panier moyen",
    conversion: "8.4%",
    flow: ["Catalogue", "Produit", "Panier", "Upsell"],
    modules: ["Filtres", "Stock", "Paiement", "Retargeting"],
  },
  saas: {
    goal: "Présenter clairement la valeur, convertir les essais et suivre l'activation utilisateur.",
    primaryMetric: "×3",
    secondaryMetric: "Démo qualifiée",
    conversion: "11.2%",
    flow: ["Landing", "Demo", "Onboarding", "Usage"],
    modules: ["Pricing", "Churn", "MRR", "Activation"],
  },
  immobilier: {
    goal: "Transformer les visiteurs en demandes de visite avec des biens lisibles et rassurants.",
    primaryMetric: "+52%",
    secondaryMetric: "Leads visite",
    conversion: "6.1%",
    flow: ["Annonce", "Visite", "Lead", "Relance"],
    modules: ["Carte", "Biens", "Estimations", "Dossiers"],
  },
  portfolio: {
    goal: "Mettre en scène l'expertise, guider la découverte et générer des demandes qualifiées.",
    primaryMetric: "+41%",
    secondaryMetric: "Demandes",
    conversion: "9.6%",
    flow: ["Projet", "Story", "Preuve", "Contact"],
    modules: ["Cases", "Moodboard", "Motion", "Brief"],
  },
  medical: {
    goal: "Rassurer, informer et faciliter la prise de rendez-vous sans friction.",
    primaryMetric: "+31%",
    secondaryMetric: "Rendez-vous",
    conversion: "5.9%",
    flow: ["Service", "Créneau", "Patient", "Suivi"],
    modules: ["FAQ", "Planning", "Documents", "Rappels"],
  },
  conseil: {
    goal: "Structurer l'offre, prouver l'expertise et transformer les prospects B2B en rendez-vous.",
    primaryMetric: "+29%",
    secondaryMetric: "Calls B2B",
    conversion: "4.7%",
    flow: ["Expertise", "Audit", "Call", "Pipeline"],
    modules: ["Livres blancs", "Cas clients", "CRM", "Score lead"],
  },
  event: {
    goal: "Créer l'envie, vendre les places et suivre la performance des campagnes.",
    primaryMetric: "+46%",
    secondaryMetric: "Billets",
    conversion: "10.1%",
    flow: ["Line-up", "Billet", "Email", "Scan"],
    modules: ["Agenda", "Billetterie", "Sponsors", "Stats live"],
  },
};

/* ═══════════════════════════════════════════════════════════════
   IRIS CLIP-PATH CONSTANTS
═══════════════════════════════════════════════════════════════ */

const IRIS_CLOSED =
  "polygon(50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%,50% 50%)";
const IRIS_OPEN =
  "polygon(50% 2%,75% 9%,93% 27%,98% 50%,93% 73%,75% 91%,50% 98%,25% 91%,7% 73%,2% 50%,7% 27%,25% 9%)";

const stableCoord = (value: number) => Number(value.toFixed(5));
const stablePx = (value: number) => `${stableCoord(value)}px`;

const INJECT_CSS = `
@keyframes portalFloat {
  0%,100% { transform: translate(0px, 0px) rotate(0deg); }
  20%     { transform: translate(var(--fp-ax), calc(var(--fp-ay) * -1)) rotate(0.8deg); }
  45%     { transform: translate(calc(var(--fp-ax) * -0.6), calc(var(--fp-ay) * -1.6)) rotate(-0.5deg); }
  70%     { transform: translate(calc(var(--fp-ax) * -1), calc(var(--fp-ay) * -0.7)) rotate(0.4deg); }
}
.portal-sphere {
  animation: portalFloat var(--fp-dur) ease-in-out var(--fp-delay) infinite;
  will-change: transform;
}
.portal-sphere:hover,
.portal-sphere.open {
  animation-play-state: paused;
}
.iris-preview {
  clip-path: ${IRIS_CLOSED};
  transition: clip-path 0.7s cubic-bezier(0.16,1,0.3,1);
}
.iris-preview.iris-open {
  clip-path: ${IRIS_OPEN};
}
.iris-blade {
  transform-origin: 50% 100%;
  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
`;

/* ═══════════════════════════════════════════════════════════════
   IRIS RING DECORATION
═══════════════════════════════════════════════════════════════ */

function IrisBlades({
  isOpen,
  color,
  size,
}: {
  isOpen: boolean;
  color: string;
  size: number;
}) {
  const [mounted, setMounted] = useState(false);
  const N = 12;
  const r = size / 2;
  const bladeLen = r * 0.22;
  const bladeOff = r * 0.92;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <circle
          cx={stableCoord(r)}
          cy={stableCoord(r)}
          r={stableCoord(r - 1.5)}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.25"
          strokeDasharray="4 6"
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {Array.from({ length: N }).map((_, i) => {
        const angleDeg = (i * 360) / N;
        const angleRad = (angleDeg * Math.PI) / 180;
        const mx = r + Math.cos(angleRad) * bladeOff;
        const my = r + Math.sin(angleRad) * bladeOff;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        return (
          <line
            key={i}
            x1={stableCoord(mx - cos * bladeLen)}
            y1={stableCoord(my - sin * bladeLen)}
            x2={stableCoord(mx + cos * bladeLen * 0.3)}
            y2={stableCoord(my + sin * bladeLen * 0.3)}
            stroke={color}
            strokeWidth={isOpen ? "1.5" : "1"}
            strokeOpacity={isOpen ? "0.9" : "0.45"}
            strokeLinecap="round"
            style={{
              transformOrigin: `${stablePx(mx)} ${stablePx(my)}`,
              transform: `rotate(${isOpen ? 15 : 0}deg)`,
              transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.025}s, stroke-opacity 0.4s`,
            }}
          />
        );
      })}
      <circle
        cx={r}
        cy={r}
        r={r - 1.5}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity={isOpen ? "0.7" : "0.25"}
        strokeDasharray={isOpen ? "none" : "4 6"}
        style={{ transition: "stroke-opacity 0.4s, stroke-dasharray 0.6s" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SPHERE PORTAL
═══════════════════════════════════════════════════════════════ */

function SpherePortal({
  domain,
  onOpen,
}: {
  domain: DomainConfig;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const s = domain.size;
  const r = s / 2;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-r, r], [8, -8]), {
    stiffness: 280,
    damping: 24,
  });
  const ry = useSpring(useTransform(mx, [-r, r], [-8, 8]), {
    stiffness: 280,
    damping: 24,
  });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - r);
    my.set(e.clientY - rect.top - r);
  }
  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      className="portal-sphere absolute"
      style={
        {
          width: s,
          height: s,
          left: `calc(${domain.pos.x}% - ${r}px)`,
          top: `calc(${domain.pos.y}% - ${r}px)`,
          "--fp-dur": `${domain.float.duration}s`,
          "--fp-ax": `${domain.float.ampX}px`,
          "--fp-ay": `${domain.float.ampY}px`,
          "--fp-delay": `${domain.float.delay}s`,
        } as React.CSSProperties
      }
    >
      <motion.div
        style={{
          width: s,
          height: s,
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 600,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.12 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={onOpen}
        className="cursor-pointer relative"
      >
        {/* ═══ 1. Outer bloom — soft halo loin de la sphère ═══ */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -s * 0.35,
            background: `radial-gradient(circle, rgba(${domain.rgb},0.2) 0%, rgba(${domain.rgb},0.08) 35%, transparent 65%)`,
            filter: "blur(20px)",
          }}
          animate={{
            opacity: hovered ? [0.8, 1, 0.8] : [0.35, 0.55, 0.35],
            scale: hovered ? [1, 1.08, 1] : [1, 1.04, 1],
          }}
          transition={{ duration: hovered ? 2 : 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ═══ 2. Atmospheric rim glow ═══ */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: -3,
            background: `radial-gradient(circle, transparent 48%, rgba(${domain.rgb},${hovered ? 0.55 : 0.32}) 70%, transparent 92%)`,
            filter: "blur(4px)",
            transition: "background 0.5s ease",
          }}
        />

        {/* ═══ 3. Sphere body — multi-stop radial gradient ═══ */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 32% 28%,
                rgba(255,255,255,0.32) 0%,
                rgba(${domain.rgb},0.95) 6%,
                rgba(${domain.rgb},0.72) 20%,
                rgba(${domain.rgb},0.4) 45%,
                rgba(${domain.rgb},0.15) 72%,
                rgba(4,6,14,0.95) 100%
              )
            `,
            boxShadow: `
              inset -10px -12px 38px rgba(0,0,0,0.6),
              inset 6px 6px 20px rgba(255,255,255,0.12),
              inset 0 0 0 1px rgba(${domain.rgb},${hovered ? 0.7 : 0.45})
            `,
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* ═══ 4. Rotating caustics (conic shimmer) ═══ */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `conic-gradient(from 0deg,
                transparent 0%,
                rgba(255,255,255,0.12) 12%,
                transparent 24%,
                rgba(${domain.rgb},0.35) 48%,
                transparent 60%,
                rgba(255,255,255,0.08) 78%,
                transparent 100%
              )`,
              mixBlendMode: "overlay",
              opacity: hovered ? 0.85 : 0.55,
              transition: "opacity 0.4s ease",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />

          {/* ═══ 5. Counter-rotating inner caustic (2nd layer) ═══ */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: "18%",
              background: `conic-gradient(from 180deg,
                transparent 0%,
                rgba(${domain.rgb},0.5) 20%,
                transparent 40%,
                rgba(255,255,255,0.15) 65%,
                transparent 85%
              )`,
              filter: "blur(6px)",
              mixBlendMode: "screen",
              opacity: 0.5,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />

          {/* ═══ 6. Sharp specular highlight (small, bright) ═══ */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "24%",
              height: "20%",
              top: "12%",
              left: "22%",
              background: `radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.98), rgba(255,255,255,0.35) 40%, transparent 75%)`,
              filter: "blur(1px)",
              opacity: hovered ? 1 : 0.92,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* ═══ 7. Wide soft highlight (ambient reflection) ═══ */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "55%",
              height: "40%",
              top: "8%",
              left: "14%",
              background: `radial-gradient(ellipse, rgba(255,255,255,0.18), rgba(255,255,255,0.05) 55%, transparent 80%)`,
              filter: "blur(6px)",
            }}
          />

          {/* ═══ 8. Bottom rim light (light bouncing back) ═══ */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: 0,
              background: `radial-gradient(ellipse at 65% 92%, rgba(${domain.rgb},${hovered ? 0.4 : 0.22}), transparent 42%)`,
              filter: "blur(3px)",
              transition: "background 0.4s ease",
            }}
          />

          {/* ═══ 9. Iris preview (revealed on hover) ═══ */}
          <div
            className={`iris-preview absolute inset-0 ${hovered ? "iris-open" : ""}`}
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(10,10,22,0.92), rgba(0,0,0,0.97))`,
            }}
          >
            <MiniSitePreview domain={domain} />
          </div>
        </div>

        {/* ═══ 10. Sharp outer edge (1px rim) ═══ */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `
              inset 0 0 0 1px rgba(255,255,255,${hovered ? 0.28 : 0.14}),
              0 0 ${hovered ? 48 : 24}px rgba(${domain.rgb},${hovered ? 0.55 : 0.3})
            `,
            transition: "box-shadow 0.5s ease",
          }}
        />

        {/* ═══ 11. Chromatic fringe (subtle color shift at edge) ═══ */}
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: `inset 0 0 0 2px rgba(${domain.rgb},0.35)`,
              filter: "blur(1px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* ═══ 12. Iris blades decoration ═══ */}
        <IrisBlades isOpen={hovered} color={domain.color} size={s} />

        {/* ═══ 13. Label sous la sphère ═══ */}
        <motion.div
          className="absolute pointer-events-none text-center whitespace-nowrap"
          style={{
            bottom: -32,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          animate={{ opacity: hovered ? 1 : 0.65, y: hovered ? -2 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <span
            className="block text-[11px] font-bold leading-tight tracking-wide"
            style={{
              color: domain.color,
              textShadow: `0 0 12px rgba(${domain.rgb},0.75), 0 1px 2px rgba(0,0,0,0.8)`,
            }}
          >
            {domain.label}
          </span>
          <span className="block text-[9px] text-text-tertiary/55 mt-0.5 font-medium">
            {domain.sublabel}
          </span>
        </motion.div>

        {/* ═══ 14. Pulse rings (expanding waves) ═══ */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: `1px solid rgba(${domain.rgb},0.5)` }}
          animate={
            hovered
              ? { scale: [1, 1.55, 1.55], opacity: [0.8, 0, 0] }
              : { scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }
          }
          transition={{ duration: hovered ? 1.2 : 2.8, repeat: Infinity, ease: "easeOut" }}
        />
        {hovered && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: `1px solid rgba(${domain.rgb},0.35)` }}
            animate={{ scale: [1, 1.8, 1.8], opacity: [0.6, 0, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MINI SITE PREVIEW
═══════════════════════════════════════════════════════════════ */

function MiniSitePreview({ domain }: { domain: DomainConfig }) {
  const previewContent: Record<string, ReactNode> = {
    restaurant: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-3"
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(249,115,22,0.2), transparent 70%)` }}>
        <div className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#f97316" }}>La Belle Table</div>
        <div className="text-[6px] text-white/60">Restaurant gastronomique · Paris 7e</div>
        <div className="mt-1 w-8 h-px" style={{ background: "#f97316" }} />
        <div className="text-[5.5px] text-white/40 mt-1">Menu · Réservation · Cave</div>
      </div>
    ),
    ecommerce: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-3"
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(6,182,212,0.2), transparent 70%)` }}>
        <div className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#06b6d4" }}>Luxe Mode</div>
        <div className="text-[6px] text-white/60">Prêt-à-porter haut de gamme</div>
        <div className="grid grid-cols-3 gap-0.5 mt-1">
          {[0,1,2].map(i => <div key={i} className="w-5 h-5 rounded-sm" style={{ background: `rgba(6,182,212,${0.2+i*0.1})` }} />)}
        </div>
      </div>
    ),
    saas: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-3"
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(139,92,246,0.2), transparent 70%)` }}>
        <div className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#8b5cf6" }}>FlowAI</div>
        <div className="text-[6px] text-white/60">Automatisez votre workflow</div>
        <div className="flex gap-1 mt-1">{["⚡","🔗","📊"].map(e => <span key={e} style={{ fontSize: 9 }}>{e}</span>)}</div>
      </div>
    ),
    immobilier: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-3"
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(16,185,129,0.2), transparent 70%)` }}>
        <div className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#10b981" }}>Prestige Immo</div>
        <div className="text-[6px] text-white/60">Biens d&apos;exception · Paris</div>
        <div className="text-[11px] mt-1 font-bold text-white/80">2 450 000€</div>
      </div>
    ),
    portfolio: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-3"
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(236,72,153,0.2), transparent 70%)` }}>
        <div className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#ec4899" }}>Élise Martin</div>
        <div className="text-[6px] text-white/60">Designer · Direction artistique</div>
        <div className="grid grid-cols-2 gap-0.5 mt-1">
          {[0,1,2,3].map(i => <div key={i} className="w-4 h-3 rounded-sm" style={{ background: `rgba(236,72,153,${0.15+i*0.12})` }} />)}
        </div>
      </div>
    ),
    medical: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-3"
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(20,184,166,0.2), transparent 70%)` }}>
        <div className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#14b8a6" }}>Clinique Santé+</div>
        <div className="text-[6px] text-white/60">Médecine · Spécialités</div>
        <div className="text-[9px] mt-1 px-2 py-0.5 rounded" style={{ background: "rgba(20,184,166,0.2)", color: "#14b8a6" }}>Prendre RDV</div>
      </div>
    ),
    conseil: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-3"
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(245,158,11,0.2), transparent 70%)` }}>
        <div className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#f59e0b" }}>Stratégia</div>
        <div className="text-[6px] text-white/60">Conseil en transformation</div>
        <div className="text-[7px] text-white/40 mt-1">150+ missions · 15 ans</div>
      </div>
    ),
    event: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-3"
        style={{ background: `radial-gradient(circle at 40% 40%, rgba(168,85,247,0.2), transparent 70%)` }}>
        <div className="text-[8px] font-bold tracking-widest uppercase" style={{ color: "#a855f7" }}>Lumière Fest</div>
        <div className="text-[6px] text-white/60">Festival arts · Lyon</div>
        <div className="text-[11px] font-black text-white/90 mt-1">12–20 Juil</div>
      </div>
    ),
  };
  return <>{previewContent[domain.id]}</>;
}

/* ═══════════════════════════════════════════════════════════════
   DOMAIN SITE CONTENT — 8 fully distinct one-page designs
═══════════════════════════════════════════════════════════════ */

function RestaurantSite() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0e0600", color: "#f5f0e8", minHeight: "100%" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2rem", borderBottom: "1px solid rgba(249,115,22,0.12)", position: "sticky", top: 0, background: "rgba(14,6,0,0.95)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.15em", color: "#f97316" }}>La Belle Table</span>
        <div style={{ display: "flex", gap: "2rem", fontSize: 13, color: "rgba(245,240,232,0.6)" }}>
          {["Menu", "Cave", "Notre histoire", "Réservation"].map(n => <span key={n} style={{ cursor: "pointer" }}>{n}</span>)}
        </div>
        <button style={{ padding: "8px 20px", background: "#f97316", color: "#fff", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "0.05em" }}>Réserver</button>
      </nav>

      <section style={{ padding: "6rem 2rem 5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(249,115,22,0.12), transparent)", pointerEvents: "none" }} />
        <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#f97316", textTransform: "uppercase", marginBottom: "1.5rem" }}>Paris 7e · Depuis 1987</p>
        <h1 style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          Une cuisine d&apos;exception,<br /><em style={{ color: "#f97316" }}>un souvenir pour toujours.</em>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(245,240,232,0.65)", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Chaque plat raconte une histoire. Chaque accord vous transporte. Venez vivre une expérience gastronomique unique au cœur de Paris.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ padding: "14px 32px", background: "#f97316", color: "#fff", border: "none", borderRadius: 4, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Réserver une table</button>
          <button style={{ padding: "14px 32px", background: "transparent", color: "#f5f0e8", border: "1px solid rgba(245,240,232,0.25)", borderRadius: 4, fontSize: 15, cursor: "pointer" }}>Voir le menu</button>
        </div>
        <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginTop: "3.5rem" }}>
          {[["38 ans", "d'excellence"], ["2 étoiles", "Michelin"], ["#1", "Paris 7e"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#f97316" }}>{v}</div>
              <div style={{ fontSize: 11, color: "rgba(245,240,232,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(249,115,22,0.08)" }}>
        <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.25em", color: "#f97316", textTransform: "uppercase", marginBottom: "0.75rem" }}>Carte du moment</p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "3rem" }}>Le menu dégustation</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: 960, margin: "0 auto" }}>
          {[
            { cat: "Entrée", plat: "Carpaccio de Saint-Jacques", desc: "Vinaigrette agrumes, caviar d'Aquitaine, micro-pousses de shiso", prix: "38€" },
            { cat: "Plat", plat: "Agneau de 7 heures", desc: "Confit lentement, jus corsé au thym, légumes du marché rôtis", prix: "62€" },
            { cat: "Dessert", plat: "Soufflé Grand Marnier", desc: "Soufflé chaud à l'orange, glace vanille Bourbon, tuile dentelle", prix: "24€" },
          ].map(item => (
            <div key={item.plat} style={{ padding: "1.75rem", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 8, background: "rgba(249,115,22,0.04)" }}>
              <span style={{ fontSize: 10, color: "#f97316", letterSpacing: "0.2em", textTransform: "uppercase" }}>{item.cat}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0.75rem 0 0.5rem", lineHeight: 1.25 }}>{item.plat}</h3>
              <p style={{ fontSize: 13, color: "rgba(245,240,232,0.55)", lineHeight: 1.65, marginBottom: "1rem" }}>{item.desc}</p>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#f97316" }}>{item.prix}</span>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: 13, color: "rgba(245,240,232,0.4)" }}>Menu dégustation complet : 165€ · Accord mets &amp; vins : +95€</p>
      </section>

      <section style={{ padding: "4rem 2rem", background: "rgba(249,115,22,0.04)", borderTop: "1px solid rgba(249,115,22,0.08)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", color: "#f97316", textTransform: "uppercase", marginBottom: "0.75rem" }}>Notre histoire</p>
          <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700, marginBottom: "1.5rem" }}>Trois générations, une même passion</h2>
          <p style={{ fontSize: 16, color: "rgba(245,240,232,0.62)", lineHeight: 1.85 }}>
            Fondée en 1987 par Henri Lacroix, La Belle Table a traversé les décennies sans jamais déroger à ses principes : produits d&apos;exception, savoir-faire artisanal, accueil chaleureux. Aujourd&apos;hui, c&apos;est son petit-fils Théo qui perpétue cet héritage avec audace et créativité.
          </p>
        </div>
      </section>

      {/* Témoignages — animated */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(249,115,22,0.08)" }}
      >
        <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.25em", color: "#f97316", textTransform: "uppercase", marginBottom: "0.75rem" }}>Ils parlent de nous</p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700, marginBottom: "3rem" }}>Témoignages</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: 960, margin: "0 auto" }}
        >
          {[
            { name: "Le Figaro Gastronomie", quote: "« Une adresse où le temps s'arrête. Théo Lacroix sublime les classiques avec une précision rare. »", stars: 5 },
            { name: "Gault & Millau", quote: "« Service impeccable, carte audacieuse, cave sublime. Un 17/20 amplement mérité. »", stars: 5 },
            { name: "TripAdvisor · 482 avis", quote: "« Une expérience inoubliable. Chaque plat est une œuvre d'art. À réserver des mois à l'avance. »", stars: 5 },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.35)" }}
              style={{ padding: "1.75rem", border: "1px solid rgba(249,115,22,0.15)", borderRadius: 8, background: "rgba(249,115,22,0.03)", cursor: "default", transition: "border-color 0.3s ease" }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: "0.75rem" }}>
                {Array.from({ length: t.stars }).map((_, k) => <span key={k} style={{ color: "#f97316", fontSize: 12 }}>★</span>)}
              </div>
              <p style={{ fontSize: 13, color: "rgba(245,240,232,0.7)", lineHeight: 1.75, fontStyle: "italic", marginBottom: "1rem" }}>{t.quote}</p>
              <div style={{ fontSize: 11, color: "#f97316", fontWeight: 700, letterSpacing: "0.05em" }}>— {t.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Galerie animée */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", background: "rgba(249,115,22,0.03)", borderTop: "1px solid rgba(249,115,22,0.08)" }}
      >
        <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.25em", color: "#f97316", textTransform: "uppercase", marginBottom: "0.75rem" }}>Galerie</p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700, marginBottom: "3rem" }}>L&apos;atmosphère du lieu</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem", maxWidth: 1000, margin: "0 auto" }}
        >
          {["🍽️", "🍷", "🥂", "🕯️", "👨‍🍳", "🌿"].map((emoji, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ scale: 1.04 }}
              style={{ aspectRatio: "4/3", background: `linear-gradient(135deg, rgba(249,115,22,${0.08 + (i % 3) * 0.04}), rgba(249,115,22,0.02))`, border: "1px solid rgba(249,115,22,0.15)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, cursor: "pointer" }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <section style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(249,115,22,0.08)", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.25em", color: "#f97316", textTransform: "uppercase", marginBottom: "0.75rem" }}>Réservation</p>
        <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700, marginBottom: "0.75rem" }}>Réservez votre table</h2>
        <p style={{ fontSize: 15, color: "rgba(245,240,232,0.55)", marginBottom: "2.5rem" }}>Du mardi au samedi · Déjeuner 12h–14h · Dîner 19h–22h30</p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          {[["📞", "01 45 67 89 12"], ["📍", "14 rue de Varenne, Paris 7e"], ["✉️", "contact@labelletable.fr"]].map(([icon, info]) => (
            <motion.div
              key={info}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ borderColor: "rgba(249,115,22,0.45)", y: -2 }}
              style={{ padding: "12px 24px", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 6, fontSize: 14, display: "flex", alignItems: "center", gap: 10, color: "rgba(245,240,232,0.75)", cursor: "pointer", transition: "border-color 0.3s" }}
            >
              <span>{icon}</span>{info}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

function EcommerceSite() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#020d14", color: "#f0f9ff", minHeight: "100%" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(6,182,212,0.12)", position: "sticky", top: 0, background: "rgba(2,13,20,0.95)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.1em", color: "#06b6d4" }}>LUXE MODE</span>
        <div style={{ display: "flex", gap: "2rem", fontSize: 13, color: "rgba(240,249,255,0.55)" }}>
          {["Collections", "Nouveautés", "Soldes", "À propos"].map(n => <span key={n} style={{ cursor: "pointer" }}>{n}</span>)}
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "rgba(240,249,255,0.55)", cursor: "pointer" }}>Connexion</span>
          <button style={{ padding: "8px 18px", background: "#06b6d4", color: "#001014", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Panier (0)</button>
        </div>
      </nav>

      <section style={{ padding: "5rem 2rem 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(6,182,212,0.1), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "#06b6d4", textTransform: "uppercase", display: "block", marginBottom: "1.25rem" }}>Nouvelle collection · Printemps 2025</span>
            <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
              L&apos;élégance<br />réinventée.
            </h1>
            <p style={{ fontSize: 16, color: "rgba(240,249,255,0.6)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 380 }}>
              Des pièces intemporelles conçues pour durer. Matières nobles, coupes parfaites, fabrication européenne.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button style={{ padding: "14px 28px", background: "#06b6d4", color: "#001014", border: "none", borderRadius: 4, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Découvrir →</button>
              <button style={{ padding: "14px 28px", background: "transparent", color: "#f0f9ff", border: "1px solid rgba(240,249,255,0.2)", borderRadius: 4, fontSize: 15, cursor: "pointer" }}>Voir tout</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[["Veste Lin", "289€", "#0d3340"], ["Robe Soie", "345€", "#051a22"], ["Sac Cuir", "195€", "#051a22"], ["Jean Coupe", "149€", "#0d3340"]].map(([name, price, bg]) => (
              <div key={name} style={{ background: bg, border: "1px solid rgba(6,182,212,0.15)", borderRadius: 8, padding: "1rem", cursor: "pointer" }}>
                <div style={{ height: 90, background: "rgba(6,182,212,0.08)", borderRadius: 4, marginBottom: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>👗</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#06b6d4", marginTop: 4 }}>{price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(6,182,212,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800 }}>Bestsellers de la saison</h2>
            <span style={{ fontSize: 13, color: "#06b6d4", cursor: "pointer" }}>Voir tout →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.25rem" }}>
            {[
              { name: "Blazer Structuré", price: "425€", badge: "Bestseller", color: "#06b6d4" },
              { name: "Chemise Lin Naturel", price: "165€", badge: "Nouveau", color: "#06b6d4" },
              { name: "Pantalon Tailleur", price: "248€", badge: "-15%", color: "#f59e0b" },
              { name: "Carré en Soie", price: "89€", badge: "Exclusif", color: "#8b5cf6" },
            ].map(item => (
              <div key={item.name} style={{ background: "#051220", border: "1px solid rgba(6,182,212,0.12)", borderRadius: 8, overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: 140, background: "rgba(6,182,212,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, position: "relative" }}>
                  🛍️
                  <span style={{ position: "absolute", top: 10, right: 10, background: item.color, color: "#001014", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 3, letterSpacing: "0.08em" }}>{item.badge}</span>
                </div>
                <div style={{ padding: "0.875rem" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{item.name}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#06b6d4" }}>{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "3rem 2rem", background: "rgba(6,182,212,0.04)", borderTop: "1px solid rgba(6,182,212,0.08)" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem" }}
        >
          {[["🚚", "Livraison offerte", "Dès 150€ d'achat, en France et Europe"], ["↩️", "Retours 30 jours", "Remboursement intégral sans justification"], ["🔒", "Paiement sécurisé", "CB, Paypal, virement — 3D Secure"], ["💎", "Garantie qualité", "Matières certifiées, fabrication contrôlée"]].map(([icon, title, desc]) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              whileHover={{ y: -4 }}
              style={{ textAlign: "center", padding: "1.5rem" }}
            >
              <div style={{ fontSize: 26, marginBottom: "0.75rem" }}>{icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: "0.5rem" }}>{title}</div>
              <div style={{ fontSize: 12, color: "rgba(240,249,255,0.5)", lineHeight: 1.6 }}>{desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Avis clients animés */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(6,182,212,0.08)" }}
      >
        <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.3em", color: "#06b6d4", textTransform: "uppercase", marginBottom: "0.75rem" }}>⭐ 4.8/5 · 12 400+ avis</p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "2.5rem" }}>Ce que disent nos clientes</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}
        >
          {[
            { name: "Sophia L.", quote: "Qualité au rendez-vous. Livraison en 24h. Le blazer est d'une coupe parfaite, je le porte tous les jours." },
            { name: "Camille R.", quote: "Service client exceptionnel. Un retour pris en charge en 12h. J'ai commandé 4 fois depuis." },
            { name: "Marie D.", quote: "Site épuré, navigation fluide, photos de qualité. Mes pièces préférées sont ici. Merci !" },
          ].map((a) => (
            <motion.div
              key={a.name}
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -3, borderColor: "rgba(6,182,212,0.35)" }}
              style={{ padding: "1.5rem", background: "#051220", border: "1px solid rgba(6,182,212,0.12)", borderRadius: 10, cursor: "default", transition: "border-color 0.3s" }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: "0.75rem" }}>
                {Array.from({ length: 5 }).map((_, k) => <span key={k} style={{ color: "#06b6d4", fontSize: 13 }}>★</span>)}
              </div>
              <p style={{ fontSize: 13, color: "rgba(240,249,255,0.7)", lineHeight: 1.75, marginBottom: "1rem" }}>&laquo; {a.quote} &raquo;</p>
              <div style={{ fontSize: 12, color: "#06b6d4", fontWeight: 700 }}>— {a.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: "4rem 2rem", background: "linear-gradient(180deg, rgba(6,182,212,0.05), rgba(6,182,212,0.02))", borderTop: "1px solid rgba(6,182,212,0.08)", textAlign: "center" }}
      >
        <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>-10% sur votre première commande</h2>
        <p style={{ fontSize: 14, color: "rgba(240,249,255,0.55)", marginBottom: "2rem" }}>Rejoignez la newsletter. Accès VIP aux ventes privées et nouveautés.</p>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: "flex", gap: "0.5rem", maxWidth: 440, margin: "0 auto", padding: "0.35rem", background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 8 }}
        >
          <input
            type="email"
            placeholder="votre@email.com"
            style={{ flex: 1, padding: "10px 14px", background: "transparent", border: "none", outline: "none", color: "#f0f9ff", fontSize: 14 }}
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: "10px 22px", background: "#06b6d4", color: "#001014", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            M&apos;inscrire
          </motion.button>
        </motion.div>
        <p style={{ fontSize: 11, color: "rgba(240,249,255,0.35)", marginTop: "1rem" }}>Pas de spam. Désabonnement en 1 clic.</p>
      </motion.section>
    </div>
  );
}

function SaaSSite() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#06000f", color: "#f5f0ff", minHeight: "100%" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(139,92,246,0.12)", position: "sticky", top: 0, background: "rgba(6,0,15,0.95)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: "#8b5cf6", letterSpacing: "-0.01em" }}>⚡ FlowAI</span>
        <div style={{ display: "flex", gap: "2rem", fontSize: 13, color: "rgba(245,240,255,0.55)" }}>
          {["Fonctionnalités", "Tarifs", "API", "Blog"].map(n => <span key={n} style={{ cursor: "pointer" }}>{n}</span>)}
        </div>
        <button style={{ padding: "8px 20px", background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Essai gratuit →</button>
      </nav>

      <section style={{ padding: "5.5rem 2rem 4rem", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.15), transparent)", pointerEvents: "none" }} />
        <span style={{ display: "inline-block", padding: "5px 16px", background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.35)", borderRadius: 20, fontSize: 12, color: "#a78bfa", marginBottom: "1.5rem" }}>🎉 v3.0 — IA générative intégrée</span>
        <h1 style={{ fontSize: "clamp(2.4rem,6vw,4.2rem)", fontWeight: 900, lineHeight: 1.06, letterSpacing: "-0.035em", marginBottom: "1.25rem" }}>
          Automatisez 80% de<br /><span style={{ color: "#8b5cf6" }}>vos tâches répétitives.</span>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(245,240,255,0.6)", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.75 }}>
          FlowAI connecte vos outils, apprend vos workflows et automatise le reste. Zéro code.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
          <button style={{ padding: "14px 32px", background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Essai gratuit 14 jours</button>
          <button style={{ padding: "14px 28px", background: "transparent", color: "#f5f0ff", border: "1px solid rgba(245,240,255,0.15)", borderRadius: 8, fontSize: 15, cursor: "pointer" }}>▶ Voir la démo</button>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(139,92,246,0.08)" }}
      >
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, marginBottom: "3rem" }}>Tout ce dont vous avez besoin</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}
        >
          {[
            { icon: "🤖", title: "IA générative", desc: "Workflows intelligents qui s'adaptent au contexte." },
            { icon: "🔗", title: "500+ intégrations", desc: "Slack, Notion, Salesforce, HubSpot, Google." },
            { icon: "📊", title: "Analytics temps réel", desc: "Visualisez l'impact de chaque automatisation." },
            { icon: "🔒", title: "Sécurité enterprise", desc: "SOC 2 Type II, RGPD, SSO, logs d'audit." },
            { icon: "⚡", title: "Zéro latence", desc: "Infrastructure 12 régions · uptime 99.99%." },
            { icon: "👥", title: "Collaboration", desc: "Partagez, commentez, versionnez en équipe." },
          ].map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.4)" }}
              style={{ padding: "1.5rem", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.14)", borderRadius: 10, transition: "border-color 0.3s" }}
            >
              <div style={{ fontSize: 24, marginBottom: "0.75rem" }}>{icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ fontSize: 13, color: "rgba(245,240,255,0.55)", lineHeight: 1.65 }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Logos clients */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "3rem 2rem", borderTop: "1px solid rgba(139,92,246,0.08)" }}
      >
        <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.25em", color: "rgba(245,240,255,0.45)", textTransform: "uppercase", marginBottom: "2rem" }}>Ils nous font confiance</p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          style={{ display: "flex", gap: "2.5rem", justifyContent: "center", flexWrap: "wrap", opacity: 0.6 }}
        >
          {["ACME Corp", "StellarTech", "Nova Labs", "Orbit AI", "Pulse.io", "Vantage", "BlockWave"].map(l => (
            <motion.span
              key={l}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              style={{ fontSize: 14, fontWeight: 800, color: "rgba(245,240,255,0.55)", letterSpacing: "-0.01em" }}
            >
              {l}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      {/* Témoignages SaaS */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", background: "rgba(139,92,246,0.03)", borderTop: "1px solid rgba(139,92,246,0.08)" }}
      >
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "3rem" }}>Aimé par 12 000+ équipes</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}
        >
          {[
            { quote: "FlowAI a divisé par 4 notre temps de traitement des leads. Le ROI a été visible en 2 semaines.", author: "Émilie Chen", role: "CMO · ScaleUp" },
            { quote: "L'intégration Slack + Notion est magique. Mon équipe a récupéré 12h/semaine de travail manuel.", author: "Marc Thibault", role: "Head of Ops · Fintech" },
            { quote: "Meilleur outil no-code qu'on ait testé. Interface intuitive, automations puissantes, support top.", author: "Sarah Dupont", role: "CTO · SaaS B2B" },
          ].map((t) => (
            <motion.div
              key={t.author}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.5)" }}
              style={{ padding: "1.75rem", background: "#0a0018", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 12, transition: "border-color 0.3s" }}
            >
              <div style={{ fontSize: 18, color: "#a78bfa", marginBottom: "0.75rem" }}>&ldquo;</div>
              <p style={{ fontSize: 13, color: "rgba(245,240,255,0.75)", lineHeight: 1.75, marginBottom: "1.25rem" }}>{t.quote}</p>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(139,92,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#a78bfa" }}>{t.author.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{t.author}</div>
                  <div style={{ fontSize: 11, color: "rgba(245,240,255,0.5)" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}

function ImmobilierSite() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#020e08", color: "#f0faf5", minHeight: "100%" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(16,185,129,0.12)", position: "sticky", top: 0, background: "rgba(2,14,8,0.95)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span style={{ fontSize: 17, fontWeight: 800, color: "#10b981", letterSpacing: "0.05em" }}>PRESTIGE IMMO</span>
        <div style={{ display: "flex", gap: "2rem", fontSize: 13, color: "rgba(240,250,245,0.55)" }}>
          {["Acheter", "Louer", "Vendre", "Contact"].map(n => <span key={n} style={{ cursor: "pointer" }}>{n}</span>)}
        </div>
        <button style={{ padding: "9px 22px", background: "#10b981", color: "#001a0e", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Estimation gratuite</button>
      </nav>

      <section style={{ padding: "5rem 2rem 4rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(16,185,129,0.1), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", color: "#10b981", textTransform: "uppercase", marginBottom: "1rem" }}>Agence premium · Paris &amp; Île-de-France</p>
          <h1 style={{ fontSize: "clamp(2.4rem,5.5vw,4rem)", fontWeight: 900, lineHeight: 1.06, letterSpacing: "-0.03em", marginBottom: "1.25rem", maxWidth: 600 }}>
            Trouvez le bien<br />de vos rêves.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(240,250,245,0.6)", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: 440 }}>500 biens d&apos;exception en exclusivité. De l&apos;appartement haussmannien à la villa contemporaine.</p>
          <div style={{ display: "flex", gap: "3rem" }}>
            {[["500+", "biens"], ["15 ans", "d'expérience"], ["98%", "satisfaits"]].map(([v, l]) => (
              <div key={l}><div style={{ fontSize: 26, fontWeight: 800, color: "#10b981" }}>{v}</div><div style={{ fontSize: 11, color: "rgba(240,250,245,0.45)", marginTop: 4 }}>{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(16,185,129,0.08)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "2rem" }}>Biens en vedette</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}
          >
            {[
              { type: "Appartement 4P", loc: "Paris 7e · 95m²", price: "1 250 000€", badge: "Exclusif" },
              { type: "Maison + Jardin", loc: "Neuilly · 220m²", price: "2 100 000€", badge: "Coup de cœur" },
              { type: "Penthouse Vue Tour", loc: "Paris 15e · 180m²", price: "3 500 000€", badge: "Prestige" },
            ].map(({ type, loc, price, badge }) => (
              <motion.div
                key={type}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                whileHover={{ y: -6, borderColor: "rgba(16,185,129,0.4)" }}
                style={{ background: "#031008", border: "1px solid rgba(16,185,129,0.14)", borderRadius: 10, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s" }}
              >
                <div style={{ height: 160, background: "rgba(16,185,129,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, position: "relative" }}>
                  🏢
                  <span style={{ position: "absolute", top: 12, left: 12, background: "#10b981", color: "#001a0e", fontSize: 9, fontWeight: 700, padding: "4px 10px", borderRadius: 4 }}>{badge}</span>
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{type}</div>
                  <div style={{ fontSize: 12, color: "rgba(240,250,245,0.5)", marginBottom: "0.75rem" }}>{loc}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#10b981" }}>{price}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Quartiers animés */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", background: "rgba(16,185,129,0.03)", borderTop: "1px solid rgba(16,185,129,0.08)" }}
      >
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>Nos quartiers d&apos;expertise</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: "rgba(240,250,245,0.5)", marginBottom: "2.5rem" }}>Connaissance pointue de chaque secteur</p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", maxWidth: 900, margin: "0 auto" }}
        >
          {["Paris 1er · Louvre", "Paris 4e · Marais", "Paris 6e · Saint-Germain", "Paris 7e · Invalides", "Paris 8e · Champs-Élysées", "Paris 16e · Trocadéro", "Neuilly-sur-Seine", "Saint-Cloud", "Versailles"].map(q => (
            <motion.span
              key={q}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.05, borderColor: "rgba(16,185,129,0.55)" }}
              style={{ padding: "10px 18px", border: "1px solid rgba(16,185,129,0.22)", borderRadius: 24, fontSize: 13, color: "rgba(240,250,245,0.75)", cursor: "pointer", transition: "border-color 0.3s" }}
            >
              {q}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      {/* Estimation CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(16,185,129,0.08)", textAlign: "center" }}
      >
        <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, marginBottom: "1rem", letterSpacing: "-0.03em" }}>
          Vendez votre bien<br /><span style={{ color: "#10b981" }}>au meilleur prix.</span>
        </h2>
        <p style={{ fontSize: 15, color: "rgba(240,250,245,0.55)", maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }}>
          Estimation gratuite en 48h · Commission compétitive · Vente en moins de 45 jours en moyenne.
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{ padding: "16px 40px", background: "#10b981", color: "#001a0e", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 10px 30px rgba(16,185,129,0.3)" }}
        >
          Demander mon estimation →
        </motion.button>
      </motion.section>
    </div>
  );
}

function PortfolioSite() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0f0008", color: "#fff5f9", minHeight: "100%" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(236,72,153,0.12)", position: "sticky", top: 0, background: "rgba(15,0,8,0.95)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 800 }}>Élise <span style={{ color: "#ec4899" }}>Martin</span></span>
        <div style={{ display: "flex", gap: "2rem", fontSize: 13, color: "rgba(255,245,249,0.55)" }}>
          {["Travaux", "Services", "À propos", "Contact"].map(n => <span key={n} style={{ cursor: "pointer" }}>{n}</span>)}
        </div>
        <button style={{ padding: "8px 20px", background: "transparent", color: "#ec4899", border: "1px solid rgba(236,72,153,0.45)", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Me contacter</button>
      </nav>

      <section style={{ padding: "6rem 2rem 5rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(236,72,153,0.1), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.25em", color: "#ec4899", textTransform: "uppercase", display: "block", marginBottom: "1.25rem" }}>Designer graphique &amp; motion · Paris</span>
          <h1 style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Créatrice<br />d&apos;identités<br /><span style={{ color: "#ec4899" }}>mémorables.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,245,249,0.6)", lineHeight: 1.75, maxWidth: 440, marginBottom: "2.5rem" }}>
            Je conçois des identités visuelles qui durent, des campagnes qui marquent et des expériences digitales qui inspirent.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={{ padding: "14px 30px", background: "#ec4899", color: "#fff", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Voir mes projets</button>
            <button style={{ padding: "14px 26px", background: "transparent", color: "#fff5f9", border: "1px solid rgba(255,245,249,0.2)", borderRadius: 6, fontSize: 15, cursor: "pointer" }}>Télécharger CV</button>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(236,72,153,0.08)" }}
      >
        <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "2.5rem" }}>Travaux récents</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}
        >
          {[
            { title: "Rebranding Maison de Luxe", cat: "Identité visuelle", desc: "Refonte complète : logo, charte, packaging, digital.", year: "2024", op: 0.12 },
            { title: "Campagne Digitale Automne", cat: "Motion Design", desc: "12 films sociaux pour le lancement collection.", year: "2024", op: 0.08 },
            { title: "Packaging Cosmétique", cat: "Direction artistique", desc: "8 références packaging cosmétique bio.", year: "2023", op: 0.1 },
          ].map(({ title, cat, desc, year, op }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -6 }}
              style={{ overflow: "hidden", borderRadius: 10, cursor: "pointer" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                style={{ height: 180, background: `rgba(236,72,153,${op})`, border: "1px solid rgba(236,72,153,0.15)", borderRadius: "10px 10px 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}
              >
                🎨
              </motion.div>
              <div style={{ padding: "1.25rem", background: "#160010", border: "1px solid rgba(236,72,153,0.1)", borderTop: "none", borderRadius: "0 0 10px 10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: "#ec4899", letterSpacing: "0.15em", textTransform: "uppercase" }}>{cat}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,245,249,0.35)" }}>{year}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h3>
                <p style={{ fontSize: 12, color: "rgba(255,245,249,0.55)", lineHeight: 1.65 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Process créatif */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", background: "rgba(236,72,153,0.03)", borderTop: "1px solid rgba(236,72,153,0.08)" }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.25em", color: "#ec4899", textTransform: "uppercase", marginBottom: "0.75rem" }}>Mon process</p>
        <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "2.5rem" }}>De l&apos;idée à la livraison</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.25rem" }}
        >
          {[
            { n: "01", t: "Discovery", d: "Brief, recherches, benchmarks. Comprendre vos valeurs." },
            { n: "02", t: "Exploration", d: "Moodboards, directions visuelles, propositions." },
            { n: "03", t: "Création", d: "Design détaillé, déclinaisons, validations." },
            { n: "04", t: "Livraison", d: "Exports, guide d'usage, suivi post-livraison." },
          ].map((p) => (
            <motion.div
              key={p.n}
              variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
              style={{ padding: "1.5rem", border: "1px solid rgba(236,72,153,0.14)", borderRadius: 10, background: "#120008" }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ec4899", marginBottom: "0.75rem" }}>{p.n}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: "0.5rem" }}>{p.t}</h3>
              <p style={{ fontSize: 12, color: "rgba(255,245,249,0.55)", lineHeight: 1.65 }}>{p.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact animé */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: "5rem 2rem", borderTop: "1px solid rgba(236,72,153,0.08)", textAlign: "center" }}
      >
        <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, marginBottom: "1rem", letterSpacing: "-0.03em" }}>
          Un projet<br />en tête ?
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,245,249,0.55)", maxWidth: 440, margin: "0 auto 2rem", lineHeight: 1.75 }}>
          Discutons de votre vision. Premier échange offert, sans engagement.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: "inline-block", padding: "16px 40px", background: "#ec4899", color: "#fff", border: "none", borderRadius: 6, fontSize: 16, fontWeight: 700, cursor: "pointer", textDecoration: "none" }}
        >
          elise@noa-creative.studio
        </motion.a>
      </motion.section>
    </div>
  );
}

function MedicalSite() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#020e0c", color: "#f0faf8", minHeight: "100%" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(20,184,166,0.12)", position: "sticky", top: 0, background: "rgba(2,14,12,0.95)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#14b8a6" }}>Clinique Santé+</span>
        <div style={{ display: "flex", gap: "2rem", fontSize: 13, color: "rgba(240,250,248,0.55)" }}>
          {["Praticiens", "Spécialités", "Téléconsultation", "Infos"].map(n => <span key={n} style={{ cursor: "pointer" }}>{n}</span>)}
        </div>
        <button style={{ padding: "9px 22px", background: "#14b8a6", color: "#001a18", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Prendre RDV</button>
      </nav>

      <section style={{ padding: "5rem 2rem 4rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 60% 50%, rgba(20,184,166,0.09), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", color: "#14b8a6", textTransform: "uppercase", marginBottom: "1rem" }}>Votre santé, notre priorité</p>
          <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 900, lineHeight: 1.07, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
            Des soins de qualité,<br />à tout moment.
          </h1>
          <p style={{ fontSize: 16, color: "rgba(240,250,248,0.6)", lineHeight: 1.75, marginBottom: "2rem", maxWidth: 520 }}>
            Médecine générale, spécialités, imagerie et téléconsultation. Disponibles 7j/7.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{ padding: "13px 28px", background: "#14b8a6", color: "#001a18", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Prendre rendez-vous</button>
            <button style={{ padding: "13px 24px", background: "transparent", color: "#f0faf8", border: "1px solid rgba(240,250,248,0.2)", borderRadius: 6, fontSize: 14, cursor: "pointer" }}>Téléconsultation</button>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(20,184,166,0.08)" }}
      >
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "2.5rem" }}>Nos praticiens</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "1.25rem" }}
        >
          {[
            { name: "Dr. Sophie Laurent", spec: "Cardiologue", exp: "20 ans d'expérience" },
            { name: "Dr. Marc Dupont", spec: "Médecin généraliste", exp: "Médecin de famille" },
            { name: "Dr. Claire Morin", spec: "Dermatologue", exp: "Spécialiste laser" },
          ].map(({ name, spec, exp }) => (
            <motion.div
              key={name}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -4, borderColor: "rgba(20,184,166,0.35)" }}
              style={{ padding: "1.5rem", background: "#030f0c", border: "1px solid rgba(20,184,166,0.12)", borderRadius: 10, transition: "border-color 0.3s" }}
            >
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(20,184,166,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: "1rem" }}>👨‍⚕️</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{name}</h3>
              <div style={{ fontSize: 12, color: "#14b8a6", marginBottom: 4 }}>{spec}</div>
              <div style={{ fontSize: 11, color: "rgba(240,250,248,0.45)", marginBottom: "1rem" }}>{exp}</div>
              <button style={{ width: "100%", padding: "9px", background: "#14b8a6", color: "#001a18", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Prendre RDV</button>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Spécialités */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", background: "rgba(20,184,166,0.03)", borderTop: "1px solid rgba(20,184,166,0.08)" }}
      >
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "2.5rem" }}>12 spécialités sous un même toit</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "0.75rem" }}
        >
          {[
            { icon: "❤️", name: "Cardiologie" },
            { icon: "🦷", name: "Dentaire" },
            { icon: "👁️", name: "Ophtalmologie" },
            { icon: "🧠", name: "Neurologie" },
            { icon: "🦴", name: "Orthopédie" },
            { icon: "👶", name: "Pédiatrie" },
            { icon: "🩺", name: "Généraliste" },
            { icon: "💉", name: "Infirmerie" },
          ].map((s) => (
            <motion.div
              key={s.name}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.05, borderColor: "rgba(20,184,166,0.5)" }}
              style={{ padding: "1.25rem", textAlign: "center", border: "1px solid rgba(20,184,166,0.12)", borderRadius: 10, background: "#030f0c", cursor: "pointer", transition: "border-color 0.3s" }}
            >
              <div style={{ fontSize: 26, marginBottom: "0.5rem" }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#14b8a6" }}>{s.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Avis patients */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(20,184,166,0.08)" }}
      >
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>⭐ 4.9/5 · 2 300+ avis patients</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: "rgba(240,250,248,0.5)", marginBottom: "2.5rem" }}>Vérifiés sur Doctolib et Google</p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}
        >
          {[
            { name: "Marine T.", q: "Accueil chaleureux, praticiens à l'écoute. Délais de RDV très raisonnables." },
            { name: "Jean-Paul B.", q: "Cabinet moderne, hygiène irréprochable. Mon cardiologue est excellent." },
            { name: "Laure M.", q: "Téléconsultation très pratique. J'apprécie de ne pas avoir à me déplacer." },
          ].map((a) => (
            <motion.div
              key={a.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
              style={{ padding: "1.5rem", border: "1px solid rgba(20,184,166,0.12)", borderRadius: 10, background: "#030f0c" }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: "0.75rem" }}>
                {Array.from({ length: 5 }).map((_, k) => <span key={k} style={{ color: "#14b8a6", fontSize: 12 }}>★</span>)}
              </div>
              <p style={{ fontSize: 13, color: "rgba(240,250,248,0.7)", lineHeight: 1.7, marginBottom: "0.75rem" }}>&laquo; {a.q} &raquo;</p>
              <div style={{ fontSize: 11, color: "#14b8a6", fontWeight: 700 }}>— {a.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}

function ConseilSite() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0800", color: "#faf8f0", minHeight: "100%" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(245,158,11,0.12)", position: "sticky", top: 0, background: "rgba(10,8,0,0.95)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.08em", color: "#f59e0b" }}>STRATÉGIA PARTNERS</span>
        <div style={{ display: "flex", gap: "2rem", fontSize: 13, color: "rgba(250,248,240,0.55)" }}>
          {["Expertise", "Cas clients", "Équipe", "Contact"].map(n => <span key={n} style={{ cursor: "pointer" }}>{n}</span>)}
        </div>
        <button style={{ padding: "9px 22px", background: "transparent", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.45)", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Parlons stratégie</button>
      </nav>

      <section style={{ padding: "6rem 2rem 5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 80% 50%, rgba(245,158,11,0.09), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 700 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "#f59e0b", textTransform: "uppercase", display: "block", marginBottom: "1.5rem" }}>Conseil en transformation digitale</span>
          <h1 style={{ fontSize: "clamp(2.4rem,6vw,4.5rem)", fontWeight: 900, lineHeight: 1.03, letterSpacing: "-0.035em", marginBottom: "1.5rem" }}>
            Transformez votre<br />entreprise avec l&apos;IA.<br /><span style={{ color: "#f59e0b" }}>Dès aujourd&apos;hui.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(250,248,240,0.6)", lineHeight: 1.8, maxWidth: 500, marginBottom: "2.5rem" }}>
            Nous aidons les entreprises ambitieuses à intégrer l&apos;IA dans leur cœur de métier. 150 missions. 15 ans.
          </p>
          <button style={{ padding: "14px 32px", background: "#f59e0b", color: "#0a0800", border: "none", borderRadius: 4, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Prendre contact →</button>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(245,158,11,0.08)" }}
      >
        <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "2.5rem" }}>Nos domaines d&apos;expertise</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}
        >
          {[
            { icon: "🤖", title: "Transformation IA", desc: "Stratégie IA, gouvernance, déploiement pour PME et grands groupes." },
            { icon: "📊", title: "Data & Analytics", desc: "Architecture data, BI, modèles prédictifs, culture data-driven." },
            { icon: "🚀", title: "Scale-up digitale", desc: "Accélération de croissance et nouveaux modèles business." },
          ].map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -4, borderColor: "rgba(245,158,11,0.4)" }}
              style={{ padding: "2rem", background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.12)", borderRadius: 8, cursor: "pointer", transition: "border-color 0.3s" }}
            >
              <div style={{ fontSize: 30, marginBottom: "1rem" }}>{icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: "0.6rem" }}>{title}</h3>
              <p style={{ fontSize: 13, color: "rgba(250,248,240,0.6)", lineHeight: 1.7 }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Cas clients animés */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", background: "rgba(245,158,11,0.03)", borderTop: "1px solid rgba(245,158,11,0.08)" }}
      >
        <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "#f59e0b", textTransform: "uppercase", marginBottom: "0.75rem" }}>Cas clients</p>
        <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "2.5rem" }}>Des résultats mesurables</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}
        >
          {[
            { sector: "Industrie manufacturière", metric: "+40%", unit: "efficacité ops", desc: "Jumeau numérique et automatisation de la chaîne de production pour un équipementier auto.", duration: "18 mois" },
            { sector: "Retail & Distribution", metric: "×3", unit: "chiffre d'affaires", desc: "Transformation digitale : e-commerce, CRM, prévisions IA, personnalisation.", duration: "24 mois" },
          ].map((c) => (
            <motion.div
              key={c.sector}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ y: -4, borderColor: "rgba(245,158,11,0.4)" }}
              style={{ padding: "1.75rem", background: "#120e00", border: "1px solid rgba(245,158,11,0.14)", borderRadius: 10, transition: "border-color 0.3s" }}
            >
              <div style={{ fontSize: 11, color: "#f59e0b", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{c.sector}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: "0.75rem" }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: "#f59e0b" }}>{c.metric}</span>
                <span style={{ fontSize: 13, color: "rgba(250,248,240,0.55)" }}>{c.unit}</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(250,248,240,0.6)", lineHeight: 1.7, marginBottom: "1rem" }}>{c.desc}</p>
              <div style={{ fontSize: 11, color: "rgba(250,248,240,0.4)" }}>Durée : {c.duration}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Équipe */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(245,158,11,0.08)" }}
      >
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>L&apos;équipe dirigeante</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: "rgba(250,248,240,0.5)", marginBottom: "2.5rem" }}>Des consultants seniors, 15+ ans d&apos;expérience chacun</p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.25rem" }}
        >
          {[
            { name: "Alexandre Bernard", role: "Partner · IA", exp: "Ex McKinsey · 18 ans" },
            { name: "Marine Laurent", role: "Partner · Data", exp: "Ex BCG · 16 ans" },
            { name: "Thomas Roux", role: "Partner · Strategy", exp: "Ex Bain · 20 ans" },
          ].map((m) => (
            <motion.div
              key={m.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
              style={{ padding: "1.5rem", textAlign: "center", border: "1px solid rgba(245,158,11,0.14)", borderRadius: 10 }}
            >
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, rgba(245,158,11,0.35), rgba(245,158,11,0.1))", margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: "#f59e0b" }}>
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: "#f59e0b", marginBottom: 4 }}>{m.role}</div>
              <div style={{ fontSize: 11, color: "rgba(250,248,240,0.45)" }}>{m.exp}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}

function EventSite() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#060010", color: "#f8f0ff", minHeight: "100%" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(168,85,247,0.12)", position: "sticky", top: 0, background: "rgba(6,0,16,0.95)", backdropFilter: "blur(12px)", zIndex: 10 }}>
        <span style={{ fontSize: 17, fontWeight: 900, color: "#a855f7" }}>✦ LUMIÈRE FEST</span>
        <div style={{ display: "flex", gap: "2rem", fontSize: 13, color: "rgba(248,240,255,0.55)" }}>
          {["Programme", "Artistes", "Billetterie", "Infos"].map(n => <span key={n} style={{ cursor: "pointer" }}>{n}</span>)}
        </div>
        <button style={{ padding: "9px 22px", background: "#a855f7", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Acheter mes billets</button>
      </nav>

      <section style={{ padding: "5rem 2rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.18), transparent)", pointerEvents: "none" }} />
        <span style={{ display: "inline-block", padding: "5px 16px", background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 20, fontSize: 11, color: "#c084fc", marginBottom: "1.5rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Lyon · 12 – 20 juillet 2025</span>
        <h1 style={{ fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "1.25rem" }}>
          Lumière<br /><span style={{ color: "#a855f7" }}>Fest</span>
        </h1>
        <p style={{ fontSize: 18, color: "rgba(248,240,255,0.65)", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          9 nuits de création lumineuse, 80 artistes internationaux, 12 scènes à travers Lyon.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "4rem" }}>
          <button style={{ padding: "15px 36px", background: "#a855f7", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Réserver mes places</button>
          <button style={{ padding: "15px 28px", background: "transparent", color: "#f8f0ff", border: "1px solid rgba(248,240,255,0.2)", borderRadius: 8, fontSize: 16, cursor: "pointer" }}>Programme complet</button>
        </div>
        <div style={{ display: "flex", gap: "4rem", justifyContent: "center" }}>
          {[["80", "Artistes"], ["12", "Scènes"], ["200K", "Visiteurs"], ["9", "Nuits"]].map(([v, l]) => (
            <div key={l}><div style={{ fontSize: 30, fontWeight: 900, color: "#a855f7" }}>{v}</div><div style={{ fontSize: 11, color: "rgba(248,240,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{l}</div></div>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", borderTop: "1px solid rgba(168,85,247,0.08)" }}
      >
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "2.5rem" }}>Temps forts</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {[
            { date: "Ven 12 juil · 21h", title: "Cérémonie d'ouverture", desc: "Performance inaugurale · Mappings monumentaux" },
            { date: "Sam–Dim · 18h", title: "Expo « Flux » — Vieux Lyon", desc: "Installation permanente · 8 artistes · 2,4 km" },
            { date: "Sam 19 juil · 23h", title: "Grande Finale pyrotechnique", desc: "Clôture spectaculaire sur la Saône · 30 min" },
          ].map(({ date, title, desc }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
              whileHover={{ x: 4, borderColor: "rgba(168,85,247,0.4)" }}
              style={{ padding: "1.25rem 1.5rem", background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.14)", borderRadius: 8, display: "flex", gap: "1.5rem", alignItems: "flex-start", cursor: "pointer", transition: "border-color 0.3s" }}
            >
              <div style={{ fontSize: 11, color: "#c084fc", fontWeight: 600, minWidth: 120, paddingTop: 2 }}>{date}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: "rgba(248,240,255,0.55)" }}>{desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Artistes invités */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        style={{ padding: "4rem 2rem", background: "rgba(168,85,247,0.03)", borderTop: "1px solid rgba(168,85,247,0.08)" }}
      >
        <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.25em", color: "#c084fc", textTransform: "uppercase", marginBottom: "0.75rem" }}>Line-up 2025</p>
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, marginBottom: "0.5rem" }}>80 artistes · 18 pays</h2>
        <p style={{ textAlign: "center", fontSize: 14, color: "rgba(248,240,255,0.5)", marginBottom: "2.5rem" }}>Créateurs internationaux de la scène lumineuse contemporaine</p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
          style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", maxWidth: 920, margin: "0 auto" }}
        >
          {["Yann Nguema 🇫🇷", "Miguel Chevalier 🇫🇷", "Groupe LAPS 🇫🇷", "Klaus Obermaier 🇦🇹", "United Visual Artists 🇬🇧", "Daito Manabe 🇯🇵", "Quayola 🇮🇹", "Memo Akten 🇹🇷", "Refik Anadol 🇺🇸"].map(a => (
            <motion.span
              key={a}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.55)" }}
              style={{ padding: "10px 18px", border: "1px solid rgba(168,85,247,0.22)", borderRadius: 24, fontSize: 13, color: "rgba(248,240,255,0.75)", cursor: "pointer", transition: "border-color 0.3s" }}
            >
              {a}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      {/* Billetterie CTA */}
      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ padding: "5rem 2rem", borderTop: "1px solid rgba(168,85,247,0.08)", textAlign: "center", position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.15), transparent)", pointerEvents: "none" }} />
        <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, marginBottom: "1rem", letterSpacing: "-0.03em", position: "relative" }}>
          Réservez<br /><span style={{ color: "#a855f7" }}>dès maintenant.</span>
        </h2>
        <p style={{ fontSize: 15, color: "rgba(248,240,255,0.55)", maxWidth: 460, margin: "0 auto 2rem", lineHeight: 1.7, position: "relative" }}>
          Dernières places disponibles · Pass 5 nuits à 89€ · Navettes incluses
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative" }}
        >
          {[
            { name: "Journée", price: "29€" },
            { name: "Pass 5 nuits", price: "89€", highlight: true },
            { name: "Pass complet", price: "149€" },
          ].map((p) => (
            <motion.button
              key={p.name}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "14px 28px",
                background: p.highlight ? "#a855f7" : "transparent",
                color: p.highlight ? "#fff" : "#c084fc",
                border: `1px solid ${p.highlight ? "transparent" : "rgba(168,85,247,0.4)"}`,
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: p.highlight ? "0 10px 30px rgba(168,85,247,0.35)" : "none",
              }}
            >
              {p.name} · {p.price}
            </motion.button>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SITE REGISTRY + MODAL + PARTICLES + MAIN
═══════════════════════════════════════════════════════════════ */

const SITE_COMPONENTS: Record<string, () => ReactNode> = {
  restaurant: () => <RestaurantSite />,
  ecommerce: () => <EcommerceSite />,
  saas: () => <SaaSSite />,
  immobilier: () => <ImmobilierSite />,
  portfolio: () => <PortfolioSite />,
  medical: () => <MedicalSite />,
  conseil: () => <ConseilSite />,
  event: () => <EventSite />,
};

function DomainModal({
  domain,
  onClose,
}: {
  domain: DomainConfig;
  onClose: () => void;
}) {
  const SiteContent = SITE_COMPONENTS[domain.id];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-full rounded-t-2xl overflow-hidden flex flex-col"
        style={{
          height: "92vh",
          maxWidth: "100vw",
          background: "#050508",
          borderTop: `2px solid rgba(${domain.rgb},0.5)`,
          boxShadow: `0 -20px 80px rgba(${domain.rgb},0.2), 0 -2px 0 rgba(${domain.rgb},0.6)`,
        }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 36 }}
      >
        <div
          className="flex-shrink-0 flex items-center gap-3 px-5 py-3 border-b"
          style={{ borderColor: `rgba(${domain.rgb},0.14)`, background: "rgba(0,0,0,0.6)" }}
        >
          <div className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <button
                key={c}
                className="w-3 h-3 rounded-full border-0"
                style={{ background: c, cursor: c === "#ff5f57" ? "pointer" : "default" }}
                onClick={c === "#ff5f57" ? onClose : undefined}
                aria-label={c === "#ff5f57" ? "Fermer" : undefined}
              />
            ))}
          </div>

          <div
            className="flex-1 mx-3 px-4 py-1.5 rounded-md text-xs text-text-tertiary/70 truncate"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span style={{ color: `rgba(${domain.rgb},0.8)` }}>🔒 </span>
            www.solutions2ia.fr/showcase/{domain.id}
          </div>

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0"
            style={{ background: `rgba(${domain.rgb},0.12)`, color: domain.color, border: `1px solid rgba(${domain.rgb},0.25)` }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: domain.color, boxShadow: `0 0 6px ${domain.color}` }}
            />
            {domain.label}
          </div>

          <motion.button
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            aria-label="Fermer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: `rgba(${domain.rgb},0.3) transparent` }}>
          {SiteContent()}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: (i * 97) % 100,
    y: (i * 61) % 100,
    size: (i % 3) * 0.5 + 0.5,
    opacity: (i % 7) * 0.04 + 0.08,
    duration: (i % 5) + 3,
    delay: -((i % 8) * 0.5),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-light"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ opacity: [p.opacity, p.opacity * 3, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function WebGalaxyShowcase() {
  const [openDomain, setOpenDomain] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0].id);
  const activeDomain = DOMAINS.find((d) => d.id === openDomain) ?? null;
  const previewDomain = DOMAINS.find((d) => d.id === selectedDomain) ?? DOMAINS[0];
  const preview = DASHBOARD_COPY[previewDomain.id];

  useEffect(() => {
    if (document.getElementById("wgs-styles")) return;
    const style = document.createElement("style");
    style.id = "wgs-styles";
    style.textContent = INJECT_CSS;
    document.head.appendChild(style);
    return () => { document.getElementById("wgs-styles")?.remove(); };
  }, []);

  const handleOpen = useCallback((id: string) => setOpenDomain(id), []);
  const handleClose = useCallback(() => setOpenDomain(null), []);

  return (
    <>
      <section className="section-shell relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.06), transparent 65%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 35% at 15% 75%, rgba(34,211,238,0.04), transparent)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 35% 30% at 85% 20%, rgba(168,85,247,0.04), transparent)" }} />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.22em] uppercase text-accent-light mb-3 block">
              Showcase interface
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Un cockpit pour{" "}
              <span className="text-gradient-strong">visualiser l&apos;impact</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Sélectionnez un secteur et voyez comment nous structurons l&apos;expérience : acquisition, conversion, automatisation et pilotage métier.
            </p>
          </motion.div>

          <motion.div
            className="relative mx-auto overflow-hidden rounded-[1.75rem] border border-border-subtle bg-bg-card/70 shadow-[0_32px_110px_rgba(0,0,0,0.34)] backdrop-blur-xl"
            style={{
              maxWidth: 1080,
            }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <ParticleField />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_58%)]" />
            <div className="absolute inset-0 bg-grid opacity-[0.035]" />

            <div className="relative z-10 border-b border-border-subtle px-4 py-3 sm:px-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="rounded-lg border border-border-subtle bg-bg-primary/45 px-3 py-1 text-[10px] font-mono text-text-tertiary">
                    studio.solutions2ia/showcase
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-text-tertiary">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: previewDomain.color, boxShadow: `0 0 12px ${previewDomain.color}` }}
                  />
                  Live preview
                </div>
              </div>
            </div>

            <div className="relative z-10 grid gap-4 p-4 sm:p-5 lg:grid-cols-[15rem_minmax(0,1fr)_16rem] lg:gap-5 lg:p-6">
              <aside className="rounded-2xl border border-border-subtle bg-bg-primary/35 p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Secteurs</span>
                  <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-text-tertiary">{DOMAINS.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {DOMAINS.map((domain) => {
                    const isActive = domain.id === previewDomain.id;
                    return (
                      <motion.button
                        key={domain.id}
                        className="group flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors duration-300"
                        style={{
                          borderColor: isActive ? `rgba(${domain.rgb},0.4)` : "rgba(255,255,255,0.07)",
                          background: isActive ? `rgba(${domain.rgb},0.12)` : "rgba(255,255,255,0.025)",
                        }}
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setSelectedDomain(domain.id)}
                        onFocus={() => setSelectedDomain(domain.id)}
                        onClick={() => setSelectedDomain(domain.id)}
                      >
                        <span
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[10px] font-bold"
                          style={{ background: `rgba(${domain.rgb},0.16)`, color: domain.color }}
                        >
                          {domain.label.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-semibold text-text-primary">{domain.label}</span>
                          <span className="block truncate text-[10px] text-text-tertiary">{domain.sublabel}</span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </aside>

              <div className="space-y-4">
                <motion.div
                  key={`${previewDomain.id}-hero`}
                  className="relative overflow-hidden rounded-2xl border p-4 sm:p-5"
                  style={{
                    borderColor: `rgba(${previewDomain.rgb},0.24)`,
                    background: `linear-gradient(145deg, rgba(16,18,32,0.92), rgba(${previewDomain.rgb},0.08))`,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="absolute right-0 top-0 h-48 w-48 rounded-full blur-[80px]"
                    style={{ background: `rgba(${previewDomain.rgb},0.18)` }}
                  />
                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-xl">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: previewDomain.color }}>
                        {previewDomain.label}
                      </span>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                        Interface de conversion pilotée par la donnée
                      </h3>
                      <p className="mt-3 text-sm leading-[1.8] text-text-secondary">
                        {preview.goal}
                      </p>
                    </div>
                    <button
                      className="inline-flex shrink-0 items-center justify-center rounded-xl border px-4 py-2 text-xs font-semibold transition-transform duration-300 hover:-translate-y-0.5"
                      style={{ borderColor: `rgba(${previewDomain.rgb},0.35)`, color: previewDomain.color, background: `rgba(${previewDomain.rgb},0.08)` }}
                      onClick={() => handleOpen(previewDomain.id)}
                    >
                      Explorer le prototype
                    </button>
                  </div>

                  <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: preview.secondaryMetric, value: preview.primaryMetric },
                      { label: "Conversion", value: preview.conversion },
                      { label: "Modules actifs", value: String(preview.modules.length) },
                    ].map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="text-[10px] uppercase tracking-[0.16em] text-text-tertiary">{metric.label}</span>
                        <span className="mt-2 block text-2xl font-bold" style={{ color: i === 0 ? previewDomain.color : undefined }}>
                          {metric.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem]">
                  <div className="rounded-2xl border border-border-subtle bg-bg-primary/35 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Performance funnel</span>
                      <span className="text-[10px] font-mono" style={{ color: previewDomain.color }}>+ optimisé</span>
                    </div>
                    <div className="flex h-44 items-end gap-2 sm:h-52">
                      {Array.from({ length: 14 }, (_, i) => {
                        const scale = 0.32 + ((i * 17) % 52) / 100;
                        return (
                          <motion.div
                            key={i}
                            className="flex-1 origin-bottom rounded-t-lg"
                            style={{ background: `linear-gradient(180deg, rgba(${previewDomain.rgb},0.72), rgba(${previewDomain.rgb},0.16))` }}
                            initial={{ scaleY: 0.18, opacity: 0.4 }}
                            animate={{ scaleY: [scale, Math.min(0.96, scale + 0.14), scale], opacity: [0.62, 1, 0.62] }}
                            transition={{ duration: 4 + i * 0.08, delay: i * 0.04, repeat: Infinity, ease: "easeInOut" }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border-subtle bg-bg-primary/35 p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Flux automatisé</span>
                    <div className="mt-4 space-y-3">
                      {preview.flow.map((step, i) => (
                        <div key={step} className="relative flex items-center gap-3">
                          {i < preview.flow.length - 1 && (
                            <span className="absolute left-4 top-8 h-5 w-px bg-border-subtle" />
                          )}
                          <motion.span
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border text-[10px] font-bold"
                            style={{ borderColor: `rgba(${previewDomain.rgb},0.32)`, color: previewDomain.color, background: `rgba(${previewDomain.rgb},0.08)` }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, delay: i * 0.25, repeat: Infinity, ease: "easeInOut" }}
                          >
                            {i + 1}
                          </motion.span>
                          <span className="text-sm font-medium text-text-secondary">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <aside className="rounded-2xl border border-border-subtle bg-bg-primary/35 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Modules livrés</span>
                <div className="mt-4 space-y-2">
                  {preview.modules.map((module, i) => (
                    <motion.div
                      key={module}
                      className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="text-xs text-text-secondary">{module}</span>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: previewDomain.color }} />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-text-tertiary">Score UX</span>
                  <div className="mt-3 flex items-end justify-between">
                    <span className="text-3xl font-bold text-text-primary">94</span>
                    <span className="text-xs" style={{ color: previewDomain.color }}>premium</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full origin-left rounded-full"
                      style={{ background: `linear-gradient(90deg, ${previewDomain.color}, rgba(${previewDomain.rgb},0.35))` }}
                      initial={{ scaleX: 0.35 }}
                      animate={{ scaleX: 0.94 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {DOMAINS.map((d) => (
              <motion.button
                key={d.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-300"
                style={{
                  borderColor: `rgba(${d.rgb},0.28)`,
                  color: `rgba(${d.rgb},0.75)`,
                  background: `rgba(${d.rgb},0.06)`,
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpen(d.id)}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: d.color }}
                />
                {d.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeDomain && (
          <DomainModal domain={activeDomain} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
}
