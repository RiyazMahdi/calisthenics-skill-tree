import { useMemo, useState, useEffect, useRef } from 'react'
import { ReactFlow, Background, Controls, MarkerType } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from 'dagre'
import { skillsData }     from './data/skills'
import { skillTargets }   from './data/skillTargets'
import SkillNode          from './components/SkillNode'
import GlowEdge           from './components/GlowEdge'
import QuestWindow        from './components/QuestWindow'
import ProgressHeader     from './components/ProgressHeader'
import RankUpScreen       from './components/RankUpScreen'
import AuthScreen         from './components/AuthScreen'
import IntroScreen        from './components/IntroScreen'
import { useAuth }        from './context/AuthContext'
import { supabase }       from './lib/supabase'

const NODE_WIDTH     = 175
const NODE_HEIGHT    = 56
const COLUMN_GAP     = 100
const CATEGORY_ORDER = ['Push', 'Core', 'Pull', 'Legs']

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

function CategoryHeaderNode({ data }) {
  return (
    <div style={{
      fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: 700,
      letterSpacing: '4px', color: data.color,
      textShadow: `0 0 10px ${data.color}88`, padding: '6px 14px',
      borderBottom: `1px solid ${data.color}44`, background: `${data.color}08`,
      pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
    }}>
      ◈ {data.label.toUpperCase()}
    </div>
  )
}

const nodeTypes = { skillNode: SkillNode, categoryHeader: CategoryHeaderNode }
const edgeTypes = { glowEdge: GlowEdge }

function getColumnLayout() {
  let xOffset = 0
  const positionedNodes = []

  CATEGORY_ORDER.forEach((category) => {
    const categorySkills = skillsData.filter(s => s.category === category)

    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: 'TB', nodesep: 40, ranksep: 90 })

    categorySkills.forEach(skill => {
      dagreGraph.setNode(skill.id, { width: NODE_WIDTH, height: NODE_HEIGHT })
    })
    categorySkills.forEach(skill => {
      skill.prerequisites.forEach(prereqId => {
        if (categorySkills.find(s => s.id === prereqId)) {
          dagreGraph.setEdge(prereqId, skill.id)
        }
      })
    })

    dagre.layout(dagreGraph)

    let minX = Infinity, maxX = -Infinity
    categorySkills.forEach(skill => {
      const { x } = dagreGraph.node(skill.id)
      minX = Math.min(minX, x - NODE_WIDTH / 2)
      maxX = Math.max(maxX, x + NODE_WIDTH / 2)
    })

    const columnWidth = maxX - minX

    categorySkills.forEach(skill => {
      const { x, y } = dagreGraph.node(skill.id)
      positionedNodes.push({
        id: skill.id,
        position: {
          x: xOffset + (x - NODE_WIDTH / 2) - minX,
          y: (y - NODE_HEIGHT / 2) + 80,
        },
      })
    })

    positionedNodes.push({
      id: `header_${category}`,
      type: 'categoryHeader',
      position: { x: xOffset, y: 0 },
      data: { label: category, color: categoryColors[category] },
      draggable: false, selectable: false, focusable: false,
      style: { background: 'transparent', border: 'none', padding: 0 },
    })

    xOffset += columnWidth + COLUMN_GAP
  })

  const edges = []
  skillsData.forEach(skill => {
    skill.prerequisites.forEach(prereqId => {
      edges.push({ id: `${prereqId}-${skill.id}`, source: prereqId, target: skill.id })
    })
  })

  return { nodes: positionedNodes, edges }
}

function App() {
  const { user } = useAuth()

  const [filter,                 setFilter]                 = useState('All')
  const [completedSkills,        setCompletedSkills]        = useState(new Set())
  const [progressData,           setProgressData]           = useState({})
  const [selectedSkillId,        setSelectedSkillId]        = useState(null)
  const [recentlyCompleted,      setRecentlyCompleted]      = useState(new Set())
  const [recentlyUnlocked,       setRecentlyUnlocked]       = useState(new Set())
  const [recentlyActivatedEdges, setRecentlyActivatedEdges] = useState(new Map())
  const [rankUpData,             setRankUpData]             = useState(null)
  const [showIntro,              setShowIntro]              = useState(true)
  const prevRankRef = useRef(null)

  // Show intro + load progress whenever the user logs in
  useEffect(() => {
    if (user) {
      setShowIntro(true)
      loadProgress()
    } else {
      setCompletedSkills(new Set())
      setProgressData({})
    }
  }, [user?.id])

  // Detect rank changes
  useEffect(() => {
    const percent = Math.round((completedSkills.size / skillsData.length) * 100)
    const { rank, color } = getRank(percent)
    if (prevRankRef.current !== null && prevRankRef.current !== rank) {
      setRankUpData({ from: prevRankRef.current, to: rank, color })
    }
    prevRankRef.current = rank
  }, [completedSkills])

  async function loadProgress() {
    const { data, error } = await supabase
      .from('skill_progress')
      .select('skill_id, current_value, is_completed')

    if (error) { console.error('Error loading progress:', error); return }

    const completed = new Set()
    const progress  = {}
    data.forEach(row => {
      if (row.is_completed)      completed.add(row.skill_id)
      if (row.current_value > 0) progress[row.skill_id] = row.current_value
    })
    setCompletedSkills(completed)
    setProgressData(progress)
  }

  async function saveProgress(skillId, currentValue, isCompleted) {
    if (!user) return
    const { error } = await supabase
      .from('skill_progress')
      .upsert(
        { user_id: user.id, skill_id: skillId, current_value: currentValue, is_completed: isCompleted, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,skill_id' }
      )
    if (error) console.error('Error saving progress:', error)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  const skillsById = useMemo(() => {
    const map = {}
    skillsData.forEach(s => { map[s.id] = s })
    return map
  }, [])

  const baseLayout = useMemo(() => getColumnLayout(), [])

  const headerNodeIds = useMemo(
    () => new Set(baseLayout.nodes.filter(n => n.id.startsWith('header_')).map(n => n.id)),
    [baseLayout]
  )

  function getSkillState(skill) {
    if (completedSkills.has(skill.id)) return 'completed'
    const ready = skill.prerequisites.every(id => completedSkills.has(id))
    return ready ? 'unlocked' : 'locked'
  }

  function handleNodeClick(event, node) {
    if (headerNodeIds.has(node.id)) return
    const skill = skillsById[node.id]
    if (!skill) return
    setSelectedSkillId(node.id)
  }

  function handleProgressChange(value) {
    setProgressData(prev => ({ ...prev, [selectedSkillId]: value }))
  }

  function handleCompleteSkill() {
    const skillId      = selectedSkillId
    const newCompleted = new Set(completedSkills)
    newCompleted.add(skillId)

    const newlyUnlockedIds = skillsData
      .filter(s => {
        if (newCompleted.has(s.id)) return false
        const wasLocked    = !s.prerequisites.every(id => completedSkills.has(id))
        const isNowUnlocked = s.prerequisites.every(id => newCompleted.has(id))
        return wasLocked && isNowUnlocked
      })
      .map(s => s.id)

    // Stagger outgoing edge animations
    const dependents    = skillsData.filter(s => s.prerequisites.includes(skillId))
    const activatedEdges = new Map()
    dependents.forEach((s, i) => {
      activatedEdges.set(`${skillId}-${s.id}`, i * 0.28)
    })

    setCompletedSkills(newCompleted)
    setRecentlyCompleted(prev => new Set([...prev, skillId]))
    setRecentlyUnlocked(new Set(newlyUnlockedIds))
    setRecentlyActivatedEdges(activatedEdges)

    saveProgress(skillId, progressData[skillId] || 0, true)

    setTimeout(() => {
      setRecentlyCompleted(prev => { const next = new Set(prev); next.delete(skillId); return next })
    }, 1200)
    setTimeout(() => setRecentlyUnlocked(new Set()),        1500)
    setTimeout(() => setRecentlyActivatedEdges(new Map()),  6000)
  }

  function handleResetSkill() {
    const skillId = selectedSkillId
    setCompletedSkills(prev => { const next = new Set(prev); next.delete(skillId); return next })
    saveProgress(skillId, progressData[skillId] || 0, false)
  }

  function handleQuestWindowClose() {
    if (selectedSkillId) {
      saveProgress(
        selectedSkillId,
        progressData[selectedSkillId] || 0,
        completedSkills.has(selectedSkillId)
      )
    }
    setSelectedSkillId(null)
  }

  const { nodes, edges } = useMemo(() => {
    const accent = filter === 'All' ? '#3b82f6' : categoryColors[filter]

    const styledNodes = baseLayout.nodes.map(node => {
      if (headerNodeIds.has(node.id)) {
        const isActive = filter === 'All' || filter === node.data.label
        return { ...node, style: { ...node.style, opacity: isActive ? 1 : 0.15, transition: 'opacity 0.3s ease' } }
      }

      const skill = skillsById[node.id]
      if (!skill) return node

      const state      = getSkillState(skill)
      const isInFilter = filter === 'All' || skill.category === filter

      return {
        ...node,
        type: 'skillNode',
        data: {
          label:               skill.name,
          category:            skill.category,
          state, accent, isInFilter,
          target:              skillTargets[skill.id],
          current:             progressData[node.id] || 0,
          isRecentlyCompleted: recentlyCompleted.has(node.id),
          isRecentlyUnlocked:  recentlyUnlocked.has(node.id),
          milestone:           !!skill.milestone,
        },
      }
    })

    const styledEdges = baseLayout.edges.map(edge => {
      const sourceSkill = skillsById[edge.source]
      const targetSkill = skillsById[edge.target]

      if (!sourceSkill || !targetSkill) return {
        ...edge, type: 'smoothstep',
        style: { stroke: '#1e293b', strokeWidth: 1, opacity: 0.08 },
      }

      const isCrossCategory = sourceSkill.category !== targetSkill.category
      const relevant        = filter === 'All' || sourceSkill.category === filter || targetSkill.category === filter
      const sourceCompleted = completedSkills.has(edge.source)

      if (!relevant) return { ...edge, type: 'smoothstep', style: { stroke: '#1e293b', strokeWidth: 1, opacity: 0.06 } }

      if (isCrossCategory) {
        return {
          ...edge, type: 'smoothstep',
          style: { stroke: accent, strokeWidth: 1.5, strokeDasharray: '6 4', opacity: 0.35 },
          markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: accent },
        }
      }

      return {
        ...edge,
        type: 'glowEdge',
        data: {
          isNewlyActivated: recentlyActivatedEdges.has(edge.id),
          activationDelay:  recentlyActivatedEdges.get(edge.id) || 0,
          isActive:         sourceCompleted,
        },
        style: { stroke: accent, strokeWidth: 2, opacity: sourceCompleted ? 1 : 0.35 },
        markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: accent },
      }
    })

    return { nodes: styledNodes, edges: styledEdges }
  }, [baseLayout, filter, completedSkills, progressData, skillsById,
      headerNodeIds, recentlyCompleted, recentlyUnlocked, recentlyActivatedEdges])

  // Auth and intro gates — these run before the main render
  if (!user) return <AuthScreen />
  if (showIntro) return (
    <IntroScreen
      user={user}
      completedSkills={completedSkills}
      onComplete={() => setShowIntro(false)}
    />
  )

  const selectedSkill      = selectedSkillId ? skillsById[selectedSkillId] : null
  const selectedSkillState = selectedSkill   ? getSkillState(selectedSkill) : null

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0f172a' }}>
      <ProgressHeader
        completedSkills={completedSkills}
        filter={filter}
        setFilter={setFilter}
        onSignOut={handleSignOut}
      />

      <div style={{ width: '100vw', height: 'calc(100vh - 80px)', marginTop: '80px' }}>
        <ReactFlow
          nodes={nodes} edges={edges}
          nodeTypes={nodeTypes} edgeTypes={edgeTypes}
          onNodeClick={handleNodeClick}
          fitView fitViewOptions={{ padding: 0.06 }}
        >
          <Background color="#1e293b" gap={24} />
          <Controls />
        </ReactFlow>
      </div>

      {selectedSkill && (
        <QuestWindow
          skill={selectedSkill}
          target={skillTargets[selectedSkill.id]}
          currentProgress={progressData[selectedSkillId] || 0}
          isCompleted={selectedSkillState === 'completed'}
          isLocked={selectedSkillState === 'locked'}
          prerequisites={selectedSkill.prerequisites.map(prereqId => ({
            skill: skillsById[prereqId],
            isCompleted: completedSkills.has(prereqId),
          }))}
          accent={categoryColors[selectedSkill.category]}
          onProgressChange={handleProgressChange}
          onComplete={handleCompleteSkill}
          onReset={handleResetSkill}
          onClose={handleQuestWindowClose}
        />
      )}

      {rankUpData && (
        <RankUpScreen
          from={rankUpData.from}
          to={rankUpData.to}
          color={rankUpData.color}
          onComplete={() => setRankUpData(null)}
        />
      )}
    </div>
  )
}

export default App