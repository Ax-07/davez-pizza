import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/schemas/contact";

export const runtime = "nodejs";

// Rate limiter en mémoire — protège dans une même instance Lambda.
// Pour une protection complète en production, utiliser @upstash/ratelimit + Redis.
const ipCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

const SUBJECT_LABELS: Record<string, string> = {
  reservation: "Réservation",
  renseignement: "Renseignement",
  commande: "Commande",
  autre: "Autre",
};

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Trop de requêtes, veuillez réessayer dans une minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten() }, { status: 422 });
  }

  const { firstName, lastName, email, phone, subject, message } = parsed.data;

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    console.error("Variables d'environnement SMTP manquantes");
    return NextResponse.json({ error: "Configuration serveur incomplète" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subjectLabel = SUBJECT_LABELS[subject] ?? subject;
  const fullName = `${firstName} ${lastName}`;

  try {
    await transporter.sendMail({
      from: `"Davez Pizza — Formulaire" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subjectLabel} — ${fullName}`,
      text: [
        `Nom : ${fullName}`,
        `Email : ${email}`,
        phone ? `Téléphone : ${phone}` : "",
        `Objet : ${subjectLabel}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <table style="font-family:sans-serif;font-size:14px;color:#333;max-width:600px;margin:auto;border-collapse:collapse">
          <tr><td style="padding:20px 0;font-size:20px;font-weight:bold;border-bottom:2px solid #e50000">
            Nouveau message — Davez Pizza
          </td></tr>
          <tr><td style="padding:16px 0">
            <strong>Nom :</strong> ${fullName}<br/>
            <strong>Email :</strong> <a href="mailto:${email}">${email}</a><br/>
            ${phone ? `<strong>Téléphone :</strong> ${phone}<br/>` : ""}
            <strong>Objet :</strong> ${subjectLabel}
          </td></tr>
          <tr><td style="padding:16px;background:#f9f9f9;border-radius:8px;white-space:pre-wrap">
            ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </td></tr>
          <tr><td style="padding:16px 0;font-size:12px;color:#999;border-top:1px solid #eee">
            Message envoyé depuis le formulaire de contact du site Davez Pizza.
          </td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi email :", err);
    return NextResponse.json({ error: "Échec de l'envoi" }, { status: 500 });
  }
}
