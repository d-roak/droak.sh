import { baseWindow } from "../shared/base-window";
import { marked } from "marked";
import blogPosts from "../../BLOG_POSTS.json";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
}

export const openBlog = () => {
  if (<HTMLSpanElement>document.getElementById("blog")) return;
  const content = document.createElement("div");
  content.id = "blog";
  content.className = "p-4 overflow-y-auto";
  
  let blogHTML = '<h1 class="font-semibold text-2xl mb-6">Blog</h1>';
  
  blogHTML += '<div class="space-y-4">';
  
  (blogPosts as BlogPost[]).forEach((post: BlogPost) => {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    blogHTML += `
      <div class="border-l-4 border-pastel-blue pl-4 py-2 hover:bg-pastel-yellow hover:bg-opacity-20 cursor-pointer transition-colors" data-post-id="${post.id}">
        <h2 class="font-semibold text-lg text-pastel-dark-grey mb-1">${post.title}</h2>
        <p class="text-xs text-pastel-grey">${formattedDate}</p>
      </div>
    `;
  });
  
  blogHTML += '</div>';
  
  content.innerHTML = blogHTML;
  
  // Add click handlers to open individual posts
  content.querySelectorAll('[data-post-id]').forEach((el) => {
    el.addEventListener('click', () => {
      const postId = el.getAttribute('data-post-id');
      if (postId) {
        openBlogPost(postId);
      }
    });
  });

  baseWindow("w-96 h-96 md:w-[500px] md:h-[450px]", content);
};

export const openBlogPost = (postId: string) => {
  const post = (blogPosts as BlogPost[]).find((p: BlogPost) => p.id === postId);
  
  if (!post) return;
  
  // Close the blog list if open
  const blogList = document.getElementById("blog");
  if (blogList) {
    const parent = blogList.closest('.fixed');
    if (parent) {
      parent.remove();
    }
  }
  
  const content = document.createElement("div");
  content.id = `blog-post-${postId}`;
  content.className = "p-4 overflow-y-auto";
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const renderedContent = marked(post.content);
  
  content.innerHTML = `
    <div class="mb-6">
      <button class="text-sm text-pastel-blue hover:underline mb-3" id="back-to-blog">← Back to Blog</button>
      <p class="text-xs text-pastel-grey mb-2">${formattedDate}</p>
    </div>
    <div class="prose prose-sm max-w-none">
      ${renderedContent}
    </div>
  `;
  
  const window = baseWindow("w-96 h-96 md:w-[600px] md:h-[500px]", content);
  
  // Add back button handler
  const backButton = content.querySelector('#back-to-blog');
  if (backButton) {
    backButton.addEventListener('click', () => {
      const postWindow = content.closest('.fixed');
      if (postWindow) {
        postWindow.remove();
      }
      openBlog();
    });
  }
  
  return window;
};
