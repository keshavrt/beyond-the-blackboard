/**
 * Pure filter logic with NO data import, so client components can use it
 * without pulling the full careers dataset into the browser bundle.
 */
import type { Career, Interest, Stream } from "@/types/career";

export interface CareerFilters {
  /** Matched against the career name, case-insensitive. */
  query?: string;
  /** "any" or undefined means no stream filter. */
  stream?: Stream;
  interest?: Interest;
}

/** The fields filtering needs. A full Career satisfies this too. */
export type FilterableCareer = Pick<Career, "name" | "streams" | "interests">;

export const STREAMS = ["science", "commerce", "arts", "vocational", "any"] as const satisfies readonly Stream[];
export const INTERESTS = [
  "helping-people",
  "building-fixing",
  "creative",
  "numbers-business",
  "nature-outdoors",
  "technology",
] as const satisfies readonly Interest[];

/**
 * Filters combine with AND.
 * A career whose streams include "any" matches every stream filter.
 */
export function matchesFilters(c: FilterableCareer, { query, stream, interest }: CareerFilters = {}): boolean {
  const q = query?.trim().toLowerCase() ?? "";
  if (q && !c.name.toLowerCase().includes(q)) return false;
  if (stream && stream !== "any" && !c.streams.includes(stream) && !c.streams.includes("any")) {
    return false;
  }
  if (interest && !c.interests.includes(interest)) return false;
  return true;
}

export function hasActiveFilters({ query, stream, interest }: CareerFilters): boolean {
  return Boolean(query?.trim()) || (stream !== undefined && stream !== "any") || interest !== undefined;
}

const isStream = (v: string | null): v is Stream => v !== null && (STREAMS as readonly string[]).includes(v);
const isInterest = (v: string | null): v is Interest => v !== null && (INTERESTS as readonly string[]).includes(v);

/** Reads `?q=&stream=&interest=`. Unknown values are ignored. */
export function parseFilters(params: Pick<URLSearchParams, "get">): CareerFilters {
  const q = params.get("q") ?? "";
  const stream = params.get("stream");
  const interest = params.get("interest");
  return {
    query: q || undefined,
    stream: isStream(stream) && stream !== "any" ? stream : undefined,
    interest: isInterest(interest) ? interest : undefined,
  };
}

/** Builds the query string ("" when nothing is active). Leading "?" included. */
export function filtersToSearch({ query, stream, interest }: CareerFilters): string {
  const p = new URLSearchParams();
  if (query?.trim()) p.set("q", query.trim());
  if (stream && stream !== "any") p.set("stream", stream);
  if (interest) p.set("interest", interest);
  const s = p.toString();
  return s ? `?${s}` : "";
}

/**
 * Splits already-filtered careers for a chosen stream:
 * `forStream` lists the stream explicitly; `openToAll` matched only through "any".
 */
export function groupByStream<T extends FilterableCareer>(
  list: readonly T[],
  stream: Stream,
): { forStream: T[]; openToAll: T[] } {
  const forStream: T[] = [];
  const openToAll: T[] = [];
  for (const c of list) (c.streams.includes(stream) ? forStream : openToAll).push(c);
  return { forStream, openToAll };
}

/** Number of active chip filters (stream + interest); search is not counted. */
export function countChipFilters({ stream, interest }: CareerFilters): number {
  return (stream && stream !== "any" ? 1 : 0) + (interest ? 1 : 0);
}
