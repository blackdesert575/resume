# Documentation Index

## Purpose

This directory records the current workflow, the future workflow, and the planned repository rearchitecture for this resume project.

Recommended reading order:

1. [current-workflow.md](./current-workflow.md)
2. [future-workflow.md](./future-workflow.md)
3. [git-workflow-cheatsheet.md](./git-workflow-cheatsheet.md)
4. [single-page-cv-tech-stack.md](./single-page-cv-tech-stack.md)
5. [react-nextjs-learning-guide.md](./react-nextjs-learning-guide.md)
6. [single-page-cv-linux-vm-workflow.md](./single-page-cv-linux-vm-workflow.md)
7. [commit-style.md](./commit-style.md)
8. [rearchitecture-plan.md](./rearchitecture-plan.md)
9. [content-model.md](./content-model.md)

## Documents

### [current-workflow.md](./current-workflow.md)

Describes the current operational flow:

- local development on VM
- push to GitHub
- GitHub Actions CI
- Cloudflare Pages deployment
- branch conflicts caused by CI writing back to the same branch

Read this first if the goal is to understand the current pain points.

### [future-workflow.md](./future-workflow.md)

Describes the recommended future CI/CD workflow:

- CI validates and builds
- CI does not push generated commits back to the working branch
- deployment consumes source revisions or build artifacts directly

Read this after `current-workflow.md` to compare current and target workflows.

### [git-workflow-cheatsheet.md](./git-workflow-cheatsheet.md)

Explains the practical difference between:

- `git fetch`
- `git pull`
- `git merge`
- `git rebase`

Read this when you need to resolve CI-induced remote branch movement safely.

### [single-page-cv-tech-stack.md](./single-page-cv-tech-stack.md)

Summarizes the current frontend stack used by `single-page-cv/`, including:

- Next.js and React versions
- App Router structure
- styling approach
- build and lint status
- current content-loading direction

Read this when you want to understand what web stack the current resume app is actually using.

### [react-nextjs-learning-guide.md](./react-nextjs-learning-guide.md)

Provides a practical learning path for someone who already knows basic JavaScript and jQuery, but has limited real React / Next.js implementation experience.

Read this when you want to start contributing code to `single-page-cv/` yourself instead of only reading the code passively.

### [single-page-cv-linux-vm-workflow.md](./single-page-cv-linux-vm-workflow.md)

Provides the shortest practical workflow for running and testing `single-page-cv/` on a local Linux machine or Linux VM.

Read this when you want the minimum set of commands to install dependencies, start the dev server, and verify production build behavior.

### [commit-style.md](./commit-style.md)

Defines a simple commit subject style that is easier to summarize into a Keep a Changelog style changelog.

Read this when you want future commit messages to stay short, consistent, and easier to turn into human-readable release notes.

### [rearchitecture-plan.md](./rearchitecture-plan.md)

Describes the repository-level redesign:

- content-driven architecture
- separation of source content and renderers
- Next.js as web renderer
- LaTeX as current PDF renderer
- staged migration plan

Read this after the workflow documents to understand how the repository should evolve structurally.

### [content-model.md](./content-model.md)

Defines the future content schema for:

- `content/resume.en.json`
- `content/resume.zh.json`

Read this when implementing the first data-driven content layer.

## Suggested Navigation By Goal

If you want to understand why branch conflicts happen:

- start with [current-workflow.md](./current-workflow.md)

If you want to understand how to remove CI/CD-induced branch conflicts:

- read [future-workflow.md](./future-workflow.md)

If you want to understand the full repository refactor direction:

- read [rearchitecture-plan.md](./rearchitecture-plan.md)

If you want to start implementation of the new content layer:

- read [content-model.md](./content-model.md)

## Next Recommended Implementation Steps

1. create `content/resume.en.json`
2. create `content/resume.zh.json`
3. add schema validation
4. make the web renderer consume validated content
5. refactor PDF generation to consume the same content model
