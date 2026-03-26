# Web PDF Generation Options

## Purpose

This document records the recommended options for generating PDF files from the React / Next.js version of this repository.

It exists to answer this question:

**If `single-page-cv/` becomes the main web renderer, how should we generate English and Chinese PDF files in the future?**

## Current State

Right now, the production PDF files are still generated from LaTeX sources:

- `src/yh_resume.tex` -> `src/yh_resume.pdf`
- `src/yh_resume_cht.tex` -> `src/yh_resume_cht.pdf`

At the same time:

- `single-page-cv/` can now render content from:
  - `content/resume.en.json`
  - `content/resume.zh.json`

So the repository is now in a hybrid stage:

- LaTeX is still the current PDF renderer
- Next.js is the web renderer
- `single-page-cv/` now also has a first implementation of PDF generation with `@react-pdf/renderer`

## Core Decision

The key question is not whether JavaScript can generate PDF.

It can.

The real question is:

**Which PDF generation approach best fits this repository's goals, maintenance cost, and output quality requirements?**

## Current Implementation Status

After comparing the available options, this repository has started implementing PDF generation with `@react-pdf/renderer`.

Current commands:

- `cd single-page-cv && npm run pdf:generate`
- `bash scripts/generate_single-page-cv_pdf.sh`

Current outputs:

- `single-page-cv/public/yh_resume.pdf`
- `single-page-cv/public/yh_resume_cht.pdf`

Current implementation notes:

- both PDFs are generated from `content/*.json`
- the PDF renderer uses a dedicated React PDF component tree
- the existing Next.js web UI remains separate
- this means the repository currently has:
  - LaTeX PDF generation
  - web UI rendering with Next.js
  - React PDF generation with `@react-pdf/renderer`

## Main Options

There are three realistic approaches.

### Option 1: Keep LaTeX as the PDF Renderer

Flow:

- `content/*.json`
- web renderer: `single-page-cv/`
- PDF renderer: LaTeX

This means the project keeps LaTeX for formal PDF output while React / Next.js handles the website.

#### Pros

- highest PDF layout quality
- very strong control over print layout
- mature handling for formal resume output
- lowest risk for job-application PDF quality

#### Cons

- PDF and web use different renderer stacks
- long-term maintenance means keeping two renderers aligned
- data-to-LaTeX generation still needs to be improved if content becomes fully data-driven

#### Recommendation

Best short-term choice if PDF quality is still the top priority.

## Option 2: Browser-Based PDF Generation From the Web App

Flow:

- Next.js renders the resume page
- a browser automation tool loads:
  - `/?lang=en`
  - `/?lang=zh`
- the page is printed to PDF

Typical tools:

- Playwright
- Puppeteer
- browser print flow with `window.print()` and print CSS

#### Pros

- best fit for the current `single-page-cv/` architecture
- web and PDF can share the same layout direction
- English and Chinese switching becomes straightforward
- less duplication than maintaining a separate PDF-only renderer

#### Cons

- print layout quality is usually lower than LaTeX
- print CSS and pagination need careful work
- fonts, margins, and page breaks need environment-specific handling
- CI needs browser support

#### Recommendation

Best medium-term experiment for this repository.

If we want `single-page-cv/` to become the main product surface, this is the most practical PDF path to prototype first.

## Option 3: React-Specific PDF Renderer

Flow:

- write PDF-specific React components
- render them using a PDF renderer instead of the DOM

Typical tool:

- `@react-pdf/renderer`

#### Pros

- React-based development model
- more structured than low-level PDF drawing libraries
- does not depend on browser printing

#### Cons

- usually requires a separate PDF component tree
- does not automatically reuse the browser DOM layout
- still creates two renderer paths:
  - web React components
  - PDF React components

#### Recommendation

This is now the selected implementation path for the first web-native PDF prototype in this repository.

The tradeoff is explicit:

- better alignment with the React / JavaScript ecosystem
- but a separate PDF-specific component tree is required

## Direct Comparison: Playwright / Puppeteer vs `@react-pdf/renderer`

| Topic | Playwright / Puppeteer | `@react-pdf/renderer` |
| --- | --- | --- |
| Main idea | print the existing web page to PDF | render a separate PDF document using React components |
| Reuse of current `single-page-cv/` UI | high | low to medium |
| Reuse of current CSS | high with print CSS work | low |
| Need separate PDF-only components | usually no | usually yes |
| Fit for current `?lang=en` / `?lang=zh` flow | very natural | natural for data loading, but not for DOM reuse |
| Layout model | browser layout engine | React PDF layout engine |
| Print and page-break tuning | required | required, but done in a different renderer model |
| CI/runtime dependency | browser runtime | Node runtime plus PDF renderer |
| Best use in this repo | first prototype path | second option if browser-print output is not acceptable |

### When Playwright / Puppeteer Is the Better Choice

Choose Playwright / Puppeteer first if the goal is:

- reuse the existing `single-page-cv/` page as much as possible
- keep one main visual layout direction for both web and PDF
- reduce duplicate component maintenance
- quickly compare web-generated PDF against the current LaTeX output

This is why it is the best first experiment for this repository.

### When `@react-pdf/renderer` Becomes More Attractive

Choose `@react-pdf/renderer` only if we decide that:

- browser-print-based PDF quality is not acceptable
- we still want to stay inside the React / JavaScript ecosystem
- we are willing to maintain a PDF-specific component tree
- we want to leave LaTeX in the future without depending on Chromium-based printing

This makes it a valid option, but not the most efficient starting point for the current repository state.

## Tools That Exist but Are Not a Good Fit Here

These tools can generate PDF, but they are not the best fit for this repository's current direction:

- `pdf-lib`
- `PDFKit`
- `jsPDF`

Why not:

- they are lower-level
- they require manual layout logic
- they are much less natural for a resume site already built in Next.js
- they do not help reuse the existing web renderer

For this project, they would increase implementation burden more than they would simplify it.

## Recommended Path For This Repository

### Short-Term

Keep LaTeX as the official reference PDF renderer while the React PDF output matures.

Reason:

- it is already working
- PDF quality is still strongest there
- it avoids introducing PDF regressions while the React PDF renderer is still maturing

### Medium-Term

Continue refining the `@react-pdf/renderer` implementation from `single-page-cv/`.

Recommended tool:

- **`@react-pdf/renderer`**

Why this path was chosen:

- keeps the PDF workflow inside the React / JavaScript ecosystem
- uses the same structured content model as the web renderer
- does not require a browser runtime to generate PDF

### Long-Term

Compare the output of:

- LaTeX PDF
- React-generated PDF

Then decide whether:

1. LaTeX stays as the long-term PDF renderer
2. React-generated PDF becomes good enough to replace it

## Suggested Future Workflow

With the current `@react-pdf/renderer` implementation, the flow is:

### English PDF

- export PDF: `resume.en.pdf`

### Chinese PDF

- export PDF: `resume.zh.pdf`

This allows both language variants to share:

- content model
- locale-specific copy
- output naming rules

## Technical Requirements For `@react-pdf/renderer`

With the current React PDF path, we need:

- A4 page sizing
- PDF-only layout styling
- page break control
- stable font handling
- Chinese font support in CI / local environments

These are the main implementation concerns.

## Recommended Implementation Order

Do not replace LaTeX immediately.

Recommended order:

1. keep LaTeX PDF generation as-is
2. continue maturing `single-page-cv/`
3. continue refining the React PDF component tree
4. improve typography, spacing, and section density
5. compare resulting PDFs with current LaTeX output
6. only then decide whether to replace LaTeX PDF generation

## Practical Recommendation

For this repository, the best current strategy is:

- **short-term:** LaTeX remains the official PDF output path
- **current experiment:** generate PDF from `single-page-cv/` with `@react-pdf/renderer`
- **do not start with low-level PDF drawing libraries**
- **do not replace LaTeX before output comparison**

## Future Follow-Up Document

If we decide to prototype web-based PDF generation, the next document to create should cover:

- PDF typography and spacing rules
- `@react-pdf/renderer` component organization
- English / Chinese PDF naming
- how to wire the PDF step into CI

## Related Documents

- [index.md](./index.md)
- [rearchitecture-plan.md](./rearchitecture-plan.md)
- [single-page-cv-tech-stack.md](./single-page-cv-tech-stack.md)
- [content-model.md](./content-model.md)
