export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="sect-head" data-reveal>
          <span className="eyebrow">02 · About</span>
          <h2 className="h-display">
            저희는 <span className="serif">AI 안에서</span>
            <br />
            브랜드가 사라지지 않게 하는 일을 합니다.
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <p>
              <strong>지오픽</strong>은 ‘AI가 답을 만드는 시대’에 가게가
              사라지지 않도록 브랜드를 AI 안에 보이게 만듭니다.
            </p>
            <p>
              강남 피부과부터 분당 한의원, 전국 프랜차이즈까지{" "}
              <strong>200여 곳</strong>의 노출을 매주 직접 측정하고 데이터로
              키워왔습니다.
            </p>
            <p
              style={{
                fontSize: 16,
                color: "var(--fg-muted)",
                marginTop: 32,
              }}
            >
              — GEO-Pick · Generative Engine Optimization. 검색이 아니라
              추천을 다룹니다.
            </p>
          </div>

          <div
            className="about-card"
            data-reveal
            style={{ ["--rdelay" as string]: "120ms" }}
          >
            <div className="about-card__label">
              GEO-Pick / Proprietary system
            </div>
            <h3>
              저희가 운영하는
              <br />
              전용 측정·최적화 시스템.
            </h3>
            <p>
              ChatGPT · Perplexity · Gemini · 네이버 AI까지 손님이 묻는{" "}
              <em>수백 가지 질문</em>에 우리 가게가 얼마나 추천되는지 매주
              자동으로 측정합니다.
            </p>
            <p>
              그 결과를 바탕으로 의료법·광고법을 어기지 않는 콘텐츠를 만들어,
              AI가 우리 가게를 더 자주 추천하도록 설계합니다.
            </p>
            <div className="about-card__stats">
              <div className="about-card__stat">
                <div className="v tabular">3.1×</div>
                <div className="k">
                  클라이언트 평균
                  <br />
                  노출 향상
                </div>
              </div>
              <div className="about-card__stat">
                <div className="v tabular">0건</div>
                <div className="k">
                  의료광고법 위반 적발
                  <br />
                  <span style={{ opacity: 0.7 }}>(2024–2026 누적)</span>
                </div>
              </div>
              <div className="about-card__stat">
                <div className="v tabular">500+</div>
                <div className="k">
                  매주 자동 측정
                  <br />
                  쿼리 수
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
