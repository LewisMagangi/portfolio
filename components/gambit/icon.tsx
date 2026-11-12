"use client"

import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  CalendarBlank,
  CaretDown,
  CaretLeft,
  CaretRight,
  Check,
  Clock,
  Code,
  Crown,
  CursorClick,
  Database,
  EnvelopeOpen,
  Globe,
  Horse,
  MouseScroll,
  Pause,
  Play,
  PuzzlePiece,
  ShieldCheck,
  Trophy,
  VideoCamera,
  X,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react"

// The Gambit bundle's icon names, mapped to the Phosphor (regular) icons its paths came from.
export const ICONS = {
  arrow: ArrowRight,
  newtab: ArrowUpRight,
  brain: Brain,
  calendar: CalendarBlank,
  chev: CaretDown,
  left: CaretLeft,
  right: CaretRight,
  check: Check,
  clock: Clock,
  code: Code,
  crown: Crown,
  cursor: CursorClick,
  database: Database,
  letter: EnvelopeOpen,
  globe: Globe,
  knight: Horse,
  mouse: MouseScroll,
  pause: Pause,
  play: Play,
  puzzle: PuzzlePiece,
  shield: ShieldCheck,
  trophy: Trophy,
  video: VideoCamera,
  x: X,
} satisfies Record<string, PhosphorIcon>

export type IconName = keyof typeof ICONS

export function Icon({ name, size = 16, className }: { name: IconName; size?: number; className?: string }) {
  const Glyph = ICONS[name]
  return <Glyph size={size} aria-hidden className={className} />
}
