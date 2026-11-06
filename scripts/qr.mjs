// Writes public/qr.png for the live site. Run: npm run qr
// Reads SITE_URL from src/lib/site.ts so the QR code and metadata never drift apart.
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import QRCode from "qrcode"

const src = readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8")
const url = src.match(/SITE_URL\s*=\s*"([^"]+)"/)?.[1]
if (!url) throw new Error("SITE_URL not found in src/lib/site.ts")

await QRCode.toFile(fileURLToPath(new URL("../public/qr.png", import.meta.url)), url, {
  errorCorrectionLevel: "H", // survives print smudges, folds and low-light phone cameras
  width: 1200,
  margin: 4, // quiet zone required by the QR spec
  color: { dark: "#000000", light: "#ffffff" }, // pure black on white scans most reliably
})
console.log(`public/qr.png -> ${url}`)
