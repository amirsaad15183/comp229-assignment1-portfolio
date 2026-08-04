import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from './useAuth'

const initialForm = {
  email: '',
  password: '',
}

export default function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
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
    setIsSubmitting(true)

    try {
      await signIn(formData)
      navigate(location.state?.from?.pathname || '/', { replace: true })
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
        <h1>Sign in</h1>
        <p>Use your account to view role-based features and manage the portfolio as admin.</p>

        <label>
          Email
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Password
          <input name="password" type="password" value={formData.password} onChange={handleChange} required />
        </label>

        {error ? <p className="form-message error">{error}</p> : null}

        <button type="submit" className="button primary" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>

        <p className="auth-switch">
          Need an account? <Link to="/signup">Create one here</Link>.
        </p>
      </form>
    </section>
  )
}
