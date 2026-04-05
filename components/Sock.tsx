'use client'

import { type SockConfig } from '@/lib/patterns'
import PatternDefs from '@/components/PatternDefs'

// Sock shape: right-facing.
// The heel is the large rounded curve at the bottom of the leg — not a separate
// protrusion. Think of the sock as a backwards-J: leg tube bends smoothly into foot.
// ViewBox: 0 0 340 385
const SOCK_PATH = [
  'M 90,22',            // cuff back (top-left)
  'L 185,22',           // across cuff top to front
  'L 185,270',          // down the front of the leg / instep
  'Q 185,298 215,298',  // front ankle curves right into foot top
  'L 292,298',          // foot top to toe area
  'Q 316,298 316,328',  // toe top curve
  'Q 316,358 292,358',  // toe bottom curve
  'L 90,358',           // foot bottom back to heel
  'C 48,358 48,235 90,235', // heel: large cubic bezier, the backwards-J curve
  'L 90,22',            // back of leg straight up to cuff
  'Z',
].join(' ')

// Visual cuff band
const CUFF_LINE_Y = 62

interface SockProps {
  config: SockConfig
}

export default function Sock({ config }: SockProps) {
  return (
    <svg
      viewBox="0 0 340 385"
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
        width="340"
        height="385"
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
        x2="185"
        y2={CUFF_LINE_Y}
        stroke="#1a1a2e"
        strokeWidth="2"
        opacity="0.35"
      />
    </svg>
  )
}
