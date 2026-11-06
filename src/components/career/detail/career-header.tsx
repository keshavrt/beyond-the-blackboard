import Image from "next/image"
import Link from "next/link"

import { CornerHandles } from "@/components/brand/corner-handles"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { careerDetailCopy as copy } from "@/content/career-detail"
import { interestLabels, streamLabels } from "@/data/careers"
import { durationCountedFrom, formatDate, formatINRRangeShort, formatYears } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Career } from "@/types/career"

import { BackToCareers } from "./back-to-careers"

function Fact({ label, value, tag }: { label: string; value: string; tag?: string }) {
  return (
    <div className="flex flex-col gap-3 p-5 not-first:border-t sm:not-first:border-t-0 sm:not-first:border-l md:p-7">
      <dt className="flex flex-wrap items-center gap-x-2 gap-y-1 type-meta text-mute">
        {label}
        {tag ? <span className="text-warn">({tag})</span> : null}
      </dt>
      <dd className="text-[clamp(26px,2.8vw,40px)] leading-none font-semibold tracking-[-0.035em] text-fg tabular-nums">
        {value}
      </dd>
    </div>
  )
}

export function CareerHeader({ career }: { career: Career }) {
  const from = durationCountedFrom(career)
  const exam = career.exams[0]?.name
  const streams = career.streams.filter((s) => s !== "any")
  const openToAll = career.streams.includes("any")

  return (
    <header className="pb-[clamp(48px,8vh,96px)]">
      <div className="flex flex-wrap items-center justify-between gap-x-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/careers" />}>
                {copy.breadcrumbRoot}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{career.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <BackToCareers label={copy.back} />
      </div>

      {/* With a photo: title left, photo right (stacks on phones, title first).
          Without one: the single title column, no placeholder. */}
      <div
        className={cn(
          "mt-[clamp(32px,6vh,64px)]",
          career.image && "grid gap-8 md:grid-cols-[1fr_minmax(300px,40%)] md:items-end md:gap-12",
        )}
      >
        <div>
          <h1 className="type-display-l text-fg">{career.name}</h1>
          <p className="mt-6 max-w-(--measure) type-lead text-fg-body md:mt-8">{career.oneLiner}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            <ul className="contents" aria-label={copy.streamsLabel}>
              {streams.map((s) => (
                <li key={s}>
                  <Badge render={<Link href={`/careers?stream=${s}`} />}>{streamLabels[s]}</Badge>
                </li>
              ))}
              {openToAll ? (
                <li>
                  <Badge render={<Link href="/careers" />}>{copy.anyStream}</Badge>
                </li>
              ) : null}
            </ul>
            <ul className="contents" aria-label={copy.interestsLabel}>
              {career.interests.map((i) => (
                <li key={i}>
                  <Badge variant="outline" render={<Link href={`/careers?interest=${i}`} />}>
                    {interestLabels[i]}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 type-meta text-balance text-mute">{copy.lastChecked(formatDate(career.lastVerified))}</p>
        </div>
        {career.image ? (
          <div className="relative aspect-4/3 overflow-hidden border border-line bg-surface">
            {/* Above the fold, likely the LCP: load eagerly (Next 16 prefers this to `preload`). */}
            <Image
              src={career.image.src}
              alt={career.image.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 820px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>

      <div className="relative mt-[clamp(40px,6vh,64px)] border border-line bg-surface">
        <CornerHandles />
        <dl aria-label={copy.facts.label} className="grid sm:grid-cols-3">
          <Fact
            label={from === "10th" ? copy.facts.studyAfter10th : copy.facts.studyAfter12th}
            value={formatYears(career.durationYears)}
          />
          <Fact
            label={copy.facts.startPay}
            tag={career.salaryRange.approximate ? copy.facts.approx : undefined}
            value={formatINRRangeShort(career.salaryRange.min, career.salaryRange.max)}
          />
          <Fact label={copy.facts.howIn} value={exam ?? copy.facts.noExam} />
        </dl>
      </div>
    </header>
  )
}
