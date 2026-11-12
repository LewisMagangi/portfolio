// Server only. Sends plain text email over SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD).
// Without SMTP settings it logs and returns false, so forms still work in development.
import nodemailer from "nodemailer"

type Mail = { to: string; subject: string; text: string; replyTo?: string }

let transport: nodemailer.Transporter | null | undefined

function getTransport() {
  if (transport !== undefined) return transport
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env
  transport =
    SMTP_HOST && SMTP_USER && SMTP_PASSWORD
      ? nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT) || 587,
          secure: Number(SMTP_PORT) === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
        })
      : null
  return transport
}

/** Lewis's inboxes for site alerts: the main one first, then the second. ALERT_EMAILS (comma separated) overrides. */
const DEFAULT_ADMIN_EMAILS = ["lewismagangi1@gmail.com", "momanyilewis10@gmail.com"]

/** Where notifications for Lewis go. */
export function adminAddress() {
  return process.env.ALERT_EMAILS || DEFAULT_ADMIN_EMAILS.join(", ")
}

/** Sends one email. Never throws: a failed email must not undo the action that triggered it. */
export async function sendMail({ to, subject, text, replyTo }: Mail): Promise<boolean> {
  const t = getTransport()
  if (!t || !to) {
    console.info(`[email] not sent (${t ? "no recipient" : "SMTP not configured"}): ${subject}`)
    return false
  }
  try {
    await t.sendMail({ from: `Lewis Magangi <${process.env.SMTP_USER}>`, to, subject, text, replyTo })
    return true
  } catch (err) {
    console.error(`[email] failed: ${subject}`, err)
    return false
  }
}
