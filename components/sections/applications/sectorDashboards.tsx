"use client";

import type { ReactNode } from "react";
import {
  Bell,
  Boxes,
  Building2,
  CalendarCheck,
  Camera,
  ClipboardCheck,
  Clock,
  CloudRain,
  Euro,
  Factory,
  FileCheck,
  FileText,
  Gauge,
  HardHat,
  Inbox,
  MapPin,
  Package,
  PackageCheck,
  PenLine,
  Receipt,
  RefreshCw,
  Route,
  Scale,
  Send,
  ShoppingCart,
  Smartphone,
  Stethoscope,
  Store,
  Timer,
  TrendingDown,
  TriangleAlert,
  Truck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  BarChart,
  Checklist,
  Chrome,
  Deadlines,
  Feed,
  FleetMap,
  Funnel,
  HBars,
  Integrations,
  Item,
  KpiRow,
  Legend,
  MiniTable,
  Panel,
  Ring,
  Stagger,
  StatusGrid,
  Stops,
  Row,
  Thumbs,
  Timeline,
  type TimelineRow,
  type Vehicle,
} from "@/components/shared/mockup/AppMockup";


/**
 * Maquettes de tableaux de bord par secteur (page /applications).
 *
 * Surface claire « papier » (tokens paper / ink de globals.css) posée sur le
 * site sombre : on montre l'outil tel que le client le verrait. Chaque maquette
 * a sa propre navigation, ses propres vues et ses propres outils connectés, et
 * répond à la douleur du secteur en quatre zones :
 *   1. les chiffres du jour, avec l'objectif fixé ensemble ;
 *   2. une vue métier (agenda, ventes, lignes, tournées, budgets) + une liste à traiter ;
 *   3. deux vues propres au domaine (conformité Ségur, synoptique atelier, échéances,
 *      arrêts d'une tournée, terrain…) ;
 *   4. un anneau d'avancement, le journal de ce que l'outil a fait tout seul, et
 *      la barre des outils connectés (agenda, ERP, caisse, GPS, signature…).
 *
 * Toutes les valeurs sont des données d'exemple (mention « Maquette » dans
 * l'en-tête et sous la carte). Aucun nom réel de client. Les outils cités sont
 * des exemples d'outils courants du métier, pas des partenariats.
 *
 * Les widgets viennent de components/shared/mockup/AppMockup.tsx (partagés
 * avec les assistants par profil de /agents-ia).
 */

export type SectorSlug =
  | "sante"
  | "retail"
  | "industrie"
  | "services-pro"
  | "logistique"
  | "immobilier";

// ─── 1. Santé ───────────────────────────────────────────────────────────────

const SANTE_AGENDA: TimelineRow[] = [
  { name: "Dr Martin", blocks: [{ start: 0, span: 17, tone: "info" }, { start: 19, span: 8, tone: "alert" }, { start: 29, span: 16, tone: "info" }, { start: 55, span: 12, tone: "cyan" }, { start: 69, span: 18, tone: "info" }] },
  { name: "Dr Bensimon", blocks: [{ start: 4, span: 22, tone: "info" }, { start: 28, span: 14, tone: "info" }, { start: 56, span: 10, tone: "info" }, { start: 68, span: 8, tone: "alert" }, { start: 78, span: 14, tone: "info" }] },
  { name: "Dr Dupont", blocks: [{ start: 0, span: 12, tone: "cyan" }, { start: 14, span: 28, tone: "info" }, { start: 57, span: 30, tone: "info" }] },
  { name: "Dr Aubry", blocks: [{ start: 9, span: 18, tone: "info" }, { start: 29, span: 6, tone: "cyan" }, { start: 57, span: 8, tone: "info" }, { start: 67, span: 8, tone: "info" }] },
];

function SanteDashboard({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Cabinet · agenda, dossiers, téléconsultation"
      meta="4 praticiens · aujourd'hui, 14:20"
      icon={Stethoscope}
      accent="cyan"
      nav={["Agenda", "Patients", "Salle d'attente", "Téléconsultation", "Facturation", "Ségur"]}
      user="DM"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Rendez-vous du jour", value: "46", sub: "44 rappels SMS envoyés hier soir", tone: "ok", icon: CalendarCheck },
            { label: "Non honorés · semaine", value: "5,8 %", sub: "objectif fixé : moins de 7 %", tone: "ok", icon: Bell },
            { label: "Télétransmission", value: "98,4 %", sub: "objectif : 98 % et plus", tone: "ok", icon: Send },
            { label: "Dossiers à compléter", value: "3", sub: "avant 18 h · rappel automatique", tone: "warn", icon: FileText },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Agenda du cabinet" aside="8 h à 19 h · trait noir = maintenant">
              <Timeline rows={SANTE_AGENDA} now={57} reduced={reduced} />
              <Legend items={[["info", "Consultation"], ["cyan", "Téléconsultation"], ["alert", "Non honoré"]]} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="À finir avant ce soir" aside="3 dossiers">
              <MiniTable
                head={["Patient", "Quoi", "Statut"]}
                widths="0.9fr 1.1fr 1fr"
                rows={[
                  { cells: ["Mme L.", "Compte-rendu"], status: "À valider", tone: "warn" },
                  { cells: ["M. R.", "Ordonnance"], status: "À signer", tone: "warn" },
                  { cells: ["2 dossiers", "Synchro DMP"], status: "En attente", tone: "info" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Salle d'attente en direct" aside="attente moyenne 11 min · objectif 15">
              <MiniTable
                head={["Patient", "Arrivé", "Statut"]}
                widths="0.9fr 0.6fr 1.2fr"
                rows={[
                  { cells: ["Mme K.", "14:05"], status: "Dr Dupont · 15 min", tone: "warn" },
                  { cells: ["M. B.", "14:12"], status: "Dr Martin · 8 min", tone: "ok" },
                  { cells: ["Mlle P.", "14:18"], status: "Vient d'arriver", tone: "info" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Conformité Ségur : où en est le cabinet" aside="mise à jour à chaque dossier">
              <Checklist
                items={[
                  { label: "Identité nationale de santé (INS) vérifiée", detail: "96 % des patients · les 4 % restants sont listés", state: "done" },
                  { label: "Messagerie sécurisée de santé (MSSanté) active", detail: "comptes-rendus envoyés aux confrères sans mail classique", state: "done" },
                  { label: "Dossier médical partagé (DMP) alimenté", detail: "à chaque compte-rendu validé, sans ressaisie", state: "done" },
                  { label: "Connexion Pro Santé Connect", detail: "déploiement prévu ce mois", state: "progress" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Dossiers complets" aside="ce mois">
              <Ring pct={94} label="Dossiers sans pièce manquante" sub="objectif 95 % · les manques sont listés chaque soir" tone="ok" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'outil a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "14:12", text: "Rappel SMS envoyé : le rendez-vous de 15:30 est confirmé par la patiente.", tone: "ok", icon: Smartphone, done: "Confirmé" },
                  { time: "13:48", text: "Créneau libéré à 16:00 proposé à la liste d'attente.", tone: "info", icon: RefreshCw, done: "2 réponses" },
                  { time: "13:05", text: "Tiers payant rejeté : motif transmis au secrétariat.", tone: "alert", icon: TriangleAlert, done: "À corriger" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "Doctolib", role: "agenda synchronisé", state: "live" },
              { name: "Ameli · SESAM-Vitale", role: "télétransmission", state: "live" },
              { name: "DMP · Mon espace santé", role: "dossier partagé", state: "sync" },
              { name: "MSSanté", role: "messagerie sécurisée", state: "live" },
              { name: "Pro Santé Connect", role: "identité pro", state: "todo" },
              { name: "Logiciel de facturation", role: "tiers payant", state: "sync" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 2. Commerce ────────────────────────────────────────────────────────────

function RetailDashboard({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Boutique · stock, commandes, clients"
      meta="1 boutique · site · 2 marketplaces · un seul stock"
      icon={Store}
      accent="info"
      nav={["Ventes", "Stock", "Commandes", "Clients", "Marketplaces", "Compta"]}
      user="AL"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Ventes du jour", value: "3 184 €", sub: "3 canaux, un seul stock", tone: "ok", icon: Euro },
            { label: "Ruptures évitées", value: "12", sub: "cette semaine · réassort proposé", tone: "ok", icon: Boxes },
            { label: "Paniers relancés", value: "38 → 9", sub: "9 achats récupérés · relance à J+1", tone: "ok", icon: ShoppingCart },
            { label: "Fiches à ressaisir", value: "0", sub: "fiche unique poussée partout", tone: "ok", icon: RefreshCw },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Ventes par jour · 7 jours" aside="tous canaux">
              <BarChart
                reduced={reduced}
                max={4200}
                target={2900}
                targetLabel="moyenne 2 900 €"
                bars={[
                  { label: "Lun", value: 2410, display: "2,4 k" },
                  { label: "Mar", value: 2860, display: "2,9 k" },
                  { label: "Mer", value: 2210, display: "2,2 k" },
                  { label: "Jeu", value: 3080, display: "3,1 k" },
                  { label: "Ven", value: 3640, display: "3,6 k", tone: "cyan" },
                  { label: "Sam", value: 3920, display: "3,9 k", tone: "cyan" },
                  { label: "Dim", value: 1740, display: "1,7 k", tone: "neutral" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Stock à surveiller" aside="3 références">
              <MiniTable
                head={["Référence", "Stock", "Statut"]}
                widths="1.2fr 0.6fr 1.1fr"
                rows={[
                  { cells: ["Sneaker 42", "4 · 2/j"], status: "Réassort proposé", tone: "warn" },
                  { cells: ["Sweat noir M", "8 · 1/j"], status: "OK 6 jours", tone: "ok" },
                  { cells: ["Bougie ambre", "0"], status: "Retirée du site", tone: "alert" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Un seul stock, quatre canaux" aside="synchronisé toutes les minutes">
              <MiniTable
                head={["Canal", "Ventes du jour", "Sync", "Statut"]}
                widths="1fr 0.9fr 0.7fr 1fr"
                rows={[
                  { cells: ["Boutique (caisse)", "1 420 €", "il y a 1 min"], status: "À jour", tone: "ok" },
                  { cells: ["Site web", "1 108 €", "il y a 1 min"], status: "À jour", tone: "ok" },
                  { cells: ["Marketplace A", "412 €", "il y a 2 min"], status: "À jour", tone: "ok" },
                  { cells: ["Marketplace B", "244 €", "il y a 14 min"], status: "1 fiche refusée", tone: "warn" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Commandes et livraisons" aside="aujourd'hui">
              <HBars
                reduced={reduced}
                rows={[
                  { label: "Préparées", pct: 100, value: "41", tone: "info", note: "bons de préparation imprimés en boutique" },
                  { label: "Expédiées", pct: 66, value: "27", tone: "cyan", note: "étiquettes générées, client prévenu par mail" },
                  { label: "Livrées", pct: 80, value: "33", tone: "ok", note: "avis Google demandé 2 jours après" },
                  { label: "Retours", pct: 5, value: "2", tone: "warn", note: "motif « taille » · échange proposé" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Du visiteur à l'achat" aside="7 jours">
              <Funnel
                reduced={reduced}
                steps={[
                  { label: "Visites", value: "12 480", pct: 100, tone: "cyan" },
                  { label: "Paniers", value: "892 · 7,1 %", pct: 28, tone: "info" },
                  { label: "Achats", value: "401 · 3,2 %", pct: 14, tone: "ok" },
                ]}
              />
              <p className="mt-3 text-[10.5px] leading-snug text-ink-3">Clients revenus ce mois : 38 % · relance anniversaire et points de fidélité automatiques.</p>
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'outil a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "14:02", text: "Vente en boutique : stock mis à jour sur le site et les 2 marketplaces.", tone: "ok", icon: RefreshCw, done: "3 canaux" },
                  { time: "13:30", text: "Commande click & collect prête : client prévenu par SMS.", tone: "info", icon: Smartphone, done: "Prévenu" },
                  { time: "12:15", text: "Sneaker 42 sous le seuil : réassort proposé au fournisseur.", tone: "warn", icon: Boxes, done: "À valider" },
                  { time: "09:40", text: "Ventes d'hier envoyées à la comptabilité, factures rattachées.", tone: "ok", icon: Receipt, done: "Compta à jour" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "Shopify · WooCommerce", role: "site marchand", state: "live" },
              { name: "Amazon · Cdiscount", role: "marketplaces", state: "sync" },
              { name: "Caisse (Square, Zettle)", role: "boutique", state: "live" },
              { name: "Colissimo · Sendcloud", role: "expéditions", state: "live" },
              { name: "Pennylane", role: "comptabilité", state: "sync" },
              { name: "Fiche Google", role: "avis clients", state: "sync" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 3. Industrie ───────────────────────────────────────────────────────────

function IndustrieDashboard({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Atelier · production, maintenance, traçabilité"
      meta="4 lignes · 12 postes · équipe du matin"
      icon={Factory}
      accent="ok"
      nav={["Atelier", "Ordres de fabrication", "Maintenance", "Qualité", "Stock matière", "ERP"]}
      user="RP"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Ordres en cours", value: "7", sub: "suivis sur tablette · 0 fiche papier", tone: "ok", icon: ClipboardCheck },
            { label: "Rendement machines (TRS)", value: "78 %", sub: "objectif 80 % · lignes A, C, D", tone: "warn", icon: Gauge },
            { label: "Arrêts non planifiés", value: "1", sub: "ligne B · 24 min · cause notée", tone: "alert", icon: TriangleAlert },
            { label: "Pièces tracées", value: "1 240", sub: "lot, machine et opérateur enregistrés", tone: "ok", icon: Package },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Rendement par ligne" aside="capteurs et automates · en continu">
              <HBars
                reduced={reduced}
                rows={[
                  { label: "Ligne A", pct: 82, value: "82 %", tone: "ok", note: "en production · 240 pièces / h" },
                  { label: "Ligne B", pct: 0, value: "0 %", tone: "warn", note: "maintenance préventive planifiée · fin 15:10" },
                  { label: "Ligne C", pct: 76, value: "76 %", tone: "ok", note: "en production · réglage à 13:40 (6 min)" },
                  { label: "Ligne D", pct: 78, value: "78 %", tone: "ok", note: "en production" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ordres de fabrication" aside="aujourd'hui">
              <MiniTable
                head={["Ordre", "Pièce", "Fait", "Statut"]}
                widths="0.8fr 1fr 0.8fr 1fr"
                rows={[
                  { cells: ["OF 4287", "Support acier", "240 / 240"], status: "Terminé", tone: "ok" },
                  { cells: ["OF 4291", "Carter alu", "132 / 300"], status: "En cours", tone: "info" },
                  { cells: ["OF 4293", "Axe inox", "0 / 180"], status: "Planifié 15 h", tone: "neutral" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Synoptique de l'atelier" aside="12 postes · état en direct">
              <StatusGrid
                cells={[
                  { label: "Presse 1", state: "ok", sub: "en production" },
                  { label: "Presse 2", state: "ok", sub: "en production" },
                  { label: "Tour CN", state: "warn", sub: "réglage · 4 min" },
                  { label: "Fraiseuse", state: "alert", sub: "arrêt · pièce cassée" },
                  { label: "Soudure", state: "ok", sub: "en production" },
                  { label: "Peinture", state: "ok", sub: "cabine 1 · lot 118" },
                  { label: "Contrôle", state: "ok", sub: "12 pièces / h" },
                  { label: "Emballage", state: "ok", sub: "OF 4287" },
                  { label: "Robot A", state: "ok", sub: "cycle 42 s" },
                  { label: "Robot B", state: "neutral", sub: "maintenance" },
                  { label: "Scie", state: "ok", sub: "en production" },
                  { label: "Ébavurage", state: "ok", sub: "en production" },
                ]}
              />
              <Legend items={[["ok", "Production"], ["warn", "Réglage"], ["alert", "Arrêt"], ["neutral", "Maintenance"]]} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Qualité et matière" aside="aujourd'hui">
              <Checklist
                items={[
                  { label: "Lot 2026-09-118 : contrôle qualité conforme", detail: "12 mesures sur 12 dans la tolérance · certificat généré", state: "done" },
                  { label: "2 non-conformités déclarées, 1 traitée", detail: "fraiseuse · pièce cassée · cause en cours d'analyse", state: "progress" },
                  { label: "Acier S235 : 4 jours de production restants", detail: "commande de réassort proposée au fournisseur", state: "progress" },
                  { label: "Aluminium 6060 : stock suffisant", detail: "18 jours au rythme actuel", state: "done" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Maintenance préventive" aside="plan du mois">
              <Ring pct={86} label="Interventions réalisées" sub="12 sur 14 · les 2 restantes sont planifiées" tone="ok" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'outil a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "14:02", text: "OF 4287 terminé : quantités et lot remontés dans l'ERP, sans ressaisie.", tone: "ok", icon: RefreshCw, done: "ERP à jour" },
                  { time: "13:40", text: "Ligne C : arrêt de 6 min enregistré, cause « réglage » choisie sur la tablette.", tone: "warn", icon: Wrench, done: "Cause notée" },
                  { time: "11:20", text: "Lot 2026-09-118 tracé : 240 pièces, machine, opérateur, contrôle qualité.", tone: "info", icon: Package, done: "Tracé" },
                  { time: "06:05", text: "Badgeage de l'équipe du matin : 9 opérateurs présents, planning ajusté.", tone: "ok", icon: Users, done: "Planning" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "ERP (Sage, Odoo)", role: "ordres et stocks", state: "sync" },
              { name: "Automates · capteurs (OPC-UA)", role: "état des machines", state: "live" },
              { name: "GMAO", role: "maintenance", state: "sync" },
              { name: "Badgeuse", role: "présence équipes", state: "live" },
              { name: "Scan codes-barres", role: "traçabilité", state: "live" },
              { name: "Étiqueteuse", role: "lots et colis", state: "todo" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 4. Cabinet ─────────────────────────────────────────────────────────────

function ServicesProDashboard({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Cabinet · temps, dossiers, facturation"
      meta="12 collaborateurs · semaine 37"
      icon={Scale}
      accent="info"
      nav={["Temps", "Dossiers", "Facturation", "Documents", "Échéances", "Clients"]}
      user="SB"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Heures saisies", value: "164 h", sub: "cette semaine · saisie en un clic", tone: "ok", icon: Timer },
            { label: "Part facturable", value: "73 %", sub: "objectif fixé : 75 %", tone: "warn", icon: Gauge },
            { label: "Factures électroniques", value: "8", sub: "format Factur-X · plateforme agréée", tone: "ok", icon: Receipt },
            { label: "Signatures en attente", value: "3", sub: "relance automatique à J+2", tone: "info", icon: PenLine },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Heures facturables par jour" aside="moyenne par collaborateur">
              <BarChart
                reduced={reduced}
                max={8}
                target={6}
                targetLabel="objectif 6 h"
                bars={[
                  { label: "Lun", value: 6.4, display: "6,4 h" },
                  { label: "Mar", value: 7.1, display: "7,1 h", tone: "cyan" },
                  { label: "Mer", value: 5.2, display: "5,2 h", tone: "warn" },
                  { label: "Jeu", value: 6.8, display: "6,8 h" },
                  { label: "Ven", value: 5.9, display: "5,9 h", tone: "warn" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Dossiers actifs" aside="3 sur 41">
              <MiniTable
                head={["Dossier", "Type", "Temps", "Statut"]}
                widths="0.9fr 0.9fr 0.7fr 1fr"
                rows={[
                  { cells: ["2391", "Contentieux", "6 h 14"], status: "À facturer", tone: "warn" },
                  { cells: ["2402", "Cession", "4 h 32"], status: "En cours", tone: "info" },
                  { cells: ["2388", "Conseil", "3 h 45"], status: "Facturé", tone: "ok" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Échéances des 15 prochains jours" aside="rappel J-5 et J-1 par mail">
              <Deadlines
                items={[
                  { date: "12 sept.", label: "Déclaration de TVA · dossier 2391", left: "dans 5 j", tone: "warn" },
                  { date: "15 sept.", label: "Audience tribunal de commerce · dossier 2380", left: "dans 8 j", tone: "info" },
                  { date: "19 sept.", label: "Liasse fiscale · SARL D.", left: "dans 12 j", tone: "neutral" },
                  { date: "22 sept.", label: "Renouvellement de mandat · dossier 2375", left: "dans 15 j", tone: "neutral" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Pièces reçues des clients" aside="boîte de dépôt sécurisée">
              <Checklist
                items={[
                  { label: "Relevés d'août · SARL D. · 12 fichiers", detail: "classés automatiquement dans le dossier 2402", state: "done" },
                  { label: "Contrat à relire · reçu par mail", detail: "rangé dans 2402, hors messagerie classique", state: "done" },
                  { label: "Extrait K-bis manquant · dossier 2391", detail: "relance envoyée au client à J+2", state: "progress" },
                  { label: "Vérification des conflits d'intérêts · dossier 2410", detail: "à l'ouverture, avant toute saisie de temps", state: "todo" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Encours facturé" aside="ce mois">
              <Ring pct={82} label="Heures facturées" sub="28 600 € émis · 4 200 € encore à émettre" tone="info" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'outil a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "14:24", text: "Facture 2026-142 générée depuis le temps saisi et transmise à la plateforme agréée.", tone: "ok", icon: Receipt, done: "Transmise" },
                  { time: "11:50", text: "Signature électronique reçue sur la lettre de mission du dossier 2402.", tone: "ok", icon: PenLine, done: "Signée" },
                  { time: "09:30", text: "1 h 20 de temps non facturé détecté sur le dossier 2391.", tone: "warn", icon: Timer, done: "À vérifier" },
                  { time: "08:10", text: "14 mails triés par dossier, 2 pièces jointes rangées, 1 délai détecté.", tone: "info", icon: Inbox, done: "Classés" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "Outlook · Gmail", role: "mails classés par dossier", state: "live" },
              { name: "Pennylane · Cegid", role: "comptabilité", state: "sync" },
              { name: "Chorus Pro · plateforme agréée", role: "facture électronique", state: "live" },
              { name: "Yousign", role: "signature", state: "live" },
              { name: "Infogreffe", role: "K-bis, statuts", state: "sync" },
              { name: "Agenda", role: "audiences, rendez-vous", state: "live" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 5. Transport ───────────────────────────────────────────────────────────

const FLEET: Vehicle[] = [
  { x: 12, y: 12, tone: "ok" }, { x: 22, y: 24, tone: "ok" }, { x: 30, y: 14, tone: "cyan" },
  { x: 38, y: 28, tone: "ok" }, { x: 46, y: 10, tone: "ok" }, { x: 52, y: 22, tone: "ok" },
  { x: 60, y: 32, tone: "cyan" }, { x: 68, y: 16, tone: "ok" }, { x: 75, y: 26, tone: "warn" },
  { x: 82, y: 12, tone: "ok" }, { x: 88, y: 30, tone: "ok" }, { x: 18, y: 36, tone: "ok" },
  { x: 28, y: 41, tone: "ok" }, { x: 42, y: 39, tone: "cyan" }, { x: 56, y: 42, tone: "ok" },
  { x: 70, y: 40, tone: "ok" }, { x: 80, y: 37, tone: "warn" }, { x: 90, y: 42, tone: "cyan" },
];

function LogistiqueDashboard({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Transport · tournées, preuves, suivi"
      meta="18 véhicules · aujourd'hui, 14:20"
      icon={Truck}
      accent="cyan"
      nav={["Tournées", "Flotte", "Preuves de livraison", "Clients", "Coûts", "Facturation"]}
      user="KD"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Tournées en cours", value: "18", sub: "position mise à jour toutes les 30 s", tone: "ok", icon: Route },
            { label: "Livraisons à l'heure", value: "96,2 %", sub: "objectif fixé : 97 %", tone: "warn", icon: Clock },
            { label: "Preuves de livraison", value: "412 / 420", sub: "photo + signature · 0 bon papier", tone: "ok", icon: FileCheck },
            { label: "Clients prévenus", value: "27", sub: "heure d'arrivée envoyée par SMS", tone: "info", icon: Smartphone },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Flotte en direct" aside="boîtiers GPS · 18 véhicules">
              <FleetMap vehicles={FLEET} reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Tournées à surveiller" aside="3 sur 18">
              <MiniTable
                head={["Tournée", "Chauffeur", "Arrivée", "Statut"]}
                widths="0.7fr 0.9fr 0.7fr 1.1fr"
                rows={[
                  { cells: ["T-4", "K. Diallo", "+12 min"], status: "Client prévenu", tone: "warn" },
                  { cells: ["T-7", "M. Roux", "14:40"], status: "Livrée", tone: "ok" },
                  { cells: ["T-11", "S. Nguyen", "15:05"], status: "En route", tone: "info" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Tournée T-4, arrêt par arrêt" aside="7 arrêts · retard rattrapable de 12 min">
              <Stops
                stops={[
                  { time: "08:10", label: "Dépôt", state: "done" },
                  { time: "09:05", label: "Client A", state: "done" },
                  { time: "10:20", label: "Client B", state: "done" },
                  { time: "11:40", label: "Client C", state: "done" },
                  { time: "13:15", label: "Client D", state: "late" },
                  { time: "14:30", label: "Client E", state: "current" },
                  { time: "15:45", label: "Client F", state: "next" },
                ]}
              />
              <p className="mt-3 text-[10.5px] leading-snug text-ink-3">Client D livré avec 12 min de retard (bouchon) : les clients E et F ont reçu leur nouvelle heure d&apos;arrivée par SMS.</p>
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Coût du dernier kilomètre" aside="par tournée · objectif 2,00 € / colis">
              <HBars
                reduced={reduced}
                rows={[
                  { label: "T-4", pct: 92, value: "2,31 €", tone: "warn", note: "détour de 9 km · 3 colis absents" },
                  { label: "T-7", pct: 77, value: "1,92 €", tone: "ok", note: "tournée optimisée, 0 second passage" },
                  { label: "T-11", pct: 83, value: "2,08 €", tone: "info", note: "en cours" },
                  { label: "Carburant", pct: 62, value: "1 240 €", tone: "neutral", note: "aujourd'hui · 9,8 L / 100 km en moyenne" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Livrées au premier passage" aside="ce mois">
              <Ring pct={94} label="Pas de second passage" sub="objectif 95 % · créneau confirmé par SMS la veille" tone="ok" reduced={reduced} />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'outil a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "14:13", text: "Retard détecté sur la tournée T-4 : nouvelle heure d'arrivée envoyée aux clients suivants.", tone: "warn", icon: Clock, done: "Prévenus" },
                  { time: "14:27", text: "Preuve de livraison signée et photographiée pour la commande 8492.", tone: "ok", icon: FileCheck, done: "Archivée" },
                  { time: "13:55", text: "Lettre de voiture électronique (eCMR) générée pour la tournée T-7.", tone: "info", icon: FileText, done: "Générée" },
                  { time: "07:30", text: "18 tournées optimisées et envoyées sur les téléphones des chauffeurs.", tone: "ok", icon: Route, done: "Envoyées" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "Boîtiers GPS (Webfleet, Geotab)", role: "position des véhicules", state: "live" },
              { name: "Logiciel de transport (TMS)", role: "ordres et tournées", state: "sync" },
              { name: "Colissimo · Chronopost", role: "étiquettes et suivi", state: "live" },
              { name: "eCMR", role: "lettre de voiture", state: "live" },
              { name: "SMS · WhatsApp", role: "clients prévenus", state: "live" },
              { name: "Facturation", role: "au dépôt de la preuve", state: "sync" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── 6. Immobilier / BTP ────────────────────────────────────────────────────

function ImmoDashboard({ reduced }: { reduced: boolean }) {
  return (
    <Chrome
      app="Chantiers · mandats, pointage, marges"
      meta="7 chantiers · 4 mandats en cours"
      icon={HardHat}
      accent="info"
      nav={["Chantiers", "Mandats", "Pointage", "Devis et factures", "Photos et réserves", "Trésorerie"]}
      user="MT"
    >
      <Stagger reduced={reduced}>
        <KpiRow
          reduced={reduced}
          items={[
            { label: "Chantiers actifs", value: "7", sub: "avancement mis à jour depuis le terrain", tone: "ok", icon: Building2 },
            { label: "Marge moyenne", value: "16,5 %", sub: "prévu 18 % · écart vu tôt sur Lyon", tone: "warn", icon: TrendingDown },
            { label: "Pointages du jour", value: "17", sub: "géolocalisés, horodatés, signés", tone: "ok", icon: MapPin },
            { label: "Mandats à relancer", value: "4", sub: "relance automatique envoyée hier", tone: "info", icon: Send },
          ]}
        />
        <Row>
          <Item reduced={reduced}>
            <Panel title="Budget engagé contre avancement" aside="par chantier">
              <HBars
                reduced={reduced}
                rows={[
                  { label: "Bordeaux 2", pct: 68, value: "68 %", tone: "ok", note: "71 % avancé · dans le budget" },
                  { label: "Lyon", pct: 81, value: "81 %", tone: "warn", note: "42 % avancé · écart +6 % signalé" },
                  { label: "Marseille", pct: 89, value: "89 %", tone: "ok", note: "89 % avancé · réception dans 12 jours" },
                  { label: "Toulouse", pct: 22, value: "22 %", tone: "info", note: "24 % avancé · démarré lundi" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Équipes sur site" aside="pointage du matin">
              <MiniTable
                head={["Chantier", "Équipe", "Arrivée", "Statut"]}
                widths="1fr 0.7fr 0.7fr 1.1fr"
                rows={[
                  { cells: ["Bordeaux 2", "7 pers.", "07:58"], status: "Sur site", tone: "ok" },
                  { cells: ["Lyon", "5 pers.", "08:12"], status: "Sur site", tone: "ok" },
                  { cells: ["Toulouse", "2 pers.", "aucune"], status: "Absence", tone: "warn" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row>
          <Item reduced={reduced}>
            <Panel title="Mandats et demandes reçues" aside="portails immobiliers → fichier clients">
              <MiniTable
                head={["Bien", "Demandes", "Visites", "Suite"]}
                widths="1.1fr 0.7fr 0.6fr 1.1fr"
                rows={[
                  { cells: ["T3 · Lyon 6e", "14", "3"], status: "Relance J+2 envoyée", tone: "ok" },
                  { cells: ["Maison · Bordeaux", "6", "2"], status: "Visite samedi", tone: "info" },
                  { cells: ["Local · Toulouse", "2", "0"], status: "Prix à revoir", tone: "warn" },
                ]}
              />
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Le terrain, aujourd'hui" aside="photos et réserves depuis le téléphone">
              <Thumbs
                items={[
                  { label: "Photo · Bordeaux 2", sub: "09:12 · doublage posé", tone: "ok", icon: Camera },
                  { label: "Réserve · Lyon", sub: "fissure enduit · à reprendre", tone: "warn", icon: TriangleAlert },
                  { label: "Livraison · Marseille", sub: "matériaux attendus 15:00", tone: "info", icon: PackageCheck },
                  { label: "Météo · Toulouse", sub: "pluie demain · coulage reporté", tone: "cyan", icon: CloudRain },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Row wide="right">
          <Item reduced={reduced}>
            <Panel title="Devis signés" aside="ce mois">
              <Ring pct={62} label="8 devis signés sur 13" sub="relance automatique à J+3 sur les 5 restants" tone="info" reduced={reduced} />
              <p className="mt-3 text-[10.5px] leading-snug text-ink-3">Trésorerie : 3 situations de travaux envoyées, 2 paiements reçus rapprochés avec la banque.</p>
            </Panel>
          </Item>
          <Item reduced={reduced}>
            <Panel title="Ce que l'outil a fait tout seul" aside="aujourd'hui">
              <Feed
                items={[
                  { time: "14:21", text: "Écart de budget détecté sur Lyon (+6 %) : alerte envoyée au conducteur de travaux.", tone: "warn", icon: TriangleAlert, done: "Alerté" },
                  { time: "14:04", text: "Devis signé en ligne : 24 500 € HT, chantier créé automatiquement.", tone: "ok", icon: PenLine, done: "Signé" },
                  { time: "10:30", text: "3 nouvelles demandes reçues des portails, rangées dans le fichier clients avec leur budget.", tone: "info", icon: Inbox, done: "Qualifiées" },
                  { time: "07:58", text: "Pointage signé et géolocalisé pour l'équipe de Bordeaux 2.", tone: "info", icon: MapPin, done: "Horodaté" },
                ]}
              />
            </Panel>
          </Item>
        </Row>
        <Item reduced={reduced}>
          <Integrations
            tools={[
              { name: "SeLoger · Leboncoin · Bien'ici", role: "demandes reçues", state: "live" },
              { name: "Fichier clients (CRM)", role: "mandats, relances", state: "sync" },
              { name: "Batappli · Tolteck", role: "devis et factures", state: "sync" },
              { name: "Banque (Qonto)", role: "paiements rapprochés", state: "live" },
              { name: "Pointage mobile", role: "géolocalisé, signé", state: "live" },
              { name: "Signature électronique", role: "devis, mandats", state: "live" },
              { name: "Chorus Pro", role: "marchés publics", state: "todo" },
            ]}
          />
        </Item>
      </Stagger>
    </Chrome>
  );
}

// ─── Export ─────────────────────────────────────────────────────────────────

export const SECTOR_DASHBOARDS: Array<{
  slug: SectorSlug;
  short: string;
  meta: string;
  render: (reduced: boolean) => ReactNode;
}> = [
  { slug: "sante", short: "Santé", meta: "cabinet de 4 praticiens", render: (r) => <SanteDashboard reduced={r} /> },
  { slug: "retail", short: "Commerce", meta: "boutique, site et marketplaces", render: (r) => <RetailDashboard reduced={r} /> },
  { slug: "industrie", short: "Industrie", meta: "atelier de 4 lignes", render: (r) => <IndustrieDashboard reduced={r} /> },
  { slug: "services-pro", short: "Cabinet", meta: "cabinet de 12 collaborateurs", render: (r) => <ServicesProDashboard reduced={r} /> },
  { slug: "logistique", short: "Transport", meta: "18 véhicules en tournée", render: (r) => <LogistiqueDashboard reduced={r} /> },
  { slug: "immobilier", short: "Immo / BTP", meta: "7 chantiers", render: (r) => <ImmoDashboard reduced={r} /> },
];
