import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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

export default async function AppleIcon() {
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
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: fontData ? "Pretendard" : "system-ui",
            fontSize: 120,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            paddingTop: 10,
          }}
        >
          지
        </span>
        <span
          style={{
            position: "absolute",
            top: 32,
            right: 32,
            width: 26,
            height: 26,
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
