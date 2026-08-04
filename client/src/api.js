const API_BASE_URL = import.meta.env.VITE_API_URL || ''

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.error || payload.message || 'Request failed')
  }

  return payload
}

export function buildAuthHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function signUp(userData) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
}

export function signIn(credentials) {
  return request('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function signOut() {
  return request('/auth/signout')
}

export function getProjects() {
  return request('/api/projects')
}

export function createProject(projectData, token) {
  return request('/api/projects', {
    method: 'POST',
    headers: buildAuthHeaders(token),
    body: JSON.stringify(projectData),
  })
}

export function updateProject(projectId, projectData, token) {
  return request(`/api/projects/${projectId}`, {
    method: 'PUT',
    headers: buildAuthHeaders(token),
    body: JSON.stringify(projectData),
  })
}

export function deleteProject(projectId, token) {
  return request(`/api/projects/${projectId}`, {
    method: 'DELETE',
    headers: buildAuthHeaders(token),
  })
}

export function getQualifications() {
  return request('/api/qualifications')
}

export function createQualification(qualificationData, token) {
  return request('/api/qualifications', {
    method: 'POST',
    headers: buildAuthHeaders(token),
    body: JSON.stringify(qualificationData),
  })
}

export function updateQualification(qualificationId, qualificationData, token) {
  return request(`/api/qualifications/${qualificationId}`, {
    method: 'PUT',
    headers: buildAuthHeaders(token),
    body: JSON.stringify(qualificationData),
  })
}

export function deleteQualification(qualificationId, token) {
  return request(`/api/qualifications/${qualificationId}`, {
    method: 'DELETE',
    headers: buildAuthHeaders(token),
  })
}

export function submitContact(contactData) {
  return request('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(contactData),
  })
}

export function getContacts(token) {
  return request('/api/contacts', {
    headers: buildAuthHeaders(token),
  })
}

export function updateContact(contactId, contactData, token) {
  return request(`/api/contacts/${contactId}`, {
    method: 'PUT',
    headers: buildAuthHeaders(token),
    body: JSON.stringify(contactData),
  })
}

export function deleteContact(contactId, token) {
  return request(`/api/contacts/${contactId}`, {
    method: 'DELETE',
    headers: buildAuthHeaders(token),
  })
}
