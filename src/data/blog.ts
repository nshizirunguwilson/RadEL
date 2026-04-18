export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  category: "journal" | "guides" | "atelier" | "style";
  coverImage: string;
  coverAlt: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "choosing-your-everyday-hoop",
    title: "Choosing your everyday hoop",
    excerpt:
      "Weight, diameter, and hinge feel are the three things to check. A short guide to finding the hoop you won't notice you're wearing.",
    author: "The RadEl atelier",
    publishedAt: "2026-03-24",
    readingMinutes: 5,
    category: "guides",
    coverImage:
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Pair of polished gold hoop earrings on a warm neutral surface",
    tags: ["earrings", "guides", "sizing"],
  },
  {
    slug: "inside-the-kigali-atelier",
    title: "Inside the Kigali atelier",
    excerpt:
      "A morning in the room where the pieces are made. Wax carving, polishing, and the one tool nobody replaces.",
    author: "Wilson Nshizirungu",
    publishedAt: "2026-02-11",
    readingMinutes: 7,
    category: "atelier",
    coverImage:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Detail of jeweler's bench with tools and a gold piece in progress",
    tags: ["behind the scenes", "craft"],
  },
  {
    slug: "why-14k-vs-18k",
    title: "Why 14k or 18k — and when it matters",
    excerpt:
      "The difference between 14k and 18k is smaller than most retailers make it sound. Here's the honest version.",
    author: "The RadEl atelier",
    publishedAt: "2026-01-17",
    readingMinutes: 6,
    category: "guides",
    coverImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Cluster of gold rings in mixed karats on a stone surface",
    tags: ["materials", "guides"],
  },
  {
    slug: "layering-without-tangles",
    title: "Layering without tangles",
    excerpt:
      "Four rules for wearing three chains at once without spending the day untwisting them.",
    author: "Beatrice N.",
    publishedAt: "2025-12-02",
    readingMinutes: 4,
    category: "style",
    coverImage:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Layered gold chains arranged on warm linen",
    tags: ["necklaces", "styling"],
  },
  {
    slug: "engraving-a-small-word",
    title: "On engraving, and the case for a small word",
    excerpt:
      "Why a date is often the wrong engraving, and what to write on a bar that will outlast both of you.",
    author: "Wilson Nshizirungu",
    publishedAt: "2025-10-18",
    readingMinutes: 5,
    category: "journal",
    coverImage:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Small pendant with engraved surface on a fabric backdrop",
    tags: ["journal", "engraving"],
  },
  {
    slug: "caring-for-pearls",
    title: "Caring for pearls",
    excerpt:
      "Pearls are organic and they remember. A straightforward routine for keeping them the way you bought them.",
    author: "The RadEl atelier",
    publishedAt: "2025-08-30",
    readingMinutes: 4,
    category: "guides",
    coverImage:
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=1600&q=80",
    coverAlt: "Freshwater pearl strand on soft ecru paper",
    tags: ["pearls", "care", "guides"],
  },
];

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogPostMeta["category"]): BlogPostMeta[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getRelatedPosts(post: BlogPostMeta, limit = 3): BlogPostMeta[] {
  return BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)),
  )
    .slice(0, limit);
}
