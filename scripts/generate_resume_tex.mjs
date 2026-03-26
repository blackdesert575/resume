import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const contentDir = path.join(repoRoot, "content");
const templatesDir = path.join(repoRoot, "src", "templates");
const generatedDir = path.join(repoRoot, "src", "generated");

const LOCALE_CONFIG = {
  en: {
    contentFile: "resume.en.json",
    templateFile: "yh_resume.en.tex",
    outputFile: "yh_resume.tex",
    sections: {
      summary: "SUMMARY",
      experience: "EXPERIENCE",
      projects: "PROJECTS",
      education: "EDUCATION",
      skills: "SKILLS",
    },
    labels: {
      technologies: "Technologies",
      repository: "Repository",
      certification: "Certification",
    },
    monthFormatter: new Intl.DateTimeFormat("en", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }),
    present: "Present",
  },
  zh: {
    contentFile: "resume.zh.json",
    templateFile: "yh_resume.zh.tex",
    outputFile: "yh_resume_cht.tex",
    sections: {
      summary: "摘要",
      experience: "工作經驗",
      projects: "專案",
      education: "學歷",
      skills: "技能",
    },
    labels: {
      technologies: "技術",
      repository: "原始碼",
      certification: "專業認證",
    },
    present: "至今",
  },
};

function latexEscape(value) {
  return String(value)
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

function formatDate(value, locale) {
  if (value === "present") {
    return LOCALE_CONFIG[locale].present;
  }

  const [year, month] = String(value).split("-");
  if (!year || !month) {
    return latexEscape(value);
  }

  if (locale === "zh") {
    return `${year}/${month}`;
  }

  return LOCALE_CONFIG[locale].monthFormatter.format(new Date(`${year}-${month}-01T00:00:00Z`));
}

function renderHeading(resume) {
  const githubHandle = resume.basics.github?.split("/").filter(Boolean).at(-1) ?? resume.basics.github;

  return [
    "\\begin{center}",
    `    \\textbf{\\Huge ${latexEscape(resume.basics.name)}} \\\\ \\vspace{5pt}`,
    `    ${latexEscape(resume.basics.title)} \\\\ \\vspace{4pt}`,
    `    \\hspace{1pt} \\faEnvelope \\hspace{2pt} \\texttt{\\href{mailto:${latexEscape(resume.basics.email)}}{${latexEscape(resume.basics.email)}}} \\hspace{1pt} $|$`,
    `    \\hspace{1pt} \\faGithub \\hspace{2pt} \\texttt{\\href{${latexEscape(resume.basics.github)}}{${latexEscape(githubHandle)}}} \\hspace{1pt} $|$`,
    `    \\hspace{1pt} \\faMapMarker* \\hspace{2pt}\\texttt{${latexEscape(resume.basics.location)}}`,
    "    \\\\ \\vspace{-3pt}",
    "\\end{center}",
  ].join("\n");
}

function renderSummary(resume, locale) {
  return [
    `\\section{${LOCALE_CONFIG[locale].sections.summary}}`,
    "\\begin{itemize}[leftmargin=0in, label={}]",
    `  \\item\\small{${latexEscape(resume.summary)}}`,
    "\\end{itemize}",
  ].join("\n");
}

function renderExperience(resume, locale) {
  const { labels } = LOCALE_CONFIG[locale];
  const items = resume.experience
    .map((job) => {
      const lines = [
        "\\resumeSubheading",
        `  {${latexEscape(job.role)}}{${latexEscape(`${formatDate(job.start, locale)} -- ${formatDate(job.end, locale)}`)}}`,
        `  {${latexEscape(job.company)}}{}`,
        "  \\resumeItemListStart",
        ...job.highlights.map((highlight) => `    \\resumeItem{${latexEscape(highlight)}}`),
      ];

      if (job.technologies?.length) {
        lines.push(
          `    \\resumeItem{\\textbf{${latexEscape(labels.technologies)}}: ${latexEscape(job.technologies.join(", "))}}`,
        );
      }

      lines.push("  \\resumeItemListEnd");
      return lines.join("\n");
    })
    .join("\n\n");

  return [
    `\\section{${LOCALE_CONFIG[locale].sections.experience}}`,
    "\\resumeSubHeadingListStart",
    items,
    "\\resumeSubHeadingListEnd",
  ].join("\n");
}

function renderProjects(resume, locale) {
  const { labels } = LOCALE_CONFIG[locale];
  const items = resume.projects
    .map((project) => {
      const lines = [
        "\\resumeProjectHeading",
        `  {\\textbf{${latexEscape(project.name)}}}{}`,
        "  \\resumeItemListStart",
        `    \\resumeItem{${latexEscape(project.description)}}`,
        ...project.highlights.map((highlight) => `    \\resumeItem{${latexEscape(highlight)}}`),
      ];

      if (project.repository) {
        lines.push(
          `    \\resumeItem{\\textbf{${latexEscape(labels.repository)}}: \\href{${latexEscape(project.repository)}}{${latexEscape(project.repository)}}}`,
        );
      }

      if (project.technologies?.length) {
        lines.push(
          `    \\resumeItem{\\textbf{${latexEscape(labels.technologies)}}: ${latexEscape(project.technologies.join(", "))}}`,
        );
      }

      lines.push("  \\resumeItemListEnd");
      return ["\\resumeSubHeadingListStart", lines.join("\n"), "\\resumeSubHeadingListEnd"].join("\n");
    })
    .join("\n\n");

  return [`\\section{${LOCALE_CONFIG[locale].sections.projects}}`, items].join("\n\n");
}

function renderEducation(resume, locale) {
  const items = resume.education
    .map((item) =>
      [
        "\\resumeSubheading",
        `  {${latexEscape(item.school)}}{${latexEscape(`${item.start} -- ${item.end}`)}}`,
        `  {${latexEscape(item.degree)}}{${latexEscape(item.location ?? "")}}`,
      ].join("\n"),
    )
    .join("\n\n");

  return [
    `\\section{${LOCALE_CONFIG[locale].sections.education}}`,
    "\\resumeSubHeadingListStart",
    items,
    "\\resumeSubHeadingListEnd",
  ].join("\n");
}

function renderSkills(resume, locale) {
  const { sections, labels } = LOCALE_CONFIG[locale];
  const skillLines = resume.skills.map((group, index) => {
    const suffix = index === resume.skills.length - 1 && !resume.certifications?.length ? "" : "\\\\";
    return `     \\textbf{${latexEscape(group.category)}}{: ${latexEscape(group.items.join(", "))}} ${suffix}`;
  });

  if (resume.certifications?.length) {
    skillLines.push(
      `     \\textbf{${latexEscape(labels.certification)}}{: ${latexEscape(resume.certifications.map((item) => item.name).join(", "))}}`,
    );
  }

  return [
    `%-----------PROGRAMMING SKILLS-----------`,
    `\\section{${sections.skills}}`,
    ` \\begin{itemize}[leftmargin=0in, label={}]`,
    `    \\small{\\item{`,
    ...skillLines,
    `    }}`,
    ` \\end{itemize}`,
  ].join("\n");
}

function renderTemplate(template, resume, locale) {
  return template
    .replace("%%HEADING%%", renderHeading(resume))
    .replace("%%SUMMARY%%", renderSummary(resume, locale))
    .replace("%%EXPERIENCE%%", renderExperience(resume, locale))
    .replace("%%PROJECTS%%", renderProjects(resume, locale))
    .replace("%%EDUCATION%%", renderEducation(resume, locale))
    .replace("%%SKILLS%%", renderSkills(resume, locale));
}

async function generateLocale(locale) {
  const config = LOCALE_CONFIG[locale];
  const [content, template] = await Promise.all([
    readFile(path.join(contentDir, config.contentFile), "utf8"),
    readFile(path.join(templatesDir, config.templateFile), "utf8"),
  ]);

  const resume = JSON.parse(content);
  const rendered = renderTemplate(template, resume, locale);
  const outputPath = path.join(generatedDir, config.outputFile);

  await mkdir(generatedDir, { recursive: true });
  await writeFile(outputPath, rendered, "utf8");

  return outputPath;
}

async function main() {
  for (const locale of Object.keys(LOCALE_CONFIG)) {
    const outputPath = await generateLocale(locale);
    console.log(`Generated ${path.relative(repoRoot, outputPath)}`);
  }
}

main().catch((error) => {
  console.error("Failed to generate LaTeX files from content JSON.");
  console.error(error);
  process.exitCode = 1;
});
