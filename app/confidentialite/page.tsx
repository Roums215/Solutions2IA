import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Solutions 2IA : données collectées, finalités, durées, droits RGPD et contact.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      description="Cette politique explique comment Solutions 2IA traite les données personnelles collectées via son site vitrine et ses échanges commerciaux."
      notice="Cette page doit être ajustée si de nouveaux outils sont ajoutés : analytics, CRM, chat, newsletter, pixels publicitaires, prise de rendez-vous ou paiement en ligne."
      sections={[
        {
          title: "Responsable du traitement",
          body: [
            "Le responsable du traitement est Solutions 2IA, éditeur du site. Les coordonnées juridiques complètes sont indiquées dans les mentions légales.",
          ],
          items: [
            "Contact privacy/RGPD : contact@solutions2ia.com.",
            "Délégué à la protection des données : non désigné à ce jour, sauf obligation ultérieure ou décision volontaire.",
          ],
        },
        {
          title: "Données collectées",
          body: [
            "Solutions 2IA collecte uniquement les données nécessaires à la prise de contact, à l'étude des projets et à la gestion de la relation commerciale.",
          ],
          items: [
            "Données d'identification : nom, prénom, société, fonction éventuelle.",
            "Données de contact : adresse e-mail, téléphone, informations transmises via formulaire ou e-mail.",
            "Données liées au projet : besoin exprimé, budget éventuel, délais, contexte métier, fichiers ou informations volontairement transmis.",
            "Données techniques : adresse IP, logs techniques, informations de sécurité et de navigation strictement nécessaires au fonctionnement du site.",
          ],
        },
        {
          title: "Finalités et bases légales",
          items: [
            "Répondre aux demandes de contact et qualifier un projet : intérêt légitime et mesures précontractuelles.",
            "Établir un devis, préparer une proposition ou exécuter une prestation : exécution de mesures précontractuelles ou contractuelles.",
            "Assurer la sécurité, la maintenance et l'amélioration du site : intérêt légitime.",
            "Respecter les obligations comptables, fiscales et légales : obligation légale.",
            "Envoyer une prospection commerciale à des professionnels lorsque cela est autorisé : intérêt légitime, avec possibilité d'opposition.",
          ],
        },
        {
          title: "Destinataires",
          body: [
            "Les données sont accessibles aux personnes habilitées de Solutions 2IA et aux prestataires techniques strictement nécessaires à l'exploitation du site, à l'hébergement, à la maintenance, à la gestion commerciale ou à l'exécution des prestations.",
            "Solutions 2IA ne vend pas les données personnelles des visiteurs ou prospects.",
          ],
        },
        {
          title: "Durées de conservation",
          items: [
            "Demandes de contact et prospects : jusqu'à 3 ans après le dernier échange actif.",
            "Données client et contractuelles : pendant la durée de la relation contractuelle, puis archivage selon les obligations légales applicables.",
            "Documents comptables et facturation : durée légale de conservation applicable.",
            "Logs techniques : durée limitée aux besoins de sécurité, diagnostic et maintenance.",
          ],
        },
        {
          title: "Droits des personnes",
          body: [
            "Conformément au RGPD et à la loi Informatique et Libertés, toute personne concernée peut demander l'accès, la rectification, l'effacement, la limitation, l'opposition au traitement, ainsi que la portabilité lorsque ce droit est applicable.",
            "Pour exercer ces droits, il suffit d'écrire à contact@solutions2ia.com. Une preuve d'identité peut être demandée en cas de doute raisonnable.",
          ],
        },
        {
          title: "Réclamation auprès de la CNIL",
          body: [
            "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés, via le site cnil.fr.",
          ],
        },
        {
          title: "Sécurité",
          body: [
            "Solutions 2IA met en place des mesures raisonnables de sécurité technique et organisationnelle afin de protéger les données contre l'accès non autorisé, la perte, l'altération ou la divulgation.",
          ],
        },
        {
          title: "Transferts hors Union européenne",
          body: [
            "Si certains prestataires techniques impliquent un transfert de données hors Union européenne, Solutions 2IA veille à ce que des garanties appropriées soient mises en place, notamment des clauses contractuelles types ou tout mécanisme reconnu par la réglementation applicable.",
          ],
        },
      ]}
    />
  );
}
