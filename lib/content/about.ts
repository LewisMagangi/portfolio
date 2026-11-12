// About page content, verbatim from design/v8/boards/About.dc.html.

export const PORTRAIT = {
  src: "/portrait/lewis-magangi.jpg",
  alt: "Lewis Magangi in a dark suit and tie, smiling",
}

export const INTRO = {
  title: "Curious about how hard problems get solved.",
  paragraphs: [
    "Maths hooked me first: breaking big problems into small, manageable steps. My first time online was on a pay per use WiFi laptop, watching tutorials and realising how much could be learned and built from there.",
    "I wanted to study software engineering and was offered Computer Forensics Science at JOOUST instead, which I took gladly. Two years in, a coursemate told me about ALX’s Mastercard Foundation scholarship, and building took over. My capstone benchmarked symmetric, asymmetric and hashing algorithms on time, CPU and RAM, and picked the right one for each security budget. That habit stuck: measure first, then decide.",
    "My first Enactus expo in 2024 taught me the other half: judges scored users and impact, not clean deployments. A year later I led three developers to #3 and #5 nationally.",
    "Today I ship production Next.js and Django apps for organisations doing real good, and I’m moving into AI and ML engineering.",
  ],
  cv: { label: "Download CV", href: "/api/cv/download" },
  career: { label: "See my career", href: "/career" },
}

export const STACK = {
  heading: "Stack",
  groups: [
    { name: "AI & ML", items: ["OpenAI API", "LangChain", "Embeddings", "Pinecone", "MLflow", "DVC", "MCP"] },
    { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "WCAG"] },
    { name: "Backend", items: ["Node.js", "tRPC", "Django", "DRF", "REST"] },
    { name: "Data", items: ["PostgreSQL", "Prisma", "MySQL", "Redis"] },
    { name: "Ops & security", items: ["Docker", "CI/CD", "Linux", "Nginx", "Applied crypto"] },
  ],
}

export const BEYOND = {
  heading: "Beyond code",
  chess: {
    eyebrow: "Competitive chess, JOOUST Chess Club",
    title: "Three straight years at KUSA Western.",
    body: "Represented my university at the KUSA Western championships: board 3 in 2021 (3 of 5) and 2022 (2 of 5), then board 2 in 2023, where I won 7 of 9.",
    tags: [
      { label: "7/9, 2023", award: true },
      { label: "3/5, 2021" },
      { label: "2/5, 2022" },
    ],
    // The Italian Game after 3.Bc4.
    position: { fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R", from: "f1", to: "c4", label: "The Italian Game after 1.e4 e5 2.Nf3 Nc6 3.Bc4" },
    links: [
      { label: "Lichess: Lique ↗", href: "https://lichess.org/@/Lique", external: true },
      { label: "Chess.com: liquelaliqour ↗", href: "https://www.chess.com/member/liquelaliqour", external: true },
      { label: "The chess page", href: "/chess" },
    ],
  },
  enactus: {
    eyebrow: "Enactus JOOUST",
    title: "Building for the expo floor",
    body: "Joined in September 2023. Pitched Afya Bora into the Panda Kenya five in one project and presented it at the July 2024 national expo, then led three developers to #3 and #5 in 2025. Now an alumnus advising the club.",
  },
}

export const REFERENCES = {
  heading: "References",
  body: "Five references, one line each, with the full letters on the home page.",
  cta: { label: "Read the references", href: "/#trust" },
}
