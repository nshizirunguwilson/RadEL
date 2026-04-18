import type {
  Category,
  Gemstone,
  Material,
  Product,
  SortOption,
} from "@/types/product";

export interface ShopFilterState {
  categories: Category[];
  materials: Material[];
  gemstones: Gemstone[];
  price: [number, number] | null;
  minRating: number;
  inStockOnly: boolean;
  tags: ("new" | "bestseller" | "sale" | "limited")[];
}

export const EMPTY_FILTERS: ShopFilterState = {
  categories: [],
  materials: [],
  gemstones: [],
  price: null,
  minRating: 0,
  inStockOnly: false,
  tags: [],
};

export function productMinPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.priceUSD));
}

export function productInStock(product: Product): boolean {
  return product.variants.some((v) => v.stock > 0);
}

export function applyFilters(
  products: Product[],
  filters: ShopFilterState,
): Product[] {
  return products.filter((p) => {
    if (filters.categories.length && !filters.categories.includes(p.category)) return false;
    if (
      filters.materials.length &&
      !p.variants.some((v) => filters.materials.includes(v.material))
    ) {
      return false;
    }
    if (
      filters.gemstones.length &&
      !p.variants.some((v) => filters.gemstones.includes(v.gemstone))
    ) {
      return false;
    }
    if (filters.price) {
      const [min, max] = filters.price;
      const price = productMinPrice(p);
      if (price < min || price > max) return false;
    }
    if (filters.minRating && p.rating < filters.minRating) return false;
    if (filters.inStockOnly && !productInStock(p)) return false;
    if (filters.tags.length && !filters.tags.some((tag) => p.tags.includes(tag))) {
      return false;
    }
    return true;
  });
}

export function applySort(products: Product[], sort: SortOption): Product[] {
  const sorted = products.slice();
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
    case "price-asc":
      return sorted.sort((a, b) => productMinPrice(a) - productMinPrice(b));
    case "price-desc":
      return sorted.sort((a, b) => productMinPrice(b) - productMinPrice(a));
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "bestseller":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "featured":
    default:
      return sorted.sort((a, b) => {
        const aScore =
          (a.tags.includes("bestseller") ? 2 : 0) +
          (a.tags.includes("limited") ? 1 : 0) +
          a.rating / 10;
        const bScore =
          (b.tags.includes("bestseller") ? 2 : 0) +
          (b.tags.includes("limited") ? 1 : 0) +
          b.rating / 10;
        return bScore - aScore;
      });
  }
}

export function countActiveFilters(filters: ShopFilterState): number {
  return (
    filters.categories.length +
    filters.materials.length +
    filters.gemstones.length +
    filters.tags.length +
    (filters.price ? 1 : 0) +
    (filters.minRating ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0)
  );
}

export function priceBounds(products: Product[]): [number, number] {
  const prices = products.flatMap((p) => p.variants.map((v) => v.priceUSD));
  if (!prices.length) return [0, 1000];
  return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
}
