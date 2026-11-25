import { HeaderShell } from "./header-shell"
import { MobileMenu } from "./mobile-menu"
import { NavLinks } from "./nav-links"
import { Wordmark } from "./wordmark"

/**
 * DESIGN.md §5.1 top bar: grid `1fr auto 1fr`, logo left, numbered links centred.
 * Sticky and solid; HeaderShell hides it on scroll down and brings it back on scroll up.
 */
export function SiteHeader() {
  return (
    <HeaderShell>
      {/* 820 to 1079: `auto 1fr auto` so the wordmark keeps its one-line width (228px) and the
          3 nav items centre in the remaining space (with 1fr auto 1fr the side columns are
          only ~200px at 820 and the wordmark wraps). From 1080: the exact §5.1 1fr auto 1fr. */}
      <div className="grid grid-cols-[1fr_auto] items-center px-gx py-[18px] md:grid-cols-[auto_1fr_auto] md:gap-x-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-0">
        <div>
          <Wordmark />
        </div>
        <nav aria-label="Main" className="hidden md:block md:justify-self-center">
          <NavLinks />
        </nav>
        <div className="flex justify-end md:hidden">
          <MobileMenu />
        </div>
      </div>
    </HeaderShell>
  )
}
