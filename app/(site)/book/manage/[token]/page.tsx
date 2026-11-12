import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getByToken, toPublic } from "@/lib/bookings"

import { ManageView } from "./manage-view"

export const metadata: Metadata = { title: "Your booking", robots: { index: false, follow: false } }
export const dynamic = "force-dynamic"

export default async function ManagePage({ params }: { params: { token: string } }) {
  const b = await getByToken(params.token)
  if (!b) notFound()
  return <ManageView token={params.token} initial={await toPublic(b)} />
}
