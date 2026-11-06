"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"

/*
 * DESIGN.md restyle: solid fills only (no backdrop blur = no glassmorphism),
 * no shadow, 0 radius.
 * Motion: side="full" is the §5.1 accent sheet wipe. It looks like
 * clip-path inset(0 0 100%) to inset(0), but uses transforms only: the popup
 * slides down from above while its content slides the opposite way by the same
 * amount, so the content stays still and only the edge moves (0.5s --ease-io).
 * overflow-clip, not overflow-hidden: a hidden box is still a scroll container, and
 * Base UI's initial focus would scroll it and cancel the counter-slide.
 * Other sides fade the backdrop and slide in from their edge.
 */

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-bg transition-opacity duration-(--dur) ease-out-expo",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left" | "full"
}) {
  return (
    <SheetPortal>
      {/* The full sheet covers everything itself; a backdrop would blank the page before the wipe. */}
      {side === "full" ? null : <SheetOverlay />}
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        data-lenis-prevent=""
        className={cn(
          "group/sheet fixed z-50 flex flex-col overflow-clip bg-surface text-fg outline-none",
          "transition-transform duration-(--dur) ease-out-expo",
          "data-[side=full]:duration-500 data-[side=full]:ease-(--ease-io)",
          "data-[side=full]:data-starting-style:-translate-y-full data-[side=full]:data-ending-style:-translate-y-full",
          "data-[side=top]:data-starting-style:-translate-y-full data-[side=top]:data-ending-style:-translate-y-full",
          "data-[side=bottom]:data-starting-style:translate-y-full data-[side=bottom]:data-ending-style:translate-y-full",
          "data-[side=left]:data-starting-style:-translate-x-full data-[side=left]:data-ending-style:-translate-x-full",
          "data-[side=right]:data-starting-style:translate-x-full data-[side=right]:data-ending-style:translate-x-full",
          "data-[side=full]:inset-0",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:border-b",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:border-t",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:w-3/4 data-[side=left]:border-r sm:data-[side=left]:max-w-sm",
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:w-3/4 data-[side=right]:border-l sm:data-[side=right]:max-w-sm",
          className
        )}
        {...props}
      >
        {side === "full" ? (
          <div className="flex min-h-0 flex-1 flex-col transition-transform duration-500 ease-(--ease-io) group-data-starting-style/sheet:translate-y-full group-data-ending-style/sheet:translate-y-full">
            {children}
          </div>
        ) : (
          children
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("type-label", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("type-small text-mute", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
}
