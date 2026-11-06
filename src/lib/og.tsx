import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

/**
 * Shared renderer for Open Graph images (DESIGN.md: dark canvas, dot grid, Sage accent,
 * 0 radius, Geist Sans for text, Geist Mono only for small code labels).
 * Satori needs TTF/OTF, so the OFL Geist files live in /assets/fonts.
 */

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const c = {
  bg: "#0b0c0e",
  fg: "#ecebe6",
  fgBody: "#c9c6be",
  mute: "#9a968e",
  line: "rgba(236,235,230,.12)",
  line2: "rgba(236,235,230,.22)",
  accent: "#a9cc5a",
  ink: "#0b0c0e",
  gridDot: "rgba(236,235,230,.07)",
}

const fontDir = join(process.cwd(), "assets/fonts")
const fonts = Promise.all([
  readFile(join(fontDir, "Geist-Medium.ttf")),
  readFile(join(fontDir, "Geist-Bold.ttf")),
  readFile(join(fontDir, "GeistMono-Bold.ttf")),
]).then(([medium, bold, monoBold]) => [
  { name: "Geist", data: medium, weight: 500 as const, style: "normal" as const },
  { name: "Geist", data: bold, weight: 700 as const, style: "normal" as const },
  { name: "Geist Mono", data: monoBold, weight: 700 as const, style: "normal" as const },
])

const mono = { fontFamily: "Geist Mono", fontWeight: 700, letterSpacing: "0.1em" } as const

export interface OgCard {
  /** Mono code label, top right, e.g. "[ CAREER ]". */
  token: string
  /** Mono section index shown above the title, e.g. "[03]". */
  index: string
  title: string
  /** Boxed in Sage. Only for the home page (DESIGN.md §5.2: hero and 404 only). */
  highlight?: string
  description: string
  /** Bottom row facts, label + value, Geist Sans. */
  facts: { label: string; value: string }[]
}

function Handle({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: "absolute", width: 9, height: 9, background: c.fg, ...style }} />
}

export async function renderOgImage(card: OgCard) {
  // Home stacks two lines by design; a career name that wraps (e.g. "Agricultural Scientist") steps down.
  const titleSize = card.highlight ? 112 : card.title.length > 14 ? 88 : 112

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: c.bg,
          backgroundImage: `radial-gradient(${c.gridDot} 1.5px, transparent 2px)`,
          backgroundSize: "36px 36px",
          padding: 40,
          fontFamily: "Geist",
          color: c.fg,
        }}
      >
        {/* Frame with square corner handles (DESIGN.md §5.6). Solid bg: no grid behind text. */}
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: `1.5px solid ${c.line2}`,
            background: c.bg,
            padding: "44px 56px 40px",
          }}
        >
          <Handle style={{ top: -5, left: -5 }} />
          <Handle style={{ top: -5, right: -5 }} />
          <Handle style={{ bottom: -5, left: -5 }} />
          <Handle style={{ bottom: -5, right: -5 }} />

          {/* Top row: wordmark + status token */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  background: c.accent,
                  color: c.ink,
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: "0.04em",
                  padding: "4px 10px",
                }}
              >
                BTB
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.08em" }}>
                BEYOND THE BLACKBOARD
              </div>
            </div>
            <div style={{ ...mono, fontSize: 16, color: c.mute }}>{card.token}</div>
          </div>

          {/* Title block */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ ...mono, fontSize: 20, color: c.accent, marginTop: 14 }}>{card.index}</div>
              <div
                style={{
                  display: "flex",
                  // With a highlight, the boxed word gets its own line (like the hero) so it never wraps mid-indent.
                  flexDirection: card.highlight ? "column" : "row",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  fontWeight: 700,
                  fontSize: titleSize,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  maxWidth: 940,
                }}
              >
                <span>{card.title}</span>
                {card.highlight ? (
                  <span
                    style={{
                      background: c.accent,
                      color: c.ink,
                      marginTop: "0.06em",
                      marginLeft: "-0.1em",
                      padding: "0.02em 0.1em 0.1em",
                    }}
                  >
                    {card.highlight}
                  </span>
                ) : null}
              </div>
            </div>
            <div
              style={{
                marginTop: 28,
                marginLeft: 66,
                maxWidth: 900,
                textWrap: "balance",
                fontWeight: 500,
                fontSize: 30,
                lineHeight: 1.4,
                color: c.fgBody,
              }}
            >
              {card.description}
            </div>
          </div>

          {/* Facts row */}
          <div
            style={{
              display: "flex",
              gap: 56,
              borderTop: `1.5px solid ${c.line}`,
              paddingTop: 24,
            }}
          >
            {card.facts.map((f) => (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontWeight: 500, fontSize: 18, color: c.mute }}>{f.label}</div>
                <div style={{ fontWeight: 700, fontSize: 26, letterSpacing: "-0.01em" }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts }
  )
}
