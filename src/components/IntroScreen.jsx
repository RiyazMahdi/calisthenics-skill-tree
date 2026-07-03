import { useState, useEffect } from 'react'
import { skillsData } from '../data/skills'

const categoryColors = {
  Push: '#ef4444',
  Pull: '#3b82f6',
  Core: '#facc15',
  Legs: '#22c55e',
}

function getRank(percent) {
  if (percent === 100) return { rank: 'S', color: '#facc15' }
  if (percent >= 75)   return { rank: 'A', color: '#ef4444' }
  if (percent >= 50)   return { rank: 'B', color: '#a855f7' }
  if (percent >= 25)   return { rank: 'C', color: '#3b82f6' }
  if (percent > 0)     return { rank: 'D', color: '#22c55e' }
  return { rank: 'E', color: '#475569' }
}

function IntroScreen({ user, completedSkills, onComplete }) {
  const [exiting, setExiting] = useState(false)
  const [mounted, setMounted] = useState(false)

  const total     = skillsData.length
  const completed = completedSkills.size
  const percent   = Math.round((completed / total) * 100)
  const { rank, color: rankColor } = getRank(percent)
  const hunterName = user.email?.split('@')[0]?.toUpperCase() || 'HUNTER'

  const categoryStats = ['Push', 'Pull', 'Core', 'Legs'].map(cat => {
    const catSkills = skillsData.filter(s => s.category === cat)
    const catDone   = catSkills.filter(s => completedSkills.has(s.id)).length
    return { cat, done: catDone, total: catSkills.length }
  })

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  function handleEnter() {
    setExiting(true)
    setTimeout(onComplete, 700)
  }

  return (
    <div onClick={exiting ? undefined : handleEnter} style={{
      position: 'fixed', inset: 0, backgroundColor: '#050d1a',
      zIndex: 2000, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      opacity: !mounted ? 0 : exiting ? 0 : 1,
      transition: exiting ? 'opacity 0.7s ease' : 'opacity 0.5s ease',
      overflow: 'hidden',
    }}>

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
      }} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, #3b82f60a 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, width: '90%', maxWidth: 460, display: 'flex', flexDirection: 'column', gap: '18px' }}>

        <div className="intro-line" style={{ animationDelay: '0.2s', fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '4px', color: '#3b82f6', textAlign: 'center' }}>
          <span className="blink">▮</span> SYSTEM ONLINE
        </div>

        <div className="intro-line" style={{ animationDelay: '0.6s', height: '1px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />

        <div className="intro-line" style={{ animationDelay: '1.0s', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '10px', letterSpacing: '4px', color: '#3a5470', marginBottom: '10px' }}>
            WELCOME BACK, HUNTER
          </div>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '26px', fontWeight: 700, color: '#fff', letterSpacing: '3px', textShadow: '0 0 24px #3b82f6, 0 0 48px #3b82f644' }}>
            {hunterName}
          </div>
        </div>

        {/* Rank + overall progress */}
        <div className="intro-line" style={{
          animationDelay: '1.8s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px',
          padding: '14px', border: `1px solid ${rankColor}33`, background: `${rankColor}06`,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '2px', color: '#3a5470', marginBottom: '6px' }}>CURRENT RANK</div>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '40px', fontWeight: 700, color: rankColor, lineHeight: 1, textShadow: `0 0 20px ${rankColor}, 0 0 40px ${rankColor}88` }}>
              {rank}
            </div>
          </div>
          <div style={{ width: '1px', height: '50px', background: '#1e293b' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '2px', color: '#3a5470', marginBottom: '8px' }}>OVERALL PROGRESS</div>
            <div style={{ height: '4px', background: '#0a1628', marginBottom: '6px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${percent}%`, background: '#3b82f6', boxShadow: '0 0 8px #3b82f6', transition: 'width 1.2s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Share Tech Mono, monospace', fontSize: '11px', color: '#3b82f6' }}>
              <span>{completed} / {total} SKILLS</span>
              <span>{percent}%</span>
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="intro-line" style={{ animationDelay: '2.5s', border: '1px solid #0d2040', padding: '12px 16px' }}>
          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '2px', color: '#3a5470', marginBottom: '10px' }}>SKILL CATEGORIES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {categoryStats.map(({ cat, done, total: catTotal }) => {
              const color  = categoryColors[cat]
              const catPct = Math.round((done / catTotal) * 100)
              return (
                <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '8px', letterSpacing: '1px', color, width: 38 }}>{cat.toUpperCase()}</span>
                  <div style={{ flex: 1, height: '3px', background: '#0a1628', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${catPct}%`, background: color, boxShadow: `0 0 6px ${color}`, transition: 'width 1.2s ease 0.3s' }} />
                  </div>
                  <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', color, width: 36, textAlign: 'right' }}>
                    {done}/{catTotal}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="intro-line" style={{ animationDelay: '3.2s', height: '1px', background: 'linear-gradient(90deg, transparent, #3b82f644, transparent)' }} />

        {/* Enter button */}
        <div className="intro-line" style={{ animationDelay: '3.5s', textAlign: 'center' }}>
          <button onClick={handleEnter} style={{
            padding: '14px 48px', border: '1px solid #3b82f6',
            background: '#3b82f618', color: '#3b82f6',
            fontFamily: 'Orbitron, sans-serif', fontSize: '11px',
            fontWeight: 700, letterSpacing: '4px', cursor: 'pointer',
            boxShadow: '0 0 20px #3b82f622', transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3b82f633'; e.currentTarget.style.boxShadow = '0 0 32px #3b82f644' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#3b82f618'; e.currentTarget.style.boxShadow = '0 0 20px #3b82f622' }}
          >
            ◈ ENTER SKILL TREE
          </button>
          <div style={{ marginTop: '10px', fontFamily: 'Share Tech Mono, monospace', fontSize: '10px', color: '#1e3a5f', letterSpacing: '1px' }}>
            click anywhere to continue
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroScreen