import { CASES } from "@/lib/siteData";

export function Cases() {
  return (
    <section className="section" id="cases">
      <div className="container">
        <div className="sect-head" data-reveal>
          <span className="eyebrow">04 · Cases</span>
          <h2 className="h-display">
            진짜 되긴 해?
            <br />
            <span className="serif">숫자로</span> 보여드립니다.
          </h2>
          <p className="lead">
            실제 클라이언트의 AI 추천 노출률 변화. 데이터는 매주 자동 측정된
            결과입니다.
          </p>
        </div>

        <div className="case-list">
          {CASES.map((c) => (
            <article key={c.id} className="case-card" data-reveal>
              <div className="case-card__meta">
                <span className="case-card__industry">{c.industry}</span>
                <h3 className="case-card__name">{c.name}</h3>
                <p className="case-card__query">
                  <span className="q">{c.query}</span>
                  <br />
                  {c.queryNote}
                </p>
                <blockquote className="case-card__quote">
                  {c.quote}
                  <cite>{c.source}</cite>
                </blockquote>
              </div>
              <div className="case-card__delta">
                <span className="case-card__delta-label">{c.deltaLabel}</span>
                <div className="case-card__numbers tabular">
                  <span className="from">{c.from}</span>
                  <span className="arrow">→</span>
                  <span className="to">
                    {c.to}
                    {c.toUnit && <span className="unit">{c.toUnit}</span>}
                  </span>
                </div>
                <span className="case-card__period">{c.period}</span>
                <div className="case-card__bars">
                  <div className="case-bar">
                    <span className="case-bar__label">Before</span>
                    <div className="case-bar__track">
                      <div
                        className="case-bar__fill case-bar__fill--muted"
                        style={{ ["--w" as string]: `${c.barBefore.w}%` }}
                      />
                    </div>
                    <span className="case-bar__v tabular">
                      {c.barBefore.v}
                    </span>
                  </div>
                  <div className="case-bar">
                    <span className="case-bar__label">After</span>
                    <div className="case-bar__track">
                      <div
                        className="case-bar__fill"
                        style={{ ["--w" as string]: `${c.barAfter.w}%` }}
                      />
                    </div>
                    <span className="case-bar__v tabular">
                      {c.barAfter.v}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="pricing-note" style={{ marginTop: 32 }}>
          * 모든 수치는 placeholder입니다. 실제 사례 데이터는 클라이언트 동의
          후 공개됩니다.
        </p>
      </div>
    </section>
  );
}
