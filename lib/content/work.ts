// Work page and the eight project pages, generated from design/v8/boards/Work.dc.html and Project-Board.dc.html
// (the board scripts evaluated, so the copy is verbatim). Edit here; the boards are the reference.
import type { Mock } from "@/lib/content/home"

export type Fact = { k: string; v: string }
export type Project = {
  slug: string
  title: string
  kind: string
  period: string
  award?: string
  h1: string
  lead: string
  facts: Fact[]
  shot: string
  liveUrl?: string
  mock: Mock
  mockCaption: string
  video?: { embed: string; href: string; title: string; caption: string }
  praise?: { name: string; role: string; relation: string; result: string; quote: string; links: { label: string; href: string }[] }
  problem: string
  did: { h: string; t: string }[]
  arch: { t: string; s: string }[]
  stats: { v: string; l: string }[]
  outcome: string
  tags: string[]
  links: { label: string; href: string }[]
}

export const INTRO = {
  title: "Shipped for charities, communities and competitions.",
  lead: "Eight projects across full stack web, accessibility, security and systems. Featured work first; the archive follows.",
}

export const FILTERS = ["All", "Next.js", "Django", "Security", "Systems", "Award winning"] as const
export type Filter = (typeof FILTERS)[number]

export type FeaturedCard = {
  slug: string
  title: string
  summary: string
  period: string
  status?: string
  award?: string
  liveUrl?: string
  repoUrl?: string
  live: boolean
  tags: string[]
  thumb: string
  mock: Mock
  filters: Filter[]
}
export type ArchiveRow = { slug: string; year: string; title: string; line: string; filters: Filter[] }

export const FEATURED: FeaturedCard[] = [
  {
    slug: "wamumbi-charity-platform",
    title: "Wamumbi",
    summary:
      "Charity platform taken from mock data to production: a 3NF schema, 51 tRPC endpoints with Swagger docs, Prisma 7 on Neon, and a CVE-2025-66478 patch.",
    period: "Apr 2025 to now",
    status: "Live",
    liveUrl: "https://wamumbi.vercel.app/",
    repoUrl: "https://github.com/LewisMagangi/wamumbi",
    live: true,
    tags: ["Next.js", "tRPC", "Prisma", "Neon"],
    thumb: "wamumbi.vercel.app",
    mock: {
      brand: "W",
      title: "Campaigns",
      badge: "Live",
      stats: [
        {
          l: "API endpoints",
          v: "51",
        },
        {
          l: "Reference tables",
          v: "17",
        },
        {
          l: "Commits",
          v: "80+",
        },
      ],
      rows: ["Donations", "Campaigns", "Volunteers", "Events"],
    },
    filters: ["Next.js", "Security"],
  },
  {
    slug: "project-nexus",
    title: "Project Nexus",
    summary:
      "A Twitter like network, solo in five weeks: JWT and Google/GitHub sign in, threads, quotes, messaging, communities and search, with CI on every push.",
    period: "Nov to Dec 2025",
    status: "ALX ProDev capstone",
    liveUrl: "https://alx-project-nexus-social.vercel.app/",
    live: true,
    tags: ["Django REST", "Next.js", "OAuth", "Actions"],
    thumb: "alx-project-nexus-social.vercel.app",
    mock: {
      brand: "N",
      title: "Home feed",
      badge: "Live",
      stats: [
        {
          l: "Commits",
          v: "150+",
        },
        {
          l: "Pull requests",
          v: "46",
        },
        {
          l: "Weeks",
          v: "5",
        },
      ],
      rows: ["New thread", "New follower", "Message from a community", "Trending: #django"],
    },
    filters: ["Next.js", "Django", "Security"],
  },
  {
    slug: "solar-powered-water-atm",
    title: "Solar Water ATM",
    summary:
      "Led the Flask → Django 5.2 migration for solar water kiosks: metered billing, hardened auth and XSS fixes, leading three developers.",
    period: "Jun to Jul 2025",
    award: "#3, Enactus Kenya 2025",
    live: false,
    tags: ["Django", "PostgreSQL", "OAuth", "Tests"],
    thumb: "water-atm, dashboard",
    mock: {
      brand: "WA",
      title: "Kiosk usage",
      badge: "Admin",
      stats: [
        {
          l: "Kiosks",
          v: "Metered",
        },
        {
          l: "Litres today",
          v: "Metered",
        },
        {
          l: "Django",
          v: "5.2",
        },
      ],
      rows: ["Kiosk 01, meter reading", "Kiosk 02, payment", "Kiosk 03, meter reading", "New user"],
    },
    filters: ["Django", "Security", "Award winning"],
  },
  {
    slug: "sustainable-fishing",
    title: "Sustainable Fishing",
    summary:
      "Architected three Django apps for catch logging, education and a community timeline, with role based access and a custom admin. Deployed on Render.",
    period: "Jun to Jul 2025",
    award: "#5, Enactus Kenya 2025",
    repoUrl: "https://github.com/LewisMagangi/Sustainable_Fishing",
    live: false,
    tags: ["Django", "RBAC", "Render"],
    thumb: "catch-log, timeline",
    mock: {
      brand: "SF",
      title: "Catch log",
      badge: "Live",
      stats: [
        {
          l: "Apps",
          v: "3",
        },
        {
          l: "Roles",
          v: "3",
        },
        {
          l: "Rank",
          v: "#5",
        },
      ],
      rows: ["Catch logged, tilapia", "Lesson: closed seasons", "Community post", "Finance entry"],
    },
    filters: ["Django", "Award winning"],
  },
]

export const ARCHIVE: ArchiveRow[] = [
  {
    slug: "sne-portal",
    year: "Accessibility",
    title: "SNE Portal",
    line: "Voice exams on device with Whisper and Coqui TTS; WCAG 2.1 AA with automated axe and Pa11y tests.",
    filters: ["Django"],
  },
  {
    slug: "dynamic-cryptosuite-selection",
    year: "2023 to 24",
    title: "Dynamic Cryptosuite Selection",
    line: "Capstone: benchmarks AES, RSA, hashing and more on time, CPU and RAM, then picks one per security budget.",
    filters: ["Security", "Systems", "Django"],
  },
  {
    slug: "afya-bora",
    year: "2024",
    title: "Afya Bora",
    line: "Health Q&A for patients and doctors, self hosted on Nginx with UFW, SSH hardening and Let’s Encrypt.",
    filters: ["Django", "Systems"],
  },
  {
    slug: "simple-shell",
    year: "2022",
    title: "Simple Shell",
    line: "A Unix shell in C: fork/execve, PATH resolution, built ins.",
    filters: ["Systems"],
  },
]

export const CLOSE = {
  heading: "Have something like this to build?",
  body: "A free 30-minute call, online. Bring the problem; you’ll leave with a next step.",
}

export const PROJECTS: Project[] = [
  {
    slug: "wamumbi-charity-platform",
    title: "Wamumbi",
    kind: "Live, volunteer",
    period: "Apr 2025 to now",
    h1: "Fundraising, volunteers and campaigns, on real data.",
    lead: "A platform for the Wamumbi charity foundation: donations, campaigns, events, volunteers, teams and partnerships, built with Next.js, tRPC and Prisma on Neon Postgres.",
    facts: [
      {
        k: "Role",
        v: "Full stack engineer",
      },
      {
        k: "Team",
        v: "Client Application Team, remote",
      },
      {
        k: "Timeline",
        v: "Apr 2025, present",
      },
      {
        k: "Stack",
        v: "Next.js 16, tRPC, Prisma 7",
      },
    ],
    shot: "wamumbi.vercel.app, dashboard",
    liveUrl: "https://wamumbi.vercel.app/",
    mock: {
      brand: "W",
      title: "Campaigns",
      badge: "Live",
      stats: [
        {
          l: "API endpoints",
          v: "51",
        },
        {
          l: "Reference tables",
          v: "17",
        },
        {
          l: "Commits",
          v: "80+",
        },
      ],
      rows: ["Donations", "Campaigns", "Volunteers", "Events"],
    },
    mockCaption: "Running live. Select the screen to use the site, or open it in a new tab.",
    problem:
      "The MVP ran on mock data and hard coded values. The foundation needed a dashboard it could trust to run campaigns, track donations and manage volunteers, and documentation a distributed team of volunteers could follow.",
    did: [
      {
        h: "Designed a 3NF schema",
        t: "Synced the DBML design to Prisma, replaced enums with lookup tables, added referential integrity rules, swapped a polymorphic relation for explicit foreign keys and made personal data optional for privacy.",
      },
      {
        h: "Built 51 documented API endpoints",
        t: "tRPC routers for events, volunteers, blog posts, donations, teams, campaigns and auth, with Zod validation, OpenAPI metadata and interactive Swagger docs at /api/docs.",
      },
      {
        h: "Replaced the mocks with live data",
        t: "Dashboard stats, campaigns and donations now run on tRPC queries and mutations with cache invalidation, loading states, modals and volunteer edit/delete flows.",
      },
      {
        h: "Moved to Prisma 7 on Neon",
        t: "Lazy initialisation through a proxy so serverless builds never open a connection, plus idempotent upsert seeding across 17 reference tables.",
      },
      {
        h: "Patched CVE-2025-66478",
        t: "Upgraded Next.js to 16.0.7 to close the React2Shell vulnerability and validated the fix in production.",
      },
      {
        h: "Made it accessible and documented",
        t: "ARIA on progress bars, labelled forms, a docs/ tree for API, database, frontend and deployment, a Clerk production guide, and READMEs cut back to what actually ships.",
      },
    ],
    arch: [
      {
        t: "Next.js App Router",
        s: "SSR, Clerk auth",
      },
      {
        t: "tRPC + Zod",
        s: "51 ENDPOINTS, OPENAPI",
      },
      {
        t: "Prisma 7",
        s: "Lazy init, seeding",
      },
      {
        t: "Neon Postgres",
        s: "3NF, 17 REF TABLES",
      },
    ],
    stats: [
      {
        v: "51",
        l: "documented API endpoints",
      },
      {
        v: "17",
        l: "reference tables seeded",
      },
      {
        v: "80+",
        l: "commits across 8 branches",
      },
    ],
    outcome:
      "Wamumbi went from an MVP on mock data to a stable, backend driven product, with docs that let new contributors set up, seed and deploy without asking.",
    tags: ["Next.js", "TypeScript", "tRPC", "Zod", "Prisma", "Neon", "Clerk", "Tailwind"],
    links: [
      {
        label: "wamumbi.vercel.app",
        href: "https://wamumbi.vercel.app/",
      },
      {
        label: "Source code",
        href: "https://github.com/LewisMagangi/wamumbi",
      },
    ],
  },
  {
    slug: "project-nexus",
    title: "Project Nexus",
    kind: "ALX ProDev capstone",
    period: "Nov to Dec 2025",
    h1: "A social network, end to end, in five weeks.",
    lead: "My capstone for the ALX ProDev Backend and Frontend diplomas: a Twitter like platform with a Django REST API and a Next.js client, designed, built, tested, deployed and presented on my own.",
    facts: [
      {
        k: "Role",
        v: "Sole developer",
      },
      {
        k: "Team",
        v: "Solo, PDBE + PDFE capstone",
      },
      {
        k: "Timeline",
        v: "1 Nov to 4 Dec 2025",
      },
      {
        k: "Stack",
        v: "Django REST, Next.js, PostgreSQL",
      },
    ],
    shot: "alx-project-nexus-social.vercel.app",
    liveUrl: "https://alx-project-nexus-social.vercel.app/",
    mock: {
      brand: "N",
      title: "Home feed",
      badge: "Live",
      stats: [
        {
          l: "Commits",
          v: "150+",
        },
        {
          l: "Pull requests",
          v: "46",
        },
        {
          l: "Weeks",
          v: "5",
        },
      ],
      rows: ["New thread", "New follower", "Message from a community", "Trending: #django"],
    },
    mockCaption: "Running live. Select the screen to use the site, or open it in a new tab.",
    video: {
      embed: "https://docs.google.com/videos/d/1bxTm_uV3uP2jet4HGoEHiklfaVREL3G6XAAv_UMwa8Y/preview",
      href: "https://docs.google.com/videos/d/1bxTm_uV3uP2jet4HGoEHiklfaVREL3G6XAAv_UMwa8Y/play?usp=sharing",
      title: "Project Nexus presentation",
      caption: "The capstone presentation, recorded for ALX.",
    },
    praise: {
      name: "Irene Aragona",
      role: "ALX",
      relation: "On this capstone",
      result: "Among the top scores in my cohort",
      links: [],
      quote:
        "After four months of learning, you wrapped things up with an ambitious, fully fledged project. It wasn’t easy, but you nailed it, delivering outstanding work and earning one of the highest scores in your Cohort.",
    },
    problem:
      "Both ProDev tracks end in one capstone: prove you can design a real product’s backend and frontend, document it, test it and ship it, inside one cohort deadline.",
    did: [
      {
        h: "Auth that holds up",
        t: "JWT with token blacklisting on logout, email verification, password reset with email templates, and Google and GitHub sign in through dj-rest-auth and django-allauth.",
      },
      {
        h: "The social graph",
        t: "Posts, threads, retweets, quote posts, hashtags, mentions, likes and follows, with a dynamic post page and profiles showing follows and stats.",
      },
      {
        h: "Everything around the feed",
        t: "Bookmarks, notifications, user to user messaging, communities, search, and account update, password change and deactivation.",
      },
      {
        h: "Legal and privacy built in",
        t: "Terms, privacy and cookie policies, with acceptance required at registration.",
      },
      {
        h: "Quality gates on every push",
        t: "Pre-commit with Black, isort and flake8; pytest on Python 3.12 in GitHub Actions; Jest on pre-push; OpenAPI schema and ERDs kept in sync.",
      },
      {
        h: "Shipped and hardened",
        t: "Production settings for hosts, CSRF origins, logging and static files; patched CVE-2025-66478 on the Next.js client.",
      },
    ],
    arch: [
      {
        t: "Next.js client",
        s: "SSR, auth context",
      },
      {
        t: "Django REST API",
        s: "JWT, allauth, openapi",
      },
      {
        t: "PostgreSQL",
        s: "Posts, graph, messages",
      },
      {
        t: "CI/CD",
        s: "Actions, pre-commit",
      },
    ],
    stats: [
      {
        v: "150+",
        l: "commits, on my own",
      },
      {
        v: "46",
        l: "pull requests merged",
      },
      {
        v: "5",
        l: "weeks from MVP to demo",
      },
    ],
    outcome:
      "Presented as the joint capstone for both diplomas, with a recorded demo and full API documentation. It earned one of the highest scores in the cohort.",
    tags: ["Django", "DRF", "Next.js", "TypeScript", "JWT", "OAuth", "PostgreSQL", "GitHub Actions"],
    links: [
      {
        label: "Live app",
        href: "https://alx-project-nexus-social.vercel.app/",
      },
      {
        label: "Demo video",
        href: "https://drive.google.com/file/d/1lMDkZoshHN5UpyPQbRwpLgtM0TdTkqJj/view?usp=sharing",
      },
    ],
  },
  {
    slug: "solar-powered-water-atm",
    title: "Solar Powered Water ATM",
    kind: "Enactus JOOUST",
    period: "Jun to Jul 2025",
    award: "#3, Enactus Kenya National Expo 2025",
    h1: "Clean water, dispensed and accounted for.",
    lead: "A Django platform behind solar powered water kiosks for underserved communities: user accounts, kiosks, metered usage and billing in one place.",
    facts: [
      {
        k: "Role",
        v: "Backend lead",
      },
      {
        k: "Team",
        v: "Me + 3 developers, Enactus JOOUST",
      },
      {
        k: "Timeline",
        v: "Jun to Jul 2025",
      },
      {
        k: "Stack",
        v: "Python, Django 5.2, PostgreSQL",
      },
    ],
    shot: "water-atm, admin dashboard",
    mock: {
      brand: "WA",
      title: "Kiosk usage",
      badge: "Admin",
      stats: [
        {
          l: "Kiosks",
          v: "Metered",
        },
        {
          l: "Litres today",
          v: "Metered",
        },
        {
          l: "Django",
          v: "5.2",
        },
      ],
      rows: ["Kiosk 01, meter reading", "Kiosk 02, payment", "Kiosk 03, meter reading", "New user"],
    },
    mockCaption: "Desktop and phone layout.",
    problem:
      "Solar water kiosks can reach communities the grid does not, but every litre has to be paid for, logged and traceable. The Flask prototype had grown hard to extend and had gaps in form and session security.",
    did: [
      {
        h: "Migrated Flask → Django 5.2",
        t: "Rebuilt the platform as app level Django (accounts, profiles, kiosks, usage) so four of us could work in parallel.",
      },
      {
        h: "Kiosks and metered usage",
        t: "Kiosk list, detail and forms; meter reading entry that calculates the total price automatically and validates input before it is stored.",
      },
      {
        h: "Hardened authentication",
        t: "Password reset token invalidation, OAuth backend error handling, uniqueness tests on email, Google and Facebook IDs, and CSRF-consistent forms.",
      },
      {
        h: "Closed injection gaps",
        t: "Sanitised profile picture URLs against XSS, clamped profile completion values against CSS injection and whitelisted date filters in URLs.",
      },
      {
        h: "Legal pages with agreement gating",
        t: "Terms and privacy pages with dynamic redirects so users must agree before continuing.",
      },
      {
        h: "Production ready",
        t: "Build script and deploy config, DEBUG off, production database settings, unit tests and Black formatting across the codebase.",
      },
    ],
    arch: [
      {
        t: "Water kiosk",
        s: "Meter readings",
      },
      {
        t: "Django apps",
        s: "Accounts, kiosks, usage",
      },
      {
        t: "PostgreSQL",
        s: "Users, txns, telemetry",
      },
      {
        t: "Dashboard",
        s: "Usage, spend, reports",
      },
    ],
    stats: [
      {
        v: "#3",
        l: "Enactus Kenya National Expo 2025, Ngong Hotel",
      },
      {
        v: "3",
        l: "developers on the team I led",
      },
      {
        v: "5.2",
        l: "Django version after the migration",
      },
    ],
    outcome:
      "The year before, Afya Bora taught me that judges score real impact, not just clean code. This time we went in with a working, deployable system and a clear story about who it serves.",
    tags: ["Python", "Django 5.2", "PostgreSQL", "OAuth", "Unit tests", "Black"],
    links: [],
  },
  {
    slug: "sustainable-fishing",
    title: "Sustainable Fishing",
    kind: "Enactus JOOUST",
    period: "Jun to Jul 2025",
    award: "#5, Enactus Kenya National Expo 2025",
    h1: "Logging catches to keep fisheries alive.",
    lead: "A community platform for sustainable fishing: fishermen log catches, educators publish guidance, and admins see the whole picture.",
    facts: [
      {
        k: "Role",
        v: "Architect and lead developer",
      },
      {
        k: "Team",
        v: "Enactus JOOUST",
      },
      {
        k: "Timeline",
        v: "Jun to Jul 2025",
      },
      {
        k: "Stack",
        v: "Django, Python, Render",
      },
    ],
    shot: "sustainable-fishing, catch-log",
    mock: {
      brand: "SF",
      title: "Catch log",
      badge: "Live",
      stats: [
        {
          l: "Apps",
          v: "3",
        },
        {
          l: "Roles",
          v: "3",
        },
        {
          l: "Rank",
          v: "#5",
        },
      ],
      rows: ["Catch logged, tilapia", "Lesson: closed seasons", "Community post", "Finance entry"],
    },
    mockCaption: "Desktop and phone layout.",
    problem:
      "Communities around the lake needed one place to record what is caught, learn sustainable practice and talk to each other, with roles so the right people can publish and moderate.",
    did: [
      {
        h: "Defined the architecture",
        t: "Three Django apps: users (identity, roles, profiles), fishing (catches, analytics) and content (education, timeline), with central settings and context processors.",
      },
      {
        h: "Custom user model with roles",
        t: "Fisherman, educator and admin roles, enforced at both view and model level with decorators and permission checks.",
      },
      {
        h: "Catch logging",
        t: "Species, weight, geo location, sold/donated/unsold status and pricing, with status transitions and an audit trail.",
      },
      {
        h: "Content engine and timeline",
        t: "Educational content with categories, difficulty, featured flag and read counts; a community timeline with post types and likes.",
      },
      {
        h: "An admin that does the work",
        t: "Custom dashboards with metrics, bulk activate/deactivate and promote/demote actions, plus admin JS for validation, shortcuts and confirmations.",
      },
      {
        h: "Fast and deployable",
        t: "Indexed hot fields and used select_related/prefetch_related against N+1 queries; deployed to Render with gunicorn, a Procfile and Python 3.13 fixes.",
      },
    ],
    arch: [
      {
        t: "Users",
        s: "Roles, RBAC, profiles",
      },
      {
        t: "Fishing",
        s: "Catches, analytics",
      },
      {
        t: "Content",
        s: "Education, timeline",
      },
      {
        t: "Admin",
        s: "Metrics, bulk actions",
      },
    ],
    stats: [
      {
        v: "#5",
        l: "Enactus Kenya National Expo 2025",
      },
      {
        v: "3",
        l: "Django apps, one modular monolith",
      },
      {
        v: "3",
        l: "roles with their own permissions",
      },
    ],
    outcome:
      "Ranked fifth nationally alongside the Water ATM, with an MIT-licensed codebase and contributing guide so others can pick it up.",
    tags: ["Django", "Python", "RBAC", "PostgreSQL", "Render", "Gunicorn"],
    links: [
      {
        label: "Source code",
        href: "https://github.com/LewisMagangi/Sustainable_Fishing",
      },
    ],
  },
  {
    slug: "sne-portal",
    title: "SNE Portal",
    kind: "Accessibility",
    period: "Accessibility",
    h1: "Exams you can take by voice, privately.",
    lead: "A voice driven exam portal for learners with special needs. I moved speech processing on device and brought the whole interface up to WCAG 2.1 AA.",
    facts: [
      {
        k: "Role",
        v: "Contributor",
      },
      {
        k: "Team",
        v: "Team project",
      },
      {
        k: "Timeline",
        v: "Dates to be added",
      },
      {
        k: "Stack",
        v: "Django, Whisper, Coqui TTS",
      },
    ],
    shot: "sneportal, voice exam",
    mock: {
      brand: "SNE",
      title: "Voice exam",
      badge: "WCAG AA",
      stats: [
        {
          l: "Speech to text",
          v: "Whisper",
        },
        {
          l: "Text to speech",
          v: "Coqui",
        },
      ],
      rows: ["Question 1, read aloud", "Answer by voice", "Review answers"],
    },
    mockCaption: "Desktop and phone layout.",
    problem:
      "The portal sent learners’ voices to Google Cloud for speech to text and text to speech: a privacy risk for an exam, a running cost, and useless offline.",
    did: [
      {
        h: "Offline voice processing",
        t: "Replaced Google Cloud APIs with Whisper for speech to text and Coqui TTS for speech, behind a local voice processor class, with tests for the local setup.",
      },
      {
        h: "WCAG 2.1 AA",
        t: "Keyboard navigation, semantic HTML, ARIA roles and live regions, visible focus and screen reader support across the exam flow.",
      },
      {
        h: "Automated accessibility tests",
        t: "Selenium, axe and Pa11y suites checking WCAG and Section 508: keyboard paths, ARIA, colour contrast, mobile and forms.",
      },
      {
        h: "Maintainable frontend",
        t: "Moved inline CSS and JavaScript out of templates into static files so they cache and stay readable.",
      },
      {
        h: "Documented the data",
        t: "A DBML schema of model relationships and clearer docs on roles and responsibilities.",
      },
    ],
    arch: [
      {
        t: "Browser",
        s: "Mic, keyboard, screen reader",
      },
      {
        t: "Django exam app",
        s: "Questions, answers",
      },
      {
        t: "Local models",
        s: "Whisper, coqui TTS",
      },
      {
        t: "Test suite",
        s: "Axe, PA11Y, selenium",
      },
    ],
    stats: [
      {
        v: "0",
        l: "cloud calls for voice",
      },
      {
        v: "AA",
        l: "WCAG 2.1 conformance target, tested",
      },
      {
        v: "508",
        l: "Section 508 checks automated",
      },
    ],
    outcome:
      "Learners’ voices never leave the machine, the portal runs offline, and accessibility regressions now fail the test suite instead of reaching users.",
    tags: ["Django", "Python", "Whisper", "Coqui TTS", "Selenium", "axe", "Pa11y", "WCAG"],
    links: [],
  },
  {
    slug: "dynamic-cryptosuite-selection",
    title: "Dynamic Cryptosuite Selection",
    kind: "JOOUST capstone",
    period: "Sep 2023 to Mar 2024",
    h1: "Choosing cryptography by measurement, not habit.",
    lead: "My final year capstone, with a colleague: a system that benchmarks symmetric, asymmetric and hashing algorithms across input and key sizes, then picks the primitive that fits a security budget.",
    facts: [
      {
        k: "Role",
        v: "Designed and built the benchmarking system",
      },
      {
        k: "Team",
        v: "2, JOOUST capstone",
      },
      {
        k: "Timeline",
        v: "Sep 2023 to Mar 2024",
      },
      {
        k: "Stack",
        v: "Python, Django, SQLite",
      },
    ],
    shot: "cryptosuite, performance charts",
    mock: {
      brand: "CS",
      title: "Benchmarks",
      badge: "Report",
      stats: [
        {
          l: "Algorithms",
          v: "AES, RSA, dh",
        },
        {
          l: "Measures",
          v: "time, CPU, RAM",
        },
      ],
      rows: ["AES-256, encrypt", "RSA-2048, sign", "SHA-256, hash", "Diffie–Hellman, exchange"],
    },
    mockCaption: "Desktop and phone layout.",
    problem:
      "Teams pick algorithms from habit. We wanted evidence: what does stronger encryption actually cost in time, CPU and memory as data and keys grow?",
    did: [
      {
        h: "Crypto modules",
        t: "Symmetric (AES, DES), asymmetric (RSA, Diffie–Hellman), hashing, digital signatures and key exchange protocols as separate, testable modules.",
      },
      {
        h: "A performance analyser",
        t: "Measured execution time, CPU and RAM for every algorithm across growing input sizes and key lengths.",
      },
      {
        h: "Visual comparisons",
        t: "Bar and line charts and generated reports showing how each metric scales.",
      },
      {
        h: "Selection logic",
        t: "Recommends a primitive from security requirements against runtime cost.",
      },
      {
        h: "A real app around it",
        t: "Django apps for analysis, blogging and users; unit and integration tests; scripted environment setup.",
      },
    ],
    arch: [
      {
        t: "Inputs",
        s: "Data size, key size",
      },
      {
        t: "Crypto modules",
        s: "SYM, ASYM, HASH · SIGN",
      },
      {
        t: "Analyser",
        s: "Time, cpu, ram",
      },
      {
        t: "Charts + report",
        s: "Recommendation",
      },
    ],
    stats: [
      {
        v: "5",
        l: "families of primitives compared",
      },
      {
        v: "3",
        l: "metrics: time, CPU, RAM",
      },
      {
        v: "1st",
        l: "called the best project in the class by the panel",
      },
    ],
    outcome:
      "Prof. Rodriguez called it the best project in the class. More useful to me: it taught me to measure before deciding, which I still do.",
    tags: ["Python", "Django", "Cryptography", "Benchmarking", "Data viz", "SQLite"],
    links: [
      {
        label: "Source code",
        href: "https://github.com/LewisMagangi/Dynamic_Cryptosuite",
      },
      {
        label: "Applied cryptography web app",
        href: "https://github.com/LewisMagangi/cryptography_web_app",
      },
    ],
  },
  {
    slug: "afya-bora",
    title: "Afya Bora",
    kind: "Enactus JOOUST",
    period: "May to Jul 2024",
    h1: "Health questions, answered by people who know.",
    lead: "A StackOverflow style Q&A where patients ask and doctors answer, with votes, comments, search and a blog, self hosted on a hardened Linux server.",
    facts: [
      {
        k: "Role",
        v: "Proposer, full stack and deployment",
      },
      {
        k: "Team",
        v: "Enactus JOOUST",
      },
      {
        k: "Timeline",
        v: "May to Jul 2024",
      },
      {
        k: "Stack",
        v: "Django, SQLite, Nginx",
      },
    ],
    shot: "afyabora, questions",
    liveUrl: "https://afyabora-telehealth.vercel.app/",
    mock: {
      brand: "AB",
      title: "Health Q&A",
      badge: "Live",
      stats: [
        {
          l: "Server",
          v: "Nginx",
        },
        {
          l: "TLS",
          v: "Let’s Encrypt",
        },
      ],
      rows: ["Question, malaria signs", "Answer from a doctor", "Upvoted answer", "New question"],
    },
    mockCaption: "Running live. Select the screen to use the site, or open it in a new tab.",
    problem:
      "Reliable health advice is hard to reach in rural Kenya. I proposed a place where patients could ask, doctors could answer, and the best answers rise to the top.",
    did: [
      {
        h: "Q&A engine",
        t: "Questions, answers, up/down votes, comments, likes and search, plus a blog for longer posts.",
      },
      {
        h: "Accounts and profiles",
        t: "Registration, login and profile editing, with signals that create and update profiles automatically.",
      },
      {
        h: "Self hosted and hardened",
        t: "Ubuntu server with Nginx as reverse proxy, systemd services, UFW firewall rules, SSH hardening, user/group permissions and Let’s Encrypt SSL.",
      },
      {
        h: "Presented nationally",
        t: "Demoed at the 2024 Enactus Kenya National Expo.",
      },
    ],
    arch: [
      {
        t: "Browser",
        s: "Questions, votes",
      },
      {
        t: "Nginx",
        s: "Tls, reverse proxy",
      },
      {
        t: "Django + systemd",
        s: "Q&a, profiles, blog",
      },
      {
        t: "SQLite",
        s: "Posts, users",
      },
    ],
    stats: [
      {
        v: "2024",
        l: "Enactus Kenya National Expo",
      },
      {
        v: "6",
        l: "server hardening steps, by hand",
      },
      {
        v: "1",
        l: "hard lesson about measuring impact",
      },
    ],
    outcome:
      "Judges scored users, doctors and revenue, which we had not measured. That lesson shaped the next year: in 2025 the team I led placed #3 and #5.",
    tags: ["Django", "Python", "SQLite", "Nginx", "Linux", "Let’s Encrypt"],
    links: [
      {
        label: "Live app",
        href: "https://afyabora-telehealth.vercel.app/",
      },
      {
        label: "Source code",
        href: "https://github.com/LewisMagangi/AfyaBora",
      },
    ],
  },
  {
    slug: "simple-shell",
    title: "Simple Shell",
    kind: "ALX team project",
    period: "2022",
    h1: "A Unix shell in C, in two weeks.",
    lead: "ALX’s first big systems project: a working clone of sh, written in C with a teammate.",
    facts: [
      {
        k: "Role",
        v: "Coauthor",
      },
      {
        k: "Team",
        v: "2, ALX SE Foundations",
      },
      {
        k: "Timeline",
        v: "2 weeks",
      },
      {
        k: "Stack",
        v: "C, Unix system calls",
      },
    ],
    shot: "hsh, terminal",
    mock: {
      brand: "$",
      title: "hsh",
      badge: "C",
      stats: [
        {
          l: "Built ins",
          v: "exit, env",
        },
      ],
      rows: ["$ ls -l", "$ echo $PATH", "$ exit 98"],
    },
    mockCaption: "Desktop and phone layout.",
    problem: "Three months into ALX: build a shell that reads, parses and runs commands like /bin/sh, with no standard library shortcuts.",
    did: [
      {
        h: "Process control",
        t: "fork, execve and wait to run commands, with correct exit statuses.",
      },
      {
        h: "PATH resolution",
        t: "Found executables across PATH and handled missing commands with sh style errors.",
      },
      {
        h: "Built ins",
        t: "exit and env, plus interactive and non interactive modes.",
      },
      {
        h: "Memory discipline",
        t: "Manual allocation and freeing across the read–parse–execute loop.",
      },
    ],
    arch: [
      {
        t: "Prompt",
        s: "Read line",
      },
      {
        t: "Parser",
        s: "Tokens, path",
      },
      {
        t: "Executor",
        s: "Fork, execve, wait",
      },
      {
        t: "Built ins",
        s: "Exit, env",
      },
    ],
    stats: [
      {
        v: "C",
        l: "no standard library shortcuts",
      },
      {
        v: "2",
        l: "weeks, as a team project",
      },
      {
        v: "Month 2",
        l: "of ALX SE Foundations",
      },
    ],
    outcome:
      "I did not hit my own bar on this one, but it changed what I thought I could build, and it is why systems work still feels familiar.",
    tags: ["C", "Unix", "Processes", "Memory"],
    links: [],
  },
]

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug)
