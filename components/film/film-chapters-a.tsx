/* Solutions 2IA — film hero. Module de présentation autonome, porté depuis le prototype HTML.
 * Code de rendu identique au prototype : positions, timings et matières sont volontairement
 * exprimés en px du plan 1920×1080 (voir film-runtime.tsx / FilmStage).
 * @ts-nocheck : module purement visuel, sans surface d'API typée — voir design_handoff_hero_film/README.md, section « TypeScript & lint ».
 */
// @ts-nocheck
'use client';

import React from 'react';
import { Easing, animate, clamp } from './film-runtime';
import { C, F, mono, sora, MOTION, E, Lv, IO, lerp, clickP, ringP, track, MAT, Obj, Done, cubicAt, dOf, sWire, Wire, Pulse, Overlay, RowArrows, Cursor, ChapterLabel, FinalTitle, SlotLabels, Environment } from './film-core';

/* ── 00 · Intro ─────────────────────────────────────────────────────── */
function SceneIntro({ tl }) {
  const light = IO(tl, 0.4, 5.4, 1.2, 0.6);
  const t1 = IO(tl, 1.2, 4.6, 0.9, 0.5), t2 = IO(tl, 1.5, 4.6, 0.9, 0.5), sub = IO(tl, 2.5, 4.6, 0.8, 0.5);
  const dem = IO(tl, 5.0, 6.2, 0.7, 0.45);
  const sig = track(tl, [
    { t: -9, v: { x: 960, y: 640, o: 0, s: 0.5 } },
    { t: 5.3, d: 0.6, ease: Easing.easeOutCubic, v: { o: 1, s: 1 } },
    { t: 6.2, d: 0.8, v: { x: 561, y: 540 } },
    { t: 7.1, d: 0.45, ease: Easing.easeInCubic, v: { o: 0, s: 1.6 } },
  ]);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 960 - 260, top: 470 - 260, width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, rgba(58,216,255,${0.28 * light}) 0%, rgba(58,216,255,${0.08 * light}) 30%, transparent 62%)`, transform: `scale(${0.4 + light * 0.6})` }}></div>
      <div style={{ position: 'absolute', left: 960 - 4, top: 470 - 4, width: 8, height: 8, borderRadius: '50%', background: '#dff6ff', boxShadow: `0 0 ${18 + light * 24}px ${light * 8}px rgba(58,216,255,.9)`, opacity: light }}></div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center' }}>
        <div style={sora(78, { textTransform: 'uppercase', lineHeight: 1.06, opacity: t1, transform: `translateY(${(1 - t1) * 22}px)` })}>Des outils</div>
        <div style={sora(78, { textTransform: 'uppercase', lineHeight: 1.06, opacity: t2, transform: `translateY(${(1 - t2) * 22}px)` })}>qui travaillent pour vous</div>
        <div style={{ marginTop: 34, fontSize: 21, letterSpacing: '.08em', color: '#9fb0d4', opacity: sub, transform: `translateY(${(1 - sub) * 10}px)` }}>Sites · Applications · Automatisations · Agents IA · Mémoire</div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center', opacity: dem, transform: `translateY(${(1 - dem) * 14}px)` }}>
        <div style={{ fontFamily: F.sora, fontSize: 36, fontWeight: 500, color: C.ink, letterSpacing: '-.01em' }}>Une demande arrive.</div>
      </div>
      {sig.o > 0.002 && (
        <div style={{ position: 'absolute', left: sig.x, top: sig.y, width: 0, height: 0, opacity: clamp(sig.o, 0, 1), transform: `scale(${sig.s})` }}>
          {[0, 1, 2].map((i) => { const q = ((tl * 1.1) + i / 3) % 1; return <div key={i} style={{ position: 'absolute', left: -8 - q * 60, top: -8 - q * 60, width: 16 + q * 120, height: 16 + q * 120, borderRadius: '50%', border: `1.5px solid rgba(58,216,255,${(1 - q) * 0.7})` }}></div>; })}
          <div style={{ position: 'absolute', left: -7, top: -7, width: 14, height: 14, borderRadius: '50%', background: '#e8fbff', boxShadow: '0 0 26px 6px rgba(58,216,255,.9)' }}></div>
        </div>
      )}
    </div>
  );
}

/* ── 01 · Agent IA ──────────────────────────────────────────────────── */
const PH = { w: 322, h: 668 };
const CRM = { w: 620, h: 440 };
const CAL = { w: 620, h: 480 };
const NOTE = { w: 400, h: 180 };

function Waveform({ tl, level, tone }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 34 }}>
      {Array.from({ length: 34 }).map((_, i) => (
        <span key={i} style={{ width: 4, borderRadius: 2, background: tone, opacity: 0.35 + 0.65 * level, height: 3 + Math.abs(Math.sin(tl * 6.3 + i * 0.9) * Math.cos(tl * 2.1 + i * 0.35)) * 28 * level }}></span>
      ))}
    </div>
  );
}

function PhoneScreen({ tl }) {
  const wake = E(tl, 0.55, 0.5);
  const inc = IO(tl, 0.7, 2.15, 0.6, 0.35);
  const con = E(tl, 2.35, 0.6);
  const tap = ringP(tl, 2.0);
  const secs = Math.max(0, Math.floor(tl - 2.35));
  const speak = (a, b) => IO(tl, a, b, 0.25, 0.3);
  const cl = Math.max(speak(3.0, 3.7), speak(4.9, 5.4));
  const ag = Math.max(speak(3.9, 4.7), speak(5.7, 6.4));
  const level = Math.max(cl, ag);
  const tone = ag >= cl ? C.mint : C.cyan;
  const hiName = E(tl, 6.6, 0.3), hiDevis = E(tl, 7.2, 0.3), hiJeudi = E(tl, 7.8, 0.3);
  const msgs = [
    { at: 3.0, who: 'CLIENT', text: <span>Bonjour, j’aurais besoin d’un <span style={{ background: `rgba(58,216,255,${0.32 * hiDevis})`, borderRadius: 4, padding: '0 3px' }}>devis</span>.</span> },
    { at: 3.9, who: 'AGENT', text: <span>Bien sûr.<br />Vous seriez disponible cette semaine ?</span> },
    { at: 4.9, who: 'CLIENT', text: <span><span style={{ background: `rgba(58,216,255,${0.32 * hiJeudi})`, borderRadius: 4, padding: '0 3px' }}>Jeudi vers 14 h</span>.</span> },
    { at: 5.7, who: 'AGENT', text: <span>Parfait.<br />Je regarde les disponibilités.</span> },
  ];
  const understood = E(tl, 8.6, 0.5);
  const dimmed = E(tl, 10.8, 0.6) * 0.3;
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: F.body, opacity: wake }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 0%, #142046 0%, #090d22 45%, #05070f 100%)' }}></div>
      {/* incoming call */}
      <div style={{ position: 'absolute', inset: 0, opacity: inc, transform: `scale(${0.97 + 0.03 * inc})` }}>
        <div style={{ position: 'absolute', top: 54, left: 0, right: 0, textAlign: 'center', fontSize: 13, color: '#8fa0c8', fontWeight: 600 }}>10:41</div>
        <div style={{ position: 'absolute', top: 118, left: '50%', marginLeft: -48, width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(140deg,#6b8dff,#3ad8ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sora, fontWeight: 700, fontSize: 32, color: '#061131', boxShadow: '0 22px 44px -18px rgba(58,216,255,.85), inset 0 2px 0 rgba(255,255,255,.5)' }}>CM</div>
        <div style={{ position: 'absolute', top: 236, left: 0, right: 0, textAlign: 'center', fontFamily: F.sora, fontSize: 28, fontWeight: 600, color: '#f2f6ff', letterSpacing: '-.01em' }}>Claire Martin</div>
        <div style={{ position: 'absolute', top: 278, left: 0, right: 0, textAlign: 'center', fontSize: 15, color: '#9fb0d4' }}>Appel entrant{'.'.repeat(1 + (Math.abs(Math.floor(tl * 2)) % 3))}</div>
        <div style={{ position: 'absolute', top: 322, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <span style={mono(10, C.mint, { padding: '7px 12px', borderRadius: 999, background: 'rgba(110,240,200,.12)', border: '1px solid rgba(110,240,200,.4)' })}>Agent IA disponible</span>
        </div>
        <div style={{ position: 'absolute', bottom: 96, left: 40, width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(150deg,#ff7b7b,#d63b3b)', boxShadow: '0 16px 30px -12px rgba(255,80,80,.7), inset 0 1px 0 rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: 26, height: 10, borderRadius: 5, background: '#fff', transform: 'rotate(135deg)' }}></span>
        </div>
        <div style={{ position: 'absolute', bottom: 96, right: 40, width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(150deg,#63f0b6,#1fb87a)', boxShadow: '0 16px 30px -12px rgba(60,220,150,.85), inset 0 1px 0 rgba(255,255,255,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 + 0.05 * Math.abs(Math.sin(tl * 5))})` }}>
          <span style={{ width: 26, height: 10, borderRadius: 5, background: '#04301d', transform: 'rotate(-40deg)' }}></span>
          {tap > 0.001 && tap < 0.999 && <span style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid rgba(255,255,255,.85)', transform: `scale(${1 + tap * 0.9})`, opacity: 1 - tap }}></span>}
        </div>
        <div style={{ position: 'absolute', bottom: 70, left: 40, width: 68, textAlign: 'center', fontSize: 11, color: '#8fa0c8' }}>Refuser</div>
        <div style={{ position: 'absolute', bottom: 70, right: 40, width: 68, textAlign: 'center', fontSize: 11, color: '#8fa0c8' }}>Accepter</div>
      </div>
      {/* connected call */}
      <div style={{ position: 'absolute', inset: 0, opacity: con }}>
        <div style={{ position: 'absolute', top: 58, left: 22, right: 22, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(140deg,#6b8dff,#3ad8ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sora, fontWeight: 700, fontSize: 14, color: '#061131' }}>CM</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.sora, fontSize: 16, fontWeight: 600, color: '#f2f6ff' }}>Claire Martin</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.mint, boxShadow: `0 0 8px ${C.mint}` }}></span>
              <span style={mono(9, C.mint)}>Appel connecté</span>
            </div>
          </div>
          <div style={mono(11, '#8fa0c8', { letterSpacing: '.06em' })}>{'00:' + String(secs).padStart(2, '0')}</div>
        </div>
        <div style={{ position: 'absolute', top: 124, left: 22, right: 22, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(140,175,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Waveform tl={tl} level={level} tone={tone} />
        </div>
        <div style={{ position: 'absolute', top: 190, left: 22, right: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {msgs.map((m) => {
            const p = E(tl, m.at, 0.5);
            const agent = m.who === 'AGENT';
            return (
              <div key={m.at} style={{ opacity: p, transform: `translateY(${(1 - p) * 10}px)`, paddingLeft: agent ? 0 : 0 }}>
                <div style={mono(8.5, agent ? C.mint : C.cyan, { marginBottom: 5 })}>{m.who}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.4, color: '#e4ebff' }}>{m.text}</div>
              </div>
            );
          })}
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: 1 - understood }}>
          <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(150deg,#ff7b7b,#d63b3b)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 26px -12px rgba(255,80,80,.7)' }}>
            <span style={{ width: 22, height: 8, borderRadius: 4, background: '#fff', transform: 'rotate(135deg)' }}></span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 50, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: understood }}>
          <Done p={understood} label="Demande comprise" size={10} />
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: '#04050d', opacity: dimmed }}></div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(112deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.05) 22%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 76%, rgba(255,255,255,.05) 100%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', left: '50%', top: 12, width: 96, height: 28, marginLeft: -48, borderRadius: 16, background: '#000' }}></div>
    </div>
  );
}

function Phone({ tl, k, z }) {
  const ring = IO(tl, 1.0, 2.0, 0.3, 0.3);
  return (
    <Obj x={k.x} y={k.y} w={PH.w} h={PH.h} s={k.s} ry={k.ry} o={k.o} z={z}>
      {ring > 0.002 && [0, 1, 2].map((i) => { const q = ((tl - 1.0) / 0.9 + i / 3) % 1; return <div key={i} style={{ position: 'absolute', inset: -8 - q * 70, borderRadius: 60 + q * 40, border: `1.5px solid rgba(58,216,255,${(1 - q) * 0.55 * ring})`, boxShadow: `0 0 26px -6px rgba(58,216,255,${(1 - q) * 0.5 * ring})` }}></div>; })}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 56, background: 'linear-gradient(160deg,#68749f 0%,#2b3459 28%,#151b3b 58%,#0b0f26 100%)', boxShadow: '0 70px 110px -44px rgba(0,0,0,.96), 0 0 100px -44px rgba(58,216,255,.55), inset 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 0 rgba(0,0,0,.7), inset 1px 0 0 rgba(255,255,255,.14), inset -1px 0 0 rgba(255,255,255,.08)' }}>
        <div style={{ position: 'absolute', left: -3, top: 150, width: 3, height: 34, borderRadius: 2, background: '#3d4874' }}></div>
        <div style={{ position: 'absolute', left: -3, top: 204, width: 3, height: 62, borderRadius: 2, background: '#3d4874' }}></div>
        <div style={{ position: 'absolute', right: -3, top: 196, width: 3, height: 92, borderRadius: 2, background: '#3d4874' }}></div>
        <div style={{ position: 'absolute', inset: 5, borderRadius: 52, background: '#05060d', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.07)' }}></div>
        <div style={{ position: 'absolute', inset: 12, borderRadius: 45, overflow: 'hidden', background: '#05070f' }}>
          <PhoneScreen tl={tl} />
        </div>
      </div>
    </Obj>
  );
}

function CrmPanel({ tl }) {
  const rows = [['Téléphone', '06 12 34 56 78'], ['Demande', 'Demande de devis'], ['Source', 'Agent IA']];
  return (
    <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', fontFamily: F.body, color: '#0f1631' }, MAT.light())}>
      <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 22px', gap: 14, borderBottom: '1px solid #e2e7f2', background: '#fff' }}>
        <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(140deg,#4a7dff,#6b6cf6)' }}></div>
        <div style={{ fontFamily: F.sora, fontWeight: 600, fontSize: 14, color: '#1a2340' }}>Clientèle</div>
        <div style={{ display: 'flex', gap: 18, marginLeft: 22, fontSize: 13, color: '#6b7a99' }}><span style={{ color: '#1a2340', fontWeight: 600 }}>Clients</span><span>Devis</span><span>Activités</span></div>
        <div style={Object.assign(mono(10, '#6b7a99'), { marginLeft: 'auto' })}>Client</div>
      </div>
      <div style={{ padding: '22px 26px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 58, height: 58, borderRadius: '50%', background: 'linear-gradient(140deg,#4a7dff,#6b6cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: F.sora, fontWeight: 700, fontSize: 20, boxShadow: '0 10px 20px -10px rgba(74,125,255,.7)' }}>CM</div>
          <div>
            <div style={{ fontFamily: F.sora, fontSize: 26, fontWeight: 600, letterSpacing: '-.01em' }}>Claire Martin</div>
            <span style={mono(10, '#2f57d0', { display: 'inline-block', marginTop: 6, padding: '4px 9px', borderRadius: 6, background: '#e8efff' })}>Nouveau prospect</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginTop: 24 }}>
          {rows.map(([k, v], i) => {
            const p = E(tl, 11.3 + i * 0.18, 0.45);
            return (
              <div key={k} style={{ opacity: p, transform: `translateY(${(1 - p) * 6}px)` }}>
                <div style={mono(9.5, '#8a96b3')}>{k}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1a2340', marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {i === 2 && <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.cyan, boxShadow: `0 0 8px ${C.cyan}` }}></span>}{v}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid #e2e7f2', opacity: E(tl, 11.9, 0.5) }}>
          <div style={mono(9.5, '#8a96b3')}>Activité</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.blue, boxShadow: '0 0 0 4px #e8efff' }}></span>
            <span style={mono(10, '#6b7a99', { letterSpacing: '.06em', textTransform: 'none' })}>Aujourd’hui · 10:42</span>
            <span style={{ fontSize: 14, color: '#1a2340', fontWeight: 600 }}>Appel entrant</span>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 26, right: 26, bottom: 20, height: 46, borderRadius: 12, background: '#0f1631', display: 'flex', alignItems: 'center', padding: '0 18px', opacity: E(tl, 12.3, 0.5), transform: `translateY(${(1 - E(tl, 12.3, 0.5)) * 10}px)` }}>
        <Done p={E(tl, 12.4, 0.5)} label="Fiche client créée" />
      </div>
    </div>
  );
}

function CalendarPanel({ tl }) {
  const days = [['LUN', 8], ['MAR', 9], ['MER', 10], ['JEU', 11], ['VEN', 12]];
  const colW = (CAL.w - 54) / 5, rowH = 46, gridTop = 96;
  const events = [[0, 10, 'Réunion équipe'], [1, 15, 'Devis Dupont'], [2, 11, 'Point client'], [4, 9, 'Livraison']];
  const tile = track(tl, [
    { t: -9, v: { x: 430, y: -140, s: 0.6, o: 0 } },
    { t: 14.5, d: 0.5, ease: Easing.easeOutCubic, v: { x: 440, y: -92, s: 1, o: 1 } },
    { t: 14.9, d: 0.55, v: { x: 54 + 3 * colW + 4, y: gridTop + 5 * rowH + 2 } },
  ]);
  const snap = ringP(tl, 15.42);
  const toast = E(tl, 15.7, 0.5);
  return (
    <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 18, fontFamily: F.body, color: '#0f1631' }, MAT.light())}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden' }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14, borderBottom: '1px solid #e2e7f2', background: '#fff' }}>
          <div style={{ display: 'flex', gap: 6 }}><span style={{ width: 26, height: 26, borderRadius: 7, background: '#eef1f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#6b7a99' }}>‹</span><span style={{ width: 26, height: 26, borderRadius: 7, background: '#eef1f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#6b7a99' }}>›</span></div>
          <div style={{ fontFamily: F.sora, fontWeight: 600, fontSize: 15, color: '#1a2340' }}>Juin 2026</div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <span style={{ fontSize: 12, padding: '5px 10px', borderRadius: 7, color: '#6b7a99' }}>Jour</span>
            <span style={{ fontSize: 12, padding: '5px 10px', borderRadius: 7, background: '#0f1631', color: '#fff', fontWeight: 600 }}>Semaine</span>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 54, right: 0, top: 52, height: 44, display: 'flex', borderBottom: '1px solid #e2e7f2' }}>
          {days.map(([d, n], i) => (
            <div key={d} style={{ width: colW, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderLeft: '1px solid #e9edf5' }}>
              <span style={mono(9.5, i === 3 ? '#1a2340' : '#8a96b3')}>{d}</span>
              <span style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: i === 3 ? '#0f1631' : 'transparent', color: i === 3 ? '#fff' : '#1a2340' }}>{n}</span>
            </div>
          ))}
        </div>
        {Array.from({ length: 8 }).map((_, r) => (
          <div key={r} style={{ position: 'absolute', left: 0, right: 0, top: gridTop + r * rowH, height: rowH, borderTop: '1px solid #e9edf5' }}>
            <span style={mono(9, '#9aa4bd', { position: 'absolute', left: 12, top: -6, letterSpacing: '.04em' })}>{String(9 + r).padStart(2, '0')}:00</span>
          </div>
        ))}
        {days.map((_, i) => <div key={i} style={{ position: 'absolute', left: 54 + i * colW, top: gridTop, bottom: 0, width: 1, background: '#e9edf5' }}></div>)}
        {events.map(([c, h, label]) => (
          <div key={label} style={{ position: 'absolute', left: 54 + c * colW + 4, top: gridTop + (h - 9) * rowH + 2, width: colW - 8, height: rowH - 4, borderRadius: 6, background: '#e6eaf5', borderLeft: '3px solid #9aa8cc', padding: '5px 7px', boxSizing: 'border-box', fontSize: 10.5, fontWeight: 600, color: '#3b4a75', lineHeight: 1.25 }}>{label}</div>
        ))}
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14, height: 44, borderRadius: 12, background: '#0f1631', display: 'flex', alignItems: 'center', padding: '0 16px', opacity: toast, transform: `translateY(${(1 - toast) * 10}px)` }}>
          <Done p={toast} label="Rendez-vous enregistré" />
        </div>
      </div>
      {tile.o > 0.002 && (
        <div style={{ position: 'absolute', left: tile.x, top: tile.y, width: colW - 8, height: rowH - 4, opacity: clamp(tile.o, 0, 1), transform: `scale(${tile.s})`, zIndex: 3 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 7, background: 'linear-gradient(140deg,#3ad8ff,#4a7dff)', boxShadow: tile.y < 0 ? '0 30px 40px -18px rgba(0,0,0,.9), 0 0 40px -12px rgba(58,216,255,.9)' : '0 6px 14px -8px rgba(58,216,255,.9)', padding: '4px 7px', boxSizing: 'border-box', color: '#04122c', lineHeight: 1.15 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '.04em' }}>CLAIRE MARTIN</div>
            <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.85 }}>RDV DEVIS · 14:00</div>
          </div>
          {snap > 0.001 && snap < 0.999 && <div style={{ position: 'absolute', inset: -4, borderRadius: 10, border: '2px solid rgba(58,216,255,.9)', transform: `scale(${1 + snap * 0.7})`, opacity: 1 - snap }}></div>}
        </div>
      )}
    </div>
  );
}

function Notification({ tl }) {
  return (
    <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 20, padding: '18px 22px', boxSizing: 'border-box', fontFamily: F.body }, MAT.glass(C.cyan))}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(150deg, ${C.mint}, #2fb98f)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 16px -8px ${C.mint}` }}>
          <span style={{ width: 11, height: 12, borderRadius: '50% 50% 3px 3px', background: '#04301d' }}></span>
        </div>
        <span style={mono(10, C.cyan)}>Nouveau rendez-vous</span>
        <span style={mono(9, C.faint, { marginLeft: 'auto', textTransform: 'none', letterSpacing: '.04em' })}>maintenant</span>
      </div>
      <div style={{ marginTop: 14, fontFamily: F.sora, fontSize: 20, fontWeight: 600, color: C.ink }}>Claire Martin</div>
      <div style={{ marginTop: 5, fontSize: 14.5, color: C.dim }}>Jeudi · 14:00 · Demande de devis</div>
      <div style={{ marginTop: 12, fontSize: 13.5, color: C.cyan, fontWeight: 600 }}>Voir la fiche →</div>
    </div>
  );
}

function SceneAgent({ tl, showLabel }) {
  const ph = track(tl, [
    { t: -9, v: { x: 400, y: 260, s: 0.35, ry: -24, o: 0 } },
    { t: 0, d: 1.0, ease: Easing.easeOutCubic, v: { y: 206, s: 1, ry: -10, o: 1 } },
    { t: 3.2, d: 0.6, v: { ry: -3 } },
    { t: 9.9, d: 0.6, v: { x: 250, y: 226, s: 0.9, ry: -8 } },
    { t: 12.9, d: 0.6, v: { x: 130, y: 236, s: 0.84, o: 0.9 } },
    { t: 17.9, d: 0.9, v: { x: 128, y: 266, s: 0.55, ry: 0, o: 1 } },
    { t: 21.0, d: 0.5, v: { o: 0, s: 0.45, y: 320 } },
  ]);
  const crm = track(tl, [
    { t: -9, v: { x: 740, y: 330, s: 0.9, o: 0, ry: -6 } },
    { t: 10.8, d: 0.8, ease: Easing.easeOutCubic, v: { x: 700, y: 300, s: 1, o: 1, ry: -4 } },
    { t: 12.9, d: 0.6, v: { x: 480, y: 262, s: 0.78, o: 0.92 } },
    { t: 17.9, d: 0.9, v: { x: 358, y: 380, s: 0.55, o: 1, ry: 0 } },
    { t: 20.8, d: 0.5, v: { o: 0, s: 0.45, y: 430 } },
  ]);
  const cal = track(tl, [
    { t: -9, v: { x: 1260, y: 320, s: 0.9, o: 0, ry: 6 } },
    { t: 13.6, d: 0.8, ease: Easing.easeOutCubic, v: { x: 1220, y: 280, s: 1, o: 1, ry: 3 } },
    { t: 17.9, d: 0.9, v: { x: 819, y: 360, s: 0.55, ry: 0 } },
    { t: 20.6, d: 0.5, v: { o: 0, s: 0.45, y: 410 } },
  ]);
  const nt = track(tl, [
    { t: -9, v: { x: 1400, y: 150, s: 0.9, o: 0 } },
    { t: 16.3, d: 0.6, ease: Easing.easeOutCubic, v: { y: 62, s: 1, o: 1 } },
    { t: 17.9, d: 0.9, v: { x: 1369, y: 510, s: 0.75 } },
    { t: 20.4, d: 0.4, v: { o: 0, s: 0.6, y: 560 } },
  ]);
  const card = track(tl, [
    { t: -9, v: { x: 800, y: 372, s: 0.96, o: 0 } },
    { t: 8.6, d: 0.5, v: { s: 1, o: 1 } },
    { t: 9.9, d: 0.55, ease: Easing.easeInCubic, v: { x: 400, y: 440, s: 0.25, o: 0 } },
  ]);
  const chips = [
    { at: 6.6, from: [470, 300], to: [800, 352], label: null, value: 'Claire Martin', cx: 824, cy: 420 },
    { at: 7.2, from: [480, 470], to: [800, 432], label: 'Demande', value: 'Devis', cx: 824, cy: 470 },
    { at: 7.8, from: [480, 556], to: [800, 512], label: 'Créneau', value: 'Jeudi · 14:00', cx: 824, cy: 512 },
  ];
  const conv = E(tl, 8.4, 0.6), chipOut = E(tl, 8.75, 0.35);

  // connection geometry from live tracks
  const phRight = ph.x + PH.w / 2 + (PH.w / 2) * ph.s * 0.97, phMid = ph.y + PH.h / 2 + 30;
  const crmLeft = crm.x + (CRM.w / 2) * (1 - crm.s), crmMid = crm.y + CRM.h / 2, crmRight = crm.x + CRM.w / 2 + (CRM.w / 2) * crm.s;
  const calLeft = cal.x + (CAL.w / 2) * (1 - cal.s), calMid = cal.y + CAL.h / 2;
  const w1 = sWire(phRight, phMid, crmLeft, crmMid), w2 = sWire(crmRight, crmMid, calLeft, calMid);
  const wireOut = 1 - Lv(tl, 17.9, 0.5);
  const fin = IO(tl, 18.6, 21.1, 0.5, 0.4);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <ChapterLabel tl={tl} n="01" title="Agent IA" accent={C.cyan} until={21.5} show={showLabel} />
      <Overlay>
        <Wire pts={w1} p={MOTION.draw(10.2, 10.8)(tl)} accent={C.cyan} o={wireOut} />
        <Wire pts={w2} p={MOTION.draw(13.1, 13.6)(tl)} accent={C.cyan} o={wireOut} />
        <Pulse pts={w1} tl={tl} start={10.9} end={17.9} period={1.6} accent={C.cyan} o={wireOut} />
        <Pulse pts={w2} tl={tl} start={13.7} end={17.9} period={1.6} accent={C.cyan} o={wireOut} />
      </Overlay>

      <Phone tl={tl} k={ph} z={5} />

      {chips.map((c, i) => {
        const p = E(tl, c.at, 0.75);
        if (p <= 0.002) return null;
        const x = lerp(lerp(c.from[0], c.to[0], p), c.cx, conv), y = lerp(lerp(c.from[1], c.to[1], p) - Math.sin(p * Math.PI) * 36, c.cy, conv);
        const s = lerp(0.5 + 0.5 * p, 0.9, conv), o = Math.min(1, p * 4) * (1 - chipOut);
        if (o <= 0.002) return null;
        return (
          <div key={i} style={Object.assign({ position: 'absolute', left: x, top: y, width: 300, height: 66, borderRadius: 14, opacity: o, transform: `perspective(1600px) rotateY(-6deg) scale(${s})`, transformOrigin: '0 50%', padding: '12px 18px', boxSizing: 'border-box', zIndex: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center' }, MAT.glass(C.cyan))}>
            {c.label && <div style={mono(9.5, C.cyan)}>{c.label}</div>}
            <div style={{ fontFamily: F.sora, fontSize: c.label ? 17 : 19, fontWeight: 600, color: C.ink, marginTop: c.label ? 4 : 0 }}>{c.value}</div>
          </div>
        );
      })}

      <Obj x={card.x} y={card.y} w={430} h={256} s={card.s} ry={-6} o={card.o} z={6}>
        <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 20, padding: '20px 24px', boxSizing: 'border-box' }, MAT.dark(C.cyan))}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.cyan, boxShadow: `0 0 12px ${C.cyan}` }}></span>
            <span style={mono(11, C.cyan)}>Demande comprise</span>
          </div>
          {[['Claire Martin', 26, 18], ['Demande de devis', 18, 8], ['Jeudi · 14:00', 18, 6]].map(([v, size, mt], i) => {
            const p = E(tl, 8.8 + i * 0.12, 0.4);
            return <div key={v} style={{ fontFamily: i === 0 ? F.sora : F.body, fontSize: size, fontWeight: i === 0 ? 600 : 500, color: i === 2 ? '#bfeeff' : C.ink, marginTop: mt, opacity: p }}>{v}</div>;
          })}
          <div style={{ position: 'absolute', left: 24, right: 24, bottom: 18, paddingTop: 12, borderTop: '1px dashed rgba(58,216,255,.3)', fontSize: 12.5, color: C.dim, opacity: E(tl, 9.2, 0.5) }}>Informations extraites de la conversation</div>
        </div>
      </Obj>

      <Obj x={crm.x} y={crm.y} w={CRM.w} h={CRM.h} s={crm.s} ry={crm.ry} o={crm.o} z={4}><CrmPanel tl={tl} /></Obj>
      <Obj x={cal.x} y={cal.y} w={CAL.w} h={CAL.h} s={cal.s} ry={cal.ry} o={cal.o} z={4}><CalendarPanel tl={tl} /></Obj>
      <Obj x={nt.x} y={nt.y} w={NOTE.w} h={NOTE.h} s={nt.s} o={nt.o} z={7} shadow={0.6}>
        <Notification tl={tl} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 16, display: 'flex', justifyContent: 'center', opacity: 1 - E(tl, 17.9, 0.4) }}><Done p={E(tl, 17.3, 0.5)} label="Équipe informée" /></div>
      </Obj>

      <RowArrows p={fin} gaps={[[395, 480], [856, 940], [1317, 1401]]} y={600} accent={C.cyan} />
      <SlotLabels p={fin} items={[[289, 'Téléphone'], [668, 'CRM'], [1129, 'Agenda'], [1569, 'Équipe']]} y={826} />
      <FinalTitle tl={tl} at={18.3} until={21.3} accent={C.cyan} title="Agent IA" lines={['Il échange avec le client,', 'comprend sa demande', 'et agit dans vos outils.']} pipeline={['Appel', 'Compréhension', 'Client', 'Rendez-vous']} />
    </div>
  );
}

/* ── 02 · Automatisation ────────────────────────────────────────────── */
const APPA = { w: 720, h: 520 };
const APPB = { w: 640, h: 500 };

function AppA({ tl, dim }) {
  const hov = E(tl, 2.4, 0.25), press = clickP(tl, 2.7), valid = E(tl, 2.9, 0.4);
  const items = ['Planning', 'Clients', 'Demandes', 'Équipe'];
  return (
    <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', display: 'flex', fontFamily: F.body }, MAT.dark(C.blue))}>
      <div style={{ width: 176, background: '#0b0f21', borderRight: '1px solid rgba(140,175,255,.08)', padding: '22px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <span style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(140deg,#4a7dff,#3ad8ff)' }}></span>
          <span style={{ fontFamily: F.sora, fontWeight: 600, fontSize: 15, color: C.ink }}>Planéo</span>
        </div>
        {items.map((it, i) => (
          <div key={it} style={{ padding: '10px 12px', borderRadius: 9, fontSize: 13.5, fontWeight: i === 0 ? 600 : 500, color: i === 0 ? '#fff' : '#8b99c2', background: i === 0 ? 'linear-gradient(140deg,#4a7dff,#3f6df0)' : 'transparent', marginBottom: 4, boxShadow: i === 0 ? '0 8px 18px -10px rgba(74,125,255,.9)' : 'none' }}>{it}</div>
        ))}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#2a3560' }}></span>
          <span style={{ fontSize: 12, color: '#8b99c2' }}>Thomas R.</span>
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', background: '#131a33' }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 26px', borderBottom: '1px solid rgba(140,175,255,.08)', fontSize: 13, color: '#8b99c2', gap: 10 }}>
          <span style={{ color: C.ink, fontWeight: 600 }}>Planning</span><span>/</span><span>Semaine 24</span>
          <span style={{ marginLeft: 'auto', width: 180, height: 30, borderRadius: 8, background: '#0f1530', border: '1px solid rgba(140,175,255,.1)' }}></span>
        </div>
        <div style={{ padding: '24px 28px', opacity: 1 - dim * 0.7 }}>
          <div style={mono(10, C.blue)}>Rendez-vous</div>
          <div style={sora(34, { marginTop: 8 })}>Jeudi 14:00</div>
        </div>
        <div style={{ margin: '0 28px', padding: '18px 20px', borderRadius: 14, background: '#1b2346', border: '1px solid rgba(140,175,255,.12)', display: 'flex', alignItems: 'center', gap: 18, opacity: 1 - dim * 0.7 }}>
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(140deg,#6b8dff,#3ad8ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sora, fontWeight: 700, color: '#061131', fontSize: 15 }}>CM</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.sora, fontSize: 19, fontWeight: 600, color: C.ink }}>Claire Martin</div>
            <div style={{ fontSize: 14, color: C.dim, marginTop: 4 }}>Demande de devis</div>
            <div style={mono(12, '#bcd0ff', { marginTop: 6, letterSpacing: '.06em' })}>06 12 34 56 78</div>
          </div>
          <span style={mono(10, C.mint, { padding: '7px 11px', borderRadius: 999, border: '1px solid rgba(110,240,200,.45)', background: 'rgba(110,240,200,.1)' })}>Confirmé</span>
        </div>
        <div style={{ margin: '22px 28px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative', width: 168, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sora, fontWeight: 700, fontSize: 14, letterSpacing: '.08em', color: valid > 0.5 ? '#04301d' : '#fff', background: valid > 0.5 ? 'linear-gradient(140deg,#6ef0c8,#33c896)' : `linear-gradient(140deg,#4a7dff,${hov > 0.5 ? '#3ad8ff' : '#3f6df0'})`, boxShadow: `0 ${14 + hov * 8}px ${26 + hov * 10}px -14px rgba(74,125,255,${0.6 + hov * 0.4}), inset 0 1px 0 rgba(255,255,255,.35)`, transform: `translateY(${-hov * 2}px) scale(${1 - press * 0.05})` }}>
            {valid > 0.5 ? '✓  VALIDÉ' : 'VALIDER'}
            {ringP(tl, 2.7) > 0.001 && ringP(tl, 2.7) < 0.999 && <span style={{ position: 'absolute', inset: -3, borderRadius: 14, border: '2px solid rgba(255,255,255,.8)', transform: `scale(${1 + ringP(tl, 2.7) * 0.25})`, opacity: 1 - ringP(tl, 2.7) }}></span>}
          </div>
          <span style={{ fontSize: 13, color: C.faint, opacity: 1 - dim }}>Valide le créneau et prévient le client</span>
        </div>
      </div>
    </div>
  );
}

function Station({ tl, x, at, leave, title, children }) {
  const p = IO(tl, at, leave, 0.6, 0.5);
  if (p <= 0.002) return null;
  const out = Lv(tl, leave, 0.5);
  return (
    <div style={{ position: 'absolute', left: x - 130, top: 270, width: 260, zIndex: 3, opacity: p, transform: `translateY(${(1 - E(tl, at, 0.6)) * 20 - out * 30}px) scale(${1 - out * 0.08})`, filter: out > 0.02 ? `blur(${out * 3}px)` : 'none' }}>
      <div style={Object.assign({ borderRadius: 18, padding: '18px 22px', boxSizing: 'border-box' }, MAT.dark(C.violet))}>
        <div style={mono(11, C.violet)}>{title}</div>
        <div style={{ marginTop: 12 }}>{children}</div>
      </div>
      <div style={{ position: 'absolute', left: '50%', top: '100%', width: 2, height: 140, marginLeft: -1, background: `linear-gradient(180deg, ${C.violet}aa, transparent)` }}></div>
    </div>
  );
}

function AppB({ tl }) {
  const c1 = E(tl, 12.9, 0.5), d1 = E(tl, 13.4, 0.5), a2 = E(tl, 14.1, 0.5), d2 = E(tl, 14.6, 0.5), n3 = E(tl, 15.3, 0.5), d3 = E(tl, 15.8, 0.5);
  return (
    <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', fontFamily: F.body, color: '#141a2e' }, MAT.light(), { background: '#f7f7fb' })}>
      <div style={{ height: 54, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 22, background: '#fff', borderBottom: '1px solid #e6e8f0' }}>
        <span style={{ fontFamily: F.serif, fontSize: 20, color: '#2d2a8a', letterSpacing: '.02em' }}>Relatio</span>
        {['Contacts', 'Activités', 'Notes', 'Rapports'].map((t, i) => <span key={t} style={{ fontSize: 13, color: i === 0 ? '#2d2a8a' : '#7a809a', fontWeight: i === 0 ? 700 : 500, paddingBottom: 2, borderBottom: i === 0 ? '2px solid #6b6cf6' : '2px solid transparent' }}>{t}</span>)}
        <span style={{ marginLeft: 'auto', width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(140deg,#6b6cf6,#a68cff)' }}></span>
      </div>
      <div style={{ padding: '22px 26px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div style={{ opacity: c1, transform: `translateY(${(1 - c1) * 10}px)` }}>
          <div style={mono(10, '#7a809a')}>Contact</div>
          <div style={{ fontFamily: F.sora, fontSize: 28, fontWeight: 600, marginTop: 8, letterSpacing: '-.01em' }}>Claire Martin</div>
          <span style={mono(10, '#4b3fd6', { display: 'inline-block', marginTop: 8, padding: '5px 10px', borderRadius: 999, background: '#ecebff', border: '1px solid #d6d3ff' })}>Nouveau prospect</span>
          <div style={{ marginTop: 14 }}><Done p={d1} label="Contact créé" dark /></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ padding: '14px 16px', borderRadius: 12, background: '#fff', border: '1px solid #e6e8f0', boxShadow: '0 10px 20px -16px rgba(20,26,46,.4)', opacity: a2, transform: `translateY(${(1 - a2) * 10}px)` }}>
            <div style={mono(9.5, '#7a809a')}>Activité</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 6 }}>RDV devis</div>
            <div style={{ fontSize: 13, color: '#5c6280', marginTop: 2 }}>Jeudi 14:00</div>
            <div style={{ marginTop: 10 }}><Done p={d2} label="Activité ajoutée" dark size={11} /></div>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: 12, background: '#fffbe9', border: '1px solid #f1e6b8', opacity: n3, transform: `translateY(${(1 - n3) * 10}px)` }}>
            <div style={mono(9.5, '#9a8340')}>Note</div>
            <div style={{ fontSize: 14, color: '#3d3a2a', marginTop: 6 }}>Demande de devis</div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 26, right: 26, bottom: 20, height: 46, borderRadius: 12, background: '#141a2e', display: 'flex', alignItems: 'center', padding: '0 18px', opacity: d3, transform: `translateY(${(1 - d3) * 10}px)` }}>
        <Done p={d3} label="Données synchronisées" />
      </div>
    </div>
  );
}

function SceneAuto({ tl, showLabel }) {
  const A = track(tl, [
    { t: -9, v: { x: 160, y: 290, s: 0.9, o: 0, ry: 8, dim: 0 } },
    { t: 0.2, d: 0.9, ease: Easing.easeOutCubic, v: { x: 120, y: 250, s: 1, o: 1, ry: 5 } },
    { t: 3.9, d: 0.6, v: { x: 70, y: 240, s: 0.86, o: 0.8, dim: 1 } },
    { t: 16.6, d: 0.9, v: { x: 60, y: 340, s: 0.62, o: 1, ry: 0, dim: 0 } },
    { t: 18.7, d: 0.5, v: { o: 0, s: 0.5 } },
  ]);
  const B = track(tl, [
    { t: -9, v: { x: 1220, y: 300, s: 0.9, o: 0, ry: -8 } },
    { t: 12.3, d: 0.8, ease: Easing.easeOutCubic, v: { x: 1180, y: 260, s: 1, o: 1, ry: -5 } },
    { t: 16.6, d: 0.9, v: { x: 1180, y: 350, s: 0.62, ry: 0 } },
    { t: 18.5, d: 0.5, v: { o: 0, s: 0.5 } },
  ]);
  const ev = track(tl, [
    { t: -9, v: { cx: 470, cy: 560, s: 0.7, o: 0 } },
    { t: 4.0, d: 0.8, ease: Easing.easeOutCubic, v: { cx: 720, cy: 560, s: 1, o: 1 } },
    { t: 5.6, d: 0.6, v: { cx: 900 } },
    { t: 7.6, d: 0.6, v: { cx: 1060 } },
    { t: 9.6, d: 0.6, v: { cx: 1220 } },
    { t: 12.0, d: 0.6, ease: Easing.easeInCubic, v: { cx: 1400, s: 0.6, o: 0 } },
  ]);
  const cur = track(tl, [
    { t: -9, v: { x: 980, y: 900, o: 0 } },
    { t: 1.6, d: 0.8, v: { x: 400, y: 558, o: 1 } },
    { t: 3.2, d: 0.5, v: { o: 0, y: 600 } },
  ]);
  const rail = IO(tl, 5.4, 12.4, 0.6, 0.5);
  const detect = IO(tl, 4.9, 5.6, 0.4, 0.3);
  const line = MOTION.draw(17.0, 17.6)(tl) * (1 - Lv(tl, 18.3, 0.4));
  const chk = [E(tl, 7.2, 0.3), E(tl, 9.2, 0.3), E(tl, 11.5, 0.3)];
  const outcomes = IO(tl, 17.6, 18.6, 0.5, 0.4);
  const searching = IO(tl, 8.3, 9.2, 0.3, 0.2);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <ChapterLabel tl={tl} n="02" title="Automatisation" accent={C.violet} until={18.9} show={showLabel} />
      {rail > 0.002 && <div style={{ position: 'absolute', left: 760, top: 559, width: 540, height: 2, opacity: rail, background: 'linear-gradient(90deg, transparent, rgba(166,140,255,.55) 15%, rgba(166,140,255,.55) 85%, transparent)' }}></div>}
      {rail > 0.002 && <div style={{ position: 'absolute', left: ev.cx - 90, top: 520, width: 180, height: 80, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(166,140,255,.35), transparent 70%)', opacity: rail }}></div>}
      <Overlay><Wire pts={sWire(643, 600, 1302, 600)} p={line} accent={C.violet} /><Pulse pts={sWire(643, 600, 1302, 600)} tl={tl} start={17.6} end={18.3} period={1.4} accent={C.violet} /></Overlay>

      <Obj x={A.x} y={A.y} w={APPA.w} h={APPA.h} s={A.s} ry={A.ry} o={A.o} z={3}><AppA tl={tl} dim={A.dim} /></Obj>
      <Cursor x={cur.x} y={cur.y} o={cur.o} press={clickP(tl, 2.7)} ring={ringP(tl, 2.7)} />

      <Obj x={ev.cx - 130} y={ev.cy - 60} w={260} h={120} s={ev.s} o={ev.o} z={8} shadow={0.7}>
        <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 16, padding: '14px 18px', boxSizing: 'border-box' }, MAT.glass(C.violet))}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={mono(9.5, C.violet)}>Nouvel événement</span>
            <span style={{ display: 'flex', gap: 5 }}>{chk.map((c, i) => <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c > 0.5 ? C.mint : 'rgba(166,140,255,.3)', boxShadow: c > 0.5 ? `0 0 8px ${C.mint}` : 'none' }}></span>)}</span>
          </div>
          <div style={{ fontFamily: F.sora, fontSize: 17, fontWeight: 600, color: C.ink, marginTop: 8 }}>Claire Martin</div>
          <div style={{ fontSize: 13, color: C.dim, marginTop: 3 }}>Jeudi · 14:00 · Devis</div>
          <div style={mono(9.5, '#bfeeff', { marginTop: 5, letterSpacing: '.05em', opacity: chk[0], textTransform: 'none' })}>+33 6 12 34 56 78</div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 12, textAlign: 'center', fontSize: 13, color: C.violet, opacity: detect }}>Donnée détectée</div>
      </Obj>

      <Station tl={tl} x={900} at={5.9} leave={7.9} title="Préparer">
        <div style={mono(12, '#c9d3f5', { letterSpacing: '.06em', textTransform: 'none', opacity: E(tl, 6.3, 0.4) })}>06 12 34 56 78</div>
        <div style={{ color: C.violet, fontSize: 14, margin: '4px 0', opacity: E(tl, 6.6, 0.3) }}>↓</div>
        <div style={mono(13, C.ink, { letterSpacing: '.06em', textTransform: 'none', opacity: E(tl, 6.8, 0.4) })}>+33 6 12 34 56 78</div>
        <div style={{ marginTop: 12 }}><Done p={E(tl, 7.2, 0.4)} label="Format prêt" size={11} /></div>
      </Station>
      <Station tl={tl} x={1060} at={7.9} leave={9.9} title="Vérifier">
        <div style={{ position: 'relative', height: 24 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, fontSize: 14, color: C.dim, opacity: searching }}>Recherche de doublon{'.'.repeat(1 + (Math.abs(Math.floor(tl * 3)) % 3))}</div>
          <div style={{ position: 'absolute', left: 0, top: 0 }}><Done p={E(tl, 9.2, 0.4)} label="Aucun doublon" size={11} /></div>
        </div>
      </Station>
      <Station tl={tl} x={1220} at={9.9} leave={12.2} title="Correspondance">
        {[['Client', 'Contact', 10.4], ['Rendez-vous', 'Activité', 10.7], ['Message', 'Note', 11.0]].map(([a, b, at]) => (
          <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, marginBottom: 6, opacity: E(tl, at, 0.4) }}>
            <span style={{ color: C.dim, width: 96 }}>{a}</span><span style={{ color: C.violet }}>→</span><span style={{ color: C.ink, fontWeight: 600 }}>{b}</span>
          </div>
        ))}
        <div style={{ marginTop: 10 }}><Done p={E(tl, 11.5, 0.4)} label="Destination trouvée" size={11} /></div>
      </Station>

      <Obj x={B.x} y={B.y} w={APPB.w} h={APPB.h} s={B.s} ry={B.ry} o={B.o} z={3}><AppB tl={tl} /></Obj>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', gap: 28, opacity: outcomes, zIndex: 30 }}>
        {['0 ressaisie', 'Données synchronisées'].map((s) => <span key={s} style={mono(12, C.mint, { padding: '8px 14px', borderRadius: 999, border: '1px solid rgba(110,240,200,.35)', background: 'rgba(110,240,200,.08)' })}>{s}</span>)}
      </div>
      <FinalTitle tl={tl} at={16.9} until={18.6} accent={C.violet} title="Automatisation" lines={['Une information saisie ici', 'arrive automatiquement là.']} pipeline={['Application A', 'Contrôler', 'Application B']} />
    </div>
  );
}

export { SceneIntro, SceneAgent, SceneAuto };
