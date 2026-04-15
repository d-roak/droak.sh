# droak.sh

Personal website built with React 18 + [@droak/wterm](https://github.com/d-roak/wterm) (terminal UI component library).

## Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Components**: @droak/wterm (Box, Tabs, List, Dialog, StatusBar, Input, Button, NavProvider, useFocusable)
- **Package manager**: pnpm
- **Deployment**: GitHub Pages via GitHub Actions

## Structure

```
src/
  App.tsx              # Root: NavProvider + Tabs + StatusBar + hash routing
  App.css              # All styles
  main.tsx             # Entry point
  pages/
    home/              # Home tab: about, metrics, projects
    experience/        # Experience tab: work history from JSON
    blog/              # Writings tab: md files with frontmatter, side-by-side reader
    login/             # Login tab (right-aligned)
data/                  # All content as JSON files
  about.json
  experience.json
  metrics.json
  projects.json
  socials.json
```

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build to `dist/`
- `pnpm preview` — preview production build

## Conventions

- Data/constants live in `/data/*.json`, not inline in components
- Blog posts are `.md` files with YAML frontmatter in `src/pages/blog/posts/`
- Experience descriptions support HTML tags (rendered via dangerouslySetInnerHTML)
- Icons: use [Phosphor Icons](https://phosphoricons.com/) (`@phosphor-icons/react`)
- No workspace — single package at project root

## Git

- **Never commit automatically** — only when explicitly asked
- Conventional Commits: `type(scope): description` (one-liner, no body)
- No AI attribution in commits
