// Certificates page content, verbatim from design/v8/boards/Certificates.dc.html and content.json › certificates.
// The carousel reuses CERTS from the Home content (the same nine professional certificates).

export type CertCardData = {
  mark: string
  issuer: string
  title: string
  date: string
  length: string
  verify?: string
  note?: string
  learned: string[]
}
export type CertGroup = { id: string; name: string; items: CertCardData[] }

export const INTRO = {
  title: "Certificates.",
  lead: "Nine professional certificates, newest first. Scroll through the certificates themselves; open Verify under any one for its record.",
}

export const GROUPS: CertGroup[] = [
  {
    id: "ai",
    name: "AI and data",
    items: [
      {
        mark: "DC",
        issuer: "DataCamp, career track",
        title: "Machine Learning Engineer",
        date: "Nov 2026",
        length: "43 HR",
        verify: "https://www.datacamp.com/completed/statement-of-accomplishment/track/13caa7481279bc4aff0dcb5697ad2bac1169b302",
        note: "Twelve courses, each verifiable on the Education page",
        learned: ["Supervised learning with scikit-learn", "MLOps concepts & deployment", "MLflow tracking & registry", "ETL & ELT pipelines", "Data quality with Great Expectations", "DVC versioning", "Drift detection & monitoring", "Docker", "CI/CD for ML", "Shell"],
      },
      {
        mark: "DC",
        issuer: "DataCamp, skill track",
        title: "Machine Learning in Production in Python",
        date: "Oct 2026",
        length: "14 HR",
        learned: ["MLOps lifecycle", "MLflow experiment tracking", "Model registry", "Data & concept drift", "Monitoring in Python", "DVC data versioning", "DVC pipelines"],
      },
      {
        mark: "DC",
        issuer: "DataCamp, track",
        title: "Associate AI Engineer for Developers",
        date: "Aug 2026",
        length: "29 HR",
        verify: "https://drive.google.com/file/d/1hwtO1PBwQ1Dx-2wGyDWw6puYhVRIpx-Z/view?usp=sharing",
        learned: ["OpenAI & Responses API", "Prompt engineering", "Hugging Face", "Embeddings & semantic search", "Pinecone", "LangChain chains & agents", "LLMOps", "Model Context Protocol"],
      },
    ],
  },
  {
    id: "swe",
    name: "Software engineering",
    items: [
      {
        mark: "ALX",
        issuer: "ALX, Professional Diploma",
        title: "ProDev Backend",
        date: "Dec 2025",
        length: "18 Aug to 9 Dec",
        verify: "https://drive.google.com/file/d/1Ez-h4ARvLdx4Up-1K3V6K4Cemb_EDivp/view?usp=sharing",
        note: "Capstone: Project Nexus",
        learned: ["Async Python, generators, decorators", "Advanced SQL & query plans", "Django REST Framework", "JWT, permissions, middleware", "Django signals & ORM", "Docker & Git flow", "Pytest"],
      },
      {
        mark: "ALX",
        issuer: "ALX, Professional Diploma",
        title: "ProDev Frontend",
        date: "Dec 2025",
        length: "18 Aug to 9 Dec",
        verify: "https://drive.google.com/file/d/1is5GuLZcnJN5TUmcVOFE3h7Gln-DvuBl/view?usp=sharing",
        note: "Capstone: Project Nexus",
        learned: ["Figma prototyping", "Accessibility & SEO", "TypeScript", "Tailwind CSS", "Next.js SSR vs CSR", "Redux & Context API", "React hooks", "GraphQL & REST"],
      },
      {
        mark: "ALX",
        issuer: "ALX Software Engineering",
        title: "Software Engineering, back end specialisation",
        date: "Feb 2025",
        length: "12 MO",
        verify: "https://drive.google.com/file/d/1e0UUNaqJtpvcOBaAJ1R6KU5MtFpKwHhS/view?usp=sharing",
        note: "Foundations 87.76%, specialisation 112.81%",
        learned: ["C & memory", "Data structures & algorithms", "Simple Shell", "Python OOP & TDD", "SQL & ORM", "Nginx, load balancing, SSL", "Redis & queues", "Auth & PII"],
      },
    ],
  },
  {
    id: "pro",
    name: "Professional and entrepreneurship",
    items: [
      {
        mark: "ALX",
        issuer: "ALX Ventures × Mastercard Foundation",
        title: "Freelancer Academy",
        date: "Dec 2025",
        length: "3 Nov to 2 Dec",
        verify: "https://drive.google.com/file/d/1IXzLmaORNV1FFR8Sj47bIFmZ8q6YTcQ4/view?usp=sharing",
        learned: ["Personal branding", "Client communication", "Proposal writing", "Project management", "Pricing"],
      },
      {
        mark: "ALX",
        issuer: "ALX Ventures × Mastercard Foundation",
        title: "Founder Academy",
        date: "Nov 2025",
        length: "13 Oct to 11 Nov",
        verify: "https://drive.google.com/file/d/1TYBCsJgmoNgJI3-RqZoCziH9U1DcUHST/view?usp=sharing",
        learned: ["Lean Canvas", "Customer discovery", "Business strategy", "Product development", "Startup execution"],
      },
      {
        mark: "ALX",
        issuer: "ALX",
        title: "Professional Foundations",
        date: "Aug 2025",
        length: "12 WK",
        verify: "https://drive.google.com/file/d/16VlBXtuOLrIXIHKagBLaKBms13suKB8F/view?usp=sharing",
        learned: ["Design thinking", "Agile teamwork", "Writing a PRD", "Data storytelling", "Wireframes & user interviews", "Pitching", "Responsible AI use"],
      },
    ],
  },
]

export const OTHERS = [
  {
    title: "Database Design Fundamentals for Software Engineers",
    issuer: "Educative",
    when: "Sep 2026",
    image: "/certificates/database-design-educative.jpg",
    alt: "Educative certificate for Database Design Fundamentals for Software Engineers",
  },
  {
    title: "Career Preparation Program, Cohort 3",
    issuer: "OctoPrep",
    when: "27 Oct to 19 Dec 2025",
    image: "/certificates/octoprep-career-preparation.jpg",
    alt: "OctoPrep Career Preparation Program certificate, Cohort 3",
  },
  {
    title: "Chess Championship, certificate of participation for JOOUST",
    issuer: "Kenya University Sports Association, Western Conference",
    when: "Nov 2021, Masinde Muliro University",
    tag: "Board 3, 3 of 5",
    href: "https://drive.google.com/file/d/1T-LmqogVA1arZuytaOaE8Zuyg-PQjLst/view?usp=sharing",
    image: "/certificates/kusa-western-chess-2021.jpg",
    alt: "KUSA Western Chess Championship certificate of participation, November 2021",
  },
]
