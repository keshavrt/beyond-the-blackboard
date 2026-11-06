import { careers } from "@/data/careers";
import type { Career, Interest, Stream } from "@/types/career";

export interface CareerFilters {
  /** Matched against the career name, case-insensitive. */
  query?: string;
  /** "any" or undefined means no stream filter. */
  stream?: Stream;
  interest?: Interest;
}

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
 */
export function filterCareers({ query, stream, interest }: CareerFilters = {}): Career[] {
  const q = query?.trim().toLowerCase() ?? "";

  return careers.filter((c) => {
    if (q && !c.name.toLowerCase().includes(q)) return false;
    if (stream && stream !== "any" && !c.streams.includes(stream) && !c.streams.includes("any")) {
      return false;
    }
    if (interest && !c.interests.includes(interest)) return false;
    return true;
  });
}
