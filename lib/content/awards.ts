// The awards section on Home (Gambit AwardCard). Lewis asked for it back on 13 Nov 2026; v8 had folded awards
// into the timeline. Facts come from the career and work content. Admin › Awards edits the list.

export type AwardTone = "ranking" | "quiet"
export type AwardData = {
  rank: string
  title: string
  event: string
  year: string
  tone: AwardTone
  href?: string
  linkLabel?: string
  proofUrl?: string
}

export const AWARDS_HEAD = {
  heading: "Judged by others.",
  lead: "Rankings and honours, each linked to the work behind it.",
}

export const AWARDS: AwardData[] = [
  {
    rank: "#3",
    title: "Solar Water ATM",
    event: "Enactus Kenya National Expo, Ngong Hotel. I led the team of three developers.",
    year: "2025",
    tone: "ranking",
    href: "/work/solar-powered-water-atm",
    linkLabel: "See the project",
  },
  {
    rank: "#5",
    title: "Sustainable Fishing",
    event: "Enactus Kenya National Expo, Ngong Hotel. Built by the same team I led.",
    year: "2025",
    tone: "ranking",
    href: "/work/sustainable-fishing",
    linkLabel: "See the project",
  },
  {
    rank: "Best",
    title: "Best capstone presentation",
    event: "Dynamic Cryptosuite Selection, final year project panel at JOOUST.",
    year: "2024",
    tone: "ranking",
    href: "/work/dynamic-cryptosuite-selection",
    linkLabel: "See the project",
  },
  {
    rank: "7/9",
    title: "Board 2 for JOOUST",
    event: "WEKUSA 2023. My 7 wins from 9 helped the team finish second runners up.",
    year: "2023",
    tone: "ranking",
    href: "/chess",
    linkLabel: "See the chess page",
  },
  {
    rank: "Top",
    title: "Among the highest scores in the cohort",
    event: "ALX ProDev Backend and Frontend, with the Project Nexus capstone.",
    year: "2025",
    tone: "quiet",
    href: "/work/project-nexus",
    linkLabel: "See the project",
  },
]

/** Where an award can link on this site; Admin › Awards offers these. */
export const AWARD_LINKS: { href: string; label: string; linkLabel: string }[] = [
  { href: "/work/wamumbi-charity-platform", label: "Project: Wamumbi", linkLabel: "See the project" },
  { href: "/work/project-nexus", label: "Project: Project Nexus", linkLabel: "See the project" },
  { href: "/work/solar-powered-water-atm", label: "Project: Solar Water ATM", linkLabel: "See the project" },
  { href: "/work/sustainable-fishing", label: "Project: Sustainable Fishing", linkLabel: "See the project" },
  { href: "/work/sne-portal", label: "Project: SNE Portal", linkLabel: "See the project" },
  { href: "/work/dynamic-cryptosuite-selection", label: "Project: Dynamic Cryptosuite Selection", linkLabel: "See the project" },
  { href: "/work/afya-bora", label: "Project: Afya Bora", linkLabel: "See the project" },
  { href: "/work/simple-shell", label: "Project: Simple Shell", linkLabel: "See the project" },
  { href: "/chess", label: "Chess page", linkLabel: "See the chess page" },
  { href: "/certificates", label: "Certificates page", linkLabel: "See the certificates" },
  { href: "/career", label: "Career page", linkLabel: "See the career page" },
]
