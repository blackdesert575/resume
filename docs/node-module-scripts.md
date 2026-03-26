# Node Script Module Format

## Purpose

This note explains why some Node.js scripts in this repository use the `.mjs` extension instead of `.js`.

Examples:

- `scripts/generate_resume_tex.mjs`
- `single-page-cv/scripts/validate-content.mjs`

## Short Answer

These files use `.mjs` because they are written with the ES Module syntax:

```js
import { readFile } from "node:fs/promises";
```

Without extra project-wide configuration, Node.js treats `.mjs` as an ES Module file automatically.

## Why Not Just Use `.js`

Using `.js` with `import` / `export` usually requires one of these choices:

1. add `"type": "module"` to a `package.json`
2. switch the script back to CommonJS syntax such as:

```js
const { readFile } = require("node:fs/promises");
```

For this repository, `.mjs` is the safer option because:

- it keeps the ESM decision local to the script
- it does not change how other existing `.js` files behave
- it avoids forcing a repo-wide Node module format decision

## Why This Fits This Repo

This repository already mixes several toolchains:

- shell scripts
- LaTeX build scripts
- Next.js / React app code
- small standalone Node.js utility scripts

Using `.mjs` for standalone Node scripts keeps that boundary explicit:

- the script is Node-based
- the script uses ES Module syntax
- the rest of the repository does not need to change with it

## Practical Rule

In this repo:

- use `.mjs` for standalone Node scripts that use `import` / `export`
- keep `.js` for existing app files unless the surrounding package is already configured for ESM

## Related Documents

- [index.md](./index.md)
- [single-page-cv-tech-stack.md](./single-page-cv-tech-stack.md)
- [rearchitecture-plan.md](./rearchitecture-plan.md)
