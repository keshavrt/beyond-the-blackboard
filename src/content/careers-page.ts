import type { LocalizedText } from "@/types/career"

/**
 * UI copy for /careers. Kept out of components so a Hindi version can swap it later.
 * No career data here: this module is safe to import from client components.
 */
export const careersPageCopy = {
  title: "Explore",
  titleHighlight: "careers",
  intro: (total: number): LocalizedText =>
    `${total} careers you can aim for after school. Search by name, or filter by your stream and what you enjoy. Open a career to see the path from Class 10 to your first job.`,
  searchLabel: "Search",
  searchInputLabel: "Search careers by name",
  searchPlaceholder: "Try “nurse” or “design”",
  streamLabel: "Stream",
  interestLabel: "Interest",
  anyStream: "Any",
  anyInterest: "All",
  clearFilters: "Clear filters",
  count: (shown: number, total: number): LocalizedText => {
    if (shown === 0) return "No careers match"
    if (shown === total) return `${total} ${total === 1 ? "career" : "careers"}`
    return `${shown} of ${total} careers`
  },
  /** Result count when a stream is chosen and careers are grouped. */
  groupedCount: (streamLabel: string, forStream: number, openToAll: number): LocalizedText => {
    const main = `${forStream} ${streamLabel} ${forStream === 1 ? "career" : "careers"}`
    return openToAll > 0 ? `${main} + ${openToAll} open to all streams` : main
  },
  groupStream: (streamLabel: string): LocalizedText => `${streamLabel} careers`,
  groupOpenToAll: "Also open to all streams",
  groupStreamEmpty: (streamLabel: string): LocalizedText =>
    `No careers here need ${streamLabel} only. The careers below are open to students from any stream, including ${streamLabel}.`,
  filtersButton: "Filters",
  filtersActive: (n: number): LocalizedText => `${n} active`,
  emptyLabel: "[ 0 results ]",
  emptyTitle: (query?: string): LocalizedText =>
    query ? `No careers match “${query}”` : "No careers match these filters",
  emptyHelp:
    "Try a shorter word, or pick “Any” stream and “All” interests to see more careers.",
} as const
