export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  tagSlugs: string[];
  draft: boolean;
  content: string;
}

export interface BlogTag {
  name: string;
  slug: string;
  count: number;
}

const slugify = (s: string): string =>
  s.toLowerCase().trim().replace(/\s+/g, "-");

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    }
  }
  return { meta, content: match[2].trim() };
}

const modules = import.meta.glob("./posts/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const id = path.replace("./posts/", "").replace(".md", "");
    const { meta, content } = parseFrontmatter(raw);
    const tags = meta.tags
      ? meta.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    return {
      id,
      title: meta.title ?? id,
      date: meta.date ?? "",
      tags,
      tagSlugs: tags.map(slugify),
      draft: meta.draft === "true",
      content,
    };
  })
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const blogTags: BlogTag[] = (() => {
  const map = new Map<string, BlogTag>();
  for (const post of blogPosts) {
    for (let i = 0; i < post.tags.length; i++) {
      const slug = post.tagSlugs[i];
      const existing = map.get(slug);
      if (existing) existing.count++;
      else map.set(slug, { name: post.tags[i], slug, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => a.slug.localeCompare(b.slug));
})();
