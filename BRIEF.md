# BRIEF — Beyond the Blackboard: Career Explorer (MVP)

## What it is

A career-guidance website for Indian school students. Version 1 contains ONLY
the Career Explorer. Other features (quiz, roadmap card, scholarships, Hindi)
come later — but structure the code so they can be added without rewrites.

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

## Out of scope for now

Quiz, roadmap generator, scholarships, Hindi toggle, mentor form,
journey page, PWA.
