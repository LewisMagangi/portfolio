import type { Metadata } from "next"

import { ReviewForm } from "./review-form"

export const metadata: Metadata = {
  title: "Add a review",
  description: "If we have worked together, a few honest lines help the next client decide.",
}

const STEPS = [
  { title: "You write it", body: "Your words, with your name and role." },
  { title: "I confirm it", body: "I check that we worked together. I never edit what you wrote." },
  { title: "It goes up", body: "On Home with the other references, and I email you when it does." },
]

export default function ReviewPage() {
  return (
    <div className="mx-auto box-border grid max-w-content grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-start gap-16 px-8 pb-24 pt-[72px] max-[900px]:grid-cols-1 max-[900px]:gap-10 max-sm:px-4 max-sm:pb-16 max-sm:pt-12">
      <div className="sticky top-24 flex flex-col gap-5 max-[900px]:static">
        <h1 className="display m-0">Add a review.</h1>
        <p className="lead m-0 text-ink-muted">
          If we have worked together, a few honest lines help the next client decide. It takes about two minutes.
        </p>
        <ol aria-label="What happens next" className="m-0 mt-2 flex list-none flex-col p-0">
          {STEPS.map((s) => (
            <li key={s.title} className="flex flex-col gap-0.5 border-t border-line py-3 text-sm">
              <strong className="font-medium">{s.title}</strong>
              <span className="text-ink-muted">{s.body}</span>
            </li>
          ))}
        </ol>
      </div>
      <ReviewForm />
    </div>
  )
}
