import { projects } from './siteData'

export default function Projects() {
  return (
    <section className="stack-section">
      <div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h1>Highlighted work</h1>
        <p>
          These sample projects reflect the type of healthcare, AI, and web application
          ideas I am interested in building as I continue growing my technical skills.
        </p>
      </div>

      <div className="card-grid">
        {projects.map((project) => (
          <article key={project.title} className="panel project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <h2>{project.title}</h2>
            <p className="project-role">{project.role}</p>
            <p>{project.outcome}</p>
            <div className="stack-list">
              {project.stack.map((item) => (
                <span key={item} className="stack-tag">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
