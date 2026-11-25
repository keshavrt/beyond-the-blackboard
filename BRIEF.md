# BRIEF: Beyond the Blackboard: Career Explorer (MVP)

## What it is

A career-guidance website for Indian school students. Version 1 was the Career
Explorer only; the My Better Life section was added next (see below). Other
features (quiz, roadmap card, scholarships, site-wide Hindi) come later, but
structure the code so they can be added without rewrites.

## Context

Built by IIT Roorkee students for a Community Outreach course (MIC-399).
Evaluated by a professor: it must look polished, professional and clearly useful.

## Audience

School students, Class 8–12, many from low-resource backgrounds and first-
generation learners. Use simple English (short sentences, no jargon).
Must work well on cheap Android phones and slow internet.

## Goal

Help a student understand: "What could I become, and how do I get there?"

## Pages (MVP)

1. Home (/)
   - Hero: project name + one-line purpose + CTA "Explore careers ↗"
   - Short "How it works" (3 steps: browse → open a career → see the path)
   - Featured careers (4)
   - Footer: project credit (IIT Roorkee · Community Outreach), team link later
2. Careers list (/careers)
   - Grid/list of all careers
   - Search by name
   - Filter by stream: Science / Commerce / Arts / Vocational / Any
   - Filter by interest: Helping people / Building & fixing / Creative /
     Numbers & business / Nature & outdoors / Technology
3. Career detail (/careers/[slug])
   - Name + one-line description
   - What they do (3–4 bullets)
   - Subjects & stream needed
   - Path: after 10th → after 12th → course/degree → job (step timeline)
   - Duration (approx. years of study after 12th)
   - Key entrance exams (if any)
   - Salary range at start (approx., in ₹ per month, marked "approximate")
   - Skills needed
   - Related careers (2–3 links)

## Career data

- Stored in one typed data file (src/data/careers.ts), no backend, no database.
- All user-facing text kept in data, not hard-coded in components (Hindi later).
- Start with 8 careers:
  Doctor, Software Engineer, Teacher, Nurse, Police Officer,
  Electrician, Graphic Designer, Chartered Accountant
- Facts must be accurate for India. Mark salaries as approximate.

## Technical rules

- Static site (all pages pre-rendered). No login, no backend.
- Fast: minimal JS on content pages, optimized fonts and images.
- Accessible: keyboard navigation, good contrast (see DESIGN.md).

## My Better Life (live, merged to `main`)

A short, bilingual reflection course for students, inspired by the My Better Life
workshop by Professor Navneet Arora. Students read 7 lessons and write in a personal
notebook. Content and structure come from a standalone prototype (kept locally in
`reference/`, gitignored); it is rebuilt in our design system, not copied.

### Routes
- `/my-better-life`: intro + 7 lesson cards.
- `/my-better-life/[slug]`: 7 static lesson pages (slugs from the English titles,
  e.g. `choose-what-you-learn`).
- `/my-better-life/notebook`: the notebook (cover + pages 1 to 7), client-side.

### Scope
- Lessons + a simple notebook for ONE student, saved in `localStorage` under one
  namespaced key (`btb:better-life:v1`). The language choice is a separate key
  (`btb:better-life:lang`). No account, no backend.
- Linked from the header nav ("03 My Better Life") and a short home page section.
- Dropped from the prototype: multi-student profiles, the welcome/profile screen,
  toasts and the background image.
- EN/HI toggle on the My Better Life pages only. The rest of the site stays English.
- This section uses its own `Bilingual` type (`src/types/better-life.ts`);
  `LocalizedText` in `src/types/career.ts` is unchanged.
- Workshop quotes: the Hindi original always shows; in English mode the English
  translation shows under it.
- Page metadata (title, description) is English only.
- Credit on every page of the section: "Inspired by the My Better Life workshop by
  Professor Navneet Arora".

### Data
- Types: `src/types/better-life.ts`. Content (lessons, UI labels, notebook pages,
  metadata): `src/content/better-life.ts`.
- Same text rules as the rest of the site, in both languages: no em dashes, no
  arrows inside text (links and buttons add their own), simple English.

## Out of scope for now

Quiz, roadmap generator, scholarships, site-wide Hindi, mentor form,
journey page, PWA.
