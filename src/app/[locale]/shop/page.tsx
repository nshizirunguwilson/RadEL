import { setRequestLocale, getTranslations } from "next-intl/server";

import { ShopClient } from "@/components/shop/ShopClient";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shop");
  return {
    title: t("title"),
    description:
      "Recycled 18k gold jewelry, made in small runs at our Kigali atelier — earrings, necklaces, rings, bracelets, anklets, pendants.",
  };
}

export default async function ShopPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shop");

  return (
    <main id="main" className="container-wide py-12 md:py-16">
      <header className="mb-10 md:mb-14">
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-3 max-w-2xl">The full atelier ledger.</h1>
        <p className="mt-4 max-w-xl text-sm text-meta">
          Every piece lives on the same bench in Kigali — filter by material,
          stone, or form.
        </p>
      </header>
      <ShopClient />
    </main>
  );
}
