"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { CornerHandles } from "@/components/brand/corner-handles"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { betterLifeLabels as L, notebookPages } from "@/content/better-life"
import { cn } from "@/lib/utils"
import type { NotebookPage } from "@/types/better-life"

import { BackLink } from "./back-link"
import { Bi } from "./bi"
import { SavedField } from "./saved-field"

const BASE = "/my-better-life/notebook"
const LAST = notebookPages.length - 1
const pad = (n: number) => String(n).padStart(2, "0")
const hrefFor = (n: number) => `${BASE}?page=${n}`

/** "?page=3" → 3. Anything else (missing, 99, -1, "abc", "2.5") → 0, the cover. */
export function parsePage(raw: string | null): number {
  if (raw === null || !/^\d+$/.test(raw)) return 0
  const n = Number(raw)
  return n >= 0 && n <= LAST ? n : 0
}

/** Live notebook: reads ?page. Must sit inside <Suspense> (the static fallback is the cover). */
export function Notebook() {
  const page = parsePage(useSearchParams().get("page"))
  return <NotebookView page={page} />
}

/**
 * Page list + paper. Switching pages = links to ?page=N (soft navigation, so the back
 * button works; scroll={false}, then the paper is scrolled into view only if it's above).
 */
export function NotebookView({ page }: { page: number }) {
  const def = notebookPages[page]
  const paperRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const prevPage = useRef(page)

  useEffect(() => {
    // Keep the active tab visible in the phone's horizontal row (no page scroll).
    const active = listRef.current?.querySelector<HTMLElement>('[aria-current="page"]')
    const row = listRef.current
    if (active && row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: active.offsetLeft - row.clientWidth / 2 + active.offsetWidth / 2 })
    }
    if (prevPage.current === page) return
    prevPage.current = page
    const paper = paperRef.current
    if (paper && paper.getBoundingClientRect().top < 0) {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
      paper.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" })
    }
  }, [page])

  return (
    <div className="grid gap-x-[clamp(16px,2.4vw,36px)] gap-y-6 md:grid-cols-[minmax(200px,24%)_minmax(0,1fr)]">
      <PageList active={page} listRef={listRef} />
      <article
        ref={paperRef}
        aria-labelledby="notebook-page-title"
        // Each page fits its content. Trade-off (accepted): a hard reload of a ?page=N deep link
        // swaps the cover fallback for that page after hydration, a small shift. Plain /notebook
        // loads the cover (no shift) and links from lessons are client navigations.
        className="relative flex scroll-mt-24 flex-col border border-line bg-surface p-[clamp(20px,3vw,36px)]"
      >
        <CornerHandles />
        <Paper def={def} />
      </article>
    </div>
  )
}

function PageList({ active, listRef }: { active: number; listRef: React.RefObject<HTMLOListElement | null> }) {
  return (
    // min-w-0: a grid item defaults to min-width:auto, which would let the unwrapped
    // phone row widen the column (and the page) instead of scrolling inside itself.
    <nav aria-labelledby="notebook-pages-label" className="min-w-0 lg:sticky lg:top-27.5 lg:self-start">
      <span id="notebook-pages-label" className="sr-only">
        <Bi text={L.notebookPagesLabel} />
      </span>
      {/* < 820px: a horizontal row above the paper, bleeding to the screen edges so it never
          widens the page. Visible seams + the site's thin scrollbar. >= 820px: a vertical list. */}
      <ol
        ref={listRef}
        // scroll-px: focusing a tab scrolls it fully clear of the edge padding.
        className="-mx-(--gx) flex scroll-px-(--gx) overflow-x-auto border-y border-line px-(--gx) md:mx-0 md:flex-col md:overflow-visible md:border-y-0 md:border-t md:px-0"
      >
        {notebookPages.map((p) => {
          const current = p.page === active
          return (
            <li key={p.page} className="shrink-0 border-r border-line first:border-l md:border-r-0 md:border-b md:first:border-l-0">
              <Link
                href={hrefFor(p.page)}
                scroll={false}
                // Chrome only scrolls a focused element if it's fully hidden; a half-visible tab
                // in the phone row would stay cut off. Bring it fully into view (no page jump).
                onFocus={(e) => e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" })}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "relative flex min-h-11 items-center gap-3 px-4 py-2.5 whitespace-nowrap type-meta transition-colors duration-(--dur-fast) ease-out-expo md:whitespace-normal md:px-3",
                  "outline-accent focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2",
                  current
                    ? "bg-surface font-semibold text-fg before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-accent md:before:inset-x-auto md:before:inset-y-0 md:before:left-0 md:before:h-auto md:before:w-0.5"
                    : "text-mute hover:bg-surface hover:text-fg active:bg-surface-2"
                )}
              >
                <span aria-hidden="true" className={cn("type-code text-[11px]", current ? "text-accent" : "text-mute")}>
                  {pad(p.page)}
                </span>
                <Bi text={p.title} />
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function Paper({ def }: { def: NotebookPage }) {
  const n = def.page
  const id = (s: string) => `nb-${n}-${s}`
  const two = def.fields.length === 2 && n === 6

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <p className="type-label text-mute">
          {n === 0 ? (
            <Bi text={L.coverTitle} />
          ) : (
            <>
              <Bi text={L.pageLabel} /> <span className="tabular-nums">{pad(n)} / {pad(LAST)}</span>
            </>
          )}
        </p>
        <Badge variant="outline">
          <Bi text={def.instrument.label} />
        </Badge>
      </div>

      <h2 id="notebook-page-title" className="mt-6 type-h2 text-fg">
        <Bi text={def.title} />
      </h2>
      <p className="mt-3 max-w-(--measure) type-body text-fg-body">
        <Bi text={def.description} />
      </p>

      <div className={cn("mt-8 grid gap-7", two && "md:grid-cols-2 md:gap-x-6")}>
        {def.fields.map((f) => (
          <div key={f.key} className="min-w-0">
            <p id={id(`${f.key}-label`)} className="type-meta font-semibold text-fg">
              <Bi text={f.label} />
            </p>
            {f.hint ? (
              <p id={id(`${f.key}-hint`)} className="mt-1 type-small text-mute">
                <Bi text={f.hint} />
              </p>
            ) : null}
            <div className="mt-3">
              <SavedField
                fieldKey={`notebook:${f.key}`}
                labelledBy={id(`${f.key}-label`)}
                describedBy={f.hint ? id(`${f.key}-hint`) : undefined}
                placeholder={L.writeHere}
                multiline={f.multiline}
              />
            </div>
          </div>
        ))}
      </div>

      {n === 0 ? (
        <p className="mt-6 type-small text-mute">
          <Bi text={L.coverNote} />
        </p>
      ) : null}

      <div className="pt-10">
        <div className="border-t border-line pt-5">
          <p className="type-small text-mute">
            <Bi text={L.pageSaved} />
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            {n > 0 ? (
              <BackLink href={hrefFor(n - 1)} tone="meta" scroll={false}>
                <Bi text={L.prevPage} />
              </BackLink>
            ) : (
              <span />
            )}
            <Button
              variant="outline"
              arrow="internal"
              nativeButton={false}
              render={n < LAST ? <Link href={hrefFor(n + 1)} scroll={false} /> : <Link href="/my-better-life" />}
            >
              <Bi text={n < LAST ? L.nextPage : L.returnToJourney} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
