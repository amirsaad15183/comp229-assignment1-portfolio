import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteContact, getContacts, submitContact, updateContact } from './api'
import { useAuth } from './useAuth'
import { portfolioOwner } from './siteData'

const initialForm = {
  firstname: '',
  lastname: '',
  contactNumber: '',
  email: '',
  message: '',
}

export default function Contact() {
  const { isAdmin, token } = useAuth()
  const formRef = useRef(null)
  const [formData, setFormData] = useState(initialForm)
  const [contacts, setContacts] = useState([])
  const [editingContactId, setEditingContactId] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingContacts, setIsLoadingContacts] = useState(false)

  const loadContacts = useCallback(async () => {
    if (!isAdmin) {
      return
    }

    try {
      setIsLoadingContacts(true)
      const data = await getContacts(token)
      setContacts(data)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoadingContacts(false)
    }
  }, [isAdmin, token])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadContacts()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [loadContacts])

  const handleChange = ({ target }) => {
    setFormData((currentData) => ({
      ...currentData,
      [target.name]: target.value,
    }))
  }

  const resetForm = () => {
    setEditingContactId('')
    setFormData(initialForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      if (editingContactId && isAdmin) {
        await updateContact(editingContactId, formData, token)
        setSuccessMessage('Contact updated successfully.')
      } else {
        await submitContact(formData)
        setSuccessMessage('Thanks — your message was saved to the database.')
      }
      resetForm()
      await loadContacts()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (contact) => {
    setEditingContactId(contact._id)
    setFormData({
      firstname: contact.firstname || '',
      lastname: contact.lastname || '',
      contactNumber: contact.contactNumber || '',
      email: contact.email || '',
      message: contact.message || '',
    })
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDelete = async (contactId) => {
    setError('')
    setSuccessMessage('')

    try {
      await deleteContact(contactId, token)
      setSuccessMessage('Contact deleted successfully.')
      await loadContacts()
      if (editingContactId === contactId) {
        resetForm()
      }
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <section className="content-grid two-column align-start">
      <div className="panel contact-panel">
        <p className="eyebrow">Contact</p>
        <h1>Let's connect</h1>
        <p>
          This contact form is now connected to the backend. Messages submitted from the
          frontend are stored in MongoDB.
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

        {isAdmin ? (
          <div className="admin-callout">
            <strong>Admin mode:</strong> you can review, edit, and delete saved contact
            submissions below.
          </div>
        ) : null}
      </div>

      <form ref={formRef} className="panel contact-form" onSubmit={handleSubmit}>
        <label>
          First Name
          <input name="firstname" value={formData.firstname} onChange={handleChange} required />
        </label>
        <label>
          Last Name
          <input name="lastname" value={formData.lastname} onChange={handleChange} required />
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

        {error ? <p className="form-message error">{error}</p> : null}
        {successMessage ? <p className="form-message success">{successMessage}</p> : null}

        <div className="card-actions">
          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : editingContactId ? 'Update contact' : 'Send message'}
          </button>
          {editingContactId ? (
            <button type="button" className="button secondary" onClick={resetForm}>
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      {isAdmin ? (
        <div className="panel admin-list-panel full-width">
          <div className="manager-heading">
            <h2>Saved contact submissions</h2>
            {isLoadingContacts ? <span>Loading...</span> : null}
          </div>

          <div className="admin-card-list">
            {contacts.map((contact) => (
              <article key={contact._id} className="panel compact-card">
                <h3>
                  {contact.firstname} {contact.lastname}
                </h3>
                <p>{contact.email}</p>
                <p>{contact.contactNumber || 'No phone number provided'}</p>
                <p>{contact.message || 'No message provided'}</p>
                <div className="card-actions">
                  <button type="button" className="button secondary" onClick={() => handleEdit(contact)}>
                    Edit
                  </button>
                  <button type="button" className="button ghost danger" onClick={() => handleDelete(contact._id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
