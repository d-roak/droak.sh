export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
}

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
    return {
      id,
      title: meta.title ?? id,
      date: meta.date ?? "",
      content,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
