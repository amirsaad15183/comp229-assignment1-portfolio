import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  createQualification,
  deleteQualification,
  getQualifications,
  updateQualification,
} from './api'
import { useAuth } from './useAuth'
import { portfolioOwner } from './siteData'

const [ownerFirstName, ...ownerLastNameParts] = portfolioOwner.name.split(' ')

const baseQualificationForm = {
  title: '',
  firstname: ownerFirstName,
  lastname: ownerLastNameParts.join(' '),
  email: portfolioOwner.email,
  completionDate: '',
  description: '',
}

export default function Education() {
  const { isAdmin, token } = useAuth()
  const formRef = useRef(null)
  const [qualifications, setQualifications] = useState([])
  const [formData, setFormData] = useState(baseQualificationForm)
  const [editingQualificationId, setEditingQualificationId] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const buttonLabel = useMemo(
    () => (editingQualificationId ? 'Update qualification' : 'Create qualification'),
    [editingQualificationId],
  )

  const loadQualifications = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getQualifications()
      setQualifications(data)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadQualifications()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [loadQualifications])

  const handleChange = ({ target }) => {
    setFormData((currentForm) => ({
      ...currentForm,
      [target.name]: target.value,
    }))
  }

  const resetForm = () => {
    setEditingQualificationId('')
    setFormData(baseQualificationForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      if (editingQualificationId) {
        await updateQualification(editingQualificationId, formData, token)
        setSuccessMessage('Qualification updated successfully.')
      } else {
        await createQualification(formData, token)
        setSuccessMessage('Qualification created successfully.')
      }
      resetForm()
      await loadQualifications()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (qualification) => {
    setEditingQualificationId(qualification._id)
    setFormData({
      title: qualification.title || '',
      firstname: qualification.firstname || '',
      lastname: qualification.lastname || '',
      email: qualification.email || '',
      completionDate: qualification.completionDate ? qualification.completionDate.slice(0, 10) : '',
      description: qualification.description || '',
    })
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDelete = async (qualificationId) => {
    setError('')
    setSuccessMessage('')

    try {
      await deleteQualification(qualificationId, token)
      setSuccessMessage('Qualification deleted successfully.')
      await loadQualifications()
      if (editingQualificationId === qualificationId) {
        resetForm()
      }
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <section className="stack-section">
      <div className="section-heading">
        <p className="eyebrow">Education</p>
        <h1>Qualifications and learning journey</h1>
        <p>
          Qualifications are now loaded from the backend. The admin can manage records from
          the frontend while regular users can view them.
        </p>
      </div>

      {isAdmin ? (
        <form ref={formRef} className="panel manager-form" onSubmit={handleSubmit}>
          <div className="manager-heading">
            <h2>{editingQualificationId ? 'Edit qualification' : 'Add a qualification'}</h2>
            {editingQualificationId ? (
              <button type="button" className="button secondary" onClick={resetForm}>
                Cancel edit
              </button>
            ) : null}
          </div>

          <div className="form-grid">
            <label>
              Title
              <input name="title" value={formData.title} onChange={handleChange} required />
            </label>
            <label>
              Completion Date
              <input name="completionDate" type="date" value={formData.completionDate} onChange={handleChange} required />
            </label>
            <label>
              First Name
              <input name="firstname" value={formData.firstname} onChange={handleChange} required />
            </label>
            <label>
              Last Name
              <input name="lastname" value={formData.lastname} onChange={handleChange} required />
            </label>
            <label className="field-span">
              Email
              <input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label className="field-span">
              Description
              <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required />
            </label>
          </div>

          {error ? <p className="form-message error">{error}</p> : null}
          {successMessage ? <p className="form-message success">{successMessage}</p> : null}

          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : buttonLabel}
          </button>
        </form>
      ) : null}

      {error && !isAdmin ? <p className="form-message error">{error}</p> : null}

      {isLoading ? <p>Loading qualifications...</p> : null}

      <div className="timeline">
        {qualifications.map((item) => (
          <article key={item._id} className="panel timeline-item">
            <p className="timeline-period">{new Date(item.completionDate).toLocaleDateString()}</p>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p className="project-meta">
              Added by {item.firstname} {item.lastname} · {item.email}
            </p>
            {isAdmin ? (
              <div className="card-actions">
                <button type="button" className="button secondary" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button type="button" className="button ghost danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
