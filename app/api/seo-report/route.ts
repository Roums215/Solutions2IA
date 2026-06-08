/**
 * Rapport SEO hebdomadaire — squelette prêt à activer.
 *
 * Activation post-déploiement (côté user) :
 * 1. Créer une property Google Search Console + valider via meta tag
 *    (à ajouter dans `app/layout.tsx` metadata.verification.google).
 * 2. Créer un service account Google Cloud, activer Search Console API,
 *    télécharger la clé JSON.
 * 3. Définir les env vars Vercel :
 *    - CRON_SECRET (random string, ex: openssl rand -hex 32)
 *    - GSC_SERVICE_ACCOUNT_KEY (clé JSON encodée base64 ou inline)
 *    - GSC_SITE_URL (ex: https://solutions2ia.com)
 *    - SEO_REPORT_WEBHOOK (URL Slack / Discord, optionnel)
 *    - SEO_REPORT_EMAIL (ex: contact@solutions2ia.com, optionnel — nécessite Resend)
 *    - RESEND_API_KEY (si email activé)
 * 4. Installer les deps si email/GSC actifs :
 *    pnpm add googleapis resend
 *
 * Le cron est déclenché par vercel.json (lundi 9h Paris).
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // Vérifier le secret du cron (sinon n'importe qui peut déclencher).
  const auth = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET;
  if (expected && auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hasGsc = !!process.env.GSC_SERVICE_ACCOUNT_KEY;
  const hasWebhook = !!process.env.SEO_REPORT_WEBHOOK;
  const hasEmail = !!(process.env.SEO_REPORT_EMAIL && process.env.RESEND_API_KEY);

  if (!hasGsc) {
    return NextResponse.json({
      status: "skipped",
      reason: "GSC_SERVICE_ACCOUNT_KEY not configured",
      instructions: "Voir le commentaire en tête de app/api/seo-report/route.ts pour activer.",
    });
  }

  // TODO (post-MVP) : ingestion GSC API + diff S vs S-1 + push webhook/email.
  // Pour activer :
  //   1. pnpm add googleapis resend
  //   2. Importer { google } from "googleapis"
  //   3. Authentifier via JWT { client_email, private_key } depuis GSC_SERVICE_ACCOUNT_KEY
  //   4. Appeler searchanalytics.query pour les top 50 queries
  //   5. Comparer avec un fichier de référence stocké (ex: edge config Vercel ou un blob R2/S3)
  //   6. Détecter anomalies (position -5 places en 7j sur top-keyword)
  //   7. Render HTML résumé et envoyer via Resend ou Slack webhook

  return NextResponse.json({
    status: "scaffold-ready",
    nextSteps: "Compléter la logique GSC + envoi notification quand les comptes sont prêts.",
    config: {
      hasGsc,
      hasWebhook,
      hasEmail,
    },
  });
}
