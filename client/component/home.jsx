import { Link, useLocation } from 'react-router-dom'
import { portfolioOwner, services } from '../src/siteData'

const heroHighlights = ['Healthcare Innovation', 'Artificial Intelligence', 'Software Development']

export default function Home() {
  const { state } = useLocation()

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Welcome to my portfolio</p>
        <h1>{portfolioOwner.name}</h1>
        {state?.submittedBy ? (
          <p className="success-message">
            Thanks, {state.submittedBy || 'friend'} - your message has been captured.
          </p>
        ) : null}
        <p className="lead">
          I am an {portfolioOwner.title} focused on combining healthcare knowledge,
          artificial intelligence, and practical software development.
        </p>
        <p className="mission">Mission statement: {portfolioOwner.tagline}</p>
        <p className="hero-summary">
          My goal is to build intelligent digital solutions that improve decision-making,
          support better patient outcomes, and create meaningful user experiences.
        </p>

        <div className="hero-pill-row">
          {heroHighlights.map((item) => (
            <span key={item} className="hero-pill">
              {item}
            </span>
          ))}
        </div>

        <div className="hero-actions">
          <Link to="/about" className="button primary">
            Learn more about me
          </Link>
          <Link to="/projects" className="button secondary">
            View my projects
          </Link>
        </div>
      </div>

      <div className="hero-card">
        <div className="hero-photo-frame">
          <img src="/profile.jpeg" alt={`${portfolioOwner.name} profile portrait`} className="hero-portrait" />
        </div>

        <div className="hero-card-copy">
          <p className="hero-card-label">Professional focus</p>
          <h2>{portfolioOwner.title}</h2>
          <p>
            Building a personal brand at the intersection of healthcare, intelligent systems,
            and modern frontend development.
          </p>
        </div>

        <div className="quick-facts">
          <h2>Core strengths</h2>
          <ul>
            {services.map((service) => (
              <li key={service.title}>
                <span className="focus-badge">{service.icon}</span>
                <span>{service.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
