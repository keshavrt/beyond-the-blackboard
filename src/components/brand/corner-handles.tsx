import { cn } from "@/lib/utils"

/** DESIGN.md §5.6: 5×5 fg squares centred on a frame's four corners. Parent must be `relative`. */
export function CornerHandles({ className }: { className?: string }) {
  const base = "pointer-events-none absolute size-[5px] bg-fg"
  return (
    <span aria-hidden="true" className={cn("contents", className)}>
      <span className={cn(base, "-top-[3px] -left-[3px]")} />
      <span className={cn(base, "-top-[3px] -right-[3px]")} />
      <span className={cn(base, "-bottom-[3px] -left-[3px]")} />
      <span className={cn(base, "-right-[3px] -bottom-[3px]")} />
    </span>
  )
}
