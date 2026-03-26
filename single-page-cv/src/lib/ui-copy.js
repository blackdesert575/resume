export const UI_COPY = {
  en: {
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    certifications: "Certifications",
    links: "Links",
    downloadPdf: "Download PDF",
    github: "GitHub",
    repository: "Repository",
    metadataTitle: "YHH Resume",
    metadataDescription: "Yung-Hung Huang's resume page",
  },
  zh: {
    experience: "工作經驗",
    projects: "專案",
    skills: "技能",
    education: "學歷",
    certifications: "專業認證",
    links: "連結",
    downloadPdf: "下載 PDF",
    github: "GitHub",
    repository: "原始碼",
    metadataTitle: "黃永鴻履歷",
    metadataDescription: "黃永鴻的個人履歷頁面",
  },
};

export function getLocale(searchParams) {
  return searchParams?.lang === "zh" ? "zh" : "en";
}
