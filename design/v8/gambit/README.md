Gambit is the design system for Lewis Magangi's portfolio and service site. Lewis is a software engineer in Nairobi with a computer forensics degree. He builds web platforms, AI and ML features, data foundations and security reviews, and plays competitive chess. The system is **quiet, exact and measured**. The page is black or white, with one white (or black) action. The story plays out like a game: one move per section.

v7 (5 Nov 2026) moves the type to Poppins and adds GSAP motion, a living cursor, Task view, a rebuilt phone nav and private document requests. v6 was rebuilt with these tools:
- **Impeccable:** critique, audit, colorize, quieter, distill, clarify, typeset, adapt, animate, delight, overdrive, harden, polish and detect.
- **ElayaDesign's landing page skill.**
- **MengTo's awwwards, editorial and pricing skills.**
- **Emil Kowalski's animation skills.**
- **shadcn/ui.**
- **Vercel's Web Interface Guidelines.**
- **UI/UX Pro Max.**

What each tool changed is recorded in `design-rationale.md`, and the deviations in `ux-standards.md`. `shadcn-handoff.md` maps every token to shadcn/ui for the Next.js build.

Two themes ship together: dark (the default) and light. The sun, moon and monitor icons in the nav switch between them. Every colour token has both values; never hard-code a hex.

## Principles

1. **Proof before claims.** Every claim links to a live site, a letter or a certificate. A number and a unit beat an adjective.
2. **One next step per view.** That step is the free discovery call. The primary button is the only filled button on a screen, and the last call to action on a page matches the first, word for word.
3. **Story over inventory.** Each section sets up the next one. Show three or four items and put the rest behind a link or a disclosure.
4. **Less is more.**
   - Remove a section before you style it.
   - Use no eyebrows above headings, no stat rows under the hero, and no cards inside cards.

## Content fundamentals

- **Voice.** Write in the first person, plainly ("I build", "I led"). Clients come first and hiring managers second.
- **Casing.** Use sentence case everywhere, including buttons, headings and labels. Nothing is set in all caps.
- **Punctuation.**
  - No hyphens or em dashes in copy. Write "full stack", and "Apr 2025 to now".
  - No middle dots between fragments. Write a sentence, or use a comma.
  - Use curly quotes and the ellipsis character `…`.
- **Numbers.**
  - Use digits ("51 endpoints", "7 of 9").
  - Use tabular figures wherever numbers sit in columns.
  - Prices are typical, per project, in US dollars ($400, $800, $1,200).
- **No invented facts.** Use only testimonials from the reference letters, and only real numbers. Where a fact is missing, the design leaves a clear empty state for the admin to fill.

## Visual foundations

### Colour
- **Canvas.** `bg` is pure black in dark mode, on the landing page's background palette, and pure white in light mode.
- **Surfaces.** Raised panels use `surface` (#181818 / #fafafa). Hover and press use `surface-raised` (#1f1f1f / #f2f2f2). Most content sits flat on `bg`, separated by hairlines in `line`.
- **Primary action.** `primary` is white on black in dark mode and black on white in light mode. The green call to action is gone.
- **Accent.** `accent` equals `ink`. It marks the selected and current state: carousel dot, timeline progress, chosen slot.
- **Colour roles.**
  - `success` (green) is for status only: the availability dot, success badges and booked checks.
  - `award` (amber) marks rankings.
  - `danger` marks destructive actions.
- **Focus ring.** The focus ring is `ink`.

### Type
- **Families.** Poppins (400, 500, 600) for everything, approved by Lewis after an impeccable typeset review. Geist Mono only for notation and data: chess moves, dates in tables, handles and credential IDs. A metric matched fallback (`Poppins Fallback`, Arial with size and ascent overrides) stops text jumping while the face loads.
- **Scale.** Every size sits on the Tailwind scale.

| Style | Size / line height | Use |
|---|---|---|
| `display-xl` | 60/60 at weight 500, then 48/48 under 820px, then 36/40 under 640px | Hero, in solid ink, with meaningful line breaks (`Secure software, / built one measured / move at a time.`). No gradient text |
| `display` | 48/48 at weight 500 | Page titles and the tagline |
| `heading` | 36/40 at weight 600 | Sections |
| `title` | 20/28 | Card titles |
| `lead` | 18/28 | Introductions |
| `body` | 16/24 | Body text |
| `small` | 14/20 | Meta |
| `label` / `code` | 12/16 | |

- **Wrapping.** Headings use `text-wrap: balance`; paragraphs use `pretty`.
- **Weights.** No italics, and nothing heavier than 600. Display sizes use 500 because Poppins is wide and round; 600 at 60px reads heavy.

### Spacing and layout
- **Spacing.** 4, 8, 12, 16, 24, 32, 40, 48, 64, 80 and 96 (`space-*`). Sections are 96px apart (64px on phones), each separated by a hairline.
- **Layout.** A single 1080px column.
- **Radius.** 6, 8, 12 and 16px, plus pill. When one shape sits inside another, the inner radius equals the outer radius minus the gap.

### Navigation
- **Theme switch.** Two states only: light and dark. The device option was dropped as noise.
- **Desktop.** A floating, content-sized pill, 12px from the top, translucent and blurred (`SiteNav`).
- **Phones.** One bar: monogram and name, a short **Book** button, and a menu button whose two lines turn into a cross. The menu is a sheet under the bar: four large links, each with one line saying what is there, then the full width booking button and the theme switch. It clips open from the top (GSAP, 500ms, expo out), links rise 24px in turn, focus is trapped, Esc closes, the page behind is locked and blurred.
- **StoryRail.** Pins a move list beside the page. On phones it turns into a bottom bar that carries the booking button.

### Texture
- **Shader.** The Paper Dithering shader, drawn in `line` on a transparent ground.
- **Where it appears.** Behind the hero, the closing band, the chess band and video posters only, at most one per viewport.
- **Never.** No CSS checkerboards and no gradient backgrounds.

### Motion
- **Library.** GSAP 3.12.5 core ships inside the bundle (standard no-charge licence). It smooths and sequences; it never takes over scrolling. No ScrollTrigger pins, no smooth-scroll engine, no scroll-jacking: the page always scrolls at the visitor's speed.
- **Where GSAP runs.** The career rail fill (`quickTo`, 600ms, power3 out), the cursor (`quickTo`), Task view's entrance (backdrop, header, cards staggered 30ms from 96% scale, never from 0), the phone menu sheet, and the article progress hairline. Every one falls back to CSS when GSAP or motion is off.
- **Easing.** One curve, `--ease-out: cubic-bezier(.22, 1, .36, 1)`.
- **Durations.**
  - Hover: `--dur-fast`, 200ms.
  - Press: `--dur-press`, 160ms, `scale(.98)`.
  - Open and close: `--dur-open`, 300ms.
  - Layout changes: `--dur-layout`, 500ms.
  - Section reveal: `--dur-rise`, 700ms, rising 32px, once.
- **Authored moments.** The page has two:
  - The hero headline's words rise once on load, staggered 45ms.
  - The tagline lights word by word as it is read.
- **Reduced motion.** Keeps the fades and drops all movement.

### Cursor
On fine pointers only, a small board square follows the pointer with a trailing outline. Over anything you can use it turns 45° onto its diagonal, like a bishop's move; over carousels it reads Drag, over live sites Use, over the video Play. After two seconds still, the outline breathes very slightly. It uses `mix-blend-mode: difference`, so it reads on both themes. Text fields and live sites keep the native cursor. Touch screens and reduced motion never get it (`Cursor`, mounted by `SiteNav`).

### Icons
Phosphor Icons (regular), on a 256 grid, filled with `currentColor`, at 16, 20 or 24px. Decorative icons are `aria-hidden`.

## Components

- **Public site.**
  - `SiteNav`, `StoryRail`, `SiteFooter`
  - `Button`, `Tag`, `StatusPill`
  - `ProjectCard`, `CaseStudyCard`, `CertCard`, `AwardCard`, `ReferenceCard`
  - `Timeline` (with `controls={false}` on Home), `TimelineItem`, `StatBlock`
  - `ThemeToggle`, `ChessBoard`, `Accordion`, `CarouselControls`
- **Selling and proof (new in v6).**
  - `ServiceList`, `PricingTiers`
  - `CertificateCarousel` (certificate images, with Verify behind a disclosure)
  - `ChallengeBoard` (Lichess, Chess.com, LeetCode and Codewars, with live ratings where the API allows)
  - `Bookshelf`, `TaglineReveal`, `SplitWords`
- **Media.**
  - `DeviceMockup` (`liveUrl` renders the real site), `LiveView`
  - `BrowserFrame` (open in a new tab icon), `PhoneFrame`
  - `VideoEmbed` (poster first; the player loads on request)
- **Motion and texture.** `RevealObserver`, `Shader`, `Cursor`.
- **Career.** `Timeline` (one continuous lit line), `TaskView` (every move as a window, grouped by year, with a year scrubber and Play through; opened from the Task view button).
- **Private documents.** `AccessRequest` (ask, approve, 60 day link), `AccessQueue` (the admin inbox: approve, decline, revoke with a confirm, approve again), `AccessViewer` (approved and expired views).
- **Reading.** `ArticleToc` (contents that follow the reader and a progress hairline); `.gb-prose` for article text.
- **Booking.** `BookingWidget`.
- **Admin.**
  - `AdminSidebar`, `PageHeader`, `DataTable`, `StatusBadge`
  - `Field`, `Switch`, `ListEditor`, `FileDrop`
  - `ConfirmDialog`, `Toast`, `EmptyState`, `Icon`
- **Retired in v6.** `SectionLabel` renders nothing, because eyebrows read as template chrome. The move notation now lives in `StoryRail`.

The namespace is `window.Gambit`, and classes are prefixed `gb-`.

## Live sites in frames

`DeviceMockup liveUrl` loads the real site into both frames when they come near the viewport. The site is scaled from a 1280px or 390px viewport, and the schematic or screenshot stays as the poster until the site paints.

- **Input.** Pointer input is off until the visitor selects "Use the live site". Esc, or leaving the frame, hands the page's scroll back.
- **New tab.** Opening in a new tab is an icon in the browser bar, not the default.
- **Requirement.** The site must allow framing (no `X-Frame-Options: DENY`, no restrictive `frame-ancestors`). Vercel and Next.js defaults allow it.

## Site structure

- **Nav.** Four pages and one action: Work, Services, Career and Chess, plus **Book a call**.
- **Home.** Seven moves:
  1. Hero (offer, action, a live site)
  2. Work
  3. Tagline
  4. Services and pricing
  5. How I got here
  6. References and certificates
  7. Off the clock (challenges and reading)

  Then come the questions and "Your move", which repeats the hero's action.
- **Elsewhere.** AI and ML, Reading, Certificates, About, Blog, Contact and Privacy and terms are reached from Home and the footer.

## Private transcript requests

The academic transcript is not public. On `/education`, `AccessRequest` takes name, work email, organisation, reason and a consent tick, validated inline. Lewis approves or declines in Admin, Transcripts. Approval emails a private link (`/transcript/[token]`) that works for 60 days; the page shows who it was shared with, how long is left, and a watermark with their name and date. At expiry the link closes on its own and the page explains how to ask again. Backend: `TranscriptRequest` {name, email, org, reason, note, status PENDING, APPROVED, DECLINED, EXPIRED, REVOKED, decidedAt, expiresAt, tokenHash, views}; a daily job expires links; the file is served through a short-lived signed URL, never a public link.

## Booking

`/book` hosts `BookingWidget`:
- Weekday slots in EAT over the next four weeks, with the visitor's local time beside each.
- Inline validation.
- An .ics file on confirmation.

## The admin (CMS)

Every content type follows the same pattern:
- **List:** a `DataTable`.
- **Editor:** a side panel with Delete, Cancel and Save.
- **Delete:** a `ConfirmDialog`.
- **Empty:** an `EmptyState`.

The content types are:
- **Content:** Projects, Services and pricing, Blog, Certificates, Awards, References (with social links and an optional highlight badge), Chess, Challenges, Books, Experience, Education, Skills.
- **Inbox:** Messages, Bookings, Transcripts.

## Using it

Load, in order:
1. `tokens.css`
2. `components/bundle.css`
3. React 18
4. `components/bundle.js`

Mount components as `Gambit.X`. Set `data-theme="dark|light"` on a wrapper.

## Accessibility rules

- **Contrast.** Text holds 4.5:1 in both themes (3:1 from 24px up). Control boundaries use `line-strong` (3:1).
- **Focus.** Visible focus on everything: a 2px `ink` ring at 2px offset.
- **Targets.** At least 24px. Under 820px, every tap target is 44px (dots, chips, small buttons, card links, verify toggles).
- **Skip link.** Sits first in the tab order.
- **Headings.** Never skip a heading level. Use `gb-sr` for a visually hidden heading where the layout has none.
- **Drag.** Anything you can drag also works by click and by keyboard.
- **Video and live sites.** Video loads only when asked for. Live sites are inert until selected.
- **Layout.** No horizontal scroll at 390px. The phone book bar never covers the footer.


## v7 review fixes

- **Phone header:** the Book pill is 40px inside the 56px bar (border-box), with a 44px tap area, and steps aside while the bottom dock shows "Book a free call", so a phone never shows two Book buttons.
- **Cursor:** steps aside when the pointer enters a live site frame, leaves the window or the window loses focus. The frame keeps its own native cursor.
- **Carousel wheel:** a vertical wheel steps one slide at a time and hands back to the page at either end (kept at Lewis's request; the step gap is now 320ms). Drag, trackpad swipe, Shift + wheel, keys and dots also move them.
- **Transcript request form:** focus moves to the first field when it opens, to the first error after a failed send, and to the confirmation once sent; the consent box is tied to its error.
- **AccessQueue:** admin actions follow status, revoke asks first, every action confirms in a toast. Access lengths are 30 or 60 days.
- **Task view** carries the theme of the page that opened it, fades cards under its header, and its year rail follows the focused move.
- **Blog:** each post has its own page, empty topics are hidden, Subscribe validates inline and confirms, and on phones the contents fold behind "On this page" while the reading line stays.
- **Typography:** stat numbers, award ranks, case study results and timeline years are Poppins with tabular figures; Geist Mono stays at 12–14px for code and labels.
- Timeline dates keep a day with its month ("6 May to 6 Aug 2024" never breaks inside a date).
