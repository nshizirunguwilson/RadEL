import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { loadPostMdx } from "@/lib/blog-content";
import { MdxContent } from "@/components/blog/MdxContent";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return BLOG_POSTS.flatMap((p) =>
    ["en", "fr"].map((locale) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, alt: post.coverAlt }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const t = await getTranslations("blog");
  const source = await loadPostMdx(slug);
  const related = getRelatedPosts(post, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "RadEl" },
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container-editorial py-12 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-meta hover:text-ink-strong"
        >
          <FiArrowLeft aria-hidden className="h-3.5 w-3.5" />
          {t("title")}
        </Link>

        <header className="mt-8 text-center">
          <p className="eyebrow">{post.category}</p>
          <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight text-ink-strong tracking-tight">
            {post.title}
          </h1>
          <p className="mt-5 text-sm text-meta">
            {post.author} · {formatDate(post.publishedAt)} ·{" "}
            {t("readingTime", { minutes: post.readingMinutes })}
          </p>
        </header>

        <div className="mt-12 relative aspect-[16/9] overflow-hidden rounded-sm bg-surface">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            fill
            sizes="(min-width:768px) 80vw, 100vw"
            priority
            className="object-cover"
          />
        </div>

        <div className="mt-12 md:mt-16 mx-auto max-w-prose">
          <MdxContent source={source} />
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-divider">
          <div className="container-wide py-16">
            <h2 className="mb-8 font-display text-2xl text-ink-strong">
              {t("related")}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
                    <Image
                      src={p.coverImage}
                      alt={p.coverAlt}
                      fill
                      sizes="(min-width:768px) 30vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-xs text-meta tracking-[0.1em] uppercase">
                    {formatDate(p.publishedAt)} ·{" "}
                    {t("readingTime", { minutes: p.readingMinutes })}
                  </p>
                  <h3 className="mt-2 font-display text-lg leading-tight text-ink-strong">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
