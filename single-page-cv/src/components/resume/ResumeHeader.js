export default function ResumeHeader({ basics, summary, copy, locale }) {
  const pdfHref = locale === "zh" ? "/yh_resume_cht.pdf" : "/yh_resume.pdf";

  return (
    <>
      <div className="locale-switcher" aria-label="Language switcher">
        <a href="/?lang=en" className={locale === "en" ? "locale-link active" : "locale-link"}>
          EN
        </a>
        <span className="locale-divider">/</span>
        <a href="/?lang=zh" className={locale === "zh" ? "locale-link active" : "locale-link"}>
          ZH
        </a>
      </div>
      <header className="hero">
        <div className="hero-main">
          <h1>{basics.name}</h1>
          <p className="hero-title">{basics.title}</p>
          <p className="summary">{summary}</p>
        </div>
        <div className="contact-strip">
          <a href={`mailto:${basics.email}`}>{basics.email}</a>
          <a href={basics.github} target="_blank" rel="noreferrer">
            {copy.github}
          </a>
          <p>{basics.location}</p>
          <a href={pdfHref} target="_blank" rel="noreferrer">
            {copy.downloadPdf}
          </a>
        </div>
      </header>
    </>
  );
}
