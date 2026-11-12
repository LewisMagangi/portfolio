// The two v8 posts, verbatim from design/v8/boards/Blog-Post.dc.html and Blog-Post-Django.dc.html, as Markdown.
// The database (Admin › Blog) is the source the site reads. This file is what `npm run blog:v8` writes into it,
// and what /blog shows when the database has no published posts or can't be reached.
// The slugs match the posts already seeded, so the sync replaces their old stub text.

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
export const CATEGORY_ORDER = ["Web development", "Accessibility", "Security", "AI and ML"]

export const POSTS: ContentPost[] = [
  {
    slug: "building-accessible-voice-interfaces",
    title: "Building accessible voice interfaces with Whisper and Coqui TTS",
    excerpt: "Moving a voice exam portal to offline speech processing for privacy, and getting it to WCAG 2.1 AA.",
    category: "Accessibility",
    publishedAt: "2025-11-01",
    readTime: 8,
    content: `The SNE Portal lets learners with special needs sit exams by voice. When I joined, every spoken answer went to Google Cloud and back. This is how the team moved speech onto the machine and brought the exam flow up to WCAG 2.1 AA.

## Why the cloud had to go

Three problems, in order of how much they worried me. An exam answer is personal data, and it was leaving the room. Every question read aloud and every answer transcribed was a paid API call. And the portal stopped working the moment the connection dropped, which in many of the places it’s used is often.

Whisper handles speech to text and Coqui TTS handles text to speech, and both run locally. The question was how to swap them in without touching every view that spoke or listened.

## One class between the exam and the models

I put both models behind a single voice processor. Views ask it to read a question or transcribe an answer and never know which engine answered. That kept the change to one file plus its tests, and it means the next model swap is a one-line change.

\`\`\`python
class VoiceProcessor:
    """Speech in and out for the exam flow, entirely on this machine."""

    def __init__(self, stt, tts):
        self.stt = stt  # Whisper
        self.tts = tts  # Coqui TTS

    def transcribe(self, audio_path: str) -> str:
        return self.stt.transcribe(audio_path)["text"].strip()

    def speak(self, text: str, out_path: str) -> str:
        self.tts.tts_to_file(text=text, file_path=out_path)
        return out_path
\`\`\`

A simplified version. The real class also caches synthesised questions, since every candidate hears the same ones.

<figure class="gb-flow" aria-label="How a spoken answer moves through the portal">
<ol><li>Microphone</li><li>Whisper, on device</li><li>Django exam app</li><li>Coqui TTS, on device</li><li>Speaker</li></ol>
<figcaption>Nothing in this path leaves the machine.</figcaption>
</figure>

## Accessible before it’s clever

Voice is one way in, not the only one. Every step of the exam works from the keyboard, with a visible focus ring and semantic HTML underneath. New questions are announced through an ARIA live region, so a screen reader user hears the question change without hunting for it.

> The best accessibility work is invisible to people who don’t need it and obvious to people who do.

## Tests that fail the build

Good intentions drift, so the checks live in the test suite. Selenium drives the exam flow, axe and Pa11y check each page against WCAG and Section 508: keyboard paths, ARIA, colour contrast, mobile layouts and forms. A regression now fails the build instead of reaching a learner.

## What I’d tell the next team

- Put external services behind one interface early. Swapping them later is then cheap.
- Move inline CSS and JavaScript out of templates before you test accessibility; it’s much easier to reason about.
- Write the schema down. A DBML file of the models saved us hours of explaining.

The full write up of the project, with what I built and the stack, is on the [SNE Portal case study](/work/sne-portal).
`,
  },
  {
    slug: "django-to-nextjs-journey",
    title: "Django to Next.js: a full stack journey",
    excerpt: "What carried over from Django and DRF into Next.js, tRPC and Prisma, and what I had to unlearn.",
    category: "Web development",
    publishedAt: "2025-10-15",
    readTime: 6,
    content: `I learned the web on Django. Then Wamumbi needed a Next.js platform with a type safe API, and I had to decide what to keep and what to unlearn.

## Where I started

Most of my early production work was Python. I led the Solar Water ATM’s move from Flask to Django 5.2 with three other developers, and built Project Nexus on Django REST Framework with JWT, email verification and social sign in.

## What carried over

- **Schema first.** Designing the data before the screens worked in Django and works in Prisma. Wamumbi started from a 3NF schema with lookup tables and explicit foreign keys.
- **Auth is a feature, not plumbing.** Roles, sessions and resets deserve the same care in Clerk as in DRF.
- **Tests at the boundary.** pytest on the API in one; typed procedures and Zod validation in the other.

## What changed

tRPC moved the contract into the type system. A renamed field breaks the build in the browser and the server at once, which is the safety DRF serializers gave me, only earlier. Wamumbi ended up with 51 documented endpoints and Swagger docs generated from the same definitions.

\`\`\`ts
export const campaignRouter = router({
  byId: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ ctx, input }) => ctx.db.campaign.findUnique({ where: { id: input.id } })),
});
\`\`\`

## Security moves faster in JavaScript

The dependency tree is bigger and moves faster. When CVE-2025-66478 landed in Next.js, patching it was a version bump and a deploy, but only because the app was already on a current release with tests around it.

## If you’re making the same move

- Keep your Django habits: migrations you can read, settings per environment, and boring authentication.
- Let TypeScript carry the contract instead of documentation alone.
- Seed reference data idempotently; you’ll run it more often than you think.
`,
  },
]
