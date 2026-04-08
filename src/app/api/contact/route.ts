import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.enum(["reservation", "renseignement", "commande", "autre"]),
  message: z.string().min(10),
});

const SUBJECT_LABELS: Record<string, string> = {
  reservation: "Réservation",
  renseignement: "Renseignement",
  commande: "Commande",
  autre: "Autre",
};

export async function POST(request: Request) {
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
