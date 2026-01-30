# droak.sh Website Update - Project Plan

**Started:** 2026-01-30  
**Status:** Phase 3 ✅ COMPLETE (Blog system with markdown support)  
**Branch:** main

## Requirements

1. ✅ Keep pastel vibe for new icons
2. 🔄 Implement shell (make visible on all devices)
3. ⏳ Add experience section
4. ⏳ Remove "Documents"
5. ⏳ Add blog section with markdown-based system
6. ⏳ Remove "Knowledge"
7. ⏳ Refactor code while keeping it minimal

## Task Breakdown

### Phase 1: Cleanup & Shell (Est: 30 min) ✅ COMPLETED
- [x] Task 1.1: Remove "Documents" button and window
- [x] Task 1.2: Remove "Knowledge" button
- [x] Task 1.3: Make Shell visible on all devices (changed to `md:col-span-6 lg:col-span-12`)
- [x] Task 1.4: Test basic functionality (build + verify) ✅ Build successful

### Phase 2: Experience Section (Est: 45 min) ✅ COMPLETED
- [x] Task 2.1: Design experience data structure (using EXPERIENCE_DATA.json)
- [x] Task 2.2: Create experience window component
- [x] Task 2.3: Find/create pastel icon for Experience (briefcase.svg)
- [x] Task 2.4: Add to main grid
- [x] Task 2.5: Test and refine (build successful)

### Phase 3: Blog System (Est: 2 hours) ✅ COMPLETED
- [x] Task 3.1: Design markdown blog architecture
- [x] Task 3.2: Create blog post data structure (BLOG_POSTS.json)
- [x] Task 3.3: Implement markdown parser/renderer (marked.js)
- [x] Task 3.4: Create blog listing window
- [x] Task 3.5: Create blog post viewer window
- [x] Task 3.6: Find/create pastel icon for Blog (plasticine style)
- [x] Task 3.7: Add sample blog posts (3 posts)
- [x] Task 3.8: Test navigation and rendering (build successful)

### Phase 4: Refactor & Polish (Est: 1 hour)
- [ ] Task 4.1: Review and simplify window components
- [ ] Task 4.2: Extract common patterns
- [ ] Task 4.3: Optimize bundle size
- [ ] Task 4.4: Update README
- [ ] Task 4.5: Final testing

## Progress Tracking

**Last worked:** 2026-01-30 06:35 UTC  
**Current task:** Phase 3 ✅ COMPLETE  
**Next phase:** Phase 4 - Refactor & Polish  
**Commit:** (pending) - Phase 3 complete  
**Estimated completion:** Phase 2-3 ✅ Done, Phase 4 - TBD

## Questions / Missing Info

✅ **All questions answered:**
1. Experience data: Extracted from cv.pdf → stored in EXPERIENCE_DATA.json (no name/contacts)
2. Blog metadata: Publishing date + title only (no author name, tags optional)
3. Color palette: Use existing pastels (#89aed8 blue, #88d7b6 green, #f283a4 red, #f7ecde yellow)
4. Markdown parser: Use **marked.js** (lightweight, ~22kb minified)

## Technical Details

**Pastel Palette:**
- pastel-blue: #89aed8
- pastel-green: #88d7b6
- pastel-red: #f283a4
- pastel-yellow: #f7ecde
- pastel-grey: #91949b
- pastel-dark-grey: #7f808b

**Dependencies to add:**
- marked.js for markdown parsing (~22kb)

## Notes

- Working in feature branch to avoid breaking production
- Each phase can be committed separately for incremental progress
- Cron job will work through phases with breaks to preserve quota
- Experience data extracted and stored in EXPERIENCE_DATA.json
- No personal identifiable information (name/contacts) will be displayed
