import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { CATEGORIES, CATEGORY_MAP } from "@/data/categories";
import type { Category } from "@/types/product";
import { ShopClient } from "@/components/shop/ShopClient";

type Params = Promise<{ locale: string; category: string }>;

export function generateStaticParams() {
  return CATEGORIES.flatMap((c) =>
    ["en", "fr"].map((locale) => ({ locale, category: c.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;
  const info = CATEGORY_MAP[category as Category];
  if (!info) return {};
  return {
    title: info.name,
    description: info.description,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const info = CATEGORY_MAP[category as Category];
  if (!info) notFound();

  return (
    <main id="main" className="container-wide py-12 md:py-16">
      <header className="mb-10 md:mb-14">
        <p className="eyebrow">Category</p>
        <h1 className="mt-3 max-w-2xl">{info.name}</h1>
        <p className="mt-4 max-w-xl text-sm text-meta">{info.description}</p>
      </header>
      <ShopClient initialCategory={info.slug} />
    </main>
  );
}
