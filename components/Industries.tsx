import { INDUSTRIES } from "@/lib/siteData";

export function Industries() {
  return (
    <section className="section" id="industries">
      <div className="container">
        <div className="sect-head" data-reveal>
          <span className="eyebrow">07 · Industries</span>
          <h2 className="h-display">
            우리 업종에도 <span className="serif">되나요?</span>
          </h2>
          <p className="lead">
            국내 6개 업종에서 검증된 플레이북이 있습니다. 그 외 업종도
            환영합니다.
          </p>
        </div>

        <div className="industries" data-reveal>
          {INDUSTRIES.map((i) => (
            <a key={i.name} className="industry-card" href="#form">
              <span className="industry-card__name">{i.name}</span>
              <p className="industry-card__txt">{i.txt}</p>
              <span className="industry-card__cta">
                {i.ctaLabel || "자세히 알아보기"} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
