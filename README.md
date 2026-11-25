# Beyond the Blackboard

A career guide for Indian school students in Class 8 to 12. It shows what you could
become and how to get there, step by step from Class 10 to your first job.

Built by IIT Roorkee students for the Community Outreach course (MIC-399).

**Live site:** https://beyond-the-blackboard-iitr.vercel.app

## What's inside

- **Career Explorer:** 10 careers with search and filters (stream, interest), and a
  detail page for each: the path, what you need, starting pay and official sources.
- **My Better Life:** 7 short lessons on habits, attention and goals, plus a private
  notebook saved in your browser. In English and Hindi. Inspired by the My Better Life
  workshop by Professor Navneet Arora.

The site is fully static: no backend, no database, no login.

## Stack

Next.js 16 (App Router, TypeScript), Tailwind CSS v4, shadcn/ui on Base UI,
Motion, Lenis and Lucide icons. Hosted on Vercel.

## Run it

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other commands:

```bash
npx tsc --noEmit   # type check
npm run lint       # lint
npm run build      # production build
```

## Main folders

| Folder | What |
| --- | --- |
| `src/app/` | Pages and routes (`/`, `/careers`, `/my-better-life`, sitemap, 404) |
| `src/components/` | UI: `ui/` (shadcn), `brand/`, `site/` (header, footer), `home/`, `career/`, `better-life/` |
| `src/data/` | Career data with official sources |
| `src/content/` | All page text, kept out of components (My Better Life text is in English and Hindi) |
| `src/lib/` | Helpers: filters, formatting, site URL, My Better Life storage |
| `src/types/` | TypeScript types |
| `public/` | Static files (QR code, career photos later) |

## Read next

- [HANDOFF.md](HANDOFF.md): current state, decisions, workflow and open items. Start here.
- [DESIGN.md](DESIGN.md): the design system (colours, type, components, motion).
- [BRIEF.md](BRIEF.md): what we are building and for whom.
