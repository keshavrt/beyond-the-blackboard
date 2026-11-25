import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { FileTab } from "@/components/brand/file-tab"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTab,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { BetterLifeSlug, Bilingual } from "@/types/better-life"

import { Bi } from "./bi"
import { ExploredBadge } from "./explored-badge"

/**
 * A My Better Life card, built like CareerCard (DESIGN.md §5.6) minus the media row:
 * 3 subgrid rows (header, description, footer). The whole card is one link (stretched
 * ::after, -inset-px so the border counts). Decoration painted after the link (tab,
 * arrow box) is pointer-events-none so clicks reach the link.
 * Hover: border emphasis, title turns Sage, Sage fill rises in the arrow box.
 */
export function LessonCard({
  href,
  index,
  tab,
  title,
  subtitle,
  description,
  explored,
  className,
}: {
  href: string
  /** Lesson number (01 to 07). Omit for the notebook card. */
  index?: number
  tab: Bilingual
  title: Bilingual
  subtitle?: Bilingual
  description: Bilingual
  /** Show the "explored" chip for this lesson (client island). */
  explored?: { slug: BetterLifeSlug; label: Bilingual; openLabel: Bilingual }
  className?: string
}) {
  return (
    <Card
      className={cn(
        "fill-host mt-3 hover:border-line-2 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent has-[a:active]:bg-surface-2",
        className
      )}
    >
      <CardTab className="pointer-events-none">
        <FileTab index={index} name={<Bi text={tab} />} />
      </CardTab>
      <CardHeader className="pt-9">
        <CardTitle className="group-hover/card:text-accent">
          <h3 className="text-inherit">
            <Link
              href={href}
              className="outline-none after:absolute after:-inset-px after:content-['']"
            >
              <Bi text={title} />
            </Link>
          </h3>
        </CardTitle>
        {subtitle ? (
          <p className="type-meta text-mute">
            <Bi text={subtitle} />
          </p>
        ) : null}
      </CardHeader>
      <CardDescription className="max-w-(--measure) px-(--card-spacing) pt-3">
        <Bi text={description} />
      </CardDescription>
      <CardFooter className="justify-between gap-4 border-t">
        <div className="min-w-0">
          {explored ? (
            <ExploredBadge slug={explored.slug} label={explored.label} openLabel={explored.openLabel} />
          ) : null}
        </div>
        <span
          aria-hidden="true"
          className="fill-rise pointer-events-none inline-flex size-11 shrink-0 items-center justify-center border border-line-2 text-fg transition-colors duration-(--dur-fast) ease-out-expo [--fill:var(--accent)] group-hover/card:border-accent group-hover/card:text-ink group-has-[a:focus-visible]/card:border-accent group-has-[a:focus-visible]/card:text-ink"
        >
          <ArrowRight
            className="size-4 transition-transform duration-(--dur) ease-out-expo group-hover/card:translate-x-1 group-has-[a:focus-visible]/card:translate-x-1"
            strokeWidth={2.25}
          />
        </span>
      </CardFooter>
    </Card>
  )
}
