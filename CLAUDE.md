# Portfolio: working notes for Claude

Lewis Magangi's portfolio: Next.js 14 (App Router), Prisma, Tailwind, shadcn/ui, with an admin CMS and in-house booking.

## Design source of truth

The redesign lives in two claude.ai artifacts (private to Lewis):

- **Gambit design system:** tokens, components (`bundle.js`), component READMEs, `README.md`, `ux-standards.md`, `design-rationale.md`, `shadcn-handoff.md`.
- **Portfolio Redesign canvas:** every page in dark and light themes, phone layouts and admin boards.

Build to those. When a board and this file disagree, the board wins. Ask Lewis before changing the copy.

**Start with `design/v8/HANDOFF.md`.** It lists everything designed in v8 but not built yet, page by page, with the data in `design/v8/data/` and the Gambit reference code in `design/v8/gambit/`. Those files carry what the private artifacts hold, so you can build without them.

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

## Standing rules added in v8

- **Motion timing:**
  - Reveals use Tilda's curve, `cubic-bezier(.19, 1, .22, 1)`.
  - Headings take 1.2s, body text 0.7s and list items 0.5s, in reading order.
  - Buttons are never part of a reveal.
- **Reading progress:** long pages use the reading battery (StoryRail). It's a hairline that fills, with a small battery at its foot. Don't add a floating section pill (tried and rejected), move labels, or dots on that line.
- **Nudges:** draw attention with the element itself, never by shaking a whole card. The book button on the course stories carries a steady, soft sheen.
- **Timeline marks:** they are true circles. Any `<button>` used as a mark needs `padding: 0` and `aspect-ratio: 1`.
- **References:**
  - Every card is the same size. A longer message opens in place ("Read the full message").
  - Client reviews come from `/review` and stay hidden until Lewis approves them in Admin › References. He never edits a reviewer's words.
- **Skills:** levels are Shipped, Trained or Learning, drawn as circles. No percentage bars, no 1 to 5 ratings. Every skill links to its evidence.
- **Chess:** use the cburnett pieces (GPLv2+, keep the credit line). Don't ship the Lichess standard sounds (non-free) or Chess.com neo pieces (proprietary). Sounds are synthesised.
- **Private by default:**
  - The BSc transcript is shown only through an approved request that lasts 60 days (`TranscriptRequest`: pending, approved, expired, revoked, declined; the expiry job runs at midnight EAT).
  - Never publish: the Jawabu Credit role, the chaplaincy certificate, the unfinished ALX programmes (Cyber Security, Data Analysis, Data Science, Data Engineering), or any ID documents.
- **Content facts:**
  - BSc started in 2020.
  - Chess: 2021 board 3, 3/5; 2022 board 3, 2/5; 2023 board 2, 7/9.
  - Pricing: Bronze $600, Silver $900, Gold $1,200 (per project, typical).
  - Chess team result: at WEKUSA 2023, Lewis's 7/9 on board 2 helped JOOUST finish second runners up.
  - DataCamp: Associate AI Engineer (Aug 2026, 10 courses) and Machine Learning Engineer (finished 9 Nov 2026, 12 courses, 43 hours).
  - Dr Castro is quoted once on the whole site.
  - Handles:
    - GitHub: LewisMagangi
    - LinkedIn: lewis-magangi
    - LeetCode: LewisMagangi
    - Codewars: LewisMagangi
    - Lichess: Lique
    - Chess.com: liquelaliqour

## Standing rules added in v9

- **Frames:** only deployed sites get a device frame. A build that isn't running keeps its words and case study, never a stand in screen. One device at a time: the bar switches desktop (1440) and phone (390) in a stage that keeps its height.
- **Wamumbi** is the hero frame, with the before and after curtain (wamumbi.vercel.app under wamumbi-red.vercel.app). It waits for a drag, the arrow keys or "Play the change".
- **Motion budget (impeccable):** the hero words and the tagline reveal are the authored moments; section headings keep a quiet rise; body text and list items do not animate. This replaces the v8 reveal timings for body and lists.
- **Case studies:** the period sits under the title (no labels above headings), and the result reads as one sentence, not a stat row.
- **Hero heading:** solid colour, semibold (600). No gradient text.
