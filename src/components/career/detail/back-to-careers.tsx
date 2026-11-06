"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { LAST_SEARCH_KEY } from "@/lib/career-filter"

const noop = () => () => {}

function readSearch(): string {
  try {
    const s = window.sessionStorage.getItem(LAST_SEARCH_KEY) ?? ""
    // Only ever a query string we wrote ourselves.
    return s.startsWith("?") ? s : ""
  } catch {
    return ""
  }
}

/**
 * "← Back to careers". Server HTML links to /careers; after hydration it
 * restores the filters the student last used on the list (if any).
 */
export function BackToCareers({ label }: { label: string }) {
  const search = React.useSyncExternalStore(noop, readSearch, () => "")
  return (
    <Link
      href={`/careers${search}`}
      className="group/back inline-flex min-h-11 items-center gap-2 type-label text-fg transition-colors duration-(--dur-fast) ease-out-expo hover:text-accent active:text-accent-2"
    >
      <ArrowLeft
        aria-hidden="true"
        strokeWidth={2.25}
        className="size-4 transition-transform duration-(--dur) ease-out-expo group-hover/back:-translate-x-1 group-focus-visible/back:-translate-x-1"
      />
      <span className="link-line">{label}</span>
    </Link>
  )
}
