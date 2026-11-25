import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { betterLifeLabels as L } from "@/content/better-life"
import type { Lesson } from "@/types/better-life"

import { BackLink } from "./back-link"
import { Bi } from "./bi"

const pad = (n: number) => String(n).padStart(2, "0")

/** Lesson page header: breadcrumb + back link (like CareerHeader), then label, title, subtitle, question. */
export function LessonHeader({ lesson, number, total }: { lesson: Lesson; number: number; total: number }) {
  return (
    <header className="pb-[clamp(48px,8vh,96px)]">
      <div className="flex flex-wrap items-center justify-between gap-x-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/my-better-life" />}>
                <Bi text={L.sectionName} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* Lesson titles run up to 6 words: sentence case (DESIGN.md: all-caps only for
                  1 to 4 words). 14px meta, since 12px sentence case is below the reading floor.
                  Scoped to this section; career breadcrumbs are unchanged. */}
              <BreadcrumbPage className="type-meta normal-case tracking-normal">
                <Bi text={lesson.title} />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <BackLink href="/my-better-life">
          <Bi text={L.backJourney} />
        </BackLink>
      </div>

      <div className="mt-[clamp(32px,6vh,64px)]">
        <p className="type-label text-mute">
          <Bi text={L.lessonLabel} />{" "}
          <span className="tabular-nums">
            {pad(number)} / {pad(total)}
          </span>
        </p>
        <h1 className="mt-4 type-display-l text-fg">
          <Bi text={lesson.title} />
        </h1>
        <p className="mt-4 type-h4 text-mute">
          <Bi text={lesson.subtitle} />
        </p>
        <p className="mt-6 max-w-(--measure) type-lead text-fg-body md:mt-8">
          <Bi text={lesson.question} />
        </p>
      </div>
    </header>
  )
}
