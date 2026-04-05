'use client'

import {
  type SockConfig,
  type PatternType,
  type MotifType,
  COLOR_COUNT,
  COLOR_LABELS,
  DENSITY_LABEL,
  MOTIF_EMOJI,
  DEFAULT_CONFIG,
} from '@/lib/patterns'

interface ControlsProps {
  config: SockConfig
  onChange: (config: SockConfig) => void
}

const PATTERN_OPTIONS: { value: PatternType; label: string }[] = [
  { value: 'stripes', label: 'Stripes' },
  { value: 'dots', label: 'Dots' },
  { value: 'argyle', label: 'Argyle' },
  { value: 'motifs', label: 'Motifs' },
]

const MOTIF_OPTIONS: MotifType[] = [
  'cats',
  'stars',
  'dinosaurs',
  'mushrooms',
  'hearts',
]

function ensureColorCount(colors: string[], count: number): string[] {
  if (colors.length >= count) return colors.slice(0, count)
  return [
    ...colors,
    ...DEFAULT_CONFIG.colors.slice(colors.length, count),
  ]
}

export default function Controls({ config, onChange }: ControlsProps) {
  const colorCount = COLOR_COUNT[config.pattern]
  const colorLabels = COLOR_LABELS[config.pattern]
  const densityLabel = DENSITY_LABEL[config.pattern]

  function setPattern(pattern: PatternType) {
    onChange({
      ...config,
      pattern,
      colors: ensureColorCount(config.colors, COLOR_COUNT[pattern]),
    })
  }

  function setColor(index: number, value: string) {
    const next = [...config.colors]
    next[index] = value
    onChange({ ...config, colors: next })
  }

  function setMotif(motif: MotifType) {
    onChange({ ...config, motif })
  }

  function setDensity(density: number) {
    onChange({ ...config, density })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Pattern selector */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Pattern
        </label>
        <div className="flex rounded-xl overflow-hidden border border-zinc-200 w-fit">
          {PATTERN_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPattern(value)}
              className={[
                'px-4 py-2 text-sm font-medium transition-colors',
                config.pattern === value
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Color pickers */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Colors
        </label>
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: colorCount }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-full border-2 border-zinc-200 overflow-hidden cursor-pointer shadow-sm"
                style={{ backgroundColor: config.colors[i] ?? '#ffffff' }}
              >
                <input
                  type="color"
                  value={config.colors[i] ?? '#ffffff'}
                  onChange={(e) => setColor(i, e.target.value)}
                  className="opacity-0 w-full h-full cursor-pointer"
                  aria-label={colorLabels[i]}
                />
              </div>
              <span className="text-xs text-zinc-400">{colorLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Motif picker */}
      {config.pattern === 'motifs' && (
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Motif
          </label>
          <div className="flex gap-2 flex-wrap">
            {MOTIF_OPTIONS.map((motif) => (
              <button
                key={motif}
                onClick={() => setMotif(motif)}
                title={motif}
                className={[
                  'text-2xl w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all',
                  config.motif === motif
                    ? 'border-zinc-900 bg-zinc-100 scale-110'
                    : 'border-zinc-200 bg-white hover:border-zinc-400',
                ].join(' ')}
              >
                {MOTIF_EMOJI[motif]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Density slider */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          {densityLabel}
        </label>
        <input
          type="range"
          min="5"
          max="95"
          value={config.density}
          onChange={(e) => setDensity(Number(e.target.value))}
          className="w-full accent-zinc-900"
          aria-label={densityLabel}
        />
      </div>
    </div>
  )
}
