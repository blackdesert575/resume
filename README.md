# resume

* My resume generated from *.tex file to request a job.
* LaTeX template for my personal resume forked from [jakegut / resume](https://github.com/jakegut/resume)
* More document parser, Input/Output Handling

## current status

This repository is currently in a transition period:

- `src/*.tex` is still the main source for the production PDF workflow
- `content/*.json` now exists as a new structured content layer
- `single-page-cv/` is no longer only a PDF wrapper, it can now render resume content as a web page
- `docs/` now records the current workflow, target workflow, content model, learning guides, and local development instructions

Recent changes:

- added structured content files:
  - `content/resume.en.json`
  - `content/resume.zh.json`
- added jq-based content validation:
  - `bash scripts/validate_content_json.sh`
- added Node.js-based content validation inside `single-page-cv/`:
  - `cd single-page-cv && npm run validate:content`
- updated `single-page-cv/` to render JSON content instead of only embedding PDF
- added simple `EN / ZH` query-string switching in `single-page-cv/`
- improved `single-page-cv/` structure by splitting the resume page into smaller components and moving content helpers into `src/lib/`
- fixed `single-page-cv` lint so both `npm run lint` and `npm run build` now work
- added React-based PDF generation for `single-page-cv/` with `@react-pdf/renderer`
  - `cd single-page-cv && npm run pdf:generate`
  - `bash scripts/generate_single-page-cv_pdf.sh`
- added local Linux VM helper scripts for `single-page-cv/`
- expanded `docs/` so the repository architecture and workflow are documented inside the repo

## repository map

- `src/`
  - LaTeX resume sources and generated PDFs
- `content/`
  - structured resume data for web and future renderer refactors
- `single-page-cv/`
  - Next.js app for the web version of the resume
- `scripts/`
  - helper scripts for PDF build, web app local workflow, validation, and deployment
- `docs/`
  - workflow, architecture, content model, learning notes, and local development guides
- `output/`
  - generated web artifacts currently used by deployment flow

## to-do-list

* What is 
* impl more document File Converter, parser, Input/Output Handling and more
  * tex --> pdf --> html  

## quick start

### validate structured content

```shell
bash scripts/validate_content_json.sh
```

### run single-page-cv locally

```shell
bash scripts/install_single-page-cv_deps.sh
bash scripts/dev_single-page-cv.sh
```

Then open:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js may automatically switch to another port such as `3001`.

### validate structured content from single-page-cv

```shell
cd single-page-cv
npm run validate:content
```

### lint and build single-page-cv

```shell
cd single-page-cv
npm run lint
npm run build
```

### generate english and chinese PDF files from single-page-cv

```shell
cd single-page-cv
npm run pdf:generate
```

or:

```shell
bash scripts/generate_single-page-cv_pdf.sh
```

This generates:

- `single-page-cv/public/yh_resume.pdf`
- `single-page-cv/public/yh_resume_cht.pdf`

### production-style build check for single-page-cv

```shell
bash scripts/build_single-page-cv_local.sh
bash scripts/start_single-page-cv.sh
```

## how to use docs

Start with:

- [`docs/index.md`](./docs/index.md)

Recommended reading order:

1. [`docs/current-workflow.md`](./docs/current-workflow.md)
2. [`docs/future-workflow.md`](./docs/future-workflow.md)
3. [`docs/git-workflow-cheatsheet.md`](./docs/git-workflow-cheatsheet.md)
4. [`docs/single-page-cv-tech-stack.md`](./docs/single-page-cv-tech-stack.md)
5. [`docs/react-nextjs-learning-guide.md`](./docs/react-nextjs-learning-guide.md)
6. [`docs/single-page-cv-linux-vm-workflow.md`](./docs/single-page-cv-linux-vm-workflow.md)
7. [`docs/web-pdf-generation-options.md`](./docs/web-pdf-generation-options.md)
8. [`docs/rearchitecture-plan.md`](./docs/rearchitecture-plan.md)
9. [`docs/content-model.md`](./docs/content-model.md)

Use the docs like this:

- if you want to understand why branch conflicts keep happening:
  - read [`docs/current-workflow.md`](./docs/current-workflow.md)
  - then read [`docs/future-workflow.md`](./docs/future-workflow.md)
- if you want to understand the target refactor direction:
  - read [`docs/rearchitecture-plan.md`](./docs/rearchitecture-plan.md)
- if you want to understand the structured content format:
  - read [`docs/content-model.md`](./docs/content-model.md)
- if you want to work on the Next.js app:
  - read [`docs/single-page-cv-tech-stack.md`](./docs/single-page-cv-tech-stack.md)
  - then read [`docs/single-page-cv-linux-vm-workflow.md`](./docs/single-page-cv-linux-vm-workflow.md)
- if you want to understand how the web renderer now generates PDF:
  - read [`docs/web-pdf-generation-options.md`](./docs/web-pdf-generation-options.md)
- if you want to start learning React / Next.js using this repo itself:
  - read [`docs/react-nextjs-learning-guide.md`](./docs/react-nextjs-learning-guide.md)

## older setup notes

This section keeps older LaTeX / PDF / html conversion notes for reference.

Use this section when you are working on:

- the legacy LaTeX-first workflow
- pdf2htmlEX conversion
- older deployment or container-based flows

### latex / pdf workflow

```shell
make all
make clean
```

or:

```shell
bash scripts/make_pdf.sh
```

### requirement packages

#### texlive-full

- [tug.org/texlive](https://tug.org/texlive/)
- [TeX Live - Quick install for Unix](https://www.tug.org/texlive/quickinstall.html)
- install via package manager

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

#### pdf2htmlEX

- [github.com/pdf2htmlEX/pdf2htmlEX](https://github.com/pdf2htmlEX/pdf2htmlEX)
- [Building#building-yourself](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Building#building-yourself)
- [Download-Debian-Archive](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Download-Debian-Archive)
- [Download-Docker-Image](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Download-Docker-Image)
- [github.com/pdf2htmlEX/pdf2htmlEX/wiki/Quick-Start](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Quick-Start)

### container-based build

```shell
git clone https://github.com/blackdesert575/resume.git

cd resume
docker compose up -d
docker exec -it latex-tools-box bash
cd /resume
./scripts/pipelines_ci.sh
```

### deployment notes

#### Cloudflare Pages with GitHub Actions CI/CD

- CI is triggered by Git push unless explicitly skipped
- related GitHub Actions references:
  - [github.com/marketplace/actions/github-action-for-latex](https://github.com/marketplace/actions/github-action-for-latex)
  - [github.com/marketplace/actions/pdf2htmlex-action](https://github.com/marketplace/actions/pdf2htmlex-action)
  - [github.com/marketplace/actions/add-commit](https://github.com/marketplace/actions/add-commit)
  - [docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/run-jobs-in-a-container#mounting-volumes-in-a-container](https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/run-jobs-in-a-container#mounting-volumes-in-a-container)
- Cloudflare Pages Git integration:
  - [developers.cloudflare.com/pages/get-started/git-integration](https://developers.cloudflare.com/pages/get-started/git-integration/)

    
```shell
#git comment
#update docs and test github action ci
#skip ci
[skip ci] update **/*.tex
[skip ci] update README
[skip ci] update ci.yml
[skip actions] update docs
```

#### Any Linux host with Nginx + pdf2htmlEX bundled page output

```shell
# clone repo to your work dir
git clone git@github.com:blackdesert575/resume.git

cd resume

# edit *.tex
vim src/yh_resume.tex

# output and package output/** to docker image and run a docker container at localhost
bash scripts/pipelines.sh

# test robots
uv run test_robots.py

# or
python3 test_robots.py
```

#### Older single-page-cv notes

- Install the CLI prerequisites on your localhost
- Git clone this repo on your localhost
- manually edit `src/*.tex`
- generate `*.pdf` from `*.tex`
- move PDF output to `single-page-cv/public` in the older workflow
- run the Next.js app under `single-page-cv/`

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

### references

- [Python: Usage with uv](https://docs.astral.sh/uv/)
- [how-to-extract-text-from-a-pdf-file](https://stackoverflow.com/questions/34837707/how-to-extract-text-from-a-pdf-file)
- [pypdf](https://github.com/py-pdf/pypdf)

### parser with Python

```shell
uv add pypdf
```

### build *.tex to output pdf with latexmk

```shell
# check latexmk installed or not
which latexmk
latexmk --version

cd src/
# latexmk yh_resume.tex

latexmk -xelatex -interaction=nonstopmode yh_resume_cht.tex
# clean build unneeded files and keep *.pdf
latexmk -c
```

### build *.tex to output html with htlatex

```shell
htlatex file.tex "xhtml,html5,mathml,charset=utf-8" " -cunihtf -utf8"
```

### build *.tex to output pdf with make

```shell
# build pdf from tex source codes
make all
# remove extra files when building tex project
make clean
```

### building with VS Code

- LaTeX Workshop

### generate *.html from *.pdf

- [How to use this docker container to convert pdf file to html](https://github.com/pdf2htmlEX/pdf2htmlEX/wiki/Download-Docker-Image#how-to-use-this-docker-container-to-convert-pdf-file-to-html)

```shell
# with docker
docker run -ti --rm -v ./src:/pdf -w /pdf pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64 --zoom 1.3 yh_resume.pdf

# with podman
podman run -ti --rm -v ./src:/pdf -w /pdf docker.io/pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64 --zoom 1.3 yh_resume.pdf

# Internal Error: Your version of iconv does not support the "Mac Roman" encoding.
# If this causes problems, reconfigure --without-iconv.
# Preprocessing: 2/2
# Working: 2/2

# add this for My github pages icon
<link rel="icon" type="image/x-icon" href="./favicon.ico">
<link rel="icon" type="image/x-icon" href="../images/ico/favicon.ico">

# edit *.tex with vscode and extension: LaTeX Workshop
vscode yh_resume.tex
vscode yh_resume.pdf

# build with bash shell scripts
bash ./scripts/build.sh

# run with bash shell scripts
bash ./scripts/start.sh
```
