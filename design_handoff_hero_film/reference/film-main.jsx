/* Solutions 2IA — fullscreen film: composition root (one tree, one clock). */

function Piece({ showGrid, showLabels }) {
  const { T, CUES } = useComposition();
  const order = ['Intro', 'AgentIA', 'Automatisation', 'Memoire', 'SiteWeb', 'Application', 'Final'];
  let idx = 0;
  for (let i = 0; i < order.length; i++) if (T >= CUES[order[i]] - 0.001) idx = i;
  const label = `${Math.floor(T)}s · ${order[idx]}`;
  return (
    <div data-screen-label={label} style={{ position: 'absolute', inset: 0, background: '#04050d', fontFamily: F.body, color: C.ink, overflow: 'hidden' }}>
      <Environment T={T} CUES={CUES} showGrid={showGrid} />
      <Shot from={0} to={CUES.AgentIA + 0.8}><SceneIntro tl={T - CUES.Intro} /></Shot>
      <Shot from={CUES.AgentIA - 0.01} to={CUES.Automatisation}><SceneAgent tl={T - CUES.AgentIA} showLabel={showLabels} /></Shot>
      <Shot from={CUES.Automatisation - 0.01} to={CUES.Memoire}><SceneAuto tl={T - CUES.Automatisation} showLabel={showLabels} /></Shot>
      <Shot from={CUES.Memoire - 0.01} to={CUES.SiteWeb}><SceneMemory tl={T - CUES.Memoire} showLabel={showLabels} /></Shot>
      <Shot from={CUES.SiteWeb - 0.01} to={CUES.Application}><SceneWeb tl={T - CUES.SiteWeb} showLabel={showLabels} /></Shot>
      <Shot from={CUES.Application - 0.01} to={CUES.Final}><SceneApp tl={T - CUES.Application} showLabel={showLabels} /></Shot>
      <Shot from={CUES.Final - 0.01} to={CUES.Final + 60}><SceneFinal tl={T - CUES.Final} /></Shot>
    </div>
  );
}

function FullscreenFilm() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || {});
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#04050d">
        <Piece showGrid={t.showGrid !== false} showLabels={t.showChapterLabels !== false} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Scène" />
        <TweakToggle label="Sol en perspective" value={t.showGrid !== false} onChange={(v) => setTweak('showGrid', v)} />
        <TweakToggle label="Étiquettes de chapitre" value={t.showChapterLabels !== false} onChange={(v) => setTweak('showChapterLabels', v)} />
        <TweakSection label="Édition" />
        <TweakToggle label="Motion editor" value={t.motionEditor !== false} onChange={(v) => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </div>
  );
}

window.FullscreenFilm = FullscreenFilm;
