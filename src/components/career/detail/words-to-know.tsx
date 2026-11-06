import { careerDetailCopy as copy } from "@/content/career-detail"
import { wordsToKnow } from "@/content/glossary"
import type { Career } from "@/types/career"

/**
 * The short forms this career's page uses, written out (critique: jargon barrier).
 * Sits under the "The path" title, filling the left column on desktop.
 */
export function WordsToKnow({ career }: { career: Career }) {
  const words = wordsToKnow(career)
  if (words.length === 0) return null
  return (
    <div className="mt-8 max-w-[44ch] border-t border-line pt-6">
      <h3 className="type-meta font-semibold text-fg">{copy.words.title}</h3>
      <dl className="mt-4 grid gap-3">
        {words.map(({ term, meaning }) => (
          <div key={term} className="type-small">
            <dt className="inline font-semibold text-fg">{term}: </dt>
            <dd className="inline text-fg-body">{meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
