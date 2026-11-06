import Link from "next/link"

import { cn } from "@/lib/utils"
import { siteName } from "./nav"

/** Boxed `BTB` mark + mono name. `tone="ink"` for use on the Sage menu sheet. */
export function Wordmark({
  tone = "default",
  onNavigate,
}: {
  tone?: "default" | "ink"
  onNavigate?: () => void
}) {
  const ink = tone === "ink"
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={cn(
        "group/logo inline-flex min-h-11 items-center gap-3 type-label",
        ink ? "text-ink" : "text-fg transition-colors duration-(--dur-fast) ease-out-expo hover:text-accent active:text-accent-2"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "px-1.5 py-0.5 font-bold tracking-[0.04em]",
          ink
            ? "bg-ink text-accent"
            : "bg-accent text-ink transition-[background-color,rotate,scale] duration-(--dur) ease-out-expo group-hover/logo:-rotate-6 group-hover/logo:scale-[1.06] group-hover/logo:bg-fg group-focus-visible/logo:bg-fg"
        )}
      >
        BTB
      </span>
      <span>{siteName}</span>
    </Link>
  )
}
