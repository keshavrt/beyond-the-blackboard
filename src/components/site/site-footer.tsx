import { siteName } from "./nav"

/** Kept simple for the MVP; the full §5.10 four-column footer comes later. */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="flex flex-col gap-3 px-gx py-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <p className="type-label text-fg">
          {siteName} · IIT Roorkee · Community Outreach{" "}
          <span className="text-accent">(MIC-399)</span>
        </p>
        <p className="max-w-(--measure) type-small text-mute lg:text-right">
          Career facts are checked against official sources, but rules and fees
          change. Salaries are approximate. Always confirm on the official website
          before you apply.
        </p>
      </div>
    </footer>
  )
}
