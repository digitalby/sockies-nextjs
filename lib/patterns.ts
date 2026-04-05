export type PatternType = 'stripes' | 'dots' | 'argyle' | 'motifs'

export type MotifType = 'cats' | 'stars' | 'dinosaurs' | 'mushrooms' | 'hearts'

export interface SockConfig {
  pattern: PatternType
  colors: string[]
  motif: MotifType
  density: number // 1–100
}

export const MOTIF_EMOJI: Record<MotifType, string> = {
  cats: '🐱',
  stars: '⭐',
  dinosaurs: '🦕',
  mushrooms: '🍄',
  hearts: '❤️',
}

export const COLOR_COUNT: Record<PatternType, number> = {
  stripes: 2,
  dots: 2,
  argyle: 3,
  motifs: 1,
}

export const COLOR_LABELS: Record<PatternType, string[]> = {
  stripes: ['Stripe A', 'Stripe B'],
  dots: ['Background', 'Dot'],
  argyle: ['Background', 'Diamond', 'Lines'],
  motifs: ['Background'],
}

export const DENSITY_LABEL: Record<PatternType, string> = {
  stripes: 'Stripe width',
  dots: 'Dot size',
  argyle: 'Diamond size',
  motifs: 'Motif size',
}

export const DEFAULT_CONFIG: SockConfig = {
  pattern: 'stripes',
  colors: ['#ff6eb4', '#ffe066', '#b388ff'],
  motif: 'cats',
  density: 45,
}
