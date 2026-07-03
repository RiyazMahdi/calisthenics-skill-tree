import { useState, useEffect } from 'react'
import { X, Lock, Check } from 'lucide-react'

function QuestWindow({
  skill, target, currentProgress, isCompleted, isLocked,
  prerequisites, accent, onProgressChange, onComplete, onReset, onClose,
}) {
  const [inputValue, setInputValue] = useState(currentProgress)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  const unit = target?.type === 'time' ? 'SEC' : 'REPS'
  const percent = isCompleted ? 100 : Math.min(100, Math.round((inputValue / (target?.value || 1)) * 100))
  const targetReached = inputValue >= (target?.value || Infinity)

  function handleInputChange(val) {
    const num = Math.max(0, Number(val))
    setInputValue(num)
    onProgressChange(num)
  }

  function handleSaveAndClose() {
    onProgressChange(inputValue)
    onClose()
  }

  // Instantly master the skill: set the achieved reps to the target, then complete.
  function handleMasterInstantly() {
    const goal = target?.value || 0
    setInputValue(goal)
    onProgressChange(goal)
    onComplete()
  }

  // ── LOCKED VIEW ─────────────────────────────────────────────────
  if (isLocked) {
    const prereqsDone = prerequisites.filter(p => p.isCompleted).length
    return (
      <div
        className={`quest-overlay ${visible ? 'quest-overlay-visible' : ''}`}
        onClick={onClose}
      >
        <div
          className={`quest-window ${visible ? 'quest-window-visible' : ''}`}
          style={{ '--accent': '#475569' }}
          onClick={e => e.stopPropagation()}
        >
          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} className={`qw-corner ${pos}`} style={{ borderColor: '#334155' }} />
          ))}
          <div className="qw-scanlines" />

          {/* Locked header */}
          <div className="qw-header" style={{ borderColor: '#1e293b' }}>
            <div className="qw-system-tag" style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Lock size={10} /> SYSTEM
            </div>
            <div className="qw-header-title" style={{ color: '#475569' }}>[ SKILL LOCKED ]</div>
            <button className="qw-close-btn" onClick={onClose} style={{ color: '#475569' }}>
              <X size={15} />
            </button>
          </div>

          {/* Skill identity */}
          <div className="qw-identity" style={{ borderColor: '#1e293b' }}>
            <div className="qw-skill-name" style={{ color: '#64748b' }}>
              {skill.name.toUpperCase()}
            </div>
            <div className="qw-category-badge" style={{ color: '#475569', borderColor: '#334155' }}>
              {skill.category.toUpperCase()}
            </div>
          </div>

          <div className="qw-body">
            <div>
              <div className="qw-label">DESCRIPTION</div>
              <p className="qw-description" style={{ color: '#334155' }}>{skill.description}</p>
            </div>

            <div className="qw-divider" style={{ background: '#1e293b' }} />

            {/* Prerequisites list */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div className="qw-label">PREREQUISITES REQUIRED</div>
                <div style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: 11,
                  color: prereqsDone === prerequisites.length ? '#22c55e' : '#475569',
                }}>
                  {prereqsDone} / {prerequisites.length} COMPLETE
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {prerequisites.map(({ skill: prereqSkill, isCompleted: done }) => (
                  <div
                    key={prereqSkill.id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '9px 12px',
                      border: `1px solid ${done ? '#22c55e33' : '#1e293b'}`,
                      background: done ? '#22c55e06' : '#050d1a',
                    }}
                  >
                    {done
                      ? <Check size={14} color="#22c55e" />
                      : <Lock size={12} color="#334155" />
                    }
                    <span style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      fontSize: 12,
                      color: done ? '#22c55e' : '#475569',
                      flex: 1,
                    }}>
                      {prereqSkill.name}
                    </span>
                    <span style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: 8, letterSpacing: '1px',
                      color: done ? '#22c55e' : '#334155',
                    }}>
                      {done ? '✓ MASTERED' : 'REQUIRED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="qw-divider" style={{ background: '#1e293b' }} />

            <button
              className="qw-btn"
              onClick={onClose}
              style={{ borderColor: '#1e293b', color: '#334155' }}
            >
              ↩ RETURN
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── NORMAL VIEW ──────────────────────────────────────────────────
  function getStatusText() {
    if (isCompleted) return '✦ MASTERED'
    if (targetReached) return '◈ TARGET REACHED'
    return '◌ IN PROGRESS'
  }

  function getStatusColor() {
    if (isCompleted) return '#22c55e'
    if (targetReached) return accent
    return '#3a5470'
  }

  return (
    <div
      className={`quest-overlay ${visible ? 'quest-overlay-visible' : ''}`}
      onClick={handleSaveAndClose}
    >
      <div
        className={`quest-window ${visible ? 'quest-window-visible' : ''}`}
        style={{ '--accent': accent }}
        onClick={e => e.stopPropagation()}
      >
        {['tl', 'tr', 'bl', 'br'].map(pos => (
          <div key={pos} className={`qw-corner ${pos}`} style={{ borderColor: accent }} />
        ))}
        <div className="qw-scanlines" />

        <div className="qw-header" style={{ borderColor: `${accent}44` }}>
          <div className="qw-system-tag" style={{ color: accent }}>
            <span className="blink">▮</span> SYSTEM
          </div>
          <div className="qw-header-title">[ SKILL ASSESSMENT ]</div>
          <button className="qw-close-btn" onClick={onClose} style={{ color: accent }}>
            <X size={15} />
          </button>
        </div>

        <div className="qw-identity" style={{ borderColor: `${accent}33` }}>
          <div className="qw-skill-name">{skill.name.toUpperCase()}</div>
          <div className="qw-category-badge" style={{ color: accent, borderColor: `${accent}88` }}>
            {skill.category.toUpperCase()}
          </div>
        </div>

        <div className="qw-body">
          <div>
            <div className="qw-label">DESCRIPTION</div>
            <p className="qw-description">{skill.description}</p>
          </div>

          <div className="qw-divider" style={{ background: `${accent}30` }} />

          <div className="qw-two-col">
            <div>
              <div className="qw-label">OBJECTIVE</div>
              <div className="qw-value">
                ACHIEVE <span style={{ color: accent }}>{target.value} {unit}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="qw-label">STATUS</div>
              <div className="qw-value pulse" style={{
                color: getStatusColor(),
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 11, letterSpacing: 1,
              }}>
                {getStatusText()}
              </div>
            </div>
          </div>

          {/* Performance section */}
          {isCompleted ? (
            <div>
              <div className="qw-label">ACHIEVED RECORD</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 14px',
                border: '1px solid #22c55e44',
                background: '#0a1f0a',
              }}>
                <Lock size={14} color="#22c55e" />
                <div>
                  {/* Show both achieved and target for context */}
                  <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 26, color: '#22c55e' }}>
                    {currentProgress}
                  </span>
                  <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 14, color: '#1a4a1a', marginLeft: 4 }}>
                    / {target.value}
                  </span>
                  <span style={{
                    fontFamily: 'Orbitron, sans-serif', fontSize: 11,
                    letterSpacing: '2px', color: '#22c55e88', marginLeft: 10,
                  }}>
                    {unit}
                  </span>
                </div>
                <span style={{
                  marginLeft: 'auto', fontFamily: 'Orbitron, sans-serif',
                  fontSize: 9, letterSpacing: '2px', color: '#22c55e66',
                }}>
                  RECORD LOCKED
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="qw-label">CURRENT BEST</div>
              <div className="qw-input-row">
                <input
                  type="number" min="0" value={inputValue}
                  onChange={e => handleInputChange(e.target.value)}
                  className="qw-input"
                  style={{ borderColor: `${accent}66`, color: accent }}
                />
                <span className="qw-unit-label" style={{ color: accent }}>{unit}</span>
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div>
            <div className="qw-progress-row">
              <div className="qw-label">PROGRESS</div>
              <div className="qw-label">
                {isCompleted ? currentProgress : inputValue} / {target.value} {unit}
              </div>
            </div>
            <div className="qw-progress-track">
              <div className="qw-progress-fill" style={{
                width: `${percent}%`,
                background: isCompleted ? '#22c55e' : accent,
                boxShadow: isCompleted
                  ? '0 0 8px #22c55e, 0 0 16px #22c55e66'
                  : `0 0 8px ${accent}, 0 0 16px ${accent}66`,
              }} />
            </div>
            <div className="qw-percent" style={{ color: isCompleted ? '#22c55e' : accent }}>
              {percent}%
            </div>
          </div>

          <div className="qw-divider" style={{ background: `${accent}30` }} />

          {targetReached && !isCompleted && (
            <div style={{
              fontSize: 10, color: '#3a5470',
              fontFamily: 'Orbitron, sans-serif', letterSpacing: 1, textAlign: 'center',
            }}>
              TARGET REACHED. MARK AS MASTERED WHEN READY.
            </div>
          )}

          <div className="qw-actions">
            {isCompleted ? (
              <button className="qw-btn" onClick={onReset}
                style={{ borderColor: '#22c55e66', color: '#22c55e' }}>
                ↩ MARK AS IN PROGRESS
              </button>
            ) : (
              <>
                <button
                  className={`qw-btn ${targetReached ? 'qw-btn-primary' : 'qw-btn-disabled'}`}
                  disabled={!targetReached}
                  onClick={onComplete}
                  style={targetReached ? {
                    background: accent, borderColor: accent,
                    color: '#050d1a', boxShadow: `0 0 16px ${accent}`,
                  } : {}}
                >
                  {targetReached ? '✦ MARK AS MASTERED' : '◌ KEEP TRAINING'}
                </button>

                {/* Skip the grind: master now and auto-fill the target reps */}
                <button
                  className="qw-btn qw-btn-ghost"
                  onClick={handleMasterInstantly}
                  style={{ borderColor: `${accent}66`, color: accent }}
                >
                  ⚡ MASTER INSTANTLY
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestWindow