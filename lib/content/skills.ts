// Skills page content, verbatim from design/v8/boards/Skills.dc.html and design/v8/data/skills.json.

export type SkillLevel = "shipped" | "trained" | "learning"
export type Evidence = { label: string; href: string }
export type Skill = { name: string; how: string; level: SkillLevel; evidence: Evidence[] }
export type SkillGroup = { id: string; title: string; note: string; skills: Skill[] }

/** Page group id → database SkillCategory (Admin › Skills stores each group as one category). */
export const GROUP_CATEGORY = {
  backend: "BACKEND",
  frontend: "FRONTEND",
  data: "DATABASE",
  ai: "AI_ML",
  security: "SECURITY",
  delivery: "DEVOPS",
} as const satisfies Record<string, string>

/** Database SkillLevel for each page level. */
export const LEVEL_DB = { shipped: "SHIPPED", trained: "TRAINED", learning: "LEARNING" } as const satisfies Record<SkillLevel, string>

export const LEVELS: Record<SkillLevel, { label: string; meaning: string }> = {
  shipped: { label: "Shipped", meaning: "used in delivered work" },
  trained: { label: "Trained", meaning: "finished a certified course" },
  learning: { label: "Learning", meaning: "in progress" },
}

// Where each skill was used: each project has its own page under /work.
const P = {
  wamumbi: { label: "Wamumbi", href: "/work/wamumbi-charity-platform" },
  nexus: { label: "Project Nexus", href: "/work/project-nexus" },
  atm: { label: "Solar Water ATM", href: "/work/solar-powered-water-atm" },
  fishing: { label: "Sustainable Fishing", href: "/work/sustainable-fishing" },
  crypto: { label: "Cryptosuite", href: "/work/dynamic-cryptosuite-selection" },
  shell: { label: "Simple Shell", href: "/work/simple-shell" },
  site: { label: "This site", href: "/" },
  bsc: { label: "BSc Computer Forensics", href: "/education" },
  aiTrack: { label: "Associate AI Engineer", href: "/ai-ml" },
  mlProd: { label: "ML in Production", href: "/ai-ml" },
  mlTrack: { label: "ML Engineer track", href: "/education" },
} satisfies Record<string, Evidence>

const s = (name: string, how: string, level: SkillLevel, evidence: Evidence[]): Skill => ({ name, how, level, evidence })

export const INTRO = {
  title: "The tools behind / the work.",
  lead: "Every skill here is tied to something I built or a course I finished. Open a project beside any skill to see it in use.",
}

export const GROUPS: SkillGroup[] = [
  {
    id: "backend",
    title: "Back end and APIs",
    note: "Where most of my hours go: the endpoints, auth and business rules a product runs on.",
    skills: [
      s("Python and Django", "Django 5, Django REST Framework", "shipped", [P.nexus, P.atm, P.fishing]),
      s("TypeScript APIs with tRPC", "Typed endpoints validated with Zod", "shipped", [P.wamumbi]),
      s("API documentation", "OpenAPI and Swagger, 51 endpoints documented", "shipped", [P.wamumbi]),
      s("Authentication", "JWT with blacklisting, OAuth, email verification, Clerk", "shipped", [P.nexus, P.wamumbi]),
      s("Flask", "Migrated a Flask prototype to Django", "shipped", [P.atm]),
      s("C and Unix", "A working shell, process control, system calls", "shipped", [P.shell]),
    ],
  },
  {
    id: "frontend",
    title: "Front end",
    note: "Interfaces that load fast, read clearly and work with a keyboard.",
    skills: [
      s("Next.js and React", "App Router, server components", "shipped", [P.wamumbi, P.nexus, P.site]),
      s("TypeScript", "Strict types end to end, shared with the API", "shipped", [P.wamumbi, P.site]),
      s("Tailwind and shadcn/ui", "Design tokens mapped to components", "shipped", [P.site]),
      s("Accessibility", "ARIA, focus order, contrast checks", "shipped", [P.wamumbi, P.site]),
    ],
  },
  {
    id: "data",
    title: "Data",
    note: "Schemas you can trust, so every record can be traced back to where it came from.",
    skills: [
      s("PostgreSQL", "Hosted on Neon, with referential integrity", "shipped", [P.wamumbi, P.nexus]),
      s("Prisma", "Prisma 7, lazy init, idempotent seeding of 17 tables", "shipped", [P.wamumbi, P.site]),
      s("Data modelling", "Third normal form from DBML, lookup tables", "shipped", [P.wamumbi]),
      s("Data pipelines", "ETL and ELT in Python, deployed and maintained", "trained", [P.mlTrack]),
      s("Data quality", "Great Expectations checks on incoming data", "trained", [P.mlTrack]),
      s("Data versioning", "DVC pipelines for data and models", "trained", [P.mlTrack]),
    ],
  },
  {
    id: "ai",
    title: "AI and ML",
    note: "Newest, and growing fastest. Trained through three DataCamp tracks, 22 courses in all.",
    skills: [
      s("LLM APIs", "OpenAI API, structured outputs, rate limits", "trained", [P.aiTrack]),
      s("Embeddings and vector search", "Semantic search with Pinecone", "trained", [P.aiTrack]),
      s("LangChain and agents", "Prompts, chains, tools, MCP", "trained", [P.aiTrack]),
      s("Hugging Face", "Running models and datasets from the Hub", "trained", [P.aiTrack]),
      s("Supervised learning", "Classification, regression and pipelines in scikit-learn", "trained", [P.mlTrack]),
      s("MLOps with MLflow", "Experiment tracking, model registry, deployment", "trained", [P.mlTrack, P.mlProd]),
      s("Model monitoring", "Data drift, concept drift, root cause analysis", "trained", [P.mlTrack, P.mlProd]),
    ],
  },
  {
    id: "security",
    title: "Security",
    note: "My degree is in computer forensics, so security is a default, not an add on.",
    skills: [
      s("Vulnerability patching", "Patched CVE-2025-66478 in production", "shipped", [P.wamumbi]),
      s("Injection and XSS fixes", "Input validation, hardened password resets", "shipped", [P.atm]),
      s("Cryptography", "Dynamic cryptosuite selection, best project in class", "shipped", [P.crypto]),
      s("Digital forensics", "Evidence handling, networks, incident analysis", "trained", [P.bsc]),
    ],
  },
  {
    id: "delivery",
    title: "Testing and delivery",
    note: "How the work reaches users without surprises.",
    skills: [
      s("Automated testing", "pytest and Jest, run on every push", "shipped", [P.nexus, P.atm]),
      s("CI with GitHub Actions", "Pre-commit and pre-push checks, CI for ML with DVC", "shipped", [P.nexus, P.mlTrack]),
      s("Docker", "Containers, custom images, secure image builds", "trained", [P.mlTrack]),
      s("Git and code review", "150+ commits and 46 pull requests on one project", "shipped", [P.nexus, P.wamumbi]),
      s("Vercel deployment", "Preview and production deploys", "shipped", [P.wamumbi, P.nexus, P.site]),
    ],
  },
]

export const NOW = {
  when: "Just finished, Nov 2026",
  title: "Machine Learning Engineer, DataCamp",
  body: "Twelve courses and 43 hours, from scikit-learn to monitoring models in production. Each course is on the Education page with its own certificate.",
  cta: { label: "See every course", href: "/education" },
}

export const CLOSE = {
  heading: "Need one of these on your project?",
  body: "Bring the problem to a free 30 minute call. I’ll tell you which of these it needs, and whether I’m the right fit.",
  secondary: { label: "See the work first", href: "/work" },
}
