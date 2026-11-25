import type { Metadata } from "next"

import { Bi, Only } from "@/components/better-life/bi"
import { betterLifeLabels as L, betterLifeMeta, lessons } from "@/content/better-life"

import { DemoNote } from "./_demo-note"

export const metadata: Metadata = betterLifeMeta.intro

/**
 * TEMPORARY page (step 2): proves the font + EN/HI mechanism only.
 * Step 3 replaces it with the real intro + 7 lesson cards.
 */
export default function BetterLifeTestPage() {
  const lesson = lessons[0]
  return (
    <div className="px-gx pt-[clamp(48px,10vh,120px)] pb-[clamp(64px,10vh,120px)]">
      <article className="max-w-(--measure)">
        <h1 className="type-display-l text-fg">
          <Bi text={lesson.title} />
        </h1>
        <p className="mt-6 type-lead text-fg-body md:mt-8">
          <Bi text={lesson.intro} />
        </p>

        <figure className="mt-10 border-l-2 border-accent bg-surface px-5 py-4">
          <figcaption className="type-label text-mute">
            <Bi text={L.quoteLabel} />
          </figcaption>
          {/* The Hindi original always shows; the English translation only in EN mode. */}
          <blockquote className="mt-3">
            <p lang="hi" className="type-body text-fg">
              {lesson.quote.hi}
            </p>
            <Only lang="en">
              <span lang="en" className="mt-2 block type-small text-fg-body">
                {lesson.quote.en}
              </span>
            </Only>
          </blockquote>
        </figure>

        <div className="mt-10">
          <p id="demo-note-label" className="type-meta font-semibold text-fg">
            <Bi text={L.practiceLabel} />
          </p>
          <div className="mt-3">
            <DemoNote labelledBy="demo-note-label" />
          </div>
        </div>
      </article>
    </div>
  )
}
