import type { ProjectStatus, TrackId } from '@/data/types'

// -------------------------------------------------------------------------
//  Presentation helpers — keep Tailwind class strings out of templates so
//  they stay tidy and the JIT compiler can see full literal class names.
// -------------------------------------------------------------------------

export interface StatusMeta {
  label: string
  /** Full Tailwind classes for the status pill. */
  classes: string
}

export const statusMeta: Record<ProjectStatus, StatusMeta> = {
  live: { label: 'live', classes: 'text-accent border-accent/40 bg-accent/10' },
  active: {
    label: 'active',
    classes: 'text-accent border-accent/40 bg-accent/10',
  },
  thesis: { label: 'thesis', classes: 'text-cyan border-cyan/40 bg-cyan/10' },
  wip: { label: 'wip', classes: 'text-amber border-amber/40 bg-amber/10' },
  planned: {
    label: 'planned',
    classes: 'text-fg-dim border-line bg-panel-2',
  },
  archived: {
    label: 'archived',
    classes: 'text-fg-dim border-line bg-panel-2',
  },
}

export interface TrackAccent {
  text: string
  border: string
  hoverBorder: string
  dot: string
}

export const trackAccent: Record<TrackId, TrackAccent> = {
  security: {
    text: 'text-accent',
    border: 'border-accent/30',
    hoverBorder: 'hover:border-accent/50',
    dot: 'bg-accent',
  },
  embedded: {
    text: 'text-cyan',
    border: 'border-cyan/30',
    hoverBorder: 'hover:border-cyan/50',
    dot: 'bg-cyan',
  },
  web: {
    text: 'text-amber',
    border: 'border-amber/30',
    hoverBorder: 'hover:border-amber/50',
    dot: 'bg-amber',
  },
}
