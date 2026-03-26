# Git Workflow Cheatsheet

## Purpose

This note explains the difference between `fetch`, `pull`, `merge`, and `rebase` in the context of this repository.

This repository has an important special case:

- you push source commits to `main`
- GitHub Actions may later push an additional CI-generated commit back to `origin/main`

That means your local `main` can become stale even if you did not make another local change.

## Short Difference Table

| Command | What it does | Changes local files immediately | Good fit in this repo |
| --- | --- | --- | --- |
| `git fetch` | Downloads remote branch updates | No | Check whether CI has pushed new commits to `origin/main` |
| `git pull` | `fetch` plus integrate remote changes into current branch | Yes | Fast shortcut when you already know you want to sync local `main` |
| `git merge` | Combines another branch into current branch with a merge commit when needed | Yes | Safe when you want to preserve branch history after CI moved remote branch |
| `git rebase` | Replays your local commits on top of a newer base | Yes | Useful when you want a cleaner linear history before pushing |

## In This Repo

Typical conflict pattern:

1. you push local commit `A`
2. GitHub Actions runs
3. GitHub Actions pushes CI commit `B` to `origin/main`
4. your local `main` does not contain `B`
5. you make local commit `C`
6. your next push may fail unless you sync first

## Recommended Sequence

When you suspect CI has updated `origin/main`, use this sequence:

```bash
git fetch origin main
git status --branch
git log --oneline --left-right HEAD...origin/main
```

This lets you inspect remote changes first without touching your current working tree.

## When To Use `fetch`

Use `fetch` when:

- you want to know whether remote changed
- you want to inspect `origin/main` before deciding what to do
- you do not want Git to auto-merge anything yet

In this repo, `fetch` is the safest first step before every push if CI may have written new commits.

## When To Use `pull`

Use `pull` when:

- you already know you want to sync now
- you are comfortable letting Git integrate remote changes immediately

Be careful:

- `git pull` is convenient
- but it hides two steps: `fetch` and integrate
- in this repo, that can be too implicit if you want to inspect CI-generated commits first

## When To Use `merge`

Use `merge` when:

- remote has new commits
- you want to bring them into your local branch
- you want to preserve the fact that histories diverged

Example:

```bash
git fetch origin main
git merge origin/main
```

Good fit in this repo when:

- CI pushed generated commit(s)
- you want the least surprising integration step
- you do not care about keeping a perfectly linear history

## When To Use `rebase`

Use `rebase` when:

- remote has new commits
- you want your local commits to appear on top of the latest remote history
- you prefer a cleaner linear history

Example:

```bash
git fetch origin main
git rebase origin/main
```

Good fit in this repo when:

- CI pushed commit(s) after your last sync
- your local branch has not been shared yet beyond your own pending push
- you want to avoid extra merge commits

## Practical Rule For This Repo

Recommended default:

1. `git fetch origin main`
2. inspect whether `origin/main` moved
3. if remote moved, choose either:
   - `git merge origin/main`
   - `git rebase origin/main`
4. then `git push`

## Simple Decision Rule

Use:

- `fetch` first, almost always
- `merge` if you want the safer and more explicit integration path
- `rebase` if you want a cleaner history and understand the implications
- `pull` only if you intentionally want Git to do fetch plus integration in one step

## Suggested Habit

For the current repository workflow, this is a good habit:

```bash
git fetch origin main
git status --branch
git log --oneline --left-right HEAD...origin/main
```

Then decide:

- no remote change: `git push`
- remote changed: `merge` or `rebase`, then `git push`

## Real Example From This Repo

This repository already produced a real case of CI-induced branch divergence.

Observed sequence:

1. local commit was created:
   - `a706712` `Add git workflow cheatsheet`
2. before pushing, `git fetch origin main` was run
3. after fetch, branch state became:
   - `ahead 1, behind 1`
4. comparison showed:
   - local-only commit: `a706712 Add git workflow cheatsheet`
   - remote-only commit: `453a0d8 Commit from GitHub Actions (ci)`
5. local branch was reconciled with:

```bash
git merge origin/main --no-edit
```

6. merge succeeded and created:
   - `e26c525` `Merge remote-tracking branch 'origin/main'`
7. merged branch was then pushed successfully

The key point is:

- the divergence was not caused by a second human edit
- it was caused by GitHub Actions writing a CI-generated commit to `origin/main`

This is exactly why `git fetch` is the safest first step in this repository before pushing.

## Related Documents

- [index.md](/home/hong/repos/resume/docs/index.md)
- [current-workflow.md](/home/hong/repos/resume/docs/current-workflow.md)
- [future-workflow.md](/home/hong/repos/resume/docs/future-workflow.md)
