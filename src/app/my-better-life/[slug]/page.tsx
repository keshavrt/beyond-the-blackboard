import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BackLink } from "@/components/better-life/back-link"
import { Bi } from "@/components/better-life/bi"
import { ExploredToggle } from "@/components/better-life/explored-toggle"
import { LessonCard } from "@/components/better-life/lesson-card"
import { LessonHeader } from "@/components/better-life/lesson-header"
import { LessonNote } from "@/components/better-life/lesson-note"
import { WorkshopQuote } from "@/components/better-life/workshop-quote"
import { Callout } from "@/components/brand/callout"
import { DetailSection } from "@/components/career/detail/detail-section"
import { Button } from "@/components/ui/button"
import { betterLifeLabels as L, betterLifeMeta, lessons } from "@/content/better-life"

/** All 7 lessons are pre-rendered; any other slug is a 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }))
}

function findLesson(slug: string) {
  const i = lessons.findIndex((l) => l.slug === slug)
  return i === -1 ? null : { lesson: lessons[i], i }
}

export async function generateMetadata({ params }: PageProps<"/my-better-life/[slug]">): Promise<Metadata> {
  const found = findLesson((await params).slug)
  if (!found) return {}
  const meta = betterLifeMeta.lesson(found.lesson)
  return { ...meta, openGraph: meta }
}

const NOTEBOOK = "/my-better-life/notebook"

export default async function LessonPage({ params }: PageProps<"/my-better-life/[slug]">) {
  const found = findLesson((await params).slug)
  if (!found) notFound()
  const { lesson, i } = found
  const prev = i > 0 ? lessons[i - 1] : null
  const next = i < lessons.length - 1 ? lessons[i + 1] : null
  const id = (part: string) => `${lesson.slug}-${part}`

  return (
    <article className="bg-bg px-gx pt-[clamp(24px,4vh,48px)] pb-[clamp(64px,10vh,120px)]">
      <LessonHeader lesson={lesson} number={i + 1} total={lessons.length} />

      <DetailSection id="big-idea" index={1} title={<Bi text={L.bigIdea} />} intro={<Bi text={L.whatThisMeans} />}>
        <p className="max-w-(--measure) type-body text-fg-body">
          <Bi text={lesson.intro} />
        </p>
      </DetailSection>

      <DetailSection id="try-it" index={2} title={<Bi text={L.tryItToday} />} intro={<Bi text={L.tryToday} />}>
        <div className="max-w-(--measure)">
          <p className="type-body text-fg-body">
            <Bi text={lesson.practice} />
          </p>
          <p id={id("practice-label")} className="mt-8 type-meta font-semibold text-fg">
            <Bi text={L.practiceLabel} />
          </p>
          <div className="mt-3">
            <LessonNote
              fieldKey={`lesson:${lesson.slug}:practice`}
              labelledBy={id("practice-label")}
              placeholder={L.practicePlaceholder}
            />
          </div>
        </div>
      </DetailSection>

      <DetailSection
        id="explore-more"
        index={3}
        title={<Bi text={L.exploreMore} />}
        intro={<Bi text={L.thingsToRemember} />}
      >
        <div className="grid max-w-(--measure) gap-10">
          <div className="prose bg-transparent">
            <ul>
              {lesson.points.map((p) => (
                <li key={p.en}>
                  <Bi text={p} />
                </li>
              ))}
            </ul>
          </div>

          <Callout tone="info" title={<Bi text={L.lessonExample} />}>
            <Bi text={lesson.example} />
          </Callout>

          <WorkshopQuote quote={lesson.quote} label={L.quoteLabel} />

          <div>
            {/* The label + prompt together name the textarea. */}
            <div id={id("reflect-label")}>
              <p className="type-meta font-semibold text-fg">
                <Bi text={L.reflectQuestion} />
              </p>
              <p className="mt-2 type-body text-fg-body">
                <Bi text={lesson.prompt} />
              </p>
            </div>
            <div className="mt-3">
              <LessonNote
                fieldKey={`lesson:${lesson.slug}:reflect`}
                labelledBy={id("reflect-label")}
                placeholder={L.reflectPlaceholder}
              />
            </div>
          </div>
        </div>
      </DetailSection>

      {/* Closing block: on the DetailSection grid, so it lines up with the content column.
          Aside card first (after the content on phones), then explored, then prev/next. */}
      <div className="grid gap-x-[clamp(16px,2.4vw,36px)] border-t border-line pt-[clamp(48px,8vh,96px)] lg:grid-cols-[minmax(260px,30%)_minmax(0,1fr)]">
        <div className="grid max-w-(--measure) gap-12 lg:col-start-2">
          <div className="grid grid-rows-[auto_auto_auto]">
            <LessonCard
              href={`${NOTEBOOK}?page=${lesson.notePage}`}
              tab={L.yourBookLabel}
              title={L.keepThought}
              description={L.keepThoughtBody}
              footerLabel={L.openNotebook}
              className="row-span-3 grid grid-rows-subgrid gap-0"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <ExploredToggle slug={lesson.slug} />
            <p className="type-small text-mute">
              <Bi text={L.moveOn} />
            </p>
          </div>

          <nav
            aria-labelledby={id("lesson-nav")}
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line pt-8"
          >
            <span id={id("lesson-nav")} className="sr-only">
              <Bi text={L.journeyLabel} />
            </span>
            {prev ? (
              <BackLink href={`/my-better-life/${prev.slug}`} tone="meta">
                <Bi text={L.prevLesson} />: <Bi text={prev.title} />
              </BackLink>
            ) : (
              <span />
            )}
            <Button
              variant="outline"
              arrow="internal"
              nativeButton={false}
              render={<Link href={next ? `/my-better-life/${next.slug}` : NOTEBOOK} />}
            >
              <Bi text={next ? L.nextLesson : L.toNotebook} />
            </Button>
          </nav>
        </div>
      </div>
    </article>
  )
}
