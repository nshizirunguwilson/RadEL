import type { MetadataRoute } from "next";

import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BLOG_POSTS } from "@/data/blog";

const BASE = "https://rad-el.vercel.app";
const LOCALES = ["en", "fr"] as const;

const STATIC_PATHS = [
  "",
  "shop",
  "cart",
  "wishlist",
  "about",
  "contact",
  "blog",
  "faqs",
  "track",
  "search",
  "sign-in",
  "sign-up",
  "forgot-password",
  "legal/privacy",
  "legal/terms",
  "legal/shipping",
  "legal/returns",
];

function localized(path: string): { en: string; fr: string; default: string } {
  const segment = path ? `/${path}` : "";
  return {
    en: `${BASE}${segment}`,
    fr: `${BASE}/fr${segment}`,
    default: `${BASE}${segment}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    const alts = localized(path);
    for (const locale of LOCALES) {
      entries.push({
        url: alts[locale],
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.6,
        alternates: { languages: { en: alts.en, fr: alts.fr } },
      });
    }
  }

  for (const cat of CATEGORIES) {
    const alts = localized(`shop/${cat.slug}`);
    for (const locale of LOCALES) {
      entries.push({
        url: alts[locale],
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: { en: alts.en, fr: alts.fr } },
      });
    }
  }

  for (const p of PRODUCTS) {
    const alts = localized(`product/${p.slug}`);
    for (const locale of LOCALES) {
      entries.push({
        url: alts[locale],
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: { languages: { en: alts.en, fr: alts.fr } },
      });
    }
  }

  for (const post of BLOG_POSTS) {
    const alts = localized(`blog/${post.slug}`);
    for (const locale of LOCALES) {
      entries.push({
        url: alts[locale],
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: { languages: { en: alts.en, fr: alts.fr } },
      });
    }
  }

  return entries;
}
