import type { Category } from "@/types/product";

export interface CategoryInfo {
  slug: Category;
  name: string;
  nameFr: string;
  description: string;
  descriptionFr: string;
  image: string;
  imageAlt: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "earrings",
    name: "Earrings",
    nameFr: "Boucles",
    description: "Studs, huggies, drops, and hoops — the pieces you reach for on autopilot.",
    descriptionFr: "Puces, créoles, pendantes — les pièces que vous saisissez sans y penser.",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Pair of gold hoop earrings on a warm neutral surface",
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    nameFr: "Colliers",
    description: "Chains, collars, and lariats in recycled gold and silver.",
    descriptionFr: "Chaînes, colliers et sautoirs en or recyclé et argent.",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Fine gold chain necklace arranged on stone",
  },
  {
    slug: "rings",
    name: "Rings",
    nameFr: "Bagues",
    description: "Solitaires, bands, and stackers. Sized precisely, resized for free.",
    descriptionFr: "Solitaires, alliances, empilables. Taillés précisément, retaillés gratuitement.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Cluster of gold rings on a neutral surface",
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    nameFr: "Bracelets",
    description: "Cuffs, tennis, and chain — built for everyday wrists.",
    descriptionFr: "Manchettes, rivières et chaînes — pensés pour le quotidien.",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Gold chain bracelet on warm linen",
  },
  {
    slug: "anklets",
    name: "Anklets",
    nameFr: "Chevilles",
    description: "Delicate ankle chains for the warmer months and barer rooms.",
    descriptionFr: "Chaînes de cheville délicates pour les mois chauds.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Fine gold anklet",
  },
  {
    slug: "pendants",
    name: "Pendants",
    nameFr: "Pendentifs",
    description: "A single stone, a meaningful symbol, a letter that matters.",
    descriptionFr: "Une pierre, un symbole, une lettre qui compte.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Pendant necklace with a single stone",
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
) as Record<Category, CategoryInfo>;
