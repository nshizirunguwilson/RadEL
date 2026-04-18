import { readFile } from "node:fs/promises";
import path from "node:path";

export async function loadPostMdx(slug: string): Promise<string> {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  return readFile(filePath, "utf8");
}
