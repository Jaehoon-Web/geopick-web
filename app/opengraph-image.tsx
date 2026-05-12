import { ImageResponse } from "next/og";

export const alt =
  "지오픽 (GEO-Pick) — 손님이 AI에게 물어볼 때, 우리 가게가 답이 됩니다.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadPretendard(weight: "Bold" | "Black"): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-${weight}.otf`,
      { next: { revalidate: 60 * 60 * 24 * 30 } }
    );
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OG() {
  const [bold, black] = await Promise.all([
    loadPretendard("Bold"),
    loadPretendard("Black"),
  ]);
  const fontFamily = bold || black ? "Pretendard" : "system-ui";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#0B0B0D",
          backgroundImage:
            "radial-gradient(60% 50% at 18% 12%, rgba(217,119,87,0.24), transparent 60%), radial-gradient(50% 50% at 82% 8%, rgba(99,80,200,0.20), transparent 60%)",
          color: "#F4EFE6",
          fontFamily,
        }}
      >
        {/* brand mark — wordmark with yellow dot */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 18,
            position: "relative",
          }}
        >
          <span
            style={{
              position: "relative",
              fontSize: 46,
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              paddingRight: 18,
              display: "flex",
            }}
          >
            지오픽
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 0,
                width: 10,
                height: 10,
                borderRadius: 9999,
                backgroundColor: "#FEDF35",
                display: "block",
              }}
            />
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.32em",
              color: "rgba(244,239,230,0.5)",
              textTransform: "uppercase",
            }}
          >
            GEOPICK · LOCATION CURATION
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            <span>요즘 손님은</span>
            <span style={{ display: "flex", gap: 0 }}>
              <span style={{ color: "#D97757" }}>ChatGPT</span>
              <span>한테 물어봅니다.</span>
            </span>
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "rgba(244,239,230,0.66)",
              letterSpacing: "-0.005em",
            }}
          >
            AI 검색 안에 브랜드를 정확히 위치시킵니다.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            fontSize: 16,
            fontWeight: 700,
            color: "rgba(244,239,230,0.55)",
          }}
        >
          <span>tracked queries / week · 500+</span>
          <span>avg. visibility lift · 3.1×</span>
          <span>0건 의료광고법 위반</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(bold
          ? [{ name: "Pretendard", data: bold, weight: 700 as const }]
          : []),
        ...(black
          ? [{ name: "Pretendard", data: black, weight: 900 as const }]
          : []),
      ],
    }
  );
}
