import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { portfolioOwner } from './siteData'

const initialForm = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  email: '',
  message: '',
}

export default function Contact() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // For this assignment, the form captures user input and returns to the home page.
    navigate('/', {
      state: {
        submittedBy: `${formData.firstName} ${formData.lastName}`.trim(),
      },
    })
    setFormData(initialForm)
  }

  return (
    <section className="content-grid two-column">
      <div className="panel contact-panel">
        <p className="eyebrow">Contact</p>
        <h1>Let's connect</h1>
        <p>
          I am always open to conversations about healthcare innovation, artificial
          intelligence, and collaborative technology projects.
        </p>
        <p>Email: {portfolioOwner.email}</p>
        <p>Phone: {portfolioOwner.phone}</p>
        <p>Location: {portfolioOwner.location}</p>
        <p>
          LinkedIn:{' '}
          <a href={portfolioOwner.linkedin} target="_blank" rel="noreferrer">
            View profile
          </a>
        </p>
        <p>
          GitHub:{' '}
          <a href={portfolioOwner.github} target="_blank" rel="noreferrer">
            View repositories
          </a>
        </p>
      </div>

      <form className="panel contact-form" onSubmit={handleSubmit}>
        <label>
          First Name
          <input name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name
          <input name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Contact Number
          <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </label>
        <label>
          Email Address
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Message
          <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required />
        </label>
        <button type="submit" className="button primary">
          Send message
        </button>
      </form>
    </section>
  )
}
