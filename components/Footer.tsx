import { SITE } from "@/lib/siteData";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <a className="nav__logo" href="#top" aria-label="지오픽 홈으로">
            <Logo size="md" />
          </a>
          <p>
            GEO-Pick — Generative Engine Optimization for Korea. AI 검색
            안에서 브랜드를 키웁니다.
          </p>
          <p style={{ fontSize: 13 }}>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
        </div>
        <div className="footer__col">
          <h4>Product</h4>
          <ul>
            <li>
              <a href="#how">작동 원리</a>
            </li>
            <li>
              <a href="#cases">사례</a>
            </li>
            <li>
              <a href="#pricing">가격</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#about">소개</a>
            </li>
            <li>
              <a href="#form">상담 신청</a>
            </li>
            <li>
              <a href={SITE.loginUrl} target="_blank" rel="noreferrer">
                기존 고객 로그인 →
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/privacy">개인정보처리방침</a>
            </li>
            <li>
              <a href="/terms">이용약관</a>
            </li>
            <li>
              <a href="#">사업자 정보</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>
          {SITE.brandName} ({SITE.legalName})
        </span>
        <span>
          대표 {SITE.contact.ceo} · 사업자등록번호 {SITE.contact.bizNumber}{" "}
          · {SITE.contact.address}
        </span>
        <span>
          {SITE.contact.phone} ·{" "}
          <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>
        </span>
      </div>
    </footer>
  );
}
