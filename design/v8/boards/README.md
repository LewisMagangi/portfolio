# Canvas boards (reference markup)

This folder holds every board on the claude.ai Portfolio Redesign canvas, exported byte for byte, plus `canvas.json` (board order, sizes and notes). They use the canvas's Design Component format:

- `<x-import component-from-global-scope="Gambit.X">` mounts a Gambit component.
- `{{hole}}` reads from `renderVals()`.
- `<sc-for>` and `<sc-if>` handle loops and conditions.
- `<dc-import name="Main" theme="light">` renders another board, which is how the wrapper boards below work.

Read them for layout, spacing and copy, then build the real pages as Next.js routes with the ported components. Treat `../HANDOFF.md` as the list of what still needs building, and `../data/` as the content.

## Page boards (dark)

Main (Home), Work, Project-Board, Career, Education, AI-ML, Certificates, Skills, Services, Chess, About, Reading, Blog, Blog-Post, Blog-Post-Django, Contact, Book, Book-Manage, Review, Transcript, Legal, Sitemap, Not-Found, Email-Booking, OG-Image.

## Admin boards

Admin-Login, Admin-Dashboard, Admin-Projects, Admin-Project-Edit, Admin-Bookings, Admin-Messages, Admin-References (review approval queue), Admin-Services, Admin-Certificates, Admin-Awards, Admin-Chess, Admin-Books, Admin-Challenges, Admin-Transcripts.

## Wrapper boards (light theme and phone)

These are about 800 bytes each. Each one re-renders a page board through `dc-import` with a theme and a preview width, so there is no separate markup to port. They show how a page should look in light mode or at 390px.

| Wrapper | Renders | Theme | Width |
|---|---|---|---|
| Home-Light, Work-Light, Career-Light, Chess-Light, AI-ML-Light, Skills-Light, Book-Light, Book-Manage-Light, Admin-Bookings-Light | the board of the same name (Home is Main) | light | 1440 |
| Mobile-Home, Mobile-Work, Mobile-Career, Mobile-Chess, Mobile-Book | Main, Work, Career, Chess, Book | dark | 390 |
| Mobile-Manage | Book-Manage, opened in its `cancel` state | dark | 390 |
| Mobile-Home-Light | Main | light | 390 |

## Wireframes

Wireframe-Home, Wireframe-Pages, Wireframe-Project, Wireframe-Admin and Wireframe-Mobile are the early low-fidelity passes. Where they disagree with a finished board, the finished board wins.

## Gambit files

The boards load `ds/gambit/tokens.css` and `ds/gambit/components/bundle.{css,js}`. Those live in `../gambit/` (`tokens.css`, `tokens.json`, `bundle.css`, `bundle.js`), next to the design system docs: `README.md`, `ux-standards.md`, `design-rationale.md` and `shadcn-handoff.md`.
