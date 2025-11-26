#!/usr/bin/env bash
set -euxo pipefail

BASE_DIR=$(pwd)

echo $BASE_DIR

# generate *.pdf from *.tex
#build pdf from tex source codes
make all
#rm extra files when bulding tex project
make clean

# generate *.html from *.pdf
# all in one html
docker run -i --rm -v $BASE_DIR:/pdf -w /pdf pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64 --zoom 1.3 --dest-dir output ./src/yh_resume.pdf index.html

# Define the content to be added
content='<link rel="icon" type="image/x-icon" href="./favicon.ico">\n<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>'

# Add the content to the file
sed -i "/<head>/i $content" $BASE_DIR/output/index.html