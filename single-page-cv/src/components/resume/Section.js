export default function Section({ title, children }) {
  return (
    <section className="resume-section">
      <div className="section-heading">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
