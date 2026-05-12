import { WHY_US } from "@/lib/siteData";

export function WhyUs() {
  return (
    <section className="section section--dark" id="why">
      <div className="container">
        <div className="sect-head" data-reveal>
          <span className="eyebrow">06 · Why GEO</span>
          <h2 className="h-display">
            왜 <span className="serif">우리여야</span>
            <br />
            하나요?
          </h2>
        </div>

        <div className="why" data-reveal>
          {WHY_US.map((w) => (
            <div key={w.n} className="why__cell">
              <span className="why__cell-num">{w.n}</span>
              <h3>{w.title}</h3>
              <p>{w.txt}</p>
              {"note" in w && w.note && (
                <p className="why__cell-note">{w.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
