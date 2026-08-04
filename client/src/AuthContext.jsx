import { useState } from 'react'
import { signIn as signInRequest, signOut as signOutRequest } from './api'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'portfolioAuth'

function getStoredAuth() {
  const rawAuth = localStorage.getItem(STORAGE_KEY)
  if (!rawAuth) {
    return { token: '', user: null }
  }

  try {
    return JSON.parse(rawAuth)
  } catch {
    return { token: '', user: null }
  }
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(getStoredAuth)

  const updateAuthState = (nextState) => {
    setAuthState(nextState)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
  }

  const clearAuthState = () => {
    const nextState = { token: '', user: null }
    setAuthState(nextState)
    localStorage.removeItem(STORAGE_KEY)
  }

  const signIn = async (credentials) => {
    const result = await signInRequest(credentials)
    updateAuthState({ token: result.token, user: result.user })
    return result
  }

  const signOut = async () => {
    try {
      await signOutRequest()
    } finally {
      clearAuthState()
    }
  }

  const value = {
    token: authState.token,
    user: authState.user,
    isAuthenticated: Boolean(authState.token),
    isAdmin: authState.user?.role === 'admin',
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
