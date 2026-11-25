import type { ReactNode } from "react"

import type { Bilingual, Lang } from "@/types/better-life"

/**
 * Bilingual text for the My Better Life section. Server-safe (no hooks).
 * Renders both languages; better-life.css hides the inactive one via [data-bl],
 * so it is correct at first paint, before any JS runs. Works inline and inside
 * p, li, h1 to h3 and buttons (it only renders spans).
 */
export function Bi({ text }: { text: Bilingual }) {
  return (
    <>
      <span lang="en" data-bl="en">
        {text.en}
      </span>
      <span lang="hi" data-bl="hi">
        {text.hi}
      </span>
    </>
  )
}

/**
 * Content shown in one language mode only, e.g. the English translation under an
 * always-visible Hindi quote. `lang` is the mode, not the language of the content.
 */
export function Only({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <span data-bl={lang}>{children}</span>
}
