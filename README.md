# resume

My resume generated from *.tex file to request a job.
LaTeX template for my personal resume forked from [jakegut / resume](https://github.com/jakegut/resume)

## quick start

* requirement packages
  * texlive-full
    * [tug.org/texlive](https://tug.org/texlive/)
    * [TeX Live - Quick install for Unix](https://www.tug.org/texlive/quickinstall.html)
    * install via package manager

```shell
# Debian / Ubuntu
sudo apt install make texlive-full

# Arch / Manjaro
sudo pacman -Syy
sudo pacman -S make texlive-most texlive-bin

# macOS
brew install mactex
sudo tlmgr update --self
```

  * pdf2htmlEX
    * [github.com/pdf2htmlEX/pdf2htmlEX](https://github.com/pdf2htmlEX/pdf2htmlEX)
    * [Building#building-yourself](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Building#building-yourself)
    * [Download-Debian-Archive](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Download-Debian-Archive)
    * [Download-Docker-Image](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Download-Docker-Image)
    * [github.com/pdf2htmlEX/pdf2htmlEX/wiki/Quick-Start](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Quick-Start)

* docker, docker compose, podman, podman compose
  * if you want to build resume in a container with docker/podman compose

```shell
git clone https://github.com/blackdesert575/resume.git

cd resume
docker compose up -d
docker exec -it latex-tools-box bash
cd /resume
./scripts/pipelines_ci.sh
```

* Deployments:
  * Deploy to Cloudflare Pages with Github actions CI/CD pipelins
    * CI will auto triger wih git push event but can skipped.
      * GitHub Action
        * [github.com/marketplace/actions/github-action-for-latex](https://github.com/marketplace/actions/github-action-for-latex)
        * [github.com/marketplace/actions/pdf2htmlex-action](https://github.com/marketplace/actions/pdf2htmlex-action)
        * [github.com/marketplace/actions/add-commit](https://github.com/marketplace/actions/add-commit)
        * [docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/run-jobs-in-a-container#mounting-volumes-in-a-container](docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/run-jobs-in-a-container#mounting-volumes-in-a-container)
        * [docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/run-jobs-in-a-container#mounting-volumes-in-a-container](https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/run-jobs-in-a-container#mounting-volumes-in-a-container)
    * CD
      * [developers.cloudflare.com/pages/get-started/git-integration](https://developers.cloudflare.com/pages/get-started/git-integration/)

    
```shell
#git comment
#update docs and test github action ci
#skip ci
[skip ci] update **/*.tex
[skip ci] update README
[skip ci] update ci.yml
[skip actions] update docs
```

  * Any Linux host with Nginx + pdf2htmlex bundled page output(html/css/javascript all in one)
    * Install the CLI prerequisites on your localhost
    * Git clone this repo on your localhost
    * manual edit src/*.tex
    * generate *.pdf from *.tex
    * generate *.html from *.pdf
    * deploy with docker images  

```shell
#clone repo to your work dir
git clone git@github.com:blackdesert575/resume.git

cd resume

#edit *.tex
vim src/yh_resume.tex

#output and packge output/** to docker image and run a docker container at localhost
bash scripts/pipelines.sh

#test robots
uv run test_robots.py

#or
python3 test_robots.py
```

  * node.js + react.js single-page-cv app with pdf output
    * Install the CLI prerequisites on your localhost
    * Git clone this repo on your localhost
    * manual edit src/*.tex
    * generate *.pdf from *.tex
    * mv *.pdf to single-page-cv/public
    * devops under single-page-cv with next dev server
    * deploy with docker images

## to do list

* Add multiple languages(English/Chinese) support
~~* Migrate to Cloudflare Worker & Pages~~
* Compare Nginx + pdf2htmlex bundled page output(html/css/javascript all in one) VS node.js + react.js single-page-cv app with pdf output
~~* integration with CI/CD pipelines with GitHub Actions/Jenkins/ArgoCD...etc~~
~~* pdf2htmlEX (generate *.html from *.pdf)~~
~~* refactoring output from pdf2htmlEX with React+Next.js Web framework~~

## Guides/Tips/misc..etc

* LaTex «Lah-tech» or «Lay-tech»
* [LaTex project/About](https://www.latex-project.org/about/)
* [pdf2htmlEX/wiki/Quick-Start](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Quick-Start)
* [pdf2htmlEX/wiki/Command-Line-Options](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Command-Line-Options)
* [kmpg: a book could be generated from soruce with TeXLive toolchain](https://github.com/sysprog21/lkmpg)

## development notes

* [Python: Usage with uv](https://docs.astral.sh/uv/)
* [how-to-extract-text-from-a-pdf-file](https://stackoverflow.com/questions/34837707/how-to-extract-text-from-a-pdf-file)
* [pypdf](https://github.com/py-pdf/pypdf)

* parser with Python

```shell
uv add pypdf
```

* build *.tex to output pdf with latexmk

```shell
#check latexmk installed or not
which latexmk
latexmk --version

cd src/
# latexmk yh_resume.tex

latexmk -xelatex -interaction=nonstopmode yh_resume_cht.tex
#clean build uneeded files and keep *.pdf
latexmk -c
```

* build *.tex to output html with htlatex

```shell
htlatex file.tex "xhtml,html5,mathml,charset=utf-8" " -cunihtf -utf8"
```

* build *.tex to output pdf with make

```shell
#build pdf from tex source codes
make all
#rm extra files when bulding tex project
make clean
```

* Or building with vscode extensions
    * LaTeX Workshop

* generate *.html from *.pdf
* [How to use this docker container to convert pdf file to html](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Download-Docker-Image#how-to-use-this-docker-container-to-convert-pdf-file-to-html)

```shell
#with docker
docker run -ti --rm -v ./src:/pdf -w /pdf pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64 --zoom 1.3 yh_resume.pdf

#with podman
podman run -ti --rm -v ./src:/pdf -w /pdf docker.io/pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64 --zoom 1.3 yh_resume.pdf

# Internal Error: Your version of iconv does not support the "Mac Roman" encoding.
# If this causes problems, reconfigure --without-iconv.
# Preprocessing: 2/2
# Working: 2/2

#add this for My github pages icon
<link rel="icon" type="image/x-icon" href="./favicon.ico">
<link rel="icon" type="image/x-icon" href="../images/ico/favicon.ico">

#edit *.tex with vscode and extension:LaTeX Workshop
vscode yh_resume.tex
vscode yh_resume.pdf

#build with bash shell scripts
bash ./scripts/build.sh

#run with bash shell scripts
bash ./scripts/start.sh
```