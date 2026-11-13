# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **First:** founders and NGOs with something to build (web platforms, AI and ML features, data foundations, security reviews).
- **Second:** recruiters and hiring managers for AI/ML and full stack roles.

## Product Purpose

Lewis Magangi's portfolio and service site. Its job is to get a qualified visitor to book a free 30 minute discovery call, with proof on the way: live sites, case studies, reference letters and certificates.

## Positioning

A Nairobi software engineer with a computer forensics degree who ships Next.js and Django, now moving into AI and ML (DataCamp Associate AI Engineer, Aug 2026; Machine Learning Engineer, finished 9 Nov 2026). A competitive chess player: at WEKUSA 2023, his 7/9 on board 2 helped JOOUST finish second runners up.

## Operating Context

- Public site plus an admin CMS (projects, services and pricing, blog, certificates, awards, references, chess, challenges, books, experience, education, skills; inbox for messages, bookings, transcripts, client reviews).
- In-house booking in EAT with the visitor's local time beside each slot.
- Client reviews arrive through `/review` and stay hidden until Lewis approves them in Admin › References.

## Capabilities and Constraints

- Stack: Next.js 14 (App Router), Prisma on Neon Postgres, Tailwind, shadcn/ui, hosted on Vercel.
- **Private by default:** the BSc transcript is shown only through an approved request that lasts 60 days. Never publish the Jawabu Credit role, the chaplaincy certificate, the unfinished ALX programmes (Cyber Security, Data Analysis, Data Science, Data Engineering), or any ID documents.
- Lewis never edits a reviewer's words.
- Pricing is typical, per project, in US dollars: Bronze $600, Silver $900, Gold $1,200.
- Client reviews reach Lewis as one daily digest (07:00 EAT) while any are waiting, not one email per review.

## Brand Commitments

- Voice: first person and plain ("I build", "I led"). Clients first, hiring managers second.
- Sentence case everywhere. Digits for numbers. No hyphens or em dashes used as dashes, no middle dots between fragments.
- Handles: GitHub LewisMagangi, LinkedIn lewis-magangi, LeetCode LewisMagangi, Codewars LewisMagangi, Lichess Lique, Chess.com liquelaliqour.

## Evidence on Hand

- Content and copy: `design/v8/boards/*.dc.html` and `design/v8/data/*.json`.
- Certificates: `public/certificates/` (22 course certificates in `courses/`, the professional ones, Educative, OctoPrep, the 2021 chess certificate).
- Chess: 15 best Lichess wins with clocks (`design/v8/data/lichess-best-wins.json`); cburnett pieces in `public/pieces/cburnett/` (GPLv2+, keep the credit line).
- References: only words from real reference letters and approved client reviews. Dr Castro is quoted once on the whole site.
- **Never fabricate** testimonials, numbers, clients or results. Where a fact is missing, leave a clear empty state for the admin to fill.

## Product Principles

1. **Proof before claims.** Every claim links to a live site, a letter or a certificate. A number and a unit beat an adjective.
2. **One next step per view.** That step is the free discovery call, and the last call to action on a page matches the first, word for word.
3. **Story over inventory.** Each section sets up the next. Show three or four items and put the rest behind a link or a disclosure.
4. **Less is more.** Remove a section before you style it.

## Accessibility & Inclusion

- Text contrast 4.5:1 in both themes (3:1 from 24px up); control boundaries 3:1.
- Visible focus on everything; a skip link first in the tab order; no skipped heading levels.
- Touch targets at least 24px, and 44px under 820px.
- Anything draggable also works by click and keyboard.
- `prefers-reduced-motion` turns off reveals, the cursor and flips.
- No horizontal scroll at 390px; the phone book bar never covers the footer.
