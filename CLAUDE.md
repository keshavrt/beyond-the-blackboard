@AGENTS.md

# Project rules

Stack: Next.js (App Router), TypeScript, Tailwind v4, shadcn/ui, Motion, Lenis, Lucide.

## Sources of truth

- DESIGN.md = visual rules (dark techy theme, Volt lime accent #c5f82a).
- BRIEF.md (when created) = content & goals.
- design-system/MASTER.md (if created) overrides tokens.
- Never invent colors, fonts, radii or shadows outside DESIGN.md. Ask if unsure.

## Banned AI-slop patterns

- Purple/blue gradients, gradient text, glassmorphism
- Rounded "bubbly" cards (DESIGN.md uses sharp corners)
- Emoji as icons, mixed icon sets (Lucide only)
- Everything center-aligned; 3 identical feature cards in a row; cards inside cards
- Inter/Roboto fonts
- Lorem ipsum, grey placeholders, buzzword copy ("seamless", "unlock", "revolutionize")

## Required

- Follow DESIGN.md "Readability rules" on all content pages
- Hover, focus-visible, active, disabled states on everything interactive
- Mobile-first; respect prefers-reduced-motion
- Use shadcn MCP to find components before writing custom ones; restyle them to DESIGN.md
- Use Context7 for any library/API question
- When using the shadcn MCP, always name the registry explicitly (@shadcn),
  e.g. search "@shadcn/card". Searching without it returns "no registries".

## Workflow

- Build ONE section at a time.
- After a UI change: screenshot ONLY the changed section with Playwright,
  at 375px and 1440px, check it against DESIGN.md, fix, then show me.
- Don't re-screenshot unchanged sections (saves tokens).
- Never say "done" without screenshots.
