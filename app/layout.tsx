import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Gowun_Batang } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const gowunBatang = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gowun",
  display: "swap",
  preload: false,
});

const SITE_URL = "https://geopick.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "지오픽 (GEO-Pick) — 손님이 AI에게 물어볼 때, 우리 가게가 답이 됩니다.",
    template: "%s · 지오픽",
  },
  description:
    "ChatGPT·Perplexity·Gemini·네이버 AI에서 우리 가게가 추천되도록 매주 측정·최적화하는 한국 1위 GEO 솔루션, 지오픽. 무료 진단부터 시작하세요.",
  keywords: [
    "지오픽",
    "GEO-Pick",
    "GEO",
    "Generative Engine Optimization",
    "AI 마케팅",
    "ChatGPT 노출",
    "AI 검색 최적화",
    "AI SEO",
    "의료 마케팅",
    "한의원 마케팅",
    "피부과 마케팅",
  ],
  authors: [{ name: "GEO-Pick Inc." }],
  creator: "GEO-Pick Inc.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "지오픽",
    title: "지오픽 (GEO-Pick) — 손님이 AI에게 물어볼 때, 우리 가게가 답이 됩니다.",
    description:
      "ChatGPT·Perplexity·Gemini·네이버 AI에서 우리 가게가 추천되도록 매주 측정·최적화. 의료법·광고법 자동 검토. 무료 진단부터.",
  },
  twitter: {
    card: "summary_large_image",
    title: "지오픽 — AI 시대의 새 노출 최적화",
    description: "AI 검색 안에 브랜드를 정확히 위치시킵니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0D" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${gowunBatang.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
