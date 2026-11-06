import { careers } from "@/data/careers";
import type { Career } from "@/types/career";
import { matchesFilters, type CareerFilters } from "@/lib/career-filter";

export type { CareerFilters } from "@/lib/career-filter";

export function getAllCareers(): Career[] {
  return careers;
}

/** Accepts a plain string so it can take route params directly. */
export function getCareerBySlug(slug: string): Career | undefined {
  return careers.find((c) => c.slug === slug);
}

/** Resolves a career's relatedSlugs. Missing slugs are skipped. */
export function getRelatedCareers(slug: string): Career[] {
  const career = getCareerBySlug(slug);
  if (!career) return [];
  return career.relatedSlugs
    .filter((s) => s !== career.slug)
    .map((s) => getCareerBySlug(s))
    .filter((c): c is Career => c !== undefined);
}

/**
 * Filters combine with AND.
 * A career whose streams include "any" matches every stream filter.
 * Pass `list` to filter a subset (or a slim client-side index).
 */
export function filterCareers<T extends Pick<Career, "name" | "streams" | "interests"> = Career>(
  filters: CareerFilters = {},
  list: readonly T[] = careers as unknown as T[],
): T[] {
  return list.filter((c) => matchesFilters(c, filters));
}
