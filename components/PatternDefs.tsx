import { type SockConfig, MOTIF_EMOJI } from '@/lib/patterns'

interface PatternDefsProps {
  config: SockConfig
}

export default function PatternDefs({ config }: PatternDefsProps) {
  const { colors, density } = config

  // Stripes: density 1–100 maps to stripe height 8–40px
  const stripeH = 8 + (density / 100) * 32
  const c0 = colors[0] ?? '#ff6eb4'
  const c1 = colors[1] ?? '#ffe066'
  const c2 = colors[2] ?? '#b388ff'

  // Dots: density maps to dot radius 4–18px, spacing 3× radius
  const dotR = 4 + (density / 100) * 14
  const dotSpacing = dotR * 3.2

  // Argyle: density maps to tile size 50–100px
  const argTile = 50 + (density / 100) * 50

  // Motifs: density maps to font size 16–36px, spacing 2.5×
  const motifSize = 16 + (density / 100) * 20
  const motifSpacing = motifSize * 2.6
  const emoji = MOTIF_EMOJI[config.motif]

  return (
    <>
      {/* Stripes */}
      <pattern
        id="pattern-stripes"
        x="0"
        y="0"
        width="300"
        height={stripeH * 2}
        patternUnits="userSpaceOnUse"
      >
        <rect x="0" y="0" width="300" height={stripeH} fill={c0} />
        <rect x="0" y={stripeH} width="300" height={stripeH} fill={c1} />
      </pattern>

      {/* Dots */}
      <pattern
        id="pattern-dots"
        x="0"
        y="0"
        width={dotSpacing}
        height={dotSpacing}
        patternUnits="userSpaceOnUse"
      >
        <rect x="0" y="0" width={dotSpacing} height={dotSpacing} fill={c0} />
        <circle cx={dotSpacing / 2} cy={dotSpacing / 2} r={dotR} fill={c1} />
      </pattern>

      {/* Argyle */}
      <pattern
        id="pattern-argyle"
        x="0"
        y="0"
        width={argTile}
        height={argTile}
        patternUnits="userSpaceOnUse"
      >
        <rect x="0" y="0" width={argTile} height={argTile} fill={c0} />
        <polygon
          points={`${argTile / 2},0 ${argTile},${argTile / 2} ${argTile / 2},${argTile} 0,${argTile / 2}`}
          fill={c1}
        />
        <line
          x1="0"
          y1="0"
          x2={argTile}
          y2={argTile}
          stroke={c2}
          strokeWidth="1.5"
        />
        <line
          x1={argTile}
          y1="0"
          x2="0"
          y2={argTile}
          stroke={c2}
          strokeWidth="1.5"
        />
      </pattern>

      {/* Motifs */}
      <pattern
        id="pattern-motifs"
        x="0"
        y="0"
        width={motifSpacing}
        height={motifSpacing}
        patternUnits="userSpaceOnUse"
      >
        <rect
          x="0"
          y="0"
          width={motifSpacing}
          height={motifSpacing}
          fill={c0}
        />
        <text
          x={motifSpacing / 2}
          y={motifSpacing / 2 + motifSize * 0.35}
          textAnchor="middle"
          fontSize={motifSize}
        >
          {emoji}
        </text>
      </pattern>
    </>
  )
}
