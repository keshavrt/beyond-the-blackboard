import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* DESIGN.md §5.4: sharp, sans label, Sage primary, ≥44px targets. */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 border border-transparent",
    "font-sans font-semibold tracking-[-0.005em] whitespace-nowrap select-none",
    "transition-[color,background-color,border-color] duration-(--dur-fast) ease-out-expo",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
    "disabled:pointer-events-none data-disabled:pointer-events-none aria-disabled:pointer-events-none",
    "aria-invalid:border-danger",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-accent text-ink",
          "hover:bg-fg active:bg-accent-2",
          "disabled:border-line disabled:bg-surface-2 disabled:text-dim",
          "data-disabled:border-line data-disabled:bg-surface-2 data-disabled:text-dim",
        ],
        outline: [
          "border-line-2 bg-transparent text-fg",
          "hover:border-accent hover:bg-surface-2 active:bg-surface aria-expanded:border-accent",
          "disabled:border-line disabled:text-dim data-disabled:border-line data-disabled:text-dim",
        ],
        ghost: [
          "bg-transparent text-fg",
          "hover:bg-surface-2 active:bg-surface aria-expanded:bg-surface-2",
          "disabled:text-dim data-disabled:text-dim",
        ],
        destructive: [
          "border-danger bg-transparent text-danger",
          "hover:bg-danger hover:text-ink active:opacity-90",
          "disabled:border-line disabled:text-dim data-disabled:border-line data-disabled:text-dim",
        ],
        link: [
          "min-h-11 px-0 text-fg underline decoration-accent decoration-1 underline-offset-[3px]",
          "hover:text-accent hover:decoration-2 active:text-accent-2",
          "disabled:text-dim disabled:decoration-dim data-disabled:text-dim",
        ],
      },
      size: {
        sm: "min-h-11 px-3.5 py-2.5 text-[13px]",
        default: "min-h-11 px-5 py-3 text-[15px]",
        lg: "min-h-15 px-6.5 py-5 text-[clamp(16px,1.2vw,18px)]",
        icon: "size-11",
        "icon-sm": "size-11 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-15 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    compoundVariants: [{ variant: "link", className: "px-0" }],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonArrow = "external" | "internal"

function Button({
  className,
  variant = "default",
  size = "default",
  arrow,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /** Trailing ↗ (external) or → (internal), nudging on hover. */
    arrow?: ButtonArrow
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {arrow ? <ButtonArrowIcon arrow={arrow} /> : null}
    </ButtonPrimitive>
  )
}

function ButtonArrowIcon({ arrow }: { arrow: ButtonArrow }) {
  const Icon = arrow === "external" ? ArrowUpRight : ArrowRight
  return (
    <Icon
      aria-hidden="true"
      data-icon="inline-end"
      strokeWidth={2.25}
      className={cn(
        "transition-transform duration-(--dur) ease-out-expo",
        arrow === "external"
          ? "group-hover/button:translate-x-[3px] group-hover/button:-translate-y-[3px]"
          : "group-hover/button:translate-x-1"
      )}
    />
  )
}

export { Button, buttonVariants, ButtonArrowIcon }
