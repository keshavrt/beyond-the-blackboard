import type { Metadata } from "next"
import { Suspense } from "react"

import { Bi } from "@/components/better-life/bi"
import { Notebook, NotebookView } from "@/components/better-life/notebook"
import { ResetNotebook } from "@/components/better-life/reset-notebook"
import { Callout } from "@/components/brand/callout"
import { Badge } from "@/components/ui/badge"
import { betterLifeLabels as L, betterLifeMeta } from "@/content/better-life"

export const metadata: Metadata = betterLifeMeta.notebook

/**
 * /my-better-life/notebook: cover + 7 workshop pages, saved in this browser.
 * Static page. The current page comes from ?page=0..7 (read client-side inside <Suspense>,
 * like the careers explorer); the prerendered fallback is the cover.
 */
export default function NotebookPage() {
  return (
    <div className="px-gx pt-[clamp(48px,10vh,120px)] pb-[clamp(64px,10vh,120px)]">
      <header className="pb-10 md:pb-14">
        <p className="type-label text-mute">
          <Bi text={L.bookEyebrow} />
        </p>
        <h1 className="mt-4 type-display-l text-fg">
          <Bi text={L.bookTitle} />
        </h1>
        <p className="mt-6 max-w-(--measure) type-lead text-fg-body md:mt-8">
          <Bi text={L.bookLead} />
        </p>
        <Badge variant="outline" dot="static" className="mt-6">
          <Bi text={L.bookStamp} />
        </Badge>
      </header>

      <Suspense fallback={<NotebookView page={0} />}>
        <Notebook />
      </Suspense>

      <div className="mt-12 grid gap-8 md:grid-cols-[minmax(200px,24%)_minmax(0,1fr)] md:gap-x-[clamp(16px,2.4vw,36px)]">
        <div className="grid gap-6 md:col-start-2">
          <Callout tone="info" title={<Bi text={L.yourBookLabel} />}>
            <Bi text={L.privacy} />
          </Callout>
          <ResetNotebook />
        </div>
      </div>
    </div>
  )
}
