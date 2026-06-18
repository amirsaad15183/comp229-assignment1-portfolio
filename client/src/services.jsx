import { services } from './siteData'

export default function Services() {
  return (
    <section className="stack-section">
      <div className="section-heading">
        <p className="eyebrow">Services</p>
        <h1>What I can help with</h1>
        <p>
          My services reflect a blend of healthcare knowledge, technical learning, and a
          strong interest in AI-driven problem solving.
        </p>
      </div>

      <div className="card-grid">
        {services.map((service) => (
          <article key={service.title} className="panel service-card">
            <div className="service-icon">{service.icon}</div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
