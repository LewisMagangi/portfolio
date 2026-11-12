// Reading page content, verbatim from design/v8/boards/Reading.dc.html.
// "Want to read" is the curated list from Lewis's library (reading-up-next.ts), grouped by topic,
// minus anything already on another shelf.
import { UP_NEXT } from "@/lib/content/reading-up-next"

export type Book = { title: string; author?: string; pct?: number; where?: string; note?: string }
export type BookGroup = { name: string; books: Book[] }

export const INTRO = {
  title: "What I’m reading.",
  lead: "Engineering, learning and how people work. Fifteen finished, nine in progress, two next. The want to read list fills in from the admin.",
}

export const EMPTY_TEXT = "Nothing here yet. Books added in the admin appear here, grouped by genre."

export const READING: Book[] = [
  { title: "Designing Data‑Intensive Applications", author: "Martin Kleppmann, first edition", pct: 75, where: "Chapter 10, batch processing. The second edition comes after." },
  { title: "Understanding Distributed Systems", author: "Roberto Vitillo", pct: 50, where: "About halfway" },
  { title: "Grokking the System Design Interview", author: "Design Gurus", where: "Chapter 13, designing Twitter search" },
  { title: "Hands‑On Machine Learning", author: "Aurélien Géron", where: "Chapter 4, training models" },
  { title: "AI Engineering", author: "Chip Huyen", where: "Chapter 4, evaluating AI systems" },
  { title: "Uncommon Sense Teaching", author: "Barbara Oakley and others", pct: 75, where: "About three quarters" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", where: "Chapter 7" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", pct: 20, where: "About a fifth" },
  { title: "Blue Ocean Strategy", author: "W. Chan Kim and Renée Mauborgne", where: "Chapter 4" },
]

export const NEXT: Book[] = [
  { title: "Database Internals", author: "Alex Petrov", note: "After Designing Data‑Intensive Applications" },
  { title: "How We Learn", author: "Stanislas Dehaene", note: "Next on learning" },
]

export const FINISHED: Book[] = [
  { title: "Zero to One", author: "Peter Thiel" },
  { title: "The Sweaty Startup", author: "Nick Huber" },
  { title: "The Lean Startup", author: "Eric Ries" },
  { title: "The Hard Thing About Hard Things", author: "Ben Horowitz" },
  { title: "The Tribe of Millionaires", author: "David Osborn and others" },
  { title: "The Richest Man in Babylon", author: "George S. Clason" },
  { title: "Make It Stick", author: "Peter C. Brown and others" },
  { title: "As a Man Thinketh", author: "James Allen" },
  { title: "Show Your Work", author: "Austin Kleon" },
  { title: "The Psychology of Money", author: "Morgan Housel" },
  { title: "Lies My Doctor Told Me", author: "Ken D. Berry" },
  { title: "The 48 Laws of Power", author: "Robert Greene" },
  { title: "The Laws of Human Nature", author: "Robert Greene" },
  { title: "When Breath Becomes Air", author: "Paul Kalanithi" },
  { title: "Man’s Search for Meaning", author: "Viktor Frankl" },
]

// Titles compare without case or hyphen style, so a book on two lists is caught. Editions stay
// distinct: the second edition of Designing Data-Intensive Applications is still to read.
const key = (t: string) =>
  t
    .toLowerCase()
    .replace(/[‑-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
const shelved = new Set([...READING, ...NEXT, ...FINISHED].map((b) => key(b.title)))

export const WANT: BookGroup[] = Array.from(new Set(UP_NEXT.map((b) => b.topic))).map((topic) => ({
  name: topic,
  books: UP_NEXT.filter((b) => b.topic === topic && !shelved.has(key(b.title))).map(({ title, author }) => ({ title, author })),
})).filter((g) => g.books.length > 0)
