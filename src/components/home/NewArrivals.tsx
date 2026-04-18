import { getTranslations } from "next-intl/server";

import { getNewArrivals } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export async function NewArrivals() {
  const t = await getTranslations("home.arrivals");
  const items = getNewArrivals(6);
  return (
    <section className="container-wide py-20">
      <div className="mb-10 max-w-xl">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-3">{t("title")}</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
