// Single source of truth for copy/data so we can swap in real values later
// without touching component markup.

export const SITE = {
  brandName: "지오픽",
  brandNameEn: "GEO-Pick",
  brandTagEn: "GEO-Pick · Generative Engine Optimization",
  legalName: "GEO-Pick Inc.",
  loginUrl: "https://app.geopick.kr", // 운영 시스템 진입점 (추후 확정)
  contact: {
    phone: "02-0000-0000",
    email: "hello@geopick.kr",
    address: "서울특별시 강남구",
    bizNumber: "000-00-00000",
    ceo: "○○○",
  },
} as const;

export const PAIN_POINTS = [
  { n: "01", txt: ["광고비는 매년 오르는데", "예약은 오히려 줄어든다"] },
  { n: "02", txt: ["손님이 진료실에서", "“ChatGPT에서 보고 왔어요” 한다"] },
  { n: "03", txt: ["옆 가게는 잘 된다는데", "우리는 왜 안 보일까"] },
  { n: "04", txt: ["의료법 무서워서", "콘텐츠도 함부로 못 만든다"] },
  { n: "05", txt: ["대행사 보고서를 봐도", "결과가 안 보인다"] },
];

export const PAIN_STATS = [
  {
    big: "73",
    unit: "%",
    txt: ["20~40대가 AI에 가게를", "물어본 경험이 있습니다."],
  },
  {
    big: "58",
    unit: "%",
    txt: ["AI 추천 결과를 보고", "실제 방문을 결정합니다."],
  },
  {
    big: "3.2",
    unit: "×",
    txt: ["AI 추천 손님 구매전환율은", "네이버 검색 손님 대비 약 3배."],
  },
];

export const STEPS = [
  {
    n: "01",
    title: "측정",
    txt: "AI가 우리 가게를 추천하는지 수백 가지 질문으로 직접 확인합니다.",
  },
  {
    n: "02",
    title: "진단",
    txt: "추천이 안 나오는 진짜 원인을 찾습니다. 정보 부족인지, 잘못된 정보인지, 경쟁 강세인지.",
  },
  {
    n: "03",
    title: "처방",
    txt: "의료법·광고법에 안전한 콘텐츠 전략을 수립합니다. 위험 표현은 시스템이 자동 차단.",
  },
  {
    n: "04",
    title: "실행",
    txt: "콘텐츠 제작 → 사장님 승인 → 배포. 직접 보지 않은 글은 절대 올라가지 않습니다.",
  },
  {
    n: "05",
    title: "추적",
    txt: "매주 다시 측정해 효과를 확인합니다. 안 오르면 즉시 수정합니다.",
  },
];

export type CaseStudy = {
  id: string;
  industry: string;
  name: string;
  query: string;
  queryNote: string;
  quote: string;
  source: string;
  deltaLabel: string;
  from: string;
  to: string;
  toUnit?: string;
  period: string;
  barBefore: { v: string; w: number };
  barAfter: { v: string; w: number };
};

export const CASES: CaseStudy[] = [
  {
    id: "01",
    industry: "CASE 01 · 피부과 · 강남",
    name: "A 피부과",
    query: "“강남에서 리프팅 추천해줘”",
    queryNote: "ChatGPT 답변 내 노출률 (3개월 추적)",
    quote:
      "“하루 평균 신규 예약이 7건에서 13건으로 거의 두 배가 됐습니다. 특히 ChatGPT 보고 왔다는 손님이 눈에 띄게 늘었어요.”",
    source: "— A 피부과 마케팅 실장",
    deltaLabel: "ChatGPT 노출률 변화",
    from: "12%",
    to: "38",
    toUnit: "%",
    period: "2026.01 — 2026.04 / 3개월",
    barBefore: { v: "12%", w: 12 },
    barAfter: { v: "38%", w: 38 },
  },
  {
    id: "02",
    industry: "CASE 02 · 한의원 · 분당",
    name: "B 한의원",
    query: "“분당 한의원 추천”",
    queryNote: "Perplexity 검색 순위 (6주 추적)",
    quote:
      "“Perplexity 1순위 되고 나서 첫 달부터 신환이 늘었습니다. 매출 그래프가 처음으로 위로 꺾였습니다.”",
    source: "— B 한의원 원장",
    deltaLabel: "월 매출 변화",
    from: "1,800만",
    to: "2,650",
    toUnit: "만",
    period: "Perplexity 1순위 6주차 달성",
    barBefore: { v: "₩18.0M", w: 50 },
    barAfter: { v: "₩26.5M", w: 74 },
  },
  {
    id: "03",
    industry: "CASE 03 · 에스테틱 · 청담",
    name: "C 에스테틱",
    query: "“청담 피부관리 어디 잘해?”",
    queryNote: "Gemini · ChatGPT 추천 점유율 (8주 추적)",
    quote:
      "“광고비를 줄였는데도 신규 예약이 늘었습니다. 그게 제일 놀랐어요. 가성비 자체가 달라진 거죠.”",
    source: "— C 에스테틱 대표",
    deltaLabel: "AI 추천 점유율",
    from: "8%",
    to: "29",
    toUnit: "%",
    period: "2026.02 — 2026.04 / 8주",
    barBefore: { v: "8%", w: 8 },
    barAfter: { v: "29%", w: 29 },
  },
];

export const TIMELINE = [
  {
    when: "Day 0",
    title: "무료 진단 신청",
    txt: "이름·전화·업종 3줄만 입력하면 끝.",
  },
  {
    when: "Day 1",
    title: "진단 보고서 카톡 발송",
    txt: "현재 노출 상태 · 경쟁사 비교 · 개선 가능성. PDF로 받으세요.",
  },
  {
    when: "Day 3",
    title: "1:1 상담 미팅 (온/오프라인)",
    txt: "전담 매니저가 결과를 직접 설명합니다. 결정은 그 다음에.",
  },
  {
    when: "Week 1",
    title: "계약 후 본격 시작",
    txt: "매장 정보 · 경쟁사 · 핵심 키워드 세팅.",
  },
  {
    when: "Week 2",
    title: "첫 콘텐츠 사장님 검토 요청",
    txt: "반드시 사장님 승인 후에만 배포됩니다. 위험 표현은 시스템이 자동 차단.",
  },
  {
    when: "Week 4",
    title: "첫 정기 리포트 도착",
    txt: "한 달간 무엇이 어떻게 바뀌었는지 한눈에. 단순 PDF, 비전문가용 언어.",
  },
  {
    when: "Month 3",
    title: "첫 결과 평가",
    txt: "목표 도달 여부 확인 · 다음 분기 전략 협의.",
  },
];

export const WHY_US = [
  {
    n: "01",
    title: "한국 1위 데이터",
    txt: "네이버·카카오·ChatGPT·Gemini를 한꺼번에 봅니다. 해외 도구는 한국어 검색을 제대로 다루지 못합니다.",
  },
  {
    n: "02",
    title: "의료법·광고법 자동 검토",
    txt: "“최고”, “유일” 같은 위험 표현을 시스템이 자동 차단합니다. 원장님 영업정지 걱정 없습니다.",
  },
  {
    n: "03",
    title: "사람이 직접 관리",
    txt: "AI가 다 알아서 해주는 건 환상입니다. 전담 매니저가 매주 직접 데이터를 확인합니다.",
  },
  {
    n: "04",
    title: "결과로 말합니다",
    txt: "성과 보장 프로그램 적용 시, 3개월 동안 핵심 키워드 추천 노출이 베이스라인 대비 2배 미달이면 4개월차 월 비용이 면제됩니다.",
    note: "* 적용 조건은 계약서에서 별도 정의된 측정 방식·키워드·기간을 따릅니다.",
  },
];

export const INDUSTRIES = [
  {
    name: "피부과 · 성형외과",
    txt: "의료법 안전 표현 + 시술별 키워드 매핑. 가장 많은 사례가 모인 업종입니다.",
  },
  {
    name: "한의원",
    txt: "증상별 키워드 그룹화. 동네 단위 추천 알고리즘에 강합니다.",
  },
  {
    name: "에스테틱 · 뷰티샵",
    txt: "광고법 안전 콘텐츠 + 인플루언서 인용. SNS 노출까지 연동.",
  },
  {
    name: "법률사무소",
    txt: "분쟁 유형별 질의 추적. 전문 카테고리 점유율 측정.",
  },
  {
    name: "음식점 · 프랜차이즈",
    txt: "지역 + 메뉴 단위 추천. 본사·가맹점 동시 노출 설계.",
  },
  {
    name: "그 외 / 잘 모르겠음",
    txt: "먼저 무료 진단부터. 우리 업종이 가능한지 24시간 안에 답변드립니다.",
    ctaLabel: "진단 요청하기",
  },
];

export const PRICING = [
  {
    name: "기본 진단",
    amount: "무료",
    sub: "1회성 / PDF 리포트 발송",
    desc: "먼저 우리 가게의 AI 노출 상태부터 확인하세요.",
    features: [
      "AI 추천 여부 확인",
      "경쟁사 비교 리포트",
      "개선 가능성 진단",
      "PDF 리포트 카톡 발송",
    ],
    btnLabel: "진단 신청",
    btnKind: "ghost" as const,
  },
  {
    name: "정기 관리",
    nameTag: "RECOMMENDED",
    amount: "견적",
    amountPrefix: "₩",
    sub: "월 단위 · 묶임 없음",
    desc: "매주 측정하고 매월 콘텐츠로 키웁니다. 사례 1–3 수준.",
    features: [
      "매주 자동 측정 (500+ 쿼리)",
      "월 단위 콘텐츠 제작 · 배포",
      "월간 리포트 자동 발송",
      "의료법·광고법 자동 검토",
      "전담 매니저 격주 미팅",
    ],
    btnLabel: "상담 신청",
    btnKind: "dark" as const,
    feature: true,
  },
  {
    name: "전담 매니저",
    amount: "견적",
    amountPrefix: "₩",
    sub: "대형 매장 · 프랜차이즈용",
    desc: "매장 수가 많거나, 분기 단위 전략이 필요한 브랜드.",
    features: [
      "전담 매니저 단독 배정",
      "무제한 콘텐츠 · 키워드",
      "주간 리포트 + 화상 미팅",
      "분기 전략 워크숍",
      "경쟁사 모니터링 무제한",
    ],
    btnLabel: "상담 신청",
    btnKind: "ghost" as const,
  },
];

export const FAQ = [
  {
    q: "정말 무료인가요? 나중에 청구되나요?",
    a: "진단은 0원입니다. 결과를 보고 결정하셔도 됩니다. 진단 단계에서 신용카드나 결제 정보를 받지 않습니다.",
  },
  {
    q: "의료법 위반 위험은 없나요?",
    a: "콘텐츠 제작 시 의료법 56조 위반 표현(“최고”, “유일”, “1위” 등)을 시스템이 자동 차단합니다. 또한 배포 전 반드시 원장님 직접 승인을 거칩니다.",
  },
  {
    q: "효과는 얼마나 걸리나요?",
    a: "보통 4~6주에 첫 변화가 나타나고, 3개월에 결과를 확인할 수 있습니다. 단, 업종·경쟁 강도에 따라 다를 수 있습니다.",
  },
  {
    q: "우리 같은 작은 가게도 되나요?",
    a: "직원 1명 매장도 진행하고 있습니다. 매장 규모는 상관없습니다. 다만 일정 비용은 동일하게 발생하므로 ROI 관점에서 매장 매출 규모를 함께 검토합니다.",
  },
  {
    q: "다른 광고대행사랑 뭐가 달라요?",
    a: "기존 광고대행사는 네이버 광고 · 인스타 광고 등 “광고 노출”이 주된 업무입니다. 저희는 AI 추천 영역(ChatGPT·Perplexity·Gemini)을 다룹니다. 작업 자체가 다릅니다.",
  },
  {
    q: "계약 기간에 묶이나요?",
    a: "월 단위 해지가 가능합니다. 묶지 않습니다. 다만 첫 결과 확인을 위해 최소 3개월은 함께 진행하시기를 권합니다.",
  },
];
