import ExperienceSection from "../components/resume/ExperienceSection";
import ProjectsSection from "../components/resume/ProjectsSection";
import ResumeHeader from "../components/resume/ResumeHeader";
import {
  CertificationsSection,
  EducationSection,
  LinksSection,
  SkillsSection,
} from "../components/resume/SidebarSections";
import { getResumeContent } from "../lib/resume-content";
import { getLocale, UI_COPY } from "../lib/ui-copy";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const locale = getLocale(params);
  const copy = UI_COPY[locale];
  const resume = await getResumeContent(locale);
  const { basics, summary } = resume;

  return {
    title: `${basics.name} | ${copy.metadataTitle}`,
    description: summary || copy.metadataDescription,
  };
}

export default async function ResumePage({ searchParams }) {
  const params = await searchParams;
  const locale = getLocale(params);
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
