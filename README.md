# droak.sh

Terminal-style personal website with interactive command-line interface.

## Features

- **Full Terminal Interface**: Interactive CLI experience in the browser
- **Command System**: Type commands or click clickable elements
- **Fast Rendering**: Lightweight, minimal dependencies
- **Dark Theme**: Modern terminal aesthetic with neon accents
- **History & Autocomplete**: Arrow keys for history, Tab for autocomplete
- **Markdown Blog**: Blog system with markdown support

## Commands

```bash
help         # Show available commands
experience   # View work history
blog         # List blog posts
contact      # Contact information
social       # Social media links
about        # About this site
clear        # Clear terminal
```

## Tech Stack

- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Webpack**: Module bundling
- **marked.js**: Markdown parsing
- **GitHub Pages**: Hosting

## Project Structure

```
droak.sh/
├── public/              # Static assets
│   ├── assets/          # Fonts and favicons
│   ├── static/          # Generated CSS and JS
│   └── index.html       # Entry point
├── src/                 # Source code
│   ├── terminal.ts      # Terminal implementation
│   ├── index.ts         # App initialization
│   ├── data/            # Data loader utilities
│   └── style.css        # Styles
├── BLOG_POSTS.json      # Blog content
└── EXPERIENCE_DATA.json # Work experience
```

## Development

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Output: public/static/bundle/script.js
```

## Deployment

Automatically deployed to GitHub Pages via GitHub Actions on push to `main`.

## Design

- **Color Palette**: Deep navy (#0A0E27) with cyan (#00D9FF), purple (#7B61FF), and green (#00FF88) accents
- **Typography**: JetBrains Mono (terminal), Inter (fallback)
- **Bundle Size**: ~17KB (minified + gzipped)
- **Theme**: Brutalist terminal meets modern minimalism

## License

Personal website - all rights reserved.
