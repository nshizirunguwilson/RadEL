import { getTranslations } from "next-intl/server";

import { getOnSale } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export async function FlashSale() {
  const t = await getTranslations("home.flashSale");
  const items = getOnSale(4);

  if (items.length === 0) return null;

  return (
    <section className="bg-ink-strong text-bg">
      <div className="container-wide py-20">
        <div className="mb-10 max-w-xl">
          <p className="eyebrow text-accent">{t("eyebrow")}</p>
          <h2 className="mt-3 text-bg" style={{ color: "var(--color-bg)" }}>{t("title")}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
