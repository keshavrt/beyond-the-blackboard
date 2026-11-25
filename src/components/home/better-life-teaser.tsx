import Link from "next/link"

import { SectionHeader } from "@/components/brand/section-header"
import { Button } from "@/components/ui/button"
import { homePageCopy } from "@/content/home-page"

import { HomeSection } from "./home-section"

const copy = homePageCopy.betterLife

/**
 * Small link to the My Better Life section. Same layout as AboutProject (title left,
 * text right). English only, so the home page never loads the Devanagari font.
 */
export function BetterLifeTeaser({ index }: { index: number }) {
  return (
    <HomeSection labelledBy="better-life-title">
      <div className="grid gap-8 md:grid-cols-[minmax(280px,38%)_1fr] md:gap-12">
        <SectionHeader index={index} id="better-life-title" size="h2" title={copy.title} />
        <div className="max-w-(--measure) bg-bg md:pt-2">
          <p className="type-lead text-fg">{copy.body}</p>
          <Button
            variant="outline"
            arrow="internal"
            nativeButton={false}
            render={<Link href="/my-better-life" />}
            className="mt-8"
          >
            {copy.cta}
          </Button>
        </div>
      </div>
    </HomeSection>
  )
}
