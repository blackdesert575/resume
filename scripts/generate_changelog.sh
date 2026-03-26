#!/usr/bin/env bash
set -euxo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_FILE="${1:-$BASE_DIR/CHANGELOG.md}"

if [[ -f "$OUTPUT_FILE" && "${FORCE:-0}" != "1" ]]; then
    echo "Refusing to overwrite existing file: $OUTPUT_FILE" >&2
    echo "Set FORCE=1 to overwrite it with a new Keep a Changelog template." >&2
    exit 1
fi

cat >"$OUTPUT_FILE" <<'EOF'
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/zh-TW/1.1.0/),
and this project aims to follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
for future tagged releases.

## [Unreleased]

### Added

- Describe newly added features, docs, or scripts here.

### Changed

- Describe changed behavior, refactors, UI updates, or workflow updates here.

### Fixed

- Describe bug fixes here.

### Removed

- Describe removed files, workflows, or deprecated parts here.
EOF
