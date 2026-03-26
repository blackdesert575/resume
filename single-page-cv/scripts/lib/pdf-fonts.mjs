import { existsSync } from "node:fs";
import { Font } from "@react-pdf/renderer";

const ENGLISH_FONT_PATHS = ["/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf"];
const CHINESE_FONT_PATHS = [
  "/usr/share/fonts/truetype/arphic-bkai00mp/bkai00mp.ttf",
  "/usr/share/fonts/truetype/arphic-bsmi00lp/bsmi00lp.ttf",
  "/usr/share/fonts/truetype/arphic-gkai00mp/gkai00mp.ttf",
  "/usr/share/fonts/truetype/arphic-gbsn00lp/gbsn00lp.ttf",
  "/usr/share/fonts/truetype/arphic/uming.ttc",
  "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf",
];

let fontsRegistered = false;

function pickFirstExistingFont(paths) {
  for (const candidate of paths) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function registerPdfFonts() {
  if (fontsRegistered) {
    return;
  }

  const englishFontPath = pickFirstExistingFont(ENGLISH_FONT_PATHS);
  const chineseFontPath = pickFirstExistingFont(CHINESE_FONT_PATHS);

  if (!englishFontPath) {
    throw new Error("Could not find an English font for PDF generation.");
  }

  if (!chineseFontPath) {
    throw new Error("Could not find a Chinese-capable font for PDF generation.");
  }

  Font.register({
    family: "ResumeSansEn",
    src: englishFontPath,
  });

  Font.register({
    family: "ResumeSansZh",
    src: chineseFontPath,
  });

  fontsRegistered = true;
}

export function getPdfFontFamily(locale) {
  return locale === "zh" ? "ResumeSansZh" : "ResumeSansEn";
}
