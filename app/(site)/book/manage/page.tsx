import type { Metadata } from "next"

import { ManageLookup } from "./manage-lookup"

export const metadata: Metadata = {
  title: "Manage your booking",
  description: "Get the link to move or cancel your discovery call.",
  robots: { index: false },
}

export default function ManageLookupPage() {
  return (
    <div className="mx-auto box-border flex max-w-[720px] flex-col gap-6 px-8 pb-32 pt-20 max-sm:px-4 max-sm:pt-12">
      <h1 className="display m-0">Find your booking.</h1>
      <p className="lead m-0 text-ink-muted">
        Your confirmation email has a link to move or cancel the call. Can’t find it? Enter the email you booked with and I’ll send the link again.
      </p>
      <ManageLookup />
    </div>
  )
}
