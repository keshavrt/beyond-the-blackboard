import type { Metadata } from "next"
import { Suspense } from "react"

import { SectionHeader } from "@/components/brand/section-header"
import { CareerCard } from "@/components/career/career-card"
import {
  CareerExplorer,
  CareerExplorerView,
  type ExplorerItem,
  type Option,
} from "@/components/career/career-explorer"
import { careersPageCopy as copy } from "@/content/careers-page"
import { interestLabels, streamLabels } from "@/data/careers"
import { INTERESTS, STREAMS } from "@/lib/career-filter"
import { getAllCareers } from "@/lib/careers"
import type { Interest, Stream } from "@/types/career"

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Browse careers for Indian school students. Search by name and filter by stream or interest.",
}

export default function CareersPage() {
  const careers = getAllCareers()

  // Cards render on the server; the client only receives the fields it filters on.
  const items: ExplorerItem[] = careers.map((c, i) => ({
    slug: c.slug,
    name: c.name,
    streams: c.streams,
    interests: c.interests,
    // Subgrid: path, title, badges and footer line up across each row of cards.
    card: (
      <CareerCard
        career={c}
        index={i + 1}
        className="row-span-4 grid grid-rows-subgrid gap-0"
      />
    ),
  }))

  const streamOptions: Option<Stream>[] = STREAMS.filter((s) => s !== "any").map((s) => ({
    value: s,
    label: streamLabels[s],
  }))
  const interestOptions: Option<Interest>[] = INTERESTS.map((i) => ({
    value: i,
    label: interestLabels[i],
  }))

  const explorerProps = { items, streamOptions, interestOptions }

  return (
    <div className="px-gx pt-[clamp(48px,10vh,120px)] pb-[clamp(64px,10vh,120px)]">
      <header className="bg-bg pb-10 md:pb-14">
        <SectionHeader
          index={1}
          as="h1"
          size="l"
          title={`${copy.title} ${copy.titleHighlight}`}
        />
        <p className="mt-6 max-w-(--measure) type-lead text-fg-body md:mt-8">
          {copy.intro(careers.length)}
        </p>
      </header>

      {/* Prerendered fallback = all careers, controls disabled. The live explorer
          takes over on hydration, reading filters from the URL. */}
      <Suspense fallback={<CareerExplorerView {...explorerProps} filters={{}} />}>
        <CareerExplorer {...explorerProps} />
      </Suspense>
    </div>
  )
}
