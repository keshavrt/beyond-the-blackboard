import type { Metadata } from "next"

import { AboutProject } from "@/components/home/about-project"
import { FeaturedCareers } from "@/components/home/featured-careers"
import { Hero } from "@/components/home/hero"
import { HowItWorks } from "@/components/home/how-it-works"
import { InterestGrid } from "@/components/home/interest-grid"
import { homePageCopy as copy } from "@/content/home-page"
import { getAllCareers } from "@/lib/careers"
import { getFeaturedCareers, getHomeStats, getInterestCounts } from "@/lib/home-stats"

export const metadata: Metadata = {
  title: { absolute: copy.meta.title },
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    siteName: copy.meta.siteName,
    locale: copy.meta.locale,
    type: "website",
  },
}

export default function Home() {
  const all = getAllCareers()
  const featured = getFeaturedCareers(copy.featured.slugs).map((career) => ({
    career,
    listIndex: all.indexOf(career) + 1,
  }))

  return (
    <>
      <Hero stats={getHomeStats()} />
      <HowItWorks index={1} />
      <InterestGrid index={2} items={getInterestCounts()} />
      <FeaturedCareers index={3} items={featured} />
      <AboutProject index={4} />
    </>
  )
}
