import { PAIN_POINTS, PAIN_STATS } from "@/lib/siteData";

export function Diagnosis() {
  return (
    <section className="section section--paper" id="diagnosis">
      <div className="container">
        <div className="sect-head" data-reveal>
          <span className="eyebrow">01 · Diagnosis</span>
          <h2 className="h-display">
            원장님, 사장님 —
            <br />
            요즘 이런 고민, <span className="serif">있으시죠?</span>
          </h2>
          <p className="lead">
            하나라도 해당된다면, 바뀌고 있는 검색 시장 때문일 수 있습니다.
          </p>
        </div>

        <div className="pain-grid">
          {PAIN_POINTS.map((p, i) => (
            <div
              key={p.n}
              className="pain-card"
              data-reveal
              style={{ ["--rdelay" as string]: `${i * 60}ms` }}
            >
              <span className="pain-card__num">{p.n}</span>
              <p className="pain-card__txt">
                {p.txt[0]}
                <br />
                {p.txt[1]}
              </p>
            </div>
          ))}
        </div>

        <div className="pain-stats" data-reveal>
          {PAIN_STATS.map((s) => (
            <div key={s.big} className="pain-stat">
              <div className="pain-stat__big">
                <span className="accent">{s.big}</span>
                <span className="unit">{s.unit}</span>
              </div>
              <p className="pain-stat__txt">
                {s.txt[0]}
                <br />
                {s.txt[1]}
              </p>
            </div>
          ))}
        </div>

        <p className="stat-source">
          * 출처: 지오픽 자체 조사 (2026년 1~3월, 20~40대 소비자 n=○○○).
          정식 라이브 시 표본·시점·조사 기관을 함께 표기합니다.
        </p>
      </div>
    </section>
  );
}
