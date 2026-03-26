# Resume Project Rearchitecture Plan

## Background

This repository currently uses a LaTeX-first workflow:

- `src/*.tex` is the primary source of resume content
- `src/*.pdf` is generated from LaTeX
- `output/index.html` is generated from `pdf2htmlEX`
- `single-page-cv/` exists, but currently embeds the generated PDF instead of rendering resume content as a web-native page

This works for PDF delivery, but it keeps the web layer as a secondary output instead of a first-class product surface.

## Core Problem

The main issue is not framework choice. The main issue is that content, presentation, and delivery are coupled together.

Current consequences:

- Resume content is maintained mainly in LaTeX
- Web output is derived from PDF, not from structured data
- `pdf2htmlEX` output is difficult to maintain as a real website
- Multi-language support becomes harder over time
- CI/CD is centered around document conversion rather than content validation and renderer builds

## Target Direction

The long-term direction should be:

**content-driven architecture**

In practice, that means:

- resume content becomes the single source of truth
- LaTeX becomes one renderer
- Next.js becomes another renderer
- PDF and web are two delivery formats from the same content model

## Architecture Principles

### 1. Single Source of Truth

Resume content should move out of manually maintained LaTeX files and into structured data files.

Suggested formats:

- `JSON` if strict structure and tool interoperability are preferred
- `YAML` if authoring convenience is preferred

For this project, `JSON` is the safer default because it is easy to validate and use in both Node.js and script-based build flows.

### 2. Renderer Separation

Presentation layers should not own the resume content.

- LaTeX is responsible for PDF-quality typesetting
- Next.js is responsible for web-native rendering
- each renderer reads the same content model

### 3. Incremental Migration

Do not replace the current LaTeX workflow in one step.

The migration should preserve working PDF output while the web layer matures.

### 4. Multi-language by Design

This repository already contains English and Chinese resume variants. The new structure should handle language variants explicitly instead of treating them as one-off exceptions.

## Proposed Repository Shape

Short-term target:

```text
resume/
  content/
    resume.en.json
    resume.zh.json
  docs/
    rearchitecture-plan.md
  scripts/
    generate_changelog.sh
    validate-content.sh
    build-pdf.sh
    build-web.sh
  src/
    yh_resume.tex
    yh_resume_cht.tex
  single-page-cv/
    src/app/*
```

Mid-term target:

```text
resume/
  apps/
    web/
  content/
    resume.en.json
    resume.zh.json
  packages/
    resume-schema/
    latex-renderer/
  scripts/
  docs/
```

The short-term target minimizes disruption. The mid-term target improves long-term separation and reuse.

## Recommended Data Model

Suggested high-level structure:

```json
{
  "basics": {
    "name": "Your Name",
    "title": "Site Reliability Engineer",
    "email": "example@example.com",
    "phone": "+886-...",
    "location": "Taiwan",
    "website": "https://example.com",
    "github": "https://github.com/example",
    "linkedin": "https://linkedin.com/in/example"
  },
  "summary": "Short professional summary",
  "skills": [
    {
      "category": "Languages",
      "items": ["Go", "Python", "Rust"]
    }
  ],
  "experience": [
    {
      "company": "Example Corp",
      "role": "SRE",
      "location": "Taipei",
      "start": "2023-01",
      "end": "present",
      "highlights": ["Impact statement 1", "Impact statement 2"]
    }
  ],
  "projects": [
    {
      "name": "Resume",
      "url": "https://example.com",
      "description": "Project description",
      "highlights": ["Detail 1", "Detail 2"]
    }
  ],
  "education": [
    {
      "school": "Example University",
      "degree": "B.S.",
      "start": "2018",
      "end": "2022"
    }
  ]
}
```

Design rules:

- keep data semantic, not presentational
- keep bullet items in arrays
- normalize date formats
- keep language files fully explicit rather than trying to over-share translated fragments too early

## Build Strategy

### Current Workflow

Current workflow:

`LaTeX -> PDF -> pdf2htmlEX -> output/index.html`

### Future Workflow

Future workflow:

`content -> validate -> render web`

`content -> validate -> render LaTeX -> compile PDF`

This turns build steps into content-aware pipelines instead of document-conversion pipelines.

## Web Strategy

`single-page-cv/` should evolve from a PDF viewer into the actual website renderer.

Recommended responsibilities for the web app:

- render resume sections from structured content
- support responsive layout
- support SEO metadata
- support language switching
- provide PDF download links
- support print-friendly CSS

The web app should stop embedding the PDF as the main page.

## PDF Strategy

PDF remains important for job applications and formal sharing, so it should not be removed early.

Recommended approach:

### Phase A

- keep LaTeX as the PDF renderer
- continue producing production PDF from LaTeX
- gradually reduce manually duplicated content

### Phase B

- generate LaTeX inputs from structured content
- keep templates thin

### Phase C

- evaluate whether browser-based PDF generation is good enough
- only replace LaTeX if output quality is consistently acceptable

## CI/CD Strategy

The current CI is centered around LaTeX compilation and PDF-to-HTML conversion. The new CI should be organized around content verification and renderer builds.

Suggested pipeline stages:

1. validate content
2. build PDF
3. build web
4. run smoke checks
5. deploy

Suggested verification examples:

- schema validation
- required field checks
- date format checks
- Next.js build
- PDF build success
- `robots.txt` smoke test

## Tools To Keep

- LaTeX toolchain for high-quality PDF output
- Next.js for the website
- existing deployment wiring if it can serve the web build output

## Tools To De-emphasize

These should gradually stop being core architecture pieces:

- `pdf2htmlEX`
- conversion-driven `output/index.html`
- shell steps that patch generated HTML as a long-term strategy

`pdf2htmlEX` is useful as a migration bridge, but not as the long-term web foundation.

## Migration Plan

### Phase 1: Content Foundation

Goal:

- create `content/` directory
- define initial resume schema
- move a first version of English and Chinese content into structured files

Deliverables:

- `content/resume.en.json`
- `content/resume.zh.json`
- schema validation utilities

### Phase 2: Web Renderer

Goal:

- make `single-page-cv/` render actual resume content

Deliverables:

- data loader
- section components
- metadata
- responsive layout
- PDF download entry

### Phase 3: PDF Renderer Refactor

Goal:

- reduce manual duplication between content files and LaTeX files

Deliverables:

- script or generator for LaTeX input
- thinner LaTeX templates

### Phase 4: CI/CD Refactor

Goal:

- align CI around content validation and renderer outputs

Deliverables:

- content validation job
- web build job
- PDF build job
- simplified deploy target

### Phase 5: Legacy Cleanup

Goal:

- retire obsolete conversion-heavy paths

Deliverables:

- reduced or removed `pdf2htmlEX` dependence
- clearer build commands
- cleaner deploy artifact flow

## Decisions To Lock Early

Before deep implementation starts, these decisions should be explicit:

1. Is LaTeX staying as the long-term PDF renderer?
2. Is the website the primary public presentation, or only a mirror of the PDF?
3. Are English and Chinese both first-class maintained outputs?
4. Will this repository stay as a simple multi-root repo, or become an app/package layout later?

## Immediate Next Steps

Recommended order of execution:

1. add `docs/` and capture the architecture plan
2. add changelog automation
3. add `content/` with initial schema
4. refactor `single-page-cv/` to read structured content
5. refactor LaTeX build flow to consume the same content
6. simplify CI/CD after both renderers are stable

## Success Criteria

The rearchitecture is successful when:

- content is updated in one place
- web and PDF stay in sync
- multi-language support is explicit and maintainable
- CI validates content before building outputs
- the web version is a real website, not a converted PDF

## Related Documents

- [index.md](./index.md)
- [current-workflow.md](./current-workflow.md)
- [future-workflow.md](./future-workflow.md)
- [content-model.md](./content-model.md)
