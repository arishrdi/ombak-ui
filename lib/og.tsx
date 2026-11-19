import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { registryUrl } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

// Geist (SIL Open Font License), read at build time so share images match the site.
const font = (file: string) => fs.readFileSync(path.join(process.cwd(), "assets", "fonts", file));
const FONTS = [
  { name: "Geist", data: font("Geist-Regular.ttf"), weight: 400 as const, style: "normal" as const },
  { name: "Geist", data: font("Geist-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
];

/** A wave silhouette as an SVG path. */
function wave(y: number, amp: number, phase: number) {
  let d = `M0 ${y}`;
  for (let x = 0; x <= 1200; x += 40) {
    d += ` L${x} ${(y + Math.sin(x / 140 + phase) * amp + Math.sin(x / 63 - phase) * amp * 0.35).toFixed(1)}`;
  }
  return `${d} L1200 630 L0 630 Z`;
}

const OCEAN = ["#0f2a66", "#0b5e91", "#138fa3", "#3fd1b0"];

export type OgOptions = {
  /** Small label in the top-right pill, e.g. "Component · Text". */
  kind: string;
  title: string;
  description?: string;
  /** Accent for the logo, pill dot and front wave. */
  accent?: string;
  /** Footer line, e.g. the install command. */
  footer?: string;
};

/**
 * Shared share-image design: dark ocean background, layered waves at the bottom, logo and kind
 * pill on top, a large title and an optional install line.
 */
export function ogImage({ kind, title, description, accent = "#5ef0c8", footer }: OgOptions) {
  const layers: Array<[string, number, number, number]> = [
    [OCEAN[0], 470, 30, 0.4],
    [OCEAN[1], 500, 26, 1.8],
    [OCEAN[2], 530, 22, 3.1],
    [accent, 560, 18, 4.4],
  ];
  const titleSize = title.length > 30 ? 64 : title.length > 22 ? 72 : title.length > 18 ? 88 : 104;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#050c16",
          color: "white",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "Geist",
        }}
      >
        {/* glow + grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage: `radial-gradient(60% 55% at 85% 0%, ${accent}33, transparent 70%), radial-gradient(45% 60% at 0% 40%, rgba(23,58,138,.45), transparent 70%)`,
          }}
        />
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          {layers.map(([c, y, a, p], i) => (
            <path key={i} d={wave(y, a, p)} fill={c} opacity={i === 3 ? 0.9 : 1} />
          ))}
        </svg>

        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                display: "flex",
                background: "linear-gradient(135deg, #a6f7e1, #3fb7d1)",
                boxShadow: "0 0 30px rgba(94,240,200,.35)",
              }}
            />
            <span style={{ display: "flex" }}>
              Ombak<span style={{ color: "rgba(255,255,255,.5)", marginLeft: 8 }}>UI</span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.14)",
              background: "rgba(255,255,255,.05)",
              fontSize: 22,
              color: "rgba(255,255,255,.8)",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: accent, boxShadow: `0 0 12px ${accent}` }} />
            {kind}
          </div>
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            marginTop: 64,
            fontSize: titleSize,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: -titleSize * 0.04,
            maxWidth: 1056,
          }}
        >
          {title}
        </div>
        {description && (
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, lineHeight: 1.35, color: "rgba(255,255,255,.65)", maxWidth: 900 }}>
            {description.length > 120 ? `${description.slice(0, 117).trimEnd()}…` : description}
          </div>
        )}

        {footer && (
          <div
            style={{
              position: "absolute",
              left: 72,
              bottom: 150,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 20px",
              borderRadius: 14,
              background: "rgba(0,0,0,.35)",
              border: "1px solid rgba(255,255,255,.1)",
              fontSize: 20,
              color: "rgba(255,255,255,.75)",
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: accent }}>$</span>
            {footer}
          </div>
        )}
      </div>
    ),
    { ...ogSize, fonts: FONTS },
  );
}

/** Install command for the image footer. */
export const installLine = (name: string) => `npx shadcn@latest add ${registryUrl(name)}`;
