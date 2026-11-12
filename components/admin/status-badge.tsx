import { cn } from "@/lib/utils"

type Tone = "success" | "warn" | "neutral" | "danger"

// Gambit StatusBadge tones. Green is for status only.
const TONE: Record<string, Tone> = {
  PUBLISHED: "success",
  APPROVED: "success",
  COMPLETED: "success",
  REPLIED: "success",
  ACTIVE: "success",
  PENDING: "warn",
  DRAFT: "warn",
  IN_PROGRESS: "warn",
  NEW: "warn",
  ARCHIVED: "neutral",
  READ: "neutral",
  REJECTED: "danger",
  SPAM: "danger",
}

export function StatusBadge({ status, label, tone }: { status: string; label?: string; tone?: Tone }) {
  const s = status.toUpperCase()
  const text = label ?? (s.charAt(0) + s.slice(1).toLowerCase()).replace(/_/g, " ")
  return <span className={cn("gb-status", `gb-status-${tone ?? TONE[s] ?? "neutral"}`)}>{text}</span>
}
