import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToFile } from "@react-pdf/renderer";
import { PDF_COPY } from "./lib/pdf-copy.mjs";
import { getPdfFontFamily, registerPdfFonts } from "./lib/pdf-fonts.mjs";
import { loadResume, getOutputPath } from "./lib/resume-data.mjs";
import { createResumePdfDocument } from "./lib/resume-pdf-document.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");

function parseLocales(argv) {
  const langArg = argv.find((arg) => arg.startsWith("--lang="));
  if (!langArg) {
    return ["en", "zh"];
  }

  const locale = langArg.split("=")[1];
  return locale === "zh" ? ["zh"] : ["en"];
}

async function generateLocalePdf(locale) {
  const resume = await loadResume(locale);
  const outputPath = getOutputPath(resume.meta);
  const copy = PDF_COPY[locale];
  const fontFamily = getPdfFontFamily(locale);
  const document = createResumePdfDocument({ resume, copy, fontFamily });

  await mkdir(path.dirname(outputPath), { recursive: true });
  await renderToFile(document, outputPath);

  return outputPath;
}

async function main() {
  process.chdir(appRoot);
  registerPdfFonts();

  const locales = parseLocales(process.argv.slice(2));

  for (const locale of locales) {
    const outputPath = await generateLocalePdf(locale);
    const relativeOutputPath = path.relative(appRoot, outputPath);
    console.log(`Generated ${locale} PDF: ${relativeOutputPath}`);
  }
}

main().catch((error) => {
  console.error("Failed to generate resume PDF with @react-pdf/renderer.");
  console.error(error);
  process.exitCode = 1;
});
