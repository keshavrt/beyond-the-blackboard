import { cn } from "@/lib/utils"

/**
 * A marketing-style section: full-width seam on top (DESIGN.md §6 "seams visible"),
 * gutters, and the section rhythm `clamp(100px, 16vh, 180px)` (tighter on phones).
 */
export function HomeSection({
  labelledBy,
  className,
  children,
}: {
  labelledBy: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(
        "border-t border-line px-gx py-[clamp(72px,12vh,140px)] md:py-[clamp(100px,16vh,180px)]",
        className,
      )}
    >
      {children}
    </section>
  )
}
