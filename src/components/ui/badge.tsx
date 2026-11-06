import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/* DESIGN.md §5.5 tag/chip: mono 12/700 +0.14em, 7px 12px, line-2 border, solid surface-2. No blur. */
const badgeVariants = cva(
  [
    "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-2 border px-3 py-[7px] whitespace-nowrap",
    "text-xs leading-none font-semibold tracking-[0.08em] uppercase",
    "transition-[color,background-color,border-color] duration-(--dur-fast) ease-out-expo",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    "[a]:cursor-pointer [a]:hover:border-accent [a]:active:bg-surface",
    /* Link chips: invisible hit area brings the tap target to 44px. */
    "[a]:relative [a]:before:absolute [a]:before:inset-x-0 [a]:before:-inset-y-2 [a]:before:content-['']",
    "[&>svg]:pointer-events-none [&>svg]:size-3!",
  ],
  {
    variants: {
      variant: {
        default: "border-line-2 bg-surface-2 text-fg",
        /** Sage fill: use once per screen at most. */
        accent: "border-accent bg-accent text-ink [a]:hover:bg-fg [a]:hover:border-fg",
        outline: "border-line-2 bg-transparent text-fg",
        ok: "border-line-2 bg-surface-2 text-ok",
        info: "border-line-2 bg-surface-2 text-info",
        warn: "border-line-2 bg-surface-2 text-warn",
        danger: "border-line-2 bg-surface-2 text-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  dot,
  render,
  children,
  ...props
}: useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    /** Leading 8×8 Sage square. "live" will blink once motion lands. */
    dot?: "static" | "live"
  }) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
        children: (
          <>
            {dot ? (
              <span
                aria-hidden="true"
                data-live={dot === "live" ? "" : undefined}
                className={cn(
                  "size-2 shrink-0",
                  variant === "accent" ? "bg-ink" : "bg-accent"
                )}
              />
            ) : null}
            {children}
          </>
        ),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
