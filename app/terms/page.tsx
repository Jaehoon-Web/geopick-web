import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "이용약관",
  description: "GEO 공식 웹사이트 이용약관입니다.",
};

export default function TermsPage() {
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
      <h1>이용약관</h1>

      <h2>제1조 (목적)</h2>
      <p>
        본 약관은 {SITE.brandName}({SITE.brandNameEn}, 이하 “회사”)가 공식
        웹사이트를 통해 제공하는 서비스(무료 진단 안내, 상담 신청 등)의 이용에
        관한 조건과 절차를 규정함을 목적으로 합니다.
      </p>

      <h2>제2조 (서비스 내용)</h2>
      <p>
        회사는 본 웹사이트를 통해 생성형 AI 검색에서의 브랜드 노출 진단,
        상담, 및 부가 정보를 제공합니다. 서비스의 구체적 범위는 별도
        견적·계약에 따라 정해집니다.
      </p>

      <h2>제3조 (이용자의 의무)</h2>
      <p>
        이용자는 신청 시 정확한 정보를 제공해야 하며, 허위 정보 제공으로
        발생한 불이익은 이용자 본인이 부담합니다.
      </p>

      <h2>제4조 (책임의 제한)</h2>
      <p>
        회사는 천재지변, 통신장애 등 회사의 귀책사유가 아닌 사유로 인한
        서비스 중단에 대해서는 책임을 지지 않습니다.
      </p>

      <h2>제5조 (분쟁 해결)</h2>
      <p>
        본 약관에 관한 분쟁은 회사 본점 소재지를 관할하는 법원을 전속적
        합의관할로 합니다.
      </p>

      <p
        style={{
          marginTop: 48,
          fontSize: 13,
          color: "var(--fg-muted)",
        }}
      >
        본 약관은 시안 단계의 임시 문안이며, 정식 공개 전 법무 검토를
        거쳐 확정됩니다.
      </p>
    </article>
  );
}
