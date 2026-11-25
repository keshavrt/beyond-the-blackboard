import { cn } from "@/lib/utils"
import type { Bilingual } from "@/types/better-life"

import { Bi, Only } from "./bi"

/**
 * A line from the workshop (also used on lesson pages in step 4).
 * Rule: the Hindi original ALWAYS shows; in English mode the translation shows under it.
 * Looks like Callout (DESIGN.md §4.11: surface fill, 2px left border, max 68ch) but is a
 * figure + blockquote with an attribution, not a note.
 */
export function WorkshopQuote({
  quote,
  label,
  attribution,
  className,
}: {
  quote: Bilingual
  /** Small label above the quote, e.g. "A line from the workshop". */
  label?: Bilingual
  attribution?: Bilingual
  className?: string
}) {
  return (
    <figure className={cn("max-w-(--measure) border-l-2 border-accent bg-surface px-5 py-5 md:px-7", className)}>
      {label ? (
        <p className="mb-3 type-label text-mute">
          <Bi text={label} />
        </p>
      ) : null}
      <blockquote>
        <p lang="hi" className="type-lead text-fg">
          {quote.hi}
        </p>
        <Only lang="en">
          <span lang="en" className="mt-3 block type-body text-fg-body">
            {quote.en}
          </span>
        </Only>
      </blockquote>
      {attribution ? (
        <figcaption className="mt-4 type-meta text-mute">
          <Bi text={attribution} />
        </figcaption>
      ) : null}
    </figure>
  )
}
