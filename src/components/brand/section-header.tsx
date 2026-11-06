import { cn } from "@/lib/utils"

/** Zero-padded index in square brackets: `[02]`. DESIGN.md §5.2. */
export function SectionIndex({
  index,
  className,
}: {
  index: number
  className?: string
}) {
  return (
    <span
      className={cn(
        "type-code text-[13px] leading-none text-accent",
        className
      )}
    >
      [{String(index).padStart(2, "0")}]
    </span>
  )
}

/**
 * `[02]  GUIDES`: index top-aligned to the title's cap height.
 * `highlight` wraps the last word in a Sage box (DESIGN.md §5.2 variant).
 */
export function SectionHeader({
  index,
  title,
  highlight,
  size = "l",
  as: Tag = "h2",
  id,
  className,
}: {
  index: number
  title: string
  highlight?: string
  size?: "xl" | "l" | "h2"
  as?: "h1" | "h2" | "h3"
  id?: string
  className?: string
}) {
  const sizeClass =
    size === "xl" ? "type-display-xl" : size === "l" ? "type-display-l" : "type-h2"
  return (
    <div data-reveal="" className={cn("flex items-start gap-4 md:gap-6", className)}>
      <SectionIndex index={index} className="mt-[0.35em] shrink-0" />
      <Tag id={id} className={cn(sizeClass, "text-fg")}>
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="inline-block bg-accent px-[0.1em] pt-[0.02em] pb-[0.1em] leading-none text-ink">{highlight}</span>
          </>
        ) : null}
      </Tag>
    </div>
  )
}
