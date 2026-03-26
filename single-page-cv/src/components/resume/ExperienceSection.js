import Section from "./Section";
import { formatResumeMonth } from "../../lib/resume-content";

export default function ExperienceSection({ title, experience }) {
  return (
    <Section title={title}>
      <div className="stack">
        {experience.map((job) => (
          <article key={`${job.company}-${job.start}`} className="card">
            <div className="card-head">
              <div>
                <h3>{job.role}</h3>
                <p className="org-line">{job.company}</p>
              </div>
              <p className="date-range">
                {formatResumeMonth(job.start)} - {formatResumeMonth(job.end)}
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
  );
}
