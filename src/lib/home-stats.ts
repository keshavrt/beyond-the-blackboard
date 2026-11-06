import { careers } from "@/data/careers"
import { INTERESTS, STREAMS, matchesFilters } from "@/lib/career-filter"
import { getCareerBySlug } from "@/lib/careers"
import type { Career, CareerSlug, Interest } from "@/types/career"

/** Counts for the hero stats strip, computed from the dataset. */
export function getHomeStats() {
  // A stream counts when at least one career is open to it (same rule as the /careers filter).
  const streams = STREAMS.filter(
    (s) => s !== "any" && careers.some((c) => matchesFilters(c, { stream: s })),
  ).length
  return { careers: careers.length, streams, interests: INTERESTS.length }
}

/** Every interest with how many careers match it, in filter order. */
export function getInterestCounts(): { interest: Interest; count: number }[] {
  return INTERESTS.map((interest) => ({
    interest,
    count: careers.filter((c) => matchesFilters(c, { interest })).length,
  }))
}

/** Resolves featured slugs; a missing slug fails the build rather than vanishing. */
export function getFeaturedCareers(slugs: readonly CareerSlug[]): Career[] {
  return slugs.map((slug) => {
    const career = getCareerBySlug(slug)
    if (!career) throw new Error(`Featured career not found: ${slug}`)
    return career
  })
}
