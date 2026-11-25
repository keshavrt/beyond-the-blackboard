import { betterLifeLabels as L } from "@/content/better-life"

import { LangToggle } from "./lang-toggle"

/**
 * Top bar of every /my-better-life page (not in the site header): the section name in
 * both languages on the left, the EN/HI toggle on the right, a hairline seam below.
 * Must render inside .better-life so the toggle text gets the Noto fallback and the
 * [data-bl] switch.
 */
export function SectionBar() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line px-gx py-3">
      <p className="min-w-0 type-meta font-semibold text-fg">
        <span lang="en">{L.sectionName.en}</span>
        <span aria-hidden="true" className="text-mute">
          {" · "}
        </span>
        <span lang="hi">{L.sectionName.hi}</span>
      </p>
      <LangToggle />
    </div>
  )
}
