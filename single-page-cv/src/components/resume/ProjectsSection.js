import Section from "./Section";

export default function ProjectsSection({ title, projects, repositoryLabel }) {
  return (
    <Section title={title}>
      <div className="stack">
        {projects.map((project) => (
          <article key={project.name} className="card">
            <div className="card-head">
              <h3>{project.name}</h3>
              {project.repository ? (
                <a href={project.repository} target="_blank" rel="noreferrer">
                  {repositoryLabel}
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
  );
}
