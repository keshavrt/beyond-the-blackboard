import type { Metadata } from "next"
import Link from "next/link"

import { SectionHeader } from "@/components/brand/section-header"
import { Button } from "@/components/ui/button"
import { careerDetailCopy } from "@/content/career-detail"

const copy = careerDetailCopy.notFound

export const metadata: Metadata = {
  title: copy.metaTitle,
}

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col justify-center px-gx py-[clamp(64px,14vh,160px)]">
      <div className="bg-bg">
        <p className="type-code text-mute">{"/* Error 404 */"}</p>
        <SectionHeader
          index={404}
          as="h1"
          size="l"
          title={copy.title}
          highlight={copy.highlight}
          className="mt-6"
        />
        <p className="mt-6 max-w-(--measure) type-lead text-fg-body md:mt-8">{copy.body}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" arrow="internal" nativeButton={false} render={<Link href="/careers" />}>
            {copy.primary}
          </Button>
          <Button size="lg" variant="outline" arrow="internal" nativeButton={false} render={<Link href="/" />}>
            {copy.secondary}
          </Button>
        </div>
      </div>
    </div>
  )
}
