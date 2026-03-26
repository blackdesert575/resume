# Resume Content Model

## Purpose

This document defines the future content schema for:

- `content/resume.en.json`
- `content/resume.zh.json`

The goal is to make resume data:

- structured
- renderer-agnostic
- easy to validate
- suitable for both web and PDF generation

## Design Principles

### 1. Content First

The JSON files should describe resume meaning, not presentation.

Good:

- role title
- date range
- highlight bullets
- project URL

Bad:

- LaTeX commands
- HTML fragments
- CSS class names
- manual line breaks for layout

### 2. One Language Per File

Each language variant should be maintained as a complete standalone file.

Recommended files:

- `content/resume.en.json`
- `content/resume.zh.json`

Do not try to store partial translation overlays in the first version. Full files are easier to validate and review.

### 3. Stable Shape

Both language files should follow the same top-level schema.

This allows:

- one validator
- one web renderer
- one PDF renderer pipeline

### 4. Data Normalization

Dates, URLs, and arrays should use consistent formats. This avoids renderer-specific hacks later.

## File-Level Rules

Each content file should contain:

- exactly one resume object
- UTF-8 encoded JSON
- no comments
- no trailing schema-breaking custom fields unless schema is updated first

## Top-Level Schema

Suggested structure:

```json
{
  "meta": {},
  "basics": {},
  "summary": "",
  "skills": [],
  "experience": [],
  "projects": [],
  "education": [],
  "certifications": [],
  "awards": [],
  "links": []
}
```

## Field Definitions

### `meta`

Metadata for validation, rendering, and future automation.

```json
{
  "locale": "en",
  "version": "1.0.0",
  "updatedAt": "2026-03-26",
  "pdfFileName": "resume.en.pdf",
  "slug": "resume"
}
```

Field rules:

- `locale`: required, string, recommended values `en` or `zh`
- `version`: optional, string
- `updatedAt`: required, format `YYYY-MM-DD`
- `pdfFileName`: optional, output filename hint
- `slug`: optional, useful for routing or export naming

### `basics`

Primary personal and contact information.

```json
{
  "name": "Your Name",
  "title": "Site Reliability Engineer",
  "email": "you@example.com",
  "phone": "+886-900-000-000",
  "location": "Taipei, Taiwan",
  "website": "https://example.com",
  "github": "https://github.com/example",
  "linkedin": "https://www.linkedin.com/in/example"
}
```

Field rules:

- `name`: required
- `title`: required
- `email`: optional but recommended
- `phone`: optional
- `location`: optional
- `website`: optional, absolute URL preferred
- `github`: optional, absolute URL preferred
- `linkedin`: optional, absolute URL preferred

### `summary`

Short professional summary paragraph.

Rules:

- type: string
- required
- recommended length: 1 to 4 sentences
- should be plain text, not markdown or HTML

### `skills`

Grouped skill categories.

```json
[
  {
    "category": "Languages",
    "items": ["Go", "Python", "Rust"]
  },
  {
    "category": "Platforms",
    "items": ["Linux", "Docker", "Kubernetes", "Cloudflare"]
  }
]
```

Field rules:

- `category`: required string
- `items`: required array of strings
- avoid empty categories
- preserve editorial ordering

### `experience`

Professional work history.

```json
[
  {
    "company": "Example Corp",
    "role": "Site Reliability Engineer",
    "location": "Taipei, Taiwan",
    "start": "2023-01",
    "end": "present",
    "highlights": [
      "Reduced deployment failure rate by standardizing CI/CD checks.",
      "Improved service reliability through better observability and alert tuning."
    ],
    "technologies": ["Terraform", "Kubernetes", "GitHub Actions"]
  }
]
```

Field rules:

- `company`: required string
- `role`: required string
- `location`: optional string
- `start`: required, format `YYYY-MM`
- `end`: required, format `YYYY-MM` or literal `"present"`
- `highlights`: required array of strings, at least 1 item
- `technologies`: optional array of strings

Ordering rules:

- newest experience first
- highlights ordered by impact, not chronology

### `projects`

Significant personal, open-source, or professional projects worth highlighting separately.

```json
[
  {
    "name": "Resume",
    "url": "https://resume.example.com",
    "repository": "https://github.com/example/resume",
    "description": "A content-driven resume project with web and PDF renderers.",
    "highlights": [
      "Built a dual-renderer architecture for web and PDF output.",
      "Automated static deployment and changelog generation."
    ],
    "technologies": ["Next.js", "LaTeX", "GitHub Actions"]
  }
]
```

Field rules:

- `name`: required string
- `url`: optional string
- `repository`: optional string
- `description`: required string
- `highlights`: optional array of strings
- `technologies`: optional array of strings

### `education`

Academic background.

```json
[
  {
    "school": "Example University",
    "degree": "B.S. in Computer Science",
    "location": "Taiwan",
    "start": "2018",
    "end": "2022"
  }
]
```

Field rules:

- `school`: required string
- `degree`: required string
- `location`: optional string
- `start`: optional string, recommended `YYYY`
- `end`: optional string, recommended `YYYY` or `"present"`

### `certifications`

Optional certification entries.

```json
[
  {
    "name": "CKA",
    "issuer": "The Linux Foundation",
    "issuedAt": "2025-08",
    "expiresAt": "2028-08",
    "credentialId": "ABC-123"
  }
]
```

Field rules:

- `name`: required string
- `issuer`: required string
- `issuedAt`: optional string, recommended `YYYY-MM`
- `expiresAt`: optional string, recommended `YYYY-MM`
- `credentialId`: optional string

### `awards`

Optional awards, recognitions, or notable achievements.

```json
[
  {
    "title": "Open Source Contributor Award",
    "issuer": "Example Organization",
    "date": "2024-11",
    "description": "Recognized for sustained infrastructure contributions."
  }
]
```

Field rules:

- `title`: required string
- `issuer`: optional string
- `date`: optional string, recommended `YYYY-MM`
- `description`: optional string

### `links`

Additional public links not already covered in `basics`.

```json
[
  {
    "label": "Blog",
    "url": "https://blog.example.com"
  },
  {
    "label": "GitHub",
    "url": "https://github.com/example"
  }
]
```

Field rules:

- `label`: required string
- `url`: required string

## Date Format Rules

Use normalized date strings.

Recommended formats:

- full date: `YYYY-MM-DD`
- month precision: `YYYY-MM`
- year precision: `YYYY`
- current role end date: `"present"`

Do not mix formats for the same field family without a reason.

Examples:

- `meta.updatedAt`: `2026-03-26`
- `experience.start`: `2024-02`
- `education.start`: `2018`

## Nullability Rules

Prefer omission over `null`.

Good:

```json
{
  "name": "Example",
  "url": "https://example.com"
}
```

Avoid:

```json
{
  "name": "Example",
  "url": null
}
```

This keeps renderers simpler and reduces schema ambiguity.

## Ordering Rules

Arrays should preserve editorial intent.

Recommended ordering:

- `experience`: newest first
- `projects`: most relevant first
- `education`: newest or most relevant first
- `skills`: strongest categories first
- `links`: most important public destinations first

## Language Parity Rules

The English and Chinese content files should share:

- the same top-level keys
- the same array/object shapes
- equivalent section coverage

They do not need to have:

- identical sentence counts
- word-for-word translation
- identical bullet counts in every section

The requirement is structural parity, not literal parity.

## Validation Rules

Recommended future validator checks:

- required top-level keys exist
- `meta.locale` is valid
- required strings are non-empty
- URLs are absolute where expected
- date formats match field expectations
- `experience.end` is either valid date format or `"present"`
- arrays contain the expected item types

## Example Full Skeleton

```json
{
  "meta": {
    "locale": "en",
    "version": "1.0.0",
    "updatedAt": "2026-03-26",
    "pdfFileName": "resume.en.pdf",
    "slug": "resume"
  },
  "basics": {
    "name": "Your Name",
    "title": "Site Reliability Engineer",
    "email": "you@example.com",
    "phone": "+886-900-000-000",
    "location": "Taipei, Taiwan",
    "website": "https://example.com",
    "github": "https://github.com/example",
    "linkedin": "https://www.linkedin.com/in/example"
  },
  "summary": "Short professional summary.",
  "skills": [],
  "experience": [],
  "projects": [],
  "education": [],
  "certifications": [],
  "awards": [],
  "links": []
}
```

## Future Schema Extensions

These can be added later if needed:

- `openSource`
- `publications`
- `talks`
- `volunteering`
- `profiles`
- `preferredLabels`

Do not add them until there is a real renderer or content need.

## Recommended Next Step

After this document, the next implementation step should be:

1. create `content/resume.en.json`
2. create `content/resume.zh.json`
3. add a runtime validator, likely with `zod`
4. make the web renderer consume the validated content

## Related Documents

- [index.md](./index.md)
- [rearchitecture-plan.md](./rearchitecture-plan.md)
- [current-workflow.md](./current-workflow.md)
- [future-workflow.md](./future-workflow.md)
