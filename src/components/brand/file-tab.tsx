import { cn } from "@/lib/utils"

/**
 * DESIGN.md §5.3 file-tab label: `01 / HELPING PEOPLE`. Accent bg, ink text, micro size.
 * Decorative (repeats info shown elsewhere), so hidden from screen readers.
 */
export function FileTab({
  index,
  name,
  className,
}: {
  index: number
  name: string
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center gap-1.5 bg-accent px-2 py-1 type-code text-[11px] leading-[1.3] text-ink",
        className
      )}
    >
      <span>{String(index).padStart(2, "0")}</span>
      <span aria-hidden="true">/</span>
      <span>{name}</span>
    </span>
  )
}
