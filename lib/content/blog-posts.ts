// The blog's posts as Markdown. Lewis asked for one post only: "Co-founding a Tech Company", first published on
// LinkedIn (linkedin.com/pulse/co-founding-tech-company-lewis-magangi-tlj7f), 5 Jan 2026. His wording, verbatim;
// only the headings and bold lead words are restored. The two v8 board posts are dropped.
// The database (Admin › Blog) is the source the site reads. This file is what `npm run blog:v8` writes into it,
// and what /blog shows when the database has no published posts or can't be reached.

export type ContentPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  readTime: number
  content: string
}

/** Topic filter order on /blog. A topic shows only once it has a post. */
export const CATEGORY_ORDER = ["Startups", "Web development", "Accessibility", "Security", "AI and ML"]

/** Posts the sync takes off the site (archived, not deleted): the old seed and v8 posts. */
export const RETIRED_SLUGS = ["building-accessible-voice-interfaces", "django-to-nextjs-journey"]

export const POSTS: ContentPost[] = [
  {
    slug: "co-founding-a-tech-company",
    title: "Co-founding a Tech Company",
    excerpt: "A cofounder is a business partner that you decide to found a company with.",
    category: "Startups",
    publishedAt: "2026-01-05",
    readTime: 3,
    content: `**Cofounder** A cofounder is a business partner that you decide to found a company with.

## Reasons for a Cofounder

**Productivity** Assuming the rate and competency of work to be accomplished is constant, two people will use half the time to complete a project compared to one.

**Complementary Skills** Having a cofounder with complementary skills enables individual contributors to focus on what they are good at. This improves the quality of work and the contentment of the team on work done, if both work within their circle of competency.

**Moral Support** Founding and running a company is a tough challenge—quite emotionally intensive and physically draining—due to the level of uncertainty, considering the odds are stacked against you (80% of startups fail before 5 years).

## Do You Need a Cofounder?

It depends.

- **No**, if you’re a technical founder (software engineer) and your startup is highly dependent on a technical product that you can largely develop yourself.
- **Yes**, if you're a non-technical founder (business partner) building a technical product. It’s always a plus to have an engineer onboard to enable pivoting pre–product-market fit in search of traction.
- **Yes**, if you’re building a domain-specific software, possibly in hard tech or in a different industry. Having insights from someone who understands the industry’s ins and outs is a huge plus in understanding the problem and creating the best respective solution.

## How to Find a Great Cofounder

The easiest and best way, in my opinion, is to persuade friends you either studied with on campus or have worked with. Friends, too, are great, but the caveat is that you may be unaware of their work ethic.

## Qualities to Scan For

**Belief in the Idea (Solution)** Someone who believes in and deeply cares about the problem and the proposed self-sustainable solution.

**Non-Conflicting Values/Motives** Individual motives for starting and running a company differ. It’s very important to align motives early on to avoid cofounder breakups. Founders may have differing motives as long as they are aligned and non-conflicting. Tough times in a company expose divergent motives due to founders having different ideal end goals in mind, and thus non-similar routes to achieve desired outcomes.

**Aptitude** The ability and willingness to learn and utilize new skills is often underrated due to viewing a cofounder position like another role in a team that needs specific requirements met. This couldn’t be further from the truth, since a cofounder's day-to-day roles really change as the company—let alone the industry—grows.

**Hard/Soft Skills** Transferable hard and soft skills that generate quantifiable value in the startup are a non-negotiable trait that a cofounder must have. What does he/she bring to the table?

> NB: Amplitude > Current Skills. In the long run, we can learn anything we put our mind and heart to. A startup needs a long-term commitment, during which the roles of the founding team will shift along the journey.

**Calm Under Pressure** He or She should be able to think rationally under all circumstances and precisely consider all the trade-offs in decision-making with emotional stability.
`,
  },
]
