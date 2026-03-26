import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getResumeContent(locale) {
  const fileName = locale === "zh" ? "resume.zh.json" : "resume.en.json";
  const resumePath = path.join(process.cwd(), "..", "content", fileName);
  const content = await readFile(resumePath, "utf8");
  return JSON.parse(content);
}

export function getResumePdfHref(locale) {
  return locale === "zh" ? "/yh_resume_cht.pdf" : "/yh_resume.pdf";
}

export function formatResumeMonth(value) {
  if (value === "present") {
    return "Present";
  }

  const [year, month] = value.split("-");
  if (!year || !month) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${year}-${month}-01T00:00:00Z`));
}
