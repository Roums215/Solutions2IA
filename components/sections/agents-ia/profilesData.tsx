import type { ReactNode } from "react";
import type { AgentPlanData } from "./AgentPlan";
import {
  Archive,
  Bell,
  Bot,
  BookOpen,
  Building2,
  CalendarCheck,
  CalendarDays,
  CircleCheck,
  ClipboardCheck,
  Clock,
  Database,
  Euro,
  FileCheck,
  FileText,
  Inbox,
  ListChecks,
  Mail,
  Search,
  Megaphone,
  MessageSquare,
  Package,
  PenLine,
  Quote,
  Receipt,
  Send,
  Smartphone,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import {
  Checklist,
  Chrome,
  Draft,
  Feed,
  FilledForm,
  HBars,
  Integrations,
  Item,
  KpiRow,
  MiniTable,
  Panel,
  Ring,
  Row,
  Stagger,
  StatusPill,
  WeekGrid,
} from "@/components/shared/mockup/AppMockup";

/**
 * Assistants IA par profil (section « Pour qui ? » de /agents-ia).
 *
 * Chaque profil = un constat (source citée ou compté ensemble), un objectif à
 * 30 jours (mesuré pendant le pilote) et une maquette de l'assistant au
 * travail : la fiche qu'il remplit, ce qu'il prépare, ce qu'il a fait tout
 * seul, les outils qu'il relie. Même boîte à outils que les tableaux de bord
 * de /applications (components/shared/mockup/AppMockup.tsx), navigation et
 * couleur propres à chaque profil.
 *
 * Données d'exemple, noms anonymisés, aucun client fictif présenté comme réel.
 */

export type ProfileSlug =
  | "commercial"
  | "dirigeant"
  | "expert"
  | "sav"
  | "marketeur"
  | "freelance";

export type ProfilePain = { stat: string; label: string; detail: string };
export type { AgentPlanData };
export type ProfileGain = { value: string; label: string };

/** Réponse sourcée : question, réponse, sources (expert métier). */
function Answer({ question, answer, sources }: { question: string; answer: string; sources: string[] }) {
  return (
    <div className="rounded-lg border border-paper-line bg-paper-2 p-3">
      <p className="text-[11.5px] font-semibold text-ink">« {question} »</p>
      <p className="mt-1.5 text-[11px] leading-snug text-ink-2">{answer}</p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {sources.map((s) => (
          <StatusPill key={s} tone="info">
            {s}
          </StatusPill>
        ))}
        <StatusPill tone="ok">rien d&apos;inventé</StatusPill>
      </div>
    </div>
  );
}

// ─── 1. Commercial débordé ──────────────────────────────────────────────────

function CommercialProfile({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Assistant commercial · demandes, fiches, relances"
      meta="commercial · 23 demandes reçues aujourd'hui"
      icon={Users}
      accent="info"
      nav={["Demandes", "Fiches clients", "Relances", "Rendez-vous", "Appels"]}
      user="JD"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Demandes reçues", value: "23", sub: "mail, formulaire, LinkedIn · triées à l'arrivée", tone: "ok", icon: Inbox },
            { label: "Fiches remplies", value: "21", sub: "société, besoin, budget, source · 2 à compléter", tone: "ok", icon: Database },
            { label: "Relances préparées", value: "14", sub: "vous validez, il envoie", tone: "info", icon: Send },
            { label: "Saisie évitée", value: "≈ 1 h 40", sub: "aujourd'hui · objectif 8 h par semaine", tone: "ok", icon: Timer },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Fiche client remplie depuis le mail de 09:12" aside="7 champs · 1 à vérifier">
              <FilledForm
                fields={[
                  { label: "Société", value: "Menuiserie D.", state: "auto", source: "extraite de la signature du mail" },
                  { label: "Contact", value: "R. Lefèvre · gérant", state: "auto" },
                  { label: "Besoin", value: "site vitrine avec prise de rendez-vous", state: "auto", source: "reformulé depuis le mail" },
                  { label: "Budget", value: "3 000 à 5 000 €", state: "check", source: "mentionné à demi-mot : à confirmer" },
                  { label: "Échéance", value: "avant novembre", state: "auto" },
                  { label: "Source", value: "formulaire du site", state: "auto" },
                  { label: "Prochaine étape", value: "appel de 20 min proposé jeudi 10:00", state: "auto", source: "créneau libre dans votre agenda" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="File des demandes" aside="4 sur 23">
              <MiniTable
                head={["Demande", "Reçue", "Statut"]}
                widths="1fr 0.6fr 1.2fr"
                rows={[
                  { cells: ["Menuiserie D.", "09:12"], status: "Qualifiée · chaude", tone: "ok" },
                  { cells: ["Cabinet R.", "10:40"], status: "À rappeler", tone: "info" },
                  { cells: ["Newsletter promo", "11:05"], status: "Ignorée · pub", tone: "neutral" },
                  { cells: ["Agence T.", "11:30"], status: "Devis à préparer", tone: "warn" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Relances préparées, en attente de votre accord" aside="votre ton, votre signature">
              <div className="space-y-2">
                <Draft
                  mail={{
                    to: "r.lefevre@menuiserie-d…",
                    subject: "Suite à votre demande : un appel jeudi ?",
                    body: "Bonjour, merci pour votre message. Pour un site avec prise de rendez-vous, je vous propose un appel de 20 minutes jeudi à 10 h pour cadrer le besoin. Si un autre créneau vous arrange, dites-le-moi.",
                    state: "ready",
                  }}
                />
                <Draft
                  mail={{
                    to: "contact@cabinet-r…",
                    subject: "Relance : votre devis du 2 septembre",
                    body: "Bonjour, avez-vous eu le temps de regarder la proposition ? Je reste disponible pour l'ajuster.",
                    state: "sent",
                  }}
                />
              </div>
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Appels transcrits" aside="après chaque appel">
              <Checklist
                items={[
                  { label: "Appel avec Agence T. (14 min) : compte-rendu rédigé", detail: "3 points clés, 2 actions, fiche mise à jour", state: "done" },
                  { label: "Objections notées : prix, délai de livraison", detail: "réponses préparées pour le prochain échange", state: "done" },
                  { label: "Devis à préparer avant vendredi", detail: "rappel posé dans votre agenda", state: "progress" },
                  { label: "Rappeler Cabinet R. (pas de réponse)", detail: "2e tentative proposée demain 9 h", state: "todo" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Demandes traitées sous 1 h" aside="ce mois">
              <Ring pct={91} label="Réponse rapide" sub="objectif 90 % · avant : le lendemain, parfois jamais" tone="ok" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'assistant a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "11:32", text: "Fiche « Agence T. » créée dans le fichier clients depuis LinkedIn, doublon évité.", tone: "ok", icon: Database, done: "Fichier à jour" },
                  { time: "10:45", text: "Rendez-vous de jeudi 10:00 ajouté à l'agenda, invitation envoyée.", tone: "info", icon: CalendarCheck, done: "Planifié" },
                  { time: "09:15", text: "Demande « Menuiserie D. » qualifiée chaude : budget, délai et décideur identifiés.", tone: "ok", icon: ListChecks, done: "Chaude" },
                  { time: "08:30", text: "Relance J+7 envoyée à 6 prospects silencieux, avec votre signature.", tone: "ok", icon: Send, done: "6 envoyées" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "Gmail · Outlook", role: "demandes lues", state: "live" },
              { name: "Fichier clients (HubSpot, Pipedrive)", role: "fiches remplies", state: "live" },
              { name: "Agenda", role: "rendez-vous posés", state: "live" },
              { name: "LinkedIn", role: "messages", state: "sync" },
              { name: "Téléphone (Aircall)", role: "appels transcrits", state: "sync" },
              { name: "Site web", role: "formulaires", state: "live" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 2. Dirigeant multi-casquettes ──────────────────────────────────────────

function DirigeantProfile({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Assistant de direction · brief, décisions, engagements"
      meta="PME de 12 à 50 personnes · mardi 7 h 30"
      icon={Building2}
      accent="cyan"
      nav={["Le brief", "À décider", "Engagements", "Chiffres", "Équipe"]}
      user="CM"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Mails triés", value: "142", sub: "cette nuit · 9 demandent une réponse de vous", tone: "ok", icon: Inbox },
            { label: "À décider aujourd'hui", value: "4", sub: "dossier préparé, option recommandée", tone: "info", icon: ListChecks },
            { label: "Engagements suivis", value: "17", sub: "pris en réunion · 3 en retard relancés", tone: "warn", icon: ClipboardCheck },
            { label: "Lecture épargnée", value: "≈ 55 min", sub: "aujourd'hui · objectif 1 jour par semaine", tone: "ok", icon: Timer },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Le brief de 7 h 30" aside="4 points · sources jointes">
              <Feed
                items={[
                  { time: "Tréso", text: "Encaissement de 18 400 € reçu (client B.) ; 2 factures dépassent 30 jours, relances parties.", tone: "ok", icon: Euro, done: "Relancé" },
                  { time: "RH", text: "2 arrêts maladie cette semaine : planning de l'atelier ajusté, intérim proposé.", tone: "warn", icon: Users, done: "À valider" },
                  { time: "Client", text: "Le client M. attend une réponse sur le délai depuis 2 jours : brouillon prêt.", tone: "info", icon: Mail, done: "Brouillon" },
                  { time: "Fourn.", text: "Hausse de tarif annoncée par un fournisseur (+4 %) : 2 alternatives comparées.", tone: "neutral", icon: Package, done: "Comparatif" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="À décider aujourd'hui" aside="dossiers préparés">
              <MiniTable
                head={["Décision", "Recommandé", "Avant"]}
                widths="1.1fr 1fr 0.9fr"
                rows={[
                  { cells: ["Contrat de maintenance", "Offre B (−12 %)"], status: "vendredi", tone: "info" },
                  { cells: ["Recruter un 2e technicien", "Attendre le T4"], status: "15 sept.", tone: "neutral" },
                  { cells: ["Réponse client M. (délai)", "Proposer le 20 oct."], status: "aujourd'hui", tone: "warn" },
                  { cells: ["Renouveler l'assurance flotte", "Comparer 2 devis"], status: "30 sept.", tone: "neutral" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Engagements pris en réunion" aside="depuis les comptes-rendus">
              <Checklist
                items={[
                  { label: "Compte-rendu du comité de lundi rédigé et envoyé", detail: "6 décisions, 9 actions, 4 responsables", state: "done" },
                  { label: "Devis fournisseur à comparer · P. Martin", detail: "échéance demain · rappel envoyé", state: "progress" },
                  { label: "Fiche de poste à valider · vous", detail: "brouillon prêt depuis mardi", state: "todo" },
                  { label: "Relance banque pour la ligne de crédit · S. Roux", detail: "réponse reçue, rendez-vous posé", state: "done" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Chiffres de la semaine" aside="semaine 37 · lus dans vos outils">
              <HBars
                reduced={reduced}
                rows={[
                  { label: "CA facturé", pct: 84, value: "41 200 €", tone: "ok", note: "objectif 49 000 € · en ligne avec le mois" },
                  { label: "Trésorerie", pct: 62, value: "128 k€", tone: "info", note: "prévision à 30 jours : stable" },
                  { label: "Retards", pct: 18, value: "2 fact.", tone: "warn", note: "relances automatiques parties" },
                  { label: "Heures sup", pct: 9, value: "34 h", tone: "neutral", note: "atelier · sous le seuil convenu" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Décisions prises dans la semaine" aside="ce mois">
              <Ring pct={78} label="Rien ne traîne" sub="objectif 80 % · les dossiers arrivent préparés" tone="cyan" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'assistant a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "07:30", text: "Brief envoyé : 4 points, 3 sources, 2 brouillons prêts à valider.", tone: "ok", icon: FileText, done: "Envoyé" },
                  { time: "09:10", text: "Compte-rendu du comité rédigé depuis l'enregistrement, actions attribuées.", tone: "ok", icon: ClipboardCheck, done: "9 actions" },
                  { time: "11:20", text: "Retard de paiement détecté (facture 2026-138) : relance courtoise envoyée.", tone: "warn", icon: Bell, done: "Relancé" },
                  { time: "13:05", text: "Mail du client M. classé « délai » : brouillon de réponse préparé.", tone: "info", icon: Mail, done: "À valider" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "Outlook · Gmail", role: "courrier trié", state: "live" },
              { name: "Teams · Slack", role: "réunions transcrites", state: "sync" },
              { name: "Pennylane · banque", role: "trésorerie", state: "live" },
              { name: "Agenda", role: "décisions datées", state: "live" },
              { name: "Notion · Drive", role: "comptes-rendus", state: "sync" },
              { name: "Tableur", role: "chiffres de la semaine", state: "sync" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 3. Expert métier (médecin, avocat, comptable) ──────────────────────────

function ExpertProfile({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Assistant de dossier · préparation, comptes-rendus, recherche"
      meta="cabinet de 3 · médecin, avocat ou expert-comptable"
      icon={FileCheck}
      accent="ok"
      nav={["Dossiers", "Rendez-vous", "Comptes-rendus", "Recherche", "Courriers"]}
      user="AB"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Dossiers préparés", value: "12", sub: "avant chaque rendez-vous · pièces rassemblées", tone: "ok", icon: FileCheck },
            { label: "Comptes-rendus rédigés", value: "9", sub: "depuis vos notes ou la dictée · à valider", tone: "info", icon: PenLine },
            { label: "Réponses sourcées", value: "31", sub: "extraits cités, jamais inventés", tone: "ok", icon: Quote },
            { label: "Admin épargnée", value: "≈ 2 h 10", sub: "aujourd'hui · objectif : moitié moins", tone: "ok", icon: Timer },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Dossier préparé pour le rendez-vous de 14:30 · Mme K." aside="prêt à 13:50">
              <FilledForm
                fields={[
                  { label: "Contexte", value: "suivi trimestriel · dernier rendez-vous le 12 juin", state: "auto", source: "lu dans le dossier" },
                  { label: "Pièces", value: "3 documents rassemblés · 2 résultats reçus hier", state: "auto" },
                  { label: "À vérifier", value: "changement de traitement en juillet : effets ?", state: "check", source: "repéré dans le compte-rendu précédent" },
                  { label: "Questions", value: "4 questions suggérées, selon vos habitudes", state: "auto" },
                  { label: "Références", value: "2 références utiles, extraits cités", state: "auto", source: "base documentaire du cabinet" },
                  { label: "Courrier", value: "au confrère référent, après le rendez-vous", state: "todo" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Comptes-rendus à valider" aside="3 aujourd'hui">
              <MiniTable
                head={["Dossier", "Rédigé depuis", "Statut"]}
                widths="0.9fr 1fr 1fr"
                rows={[
                  { cells: ["M. R. · 11:00", "la dictée"], status: "À relire · 4 min", tone: "warn" },
                  { cells: ["Mme K. · 14:30", "le rendez-vous"], status: "Après 14:30", tone: "neutral" },
                  { cells: ["SARL D. · bilan", "vos notes"], status: "Validé · envoyé", tone: "ok" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Réponse sourcée" aside="question posée à 10:22">
              <Answer
                question="Quel délai s'applique dans ce cas précis ?"
                answer="Réponse en quatre lignes, avec les deux références applicables citées et le passage du dossier qui compte. Si la base ne sait pas, l'assistant le dit au lieu d'inventer."
                sources={["Référence 1 · §3", "Référence 2 · art. 12", "Dossier 2391 · p. 4"]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Courriers et relances" aside="aujourd'hui">
              <Checklist
                items={[
                  { label: "Courrier au confrère référent rédigé · à signer", detail: "vos formules, votre en-tête", state: "progress" },
                  { label: "Pièces manquantes relancées · 2 dossiers", detail: "accusé de réception reçu", state: "done" },
                  { label: "Dossier M. R. archivé, 12 pièces classées", detail: "nommage et dates normalisés", state: "done" },
                  { label: "Consentement signé reçu · Mme K.", detail: "rangé dans le dossier", state: "done" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Rendez-vous avec dossier prêt" aside="ce mois">
              <Ring pct={88} label="Préparé avant l'heure" sub="objectif 95 % · avant : 20 min de recherche par dossier" tone="ok" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'assistant a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "13:50", text: "Dossier de 14:30 préparé : pièces, points à vérifier, questions.", tone: "ok", icon: FileCheck, done: "Prêt" },
                  { time: "11:20", text: "Compte-rendu de 11:00 rédigé depuis la dictée, à relire (4 min).", tone: "info", icon: PenLine, done: "À relire" },
                  { time: "10:22", text: "Réponse sourcée fournie : 2 références citées, 0 invention.", tone: "ok", icon: Quote, done: "Sourcée" },
                  { time: "08:40", text: "Pièces manquantes relancées sur 2 dossiers, accusé reçu.", tone: "warn", icon: Send, done: "Relancé" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "Logiciel de dossier", role: "patients ou clients", state: "live" },
              { name: "Messagerie sécurisée", role: "MSSanté ou équivalent", state: "live" },
              { name: "Dictée", role: "audio → texte", state: "live" },
              { name: "Base documentaire", role: "vos références", state: "sync" },
              { name: "Agenda (Doctolib, Outlook)", role: "rendez-vous", state: "live" },
              { name: "Signature électronique", role: "consentements, lettres", state: "sync" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 4. SAV / support ───────────────────────────────────────────────────────

function SavProfile({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Assistant support · tickets, réponses, escalades"
      meta="support de 8 personnes · 86 tickets aujourd'hui"
      icon={MessageSquare}
      accent="info"
      nav={["File en direct", "Tickets", "Escalades", "Base de connaissances", "Satisfaction"]}
      user="NS"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Tickets reçus", value: "86", sub: "mail, WhatsApp, Instagram, formulaire", tone: "ok", icon: Inbox },
            { label: "Résolus par l'assistant", value: "61", sub: "réponses vérifiées dans votre base · votre ton", tone: "ok", icon: MessageSquare },
            { label: "Escaladés avec résumé", value: "25", sub: "l'humain reprend avec tout le contexte", tone: "info", icon: Users },
            { label: "Satisfaction", value: "4,6 / 5", sub: "objectif 4,5 et plus · sur 38 avis", tone: "ok", icon: CircleCheck },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Ticket rempli automatiquement · #4821" aside="reçu par mail à 13:52">
              <FilledForm
                fields={[
                  { label: "Client", value: "Mme T. · cliente depuis 2024", state: "auto", source: "reconnue par son adresse mail" },
                  { label: "Commande", value: "n° 7731 · livrée le 3 septembre", state: "auto" },
                  { label: "Catégorie", value: "livraison · colis endommagé", state: "auto" },
                  { label: "Priorité", value: "haute · photo jointe", state: "auto" },
                  { label: "Résumé", value: "colis reçu abîmé, demande un échange", state: "auto", source: "reformulé en une phrase" },
                  { label: "Réponse proposée", value: "excuses, échange sous 48 h, étiquette retour", state: "check", source: "à valider : geste commercial" },
                  { label: "Confiance", value: "92 %", state: "auto" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="File en direct" aside="4 sur 86">
              <MiniTable
                head={["Ticket", "Canal", "Statut"]}
                widths="0.6fr 0.8fr 1.3fr"
                rows={[
                  { cells: ["#4821", "mail"], status: "Réponse à valider", tone: "warn" },
                  { cells: ["#4820", "WhatsApp"], status: "Résolu · 2 min", tone: "ok" },
                  { cells: ["#4819", "Instagram"], status: "Escaladé · facturation", tone: "info" },
                  { cells: ["#4818", "formulaire"], status: "Attente du client", tone: "neutral" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Réponse proposée · #4821" aside="votre ton, vos règles">
              <Draft
                mail={{
                  to: "Mme T.",
                  subject: "Votre colis endommagé : échange sous 48 h",
                  body: "Bonjour Madame T., je suis désolé pour l'état de votre colis. Un échange part sous 48 h et l'étiquette de retour est jointe à ce message. Si vous préférez un remboursement, dites-le-moi simplement.",
                  state: "ready",
                }}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Escalades avec contexte" aside="l'humain reprend la main">
              <Checklist
                items={[
                  { label: "#4819 · facturation en double · transmis à Léa", detail: "résumé, historique et pièces joints · réponse promise sous 2 h", state: "progress" },
                  { label: "#4790 · client en colère · pris par un humain en 4 min", detail: "l'assistant a détecté le ton et s'est retiré", state: "done" },
                  { label: "#4802 · demande hors garantie · réponse validée puis envoyée", detail: "geste commercial décidé par vous", state: "done" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Résolus sans intervention" aside="ce mois">
              <Ring pct={71} label="Le reste est humain" sub="objectif 70 % · les cas sensibles restent à l'équipe" tone="info" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'assistant a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "14:02", text: "Réponse #4820 envoyée sur WhatsApp en 2 min, avec le suivi du colis.", tone: "ok", icon: Smartphone, done: "Résolu" },
                  { time: "13:40", text: "#4819 escaladé : résumé, historique et pièces transmis à l'équipe.", tone: "info", icon: Users, done: "Escaladé" },
                  { time: "12:15", text: "3 questions récurrentes repérées : ajout proposé à la base de connaissances.", tone: "warn", icon: BookOpen, done: "À valider" },
                  { time: "09:00", text: "Cette nuit : 14 tickets répondus, 2 mis en attente pour un humain.", tone: "ok", icon: Clock, done: "24 h / 24" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "Zendesk · Freshdesk · Crisp", role: "tickets", state: "live" },
              { name: "Mail · WhatsApp · Instagram", role: "canaux", state: "live" },
              { name: "Base de connaissances", role: "vos réponses vérifiées", state: "sync" },
              { name: "Commandes · fichier clients", role: "historique", state: "live" },
              { name: "Téléphone", role: "rappel programmé", state: "todo" },
              { name: "Avis clients", role: "satisfaction", state: "sync" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 5. Marketeur solo ──────────────────────────────────────────────────────

function MarketeurProfile({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Assistant contenu · calendrier, brouillons, fiches produits"
      meta="marketing solo · 5 canaux · semaine 37"
      icon={Megaphone}
      accent="warn"
      nav={["Calendrier", "Brouillons", "Fiches produits", "Réseaux", "Résultats"]}
      user="LP"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Brouillons prêts", value: "6", sub: "depuis vos notes et vos anciens contenus", tone: "ok", icon: PenLine },
            { label: "Publications planifiées", value: "12", sub: "cette semaine · 5 canaux", tone: "ok", icon: CalendarDays },
            { label: "Fiches complétées", value: "34", sub: "titre, description, attributs, mots-clés", tone: "ok", icon: Database },
            { label: "Commentaires traités", value: "27", sub: "réponses proposées · 3 signalés", tone: "info", icon: MessageSquare },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Calendrier de la semaine" aside="rempli à 2 semaines">
              <WeekGrid
                cells={[
                  { day: "Lun", items: [{ label: "Article blog", tone: "info" }, { label: "Newsletter", tone: "cyan" }] },
                  { day: "Mar", items: [{ label: "LinkedIn", tone: "info" }] },
                  { day: "Mer", items: [{ label: "Instagram", tone: "warn" }, { label: "Story", tone: "warn" }] },
                  { day: "Jeu", items: [{ label: "LinkedIn", tone: "info" }, { label: "Vidéo courte", tone: "cyan" }] },
                  { day: "Ven", items: [{ label: "Récap newsletter", tone: "cyan" }] },
                  { day: "Sam", items: [{ label: "Instagram", tone: "warn" }] },
                  { day: "Dim", items: [] },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Brouillons à valider" aside="3 sur 6">
              <MiniTable
                head={["Contenu", "Canal", "Statut"]}
                widths="1.2fr 0.7fr 1.1fr"
                rows={[
                  { cells: ["Guide : choisir son site", "blog"], status: "Prêt · 1 200 mots", tone: "ok" },
                  { cells: ["3 conseils de rentrée", "LinkedIn"], status: "À relire", tone: "warn" },
                  { cells: ["Coulisses de l'atelier", "Instagram"], status: "Visuel proposé", tone: "info" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Fiche produit complétée · « Bougie ambre 220 g »" aside="depuis la fiche fournisseur">
              <FilledForm
                fields={[
                  { label: "Titre", value: "Bougie parfumée ambre · cire végétale · 40 h", state: "auto", source: "optimisé pour la recherche" },
                  { label: "Description", value: "120 mots · ton de la marque", state: "auto", source: "depuis votre fiche fournisseur" },
                  { label: "Attributs", value: "220 g · cire de soja · mèche coton", state: "auto" },
                  { label: "Mots-clés", value: "bougie ambre, cire végétale, cadeau", state: "auto" },
                  { label: "Traduction", value: "anglais · prête", state: "check", source: "à relire avant mise en ligne" },
                  { label: "Visuel", value: "détouré, fond blanc, 3 formats", state: "auto" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Résultats · 30 jours" aside="lus dans vos outils">
              <HBars
                reduced={reduced}
                rows={[
                  { label: "Visites blog", pct: 100, value: "8 420", tone: "info", note: "+18 % par rapport au mois dernier" },
                  { label: "Abonnés", pct: 64, value: "1 260", tone: "cyan", note: "newsletter · +92 ce mois" },
                  { label: "Portée", pct: 78, value: "24 k", tone: "info", note: "LinkedIn · 3 posts au-dessus de la moyenne" },
                  { label: "Ventes", pct: 32, value: "41", tone: "ok", note: "depuis les contenus · lien tracé" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Calendrier rempli à 2 semaines" aside="ce mois">
              <Ring pct={83} label="Plus de trou dans le calendrier" sub="objectif 100 % · avant : la veille pour le lendemain" tone="warn" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'assistant a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "14:10", text: "Post LinkedIn de jeudi reformulé en 3 variantes, visuel proposé.", tone: "ok", icon: Megaphone, done: "3 variantes" },
                  { time: "11:30", text: "34 fiches produits complétées depuis le catalogue fournisseur.", tone: "ok", icon: Database, done: "Complétées" },
                  { time: "10:05", text: "27 commentaires lus : 24 réponses proposées, 3 signalés (réclamation).", tone: "info", icon: MessageSquare, done: "3 signalés" },
                  { time: "08:00", text: "Newsletter de lundi assemblée depuis les 3 contenus de la semaine.", tone: "ok", icon: Send, done: "Prête" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "LinkedIn · Instagram", role: "publication, commentaires", state: "live" },
              { name: "WordPress · Shopify", role: "articles, fiches", state: "live" },
              { name: "Brevo · Mailchimp", role: "newsletter", state: "sync" },
              { name: "Canva · Drive", role: "visuels", state: "sync" },
              { name: "Google Analytics", role: "résultats", state: "sync" },
              { name: "Buffer", role: "planification", state: "todo" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 6. Freelance / consultant ──────────────────────────────────────────────

function FreelanceProfile({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Assistant d'indépendant · devis, missions, factures"
      meta="consultant · 5 clients actifs"
      icon={Zap}
      accent="cyan"
      nav={["Demandes", "Devis", "Missions", "Factures", "Notes"]}
      user="TV"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Devis préparés", value: "5", sub: "depuis la demande · vos tarifs, vos conditions", tone: "ok", icon: FileText },
            { label: "Relances envoyées", value: "9", sub: "devis et factures · ton courtois", tone: "ok", icon: Send },
            { label: "Factures émises", value: "7", sub: "à la fin de mission · paiement suivi", tone: "ok", icon: Receipt },
            { label: "Temps facturable", value: "+2 h 15", sub: "aujourd'hui · objectif +20 % sur le mois", tone: "ok", icon: Timer },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Devis préparé depuis le mail de 10:04 · Association V." aside="prêt à 10:20">
              <FilledForm
                fields={[
                  { label: "Prestation", value: "atelier de 2 jours + accompagnement 1 mois", state: "auto", source: "reformulé depuis la demande" },
                  { label: "Jours", value: "2,5 jours", state: "check", source: "estimation à confirmer" },
                  { label: "Tarif", value: "2 450 € HT", state: "auto", source: "vos tarifs 2026" },
                  { label: "Conditions", value: "30 % à la commande · vos CGV", state: "auto" },
                  { label: "Délai", value: "démarrage possible le 6 octobre", state: "auto", source: "agenda vérifié" },
                  { label: "Envoi", value: "PDF + signature en ligne", state: "todo" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Missions et paiements" aside="4 sur 5">
              <MiniTable
                head={["Mission", "Étape", "Statut"]}
                widths="1fr 0.9fr 1.1fr"
                rows={[
                  { cells: ["Association V.", "devis"], status: "À envoyer", tone: "warn" },
                  { cells: ["Cabinet H.", "en cours"], status: "Facture à J+30", tone: "info" },
                  { cells: ["Startup N.", "terminée"], status: "Payée · 3 200 €", tone: "ok" },
                  { cells: ["Mairie L.", "devis envoyé J+6"], status: "Relancée", tone: "neutral" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Notes de réunion transformées en tâches" aside="réunion d'hier, 40 min">
              <Checklist
                items={[
                  { label: "Compte-rendu envoyé au Cabinet H.", detail: "5 décisions, 3 tâches pour vous, 2 pour eux", state: "done" },
                  { label: "Livrable 2 à envoyer avant le 20", detail: "rappel J-3 posé dans l'agenda", state: "progress" },
                  { label: "Périmètre du lot 3 à trancher avec le client", detail: "question ouverte repérée dans la discussion", state: "todo" },
                  { label: "Heures de la réunion ajoutées au suivi de mission", detail: "40 min · facturable", state: "done" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Relance courtoise · Mairie L." aside="devis envoyé il y a 6 jours">
              <Draft
                mail={{
                  to: "service achats · Mairie L.",
                  subject: "Votre devis du 1er septembre",
                  body: "Bonjour, je me permets de revenir vers vous au sujet du devis envoyé la semaine dernière. Avez-vous besoin d'un complément d'information pour avancer ? Je reste à votre disposition.",
                  state: "sent",
                }}
              />
              <p className="mt-2 text-[10.5px] leading-snug text-ink-3">Prochaine relance proposée dans 7 jours, sauf réponse. Vous pouvez l&apos;annuler d&apos;un clic.</p>
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Devis envoyés sous 24 h" aside="ce mois">
              <Ring pct={76} label="Réactivité" sub="objectif 90 % · avant : 3 à 5 jours" tone="cyan" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'assistant a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "10:20", text: "Devis Association V. préparé depuis le mail, PDF prêt à signer.", tone: "ok", icon: FileText, done: "Prêt" },
                  { time: "09:45", text: "Facture Cabinet H. programmée à J+30 depuis le devis signé.", tone: "info", icon: Receipt, done: "Programmée" },
                  { time: "09:00", text: "Relance de la Mairie L. envoyée (J+6), ton courtois.", tone: "ok", icon: Send, done: "Relancée" },
                  { time: "08:15", text: "Compte-rendu d'hier rédigé, 5 tâches créées avec leurs échéances.", tone: "ok", icon: ClipboardCheck, done: "5 tâches" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "Gmail · Outlook", role: "demandes", state: "live" },
              { name: "Pennylane · Indy · Freebe", role: "devis, factures", state: "live" },
              { name: "Yousign", role: "signature", state: "sync" },
              { name: "Agenda", role: "disponibilités", state: "live" },
              { name: "Notion · Trello", role: "tâches", state: "sync" },
              { name: "Banque", role: "paiements rapprochés", state: "sync" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── Export ─────────────────────────────────────────────────────────────────

export const PROFILES: Array<{
  slug: ProfileSlug;
  short: string;
  pain: ProfilePain;
  gain: ProfileGain;
  plan: AgentPlanData;
  render: (reduced: boolean) => ReactNode;
}> = [
  {
    slug: "commercial",
    short: "Commercial",
    pain: { stat: "70 %", label: "du temps en saisie et fichier clients", detail: "2,5 h par jour à saisir des notes plutôt qu'à vendre. Ordre de grandeur : Sybill, 2025." },
    gain: { value: "jusqu'à 8 h / sem", label: "Moins de saisie, plus de rendez-vous. Mesuré chez vous pendant le pilote." },
    plan: {
      blocks: { rag: false, automation: true, note: "Pas besoin de mémoire documentaire ici : l'agent lit le mail, vérifie votre fichier clients et vos tarifs, puis remplit et relance. Les automatisations font circuler le résultat dans vos outils." },
      steps: [
        { kind: "trigger", icon: Mail, title: "Un mail arrive à 09:12", lines: ["De : R. Lefèvre · Menuiserie D.", "« Site vitrine avec prise de RDV… budget ? »"] },
        { kind: "agent", icon: Bot, title: "L'agent lit et comprend la demande", lines: ["Besoin : site + prise de rendez-vous", "Budget évoqué : 3 à 5 k€ · décideur : gérant"] },
        { kind: "action", icon: Search, title: "Il vérifie votre fichier clients et vos tarifs", lines: ["Aucun doublon · 1er contact", "Grille 2026 : site relié 2 500 à 5 000 €"] },
        { kind: "action", icon: PenLine, title: "Il remplit la fiche et prépare la relance", lines: ["7 champs remplis · 1 à vérifier", "Brouillon : appel jeudi 10:00 proposé"] },
        { kind: "human", icon: CircleCheck, title: "Vous validez en 10 secondes", lines: ["✓ Budget confirmé", "✓ Envoi du mail"] },
        { kind: "record", icon: Archive, title: "Tout est enregistré dans vos outils", lines: ["Fichier clients : fiche créée, source « site »", "Agenda : RDV jeudi · journal : 4 actions"] },
      ],
    },
    render: (r) => <CommercialProfile reduced={r} />,
  },
  {
    slug: "dirigeant",
    short: "Dirigeant PME",
    pain: { stat: "73 %", label: "des dirigeants débordés par l'opérationnel", detail: "Trop de casquettes, peu de temps pour la stratégie. Ordre de grandeur : Writer, 2026." },
    gain: { value: "1 jour / sem récupéré", label: "Recentrage sur la stratégie et les sujets que vous seul pouvez trancher." },
    plan: {
      blocks: { rag: true, automation: true, note: "La mémoire relit vos comptes-rendus, contrats et décisions passées pour préparer le brief ; les automatisations trient le courrier chaque nuit et datent les engagements dans l'agenda." },
      steps: [
        { kind: "trigger", icon: Clock, title: "Chaque nuit à 6 h", lines: ["142 mails · 3 comptes-rendus", "1 relevé bancaire"] },
        { kind: "agent", icon: Bot, title: "L'agent trie et repère ce qui vous concerne", lines: ["9 mails demandent votre réponse", "1 retard de paiement · 1 hausse de tarif"] },
        { kind: "rag", icon: BookOpen, title: "Il relit vos comptes-rendus et contrats", lines: ["Contrat de maintenance : échéance vendredi", "Comité : option B déjà validée"] },
        { kind: "action", icon: FileText, title: "Il rédige le brief et prépare les décisions", lines: ["Brief 4 points, sources jointes", "2 brouillons de réponse · 1 comparatif"] },
        { kind: "human", icon: CircleCheck, title: "Vous tranchez, il exécute", lines: ["✓ Offre B choisie", "✓ Réponse client M. envoyée"] },
        { kind: "record", icon: Archive, title: "Décisions datées, engagements suivis", lines: ["Agenda : 3 échéances posées", "Journal : qui a décidé quoi, quand"] },
      ],
    },
    render: (r) => <DirigeantProfile reduced={r} />,
  },
  {
    slug: "expert",
    short: "Expert métier",
    pain: { stat: "Chaque jour", label: "du temps d'admin pris sur les patients ou les dossiers", detail: "Comptes-rendus, courriers, relances : des heures hors cœur de métier. On les compte ensemble au démarrage du pilote." },
    gain: { value: "Moitié moins d'admin", label: "Plus de temps pour le cœur de votre métier. Objectif fixé ensemble, lu dans le rapport du pilote." },
    plan: {
      blocks: { rag: true, automation: true, note: "La mémoire est indispensable ici : le dossier et votre base documentaire, avec les extraits cités. Les automatisations se limitent à l'agenda et à la messagerie sécurisée." },
      steps: [
        { kind: "trigger", icon: CalendarCheck, title: "Rendez-vous de 14:30 dans l'agenda", lines: ["Mme K. · suivi trimestriel", "2 résultats reçus hier"] },
        { kind: "agent", icon: Bot, title: "L'agent relit le dossier", lines: ["Dernier compte-rendu : 12 juin", "Changement de traitement en juillet"] },
        { kind: "rag", icon: BookOpen, title: "Il cherche dans votre base documentaire", lines: ["2 références utiles, extraits cités", "Si la base ne sait pas, il le dit"] },
        { kind: "action", icon: PenLine, title: "Il prépare le dossier et le compte-rendu", lines: ["Pièces, points à vérifier, 4 questions", "Compte-rendu rédigé depuis la dictée"] },
        { kind: "human", icon: CircleCheck, title: "Vous relisez en 4 minutes", lines: ["✓ Compte-rendu validé", "✓ Courrier au confrère signé"] },
        { kind: "record", icon: Archive, title: "Classé, envoyé, tracé", lines: ["Dossier : 12 pièces classées", "Messagerie sécurisée : courrier parti"] },
      ],
    },
    render: (r) => <ExpertProfile reduced={r} />,
  },
  {
    slug: "sav",
    short: "SAV / Support",
    pain: { stat: "22 %", label: "des PME ont déjà un assistant vocal · 31 % d'ici 2 ans", detail: "Volume de tickets en hausse, équipes saturées. Ordre de grandeur : Vstorm, 2026." },
    gain: { value: "Satisfaction en hausse", label: "Réponse 24 h / 24 avec votre ton, escalade au bon moment." },
    plan: {
      blocks: { rag: true, automation: true, note: "La mémoire, c'est votre base de connaissances : règles, garanties, réponses types. Les automatisations reçoivent les tickets de tous les canaux et créent l'échange dans les commandes." },
      steps: [
        { kind: "trigger", icon: Inbox, title: "Ticket #4821 arrive par mail à 13:52", lines: ["Mme T. · photo jointe", "« Colis reçu abîmé… »"] },
        { kind: "agent", icon: Bot, title: "L'agent comprend et classe", lines: ["Livraison · priorité haute", "Client reconnu · commande 7731"] },
        { kind: "rag", icon: BookOpen, title: "Il vérifie dans votre base de connaissances", lines: ["Règle : échange sous 48 h si photo", "Ton du service : réponse type trouvée"] },
        { kind: "action", icon: PenLine, title: "Il rédige la réponse et prépare l'échange", lines: ["Réponse proposée · confiance 92 %", "Étiquette retour générée"] },
        { kind: "human", icon: CircleCheck, title: "Le geste commercial, c'est vous", lines: ["✓ Échange validé", "Cas sensibles → un humain"] },
        { kind: "record", icon: Archive, title: "Ticket clos, client informé, tout est tracé", lines: ["Commandes : échange créé", "Journal : réponse, délai, satisfaction"] },
      ],
    },
    render: (r) => <SavProfile reduced={r} />,
  },
  {
    slug: "marketeur",
    short: "Marketeur solo",
    pain: { stat: "5 canaux", label: "à alimenter seul (blog, LinkedIn, Instagram, newsletter, publicité)", detail: "Un calendrier éditorial à tenir seul est épuisant : l'assistant allège la production." },
    gain: { value: "Plus de contenu, moins de rush", label: "Plus de calendrier vide. Plus de fin de mois à la dernière minute." },
    plan: {
      blocks: { rag: true, automation: true, note: "La mémoire contient vos anciens contenus et votre charte : c'est ce qui garde votre ton. Les automatisations planifient, publient et remontent les résultats." },
      steps: [
        { kind: "trigger", icon: CalendarDays, title: "Lundi 8 h : la semaine à remplir", lines: ["5 canaux · 12 créneaux", "Catalogue fournisseur : 34 nouveautés"] },
        { kind: "agent", icon: Bot, title: "L'agent relit vos notes et vos briefs", lines: ["3 idées notées la semaine dernière", "Thème du mois : rentrée"] },
        { kind: "rag", icon: BookOpen, title: "Il s'appuie sur vos contenus et votre charte", lines: ["Ton de la marque · 12 exemples", "Mots-clés qui ont déjà marché"] },
        { kind: "action", icon: PenLine, title: "Il rédige, décline, complète les fiches", lines: ["6 brouillons · 3 variantes LinkedIn", "34 fiches produits complétées"] },
        { kind: "human", icon: CircleCheck, title: "Vous relisez, vous ajustez", lines: ["✓ 5 brouillons validés", "1 traduction à relire"] },
        { kind: "record", icon: Archive, title: "Planifié, publié, mesuré", lines: ["12 publications planifiées", "Résultats lus dans vos outils"] },
      ],
    },
    render: (r) => <MarketeurProfile reduced={r} />,
  },
  {
    slug: "freelance",
    short: "Freelance",
    pain: { stat: "60 à 70 %", label: "du temps en préparation, pas en conseil", detail: "Le temps facturable s'érode dans la recherche et l'admin. Ordre de grandeur : MindStudio, 2026." },
    gain: { value: "Moins d'admin, plus de conseil", label: "Plus de temps à livrer, moins de temps à préparer et à relancer." },
    plan: {
      blocks: { rag: false, automation: true, note: "Pas de mémoire documentaire nécessaire : vos tarifs et vos conditions sont des réglages. Les automatisations prennent le relais après le devis : relances, facture, paiement rapproché." },
      steps: [
        { kind: "trigger", icon: Mail, title: "Demande reçue par mail à 10:04", lines: ["Association V.", "« Atelier 2 jours + accompagnement ? »"] },
        { kind: "agent", icon: Bot, title: "L'agent cadre la demande", lines: ["Prestation, durée, délai souhaité", "Question ouverte : périmètre"] },
        { kind: "action", icon: Search, title: "Il applique vos tarifs et vérifie l'agenda", lines: ["Tarifs 2026 · conditions 30 %", "Démarrage possible le 6 octobre"] },
        { kind: "action", icon: FileText, title: "Il prépare le devis", lines: ["Devis 2 450 € HT · PDF prêt", "Signature en ligne proposée"] },
        { kind: "human", icon: CircleCheck, title: "Vous ajustez les jours, vous signez", lines: ["✓ 2,5 jours confirmés", "✓ Envoi avec signature"] },
        { kind: "record", icon: Archive, title: "Suivi automatique jusqu'au paiement", lines: ["Relance J+7 programmée", "Facture à la fin · paiement rapproché"] },
      ],
    },
    render: (r) => <FreelanceProfile reduced={r} />,
  },
];
