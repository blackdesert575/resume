vpath %.tex src/
LATEXMK = latexmk
LATEXMK_FLAGS = -f -pdf -pdflatex="pdflatex -interaction=nonstopmode"
DESTDIR = src
TEX_SOURCES = $(wildcard $(DESTDIR)/*.tex)
GENERATED_DIR = src/generated
GENERATED_EN_TEX = $(GENERATED_DIR)/yh_resume.tex
GENERATED_ZH_TEX = $(GENERATED_DIR)/yh_resume_cht.tex
GENERATED_EN_PDF = $(GENERATED_DIR)/yh_resume.pdf
GENERATED_ZH_PDF = $(GENERATED_DIR)/yh_resume_cht.pdf
CONTENT_JSON = $(wildcard content/*.json)

.PHONY: all clean content-tex content-pdf content-clean

all: $(DESTDIR)/yh_resume.pdf

$(DESTDIR)/%.pdf: %.tex
	$(LATEXMK) $(LATEXMK_FLAGS) -jobname=$(basename $@) $<

content-tex: $(GENERATED_EN_TEX) $(GENERATED_ZH_TEX)

$(GENERATED_EN_TEX) $(GENERATED_ZH_TEX): scripts/generate_resume_tex.mjs $(CONTENT_JSON) $(wildcard src/templates/*.tex)
	node scripts/generate_resume_tex.mjs

content-pdf: $(GENERATED_EN_PDF) $(GENERATED_ZH_PDF)

$(GENERATED_EN_PDF): $(GENERATED_EN_TEX)
	$(LATEXMK) $(LATEXMK_FLAGS) -jobname=$(basename $@) $<

$(GENERATED_ZH_PDF): $(GENERATED_ZH_TEX)
	$(LATEXMK) -f -xelatex -interaction=nonstopmode -jobname=$(basename $@) $<

clean:
	$(LATEXMK) -c $(TEX_SOURCES)

content-clean:
	rm -f \
		$(GENERATED_DIR)/yh_resume.aux \
		$(GENERATED_DIR)/yh_resume.fdb_latexmk \
		$(GENERATED_DIR)/yh_resume.fls \
		$(GENERATED_DIR)/yh_resume.log \
		$(GENERATED_DIR)/yh_resume.out \
		$(GENERATED_DIR)/yh_resume.pdf \
		$(GENERATED_DIR)/yh_resume_cht.aux \
		$(GENERATED_DIR)/yh_resume_cht.fdb_latexmk \
		$(GENERATED_DIR)/yh_resume_cht.fls \
		$(GENERATED_DIR)/yh_resume_cht.log \
		$(GENERATED_DIR)/yh_resume_cht.out \
		$(GENERATED_DIR)/yh_resume_cht.pdf \
		$(GENERATED_DIR)/yh_resume_cht.xdv
