export interface PrimaryNavItem {
  labelKey: keyof import("./nav-keys").NavLabels;
  href: string;
  children?: PrimaryNavItem[];
}

export const PRIMARY_NAV: PrimaryNavItem[] = [
  { labelKey: "shop", href: "/shop" },
  { labelKey: "collections", href: "/shop?sort=featured" },
  { labelKey: "about", href: "/about" },
  { labelKey: "blog", href: "/blog" },
  { labelKey: "contact", href: "/contact" },
];
