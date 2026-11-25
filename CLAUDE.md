@AGENTS.md

# Project rules

Stack: Next.js (App Router), TypeScript, Tailwind v4, shadcn/ui, Motion, Lenis, Lucide.

## Sources of truth

- DESIGN.md = visual rules (dark techy theme, Sage lime accent #a9cc5a).
- BRIEF.md = content & goals.
- design-system/MASTER.md (if created) overrides tokens.
- Never invent colors, fonts, radii or shadows outside DESIGN.md. Ask if unsure.

## Banned AI-slop patterns

- Purple/blue gradients, gradient text, glassmorphism
- Rounded "bubbly" cards (DESIGN.md uses sharp corners)
- Emoji as icons, mixed icon sets (Lucide only)
- Everything center-aligned; 3 identical feature cards in a row; cards inside cards
- Inter/Roboto fonts
- Lorem ipsum, grey placeholders, buzzword copy ("seamless", "unlock", "revolutionize")
- Em dashes (—) in user-facing text (content, data, components). Use a comma, colon,
  full stop, or "to" for ranges.
- Geist Mono for headings, body, buttons or numbers. Mono is only for small code labels
  (`type-code`: [01] indices, nav numbers, file tabs, status tokens). See DESIGN.md §3.

## Required

- Follow DESIGN.md "Readability rules" on all content pages
- Hover, focus-visible, active, disabled states on everything interactive
- Mobile-first; respect prefers-reduced-motion
- Use shadcn MCP to find components before writing custom ones; restyle them to DESIGN.md
- Use Context7 for any library/API question
- When using the shadcn MCP, always name the registry explicitly (@shadcn),
  e.g. search "@shadcn/card". Searching without it returns "no registries".

## My Better Life section (`/my-better-life`)

- All its text lives in `src/content/better-life.ts` as `{ en, hi }` (`Bilingual`).
  Never hard-code either language in components.
- Render text with `<Bi text={...} />`. For things CSS can't switch (placeholder,
  aria-label, confirm() text), use `useBetterLifeLang()`.
- The Noto Sans Devanagari font is loaded only in `src/app/my-better-life/layout.tsx`.
  Never load it anywhere else (careers and home must not download it).
- Storage goes only through `src/lib/better-life-storage.ts` (one key, `btb:better-life:v1`).
- The rest of the site stays English; `LocalizedText` in `src/types/career.ts` is unchanged.

## Workflow

- Build ONE section at a time.
- After a UI change: screenshot ONLY the changed section with Playwright,
  at 375px and 1440px, check it against DESIGN.md, fix, then show me.
- Don't re-screenshot unchanged sections (saves tokens).
- Never say "done" without screenshots.
