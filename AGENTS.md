# Repository Guidelines

## Project Structure & Module Organization
- `src/`: primary resume sources (`yh_resume.tex`, generated `yh_resume.pdf`) and a small Rust utility (`main.rs`) for QR image generation.
- `scripts/`: build/test/deploy helpers (PDF build, HTML conversion, pipeline wrappers, robots check).
- `output/`: generated web artifacts (`index.html`, `robots.txt`, `favicon.ico`) published by CI/deploy flows.
- `single-page-cv/`: Next.js app variant of the resume (`src/app/*`, `public/yh_resume.pdf`).
- `.github/workflows/ci.yml`: CI pipeline that compiles LaTeX, converts PDF to HTML, and commits updated output.

## Build, Test, and Development Commands
- `make all`: compile `src/yh_resume.tex` to `src/yh_resume.pdf` via `latexmk`.
- `make clean`: remove LaTeX intermediate files from `src/`.
- `bash scripts/make_pdf.sh`: convenience wrapper for `make all && make clean`.
- `bash scripts/build.sh`: convert PDF to HTML with `pdf2htmlEX` (interactive mode: separated vs all-in-one output).
- `bash scripts/pipelines.sh`: end-to-end local flow (PDF build + HTML build + container start).
- `python3 scripts/test_robots.py`: smoke-check production `robots.txt` behavior.
- `cd single-page-cv && npm ci && npm run dev|build|lint`: run the Next.js variant locally.

## Coding Style & Naming Conventions
- Shell scripts: use `bash` with `set -euxo pipefail`; keep scripts idempotent and path-aware (`BASE_DIR=$(pwd)` pattern).
- Rust (`src/main.rs`): follow `rustfmt` defaults (4-space indent, `snake_case` identifiers).
- Python: keep scripts minimal and readable; prefer stdlib unless there is a clear need.
- Filenames use lowercase with hyphens/underscores (examples: `test_single-page-cv.sh`, `yh_resume.tex`).

## Testing Guidelines
- This repo uses lightweight smoke/integration checks rather than a formal unit-test suite.
- Before PRs, run: `make all`, `python3 scripts/test_robots.py`, and for web app changes `npm run lint` in `single-page-cv/`.
- Verify generated artifacts affected by your change (`src/yh_resume.pdf`, `output/index.html`) are intentional.

## Commit & Pull Request Guidelines
- Follow existing commit style: short, imperative subjects (examples: `Update src/yh_resume.tex`, `Bump next ...`).
- Keep commits scoped to one logical change; include generated files only when required by CI/deploy behavior.
- PRs should include: purpose, changed paths, local verification commands run, and screenshots for UI changes (`single-page-cv`).
- Link relevant issues and note if CI skip tags are intentionally used (for example `[skip ci]`).
