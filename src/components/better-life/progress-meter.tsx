"use client"

import { cn } from "@/lib/utils"
import type { Bilingual } from "@/types/better-life"

import { Bi } from "./bi"
import { useBetterLifeStore } from "./use-better-life-store"

const pad = (n: number) => String(n).padStart(2, "0")

/**
 * "03 / 07 Lessons explored" + a hairline bar. Client island.
 * Before hydration (store unknown) the numerator and the fill are rendered but
 * `invisible`: their space is reserved (no layout shift) and no wrong number is ever shown.
 * The fill is a full-width bar scaled on X (no layout property, no transition).
 */
export function ProgressMeter({
  total,
  label,
  className,
}: {
  total: number
  label: Bilingual
  className?: string
}) {
  const store = useBetterLifeStore()
  const known = store !== null
  const count = known ? Math.min(store.explored.length, total) : 0

  return (
    <div className={cn("w-full max-w-60", className)}>
      <p className="flex items-baseline gap-2 tabular-nums">
        <span className={cn("text-[clamp(32px,3vw,44px)] leading-none font-semibold text-fg", !known && "invisible")}>
          {pad(count)}
        </span>
        {/* Read as "03 / 07" in both languages: no English-only screen reader text. */}
        <span className="text-lg leading-none font-semibold text-mute">/ {pad(total)}</span>
      </p>
      <p className="mt-2 type-meta text-mute">
        <Bi text={label} />
      </p>
      <div aria-hidden="true" className="mt-3 h-0.5 w-full overflow-hidden bg-line-2">
        <div
          className={cn("h-full w-full origin-left bg-accent", !known && "invisible")}
          style={{ transform: `scaleX(${count / total})` }}
        />
      </div>
    </div>
  )
}
