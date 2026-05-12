# 지오픽 (GEO-Pick) — 공식 웹사이트

> AI 검색(ChatGPT·Perplexity·Gemini·네이버 AI)에서 브랜드 노출을 측정·관리·최적화하는 GEO-Pick 솔루션의 마케팅·리드 제너레이션 LP.

## 스택

- Next.js 15 (App Router) + React 19 + TypeScript
- Vanilla CSS (디자인 토큰 기반) + next/font (Pretendard·Instrument Serif·JetBrains Mono·Gowun Batang)
- 정적 페이지(SSG) + 단일 API 라우트(`/api/lead`)

## 개발

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드
npm run start      # 빌드 산출물 실행
npm run type-check # 타입 검사
```

## 환경변수 (라이브 전 필수)

`.env.example` 참고. 최소 1개 채널은 설정해야 폼 신청 알림이 갑니다.

| 변수 | 용도 |
|---|---|
| `SLACK_WEBHOOK_URL` | 슬랙 채널 즉시 알림 |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` + `LEAD_FROM_EMAIL` | 이메일 알림 (Resend) |

설정하지 않아도 폼은 동작하지만 신청이 어디에도 가지 않으니, 운영 전 반드시 1개 이상 채워야 합니다.

## 디렉토리

```
app/
  page.tsx              메인 LP (12개 섹션 조립)
  layout.tsx            메타·OG·폰트·viewport
  globals.css           디자인 토큰 + 컴포넌트 스타일
  api/lead/route.ts     폼 처리 (검증 + Slack/Email + 레이트리밋)
  privacy/, terms/      법적 페이지 stub
  icon.tsx              동적 파비콘
  opengraph-image.tsx   동적 OG 이미지
  robots.ts, sitemap.ts
components/
  Nav · MobileStickyCta · Hero(+ChatMock)
  Diagnosis · About · HowItWorks
  Cases · Process · WhyUs
  Industries · Pricing · CtaForm
  FAQ · Footer · PageEffects
lib/
  siteData.ts           모든 카피·숫자 한 곳 (라이브 실데이터 교체 지점)
  useReveal.ts          IntersectionObserver
  smoothScroll.ts
```

## 라이브 전 체크리스트

- [ ] 도메인 확정 (현재 `geopick.kr` 가정 — `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` 한꺼번에)
- [ ] `lib/siteData.ts` 의 사례 3건·통계 수치·사업자 정보 실데이터로 교체
- [ ] 알림 채널 1개 이상 환경변수 설정
- [ ] 개인정보처리방침 / 이용약관 법무 검토본 반영 (`app/privacy/page.tsx`, `app/terms/page.tsx`)
- [ ] "결과 보장" 문구 적용 조건 계약서와 일치 확인 (`lib/siteData.ts` WHY_US)
- [ ] 통계 출처 각주 (`components/Diagnosis.tsx`) 실제 표본·시점 반영
- [ ] Vercel(또는 호스팅) 배포 + 환경변수 등록

## 디자인 시안

원본 시안은 `web_디자인/` 디렉토리에 있습니다 (참고용, 빌드 대상에서 제외).
