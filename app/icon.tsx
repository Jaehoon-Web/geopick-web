import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Black.otf",
      { next: { revalidate: 60 * 60 * 24 * 30 } }
    );
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Icon() {
  const fontData = await loadFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0C0C0D",
          borderRadius: 12,
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: fontData ? "Pretendard" : "system-ui",
            fontSize: 44,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            paddingTop: 4,
          }}
        >
          지
        </span>
        <span
          style={{
            position: "absolute",
            top: 11,
            right: 11,
            width: 10,
            height: 10,
            borderRadius: 9999,
            backgroundColor: "#FEDF35",
            display: "block",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [
            {
              name: "Pretendard",
              data: fontData,
              weight: 900,
              style: "normal",
            },
          ]
        : undefined,
    }
  );
}
