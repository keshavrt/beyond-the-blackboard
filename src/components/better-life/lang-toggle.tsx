"use client"

import { Button } from "@/components/ui/button"
import { betterLifeLabels as L } from "@/content/better-life"

import { useBetterLifeLang } from "./use-better-life-lang"

/**
 * Switches the My Better Life pages between English and Hindi, no reload.
 * The visible text names the OTHER language and is CSS-switched (correct before JS).
 * aria-label is only added once the language is known after hydration; until then
 * the visible text is the button's name (no empty aria-label).
 */
export function LangToggle() {
  const { lang, setLang } = useBetterLifeLang()
  return (
    <Button
      variant="outline"
      size="sm"
      // Fixed line box: Hindi line-height would otherwise make the button taller in HI mode.
      className="leading-5 [&_span]:leading-5"
      aria-label={lang ? L.langSwitchLabel[lang] : undefined}
      onClick={() => setLang(lang === "hi" ? "en" : "hi")}
    >
      {/* Each label is written in the language it names. */}
      <span lang="hi" data-bl="en">
        {L.langSwitchTo.en}
      </span>
      <span lang="en" data-bl="hi">
        {L.langSwitchTo.hi}
      </span>
    </Button>
  )
}
