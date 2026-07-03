import { useState, useEffect } from 'react'

const rankTitles = {
  D: 'APPRENTICE',
  C: 'ADEPT',
  B: 'INTERMEDIATE',
  A: 'MASTER',
  S: 'GRANDMASTER',
}

function RankUpScreen({ from, to, color, onComplete }) {
  const [visible, setVisible] = useState(false)
  const [floating, setFloating] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const t1 = setTimeout(() => setFloating(true), 2400)
    const t2 = setTimeout(() => onComplete(), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 5000, pointerEvents: 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(5, 13, 26, 0.92)',
        opacity: floating ? 0 : visible ? 1 : 0,
        transition: floating ? 'opacity 1s ease' : 'opacity 0.3s ease',
      }} />

      {/* Radial colour bloom */}
      <div style={{
        position: 'absolute',
        width: visible && !floating ? '220vmax' : 0,
        height: visible && !floating ? '220vmax' : 0,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}18 0%, transparent 65%)`,
        transition: 'all 2.5s ease-out',
        pointerEvents: 'none',
      }} />

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
        opacity: floating ? 0 : 1, transition: 'opacity 0.6s ease',
      }} />

      {/* Main content: scales down and floats to header on exit */}
      <div style={{
        position: 'relative', textAlign: 'center',
        '--rank-color': color,
        opacity: floating ? 0 : visible ? 1 : 0,
        transform: floating
          ? 'translateY(-46vh) scale(0.22)'
          : visible ? 'scale(1)' : 'scale(0.4)',
        transition: floating
          ? 'transform 1s cubic-bezier(0.4, 0, 0.6, 1), opacity 0.7s ease 0.2s'
          : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
      }}>

        {/* RANK PROMOTION label */}
        <div style={{
          fontFamily: 'Orbitron, sans-serif', fontSize: '11px',
          letterSpacing: '8px', color, marginBottom: '20px',
          textShadow: `0 0 20px ${color}`,
        }}>
          ◈ RANK PROMOTION ◈
        </div>

        {/* Decorative top line */}
        <div style={{
          height: '1px', width: 320, margin: '0 auto 20px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }} />

        {/* From → To rank display */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '28px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '2px', color: '#334155', marginBottom: '6px' }}>FROM</div>
            <div style={{
              fontFamily: 'Orbitron, sans-serif', fontSize: '52px', fontWeight: 700,
              color: '#334155', lineHeight: 1,
            }}>{from}</div>
          </div>

          <div style={{ color: '#334155', fontFamily: 'Orbitron, sans-serif', fontSize: '22px' }}>→</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '2px', color, marginBottom: '6px' }}>TO</div>
            <div
              className="rank-letter-pulse"
              style={{
                fontFamily: 'Orbitron, sans-serif', fontSize: '110px', fontWeight: 700,
                color, lineHeight: 1,
              }}
            >
              {to}
            </div>
          </div>
        </div>

        {/* Rank title */}
        <div style={{
          fontFamily: 'Orbitron, sans-serif', fontSize: '16px',
          letterSpacing: '6px', color, marginTop: '16px',
          textShadow: `0 0 16px ${color}`,
        }}>
          {rankTitles[to] || ''}
        </div>

        {/* Decorative bottom line */}
        <div style={{
          height: '1px', width: 320, margin: '20px auto 0',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }} />
      </div>
    </div>
  )
}

export default RankUpScreen