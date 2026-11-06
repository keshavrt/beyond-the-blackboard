import { careerDetailCopy } from "@/content/career-detail"
import { durationCountedFrom, formatINRRangeShort, formatYears } from "@/lib/format"
import { getAllCareers, getCareerBySlug } from "@/lib/careers"
import { ogContentType, ogSize, renderOgImage } from "@/lib/og"

const copy = careerDetailCopy.og

export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return getAllCareers().map((c) => ({ slug: c.slug }))
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const career = getCareerBySlug((await params).slug)
  return [{ id: "og", alt: copy.alt(career?.name ?? ""), size: ogSize, contentType: ogContentType }]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const all = getAllCareers()
  const career = getCareerBySlug((await params).slug)
  if (!career) return new Response(null, { status: 404 })

  const pad = String(all.indexOf(career) + 1).padStart(2, "0")
  return renderOgImage({
    token: copy.token,
    index: `[${pad}]`,
    title: career.name,
    description: career.oneLiner,
    facts: [
      { label: copy.study(durationCountedFrom(career)), value: formatYears(career.durationYears) },
      { label: copy.exam, value: career.exams[0]?.name ?? copy.noExam },
      { label: copy.pay, value: formatINRRangeShort(career.salaryRange.min, career.salaryRange.max) },
    ],
  })
}
