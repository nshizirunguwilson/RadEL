import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FiChevronRight, FiStar } from "react-icons/fi";

import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/data/products";
import { CATEGORY_MAP } from "@/data/categories";
import { MATERIAL_LABEL, GEMSTONE_LABEL } from "@/data/materials";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantPicker } from "@/components/product/VariantPicker";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductCard } from "@/components/product/ProductCard";
import { RecentlyViewedTracker } from "@/components/product/RecentlyViewedTracker";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return PRODUCTS.flatMap((p) =>
    ["en", "fr"].map((locale) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const firstImage = product.images[0];
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: firstImage ? [{ url: firstImage.src, alt: firstImage.alt }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("product");
  const category = CATEGORY_MAP[product.category];
  const related = getRelatedProducts(product, 4);
  const firstVariant = product.variants[0];
  const lowestPrice = Math.min(...product.variants.map((v) => v.priceUSD));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((i) => i.src),
    sku: firstVariant?.sku,
    category: category?.name,
    brand: { "@type": "Brand", name: "RadEl" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: lowestPrice,
      highPrice: Math.max(...product.variants.map((v) => v.priceUSD)),
      offerCount: product.variants.length,
      availability: product.variants.some((v) => v.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    additionalProperty: [
      firstVariant
        ? {
            "@type": "PropertyValue",
            name: "Material",
            value: MATERIAL_LABEL[firstVariant.material],
          }
        : null,
      firstVariant && firstVariant.gemstone !== "none"
        ? {
            "@type": "PropertyValue",
            name: "Stone",
            value: GEMSTONE_LABEL[firstVariant.gemstone],
          }
        : null,
    ].filter(Boolean),
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecentlyViewedTracker productId={product.id} />

      <div className="container-wide pt-8 pb-4 text-xs text-meta">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-ink-strong">
            {t("breadcrumb.home")}
          </Link>
          <FiChevronRight aria-hidden className="h-3 w-3" />
          <Link href="/shop" className="hover:text-ink-strong">
            {t("breadcrumb.shop")}
          </Link>
          {category ? (
            <>
              <FiChevronRight aria-hidden className="h-3 w-3" />
              <Link
                href={`/shop/${category.slug}`}
                className="hover:text-ink-strong"
              >
                {category.name}
              </Link>
            </>
          ) : null}
          <FiChevronRight aria-hidden className="h-3 w-3" />
          <span className="text-ink-strong truncate max-w-[40ch]">
            {product.name}
          </span>
        </nav>
      </div>

      <section className="container-wide pb-16 grid gap-12 md:grid-cols-2 md:gap-14">
        <ProductGallery images={product.images} />
        <div>
          <div className="mb-3 flex items-center gap-1.5 text-xs text-meta">
            <FiStar aria-hidden className="h-3 w-3 fill-accent text-accent" />
            <span className="tabular-nums">
              {t("rating", {
                rating: product.rating.toFixed(1),
                count: product.reviewCount,
              })}
            </span>
          </div>
          <VariantPicker product={product} />
        </div>
      </section>

      <section className="container-wide pb-16">
        <ProductTabs product={product} />
      </section>

      {related.length > 0 ? (
        <section className="container-wide py-16 border-t border-divider">
          <h2 className="mb-8 font-display text-2xl text-ink-strong">
            {t("related")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      <RecentlyViewed excludeId={product.id} />
    </main>
  );
}
