# droak.sh

Personal website with a desktop-style interface built with TypeScript and Tailwind CSS.

## Features

- **Desktop-style UI**: Interactive window system with draggable components
- **Shell Terminal**: Command-line interface for navigation
- **Experience Section**: Professional work history
- **Blog System**: Markdown-powered blog with sample posts
- **Social Media Links**: Quick access to social profiles
- **Contacts**: Get in touch
- **Animated Icons**: Smooth CSS animations on all interface elements

## Tech Stack

- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Webpack**: Module bundling
- **marked.js**: Markdown parsing for blog posts
- **GitHub Pages**: Hosting and deployment

## Development

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The built files are in /public
```

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions on every push to `main`.

## Project Structure

```
droak.sh/
├── public/          # Static assets and build output
│   ├── assets/      # Icons and fonts
│   └── static/      # Generated CSS
├── src/             # TypeScript source
│   ├── windows/     # Window components (blog, contacts, etc.)
│   ├── shell/       # Terminal shell
│   └── shared/      # Shared utilities
├── BLOG_POSTS.json  # Blog content
├── EXPERIENCE_DATA.json  # Work experience
└── PROJECT_PLAN.md  # Development roadmap
```

## License

Personal website - all rights reserved.
