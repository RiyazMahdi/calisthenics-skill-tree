import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'

function Corner({ top, bottom, left, right }) {
  return (
    <div style={{
      position: 'absolute',
      width: 16, height: 16,
      borderStyle: 'solid',
      borderColor: '#3b82f6',
      borderWidth: `${top ? 2 : 0}px ${right ? 2 : 0}px ${bottom ? 2 : 0}px ${left ? 2 : 0}px`,
      top:    top    ? -1 : undefined,
      bottom: bottom ? -1 : undefined,
      left:   left   ? -1 : undefined,
      right:  right  ? -1 : undefined,
    }} />
  )
}

function AuthScreen() {
  const [mode,           setMode]           = useState('login')
  const [email,          setEmail]          = useState('')
  const [password,       setPassword]       = useState('')
  const [showPassword,   setShowPassword]   = useState(false)
  const [error,          setError]          = useState('')
  const [message,        setMessage]        = useState('')
  const [loading,        setLoading]        = useState(false)
  const [visible,        setVisible]        = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  async function handleSubmit() {
    if (!email || !password) return
    setError('')
    setMessage('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('CHECK YOUR EMAIL TO CONFIRM YOUR ACCOUNT BEFORE LOGGING IN.')
    }

    setLoading(false)
  }

  const canSubmit = email && password && !loading

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    background: '#030810', border: '1px solid #1e3a5f',
    color: '#fff', fontFamily: 'Share Tech Mono, monospace',
    fontSize: '13px', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <div style={{
      width: '100vw', height: '100vh', backgroundColor: '#050d1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Share Tech Mono, monospace',
    }}>

      {/* Background scanlines */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
      }} />

      {/* Auth panel */}
      <div style={{
        position: 'relative', width: 400,
        border: '1px solid #3b82f6',
        boxShadow: '0 0 24px #3b82f6, 0 0 60px #3b82f622, inset 0 0 40px #3b82f606',
        background: 'linear-gradient(160deg, #050d1a 0%, #0a1628 100%)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(24px)',
        transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        <Corner top left /><Corner top right />
        <Corner bottom left /><Corner bottom right />

        {/* Inner scanlines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
        }} />

        {/* Header */}
        <div style={{
          padding: '12px 16px', borderBottom: '1px solid #3b82f644',
          background: '#3b82f608', display: 'flex', alignItems: 'center',
          gap: '8px', position: 'relative',
        }}>
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '3px', color: '#3b82f6' }}>
            <span className="blink">▮</span> SYSTEM
          </span>
          <span style={{ flex: 1, textAlign: 'center', fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '3px', color: '#8eacc8' }}>
            [ SKILL TREE ACCESS ]
          </span>
        </div>

        {/* Title */}
        <div style={{ padding: '24px 24px 16px', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '3px', marginBottom: '6px' }}>
            CALISTHENICS
          </div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '10px', color: '#3b82f6', letterSpacing: '5px' }}>
            SKILL TREE SYSTEM
          </div>
          <div style={{ marginTop: '12px', height: '1px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', margin: '0 24px', gap: '8px', position: 'relative' }}>
          {[['login', 'LOG IN'], ['register', 'REGISTER']].map(([m, label]) => (
            <button key={m} onClick={() => { setMode(m); setError(''); setMessage(''); setShowPassword(false) }}
              style={{
                flex: 1, padding: '8px',
                fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '2px',
                border: `1px solid ${mode === m ? '#3b82f6' : '#1e3a5f'}`,
                background: mode === m ? '#3b82f622' : 'transparent',
                color: mode === m ? '#3b82f6' : '#3a5470',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ padding: '20px 24px 24px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Email */}
          <div>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '2px', color: '#3a5470', marginBottom: '6px' }}>
              EMAIL ADDRESS
            </div>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="yourname@example.com"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#3b82f6'}
              onBlur={e  => e.target.style.borderColor = '#1e3a5f'}
            />
          </div>

          {/* Password with visibility toggle */}
          <div>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '2px', color: '#3a5470', marginBottom: '6px' }}>
              PASSWORD
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: '40px' }}
                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                onBlur={e  => e.target.style.borderColor = '#1e3a5f'}
              />
              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                style={{
                  position: 'absolute', right: '10px',
                  background: 'none', border: 'none',
                  color: '#3a5470', cursor: 'pointer', padding: '4px',
                  display: 'flex', alignItems: 'center',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#3b82f6'}
                onMouseLeave={e => e.currentTarget.style.color = '#3a5470'}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div style={{ padding: '8px 12px', border: '1px solid #ef444466', background: '#ef444408', color: '#ef4444', fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '1px' }}>
              ✕ {error.toUpperCase()}
            </div>
          )}

          {/* Success message (registration) */}
          {message && (
            <div style={{ padding: '8px 12px', border: '1px solid #22c55e66', background: '#22c55e08', color: '#22c55e', fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '1px' }}>
              ✓ {message}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              marginTop: '4px', padding: '12px',
              border: `1px solid ${canSubmit ? '#3b82f6' : '#0d2040'}`,
              background: canSubmit ? '#3b82f618' : 'transparent',
              color: canSubmit ? '#3b82f6' : '#1e3a5f',
              fontFamily: 'Orbitron, sans-serif', fontSize: '10px',
              fontWeight: 700, letterSpacing: '3px',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              boxShadow: canSubmit ? '0 0 12px #3b82f622' : 'none',
            }}
          >
            {loading
              ? '◌ AUTHENTICATING...'
              : mode === 'login'
                ? '◈ ENTER THE SYSTEM'
                : '◈ CREATE YOUR PROFILE'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default AuthScreen