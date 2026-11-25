import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * "← Back to the journey", "← Previous: <lesson>". Same look as BackToCareers
 * (type-label, Sage underline grow, 44px target) without its sessionStorage logic.
 * DESIGN.md §5.8: ← goes back; forward links use → (Button arrow="internal").
 */
export function BackLink({
  href,
  tone = "label",
  children,
}: {
  href: string
  /** "label": short uppercase chrome (1 to 4 words). "meta": sentence case, for longer text
   *  like "Previous: <lesson title>" (DESIGN.md: no all-caps beyond ~4 words). */
  tone?: "label" | "meta"
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/back inline-flex min-h-11 items-center gap-2 text-fg transition-colors duration-(--dur-fast) ease-out-expo hover:text-accent active:text-accent-2",
        tone === "label" ? "type-label" : "type-meta font-semibold"
      )}
    >
      <ArrowLeft
        aria-hidden="true"
        strokeWidth={2.25}
        className="size-4 shrink-0 transition-transform duration-(--dur) ease-out-expo group-hover/back:-translate-x-1 group-focus-visible/back:-translate-x-1"
      />
      <span className="link-line">{children}</span>
    </Link>
  )
}
