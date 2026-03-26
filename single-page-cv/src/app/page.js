import { readFile } from "node:fs/promises";
import path from "node:path";
import ExperienceSection from "../components/resume/ExperienceSection";
import ProjectsSection from "../components/resume/ProjectsSection";
import ResumeHeader from "../components/resume/ResumeHeader";
import {
  CertificationsSection,
  EducationSection,
  LinksSection,
  SkillsSection,
} from "../components/resume/SidebarSections";

async function getResumeContent(locale) {
  const fileName = locale === "zh" ? "resume.zh.json" : "resume.en.json";
  const resumePath = path.join(process.cwd(), "..", "content", fileName);
  const content = await readFile(resumePath, "utf8");
  return JSON.parse(content);
}

const UI_COPY = {
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
  },
};

export default async function ResumePage({ searchParams }) {
  const params = await searchParams;
  const locale = params?.lang === "zh" ? "zh" : "en";
  const resume = await getResumeContent(locale);
  const copy = UI_COPY[locale];
  const { basics, summary, skills, experience, projects, education, certifications, links } =
    resume;

  return (
    <main className="resume-shell">
      <div className="resume-frame">
        <ResumeHeader basics={basics} summary={summary} copy={copy} locale={locale} />

        <div className="resume-grid">
          <div className="resume-main">
            <ExperienceSection title={copy.experience} experience={experience} />
            <ProjectsSection
              title={copy.projects}
              projects={projects}
              repositoryLabel={copy.repository}
            />
          </div>

          <aside className="resume-side">
            <SkillsSection title={copy.skills} skills={skills} />
            <EducationSection title={copy.education} education={education} />
            <CertificationsSection title={copy.certifications} certifications={certifications} />
            <LinksSection title={copy.links} links={links} />
          </aside>
        </div>
      </div>
    </main>
  );
}
