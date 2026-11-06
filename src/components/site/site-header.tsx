import { MobileMenu } from "./mobile-menu"
import { NavLinks } from "./nav-links"
import { Wordmark } from "./wordmark"

/**
 * DESIGN.md §5.1 top bar: grid `1fr auto 1fr`, logo left, numbered links centred.
 * Sticky + solid for now; hide-on-scroll-down arrives with the motion pass.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="grid grid-cols-[1fr_auto] items-center px-gx py-[18px] md:grid-cols-[1fr_auto_1fr]">
        <div>
          <Wordmark />
        </div>
        <nav aria-label="Main" className="hidden md:block">
          <NavLinks />
        </nav>
        <div className="flex justify-end md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
