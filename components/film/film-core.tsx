/* Solutions 2IA — film hero. Module de présentation autonome, porté depuis le prototype HTML.
 * Code de rendu identique au prototype : positions, timings et matières sont volontairement
 * exprimés en px du plan 1920×1080 (voir film-runtime.tsx / FilmStage).
 * @ts-nocheck : module purement visuel, sans surface d'API typée — voir design_handoff_hero_film/README.md, section « TypeScript & lint ».
 */
// @ts-nocheck
'use client';

import React from 'react';
import { Easing, animate, clamp } from './film-runtime';

const C = { ink: '#eef3ff', dim: '#a6b4d6', faint: '#6f80a8', cyan: '#3ad8ff', blue: '#4a7dff', indigo: '#6b6cf6', violet: '#a68cff', mint: '#6ef0c8' };
// Familles chargées par next/font (components/film/filmFonts.ts), variables posées sur la section hero.
const F = { sora: "var(--font-film-sora, 'Sora'), sans-serif", body: "var(--font-film-manrope, 'Manrope'), system-ui, sans-serif", mono: "var(--font-film-mono, 'JetBrains Mono'), monospace", serif: "var(--font-film-serif, 'DM Serif Display'), Georgia, serif" };
const mono = (fontSize, color, extra) => Object.assign({ fontFamily: F.mono, fontSize, letterSpacing: '.14em', textTransform: 'uppercase', color, whiteSpace: 'nowrap' }, extra || {});
const sora = (fontSize, extra) => Object.assign({ fontFamily: F.sora, fontSize, fontWeight: 600, letterSpacing: '-.02em', color: C.ink }, extra || {});

const MOTION = {
  enter: (s, d = 0.8) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutCubic }),
  leave: (s, d = 0.5) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeInCubic }),
  draw: (s, e) => animate({ from: 0, to: 1, start: s, end: e, ease: Easing.easeInOutCubic }),
  pop: (s, d = 0.5) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutBack }),
};
const E = (tl, s, d) => MOTION.enter(s, d)(tl);
const Lv = (tl, s, d) => MOTION.leave(s, d)(tl);
const IO = (tl, s, e, din = 0.8, dout = 0.5) => E(tl, s, din) * (1 - Lv(tl, e, dout));
const lerp = (a, b, p) => a + (b - a) * p;
const clickP = (tl, t) => IO(tl, t, t + 0.1, 0.08, 0.22);
const ringP = (tl, t) => clamp((tl - t) / 0.55, 0, 1);

/* keyframe track: keys[0].v is the initial state; each later key starts a transition to its values at t over d seconds */
function track(tl, keys) {
  const cur = Object.assign({}, keys[0].v);
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    if (tl <= k.t) break;
    const p = (k.ease || Easing.easeInOutCubic)(clamp((tl - k.t) / (k.d || 0.001), 0, 1));
    for (const f in k.v) cur[f] = lerp(cur[f] === undefined ? k.v[f] : cur[f], k.v[f], p);
  }
  return cur;
}

const MAT = {
  dark: (acc) => ({ background: 'linear-gradient(160deg, #1b2249 0%, #10152f 55%, #0a0d22 100%)', border: `1px solid ${acc}3d`, boxShadow: `0 54px 90px -40px rgba(0,0,0,.95), 0 0 80px -34px ${acc}66, 0 2px 0 #0b1030, 0 4px 0 #070a20, inset 0 1px 0 rgba(255,255,255,.12)` }),
  glass: (acc) => ({ background: 'linear-gradient(160deg, rgba(32,42,88,.94), rgba(12,17,42,.97))', border: `1px solid ${acc}66`, boxShadow: `0 40px 70px -32px rgba(0,0,0,.95), 0 0 54px -22px ${acc}77, inset 0 1px 0 rgba(255,255,255,.2), inset 0 -1px 0 rgba(0,0,0,.5)` }),
  light: () => ({ background: '#f4f6fb', boxShadow: '0 64px 100px -44px rgba(0,0,0,.95), 0 2px 0 #cfd6e6, 0 4px 0 #b3bcd2, 0 6px 0 #97a1ba, inset 0 1px 0 #fff' }),
  paper: () => ({ background: 'linear-gradient(175deg, #faf7f0 0%, #efeadf 100%)', boxShadow: '0 34px 60px -30px rgba(0,0,0,.95), 1px 1px 0 #ddd7c9, 2px 2px 0 #cfc8b8, 3px 3px 0 #bfb7a5' }),
};

/* positioned 3D object with a floor shadow */
function Obj({ x = 0, y = 0, w, h, s = 1, ry = 0, rx = 0, o = 1, blur = 0, z = 2, shadow = 0.85, floor = true, children, style }) {
  const op = clamp(o, 0, 1);
  if (op <= 0.002) return null;
  return (
    <div style={Object.assign({
      position: 'absolute', left: x, top: y, width: w, height: h, opacity: op, zIndex: z,
      transform: `perspective(2400px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`,
      transformOrigin: '50% 50%', filter: blur > 0.05 ? `blur(${blur}px)` : 'none',
    }, style)}>
      {floor && <div style={{ position: 'absolute', left: '-6%', right: '-6%', bottom: -h * 0.1, height: h * 0.2, borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(0,0,0,.8), rgba(0,0,0,0) 70%)', filter: 'blur(16px)', opacity: shadow }}></div>}
      {children}
    </div>
  );
}

function Done({ p, label, tone = C.mint, size = 13, dark = false, style }) {
  if (p <= 0.002) return null;
  const ink = dark ? '#0b7a55' : tone;
  return (
    <div style={Object.assign({ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: F.mono, fontSize: size, letterSpacing: '.12em', textTransform: 'uppercase', color: ink, whiteSpace: 'nowrap', opacity: clamp(p, 0, 1), transform: `translateY(${(1 - clamp(p, 0, 1)) * 8}px)` }, style)}>
      <span style={{ width: 22, height: 22, borderRadius: '50%', flex: 'none', background: dark ? '#0b7a55' : `${tone}22`, border: `1px solid ${dark ? '#0b7a55' : tone + '99'}`, color: dark ? '#fff' : tone, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontFamily: F.body, fontWeight: 700, boxShadow: dark ? 'none' : `0 0 18px -4px ${tone}` }}>✓</span>
      {label}
    </div>
  );
}

function cubicAt(p, t) {
  const u = 1 - t;
  return [
    u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0],
    u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1],
  ];
}
const dOf = (p) => `M ${p[0][0]} ${p[0][1]} C ${p[1][0]} ${p[1][1]}, ${p[2][0]} ${p[2][1]}, ${p[3][0]} ${p[3][1]}`;
const sWire = (x0, y0, x1, y1) => [[x0, y0], [x0 + (x1 - x0) * 0.45, y0], [x1 - (x1 - x0) * 0.45, y1], [x1, y1]];

function Wire({ pts, p, accent, w = 1.6, o = 1 }) {
  if (p <= 0.001 || o <= 0.001) return null;
  const d = dOf(pts);
  return (
    <g opacity={o}>
      <path d={d} fill="none" stroke={accent} strokeWidth={w * 6} strokeLinecap="round" strokeDasharray={2000} strokeDashoffset={2000 * (1 - p)} opacity={0.12} />
      <path d={d} fill="none" stroke={accent} strokeWidth={w} strokeLinecap="round" strokeDasharray={2000} strokeDashoffset={2000 * (1 - p)} opacity={0.9} />
    </g>
  );
}

function Pulse({ pts, tl, start, end, period = 1.8, accent, r = 4, o = 1 }) {
  if (tl < start || tl > end || o <= 0.001) return null;
  const q = ((tl - start) / period) % 1;
  const [x, y] = cubicAt(pts, q);
  const fade = Math.min(1, q / 0.16) * Math.min(1, (1 - q) / 0.16);
  return <circle cx={x} cy={y} r={r} fill="#fff" opacity={fade * o} style={{ filter: `drop-shadow(0 0 8px ${accent}) drop-shadow(0 0 3px ${accent})` }} />;
}

function Overlay({ children, z = 1 }) {
  return <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: 1920, height: 1080, overflow: 'visible', pointerEvents: 'none', zIndex: z }}>{children}</svg>;
}

function RowArrows({ p, gaps, y, accent }) {
  if (p <= 0.002) return null;
  return (
    <Overlay z={3}>
      {gaps.map(([a, b], i) => {
        const len = (b - a) * p;
        return (
          <g key={i} opacity={p}>
            <line x1={a} y1={y} x2={a + len} y2={y} stroke={accent} strokeWidth={1.6} strokeLinecap="round" opacity={0.85} />
            {p > 0.9 && <path d={`M ${b - 9} ${y - 6} L ${b} ${y} L ${b - 9} ${y + 6}`} fill="none" stroke={accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        );
      })}
    </Overlay>
  );
}

function Cursor({ x, y, o = 1, press = 0, ring = 0 }) {
  if (o <= 0.002) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 60, opacity: clamp(o, 0, 1), transform: `scale(${1 - press * 0.12})`, transformOrigin: '4px 3px' }}>
      <svg width="26" height="30" viewBox="0 0 26 30" style={{ display: 'block', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,.6))' }}>
        <path d="M3 2 L3 24 L9.5 18.5 L14 27.5 L18 25.5 L13.5 16.8 L22 16.8 Z" fill="#fff" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      {ring > 0.001 && ring < 0.999 && <div style={{ position: 'absolute', left: -16, top: -16, width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(255,255,255,.9)', transform: `scale(${0.5 + ring * 1.5})`, opacity: 1 - ring }}></div>}
    </div>
  );
}

function ChapterLabel({ tl, n, title, accent, until, show = true }) {
  const p = IO(tl, 0.3, until, 0.6, 0.5);
  if (p <= 0.002 || !show) return null;
  return (
    <div style={{ position: 'absolute', left: 80, top: 64, zIndex: 40, opacity: p, transform: `translateY(${(1 - p) * -8}px)` }}>
      <div style={mono(12, accent)}>{n} / 05</div>
      <div style={{ fontFamily: F.sora, fontSize: 15, fontWeight: 600, letterSpacing: '.24em', textTransform: 'uppercase', color: '#d3ddf5', marginTop: 10 }}>{title}</div>
    </div>
  );
}

function FinalTitle({ tl, at, until, title, lines, pipeline, extra, accent, top = 96, pipeTop = 940, extraTone }) {
  const t = IO(tl, at, until, 0.8, 0.45), l = IO(tl, at + 0.3, until, 0.7, 0.45), pp = IO(tl, at + 0.7, until, 0.6, 0.45), ex = IO(tl, at + 1.0, until, 0.6, 0.45);
  if (t <= 0.002) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top, textAlign: 'center', opacity: t, transform: `translateY(${(1 - t) * 18}px)` }}>
        <div style={sora(84, { letterSpacing: '-.03em', textTransform: 'uppercase', lineHeight: 1.05, textShadow: `0 0 70px ${accent}55` })}>{title}</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: top + 118, textAlign: 'center', opacity: l, transform: `translateY(${(1 - l) * 12}px)`, fontSize: 24, lineHeight: 1.42, color: '#bcc8e8' }}>
        {lines.map((s) => <div key={s}>{s}</div>)}
      </div>
      {extra && <div style={{ position: 'absolute', left: 0, right: 0, top: top + 118 + lines.length * 34 + 16, textAlign: 'center', opacity: ex, fontSize: 20, color: extraTone || accent }}>{extra}</div>}
      {pipeline && (
        <div style={{ position: 'absolute', left: 0, right: 0, top: pipeTop, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, opacity: pp, transform: `translateY(${(1 - pp) * 10}px)` }}>
          {pipeline.map((s, i) => (
            <React.Fragment key={s}>
              {i > 0 && <span style={{ color: accent, fontSize: 16, opacity: 0.8 }}>→</span>}
              <span style={mono(12, '#dce6ff', { padding: '10px 16px', borderRadius: 10, border: `1px solid ${accent}55`, background: `${accent}14` })}>{s}</span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function SlotLabels({ p, items, y }) {
  if (p <= 0.002) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none', opacity: p }}>
      {items.map(([cx, label]) => <div key={label} style={mono(11, C.faint, { position: 'absolute', left: cx - 120, width: 240, top: y, textAlign: 'center' })}>{label}</div>)}
    </div>
  );
}

function Environment({ T, CUES, showGrid }) {
  // Seuls les chapitres joués (prop `only`) : sinon le fondu part de l'accent d'un chapitre absent.
  const order = [['Intro', C.cyan], ['AgentIA', C.cyan], ['Automatisation', C.violet], ['Memoire', C.mint], ['SiteWeb', C.blue], ['Application', C.indigo], ['Final', C.cyan]].filter(([name]) => CUES[name] !== undefined);
  let i = 0;
  for (let k = 0; k < order.length; k++) if (T >= CUES[order[k][0]] - 0.001) i = k;
  const prev = order[Math.max(0, i - 1)][1], cur = order[i][1];
  const mix = i === 0 ? 1 : clamp((T - CUES[order[i][0]]) / 1.4, 0, 1);
  const lx = 50 + Math.sin(T * 0.07) * 6, ly = 38 + Math.cos(T * 0.05) * 4;
  const layer = (acc, op) => ({ position: 'absolute', inset: 0, opacity: op, background: `radial-gradient(1100px 760px at ${lx}% ${ly}%, ${acc}2a, transparent 68%), radial-gradient(800px 600px at ${100 - lx}% 90%, ${acc}12, transparent 70%)` });
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#05060f 0%,#070a1b 50%,#04050d 100%)' }}></div>
      <div style={layer(prev, 1 - mix)}></div>
      <div style={layer(cur, mix)}></div>
      <div style={{
        position: 'absolute', left: -700, right: -700, bottom: -420, height: 900, transformOrigin: '50% 0%', transform: 'perspective(900px) rotateX(64deg)', opacity: showGrid ? 1 : 0,
        backgroundImage: 'linear-gradient(rgba(120,160,255,.26) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,255,.26) 1px, transparent 1px)', backgroundSize: '100% 80px, 120px 100%',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,.9) 28%, rgba(0,0,0,.35) 100%)', maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,.9) 28%, rgba(0,0,0,.35) 100%)',
      }}></div>
      <div style={{ position: 'absolute', left: '50%', top: 560, width: 1700, height: 300, marginLeft: -850, background: `radial-gradient(ellipse at 50% 50%, ${cur}1f, transparent 70%)` }}></div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, transparent 48%, rgba(2,3,10,.72) 100%)' }}></div>
    </div>
  );
}

export { C, F, mono, sora, MOTION, E, Lv, IO, lerp, clickP, ringP, track, MAT, Obj, Done, cubicAt, dOf, sWire, Wire, Pulse, Overlay, RowArrows, Cursor, ChapterLabel, FinalTitle, SlotLabels, Environment };
