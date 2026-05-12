// tweaks-app.jsx — Tweaks panel mounted as a separate React island.
// Mutates classes/data attrs on <body> to reskin the static landing page.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "light",
  "accent": "orange",
  "pair": "editorial",
  "heroVisual": "chat",
  "headlineVariant": 0
}/*EDITMODE-END*/;

const HEADLINES = [
  {
    title: '요즘 손님은 <span class="serif">Naver</span>가 아니라<br/><span class="hl">ChatGPT</span>한테 물어봅니다.',
    sub: '거기서 우리 가게가 안 뜨면, 그 손님은 영영 안 옵니다.<br/>GEO는 AI 검색 안에 브랜드를 정확히 위치시키는 일을 합니다.'
  },
  {
    title: 'AI가 우리 가게를 <span class="hl">추천하지 않으면</span>,<br/>손님은 <span class="serif">옆 가게로</span> 갑니다.',
    sub: '검색 시장은 이미 바뀌고 있습니다. ChatGPT · Perplexity · Gemini에서 안 보이면 잃은 손님입니다.'
  },
  {
    title: '<span class="serif">Search is fading.</span><br/><span class="hl">AI 추천</span>이 그 자리를 차지합니다.',
    sub: '새로운 노출 게임에 맞춘 한국 1위 GEO 시스템. 매주 자동으로 측정하고, 매월 데이터로 키웁니다.'
  }
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // sync body classes/attrs to tweak state
  React.useEffect(() => {
    const b = document.body;
    b.classList.toggle('theme-dark', t.mode === 'dark');
    b.classList.toggle('theme-light', t.mode !== 'dark');
    ['orange', 'blue', 'green', 'violet'].forEach(c => b.classList.toggle(`accent-${c}`, t.accent === c));
    ['editorial', 'serif', 'soft'].forEach(p => b.classList.toggle(`pair-${p}`, t.pair === p));
    b.dataset.hero = t.heroVisual;
  }, [t.mode, t.accent, t.pair, t.heroVisual]);

  // swap hero copy
  React.useEffect(() => {
    const titleEl = document.getElementById('heroTitle');
    const subEl = document.getElementById('heroSub');
    if (!titleEl || !subEl) return;
    const v = HEADLINES[t.headlineVariant] || HEADLINES[0];
    titleEl.innerHTML = v.title;
    subEl.innerHTML = v.sub;
  }, [t.headlineVariant]);

  return (
    <TweaksPanel>
      <TweakSection label="Theme" />
      <TweakRadio
        label="Mode"
        value={t.mode}
        options={['light', 'dark']}
        onChange={(v) => setTweak('mode', v)}
      />
      <TweakColor
        label="Accent"
        value={t.accent === 'orange' ? '#D97757'
              : t.accent === 'blue' ? '#3B5BDB'
              : t.accent === 'green' ? '#1F8A5B'
              : '#7A5AE0'}
        options={['#D97757', '#3B5BDB', '#1F8A5B', '#7A5AE0']}
        onChange={(v) => {
          const map = { '#D97757': 'orange', '#3B5BDB': 'blue', '#1F8A5B': 'green', '#7A5AE0': 'violet' };
          setTweak('accent', map[v] || 'orange');
        }}
      />

      <TweakSection label="Typography" />
      <TweakRadio
        label="Display"
        value={t.pair}
        options={['editorial', 'serif', 'soft']}
        onChange={(v) => setTweak('pair', v)}
      />

      <TweakSection label="Hero" />
      <TweakSelect
        label="Headline copy"
        value={String(t.headlineVariant)}
        options={[
          { value: '0', label: '원안 — 네이버 vs ChatGPT' },
          { value: '1', label: '직설 — 옆 가게로 갑니다' },
          { value: '2', label: '선언 — Search is fading' }
        ]}
        onChange={(v) => setTweak('headlineVariant', Number(v))}
      />
      <TweakRadio
        label="Visual"
        value={t.heroVisual}
        options={['chat', 'type']}
        onChange={(v) => setTweak('heroVisual', v)}
      />
    </TweaksPanel>
  );
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<App />);
