import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Solutions 2IA : éditeur, hébergeur, propriété intellectuelle, responsabilité et contact.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      title="Mentions légales"
      description="Informations d'identification de l'éditeur du site Solutions 2IA et conditions générales d'utilisation du site vitrine."
      notice="À compléter avant publication : les mentions légales doivent contenir les informations administratives exactes de l'entreprise et de l'hébergeur. Les champs marqués “à compléter” ne doivent pas rester en production."
      sections={[
        {
          title: "Éditeur du site",
          body: [
            "Le présent site est édité par Solutions 2IA, entreprise proposant des prestations de conception de sites web, applications, agents IA, automatisation, UI/UX, motion design et expériences visuelles digitales.",
          ],
          items: [
            "Dénomination sociale : Solutions 2IA (à compléter avec la dénomination juridique exacte).",
            "Forme juridique : à compléter.",
            "Capital social : à compléter si société.",
            "Siège social : à compléter.",
            "SIREN/SIRET/RCS/RM : à compléter.",
            "Numéro de TVA intracommunautaire : à compléter si applicable.",
            "Directeur de la publication : à compléter.",
            "Contact : contact@solutions2ia.fr.",
          ],
        },
        {
          title: "Hébergement",
          body: [
            "Le site est hébergé par le prestataire technique retenu pour la mise en production. Les informations suivantes doivent être renseignées avec les données officielles de l'hébergeur.",
          ],
          items: [
            "Hébergeur : à compléter.",
            "Adresse de l'hébergeur : à compléter.",
            "Téléphone ou moyen de contact de l'hébergeur : à compléter.",
          ],
        },
        {
          title: "Activité du site",
          body: [
            "Le site présente les services de Solutions 2IA : création de sites web premium, développement d'applications, agents d'intelligence artificielle, automatisation de processus, studio visuel, design d'interfaces et accompagnement digital sur mesure.",
            "Les informations présentes sur le site sont fournies à titre informatif. Elles ne constituent pas une offre ferme, un devis automatique ou un engagement contractuel sans validation écrite de Solutions 2IA.",
          ],
        },
        {
          title: "Propriété intellectuelle",
          body: [
            "L'ensemble des textes, interfaces, composants graphiques, animations, éléments visuels, logos, structures de pages, codes sources accessibles côté client et contenus du site sont protégés par le droit de la propriété intellectuelle.",
            "Toute reproduction, représentation, adaptation, diffusion ou exploitation totale ou partielle du site ou de ses contenus, sans autorisation écrite préalable de Solutions 2IA, est interdite, sauf exceptions légales applicables.",
          ],
        },
        {
          title: "Responsabilité",
          body: [
            "Solutions 2IA s'efforce d'assurer l'exactitude et la mise à jour des informations publiées sur le site. Toutefois, des erreurs, omissions ou indisponibilités temporaires peuvent survenir.",
            "Solutions 2IA ne saurait être tenue responsable des dommages directs ou indirects résultant de l'accès au site, de son utilisation, d'une impossibilité d'accès, ou de l'utilisation des informations publiées.",
          ],
        },
        {
          title: "Liens externes",
          body: [
            "Le site peut contenir des liens vers des sites tiers. Solutions 2IA n'exerce aucun contrôle sur ces sites et ne peut être tenue responsable de leurs contenus, pratiques ou politiques de protection des données.",
          ],
        },
        {
          title: "Médiation de la consommation",
          body: [
            "Si Solutions 2IA conclut des contrats avec des consommateurs au sens du Code de la consommation, elle doit proposer un dispositif de médiation de la consommation et indiquer ici les coordonnées du médiateur désigné.",
          ],
          items: [
            "Médiateur de la consommation : à compléter si applicable.",
            "Site du médiateur : à compléter si applicable.",
            "Avant toute saisine du médiateur, le client consommateur doit adresser une réclamation écrite à Solutions 2IA.",
          ],
        },
        {
          title: "Droit applicable",
          body: [
            "Le site et ses mentions légales sont soumis au droit français. En cas de litige, les juridictions compétentes seront déterminées conformément aux règles de procédure applicables.",
          ],
        },
      ]}
    />
  );
}
