export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Sites web", href: "/sites-web" },
      { label: "Applications", href: "/applications" },
      { label: "Agents IA", href: "/agents-ia" },
      { label: "Automatisation", href: "/automatisation" },
      { label: "Studio visuel", href: "/studio-visuel" },
    ],
  },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  navigation: [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Sites web premium", href: "/sites-web" },
    { label: "Applications", href: "/applications" },
    { label: "Agents IA", href: "/agents-ia" },
    { label: "Automatisation", href: "/automatisation" },
    { label: "Studio visuel", href: "/studio-visuel" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/confidentialite" },
    { label: "Cookies", href: "/cookies" },
    { label: "CGV", href: "/cgv" },
  ],
};
