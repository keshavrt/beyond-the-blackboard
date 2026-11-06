import Link from "next/link"

import { SectionHeader } from "@/components/brand/section-header"
import { CareerCard } from "@/components/career/career-card"
import { Button } from "@/components/ui/button"
import { homePageCopy } from "@/content/home-page"
import type { Career } from "@/types/career"

import { HomeSection } from "./home-section"

const copy = homePageCopy.featured

export function FeaturedCareers({
  index,
  items,
}: {
  index: number
  /** `listIndex` = position in the full list, so file tabs match /careers. */
  items: { career: Career; listIndex: number }[]
}) {
  return (
    <HomeSection labelledBy="featured-title">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
        <div>
          <SectionHeader
            index={index}
            id="featured-title"
            title={`${copy.title} ${copy.titleHighlight}`}
          />
          <p className="mt-6 max-w-(--measure) type-lead text-fg-body md:mt-8">{copy.intro}</p>
        </div>
        <Button
          variant="outline"
          arrow="internal"
          nativeButton={false}
          render={<Link href="/careers" />}
          className="hidden md:inline-flex"
        >
          {copy.seeAll}
        </Button>
      </div>

      {/* Subgrid: path, title, badges and footer line up across each row.
          Phones show two cards; "See all careers" sits right after them. */}
      <ul className="mt-12 grid grid-cols-1 gap-x-[clamp(16px,2.4vw,36px)] gap-y-8 md:mt-16 md:grid-cols-2 xl:grid-cols-4">
        {items.map(({ career, listIndex }) => (
          <li key={career.slug} data-reveal="" className="row-span-4 grid grid-rows-subgrid gap-0 max-md:nth-[n+3]:hidden">
            <CareerCard
              career={career}
              index={listIndex}
              className="row-span-4 grid grid-rows-subgrid gap-0"
            />
          </li>
        ))}
      </ul>

      {/* On phones the link sits after the cards, where the thumb is. */}
      <Button
        variant="outline"
        size="lg"
        arrow="internal"
        nativeButton={false}
        render={<Link href="/careers" />}
        className="mt-10 w-full md:hidden"
      >
        {copy.seeAll}
      </Button>
    </HomeSection>
  )
}
