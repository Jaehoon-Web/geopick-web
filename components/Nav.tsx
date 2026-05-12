"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const LINKS: Array<{ href: string; label: string }> = [
  { href: "#diagnosis", label: "진단" },
  { href: "#about", label: "우리는" },
  { href: "#how", label: "작동 원리" },
  { href: "#cases", label: "사례" },
  { href: "#pricing", label: "가격" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function update() {
      const y = window.scrollY;
      setScrolled(y > 24);

      const navHeight = 70;
      const darkZones = [
        document.querySelector(".hero"),
        document.querySelector("#form"),
        ...Array.from(document.querySelectorAll(".section--dark")),
      ].filter(Boolean) as HTMLElement[];

      const over = darkZones.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < navHeight && r.bottom > navHeight;
      });
      setOnDark(over);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Body scroll lock + esc-to-close while menu open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [menuOpen]);

  const classes = ["nav"];
  if (scrolled) classes.push("scrolled");
  // Treat overlay as dark when open so logo/hamburger stay visible
  if (onDark || menuOpen) classes.push("on-dark");
  if (menuOpen) classes.push("menu-open");

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className={classes.join(" ")} id="nav">
        <a className="nav__logo" href="#top" aria-label="지오픽 홈으로">
          <Logo size="lg" />
        </a>

        <div className="nav__right">
          <div className="nav__links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <a className="btn btn--dark nav__cta" href="#form">
            무료 진단 신청
            <span className="btn-arrow">→</span>
          </a>

          <button
            type="button"
            className="nav__hamburger"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            aria-controls="nav-overlay"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        id="nav-overlay"
        className={`nav-overlay${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={(e) => {
          // close when tapping outside the menu content
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <ul className="nav-overlay__list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={closeMenu}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#form"
          className="btn btn--primary btn--xl nav-overlay__cta"
          onClick={closeMenu}
        >
          무료 진단 신청
          <span className="btn-arrow">→</span>
        </a>
      </div>
    </>
  );
}
