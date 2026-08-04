import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createProject, deleteProject, getProjects, updateProject } from './api'
import { useAuth } from './useAuth'
import { portfolioOwner } from './siteData'

const [ownerFirstName, ...ownerLastNameParts] = portfolioOwner.name.split(' ')

const baseProjectForm = {
  title: '',
  firstname: ownerFirstName,
  lastname: ownerLastNameParts.join(' '),
  email: portfolioOwner.email,
  completionDate: '',
  description: '',
}

export default function Projects() {
  const { isAdmin, token } = useAuth()
  const formRef = useRef(null)
  const [projects, setProjects] = useState([])
  const [formData, setFormData] = useState(baseProjectForm)
  const [editingProjectId, setEditingProjectId] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const buttonLabel = useMemo(
    () => (editingProjectId ? 'Update project' : 'Create project'),
    [editingProjectId],
  )

  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadProjects()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [loadProjects])

  const handleChange = ({ target }) => {
    setFormData((currentForm) => ({
      ...currentForm,
      [target.name]: target.value,
    }))
  }

  const resetForm = () => {
    setEditingProjectId('')
    setFormData(baseProjectForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, formData, token)
        setSuccessMessage('Project updated successfully.')
      } else {
        await createProject(formData, token)
        setSuccessMessage('Project created successfully.')
      }
      resetForm()
      await loadProjects()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (project) => {
    setEditingProjectId(project._id)
    setFormData({
      title: project.title || '',
      firstname: project.firstname || '',
      lastname: project.lastname || '',
      email: project.email || '',
      completionDate: project.completionDate ? project.completionDate.slice(0, 10) : '',
      description: project.description || '',
    })
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDelete = async (projectId) => {
    setError('')
    setSuccessMessage('')

    try {
      await deleteProject(projectId, token)
      setSuccessMessage('Project deleted successfully.')
      await loadProjects()
      if (editingProjectId === projectId) {
        resetForm()
      }
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <section className="stack-section">
      <div className="section-heading">
        <p className="eyebrow">Projects</p>
        <h1>Highlighted work</h1>
        <p>
          This page now consumes backend data. Everyone can view projects, and the admin can
          create, edit, and delete them from the frontend.
        </p>
      </div>

      {isAdmin ? (
        <form ref={formRef} className="panel manager-form" onSubmit={handleSubmit}>
          <div className="manager-heading">
            <h2>{editingProjectId ? 'Edit project' : 'Add a project'}</h2>
            {editingProjectId ? (
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

      {isLoading ? <p>Loading projects...</p> : null}

      <div className="card-grid">
        {projects.map((project) => (
          <article key={project._id} className="panel project-card">
            <div className="project-copy">
              <p className="project-role">{new Date(project.completionDate).toLocaleDateString()}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p className="project-meta">
                Created by {project.firstname} {project.lastname} · {project.email}
              </p>
            </div>

            {isAdmin ? (
              <div className="card-actions">
                <button type="button" className="button secondary" onClick={() => handleEdit(project)}>
                  Edit
                </button>
                <button type="button" className="button ghost danger" onClick={() => handleDelete(project._id)}>
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
