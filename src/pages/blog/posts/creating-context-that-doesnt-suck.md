---
title: creating context that doesn't suck
date: 2026-05-04
tags: agents, workflow, knowledge base
---

---

**Tags:** `agents` · `workflow` · `knowledge base`  
**Published:** 04 may 2026

---

The first thing most people do (or should) with Claude Code is write a `CLAUDE.md`. Then they add more to it. Then more. Six months later it's 200 lines of mixed stuff: git conventions, architecture decisions, personal preferences. Every session loads all of it regardless of what the task actually needs.

You're burning context on your commit style guide when all Claude needs to do is fix a typo. That's the problem. It's not catastrophic, it's just wasting tokens.

---

## Why your CLAUDE.md sucks

Every time Claude got something wrong, you added a line. Every time you switched projects/context, you pasted in more boilerplate. The file became a graveyard of past frustrations.

The deeper issue is structural: `CLAUDE.md` is a flat file loaded whole on every session. There's no lazy loading, no relevance filtering, no hierarchy. Everything is equally "important," which means nothing is.

```
Session: fix a CSS bug
Context loaded: git conventions, deploy checklist,
                TypeScript naming rules, personal output preferences,
                API architecture...
Actually needed: nothing from CLAUDE.md
```

Context window is finite. Every token of irrelevant config is a token that could've been code, error output, or actual task context.

---

## The fix is boringly simple

Split your context into two things: a minimal CLAUDE.md, and a structured knowledge base (KB).

```
  ~/.claude/CLAUDE.md          ./CLAUDE.md
  (global · <10 lines)         (per-project · <15 lines)
         │                            │
         │ fetch rule                 │ project facts
         │                            │
         ▼                            │
    ~/.agents-kb/  ◄──────────────────┘
    (knowledge base)
         │
         │ on demand
         ▼
    current session
```

The global file at `~/.claude/CLAUDE.md` is loaded by Claude Code in every project, every session. It holds exactly one thing: how to find the KB. The per-project `CLAUDE.md` holds exactly one thing: facts specific to this project. The KB holds everything else, and Claude fetches only what the task needs.

That's it. The whole system.

---

## What goes into the CLAUDE.md files

The global/project split is the most important thing to get right. Here's what goes where:

```
┌──────────────────────────────────────────┐  ┌──────────────────────────────────────┐
│  ~/.claude/CLAUDE.md                     │  │  ./CLAUDE.md                         │
│  write once · applies everywhere         │  │  per repo                            │
│                                          │  │                                      │
│  ✓  KB path: ~/.agents-kb/               │  │  ✓  project name                     │
│  ✓  fetch rule                           │  │  ✓  primary language                 │
│  ✓  nothing else                         │  │  ✓  monorepo / polyrepo shape        │
│                                          │  │  ✓  team rules                       │
│                                          │  │  ✓  nothing else                     │
└──────────────────────────────────────────┘  └──────────────────────────────────────┘

  ✗  never: fetch rule in a project file
  ✗  never: project context in the global file
  ✗  never: conventions, commands, architecture in either
```

If either file grows past 15 lines, something is wrong. Content that doesn't belong in those 15 lines belongs in the KB.

---

## The knowledge base structure

The KB lives at `~/.agents-kb/` as its own git repo. The rule is simple: **every directory at every depth has an `index.md`**. That index lists immediate children with one-line summaries. Nothing else, no content duplication.

Navigation always follows the same chain:

```
  ~/.agents-kb/     section/        subsection/
    index.md   ───►  index.md  ───►   index.md  ───► topic.md
  [root index]       [section       [subsection      [the actual
                      index]         index]            content]
```

Subdirectories only get created when a topic has **3 or more docs**. Otherwise it stays flat. This prevents the KB from becoming its own maze.

A real example of what this looks like:

```
~/.agents-kb/
  index.md                          # root: lists all sections + purpose
  conventions/
    index.md                        # lists: typescript.md, git-workflow.md
    typescript.md                   # naming, imports, type patterns
    git-workflow.md                 # commits, branches, PR process
  architecture/
    index.md
    api-layer.md
  research/
    index.md
    market-making/                  # subdirectory: has 3+ docs
      index.md
      avellaneda-stoikov.md
      glft.md
      calibration.md
    cointegration.md
  preferences/
    index.md
    output-style.md
```

Each topic doc starts with a single comment line: what it covers and when to load it. Dense, factual, no filler. If you're writing prose in a KB doc, you're doing it wrong.

---

## Visualize it in Obsidian

The KB is just markdown files with wikilinks, which means Obsidian reads it natively, for free, with no extra setup.

Point Obsidian at `~/.agents-kb/` as a vault. Your index files become a navigable graph. Wikilinks between docs show up as edges. The graph view gives you a live map of everything Claude can reach.

```
  Obsidian vault: ~/.agents-kb/

  graph view (what it looks like):

        [index]
       /   |   \
      /    |    \
  [conv] [arch] [research]
    |  \           |      \
  [ts] [git]  [market-   [cointe-
                making]   gration]
                  |
          [avell] [glft] [calib]


  local graph (from research/index.md):

        [research/index]
        ┌──────┴──────┐
  [market-making/]  [cointegration]
    ┌────┼────┐
  [av] [glft] [cal]
```

A few Obsidian settings worth enabling for this use case:

- **Graph view → show orphans** — surfaces KB docs that aren't linked from any index. These are either forgotten files or docs that need to be added to their parent index.
- **Templates** — set up a template for new KB docs so the first-line summary format is always consistent.
- **Backlinks panel** — shows you which other docs reference the one you're reading. Useful for finding docs that have grown too broad and should be split.

---

## Don't let Claude write to main

Claude can propose changes to the KB, i.e. new docs, updates to existing ones, structural reorganization. But nothing lands on `main` without a review.

```
  Claude Code              ~/.agents-kb              GitHub PR
      │                         │                        │
      │── git checkout -b ─────►│                        │
      │   kb/update-topic       │                        │
      │                         │                        │
      │── write / update docs ─►│                        │
      │                         │                        │
      │── git commit ──────────►│                        │
      │                         │                        │
      │── gh pr create ─────────────────────────────────►│
      │                         │                        │
      │◄── PR URL ───────────────────────────────────────│
      │                         │                        │ you review
      │  stop. do not merge.    │                        │ & merge
```

Every change goes out as a branch and a `gh pr create`. The PR description must include what changed, why, a file-level diff summary, and anything flagged as `[inferred — verify]`.

This isn't bureaucracy. KB docs are instructions. Anything that writes to them without review is a trust surface. A bad doc can silently reshape Claude's behavior across every session. PRs are the review layer that keeps the KB trustworthy.

Branch naming convention:

| prefix               | when                                |
| -------------------- | ----------------------------------- |
| `kb/add-[topic]`     | new doc or subdirectory             |
| `kb/update-[topic]`  | changes to existing doc(s)          |
| `kb/refactor-[desc]` | structural changes, merges, renames |

---

## Compact before spawning subagents

This one comes up the moment you start running multi-agent workflows. The orchestrator has accumulated context, i.e. tool outputs, intermediate reasoning, fetched KB docs, partial results. Then it needs to spawn a subagent. If you pass the full context, you're burning tokens on noise. If you pass nothing, the subagent is flying blind.

The fix is a compaction step: before launching any subagent, the orchestrator distills the current context down to exactly what that subagent needs, no more.

```
  orchestrator context (large, accumulated)
  ┌─────────────────────────────────────────┐
  │ fetched KB docs (5 files)               │
  │ tool call results (3 rounds)            │
  │ intermediate reasoning                  │
  │ user messages                           │
  │ partial output drafts                   │
  └─────────────────────────────────────────┘
                     │
                     │  compact skill
                     ▼
  subagent context (lean, targeted)
  ┌─────────────────────────────────────────┐
  │ task: one clear sentence                │
  │ inputs: only what this agent needs      │
  │ constraints: relevant rules only        │
  │ output format: explicit                 │
  └─────────────────────────────────────────┘
```

Add this as a Claude skill, so the orchestrator can fetch and apply it before every subagent spawn. What it should look like:

```
# compact-context — distill current context before launching a subagent

## when to load this
Before spawning any subagent or Task tool call.

## the compaction template

Fill this out for each subagent before passing context to it:

  TASK
  One sentence. What should this agent produce or decide?
  No background, no history. Just the deliverable.

  INPUTS
  List only the facts, files, or outputs this specific agent needs.
  Do not include KB docs it won't reference.
  Do not include reasoning steps from prior agents.
  Do not include anything "might be useful."

  CONSTRAINTS
  Rules that apply to this agent's output only.
  Pull from KB if needed. Paste the relevant excerpt, not the full doc.

  OUTPUT FORMAT
  Exact format expected: json / markdown / code / plain text.
  Length expectation if relevant.

  CONTEXT FROM PRIOR STEPS (if any)
  Only include if directly needed to complete the task.
  Summarize. Never paste raw tool output unless precision matters.

## rules

- If you can't fill in TASK in one sentence, the subagent scope is too broad. Split it.
- If INPUTS exceeds 5 items, you're probably overfitting. Cut to what's essential.
- Never pass the orchestrator's full conversation history to a subagent.
- KB docs fetched by the orchestrator don't automatically transfer. Only include
  the specific excerpt the subagent needs.
```

The compaction skill works because it forces scope clarity before the subagent is even launched. If you can't fill out the template cleanly, the task definition is the problem, not the context.

```
  without compaction:

  orchestrator ──────────────────► subagent
  [full context]                      │
                                   works, but
                                   expensive and
                                   noisy reasoning

  with compaction:

  orchestrator ──► compact ──►  subagent
  [full context]    skill       [lean]
                                   │
                                faster, cheaper,
                                better focused
```

The compaction template also serves as a forcing function for the orchestrator. You can't write a one-sentence task if you don't actually know what you want the subagent to do. The template surfaces fuzzy thinking before it becomes a wasted API call.

---

## The bootstrap prompt

You can drop the following prompt into a Claude Code session to bootstrap your KB. It audits the project, proposes a KB tree, waits for your approval, then writes everything and opens a PR.

The path is `~/.agents-kb/`. Adjust if you want the KB to be somewhere else.

```
# KB Bootstrap

## Context
Two fixed paths. Understand both before touching anything:

  ~/.agents-kb/          # the knowledge base — its own git repo
  ~/.claude/CLAUDE.md    # global config — always loaded, every session

The KB fetch rule lives in ~/.claude/CLAUDE.md so it applies to every project.
Project-level CLAUDE.md files contain only project-specific context.
All KB changes go through a PR. Never commit to main directly.

## Index rule — applies everywhere

Every directory at any depth must have an index.md containing only:
- One-line description of this directory's scope
- Immediate children (files and subdirs) with one-line summaries
- For subdirs: note they have their own index.md
- No content duplication from child docs

Navigation: index.md → child index.md → topic doc.
Create a subdirectory only when a topic has 3 or more docs.

## Phase 1 — Audit

1. Read ~/.claude/CLAUDE.md if it exists. Preserve non-KB content.
2. Check ~/.agents-kb/ exists and has a GitHub remote. If not, create it,
   run git init, ask user to add remote before continuing.
3. Run: git checkout main && git pull inside agents-kb.
4. Read the current project's CLAUDE.md. Note every distinct concern.
5. If ~/.agents-kb/index.md exists, walk the existing structure.
6. Categorize each concern: new KB doc, update to existing, or project-level context.
7. Propose: KB tree diff + ~/.claude/CLAUDE.md content + project CLAUDE.md content.

Stop after phase 1 and wait for approval.

## Phase 2 — Branch + write KB

1. cd ~/.agents-kb && git checkout -b kb/bootstrap-initial
2. Write all KB files. Apply the index rule at every level.
3. For existing docs being updated: diff must be in the PR description.
4. Each topic doc first line: # one-line summary — when to load this doc
5. Uncertain content: [inferred — verify]
6. git add -A && git commit -m "kb: describe what changed"

## Phase 3 — Write global CLAUDE.md

Write ~/.claude/CLAUDE.md. Not part of the PR — local file only.
Merge carefully if it already exists. Do not drop existing lines silently.

KB block (keep file under 10 lines total):

  # knowledge base
  kb: ~/.agents-kb/ (main branch)
  start at ~/.agents-kb/index.md to find what exists.
  follow index.md files into subdirectories as needed, then fetch topic docs.
  treat unfetched docs as unknown — never infer their contents.

Then write (or update) ./CLAUDE.md: project name, language, shape.
Under 10 lines. No fetch rule.

## Phase 4 — Validate + open PR

- Every directory at every depth has an index.md?
- Every child appears in its parent index.md?
- ~/.claude/CLAUDE.md under 10 lines with KB block?
- Project CLAUDE.md under 10 lines, no fetch rule?
- Updated docs: diff described in PR body?

git push -u origin <branch>
gh pr create --title "kb: describe change" --body "..."

Output the PR URL. Stop. Do not merge.

## Constraints

- Never commit to main directly.
- Never write KB files into any project repo.
- Never put the fetch rule in a project CLAUDE.md.
- Never drop existing content from ~/.claude/CLAUDE.md without flagging it.
- Updating an existing KB doc is allowed — diff must be in the PR description.
- Requires gh CLI authenticated. If not, output push command + PR URL template.
```

---

## The thing that actually matters

None of this is clever. It's just a filesystem with indexes and a PR process. The insight is that context management for AI sessions has the same shape as any other information architecture problem: hierarchy, discoverability, and a trust boundary around writes.

A flat `CLAUDE.md` that grows forever fails all three. A structured KB with a global fetch rule and PR-gated writes passes all three.

Stop adding lines to your config file. Build the thing that scales.
