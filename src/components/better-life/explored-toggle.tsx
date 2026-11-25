"use client"

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { betterLifeLabels as L } from "@/content/better-life"
import { toggleExplored } from "@/lib/better-life-storage"
import { cn } from "@/lib/utils"
import type { BetterLifeSlug } from "@/types/better-life"

import { Bi } from "./bi"
import { useBetterLifeStore } from "./use-better-life-store"

/**
 * "Mark this lesson as explored" / "Marked as explored". Client island.
 * Both labels share one grid cell, so the button is always as wide as the longer one:
 * toggling never moves anything. Before hydration (store unknown) the button is
 * `invisible`: space reserved, not focusable, never a wrong state.
 */
export function ExploredToggle({ slug }: { slug: BetterLifeSlug }) {
  const store = useBetterLifeStore()
  const known = store !== null
  const explored = known && store.explored.includes(slug)

  return (
    <Button
      variant="outline"
      aria-pressed={explored}
      onClick={() => toggleExplored(slug)}
      className={cn(!known && "invisible", explored && "border-accent")}
    >
      {/* One grid cell holds both states (tick + "Marked as explored" / "Mark this lesson
          as explored"): the cell is as wide as the wider state, so nothing ever moves. */}
      <span className="grid">
        <span className={cn("[grid-area:1/1] inline-flex items-center justify-center", explored && "invisible")}>
          <Bi text={L.markDone} />
        </span>
        <span
          className={cn("[grid-area:1/1] inline-flex items-center justify-center gap-2", !explored && "invisible")}
        >
          <Check aria-hidden="true" strokeWidth={2.5} className="text-accent" />
          <Bi text={L.lessonDone} />
        </span>
      </span>
    </Button>
  )
}
