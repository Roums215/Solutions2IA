/* Chapters 03 · 04 · 05 · 06 — Mémoire, Site web, Application, Final */

/* ── 03 · Mémoire d’entreprise ──────────────────────────────────────── */
const DOCS = [
  { kind: 'PDF', tone: '#e8705f', name: 'Procédure SAV', sub: '2026', x: 330, y: 380, rot: -6, key: true, at: 2.6 },
  { kind: 'DOCS', tone: '#4a8dff', name: 'Procédures internes', sub: 'Google Docs', x: 620, y: 440, rot: 4, key: true, at: 2.95 },
  { kind: 'DOCX', tone: '#6b6cf6', name: 'Conditions clients', sub: 'Word', x: 900, y: 360, rot: -3, at: 3.3 },
  { kind: 'NOTE', tone: '#e0a84a', name: 'Réunion équipe', sub: 'Notes', x: 1180, y: 450, rot: 6, at: 3.65 },
  { kind: 'FAQ', tone: '#3fbf9a', name: 'Support', sub: 'Base de connaissances', x: 1450, y: 370, rot: -5, at: 4.0 },
];

function Paper({ d, hot }) {
  return (
    <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 6, padding: '18px 18px', boxSizing: 'border-box', fontFamily: F.body, color: '#2a2622' }, MAT.paper(), hot > 0.01 ? { boxShadow: `${MAT.paper().boxShadow}, 0 0 ${40 * hot}px -10px rgba(110,240,200,${0.6 * hot})` } : {})}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={mono(8.5, '#fff', { padding: '3px 6px', borderRadius: 4, background: d.tone, letterSpacing: '.1em' })}>{d.kind}</span>
        <span style={mono(8, '#8a8377', { letterSpacing: '.06em', textTransform: 'none' })}>{d.sub}</span>
      </div>
      <div style={{ fontFamily: F.sora, fontSize: 17, fontWeight: 600, lineHeight: 1.2, marginTop: 14, textTransform: 'uppercase', letterSpacing: '-.005em' }}>{d.name}</div>
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 7 }}>
        {[100, 92, 96, 70, 0, 88, 94, 60].map((w, i) => w ? <span key={i} style={{ display: 'block', height: 4, width: `${w}%`, borderRadius: 2, background: '#d9d3c6' }}></span> : <span key={i} style={{ height: 6 }}></span>)}
      </div>
      <div style={{ position: 'absolute', left: 18, bottom: 14, fontSize: 9, color: '#a39c8f' }}>p. 1 / 12</div>
    </div>
  );
}

function OpenDoc({ tl }) {
  const hi = E(tl, 8.9, 0.9);
  const lift = E(tl, 9.9, 0.5);
  const para = { fontSize: 13.5, lineHeight: 1.6, color: '#4a463f', margin: '0 0 14px' };
  return (
    <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 8, padding: '34px 40px', boxSizing: 'border-box', fontFamily: F.body, color: '#2a2622' }, MAT.paper())}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={mono(9, '#fff', { padding: '4px 7px', borderRadius: 4, background: '#e8705f' })}>PDF</span>
        <span style={mono(9, '#8a8377', { textTransform: 'none', letterSpacing: '.06em' })}>Procédure SAV 2026 · §4 Demandes urgentes</span>
      </div>
      <div style={{ fontFamily: F.sora, fontSize: 24, fontWeight: 600, marginTop: 20, letterSpacing: '-.01em' }}>4. Traitement des demandes</div>
      <div style={{ height: 2, width: 60, background: '#2a2622', margin: '12px 0 20px' }}></div>
      <p style={para}><b style={{ color: '#2a2622' }}>4.1 — Réception.</b> Toute demande client reçue par téléphone, e-mail ou formulaire est enregistrée dans l’outil de suivi avec l’heure de réception et le canal utilisé.</p>
      <p style={Object.assign({}, para, { marginBottom: 6 })}><b style={{ color: '#2a2622' }}>4.2 — Demandes urgentes.</b></p>
      <div style={{ position: 'relative', opacity: 1 - lift * 0.55 }}>
        <div style={Object.assign({}, para, { position: 'relative', display: 'inline', padding: '2px 4px', margin: 0, color: '#1e1b17', fontWeight: 600, backgroundImage: 'linear-gradient(rgba(110,240,200,.55), rgba(110,240,200,.55))', backgroundRepeat: 'no-repeat', backgroundSize: `${hi * 100}% 100%`, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' })}>Toute demande urgente doit être qualifiée avant d’être transmise à l’équipe disponible.</div>
      </div>
      <p style={Object.assign({}, para, { marginTop: 8 })}>La qualification précise la nature du problème, le client concerné et le niveau d’impact sur son activité.</p>
      <p style={para}><b style={{ color: '#2a2622' }}>4.3 — Transmission.</b> Le responsable de permanence confirme la prise en charge au client dans un délai de deux heures ouvrées et consigne l’action.</p>
      <p style={para}><b style={{ color: '#2a2622' }}>4.4 — Suivi.</b> Chaque demande urgente fait l’objet d’un point de suivi quotidien jusqu’à sa clôture.</p>
      <div style={{ position: 'absolute', left: 40, right: 40, bottom: 22, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#a39c8f' }}><span>Procédure SAV — version 2026.1</span><span>p. 4 / 12</span></div>
    </div>
  );
}

function SceneMemory({ tl, showLabel }) {
  const q = track(tl, [
    { t: -9, v: { y: 380, s: 1, o: 0, x: 0 } },
    { t: 0.3, d: 0.9, ease: Easing.easeOutCubic, v: { o: 1 } },
    { t: 2.3, d: 0.7, v: { y: 90, s: 0.55 } },
    { t: 15.2, d: 0.9, v: { y: 545, s: 0.34, x: -660 } },
    { t: 17.0, d: 0.5, v: { o: 0 } },
  ]);
  const subP = IO(tl, 1.0, 2.3, 0.7, 0.4);
  const focus = E(tl, 5.4, 0.9);
  const srcLabel = IO(tl, 6.2, 7.6, 0.6, 0.4);
  const od = track(tl, [
    { t: -9, v: { x: 240, y: 200, s: 0.85, o: 0, rot: -4 } },
    { t: 7.9, d: 0.7, ease: Easing.easeOutCubic, v: { s: 1, o: 1, rot: 0 } },
    { t: 11.8, d: 0.7, v: { x: 110 } },
    { t: 15.2, d: 0.9, v: { x: 480, y: 300, s: 0.5 } },
    { t: 16.9, d: 0.5, v: { o: 0 } },
  ]);
  const qc = track(tl, [
    { t: -9, v: { x: 300, y: 500, s: 0.6, o: 0, rot: -2 } },
    { t: 9.9, d: 0.8, ease: Easing.easeOutCubic, v: { x: 1040, y: 420, s: 1, o: 1, rot: 0 } },
    { t: 11.8, d: 0.7, v: { x: 700, y: 300 } },
    { t: 15.2, d: 0.9, v: { x: 950, y: 525, s: 0.55 } },
    { t: 16.7, d: 0.5, v: { o: 0 } },
  ]);
  const an = track(tl, [
    { t: -9, v: { x: 1270, y: 280, s: 0.92, o: 0 } },
    { t: 12.2, d: 0.8, ease: Easing.easeOutCubic, v: { x: 1240, y: 250, s: 1, o: 1 } },
    { t: 15.2, d: 0.9, v: { x: 1340, y: 360, s: 0.55 } },
    { t: 16.5, d: 0.5, v: { o: 0 } },
  ]);
  const passageLabel = IO(tl, 10.6, 15.2, 0.5, 0.4);
  const link = MOTION.draw(10.3, 10.8)(tl) * (1 - Lv(tl, 15.2, 0.5));
  const anchor = [od.x + 260 + 250 * od.s, od.y + 320 + 30 * od.s];
  const qcLeft = [qc.x + 230 - 230 * qc.s, qc.y + 95];
  const fin = IO(tl, 15.9, 16.5, 0.5, 0.4);
  const steps = ['Qualifier la demande', 'Identifier l’équipe disponible', 'Transmettre les informations', 'Confirmer la prise en charge'];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <ChapterLabel tl={tl} n="03" title="Mémoire d’entreprise" accent={C.mint} until={17.3} show={showLabel} />
      <div style={{ position: 'absolute', left: 410, width: 1100, top: q.y, opacity: clamp(q.o, 0, 1), transform: `translateX(${q.x}px) scale(${q.s})`, transformOrigin: '50% 50%', textAlign: 'center', zIndex: 20 }}>
        <div style={{ position: 'absolute', inset: -28, borderRadius: 18, border: '1px solid rgba(110,240,200,.35)', background: 'rgba(12,20,40,.9)', opacity: E(tl, 15.6, 0.5) }}></div>
        <div style={{ position: 'relative', fontFamily: F.sora, fontSize: 52, fontWeight: 500, lineHeight: 1.22, color: C.ink, letterSpacing: '-.02em' }}>Quelle est notre procédure<br />pour traiter une demande urgente ?</div>
        <div style={{ marginTop: 22, fontSize: 19, color: C.dim, opacity: subP }}>Une question posée à la mémoire de l’entreprise.</div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, top: 262, textAlign: 'center', opacity: srcLabel, transform: `translateY(${(1 - srcLabel) * 8}px)` }}>
        <span style={mono(13, C.mint, { letterSpacing: '.28em' })}>2 sources pertinentes</span>
      </div>

      {DOCS.map((d, i) => {
        const inP = E(tl, d.at, 0.9);
        const k = d.key
          ? track(tl, [
            { t: -9, v: { x: d.x, y: d.y + 90, s: 0.6, o: 0, rot: d.rot * 1.6, blur: 0 } },
            { t: d.at, d: 0.9, ease: Easing.easeOutCubic, v: { y: d.y, s: 1, o: 1, rot: d.rot } },
            { t: 5.5, d: 0.9, v: { s: 1.16, y: d.y - 34, rot: d.rot * 0.5 } },
            i === 0 ? { t: 7.6, d: 0.6, v: { x: 320, y: 230, s: 1.9, rot: 0 } } : { t: 7.6, d: 0.8, v: { x: 60, y: 640, s: 0.72, o: 0.45, blur: 1 } },
            i === 0 ? { t: 7.95, d: 0.4, v: { o: 0 } } : { t: 15.2, d: 0.5, v: { o: 0 } },
          ])
          : track(tl, [
            { t: -9, v: { x: d.x, y: d.y + 90, s: 0.6, o: 0, rot: d.rot * 1.6, blur: 0 } },
            { t: d.at, d: 0.9, ease: Easing.easeOutCubic, v: { y: d.y, s: 1, o: 1, rot: d.rot } },
            { t: 5.4, d: 0.9, v: { s: 0.78, y: d.y + 70, o: 0.38, blur: 2.2 } },
            { t: 7.6, d: 0.6, v: { o: 0 } },
          ]);
        if (inP <= 0.002) return null;
        return (
          <Obj key={d.name} x={k.x} y={k.y} w={220} h={290} s={k.s} o={k.o} blur={k.blur} z={d.key ? 4 : 2} style={{ transform: `perspective(2400px) rotate(${k.rot}deg) scale(${k.s})` }}>
            <Paper d={d} hot={d.key ? focus : 0} />
          </Obj>
        );
      })}

      <Obj x={od.x} y={od.y} w={520} h={640} s={od.s} o={od.o} z={5} style={{ transform: `perspective(2400px) rotate(${od.rot}deg) scale(${od.s})` }}><OpenDoc tl={tl} /></Obj>

      <Overlay z={6}>
        <Wire pts={sWire(anchor[0], anchor[1], qcLeft[0], qcLeft[1])} p={link} accent={C.mint} w={1.2} />
      </Overlay>

      <Obj x={qc.x} y={qc.y} w={460} h={190} s={qc.s} o={qc.o} z={7} style={{ transform: `perspective(2400px) rotate(${qc.rot}deg) scale(${qc.s})` }}>
        <div style={mono(11, C.mint, { position: 'absolute', left: 0, top: -30, opacity: passageLabel })}>Passage retenu</div>
        <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 10, padding: '22px 26px 22px 30px', boxSizing: 'border-box', fontFamily: F.body, color: '#1e1b17' }, MAT.paper(), { borderLeft: `4px solid ${C.mint}` })}>
          <div style={{ position: 'absolute', left: 18, top: 8, fontFamily: F.serif, fontSize: 52, color: 'rgba(110,240,200,.7)', lineHeight: 1 }}>“</div>
          <div style={{ fontSize: 18.5, lineHeight: 1.5, fontStyle: 'italic', paddingLeft: 26 }}>Toute demande urgente doit être qualifiée avant d’être transmise à l’équipe disponible.</div>
          <div style={mono(9, '#8a8377', { marginTop: 14, paddingLeft: 26, textTransform: 'none', letterSpacing: '.06em' })}>Procédure SAV 2026 · §4.2</div>
        </div>
      </Obj>

      <Obj x={an.x} y={an.y} w={560} h={520} s={an.s} o={an.o} z={7}>
        <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 22, padding: '30px 34px', boxSizing: 'border-box' }, MAT.dark(C.mint))}>
          <div style={mono(11, C.mint)}>Procédure à suivre</div>
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {steps.map((s, i) => {
              const p = E(tl, 12.5 + i * 0.3, 0.5);
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: 18, opacity: p, transform: `translateX(${(1 - p) * 14}px)` }}>
                  <span style={{ fontFamily: F.sora, fontSize: 26, fontWeight: 600, color: C.mint, width: 44 }}>{'0' + (i + 1)}</span>
                  <span style={{ fontFamily: F.sora, fontSize: 21, fontWeight: 500, color: C.ink }}>{s}</span>
                </div>
              );
            })}
          </div>
          <div style={{ position: 'absolute', left: 34, right: 34, bottom: 28, paddingTop: 18, borderTop: '1px solid rgba(110,240,200,.25)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', opacity: E(tl, 13.8, 0.5) }}>
            <div>
              <div style={mono(9, C.faint)}>Source</div>
              <div style={{ fontSize: 14, color: C.ink, marginTop: 5 }}>Procédure SAV 2026 · §4</div>
            </div>
            <Done p={E(tl, 14.2, 0.5)} label="Source vérifiable" size={11} />
          </div>
        </div>
      </Obj>

      <RowArrows p={fin} gaps={[[505, 590], [890, 1035], [1325, 1445]]} y={620} accent={C.mint} />
      <SlotLabels p={fin} items={[[300, 'Question'], [740, 'Document'], [1180, 'Passage'], [1620, 'Réponse']]} y={826} />
      <FinalTitle tl={tl} at={15.6} until={17.1} accent={C.mint} title="Mémoire d’entreprise" lines={['Retrouvez la bonne information', 'et voyez exactement d’où elle vient.']} />
    </div>
  );
}

/* ── 04 · Site web connecté ─────────────────────────────────────────── */
const BR = { w: 1450, h: 780 };

function typed(text, tl, s, d) { const p = clamp((tl - s) / d, 0, 1); return text.slice(0, Math.round(p * text.length)); }

function Site({ tl }) {
  const hero = 1 - E(tl, 4.0, 0.6);
  const book = E(tl, 4.4, 0.7);
  const s1 = IO(tl, 4.4, 7.7, 0.7, 0.35), s2 = IO(tl, 7.9, 10.1, 0.6, 0.35), s3 = E(tl, 10.3, 0.7);
  const hov = E(tl, 3.4, 0.25), press = clickP(tl, 3.8);
  const step = tl < 7.8 ? 0 : tl < 10.2 ? 1 : 2;
  const sel = E(tl, 8.9, 0.25);
  const ink = '#141414', mute = '#5a554d', bg = '#f6f3ee';
  const navL = ['Services', 'Réalisations', 'À propos', 'Contact'];
  const field = (label, value, caret) => (
    <div style={{ marginBottom: 22 }}>
      <div style={mono(10, '#8a8377', { letterSpacing: '.18em' })}>{label}</div>
      <div style={{ marginTop: 8, height: 54, borderBottom: `1.5px solid ${value ? ink : '#cfc9bd'}`, display: 'flex', alignItems: 'center', fontSize: 20, color: ink, fontFamily: F.serif }}>{value}{caret && <span style={{ width: 1.5, height: 26, background: ink, marginLeft: 3, opacity: Math.floor(tl * 2.4) % 2 ? 1 : 0 }}></span>}</div>
    </div>
  );
  const btn = (label, hv, pr, active, extra) => (
    <div style={Object.assign({ position: 'relative', height: 56, padding: '0 30px', borderRadius: 999, background: ink, color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 14, fontFamily: F.mono, fontSize: 12.5, letterSpacing: '.16em', textTransform: 'uppercase', boxShadow: `0 ${10 + hv * 12}px ${24 + hv * 14}px -14px rgba(20,20,20,${0.4 + hv * 0.4})`, transform: `translateY(${-hv * 3}px) scale(${1 - pr * 0.04})`, whiteSpace: 'nowrap' }, extra || {})}>
      {label}<span style={{ display: 'inline-block', transform: `translateX(${hv * 5}px)` }}>→</span>
      {active > 0.001 && active < 0.999 && <span style={{ position: 'absolute', inset: -3, borderRadius: 999, border: '2px solid rgba(20,20,20,.5)', transform: `scale(${1 + active * 0.2})`, opacity: 1 - active }}></span>}
    </div>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, background: bg, fontFamily: F.body, color: ink, overflow: 'hidden' }}>
      <div style={{ height: 76, display: 'flex', alignItems: 'center', padding: '0 72px', borderBottom: '1px solid #e6e0d5' }}>
        <div style={{ fontFamily: F.serif, fontSize: 24, letterSpacing: '.06em' }}>ATELIER NORDA</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 34 }}>{navL.map((n) => <span key={n} style={mono(11.5, '#3a3631', { letterSpacing: '.12em' })}>{n}</span>)}</div>
        <span style={mono(11, ink, { marginLeft: 44, padding: '10px 18px', borderRadius: 999, border: `1px solid ${ink}` })}>Contact</span>
      </div>

      {/* hero */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 76, bottom: 0, opacity: hero, transform: `translateX(${(1 - hero) * -40}px)`, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: 72, top: 70, width: 640 }}>
          <div style={mono(11, '#8a7f70', { letterSpacing: '.22em' })}>Studio de création · Lyon</div>
          <div style={{ fontFamily: F.serif, fontSize: 68, lineHeight: 1.02, marginTop: 26, letterSpacing: '-.005em' }}>VOTRE PROJET,<br />SANS PERDRE DE TEMPS.</div>
          <div style={{ fontSize: 19, lineHeight: 1.55, color: mute, marginTop: 28, maxWidth: 470 }}>Expliquez-nous votre besoin. Nous revenons rapidement vers vous.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 38 }}>
            {btn('Prendre rendez-vous', hov, press, ringP(tl, 3.8))}
            <span style={mono(12.5, ink, { height: 54, padding: '0 28px', borderRadius: 999, border: `1.5px solid ${ink}`, display: 'inline-flex', alignItems: 'center', letterSpacing: '.16em' })}>Demander un devis</span>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 72, top: 54, width: 560, height: 500, borderRadius: 26, overflow: 'hidden', background: 'linear-gradient(160deg,#e9e1d4 0%,#cbbda9 100%)', boxShadow: '0 40px 70px -40px rgba(40,30,20,.6)' }}>
          <div style={{ position: 'absolute', left: 150, bottom: 0, width: 260, height: 360, borderRadius: '130px 130px 0 0', background: 'linear-gradient(180deg,#c9673f,#a9502d)' }}></div>
          <div style={{ position: 'absolute', left: 74, top: 74, width: 140, height: 140, borderRadius: '50%', background: '#2f4a3f' }}></div>
          <div style={{ position: 'absolute', right: 60, top: 150, width: 120, height: 220, background: '#f1eadf', boxShadow: '0 20px 40px -20px rgba(0,0,0,.4)' }}></div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 118, height: 1.5, background: 'rgba(20,20,20,.35)' }}></div>
          <div style={mono(9.5, '#3a3631', { position: 'absolute', left: 24, bottom: 20, letterSpacing: '.18em' })}>Réalisation — Maison B., 2026</div>
        </div>
        <div style={{ position: 'absolute', left: 72, right: 72, bottom: 34, display: 'flex', alignItems: 'center', gap: 40, paddingTop: 22, borderTop: '1px solid #e6e0d5' }}>
          {['Identité visuelle', 'Sites web', 'Supports print'].map((s) => <span key={s} style={mono(11, '#3a3631', { letterSpacing: '.16em' })}>{s}</span>)}
          <span style={{ marginLeft: 'auto', fontSize: 14, color: mute }}>★ 4,9 — 120 projets accompagnés</span>
        </div>
      </div>

      {/* booking */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 76, bottom: 0, opacity: book, transform: `translateY(${(1 - book) * 30}px)`, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: 72, top: 60, width: 400 }}>
          <div style={{ fontFamily: F.serif, fontSize: 44, lineHeight: 1.05 }}>Prendre<br />rendez-vous</div>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 22 }}>
            {['Votre besoin', 'Créneau', 'Confirmation'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: step === i ? 1 : 0.4 }}>
                <span style={{ fontFamily: F.serif, fontSize: 22, width: 36 }}>{'0' + (i + 1)}</span>
                <span style={mono(12, ink, { letterSpacing: '.18em' })}>{s}</span>
                {step > i && <span style={{ color: '#0b7a55', fontWeight: 700 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', left: 532, top: 56, width: 760, height: 560, borderRadius: 22, background: '#fff', boxShadow: '0 40px 80px -40px rgba(40,30,20,.35), 0 1px 0 #e6e0d5', padding: 40, boxSizing: 'border-box' }}>
          <div style={{ position: 'absolute', inset: 40, opacity: s1, transform: `translateX(${(1 - s1) * 16}px)` }}>
            <div style={mono(11, ink, { letterSpacing: '.22em', marginBottom: 28 })}>01 — Votre besoin</div>
            {field('Nom', typed('Claire Martin', tl, 5.0, 0.7), tl > 4.9 && tl < 5.8)}
            {field('Votre besoin', typed('Création d’un site web', tl, 5.9, 0.9), tl > 5.8 && tl < 6.9)}
            <div style={{ marginTop: 10 }}>{btn('Continuer', E(tl, 7.3, 0.2), clickP(tl, 7.5), ringP(tl, 7.5))}</div>
          </div>
          <div style={{ position: 'absolute', inset: 40, opacity: s2, transform: `translateX(${(1 - s2) * 16}px)` }}>
            <div style={mono(11, ink, { letterSpacing: '.22em', marginBottom: 24 })}>02 — Choisissez un créneau</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
              {[['Mercredi', 10, ['09:30', '11:00']], ['Jeudi', 11, ['14:00', '16:00']], ['Vendredi', 12, ['10:00']]].map(([d, n, slots], ci) => (
                <div key={d}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingBottom: 12, borderBottom: '1px solid #e6e0d5', marginBottom: 14 }}>
                    <span style={{ fontFamily: F.serif, fontSize: 22 }}>{n}</span><span style={mono(10, '#8a8377')}>{d}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {slots.map((sl) => {
                      const on = ci === 1 && sl === '14:00' ? sel : 0;
                      return <div key={sl} style={{ position: 'relative', height: 48, borderRadius: 10, border: `1.5px solid ${on > 0.5 ? ink : '#d8d2c6'}`, background: on > 0.5 ? ink : '#fff', color: on > 0.5 ? '#fff' : ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.serif, fontSize: 18, transform: `scale(${1 - clickP(tl, 8.9) * (ci === 1 && sl === '14:00' ? 0.04 : 0)})` }}>{sl}</div>;
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 34 }}>{btn('Confirmer le rendez-vous', E(tl, 9.7, 0.2), clickP(tl, 9.9), ringP(tl, 9.9), { opacity: 0.5 + sel * 0.5 })}</div>
          </div>
          <div style={{ position: 'absolute', inset: 40, opacity: s3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: 84, height: 84, borderRadius: '50%', background: ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34, transform: `scale(${0.6 + 0.4 * MOTION.pop(10.3, 0.6)(tl)})` }}>✓</div>
            <div style={{ fontFamily: F.serif, fontSize: 40, marginTop: 26 }}>Rendez-vous confirmé</div>
            <div style={{ fontSize: 18, color: mute, marginTop: 12 }}>Jeudi 11 juin · 14:00 — Claire Martin</div>
            <div style={mono(10.5, '#8a8377', { marginTop: 22, letterSpacing: '.16em' })}>Un e-mail de confirmation vient de vous être envoyé</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ tl, k, tone, name, line, done, doneAt, glyph }) {
  return (
    <Obj x={k.x} y={k.y} w={420} h={150} s={k.s} o={k.o} z={7} shadow={0.6}>
      <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 20, padding: '20px 24px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 18 }, MAT.glass(tone))}>
        <div style={{ width: 52, height: 52, borderRadius: 16, flex: 'none', background: `linear-gradient(150deg, ${tone}, ${tone}88)`, boxShadow: `0 12px 24px -10px ${tone}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{glyph}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={mono(10.5, tone)}>{name}</div>
          <div style={{ fontFamily: F.sora, fontSize: 17, fontWeight: 600, color: C.ink, marginTop: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{line}</div>
          <div style={{ marginTop: 8 }}><Done p={E(tl, doneAt, 0.5)} label={done} size={11} /></div>
        </div>
      </div>
    </Obj>
  );
}

function SceneWeb({ tl, showLabel }) {
  const br = track(tl, [
    { t: -9, v: { x: 235, y: 190, s: 0.82, o: 0, rx: 5 } },
    { t: 0.2, d: 1.0, ease: Easing.easeOutCubic, v: { y: 150, s: 1, o: 1, rx: 0 } },
    { t: 11.6, d: 0.8, v: { x: -20, y: 170, s: 0.72, o: 0.85 } },
    { t: 16.7, d: 0.9, v: { x: 35, y: 250, s: 0.66, o: 1 } },
    { t: 18.8, d: 0.6, v: { o: 0, s: 0.55 } },
  ]);
  const cur = track(tl, [
    { t: -9, v: { x: 1500, y: 950, o: 0 } },
    { t: 2.6, d: 0.8, v: { x: 430, y: 640, o: 1 } },
    { t: 4.6, d: 0.6, v: { x: 900, y: 478 } },
    { t: 6.9, d: 0.5, v: { x: 895, y: 636 } },
    { t: 8.2, d: 0.5, v: { x: 1157, y: 498 } },
    { t: 9.2, d: 0.5, v: { x: 907, y: 660 } },
    { t: 10.3, d: 0.5, v: { o: 0, y: 720 } },
  ]);
  const pk = track(tl, [
    { t: -9, v: { x: 640, y: 528, s: 0.7, o: 0 } },
    { t: 11.9, d: 0.6, ease: Easing.easeOutCubic, v: { x: 1000, y: 528, s: 1, o: 1 } },
    { t: 12.4, d: 0.5, v: { x: 1340, y: 300 } },
    { t: 12.8, d: 0.3, v: { o: 0, s: 0.6 } },
  ]);
  const mk = (y0, y1, at) => track(tl, [
    { t: -9, v: { x: 1330, y: y0 + 30, s: 0.92, o: 0 } },
    { t: at, d: 0.6, ease: Easing.easeOutCubic, v: { y: y0, s: 1, o: 1 } },
    { t: 16.7, d: 0.9, v: { y: y1 } },
    { t: 18.4 + (y1 - 400) / 1900, d: 0.4, v: { o: 0, s: 0.8 } },
  ]);
  const t1 = mk(250, 400, 12.7), t2 = mk(440, 590, 14.1), t3 = mk(630, 780, 15.5);
  const brRight = br.x + BR.w / 2 + (BR.w / 2) * br.s - 6, brMid = br.y + BR.h / 2;
  const wireO = (1 - Lv(tl, 18.6, 0.4));
  const wires = [[t1, MOTION.draw(12.3, 12.8)(tl)], [t2, MOTION.draw(13.7, 14.2)(tl)], [t3, MOTION.draw(15.1, 15.6)(tl)]];
  const tones = [C.blue, C.cyan, C.violet];
  const chk = IO(tl, 17.9, 18.9, 0.5, 0.4);
  const press = Math.max(clickP(tl, 3.8), clickP(tl, 7.5), clickP(tl, 8.9), clickP(tl, 9.9));
  const ring = [3.8, 7.5, 8.9, 9.9].reduce((m, t) => { const r = ringP(tl, t); return r > 0 && r < 1 ? r : m; }, 0);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <ChapterLabel tl={tl} n="04" title="Site web connecté" accent={C.blue} until={19.1} show={showLabel} />
      <Overlay>
        {wires.map(([k, p], i) => <Wire key={i} pts={sWire(brRight, brMid, k.x + 210 - 210 * k.s, k.y + 75)} p={p * (k.o > 0.02 ? 1 : 1)} accent={tones[i]} o={wireO * clamp(k.o, 0, 1)} />)}
      </Overlay>
      <Obj x={br.x} y={br.y} w={BR.w} h={BR.h} s={br.s} rx={br.rx} o={br.o} z={3}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden', background: '#0c0f1e', boxShadow: '0 70px 120px -50px rgba(0,0,0,.98), 0 0 0 1px rgba(160,180,230,.18), 0 3px 0 #1a2040, 0 6px 0 #10142c, inset 0 1px 0 rgba(255,255,255,.2)' }}>
          <div style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 18px', gap: 8, background: 'linear-gradient(180deg,#232a48,#171c34)', borderBottom: '1px solid rgba(160,180,230,.12)' }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }}></span>)}
            <div style={{ marginLeft: 18, height: 32, padding: '0 16px', borderRadius: 9, background: '#0c0f1e', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: '#c9d3f5' }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: '#c9673f' }}></span>Atelier Norda — Studio de création
            </div>
            <div style={{ marginLeft: 26, flex: 1, height: 30, borderRadius: 8, background: 'rgba(12,15,30,.7)', border: '1px solid rgba(160,180,230,.12)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid #6ef0c8' }}></span>
              <span style={mono(11, '#a9b6dc', { textTransform: 'none', letterSpacing: '.03em' })}>ateliernorda.fr</span>
            </div>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 48, bottom: 0 }}><Site tl={tl} /></div>
        </div>
      </Obj>
      <Cursor x={cur.x} y={cur.y} o={cur.o} press={press} ring={ring} />

      <Obj x={pk.x} y={pk.y} w={240} h={64} s={pk.s} o={pk.o} z={8} shadow={0.5}>
        <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 14, padding: '10px 16px', boxSizing: 'border-box' }, MAT.glass(C.blue))}>
          <div style={mono(8.5, C.blue)}>Rendez-vous confirmé</div>
          <div style={{ fontFamily: F.sora, fontSize: 14, fontWeight: 600, color: C.ink, marginTop: 4 }}>Claire Martin · Jeudi 14:00</div>
        </div>
      </Obj>

      <Tile tl={tl} k={t1} tone={C.blue} name="CRM" line="Claire Martin — Nouveau lead" done="Lead créé" doneAt={13.3} glyph={<span style={{ width: 22, height: 22, borderRadius: '50%', border: '3px solid #06122e' }}></span>} />
      <Tile tl={tl} k={t2} tone={C.cyan} name="Agenda" line="Jeudi · 14:00" done="RDV ajouté" doneAt={14.7} glyph={<span style={{ width: 22, height: 20, borderRadius: 4, border: '3px solid #06122e', borderTopWidth: 6 }}></span>} />
      <Tile tl={tl} k={t3} tone={C.violet} name="Email" line="Objet : Votre rendez-vous est confirmé" done="Email envoyé" doneAt={16.1} glyph={<span style={{ width: 24, height: 16, borderRadius: 3, background: '#160d3a' }}></span>} />

      <div style={{ position: 'absolute', left: 0, right: 0, top: 1000, display: 'flex', justifyContent: 'center', gap: 26, opacity: chk, zIndex: 30 }}>
        {['CRM ✓', 'Agenda ✓', 'Email ✓'].map((s) => <span key={s} style={mono(11.5, C.mint)}>{s}</span>)}
      </div>
      <FinalTitle tl={tl} at={17.1} until={18.9} accent={C.blue} title="Site web connecté" lines={['Un visiteur entre.', 'Votre système prend le relais.']} pipeline={['Visiteur', 'Site', 'Conversion', 'Outils']} />
    </div>
  );
}

/* ── 05 · Application métier ────────────────────────────────────────── */
const WORK = [
  { tag: 'XLSX', tone: '#3fcf8e', name: 'Clients_2026.xlsx', sub: 'Tableur', x: 260, y: 300, rot: -4, at: 0.4, to: 0 },
  { tag: 'EMAIL', tone: '#4a8dff', name: 'Demande Claire Martin', sub: 'Boîte mail', x: 1300, y: 250, rot: 3, at: 1.0, to: 0 },
  { tag: 'AGENDA', tone: '#3ad8ff', name: 'Jeudi 14:00', sub: 'Calendrier', x: 520, y: 690, rot: 2, at: 1.6, to: 1 },
  { tag: 'PDF', tone: '#ff7a6b', name: 'Devis_2048.pdf', sub: 'Dossier partagé', x: 1400, y: 640, rot: -3, at: 2.2, to: 2 },
  { tag: 'NOTE', tone: '#f0b35e', name: 'À rappeler', sub: 'Post-it', x: 900, y: 820, rot: 5, at: 2.8, to: 3 },
];
const BIZ = [
  { label: 'Client', value: 'Claire Martin', at: 6.0, tx: 400, ty: 232 },
  { label: 'Rendez-vous', value: 'Jeudi · 14:00', at: 6.6, tx: 362, ty: 363 },
  { label: 'Devis', value: '#2048', at: 7.2, tx: 672, ty: 363 },
  { label: 'Tâche', value: 'Préparer proposition', at: 7.8, tx: 400, ty: 485 },
];
const APP = { w: 1600, h: 780 };

function AppShell({ tl }) {
  const shell = E(tl, 8.8, 0.8);
  const side = ['Vue d’ensemble', 'Clients', 'Interventions', 'Planning', 'Documents'];
  const top = E(tl, 10.5, 0.5);
  const page = E(tl, 10.0, 0.5);
  const cock = E(tl, 14.2, 0.7);
  const activeIdx = cock > 0.5 ? 0 : 1;
  const card = (label, value, sub, at, tone) => {
    const p = E(tl, at, 0.5);
    return (
      <div style={{ width: 280, height: 120, borderRadius: 16, background: '#141a33', border: '1px solid rgba(140,175,255,.1)', padding: '18px 20px', boxSizing: 'border-box', opacity: p, transform: `translateY(${(1 - p) * 8}px)` }}>
        <div style={mono(9.5, tone || C.faint)}>{label}</div>
        <div style={{ fontFamily: F.sora, fontSize: 20, fontWeight: 600, color: C.ink, marginTop: 10 }}>{value}</div>
        <div style={{ fontSize: 12.5, color: C.dim, marginTop: 4 }}>{sub}</div>
      </div>
    );
  };
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden', display: 'flex', fontFamily: F.body, background: '#0d1226', boxShadow: `0 80px 140px -60px rgba(0,0,0,.98), 0 0 120px -50px ${C.indigo}66, 0 3px 0 #0a0e22, 0 6px 0 #070a1a, inset 0 1px 0 rgba(255,255,255,.1)`, border: `1px solid rgba(107,108,246,${0.15 + shell * 0.25})` }}>
      <div style={{ width: 230, background: '#090c1c', borderRight: '1px solid rgba(140,175,255,.08)', padding: '26px 18px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 30, opacity: E(tl, 9.5, 0.5) }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(140deg, ${C.indigo}, ${C.cyan})`, boxShadow: `0 10px 20px -10px ${C.indigo}` }}></span>
          <span style={{ fontFamily: F.sora, fontWeight: 600, fontSize: 16, color: C.ink }}>Mon Atelier</span>
        </div>
        {side.map((it, i) => {
          const p = E(tl, 9.6 + i * 0.2, 0.45);
          const on = i === activeIdx;
          return <div key={it} style={{ padding: '11px 14px', borderRadius: 10, fontSize: 14, fontWeight: on ? 600 : 500, color: on ? '#fff' : '#8b99c2', background: on ? `linear-gradient(140deg, ${C.indigo}, #5658d8)` : 'transparent', marginBottom: 6, opacity: p, transform: `translateX(${(1 - p) * -12}px)`, boxShadow: on ? `0 10px 20px -12px ${C.indigo}` : 'none' }}>{it}</div>;
        })}
        <div style={{ marginTop: 'auto', padding: '14px', borderRadius: 12, background: '#0d1226', border: '1px solid rgba(140,175,255,.08)', opacity: E(tl, 10.6, 0.5) }}>
          <div style={mono(9, C.faint)}>Aujourd’hui</div>
          <div style={{ fontSize: 13, color: C.ink, marginTop: 6 }}>Jeudi 11 juin</div>
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', padding: '0 32px', gap: 18, borderBottom: '1px solid rgba(140,175,255,.08)', background: '#0e1428', opacity: top, transform: `translateY(${(1 - top) * -10}px)` }}>
          <span style={{ fontSize: 13.5, color: '#8b99c2' }}>{cock > 0.5 ? 'Vue d’ensemble' : 'Clients'}</span><span style={{ color: '#3a4570' }}>/</span><span style={{ fontSize: 13.5, color: C.ink, fontWeight: 600 }}>{cock > 0.5 ? 'Jeudi 11 juin' : 'Claire Martin'}</span>
          <div style={{ marginLeft: 'auto', width: 300, height: 34, borderRadius: 9, background: '#0a0e20', border: '1px solid rgba(140,175,255,.1)', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 12.5, color: '#5c6a94' }}>Rechercher un client, un devis…</div>
          <span style={{ width: 34, height: 34, borderRadius: 10, background: '#141a33', position: 'relative' }}><span style={{ position: 'absolute', right: 7, top: 7, width: 7, height: 7, borderRadius: '50%', background: C.mint }}></span></span>
          <span style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(140deg, ${C.indigo}, ${C.violet})` }}></span>
        </div>

        {/* customer page */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 64, bottom: 0, padding: 32, opacity: page * (1 - cock), pointerEvents: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 62, height: 62, borderRadius: 18, background: 'linear-gradient(140deg,#6b8dff,#3ad8ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.sora, fontWeight: 700, color: '#061131', fontSize: 20 }}>CM</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={sora(30, { textTransform: 'uppercase' })}>Claire Martin</span>
                <span style={mono(10, '#c9c3ff', { padding: '5px 10px', borderRadius: 999, background: 'rgba(107,108,246,.18)', border: '1px solid rgba(107,108,246,.4)' })}>Nouveau prospect</span>
              </div>
              <div style={{ display: 'flex', gap: 22, marginTop: 8, fontSize: 14, color: C.dim, opacity: E(tl, 11.4, 0.5) }}>
                <span style={mono(12.5, '#bcd0ff', { letterSpacing: '.05em' })}>06 12 34 56 78</span><span>claire@…</span>
              </div>
            </div>
            <span style={Object.assign(mono(10.5, C.mint, { padding: '8px 14px', borderRadius: 999, border: '1px solid rgba(110,240,200,.45)', background: 'rgba(110,240,200,.1)' }), { marginLeft: 'auto', opacity: E(tl, 11.7, 0.5) })}>RDV confirmé</span>
          </div>
          <div style={{ display: 'flex', gap: 30, marginTop: 40 }}>
            {card('Prochain rendez-vous', 'Jeudi · 14:00', 'Demande de devis', 10.2, C.cyan)}
            {card('Devis', '#2048', 'À valider', 10.35, C.violet)}
            {card('Document', 'Brief.pdf', 'Reçu aujourd’hui', 11.9, C.faint)}
          </div>
          <div style={{ width: 900, marginTop: 30, height: 64, borderRadius: 16, background: '#141a33', border: '1px solid rgba(140,175,255,.1)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', boxSizing: 'border-box', opacity: E(tl, 10.5, 0.5) }}>
            <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${C.indigo}` }}></span>
            <span style={mono(9.5, C.faint)}>Tâche</span>
            <span style={{ fontSize: 15, color: C.ink, fontWeight: 600 }}>Préparer proposition</span>
            <span style={{ marginLeft: 'auto', fontSize: 12.5, color: C.dim }}>avant jeudi</span>
          </div>
          <div style={{ position: 'absolute', right: 32, top: 32 + 100, width: 330 }}>
            <div style={mono(9.5, C.faint, { marginBottom: 16, opacity: E(tl, 12.0, 0.4) })}>Historique</div>
            {[['10:42', 'Appel reçu', 12.2], ['10:44', 'Fiche créée', 12.5], ['10:45', 'RDV confirmé', 12.8]].map(([t, l, at], i) => {
              const p = E(tl, at, 0.45);
              return (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderTop: i ? '1px solid rgba(140,175,255,.08)' : 'none', opacity: p, transform: `translateX(${(1 - p) * 10}px)` }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: i === 2 ? C.mint : C.indigo, boxShadow: `0 0 8px ${i === 2 ? C.mint : C.indigo}` }}></span>
                  <span style={mono(11, '#8b99c2', { letterSpacing: '.05em' })}>{t}</span>
                  <span style={{ fontSize: 14.5, color: C.ink }}>{l}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* cockpit */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 64, bottom: 0, padding: 32, opacity: cock, display: 'grid', gridTemplateColumns: '1fr 380px 380px', gap: 30, pointerEvents: 'none' }}>
          <div>
            <div style={mono(10, C.faint)}>Aujourd’hui</div>
            <div style={sora(32, { marginTop: 8 })}>Ce qui demande votre attention</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
              {[['3', 'rendez-vous', C.cyan, 14.8], ['2', 'devis à valider', C.violet, 15.0], ['1', 'client à rappeler', C.mint, 15.2]].map(([n, l, tone, at]) => {
                const p = E(tl, at, 0.5);
                return (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 22px', borderRadius: 16, background: '#141a33', border: '1px solid rgba(140,175,255,.1)', opacity: p, transform: `translateY(${(1 - p) * 8}px)` }}>
                    <span style={{ fontFamily: F.sora, fontSize: 40, fontWeight: 600, color: tone, width: 56 }}>{n}</span>
                    <span style={{ fontSize: 19, color: C.ink, fontWeight: 500 }}>{l}</span>
                    <span style={{ marginLeft: 'auto', color: tone, fontSize: 18 }}>→</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div style={mono(10, C.faint)}>Planning</div>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column' }}>
              {[['09:00', 'Installation', 15.4], ['11:30', 'SAV', 15.6], ['14:00', 'Claire Martin', 15.8], ['16:30', 'Visio', 16.0]].map(([t, l, at], i) => {
                const p = E(tl, at, 0.45), hot = i === 2;
                return (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', borderRadius: 12, marginBottom: 6, background: hot ? 'rgba(58,216,255,.1)' : 'transparent', border: hot ? '1px solid rgba(58,216,255,.35)' : '1px solid transparent', opacity: p }}>
                    <span style={mono(12, hot ? C.cyan : '#8b99c2', { letterSpacing: '.05em' })}>{t}</span>
                    <span style={{ width: 3, height: 26, borderRadius: 2, background: hot ? C.cyan : '#2a3560' }}></span>
                    <span style={{ fontSize: 15.5, color: C.ink, fontWeight: hot ? 600 : 500 }}>{l}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div style={mono(10, C.faint)}>Activité récente</div>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column' }}>
              {[['Claire Martin', 'RDV confirmé', C.mint, 16.0], ['Devis #2048', 'À valider', C.violet, 16.3], ['Document reçu', 'Classé', C.faint, 16.6]].map(([a, b, tone, at], i) => {
                const p = E(tl, at, 0.45);
                return (
                  <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: i ? '1px solid rgba(140,175,255,.08)' : 'none', opacity: p }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: tone, boxShadow: `0 0 8px ${tone}` }}></span>
                    <span style={{ fontSize: 15, color: C.ink, fontWeight: 600 }}>{a}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 13, color: tone }}>{b}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneApp({ tl, showLabel }) {
  const txt = IO(tl, 3.4, 4.8, 0.7, 0.45);
  const app = track(tl, [
    { t: -9, v: { x: 160, y: 150, s: 1.02, o: 0 } },
    { t: 8.8, d: 0.8, v: { o: 1, s: 1 } },
    { t: 14.0, d: 0.8, v: { s: 0.94 } },
    { t: 17.6, d: 0.9, v: { y: 250, s: 0.58 } },
    { t: 19.4, d: 0.6, v: { o: 0, s: 0.5 } },
  ]);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <ChapterLabel tl={tl} n="05" title="Application métier" accent={C.indigo} until={19.9} show={showLabel} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center', opacity: txt, transform: `translateY(${(1 - txt) * 12}px)` }}>
        <div style={{ fontFamily: F.sora, fontSize: 42, fontWeight: 500, color: C.ink, letterSpacing: '-.015em' }}>Vos informations sont partout.</div>
      </div>

      {WORK.map((w, i) => {
        const b = BIZ[w.to];
        const k = track(tl, [
          { t: -9, v: { x: w.x, y: w.y + 40, s: 0.8, o: 0, rot: w.rot, cap: 0 } },
          { t: w.at, d: 0.8, ease: Easing.easeOutCubic, v: { y: w.y, s: 1, o: 1 } },
          { t: 4.9 + i * 0.08, d: 0.5, v: { cap: 1, rot: 0 } },
          { t: b.at - 0.7, d: 0.7, ease: Easing.easeInCubic, v: { x: 760 + 100 + (w.to === 0 && i === 1 ? 60 : 0), y: 300 + w.to * 110 + 20, s: 0.7 } },
          { t: b.at - 0.15, d: 0.15, v: { o: 0 } },
        ]);
        if (k.o <= 0.002) return null;
        return (
          <div key={w.name} style={{ position: 'absolute', left: k.x, top: k.y, width: 240, height: 84, opacity: clamp(k.o, 0, 1), transform: `perspective(2000px) rotate(${k.rot}deg) scale(${k.s})`, zIndex: 5 }}>
            <div style={Object.assign({ position: 'absolute', left: 0, top: 0, width: lerp(240, 170, k.cap), height: lerp(84, 44, k.cap), borderRadius: lerp(14, 22, k.cap), padding: k.cap > 0.5 ? '0 14px' : '14px 16px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 12 }, MAT.glass(w.tone))}>
              <span style={mono(8.5, '#06122e', { padding: '3px 6px', borderRadius: 5, background: w.tone, letterSpacing: '.1em', flex: 'none' })}>{w.tag}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: k.cap > 0.5 ? 12 : 14.5, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.name}</div>
                {k.cap < 0.5 && <div style={{ fontSize: 12, color: C.dim, marginTop: 3, opacity: 1 - k.cap * 2 }}>{w.sub}</div>}
              </div>
            </div>
          </div>
        );
      })}

      {BIZ.map((b, i) => {
        const k = track(tl, [
          { t: -9, v: { x: 760, y: 300 + i * 110, s: 0.9, o: 0 } },
          { t: b.at, d: 0.5, ease: Easing.easeOutBack, v: { s: 1, o: 1 } },
          { t: 9.4, d: 0.8, v: { x: b.tx, y: b.ty, s: 0.72 } },
          { t: 10.0, d: 0.4, v: { o: 0 } },
        ]);
        return (
          <Obj key={b.label} x={k.x} y={k.y} w={400} h={90} s={k.s} o={k.o} z={6} shadow={0.6}>
            <div style={Object.assign({ position: 'absolute', inset: 0, borderRadius: 18, padding: '16px 22px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 18 }, MAT.dark(C.indigo))}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: `linear-gradient(140deg, ${C.indigo}, ${C.cyan})`, boxShadow: `0 10px 20px -10px ${C.indigo}` }}></div>
              <div>
                <div style={mono(10, '#c9c3ff')}>{b.label}</div>
                <div style={{ fontFamily: F.sora, fontSize: 21, fontWeight: 600, color: C.ink, marginTop: 4 }}>{b.value}</div>
              </div>
            </div>
          </Obj>
        );
      })}

      <Obj x={app.x} y={app.y} w={APP.w} h={APP.h} s={app.s} o={app.o} z={3} shadow={0.9}><AppShell tl={tl} /></Obj>

      <FinalTitle tl={tl} at={17.9} until={19.7} accent={C.indigo} title="Application métier" lines={['Clients, tâches, rendez-vous', 'et documents réunis au même endroit.']} extra="Un logiciel construit autour de votre métier." extraTone={C.mint} />
    </div>
  );
}

/* ── 06 · Final ─────────────────────────────────────────────────────── */
function SceneFinal({ tl }) {
  const sil = [
    { x: 330, y: 300, label: 'Agent IA', at: 0.3, draw: (o) => <div style={{ width: 62, height: 122, borderRadius: 16, border: `1.5px solid rgba(58,216,255,${0.9 * o})`, boxShadow: `0 0 30px -8px rgba(58,216,255,${0.7 * o})`, position: 'relative' }}><div style={{ position: 'absolute', inset: 7, borderRadius: 10, border: `1px solid rgba(58,216,255,${0.35 * o})` }}></div></div> },
    { x: 640, y: 320, label: 'Automatisation', at: 0.8, draw: (o) => <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><div style={{ width: 72, height: 54, borderRadius: 9, border: `1.5px solid rgba(166,140,255,${0.9 * o})`, boxShadow: `0 0 30px -8px rgba(166,140,255,${0.7 * o})` }}></div><div style={{ width: 22, height: 1.5, background: `rgba(166,140,255,${0.8 * o})` }}></div><div style={{ width: 72, height: 54, borderRadius: 9, border: `1.5px solid rgba(166,140,255,${0.9 * o})`, boxShadow: `0 0 30px -8px rgba(166,140,255,${0.7 * o})` }}></div></div> },
    { x: 960, y: 300, label: 'Mémoire', at: 1.3, draw: (o) => <div style={{ position: 'relative', width: 90, height: 104 }}><div style={{ position: 'absolute', left: 16, top: 0, width: 66, height: 86, borderRadius: 6, border: `1.5px solid rgba(110,240,200,${0.45 * o})` }}></div><div style={{ position: 'absolute', left: 0, top: 16, width: 66, height: 86, borderRadius: 6, border: `1.5px solid rgba(110,240,200,${0.9 * o})`, background: '#05070f', boxShadow: `0 0 30px -8px rgba(110,240,200,${0.7 * o})` }}></div></div> },
    { x: 1280, y: 320, label: 'Site web', at: 1.8, draw: (o) => <div style={{ width: 128, height: 88, borderRadius: 10, border: `1.5px solid rgba(74,125,255,${0.9 * o})`, boxShadow: `0 0 30px -8px rgba(74,125,255,${0.7 * o})`, position: 'relative' }}><div style={{ position: 'absolute', left: 0, right: 0, top: 16, height: 1.5, background: `rgba(74,125,255,${0.6 * o})` }}></div></div> },
    { x: 1590, y: 310, label: 'Application', at: 2.3, draw: (o) => <div style={{ width: 134, height: 94, borderRadius: 10, border: `1.5px solid rgba(107,108,246,${0.9 * o})`, boxShadow: `0 0 30px -8px rgba(107,108,246,${0.7 * o})`, position: 'relative' }}><div style={{ position: 'absolute', left: 26, top: 0, bottom: 0, width: 1.5, background: `rgba(107,108,246,${0.6 * o})` }}></div></div> },
  ];
  const out = Lv(tl, 8.2, 0.6);
  const line = MOTION.draw(2.7, 3.6)(tl) * (1 - out);
  const brand = IO(tl, 3.0, 8.2, 0.6, 0.6), l1 = IO(tl, 3.4, 8.2, 0.8, 0.6), l2 = IO(tl, 3.7, 8.2, 0.8, 0.6), sec = IO(tl, 4.3, 8.2, 0.7, 0.6), cta = IO(tl, 4.8, 8.2, 0.6, 0.6), rea = IO(tl, 5.2, 8.2, 0.6, 0.6);
  const sigP = E(tl, 8.3, 0.5) * (1 - Lv(tl, 8.75, 0.25));
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Overlay>
        <Wire pts={[[330, 430], [640, 430], [1280, 430], [1590, 430]]} p={line} accent="rgba(140,180,255,.6)" w={1} />
        <Pulse pts={[[330, 430], [640, 430], [1280, 430], [1590, 430]]} tl={tl} start={3.6} end={8.2} period={3.2} accent={C.cyan} r={3} o={1 - out} />
      </Overlay>
      {sil.map((s) => {
        const p = IO(tl, s.at, 8.2, 0.7, 0.6);
        if (p <= 0.002) return null;
        return (
          <div key={s.label} style={{ position: 'absolute', left: s.x, top: s.y, transform: `translate(-50%, -50%) translateY(${(1 - E(tl, s.at, 0.7)) * 16}px)`, opacity: p, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            {s.draw(p)}
            <span style={mono(10, C.faint)}>{s.label}</span>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 486, textAlign: 'center' }}>
        <div style={Object.assign(mono(14, C.cyan, { letterSpacing: '.34em' }), { opacity: brand })}>Solutions 2IA</div>
        <div style={sora(68, { textTransform: 'uppercase', lineHeight: 1.1, marginTop: 24, opacity: l1, transform: `translateY(${(1 - l1) * 18}px)` })}>Un problème.</div>
        <div style={sora(68, { textTransform: 'uppercase', lineHeight: 1.1, opacity: l2, transform: `translateY(${(1 - l2) * 18}px)` })}>Un système pour le résoudre.</div>
        <div style={{ marginTop: 30, fontSize: 18, letterSpacing: '.06em', color: '#9fb0d4', opacity: sec }}>Site web · Application métier · Automatisation · Agent IA · Mémoire d’entreprise</div>
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', opacity: cta, transform: `translateY(${(1 - cta) * 10}px)` }}>
          <span style={mono(13, '#04122c', { padding: '20px 36px', borderRadius: 999, background: 'linear-gradient(140deg,#5a89ff,#38cfff)', fontWeight: 700, letterSpacing: '.16em', boxShadow: '0 26px 50px -20px rgba(70,150,255,.9), inset 0 1px 0 rgba(255,255,255,.5)' })}>Parler de mon besoin</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 13.5, color: C.faint, opacity: rea }}>Premier échange gratuit · sans engagement</div>
      </div>
      {sigP > 0.002 && <div style={{ position: 'absolute', left: 960 - 5, top: 470 - 5, width: 10, height: 10, borderRadius: '50%', background: '#dff6ff', boxShadow: '0 0 30px 8px rgba(58,216,255,.8)', opacity: sigP }}></div>}
    </div>
  );
}

Object.assign(window, { SceneMemory, SceneWeb, SceneApp, SceneFinal });
