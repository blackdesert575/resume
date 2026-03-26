#!/usr/bin/env bash
set -euxo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_FILE="${1:-$BASE_DIR/CHANGELOG.md}"
REPO_DIR="${2:-$BASE_DIR}"

cd "$REPO_DIR"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
    echo "Not a git repository: $REPO_DIR" >&2
    exit 1
fi

TMP_FILE="$(mktemp)"
trap 'rm -f "$TMP_FILE"' EXIT

AUTOMATION_COMMITS="$(
    git log --date=short \
        --pretty=format:'- %ad `%h` %s' \
        --grep='^Commit from GitHub Actions' || true
)"

{
    echo "# Changelog"
    echo
    echo "Generated on $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
    echo
    echo "## Summary"
    echo
    echo "- Repository: $(basename "$REPO_DIR")"
    echo "- Total commits: $(git rev-list --count HEAD)"
    echo
    echo "## Human Authored Commits"
    echo
    git log --date=short \
        --pretty=format:'- %ad `%h` %s' \
        --invert-grep \
        --grep='^Commit from GitHub Actions' \
        --grep='^\[skip ci\]' \
        --grep='^\[skip actions\]'
    echo
    echo
    echo "## Automation Commits"
    echo
    if [[ -n "$AUTOMATION_COMMITS" ]]; then
        printf '%s\n' "$AUTOMATION_COMMITS"
        echo
    else
        echo "- None"
        echo
    fi
} > "$TMP_FILE"

mv "$TMP_FILE" "$OUTPUT_FILE"
