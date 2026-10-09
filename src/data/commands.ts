import type { TerminalCommand, NavSection } from '@/types'
import { profile } from './profile'
import { projects } from './projects'
import { skills } from './skills'
import { socials } from './socials'

export const navSections: NavSection[] = [
  { id: 'hero', label: 'Home', prompt: '> ~/' },
  { id: 'about', label: 'About', prompt: '> cat about.txt' },
  { id: 'skills', label: 'Skills', prompt: '> ./skills --matrix' },
  { id: 'projects', label: 'Projects', prompt: '> ./projects --list' },
  { id: 'resume', label: 'Resume', prompt: '> ./cv --open' },
  { id: 'contact', label: 'Contact', prompt: '> ./contact --send' },
]

export const commands: TerminalCommand[] = [
  {
    name: 'help',
    description: 'list available commands',
    run: (_args, _ctx) => {
      const visible = commands.filter((c) => !c.hidden)
      return [
        'available commands:',
        ...visible.map((c) => `  ${c.name.padEnd(14)} ${c.description}`),
        '',
        "tip: there are a couple of hidden commands. try 'sudo hire-me'.",
      ]
    },
  },
  {
    name: 'whoami',
    description: 'print identity',
    run: () => [
      profile.handle,
      `(${profile.fullName})`,
      `${profile.course} @ ${profile.university.base}`,
      `goal: ${profile.careerGoal}`,
    ],
  },
  {
    name: 'ls',
    description: 'list items — try `ls projects`',
    run: (args) => {
      const target = args[0] ?? ''
      if (target === 'projects') {
        return projects.map((p) => `${p.status.padEnd(12)} ${p.title}`)
      }
      if (target === 'skills') {
        return skills.map((s) => `${s.level.padEnd(9)} ${s.name}  ->  ${s.alias}`)
      }
      return ['projects', 'skills', 'about.txt', 'contact', '', 'usage: ls <projects|skills>']
    },
  },
  {
    name: 'cat',
    description: 'read a file — try `cat about.txt`',
    run: (args) => {
      if (args[0] === 'about.txt') return profile.bioLines
      return [`cat: ${args[0] ?? ''}: No such file`, 'try: cat about.txt']
    },
  },
  {
    name: 'skills',
    description: 'list skills with level labels',
    run: () => skills.map((s) => `  ${s.level.padEnd(9)} ${s.name.padEnd(24)} ${s.alias}`),
  },
  {
    name: 'contact',
    description: 'show contact info',
    run: () => [`email: ${profile.email}`, ...socials.map((s) => `${s.id.padEnd(10)} ${s.href}`)],
  },
  {
    name: 'cv',
    description: 'download my CV / resume',
    run: (_args, ctx) => {
      ctx.downloadCv()
      return ['[*] opening CV...']
    },
  },
  {
    name: 'theme',
    description: 'switch theme: theme <crimson|green|cyan>',
    run: (args, ctx) => {
      const id = args[0]
      if (id === 'crimson' || id === 'matrix' || id === 'cyan') {
        ctx.setTheme(id)
        return [`theme set to ${id}`]
      }

      if (id === 'green') {
        ctx.setTheme('matrix')
        return ['theme set to matrix (green)']
      }
      return ['usage: theme <crimson|green|cyan>']
    },
  },
  {
    name: 'glitch',
    description: 'trigger a glitch burst',
    run: (_args, ctx) => {
      ctx.glitch()
      return ['>_ reality.exe has stopped responding']
    },
  },
  {
    name: 'clear',
    description: 'clear the terminal',
    run: (_args, ctx) => {
      ctx.clear()
    },
  },

  {
    name: 'sudo',
    description: 'elevated commands',
    hidden: true,
    run: (args) => {
      if (args[0] === 'hire-me') {
        return [
          '[sudo] password for recruiter: ************',
          'access granted.',
          '',
          '  ╔══════════════════════════════════╗',
          '  ║   DEPLOYING ITSCHANITY TO PROD    ║',
          '  ╚══════════════════════════════════╝',
          '',
          `  reach me: ${profile.email}`,
          '  status: AVAILABLE for internships & entry-level roles',
        ]
      }
      return ['usage: sudo hire-me']
    },
  },
  {
    name: 'konami',
    description: 'hint',
    hidden: true,
    run: () => ['↑ ↑ ↓ ↓ ← → ← → B A'],
  },
]
