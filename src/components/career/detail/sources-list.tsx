import { ArrowUpRight } from "lucide-react"

import { Callout } from "@/components/brand/callout"
import { careerDetailCopy as copy } from "@/content/career-detail"
import { formatDate, hostname } from "@/lib/format"
import type { Source } from "@/types/career"

export function SourcesList({ sources, lastVerified }: { sources: Source[]; lastVerified: string }) {
  return (
    <div className="max-w-(--measure)">
      <ul className="border-t border-line">
        {sources.map((s) => (
          <li key={s.url} className="border-b border-line">
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group/src flex min-h-11 items-center justify-between gap-4 py-4 text-fg transition-colors duration-(--dur-fast) ease-out-expo hover:text-accent active:text-accent-2"
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="type-body font-medium underline decoration-accent decoration-1 underline-offset-[3px] group-hover/src:decoration-2">
                  {s.label}
                </span>
                <span className="text-sm break-all text-mute">
                  {hostname(s.url)}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={2.25}
                className="size-4 shrink-0 transition-transform duration-(--dur) ease-out-expo group-hover/src:translate-x-[3px] group-hover/src:-translate-y-[3px]"
              />
              <span className="sr-only">{copy.sources.opensNewTab}</span>
            </a>
          </li>
        ))}
      </ul>
      <Callout title={copy.sources.disclaimerLabel} tone="warn" className="mt-10">
        <p>{copy.sources.disclaimer(formatDate(lastVerified))}</p>
      </Callout>
    </div>
  )
}
