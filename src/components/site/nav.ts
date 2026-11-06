import type { LocalizedText } from "@/types/career"

export interface NavItem {
  href: string
  label: LocalizedText
}

/** Site navigation. Index numbers (01, 02…) come from the order here. */
export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/careers", label: "Careers" },
]

export const siteName: LocalizedText = "Beyond the Blackboard"

/** "/" matches only itself; any other item also matches its sub-pages. */
export function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
}

export const pad = (n: number) => String(n).padStart(2, "0")
