import dynamic from "next/dynamic";
import { PageAtmosphere } from "@/components/shared/PageAtmosphere";
import { ContactHeroSection } from "@/components/sections/contact/ContactHeroSection";

// Rendu serveur : le hero (et son formulaire) est dans le bundle initial ; les sections
// sous la ligne de flottaison sont des chunks séparés (ssr:true, contenu dans le HTML).
//
// Refonte d'octobre 2026, « formulaire en vitrine » : le formulaire monte dans le hero, en
// verre, rempli comme une conversation en trois temps (ContactForm). Dessous, ce qui se
// passe après l'envoi en objets réels, les questions, puis « bon à savoir ». Le contenu de
// l'ancienne page (conseils, étapes, questions, bon à savoir) est repris tel quel dans
// components/sections/contact/contactPageData.ts. Le formulaire est l'unique CTA.
const ContactAfter = dynamic(() => import("@/components/sections/contact/ContactAfter").then((m) => m.ContactAfter));
const ContactQuestions = dynamic(() => import("@/components/sections/contact/ContactQuestions").then((m) => m.ContactQuestions));
const ContactGoodToKnow = dynamic(() => import("@/components/sections/contact/ContactGoodToKnow").then((m) => m.ContactGoodToKnow));

export function ContactPage() {
  return (
    <>
      <PageAtmosphere preset="contact" />

      {/* ── 1 · Hero : la promesse, et le formulaire en vitrine (sombre, id="formulaire") ── */}
      <ContactHeroSection />

      {/* ── 2 · Après votre message : quatre objets réels (clair, id="apres") ── */}
      <ContactAfter />

      {/* ── 3 · Les questions qu'on me pose souvent (sombre) ── */}
      <ContactQuestions />

      {/* ── 4 · Bon à savoir, puis retour au formulaire et email direct (clair) ── */}
      <ContactGoodToKnow />
    </>
  );
}
