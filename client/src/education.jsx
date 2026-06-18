import { education } from './siteData'

export default function Education() {
  return (
    <section className="stack-section">
      <div className="section-heading">
        <p className="eyebrow">Education</p>
        <h1>Qualifications and learning journey</h1>
        <p>
          My academic path is centered on software engineering, artificial intelligence, and
          applying technology to meaningful real-world problems.
        </p>
      </div>

      <div className="timeline">
        {education.map((item) => (
          <article key={`${item.school}-${item.period}`} className="panel timeline-item">
            <p className="timeline-period">{item.period}</p>
            <h2>{item.school}</h2>
            <p>{item.credential}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
