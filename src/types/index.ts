

export interface GlitchPair {
  base: string
  alias: string
}

export interface ProfileStat {
  
  label: string
  
  value: number
  
  suffix?: string
}

export interface DetailRow {
  label: string
  value: string
}

export interface Profile {
  fullName: string
  handle: string
  nickname: string
  
  tagline: string
  
  roles: string[]
  university: GlitchPair
  course: string
  org: GlitchPair
  
  bioLines: string[]
  careerGoal: string
  
  details: DetailRow[]
  
  currentlyLearning: string[]
  email: string
  cvUrl: string
  stats: ProfileStat[]
  
  loader: GameLoader
}

export interface GameLoader {
  
  title: string
  
  subtitle: string
  
  assets: string[]
  
  startPrompt: string
}

export type SkillCategory = 'security' | 'systems' | 'programming' | 'embedded' | 'web'

export type SkillLevel = 'Learning' | 'Working' | 'Strong'

export interface Skill {
  id: string
  name: string
  
  alias: string
  category: SkillCategory
  
  level: SkillLevel
  
  percent?: number
  
  usedIn: string
  
  projectIds: string[]
}

export interface SkillTab {
  id: SkillCategory
  label: string
}

export type ProjectCategory = 'cybersecurity' | 'webapps' | 'gamedev' | 'iot'
export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'thesis'

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  
  codename: string
  category: ProjectCategory
  status: ProjectStatus
  
  summary: string
  
  description: string
  
  problem: string
  
  approach: string
  
  features: string[]
  
  lessons: string[]
  tech: string[]
  
  skillIds: string[]
  
  terminalPreview: string[]
  links: ProjectLink[]
  featured?: boolean
}

export interface ProjectFilter {
  id: ProjectCategory | 'all'
  label: string
}

export interface ExperienceEntry {
  id: string
  period: string
  role: string
  org: string
  summary: string
  
  details: string[]
  tags: string[]
}

export interface Social {
  id: string
  label: string
  href: string
  
  icon: string
}

export interface TerminalContext {
  
  print: (line: string) => void
  
  clear: () => void
  
  setTheme: (id: ThemeId) => void
  
  glitch: () => void
  
  downloadCv: () => void
  
  commandNames: string[]
}

export interface TerminalCommand {
  name: string
  description: string
  
  run: (args: string[], ctx: TerminalContext) => string[] | void
  
  hidden?: boolean
}

export type ThemeId = 'crimson' | 'matrix' | 'cyan' | 'breach'

export interface Theme {
  id: ThemeId
  label: string
  
  brand: string
  accent: string
  brand2: string
  
  hidden?: boolean
}

export interface NavSection {
  id: string
  label: string
  
  prompt: string
}

export type ToastKind = 'info' | 'success' | 'error'

export interface Toast {
  id: number
  message: string
  kind: ToastKind
}
