import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Read the existing session on first load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for future login / logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{
        width: '100vw', height: '100vh',
        backgroundColor: '#050d1a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '11px', letterSpacing: '3px', color: '#3b82f6',
      }}>
        <span className="blink">▮</span>&nbsp;SYSTEM LOADING...
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}