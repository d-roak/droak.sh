import experienceData from "../../EXPERIENCE_DATA.json";
import blogPosts from "../../BLOG_POSTS.json";

interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
}

export function getExperienceData(): Experience[] {
  return experienceData as Experience[];
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts as BlogPost[];
}

export function getBlogPost(id: string): BlogPost | undefined {
  return (blogPosts as BlogPost[]).find(post => post.id === id);
}

export function formatExperience(): string {
  const data = getExperienceData();
  let output = `
╔═══════════════════════════════════════════════════════════════╗
║                      WORK EXPERIENCE                          ║
╚═══════════════════════════════════════════════════════════════╝

`;

  data.forEach((exp, index) => {
    output += `\n> ${exp.role}\n`;
    output += `  ${exp.company} • ${exp.location}\n`;
    output += `  ${exp.period}\n\n`;
    
    exp.description.forEach(desc => {
      output += `  • ${desc}\n`;
    });
    
    if (index < data.length - 1) {
      output += `\n${"─".repeat(65)}\n`;
    }
  });

  return output;
}

export function formatBlogList(): string {
  const posts = getBlogPosts();
  let output = `
╔═══════════════════════════════════════════════════════════════╗
║                           BLOG                                ║
╚═══════════════════════════════════════════════════════════════╝

📝 Posts:\n\n`;

  posts.forEach((post, index) => {
    const date = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    output += `  [${index + 1}] ${post.title}\n`;
    output += `      ${date}\n\n`;
  });

  return output;
}

export function formatBlogPost(id: string): string {
  const post = getBlogPost(id);
  
  if (!post) {
    return `Error: Blog post not found.\n\nUse 'blog' to see all posts.`;
  }

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
╔═══════════════════════════════════════════════════════════════╗
║  ${post.title.padEnd(61)}║
╚═══════════════════════════════════════════════════════════════╝

Published: ${date}

${post.content}

─────────────────────────────────────────────────────────────────

Type 'blog' to see all posts.
`;
}
