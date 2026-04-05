'use client'

import { type SockConfig } from '@/lib/patterns'
import PatternDefs from '@/components/PatternDefs'

// Sock shape: right-facing, leg tube on left, toe on right, heel at bottom-left.
// ViewBox: 0 0 310 375
const SOCK_PATH = [
  'M 75,15',          // cuff top-left
  'L 175,15',         // cuff top-right
  'L 175,255',        // right side of leg
  'C 175,292 212,298 212,318', // right ankle curve into foot top
  'L 268,318',        // foot top-right
  'Q 290,318 290,335', // toe top curve
  'Q 290,352 268,352', // toe bottom curve
  'L 62,352',         // foot bottom going left
  'Q 28,352 28,320',  // heel bottom curve
  'L 28,255',         // back of heel going up
  'C 28,220 50,210 75,210', // heel top curve back to leg
  'L 75,15',          // left side of leg
  'Z',
].join(' ')

interface SockProps {
  config: SockConfig
}

export default function Sock({ config }: SockProps) {
  return (
    <svg
      viewBox="0 0 310 375"
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
        width="310"
        height="375"
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
    </svg>
  )
}
