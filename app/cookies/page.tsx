import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Politique cookies",
  description: "Politique cookies de Solutions 2IA : traceurs nécessaires, mesure d'audience, consentement et gestion des préférences.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      title="Politique cookies"
      description="Cette page précise les règles applicables aux cookies et traceurs susceptibles d'être utilisés sur le site Solutions 2IA."
      sections={[
        {
          title: "Qu'est-ce qu'un cookie ?",
          body: [
            "Un cookie ou traceur est un petit fichier ou identifiant déposé ou lu sur le terminal d'un utilisateur lors de la consultation d'un site. Il peut servir au fonctionnement technique du site, à la mesure d'audience, à la personnalisation ou à la publicité.",
          ],
        },
        {
          title: "Cookies strictement nécessaires",
          body: [
            "Le site peut utiliser des cookies ou mécanismes techniques strictement nécessaires à son fonctionnement, à sa sécurité, à l'affichage des pages et à la conservation de préférences indispensables. Ces traceurs ne nécessitent pas de consentement préalable.",
          ],
        },
        {
          title: "Mesure d'audience et statistiques",
          body: [
            "À ce jour, le site ne doit utiliser des outils de mesure d'audience non essentiels que si l'utilisateur y a consenti lorsque la réglementation l'exige. En l'absence d'outil de mesure d'audience configuré, aucun cookie statistique non essentiel n'est déposé par Solutions 2IA.",
          ],
        },
        {
          title: "Cookies marketing ou publicitaires",
          body: [
            "Solutions 2IA ne doit déposer de cookies marketing, pixels publicitaires ou traceurs de reciblage qu'après consentement explicite de l'utilisateur. Ces traceurs doivent pouvoir être refusés aussi simplement qu'ils sont acceptés.",
          ],
        },
        {
          title: "Gestion du consentement",
          body: [
            "Lorsque des cookies non essentiels sont utilisés, l'utilisateur doit pouvoir accepter, refuser ou paramétrer ses choix par finalité. La poursuite de la navigation ne vaut pas consentement.",
          ],
        },
        {
          title: "Durée de conservation",
          body: [
            "Les cookies et choix de consentement sont conservés pour une durée limitée, proportionnée à leur finalité et conforme aux recommandations applicables.",
          ],
        },
        {
          title: "Paramétrage du navigateur",
          body: [
            "L'utilisateur peut également configurer son navigateur pour bloquer ou supprimer les cookies. Le blocage de certains cookies techniques peut toutefois affecter le fonctionnement normal du site.",
          ],
        },
      ]}
    />
  );
}
