import * as React from "react"
import { cn } from "cn"

import { CornerHandles } from "@/components/brand/corner-handles"

/* DESIGN.md §5.6 frame: 1px line border, 0 radius, solid fill, corner handles. */
function Card({
  className,
  size = "default",
  handles = true,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
  /** Show the four 5×5 corner handles. */
  handles?: boolean
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card relative flex flex-col border border-line bg-surface text-fg-body",
        "[--card-spacing:clamp(20px,2vw,28px)] data-[size=sm]:[--card-spacing:16px]",
        "transition-[border-color] duration-(--dur-fast) ease-out-expo",
        className
      )}
      {...props}
    >
      {handles ? <CornerHandles /> : null}
      {children}
    </div>
  )
}

/** Sits on the card's top border, top-left. Pair with <FileTab>. */
function CardTab({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-tab"
      className={cn(
        "absolute top-0 left-(--card-spacing) z-10 -translate-y-1/2",
        className
      )}
      {...props}
    />
  )
}

/** Art / media area on top, separated from content by a hairline. */
function CardMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-media"
      className={cn("border-b border-line bg-bg", className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-2 px-(--card-spacing) pt-(--card-spacing)",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "[.border-b]:border-line [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "type-h3 text-fg transition-colors duration-(--dur-fast) ease-out-expo group-data-[size=sm]/card:type-h4",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("type-body text-fg-body", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "flex flex-col gap-3 px-(--card-spacing) pt-4 last:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-auto flex items-center px-(--card-spacing) pt-4 pb-(--card-spacing)",
        "[.border-t]:mt-(--card-spacing) [.border-t]:border-line",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardTab,
  CardMedia,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
