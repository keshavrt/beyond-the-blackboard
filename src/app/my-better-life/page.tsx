import type { Metadata } from "next"
import Link from "next/link"

import { Bi } from "@/components/better-life/bi"
import { LessonCard } from "@/components/better-life/lesson-card"
import { ProgressMeter } from "@/components/better-life/progress-meter"
import { WorkshopQuote } from "@/components/better-life/workshop-quote"
import { SectionHeader } from "@/components/brand/section-header"
import { HomeSection } from "@/components/home/home-section"
import { Button } from "@/components/ui/button"
import { betterLifeLabels as L, betterLifeMeta, lessons } from "@/content/better-life"

export const metadata: Metadata = betterLifeMeta.intro

const lessonHref = (slug: string) => `/my-better-life/${slug}`
const NOTEBOOK_HREF = "/my-better-life/notebook"

/** /my-better-life: intro, progress, 7 lesson cards + the notebook card, closing quote. */
export default function BetterLifeIntroPage() {
  return (
    <>
      {/* Intro header: copy left, progress right from 820px (bottom-aligned). */}
      <header className="grid gap-10 px-gx pt-[clamp(48px,10vh,120px)] pb-[clamp(64px,10vh,120px)] md:grid-cols-[1fr_auto] md:items-end md:gap-12">
        <div>
          <p className="type-label text-mute">
            <Bi text={L.introEyebrow} />
          </p>
          <SectionHeader
            index={1}
            as="h1"
            size="l"
            title={<Bi text={L.introTitle} />}
            className="mt-4"
          />
          <p className="mt-6 max-w-(--measure) type-lead text-fg-body md:mt-8">
            <Bi text={L.introLead} />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              arrow="internal"
              nativeButton={false}
              render={<Link href={lessonHref(lessons[0].slug)} />}
            >
              <Bi text={L.startLesson} />
            </Button>
            <Button variant="outline" nativeButton={false} render={<Link href={NOTEBOOK_HREF} />}>
              <Bi text={L.openBook} />
            </Button>
          </div>
        </div>
        <ProgressMeter total={lessons.length} label={L.completed} />
      </header>

      <HomeSection labelledBy="bl-lessons-title">
        <SectionHeader index={2} id="bl-lessons-title" size="h2" title={<Bi text={L.lessonsTitle} />} />
        <p className="mt-4 max-w-(--measure) type-body text-fg-body md:mt-6">
          <Bi text={L.lessonsSub} />
        </p>

        {/* Same grid as the careers list: 1 / 2 (640) / 3 (1080) columns, subgrid rows.
            7 lessons + the notebook card (2 columns wide at 3 columns) = full rows. */}
        <ul className="mt-12 grid grid-cols-1 gap-x-[clamp(16px,2.4vw,36px)] gap-y-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {lessons.map((lesson, i) => (
            <li key={lesson.slug} data-reveal="" className="row-span-3 grid grid-rows-subgrid gap-0">
              <LessonCard
                href={lessonHref(lesson.slug)}
                index={i + 1}
                tab={L.lessonLabel}
                title={lesson.title}
                subtitle={lesson.subtitle}
                description={lesson.question}
                explored={{ slug: lesson.slug, label: L.explored, openLabel: L.openLesson }}
                className="row-span-3 grid grid-rows-subgrid gap-0"
              />
            </li>
          ))}
          <li data-reveal="" className="row-span-3 grid grid-rows-subgrid gap-0 lg:col-span-2">
            <LessonCard
              href={NOTEBOOK_HREF}
              tab={L.yourBookLabel}
              title={L.bookTitle}
              subtitle={L.bookStamp}
              description={L.keepThoughtBody}
              className="row-span-3 grid grid-rows-subgrid gap-0"
            />
          </li>
        </ul>
      </HomeSection>

      <section className="border-t border-line px-gx py-[clamp(64px,10vh,120px)]">
        <WorkshopQuote quote={L.closingQuote} attribution={L.closingAttribution} />
      </section>
    </>
  )
}
