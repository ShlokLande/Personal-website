import { createContext, useContext, useId } from 'react'

/* Diagram palette: ink on paper, fern for data flow, butter yellow for the thing that matters. */
export const C = {
  ink: '#23261f',
  soft: '#4f4c43',
  muted: '#6f6a5d',
  fern: '#2f6b4f',
  leaf: '#e4ecdc',
  paper: '#fffdf7',
  line: '#cfc5ae',
  hi: '#f6e9a0',
}

const Ctx = createContext('d')

/** An SVG figure. `label` is what a screen reader hears. */
export function Diagram({ label, w, h, children }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg className="dg" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label}>
      <defs>
        <marker id={`ah${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={C.fern} />
        </marker>
        <marker id={`am${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill={C.muted} />
        </marker>
        <pattern id={`hatch${id}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 V8" stroke={C.line} strokeWidth="3" />
        </pattern>
      </defs>
      <Ctx.Provider value={id}>{children}</Ctx.Provider>
    </svg>
  )
}

export const useDiagramId = () => useContext(Ctx)

const FILL = { plain: C.paper, leaf: C.leaf, hi: C.hi, dark: C.fern, ghost: 'none' }

/** A labelled box. `sub` may be a string or an array of lines. */
export function Box({ x, y, w, h, title, sub, tone = 'plain', code = false, dashed = false, titleSize = 15 }) {
  const lines = sub == null ? [] : Array.isArray(sub) ? sub : [sub]
  const cx = x + w / 2
  const block = 18 + lines.length * 16
  const top = y + h / 2 - block / 2 + 13
  const dark = tone === 'dark'
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="8"
        fill={FILL[tone]}
        stroke={dark ? C.fern : C.ink}
        strokeWidth="1.3"
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      <text x={cx} y={top} textAnchor="middle" fontSize={titleSize} fontWeight="600" fill={dark ? C.paper : C.ink}
        fontFamily={code ? 'var(--code)' : undefined}>
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={i} x={cx} y={top + 18 + i * 16} textAnchor="middle" fontSize="12.5" fill={dark ? '#dfe9d8' : C.muted}>
          {l}
        </text>
      ))}
    </g>
  )
}

/** An arrow along path `d`. */
export function Arrow({ d, label, lx, ly, anchor = 'middle', dashed = false, muted = false, both = false }) {
  const id = useDiagramId()
  const m = `url(#${muted ? 'am' : 'ah'}${id})`
  return (
    <g>
      <path d={d} fill="none" stroke={muted ? C.muted : C.fern} strokeWidth="1.8" strokeDasharray={dashed ? '6 5' : undefined}
        markerEnd={m} markerStart={both ? m : undefined} />
      {label && (
        <text x={lx} y={ly} textAnchor={anchor} fontSize="12.5" fill={C.soft}>
          {label}
        </text>
      )}
    </g>
  )
}

/** Free text. */
export function T({ x, y, children, size = 13, color = C.muted, anchor = 'start', weight = 400, code = false, italic = false }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={color} fontWeight={weight}
      fontFamily={code ? 'var(--code)' : undefined} fontStyle={italic ? 'italic' : undefined}>
      {children}
    </text>
  )
}

/** Dashed region with a label in its corner, for grouping ("On the car"). */
export function Region({ x, y, w, h, label }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="none" stroke={C.line} strokeWidth="1.3" strokeDasharray="6 5" />
      <text x={x + 14} y={y + 20} fontSize="13" fill={C.muted} fontStyle="italic">
        {label}
      </text>
    </g>
  )
}
