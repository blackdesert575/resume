#!/usr/bin/env bash
set -euxo pipefail

BASE_DIR=$(pwd)

echo $BASE_DIR

# validate structured content for web renderer
bash $BASE_DIR/scripts/validate_single-page-cv_content.sh
# generate *.pdf from *.tex
bash $BASE_DIR/scripts/make_pdf.sh
# generate *.html from *.pdf
# build docker image with *.html
# separated files html/css/js/...etc
# echo "1" | bash "$BASE_DIR/scripts/build.sh"
# all in one html
echo "2" | bash "$BASE_DIR/scripts/build.sh"
# start docker image with *.html
bash $BASE_DIR/scripts/start.sh
