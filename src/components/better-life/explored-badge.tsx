"use client"

import { Badge } from "@/components/ui/badge"
import type { BetterLifeSlug, Bilingual } from "@/types/better-life"

import { Bi } from "./bi"
import { useBetterLifeStore } from "./use-better-life-store"

/**
 * Left slot of a lesson card's footer. Client island.
 * Server + first client render (store unknown) and "not explored": the `openLabel` text.
 * After hydration, if this lesson is explored: the "Explored" chip instead.
 * The footer's height is set by the 44px arrow box, so the swap never shifts layout.
 */
export function ExploredBadge({
  slug,
  label,
  openLabel,
}: {
  slug: BetterLifeSlug
  label: Bilingual
  openLabel: Bilingual
}) {
  const store = useBetterLifeStore()
  if (!store?.explored.includes(slug)) {
    return (
      <span className="type-meta text-mute">
        <Bi text={openLabel} />
      </span>
    )
  }
  return (
    <Badge variant="ok">
      <Bi text={label} />
    </Badge>
  )
}
