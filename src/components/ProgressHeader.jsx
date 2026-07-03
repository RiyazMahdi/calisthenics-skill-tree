import { skillsData } from '../data/skills'

const categoryColors = {
  Push: '#ef4444',
  Pull: '#3b82f6',
  Core: '#facc15',
  Legs: '#22c55e',
}

const categories = ['All', 'Push', 'Pull', 'Core', 'Legs']

function getRank(percent) {
  if (percent === 100) return { rank: 'S', color: '#facc15' }
  if (percent >= 75)   return { rank: 'A', color: '#ef4444' }
  if (percent >= 50)   return { rank: 'B', color: '#a855f7' }
  if (percent >= 25)   return { rank: 'C', color: '#3b82f6' }
  if (percent > 0)     return { rank: 'D', color: '#22c55e' }
  return { rank: 'E', color: '#475569' }
}

function getNextRankInfo(completed, total) {
  const thresholds = [
    { rank: 'D', skills: 1 },
    { rank: 'C', skills: Math.ceil(total * 0.25) },
    { rank: 'B', skills: Math.ceil(total * 0.50) },
    { rank: 'A', skills: Math.ceil(total * 0.75) },
    { rank: 'S', skills: total },
  ]
  for (const threshold of thresholds) {
    if (completed < threshold.skills) {
      return { nextRank: threshold.rank, skillsNeeded: threshold.skills - completed }
    }
  }
  return null
}

function ProgressHeader({ completedSkills, filter, setFilter, onSignOut }) {
  const total          = skillsData.length
  const completed      = completedSkills.size
  const overallPercent = Math.round((completed / total) * 100)
  const { rank, color: rankColor } = getRank(overallPercent)
  const nextRankInfo   = getNextRankInfo(completed, total)

  const categoryStats = ['Push', 'Pull', 'Core', 'Legs'].map(cat => {
    const catSkills    = skillsData.filter(s => s.category === cat)
    const catCompleted = catSkills.filter(s => completedSkills.has(s.id)).length
    const catPercent   = Math.round((catCompleted / catSkills.length) * 100)
    return { cat, total: catSkills.length, completed: catCompleted, percent: catPercent }
  })

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '80px',
      backgroundColor: '#050d1a', borderBottom: '1px solid #0d2040',
      zIndex: 100, display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: '20px',
      boxShadow: '0 2px 24px rgba(59, 130, 246, 0.08)',
    }}>

      {/* Title */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '3px', color: '#3b82f6', marginBottom: '3px' }}>SYSTEM</div>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', color: '#fff' }}>SKILL TREE</div>
      </div>

      <div style={{ width: '1px', height: '40px', background: '#0d2040', flexShrink: 0 }} />

      {/* Rank */}
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '2px', color: '#3a5470', marginBottom: '2px' }}>RANK</div>
        <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '26px', fontWeight: 700, color: rankColor, lineHeight: 1, textShadow: `0 0 16px ${rankColor}`, transition: 'color 0.4s ease, text-shadow 0.4s ease' }}>
          {rank}
        </div>
        <div style={{ marginTop: '4px', fontFamily: 'Orbitron, sans-serif', fontSize: '7px', letterSpacing: '1px', color: '#3a5470', whiteSpace: 'nowrap' }}>
          {nextRankInfo ? `${nextRankInfo.skillsNeeded} TO ${nextRankInfo.nextRank}` : 'MAX RANK'}
        </div>
      </div>

      <div style={{ width: '1px', height: '40px', background: '#0d2040', flexShrink: 0 }} />

      {/* Overall progress */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '10px', letterSpacing: '2px', color: '#3a5470' }}>OVERALL COMPLETION</span>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '13px', color: '#3b82f6' }}>{completed} / {total} SKILLS</span>
        </div>
        <div style={{ height: '5px', background: '#0a1628', border: '1px solid #0d2040', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overallPercent}%`, background: '#3b82f6', boxShadow: '0 0 8px #3b82f6', transition: 'width 0.5s ease' }} />
        </div>
        <div style={{ marginTop: '4px', fontFamily: 'Orbitron, sans-serif', fontSize: '11px', color: '#3b82f6', textAlign: 'right', letterSpacing: '1px' }}>
          {overallPercent}%
        </div>
      </div>

      <div style={{ width: '1px', height: '40px', background: '#0d2040', flexShrink: 0 }} />

      {/* Per-category bars */}
      <div style={{ display: 'flex', gap: '14px', flexShrink: 0 }}>
        {categoryStats.map(({ cat, total: catTotal, completed: catDone, percent }) => (
          <div key={cat} style={{ width: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '1px', color: categoryColors[cat] }}>{cat.toUpperCase()}</span>
              <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '11px', color: categoryColors[cat] }}>{catDone}/{catTotal}</span>
            </div>
            <div style={{ height: '4px', background: '#0a1628', border: `1px solid ${categoryColors[cat]}33`, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${percent}%`, background: categoryColors[cat], boxShadow: `0 0 6px ${categoryColors[cat]}`, transition: 'width 0.5s ease' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: '1px', height: '40px', background: '#0d2040', flexShrink: 0 }} />

      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        {categories.map(cat => {
          const color    = cat === 'All' ? '#3b82f6' : categoryColors[cat]
          const isActive = filter === cat
          return (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              padding: '6px 12px',
              border: `1px solid ${isActive ? color : `${color}44`}`,
              background: isActive ? `${color}22` : 'transparent',
              color: isActive ? color : `${color}88`,
              fontFamily: 'Orbitron, sans-serif', fontSize: '10px',
              fontWeight: 700, letterSpacing: '1px', cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? `0 0 8px ${color}44` : 'none',
            }}>
              {cat}
            </button>
          )
        })}
      </div>

      <div style={{ width: '1px', height: '40px', background: '#0d2040', flexShrink: 0 }} />

      {/* Sign out */}
      <button
        onClick={onSignOut}
        style={{
          background: 'none', border: '1px solid #1e3a5f', color: '#3a5470',
          cursor: 'pointer', padding: '6px 10px',
          fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '1px',
          flexShrink: 0, transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#ef444488' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#3a5470'; e.currentTarget.style.borderColor = '#1e3a5f' }}
      >
        SIGN OUT
      </button>
    </div>
  )
}

export default ProgressHeader