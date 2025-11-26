#!/usr/bin/env bash
set -euxo pipefail

BASE_DIR=$(pwd)

echo $BASE_DIR

docker build . -t docker.io/focal1119/latex-tools-box:ci -f Dockerfile.ci_tools