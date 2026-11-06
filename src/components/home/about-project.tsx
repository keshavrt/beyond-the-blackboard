import { SectionHeader } from "@/components/brand/section-header"
import { homePageCopy } from "@/content/home-page"

import { HomeSection } from "./home-section"

const copy = homePageCopy.about

/** Title left, short prose right (DESIGN.md §6 `minmax(280px,38%) 1fr`). Prose on solid bg. */
export function AboutProject({ index }: { index: number }) {
  return (
    <HomeSection labelledBy="about-title">
      <div className="grid gap-8 md:grid-cols-[minmax(280px,38%)_1fr] md:gap-12">
        <SectionHeader
          index={index}
          id="about-title"
          title={`${copy.title} ${copy.titleHighlight}`}
        />
        <div className="max-w-(--measure) bg-bg md:pt-2">
          {copy.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "type-lead text-fg" : "mt-4 type-body text-fg-body"}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </HomeSection>
  )
}
