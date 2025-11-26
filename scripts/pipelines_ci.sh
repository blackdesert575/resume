#!/usr/bin/env bash
set -euxo pipefail

BASE_DIR=$(pwd)

echo $BASE_DIR

# generate *.pdf from *.tex
#build pdf from tex source codes
latexmk -f -pdf -pdflatex="pdflatex -interaction=nonstopmode" -output-directory=src src/yh_resume.tex
#rm extra files when bulding tex project
rm -f src/*.aux src/*.fdb_latexmk src/*.fls src/*.log src/*.out src/*.synctex.gz src/*.xdv src/*.4ct src/*.4tc src/*.dvi src/*.idv src/*.lg src/*.tmp src/*.xref

# generate *.html from *.pdf
# all in one html
/usr/local/bin/pdf2htmlEX --zoom 1.3 --dest-dir output src/yh_resume.pdf index.html

# Define the content to be added
content='<link rel="icon" type="image/x-icon" href="./favicon.ico">\n<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>'

# Add the content to the file
sed -i "/<head>/i $content" $BASE_DIR/output/index.html