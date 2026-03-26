# Commit Style Guide

## Purpose

This note defines a commit writing style that is easier to summarize into a human-readable changelog.

It is designed to fit the repository's move toward a Keep a Changelog style `CHANGELOG.md`.

## Preferred Style

Prefer short, imperative commit subjects that clearly describe the user-visible or repository-visible change.

Good examples:

- `Add structured resume content and jq validator`
- `Render resume content in single-page-cv`
- `Document single-page-cv tech stack`
- `Use relative links in docs`
- `Remove local skills directory`

## Prefer These Verbs

Use these verbs when possible:

- `Add`
- `Change`
- `Fix`
- `Remove`
- `Document`
- `Refactor`
- `Update`

These verbs map more cleanly to changelog sections such as:

- `Added`
- `Changed`
- `Fixed`
- `Removed`

## Avoid

Avoid vague subjects like:

- `Update codes`
- `Test`
- `Up docs`
- `Misc changes`

These subjects are hard to group into a useful changelog.

## Good Rule

A commit subject should answer:

- what changed
- in which area
- in one short line

Example:

- `Add local single-page-cv workflow and locale switch`

This is much better than:

- `Update files`

## Related Documents

- [index.md](./index.md)
- [react-nextjs-learning-guide.md](./react-nextjs-learning-guide.md)
