// Reset (or create) the admin account's password.
//
//   npm run admin:reset                 uses .env.local, then .env (the same database `next dev` uses)
//   npm run admin:reset -- --env=.env   uses only the file you name
//
// It shows which database it will change and asks you to confirm. The password is typed hidden, twice,
// and is never printed or stored anywhere but as a bcrypt hash.
import { existsSync, readFileSync } from "node:fs"
import { createInterface } from "node:readline"

import bcrypt from "bcryptjs"
import pg from "pg"

// Load env files the way Next.js does: .env.local wins over .env.
const only = process.argv.find((a) => a.startsWith("--env="))?.slice(6)
for (const file of only ? [only] : [".env.local", ".env"]) {
  if (!existsSync(file)) continue
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (!m || process.env[m[1]] !== undefined) continue
    process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2")
  }
}

const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: Boolean(process.stdin.isTTY) })
const lines = rl[Symbol.asyncIterator]()
// One answer per line, read in order (works when typed and when piped).
async function ask(q) {
  process.stdout.write(q)
  const { value } = await lines.next()
  return value ?? ""
}
// Same reader with echo muted, so the password never shows on screen.
async function askHidden(q) {
  if (!process.stdin.isTTY) return ask(q)
  const write = rl._writeToOutput.bind(rl)
  rl._writeToOutput = () => {}
  try {
    return await ask(q)
  } finally {
    rl._writeToOutput = write
    process.stdout.write("\n")
  }
}

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL is not set in .env.local or .env")
  const host = new URL(url).hostname

  console.log(`\nDatabase: ${host}`)
  const email = ((await ask(`Admin email${process.env.ADMIN_EMAIL ? ` [${process.env.ADMIN_EMAIL}]` : ""}: `)) || process.env.ADMIN_EMAIL || "").trim()
  if (!email.includes("@")) throw new Error("That doesn't look like an email address.")

  const pool = new pg.Pool({ connectionString: url })
  try {
    const { rows } = await pool.query("SELECT id, role FROM users WHERE email = $1", [email])
    const verb = rows.length ? "reset the password for" : "create an admin account for"
    if ((await ask(`This will ${verb} ${email} on ${host}. Continue? (y/N) `)).trim().toLowerCase() !== "y") {
      console.log("Nothing changed.")
      return
    }

    const pw = await askHidden("New password (12 characters or more): ")
    if (pw.length < 12) throw new Error("Use at least 12 characters. Nothing changed.")
    if ((await askHidden("Type it again: ")) !== pw) throw new Error("The two passwords didn't match. Nothing changed.")

    const hash = await bcrypt.hash(pw, 12)
    if (rows.length) {
      await pool.query(
        `UPDATE users SET password = $1, role = 'ADMIN', is_active = true, updated_at = NOW() WHERE email = $2`,
        [hash, email],
      )
      console.log(`\nDone. The password for ${email} is reset. Sign in at /admin/login.`)
    } else {
      const name = (await ask("Your name, as shown in the admin: ")).trim() || "Lewis Magangi"
      await pool.query(
        `INSERT INTO users (id, email, name, password, role, is_active, email_verified, created_at, updated_at)
         VALUES (gen_random_uuid(), $1, $2, $3, 'ADMIN', true, true, NOW(), NOW())`,
        [email, name, hash],
      )
      console.log(`\nDone. Admin account created for ${email}. Sign in at /admin/login.`)
    }
  } finally {
    await pool.end()
  }
}

main()
  .catch((err) => {
    console.error(`\n${err.message}`)
    process.exitCode = 1
  })
  .finally(() => rl.close())
