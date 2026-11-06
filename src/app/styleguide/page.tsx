import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Search } from "lucide-react"

import { FileTab } from "@/components/brand/file-tab"
import { SectionHeader, SectionIndex } from "@/components/brand/section-header"
import { CareerCard } from "@/components/career/career-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { interestLabels, streamLabels } from "@/data/careers"
import { getCareerBySlug } from "@/lib/careers"
import type { Interest, Stream } from "@/types/career"

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false },
}

/* ---------------------------------------------------------------- data */

const colorTokens: { name: string; value: string; role: string }[] = [
  { name: "--bg", value: "#0b0c0e", role: "Page background" },
  { name: "--surface", value: "#131518", role: "Cards, code blocks" },
  { name: "--surface-2", value: "#1a1d21", role: "Hover, table headers" },
  { name: "--fg", value: "#ecebe6", role: "Headings, primary text" },
  { name: "--fg-body", value: "#c9c6be", role: "Long-form body copy" },
  { name: "--mute", value: "#9a968e", role: "Captions, metadata" },
  { name: "--dim", value: "#5a5853", role: "Decorative only" },
  { name: "--line", value: "rgba(236,235,230,.12)", role: "Default hairline" },
  { name: "--line-2", value: "rgba(236,235,230,.22)", role: "Emphasised hairline" },
  { name: "--accent", value: "#a9cc5a", role: "Sage: indices, active, CTA" },
  { name: "--accent-2", value: "#93b548", role: "Pressed, visited" },
  { name: "--ink", value: "#0b0c0e", role: "Text on Sage" },
  { name: "--info", value: "#5cc8ff", role: "Notices" },
  { name: "--warn", value: "#ffc53d", role: "Deadlines" },
  { name: "--danger", value: "#ff5d5d", role: "Errors, closed" },
  { name: "--grid-dot", value: "rgba(236,235,230,.07)", role: "Background dot grid" },
]

const typeScale: {
  token: string
  spec: string
  className: string
  sample: string
  as?: "h1" | "h2" | "h3" | "h4" | "p"
}[] = [
  { token: "display-xl", spec: "Mono 800 · 56→200px · 0.85", className: "type-display-xl text-fg", sample: "Careers" },
  { token: "display-l", spec: "Mono 800 · 42→96px · 0.9", className: "type-display-l text-fg", sample: "Find your path" },
  { token: "h2", spec: "Mono 700 · 28→44px · 1.05", className: "type-h2 text-fg", sample: "How it works" },
  { token: "h3", spec: "Sans 600 · 20→26px · 1.2", className: "type-h3 text-fg", sample: "What does a nurse do?" },
  { token: "h4", spec: "Sans 600 · 18px · 1.3", className: "type-h4 text-fg", sample: "Subjects you need" },
  { token: "lead", spec: "Sans 500 · 18→20px · 1.55", className: "type-lead text-fg-body", sample: "Open a career to see the subjects, exams and steps that lead to it." },
  { token: "body", spec: "Sans 400 · 16/17px · 1.65", className: "type-body text-fg-body max-w-(--measure)", sample: "After Class 10 you choose a stream. Science, Commerce and Arts each open different doors, and many careers accept more than one." },
  { token: "small", spec: "Sans 400 · 14px · 1.5", className: "type-small text-mute", sample: "Facts last checked on 06 Nov 2026." },
  { token: "label", spec: "Mono 700 · 12px · +0.12em", className: "type-label text-fg", sample: "Explore careers" },
  { token: "micro", spec: "Mono 700 · 11px · +0.14em · decorative", className: "type-micro text-mute", sample: "U+007B · CAP 730 · BASE 0" },
]

const streams: Stream[] = ["science", "commerce", "arts", "vocational", "any"]
const interests: Interest[] = [
  "helping-people",
  "building-fixing",
  "creative",
  "numbers-business",
  "nature-outdoors",
  "technology",
]

/* ---------------------------------------------------------------- layout */

function Section({
  index,
  title,
  note,
  children,
}: {
  index: number
  title: string
  note?: string
  children: ReactNode
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  return (
    <section
      aria-labelledby={id}
      className="border-t border-line px-gx py-16 md:py-24"
    >
      <SectionHeader index={index} title={title} size="h2" id={id} />
      {note ? (
        <p className="mt-4 max-w-(--measure) type-small text-mute">
          {note}
        </p>
      ) : null}
      <div className="mt-10 md:mt-14">{children}</div>
    </section>
  )
}

function Spec({ children }: { children: ReactNode }) {
  return <p className="type-micro text-mute">{children}</p>
}

/* ---------------------------------------------------------------- page */

export default function StyleguidePage() {
  const doctor = getCareerBySlug("doctor")
  const engineer = getCareerBySlug("software-engineer")

  return (
    <main className="flex-1">
      {/* Header */}
      <header className="px-gx pt-16 pb-16 md:pt-24 md:pb-24">
        <p className="font-mono text-xs text-mute">/* Design system · v0.1 */</p>
        <SectionHeader
          index={0}
          title="Style"
          highlight="guide"
          as="h1"
          className="mt-6"
        />
        <p className="mt-8 max-w-(--measure) type-lead text-fg-body">
          Tokens and components for Beyond the Blackboard. Every value here
          comes from DESIGN.md.
        </p>
      </header>

      {/* 01 Colour */}
      <Section
        index={1}
        title="Color"
        note="Sage is punctuation: keep it under 5% of any screen. Text on Sage is always --ink."
      >
        <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-4 xl:grid-cols-8">
          {colorTokens.map((t) => (
            <li key={t.name} className="border-r border-b border-line">
              <div
                className="h-16 border-b border-line md:h-20"
                style={{ background: `var(${t.name})` }}
              />
              <div className="space-y-1 p-3">
                <p className="font-mono text-[13px] font-bold text-fg">{t.name}</p>
                <p className="font-mono text-xs break-all text-mute">{t.value}</p>
                <p className="type-small text-fg-body">{t.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 02 Type */}
      <Section
        index={2}
        title="Type"
        note="Geist Mono for the chrome (display, labels, indices). Geist Sans for anything a student reads."
      >
        <dl className="border-t border-line">
          {typeScale.map((t) => (
            <div
              key={t.token}
              className="grid gap-3 border-b border-line py-6 md:grid-cols-[minmax(180px,22%)_1fr] md:gap-8 md:py-8"
            >
              <dt className="space-y-1">
                <p className="font-mono text-[13px] font-bold text-accent">{t.token}</p>
                <Spec>{t.spec}</Spec>
              </dt>
              <dd className={`${t.className} min-w-0 break-words`}>{t.sample}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 03 Buttons */}
      <Section
        index={3}
        title="Buttons"
        note="Mono label, 0 radius, every size at least 44px tall. Trailing ↗ for external links, → for internal."
      >
        <div className="space-y-12">
          <div className="space-y-4">
            <Spec>Variants</Spec>
            <div className="flex flex-wrap items-center gap-4">
              <Button arrow="external">Explore careers</Button>
              <Button variant="outline" arrow="internal">
                See the path
              </Button>
              <Button variant="ghost">Clear filters</Button>
              <Button variant="destructive">Remove</Button>
              <Button variant="link">Read the guide</Button>
            </div>
          </div>

          <div className="space-y-4">
            <Spec>Sizes · sm / default / lg / icon</Spec>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" arrow="internal">Small</Button>
              <Button arrow="internal">Default</Button>
              <Button size="lg" arrow="external">Large</Button>
              <Button size="icon" variant="outline" aria-label="Search">
                <Search />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Spec>States (forced for preview)</Spec>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {(
                [
                  ["Default", "", ""],
                  ["Hover", "bg-fg", "border-accent bg-surface-2"],
                  ["Focus-visible", "outline-2 outline-offset-4 outline-accent", "outline-2 outline-offset-4 outline-accent"],
                  ["Active", "bg-accent-2", "bg-surface"],
                  ["Disabled", "", ""],
                ] as const
              ).map(([state, primary, outline]) => (
                <div key={state} className="space-y-3">
                  <p className="type-label text-fg">{state}</p>
                  <div className="flex flex-col items-start gap-5">
                    <Button
                      className={primary}
                      disabled={state === "Disabled"}
                      arrow="internal"
                    >
                      Primary
                    </Button>
                    <Button
                      variant="outline"
                      className={outline}
                      disabled={state === "Disabled"}
                    >
                      Outline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 04 Input */}
      <Section
        index={4}
        title="Input"
        note="16px text so phones do not zoom. Sage border on focus. Search icon turns Sage while focused."
      >
        <div className="grid max-w-3xl gap-8 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="sg-search" className="block type-label text-fg">
              Search careers
            </label>
            <InputGroup>
              <InputGroupAddon>
                <Search aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="sg-search"
                type="search"
                placeholder="Try “nurse” or “design”"
              />
            </InputGroup>
            <p className="type-small text-mute">Search by career name.</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="sg-search-disabled" className="block type-label text-dim">
              Disabled
            </label>
            <InputGroup>
              <InputGroupAddon>
                <Search aria-hidden="true" />
              </InputGroupAddon>
              <InputGroupInput
                id="sg-search-disabled"
                type="search"
                placeholder="Not available"
                disabled
              />
            </InputGroup>
          </div>
        </div>
      </Section>

      {/* 05 Toggle group */}
      <Section
        index={5}
        title="Toggle group"
        note="Joined by hairline seams. Selected item takes the Sage fill. Items wrap on phones; seams stay single hairlines."
      >
        <div className="space-y-10">
          <div className="space-y-3">
            <p id="sg-stream" className="type-label text-fg">Stream</p>
            <ToggleGroup aria-labelledby="sg-stream" defaultValue={["any"]}>
              {streams.map((s) => (
                <ToggleGroupItem key={s} value={s}>
                  {streamLabels[s]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="space-y-3">
            <p id="sg-interest" className="type-label text-fg">
              Interest <span className="text-mute">(last item disabled)</span>
            </p>
            <ToggleGroup aria-labelledby="sg-interest" defaultValue={["helping-people"]}>
              {interests.map((i) => (
                <ToggleGroupItem
                  key={i}
                  value={i}
                  disabled={i === "technology"}
                >
                  {interestLabels[i]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </Section>

      {/* 06 Badges */}
      <Section
        index={6}
        title="Badges"
        note="Solid fills only, no blur. The square marks live items; it will blink once motion is added."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Science</Badge>
          <Badge variant="outline">NEET-UG</Badge>
          <Badge dot="static">Open to all streams</Badge>
          <Badge dot="live">Live</Badge>
          <Badge variant="accent">[ NEW ]</Badge>
          <Badge variant="ok">[ OK ]</Badge>
          <Badge variant="info">[ RUN ]</Badge>
          <Badge variant="warn">[ DUE SOON ]</Badge>
          <Badge variant="danger">[ CLOSED ]</Badge>
          <Badge render={<a href="#prose" />}>Link badge</Badge>
        </div>
      </Section>

      {/* 07 Career card */}
      <Section
        index={7}
        title="Career card"
        note="One link covers the whole card. Hover: border brightens, title and arrow turn Sage."
      >
        <div className="grid max-w-4xl gap-8 md:grid-cols-2">
          {doctor ? <CareerCard career={doctor} index={1} /> : null}
          {engineer ? <CareerCard career={engineer} index={2} /> : null}
        </div>
      </Section>

      {/* 08 Prose */}
      <Section
        index={8}
        title="Prose"
        note="Readability rules: sans 17px (16px on phones), 68ch max, 1.65 line height, solid background, sentence-case headings."
      >
        <article id="prose" className="prose -mx-(--gx) px-(--gx) py-10 md:mx-0 md:border md:border-line md:p-12">
          <p className="type-lead text-fg">
            Want to treat patients one day? Here is the usual path to becoming a
            doctor in India, step by step.
          </p>
          <h2>The path, from Class 10 to your first job</h2>
          <p>
            Most doctors in India follow the same route. You pick Science in
            Class 11, clear one national exam, and then study for an MBBS
            degree. It is a long road, so it helps to know the steps early.
          </p>
          <ol>
            <li>
              <strong>Choose Science with Biology.</strong> Take Physics,
              Chemistry and Biology (PCB) in Class 11 and 12.
            </li>
            <li>
              <strong>Clear NEET-UG.</strong> Your rank decides which medical
              college you get.
            </li>
            <li>
              <strong>Finish your MBBS.</strong> That is 4.5 years of study, then
              1 year of paid internship in a hospital.
            </li>
          </ol>
          <div className="callout" data-tone="info">
            <span className="callout-title">Good to know</span>
            <p>
              NEET-UG is one exam for all MBBS seats in India. It is held once a
              year by NTA. Check dates on the{" "}
              <a href="https://neet.nta.nic.in/" target="_blank" rel="noreferrer">
                official NEET-UG site
              </a>
              .
            </p>
          </div>
          <h3>How long does it take?</h3>
          <p>
            Plan for about 5.5 years after Class 12. If you want to become a
            specialist, like a child doctor, an MD or MS takes about 3 more
            years.
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>What you do</th>
                  <th className="num">Years</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MBBS study</td>
                  <td>Classes in a medical college</td>
                  <td className="num">4.5</td>
                </tr>
                <tr>
                  <td>Internship</td>
                  <td>Paid work in a hospital</td>
                  <td className="num">1</td>
                </tr>
                <tr>
                  <td>MD / MS (optional)</td>
                  <td>Become a specialist</td>
                  <td className="num">~3</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3>Skills that help</h3>
          <ul>
            <li>Patience and care for people</li>
            <li>Staying calm under pressure</li>
            <li>Clear communication</li>
          </ul>
          <p>
            Source: National Medical Commission (NMC) and NTA, checked 06
            Nov 2026.
          </p>
        </article>
      </Section>

      {/* 09 Motifs */}
      <Section
        index={9}
        title="Motifs"
        note="Chrome only, never inside paragraphs. Numbers are zero-padded and in Sage."
      >
        <dl className="border-t border-line">
          <MotifRow label="Nav numbering">
            <nav aria-label="Sample navigation">
              <ul className="flex flex-wrap gap-x-8 gap-y-2">
                {["Careers", "How it works", "About"].map((item, i) => (
                  <li key={item}>
                    <a
                      href="#prose"
                      className="inline-flex min-h-11 items-center gap-2 type-label text-fg underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-(--dur-fast) ease-out-expo hover:decoration-accent active:text-accent-2 aria-[current=page]:decoration-accent"
                      aria-current={i === 0 ? "page" : undefined}
                    >
                      <span className="text-[10px] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </MotifRow>
          <MotifRow label="Section index">
            <div className="flex items-start gap-4">
              <SectionIndex index={2} className="mt-[0.35em]" />
              <span className="type-h2 text-fg">Guides</span>
            </div>
          </MotifRow>
          <MotifRow label="Highlight box">
            <span className="type-h2 text-fg">
              Frequently asked{" "}
              <span className="bg-accent px-[0.08em] text-ink">questions</span>
            </span>
          </MotifRow>
          <MotifRow label="File tabs">
            <div className="flex flex-wrap gap-3">
              <FileTab index={1} name="DOCTOR.MD" />
              <FileTab index={2} name="NURSE.MD" />
              <FileTab index={3} name="TEACHER.MD" />
            </div>
          </MotifRow>
          <MotifRow label="Greeting overline">
            <p className="font-mono text-sm font-bold tracking-[0.04em] text-fg">
              &lt;HI, <span className="text-accent">STUDENT</span>&gt;={"{"}
            </p>
          </MotifRow>
          <MotifRow label="Comment">
            <p className="font-mono text-sm text-mute">/* Updated 06 Nov 2026 */</p>
          </MotifRow>
          <MotifRow label="Status tokens">
            <p className="font-mono text-sm font-bold text-fg">
              Fetching careers <span className="text-accent">[ OK ]</span>
              <span className="mx-4 text-dim">·</span>
              Compiling page <span className="text-mute">[ RUN ]</span>
            </p>
          </MotifRow>
          <MotifRow label="Block cursor">
            <p className="type-h2 text-fg">
              Coming soon<span aria-hidden="true" className="ml-1 text-accent">▮</span>
            </p>
          </MotifRow>
          <MotifRow label="Link arrows">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <Button
                variant="link"
                arrow="external"
                nativeButton={false}
                render={
                  <a href="https://neet.nta.nic.in/" target="_blank" rel="noreferrer" />
                }
              >
                NEET-UG official site
              </Button>
              <Button
                variant="link"
                arrow="internal"
                nativeButton={false}
                render={<a href="#prose" />}
              >
                All careers
              </Button>
            </div>
          </MotifRow>
          <MotifRow label="Footer tag">
            <p className="font-mono text-xs font-bold tracking-[0.12em] text-mute uppercase">
              Learn. Ask. Build.<span aria-hidden="true" className="text-accent">_</span>
            </p>
          </MotifRow>
        </dl>
      </Section>
    </main>
  )
}

function MotifRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid items-center gap-3 border-b border-line py-6 md:grid-cols-[minmax(180px,22%)_1fr] md:gap-8">
      <dt className="type-micro text-mute">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  )
}
