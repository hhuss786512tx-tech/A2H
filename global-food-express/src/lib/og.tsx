import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

async function loadFont() {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@144,400&display=swap", { headers: { "User-Agent": "Mozilla/5.0" } }).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(woff|truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

/** Shared OG card: dark warm field, saffron rule, big serif title, NAP strip. */
export async function renderOg({ title, kicker = "Global Food Express", footer = "Rosenberg · Sugar Land · 100% Zabiha Halal" }: { title: string; kicker?: string; footer?: string }) {
  const font = await loadFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          backgroundColor: "#07100C",
          backgroundImage: "linear-gradient(135deg, rgba(233,168,58,0.22) 0%, rgba(7,16,12,0) 45%, rgba(159,191,142,0.16) 100%)",
          color: "#F4EBDD",
          fontFamily: font ? "Fraunces" : "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#E9A83A", fontFamily: "sans-serif" }}>
          <div style={{ width: 40, height: 2, background: "#E9A83A" }} />
          {kicker}
        </div>
        <div style={{ fontSize: title.length > 40 ? 72 : 92, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#CFC4B2", fontFamily: "sans-serif" }}>
          <span>{footer}</span>
          <span>globalfoodexpress.com</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: font ? [{ name: "Fraunces", data: font, style: "normal", weight: 400 }] : undefined },
  );
}
