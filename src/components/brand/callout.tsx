import { cn } from "@/lib/utils"

const tones = {
  info: "border-info",
  warn: "border-warn",
  ok: "border-ok",
  danger: "border-danger",
} as const

/** DESIGN.md §4.11: surface fill, 2px status border on the left, mono label title, sans body. */
export function Callout({
  title,
  tone = "info",
  children,
  className,
}: {
  title: string
  tone?: keyof typeof tones
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      role="note"
      className={cn("max-w-(--measure) border-l-2 bg-surface px-5 py-4", tones[tone], className)}
    >
      <p className="type-label text-fg">{title}</p>
      <div className="mt-1.5 type-body text-fg-body">{children}</div>
    </div>
  )
}
