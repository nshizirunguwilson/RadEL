import Image from "next/image";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BLOG_POSTS } from "@/data/blog";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ locale: string }>;

export const metadata = {
  title: "The Journal",
  description:
    "Letters on care, craft, and the quiet decisions that make fine jewelry worth wearing. From the RadEl atelier in Kigali.",
};

export default async function BlogIndexPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const sorted = BLOG_POSTS.slice().sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
  const [featured, ...rest] = sorted;

  return (
    <main id="main">
      <section className="container-editorial py-16 md:py-20 text-center">
        <p className="eyebrow">{t("title")}</p>
        <h1 className="mt-4 max-w-xl mx-auto">The Journal.</h1>
        <p className="mt-5 max-w-md mx-auto text-ink leading-relaxed">
          {t("body")}
        </p>
      </section>

      {featured ? (
        <section className="container-wide pb-16">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="relative aspect-[16/7] overflow-hidden rounded-sm bg-surface">
              <Image
                src={featured.coverImage}
                alt={featured.coverAlt}
                fill
                sizes="100vw"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-6 max-w-2xl">
              <p className="eyebrow">
                {t("featured")} · {featured.category}
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-ink-strong group-hover:text-ink transition-colors">
                {featured.title}
              </h2>
              <p className="mt-4 text-ink leading-relaxed">{featured.excerpt}</p>
              <p className="mt-4 text-xs text-meta tracking-[0.1em] uppercase">
                {formatDate(featured.publishedAt)} ·{" "}
                {t("readingTime", { minutes: featured.readingMinutes })}
              </p>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="container-wide pb-24">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
                <Image
                  src={p.coverImage}
                  alt={p.coverAlt}
                  fill
                  sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs text-meta tracking-[0.1em] uppercase">
                {formatDate(p.publishedAt)} ·{" "}
                {t("readingTime", { minutes: p.readingMinutes })}
              </p>
              <h3 className="mt-2 font-display text-xl leading-tight text-ink-strong group-hover:text-ink transition-colors">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-meta leading-relaxed line-clamp-3">
                {p.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
