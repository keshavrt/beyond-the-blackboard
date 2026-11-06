import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { FileTab } from "@/components/brand/file-tab"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTab,
  CardTitle,
} from "@/components/ui/card"
import { streamLabels } from "@/data/careers"
import { cn } from "@/lib/utils"
import type { Career } from "@/types/career"

function formatYears({ min, max }: Career["durationYears"]) {
  return min === max ? `${min} yrs` : `${min}–${max} yrs`
}

const PATH_STEPS = [
  ["after10th", "10th"],
  ["after12th", "12th"],
  ["course", "Study"],
  ["job", "Job"],
] as const satisfies readonly (readonly [keyof Career["path"], string])[]

/**
 * Card "art" (DESIGN.md §5.6 media area): the career's own route, 10th → job.
 * A hairline rail with square Sage nodes; labels mono, step titles sans.
 * Cards differ by content, so the grid never looks like copies.
 */
function PathStrip({ path }: { path: Career["path"] }) {
  return (
    <ol aria-label="Path" className="relative grid gap-2.5">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[3px] w-px bg-line-2" />
      {PATH_STEPS.map(([key, label], i) => {
        const last = i === PATH_STEPS.length - 1
        return (
          <li key={key} className="relative grid grid-cols-[7px_52px_1fr] items-baseline gap-x-3">
            <span
              aria-hidden="true"
              className={
                last
                  ? "size-[7px] translate-y-[-1px] bg-accent"
                  : "size-[7px] translate-y-[-1px] border border-line-2 bg-bg"
              }
            />
            <span className="type-micro text-mute">{label}</span>
            <span className={last ? "type-small font-medium text-fg" : "type-small text-fg-body"}>
              {path[key].title}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Whole card is one link (stretched ::after), so it is a single 44px+ tap target.
 * Hover: border emphasis + title turns Sage. Focus-visible: Sage ring around the card.
 */
export function CareerCard({
  career,
  index,
  className,
}: {
  career: Career
  index: number
  className?: string
}) {
  const file = `${career.slug.replace(/-/g, "_").toUpperCase()}.MD`
  return (
    <Card
      className={cn(
        "mt-3 hover:border-line-2 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent has-[a:active]:bg-surface-2",
        className
      )}
    >
      <CardTab>
        <FileTab index={index} name={file} />
      </CardTab>
      <CardHeader>
        <CardTitle className="group-hover/card:text-accent">
          <h3>
            <Link
              href={`/careers/${career.slug}`}
              className="outline-none after:absolute after:inset-0 after:content-['']"
            >
              {career.name}
            </Link>
          </h3>
        </CardTitle>
        <CardDescription>{career.oneLiner}</CardDescription>
      </CardHeader>
      {/* Visually on top (order-first), but after the name in reading order. */}
      <CardMedia className="order-first">
        {/* Photo only when the data has one; without it the path strip is the card's art. */}
        {career.image ? (
          <div className="relative aspect-4/3 overflow-hidden border-b border-line">
            <Image
              src={career.image.src}
              alt={career.image.alt}
              fill
              sizes="(min-width: 1440px) 25vw, (min-width: 820px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className={cn("px-(--card-spacing) pb-5", career.image ? "pt-5" : "pt-9")}>
          <PathStrip path={career.path} />
        </div>
      </CardMedia>
      <CardContent>
        <ul className="flex flex-wrap gap-2" aria-label="Streams">
          {career.streams.map((s) => (
            <li key={s}>
              <Badge>{streamLabels[s]}</Badge>
            </li>
          ))}
          {career.exams[0] ? (
            <li>
              <Badge variant="outline">{career.exams[0].name}</Badge>
            </li>
          ) : null}
        </ul>
      </CardContent>
      <CardFooter className="border-t justify-between gap-4">
        <dl className="flex gap-6">
          <div>
            <dt className="type-micro text-mute">Study</dt>
            <dd className="text-[15px] font-semibold text-fg tabular-nums">
              {formatYears(career.durationYears)}
            </dd>
          </div>
          <div>
            <dt className="type-micro text-mute">Start pay</dt>
            <dd className="text-[15px] font-semibold text-fg tabular-nums">
              {career.salaryRange.approximate ? "~" : ""}₹
              {(career.salaryRange.min / 1000).toFixed(0)}k/mo
            </dd>
          </div>
        </dl>
        <span
          aria-hidden="true"
          className="inline-flex size-11 items-center justify-center border border-line-2 text-fg transition-colors duration-(--dur-fast) ease-out-expo group-hover/card:border-accent group-hover/card:bg-accent group-hover/card:text-ink"
        >
          <ArrowRight className="size-4" strokeWidth={2.25} />
        </span>
      </CardFooter>
    </Card>
  )
}
