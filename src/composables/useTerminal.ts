import { ref } from 'vue'
import { useTerminalStore } from '@/stores/terminal'
import { useUiStore } from '@/stores/ui'
import { commands } from '@/data/commands'
import { profile } from '@/data/profile'
import type { TerminalContext } from '@/types'

interface UseTerminalReturn {
  execute: (raw: string) => void
  autocomplete: (partial: string) => string
  historyPrev: () => string
  historyNext: () => string
  banner: () => void
  commandNames: string[]
}

export function useTerminal(): UseTerminalReturn {
  const term = useTerminalStore()
  const ui = useUiStore()
  const historyCursor = ref(-1)

  const commandNames = commands.filter((c) => !c.hidden).map((c) => c.name)

  const ctx: TerminalContext = {
    print: (line: string) => term.print(line, 'output'),
    clear: () => term.clear(),
    setTheme: (id) => ui.setTheme(id),
    glitch: () => ui.pulseGlitch(),
    downloadCv: () => void ui.downloadCv(profile.cvUrl),
    commandNames: commands.map((c) => c.name),
  }

  function execute(raw: string): void {
    const input = raw.trim()
    term.print(`visitor@itschanity:~$ ${raw}`, 'input')
    if (!input) return

    term.pushHistory(input)
    historyCursor.value = -1

    const [name, ...args] = input.split(/\s+/)
    const cmd = commands.find((c) => c.name === name.toLowerCase())

    if (!cmd) {
      term.print(`command not found: ${name}`, 'output')
      term.print("type 'help' for a list of commands.", 'output')
      return
    }

    const result = cmd.run(args, ctx)
    if (Array.isArray(result)) {
      for (const line of result) term.print(line, 'output')
    }
  }

  function autocomplete(partial: string): string {
    const trimmed = partial.trim()
    if (!trimmed) return partial
    const matches = commandNames.filter((n) => n.startsWith(trimmed.toLowerCase()))
    if (matches.length === 1) return matches[0]
    if (matches.length > 1) {
      term.print(`visitor@itschanity:~$ ${partial}`, 'input')
      term.print(matches.join('   '), 'output')
    }
    return partial
  }

  function historyPrev(): string {
    const h = term.history
    if (h.length === 0) return ''
    if (historyCursor.value === -1) historyCursor.value = h.length - 1
    else historyCursor.value = Math.max(0, historyCursor.value - 1)
    return h[historyCursor.value] ?? ''
  }

  function historyNext(): string {
    const h = term.history
    if (h.length === 0 || historyCursor.value === -1) return ''
    if (historyCursor.value >= h.length - 1) {
      historyCursor.value = -1
      return ''
    }
    historyCursor.value += 1
    return h[historyCursor.value] ?? ''
  }

  function banner(): void {
    if (term.lines.length > 0) return
    term.print('ITSCHANITY interactive shell', 'output')
    term.print("type 'help' to begin. press ` or Esc to close.", 'output')
    term.print('', 'output')
  }

  return { execute, autocomplete, historyPrev, historyNext, banner, commandNames }
}
