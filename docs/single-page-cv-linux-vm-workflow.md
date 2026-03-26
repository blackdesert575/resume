# Single Page CV Linux VM Workflow

## Purpose

This note describes the shortest practical workflow for developing `single-page-cv/` on a local Linux machine or Linux VM.

It assumes:

- the repository is already cloned
- Node.js and npm are available
- you want to work on the React / Next.js resume page locally

## Shortest Workflow

From the repository root:

```bash
bash scripts/install_single-page-cv_deps.sh
bash scripts/dev_single-page-cv.sh
```

Then open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will automatically choose another port such as `3001`.

## Recommended Day-to-Day Flow

### 1. Install dependencies

Run this once after clone, or again after dependency changes:

```bash
bash scripts/install_single-page-cv_deps.sh
```

This runs:

```bash
cd single-page-cv
npm ci
```

## 2. Start the dev server

Run:

```bash
bash scripts/dev_single-page-cv.sh
```

This runs:

```bash
cd single-page-cv
npm run dev
```

What this gives you:

- local dev server
- automatic rebuild on file changes
- live feedback while editing

## 3. Edit the app

The most important files to change are:

- [`single-page-cv/src/app/page.js`](../single-page-cv/src/app/page.js)
- [`single-page-cv/src/app/globals.css`](../single-page-cv/src/app/globals.css)
- [`content/resume.en.json`](../content/resume.en.json)
- [`content/resume.zh.json`](../content/resume.zh.json)

Typical edit loop:

1. change JSON content or page code
2. refresh browser
3. verify result

## 4. Build for production check

When you want to verify the app can build:

```bash
bash scripts/build_single-page-cv_local.sh
```

This runs:

```bash
cd single-page-cv
npm run build
```

## 5. Run the production server locally

After a successful build:

```bash
bash scripts/start_single-page-cv.sh
```

This runs:

```bash
cd single-page-cv
npm run start
```

Use this when you want to verify behavior closer to production mode.

## 6. Quick local smoke test

If you want one command that builds and starts:

```bash
bash scripts/test_single-page-cv_local.sh
```

This is a simple local smoke-test workflow, not a full automated test suite.

## Current Known Caveat

At the moment:

- `npm run build` works
- `npm run dev` works
- `npm run lint` currently fails due to an existing ESLint / Next.js config issue

Observed error:

```text
Cannot serialize key "parse" in "parser": Function values are not supported.
```

So for now, the practical local workflow is:

- use `dev`
- use `build`
- do not rely on `lint` until that config issue is fixed

## Stop The Dev Server

When running in the terminal, stop it with:

```bash
Ctrl+C
```

## Minimal Command Set

If you only want the smallest useful command set, remember these:

```bash
bash scripts/install_single-page-cv_deps.sh
bash scripts/dev_single-page-cv.sh
bash scripts/build_single-page-cv_local.sh
```

## Related Documents

- [index.md](./index.md)
- [single-page-cv-tech-stack.md](./single-page-cv-tech-stack.md)
- [react-nextjs-learning-guide.md](./react-nextjs-learning-guide.md)
