// -------------------------------------------------------------------------
//  Portfolio data model
//  Central type definitions. Add new projects/skills by editing the data
//  files in src/data — the UI renders entirely from these structures.
// -------------------------------------------------------------------------

/** The three portfolio tracks Ian works across. */
export type TrackId = 'security' | 'embedded' | 'web'

export interface Track {
  id: TrackId
  /** Short label shown as a tab / filter. */
  label: string
  /** Terminal-style command shown in the section header. */
  command: string
  /** One-line description of the track. */
  blurb: string
  /** Accent color token used for this track's highlights. */
  accent: 'accent' | 'cyan' | 'amber'
}

export type ProjectStatus =
  | 'live'
  | 'active'
  | 'thesis'
  | 'archived'
  | 'wip'
  | 'planned'

export interface ProjectLink {
  label: string
  href: string
  /** Icon key resolved by the UI (see IconName). */
  icon?: IconName
}

export interface Project {
  /** Stable slug — used as key and anchor. */
  id: string
  track: TrackId
  name: string
  /** Short tagline shown on the collapsed card. */
  tagline: string
  status: ProjectStatus
  /** Approximate year or range, e.g. "2025" or "2024–25". */
  period?: string
  /** Tech / tooling chips. */
  stack: string[]
  /** Collapsed-card summary (1–2 sentences). */
  summary: string
  /** Case-study bullets shown when the card is expanded. */
  highlights: string[]
  /** Optional external links (repo, demo, writeup). */
  links?: ProjectLink[]
  /** Flags a flagship project for slightly larger emphasis. */
  featured?: boolean
}

export interface SkillGroup {
  label: string
  /** Terminal-style command shown beside the group. */
  command: string
  items: string[]
}

export interface SocialLink {
  label: string
  href: string
  handle: string
  icon: IconName
}

export type IconName =
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'external'
  | 'shield'
  | 'chip'
  | 'globe'
  | 'terminal'
