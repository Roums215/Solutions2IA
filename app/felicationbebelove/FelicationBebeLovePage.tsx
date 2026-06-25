"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";

/* ──────────────────────────────────────────────────────────────────────────
 * Page surprise pour Jade 💛
 * Acte 1 : accueil + mot d'excuse · Acte 3 : la question d'amour ·
 * Acte 4 : grand final feu d'artifice + félicitations de son diplôme.
 * Tout est auto-contenu (canvas + Web Audio) : aucune dépendance ni asset.
 * ────────────────────────────────────────────────────────────────────────── */

type Act = "intro" | "love" | "finale";

const ROMANTIC_COLORS = [
  "#ffd166", // or
  "#ffadcf", // rose tendre
  "#ff5da2", // magenta
  "#a5b4fc", // indigo (signature site)
  "#22d3ee", // cyan (signature site)
  "#fef3c7", // blanc chaud
  "#c792ea", // violet
];

// Teintes dédiées aux explosions en forme de cœur
const HEART_COLORS = ["#ff3d7f", "#ff5da2", "#ffadcf", "#ff7eb6", "#ff8fab"];

/* ── Feu d'artifice : canvas plein écran + son synthétisé ─────────────────── */
function Fireworks({ withSound }: { withSound: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    /* ── Audio (Web Audio API, déclenché par le clic de Jade = geste autorisé) ── */
    let audioCtx: AudioContext | null = null;
    let master: GainNode | null = null;
    function getCtx(): AudioContext {
      if (!audioCtx) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtx = new AC();
        master = audioCtx.createGain();
        master.gain.value = 0.5;
        master.connect(audioCtx.destination);
      }
      if (audioCtx.state === "suspended") void audioCtx.resume();
      return audioCtx;
    }
    function boom() {
      if (!withSound) return;
      const c = getCtx();
      const t = c.currentTime;
      const len = Math.floor(c.sampleRate * 0.4);
      const buf = c.createBuffer(1, len, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
      const src = c.createBufferSource();
      src.buffer = buf;
      const lp = c.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1100;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.45, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      src.connect(lp);
      lp.connect(g);
      g.connect(master!);
      src.start(t);
      src.stop(t + 0.42);
    }
    function whoosh() {
      if (!withSound) return;
      const c = getCtx();
      const t = c.currentTime;
      const o = c.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(220, t);
      o.frequency.exponentialRampToValueAtTime(880, t + 0.4);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      o.connect(g);
      g.connect(master!);
      o.start(t);
      o.stop(t + 0.5);
    }
    function fanfare() {
      if (!withSound) return;
      const c = getCtx();
      const t0 = c.currentTime + 0.05;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // Do Mi Sol Do
      notes.forEach((f, i) => {
        const t = t0 + i * 0.12;
        const o = c.createOscillator();
        o.type = "triangle";
        o.frequency.value = f;
        const g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.16, t + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
        o.connect(g);
        g.connect(master!);
        o.start(t);
        o.stop(t + 1);
      });
    }

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      color: string;
      size: number;
    };
    type Rocket = {
      x: number;
      y: number;
      vy: number;
      targetY: number;
      color: string;
      heart?: boolean;
    };

    let particles: Particle[] = [];
    const rockets: Rocket[] = [];

    function explode(x: number, y: number, color: string, heart = false) {
      if (heart) {
        // Particules réparties sur la courbe paramétrique d'un cœur.
        const count = reduce ? 42 : 84;
        const s = reduce ? 0.1 : 0.14;
        for (let i = 0; i < count; i++) {
          const t = (Math.PI * 2 * i) / count;
          const hx = 16 * Math.pow(Math.sin(t), 3);
          // y inversé : canvas pointe vers le bas → pointe du cœur en bas
          const hy = -(
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)
          );
          const j = 0.92 + Math.random() * 0.16; // légère irrégularité
          particles.push({
            x,
            y,
            vx: hx * s * j,
            vy: hy * s * j,
            life: 0,
            max: 66 + Math.random() * 40,
            color,
            size: 1.5 + Math.random() * 1.5,
          });
        }
        if (Math.random() < 0.7) boom();
        return;
      }
      const count = reduce ? 26 : 56 + Math.floor(Math.random() * 44);
      for (let i = 0; i < count; i++) {
        const a = (Math.PI * 2 * i) / count + Math.random() * 0.25;
        const sp = (reduce ? 1.3 : 2.1) * (0.35 + Math.random());
        particles.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          max: 56 + Math.random() * 44,
          color,
          size: 1.3 + Math.random() * 1.7,
        });
      }
      if (Math.random() < 0.65) boom();
    }

    function launch() {
      const x = w * (0.12 + Math.random() * 0.76);
      const targetY = h * (0.1 + Math.random() * 0.34);
      const heart = Math.random() < 0.5;
      const color = heart
        ? HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]
        : ROMANTIC_COLORS[Math.floor(Math.random() * ROMANTIC_COLORS.length)];
      rockets.push({ x, y: h + 12, vy: -(6 + Math.random() * 2.6), targetY, color, heart });
      whoosh();
    }

    // Barrage d'ouverture
    fanfare();
    launch();
    // Gros cœur au centre + deux éclats classiques pour le bouquet d'ouverture
    rockets.push({ x: w * 0.5, y: h + 40, vy: -7, targetY: h * 0.28, color: "#ff3d7f", heart: true });
    rockets.push({ x: w * 0.3, y: h + 80, vy: -6.5, targetY: h * 0.32, color: "#ffd166" });
    rockets.push({ x: w * 0.72, y: h + 120, vy: -6.8, targetY: h * 0.22, color: "#ff5da2", heart: true });

    let raf = 0;
    let last = performance.now();
    let spawnT = 0;

    function frame(now: number) {
      const dt = Math.min(33, now - last);
      last = now;
      const step = dt / 16;

      // Traînée : on assombrit légèrement au lieu d'effacer → halos persistants
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = "rgba(5,6,11,0.24)";
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";

      spawnT += dt;
      const interval = reduce ? 950 : 430;
      if (spawnT > interval) {
        spawnT = 0;
        launch();
        if (!reduce && Math.random() < 0.5) launch();
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy * step;
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = r.color;
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx!.fill();
        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color, r.heart);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += step;
        p.vy += 0.035 * step; // gravité
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx * step;
        p.y += p.vy * step;
        const k = 1 - p.life / p.max;
        if (k <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx!.globalAlpha = Math.max(0, k);
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      // Plafonne le nombre de particules (sécurité perf)
      if (particles.length > 1400) particles = particles.slice(-1400);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      void audioCtx?.close();
    };
  }, [withSound]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
    />
  );
}

/* ── Décor romantique (actes 1 & 3) ───────────────────────────────────────── */
function RomanticGlows() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-10 h-[34rem] w-[34rem] rounded-full bg-[#ff5da2]/20 blur-[120px]" />
      <div className="absolute -right-24 bottom-0 h-[36rem] w-[36rem] rounded-full bg-accent-primary/25 blur-[120px]" />
      <div className="absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-cyan/15 blur-[110px]" />
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{ left: `${8 + i * 10}%`, top: `${75 + (i % 3) * 6}%` }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.7, 0], y: -220 }}
          transition={{ duration: 7 + (i % 4), repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        >
          {i % 2 ? "💛" : "✨"}
        </motion.span>
      ))}
    </div>
  );
}

/* ── La question d'amour ───────────────────────────────────────────────────── */
type LoveOption = { label: string; tease?: string; magic?: boolean };
const LOVE_OPTIONS: LoveOption[] = [
  { label: "À peine un peu 🙄", tease: "« À peine » ?! Bon, je fais semblant de ne pas avoir vu. Réessaie 😤" },
  { label: "99 %", tease: "99 %… et le petit 1 % qui manque, il est où ?! 😏 Vise plus haut." },
  { label: "100 %", tease: "100 %, c'est mignon. Mais je SAIS que tu peux faire mieux 😌" },
  { label: "1 000 %", tease: "Làààà tu chauffes 🔥 Encore un tout petit effort…" },
  { label: "10 000 000 %", magic: true },
];

export function FelicationBebeLovePage() {
  const [act, setAct] = useState<Act>("intro");
  const [tease, setTease] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [burstKey, setBurstKey] = useState(0);
  const controls = useAnimationControls();

  function handleLove(opt: LoveOption) {
    if (opt.magic) {
      setTease(null);
      setAct("finale");
      return;
    }
    setTease(opt.tease ?? null);
    void controls.start({ x: [0, -10, 10, -8, 8, 0], transition: { duration: 0.4 } });
  }

  // Désactive le scroll de la page sous l'overlay
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="jade-surprise fixed inset-0 z-[140] overflow-y-auto overscroll-contain bg-[#05060b] text-text-primary">
      {/* Restaure le curseur natif : le site masque globalement le curseur
          (MouseParticles → `* { cursor: none }`) et dessine un curseur custom
          qui passe sous cet overlay. Override scopé (plus spécifique que `*`). */}
      <style>{`
        .jade-surprise, .jade-surprise * { cursor: auto !important; }
        .jade-surprise button, .jade-surprise a, .jade-surprise [role="button"] { cursor: pointer !important; }
      `}</style>
      {act !== "finale" && <RomanticGlows />}
      {act === "finale" && <Fireworks key={burstKey} withSound={soundOn} />}

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-6 py-16">
        <AnimatePresence mode="wait">
          {/* ── ACTE 1 — Accueil + excuses ── */}
          {act === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full max-w-xl text-center"
            >
              <span className="mb-5 inline-block rounded-full border border-border-medium bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                💌 Une page rien que pour toi
              </span>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Coucou <span className="text-gradient-strong">Jade</span> 💛
              </h1>
              <div className="space-y-4 text-base leading-relaxed text-text-secondary sm:text-lg">
                <p>
                  Avant tout… je voulais m&apos;excuser pour ce matin. On s&apos;est accrochés, et
                  franchement, je m&apos;en veux. 🌧️
                </p>
                <p>
                  Aucune dispute ne pèsera jamais plus lourd que toi dans ma vie. Tu es ce qui
                  m&apos;arrive de mieux — et aujourd&apos;hui, j&apos;ai surtout une{" "}
                  <span className="text-text-primary">immense</span> raison d&apos;être fier de toi.
                </p>
                <p className="text-text-tertiary">
                  Promets-moi juste d&apos;aller jusqu&apos;au bout de cette page. 😊
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAct("love")}
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-primary to-accent-dark px-7 py-3.5 text-[0.95rem] font-medium text-white shadow-lg shadow-accent-glow transition-all duration-300 hover:brightness-110 hover:shadow-accent-glow-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
              >
                Je te pardonne, continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          )}

          {/* ── ACTE 3 — La question d'amour ── */}
          {act === "love" && (
            <motion.div
              key="love"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full max-w-lg text-center"
            >
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
                Une dernière chose…
              </span>
              <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
                À combien de % tu m&apos;aimes&nbsp;? <span aria-hidden>😏</span>
              </h2>
              <p className="mb-8 text-sm text-text-tertiary">
                Réfléchis bien. (Indice : il y a une seule bonne réponse 💛)
              </p>

              <motion.div animate={controls} className="flex flex-col gap-3">
                {LOVE_OPTIONS.map((opt) =>
                  opt.magic ? (
                    <motion.button
                      key={opt.label}
                      type="button"
                      onClick={() => handleLove(opt)}
                      animate={{ scale: [1, 1.035, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ff5da2] via-[#ffd166] to-accent-primary px-6 py-5 text-lg font-bold text-[#1a1030] shadow-lg shadow-[#ff5da2]/30 transition-transform hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      ✨ {opt.label} ✨
                    </motion.button>
                  ) : (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleLove(opt)}
                      className="rounded-xl border border-border-medium bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-border-accent hover:bg-white/[0.06] hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
                    >
                      {opt.label}
                    </button>
                  ),
                )}
              </motion.div>

              <div aria-live="polite" className="mt-6 min-h-[1.5rem]">
                <AnimatePresence mode="wait">
                  {tease && (
                    <motion.p
                      key={tease}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-accent-light"
                    >
                      {tease}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── ACTE 4 — Grand final ── */}
          {act === "finale" && (
            <motion.div
              key="finale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-full max-w-2xl text-center"
            >
              <div className="rounded-[2rem] border border-white/10 bg-black/35 px-6 py-12 backdrop-blur-sm sm:px-12 sm:py-14">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-accent-light"
                >
                  🎓 Félicitations 🎓
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 120, damping: 12 }}
                  className="text-gradient-strong text-5xl font-extrabold tracking-tight drop-shadow-[0_0_30px_rgba(255,93,162,0.45)] sm:text-7xl"
                >
                  BRAVO JADE
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mt-5 text-lg font-semibold text-text-primary sm:text-xl"
                >
                  Ta 3ᵉ année de droit, validée. ⚖️
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="mx-auto mt-7 max-w-xl space-y-4 text-base leading-relaxed text-text-secondary"
                >
                  <p>
                    Je sais à quel point tu t&apos;es battue pour en arriver là — les nuits de
                    révisions, le stress des partiels, les moments de doute. Et tu as tenu. Tu as
                    réussi. Je suis tellement fier de toi.
                  </p>
                  <p>
                    Tes études, ton futur métier, tous tes projets : je serai là, à chaque étape.
                    Quel que soit le chemin que tu choisiras — avocate, juriste, ou tout ce dont tu
                    rêves — tu vas y briller. Je crois en toi plus que personne, et je ne te lâcherai
                    jamais.
                  </p>
                  <p className="text-text-primary">
                    Tu vas faire une femme (et une juriste) extraordinaire. Félicitations, mon
                    amour. 💛
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="mt-8 text-sm italic text-text-tertiary"
                >
                  — Iulian, qui t&apos;aime à 10 000 000 % (au moins) ❤️
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.1 }}
                  className="mt-9 flex flex-wrap items-center justify-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => setBurstKey((k) => k + 1)}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff5da2] to-accent-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff5da2]/30 transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Encore un feu d&apos;artifice 🎆
                  </button>
                  <button
                    type="button"
                    onClick={() => setSoundOn((s) => !s)}
                    className="rounded-xl border border-border-medium bg-white/[0.04] px-4 py-3 text-sm text-text-secondary transition-all hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
                    aria-pressed={!soundOn}
                  >
                    {soundOn ? "🔊 Son" : "🔇 Muet"}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
