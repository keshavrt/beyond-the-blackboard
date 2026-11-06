import { SectionHeader } from "@/components/brand/section-header"
import { pad } from "@/components/site/nav"
import { homePageCopy } from "@/content/home-page"
import { cn } from "@/lib/utils"

import { HomeSection } from "./home-section"

const copy = homePageCopy.howItWorks

/**
 * Three steps on one rail, not three cards: a hairline with square nodes,
 * vertical on phones and horizontal from 820px. The last node is filled Sage
 * (the goal), matching the path strip on career cards.
 */
export function HowItWorks({ index }: { index: number }) {
  const last = copy.steps.length - 1
  return (
    <HomeSection labelledBy="how-title">
      <SectionHeader
        index={index}
        id="how-title"
        title={`${copy.title} ${copy.titleHighlight}`}
      />

      <ol className="mt-12 grid md:mt-20 md:grid-cols-3">
        {copy.steps.map((step, i) => (
          <li
            key={step.title}
            className={cn(
              "relative pb-12 pl-10 last:pb-0 md:pt-12 md:pr-10 md:pb-0 md:pl-0",
              // Rail: vertical on phones, horizontal from md. Stops at the last node.
              "before:absolute before:bg-line-2 before:content-['']",
              "before:top-2 before:bottom-0 before:left-[4px] before:w-px",
              "md:before:top-[4px] md:before:right-0 md:before:bottom-auto md:before:left-0 md:before:h-px md:before:w-auto",
              i === last && "before:hidden",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1 left-0 size-[9px] md:top-0",
                i === last ? "bg-accent" : "border border-line-2 bg-bg",
              )}
            />
            <p className="type-code text-[13px] leading-none text-accent">
              {pad(i + 1)}
            </p>
            <h3 className="mt-4 type-h3 text-fg">{step.title}</h3>
            <p className="mt-3 max-w-[38ch] type-body text-fg-body">{step.detail}</p>
          </li>
        ))}
      </ol>
    </HomeSection>
  )
}
