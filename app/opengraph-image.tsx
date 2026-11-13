// The share card, from design/v8/boards/OG-Image.dc.html (dark theme, 1200 by 630).
import { ImageResponse } from "next/og"

// Edge, with assets bundled through import.meta.url: the nodejs runtime's @vercel/og breaks on Windows paths in Next 14.
export const runtime = "edge"
export const alt = "Lewis Magangi. I build secure systems, one measured move at a time."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const BG = "#000000"
const INK = "#ededed"
const MUTED = "#a1a1a1"
const LINE = "#6b6b6b"

// The board's Shader runs with speed 0, so it is a still frame: a 4x4 ordered dither of a slow warp,
// fading in towards the right. Drawn here as square cells so the card needs no WebGL.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)
function ditherSvg() {
  const cell = 6
  const cols = Math.ceil(size.width / cell)
  const rows = Math.ceil(size.height / cell)
  let rects = ""
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const u = x / cols
      const v = y / rows
      const warp = 0.5 + 0.5 * Math.sin(u * 7 + Math.sin(v * 5 + u * 3) * 1.6 + v * 2)
      const value = warp * Math.max(0, (u - 0.25) / 0.75) * 0.55
      if (value > BAYER[(y % 4) * 4 + (x % 4)]) rects += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}"/>`
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}"><g fill="${LINE}">${rects}</g></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const load = (url: URL) => fetch(url).then((r) => r.arrayBuffer())

export default async function Image() {
  const [regular, semibold, mono, portrait] = await Promise.all([
    load(new URL("./fonts/Poppins-Regular.ttf", import.meta.url)),
    load(new URL("./fonts/Poppins-SemiBold.ttf", import.meta.url)),
    load(new URL("../node_modules/geist/dist/fonts/geist-mono/GeistMono-SemiBold.ttf", import.meta.url)),
    load(new URL("../public/portrait/lewis-magangi.jpg", import.meta.url)),
  ])
  // Satori takes the raw bytes as an image source.
  const portraitSrc = portrait as unknown as string

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: BG, color: INK, fontFamily: "Poppins" }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={ditherSvg()} width={size.width} height={size.height} style={{ position: "absolute", inset: 0, opacity: 0.55 }} />
        <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", padding: "72px 80px", gap: 64, alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: `1px solid ${LINE}`,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Geist Mono",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                LM
              </div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>Lewis Magangi</div>
            </div>
            <div style={{ fontSize: 64, lineHeight: "66px", fontWeight: 600, letterSpacing: "-0.045em", maxWidth: 640 }}>
              I build secure systems, one measured move at a time.
            </div>
            <div style={{ fontSize: 24, lineHeight: "32px", color: MUTED }}>Software engineer, Nairobi. Full-stack web, security, now AI and ML.</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: INK }} />
              lewismagangi.vercel.app
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img
            src={portraitSrc}
            width={300}
            height={420}
            style={{ width: 300, height: 420, objectFit: "cover", objectPosition: "center 20%", borderRadius: 16, border: `1px solid ${LINE}`, flex: "none" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: regular, weight: 400, style: "normal" },
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 600, style: "normal" },
      ],
    },
  )
}
