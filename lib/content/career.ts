// Career page content, verbatim from design/v8/boards/Career.dc.html (the last move is content.json › careerLastMove).
import type { TimelineItemData } from "@/components/gambit/timeline"

export const INTRO = {
  title: "From forensics to full stack to AI, in order.",
  lead: "Every role, programme and result since 2020, oldest first. Open a move to see what it taught me, or open Task view to see them all at once.",
  cvLabel: "Download my CV",
  studiedLabel: "What I studied, and my transcript",
  taskTitle: "Every move since 2020",
}

type Kind = "WORK" | "EDUCATION" | "TRAINING" | "PROJECT" | "AWARD" | "STUDY" | "CERTIFICATE"
type Tone = "neutral" | "active" | "award"
type Move = { when: string; title: string; kind: Kind; detail: string; chips: string[]; tone: Tone }

const e = (when: string, title: string, kind: Kind, detail: string, chips: string[] = [], tone: Tone = "neutral"): Move => ({
  when,
  title,
  kind,
  detail,
  chips,
  tone,
})

const YEARS: { year: string; items: Move[] }[] = [
  {
    year: "2020",
    items: [
      e("Sep 2020", "BSc Computer Forensics Science begins", "EDUCATION", "Jaramogi Oginga Odinga University of Science and Technology, Bondo. Software engineering was my first choice; cybersecurity became the foundation.", ["Programming", "Operating systems", "Networks"]),
    ],
  },
  {
    year: "2022",
    items: [
      e("Feb 2022", "ALX Software Engineering, first run", "TRAINING", "Mastercard Foundation scholarship. Shell, Git and C from month 0; Simple Shell in month 2. Paused after four months to finish my degree.", ["Bash", "Git", "C pointers", "malloc/free", "Linked lists"]),
    ],
  },
  {
    year: "2023",
    items: [
      e("Feb to May 2023", "ALX ambassador, Ainfluence", "WORK", "Promoted the ALX Software Engineering programme online; the campaign helped bring over 20,000 students into the 2023 intake sponsored by the Mastercard Foundation.", ["LinkedIn outreach", "Community"]),
      e("Sep 2023 to Mar 2024", "Dynamic Cryptosuite Selection capstone", "PROJECT", "Benchmarked AES, DES, RSA, Diffie–Hellman, hashing and signatures on time, CPU and RAM. The panel called it the best project in the class.", ["Applied crypto", "Benchmarking", "Data viz"]),
      e("Nov 2023", "Rejoined ALX SE Foundations", "TRAINING", "Restarted the eight month foundations track alongside final year."),
    ],
  },
  {
    year: "2024",
    items: [
      e("6 May to 6 Aug 2024", "ICT attachment, KenGen", "WORK", "Central Office ICT department. Led moving key department documents to Google Drive for faster retrieval and version tracking, and guided colleagues on networking while senior staff were on leave.", ["Phone & switch config", "Video conferencing", "Access control cards", "Service desk", "SAP", "ICT security & backup", "Mail Exchange", "WorkflowGen"]),
      e("May to Jul 2024", "Afya Bora, Enactus JOOUST", "PROJECT", "Proposed and built a health Q&A, self hosted on Ubuntu with Nginx, UFW, SSH hardening and Let’s Encrypt. Presented at the 2024 national expo, and learned to measure impact.", ["Django", "Nginx", "Linux hardening"]),
      e("Sep 2024", "Completed ALX SE Foundations", "TRAINING", "Validated at 87.76% across nine months of C, Python, SQL, DevOps and web stack projects.", ["Data structures", "Algorithms", "AirBnB clone", "Load balancing", "HTTPS", "Firewalls"]),
      e("30 Sep 2024 to 8 Feb 2025", "ALX back end specialisation", "TRAINING", "Validated at 112.81%. ES6, TypeScript, async Python, Redis, NoSQL, queues, caching, i18n, PII handling and authentication services.", ["Node.js", "Redis", "MongoDB", "Session auth", "Pagination", "Unit tests"]),
      e("28 Oct 2024", "Graduated, BSc Computer Forensics Science", "EDUCATION", "Specialised in cybersecurity."),
    ],
  },
  {
    year: "2025",
    items: [
      e("Apr 2025 to now", "Full stack engineer, Wamumbi", "WORK", "Charity platform for the public and the foundation’s officials: nine roles enforced on the server, approvals and an audit log, real event photos, Prisma 7 on Neon, CVE-2025-66478 patched. Deployed on real data ahead of launch.", ["Next.js", "tRPC", "Prisma", "Clerk"]),
      e("5 May to 5 Aug 2025", "ALX Professional Foundations", "TRAINING", "12 weeks of workplace skills: design thinking, agile teams, writing a PRD, data storytelling, pitching, and a personal website.", ["Human centred design", "PRDs", "Figma", "Miro"]),
      e("Jun to Jul 2025", "Enactus Kenya National Expo: #3 and #5", "AWARD", "Led three developers on the Solar Water ATM (#3) and Sustainable Fishing (#5) at Ngong Hotel.", ["Team lead", "Django"], "award"),
      e("18 Aug to 9 Dec 2025", "ALX ProDev Backend + Frontend", "TRAINING", "Both diplomas in parallel. DRF, JWT, signals, Docker on the back; Next.js, TypeScript, Redux, hooks on the front.", ["DRF", "JWT", "Docker", "Next.js", "Redux"]),
      e("Nov to Dec 2025", "Project Nexus capstone", "PROJECT", "A Twitter like network, solo in five weeks: 150+ commits, 46 pull requests, OAuth, messaging, communities, CI.", ["Django REST", "Next.js", "GitHub Actions"]),
      e("Oct to Dec 2025", "Founder Academy, Freelancer Academy, OctoPrep", "TRAINING", "Lean Canvas and customer discovery; proposals, pricing and client communication; an eight week career prep cohort.", ["Lean Canvas", "Customer discovery", "Proposals", "Pricing"]),
    ],
  },
  {
    year: "2026",
    items: [
      e("Jun 2026", "Designing Data‑Intensive Applications", "STUDY", "Started the first edition; now on chapter 10, batch processing."),
      e("Aug 2026", "Associate AI Engineer for Developers", "CERTIFICATE", "DataCamp, 29 hours.", ["OpenAI API", "Embeddings", "Pinecone", "LangChain", "MCP"]),
      e("Sep 2026", "Database Design Fundamentals", "CERTIFICATE", "Educative.", ["ER modelling", "Functional dependencies", "BCNF", "SQL"]),
      e("Oct 2026", "Machine Learning in Production in Python", "CERTIFICATE", "DataCamp, 14 hours.", ["MLOps", "MLflow", "Drift monitoring", "DVC"]),
      // The last move: careerLastMove, ML Engineer finished in Nov 2026.
      e("Nov 2026", "Machine Learning Engineer, DataCamp", "CERTIFICATE", "The full career track: twelve courses and 43 hours, from supervised learning to monitoring models in production. Reading AI Engineering and Hands‑On Machine Learning alongside.", ["scikit-learn", "MLOps", "MLflow", "ETL", "Great Expectations", "DVC", "Docker", "CI/CD for ML"], "active"),
    ],
  },
]

// Key moments get a chess style mark on the timeline.
const KEY: Record<string, [string | undefined, string]> = {
  "Graduated, BSc Computer Forensics Science": ["!", "Milestone"],
  "Enactus Kenya National Expo: #3 and #5": ["!!", "Brilliant move"],
  "Full stack engineer, Wamumbi": ["!", "Turning point"],
  "Project Nexus capstone": ["!", "Strong move"],
  "Dynamic Cryptosuite Selection capstone": ["!", "Best project in class"],
  "Machine Learning Engineer, DataCamp": [undefined, "Latest move"],
}

const LABEL: Record<Kind, string> = {
  WORK: "Work",
  EDUCATION: "Education",
  TRAINING: "Training",
  PROJECT: "Project",
  AWARD: "Award",
  STUDY: "Study",
  CERTIFICATE: "Certificate",
}

/** The anchor Home links to: /career#<slug of the title>. */
export const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

export const MOVES: TimelineItemData[] = YEARS.flatMap((y) =>
  y.items.map((m) => {
    const k = KEY[m.title]
    return {
      id: slug(m.title),
      year: y.year,
      date: m.when,
      title: m.title,
      kind: LABEL[m.kind],
      tone: m.tone,
      detail: m.detail,
      chips: m.chips,
      key: Boolean(k),
      mark: k?.[0],
      markLabel: k?.[1],
    }
  }),
)

/** The reading battery: one item per year, pointing at that year's first move. */
export const RAIL = YEARS.map((y) => ({
  id: slug(y.items[0].title),
  label: `${y.year}, ${y.items.length} ${y.items.length === 1 ? "move" : "moves"}`,
}))
