import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const emailTo = process.env.BOOKING_EMAIL_TO
    const emailFrom = process.env.BOOKING_EMAIL_FROM

    const missing = [
      !smtpHost && "SMTP_HOST",
      !smtpPort && "SMTP_PORT",
      !smtpUser && "SMTP_USER",
      !smtpPass && "SMTP_PASS",
      !emailTo && "BOOKING_EMAIL_TO",
      !emailFrom && "BOOKING_EMAIL_FROM",
    ].filter(Boolean)

    if (missing.length > 0) {
      console.error("[contact] Missing environment variables:", missing.join(", "))
      return NextResponse.json(
        { error: "Email service not configured", missing },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const htmlBody = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(body.message)}</p>
      <hr />
      <p style="font-size: 12px; color: #666;">
        Enviado el ${new Date().toLocaleString("es-ES", {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </p>
    `

    const textBody = `
Nuevo mensaje de contacto

Nombre: ${body.name}
Email: ${body.email}
Mensaje:
${body.message}

Enviado el: ${new Date().toLocaleString("es-ES")}
    `.trim()

    await transporter.sendMail({
      from: `"Portfolio JF" <${emailFrom}>`,
      to: emailTo,
      replyTo: body.email,
      subject: `Nuevo mensaje de contacto — ${body.name}`,
      text: textBody,
      html: htmlBody,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
