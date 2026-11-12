// Site-wide navigation and footer content, verbatim from design/v8/boards/Main.dc.html (SiteNav, SiteFooter).

export type NavItem = { label: string; href: string; note: string }
export type FooterLink = { label: string; href: string; external?: boolean }
export type FooterColumn = { title: string; links: FooterLink[] }

export const BOOK_HREF = "/book"

/** The nav is exactly Work, Services, Career and Chess, plus Book. */
export const NAV: NavItem[] = [
  { label: "Work", href: "/work", note: "Case studies and every project" },
  { label: "Services", href: "/services", note: "What I build and what it costs" },
  { label: "Career", href: "/career", note: "Every move since 2020" },
  { label: "Chess", href: "/chess", note: "Results, the game, a challenge" },
]

export const FOOTER_BLURB = "Software engineer in Nairobi, Kenya. Secure web systems, AI and ML."

export const FOOTER: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Work", href: "/work" },
      { label: "Skills", href: "/skills" },
      { label: "Services", href: "/services" },
      { label: "Career", href: "/career" },
      { label: "Chess", href: "/chess" },
      { label: "AI and ML", href: "/ai-ml" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Education", href: "/education" },
      { label: "Certificates", href: "/certificates" },
      { label: "Reading", href: "/reading" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: "https://github.com/LewisMagangi", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/lewis-magangi/", external: true },
      { label: "LeetCode", href: "https://leetcode.com/u/LewisMagangi/", external: true },
      { label: "Codewars", href: "https://www.codewars.com/users/LewisMagangi", external: true },
      { label: "Lichess", href: "https://lichess.org/@/Lique", external: true },
      { label: "Chess.com", href: "https://www.chess.com/member/liquelaliqour", external: true },
    ],
  },
]

export const LEGAL: FooterLink[] = [
  { label: "Privacy", href: "/legal#privacy" },
  { label: "Terms", href: "/legal#terms" },
]
