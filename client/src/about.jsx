import { portfolioOwner } from './siteData'

export default function About() {
  return (
    <section className="content-grid two-column">
      <div className="panel profile-panel">
        <img src="/profile.jpeg" alt={`${portfolioOwner.name} profile portrait`} className="profile-image" />
      </div>

      <div className="panel text-panel">
        <p className="eyebrow">About me</p>
        <h1>{portfolioOwner.name}</h1>
        <p>
          My name is Amir Saad, and I am a Software Engineering Technology - Artificial
          Intelligence student at Centennial College with a strong interest in healthcare
          innovation and intelligent software systems.
        </p>
        <p>
          By combining expertise in healthcare and artificial intelligence, I am passionate
          about developing innovative technologies that improve patient care, clinical
          decision-making, and healthcare outcomes. My interests include machine learning,
          intelligent systems, data analytics, and AI-driven healthcare solutions.
        </p>
        <p>
          My long-term goal is to contribute to the advancement of AI in medicine through
          research, software development, and the creation of intelligent tools that support
          healthcare professionals and patients alike.
        </p>
        <a href="/resume.pdf" className="button primary" target="_blank" rel="noreferrer">
          View resume PDF
        </a>
      </div>
    </section>
  )
}
