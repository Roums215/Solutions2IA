import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Réception des demandes du formulaire de contact.
 *
 * ── Configuration (env vars Vercel) ──────────────────────────────────────────
 *   RESEND_API_KEY     (requis)  — clé API depuis resend.com (compte gratuit).
 *   CONTACT_TO_EMAIL   (option)  — où arrivent les demandes.
 *                                  Défaut : ionita.iulian215@gmail.com
 *   CONTACT_FROM_EMAIL (option)  — expéditeur. Défaut : onboarding@resend.dev
 *                                  (fonctionne tout de suite pour t'écrire À TOI).
 *                                  Pour envoyer l'accusé de réception aux
 *                                  VISITEURS, il faut vérifier ton domaine sur
 *                                  Resend, puis mettre par ex.
 *                                  « Solutions 2IA <contact@solutions2ia.fr> ».
 * ─────────────────────────────────────────────────────────────────────────────
 */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "ionita.iulian215@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Solutions 2IA <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot anti-spam : champ caché qui doit rester vide.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }); // on fait semblant d'accepter le bot
  }

  const nom = String(body.nom ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const entreprise = String(body.entreprise ?? "").trim();
  const budget = String(body.budget ?? "").trim();
  const type = String(body.type ?? "").trim();

  // Validation
  if (nom.length < 2) {
    return NextResponse.json({ ok: false, error: "Merci d'indiquer votre nom." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "L'adresse email semble incorrecte." }, { status: 422 });
  }
  if (message.length < 5) {
    return NextResponse.json({ ok: false, error: "Merci de décrire un peu votre besoin." }, { status: 422 });
  }

  if (!process.env.RESEND_API_KEY) {
    // Le formulaire est branché mais la clé n'est pas encore configurée.
    return NextResponse.json(
      { ok: false, error: "L'envoi n'est pas encore activé. Écrivez-moi directement par email en attendant." },
      { status: 503 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const lignes = [
    ["Nom", nom],
    ["Email", email],
    ["Entreprise", entreprise || "(non renseigné)"],
    ["Type de demande", type || "(non renseigné)"],
    ["Budget indiqué", budget || "(non renseigné)"],
  ];
  const tableRows = lignes
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#8e95af;white-space:nowrap">${k}</td><td style="padding:4px 0;color:#f5f7ff">${esc(v)}</td></tr>`,
    )
    .join("");

  const adminHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="color:#6366f1;margin:0 0 16px">Nouvelle demande · Solutions 2IA</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px">${tableRows}</table>
      <div style="background:#f4f5fb;border-radius:8px;padding:14px 16px;font-size:14px;color:#1a1c2e;white-space:pre-wrap">${esc(message)}</div>
    </div>`;

  const adminText =
    `Nouvelle demande · Solutions 2IA\n\n` +
    lignes.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${message}\n`;

  try {
    // 1) Notification à toi (arrive toujours, même sans domaine vérifié).
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Demande de ${nom}${entreprise ? ` (${entreprise})` : ""}`,
      html: adminHtml,
      text: adminText,
    });
    if (error) {
      console.error("[contact] resend notify error:", error);
      return NextResponse.json(
        { ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-moi directement par email." },
        { status: 502 },
      );
    }
  } catch (e) {
    console.error("[contact] resend notify exception:", e);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-moi directement par email." },
      { status: 502 },
    );
  }

  // 2) Accusé de réception au visiteur (best-effort : ne casse pas la soumission
  //    si le domaine n'est pas encore vérifié sur Resend).
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "J'ai bien reçu votre message · Solutions 2IA",
      html: `<div style="font-family:system-ui,sans-serif;max-width:520px;color:#1a1c2e">
        <p>Bonjour ${esc(nom)},</p>
        <p>Merci pour votre message, je l'ai bien reçu. Je reviens vers vous sous 24 h avec une première réponse.</p>
        <p style="color:#6b7280;font-size:13px">Iulian · Solutions 2IA</p>
      </div>`,
      text: `Bonjour ${nom},\n\nMerci pour votre message, je l'ai bien reçu. Je reviens vers vous sous 24 h.\n\nIulian · Solutions 2IA`,
    });
  } catch (e) {
    // L'accusé est un bonus : on log et on continue.
    console.warn("[contact] confirmation visiteur non envoyée:", e);
  }

  return NextResponse.json({ ok: true });
}
