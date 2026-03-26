#!/usr/bin/env bash
set -euxo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$BASE_DIR/single-page-cv"
npm run validate:content
npm run build
npm run pdf:generate
npm run start
