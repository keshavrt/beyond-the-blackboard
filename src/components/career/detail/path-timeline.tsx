import { Callout } from "@/components/brand/callout"
import { Badge } from "@/components/ui/badge"
import { careerDetailCopy as copy } from "@/content/career-detail"
import { formatYears } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Career } from "@/types/career"

const STEPS = ["after10th", "after12th", "course", "job"] as const satisfies readonly (keyof Career["path"])[]

/**
 * The career's route as a vertical rail: four numbered square nodes on a 1px line.
 * Every label row is 32px tall so each node sits on its centre line (16px).
 * - Optional steps: dashed node + "Optional" tag.
 * - Course step: duration tag + the duration note as a callout.
 * - Job step: filled Sage node, the destination.
 */
export function PathTimeline({ career }: { career: Career }) {
  const { path, durationYears } = career
  return (
    <ol className="max-w-[calc(var(--measure)+56px)]">
      {STEPS.map((key, i) => {
        const step = path[key]
        const first = i === 0
        const last = i === STEPS.length - 1
        const isCourse = key === "course"
        return (
          <li
            key={key}
            className="relative grid grid-cols-[32px_1fr] gap-x-4 pb-[clamp(40px,6vh,64px)] last:pb-0 md:gap-x-6"
          >
            {/* Rail segment: joins this node to the next one. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-4 w-px -translate-x-1/2 bg-line-2",
                first ? "top-4" : "top-0",
                last ? "h-4" : "bottom-0"
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                "relative flex size-8 items-center justify-center font-mono text-xs font-bold tracking-[0.04em]",
                last
                  ? "bg-accent text-ink"
                  : step.optional
                    ? "border border-dashed border-mute bg-bg text-mute"
                    : "border border-accent bg-bg text-accent"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <div className="flex min-h-8 flex-wrap items-center gap-x-3 gap-y-2">
                <span className="type-meta font-semibold text-fg">{copy.path.stages[key]}</span>
                {step.optional ? <Badge variant="outline">{copy.path.optional}</Badge> : null}
                {isCourse ? <Badge>{`About ${formatYears(durationYears)}`}</Badge> : null}
              </div>
              <h3 className={cn("mt-3 type-h3", last ? "text-accent" : "text-fg")}>{step.title}</h3>
              <p className="mt-2 max-w-(--measure) type-body text-fg-body">{step.detail}</p>
              {isCourse && durationYears.note ? (
                <Callout title={copy.path.noteLabel} className="mt-6">
                  <p>{durationYears.note}</p>
                </Callout>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
