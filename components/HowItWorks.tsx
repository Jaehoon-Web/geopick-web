import { STEPS } from "@/lib/siteData";

export function HowItWorks() {
  return (
    <section className="section section--paper" id="how">
      <div className="container">
        <div className="sect-head" data-reveal>
          <span className="eyebrow">03 · How it works</span>
          <h2 className="h-display">
            이렇게 해결합니다 —
            <br />
            <span className="serif">5단계</span>로 끝.
          </h2>
          <p className="lead">
            측정 → 진단 → 처방 → 실행 → 추적. 매주 같은 사이클을 반복합니다.
          </p>
        </div>

        <div className="steps" data-reveal>
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <span className="step__num">{s.n}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__txt">{s.txt}</p>
            </div>
          ))}
        </div>

        <div className="steps-outcome" data-reveal>
          <p className="steps-outcome__txt">
            <b>
              노출 → 신뢰 → 방문 →{" "}
              <span className="accent">매출 극대화.</span>
            </b>
            <br />이 흐름 전체를 데이터로 확인하면서 키워나갑니다.
          </p>
          <a href="#form" className="btn btn--dark btn--lg">
            우리 가게부터 시작하기
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
