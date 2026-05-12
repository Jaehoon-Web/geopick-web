import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "GEO 공식 웹사이트의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <article className="legal">
      <Link
        href="/"
        style={{
          fontSize: 14,
          color: "var(--accent)",
          marginBottom: 24,
          display: "inline-block",
        }}
      >
        ← 지오픽 홈으로
      </Link>
      <h1>개인정보처리방침</h1>

      <p>
        {SITE.brandName}({SITE.brandNameEn}, 이하 “회사”)는 이용자의 개인정보를
        중요시하며, 「개인정보 보호법」 등 관련 법령을 준수하기 위하여 노력하고
        있습니다.
      </p>

      <h2>1. 수집하는 개인정보 항목</h2>
      <ul>
        <li>이름</li>
        <li>연락처(전화번호)</li>
        <li>업종</li>
        <li>(선택) 상담 내용</li>
      </ul>

      <h2>2. 개인정보의 수집·이용 목적</h2>
      <p>
        회사는 무료 진단 및 1:1 상담 응대를 목적으로 위 정보를 수집·이용합니다.
        영업 목적의 무차별 마케팅에는 사용하지 않습니다.
      </p>

      <h2>3. 개인정보의 보유 및 이용기간</h2>
      <p>
        수집된 개인정보는 상담 완료 후 6개월간 보관되며, 이후 지체 없이
        파기됩니다. 단, 관련 법령에서 별도 보관 기간을 정한 경우 해당
        기간 동안 보관합니다.
      </p>

      <h2>4. 개인정보의 제3자 제공</h2>
      <p>
        회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.
        법령에 의거하거나 수사 목적으로 요구되는 경우는 예외로 합니다.
      </p>

      <h2>5. 이용자의 권리</h2>
      <p>
        이용자는 언제든지 개인정보의 열람·정정·삭제·처리정지를 요청할 수
        있으며, 아래 연락처로 요청 시 지체 없이 처리합니다.
      </p>

      <h2>6. 문의처</h2>
      <p>
        {SITE.legalName} · {SITE.contact.email} · {SITE.contact.phone}
      </p>

      <p
        style={{
          marginTop: 48,
          fontSize: 13,
          color: "var(--fg-muted)",
        }}
      >
        본 방침은 시안 단계의 임시 문안이며, 정식 공개 전 법무 검토를
        거쳐 확정됩니다.
      </p>
    </article>
  );
}
