import { ChatMock } from "./ChatMock";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__aurora" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__inner">
        <div>
          <div className="eyebrow hero__eyebrow">
            <span className="dot" />
            <span>Generative Engine Optimization · 2026</span>
          </div>

          <h1 className="hero__title">
            요즘 손님은 <span className="serif">Naver</span>가 아니라
            <br />
            <span className="hl">ChatGPT</span>한테 물어봅니다.
          </h1>

          <p className="hero__sub">
            거기서 우리 가게가 안 뜨면, 그 손님은 영영 안 옵니다.
            <br />
            <strong style={{ color: "#F4EFE6", fontWeight: 500 }}>지오픽</strong>
            은 AI 검색 안에 브랜드를 정확히 위치시키는 일을 합니다.
          </p>

          <div className="hero__cta">
            <a href="#form" className="btn btn--primary btn--lg">
              내 가게 무료 진단 받기
              <span className="btn-arrow">→</span>
            </a>
            <a href="#how" className="btn btn--ghost btn--lg">
              작동 원리 보기
            </a>
          </div>

          <div className="hero__notes">
            <span>1분 소요</span>
            <span>비용 없음</span>
            <span>진단 결과 PDF 카톡 발송</span>
          </div>
        </div>

        <ChatMock />
      </div>

      <div className="hero__foot">
        <div className="hero__foot-item">
          <span className="k">tracked queries / week</span>
          <span className="v tabular">500+</span>
        </div>
        <div className="hero__foot-item">
          <span className="k">avg. visibility lift</span>
          <span className="v tabular">3.1×</span>
        </div>
        <div className="hero__foot-item">
          <span className="k">engines covered</span>
          <span className="v">GPT · Perplexity · Gemini · Naver</span>
        </div>
        <div className="hero__foot-item">
          <span className="k">법적 위반 사례</span>
          <span className="v tabular">0건</span>
        </div>
      </div>
    </section>
  );
}
