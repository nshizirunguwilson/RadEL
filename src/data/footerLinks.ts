export interface FooterLinkGroup {
  titleKey: "shop" | "company" | "support" | "legal";
  links: { label: string; href: string }[];
}

export const FOOTER_GROUPS: FooterLinkGroup[] = [
  {
    titleKey: "shop",
    links: [
      { label: "All jewelry", href: "/shop" },
      { label: "Earrings", href: "/shop/earrings" },
      { label: "Necklaces", href: "/shop/necklaces" },
      { label: "Rings", href: "/shop/rings" },
      { label: "Bracelets", href: "/shop/bracelets" },
      { label: "Pendants", href: "/shop/pendants" },
    ],
  },
  {
    titleKey: "company",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Journal", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Instagram", href: "https://instagram.com/nshizirungu.w" },
    ],
  },
  {
    titleKey: "support",
    links: [
      { label: "Track order", href: "/track" },
      { label: "Returns", href: "/legal/returns" },
      { label: "Shipping", href: "/legal/shipping" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    titleKey: "legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Returns", href: "/legal/returns" },
      { label: "Shipping", href: "/legal/shipping" },
    ],
  },
];

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/nshizirungu.w",
    icon: "instagram" as const,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@nshizirungu.w",
    icon: "tiktok" as const,
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/nshizirungu",
    icon: "pinterest" as const,
  },
];
