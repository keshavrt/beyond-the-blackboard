import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CareerCard } from "@/components/career/career-card"
import { CareerHeader } from "@/components/career/detail/career-header"
import { DetailSection } from "@/components/career/detail/detail-section"
import { PathTimeline } from "@/components/career/detail/path-timeline"
import { SalaryBlock } from "@/components/career/detail/salary-block"
import { SourcesList } from "@/components/career/detail/sources-list"
import { WordsToKnow } from "@/components/career/detail/words-to-know"
import { Badge } from "@/components/ui/badge"
import { careerDetailCopy as copy } from "@/content/career-detail"
import { durationCountedFrom, formatYears } from "@/lib/format"
import { getAllCareers, getCareerBySlug, getRelatedCareers } from "@/lib/careers"
import type { Career } from "@/types/career"

/** All careers are pre-rendered; any other slug is a 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return getAllCareers().map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const career = getCareerBySlug((await params).slug)
  if (!career) return {}
  const description = copy.meta.description(
    career.oneLiner,
    formatYears(career.durationYears),
    durationCountedFrom(career),
    career.exams[0]?.name
  )
  return {
    title: career.name,
    description,
    openGraph: { title: career.name, description },
  }
}

/** Mono label column + content column, divided by hairlines. DESIGN.md §6 labelled rows. */
function NeedsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-6 gap-y-4 border-t border-line py-8 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[160px_minmax(0,1fr)]">
      <h3 className="type-meta font-semibold text-fg sm:pt-0.5">{label}</h3>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

function Needs({ career }: { career: Career }) {
  return (
    <div className="max-w-[calc(var(--measure)+180px)]">
      <NeedsRow label={copy.needs.subjects}>
        <ul className="flex flex-wrap gap-2">
          {career.subjects.map((s) => (
            <li key={s} className="max-w-full">
              {/* Some subjects are a phrase, so let the chip wrap instead of running off a 320px screen. */}
              <Badge className="max-w-full whitespace-normal text-left">{s}</Badge>
            </li>
          ))}
        </ul>
      </NeedsRow>
      <NeedsRow label={copy.needs.exams}>
        {career.exams.length === 0 ? (
          <p className="type-body text-fg-body">{copy.needs.noExams}</p>
        ) : (
          <ul className="grid gap-6">
            {career.exams.map((e) => (
              <li key={e.name}>
                <p className="text-lg font-semibold tracking-[-0.01em] text-fg">{e.name}</p>
                {e.fullName ? <p className="mt-1 type-small text-mute">{e.fullName}</p> : null}
                {e.note ? <p className="mt-2 type-body text-fg-body">{e.note}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </NeedsRow>
      <NeedsRow label={copy.needs.skills}>
        <div className="prose bg-transparent">
          <ul>
            {career.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </NeedsRow>
    </div>
  )
}

export default async function CareerPage({ params }: PageProps<"/careers/[slug]">) {
  const career = getCareerBySlug((await params).slug)
  if (!career) notFound()

  const related = getRelatedCareers(career.slug)

  return (
    <article className="bg-bg px-gx pt-[clamp(24px,4vh,48px)] pb-[clamp(64px,10vh,120px)]">
      <CareerHeader career={career} />

      <DetailSection id="what-they-do" index={1} title={copy.sections.whatTheyDo} intro={copy.whatTheyDo.intro}>
        <div className="prose bg-transparent">
          <ol>
            {career.whatTheyDo.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </DetailSection>

      <DetailSection
        id="path"
        index={2}
        title={copy.sections.path}
        intro={copy.path.intro}
        aside={<WordsToKnow career={career} />}
      >
        <PathTimeline career={career} />
      </DetailSection>

      <DetailSection id="needs" index={3} title={copy.sections.needs} intro={copy.needs.intro}>
        <Needs career={career} />
      </DetailSection>

      <DetailSection id="salary" index={4} title={copy.sections.salary} intro={copy.salary.intro}>
        <SalaryBlock salary={career.salaryRange} />
      </DetailSection>

      {related.length > 0 ? (
        <DetailSection id="related" index={5} title={copy.sections.related} intro={copy.related.intro}>
          <ul className="grid grid-cols-1 gap-x-[clamp(16px,2.4vw,36px)] gap-y-8 sm:grid-cols-2">
            {related.map((c, i) => (
              <li key={c.slug} className="row-span-4 grid grid-rows-subgrid gap-0">
                <CareerCard career={c} index={i + 1} className="row-span-4 grid grid-rows-subgrid gap-0" />
              </li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      <DetailSection
        id="sources"
        index={related.length > 0 ? 6 : 5}
        title={copy.sections.sources}
        intro={copy.sources.intro}
      >
        <SourcesList sources={career.sources} lastVerified={career.lastVerified} />
      </DetailSection>
    </article>
  )
}
