'use client'

import { type SockConfig } from '@/lib/patterns'
import PatternDefs from '@/components/PatternDefs'

// Sock shape: right-facing. The front of the sock (right side) is a continuous
// vertical line from cuff to instep — the heel is the only protrusion, going left.
// ViewBox: 0 0 320 360
const SOCK_PATH = [
  'M 80,20',           // cuff top-left
  'L 175,20',          // cuff top-right
  'L 175,268',         // right leg + instep, straight down
  'Q 175,288 195,288', // small front-ankle curve into foot top
  'L 285,288',         // foot top going right
  'Q 308,288 308,312', // toe top curve
  'Q 308,334 285,334', // toe bottom curve
  'L 65,334',          // foot bottom going left
  'Q 35,334 35,305',   // heel bottom curve
  'L 35,248',          // heel back, straight up
  'C 35,218 58,210 80,210', // heel top curve back to leg
  'L 80,20',           // left side of leg
  'Z',
].join(' ')

// Visual cuff band across the top of the leg
const CUFF_LINE_Y = 58

interface SockProps {
  config: SockConfig
}

export default function Sock({ config }: SockProps) {
  return (
    <svg
      viewBox="0 0 320 360"
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
        width="320"
        height="360"
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
        x1="80"
        y1={CUFF_LINE_Y}
        x2="175"
        y2={CUFF_LINE_Y}
        stroke="#1a1a2e"
        strokeWidth="2"
        opacity="0.35"
      />
    </svg>
  )
}
