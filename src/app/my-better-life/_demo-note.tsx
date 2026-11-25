"use client"

import { useBetterLifeLang } from "@/components/better-life/use-better-life-lang"
import { Textarea } from "@/components/ui/textarea"
import { betterLifeLabels as L } from "@/content/better-life"

/**
 * TEMPORARY (step 2 proof, replaced in step 3): a textarea whose placeholder switches
 * language. Placeholder is empty until hydration, never English-first.
 */
export function DemoNote({ labelledBy }: { labelledBy: string }) {
  const { t } = useBetterLifeLang()
  return (
    <Textarea
      // Name comes from the visible bilingual label; the CSS-hidden language is not read.
      aria-labelledby={labelledBy}
      placeholder={t(L.practicePlaceholder)}
      className="min-h-28"
    />
  )
}
