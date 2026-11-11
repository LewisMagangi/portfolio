# UX standards

How Gambit applies the UI/UX Pro Max guidance. The design-system generator was run for "developer portfolio, security, chess, dark, minimal" (variance 4, motion 3, density 3). Its output is reconciled below: what was adopted, what was rejected and why.

## Generator output vs Gambit

| Generator recommends | Gambit | Decision |
| --- | --- | --- |
| Style: Dark Mode (OLED), high contrast, visible focus, reduced motion | Dark default + Light theme | **Adopted.** Light is kept because the brief asked for both. |
| Palette: slate #0F172A ground, green #22C55E accent | #0a0a0a ground, #3dd68c / #0b7a47 accent | **Adopted the idea, kept Gambit values.** Same structure (dark ground, one green action colour); near-black matches the Vercel-like brief, and Gambit's greens pass contrast in both themes. |
| JetBrains Mono headings + IBM Plex Sans body | Geist + Geist Mono | **Rejected.** A mono display face is the most common "developer" default; Geist keeps headlines human and reserves mono for notation. |
| Shadow scale sm → xl, lift on hover | Borders, not shadows; one soft lift in Light only | **Rejected.** Hairlines read calmer and survive both themes. |
| Spacious density (24–96px) | `space-6` … `space-32` | **Adopted.** Sections 128px apart, 72px on phones. |
| Body ≥16px, line-height ≥1.5 | `body` 16/26 | **Adopted** (was 15/24). |

## Rules adopted (priority order)

1. **Accessibility (critical).** 4.5:1 text in both themes; `focus-width`/`focus-offset` ring on everything; skip link in `SiteNav`; icon-only buttons labelled; decorative icons hidden.
2. **Touch and interaction (critical).** `target-min` 24px on desktop, `target-touch` 44px under `bp-md`; carousels: mouse wheel steps a slide and releases at either end, drag glides, swipe on touch, arrow keys, and clickable progress dots as the single-pointer alternative to dragging.
3. **Performance.** Images as WebP with width and height set; the shader is one canvas per band and stops under reduced motion.
4. **Style.** One icon family (Lucide), sizes `icon-sm`/`icon-md`/`icon-lg`, 1.5px stroke; no emoji.
5. **Layout.** No horizontal page scroll at 375px; grids use `minmax(min(100%, N), 1fr)`; nav, footer and content share one `content-max` column.
6. **Type and colour.** Semantic tokens only; no raw hex in components.
7. **Animation.** Duration tokens (`--dur-fast` 160, `--dur-open` 240, `--dur-exit` 180, `--dur-rise` 280) and `--ease-out`; exits faster than entrances; nothing loops except the hero shader.
8. **Forms.** Visible labels; errors under the field with `role="alert"` and `aria-describedby`; first invalid field takes focus; `autocomplete` on name, email, organisation.
9. **Navigation.** Four links plus one CTA; current page marked by surface and `aria-current`, not colour alone; deep links for every section.
10. **Charts.** Not used.

## Page overrides

- **Chess.** The board is the hero's visual; the annotated moves are real buttons synced with the board; Previous, Play and Next have labels; the board is `role="img"` with the current position described.
- **Book a call.** One task per step (date, time, details, done); times shown in EAT and the visitor's zone; taken slots are disabled and labelled "Booked", not hidden; confirmation offers an .ics file.

## Pre-delivery checklist (last run 4 Nov 2026)

- [x] No emoji icons; one icon family and stroke
- [x] Focus visible on every control; skip link present
- [x] Targets ≥24px desktop, ≥44px under 820px
- [x] Wheel, drag, dots and keys all move the carousels (tested in a browser)
- [x] No horizontal scroll at 390px on all 13 public pages (measured scrollWidth = 390)
- [x] Reduced motion: shader speed 0, reveals, glides and press scaling disabled (CSS and JS paths)
- [x] Both themes checked; text tokens pass 4.5:1
- [ ] Real screenshots in place of schematic mockups (waiting on Lewis)

## v6 deviations and checks (5 Nov 2026)

**Deviations from Vercel's Web Interface Guidelines.**

| Guideline | Gambit | Why |
|---|---|---|
| Title Case for headings and buttons | Sentence case | Brand voice and the landing skill. Applied consistently. |
| Second person, avoid first person | First person ("I build") | A personal service site. The visitor is still addressed as "you" in actions. |
| Landing B5: gradient on the hero heading | Solid ink | Impeccable detect flags gradient text as an AI tell; quieter wins. |
| Landing B11: unlit tagline words at 25 to 35% | 42%, mixed into `bg` | Keeps 3:1 for large text even before a word lights. |
| `color-scheme`, `theme-color` | Set in the Next.js layout | Canvas boards can't set document meta; see `shadcn-handoff.md`. |

**Motion in the Next.js build.**
- MengTo's skill asks for GSAP with one smooth-scroll engine. The build uses GSAP ScrollTrigger for the headline entrance and the `StoryRail` progress, and Lenis as the only smooth scroller (disabled under reduced motion).
- The canvas prototypes use CSS and rAF equivalents with the same timings, so no library ships in the design system.

**Pre-delivery checklist (run 5 Nov 2026).**
- [x] One filled button per view, and it is never green
- [x] No eyebrows, stat rows, middle-dot strings, em dashes or hyphens in copy on public pages
- [x] Targets ≥24px on desktop, ≥44px under 820px, including dots, chips, verify toggles, card links, breadcrumbs and timeline dots (re-measured after the independent review; the frame’s new tab icon reaches 44px through a padded hit area)
- [x] No horizontal scroll at 390px on public pages and the admin boards
- [x] Heading levels never skip (Work and Book repaired)
- [x] Live sites are inert until selected; video loads on request
- [x] Reduced motion keeps opacity and removes movement (rail, book bar, words, tagline, reveals)
- [ ] Live framing confirmed on the production domains (the sandbox could not reach them)

## v7 checks (5 Nov 2026)

- [x] No scroll-jacking: no pinning, no smooth-scroll engine, no wheel interception outside the carousels, which release at either end (kept at Lewis's request)
- [x] Custom cursor only for `(hover: hover) and (pointer: fine)` without reduced motion; native cursor kept for text fields and live sites; focus rings unchanged
- [x] Task view is a modal dialog: labelled, focus trapped, Esc closes, arrow keys move between cards, focus returns to the timeline
- [x] Phone menu is a modal sheet: focus trapped, Esc closes, background locked, 44px targets
- [x] Access request: labels, `autocomplete`, inline errors with `role="alert"`, first error focused
- [x] No horizontal scroll at 390px on Education, Blog, Blog post, Transcript and Career
