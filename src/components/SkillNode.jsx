import { Handle, Position } from '@xyflow/react'
import { Flame, Anchor, Shield, Footprints, Lock, Check } from 'lucide-react'

const categoryIcons = {
  Push: Flame,
  Pull: Anchor,
  Core: Shield,
  Legs: Footprints,
}

// SVG path matching the clip-path polygon for a 175×56 node with 10px cut corners
// Path is 1px inset so the stroke sits fully inside the clipped area
const BORDER_PATH = 'M 10,1 L 174,1 L 174,46 L 164,55 L 1,55 L 1,10 Z'
const BORDER_PERIMETER = 452

// Milestone gold (used for the border + inline star)
const GOLD = '#fbbf24'

function SkillNode({ data }) {
  const {
    label, category, state, accent, isInFilter,
    isRecentlyCompleted, isRecentlyUnlocked, milestone,
  } = data

  const Icon = categoryIcons[category]

  const bgColor = !isInFilter
    ? '#0f172a'
    : state === 'completed'
      ? accent
      : '#0f172a'

  const textColor = !isInFilter
    ? '#334155'
    : state === 'completed'
      ? '#0f172a'
      : state === 'locked'
        ? '#64748b'
        : '#fff'

  // Milestone skills get a gold border instead of the category colour,
  // so they read clearly as benchmarks without a cropped corner badge.
  const borderColor = !isInFilter
    ? (milestone ? '#3a2e0a' : '#1e293b')
    : state === 'locked'
      ? (milestone ? '#a16207' : '#475569')
      : (milestone ? GOLD : accent)

  const borderOpacity = !isInFilter ? 0.15 : state === 'locked' ? 0.4 : 1

  // When recently completed: draw the border in, then transition to pulsing glow
  // When completed (not recent): permanent pulsing glow
  const borderAnimation = isRecentlyCompleted
    ? `borderDrawIn 1s ease-out forwards, borderGlowPulse 3s ease-in-out 1s infinite`
    : state === 'completed' && isInFilter
      ? 'borderGlowPulse 3s ease-in-out infinite'
      : undefined

  const animClass = isRecentlyCompleted
    ? 'skill-anim-completing'
    : isRecentlyUnlocked
      ? 'skill-anim-unlocking'
      : ''

  // Inline star colour adapts to the node state (dark text on a filled completed node)
  const starColor = state === 'completed' ? '#7c5e00' : GOLD

  // Reps to show on the node
  const showReps = (state === 'unlocked' || state === 'completed') && isInFilter && data.target
  const repsText = data.target
    ? state === 'completed'
      ? `${Math.max(data.current || 0, data.target.value)}/${data.target.value}`
      : `${Math.min(data.current || 0, data.target.value)}/${data.target.value}`
    : ''

  return (
    <div
      className={`skill-node-root ${animClass}`}
      style={{
        '--node-accent': accent,
        '--border-color': borderColor,
        width: 175,
        height: 56,
        position: 'relative',
        clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
        background: bgColor,
        transition: 'background 0.6s ease, opacity 0.4s ease',
        opacity: isInFilter ? 1 : 0.18,
      }}
    >
      {/* SVG border: draws itself progressively on completion, then pulses */}
      <svg
        viewBox="0 0 175 56"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 175, height: 56,
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <path
          d={BORDER_PATH}
          fill="none"
          stroke={borderColor}
          strokeWidth={milestone ? 3.5 : 3}
          strokeOpacity={borderOpacity}
          style={{
            filter: state !== 'locked' && isInFilter
              ? milestone
                ? `drop-shadow(0 0 4px ${GOLD}) drop-shadow(0 0 9px ${GOLD})`
                : `drop-shadow(0 0 4px ${borderColor})`
              : 'none',
            strokeDasharray: isRecentlyCompleted ? BORDER_PERIMETER : undefined,
            strokeDashoffset: isRecentlyCompleted ? BORDER_PERIMETER : undefined,
            animation: borderAnimation,
          }}
        />
      </svg>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '10px 14px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
          color: textColor,
          fontWeight: state === 'completed' ? 'bold' : 'normal',
          cursor: state === 'locked' ? 'not-allowed' : 'pointer',
          transition: 'color 0.6s ease',
          boxSizing: 'border-box',
        }}
      >
        <Handle
          type="target"
          position={Position.Top}
          style={{ opacity: 0, width: 6, height: 6 }}
        />

        {/* Milestone star — inline so it never gets clipped by the node corners */}
        {milestone && isInFilter && (
          <span style={{
            flexShrink: 0,
            fontSize: 13,
            lineHeight: 1,
            color: starColor,
            filter: state !== 'locked' ? `drop-shadow(0 0 3px ${GOLD})` : 'none',
          }}>
            ★
          </span>
        )}

        {Icon && <Icon size={16} style={{ flexShrink: 0 }} />}

        <span style={{
          flex: 1,
          lineHeight: 1.3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {label}
        </span>

        {state === 'locked' && isInFilter && (
          <Lock size={12} style={{ flexShrink: 0, opacity: 0.6 }} />
        )}

        {showReps && (
          <span style={{
            fontSize: '9px',
            opacity: state === 'completed' ? 0.95 : 0.7,
            flexShrink: 0,
            fontFamily: 'Orbitron, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}>
            {state === 'completed' && <Check size={11} />}
            {repsText}
          </span>
        )}

        <Handle
          type="source"
          position={Position.Bottom}
          style={{ opacity: 0, width: 6, height: 6 }}
        />
      </div>
    </div>
  )
}

export default SkillNode