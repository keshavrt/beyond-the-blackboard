"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/* Sans 14px sentence-case toggles (students read these); pressed = Sage fill + ink text (DESIGN.md §2 accent rules). */
const toggleVariants = cva(
  [
    "group/toggle inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap select-none",
    "text-sm font-medium text-mute",
    "transition-[color,background-color,border-color] duration-(--dur-fast) ease-out-expo",
    "hover:bg-surface-2 hover:text-fg active:bg-surface",
    "aria-pressed:bg-accent aria-pressed:text-ink aria-pressed:hover:bg-accent aria-pressed:active:bg-accent-2",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:text-dim data-disabled:pointer-events-none data-disabled:text-dim",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-line-2 bg-bg",
      },
      size: {
        default: "min-h-11 min-w-11 px-4",
        sm: "min-h-11 min-w-11 px-3",
        lg: "min-h-13 min-w-13 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
