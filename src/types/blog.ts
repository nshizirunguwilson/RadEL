export interface BlogFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  author: string;
  authorRole?: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  featured?: boolean;
}

export type BlogCategory = "care" | "guides" | "style" | "stories" | "trends";

export interface BlogPost extends BlogFrontmatter {
  content: string;
  readingMinutes: number;
}

export const BLOG_CATEGORY_LABEL: Record<BlogCategory, string> = {
  care: "Care",
  guides: "Guides",
  style: "Style",
  stories: "Stories",
  trends: "Trends",
};
