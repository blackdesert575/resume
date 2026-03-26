#!/usr/bin/env bash
set -euxo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONTENT_DIR="$BASE_DIR/content"
REQUIRED_TOP_LEVEL_KEYS=(
    "meta"
    "basics"
    "summary"
    "skills"
    "experience"
    "projects"
    "education"
    "certifications"
    "awards"
    "links"
)

assert_jq() {
    local file="$1"
    local expr="$2"
    local message="$3"

    if ! jq -e "$expr" "$file" >/dev/null; then
        echo "$message" >&2
        exit 1
    fi
}

if ! command -v jq >/dev/null 2>&1; then
    echo "jq is required but not installed." >&2
    exit 1
fi

if [[ ! -d "$CONTENT_DIR" ]]; then
    echo "Content directory not found: $CONTENT_DIR" >&2
    exit 1
fi

shopt -s nullglob
FILES=("$CONTENT_DIR"/*.json)

if [[ ${#FILES[@]} -eq 0 ]]; then
    echo "No JSON files found in $CONTENT_DIR" >&2
    exit 1
fi

for file in "${FILES[@]}"; do
    echo "Validating JSON: $file"
    jq empty "$file"

    for key in "${REQUIRED_TOP_LEVEL_KEYS[@]}"; do
        if ! jq -e --arg key "$key" 'has($key)' "$file" >/dev/null; then
            echo "Missing required top-level key '$key' in $file" >&2
            exit 1
        fi
    done

    assert_jq "$file" '.meta | type == "object"' "Field 'meta' must be an object in $file"
    assert_jq "$file" '.basics | type == "object"' "Field 'basics' must be an object in $file"
    assert_jq "$file" '.summary | type == "string"' "Field 'summary' must be a string in $file"
    assert_jq "$file" '.skills | type == "array"' "Field 'skills' must be an array in $file"
    assert_jq "$file" '.experience | type == "array"' "Field 'experience' must be an array in $file"
    assert_jq "$file" '.projects | type == "array"' "Field 'projects' must be an array in $file"
    assert_jq "$file" '.education | type == "array"' "Field 'education' must be an array in $file"
    assert_jq "$file" '.certifications | type == "array"' "Field 'certifications' must be an array in $file"
    assert_jq "$file" '.awards | type == "array"' "Field 'awards' must be an array in $file"
    assert_jq "$file" '.links | type == "array"' "Field 'links' must be an array in $file"

    assert_jq "$file" '.meta.locale | type == "string"' "Field 'meta.locale' must be a string in $file"
    assert_jq "$file" '.meta.locale == "en" or .meta.locale == "zh"' "Field 'meta.locale' must be 'en' or 'zh' in $file"
    assert_jq "$file" '.meta.updatedAt | type == "string"' "Field 'meta.updatedAt' must be a string in $file"
    assert_jq "$file" '.meta.updatedAt | test("^[0-9]{4}-[0-9]{2}-[0-9]{2}$")' "Field 'meta.updatedAt' must match YYYY-MM-DD in $file"
    assert_jq "$file" '.basics.name | type == "string"' "Field 'basics.name' must be a string in $file"
    assert_jq "$file" '.basics.title | type == "string"' "Field 'basics.title' must be a string in $file"
    assert_jq "$file" 'all(.skills[]; (.category | type == "string") and (.items | type == "array"))' "Each skills entry must contain string 'category' and array 'items' in $file"
    assert_jq "$file" 'all(.skills[]; all(.items[]; type == "string"))' "Each skills.items entry must be a string in $file"
    assert_jq "$file" 'all(.experience[]; (.company | type == "string") and (.role | type == "string") and (.start | type == "string") and (.end | type == "string"))' "Each experience entry must contain string 'company', 'role', 'start', and 'end' in $file"
    assert_jq "$file" 'all(.experience[]; .start | test("^[0-9]{4}-[0-9]{2}$"))' "Each experience.start must match YYYY-MM in $file"
    assert_jq "$file" 'all(.experience[]; (.end == "present") or (.end | test("^[0-9]{4}-[0-9]{2}$")))' "Each experience.end must match YYYY-MM or be '\''present'\'' in $file"
done

echo "All content JSON files are valid, contain required top-level keys, and pass basic shape and date checks."
