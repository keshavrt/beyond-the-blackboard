import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/brand/section-header"
import { pad } from "@/components/site/nav"
import { homePageCopy } from "@/content/home-page"
import { interestLabels } from "@/data/careers"
import { filtersToSearch } from "@/lib/career-filter"
import type { Interest } from "@/types/career"

import { HomeSection } from "./home-section"

const copy = homePageCopy.interests

/**
 * DESIGN.md §5.6 tile variant: tiles share hairlines with no gaps. On hover/focus
 * a Sage sheet wipes up from the bottom, content flips to ink, ↗ nudges.
 */
export function InterestGrid({
  index,
  items,
}: {
  index: number
  items: { interest: Interest; count: number }[]
}) {
  return (
    <HomeSection labelledBy="interest-title">
      <div className="grid gap-6 md:grid-cols-[minmax(280px,38%)_1fr] md:items-end md:gap-12">
        <SectionHeader
          index={index}
          id="interest-title"
          title={copy.title}
          highlight={copy.titleHighlight}
        />
        <p className="max-w-(--measure) type-lead text-fg-body md:justify-self-end md:text-right">
          {copy.intro}
        </p>
      </div>

      <ul className="mt-12 grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {items.map(({ interest, count }, i) => (
          <li key={interest} className="border-r border-b border-line">
            <Link
              href={`/careers${filtersToSearch({ interest })}`}
              className="group/tile relative flex h-full min-h-[200px] flex-col overflow-hidden p-[clamp(20px,2vw,28px)] outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg md:min-h-[240px]"
            >
              {/* Fill wipe (DESIGN.md §7). Solid Sage, no gradient. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-(--dur) ease-out-expo group-hover/tile:scale-y-100 group-focus-visible/tile:scale-y-100 group-active/tile:bg-accent-2"
              />
              <span className="relative flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="type-code text-[11px] text-mute transition-colors duration-(--dur-fast) group-hover/tile:text-ink group-focus-visible/tile:text-ink"
                >
                  {pad(i + 1)} / {interest.replace(/-/g, "_").toUpperCase()}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={2.25}
                  className="size-5 shrink-0 text-accent transition-[color,translate] duration-(--dur) ease-out-expo group-hover/tile:translate-x-[3px] group-hover/tile:-translate-y-[3px] group-hover/tile:text-ink group-focus-visible/tile:text-ink"
                />
              </span>
              <span className="relative mt-auto pt-10">
                <span className="block type-h3 text-fg transition-colors duration-(--dur-fast) group-hover/tile:text-ink group-focus-visible/tile:text-ink">
                  {interestLabels[interest]}
                </span>
                <span className="mt-2 block type-small text-fg-body transition-colors duration-(--dur-fast) group-hover/tile:text-ink group-focus-visible/tile:text-ink">
                  {copy.blurbs[interest]}
                </span>
                <span className="mt-5 block type-label text-fg transition-colors duration-(--dur-fast) group-hover/tile:text-ink group-focus-visible/tile:text-ink">
                  {copy.count(count)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </HomeSection>
  )
}
