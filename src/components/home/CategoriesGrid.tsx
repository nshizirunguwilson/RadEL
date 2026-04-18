import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { CATEGORIES } from "@/data/categories";

export async function CategoriesGrid() {
  const t = await getTranslations("home.categories");
  const nav = await getTranslations("nav.categories");

  return (
    <section className="container-wide py-20">
      <div className="mb-10 md:mb-14 max-w-xl">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-3">{t("title")}</h2>
        <p className="mt-4 text-ink text-base leading-relaxed">{t("body")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop/${cat.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-surface"
          >
            <Image
              src={cat.image}
              alt={cat.imageAlt}
              fill
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink-strong/10 group-hover:bg-ink-strong/20 transition-colors" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-bg">
              <p className="font-display text-2xl tracking-[-0.01em]">
                {nav(cat.slug)}
              </p>
              <p className="text-sm opacity-90 mt-1">{cat.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
