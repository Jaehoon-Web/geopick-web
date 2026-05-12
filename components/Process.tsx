import { TIMELINE } from "@/lib/siteData";

export function Process() {
  return (
    <section className="section section--paper" id="process">
      <div className="container">
        <div className="sect-head" data-reveal>
          <span className="eyebrow">05 · Process</span>
          <h2 className="h-display">
            신청하면
            <br />
            <span className="serif">이렇게</span> 진행됩니다.
          </h2>
          <p className="lead">
            계약 전까지는 한 푼도 들지 않습니다. Day 0부터 Month 3까지의 흐름.
          </p>
        </div>

        <div className="timeline" data-reveal>
          {TIMELINE.map((t) => (
            <div key={t.when} className="timeline__row">
              <span className="timeline__when">{t.when}</span>
              <div className="timeline__body">
                <h3 className="timeline__title">{t.title}</h3>
                <p className="timeline__txt">{t.txt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="timeline__safe" data-reveal>
          <b>계약 전까지는 한 푼도 들지 않습니다.</b>
          <span style={{ color: "var(--fg-muted)" }}>
            — 무료 진단 + 1:1 상담까지 전부 무료입니다.
          </span>
        </div>
      </div>
    </section>
  );
}
