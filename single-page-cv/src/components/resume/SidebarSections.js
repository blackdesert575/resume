import Section from "./Section";

export function SkillsSection({ title, skills }) {
  return (
    <Section title={title}>
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
  );
}

export function EducationSection({ title, education }) {
  return (
    <Section title={title}>
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
  );
}

export function CertificationsSection({ title, certifications }) {
  return (
    <Section title={title}>
      <div className="stack">
        {certifications.map((item) => (
          <article key={item.name} className="card compact">
            <h3>{item.name}</h3>
            <p>{item.issuer}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function LinksSection({ title, links }) {
  return (
    <Section title={title}>
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
  );
}
