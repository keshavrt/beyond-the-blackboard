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
  CardTab,
  CardTitle,
} from "@/components/ui/card"
import { streamLabels } from "@/data/careers"
import type { Career } from "@/types/career"

function formatYears({ min, max }: Career["durationYears"]) {
  return min === max ? `${min} yrs` : `${min}–${max} yrs`
}

/**
 * Whole card is one link (stretched ::after), so it is a single 44px+ tap target.
 * Hover: border emphasis + title turns Sage. Focus-visible: Sage ring around the card.
 */
export function CareerCard({ career, index }: { career: Career; index: number }) {
  const file = `${career.slug.replace(/-/g, "_").toUpperCase()}.MD`
  return (
    <Card
      className={
        "mt-3 hover:border-line-2 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent has-[a:active]:bg-surface-2"
      }
    >
      <CardTab>
        <FileTab index={index} name={file} />
      </CardTab>
      <CardHeader className="pt-8">
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
            <dd className="font-mono text-sm font-bold text-fg">
              {formatYears(career.durationYears)}
            </dd>
          </div>
          <div>
            <dt className="type-micro text-mute">Start pay</dt>
            <dd className="font-mono text-sm font-bold text-fg tabular-nums">
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
