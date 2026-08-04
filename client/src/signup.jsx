import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from './api'

const initialForm = {
  name: '',
  email: '',
  password: '',
}

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = ({ target }) => {
    setFormData((currentForm) => ({
      ...currentForm,
      [target.name]: target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      const result = await signUp(formData)
      setSuccessMessage(result.message || 'Account created successfully.')
      setFormData(initialForm)
      setTimeout(() => navigate('/signin'), 1200)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-shell">
      <form className="panel auth-form" onSubmit={handleSubmit}>
        <p className="eyebrow">Authentication</p>
        <h1>Create account</h1>
        <p>New users sign up here. Admin access is reserved for the seeded MongoDB admin account.</p>

        <label>
          Full Name
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input name="password" type="password" minLength="6" value={formData.password} onChange={handleChange} required />
        </label>

        {error ? <p className="form-message error">{error}</p> : null}
        {successMessage ? <p className="form-message success">{successMessage}</p> : null}

        <button type="submit" className="button primary" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Sign up'}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/signin">Sign in</Link>.
        </p>
      </form>
    </section>
  )
}
