"use client"

import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { cn } from "@/lib/utils"

const noopSubscribe = () => () => {}

const OPTIONS = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
] as const

/** Two-way theme switch: light and dark only. `large` gives 44px targets for the phone sheet. */
export function ThemeToggle({ large = false, className }: { large?: boolean; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  // The theme is only known on the client; render both buttons unpressed until mounted.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn("inline-flex gap-0.5 rounded-full border border-line bg-surface p-[3px]", className)}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const pressed = mounted && resolvedTheme === value
        return (
          <button
            key={value}
            type="button"
            aria-pressed={pressed}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-grid place-items-center rounded-full text-ink-subtle transition-colors duration-fast ease-out",
              "focus-visible:outline-offset-1",
              large ? "h-11 w-11" : "h-7 w-[30px]",
              pressed && "bg-surface-raised text-ink shadow-[0_0_0_1px_var(--line)]",
            )}
          >
            <Icon size={15} aria-hidden />
          </button>
        )
      })}
    </div>
  )
}
