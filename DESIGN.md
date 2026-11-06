# DESIGN.md

> Design language for a **student-focused information website**.
> Inspired by the "terminal / type-specimen" look of hackathon.sdslabs.co (studied 2026-11-06), **re-branded**: a new accent color, new fonts and extra readability rules for pages with a lot of text.
> Stack target: Next.js + Tailwind v4 + shadcn/ui (tokens map to CSS variables in `src/app/globals.css`).

---

## 0. Reference teardown (what the source site does)

What I measured on the reference site, so we know what we are adapting. **Do not ship these values as-is.**

| Aspect | Reference value |
|---|---|
| Background | `#0a0a0a`, plus a dot grid: `radial-gradient(rgba(237,234,227,.09) 1px, transparent 1.3px)` at `28px 28px` |
| Text / muted / dim | `#edeae4` / `#8c877f` / `#4a4744` |
| Accent | `#ff4a00` (orange), lighter tint `#ff7a3d` |
| Hairlines | `hsla(40,20%,91%,.12)` and `.22` |
| Font | JetBrains Mono for **everything**, weights 300–800, ligatures off |
| Body | 15px / 1.6, weight 500 (14px under 820px) |
| Radius | **0 everywhere** |
| Gutter | `--gx: clamp(16px, 3.2vw, 48px)` |
| Easing | `cubic-bezier(.19,1,.22,1)` (expo-out) and `cubic-bezier(.77,0,.175,1)` (in-out) |
| Loader | Boot log typed out in a fake terminal (`Decoding source… [ OK ]`), a progress bar labelled GET / SET / READY, a huge `NN%` in the bottom-right corner, then a boxed title, then an orange sheet wipes up and away |
| Signature motifs | `01 ABOUT` numbered nav, `[02]` section indices, `<HI,DEVELOPER>={` code overlines, `01 / IDEA.SYS` file tabs on cards, square corner handles on frames, ASCII-art canvases, a blinking block cursor, a custom block cursor that replaces the mouse pointer, `↗` link arrows |

---

## 1. Visual theme & atmosphere

**"Readable terminal."** The site looks like a well-lit dev console or a type-specimen sheet, but the reading parts read like a good textbook.

- **Dark, near-black canvas** with a faint dot grid, like graph paper for code.
- **One calm accent**, used sparingly and with intent: index numbers, active states, highlight boxes, fills on hover.
- **Two modes of voice:**
  - *Chrome* (hero, nav, section headers, labels, numbering): big, tight Geist Sans headings, with small mono code labels (`[01]`, file tabs, status tokens) as the techy accent.
  - *Content* (articles, guides, FAQs, notices): a calm sans-serif body at a comfortable size and line length. The techy feel stays in the frame around the content, never inside the paragraphs.
- **Hard geometry:** 0 radius, 1px hairlines, square corner handles, grids that show their seams.
- **Motion that feels like the system "compiling":** content clips in from below, sheets wipe, cursors blink. Every animation is fast and has a reason.

Mood words: precise, nerdy, friendly, confident, legible.

---

## 2. Color palette

New brand. The accent is **"Sage" lime** in place of the reference orange. It is a desaturated lime: it still reads as the brand colour on black and passes AAA, but it is calm enough for long sessions of career reading. It gets nowhere near the reference brand.

> Decision (2026-11-06): replaced the original "Volt" `#c5f82a` (94% saturation, glared on dark backgrounds) with Sage `#a9cc5a` (53% saturation). Career guidance needs to feel calm and trustworthy, not loud.

### Core tokens

| Token | Hex | Role | Contrast on `--bg` |
|---|---|---|---|
| `--bg` | `#0b0c0e` | Page background (slightly cool near-black) | — |
| `--surface` | `#131518` | Cards, open accordion, code blocks, sticky nav | — |
| `--surface-2` | `#1a1d21` | Hover surface, table header rows | — |
| `--fg` | `#ecebe6` | Headings, primary text | **16.4 : 1** |
| `--fg-body` | `#c9c6be` | Long-form body copy (a little softer than headings) | **11.5 : 1** |
| `--mute` | `#9a968e` | Secondary text, captions, metadata | **6.6 : 1** (AA) |
| `--dim` | `#5a5853` | **Decorative only**: ticks, grid labels, disabled state | 2.75 : 1 (never for text you need to read) |
| `--line` | `rgba(236,235,230,.12)` | Default hairline | — |
| `--line-2` | `rgba(236,235,230,.22)` | Emphasised hairline, tag borders | — |
| `--accent` | `#a9cc5a` | **Sage**: indices, active states, highlight boxes, CTA fill | **10.7 : 1** |
| `--accent-2` | `#93b548` | Pressed / visited / secondary accent | 8.3 : 1 |
| `--ink` | `#0b0c0e` | Text on accent fills | 10.7 : 1 on Sage |
| `--grid-dot` | `rgba(236,235,230,.07)` | Background dot grid | — |

### Status colors (information sites need them; keep them muted)

| Token | Hex | Use |
|---|---|---|
| `--info` | `#5cc8ff` | Notices, "Good to know" callouts |
| `--warn` | `#ffc53d` | Deadlines, "Action needed" |
| `--danger` | `#ff5d5d` | Errors, closed or expired |
| `--ok` | = `--accent` | Success, "Open", confirmations |

### Accent usage rules

- The accent should cover **≤ 5% of any screen**. It works as punctuation, not as a fill colour.
- Text on Sage is always `--ink`, never white.
- Selection: `::selection { background: var(--accent); color: var(--ink); }`.
- Scrollbar: thin, thumb `--accent`, track `--bg` with a `--line` left border.
- Focus ring: `outline: 2px solid var(--accent); outline-offset: 4px;` (the reference uses 6px, which looks loose next to body text).

### Alternative accent (if Sage needs replacing)

- **Signal Cyan** `#3ee6d6` (also passes AAA on `--bg`). Swap `--accent`/`--accent-2`; nothing else changes.

---

## 3. Typography

### Font pairing: **Geist Sans + Geist Mono** (locked; free, OFL; loaded with `next/font/google`)

> Decision (2026-11-06): this is the only pairing. Inter is banned in CLAUDE.md, and one pairing keeps the system consistent.
>
> Decision (2026-11-06, revised): **Geist Sans for all headings and body text.** Mono-everywhere chrome read as a developer site and slowed reading for students. Mono now appears only in small code-style labels.

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / hero / section titles | **Geist Sans** | 700 | Sentence case, tight negative tracking |
| Content headings (h3, h4) | **Geist Sans** | 600 | Sentence case |
| Body / long-form | **Geist Sans** | 400 (500 for lead) | Sentence case, normal tracking |
| Buttons, chips, form labels, small uppercase labels, numbers and stats | **Geist Sans** | 500 to 600 | Buttons, chips and `meta` labels sentence case; only chrome `label` text is uppercase with +0.08em |
| **Code labels only** (`type-code`) | **Geist Mono** | 700 | See the list below |

> Rule: **Geist Mono is ONLY for small code-style labels** (13px or smaller, never a heading, sentence or number a student must read):
> - section indices `[01]` and list/step numbers `01`
> - nav numbers (the `01` in `01 Home`)
> - file tabs (`01 / HELPING PEOPLE`) and tile numbers (`01`)
> - status tokens (`[ OK ]`, `[ 0 results ]`)
> - comment motifs (`/* Error 404 */`, loader log)
>
> Everything else is Geist Sans. In code this is one utility, `type-code` (`--font-code`); `--font-display` and `--font-label` both point at Geist Sans.

### Type scale (fluid, 1440 → 375)

| Token | Font | Size | Line-height | Tracking | Case | Use |
|---|---|---|---|---|---|---|
| `display-xl` | Sans 700 | `clamp(56px, 11vw, 184px)` | 0.92 | -0.055em | Sentence | Hero title |
| `display-l` | Sans 700 | `clamp(40px, 5.4vw, 88px)` | 0.98 | -0.045em | Sentence | Page and section titles |
| `h2` | Sans 600 | `clamp(28px, 3vw, 44px)` | 1.08 | -0.03em | Sentence | In-page section heads |
| `h3` | Sans 600 | `clamp(20px, 1.8vw, 26px)` | 1.2 | -0.02em | Sentence | Content sub-heads |
| `h4` | Sans 600 | 18px | 1.3 | -0.01em | Sentence | Minor heads |
| `lead` | Sans 500 | `clamp(18px, 1.4vw, 20px)` | 1.55 | 0 | Sentence | Intro paragraph |
| `body` | Sans 400 | **17px** (16px under 640px) | **1.65** | 0 | Sentence | All long-form copy |
| `small` | Sans 400 | 14px | 1.5 | 0 | Sentence | Captions, meta |
| `meta` | Sans 500 (600 for headings) | 14px | 1.4 | 0 | Sentence | **Labels a student must read**: path stages (`10th`, `Study`), stat and fact labels (`Pay a month`, `How you get in`), filter options, result counts |
| `label` | Sans 600 | 12px | 1.4 | +0.08em | UPPER | Chrome only, 1 to 3 words: nav text, breadcrumb, form labels (`SEARCH`), table headers, callout titles |
| `micro` | Sans 600 | 11px | 1.3 | +0.1em | UPPER | **Decorative only** (footer column labels, count pills). Never information a student needs |
| `code` | **Mono 700** | 10 to 13px | 1.4 | +0.1em | UPPER | The mono list above, nothing else |

Tracking guide: Geist Sans display text wants **negative** tracking (-0.03 to -0.055em, tighter as it gets bigger); small uppercase labels go **positive** (+0.08em sans, +0.1em mono). Never use both on the same element. The highlight box behind a display word uses `line-height: 1` with `padding: .02em .1em .1em`, so descenders (p, j, y) stay inside it.

---

## 4. Readability rules (content-heavy pages)

These rules **override** any techy styling inside a content area (`.prose`, articles, guides, FAQs, policies).

1. **Body size:** 17px desktop / 16px mobile minimum. Never below 14px for anything a student needs to read (dates, deadlines, eligibility).
2. **Line length:** 60–75 characters. `max-width: 68ch` on paragraphs and lists. Tables and media can run wider.
3. **Line height:** 1.6–1.7 for body copy, 1.2–1.3 for content headings. Display line-heights (0.85–0.9) apply only to hero and section titles.
4. **Contrast:** body ≥ **7:1** (`--fg-body` 11.5:1). Secondary text ≥ **4.5:1** (`--mute` 6.6:1). `--dim` is never used for text a student has to read.
5. **Font:** headings, paragraphs, lists, tables and form help text use **Geist Sans**. Mono appears only in `type-code` labels (see §3).
6. **Case:** all headings, display titles included, are sentence case. ALL-CAPS is limited to labels of 1–4 words.
7. **Paragraph rhythm:** `margin-block: 1em` between paragraphs, `2.5em` above an h2, `1.75em` above an h3. Keep paragraphs to about 4 lines or fewer on mobile.
8. **Links in prose:** `--fg` text with a 1px `--accent` underline (`text-underline-offset: 3px`). On hover the underline thickens to 2px and the text turns `--accent`. Do **not** use the full background-fill hover inside paragraphs; it breaks the reading flow. Keep it for CTAs and cards.
9. **Lists:** custom markers in mono (`01`, `02`… or `→`) in `--accent`, hanging outside the text column so wrapped lines align.
10. **Tables:** 15px sans, uppercase `label` headers on `--surface-2`, `--line` row dividers, numbers right-aligned with `font-variant-numeric: tabular-nums`. On mobile, scroll the table horizontally rather than shrinking the text.
11. **Callouts:** `--surface` background, 2px left border in a status color, `label` title (`NOTE`, `DEADLINE`, `TIP`), sans body.
12. **No background noise behind text:** the dot grid, ASCII canvases and scanlines stop at the edge of the content column. Prose sits on a solid `--bg` or `--surface`.
13. **Motion:** reading pages animate only their headers. Paragraphs never reveal on scroll. Honour `prefers-reduced-motion`.
14. **Optional light reading mode** (for long guides or printing): `--bg #f6f5f0`, `--fg #121316`, `--fg-body #2b2d31`, accent text switches to `#3f6b00` (Sage fails contrast on light backgrounds) and Sage is used only as a fill.

---

## 5. Components

### 5.1 Navigation (fixed top bar)

- Grid of `1fr auto 1fr`: logo mark on the left, numbered links in the centre, CTA on the right. Padding `18px var(--gx)`.
- Links use the sans `label` style with a mono `type-code` **index prefix** in `--accent` at 10px: `01 ABOUT`, `02 GUIDES`, `03 EVENTS`, `04 FAQ`.
- Hover/active: a 1px `--accent` underline that `scaleX`s in from the left (and exits to the right), 0.5s `--ease`.
- Behaviour: hides on scroll down (`translateY(-110%)`) and returns on scroll up. Once scrolled, it becomes solid `--bg` with a `--line` bottom border.
- Logo hover: `rotate(-6deg) scale(1.06)`.
- **Mobile (< 820px):** a burger made of two 2px bars that morph into an ×. The menu is a full-screen **accent sheet** revealed with a top-to-bottom wipe that looks like `clip-path: inset(0 0 100%) → inset(0)` (0.5s `--ease-io`, see §7 Sheet / menu). Items are huge sentence-case sans display text, bottom-aligned, each with a mono `01`–`04` index in `--ink`.

### 5.2 Section header (numbering style)

```
[02]  GUIDES
```
- The index is mono, 13px, weight 700, `--accent`, tracking +0.1em, in **square brackets**, top-aligned to the cap height of the title.
- The title is `display-xl` or `display-l`, sans, sentence case, `--fg`.
- A variant highlights the last word in an accent box: `Frequently asked [questions]`, with the box in `--accent` and text in `--ink`, padding `.02em .1em .1em`, `line-height: 1`. **Use it only on the hero and the 404 page.** On every heading it stops meaning anything and reads as a template (decision 2026-11-07).
- Numbering is zero-padded everywhere: nav `01`, sections `[01]`, list items `01`, cards `01 / HELPING PEOPLE`.

### 5.3 Code-syntax motifs (use in headings and chrome only)

| Motif | Example | Where |
|---|---|---|
| Greeting overline | `<HI, STUDENT>={` / `(NEW, HERE?)={+` with the key word in accent | Above card titles and track/category titles |
| File-tab label | `01 / HELPING PEOPLE` (index + the card's main interest; accent bg, ink text, micro size, `aria-hidden`). No file extensions or SNAKE_CASE: students do not read `.MD` | Top-left tab sitting on a card's top border |
| Comment block | `/* Error 404 */` | Loader log and the 404 page only. Facts a student needs (like the date facts were checked) are plain `meta` text: `Facts last checked: 6 Nov 2026` |
| Status token | `[ OK ]`, `[ RUN ]`, `[ NEW ]`, `[ CLOSED ]` | Badges, loader, status lists |
| Unicode / metric labels | `U+007B`, `CAP 730`, `BASE 0` | Decorative specimen art only |
| Blinking block cursor | `▮` in accent, `steps(1)` blink at 1s | After the last word of an answer, in the footer, and in the hero |
| Comment-style footer tag | `LEARN. ASK. BUILD._` | Footer base row |

### 5.4 Buttons

- **Primary:** `--accent` fill, `--ink` text, Geist Sans 600, sentence case, **0 radius**. Sizes: sm `10px 14px` / 13px; default `12px 20px` / 15px; lg `20px 26px` / `clamp(16px,1.2vw,18px)`. Trailing `↗` (external) or `→` (internal).
- **Hover:** an inner `--fg` layer scales up from the bottom (`scaleY(0→1)`, 0.6s `--ease`) and the arrow nudges `translate(3px,-3px)` (↗) or `translateX(4px)` (→).
- **Secondary / ghost:** transparent, 1px `--line-2` border, `--fg` text. On hover the border turns `--accent` and the same fill rises in `--surface-2`.
- Minimum touch target 44×44px.

### 5.5 Tag / chip

- Sans 14px, 500, sentence case, padding `7px 10px`, 1px `--line-2` border, solid `--surface-2` background. Chips carry real information (streams, exams, durations), so they follow Readability rule 1 (14px minimum). **No `backdrop-filter` / blur**: it counts as glassmorphism (banned) and is slow on low-end phones.
- Leading 8×8px **square** in `--accent` that blinks (`steps(1)`, 1.1s) for "live" items; static for everything else.

### 5.6 Frames & cards

- 1px `--line` border, 0 radius, `--bg` or `--surface` fill.
- **Corner handles:** 5×5px `--fg` squares on the four corners (like selection handles in a design tool).
- Art/media area on top, then a `--line` divider, then content with `clamp(20px,2vw,28px)` padding.
- Hover: the art "lifts" (`translateY(-10px)`, 0.6s) and dashed SVG strokes start marching (`stroke-dashoffset` loop). The title turns `--accent`.
- Grid/tile variant (directories, partner lists, quick links): tiles share hairline borders with no gaps. On hover an `--accent` sheet wipes up from the bottom, content flips to `--ink`, and the arrow nudges at the top-right: `→` for links inside the site, `↗` only for external links (§5.8). Each tile carries a mono `type-code` number (`01`) in its top-left corner; the tile's own title names it.

### 5.7 Accordion (FAQ)

- A list with a `--line` top border, each item with a `--line` bottom border.
- Row grid `48px 1fr 28px`: mono accent index `01`, question (sans 600, `clamp(17px,1.7vw,22px)`), and a +/− icon drawn from two 2px bars.
- Hover: text turns `--accent` and the row slides `padding-left: 10px`.
- Open: the question stays `--accent`, the vertical bar rotates flat (+ → −), and the answer expands via `grid-template-rows: 0fr → 1fr` (0.6s `--ease`). Answers use **body** styling (sans 17px, `--fg-body`, max 68ch) and end with a blinking accent cursor.
- The left column (title plus help link) is `position: sticky; top: 110px` on desktop.

### 5.8 Links & arrows

| Context | Style | Hover |
|---|---|---|
| Nav | Sans label + mono index | Underline scaleX from the left |
| Prose | `--fg` + 1px accent underline | Text turns accent, underline 2px |
| Card / inline CTA | `--fg` with a solid 1px `--accent` underline (a `::after` bar, no gradient) | The bar `scaleY`s from the bottom to full height (fill), text turns `--ink` |
| External | Trailing `↗` | Arrow moves `(3px,-3px)` |
| Internal / next | Trailing `→` | Arrow moves `4px` right |
| Footer | Sans 600, `--fg` | Turns `--accent` |

### 5.9 Hero

- `100svh` (min 640px). Padding top 92px, gutters `--gx`.
- Order from top: tag chip (date or status), then generative **ASCII canvas** art (an accent-coloured character field drawn from a logo or mark), then the display title with one word in an accent box, then a footer row above a `--line` rule (copy at max 640px on the left, CTA on the right).
- Under 820px the footer row stacks and the CTA goes full width.
- **Hero title size exception:** below 640px the hero title uses `font-size: min(56px, 16vw)` instead of the `display-xl` minimum of 56px. The boxed last word (`Blackboard`) is about 5.2em wide, so at 56px it overruns the content column on 320px phones. This gives the same 56px from about 350px up and scales down to about 51px at 320px. It applies to the hero title only; the global `display-xl` token is unchanged.

### 5.10 Footer

- Top `--line` border, 4-column grid `1.4fr 1fr 1fr 1fr` (2 columns under 1080px, 1 on mobile).
- Column labels are sans `micro`, `--accent`. Values are sans 600.
- A large ASCII wordmark band, then a base row: sans `label` `--mute` tagline with a blinking accent `_`.

### 5.11 Custom cursor (desktop, fine pointer only)

- A 10×18px block cursor in `--accent` follows the mouse. Over links it turns `--fg`, and on press it squashes to `scaleY(.7)`.
- Disabled on `(hover:none), (pointer:coarse)` and under reduced motion. **Never hide the native cursor inside forms or prose.**

### 5.12 Career photos

- Optional per career (`image: { src, alt }` in `src/data/careers.ts`). Files go in **`public/careers/<slug>.webp`** (e.g. `public/careers/doctor.webp`).
- **4:3 crop**, at least 1200×900, WebP under about 150 KB (cheap phones, slow internet).
- **Consistent crop and style across all careers:** a real person doing the job in an Indian setting, natural light, the same framing (person at mid-distance, workplace visible), no text, logos or watermarks in the photo, no heavy filters. The licence must allow reuse; credit it in the footer line.
- `alt` says what the photo shows ("A doctor checking a child's heartbeat in a clinic"), not "photo of a doctor".
- Rendered with `next/image`, `object-cover`, 0 radius, 1px `--line` border. Lazy-loaded on cards; eager (`loading="eager"`, `fetchPriority="high"`) in the detail page header.
- **No photo, no box:** without an image the card keeps its path strip as its art and the detail header stays single-column. Never show a grey placeholder.

---

## 6. Layout

- **Gutter:** `--gx: clamp(16px, 3.2vw, 48px)` on both sides of every section.
- **Max widths:** chrome is full-bleed with gutters. Content column `68ch` (about 720px). Content plus sidebar `minmax(260px, 32%) 1fr`.
- **Grids:**
  - 12-column fluid grid with `clamp(16px, 2.4vw, 36px)` gaps.
  - Common splits: `1fr auto 1fr` (nav, paired cards with an accent `+` between them), `repeat(3,1fr)` (pillars or feature cards), `minmax(180px,22%) 1fr` (labelled rows such as tiers or categories), `minmax(280px,38%) 1fr` (sticky title + list).
- **Vertical rhythm:** section padding `clamp(100px, 16vh, 180px)` for marketing-style sections and `clamp(64px, 10vh, 120px)` on content pages. The base spacing unit is **4px**; common steps are 4 · 8 · 12 · 14 · 18 · 24 · 28 · 36 · 48 · 64.
- **Seams visible:** sections and rows are divided by full-width 1px `--line` rules rather than whitespace alone.
- **Background:** dot grid `radial-gradient(var(--grid-dot) 1px, transparent 1.3px) 0 0 / 28px 28px` on `body`. Content columns sit on solid fills (see Readability rule 12).
- **Breakpoints:** 640 (mobile → large mobile), 820 (nav collapses, stacks), 1080 (footer and logo grids reflow), 1440 (design reference).

---

## 7. Motion

> Decision (2026-11-06): **0.6s is the longest duration anywhere except the loader.** The mobile menu wipe is 0.5s and the reveal stagger is 60ms. The original 0.8 to 1.2s values felt slow on a site students navigate a lot. Blink loops (1 to 1.1s) are an on/off rhythm, not movement, and are not covered by the cap.

### Tokens
```css
--ease:    cubic-bezier(.19, 1, .22, 1);   /* expo-out: reveals, hovers */
--ease-io: cubic-bezier(.77, 0, .175, 1);  /* in-out: sheets, wipes, menu */
--dur-fast: .3s;  --dur: .5s;  --dur-slow: .6s;  --dur-reveal: .6s;  /* .6s = cap (loader excepted) */
```

### Patterns

| Pattern | Spec |
|---|---|
| **Reveal** | `opacity 0 → 1`, `translateY(40px) → 0`, 0.6s `--ease`, once, triggered by IntersectionObserver. Siblings that enter together stagger by 60ms. Section headers and cards only, never paragraphs. Elements already on screen at load don't animate. |
| **Decode headline** | `clip-path: inset(0 0 100%) → inset(0 0 -10%)` plus `translateY(.35em) → 0`, 0.6s. Used on section titles. |
| **Hero lines** | Each word is masked in its line and slides `translateY(110%) → 0`, 0.6s, 0.08s stagger. The hero footer follows with a 0.3s delay. |
| **Fill wipe** | `scaleY(0→1)` from `bottom`, 0.6s `--ease`, on buttons and tiles. Retreats faster, 0.3s. |
| **Underline** | `scaleX(0→1)`, origin left on enter and right on exit, 0.5s. |
| **Sheet / menu** | Wipe, 0.5s `--ease-io`, in and out. Built from transforms only: the sheet slides `translateY(-100%) → 0` while its content slides the opposite way, so it looks like a `clip-path` inset wipe. |
| **Blink** | `@keyframes blink { 50% { opacity: 0 } }`, `steps(1)` at 1–1.1s. Used for cursors and live dots. |
| **Dash march** | `stroke-dasharray: 4 5`, offset loop 1.6s linear, runs on hover only. |
| **ASCII canvas** | Characters re-sample toward the target image. A scroll-pinned section (sticky, about 4 screens tall) can morph through words, e.g. `ASK → LEARN → BUILD`. Pause when off-screen. |
| **Smooth scroll** | Lenis (or native `scroll-behavior: smooth`), disabled under reduced motion. |

### Loading screen ("boot sequence")

Show it **only on the first visit per session** (store a flag in `sessionStorage`), cap it at about 1.5s, and allow skipping with any key or click (a skip fades it out in 0.2s). The loader is the only thing allowed past the 0.6s cap.

1. Full-screen `--bg`, accent text, mono 12px/1.55, padded by `--gx`.
2. A terminal log types out top-left (max 560px wide):
   ```
   /*
      Booting student portal...
   */
   Fetching notices            [ OK ]
   Indexing guides             [ OK ]
   Syncing calendar            [ OK ]
   Compiling page              [ RUN ]
   ```
   `[ OK ]` appears in `--fg`.
3. A 14px progress bar (1px accent border at 40% opacity, accent fill) with labels `LOAD · READ · GO` spread underneath.
4. A giant percentage counter (`clamp(64px,14vw,220px)`, weight 800, -0.06em) pinned bottom-right.
5. At 100%, the log and counter fade (0.25s) and the site name appears centred, first as accent text and then **boxed** (accent bg, ink text).
6. Exit: an accent sheet wipes up (`scaleY` bottom→top→off: covers in 0.22s, clears in 0.3s, `--ease-io`) and the hero lines animate in behind it.
7. While loading, `body.is-loading { overflow: hidden }`. The loader carries `aria-hidden`, and real content is in the DOM from the start (no SEO or a11y gating).

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```
With reduced motion: skip the loader entirely, render ASCII canvases as a static frame, and keep the cursor blink off.

---

## 8. Do's and don'ts

### Do
- ✅ Number everything in the chrome (`01`, `[02]`, `03 / FILE.MD`), zero-padded and in the accent color.
- ✅ Keep radius at 0 and borders at 1px hairlines. Use corner handles to mark frames.
- ✅ Use huge, tight-tracked, sentence-case Geist Sans for display, and keep mono to the small `type-code` labels listed in §3.
- ✅ Put body text in the sans font at 17px, max 68ch, `--fg-body`.
- ✅ Treat the accent as punctuation: indices, active states, one highlighted word, CTA.
- ✅ Make every hover do one clear thing (wipe, underline, nudge or colour), using the shared easing.
- ✅ Give dates, deadlines and eligibility info full-contrast text, never `--dim`.
- ✅ Respect `prefers-reduced-motion` and coarse pointers.

### Don't
- ❌ Copy the reference brand: no orange `#ff4a00`, no JetBrains-Mono-everything, no infinity mark, no "SYNTAX ERROR" wordmark, no `<HI,DEVELOPER>` copy verbatim.
- ❌ Set headings, paragraphs, buttons, numbers, lists or tables in monospace.
- ❌ Use em dashes (—) in user-facing text. Use a comma, colon, full stop, or "to" for ranges.
- ❌ Put ASCII art, dot grids or animated canvases behind readable text.
- ❌ Use ALL-CAPS for sentences or content headings longer than about 4 words.
- ❌ Use rounded corners, drop shadows or gradients. **No gradients anywhere**: underlines are solid Sage (`text-decoration` or a solid `::after` bar). The only exception is the background dot grid, which uses `radial-gradient()` purely to draw hard-edged dots, never a colour blend.
- ❌ Use `backdrop-filter` / blur or translucent "glass" surfaces. Use solid `--surface` / `--surface-2` fills.
- ❌ Use more than one accent per screen, or accent colour for large body text.
- ❌ Show the loader on every navigation or block content behind it.
- ❌ Hide the native cursor in forms and text fields.
- ❌ Reveal-animate paragraphs on reading pages.

---

## 9. Token snippet (drop-in starting point)

```css
:root {
  --bg: #0b0c0e;  --surface: #131518;  --surface-2: #1a1d21;
  --fg: #ecebe6;  --fg-body: #c9c6be;  --mute: #9a968e;  --dim: #5a5853;
  --line: rgba(236,235,230,.12);  --line-2: rgba(236,235,230,.22);
  --accent: #a9cc5a;  --accent-2: #93b548;  --ink: #0b0c0e;
  --info: #5cc8ff;  --warn: #ffc53d;  --danger: #ff5d5d;
  --grid-dot: rgba(236,235,230,.07);
  --gx: clamp(16px, 3.2vw, 48px);
  --radius: 0px;
  --ease: cubic-bezier(.19,1,.22,1);
  --ease-io: cubic-bezier(.77,0,.175,1);
  --font-display: var(--font-geist-sans);
  --font-label:   var(--font-geist-sans);
  --font-code:    var(--font-geist-mono); /* type-code only */
  --font-body:    var(--font-geist-sans);
  --measure: 68ch;
}
```
