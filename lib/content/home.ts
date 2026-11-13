// Home page content, verbatim from design/v8/boards/Main.dc.html (renderVals and markup).
// Asset paths point at public/ instead of the canvas blobs.

import type { TimelineItemData } from "@/components/gambit/timeline"

export const CV_HREF = "/Lewis_Magangi_CV.pdf"
export const PORTRAIT_SQUARE = "/portrait/lewis-magangi-square.jpg"

/** Reading battery sections (ids on the page, in order). */
export const STORY = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "career", label: "How I got here" },
  { id: "awards", label: "Awards" },
  { id: "trust", label: "References" },
  { id: "off", label: "Off the clock" },
  { id: "faq", label: "Questions" },
  { id: "book", label: "Your move" },
]

export type Mock = {
  brand: string
  title: string
  badge: string
  stats: { l: string; v: string }[]
  rows: string[]
}

const mock = (brand: string, title: string, badge: string, stats: Mock["stats"], rows: string[]): Mock => ({
  brand,
  title,
  badge,
  stats,
  rows,
})

export const HERO = {
  title: "Secure software, / built one measured / move at a time.",
  lead: "I’m Lewis Magangi, a software engineer in Nairobi trained in computer forensics. I build web platforms, AI and ML features, data foundations and security reviews for founders, NGOs and small teams.",
  note: "Free, 30 minutes on Google Meet, in your time zone. Hiring for an AI or ML role?",
  cvLabel: "Download my CV",
  device: {
    url: "wamumbi-red.vercel.app",
    liveUrl: "https://wamumbi-red.vercel.app/",
    shots: {
      desktop: "/work/wamumbi-after-desk.jpg",
      phone: "/work/wamumbi-after-phone.jpg",
      alt: "Wamumbi home page: Bringing hope to orphaned children, with Donate now and See our work",
    },
    before: {
      url: "wamumbi.vercel.app",
      shots: {
        desktop: "/work/wamumbi-before-desk.jpg",
        phone: "/work/wamumbi-before-phone.jpg",
        alt: "The original Wamumbi home page: Bringing Hope to Orphaned Children, with Donate now and Learn more",
      },
    },
    caption: "Wamumbi, a charity platform I rebuilt, deployed on real data ahead of launch. Open it in a new tab, or compare it with the original.",
    mock: mock("W", "Campaigns", "Live", [
      { l: "Roles", v: "9" },
      { l: "Events", v: "9" },
      { l: "Access tests", v: "347" },
    ], ["Donations", "Campaigns", "Volunteers", "Events"]),
    mobileMock: mock("W", "Campaigns", "Live", [{ l: "Roles", v: "9" }], ["Donations", "Campaigns", "Events"]),
  },
}

export type CaseStudy = {
  title: string
  period: string
  kind?: string
  award?: string
  url: string
  liveUrl?: string
  live: boolean
  mock: Mock
  problem: string
  approach: string[]
  /** One line, read as a sentence (v9: no big number stat row). */
  outcome: string
  /** Case study page slug; a build without one links to its live site instead. */
  slug?: string
  /** Screenshots in place of a live frame (no open link unless liveUrl is set). */
  shots?: { desktop: string; phone: string; alt: string }
}

export const WORK = {
  heading: "Recent work, problem first.",
  lead: "What was broken, what I did, and what changed, with the product beside each one.",
  allLabel: "All nine projects",
  cases: [
    {
      title: "Afya Bora",
      period: "Enactus JOOUST, May to Jul 2024",
      url: "afyabora-telehealth.vercel.app",
      liveUrl: "https://afyabora-telehealth.vercel.app/",
      live: true,
      slug: "afya-bora",
      mock: mock("AB", "Consultations", "Live", [
        { l: "Doctors", v: "Verified" },
        { l: "Bookings", v: "Online" },
        { l: "Records", v: "Private" },
      ], ["Book a doctor", "Prescriptions", "Lab results", "Payments"]),
      problem:
        "Reliable health advice is hard to reach in rural Kenya. I proposed a place where patients could ask, doctors could answer, and the best answers rise to the top.",
      approach: [
        "Questions, answers, votes, comments and search, plus a blog for longer posts",
        "Accounts for patients and doctors, with profiles kept in sync",
        "Proposed it, built it end to end and deployed it",
      ],
      outcome: "Presented at the 2024 Enactus Kenya National Expo, where it taught me that judges score real impact, not just clean code.",
    },
    {
      title: "Project Nexus",
      period: "ALX ProDev capstone, Nov to Dec 2025",
      url: "alx-project-nexus-social.vercel.app",
      liveUrl: "https://alx-project-nexus-social.vercel.app/",
      live: true,
      slug: "project-nexus",
      mock: mock("N", "Feed", "Live", [
        { l: "Commits", v: "150+" },
        { l: "Pull requests", v: "46" },
        { l: "Weeks", v: "5" },
      ], ["Posts", "Threads", "Messages", "Communities"]),
      problem:
        "The ALX capstone: design, build, test and ship a whole social platform, back end and front end, alone and before the cohort deadline.",
      approach: [
        "Secure sign in with email verification, Google and GitHub",
        "Posts, threads, follows, messaging, communities and search",
        "Automated tests and checks on every commit",
      ],
      outcome: "150+ commits and 46 pull requests, solo in five weeks, and one of the top scores in the cohort.",
    },
    {
      title: "Sustainable Fishing",
      period: "Enactus JOOUST, Jun to Jul 2025",
      award: "#5, Enactus Kenya 2025",
      url: "Sustainable Fishing",
      live: false,
      slug: "sustainable-fishing",
      shots: {
        desktop: "/work/fishing-desk.jpg",
        phone: "/work/fishing-phone.jpg",
        alt: "Sustainable Fishing home page: a community for responsible fishermen and marine conservation",
      },
      mock: mock("SF", "Catch log", "Live", [
        { l: "Apps", v: "3" },
        { l: "Roles", v: "3" },
      ], ["Catch logged", "Lesson: closed seasons", "Community post", "Finance entry"]),
      problem:
        "Communities around the lake needed one place to record what is caught, learn sustainable practice and talk to each other, with roles so the right people can publish and moderate.",
      approach: [
        "Defined the architecture: three Django apps for catches, education and a community timeline",
        "A custom user model with roles for fishermen, educators and admins",
        "An admin that does the work, tuned against N+1 queries",
      ],
      outcome: "Ranked fifth nationally alongside the Water ATM, with an MIT licensed codebase and a contributing guide so others can pick it up.",
    },
    {
      title: "Curtmag",
      period: "In progress",
      kind: "In progress",
      url: "curtmag.vercel.app",
      liveUrl: "https://curtmag.vercel.app/",
      live: true,
      mock: mock("C", "Bookings", "Live", [
        { l: "Booking", v: "Number plate" },
        { l: "Account", v: "Not needed" },
      ], ["Book a slot", "Get a quote", "Visit us", "My bookings"]),
      problem:
        "A garage in Embakasi Jua Kali wanted customers to book a same day service with just a number plate, and to know the price before any work starts.",
      approach: [
        "Booking with a number plate and a phone number, no account",
        "Roles for customers, mechanics and admins",
        "Price confirmed before work; M‑Pesa, cash or card after",
      ],
      outcome: "Results land here when it ships.",
    },
  ] satisfies CaseStudy[],
}

/** Builds told in words until their screenshots are in. */
export const ALSO_BUILT = {
  heading: "Also built",
  items: [
    {
      title: "Solar Water ATM",
      award: "#3, Enactus Kenya 2025",
      body: "Led three developers moving solar water kiosks from Flask to Django: metered usage with automatic pricing, closed injection gaps and hardened password resets.",
      href: "/work/solar-powered-water-atm",
    },
  ],
}

export const SKILLS_TEASER = {
  heading: "What I build it with.",
  lead: "Four disciplines sit behind every project above. Each skill links to the work that proves it.",
  columns: [
    { title: "Back end", items: "Python, Django, tRPC, secure auth" },
    { title: "Front end", items: "Next.js, React, TypeScript, accessibility" },
    { title: "Data", items: "PostgreSQL, Prisma, data modelling" },
    { title: "AI, ML and security", items: "LLM APIs, MLflow, vulnerability patching" },
  ],
  link: "See all 32 skills and where I used each one",
}

export const TAGLINE =
  "Every system I ship is a move I can defend. / Tested, documented and secured before your users touch it."

export const SERVICES = {
  heading: "What I can build for you.",
  lead: "Four kinds of work, priced per project. The discovery call is where we find out which one you need.",
  items: [
    {
      icon: "code",
      title: "Web development",
      body: "Websites and web apps in Next.js and Django, from first design to a deployed, accessible product.",
      points: ["Next.js", "Django", "PostgreSQL", "Accessibility"],
    },
    {
      icon: "brain",
      title: "Software, AI and ML engineering",
      body: "APIs, integrations and AI features such as search over your documents, built and monitored like the rest of your software.",
      points: ["Python", "OpenAI API", "LangChain", "MLflow"],
    },
    {
      icon: "database",
      title: "Data governance, analysis and science",
      body: "Schemas you can trust, clean data with clear owners, and analysis that answers a real question.",
      points: ["Data modelling", "SQL", "pandas", "Reporting"],
    },
    {
      icon: "shield",
      title: "Cybersecurity",
      body: "Defensive hardening, offensive testing and a security strategy sized to your team.",
      points: ["Defensive", "Offensive", "Strategic"],
    },
  ] as const,
  tiers: [
    {
      name: "Bronze",
      price: "$600",
      for: "A website or web app with the engineering behind it.",
      includes: ["Web development, design to deployment", "Software engineering: APIs, integrations and tests"],
    },
    {
      name: "Silver",
      price: "$900",
      base: "Bronze",
      for: "For products that hold data people depend on.",
      includes: ["Data governance and analysis", "Cybersecurity review and hardening"],
    },
    {
      name: "Gold",
      price: "$1,200",
      base: "Silver",
      for: "For teams adding AI or machine learning to the product.",
      includes: ["Software, AI and ML engineering: models and AI features in production"],
    },
  ],
  footnote:
    "Typical prices in US dollars for a project of usual scope. Your quote depends on scope and timeline, and you get it after the discovery call.",
  steps: [
    { title: "Discovery call", body: "Free and online. We talk through the problem and whether I’m the right fit." },
    { title: "Scope and quote", body: "I send back what I’ll build, the tier it fits and the price." },
    { title: "Build and hand over", body: "I build in short steps you can see, then hand over the code and access." },
  ],
}

function ms(
  year: string,
  date: string,
  title: string,
  kind: string,
  detail: string,
  chips: string[],
  anchor: string,
  extra: Partial<TimelineItemData> = {},
): TimelineItemData {
  return {
    year,
    date,
    title,
    kind,
    detail,
    chips,
    href: "/career#" + anchor,
    linkLabel: "The full move on the career page",
    ...extra,
  }
}

export const CAREER = {
  heading: "How I got here.",
  lead: "Forensics first, then full stack, now AI and ML. Ten moves since 2020, lit as you read. Open any move for the short version, or follow it to the full story on the career page.",
  fullLabel: "See the full career",
  aiLabel: "What I’m learning in AI and ML",
  milestones: [
    ms("2020", "Sep 2020", "BSc Computer Forensics begins at JOOUST", "Education", "Software engineering was my first choice; security became the foundation I build on.", ["Networks", "Forensics", "Cryptography"], "bsc-computer-forensics-science-begins"),
    ms("2022", "Feb 2022", "ALX Software Engineering, first run", "Training", "A Mastercard Foundation scholarship. Shell, Git and C from month one.", ["C", "Bash", "Git"], "alx-software-engineering-first-run"),
    ms("2023", "Sep 2023 to Mar 2024", "Dynamic Cryptosuite Selection", "Project", "Benchmarked ciphers on time, CPU and memory. The panel called it the best project in the class.", ["Applied crypto", "Benchmarking"], "dynamic-cryptosuite-selection-capstone", { key: true, mark: "!", markLabel: "Best project in class" }),
    ms("2024", "May to Aug 2024", "ICT attachment, KenGen", "Work", "Moved key department records to Google Drive and supported networking while senior staff were away.", ["Networks", "Service desk"], "ict-attachment-kengen"),
    ms("2024", "Oct 2024", "Graduated, BSc Computer Forensics Science", "Education", "Specialised in cybersecurity.", [], "graduated-bsc-computer-forensics-science", { key: true, mark: "!", markLabel: "Milestone" }),
    ms("2025", "Apr 2025 to now", "Full stack engineer, Wamumbi", "Work", "Built the foundation’s platform for the public and its officials: nine roles, approvals and real event photos.", ["Next.js", "tRPC", "PostgreSQL"], "full-stack-engineer-wamumbi", { key: true, mark: "!", markLabel: "Turning point" }),
    ms("2025", "Jun to Jul 2025", "#3 and #5 at the Enactus Kenya National Expo", "Award", "Led three developers on the Solar Water ATM (#3) and built Sustainable Fishing (#5).", ["Team lead", "Django"], "enactus-kenya-national-expo-3-and-5", { tone: "award", key: true, mark: "!!", markLabel: "Brilliant move" }),
    ms("2025", "Aug to Dec 2025", "ALX ProDev back end and front end, with Project Nexus", "Training", "Both diplomas at once, then a solo social platform that earned one of the highest scores in the cohort.", ["Django REST", "Next.js", "CI"], "project-nexus-capstone", { key: true, mark: "!", markLabel: "Strong move" }),
    ms("2026", "Aug 2026", "Associate AI Engineer for Developers", "Certificate", "Ten DataCamp courses: LLM APIs, embeddings, Pinecone, LangChain and MCP.", ["OpenAI API", "LangChain", "MCP"], "associate-ai-engineer-for-developers"),
    ms("2026", "Nov 2026", "Machine Learning Engineer, DataCamp", "Now", "Twelve courses and 43 hours, from scikit-learn to monitoring models in production.", ["MLOps", "scikit-learn", "Docker"], "machine-learning-engineer-datacamp", { tone: "active", markLabel: "Latest move" }),
  ],
}

export type Reference = {
  relation: string
  date?: string
  mark?: string
  name: string
  role: string
  result?: string
  href?: string
  contextHref?: string
  contextLabel?: string
  quote: string
  full?: string
  moreLabel?: string
}

export const TRUST = {
  heading: "What people I’ve worked with say.",
  lead: "Irene Aragona wrote after my ALX capstone, Project Nexus. The others wrote reference letters, each available in full.",
  reviewCta: { label: "Worked with me? Add a review", href: "/review", note: "Reviews appear here once I’ve confirmed them." },
  letterLabel: "Read the full letter",
  refs: [
    {
      relation: "ALX ProDev Backend and Frontend, Project Nexus",
      date: "Jan 2026",
      mark: "IA",
      name: "Irene Aragona",
      role: "ALX",
      result: "Top score",
      contextHref: "/work/project-nexus",
      contextLabel: "Watch the Project Nexus presentation",
      quote:
        "It wasn’t easy, but you nailed it — delivering outstanding work and earning one of the highest scores in your Cohort.",
      moreLabel: "Read Irene’s full message",
      full: "“It’s been a while since you completed your program — and I’m sure Project Nexus still stands out as one of the biggest challenges of your journey! After four months of learning, you wrapped things up with an ambitious, fully fledged project. It wasn’t easy, but you nailed it — delivering outstanding work and earning one of the highest scores in your Cohort.” Project Nexus was the capstone for both ProDev Backend and ProDev Frontend, which I took at the same time.",
    },
    {
      relation: "Industrial attachment",
      date: "Aug 2024",
      mark: "KG",
      name: "Joseph Kasoa",
      role: "HR Learning and Development, KenGen",
      href: "https://drive.google.com/file/d/1N8ORYo_p5ML9eYhH4O75WhWSG_GhvAZP/view?usp=sharing",
      quote:
        "Lewis has been hardworking and result oriented during his attachment period in this organization, and demonstrated a sense of integrity and maturity.",
    },
    {
      relation: "Enactus JOOUST",
      date: "Mar 2026",
      mark: "DK",
      name: "Denver Kulecho",
      role: "President Emeritus, Enactus JOOUST",
      href: "https://docs.google.com/document/d/1fBs6rXEFGm5iddlvJSYvvSZxXqr0QW99xflNh7Rlvfw/edit?usp=sharing",
      quote:
        "His ability to translate complex technical requirements into scalable, life changing minimum viable products on time was pivotal.",
    },
  ] satisfies Reference[],
  moreLabel: "Two more references",
  moreRefs: [
    {
      relation: "Lecturer and attachment supervisor",
      mark: "CY",
      name: "Dr. Castro Yoga",
      role: "Acting Chair, Computer Science and Software Engineering, JOOUST",
      href: "https://drive.google.com/file/d/1NXNcNbz2qHWpOvxF_9Nhs4UNRx3LhRto/view?usp=sharing",
      quote:
        "His questions reflected someone who was trying to understand a concept properly rather than simply pass an exam.",
    },
    {
      relation: "Team manager",
      mark: "MR",
      name: "Michael Rutto",
      role: "Former team manager",
      href: "https://drive.google.com/file/d/1edy2g2gztqXFtcb0WgPSL4B2k0A2N6XR/view?usp=sharing",
      quote:
        "Lewis is a remarkable team player. He collaborates seamlessly with colleagues, offering support and encouragement.",
    },
  ] satisfies Reference[],
  certsHeading: "Certificates",
  certsLead: "The certificates themselves. Open Verify under any one for its record.",
  certsAll: "All nine, plus other certificates",
}

export type Certificate = {
  title: string
  issuer: string
  date: string
  image: string
  w: number
  h: number
  fileUrl?: string
  verifyUrl?: string
  credential?: string
}

export const CERTS: Certificate[] = [
  { title: "Machine Learning Engineer", issuer: "DataCamp", date: "Nov 2026", image: "/certificates/machine-learning-engineer.png", w: 1100, h: 635, fileUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/track/13caa7481279bc4aff0dcb5697ad2bac1169b302" },
  { title: "Machine Learning in Production in Python", issuer: "DataCamp", date: "Oct 2026", image: "/certificates/machine-learning-in-production.jpg", w: 1100, h: 635 },
  { title: "Associate AI Engineer for Developers", issuer: "DataCamp", date: "Aug 2026", image: "/certificates/associate-ai-engineer.jpg", w: 1100, h: 635, fileUrl: "https://drive.google.com/file/d/1hwtO1PBwQ1Dx-2wGyDWw6puYhVRIpx-Z/view?usp=sharing" },
  { title: "ProDev Backend, Professional Diploma", issuer: "ALX", date: "Dec 2025", image: "/certificates/alx-prodev-backend.jpg", w: 1100, h: 618, fileUrl: "https://drive.google.com/file/d/1Ez-h4ARvLdx4Up-1K3V6K4Cemb_EDivp/view?usp=sharing" },
  { title: "ProDev Frontend, Professional Diploma", issuer: "ALX", date: "Dec 2025", image: "/certificates/alx-prodev-frontend.jpg", w: 1100, h: 618, fileUrl: "https://drive.google.com/file/d/1is5GuLZcnJN5TUmcVOFE3h7Gln-DvuBl/view?usp=sharing" },
  { title: "Freelancer Academy", issuer: "ALX Ventures and Mastercard Foundation", date: "Dec 2025", image: "/certificates/alx-freelancer-academy.jpg", w: 1100, h: 618, fileUrl: "https://drive.google.com/file/d/1IXzLmaORNV1FFR8Sj47bIFmZ8q6YTcQ4/view?usp=sharing" },
  { title: "Founder Academy", issuer: "ALX Ventures and Mastercard Foundation", date: "Nov 2025", image: "/certificates/alx-founder-academy.jpg", w: 1100, h: 618, fileUrl: "https://drive.google.com/file/d/1TYBCsJgmoNgJI3-RqZoCziH9U1DcUHST/view?usp=sharing" },
  { title: "Professional Foundations", issuer: "ALX", date: "Aug 2025", image: "/certificates/alx-professional-foundations.jpg", w: 1100, h: 618, fileUrl: "https://drive.google.com/file/d/16VlBXtuOLrIXIHKagBLaKBms13suKB8F/view?usp=sharing" },
  { title: "Software Engineering, back end specialisation", issuer: "ALX", date: "Feb 2025", image: "/certificates/alx-software-engineering-backend.jpg", w: 1100, h: 618, fileUrl: "https://drive.google.com/file/d/1e0UUNaqJtpvcOBaAJ1R6KU5MtFpKwHhS/view?usp=sharing" },
]

export const OFF = {
  heading: "Off the clock.",
  // The lead carries an inline link; split around it.
  leadBefore:
    "Chess taught me to calculate before I commit. On board 2 for JOOUST at WEKUSA 2023, my 7 wins from 9 helped the team finish second runners up. ",
  leadLink: "Watch my best rated wins replay",
  leadAfter: ", challenge me, or race me on a kata.",
  challenges: [
    { platform: "lichess", icon: "knight", label: "Lichess", handle: "Lique", invite: "Play me at blitz or rapid.", cta: "Challenge me", href: "https://lichess.org/?user=Lique#friend" },
    { platform: "chesscom", icon: "crown", label: "Chess.com", handle: "liquelaliqour", invite: "Send a challenge from my profile.", cta: "Challenge me", href: "https://www.chess.com/member/liquelaliqour" },
    { platform: "leetcode", icon: "code", label: "LeetCode", handle: "LewisMagangi", invite: "Compare solutions on the daily problem.", cta: "See my profile", href: "https://leetcode.com/u/LewisMagangi/" },
    { platform: "codewars", icon: "puzzle", label: "Codewars", handle: "LewisMagangi", invite: "Race me on a kata.", cta: "See my profile", href: "https://www.codewars.com/users/LewisMagangi" },
  ] as const,
  readingHeading: "Reading now",
  reading: [
    { title: "Designing Data‑Intensive Applications", where: "Chapter 10, batch processing" },
    { title: "Understanding Distributed Systems", where: "About halfway" },
    { title: "Grokking the System Design Interview", where: "Chapter 13, Twitter search" },
  ],
  shelfLabel: "The whole shelf, read and planned",
}

export const FAQ = {
  heading: "Questions before you book.",
  items: [
    { title: "How much does a project cost?", body: "Most projects land between $600 and $1,200 depending on scope. The tiers above show what each covers, and you get a quote after the discovery call." },
    { title: "Is the discovery call really free?", body: "Yes. Thirty minutes online, with no obligation to go further." },
    { title: "What should I bring to the call?", body: "Nothing formal. A link, a few lines about the problem or a job description is enough." },
    { title: "Can you take over an existing codebase?", body: "Yes. Wamumbi and the Solar Water ATM both started from code that already existed." },
    { title: "Can we work together if I’m not in Nairobi?", body: "Yes. The work and the calls happen online, and the booking page shows every time in your own time zone." },
    { title: "Are you open to full time roles?", body: "Yes, especially in AI and ML engineering. My CV and career page have the details." },
  ],
}

export const CLOSE = {
  heading: "Your move.",
  lead: "Thirty minutes, online. Bring a project or a problem, and leave with a clear next step either way.",
  messageLabel: "Or send a message",
  facts: [
    { icon: "clock", text: "30 minutes, weekdays 09:00 to 17:30 EAT" },
    { icon: "video", text: "Google Meet link in your confirmation email" },
    { icon: "globe", text: "Times shown in your own time zone" },
  ] as const,
  me: "You’ll talk to me, Lewis.",
}
