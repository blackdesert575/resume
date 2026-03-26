# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/),
and this project aims to follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
for future tagged releases.

## [Unreleased]

### Added

- Added a structured content layer under `content/` with:
  - `content/resume.en.json`
  - `content/resume.zh.json`
- Added jq-based content validation with `scripts/validate_content_json.sh`.
- Added local Linux VM and localhost helper scripts for `single-page-cv/`:
  - `scripts/install_single-page-cv_deps.sh`
  - `scripts/dev_single-page-cv.sh`
  - `scripts/build_single-page-cv_local.sh`
  - `scripts/start_single-page-cv.sh`
  - `scripts/test_single-page-cv_local.sh`
- Added a Node.js-based content validator for `single-page-cv/`:
  - `single-page-cv/scripts/validate-content.mjs`
  - `npm run validate:content`
- Added repository documentation for:
  - current workflow
  - future workflow
  - git workflow basics
  - rearchitecture planning
  - content model design
  - `single-page-cv` tech stack
  - React / Next.js learning guide
  - Linux VM development workflow
- Added a simple `EN / ZH` query-string language switcher to `single-page-cv/`.
- Added localized UI copy switching for major web resume section labels and fixed interface text.
- Added `single-page-cv/src/lib/` for shared content-loading and UI-copy logic.

### Changed

- Changed `single-page-cv/` from a PDF embed page into a content-driven Next.js resume page that reads from `content/*.json`.
- Changed the web resume layout to a more formal resume-style presentation closer to the PDF version.
- Changed `single-page-cv` page structure by splitting the main resume page into focused components.
- Changed locale handling so metadata, PDF download target, and UI copy are routed through shared helpers.
- Changed `single-page-cv` lint setup so `npm run lint` now runs successfully with ESLint flat config.
- Changed repository documentation links under `docs/` to relative paths so they render correctly on GitHub.
- Changed `README.md` to reflect the current hybrid project state:
  - LaTeX / PDF flow remains available
  - structured content and Next.js web rendering are now first-class parts of the repo
  - `docs/` usage is documented from the repository root
- Changed changelog generation direction away from raw `git log` dumping toward a human-curated Keep a Changelog format.

### Removed

- Removed the local `skills/` directory that was no longer needed in the repository.
