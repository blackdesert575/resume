#!/usr/bin/env bash
set -euxo pipefail

echo "Setup BASE_DIR..."

BASE_DIR=$(pwd)

echo "BASE_DIR is :$BASE_DIR"

options=("separated files" "all in one")

select opt in "${options[@]}"
do
    case $opt in
        "separated files")            
            docker run -i --rm -v $BASE_DIR:/pdf -w /pdf pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64 --zoom 1.3 --embed cfijo --dest-dir output ./src/yh_resume.pdf
            break
            ;;
        "all in one")
            docker run -i --rm -v $BASE_DIR:/pdf -w /pdf pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64 --zoom 1.3 --dest-dir output ./src/yh_resume.pdf index.html
            break
            ;;
        *) echo "無效的選項 $REPLY";;
    esac
done

# Define the content to be added
content='<link rel="icon" type="image/x-icon" href="./favicon.ico">\n<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>'

# Add the content to the file
sed -i "/<head>/i $content" $BASE_DIR/output/index.html

#builld docker image
# docker build . -t docker.io/focal1119/resume:prod