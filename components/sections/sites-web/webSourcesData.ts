import {
  Link2,
  Mail,
  MapPin,
  Megaphone,
  MessagesSquare,
  Newspaper,
  QrCode,
  Search,
  Share2,
  Star,
  type LucideIcon,
} from "lucide-react";

/**
 * /sites-web, section 2 : d'où viennent réellement vos clients.
 * Trois familles de canaux, qui aboutissent toutes au même site, puis à une demande
 * exploitable. Aucun chiffre : c'est un schéma de principe, pas une statistique.
 */

export type SourceFamily = {
  key: "cherchent" | "decouvrent" | "connaissent";
  title: string;
  moment: string;
  channels: { label: string; icon: LucideIcon }[];
  /** Couleur du trait de convergence, en token. */
  stroke: string;
};

export const SOURCE_FAMILIES: SourceFamily[] = [
  {
    key: "cherchent",
    title: "Ils vous cherchent",
    moment: "Ils ont un besoin maintenant et tapent quelques mots.",
    channels: [
      { label: "Recherche Google", icon: Search },
      { label: "Recherche locale", icon: MapPin },
      { label: "Cartes et avis", icon: Star },
    ],
    stroke: "var(--color-cyan)",
  },
  {
    key: "decouvrent",
    title: "Ils vous découvrent",
    moment: "Ils ne vous connaissaient pas, un contenu les amène.",
    channels: [
      { label: "Réseaux sociaux", icon: Share2 },
      { label: "Articles et vidéos", icon: Newspaper },
      { label: "Partenaires", icon: Megaphone },
    ],
    stroke: "var(--color-accent-light)",
  },
  {
    key: "connaissent",
    title: "Ils vous connaissent déjà",
    moment: "On leur a parlé de vous, ou ils sont déjà clients.",
    channels: [
      { label: "Bouche-à-oreille", icon: MessagesSquare },
      { label: "QR code", icon: QrCode },
      { label: "E-mail", icon: Mail },
      { label: "Lien direct", icon: Link2 },
    ],
    stroke: "var(--color-accent-primary)",
  },
];

/** Ce que le site fait de chaque visite, quelle que soit son origine. */
export const SITE_ROLE = [
  "Dit clairement ce que vous faites",
  "Rassure avec du concret",
  "Propose une seule prochaine étape",
];

/** La demande exploitable : ce qui arrive chez vous. */
export const USABLE_REQUEST = [
  { label: "Qui", value: "Nom et entreprise" },
  { label: "Besoin", value: "Ce qu'il attend" },
  { label: "Délai", value: "Pour quand" },
  { label: "Source", value: "D'où il vient" },
];

export const SOURCES_CLOSING =
  "Le site ne remplace aucun de ces canaux : c'est là qu'ils aboutissent. Et comme chaque demande garde sa source, vous savez enfin lesquels vous amènent vraiment du travail.";
