# Documentation Index

## Purpose

This directory records the current workflow, the future workflow, and the planned repository rearchitecture for this resume project.

Recommended reading order:

1. [current-workflow.md](/home/hong/repos/resume/docs/current-workflow.md)
2. [future-workflow.md](/home/hong/repos/resume/docs/future-workflow.md)
3. [git-workflow-cheatsheet.md](/home/hong/repos/resume/docs/git-workflow-cheatsheet.md)
4. [single-page-cv-tech-stack.md](/home/hong/repos/resume/docs/single-page-cv-tech-stack.md)
5. [rearchitecture-plan.md](/home/hong/repos/resume/docs/rearchitecture-plan.md)
6. [content-model.md](/home/hong/repos/resume/docs/content-model.md)

## Documents

### [current-workflow.md](/home/hong/repos/resume/docs/current-workflow.md)

Describes the current operational flow:

- local development on VM
- push to GitHub
- GitHub Actions CI
- Cloudflare Pages deployment
- branch conflicts caused by CI writing back to the same branch

Read this first if the goal is to understand the current pain points.

### [future-workflow.md](/home/hong/repos/resume/docs/future-workflow.md)

Describes the recommended future CI/CD workflow:

- CI validates and builds
- CI does not push generated commits back to the working branch
- deployment consumes source revisions or build artifacts directly

Read this after `current-workflow.md` to compare current and target workflows.

### [git-workflow-cheatsheet.md](/home/hong/repos/resume/docs/git-workflow-cheatsheet.md)

Explains the practical difference between:

- `git fetch`
- `git pull`
- `git merge`
- `git rebase`

Read this when you need to resolve CI-induced remote branch movement safely.

### [single-page-cv-tech-stack.md](/home/hong/repos/resume/docs/single-page-cv-tech-stack.md)

Summarizes the current frontend stack used by `single-page-cv/`, including:

- Next.js and React versions
- App Router structure
- styling approach
- build and lint status
- current content-loading direction

Read this when you want to understand what web stack the current resume app is actually using.

### [rearchitecture-plan.md](/home/hong/repos/resume/docs/rearchitecture-plan.md)

Describes the repository-level redesign:

- content-driven architecture
- separation of source content and renderers
- Next.js as web renderer
- LaTeX as current PDF renderer
- staged migration plan

Read this after the workflow documents to understand how the repository should evolve structurally.

### [content-model.md](/home/hong/repos/resume/docs/content-model.md)

Defines the future content schema for:

- `content/resume.en.json`
- `content/resume.zh.json`

Read this when implementing the first data-driven content layer.

## Suggested Navigation By Goal

If you want to understand why branch conflicts happen:

- start with [current-workflow.md](/home/hong/repos/resume/docs/current-workflow.md)

If you want to understand how to remove CI/CD-induced branch conflicts:

- read [future-workflow.md](/home/hong/repos/resume/docs/future-workflow.md)

If you want to understand the full repository refactor direction:

- read [rearchitecture-plan.md](/home/hong/repos/resume/docs/rearchitecture-plan.md)

If you want to start implementation of the new content layer:

- read [content-model.md](/home/hong/repos/resume/docs/content-model.md)

## Next Recommended Implementation Steps

1. create `content/resume.en.json`
2. create `content/resume.zh.json`
3. add schema validation
4. make the web renderer consume validated content
5. refactor PDF generation to consume the same content model
