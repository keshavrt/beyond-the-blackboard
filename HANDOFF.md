# HANDOFF: Beyond the Blackboard (Career Explorer)

Read this first in any new chat or session. It holds the context,
decisions and workflow for this project.

---

## 1. Project

- **What:** A career guidance website for Indian school students (Class 8 to 12).
  Version 1 is the Career Explorer only.
- **Why:** Tangible outcome for the IIT Roorkee Community Outreach course
  (MIC-399), project "Beyond the Blackboard", Group 07.
- **Real audience:** the evaluating professor. The site must look polished,
  professional and clearly useful, with a "wow" first impression.
- **Target users (for design decisions):** school students, many first-generation
  learners, cheap Android phones, slow internet. Simple English.
- **Live URL:** https://beyond-the-blackboard-iitr.vercel.app (set in `src/lib/site.ts`)
- **GitHub:** https://github.com/keshavrt/beyond-the-blackboard
- **Hosting:** Vercel (Hobby). Every `git push` to `main` redeploys.
  Every other branch gets its own preview URL.
- **Deadline:** [DEADLINE]

---

## 2. How we work (two tools)

- **Claude chat (Claude app):** planning, decisions, reviewing results, debugging help.
  The chat writes prompts; I run them in Claude Code and paste results back.
- **Claude Code (VS Code extension, Git Bash terminal on Windows):** does all the building.

### Session loop

1. Start a chat (inside the Claude Project), say what was done last and what's next.
2. Get a prompt, run it in Claude Code (Plan Mode for anything new), paste the result back.
3. Repeat, one step at a time.
4. End: Claude Code updates this HANDOFF.md, commits, pushes. Re-upload it to the Project.

### Build rules (also in CLAUDE.md)

- Plan Mode first for new work; approve the plan before code.
- ONE section or feature step at a time.
- Screenshot ONLY changed parts, at 375px and 1440px (saves tokens).
- Never report something fixed without measuring it.
- After each step: `npx tsc --noEmit`, lint, `npm run build`, then commit.
- New features go on a branch (`git checkout -b feature-x`), tested on the
  Vercel preview URL, then merged to `main`.
- Use `/clear` between tasks. Use Sonnet for small fixes, Opus for big design work.

---

## 3. Stack

- Next.js 16.4.5 (App Router, TypeScript, Turbopack, `src/` dir, `@/*` alias)
  - React Compiler: off. Cache Components: off. AGENTS.md: on.
  - This Next version is newer than Context7's docs (16.2.9). For exact behaviour,
    read `node_modules/next/dist/docs/`.
- Tailwind CSS v4 (tokens via `@theme` in `src/app/globals.css`)
- shadcn/ui on Base UI (`base-vega` style, `@base-ui/react`, not Radix), restyled to DESIGN.md
- Motion (animations), Lenis (smooth scroll, mouse wheel only), Lucide (only icon set)
- Fully static site: no backend, no database, no login.

---

## 4. Tools installed

### Skills (global, in `~/.claude/skills/`)

| Skill                               | Use for                                                                |
| ----------------------------------- | ---------------------------------------------------------------------- |
| design-taste-frontend               | Building pages                                                         |
| impeccable                          | Critique, audit, polish (`/impeccable critique`, `/impeccable polish`) |
| emil-design-eng                     | Motion and micro-interactions                                          |
| review-animations                   | Motion review (can't auto-launch; ask Claude to apply its checklist)   |
| ui-ux-pro-max (+ add-ons)           | Reference only. Its presets can conflict with DESIGN.md                |
| shadcn (project, `.claude/skills/`) | shadcn components                                                      |
| migrate-radix-to-base (project)     | Radix to Base UI migration reference                                   |

### MCP servers

| Server     | Scope                 | Notes                                    |
| ---------- | --------------------- | ---------------------------------------- |
| playwright | user                  | Screenshots and browser tests            |
| context7   | user                  | Up-to-date library docs                  |
| shadcn     | project (`.mcp.json`) | Always name the registry: `@shadcn/card` |

### Windows / Git Bash notes

- `npx`-based MCPs need the `cmd /c` wrapper on Windows.
- In Git Bash, prefix such commands with `MSYS_NO_PATHCONV=1`
  (otherwise `/c` becomes a path).
- `npx skills add` may install into `~/.agents/skills/`; copy into
  `~/.claude/skills/` with `cp -rL` or Claude Code won't see them.
- `.mcp.json` uses `cmd /c npx shadcn@latest mcp`, and this Windows version IS
  committed (since the setup commit). On Mac/Linux, change it to
  `npx shadcn@latest mcp` locally.
- If shadcn disappears from `/mcp`: `claude mcp reset-project-choices`,
  restart, approve.

---

## 5. Key files

| Path                                                | What                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| `CLAUDE.md`                                         | Project rules for Claude Code (imports `@AGENTS.md`)              |
| `AGENTS.md`                                         | Next.js agent guide (from create-next-app)                        |
| `DESIGN.md`                                         | The design system. Source of truth for all visuals                |
| `BRIEF.md`                                          | Product brief: audience, pages, data, scope                       |
| `HANDOFF.md`                                        | This file                                                         |
| `src/types/career.ts`                               | Career type (LocalizedText alias for future Hindi, typed slugs)   |
| `src/data/careers.ts`                               | All career data + filter labels                                   |
| `src/lib/careers.ts`                                | getAllCareers, getCareerBySlug, getRelatedCareers, filterCareers  |
| `src/lib/career-filter.ts`                          | URL filter parsing, stream grouping, last-search key              |
| `src/content/glossary.ts`                           | "Words to know": full names + short explanations of exams/courses |
| `src/content/home-page.ts`                          | All home page text (incl. featured career slugs)                  |
| `src/content/careers-page.ts`, `career-detail.ts`   | All /careers and detail page text                                 |
| `src/lib/home-stats.ts`                             | Counts computed from data (careers, streams, interests)           |
| `src/components/brand/`                             | SectionHeader, CornerHandles, FileTab, Callout                    |
| `src/components/career/career-card.tsx`             | CareerCard (whole card is one link)                               |
| `src/components/home/hero.tsx`                      | Hero                                                              |
| `src/components/brand/section-header.tsx`           | SectionHeader, SectionIndex                                       |
| `src/lib/site.ts`                                   | `SITE_URL` (feeds metadataBase, sitemap, robots)                  |
| `src/app/not-found.tsx`                             | Site-wide 404                                                     |
| `src/app/sitemap.ts`, `src/app/robots.ts`           | SEO (robots blocks /styleguide)                                   |
| `assets/fonts/`                                     | Geist TTFs for OG image generation                                |
| `public/careers/`                                   | Career photos go here (`<slug>.webp`)                             |
| `public/qr.png`                                     | QR code of the live URL                                           |
| `.impeccable/critique/`                             | Saved design critiques                                            |
| `.playwright-mcp/`                                  | Screenshots (gitignored)                                          |

---

## 6. Pages

- `/` Home: hero, [01] How it works, [02] Browse by interest (6 tiles),
  [03] Featured careers (Doctor, Forest Officer, Software Engineer, Electrician;
  2 shown on mobile), [04] About the project.
- `/careers`: search by name, stream filter, interest filter, synced to the URL
  (`?q=&stream=&interest=`). Result count is aria-live. Empty state + Clear filters.
  - Stream selected: two groups, "[Stream] careers (n)" then "Also open to all
    streams (n)". Arts shows a note because no careers are Arts-only.
  - Below 820px: stream and interest live behind a "Filters" button with an
    active count; search stays visible.
- `/careers/[slug]`: 10 pre-rendered pages, unknown slugs 404 (`dynamicParams = false`).
  Breadcrumb, facts strip, what they do, the path (vertical timeline, the hero
  element), what you need, Words to know, salary (+ official pay table where it
  exists), related careers, sources, disclaimer, "Facts last checked" date.
  "Back to careers" restores previous filters.
- `/styleguide`: tokens and components (not indexed).
- 404 page.

---

## 7. Design decisions (and why)

- **Theme:** dark "readable terminal", inspired by hackathon.sdslabs.co
  (inspiration only, not their brand).
- **Accent:** Sage `#a9cc5a` (`--accent`), calmer than the original Volt lime,
  easier on the eyes. Only accent. Max 5% of a screen, EXCEPT the hero box and
  404 box.
- **Fonts:** Geist Sans for all headings and body. Geist Mono ONLY for small
  labels (`type-code`): [01] indices, step numbers, nav numbers, file tabs,
  status tokens.
- **Headings:** sentence case, `text-wrap: balance`. Paragraphs `text-wrap: pretty`.
- **Type styles** (`@utility` in `globals.css`): `type-display-xl`, `type-display-l`,
  `type-h2` to `type-h4`, `type-lead`, `type-body`, `type-small`, `type-meta` (14px, for
  path steps, chips, fact labels), `type-label`, `type-micro`, `type-code`.
  Not `text-*` names (clashes with cn).
- **Readability:** body 17px desktop / 16px mobile, line-height 1.6 to 1.7,
  max 68ch, body contrast 7:1+, nothing behind text, no scroll animation on paragraphs.
  Student-facing info at least 14px; no tiny all-caps for real content.
- **Shape:** 0 radius, 1px hairlines, no shadows, no blur, no glass.
- **No gradients**, except the radial-gradient dot grid (documented exception).
  Underlines are solid accent.
- **No em dashes** anywhere in user-facing text. Ranges use "to" (₹10,000 to ₹25,000).
- **Arrows:** ↗ only for links leaving the site; → for internal links.
- **Lime word box:** only in the hero ("Blackboard") and on the 404.
- **Hero exception:** below 640px the title is `min(56px, 16vw)` so it fits at 320px.
- **Breakpoints:** 640 / 820 (from DESIGN.md); `globals.css` also defines lg 1080, xl 1440.
- **Focus ring:** 2px lime, 4px offset, everywhere. Exception: dark ring inside the
  lime mobile menu sheet.
- **"Approx." marker:** muted outline, grey text. Yellow is reserved for real warnings.
- **Touch targets:** at least 44px.

### Motion

- Hover effects only inside `@media (hover: hover) and (pointer: fine)`.
- Animate transform and opacity only. No layout shift.
- Max 0.6s for everything (`--dur-slow`, `--dur-reveal`), menu wipe 0.5s,
  reveal stagger 60ms. Exempt: cursor blink 1s, live dot 1.1s, loader.
- Rising fill on buttons, tiles and card arrows (0.6s in, 0.3s out).
- Hero words un-mask on load. Section headers and cards reveal once on scroll.
- Header hides on scroll down, returns on scroll up or keyboard focus.
- Loader: about 1.5s, once per session, skippable by click or key.
- `prefers-reduced-motion`: no loader, no reveals, no blinking, no Lenis.

---

## 8. Data rules

- 10 careers: doctor, software-engineer, teacher, nurse, police-officer,
  electrician, graphic-designer, chartered-accountant, agricultural-scientist,
  forest-officer.
- All user-facing text lives in data or content files, never hard-coded in JSX
  (so Hindi can be added by changing the LocalizedText alias).
- Each career has `sources` (official sites) and `lastVerified`.
- Salaries are approximate starting ranges. Use official pay levels where they
  exist (`officialPay`). Never invent a pay level.
- Cards show the same pay range as the detail page.
- Box label is "How you get in" when there's no entrance exam.
- Every exam/course short form needs a glossary entry ("Words to know").
- To add a career: add the slug to the type, add the entry to `careers.ts`,
  add any new glossary terms, add sources, then tsc + build.

### Photos (not added yet)

- Optional `image: { src, alt }` on each career.
- `public/careers/<slug>.webp`, about 1200px wide, 4:3, consistent style,
  free licence (Unsplash/Pexels), real people doing the job, short alt text.
- Add photos for ALL careers at once (partial sets leave empty card tops).
- Cards lazy-load; the detail header loads eagerly.

---

## 9. Open issues / to-do

- [x] Card arrow "go" button click: fixed and committed (`51db2ac` "Fix card arrow
      click"). Arrow, path strip, file tab and photo wrapper are pointer-events-none;
      the link's stretched area covers the border. Tested at 375/1440 on / and /careers.
      Leftover: the top half of the file tab (above the card border) is not clickable.
- [ ] Photos for all 10 careers.
- [ ] Team spot-check of uncertain facts (salary ranges without cited sources,
      D.El.Ed for primary, state-specific police/electrician rules, nursing
      NEET by state, ASRB eligibility, IFoS subject list and walking test).
- [ ] Open in a browser to confirm: doe.gov.in, the Delhi Police PDF, asrb.org.in
      (timed out for automated checks).
- [ ] Test on Safari / iPhone (only Chrome tested).
- [ ] Lighthouse on the live site (target 90+ in all four).
- Minor: `--font-heading` in `globals.css` points to Geist Mono (shadcn leftover,
  currently unused). Don't use it for headings; point it at Geist Sans if needed.
- Minor: two remaining one-word last lines ("(MIC-399)." on home,
  "specialist" on Doctor at 1440). Acceptable.

---

## 10. Feature backlog (in suggested order)

1. Career Interest Quiz (picture-based, RIASEC model, suggests 3 careers). Best live demo.
2. "My Future Self" roadmap card (name + dream career, printable card).
3. Hindi / English toggle (data already structured for it).
4. Scholarship and Exam Finder (filters by class, category, Uttarakhand).
5. Zero-Rupee Skills Hub (free learning resources).
6. Project Journey / Impact page (visits, photos with faces blurred, stats).
7. Mentor Connect (volunteer profiles + question form).
8. PWA (installable, works on slow connections).

For each new feature: add it to BRIEF.md first, branch, Plan Mode, build in
steps, test on the Vercel preview, merge, update this file.

---

## 11. Commit history highlights

Setup, data model + 10 careers with sources, base theme + styleguide,
careers list with filters, detail pages + 404, home page, clean typography +
no em dashes + image-ready, motion pass, critique fixes, polish
(chip, focus ring, text wrap, gutters), final QA (icons, sitemap, OG image),
live URL + QR code, card arrow fix.
