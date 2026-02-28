---
name: latexmk-build-pdf
description: Compile `*.tex` files into PDF using `latexmk`, clean build artifacts, and troubleshoot LaTeX build failures. Use when a user asks to generate PDF from TeX, rerun XeLaTeX/PDFLaTeX builds, clean intermediate files, or diagnose `latexmk` errors such as missing source files, missing fonts, package errors, and wrong working directory.
---

# Latexmk Build Pdf

## Overview

Use `latexmk` as the default build driver for TeX to PDF tasks.
Detect whether failures come from command invocation, working directory, source path, or TeX/font/package configuration, then apply the smallest reliable fix.

## Quick Workflow

1. Find the TeX entry file.
Use `rg --files | rg '\.tex$'` and confirm the target name.

2. Run cleanup with explicit target when needed.
Prefer:
```bash
latexmk -C path/to/file.tex
```
Avoid bare `latexmk -C` in directories without `*.tex`.

3. Compile with the required engine.
For XeLaTeX:
```bash
latexmk -xelatex -interaction=nonstopmode path/to/file.tex
```
For PDFLaTeX:
```bash
latexmk -pdf -interaction=nonstopmode path/to/file.tex
```

4. Confirm outputs and errors.
Check whether `file.pdf` exists next to the source file and inspect `file.log` for root cause when compilation fails.

## Failure Triage

1. Source file not found.
Cause: wrong working directory or wrong relative path.
Fix: `cd` into source directory or pass full/relative path to the `.tex` file.

2. `latexmk -C` fails immediately.
Cause: no TeX file in current directory.
Fix: run `latexmk -C path/to/file.tex` with explicit target.

3. Font errors (`fontspec Error: ... cannot be found`).
Cause: unavailable system fonts for XeLaTeX/ctex.
Fix: install required fonts or switch TeX font configuration to installed fonts, then rebuild.

4. Package missing or command undefined.
Cause: TeX Live package not installed or incompatible package usage.
Fix: install missing package set and rerun.

5. Too many cascading errors after first failure.
Cause: primary error early in preamble.
Fix: identify the first real error in `.log`; avoid debugging downstream noise first.

## Command Patterns

Compile from source directory:
```bash
cd src
latexmk -C yh_resume_cht.tex
latexmk -xelatex -interaction=nonstopmode yh_resume_cht.tex
```

Compile from repository root:
```bash
latexmk -C src/yh_resume_cht.tex
latexmk -xelatex -interaction=nonstopmode src/yh_resume_cht.tex
```

## Output Expectations

1. Report the exact command run.
2. Report whether PDF was generated and where.
3. If failed, report first actionable error and concrete fix.
