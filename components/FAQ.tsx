"use client";

import { useState } from "react";
import { FAQ as ITEMS } from "@/lib/siteData";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div
          className="sect-head"
          data-reveal
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 920,
          }}
        >
          <span
            className="eyebrow"
            style={{ justifyContent: "center" }}
          >
            10 · FAQ
          </span>
          <h2 className="h-display">
            <span className="serif">근데…?</span>
            <br />
            남은 질문에 답해드립니다.
          </h2>
        </div>

        <div className="faq" data-reveal>
          {ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={item.q}
                className={`faq-item${isOpen ? " open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-item__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  {item.q}
                  <span className="faq-item__icon">+</span>
                </button>
                <div className="faq-item__a">
                  <div className="faq-item__a-inner">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 72 }}>
          <a href="#form" className="btn btn--dark btn--xl">
            무료 진단 신청하기
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
