import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..", "..");

export async function loadResume(locale) {
  const fileName = locale === "zh" ? "resume.zh.json" : "resume.en.json";
  const filePath = path.join(repoRoot, "content", fileName);
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

export function getOutputPath(meta) {
  return path.join(repoRoot, "single-page-cv", "public", meta.pdfFileName);
}

export function getRepositoryRoot() {
  return repoRoot;
}
