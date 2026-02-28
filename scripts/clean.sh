#!/usr/bin/env bash
set -euxo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

#clean none tag images
# docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
# docker rmi $(docker images | grep "^<none>" | awk '{print $3}')
# docker images -f "dangling=true" -q | xargs docker rmi

#
latexmk -c "${REPO_ROOT}"/src/*.tex
