import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { BLOG_POSTS } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export async function BlogPreview() {
  const t = await getTranslations("home.blog");
  const blogT = await getTranslations("blog");
  const posts = BLOG_POSTS.slice(0, 3);
  return (
    <section className="container-wide py-20">
      <div className="flex items-end justify-between gap-6 mb-10">
        <div>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-3">{t("title")}</h2>
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-block text-sm text-ink-strong underline underline-offset-4 decoration-accent"
        >
          {t("viewAll")}
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
              <Image
                src={post.coverImage}
                alt={post.coverAlt}
                fill
                sizes="(min-width:768px) 30vw, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 text-xs text-meta tracking-[0.1em] uppercase">
              {formatDate(post.publishedAt)} · {blogT("readingTime", { minutes: post.readingMinutes })}
            </p>
            <h3 className="mt-2 font-display text-xl leading-tight text-ink-strong group-hover:text-ink transition-colors">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-meta leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
