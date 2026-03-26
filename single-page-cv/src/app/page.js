import { readFile } from "node:fs/promises";
import path from "node:path";

async function getResumeContent() {
  const resumePath = path.join(process.cwd(), "..", "content", "resume.en.json");
  const content = await readFile(resumePath, "utf8");
  return JSON.parse(content);
}

function formatDate(value) {
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

function Section({ title, children }) {
  return (
    <section className="resume-section">
      <div className="section-heading">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default async function ResumePage() {
  const resume = await getResumeContent();
  const { basics, summary, skills, experience, projects, education, certifications, links } =
    resume;

  return (
    <main className="resume-shell">
      <div className="resume-frame">
        <header className="hero">
          <div className="hero-main">
            <h1>{basics.name}</h1>
            <p className="hero-title">{basics.title}</p>
            <p className="summary">{summary}</p>
          </div>
          <div className="contact-strip">
            <a href={`mailto:${basics.email}`}>{basics.email}</a>
            <a href={basics.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <p>{basics.location}</p>
            <a href="/yh_resume.pdf" target="_blank" rel="noreferrer">
              Download PDF
            </a>
          </div>
        </header>

        <div className="resume-grid">
          <div className="resume-main">
            <Section title="Experience">
              <div className="stack">
                {experience.map((job) => (
                  <article key={`${job.company}-${job.start}`} className="card">
                    <div className="card-head">
                      <div>
                        <h3>{job.role}</h3>
                        <p className="org-line">{job.company}</p>
                      </div>
                      <p className="date-range">
                        {formatDate(job.start)} - {formatDate(job.end)}
                      </p>
                    </div>
                    <ul>
                      {job.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {job.technologies?.length ? (
                      <div className="tag-row">
                        {job.technologies.map((item) => (
                          <span key={item} className="tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Projects">
              <div className="stack">
                {projects.map((project) => (
                  <article key={project.name} className="card">
                    <div className="card-head">
                      <h3>{project.name}</h3>
                      {project.repository ? (
                        <a href={project.repository} target="_blank" rel="noreferrer">
                          Repository
                        </a>
                      ) : null}
                    </div>
                    <p>{project.description}</p>
                    {project.highlights?.length ? (
                      <ul>
                        {project.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {project.technologies?.length ? (
                      <div className="tag-row">
                        {project.technologies.map((item) => (
                          <span key={item} className="tag">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </Section>
          </div>

          <aside className="resume-side">
            <Section title="Skills">
              <div className="stack">
                {skills.map((group) => (
                  <article key={group.category} className="card compact">
                    <h3>{group.category}</h3>
                    <div className="tag-row">
                      {group.items.map((item) => (
                        <span key={item} className="tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Education">
              <div className="stack">
                {education.map((item) => (
                  <article key={`${item.school}-${item.start}`} className="card compact">
                    <h3>{item.degree}</h3>
                    <p>{item.school}</p>
                    <p className="muted">
                      {item.start} - {item.end}
                    </p>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Certifications">
              <div className="stack">
                {certifications.map((item) => (
                  <article key={item.name} className="card compact">
                    <h3>{item.name}</h3>
                    <p>{item.issuer}</p>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Links">
              <div className="stack">
                {links.map((item) => (
                  <article key={item.url} className="card compact">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  </article>
                ))}
              </div>
            </Section>
          </aside>
        </div>
      </div>
    </main>
  );
}
