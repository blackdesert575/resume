# Single Page CV Tech Stack

## Purpose

This document summarizes the current frontend stack used by `single-page-cv/`.

It focuses on:

- framework choice
- declared package versions
- current app structure
- build and lint behavior observed in this repository

## High-Level Summary

`single-page-cv/` is currently a **Next.js** application using the **App Router** model.

Its role in the repository is evolving from:

- a PDF viewer wrapper

toward:

- a web-native renderer for resume content stored in `content/*.json`

## Primary Framework

The main web framework is:

- **Next.js**

The app also uses:

- **React**
- **React DOM**

This is a modern React-based frontend stack, not a plain static HTML page and not a traditional multi-page server-rendered app.

## Declared Package Versions

According to [`single-page-cv/package.json`](../single-page-cv/package.json):

- `next`: `^15.5.10`
- `react`: `^19.0.0`
- `react-dom`: `^19.0.0`
- `eslint`: `^9.31.0`
- `eslint-config-next`: `15.1.6`
- `@eslint/eslintrc`: `^3`

## Lockfile State

According to [`single-page-cv/package-lock.json`](../single-page-cv/package-lock.json), the app is also intended to resolve against:

- `next`: `^15.5.10`
- `react`: `^19.0.0`
- `react-dom`: `^19.0.0`

So from the repository metadata, the intended frontend stack is:

- Next.js 15.x
- React 19

## Observed Runtime / Build State

When the app was run locally in this repository, the Next.js CLI output showed:

- `Next.js 15.4.2`

This is important because it does **not** exactly match the `package.json` declaration of `^15.5.10`.

This suggests one of the following:

- local installed dependencies are older than the declared target
- `node_modules` is not fully synchronized with the current dependency metadata
- there is version drift between installed packages and the expected lockfile resolution

In short:

- **declared target**: Next.js `^15.5.10`
- **observed local runtime during build/dev**: Next.js `15.4.2`

## Rendering Model

The app is using the **App Router** layout under:

- [`single-page-cv/src/app/layout.js`](../single-page-cv/src/app/layout.js)
- [`single-page-cv/src/app/page.js`](../single-page-cv/src/app/page.js)

Current rendering characteristics:

- route is defined under `src/app/`
- page rendering is server-side compatible
- current page reads JSON content from the parent repository directory:
  - [`content/resume.en.json`](../content/resume.en.json)

This means the current web renderer is already moving toward a content-driven model.

## Styling Approach

Global styling is handled through:

- [`single-page-cv/src/app/globals.css`](../single-page-cv/src/app/globals.css)

Current styling characteristics:

- plain CSS
- no Tailwind CSS
- no CSS-in-JS runtime
- no component library

So the current frontend styling approach is:

- **Next.js + React + global CSS**

## Fonts

According to [`single-page-cv/src/app/layout.js`](../single-page-cv/src/app/layout.js), the app uses:

- `next/font/google`
- `Geist`
- `Geist_Mono`

This means font loading is handled through Next.js font optimization instead of manual `<link>` tags.

## Build Configuration

According to [`single-page-cv/next.config.mjs`](../single-page-cv/next.config.mjs):

- `output: "standalone"`

This indicates the app is configured to support standalone deployment packaging.

## Lint Configuration

Lint configuration is defined in:

- [`single-page-cv/eslint.config.mjs`](../single-page-cv/eslint.config.mjs)

It currently uses:

- `FlatCompat` from `@eslint/eslintrc`
- `next/core-web-vitals`

## Scripts

According to [`single-page-cv/package.json`](../single-page-cv/package.json), available scripts are:

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Current Build / Lint Status

Observed behavior in this repository:

- `npm run build`: **works**
- `npm run dev`: **works**
- `npm run lint`: **fails**

Observed lint error:

```text
Cannot serialize key "parse" in "parser": Function values are not supported.
```

This appears to be a tooling/configuration issue in the current Next.js and ESLint setup, not a direct failure of the resume page content rendering.

## Current Frontend Stack Summary

The current `single-page-cv/` frontend stack can be summarized as:

- framework: Next.js
- UI library: React 19
- routing model: App Router
- styling: global CSS
- fonts: `next/font/google` with Geist
- deployment mode: standalone Next.js output
- content source direction: external JSON files under repository-level `content/`

## Practical Answer

If someone asks:

**What web framework is this app mainly using?**

Answer:

- **Next.js with React**

If someone asks:

**What JavaScript stack is this app using right now?**

Answer:

- **modern JavaScript with Next.js App Router and React 19**

If someone asks:

**Is this a plain HTML site or a framework app?**

Answer:

- it is a **framework-based Next.js app**

## Related Documents

- [index.md](./index.md)
- [rearchitecture-plan.md](./rearchitecture-plan.md)
- [content-model.md](./content-model.md)
