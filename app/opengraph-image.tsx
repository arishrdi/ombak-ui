import { ImageResponse } from "next/og";

export const alt = "Ombak UI: motion components for React";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A wave silhouette as an SVG path for the share image.
const wave = (y: number, amp: number, phase: number) => {
  let d = `M0 ${y}`;
  for (let x = 0; x <= 1200; x += 40) d += ` L${x} ${(y + Math.sin(x / 140 + phase) * amp + Math.sin(x / 63 - phase) * amp * 0.35).toFixed(1)}`;
  return `${d} L1200 630 L0 630 Z`;
};

export default function OpengraphImage() {
  const layers: Array<[string, number, number, number]> = [
    ["#173a8a", 420, 34, 0.4],
    ["#0e7fbf", 455, 30, 1.8],
    ["#19b5c4", 490, 26, 3.1],
    ["#5ef0c8", 525, 22, 4.4],
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#06121f", color: "white", padding: 72, position: "relative" }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          {layers.map(([c, y, a, p]) => (
            <path key={c} d={wave(y, a, p)} fill={c} />
          ))}
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#5ef0c8" }} />
          Ombak UI
        </div>
        <div style={{ marginTop: 56, fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: -3, maxWidth: 900 }}>
          Make your website move like water.
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "rgba(255,255,255,.7)" }}>Free motion components for React & shadcn</div>
      </div>
    ),
    size,
  );
}
