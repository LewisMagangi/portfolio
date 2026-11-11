# Design rationale

The plan behind Gambit, written the way the frontend-design guidance asks: subject first, then a compact plan, then a review of that plan against the generic defaults, and what changed because of it.

## Subject, audience, job

- **Subject:** Lewis Magangi, a Nairobi software engineer with a security degree, shipping Next.js and Django, now moving into AI and ML. Competitive chess player.
- **Audience:** recruiters and hiring managers for AI/ML and full-stack roles; founders and NGOs with a build.
- **Primary job:** get a qualified visitor to book a free 30-minute discovery call, with proof (case studies, results, letters) on the way.

## Plan

**Colour (dark / light).** `bg` #0a0a0a / #fafaf9 · `surface` #111111 / #ffffff · `ink` #ededed / #0a0a0a · `accent` #3dd68c / #0b7a47 · `award` #f5b14c / #8a5300. The brief asked for a Vercel-like dark theme, so the ground stays near-black. The green is not decoration: it is the colour a chess engine uses for the best move, and it is spent only on the next action (the CTA, the current move, the focus ring).

**Type.** Geist for everything, Geist Mono only for things that are genuinely notation or data (moves, metrics, scores). One family, two cuts, so the personality comes from what is set in mono, not from a second display face.

**Layout.**

```
Home                                Chess
┌──────────────────────────────┐    ┌──────────────────────────────┐
│ nav: 4 links      Book a call│    │ nav                          │
├──────────────┬───────────────┤    ├──────────────┬───────────────┤
│ headline     │ desktop+phone │    │ headline     │   the board   │
│ CTA  ·  work │  (dithered    │    │ 3 stats      │   (live)      │
│              │   texture)    │    ├──────────────┴───────────────┤
├──────────────┴───────────────┤    │ 7 annotated moves, 2 columns │
│ case studies  ◀ drag ▶       │    ├──────────────────────────────┤
│ 4 career moves → full journey│    │ championships                │
│ AI & ML (accordion)          │    └──────────────────────────────┘
│ 4 awards │ 4 certs ▶ │ 4 refs│
│ chess teaser → Chess page    │
│ book a call (portrait)       │
└──────────────────────────────┘
```

Left-aligned throughout on a 1080px column; sections 128px apart on desktop, 72px on phones.

**Principles.** One bold idea (the career as an opening, on the Chess page; a dithered "engine screen" texture behind three bands). Everything else quiet: hairlines, one radius family, no shadows in dark. Numbers over adjectives; every claim links to proof.

## Review against the generic defaults, and what changed

| Default the plan drifted toward | Why it read as generic | Change |
| --- | --- | --- |
| A notation eyebrow above every heading on every page | Template chrome regardless of subject | Move notation only on Home, where the sections really are a sequence (1. e4 → 8. …). Inner pages lose it. |
| Mono micro-labels for meta lines and hints | The commonest generated tell | Mono kept for notation and data only; meta lines and hints are sans `small`. |
| `·`-joined meta strings | Fragments instead of sentences | Rewritten as short sentences or split into two lines. |
| Fade-up on every group | Scattered motion | One reveal per section at most; the hero is the only orchestrated moment; disclosure is on demand. |
| Every list shown in full on Home | Overflow, no room to breathe | Each Home section caps at 3–4 items with a link to the full page. |
| Chess board in the Home hero | Clever, but buried the work | Board moved to the Chess page; the hero shows the work on desktop and phone. |
| CSS checkerboard motif | Flat and static | Replaced by the Paper dithering shader (retro 4×4/8×8 ordered dither). |
| Arrows appended to link text | Decoration in copy | Dropped from internal links; external links keep the Lucide arrow-up-right icon only. |

Kept on purpose, with reasons: near-black ground (explicit brief), one green accent (meaning: the next move), Geist (Vercel-like brief; legibility at 16px).

## v6 (5 Nov 2026): the impeccable pass

**Inputs.**
- Lewis's Portfolio.pdf brief.
- An independent review of every earlier instruction.
- Two isolated impeccable critiques:
  - A, the design review: Nielsen 23/32. Its verdict: "the content is specific, the structure is a generic template".
  - B, the detector and browser evidence: oversized h1, skipped headings, small targets, and Geist flagged as overused.

**Decisions from Lewis.**
- Clients first, hiring second.
- The signature moment is the scroll-played opening.
- The nav is Work, Services, Career and Chess.

**Visual thesis.** A quiet black page where the story plays like a game: one move per section, a single white action, and the real sites running inside the frames.

| Command / skill | Finding | Change |
|---|---|---|
| colorize | Green CTA against the owner's brief; green also on notation, links and shaders | `primary` is ink (white on black, black on white). Green survives only as `success` for status. Focus ring is ink. |
| quieter | Tinted near-black #0a0a0a and warm greys (frontend-design tell); card on card | Pure #000 / #fff canvas with landing B4 surfaces; neutral greys; rows and hairlines before cards. |
| typeset | 72px hero flagged oversized; 13 and 15px sizes off scale | Tailwind scale only (60, 48, 36, 30, 20, 18, 16, 14, 12). Hero 60px with meaningful line breaks, in solid ink: the landing skill asks for a text gradient, but impeccable detect flags gradient text as decoration and the brief says less is more. |
| distill | 10 sections and 14 phone screens; Water ATM shown 4 times; stat row; eyebrows | Seven moves. Awards fold into the timeline. Certificates sit under trust. Writing becomes a footer link. Stat row and `SectionLabel` eyebrows are retired. |
| clarify | Hero opened with a recruiter pill; jargon led the case studies | Hero names the four services and who they are for. The CV link sits on its own line for hiring managers. Case studies lead with the problem in client language. |
| animate / Emil | Scattered reveals, 280ms rises | One curve (.22, 1, .36, 1). Hover 200ms; press 160ms at scale .98; reveal 700ms rising 32px, once. Two authored moments: the headline words rise, and the tagline lights. |
| overdrive | (Lewis chose the direction) | `StoryRail`: a move list that advances with the section in view. On phones it becomes the bottom booking bar that critique A asked for. |
| delight | Live proof was screenshots | `LiveView` runs the real site in the frame. It is inert until selected, Esc releases it, and an icon opens it in a new tab. |
| harden | Timeline dots 16×10; chips, dots and links under 44px on phones; 9px chess coordinates; h1 then h3 | Hit areas padded; every tap target 44px under 820px; coordinates 12px; headings repaired on Work and Book. |
| adapt | Phone path had no booking action after the hero; admin boards overflowed at 390; long URLs ran into the frame icon | Bottom book bar; full height menu; admin sidebar becomes a scrolling strip and tables scroll inside their card; the frame URL truncates with an ellipsis. |
| polish (independent review) | A booking hint still said “pick a green date”; service chips stretched; an About link pointed at a missing anchor; leftover hyphens; Chess still had a stat row | Copy fixed (“pick an open date”), chips top aligned, link repaired, compounds rewritten, Chess numbers folded into a sentence. |
| landing page (ElayaDesign) | No pricing, FAQ or risk reversal; final CTA labelled differently | Services and pricing, three steps, six questions and the free call as risk reversal. The final CTA matches the hero word for word. Floating nav pill. Privacy and terms. |
| MengTo awwwards / pricing | Direction before decoration; pricing clarity | The visual thesis above. Tiers are cumulative ("Everything in Standard, plus"). No invented "most popular" badge. |
| shadcn | Tokens needed a framework mapping | `shadcn-handoff.md`. |

**Kept on purpose.** Geist, despite the overused-font flag: the brief asks for Vercel-like, and the landing skill lists it first. The Paper shader, as the one texture, subordinate to content.

## v7 (5 Nov 2026): Poppins, motion and the private transcript

**Requests from Lewis.** Move to Poppins after a skills review; drop the device theme option; a transcript request with 60 day access; Career without the current role panel and with studies moved to Education; a Task view for the career replay; a smoother lit line; a better phone nav; referee social links; Irene's words tied to Project Nexus; a finished Blog; a subtle living cursor; GSAP for motion, without scroll-jacking.

| Command / skill | Decision |
|---|---|
| typeset (impeccable), landing skill, frontend-design | Poppins is on the landing skill's list and not on impeccable's overused list. It is about 10% wider than Geist, so display drops to weight 500, tracking −0.02em, and the hero is re-broken by phrase. A metric matched fallback avoids layout shift. Geist Mono stays for notation. |
| animate (impeccable), Emil Kowalski | One continuous rail fill replaces the stepped segments; it eases to the reading line with GSAP `quickTo`. Dots light as the line passes them. Entrances use ease out and start from 96% scale, never 0. Exits are faster than entrances. |
| overdrive (impeccable) | Task view: the career as a desk of windows, grouped by year, with a scrubber and Play through, after Windows Task View. It opens over a blurred page, keeps focus inside, and Esc returns you to the exact move. |
| delight (impeccable) | The cursor is a board square that turns onto its diagonal over anything usable. It reads Drag, Use or Play where that is the action. It breathes only when the pointer is still. It never shows on touch or under reduced motion. |
| adapt (impeccable) | The phone nav is rebuilt as one bar plus a sheet: the booking action is always one tap away, links carry a line of context, and theme sits in the sheet. |
| harden (impeccable) | The access request validates inline, focuses the first error, and explains what happens next. The viewer has explicit expired and approved states. Admin can approve, decline and revoke. |
| clarify (impeccable) | Irene's reference now leads the trust section, tied to Project Nexus, with "Among the top scores in my cohort" as its badge and a link to the presentation. |
| MengTo awwwards | GSAP for choreography, but no smooth-scroll engine, because Lewis asked for no scroll-jacking. |
