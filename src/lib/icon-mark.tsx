import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

/**
 * App icon: the wordmark's Sage box (DESIGN.md §5.1) reduced to its first letter so it
 * stays readable at 16px. Full-bleed square, 0 radius, ink text on Sage.
 * Small sizes show "B"; large sizes (home screen) show the full "BTB" mark.
 */
const bold = readFile(join(process.cwd(), "assets/fonts/Geist-Bold.ttf"))

export async function renderIconMark(px: number) {
  const full = px >= 120
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#a9cc5a",
          color: "#0b0c0e",
          fontFamily: "Geist",
          fontWeight: 700,
          fontSize: full ? px * 0.36 : px * 0.86,
          letterSpacing: full ? "0.02em" : "-0.02em",
          lineHeight: 1,
          paddingBottom: full ? px * 0.03 : px * 0.06,
        }}
      >
        {full ? "BTB" : "B"}
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Geist", data: await bold, weight: 700, style: "normal" }],
    }
  )
}
