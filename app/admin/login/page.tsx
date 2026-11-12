"use client"

import { ArrowLeft, Eye, EyeSlash } from "@phosphor-icons/react"
import Link from "next/link"
import { useRef, useState, type FormEvent } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const control =
  "box-border min-h-11 w-full rounded-md border border-line-strong bg-bg px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--focus)]"

/** Admin log in (Admin-Login board): one card on a faded chessboard. */
export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const passwordRef = useRef<HTMLInputElement>(null)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        const from = new URLSearchParams(window.location.search).get("from")
        // A full navigation so the new session cookie is sent with the next request.
        window.location.href = from?.startsWith("/admin") ? from : "/admin"
        return
      }
      setError(
        res.status === 401 && data.message === "Account is deactivated"
          ? "This account is switched off."
          : res.status === 401
            ? "That email and password don’t match. Check both, or reset the password with npm run admin:reset."
            : "Couldn’t log in just now. Try again in a minute.",
      )
      passwordRef.current?.select()
    } catch {
      setError("Couldn’t reach the server. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div data-theme="dark" className="relative grid min-h-screen place-items-center overflow-hidden bg-bg p-8 font-sans text-ink max-sm:p-4">
      <div aria-hidden className="gb-login-board" />
      <main className="relative flex w-full max-w-[400px] flex-col gap-6">
        <div className="flex items-center gap-2.5">
          <span className="gb-mono">LM</span>
          <strong>Admin</strong>
          <span className="rounded-sm bg-surface-raised px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em]">CMS</span>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-[18px] rounded-lg border border-line bg-surface p-8 max-sm:p-6">
          <div className="flex flex-col gap-1">
            <h1 className="m-0 text-2xl font-semibold leading-[30px] tracking-[-0.02em]">Log in</h1>
            <p className="m-0 text-sm text-ink-muted">Manage projects, posts, certificates and messages.</p>
          </div>

          {error && (
            <p role="alert" className="m-0 text-sm text-danger">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="username" required autoFocus className={control} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                aria-describedby="password-hint"
                className={cn(control, "pr-12")}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                aria-pressed={show}
                className="absolute right-0 top-0 grid size-11 place-items-center rounded-md text-ink-muted hover:text-ink"
              >
                {show ? <EyeSlash size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
              </button>
            </div>
            <span id="password-hint" className="text-xs text-ink-subtle">
              At least 12 characters.
            </span>
          </div>

          <button type="submit" disabled={loading} className={cn(buttonVariants(), "h-11 w-full justify-center disabled:opacity-60")}>
            {loading ? "Logging in" : "Log in"}
          </button>
          <span className="text-center font-mono text-xs text-ink-subtle">Admins only. Secured session.</span>
        </form>

        <div className="flex justify-between text-[13px]">
          <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 text-ink-muted no-underline hover:text-ink">
            <ArrowLeft size={14} aria-hidden />
            Back to site
          </Link>
          <Link href="/admin/setup" className="inline-flex min-h-11 items-center text-ink-muted no-underline hover:text-ink">
            First run? Set up admin
          </Link>
        </div>
      </main>
    </div>
  )
}
