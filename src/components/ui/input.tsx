import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

/* DESIGN.md: sharp, hairline, Sage focus. 16px text stops iOS zoom. */
const fieldBase = [
  "w-full min-w-0 border border-line-2 bg-surface text-base text-fg",
  "placeholder:text-mute",
  "transition-[border-color,background-color] duration-(--dur-fast) ease-out-expo",
  "hover:border-mute",
  "focus-visible:border-accent focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-accent",
  "disabled:cursor-not-allowed disabled:border-line disabled:bg-bg disabled:text-dim disabled:placeholder:text-dim",
  "aria-invalid:border-danger",
].join(" ")

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        fieldBase,
        "min-h-11 px-3.5 py-2",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-sans file:text-xs file:font-semibold file:text-fg file:uppercase",
        className
      )}
      {...props}
    />
  )
}

export { Input, fieldBase }
