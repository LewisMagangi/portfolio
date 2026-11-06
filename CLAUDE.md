# Portfolio: working notes for Claude

Lewis Magangi's portfolio: Next.js 14 (App Router), Prisma, Tailwind, shadcn/ui, with an admin CMS and in-house booking.

## Design source of truth

The redesign lives in two claude.ai artifacts (private to Lewis):

- **Gambit design system:** tokens, components (`bundle.js`), component READMEs, `README.md`, `ux-standards.md`, `design-rationale.md`, `shadcn-handoff.md`.
- **Portfolio Redesign canvas:** every page in dark and light themes, phone layouts and admin boards.

Build to those. When a board and this file disagree, the board wins. Ask Lewis before changing the copy.

## Project skills (`.claude/skills/`)

Load the skill before doing the kind of work it covers.

| Work | Skill |
|---|---|
| Any UI change: design, critique, audit, polish, harden, adapt, typeset, delight | `impeccable` (start with `impeccable context`) |
| Visual direction for a new surface | `frontend-design` |
| Home, Services and pricing, any marketing section: type scale, CTAs, copy rules | `landing-page-design`, `landing-page`, `pricing-page` |
| Motion: build | `animate`, `choreograph` |
| Motion: review | `review-animations`, `improve-animations`, `find-animation-opportunities` |
| Motion: philosophy and polish | `emil-design-eng` |
| Scroll-led storytelling, timelines, the case study pages | `build-awwwards-quality-sites`, `scroll-progress-timeline`, `editorial-portfolio-chapters` |
| Hero and footer dither backgrounds | `dither-background` |
| Adding or styling shadcn/ui components | `shadcn` |
| Accessibility and interface checks before merging UI | `web-design-guidelines` (Vercel's guidelines) |

## Standing rules from the design (v7)

- **Type:**
  - Poppins everywhere, with Geist Mono only for small code and labels.
  - Sentence case.
  - No em dashes or hyphens used as dashes in copy.
- **Colour:**
  - Pure black and white canvases.
  - The primary action is white in dark mode and black in light mode. There is one per view: "Book a free discovery call".
  - Green is only for status, never on a button. No green hover line.
- **Nav:**
  - Exactly Work, Services, Career and Chess, plus Book.
  - The theme switch has light and dark only.
- **Motion:**
  - Use GSAP core.
  - No scroll-jacking: no pinning and no smooth-scroll library.
  - The one exception is the carousels. A vertical mouse wheel steps one slide, and the page takes over again at either end (Lewis asked to keep this).
  - Respect `prefers-reduced-motion`.
- **Cursor:** the custom cursor runs only on mouse (fine pointer) devices. It falls back to the native cursor over text fields and iframes, and is off with reduced motion.
- **Touch targets:** 44px under 820px.
- **Private by default:**
  - The BSc transcript is shown only through an approved request that lasts 60 days (`TranscriptRequest`: pending, approved, expired, revoked, declined; the expiry job runs at midnight EAT).
  - Never publish: the Jawabu Credit role, the chaplaincy certificate, the unfinished ALX programmes (Cyber Security, Data Analysis, Data Science, Data Engineering), or any ID documents.
- **Content facts:**
  - BSc started in 2020.
  - Chess: 2021 board 3, 3/5; 2022 board 3, 2/5; 2023 board 2, 7/9.
  - Pricing: $400, $800, $1,200.
  - Dr Castro is quoted once on the whole site.
  - Handles:
    - GitHub: LewisMagangi
    - LinkedIn: lewis-magangi
    - LeetCode: LewisMagangi
    - Codewars: LewisMagangi
    - Lichess: Lique
    - Chess.com: liquelaliqour
