import { SectionHeader } from "@/components/brand/section-header"
import { cn } from "@/lib/utils"

/**
 * One content section: hairline seam on top, `[0n] TITLE` on the left
 * (sticky from 1080px), content on the right. DESIGN.md §6 "sticky title + list".
 */
export function DetailSection({
  id,
  index,
  title,
  intro,
  children,
  className,
}: {
  id: string
  index: number
  title: string
  intro?: string
  children: React.ReactNode
  className?: string
}) {
  const headingId = `${id}-title`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "grid scroll-mt-24 gap-x-[clamp(16px,2.4vw,36px)] gap-y-8 border-t border-line py-[clamp(48px,8vh,96px)] lg:grid-cols-[minmax(280px,38%)_1fr]",
        className
      )}
    >
      <div className="lg:sticky lg:top-[110px] lg:self-start">
        <SectionHeader id={headingId} index={index} title={title} size="h2" />
        {intro ? (
          <p className="mt-4 max-w-[40ch] type-small text-mute">{intro}</p>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
