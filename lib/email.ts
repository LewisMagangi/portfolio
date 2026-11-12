// Server only. Sends plain text email over SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD).
// Without SMTP settings it logs and returns false, so forms still work in development.
import nodemailer from "nodemailer"

type Mail = {
  to: string
  subject: string
  text: string
  replyTo?: string
  /** A calendar invite (.ics text), sent so mail apps offer to add it. */
  ics?: { filename: string; content: string; method?: "REQUEST" | "CANCEL" }
}

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

/**
 * Lewis's inboxes for site alerts. Alerts go to the main one only; the backup gets them when the main one
 * can't be reached. ALERT_EMAIL and ALERT_EMAIL_BACKUP override them.
 */
const PRIMARY_ALERT_EMAIL = "lewismagangi1@gmail.com"
const BACKUP_ALERT_EMAIL = "momanyilewis10@gmail.com"

/** Sends one email. Never throws: a failed email must not undo the action that triggered it. */
export async function sendMail({ to, subject, text, replyTo, ics }: Mail): Promise<boolean> {
  const t = getTransport()
  if (!t || !to) {
    console.info(`[email] not sent (${t ? "no recipient" : "SMTP not configured"}): ${subject}`)
    return false
  }
  try {
    const info = await t.sendMail({
      from: `Lewis Magangi <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      replyTo,
      ...(ics ? { icalEvent: { filename: ics.filename, method: ics.method ?? "REQUEST", content: ics.content } } : {}),
    })
    // The server can refuse a recipient without throwing.
    if (info.rejected?.length) {
      console.error(`[email] recipient refused: ${subject}`)
      return false
    }
    return true
  } catch (err) {
    console.error(`[email] failed: ${subject}`, err)
    return false
  }
}

/** Emails Lewis: the main inbox first, the backup only if the main one fails. */
export async function sendAlert(mail: Omit<Mail, "to">): Promise<boolean> {
  const primary = process.env.ALERT_EMAIL || PRIMARY_ALERT_EMAIL
  const backup = process.env.ALERT_EMAIL_BACKUP || BACKUP_ALERT_EMAIL
  if (!getTransport()) return sendMail({ ...mail, to: primary })
  if (await sendMail({ ...mail, to: primary })) return true
  console.warn("[email] main inbox failed, sending to the backup")
  return backup && backup !== primary ? sendMail({ ...mail, to: backup }) : false
}
