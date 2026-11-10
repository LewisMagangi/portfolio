# Design v8 handoff (10 Nov 2026)

Everything here is designed and approved on the claude.ai canvas ("Portfolio Redesign — Wireframes & Screens") and in the Gambit design system artifact, but **none of it is built in the app yet**. This folder carries what you need to build it without access to those artifacts.

Read `CLAUDE.md` first. The standing rules there still apply. Load the project skills it lists before each kind of work (`impeccable`, `emil-animate`, `shadcn`, `web-design-guidelines` and so on).

## What is in this folder

| Path | What it is |
|---|---|
| `gambit/components/bundle.js`, `bundle.css` | Gambit v8.7, the working reference implementation of every component, in React without JSX. **Port** the components named below into `components/` as typed React and Tailwind. Don't import the bundle into the app. |
| `gambit/components/*/README.md` | Specs for the three new or rebuilt components. |
| `data/skills.json` | The 32 skills in six groups, each with a level and evidence. |
| `data/course-stories.json` | The two DataCamp tracks. Each has 10 or 12 courses in date order, with chapters, a short description, a verify URL and a certificate image path. |
| `data/lichess-best-wins.json` | Lique's top five wins in bullet, blitz and rapid (15 games), with UCI and SAN moves. All 15 replay as legal moves, checked with python-chess. |
| `data/content.json` | All other copy and content changed in v8: pricing, the Home skills teaser, ten Home milestones, the new Education programmes, the AI and ML page, certificates, Irene's review, and chess. |
| `../../public/certificates/courses/*.jpg` | 22 course certificates, 880 by 508. |
| `../../public/certificates/machine-learning-engineer.png` | The ML Engineer track certificate. |
| `../../public/pieces/cburnett/*.svg` | The chess piece set. GPLv2+, see its `LICENSE.md`. Keep the credit line under the board. |

## Pages

### Home (`/`)
1. **Skills teaser** right after Work: "What I build it with." Four columns and one link to `/skills` (`content.json › homeSkillsTeaser`).
2. **How I got here:** ten milestones (`homeMilestones`). Use the same Timeline as Career with **scroll spy on**, so the line fills as you read. Each item's panel ends with "The full move on the career page", linking to `/career#<anchor>`.
3. **Pricing:** Bronze $600, Silver $900 and Gold $1,200. Update the FAQ answer too.
4. **References:**
   - Irene's card is the same size as the others; she is no longer the featured card.
   - Her card shows one key line. A "Read Irene's full message" disclosure opens the full text in place (ReferenceCard `full` and `moreLabel` props).
   - Add the "Worked with me? Add a review" button with its note.
5. **Certificates carousel:** add ML Engineer and the ALX certificates, and remove Educative (`certificates.professional`).
6. **Off the clock:** the WEKUSA copy (`chess.homeOffTheClock`).
7. **Reading battery** (StoryRail): items are Work, Skills, Services, How I got here, References, Off the clock, Questions and Your move. Move labels are gone.

### Skills (`/skills`, new)
- **Header:** "The tools behind the work." with a legend of three circles: Shipped (filled), Trained (half) and Learning (outline).
- **Jump chips:** one per group, each with its skill count.
- **Groups:** a sticky heading on the left and rows on the right. Each row has the name and how it was used, the level, and evidence links.
- **Below the groups:** a "Just finished, Nov 2026" panel for ML Engineer, then a closing CTA that matches the hero ("Book a free discovery call").
- **Data:** `data/skills.json`. Add Skills to the footer under Explore. **The nav stays at four links.**

### Add a review (`/review`, new)
- **Form fields:**
  - name, email (private), role, organisation (optional)
  - relationship, a select of: Client project, Colleague, Team I led, Mentor or lecturer, Other
  - project (optional)
  - review: required, 40 to 800 characters
  - LinkedIn or website (optional, URL)
  - a required consent checkbox: "I agree to my name, role and review appearing on this site. I can ask for it to come down at any time."
- **On submit:** a thank-you state that uses their first name, explains that the review shows once confirmed, and links back to the references.
- **Behind it:** create a `Testimonial` with `status: PENDING` and email Lewis.

### Admin › References (client reviews queue)
- **Queue:** a "Reviews waiting for you" list above the table. Each item shows the name, role and when it was sent; the review text; and chips for relationship, project, email, link and consent.
- **Actions:**
  - **Approve and publish:** sets `APPROVED`, appends the review to the Home references and sends a thank-you email.
  - **Decline:** sets `REJECTED`. Nothing is sent.
  - **Email them:** a `mailto:` link.
  - **Undo:** every action can be undone straight after.
- **Sidebar:** shows a pending count on References.
- **Table:** add a "Client reviews" filter. **Lewis never edits a reviewer's words.**

### Career (`/career`)
- **Anchors:** every timeline item gets `id = slug(title)`, so the Home links resolve.
- **Last move:** replace it with `careerLastMove`, ML Engineer finished in Nov 2026.
- **Battery:** add the reading battery, with one item per year.

### Education (`/education`)
- **New cards:** add four programme cards after BSc and ALX SE (`educationProgrammes.added`).
- **Flip cards:** then the two DataCamp tracks as **CourseStory** flip cards (`data/course-stories.json`).
- **"Latest" section:** replaces "Still studying".
- **Battery:** add the reading battery.

### AI and ML (`/ai-ml`)
- The banner now reads finished: "Completed 9 Nov 2026".
- Add the Machine Learning Engineer card as the first card (`aiMlPage`).

### Certificates (`/certificates`)
- Nine professional certificates. The ML Engineer card goes first in "AI and data". Don't touch the existing "what each one taught" lists.
- Replace "Off the clock" with **Other certificates**: Educative, OctoPrep and the 2021 chess certificate.
- The filter reads "All, 9".

### Services (`/services`) and Admin › Services
- Bronze $600, Silver $900 and Gold $1,200. "Builds on" now refers to tier names.

### Chess (`/chess`)
- **Remove** the Italian Game career board and the "Seven moves" section.
- **Hero:** the copy, plus **GameTheatre** (`data/lichess-best-wins.json`, pieces from `/pieces/cburnett/`).
- **"Online, as Lique."** with three facts: bullet peak 2117 from 14,024 games, blitz peak 1945 from 5,033, rapid peak 2024 from 637.
- **Championships** renamed to WEKUSA (`chess.events`).
- **Battery:** add the reading battery.
- **Admin › Chess:** add a "Refresh best wins from Lichess" action. The endpoints are in the data file's `source` field.

## Components to port (reference: `gambit/components/bundle.js`)

- **StoryRail, the reading battery** (`function StoryRail`, `function Battery`):
  - A 1px line at the left of the 1080px column fills with scroll progress (GSAP `quickTo` on `scaleY`), shown from 1280px and wider.
  - At its foot sits a battery: a 36 by 18 cell with a 2px nub. Its inner fill scales on X with a faint ink wash and turns solid at 100%.
  - At 820px and below, the battery sits in the bottom book bar.
  - **No floating pill, no move labels, no dots.** A Preston Booth style pill was tried and rejected.
- **CourseStory** (`function CourseStory`, `StoryRing`):
  - **Face:** a programme card with a book button.
  - **Nudge on the book button:**
    - It always carries a soft sheen every 3.6s, and its edge breathes. This is white on dark and ink on light.
    - The first time the card comes into view, the book icon tilts twice, a ring pulses, and a "Play the courses" label slides out.
    - **The card itself never moves.**
  - **Flip:** a 3D `rotateY`, 0.8s on the Tilda curve.
  - **Back:**
    - Loads first (the ring spins), then plays courses at 7s each.
    - Segmented bars fill **linearly** and only start once the certificate image has loaded. The next image preloads.
    - Tap the right 70% for the next course and the left 30% for the one before. Press and hold, or use the pause button, to pause.
    - The arrow keys, Space and Esc work. Slides ease in.
  - **Reduced motion:** a crossfade instead of the flip, and it starts paused.
- **GameTheatre** (`function GameTheatre`, plus the helpers `gtPlay`, `gtBoard` and `gtSound`):
  - **Replays:** a watching pace of 520, 720 or 900ms per move. Each game rests 2.6s on its final position, then the next starts. Replays run only while the board is on screen.
  - **Labels:** "2nd best rated blitz win" and so on. Players and ratings are shown Lichess-style.
  - **Scrolling:** the wheel over the board steps through moves (a non-passive listener on the board only). Arrows, Space, Home and End work when the board has focus.
  - **Board colours:** three window-style buttons for Gambit greys (the default), Lichess `#f0d9b5`/`#b58863` and Chess.com-style `#ebecd0`/`#739552`. The choice persists in localStorage.
  - **Sound:** a toggle, off by default. Sounds are **synthesised with WebAudio**.
  - **Live:** a switch polls `GET https://lichess.org/api/users/status?ids=Lique&withGameIds=true` every 20s. When Lique is playing, it streams `GET https://lichess.org/api/stream/game/{id}` (NDJSON) onto the same board, with ticking clocks.
- **Timeline:**
  - The marks are true circles. The ovals came from default `<button>` padding, so set `padding: 0` and `aspect-ratio: 1`.
  - Items accept `id`.
- **ReferenceCard:** gains `full` and `moreLabel`, an in-place disclosure.
- **Shader:** `minPixelRatio: 1`, `maxPixelCount: 1280*720`, and `speed: 0` while off screen (IntersectionObserver). This fixed the hover lag.
- **Motion tokens (Tilda timing):**
  - The easing is `--ease-tilda: cubic-bezier(.19, 1, .22, 1)`.
  - Revealed headings: 1.2s rising 48px. Body text: 0.7s rising 32px, after 100ms. List items: 0.5s rising 24px, staggered by 60ms from 200ms.
  - The hero SplitWords take 1.2s with a 60ms stagger.
  - All of it is off under reduced motion. Buttons are never part of the reveal.

## Data model changes (Prisma)

- **`Testimonial`** already has a PENDING, APPROVED and REJECTED status. Extend it rather than adding a model:
  - `email String?` (private), `relation String?`, `project String?`, `link String?`
  - `consentAt DateTime?`
  - `source TestimonialSource @default(LETTER)`, where the enum is `LETTER | CLIENT_REVIEW`
  - `quote String?`, the short line on the card
  - `letterUrl String?`, `result String?`, `mark String?`, `orderIndex Int @default(0)`
- **`Skill`:**
  - Add `level SkillLevel @default(SHIPPED)` (SHIPPED | TRAINED | LEARNING), `how String?` and `evidence Json?` (labels and hrefs).
  - Add `AI_ML` to `SkillCategory`.
  - `proficiencyLevel` becomes unused; keep it for now.
- **`Course`** (new): `trackId`, `title`, `completedAt`, `hours`, `about`, `chapters String[]`, `verifyUrl`, `image`, `orderIndex`.
- **`Track`** (new): `title`, `org`, `dates`, `result`, `certificateUrl?`, `groups Json`. Admin › Education edits both.
- **`ChessGame`** (new, a cache): `lichessId @unique`, `speed`, `rank`, `me`, `opp`, `oppRating`, `myRating`, `opening`, `clock`, `playedAt`, `result`, `uci`, `san`, `refreshedAt`.

## Licensing (keep these decisions)
- The Lichess **standard sound set is marked non-free** in lichess-org/lila `COPYING.md`. Don't ship it; use the synthesised sounds.
- Chess.com's **"neo" pieces are proprietary.** Don't ship them. The green theme pairs those board colours with cburnett pieces.
- cburnett is GPLv2+: keep `public/pieces/cburnett/LICENSE.md` and the credit line under the board.

## Not decided yet
- A public verify link for the ML Engineer track certificate. The card hides Verify until there is one.
- Whether the client reviews queue should email Lewis immediately or as a daily digest.
