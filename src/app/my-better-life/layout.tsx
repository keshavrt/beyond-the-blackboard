import { Noto_Sans_Devanagari } from "next/font/google"

import { BetterLifeScope } from "@/components/better-life/better-life-scope"
import { Bi } from "@/components/better-life/bi"
import { SectionBar } from "@/components/better-life/section-bar"
import { betterLifeLabels as L } from "@/content/better-life"

import "./better-life.css"

/* Devanagari for Hindi text. Loaded in this layout only, so no other route preloads
   or downloads it (next/font docs: a font in a nested layout is preloaded only on
   the routes that layout wraps). Geist stays first; this is the fallback for Hindi glyphs. */
const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export default function BetterLifeLayout({ children }: LayoutProps<"/my-better-life">) {
  return (
    <BetterLifeScope className={notoDevanagari.variable}>
      {/* Bar and credit sit INSIDE the scope: they need the Noto fallback and the [data-bl] switch. */}
      <SectionBar />
      <div className="flex flex-1 flex-col">{children}</div>
      <p className="border-t border-line px-gx py-6 type-small text-mute">
        <Bi text={L.credit} />
      </p>
    </BetterLifeScope>
  )
}
