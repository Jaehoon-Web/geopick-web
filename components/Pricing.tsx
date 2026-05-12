import { PRICING } from "@/lib/siteData";

export function Pricing() {
  return (
    <section className="section section--paper" id="pricing">
      <div className="container">
        <div className="sect-head" data-reveal>
          <span className="eyebrow">08 · Pricing</span>
          <h2 className="h-display">
            먼저 <span className="serif">무료 진단</span>부터.
          </h2>
          <p className="lead">
            정확한 견적은 업종·매장 수에 따라 달라집니다. 상담 시
            안내드립니다.
          </p>
        </div>

        <div className="pricing" data-reveal>
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={`price-card${p.feature ? " price-card--feature" : ""}`}
            >
              <span className="price-card__name">
                {p.name}
                {p.nameTag && (
                  <span className="price-card__rec">{p.nameTag}</span>
                )}
              </span>
              <div className="price-card__amount">
                {p.amountPrefix && (
                  <span className="currency">{p.amountPrefix}</span>
                )}
                {p.amount}
                <small>{p.sub}</small>
              </div>
              <p className="price-card__txt">{p.desc}</p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href="#form"
                className={`btn btn--${p.btnKind} btn--lg`}
              >
                {p.btnLabel} →
              </a>
            </div>
          ))}
        </div>

        <p className="pricing-note">
          * 가격은 업종·매장 수·키워드 수에 따라 달라집니다. 정확한 견적은
          무료 상담 후 안내드립니다.
        </p>
      </div>
    </section>
  );
}
