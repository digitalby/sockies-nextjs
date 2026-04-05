'use client'

import { type SockConfig } from '@/lib/patterns'
import PatternDefs from '@/components/PatternDefs'

// Sock shape: right-facing, correct proportions.
// Key: the leg is ~1:1 width:height (not a boot!), and the foot is 2.5× longer
// than the leg is tall. The heel is a large backwards-J bezier at the bottom-left.
// ViewBox: 0 0 400 320
const SOCK_PATH = [
  'M 90,22',              // cuff back top
  'L 190,22',             // cuff front top
  'L 190,155',            // down the front of the leg (leg is ~100px wide, ~133px tall)
  'Q 190,218 232,218',    // front ankle: curves right into foot top
  'L 338,218',            // foot top going to toe (foot is ~245px long)
  'Q 365,218 365,258',    // toe top curve
  'Q 365,298 338,298',    // toe bottom curve
  'L 90,298',             // foot bottom back to heel
  'C 44,298 44,155 90,155', // heel: large smooth curve (the backwards-J)
  'L 90,22',              // back of leg up to cuff
  'Z',
].join(' ')

// Visual cuff band
const CUFF_LINE_Y = 60

interface SockProps {
  config: SockConfig
}

export default function Sock({ config }: SockProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      width="100%"
      height="100%"
      style={{ maxHeight: '100%', maxWidth: '100%' }}
      aria-label="Sock preview"
      role="img"
    >
      <defs>
        <clipPath id="sock-clip">
          <path d={SOCK_PATH} />
        </clipPath>
        <PatternDefs config={config} />
      </defs>

      {/* Pattern fill clipped to sock shape */}
      <rect
        x="0"
        y="0"
        width="400"
        height="320"
        fill={`url(#pattern-${config.pattern})`}
        clipPath="url(#sock-clip)"
      />

      {/* Sock outline */}
      <path
        d={SOCK_PATH}
        fill="none"
        stroke="#1a1a2e"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Cuff band */}
      <line
        x1="90"
        y1={CUFF_LINE_Y}
        x2="190"
        y2={CUFF_LINE_Y}
        stroke="#1a1a2e"
        strokeWidth="2"
        opacity="0.35"
      />
    </svg>
  )
}
