import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TerminalLine {
  id: number
  text: string

  kind: 'input' | 'output'
}

export const useTerminalStore = defineStore('terminal', () => {
  const open = ref(false)
  const lines = ref<TerminalLine[]>([])
  const history = ref<string[]>([])
  let lineId = 0

  function openTerminal(): void {
    open.value = true
  }
  function closeTerminal(): void {
    open.value = false
  }
  function toggleTerminal(): void {
    open.value = !open.value
  }

  function print(text: string, kind: TerminalLine['kind'] = 'output'): void {
    lines.value.push({ id: ++lineId, text, kind })
  }

  function clear(): void {
    lines.value = []
  }

  function pushHistory(cmd: string): void {
    if (cmd.trim() && history.value[history.value.length - 1] !== cmd) {
      history.value.push(cmd)
    }
  }

  return {
    open,
    lines,
    history,
    openTerminal,
    closeTerminal,
    toggleTerminal,
    print,
    clear,
    pushHistory,
  }
})
