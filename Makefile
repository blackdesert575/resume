vpath %.tex src/
LATEXMK = latexmk
LATEXMK_FLAGS = -f -pdf -pdflatex="pdflatex -interaction=nonstopmode"
DESTDIR = src
TEX_SOURCES = $(wildcard $(DESTDIR)/*.tex)

.PHONY: all clean

all: $(DESTDIR)/yh_resume.pdf

$(DESTDIR)/%.pdf: %.tex
	$(LATEXMK) $(LATEXMK_FLAGS) -jobname=$(basename $@) $<

clean:
	$(LATEXMK) -c $(TEX_SOURCES)
