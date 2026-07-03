import { getSmoothStepPath } from '@xyflow/react'
import { useLayoutEffect, useEffect, useRef, useState } from 'react'

function GlowEdge({
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
  style = {}, markerEnd, data,
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition,
  })

  // Separate ref for measurement only — never animated
  const measureRef    = useRef(null)
  const [pathLength,  setPathLength]  = useState(0)
  const [animKey,     setAnimKey]     = useState(0)
  const prevActivated = useRef(false)

  // Only re-measure when the SVG path shape actually changes.
  // The [edgePath] dependency is the critical fix — without it,
  // this ran on every render causing the animation to replay multiple times.
  useLayoutEffect(() => {
    if (measureRef.current) {
      const len = Math.ceil(measureRef.current.getTotalLength()) + 2
      setPathLength(prev => (prev === len ? prev : len))
    }
  }, [edgePath])

  // Only trigger on the rising edge of isNewlyActivated.
  // Incrementing animKey changes the key on the animated path,
  // forcing a DOM remount which resets the CSS animation cleanly.
  useEffect(() => {
    const isNow = !!data?.isNewlyActivated
    if (isNow && !prevActivated.current) {
      setAnimKey(k => k + 1)
    }
    prevActivated.current = isNow
  }, [data?.isNewlyActivated])

  const strokeColor = style.stroke    || '#3b82f6'
  const strokeWidth = style.strokeWidth || 2
  const isActive    = !!data?.isActive
  const delay       = data?.activationDelay ?? 0
  const isAnimating = !!(data?.isNewlyActivated && pathLength > 0 && animKey > 0)

  const edgeAnimation = isAnimating
    ? `edgeDrawIn 2s ease-out ${delay}s forwards, edgeGlowPulse 3s ease-in-out ${2 + delay}s infinite`
    : isActive
      ? 'edgeGlowPulse 3s ease-in-out infinite'
      : undefined

  return (
    <g style={{ '--edge-color': strokeColor }}>

      {/* Invisible path used only for measuring total length */}
      <path ref={measureRef} d={edgePath} fill="none" stroke="none" />

      {/* Soft halo beneath the main line */}
      <path
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth + 10}
        strokeOpacity={isActive ? 0.12 : 0.03}
      />

      {/* Main animated path.
          Key changes when animKey increments, forcing a full DOM remount.
          The new element starts hidden (dashoffset = pathLength) and the
          CSS animation draws it to 0 exactly once — no replays possible. */}
      <path
        key={`edge-${animKey}`}
        d={edgePath}
        fill="none"
        style={{
          stroke:           strokeColor,
          strokeWidth,
          opacity:          style.opacity ?? 1,
          filter:           isActive ? `drop-shadow(0 0 3px ${strokeColor})` : 'none',
          strokeDasharray:  isAnimating ? pathLength : undefined,
          strokeDashoffset: isAnimating ? pathLength : undefined,
          animation:        edgeAnimation,
        }}
        markerEnd={markerEnd}
      />

    </g>
  )
}

export default GlowEdge