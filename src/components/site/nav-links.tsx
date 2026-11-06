"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { isCurrent, navItems, pad } from "./nav"

/**
 * DESIGN.md §5.1: mono labels with a Sage index prefix (`01 HOME`).
 * Current page: aria-current + fg text + Sage underline bar.
 * Hover: underline bar appears. (The scaleX wipe arrives with the motion pass.)
 */
export function NavLinks() {
  const pathname = usePathname()
  return (
    <ul className="flex items-center gap-2">
      {navItems.map((item, i) => {
        const current = isCurrent(pathname, item.href)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "group/nav relative inline-flex min-h-11 items-center gap-2 px-3 type-label",
                "text-mute hover:text-fg active:text-accent-2",
                "aria-[current=page]:text-fg"
              )}
            >
              <span className="text-[10px] text-accent">{pad(i + 1)}</span>
              <span>{item.label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 bottom-2 h-px bg-accent",
                  current ? "opacity-100" : "opacity-0 group-hover/nav:opacity-100"
                )}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
