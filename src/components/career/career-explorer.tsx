"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react"

import { CornerHandles } from "@/components/brand/corner-handles"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { careersPageCopy as copy } from "@/content/careers-page"
import { cn } from "@/lib/utils"
import {
  countChipFilters,
  filtersToSearch,
  groupByStream,
  LAST_SEARCH_KEY,
  hasActiveFilters,
  matchesFilters,
  parseFilters,
  type CareerFilters,
  type FilterableCareer,
} from "@/lib/career-filter"
import type { Interest, Stream } from "@/types/career"

/** Slim index + a server-rendered card. The full career data never reaches the browser. */
export interface ExplorerItem extends FilterableCareer {
  slug: string
  card: React.ReactNode
}

export interface Option<T extends string> {
  value: T
  label: string
}

interface ExplorerProps {
  items: ExplorerItem[]
  streamOptions: Option<Stream>[]
  interestOptions: Option<Interest>[]
}

const ALL = "all"

/** Live version: reads and writes ?q=&stream=&interest=. Must sit inside <Suspense>. */
export function CareerExplorer(props: ExplorerProps) {
  const params = useSearchParams()
  const pathname = usePathname()
  const [filters, setFilters] = React.useState<CareerFilters>(() => parseFilters(params))

  // Keep the URL shareable. replaceState: no navigation, no server round trip,
  // no history entry per keystroke. Next.js syncs it with useSearchParams.
  React.useEffect(() => {
    const next = filtersToSearch(filters)
    if (next !== window.location.search) {
      window.history.replaceState(null, "", `${pathname}${next}`)
    }
    try {
      window.sessionStorage.setItem(LAST_SEARCH_KEY, next)
    } catch {
      // Storage blocked (private mode): the back link falls back to /careers.
    }
  }, [filters, pathname])

  return <CareerExplorerView {...props} filters={filters} onChange={setFilters} />
}

/** One grid of cards. Subgrid rows keep path, title, badges and footer aligned per row. */
function CardGrid({ list, labelledBy }: { list: ExplorerItem[]; labelledBy?: string }) {
  return (
    <ul
      aria-labelledby={labelledBy}
      className="grid grid-cols-1 gap-x-[clamp(16px,2.4vw,36px)] gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {list.map((c) => (
        <li key={c.slug} className="row-span-4 grid grid-rows-subgrid gap-0">
          {c.card}
        </li>
      ))}
    </ul>
  )
}

/** Group title: mono label + count, then a hairline running to the right edge. */
function GroupHeading({ id, title, count }: { id: string; title: string; count: number }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 id={id} className="shrink-0 type-label text-fg">
        {title} <span className="text-accent">({count})</span>
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  )
}

/**
 * Shared markup. Without `onChange` it renders the static, prerendered state
 * (all careers, controls disabled) used as the Suspense fallback.
 */
export function CareerExplorerView({
  items,
  streamOptions,
  interestOptions,
  filters,
  onChange,
}: ExplorerProps & {
  filters: CareerFilters
  onChange?: (f: CareerFilters) => void
}) {
  const searchRef = React.useRef<HTMLInputElement>(null)
  const [panelOpen, setPanelOpen] = React.useState(false)
  const disabled = !onChange
  const shown = items.filter((c) => matchesFilters(c, filters))
  const active = hasActiveFilters(filters)
  const chipCount = countChipFilters(filters)
  const set = (patch: Partial<CareerFilters>) => onChange?.({ ...filters, ...patch })

  // Stream chosen: careers for that stream first, then those open to all streams.
  const stream = filters.stream && filters.stream !== "any" ? filters.stream : undefined
  const streamLabel = streamOptions.find((o) => o.value === stream)?.label ?? ""
  const groups = stream ? groupByStream(shown, stream) : undefined
  const countText = groups
    ? copy.groupedCount(streamLabel, groups.forStream.length, groups.openToAll.length)
    : copy.count(shown.length, items.length)

  const clear = () => {
    onChange?.({})
    searchRef.current?.focus()
  }

  const rowClass = "grid gap-3 border-t border-line py-5 md:grid-cols-[minmax(180px,22%)_1fr] md:gap-6"
  const rowLabelClass = "type-label text-fg md:pt-3.5"

  return (
    <div>
      {/* Filters: labelled rows with visible seams (DESIGN.md §6) */}
      <div className="bg-bg">
        <div className={rowClass}>
          <label htmlFor="career-search" className={rowLabelClass}>
            {copy.searchLabel}
          </label>
          <InputGroup className="md:max-w-md">
            <InputGroupAddon>
              <Search aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              ref={searchRef}
              id="career-search"
              type="search"
              aria-label={copy.searchInputLabel}
              placeholder={copy.searchPlaceholder}
              autoComplete="off"
              value={filters.query ?? ""}
              onChange={(e) => set({ query: e.target.value || undefined })}
              disabled={disabled}
            />
          </InputGroup>
        </div>

        {/* Below md (820px, DESIGN.md §6): stream + interest collapse behind this button. */}
        <div className="border-t border-line py-5 md:hidden">
          <Button
            variant="outline"
            className="w-full justify-between"
            aria-expanded={panelOpen}
            aria-controls="filter-panel"
            onClick={() => setPanelOpen((o) => !o)}
            disabled={disabled}
          >
            <span className="inline-flex items-center gap-2.5">
              <SlidersHorizontal aria-hidden="true" />
              {copy.filtersButton}
              {chipCount > 0 ? (
                <span className="bg-accent px-1.5 py-0.5 type-micro text-ink">
                  {copy.filtersActive(chipCount)}
                </span>
              ) : null}
            </span>
            <ChevronDown aria-hidden="true" className={cn(panelOpen && "rotate-180")} />
          </Button>
        </div>

        <div id="filter-panel" className={cn(panelOpen ? "block" : "hidden", "md:block")}>
        <div className={rowClass}>
          <p id="filter-stream" className={rowLabelClass}>
            {copy.streamLabel}
          </p>
          <ToggleGroup
            aria-labelledby="filter-stream"
            value={[filters.stream ?? "any"]}
            onValueChange={(v) => {
              const next = v[0] as Stream | undefined
              set({ stream: next && next !== "any" ? next : undefined })
            }}
            disabled={disabled}
          >
            <ToggleGroupItem value="any">{copy.anyStream}</ToggleGroupItem>
            {streamOptions.map((o) => (
              <ToggleGroupItem key={o.value} value={o.value}>
                {o.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className={rowClass}>
          <p id="filter-interest" className={rowLabelClass}>
            {copy.interestLabel}
          </p>
          <ToggleGroup
            aria-labelledby="filter-interest"
            value={[filters.interest ?? ALL]}
            onValueChange={(v) => {
              const next = v[0] as Interest | typeof ALL | undefined
              set({ interest: next && next !== ALL ? next : undefined })
            }}
            disabled={disabled}
          >
            <ToggleGroupItem value={ALL}>{copy.anyInterest}</ToggleGroupItem>
            {interestOptions.map((o) => (
              <ToggleGroupItem key={o.value} value={o.value}>
                {o.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        </div>

        {/* Result bar */}
        <div className="flex min-h-[69px] items-center justify-between gap-4 border-y border-line py-3">
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="flex gap-2 type-label text-balance text-fg"
          >
            <span className="text-accent" aria-hidden="true">
              ▮
            </span>
            <span>{countText}</span>
          </p>
          {active ? (
            <Button variant="ghost" size="sm" onClick={clear} className="-mr-3.5">
              <X aria-hidden="true" />
              {copy.clearFilters}
            </Button>
          ) : null}
        </div>
      </div>

      {shown.length > 0 && groups ? (
        <>
          <section className="pt-10">
            <GroupHeading
              id="group-stream"
              title={copy.groupStream(streamLabel)}
              count={groups.forStream.length}
            />
            {groups.forStream.length > 0 ? (
              <CardGrid list={groups.forStream} labelledBy="group-stream" />
            ) : (
              <p className="max-w-(--measure) type-body text-fg-body">
                {copy.groupStreamEmpty(streamLabel)}
              </p>
            )}
          </section>
          {groups.openToAll.length > 0 ? (
            <section className="pt-14">
              <GroupHeading
                id="group-open"
                title={copy.groupOpenToAll}
                count={groups.openToAll.length}
              />
              <CardGrid list={groups.openToAll} labelledBy="group-open" />
            </section>
          ) : null}
        </>
      ) : shown.length > 0 ? (
        <div className="pt-10">
          <CardGrid list={shown} />
        </div>
      ) : (
        <div className="pt-10">
          <div className="relative border border-line bg-surface px-[clamp(20px,3vw,48px)] py-[clamp(32px,5vw,64px)]">
            <CornerHandles />
            <p className="type-code text-[11px] text-mute">{copy.emptyLabel}</p>
            <h2 className="mt-4 type-h3 text-fg">{copy.emptyTitle(filters.query?.trim())}</h2>
            <p className="mt-3 max-w-(--measure) type-body text-fg-body">{copy.emptyHelp}</p>
            <Button onClick={clear} className="mt-8 w-full sm:w-auto">
              <X aria-hidden="true" />
              {copy.clearFilters}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
