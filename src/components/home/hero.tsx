import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { homePageCopy } from "@/content/home-page"

const copy = homePageCopy.hero

/**
 * DESIGN.md §5.9 hero: overline motif, display title with one boxed word,
 * then a footer row above a hairline (copy left, CTA right).
 * Motion (DESIGN.md §7 "Hero lines"): every word slides up inside its own mask,
 * 80ms apart; the footer row follows 0.3s later. The block cursor blinks and shows
 * from 640px only: on phones the boxed word fills the line.
 */
export function Hero({
  stats,
}: {
  stats: { careers: number; streams: number; interests: number }
}) {
  const items = [
    [stats.careers, copy.stats.careers],
    [stats.streams, copy.stats.streams],
    [stats.interests, copy.stats.interests],
  ] as const
  const words = copy.title.split(" ")

  return (
    <section
      aria-labelledby="hero-title"
      className="flex min-h-[max(640px,calc(100svh-81px))] flex-col px-gx pt-[clamp(48px,10vh,92px)] pb-10 md:pb-12"
    >
      <p className="hero-fade type-label text-mute md:text-[13px]">
        {copy.overline} <span className="text-accent">{copy.overlineKey}</span>
      </p>

      {/* Hero exception (DESIGN.md §5.9): below 640px the size is min(56px, 16vw), so the
          boxed "Blackboard" fits a 320px phone. The global display-xl token is unchanged. */}
      <h1
        id="hero-title"
        className="mt-6 type-display-xl text-fg max-sm:text-[length:min(56px,16vw)] md:mt-10"
      >
        <span className="block">
          {words.map((word, i) => (
            <React.Fragment key={i}>
              {i > 0 ? " " : null}
              <span className="hero-mask">
                <span className="hero-word" style={{ "--i": i } as React.CSSProperties}>
                  {word}
                </span>
              </span>
            </React.Fragment>
          ))}
        </span>{" "}
        <span className="hero-mask">
          <span
            className="hero-word mt-[0.06em] inline-block bg-accent px-[0.08em] pt-[0.02em] pb-[0.1em] leading-none text-ink"
            style={{ "--i": words.length } as React.CSSProperties}
          >
            {copy.titleHighlight}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="hero-cursor ml-[0.12em] hidden h-[0.72em] w-[0.36em] translate-y-[0.02em] bg-accent sm:inline-block"
        />
      </h1>

      <div className="hero-fade mt-auto pt-16 [--d:300ms]">
        <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-[minmax(0,640px)_auto] md:items-end md:justify-between md:gap-12">
          <div>
            <p className="max-w-[640px] type-lead text-fg-body">{copy.purpose}</p>
            <dl aria-label={copy.statsLabel} className="mt-6 grid grid-cols-3 border-y border-line sm:flex">
              {items.map(([value, label]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 border-line py-3 pr-4 not-first:border-l not-first:pl-4 sm:flex-row sm:items-baseline sm:gap-2 sm:pr-5 sm:not-first:pl-5"
                >
                  {/* dt first for valid markup; the number shows first visually. */}
                  <dt className="type-label text-mute">{label}</dt>
                  <dd className="order-first text-xl leading-none font-semibold tracking-[-0.02em] text-fg tabular-nums">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <Button
            size="lg"
            arrow="external"
            nativeButton={false}
            render={<Link href="/careers" />}
            className="w-full md:w-auto"
          >
            {copy.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
