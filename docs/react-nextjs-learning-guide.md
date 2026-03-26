# React + Next.js Learning Guide

## Purpose

This document is a practical learning guide for a developer who:

- already learned basic JavaScript
- is familiar with ES5 / ES6 syntax
- has some jQuery experience
- has less than 1 year of real implementation experience

The goal is not to become a React expert in one step.

The goal is:

- to become able to read, modify, and gradually extend this repository's `single-page-cv/` app

## Starting Point

Given your background, you do **not** need to start from:

- advanced frontend architecture
- state management libraries
- performance optimization theory
- complicated React patterns

You should start from:

1. modern JavaScript usage in components
2. React rendering basics
3. Next.js app structure
4. hands-on changes inside this repository

## Mental Model Shift

If you come from jQuery, the biggest difference is this:

### jQuery style

- find DOM nodes
- update DOM manually
- bind events directly

### React style

- describe UI from data
- let React render the DOM
- update data or state, then let UI re-render

In short:

- jQuery often asks: "How do I change this element?"
- React asks: "What should the UI look like for this data?"

That mental shift is the most important thing to understand early.

## What You Need To Learn First

Learn these topics in this order.

### 1. Modern JavaScript for UI Work

You should already know some of this, but you need to be comfortable with it in practice:

- `const` and `let`
- objects and arrays
- destructuring
- template strings
- arrow functions
- `map()`
- `filter()`
- `async/await`
- `import` / `export`

Why this matters:

React components are mostly JavaScript functions plus JSX.

### 2. JSX

You need to understand:

- JSX looks like HTML, but it is JavaScript syntax
- you can put JavaScript expressions inside `{ }`
- attributes are written in JSX style

Examples in this repository:

- [page.js](/home/hong/repos/resume/single-page-cv/src/app/page.js)

### 3. React Components

You need to understand:

- a component is a function that returns UI
- components can receive `props`
- components can be reused

In this repository, a simple example is:

- `Section({ title, children })`

This is already a good learning example because it is small and concrete.

### 4. Rendering Lists

This is one of the most important React basics.

You should understand:

- how `array.map()` turns data into UI
- why each item needs a `key`

Examples in this repository:

- `experience.map(...)`
- `projects.map(...)`
- `skills.map(...)`

### 5. Conditional Rendering

You need to get used to patterns like:

- render something only if data exists
- render fallback content if data is missing

Examples:

- `project.repository ? (...) : null`
- `job.technologies?.length ? (...) : null`

### 6. Next.js App Router Basics

You do not need to learn all of Next.js at once.

Start with:

- `src/app/page.js` is the page
- `src/app/layout.js` is the layout wrapper
- `src/app/globals.css` is the global stylesheet
- `npm run dev` starts local development
- `npm run build` checks production build behavior

That is enough to begin making useful changes in this repo.

## What This Repo Already Gives You

This repository is actually a good learning playground because it already separates a few concerns.

You can learn from these files:

- [resume.en.json](/home/hong/repos/resume/content/resume.en.json)
- [resume.zh.json](/home/hong/repos/resume/content/resume.zh.json)
- [page.js](/home/hong/repos/resume/single-page-cv/src/app/page.js)
- [layout.js](/home/hong/repos/resume/single-page-cv/src/app/layout.js)
- [globals.css](/home/hong/repos/resume/single-page-cv/src/app/globals.css)

This means:

- content lives in JSON
- page rendering lives in React / Next.js
- styles live in CSS

That is a clean enough structure for learning.

## Recommended Learning Path

## Phase 1: Read and Change Data Only

Goal:

- get comfortable seeing data turn into UI

What to do:

1. open [resume.en.json](/home/hong/repos/resume/content/resume.en.json)
2. change:
   - `summary`
   - one skill item
   - one project description
3. run:

```bash
cd single-page-cv
npm run dev
```

4. refresh the page and see how the content changes

What you learn:

- data-driven UI
- how the page depends on structured content

## Phase 2: Read and Change JSX Structure

Goal:

- understand how the page is assembled

What to do:

1. open [page.js](/home/hong/repos/resume/single-page-cv/src/app/page.js)
2. identify:
   - `ResumePage`
   - `Section`
   - each `.map(...)` block
3. make small safe changes:
   - move `Projects` above `Experience`
   - rename a section title
   - hide `Certifications` temporarily

What you learn:

- how React components return UI
- how sections are composed
- how list rendering works

## Phase 3: Change CSS

Goal:

- connect structure with appearance

What to do:

1. open [globals.css](/home/hong/repos/resume/single-page-cv/src/app/globals.css)
2. change:
   - font size
   - spacing
   - colors
   - section borders
3. reload the page and observe the result

What you learn:

- how UI structure and CSS connect
- how React and CSS stay separate

## Phase 4: Add a Small Feature

Goal:

- move from editing to implementation

Suggested beginner features in this repo:

1. add a `Summary` section title instead of just showing summary text in the header
2. show `technologies` under `projects` only when present
3. add a `Website` link if `basics.website` exists
4. add a small `locale` badge in the page header

What you learn:

- conditional rendering
- safe branching in JSX
- extending an existing component

## Phase 5: Add Language Switching

Goal:

- learn how data source changes affect UI

Suggested exercise:

1. make the page able to read either:
   - `resume.en.json`
   - `resume.zh.json`
2. start with a simple implementation

This can be done later with:

- search params
- route params
- separate routes

Why this is a good exercise:

- it is realistic
- it uses your actual repo
- it teaches data loading and rendering flow

## What Not To Learn Too Early

Do not start with these unless you already feel comfortable with the basics:

- Redux
- Zustand
- React performance micro-optimizations
- `useMemo` / `useCallback` overuse
- complex hooks patterns
- advanced SSR / caching details
- large component architecture patterns

These topics are useful later, but they will slow you down at the start.

## Key Differences From jQuery

This mapping can help you translate old habits into React thinking.

| jQuery habit | React / Next.js equivalent mindset |
| --- | --- |
| select an element and mutate it | describe the UI from data and render it |
| manually append HTML | use JSX and `map()` |
| bind DOM event handlers directly | attach handlers in components |
| update text with DOM APIs | change data or state and re-render |
| build UI by imperative steps | build UI declaratively |

## Suggested Weekly Practice Plan

If you want a simple practice rhythm:

### Week 1

- read `page.js`
- read `globals.css`
- change JSON content
- run `npm run dev`

### Week 2

- make small JSX layout edits
- reorder sections
- rename labels
- adjust CSS spacing and typography

### Week 3

- implement one small feature
- add one new field from JSON to the page
- make one conditional rendering improvement

### Week 4

- implement simple `en / zh` switching
- clean up repeated code
- re-read the code and explain it to yourself

## Good Learning Habits For This Repo

Recommended habit:

1. make one small change
2. refresh the page
3. verify what changed
4. commit in small steps

This is better than trying to rewrite many things at once.

Also recommended:

- keep `page.js` open while reading the browser output
- compare JSON content and rendered UI side by side
- use Git commits as learning checkpoints

## Practical First Tasks For You

If you want concrete tasks to start with, do these in order:

1. change the order of sections in [page.js](/home/hong/repos/resume/single-page-cv/src/app/page.js)
2. add a new contact field from `basics`
3. change skills display from tags back to plain text, then change it again
4. render `resume.zh.json` instead of `resume.en.json`
5. add a simple language toggle

These tasks are small enough to finish and valuable enough to teach you real React / Next.js usage.

## When To Learn Hooks

You do **not** need hooks immediately for this repo as it stands now.

Learn hooks after you are comfortable with:

- JSX
- components
- props
- list rendering
- simple data loading

Then learn:

- `useState`
- `useEffect`

Only after that should you explore more advanced hooks.

## Recommended Goal

A realistic short-term goal is:

**be able to independently modify `single-page-cv/src/app/page.js` and `globals.css` without fear**

That is already enough to make meaningful contributions to this project.

## Related Documents

- [index.md](/home/hong/repos/resume/docs/index.md)
- [single-page-cv-tech-stack.md](/home/hong/repos/resume/docs/single-page-cv-tech-stack.md)
- [content-model.md](/home/hong/repos/resume/docs/content-model.md)
- [rearchitecture-plan.md](/home/hong/repos/resume/docs/rearchitecture-plan.md)
