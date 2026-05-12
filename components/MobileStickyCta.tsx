"use client";

import { useEffect, useState } from "react";

export function MobileStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const form = document.querySelector("#form");
    const footer = document.querySelector(".footer");
    if (!hero) return;

    let pastHero = false;
    let inForm = false;
    let inFooter = false;

    const compute = () => setShow(pastHero && !inForm && !inFooter);

    const heroIo = new IntersectionObserver(
      ([e]) => {
        pastHero = !e.isIntersecting;
        compute();
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
    );
    heroIo.observe(hero);

    let formIo: IntersectionObserver | null = null;
    if (form) {
      formIo = new IntersectionObserver(
        ([e]) => {
          inForm = e.isIntersecting;
          compute();
        },
        { threshold: 0.05 }
      );
      formIo.observe(form);
    }

    let footerIo: IntersectionObserver | null = null;
    if (footer) {
      footerIo = new IntersectionObserver(
        ([e]) => {
          inFooter = e.isIntersecting;
          compute();
        },
        { threshold: 0 }
      );
      footerIo.observe(footer);
    }

    return () => {
      heroIo.disconnect();
      formIo?.disconnect();
      footerIo?.disconnect();
    };
  }, []);

  return (
    <a
      href="#form"
      className={`mobile-cta${show ? " visible" : ""}`}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      무료 진단 신청
      <span className="btn-arrow">→</span>
    </a>
  );
}
