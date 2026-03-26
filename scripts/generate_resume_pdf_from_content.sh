#!/usr/bin/env bash
set -euxo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$BASE_DIR"

node scripts/generate_resume_tex.mjs

latexmk -f -pdf -pdflatex="pdflatex -interaction=nonstopmode" \
  -jobname=src/generated/yh_resume \
  src/generated/yh_resume.tex

latexmk -f -xelatex -interaction=nonstopmode \
  -jobname=src/generated/yh_resume_cht \
  src/generated/yh_resume_cht.tex
