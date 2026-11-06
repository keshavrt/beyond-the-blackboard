"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { isCurrent, navItems, pad } from "./nav"

/**
 * DESIGN.md §5.1: mono labels with a Sage index prefix (`01 HOME`).
 * Current page: aria-current + fg text + Sage underline bar.
 * Hover/focus: the bar scaleX-es in from the left and leaves to the right (§7 Underline).
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
                "text-mute transition-colors duration-(--dur-fast) ease-out-expo hover:text-fg focus-visible:text-fg active:text-accent-2",
                "aria-[current=page]:text-fg"
              )}
            >
              <span className="type-code text-[10px] text-accent">{pad(i + 1)}</span>
              <span>{item.label}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 bottom-2 h-px bg-accent transition-transform duration-(--dur) ease-out-expo",
                  current
                    ? "scale-x-100"
                    : "origin-right scale-x-0 group-hover/nav:origin-left group-hover/nav:scale-x-100 group-focus-visible/nav:origin-left group-focus-visible/nav:scale-x-100"
                )}
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
