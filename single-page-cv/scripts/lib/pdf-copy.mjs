export const PDF_COPY = {
  en: {
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    certifications: "Certifications",
    awards: "Awards",
    links: "Links",
    repository: "Repository",
    present: "Present",
    generatedBy: "Generated from single-page-cv with @react-pdf/renderer",
  },
  zh: {
    experience: "工作經驗",
    projects: "專案",
    skills: "技能",
    education: "學歷",
    certifications: "專業認證",
    awards: "獎項",
    links: "連結",
    repository: "原始碼",
    present: "至今",
    generatedBy: "由 single-page-cv 搭配 @react-pdf/renderer 產生",
  },
};

export function formatResumeMonth(value, locale) {
  if (value === "present") {
    return PDF_COPY[locale].present;
  }

  const [year, month] = value.split("-");
  if (!year || !month) {
    return value;
  }

  if (locale === "zh") {
    return `${year}/${month}`;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${year}-${month}-01T00:00:00Z`));
}
