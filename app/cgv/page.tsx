import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales applicables aux prestations Solutions 2IA : sites web, applications, automatisations et assistants IA sur mesure.",
  alternates: { canonical: "/cgv" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      description="Conditions applicables aux prestations de services digitales proposées par Solutions 2IA, sauf conditions particulières convenues par écrit."
      sections={[
        {
          title: "Champ d'application",
          body: [
            "Les présentes conditions générales s'appliquent aux prestations proposées par Solutions 2IA : création de sites web, applications, agents IA, automatisation, conseil digital, UI/UX design, motion design, intégrations techniques et accompagnements associés.",
            "Toute commande implique l'acceptation des présentes conditions, sauf accord écrit contraire dans un devis, contrat, bon de commande ou cahier des charges validé par les parties.",
          ],
        },
        {
          title: "Devis et commande",
          body: [
            "Les prestations font l'objet d'un devis ou d'une proposition commerciale précisant le périmètre, le prix, les livrables, les délais estimatifs et les éventuelles conditions particulières.",
            "La commande est réputée ferme après acceptation écrite du devis, signature électronique, validation par e-mail ou paiement de l'acompte prévu.",
          ],
        },
        {
          title: "Prix et paiement",
          items: [
            "Les prix sont indiqués en euros, hors taxes ou toutes taxes comprises selon le statut fiscal applicable à Solutions 2IA.",
            "Un acompte peut être demandé au démarrage du projet.",
            "Le solde est payable selon l'échéancier prévu au devis ou à la livraison des prestations.",
            "Tout retard de paiement peut entraîner la suspension des prestations en cours, sans préjudice des pénalités légales ou contractuelles applicables.",
          ],
        },
        {
          title: "Collaboration du client",
          body: [
            "Le client s'engage à fournir les informations, contenus, accès, validations et éléments nécessaires à la bonne exécution de la prestation. Les délais peuvent être décalés si ces éléments ne sont pas transmis dans les temps.",
          ],
        },
        {
          title: "Livrables et validation",
          body: [
            "Les livrables sont définis dans le devis : maquettes, pages web, composants, applications, workflows, agents IA, documentations, exports, vidéos ou tout autre élément convenu.",
            "Une phase de recette ou de validation peut être prévue. Toute demande hors périmètre initial peut faire l'objet d'un devis complémentaire.",
          ],
        },
        {
          title: "Propriété intellectuelle",
          body: [
            "Sauf stipulation contraire, les droits patrimoniaux portant sur les livrables spécifiquement créés pour le client sont cédés après paiement complet des sommes dues, dans les limites prévues au devis.",
            "Solutions 2IA conserve la propriété de ses méthodes, savoir-faire, bibliothèques, composants génériques, templates, outils, scripts, prompts, systèmes internes et éléments préexistants.",
          ],
        },
        {
          title: "Prestations IA et automatisation",
          body: [
            "Les agents IA, workflows et automatisations sont conçus selon les informations fournies par le client et les contraintes techniques des outils utilisés. Le client reste responsable de la validation métier, juridique et opérationnelle des résultats produits par ces systèmes.",
            "Lorsque des services tiers sont utilisés, leur disponibilité, leurs limites, leurs coûts et leurs conditions propres peuvent impacter la prestation.",
          ],
        },
        {
          title: "Maintenance et support",
          body: [
            "Les prestations de maintenance, support, supervision, évolutions ou hébergement ne sont incluses que si elles sont explicitement prévues au devis ou dans un contrat séparé.",
          ],
        },
        {
          title: "Confidentialité",
          body: [
            "Chaque partie s'engage à conserver confidentielles les informations non publiques reçues dans le cadre du projet, notamment les accès, données métier, documents stratégiques, fichiers clients et informations techniques.",
          ],
        },
        {
          title: "Responsabilité",
          body: [
            "Solutions 2IA est tenue à une obligation de moyens dans l'exécution de ses prestations. Sa responsabilité ne peut être engagée en cas de mauvaise utilisation des livrables, modification par un tiers, défaut d'information du client, indisponibilité d'un service tiers ou force majeure.",
          ],
        },
        {
          title: "Rétractation et consommateurs",
          body: [
            "Lorsque le client agit en qualité de consommateur et que le droit de rétractation est applicable, les modalités légales correspondantes doivent être précisées dans le devis ou les conditions particulières. Si le client demande l'exécution immédiate de la prestation, les règles applicables aux services déjà exécutés peuvent limiter ou exclure le remboursement.",
          ],
        },
        {
          title: "Médiation et litiges",
          body: [
            "En cas de litige, les parties s'efforceront de rechercher une solution amiable. Si le client est un consommateur, il peut recourir gratuitement au médiateur de la consommation désigné par Solutions 2IA, sous réserve d'une réclamation écrite préalable.",
            "À défaut d'accord amiable, le litige sera soumis aux juridictions compétentes selon les règles de droit commun.",
          ],
        },
      ]}
    />
  );
}
