export type Category =
  | "earrings"
  | "necklaces"
  | "rings"
  | "bracelets"
  | "anklets"
  | "pendants";

export type Material =
  | "gold-18k"
  | "gold-14k"
  | "rose-gold"
  | "white-gold"
  | "silver-925"
  | "platinum";

export type Gemstone =
  | "none"
  | "diamond"
  | "sapphire"
  | "emerald"
  | "ruby"
  | "pearl"
  | "topaz"
  | "amethyst"
  | "citrine";

export type ProductTag = "new" | "bestseller" | "sale" | "limited" | "handcrafted";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size?: string;
  material: Material;
  gemstone: Gemstone;
  priceUSD: number;
  compareAtUSD?: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  materialsAndCare: string;
  shippingAndReturns: string;
  images: ProductImage[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  tags: ProductTag[];
  relatedIds: string[];
  publishedAt: string;
}

export interface ProductFilterState {
  categories: Category[];
  materials: Material[];
  gemstones: Gemstone[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "bestseller";
